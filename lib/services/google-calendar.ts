/**
 * TRUSTGRID.AI — Enterprise Google Calendar & Session Booking Service
 * Server-side scheduling engine with Google Calendar API v3 integration,
 * FreeBusy slot collision detection, automated invitation dispatch,
 * and persistent database idempotency tracking.
 */

import crypto from 'node:crypto'
import { isSlotBookedDb, insertBookingDb, DbSessionBooking } from '@/lib/db/bookings'

export interface TimeSlot {
  startTime: string // "09:00" (24hr format)
  endTime: string   // "09:45"
  startIso: string  // "2026-10-12T09:00:00-04:00"
  endIso: string    // "2026-10-12T09:45:00-04:00"
  label: string     // "09:00 AM – 09:45 AM"
  available: boolean
  reason?: string
}

export interface BookingRequestPayload {
  name: string
  email: string
  company: string
  jobTitle?: string
  phone?: string
  areaOfInterest: string
  challengeDescription: string
  bookingDate: string // "YYYY-MM-DD"
  startTime: string   // "09:00"
  endTime: string     // "09:45"
  timezone: string    // "America/New_York", "Asia/Singapore", etc.
  additionalContext?: string
}

export interface BookingResult {
  success: boolean
  bookingId?: string
  eventTitle?: string
  date?: string
  startTime?: string
  endTime?: string
  timezone?: string
  googleCalendarEventId?: string
  meetLink?: string
  googleCalendarUrl?: string
  icsContent?: string
  message: string
  error?: string
}

// In-memory token cache for Google Service Account OAuth2
let cachedGoogleToken: { token: string; expiresAt: number } | null = null

/**
 * Generates an OAuth 2.0 access token for Google Service Account using native Node.js crypto
 */
async function getGoogleServiceAccountToken(): Promise<string | null> {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  let privateKey = process.env.GOOGLE_PRIVATE_KEY

  if (!serviceAccountEmail || !privateKey) {
    return null
  }

  // Check cache
  const now = Math.floor(Date.now() / 1000)
  if (cachedGoogleToken && cachedGoogleToken.expiresAt > now + 60) {
    return cachedGoogleToken.token
  }

  try {
    // Format private key properly if escaped with \n
    if (privateKey.includes('\\n')) {
      privateKey = privateKey.replace(/\\n/g, '\n')
    }

    const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url')
    const claim = Buffer.from(JSON.stringify({
      iss: serviceAccountEmail,
      scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now
    })).toString('base64url')

    const sign = crypto.createSign('RSA-SHA256')
    sign.update(`${header}.${claim}`)
    const signature = sign.sign(privateKey, 'base64url')
    const jwt = `${header}.${claim}.${signature}`

    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt
      })
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('[Google Calendar Auth Error]', errText)
      return null
    }

    const data = await res.json()
    if (data.access_token) {
      cachedGoogleToken = {
        token: data.access_token,
        expiresAt: now + (data.expires_in || 3600)
      }
      return data.access_token
    }
    return null
  } catch (err: any) {
    console.error('[Google Service Account Signing Error]', err?.message || err)
    return null
  }
}

/**
 * Convert 24-hour time string ("14:30") to 12-hour formatted time ("02:30 PM")
 */
export function formatTime12h(time24: string): string {
  const [hStr, mStr] = time24.split(':')
  const h = parseInt(hStr, 10)
  const m = mStr || '00'
  const period = h >= 12 ? 'PM' : 'AM'
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h
  return `${h12.toString().padStart(2, '0')}:${m} ${period}`
}

/**
 * Generate standardized business schedule slots for a given date and timezone
 */
export function generateDailyWorkingSlots(
  dateStr: string,
  timezone: string = 'America/New_York'
): TimeSlot[] {
  const durationMinutes = parseInt(process.env.CALENDAR_SESSION_DURATION_MINUTES || '45', 10)
  const startHour = 9  // 09:00 AM
  const endHour = 18   // 06:00 PM (Last slot starts at 17:00 or 17:15)

  const slots: TimeSlot[] = []
  const [year, month, day] = dateStr.split('-').map((v) => parseInt(v, 10))

  let currentMinutes = startHour * 60

  while (currentMinutes + durationMinutes <= endHour * 60) {
    const startH = Math.floor(currentMinutes / 60)
    const startM = currentMinutes % 60
    const endTotalMinutes = currentMinutes + durationMinutes
    const endH = Math.floor(endTotalMinutes / 60)
    const endM = endTotalMinutes % 60

    const startTime = `${startH.toString().padStart(2, '0')}:${startM.toString().padStart(2, '0')}`
    const endTime = `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`

    const label = `${formatTime12h(startTime)} – ${formatTime12h(endTime)}`

    // Pad date string components
    const mm = month.toString().padStart(2, '0')
    const dd = day.toString().padStart(2, '0')
    const startIso = `${year}-${mm}-${dd}T${startTime}:00`
    const endIso = `${year}-${mm}-${dd}T${endTime}:00`

    slots.push({
      startTime,
      endTime,
      startIso,
      endIso,
      label,
      available: true
    })

    // Advance by session duration + 15 min buffer (or 60 min intervals)
    currentMinutes += 60
  }

  return slots
}

/**
 * Fetch calendar availability for a given date and timezone.
 * Cross-references Google Calendar FreeBusy and internal database.
 */
export async function fetchCalendarAvailability(
  dateStr: string,
  timezone: string = 'America/New_York'
): Promise<{ date: string; timezone: string; slots: TimeSlot[]; totalAvailable: number }> {
  const targetDate = new Date(`${dateStr}T00:00:00Z`)
  const now = new Date()

  // Generate baseline daily slots
  const allSlots = generateDailyWorkingSlots(dateStr, timezone)

  // 1. Check if date is in the past
  const todayUtcStr = now.toISOString().slice(0, 10)
  const isPastDate = dateStr < todayUtcStr

  // 2. Check if weekend (0 = Sunday, 6 = Saturday)
  const dayOfWeek = targetDate.getUTCDay()
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

  if (isPastDate || isWeekend) {
    return {
      date: dateStr,
      timezone,
      slots: allSlots.map((s) => ({
        ...s,
        available: false,
        reason: isPastDate ? 'Date has passed' : 'Weekend - Non-working hours'
      })),
      totalAvailable: 0
    }
  }

  // 3. Query Google Calendar FreeBusy API if credentials are configured
  const token = await getGoogleServiceAccountToken()
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary'
  const busyRanges: { start: string; end: string }[] = []

  if (token) {
    try {
      const timeMin = `${dateStr}T00:00:00Z`
      const timeMax = `${dateStr}T23:59:59Z`

      const freeBusyRes = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          timeMin,
          timeMax,
          timeZone: timezone,
          items: [{ id: calendarId }]
        })
      })

      if (freeBusyRes.ok) {
        const freeBusyData = await freeBusyRes.json()
        const calendarData = freeBusyData.calendars?.[calendarId]
        if (calendarData && Array.isArray(calendarData.busy)) {
          for (const busy of calendarData.busy) {
            busyRanges.push({ start: busy.start, end: busy.end })
          }
        }
      } else {
        console.warn('[Google Calendar FreeBusy Warning]', await freeBusyRes.text())
      }
    } catch (gcalErr) {
      console.warn('[Google Calendar FreeBusy Fetch Error]', gcalErr)
    }
  }

  // 4. Mark slots as available/busy based on FreeBusy & DB collisions
  const evaluatedSlots = allSlots.map((slot) => {
    // A. Check local database collision
    const isDbReserved = isSlotBookedDb(dateStr, slot.startTime, slot.endTime)
    if (isDbReserved) {
      return { ...slot, available: false, reason: 'Already reserved' }
    }

    // B. Check Google Calendar FreeBusy overlap
    if (busyRanges.length > 0) {
      const slotStart = new Date(`${dateStr}T${slot.startTime}:00`).getTime()
      const slotEnd = new Date(`${dateStr}T${slot.endTime}:00`).getTime()

      for (const busy of busyRanges) {
        const bStart = new Date(busy.start).getTime()
        const bEnd = new Date(busy.end).getTime()

        // Overlap condition
        if (slotStart < bEnd && slotEnd > bStart) {
          return { ...slot, available: false, reason: 'Calendar conflict' }
        }
      }
    }

    return { ...slot, available: true }
  })

  const totalAvailable = evaluatedSlots.filter((s) => s.available).length

  return {
    date: dateStr,
    timezone,
    slots: evaluatedSlots,
    totalAvailable
  }
}

/**
 * Generate Google Calendar Web URL for manual 1-click calendar addition
 */
export function generateGoogleCalendarWebUrl(params: {
  title: string
  description: string
  startIso: string
  endIso: string
  timezone: string
}): string {
  // Format to Google Calendar URL string YYYYMMDDTHHmmss
  const formatUtc = (iso: string) => {
    const d = new Date(iso)
    return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  }

  const startFormatted = formatUtc(params.startIso)
  const endFormatted = formatUtc(params.endIso)

  const url = new URL('https://calendar.google.com/calendar/render')
  url.searchParams.set('action', 'TEMPLATE')
  url.searchParams.set('text', params.title)
  url.searchParams.set('details', params.description)
  url.searchParams.set('dates', `${startFormatted}/${endFormatted}`)
  url.searchParams.set('ctz', params.timezone)
  return url.toString()
}

/**
 * Create an architectural consultation booking and sync with Google Calendar API
 */
export async function createSessionBooking(
  booking: BookingRequestPayload
): Promise<BookingResult> {
  const {
    name,
    email,
    company,
    jobTitle = '',
    phone = '',
    areaOfInterest,
    challengeDescription,
    bookingDate,
    startTime,
    endTime,
    timezone,
    additionalContext = ''
  } = booking

  // 1. Rigorous Server-Side Slot Collision Check
  const isAlreadyBooked = isSlotBookedDb(bookingDate, startTime, endTime)
  if (isAlreadyBooked) {
    return {
      success: false,
      message: 'The requested time slot was just reserved by another attendee. Please select a different time slot.',
      error: 'SLOT_UNAVAILABLE'
    }
  }

  const now = new Date()
  const isoTimestamp = now.toISOString()
  const dateStr = isoTimestamp.slice(0, 10).replace(/-/g, '')
  const randomSuffix = Math.floor(1000 + Math.random() * 9000)
  const bookingId = `TG-BK-${dateStr}-${randomSuffix}`

  const eventTitle = `AI Architecture Session: ${company} — ${name}`
  const eventDescription = `TRUSTGRID.AI Executive AI Architecture & Strategy Briefing
============================================================
Attendee: ${name} (${jobTitle || 'Executive'})
Company: ${company}
Email: ${email}
Phone: ${phone || 'Not provided'}
Time Zone: ${timezone}

CONSULTATION FOCUS:
• Area of Interest: ${areaOfInterest}
• Challenge / Scope:
${challengeDescription}

${additionalContext ? `ADDITIONAL CONTEXT:\n${additionalContext}\n` : ''}
============================================================
Host: TRUSTGRID.AI Principal Systems Architecture Team
Global Operations: connect@trustgrid.ai | WhatsApp: +1 555 019 2834
CONFIDENTIALITY: Mutual NDA standards apply.`

  let googleCalendarEventId = ''
  let googleCalendarStatus = 'unconfigured'
  let meetLink = ''

  // 2. Google Calendar API v3 Event Insertion
  const token = await getGoogleServiceAccountToken()
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary'

  if (token) {
    try {
      const startDateTime = startTime.includes(':') && startTime.split(':').length === 3 
        ? `${bookingDate}T${startTime}` 
        : `${bookingDate}T${startTime}:00`
      const endDateTime = endTime.includes(':') && endTime.split(':').length === 3 
        ? `${bookingDate}T${endTime}` 
        : `${bookingDate}T${endTime}:00`

      const eventPayload = {
        summary: eventTitle,
        description: eventDescription,
        start: {
          dateTime: startDateTime,
          timeZone: timezone
        },
        end: {
          dateTime: endDateTime,
          timeZone: timezone
        },
        attendees: [
          { email: email.trim(), displayName: name.trim(), responseStatus: 'accepted' },
          { email: 'bv@trustflow.in', displayName: 'BV (TrustFlow Lead)' },
          { email: 'poojasri.aram@gmail.com', displayName: 'Poojasri (TrustGrid Leadership)' },
          { email: 'connect@trustgrid.ai', displayName: 'TRUSTGRID.AI Systems Lead' }
        ],
        conferenceData: {
          createRequest: {
            requestId: `meet_${bookingId}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' }
          }
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 30 }
          ]
        }
      }

      const createRes = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?conferenceDataVersion=1&sendUpdates=all`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(eventPayload)
        }
      )

      if (createRes.ok) {
        const createdEvent = await createRes.json()
        googleCalendarEventId = createdEvent.id || ''
        googleCalendarStatus = 'synced'
        meetLink = createdEvent.hangoutLink || createdEvent.conferenceData?.entryPoints?.[0]?.uri || ''
      } else {
        const errText = await createRes.text()
        console.error('[Google Calendar Event Creation Failed]', errText)
        googleCalendarStatus = 'api_error'
      }
    } catch (gcalErr: any) {
      console.error('[Google Calendar Event Dispatch Error]', gcalErr?.message || gcalErr)
      googleCalendarStatus = 'connection_error'
    }
  }

  // 3. Persist in Database
  const dbRecord: DbSessionBooking = {
    id: bookingId,
    name: name.trim(),
    email: email.trim(),
    company: company.trim(),
    job_title: jobTitle.trim(),
    phone: phone.trim(),
    area_of_interest: areaOfInterest,
    challenge_description: challengeDescription.trim(),
    booking_date: bookingDate,
    start_time: startTime,
    end_time: endTime,
    timezone,
    additional_context: additionalContext.trim(),
    google_calendar_event_id: googleCalendarEventId,
    google_calendar_status: googleCalendarStatus,
    meet_link: meetLink,
    status: 'confirmed',
    created_at: isoTimestamp,
    updated_at: isoTimestamp
  }

  try {
    insertBookingDb(dbRecord)
  } catch (dbErr: any) {
    console.error('[Session Booking DB Notice]', dbErr?.message || dbErr)
  }

  // 4. Generate Web Calendar Link
  const googleCalendarUrl = generateGoogleCalendarWebUrl({
    title: eventTitle,
    description: eventDescription,
    startIso: `${bookingDate}T${startTime}:00`,
    endIso: `${bookingDate}T${endTime}:00`,
    timezone
  })

  return {
    success: true,
    bookingId,
    eventTitle,
    date: bookingDate,
    startTime: formatTime12h(startTime),
    endTime: formatTime12h(endTime),
    timezone,
    googleCalendarEventId: googleCalendarEventId || undefined,
    meetLink: meetLink || undefined,
    googleCalendarUrl,
    message: 'Your session has been successfully booked with our Principal AI Architecture team.'
  }
}

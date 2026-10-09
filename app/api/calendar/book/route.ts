import { NextRequest, NextResponse } from 'next/server'
import { createSessionBooking, BookingRequestPayload } from '@/lib/services/google-calendar'
import { isValidEmail, isValidPhone } from '@/lib/validation'
import { normalizeLead } from '@/lib/lead-normalization'
import { createJiraLead } from '@/lib/jira-service'
import { getLeadsStore } from '@/app/api/leads/route'

export async function POST(req: NextRequest) {
  try {
    const body: BookingRequestPayload = await req.json()

    // 1. Rigorous Server-Side Input Validation
    const name = (body.name || '').trim()
    const email = (body.email || '').trim()
    const company = (body.company || '').trim()
    const jobTitle = (body.jobTitle || '').trim()
    const phone = (body.phone || '').trim()
    const areaOfInterest = (body.areaOfInterest || '').trim()
    const challengeDescription = (body.challengeDescription || '').trim()
    const bookingDate = (body.bookingDate || '').trim()
    const startTime = (body.startTime || '').trim()
    const endTime = (body.endTime || '').trim()
    const timezone = (body.timezone || 'America/New_York').trim()
    const additionalContext = (body.additionalContext || '').trim()

    const errors: Record<string, string> = {}

    if (!name || name.length < 2) {
      errors.name = 'Please provide your full name (minimum 2 characters).'
    }

    if (!email || !isValidEmail(email)) {
      errors.email = 'Please provide a valid business email address.'
    }

    if (!company || company.length < 2) {
      errors.company = 'Please provide your company name.'
    }

    if (phone && !isValidPhone(phone)) {
      errors.phone = 'Please provide a valid contact number.'
    }

    if (!areaOfInterest) {
      errors.areaOfInterest = 'Please select an area of interest.'
    }

    if (!challengeDescription || challengeDescription.length < 10) {
      errors.challengeDescription = 'Please provide a brief description of your challenge or requirement (minimum 10 characters).'
    }

    if (!bookingDate || !/^\d{4}-\d{2}-\d{2}$/.test(bookingDate)) {
      errors.bookingDate = 'Please select a valid consultation date.'
    }

    if (!startTime || !endTime) {
      errors.selectedSlot = 'Please select an available consultation time slot.'
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: Object.values(errors)[0],
          errors
        },
        { status: 400 }
      )
    }

    // 2. Execute Session Booking & Google Calendar sync
    const bookingResult = await createSessionBooking({
      name,
      email,
      company,
      jobTitle,
      phone,
      areaOfInterest,
      challengeDescription,
      bookingDate,
      startTime,
      endTime,
      timezone,
      additionalContext
    })

    if (!bookingResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: bookingResult.message,
          error: bookingResult.error
        },
        { status: 409 }
      )
    }

    // 3. Dispatch to Lead Handling & Jira for enterprise tracking
    try {
      const normalized = normalizeLead({
        submissionId: bookingResult.bookingId,
        formId: 'form_session_booking',
        formName: 'Executive AI Architecture Session Booking',
        form_type: 'TALK_TO_ARCHITECT',
        formType: 'TALK_TO_ARCHITECT',
        name,
        email,
        company,
        role: jobTitle,
        phone,
        requirement: `Area: ${areaOfInterest} | Date: ${bookingDate} (${startTime} - ${endTime} ${timezone}) | Challenge: ${challengeDescription}`,
        message: `Consultation Booked: ${bookingDate} at ${startTime} ${timezone}\n\nChallenge: ${challengeDescription}\nContext: ${additionalContext || 'None'}`,
        ctaSource: 'session_booking_flow',
        selectedSolutions: [areaOfInterest]
      })

      // Dispatch to Jira async
      createJiraLead(normalized).catch((err) => {
        console.warn('[Jira Lead Sync Notice]', err?.message || err)
      })

      // Dispatch automated email notification via Google Apps Script Webhook
      const defaultWebhookUrl =
        'https://script.google.com/macros/s/AKfycbxZ9QvaSdgCGE8t6btfwTSmfklZ6j5F0o_CPyqFJPvm7LMncLS85xQVP2ObqkWNy803/exec'
      const apiUrl =
        process.env.NEXT_PUBLIC_TRUSTGRID_FORM_API_URL ||
        process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL ||
        defaultWebhookUrl

      if (apiUrl && apiUrl.startsWith('http')) {
        const webhookPayload = {
          ...normalized.rawPayload,
          sheetName: 'Talk_To_Architect',
          sheet_name: 'Talk_To_Architect',
          formType: 'TALK_TO_ARCHITECT',
          leadId: bookingResult.bookingId,
          submissionId: bookingResult.bookingId,
          bookingId: bookingResult.bookingId,
          name,
          fullName: name,
          email,
          userEmail: email,
          work_email: email,
          attendeeEmail: email,
          company,
          role: jobTitle,
          designation: jobTitle,
          phone,
          mobile: phone,
          bookingDate,
          startTime: bookingResult.startTime || startTime,
          endTime: bookingResult.endTime || endTime,
          timezone,
          meetLink: bookingResult.meetLink || '',
          googleCalendarUrl: bookingResult.googleCalendarUrl || '',
          areaOfInterest,
          requirement: `Area: ${areaOfInterest} | Date: ${bookingDate} (${startTime} - ${endTime} ${timezone}) | Challenge: ${challengeDescription}`,
          challengeDescription,
          notificationEmails: ['poojasri.aram@gmail.com', 'bv@trustflow.in', 'connect@trustgrid.ai'],
          adminEmails: 'poojasri.aram@gmail.com, bv@trustflow.in, connect@trustgrid.ai',
          subject: `[Session Booked] ${areaOfInterest} — ${name} (${company})`,
          userSubject: `TRUSTGRID.AI — Meeting Confirmation: ${areaOfInterest} (${bookingDate})`,
          message: `Consultation Booked: ${bookingDate} from ${startTime} to ${endTime} (${timezone})\n\nAttendee: ${name} (${email})\nCompany: ${company}\nPhone: ${phone || 'N/A'}\nFocus: ${areaOfInterest}\nChallenge: ${challengeDescription}\nContext: ${additionalContext || 'None'}\n\nNotifications dispatched to: ${email}, poojasri.aram@gmail.com, bv@trustflow.in, connect@trustgrid.ai`
        }

        fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(webhookPayload)
        }).catch((webhookErr) => {
          console.warn('[Webhook Email Notification Notice]', webhookErr)
        })
      }

      // Register in memory store
      const leadsStore = getLeadsStore()
      leadsStore.set(bookingResult.bookingId!, {
        leadId: bookingResult.bookingId!,
        normalized,
        googleSheetStatus: 'Success',
        jiraResult: { status: 'Created' },
        createdAt: new Date().toISOString(),
        retryCount: 0
      })
    } catch (leadSyncErr) {
      console.warn('[Lead Sync Notice]', leadSyncErr)
    }

    return NextResponse.json(bookingResult)
  } catch (error: any) {
    console.error('[Session Booking API Error]', error)
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred while booking your session. Please try again or reach out to connect@trustgrid.ai.'
      },
      { status: 500 }
    )
  }
}

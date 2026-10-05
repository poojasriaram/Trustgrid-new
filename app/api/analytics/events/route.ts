import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db'
import { extractClientIp, maskIp, resolveGeoAndNetwork, evaluateSecurity } from '@/lib/network-intel'
import { classifyTraffic } from '@/lib/traffic-attribution'

export const runtime = 'nodejs'

const SESSION_TIMEOUT_MS = 30 * 60 * 1000 // 30 minutes

interface RawIncomingEvent {
  event_id?: string
  event_name: string
  event_category?: string
  event_action?: string
  session_id: string
  user_id: string
  page_path?: string
  page_title?: string
  referrer?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  device_type?: string
  operating_system?: string
  browser?: string
  screen_res?: string
  timezone?: string
  is_conversion?: boolean
  conversion_goal?: string
  dwell_time_sec?: number
  scroll_depth?: number
  consent_status?: 'granted' | 'denied'
  metadata?: Record<string, any>
}

/**
 * Dispatches event payload asynchronously to Google Apps Script (Sheet 1)
 * without blocking server-side ingestion response.
 */
async function dispatchAsyncToGoogleAppsScript(payload: any): Promise<void> {
  const url =
    process.env.NEXT_PUBLIC_TRUSTGRID_ANALYTICS_API_URL ||
    process.env.NEXT_PUBLIC_TRUSTGRID_FORM_API_URL ||
    process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL

  if (!url || !url.startsWith('http') || url.includes('YOUR_SCRIPT')) return

  try {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    }).catch(() => {})
  } catch (e) {
    // Non-blocking
  }
}

/**
 * POST /api/analytics/events
 * Central high-throughput telemetry and event ingestion endpoint.
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    if (!rawBody || !rawBody.trim()) {
      return NextResponse.json({ success: false, message: 'Empty payload' }, { status: 400 })
    }

    let parsed: any
    try {
      parsed = JSON.parse(rawBody)
    } catch (e) {
      return NextResponse.json({ success: false, message: 'Invalid JSON' }, { status: 400 })
    }

    const events: RawIncomingEvent[] = Array.isArray(parsed.events)
      ? parsed.events
      : [parsed]

    if (events.length === 0) {
      return NextResponse.json({ success: false, message: 'No events provided' }, { status: 400 })
    }

    const clientIp = extractClientIp(req.headers)
    const maskedIp = maskIp(clientIp)
    const userAgent = req.headers.get('user-agent') || ''
    const currentHost = req.headers.get('host') || 'trustgrid.ai'
    const nowUtc = new Date().toISOString()
    const nowMs = Date.now()

    // 1. Security Check on Client IP
    const secResult = evaluateSecurity(clientIp, events[0].page_path || '/', userAgent)
    if (secResult.isRateLimited) {
      return NextResponse.json(
        { success: false, message: 'Rate limit exceeded. Please throttle requests.' },
        { status: 429 }
      )
    }

    // 2. Resolve Geolocation & Network ASN
    const geo = await resolveGeoAndNetwork(clientIp, req.headers)

    const db = getDatabase()

    // Prepared statements for high-throughput batch execution
    const insertEventStmt = db.prepare(`
      INSERT INTO analytics_events (
        event_id, event_name, event_category, event_action, session_id, user_id,
        timestamp_utc, page_path, page_title, referrer, traffic_source,
        utm_source, utm_medium, utm_campaign, utm_term, utm_content,
        device_type, operating_system, browser, screen_res,
        country, country_code, region, city, timezone_browser, timezone_ip,
        ip_masked, asn, organization, isp, is_bounce, is_conversion, conversion_goal,
        dwell_time_sec, scroll_depth, metadata_json, created_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?
      )
    `)

    const getSessionStmt = db.prepare(`
      SELECT session_id, user_id, start_time_utc, last_activity_utc, pages_count, duration_sec, is_bounce, converted, entry_page
      FROM analytics_sessions WHERE session_id = ?
    `)

    const insertSessionStmt = db.prepare(`
      INSERT INTO analytics_sessions (
        session_id, user_id, start_time_utc, last_activity_utc, duration_sec,
        pages_count, entry_page, exit_page, traffic_source, utm_campaign,
        country, city, timezone_browser, ip_masked, is_bounce, converted, user_type
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const updateSessionStmt = db.prepare(`
      UPDATE analytics_sessions SET
        last_activity_utc = ?,
        duration_sec = ?,
        pages_count = pages_count + ?,
        exit_page = ?,
        is_bounce = ?,
        converted = CASE WHEN ? = 1 THEN 1 ELSE converted END
      WHERE session_id = ?
    `)

    const insertAttributionStmt = db.prepare(`
      INSERT INTO traffic_attribution (
        session_id, user_id, channel, source, medium, campaign, term, content,
        referrer_domain, landing_page, converted, timestamp_utc
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const processedEvents = []

    for (const ev of events) {
      const eventName = (ev.event_name || 'page_view').trim()
      let sessionId = ev.session_id ? String(ev.session_id).trim() : `tg_sess_${Date.now()}`
      let userId = ev.user_id ? String(ev.user_id).trim() : `tg_usr_${Date.now()}`
      const pagePath = (ev.page_path || '/').substring(0, 255)
      const pageTitle = (ev.page_title || '').substring(0, 255)
      const referrer = (ev.referrer || '').substring(0, 500)
      const eventId = ev.event_id || `tg_ev_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

      // Respect Privacy Signals (DNT / Global Privacy Control)
      const gpc = req.headers.get('Sec-GPC') === '1'
      const dnt = req.headers.get('DNT') === '1'
      if (gpc || dnt || ev.consent_status === 'denied') {
        userId = `anon_${maskedIp.replace(/[^a-zA-Z0-9]/g, '_')}`
      }

      // Traffic Attribution
      const traffic = classifyTraffic(
        referrer,
        ev.utm_source,
        ev.utm_medium,
        ev.utm_campaign,
        currentHost
      )

      const isConversion = Boolean(
        ev.is_conversion ||
        eventName === 'form_submit' ||
        eventName === 'lead_generated' ||
        eventName.includes('conversion')
      )

      // 3. Session State Resolution & Inactivity Timeout Check
      const existingSession = getSessionStmt.get(sessionId) as any

      let isBounce = 1
      let durationSec = 0

      if (existingSession) {
        const lastActivityMs = new Date(existingSession.last_activity_utc).getTime()
        const isExpired = nowMs - lastActivityMs > SESSION_TIMEOUT_MS

        if (isExpired) {
          // Timeout threshold reached: start fresh session ID
          sessionId = `tg_sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
          durationSec = 0
          isBounce = 1

          insertSessionStmt.run(
            sessionId,
            userId,
            nowUtc,
            nowUtc,
            0,
            1,
            pagePath,
            pagePath,
            traffic.channel,
            traffic.campaign || '',
            geo.country,
            geo.city,
            ev.timezone || geo.timezone,
            maskedIp,
            1,
            isConversion ? 1 : 0,
            'returning'
          )
        } else {
          const sessionStartMs = new Date(existingSession.start_time_utc).getTime()
          durationSec = Math.max(0, Math.round((nowMs - sessionStartMs) / 1000))

          const isNewPage = eventName === 'page_view' && existingSession.exit_page !== pagePath
          const newPagesCount = existingSession.pages_count + (isNewPage ? 1 : 0)

          // Bounce definition: <= 1 page AND < 15 seconds duration AND no conversion
          isBounce = (newPagesCount <= 1 && durationSec < 15 && !existingSession.converted && !isConversion) ? 1 : 0

          updateSessionStmt.run(
            nowUtc,
            durationSec,
            isNewPage ? 1 : 0,
            pagePath,
            isBounce,
            isConversion ? 1 : 0,
            sessionId
          )
        }
      } else {
        // First event of brand new session
        durationSec = 0
        isBounce = isConversion ? 0 : 1

        insertSessionStmt.run(
          sessionId,
          userId,
          nowUtc,
          nowUtc,
          0,
          1,
          pagePath,
          pagePath,
          traffic.channel,
          traffic.campaign || '',
          geo.country,
          geo.city,
          ev.timezone || geo.timezone,
          maskedIp,
          isBounce,
          isConversion ? 1 : 0,
          'new'
        )

        // Insert first-touch attribution record
        try {
          insertAttributionStmt.run(
            sessionId,
            userId,
            traffic.channel,
            traffic.source,
            traffic.medium,
            traffic.campaign,
            ev.utm_term || '',
            ev.utm_content || '',
            traffic.referrerDomain,
            pagePath,
            isConversion ? 1 : 0,
            nowUtc
          )
        } catch (e) {}
      }

      // 4. Insert enriched event into database
      try {
        insertEventStmt.run(
          eventId,
          eventName,
          ev.event_category || 'telemetry',
          ev.event_action || 'interaction',
          sessionId,
          userId,
          nowUtc,
          pagePath,
          pageTitle,
          referrer,
          traffic.channel,
          ev.utm_source || '',
          ev.utm_medium || '',
          ev.utm_campaign || '',
          ev.utm_term || '',
          ev.utm_content || '',
          ev.device_type || 'Desktop',
          ev.operating_system || 'Unknown',
          ev.browser || 'Unknown',
          ev.screen_res || '',
          geo.country,
          geo.countryCode,
          geo.region,
          geo.city,
          ev.timezone || 'UTC',
          geo.timezone,
          maskedIp,
          geo.asn,
          geo.organization,
          geo.isp,
          isBounce,
          isConversion ? 1 : 0,
          ev.conversion_goal || '',
          ev.dwell_time_sec || 0,
          ev.scroll_depth || 0,
          JSON.stringify(ev.metadata || {}),
          nowUtc
        )
      } catch (insertErr: any) {
        console.warn('[Event Insert Warning]', insertErr?.message)
      }

      processedEvents.push({
        eventId,
        eventName,
        sessionId,
        isBounce: Boolean(isBounce),
        durationSec
      })

      // Asynchronous non-blocking dispatch to Google Sheets webhook
      dispatchAsyncToGoogleAppsScript({
        sheetName: 'Live_Traffic_Events',
        event_type: 'telemetry_95',
        event_name: eventName,
        event_id: eventId,
        session_id: sessionId,
        user_id: userId,
        page: pagePath,
        page_path: pagePath,
        page_title: pageTitle,
        referrer_url: referrer,
        traffic_source: traffic.channel,
        utm_source: ev.utm_source || traffic.source || '',
        utm_medium: ev.utm_medium || traffic.medium || '',
        utm_campaign: ev.utm_campaign || traffic.campaign || '',
        utm_term: ev.utm_term || '',
        utm_content: ev.utm_content || '',
        device_type: ev.device_type || 'Desktop',
        operating_system: ev.operating_system || 'Unknown',
        browser: ev.browser || 'Unknown',
        geo_country: geo.country,
        geo_state: geo.region,
        geo_city: geo.city,
        geo_latitude: geo.latitude,
        geo_longitude: geo.longitude,
        timezone: ev.timezone || geo.timezone,
        ip_address: maskedIp,
        bounce: isBounce ? 1 : 0,
        goal_completed: isConversion ? 1 : 0,
        conversion_id: isConversion ? eventId : '',
        timestamp: nowUtc,
        session_record: {
          session_id: sessionId,
          user_id: userId,
          start_time_utc: existingSession?.start_time_utc || nowUtc,
          last_activity_utc: nowUtc,
          duration_sec: durationSec,
          pages_count: existingSession ? existingSession.pages_count + 1 : 1,
          entry_page: existingSession?.entry_page || pagePath,
          exit_page: pagePath,
          traffic_source: traffic.channel,
          utm_campaign: traffic.campaign || '',
          country: geo.country,
          city: geo.city,
          timezone: ev.timezone || geo.timezone,
          ip_masked: maskedIp,
          is_bounce: isBounce,
          converted: isConversion ? 1 : 0,
          user_type: existingSession ? 'returning' : 'new'
        },
        attribution_record: {
          session_id: sessionId,
          user_id: userId,
          channel: traffic.channel,
          source: traffic.source,
          medium: traffic.medium,
          campaign: traffic.campaign,
          term: ev.utm_term || '',
          content: ev.utm_content || '',
          referrer_domain: traffic.referrerDomain,
          landing_page: pagePath,
          converted: isConversion ? 1 : 0,
          timestamp_utc: nowUtc
        }
      })
    }

    return NextResponse.json({
      success: true,
      processed: processedEvents.length,
      events: processedEvents
    })
  } catch (error: any) {
    console.error('[Analytics Ingestion Error]', error)
    return NextResponse.json(
      { success: false, message: 'Server error processing analytics event', error: error?.message },
      { status: 500 }
    )
  }
}

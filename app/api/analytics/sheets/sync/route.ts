import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db'

export const runtime = 'nodejs'

const SHEET1_ID = process.env.NEXT_PUBLIC_SHEET1_ID || '1z2kBM_90kYX_MXWknlQ7UHnsBms4EQ9p6aXukUBHYT0'
const SHEET2_ID = process.env.NEXT_PUBLIC_SHEET2_ID || '1jC53QN1qiuiRFLzdneA46TECBztER5btTo7qGphb5TM'
const SHEET1_URL = `https://docs.google.com/spreadsheets/d/${SHEET1_ID}`
const SHEET2_URL = `https://docs.google.com/spreadsheets/d/${SHEET2_ID}`

/**
 * Executes bidirectional / outward synchronization of local SQLite intelligence
 * to Google Apps Script Webhook (Sheet 1) for executive aggregation in Sheet 2.
 */
async function performSync() {
  const db = getDatabase()
  const webhookUrl =
    process.env.NEXT_PUBLIC_TRUSTGRID_FORM_API_URL ||
    process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL ||
    process.env.NEXT_PUBLIC_TRUSTGRID_ANALYTICS_API_URL

  if (!webhookUrl || !webhookUrl.startsWith('http') || webhookUrl.includes('YOUR_SCRIPT')) {
    return {
      success: false,
      message: 'No valid Google Apps Script Webhook URL configured in environment.',
      sheet1_url: SHEET1_URL,
      sheet2_url: SHEET2_URL,
      synced: { sessions: 0, traffic: 0, geo: 0, security: 0, events: 0 }
    }
  }

  // 1. Fetch Sessions
  const sessions = db.prepare(`
    SELECT
      session_id, user_id, start_time_utc, last_activity_utc, duration_sec,
      pages_count, entry_page, exit_page, traffic_source, utm_campaign,
      country, city, timezone_browser, ip_masked, is_bounce, converted, user_type
    FROM analytics_sessions
    ORDER BY last_activity_utc DESC
    LIMIT 200
  `).all().map((r: any) => ({
    session_id: r.session_id,
    user_id: r.user_id,
    start_time_utc: r.start_time_utc,
    last_activity_utc: r.last_activity_utc,
    duration_sec: r.duration_sec,
    pages_count: r.pages_count,
    entry_page: r.entry_page,
    exit_page: r.exit_page,
    traffic_source: r.traffic_source,
    channel: r.traffic_source,
    campaign: r.utm_campaign,
    country: r.country,
    city: r.city,
    timezone: r.timezone_browser,
    ip_masked: r.ip_masked,
    is_bounce: r.is_bounce,
    bounce: r.is_bounce,
    converted: r.converted,
    user_type: r.user_type,
    timestamp: r.last_activity_utc
  }))

  // 2. Fetch Traffic Attribution
  const traffic = db.prepare(`
    SELECT
      session_id, user_id, channel, source, medium, campaign, term, content,
      referrer_domain, landing_page, converted, timestamp_utc
    FROM traffic_attribution
    ORDER BY timestamp_utc DESC
    LIMIT 200
  `).all().map((r: any) => ({
    session_id: r.session_id,
    user_id: r.user_id,
    channel: r.channel,
    source: r.source,
    medium: r.medium,
    campaign: r.campaign,
    term: r.term,
    content: r.content,
    referrer_domain: r.referrer_domain,
    landing_page: r.landing_page,
    converted: r.converted,
    timestamp_utc: r.timestamp_utc,
    timestamp: r.timestamp_utc
  }))

  // 3. Fetch Geo Intelligence (distinct recent points)
  const geo = db.prepare(`
    SELECT DISTINCT
      geo_country AS country,
      geo_country_code AS country_code,
      geo_region AS region,
      geo_city AS city,
      geo_timezone AS timezone,
      ip_masked,
      asn,
      organization,
      isp,
      timestamp_utc
    FROM analytics_events
    WHERE geo_country != 'Unknown' AND geo_country IS NOT NULL
    ORDER BY timestamp_utc DESC
    LIMIT 150
  `).all().map((r: any) => ({
    timestamp_utc: r.timestamp_utc,
    country: r.country,
    country_code: r.country_code,
    region: r.region,
    city: r.city,
    timezone: r.timezone,
    ip_masked: r.ip_masked,
    asn: r.asn,
    organization: r.organization,
    isp: r.isp
  }))

  // 4. Fetch Network Security Events
  const security = db.prepare(`
    SELECT
      event_id, timestamp_utc, ip_masked, threat_category, severity,
      description, target_path, is_blocked, action_taken
    FROM security_events
    ORDER BY timestamp_utc DESC
    LIMIT 100
  `).all().map((r: any) => ({
    timestamp_utc: r.timestamp_utc,
    ip_masked: r.ip_masked,
    threat_category: r.threat_category,
    severity: r.severity,
    description: r.description,
    target_path: r.target_path,
    blocked: r.is_blocked,
    action_taken: r.action_taken
  }))

  // 5. Fetch Events (telemetry_95 schema compatible)
  const events = db.prepare(`
    SELECT
      event_id, event_name, event_category, event_action, session_id, user_id,
      timestamp_utc, page_path, page_title, referrer_url, traffic_channel,
      utm_source, utm_medium, utm_campaign, utm_term, utm_content,
      device_type, operating_system, browser, screen_resolution,
      geo_country, geo_country_code, geo_region, geo_city,
      timezone_client, timezone_server, ip_masked, is_bounce, is_conversion,
      dwell_time_sec, scroll_depth
    FROM analytics_events
    ORDER BY timestamp_utc DESC
    LIMIT 200
  `).all().map((r: any) => ({
    event_id: r.event_id,
    event_name: r.event_name,
    event_category: r.event_category,
    event_action: r.event_action,
    session_id: r.session_id,
    user_id: r.user_id,
    timestamp: r.timestamp_utc,
    page: r.page_path,
    page_path: r.page_path,
    page_title: r.page_title,
    referrer_url: r.referrer_url,
    traffic_source: r.traffic_channel,
    utm_source: r.utm_source,
    utm_medium: r.utm_medium,
    utm_campaign: r.utm_campaign,
    utm_term: r.utm_term,
    utm_content: r.utm_content,
    device_type: r.device_type,
    operating_system: r.operating_system,
    browser: r.browser,
    screen_resolution: r.screen_resolution,
    geo_country: r.geo_country,
    geo_state: r.geo_region,
    geo_city: r.geo_city,
    timezone: r.timezone_client,
    ip_address: r.ip_masked,
    bounce: r.is_bounce,
    goal_completed: r.is_conversion
  }))

  const payload = {
    action: 'sync_intelligence',
    sync: true,
    timestamp: new Date().toISOString(),
    sessions,
    traffic,
    geo,
    security,
    events
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    })

    const text = await res.text()
    let parsed: any = null
    try {
      parsed = JSON.parse(text)
    } catch (e) {
      parsed = { status: text }
    }

    return {
      success: true,
      message: 'Successfully synchronized local intelligence with Google Sheet 1.',
      remote_response: parsed,
      sheet1_id: SHEET1_ID,
      sheet2_id: SHEET2_ID,
      sheet1_url: SHEET1_URL,
      sheet2_url: SHEET2_URL,
      synced: {
        sessions: sessions.length,
        traffic: traffic.length,
        geo: geo.length,
        security: security.length,
        events: events.length
      }
    }
  } catch (err: any) {
    return {
      success: false,
      message: `Failed to deliver payload to Google Sheets webhook: ${err?.message}`,
      sheet1_url: SHEET1_URL,
      sheet2_url: SHEET2_URL,
      synced: {
        sessions: sessions.length,
        traffic: traffic.length,
        geo: geo.length,
        security: security.length,
        events: events.length
      }
    }
  }
}

export async function GET() {
  const result = await performSync()
  return NextResponse.json(result, { status: result.success ? 200 : 500 })
}

export async function POST() {
  const result = await performSync()
  return NextResponse.json(result, { status: result.success ? 200 : 500 })
}

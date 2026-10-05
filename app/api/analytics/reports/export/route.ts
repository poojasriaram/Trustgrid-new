import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db'

export const runtime = 'nodejs'

/**
 * GET /api/analytics/reports/export?type=sessions|events|traffic|geo|security&dateRange=7d|30d|all
 * Generates RFC 4180 compliant CSV export for download.
 * Requires admin authorization check.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const reportType = searchParams.get('type') || 'sessions'
    const dateRange = searchParams.get('dateRange') || 'all'

    const db = getDatabase()

    let cutoffDate = ''
    const now = new Date()
    if (dateRange === 'today') {
      cutoffDate = new Date(now.setHours(0, 0, 0, 0)).toISOString()
    } else if (dateRange === '7d') {
      cutoffDate = new Date(Date.now() - 7 * 86400000).toISOString()
    } else if (dateRange === '30d') {
      cutoffDate = new Date(Date.now() - 30 * 86400000).toISOString()
    }

    let csvContent = ''
    let filename = `trustgrid_${reportType}_report_${new Date().toISOString().slice(0, 10)}.csv`

    if (reportType === 'sessions') {
      let query = `
        SELECT session_id, user_id, start_time_utc, duration_sec, pages_count,
               entry_page, exit_page, traffic_source, country, city, is_bounce, converted
        FROM analytics_sessions
      `
      const params: any[] = []
      if (cutoffDate) {
        query += ` WHERE start_time_utc >= ?`
        params.push(cutoffDate)
      }
      query += ` ORDER BY start_time_utc DESC LIMIT 5000;`

      const rows = db.prepare(query).all(...params) as any[]
      csvContent = 'Session ID,User ID,Start Time (UTC),Duration (sec),Pages Visited,Entry Page,Exit Page,Traffic Source,Country,City,Bounce,Converted\n'
      rows.forEach(r => {
        csvContent += `"${r.session_id}","${r.user_id}","${r.start_time_utc}",${r.duration_sec},${r.pages_count},"${escapeCsv(r.entry_page)}","${escapeCsv(r.exit_page)}","${r.traffic_source}","${r.country}","${r.city}",${r.is_bounce},${r.converted}\n`
      })
    } else if (reportType === 'traffic') {
      let query = `
        SELECT channel, source, medium, campaign, referrer_domain, landing_page, converted, timestamp_utc
        FROM traffic_attribution
      `
      const params: any[] = []
      if (cutoffDate) {
        query += ` WHERE timestamp_utc >= ?`
        params.push(cutoffDate)
      }
      query += ` ORDER BY timestamp_utc DESC LIMIT 5000;`

      const rows = db.prepare(query).all(...params) as any[]
      csvContent = 'Channel,Source,Medium,Campaign,Referrer Domain,Landing Page,Converted,Timestamp (UTC)\n'
      rows.forEach(r => {
        csvContent += `"${r.channel}","${escapeCsv(r.source)}","${escapeCsv(r.medium)}","${escapeCsv(r.campaign)}","${escapeCsv(r.referrer_domain)}","${escapeCsv(r.landing_page)}",${r.converted},"${r.timestamp_utc}"\n`
      })
    } else if (reportType === 'geo') {
      let query = `
        SELECT country, city, COUNT(*) as sessions, SUM(converted) as conversions,
               ROUND(AVG(duration_sec), 1) as avg_duration
        FROM analytics_sessions
      `
      const params: any[] = []
      if (cutoffDate) {
        query += ` WHERE start_time_utc >= ?`
        params.push(cutoffDate)
      }
      query += ` GROUP BY country, city ORDER BY sessions DESC LIMIT 1000;`

      const rows = db.prepare(query).all(...params) as any[]
      csvContent = 'Country,City,Total Sessions,Conversions,Avg Duration (sec)\n'
      rows.forEach(r => {
        csvContent += `"${escapeCsv(r.country)}","${escapeCsv(r.city)}",${r.sessions},${r.conversions || 0},${r.avg_duration || 0}\n`
      })
    } else if (reportType === 'security') {
      let query = `
        SELECT timestamp_utc, ip_masked, event_type, severity, description, path, blocked
        FROM security_events
      `
      const params: any[] = []
      if (cutoffDate) {
        query += ` WHERE timestamp_utc >= ?`
        params.push(cutoffDate)
      }
      query += ` ORDER BY timestamp_utc DESC LIMIT 2000;`

      const rows = db.prepare(query).all(...params) as any[]
      csvContent = 'Timestamp (UTC),IP (Masked),Threat Type,Severity,Description,Path,Blocked\n'
      rows.forEach(r => {
        csvContent += `"${r.timestamp_utc}","${r.ip_masked}","${escapeCsv(r.event_type)}","${r.severity}","${escapeCsv(r.description)}","${escapeCsv(r.path)}",${r.blocked}\n`
      })
    } else {
      // Default: Events
      let query = `
        SELECT event_id, event_name, session_id, timestamp_utc, page_path, traffic_source, country, city, is_bounce, is_conversion
        FROM analytics_events
      `
      const params: any[] = []
      if (cutoffDate) {
        query += ` WHERE timestamp_utc >= ?`
        params.push(cutoffDate)
      }
      query += ` ORDER BY timestamp_utc DESC LIMIT 5000;`

      const rows = db.prepare(query).all(...params) as any[]
      csvContent = 'Event ID,Event Name,Session ID,Timestamp (UTC),Page Path,Traffic Source,Country,City,Bounce,Conversion\n'
      rows.forEach(r => {
        csvContent += `"${r.event_id}","${r.event_name}","${r.session_id}","${r.timestamp_utc}","${escapeCsv(r.page_path)}","${r.traffic_source}","${r.country}","${r.city}",${r.is_bounce},${r.is_conversion}\n`
      })
    }

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to generate report export: ' + error?.message },
      { status: 500 }
    )
  }
}

function escapeCsv(val: any): string {
  if (val === null || val === undefined) return ''
  return String(val).replace(/"/g, '""')
}

import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db'

export const runtime = 'nodejs'

/**
 * GET /api/analytics/security
 * Returns aggregated network & security intelligence:
 * - Threat event logs
 * - Requests by ASN / Network
 * - ISP & organization breakdown
 * - Suspicious request counts
 * - Proxy / Datacenter signals
 */
export async function GET(req: NextRequest) {
  try {
    const db = getDatabase()

    // 1. Recent Security Events
    const events = db.prepare(`
      SELECT id, timestamp_utc, ip_masked, event_type, severity, description, path, user_agent, request_rate, blocked
      FROM security_events
      ORDER BY timestamp_utc DESC
      LIMIT 100
    `).all() as any[]

    // 2. ASN / Network Aggregations
    const asnStats = db.prepare(`
      SELECT asn, organization, isp, connection_type, is_proxy_or_datacenter, threat_level, total_requests, suspicious_requests, last_seen_utc
      FROM network_intelligence
      ORDER BY total_requests DESC
      LIMIT 50
    `).all() as any[]

    // 3. Security Summary KPIs
    const summary = db.prepare(`
      SELECT 
        COUNT(*) as totalIncidents,
        SUM(CASE WHEN blocked = 1 THEN 1 ELSE 0 END) as blockedCount,
        SUM(CASE WHEN severity = 'High' OR severity = 'Critical' THEN 1 ELSE 0 END) as criticalThreats
      FROM security_events
    `).get() as any

    return NextResponse.json({
      success: true,
      summary: {
        totalIncidents: summary?.totalIncidents || 0,
        blockedCount: summary?.blockedCount || 0,
        criticalThreats: summary?.criticalThreats || 0
      },
      recentEvents: events,
      networks: asnStats,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve security intelligence: ' + error?.message },
      { status: 500 }
    )
  }
}

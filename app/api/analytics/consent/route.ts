import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db'
import { extractClientIp, maskIp } from '@/lib/network-intel'

export const runtime = 'nodejs'

/**
 * POST /api/analytics/consent
 * Persists user cookie & analytics consent preferences
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, consentStatus, analyticsAllowed, marketingAllowed } = body

    if (!userId) {
      return NextResponse.json({ success: false, message: 'Missing user ID' }, { status: 400 })
    }

    const clientIp = extractClientIp(req.headers)
    const masked = maskIp(clientIp)
    const now = new Date().toISOString()

    const db = getDatabase()
    const stmt = db.prepare(`
      INSERT INTO privacy_consent (
        user_id, consent_status, analytics_allowed, marketing_allowed, ip_masked, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(user_id) DO UPDATE SET
        consent_status = excluded.consent_status,
        analytics_allowed = excluded.analytics_allowed,
        marketing_allowed = excluded.marketing_allowed,
        ip_masked = excluded.ip_masked,
        updated_at = excluded.updated_at
    `)

    stmt.run(
      userId,
      consentStatus || 'granted',
      analyticsAllowed !== false ? 1 : 0,
      marketingAllowed === true ? 1 : 0,
      masked,
      now
    )

    return NextResponse.json({
      success: true,
      message: 'Privacy consent preferences updated',
      timestamp: now
    })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to record consent: ' + err?.message },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import {
  getLinkedInStatus,
  disconnectLinkedIn,
  verifyOrganizationAccess,
  getActiveAccessToken,
  getLinkedInConfig,
  processDueScheduledPosts
} from '@/lib/services/linkedin'
import { getAllLinkedInPostsDb } from '@/lib/db/leads'

export const dynamic = 'force-dynamic'

/**
 * GET /api/linkedin/status
 * Returns connection and organization status without exposing tokens or secrets.
 */
export async function GET() {
  try {
    // Process any due scheduled posts passively
    try {
      await processDueScheduledPosts()
    } catch {}

    const status = await getLinkedInStatus('admin')
    const token = getActiveAccessToken('admin')
    const config = getLinkedInConfig()

    let orgVerification = {
      verified: false,
      role: 'Not Verified',
      error: undefined as string | undefined
    }

    if (token && config.organizationId) {
      try {
        const verifyRes = await verifyOrganizationAccess(token, config.organizationId)
        orgVerification = {
          verified: verifyRes.hasAccess,
          role: verifyRes.role || (verifyRes.hasAccess ? 'ADMINISTRATOR' : 'NO_ACCESS'),
          error: verifyRes.error
        }
      } catch (e: any) {
        orgVerification = {
          verified: false,
          role: 'Error',
          error: e?.message
        }
      }
    }

    const posts = getAllLinkedInPostsDb(5)

    return NextResponse.json({
      success: true,
      connected: status.connected,
      connectedAt: status.connectedAt,
      accountName: status.accountName,
      email: status.email,
      pageName: 'TRUSTGRID.AI',
      organizationIdMasked: status.organizationIdMasked,
      organizationUrn: status.organizationUrn,
      isConfigured: status.isConfigured,
      missingConfig: status.missingConfig,
      orgVerification,
      recentPostsCount: posts.length,
      recentPosts: posts.map(p => ({
        id: p.id,
        textPreview: p.text.slice(0, 120),
        status: p.status,
        publishedAt: p.published_at,
        scheduledAt: p.scheduled_at,
        linkedinPostId: p.linkedin_post_id
      }))
    })
  } catch (error: any) {
    console.error('[LinkedIn Status API Error]', error?.message || error)
    return NextResponse.json(
      {
        success: false,
        connected: false,
        pageName: 'TRUSTGRID.AI',
        message: 'Unable to query LinkedIn integration status.'
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/linkedin/status
 * Supports disconnecting or re-verifying connection
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (body.action === 'disconnect') {
      await disconnectLinkedIn('admin')
      return NextResponse.json({
        success: true,
        connected: false,
        message: 'LinkedIn connection removed successfully.'
      })
    }

    if (body.action === 'verify') {
      const token = getActiveAccessToken('admin')
      const config = getLinkedInConfig()
      if (!token) {
        return NextResponse.json({
          success: false,
          connected: false,
          message: 'No active LinkedIn token found.'
        })
      }
      const verifyRes = await verifyOrganizationAccess(token, config.organizationId)
      return NextResponse.json({
        success: true,
        connected: true,
        ...verifyRes
      })
    }

    return NextResponse.json(
      { success: false, message: 'Invalid action provided.' },
      { status: 400 }
    )
  } catch (error: any) {
    console.error('[LinkedIn Status Action Error]', error?.message || error)
    return NextResponse.json(
      { success: false, message: 'Action failed to execute.' },
      { status: 500 }
    )
  }
}

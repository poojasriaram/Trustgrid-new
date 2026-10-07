import { NextRequest, NextResponse } from 'next/server'
import {
  publishLinkedInOrganizationPost,
  getLinkedInConfig,
  getActiveAccessToken,
  verifyOrganizationAccess
} from '@/lib/services/linkedin'

export const dynamic = 'force-dynamic'

/**
 * POST /api/linkedin/post
 * Publishes content directly to the TRUSTGRID.AI LinkedIn Company Page.
 * 
 * Payload:
 * {
 *   "text": "...",
 *   "visibility": "PUBLIC"
 * }
 * 
 * Strict Rules:
 * - Post author is strictly urn:li:organization:{LINKEDIN_ORGANIZATION_ID}
 * - Never publishes as a personal author.
 * - Validates organization access and posting permissions.
 * - Persists post status and LinkedIn response ID in SQLite.
 * - Never exposes credentials or tokens in response.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { text, visibility = 'PUBLIC', image } = body

    if (!text || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Post text is required and cannot be empty.'
        },
        { status: 400 }
      )
    }

    const config = getLinkedInConfig()
    if (!config.organizationId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing organization configuration. Please set LINKEDIN_ORGANIZATION_ID in server environment variables.'
        },
        { status: 500 }
      )
    }

    const token = getActiveAccessToken('admin')
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: 'No active LinkedIn authorization token found. Please connect your LinkedIn administrator account first.'
        },
        { status: 401 }
      )
    }

    // Verify organization administrator permissions before publishing
    const accessCheck = await verifyOrganizationAccess(token, config.organizationId)
    if (!accessCheck.hasAccess) {
      return NextResponse.json(
        {
          success: false,
          error: accessCheck.error || 'LinkedIn authorization succeeded, but this account does not have permission to publish to the TRUSTGRID.AI LinkedIn Page.'
        },
        { status: 403 }
      )
    }

    // Publish to LinkedIn Company Page
    const publishResult = await publishLinkedInOrganizationPost({
      text: text.trim(),
      visibility: visibility === 'CONNECTIONS' ? 'CONNECTIONS' : 'PUBLIC',
      image: typeof image === 'string' && image.trim() ? image.trim() : undefined
    })

    if (!publishResult.success) {
      return NextResponse.json(
        {
          success: false,
          postId: publishResult.postId,
          status: 'FAILED',
          error: publishResult.error || 'Failed to publish post to TRUSTGRID.AI LinkedIn Company Page.'
        },
        { status: 502 }
      )
    }

    return NextResponse.json({
      success: true,
      postId: publishResult.postId,
      linkedinPostId: publishResult.linkedinPostId,
      publishedAt: publishResult.publishedAt,
      organizationUrn: publishResult.organizationUrn,
      status: 'PUBLISHED',
      message: 'Post published successfully to TRUSTGRID.AI LinkedIn Page.'
    })
  } catch (error: any) {
    console.error('[LinkedIn Publish Endpoint Error]', error?.message || error)
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Internal server error while publishing to LinkedIn.'
      },
      { status: 500 }
    )
  }
}

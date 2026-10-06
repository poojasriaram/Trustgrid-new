import { NextResponse } from 'next/server'
import { getLinkedInConnectionDb } from '@/lib/db/leads'
import { fetchLinkedInUserInfo } from '@/lib/services/linkedin'

export const dynamic = 'force-dynamic'

/**
 * GET /api/services/linkedin/profile
 * Fetches the authenticated user profile directly from LinkedIn's API
 * using the server-side stored access token.
 */
export async function GET() {
  try {
    const conn = getLinkedInConnectionDb('admin')
    if (!conn || !conn.access_token) {
      return NextResponse.json(
        {
          success: false,
          connected: false,
          message: 'No active LinkedIn connection found. Please connect your LinkedIn account first.'
        },
        { status: 401 }
      )
    }

    // Call LinkedIn OpenID Connect UserInfo API with the stored access token
    const profile = await fetchLinkedInUserInfo(conn.access_token)

    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to fetch profile from LinkedIn API. The access token may be expired or revoked.'
        },
        { status: 502 }
      )
    }

    return NextResponse.json({
      success: true,
      connected: true,
      accountName: conn.account_name,
      profile: {
        name: profile.name,
        email: profile.email,
        sub: profile.sub,
        picture: profile.picture
      },
      connectedAt: conn.created_at
    })
  } catch (error: any) {
    console.error('[LinkedIn Fetch Profile Error]', error?.message || error)
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error while fetching from LinkedIn.'
      },
      { status: 500 }
    )
  }
}

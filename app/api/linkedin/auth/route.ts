import { NextRequest, NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { getLinkedInAuthorizationUrl } from '@/lib/services/linkedin'

export const dynamic = 'force-dynamic'

/**
 * GET /api/linkedin/auth
 * Initiates the LinkedIn OAuth 2.0 Authorization Code Flow for the
 * TRUSTGRID.AI Company Page integration.
 * 
 * - Generates cryptographically secure CSRF state
 * - Uses LINKEDIN_CLIENT_ID and LINKEDIN_REDIRECT_URI
 * - Requests organization publishing permissions (w_organization_social, etc.)
 * - Redirects administrator to LinkedIn authorization screen
 * - Never exposes Client Secret to browser
 */
export async function GET(req: NextRequest) {
  try {
    const state = crypto.randomBytes(32).toString('hex')

    const hostHeader = req.headers.get('host')
    const protoHeader = req.headers.get('x-forwarded-proto') || 'https'
    let redirectUriOverride: string | undefined

    if (process.env.LINKEDIN_REDIRECT_URI) {
      redirectUriOverride = process.env.LINKEDIN_REDIRECT_URI
    } else if (hostHeader) {
      redirectUriOverride = `${protoHeader}://${hostHeader}/api/linkedin/callback`
    }

    const authUrl = getLinkedInAuthorizationUrl(state, redirectUriOverride)

    const response = NextResponse.redirect(authUrl)

    response.cookies.set('tg_linkedin_oauth_state', state, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 // 15 minutes
    })

    return response
  } catch (error: any) {
    console.error('[LinkedIn OAuth Auth Error]', error?.message || error)
    const baseUrl = req.nextUrl.origin || 'https://trustgrid.ai'
    return NextResponse.redirect(
      `${baseUrl}/analytics?tab=linkedin-automation&linkedin_status=error&message=${encodeURIComponent(
        error?.message || 'Failed to initiate LinkedIn authorization. Please verify environment credentials.'
      )}`
    )
  }
}

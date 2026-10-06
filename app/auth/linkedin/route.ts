import { NextRequest, NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { getLinkedInAuthorizationUrl } from '@/lib/services/linkedin'

export const dynamic = 'force-dynamic'

/**
 * GET /auth/linkedin
 * Initiates the LinkedIn OAuth 2.0 Authorization Code Flow.
 * Generates cryptographically secure state, stores CSRF cookie & DB state,
 * and redirects the user to LinkedIn's OAuth login screen.
 */
export async function GET(req: NextRequest) {
  try {
    // 1. Generate cryptographically strong random state parameter
    const state = crypto.randomBytes(32).toString('hex')

    // 2. Derive redirect URI based on environment or request origin
    const hostHeader = req.headers.get('host')
    const protoHeader = req.headers.get('x-forwarded-proto') || 'https'
    let redirectUriOverride: string | undefined

    if (process.env.LINKEDIN_REDIRECT_URI) {
      redirectUriOverride = process.env.LINKEDIN_REDIRECT_URI
    } else if (hostHeader) {
      redirectUriOverride = `${protoHeader}://${hostHeader}/auth/linkedin/callback`
    }

    // 3. Build authorization URL
    const authUrl = getLinkedInAuthorizationUrl(state, redirectUriOverride)

    // 4. Construct response with redirect and secure HTTP-Only cookie
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
    console.error('[LinkedIn OAuth Initiation Error]', error?.message || error)
    const baseUrl = req.nextUrl.origin || 'https://trustgrid.ai'
    return NextResponse.redirect(
      `${baseUrl}/?linkedin_status=error&message=${encodeURIComponent('Failed to initiate LinkedIn authorization. Please try again.')}#integrated-services`
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import {
  exchangeLinkedInCodeForToken,
  fetchLinkedInUserInfo,
  saveLinkedInConnection,
  verifyLinkedInOAuthState
} from '@/lib/services/linkedin'

export const dynamic = 'force-dynamic'

/**
 * GET /auth/linkedin/callback
 * Handles OAuth 2.0 authorization code redirect from LinkedIn.
 * Validates CSRF state, exchanges code for access token server-side,
 * securely persists token in SQLite database, and redirects back to UI.
 */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const oauthError = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  const origin = req.nextUrl.origin || 'https://trustgrid.ai'
  const redirectTarget = (status: 'success' | 'error', msg?: string) => {
    const url = new URL('/', origin)
    url.searchParams.set('linkedin_status', status)
    if (msg) url.searchParams.set('message', msg)
    url.hash = 'integrated-services'
    return url.toString()
  }

  // 1. Handle user denied / OAuth error response
  if (oauthError) {
    console.warn('[LinkedIn OAuth Callback] User denied or OAuth error returned:', oauthError, errorDescription)
    const res = NextResponse.redirect(
      redirectTarget('error', 'LinkedIn authorization was cancelled or denied.')
    )
    res.cookies.delete('tg_linkedin_oauth_state')
    return res
  }

  // 2. Validate state parameter (CSRF Protection)
  const stateCookie = req.cookies.get('tg_linkedin_oauth_state')?.value
  const isValidStateInDb = state ? verifyLinkedInOAuthState(state) : false
  const matchesCookie = state && stateCookie && state === stateCookie

  if (!state || (!matchesCookie && !isValidStateInDb)) {
    console.warn('[LinkedIn OAuth Callback] CSRF State validation failed. Possible tampered request.')
    const res = NextResponse.redirect(
      redirectTarget('error', 'LinkedIn connection failed. CSRF security verification failed.')
    )
    res.cookies.delete('tg_linkedin_oauth_state')
    return res
  }

  // 3. Validate code presence
  if (!code) {
    console.warn('[LinkedIn OAuth Callback] Missing authorization code in query params.')
    const res = NextResponse.redirect(
      redirectTarget('error', 'Missing authorization code from LinkedIn.')
    )
    res.cookies.delete('tg_linkedin_oauth_state')
    return res
  }

  // 4. Server-Side Token Exchange
  try {
    const hostHeader = req.headers.get('host')
    const protoHeader = req.headers.get('x-forwarded-proto') || 'https'
    let redirectUriOverride: string | undefined

    if (process.env.LINKEDIN_REDIRECT_URI) {
      redirectUriOverride = process.env.LINKEDIN_REDIRECT_URI
    } else if (hostHeader) {
      redirectUriOverride = `${protoHeader}://${hostHeader}/auth/linkedin/callback`
    }

    const tokenData = await exchangeLinkedInCodeForToken(code, redirectUriOverride)

    // 5. Fetch authorized user profile details using OpenID Connect userinfo endpoint
    let profileData = null
    try {
      profileData = await fetchLinkedInUserInfo(tokenData.accessToken)
    } catch (profileErr) {
      console.warn('[LinkedIn OAuth Callback] Non-fatal userinfo fetch notice:', profileErr)
    }

    // 6. Secure server-side storage in SQLite
    await saveLinkedInConnection({
      accessToken: tokenData.accessToken,
      refreshToken: tokenData.refreshToken,
      expiresIn: tokenData.expiresIn,
      scope: tokenData.scope,
      accountId: profileData?.sub || 'admin',
      accountName: profileData?.name || 'Authorized LinkedIn Account',
      accountEmail: profileData?.email || '',
      profile: profileData
    })

    // 7. Successful redirect back to TRUSTGRID.AI
    const successRes = NextResponse.redirect(redirectTarget('success'))
    successRes.cookies.delete('tg_linkedin_oauth_state')
    return successRes
  } catch (exchangeError: any) {
    console.error('[LinkedIn OAuth Callback] Token exchange failed:', exchangeError?.message)
    const errRes = NextResponse.redirect(
      redirectTarget('error', 'LinkedIn connection failed. Please try again.')
    )
    errRes.cookies.delete('tg_linkedin_oauth_state')
    return errRes
  }
}

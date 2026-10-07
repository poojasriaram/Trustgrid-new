import { NextRequest, NextResponse } from 'next/server'
import {
  exchangeLinkedInCodeForToken,
  fetchLinkedInUserInfo,
  saveLinkedInConnection,
  verifyLinkedInOAuthState,
  verifyOrganizationAccess,
  getLinkedInConfig
} from '@/lib/services/linkedin'

export const dynamic = 'force-dynamic'

/**
 * GET /api/linkedin/callback
 * Handles OAuth 2.0 authorization code redirect from LinkedIn.
 * 
 * Flow:
 * 1. Validates CSRF state parameter.
 * 2. Exchanges authorization code server-side for access token.
 * 3. Never sends Client Secret to the browser.
 * 4. Verifies administrator identity and TRUSTGRID.AI organization access.
 * 5. Stores token securely in SQLite database.
 * 6. Redirects administrator to the LinkedIn integration dashboard.
 */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const oauthError = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  const origin = req.nextUrl.origin || 'https://trustgrid.ai'
  const redirectTarget = (status: 'success' | 'error' | 'warning', msg?: string) => {
    const url = new URL('/analytics', origin)
    url.searchParams.set('tab', 'linkedin-automation')
    url.searchParams.set('linkedin_status', status)
    if (msg) url.searchParams.set('message', msg)
    return url.toString()
  }

  // 1. Handle user cancellation or LinkedIn OAuth error
  if (oauthError) {
    console.warn('[LinkedIn Callback] OAuth returned error:', oauthError, errorDescription)
    const res = NextResponse.redirect(
      redirectTarget('error', errorDescription || 'LinkedIn authorization was cancelled or denied.')
    )
    res.cookies.delete('tg_linkedin_oauth_state')
    return res
  }

  // 2. Validate state parameter (CSRF Protection)
  const stateCookie = req.cookies.get('tg_linkedin_oauth_state')?.value
  const isValidStateInDb = state ? verifyLinkedInOAuthState(state) : false
  const matchesCookie = state && stateCookie && state === stateCookie

  if (!state || (!matchesCookie && !isValidStateInDb)) {
    console.warn('[LinkedIn Callback] CSRF State validation failed.')
    const res = NextResponse.redirect(
      redirectTarget('error', 'LinkedIn connection failed. CSRF security verification failed.')
    )
    res.cookies.delete('tg_linkedin_oauth_state')
    return res
  }

  // 3. Validate code presence
  if (!code) {
    console.warn('[LinkedIn Callback] Missing authorization code.')
    const res = NextResponse.redirect(
      redirectTarget('error', 'Missing authorization code from LinkedIn.')
    )
    res.cookies.delete('tg_linkedin_oauth_state')
    return res
  }

  // 4. Server-Side Token Exchange
  try {
    const config = getLinkedInConfig()
    const hostHeader = req.headers.get('host')
    const protoHeader = req.headers.get('x-forwarded-proto') || 'https'
    let redirectUriOverride: string | undefined

    if (process.env.LINKEDIN_REDIRECT_URI) {
      redirectUriOverride = process.env.LINKEDIN_REDIRECT_URI
    } else if (hostHeader) {
      redirectUriOverride = `${protoHeader}://${hostHeader}/api/linkedin/callback`
    }

    const tokenData = await exchangeLinkedInCodeForToken(code, redirectUriOverride)

    // 5. Fetch authorized administrator profile info
    let profileData = null
    try {
      profileData = await fetchLinkedInUserInfo(tokenData.accessToken)
    } catch (profileErr) {
      console.warn('[LinkedIn Callback] Profile fetch notice:', profileErr)
    }

    // 6. Verify TRUSTGRID.AI organization access
    let orgAccessError: string | null = null
    if (config.organizationId) {
      try {
        const accessCheck = await verifyOrganizationAccess(tokenData.accessToken, config.organizationId)
        if (!accessCheck.hasAccess) {
          orgAccessError = accessCheck.error || 'LinkedIn authorization succeeded, but this account does not have permission to publish to the TRUSTGRID.AI LinkedIn Page.'
        }
      } catch (err: any) {
        console.warn('[LinkedIn Callback] Org access check notice:', err?.message)
      }
    }

    // 7. Secure server-side storage in SQLite database
    await saveLinkedInConnection({
      accessToken: tokenData.accessToken,
      refreshToken: tokenData.refreshToken,
      expiresIn: tokenData.expiresIn,
      scope: tokenData.scope,
      accountId: 'admin',
      accountName: profileData?.name || 'TRUSTGRID.AI Administrator',
      accountEmail: profileData?.email || '',
      organizationId: config.organizationId,
      organizationName: 'TRUSTGRID.AI',
      profile: profileData
    })

    // 8. Redirect administrator to dashboard with clean feedback
    if (orgAccessError) {
      const warnRes = NextResponse.redirect(redirectTarget('warning', orgAccessError))
      warnRes.cookies.delete('tg_linkedin_oauth_state')
      return warnRes
    }

    const successRes = NextResponse.redirect(
      redirectTarget('success', 'LinkedIn administrator connected successfully for TRUSTGRID.AI Page.')
    )
    successRes.cookies.delete('tg_linkedin_oauth_state')
    return successRes
  } catch (exchangeError: any) {
    console.error('[LinkedIn Callback] Token exchange failed:', exchangeError?.message)
    const errRes = NextResponse.redirect(
      redirectTarget('error', exchangeError?.message || 'LinkedIn token exchange failed. Please verify credentials.')
    )
    errRes.cookies.delete('tg_linkedin_oauth_state')
    return errRes
  }
}

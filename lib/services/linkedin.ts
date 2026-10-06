/**
 * TRUSTGRID.AI - Enterprise LinkedIn Integration Service
 * Manages OAuth 2.0 Authorization Code Flow, Server-Side Token Exchange,
 * Token Storage in SQLite, and Modern OpenID Connect Profile Queries.
 *
 * Security Guidelines:
 * - Client Secret and Access Tokens NEVER exposed to frontend or logged in console.
 * - CSRF State validation strictly enforced.
 * - Deprecated LinkedIn scopes avoided; modern OIDC ('openid profile email') used.
 */

import {
  saveLinkedInConnectionDb,
  getLinkedInConnectionDb,
  deleteLinkedInConnectionDb,
  saveOAuthStateDb,
  verifyAndConsumeOAuthStateDb
} from '@/lib/db/leads'

export interface LinkedInConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
  scopes: string
}

/**
 * Retrieve LinkedIn OAuth configuration from environment variables
 */
export function getLinkedInConfig(): LinkedInConfig {
  const clientId = process.env.LINKEDIN_CLIENT_ID || ''
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET || ''
  const redirectUri = process.env.LINKEDIN_REDIRECT_URI || 'https://trustgrid.ai/auth/linkedin/callback'
  const scopes = process.env.LINKEDIN_SCOPES || 'openid profile email'

  return {
    clientId,
    clientSecret,
    redirectUri,
    scopes
  }
}

/**
 * Generate LinkedIn OAuth 2.0 Authorization URL
 */
export function getLinkedInAuthorizationUrl(state: string, redirectUriOverride?: string): string {
  const config = getLinkedInConfig()
  if (!config.clientId) {
    throw new Error('LINKEDIN_CLIENT_ID is not configured in environment variables.')
  }

  const redirectUri = redirectUriOverride || config.redirectUri

  // Save CSRF state in server-side DB
  saveOAuthStateDb(state, 'linkedin')

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: config.clientId,
    redirect_uri: redirectUri,
    state,
    scope: config.scopes
  })

  return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`
}

/**
 * Exchange Authorization Code for Access Token (Server-Side Only)
 */
export async function exchangeLinkedInCodeForToken(
  code: string,
  redirectUriOverride?: string
): Promise<{
  accessToken: string
  expiresIn: number
  scope: string
  idToken?: string
  refreshToken?: string
}> {
  const config = getLinkedInConfig()

  if (!config.clientId || !config.clientSecret) {
    throw new Error('LinkedIn Client ID or Client Secret missing in environment.')
  }

  const redirectUri = redirectUriOverride || config.redirectUri

  const tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken'
  const bodyParams = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: config.clientId,
    client_secret: config.clientSecret,
    redirect_uri: redirectUri
  })

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: bodyParams.toString()
  })

  if (!response.ok) {
    const errorText = await response.text()
    // Do not log secret or detailed tokens, log high-level status
    console.error('[LinkedIn OAuth] Token exchange failed with HTTP status:', response.status)
    throw new Error(`LinkedIn token exchange failed: ${response.statusText || 'Invalid code or configuration'}`)
  }

  const tokenData = await response.json()

  if (!tokenData.access_token) {
    throw new Error('Invalid token response from LinkedIn: missing access_token')
  }

  return {
    accessToken: tokenData.access_token,
    expiresIn: tokenData.expires_in || 5184000, // 60 days standard
    scope: tokenData.scope || config.scopes,
    idToken: tokenData.id_token,
    refreshToken: tokenData.refresh_token
  }
}

/**
 * Fetch LinkedIn User Profile info using OpenID Connect userinfo endpoint
 */
export async function fetchLinkedInUserInfo(
  accessToken: string
): Promise<{ sub: string; name: string; email?: string; picture?: string } | null> {
  try {
    const userInfoUrl = 'https://api.linkedin.com/v2/userinfo'
    const res = await fetch(userInfoUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json'
      }
    })

    if (!res.ok) {
      console.warn('[LinkedIn Profile] Userinfo query returned status:', res.status)
      return null
    }

    const data = await res.json()
    return {
      sub: data.sub || '',
      name: data.name || `${data.given_name || ''} ${data.family_name || ''}`.trim() || 'LinkedIn User',
      email: data.email || undefined,
      picture: data.picture || undefined
    }
  } catch (err) {
    console.warn('[LinkedIn Profile] Failed to fetch userinfo:', err)
    return null
  }
}

/**
 * Save and store LinkedIn connection securely on server
 */
export async function saveLinkedInConnection(tokenData: {
  accessToken: string
  refreshToken?: string
  expiresIn?: number
  scope?: string
  accountId?: string
  accountName?: string
  accountEmail?: string
  profile?: any
}): Promise<void> {
  saveLinkedInConnectionDb(tokenData)
}

/**
 * Check LinkedIn Connection Status without exposing tokens
 */
export async function getLinkedInStatus(accountId: string = 'admin'): Promise<{
  connected: boolean
  connectedAt?: string
  accountName?: string
  email?: string
}> {
  const conn = getLinkedInConnectionDb(accountId)
  if (!conn || !conn.access_token) {
    return { connected: false }
  }

  // Check if token has expired
  if (conn.expires_at) {
    const expires = new Date(conn.expires_at).getTime()
    if (Date.now() > expires) {
      return { connected: false }
    }
  }

  return {
    connected: true,
    connectedAt: conn.created_at,
    accountName: conn.account_name || 'Authorized Account',
    email: conn.account_email || undefined
  }
}

/**
 * Disconnect LinkedIn Connection
 */
export async function disconnectLinkedIn(accountId: string = 'admin'): Promise<boolean> {
  return deleteLinkedInConnectionDb(accountId)
}

/**
 * Verify and consume OAuth CSRF State
 */
export function verifyLinkedInOAuthState(state: string): boolean {
  return verifyAndConsumeOAuthStateDb(state, 'linkedin')
}

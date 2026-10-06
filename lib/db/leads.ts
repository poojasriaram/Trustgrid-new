import { getDatabase } from './index'

export interface DbLeadRecord {
  id: string
  name: string
  email: string
  company: string
  phone?: string
  message?: string
  source: string
  service: string
  website?: string
  metadata_json?: string
  createdAt: string
  updatedAt: string
}

export interface DbLinkedInConnection {
  id: string
  account_id: string
  account_name: string
  account_email: string
  access_token: string
  refresh_token?: string
  expires_at?: string
  scope?: string
  profile_json?: string
  created_at: string
  updated_at: string
}

/**
 * Insert a lead record into the database
 */
export function insertLeadDb(lead: DbLeadRecord): void {
  const db = getDatabase()
  const stmt = db.prepare(`
    INSERT INTO leads (id, name, email, company, phone, message, source, service, website, metadata_json, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      name=excluded.name,
      email=excluded.email,
      company=excluded.company,
      phone=excluded.phone,
      message=excluded.message,
      source=excluded.source,
      service=excluded.service,
      updatedAt=excluded.updatedAt
  `)

  stmt.run(
    lead.id,
    lead.name,
    lead.email,
    lead.company,
    lead.phone || '',
    lead.message || '',
    lead.source || 'LinkedIn',
    lead.service || 'LinkedIn API Integration',
    lead.website || 'TRUSTGRID.AI',
    lead.metadata_json || '{}',
    lead.createdAt,
    lead.updatedAt
  )
}

/**
 * Retrieve all stored leads
 */
export function getAllLeadsDb(): DbLeadRecord[] {
  const db = getDatabase()
  const stmt = db.prepare(`
    SELECT id, name, email, company, phone, message, source, service, website, createdAt, updatedAt
    FROM leads
    ORDER BY createdAt DESC
  `)
  return stmt.all() as unknown as DbLeadRecord[]
}

/**
 * Save or update a LinkedIn Connection token and profile
 */
export function saveLinkedInConnectionDb(conn: {
  accountId?: string
  accountName?: string
  accountEmail?: string
  accessToken: string
  refreshToken?: string
  expiresIn?: number
  scope?: string
  profile?: any
}): void {
  const db = getDatabase()
  const id = `conn_${conn.accountId || 'admin'}`
  const now = new Date()
  const createdAt = now.toISOString()
  const updatedAt = createdAt
  const expiresAt = conn.expiresIn ? new Date(now.getTime() + conn.expiresIn * 1000).toISOString() : null

  const stmt = db.prepare(`
    INSERT INTO linkedin_connections (id, account_id, account_name, account_email, access_token, refresh_token, expires_at, scope, profile_json, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      account_name=excluded.account_name,
      account_email=excluded.account_email,
      access_token=excluded.access_token,
      refresh_token=excluded.refresh_token,
      expires_at=excluded.expires_at,
      scope=excluded.scope,
      profile_json=excluded.profile_json,
      updated_at=excluded.updated_at
  `)

  stmt.run(
    id,
    conn.accountId || 'admin',
    conn.accountName || 'LinkedIn Account',
    conn.accountEmail || '',
    conn.accessToken,
    conn.refreshToken || '',
    expiresAt,
    conn.scope || '',
    JSON.stringify(conn.profile || {}),
    createdAt,
    updatedAt
  )
}

/**
 * Retrieve the active LinkedIn Connection
 */
export function getLinkedInConnectionDb(accountId: string = 'admin'): DbLinkedInConnection | null {
  try {
    const db = getDatabase()
    const stmt = db.prepare(`
      SELECT id, account_id, account_name, account_email, access_token, refresh_token, expires_at, scope, profile_json, created_at, updated_at
      FROM linkedin_connections
      WHERE account_id = ?
      LIMIT 1
    `)
    const row = stmt.get(accountId) as unknown as DbLinkedInConnection | undefined
    return row || null
  } catch (err) {
    console.error('[DB] Failed to query LinkedIn connection:', err)
    return null
  }
}

/**
 * Disconnect/delete active LinkedIn Connection
 */
export function deleteLinkedInConnectionDb(accountId: string = 'admin'): boolean {
  try {
    const db = getDatabase()
    const stmt = db.prepare(`DELETE FROM linkedin_connections WHERE account_id = ?`)
    stmt.run(accountId)
    return true
  } catch (err) {
    console.error('[DB] Failed to delete LinkedIn connection:', err)
    return false
  }
}

/**
 * Save an OAuth CSRF state
 */
export function saveOAuthStateDb(state: string, provider: string = 'linkedin'): void {
  try {
    const db = getDatabase()
    const now = new Date()
    const expires = new Date(now.getTime() + 15 * 60 * 1000) // 15 mins expiry
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO oauth_states (state, provider, created_at, expires_at)
      VALUES (?, ?, ?, ?)
    `)
    stmt.run(state, provider, now.toISOString(), expires.toISOString())
  } catch (err) {
    console.error('[DB] Failed to save OAuth state:', err)
  }
}

/**
 * Verify and consume (delete) an OAuth CSRF state
 */
export function verifyAndConsumeOAuthStateDb(state: string, provider: string = 'linkedin'): boolean {
  try {
    const db = getDatabase()
    const stmt = db.prepare(`
      SELECT state, expires_at FROM oauth_states
      WHERE state = ? AND provider = ?
    `)
    const row = stmt.get(state, provider) as { state: string; expires_at: string } | undefined
    if (!row) return false

    // Delete used state to prevent replay
    db.prepare(`DELETE FROM oauth_states WHERE state = ?`).run(state)

    // Check expiry
    const expiresAt = new Date(row.expires_at).getTime()
    return Date.now() <= expiresAt
  } catch (err) {
    console.error('[DB] Failed to verify OAuth state:', err)
    return false
  }
}

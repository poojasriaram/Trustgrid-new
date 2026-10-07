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
  organization_id?: string
  organization_name?: string
  profile_json?: string
  created_at: string
  updated_at: string
}

export interface DbLinkedInPost {
  id: string
  text: string
  visibility: string
  organization_id: string
  status: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'FAILED'
  scheduled_at?: string | null
  published_at?: string | null
  linkedin_post_id?: string | null
  error_message?: string | null
  response_json?: string
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
  organizationId?: string
  organizationName?: string
  profile?: any
}): void {
  const db = getDatabase()
  const id = `conn_${conn.accountId || 'admin'}`
  const now = new Date()
  const createdAt = now.toISOString()
  const updatedAt = createdAt
  const expiresAt = conn.expiresIn ? new Date(now.getTime() + conn.expiresIn * 1000).toISOString() : null

  const stmt = db.prepare(`
    INSERT INTO linkedin_connections (id, account_id, account_name, account_email, access_token, refresh_token, expires_at, scope, organization_id, organization_name, profile_json, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      account_name=excluded.account_name,
      account_email=excluded.account_email,
      access_token=excluded.access_token,
      refresh_token=excluded.refresh_token,
      expires_at=excluded.expires_at,
      scope=excluded.scope,
      organization_id=COALESCE(excluded.organization_id, linkedin_connections.organization_id),
      organization_name=COALESCE(excluded.organization_name, linkedin_connections.organization_name),
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
    conn.organizationId || '',
    conn.organizationName || '',
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
      SELECT id, account_id, account_name, account_email, access_token, refresh_token, expires_at, scope, organization_id, organization_name, profile_json, created_at, updated_at
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

/**
 * Insert or save a LinkedIn Post record
 */
export function insertLinkedInPostDb(post: {
  id?: string
  text: string
  visibility?: string
  organization_id: string
  status?: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'FAILED'
  scheduled_at?: string | null
  published_at?: string | null
  linkedin_post_id?: string | null
  error_message?: string | null
  response_json?: string
}): DbLinkedInPost {
  const db = getDatabase()
  const id = post.id || `tg_post_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`
  const now = new Date().toISOString()
  const status = post.status || 'DRAFT'
  const visibility = post.visibility || 'PUBLIC'

  const stmt = db.prepare(`
    INSERT INTO linkedin_posts (id, text, visibility, organization_id, status, scheduled_at, published_at, linkedin_post_id, error_message, response_json, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      text=excluded.text,
      visibility=excluded.visibility,
      organization_id=excluded.organization_id,
      status=excluded.status,
      scheduled_at=excluded.scheduled_at,
      published_at=excluded.published_at,
      linkedin_post_id=excluded.linkedin_post_id,
      error_message=excluded.error_message,
      response_json=excluded.response_json,
      updated_at=excluded.updated_at
  `)

  stmt.run(
    id,
    post.text,
    visibility,
    post.organization_id,
    status,
    post.scheduled_at || null,
    post.published_at || null,
    post.linkedin_post_id || null,
    post.error_message || null,
    post.response_json || '{}',
    now,
    now
  )

  return {
    id,
    text: post.text,
    visibility,
    organization_id: post.organization_id,
    status,
    scheduled_at: post.scheduled_at || null,
    published_at: post.published_at || null,
    linkedin_post_id: post.linkedin_post_id || null,
    error_message: post.error_message || null,
    response_json: post.response_json || '{}',
    created_at: now,
    updated_at: now
  }
}

/**
 * Update an existing LinkedIn Post record
 */
export function updateLinkedInPostDb(
  id: string,
  updates: Partial<DbLinkedInPost>
): void {
  const db = getDatabase()
  const now = new Date().toISOString()

  const current = getLinkedInPostByIdDb(id)
  if (!current) return

  const stmt = db.prepare(`
    UPDATE linkedin_posts SET
      status = COALESCE(?, status),
      scheduled_at = COALESCE(?, scheduled_at),
      published_at = COALESCE(?, published_at),
      linkedin_post_id = COALESCE(?, linkedin_post_id),
      error_message = COALESCE(?, error_message),
      response_json = COALESCE(?, response_json),
      updated_at = ?
    WHERE id = ?
  `)

  stmt.run(
    updates.status ?? null,
    updates.scheduled_at ?? null,
    updates.published_at ?? null,
    updates.linkedin_post_id ?? null,
    updates.error_message ?? null,
    updates.response_json ?? null,
    now,
    id
  )
}

/**
 * Retrieve all LinkedIn posts ordered by creation date descending
 */
export function getAllLinkedInPostsDb(limit: number = 50): DbLinkedInPost[] {
  try {
    const db = getDatabase()
    const stmt = db.prepare(`
      SELECT id, text, visibility, organization_id, status, scheduled_at, published_at, linkedin_post_id, error_message, response_json, created_at, updated_at
      FROM linkedin_posts
      ORDER BY created_at DESC
      LIMIT ?
    `)
    return stmt.all(limit) as unknown as DbLinkedInPost[]
  } catch (err) {
    console.error('[DB] Failed to query LinkedIn posts:', err)
    return []
  }
}

/**
 * Retrieve scheduled posts that are due for publishing (scheduled_at <= now)
 */
export function getDueScheduledLinkedInPostsDb(): DbLinkedInPost[] {
  try {
    const db = getDatabase()
    const now = new Date().toISOString()
    const stmt = db.prepare(`
      SELECT id, text, visibility, organization_id, status, scheduled_at, published_at, linkedin_post_id, error_message, response_json, created_at, updated_at
      FROM linkedin_posts
      WHERE status = 'SCHEDULED' AND scheduled_at IS NOT NULL AND scheduled_at <= ?
      ORDER BY scheduled_at ASC
    `)
    return stmt.all(now) as unknown as DbLinkedInPost[]
  } catch (err) {
    console.error('[DB] Failed to query due scheduled LinkedIn posts:', err)
    return []
  }
}

/**
 * Retrieve a specific LinkedIn post by ID
 */
export function getLinkedInPostByIdDb(id: string): DbLinkedInPost | null {
  try {
    const db = getDatabase()
    const stmt = db.prepare(`
      SELECT id, text, visibility, organization_id, status, scheduled_at, published_at, linkedin_post_id, error_message, response_json, created_at, updated_at
      FROM linkedin_posts
      WHERE id = ?
      LIMIT 1
    `)
    const row = stmt.get(id) as unknown as DbLinkedInPost | undefined
    return row || null
  } catch (err) {
    console.error('[DB] Failed to query LinkedIn post by id:', err)
    return null
  }
}

/**
 * Delete a LinkedIn post by ID
 */
export function deleteLinkedInPostDb(id: string): boolean {
  try {
    const db = getDatabase()
    const stmt = db.prepare(`DELETE FROM linkedin_posts WHERE id = ?`)
    stmt.run(id)
    return true
  } catch (err) {
    console.error('[DB] Failed to delete LinkedIn post:', err)
    return false
  }
}

/**
 * Initial Test Post content for TRUSTGRID.AI GPU Performance Optimization
 */
export const TRUSTGRID_INITIAL_TEST_POST_TEXT = `⚡ TRUSTGRID.AI — 20% Assured GPU Performance Optimization for Enterprises & Data Centers

Is your GPU infrastructure truly optimized for AI workloads?

At TRUSTGRID.AI, we deliver 20% assured performance optimization through advanced GPU engineering, workload orchestration, and AI-native infrastructure intelligence.

Our GPU Optimization Services empower enterprises and hyperscale data centers to achieve measurable efficiency gains across:

🔹 GPUaaS & Managed Compute Clusters

🔹 AI-DCIM & Fleet Operations

🔹 Liquid Cooling & Power Efficiency

🔹 Quantum-Safe Compliance & Green Energy Integration

💡 Why TRUSTGRID.AI?

Most enterprise GPU clusters operate below 70% efficiency. Our optimization framework enhances utilization, reduces latency, and drives sustainable ROI — transforming your AI infrastructure into a high-performance engine.

🚀 Key Outcomes:

✅ 20%+ assured performance improvement

✅ 30–40% reduction in compute waste

✅ Optimized CapEx utilization and sustainability metrics

Let’s engineer true AI economics — where every watt and every GPU cycle counts.

🌐 Visit: www.trustgrid.ai

📩 Email: poojasri@trustgrid.ai

📞 WhatsApp: 7530044868

#TRUSTGRIDAI #GPUOptimization #AIInfrastructure #DataCenters #PerformanceEngineering #Sustainability #AIValueEngineering #SmartCity #EnergyTransition`

/**
 * Seed initial test post from TRUSTGRID.AI if not already present
 */
export function seedInitialLinkedInPostDb(orgId: string = 'TRUSTGRID_AI'): DbLinkedInPost {
  const existing = getLinkedInPostByIdDb('tg_post_initial_gpu_opt')
  if (existing) return existing

  return insertLinkedInPostDb({
    id: 'tg_post_initial_gpu_opt',
    text: TRUSTGRID_INITIAL_TEST_POST_TEXT,
    visibility: 'PUBLIC',
    organization_id: orgId,
    status: 'DRAFT'
  })
}


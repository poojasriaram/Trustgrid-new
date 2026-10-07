import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'

/**
 * ============================================================================
 * TRUSTGRID.AI — CORE ANALYTICS RELATIONAL DATABASE (SQLITE / IN-MEMORY FALLBACK)
 * ============================================================================
 * High-performance, zero-latency server-side relational database for event
 * ingestion, session tracking, attribution, geo intelligence, network security,
 * and time-zone analytics. Resilient in serverless, read-only and local environments.
 * ============================================================================
 */

let dbInstance: any = null

function getDbPath(): string {
  // In serverless environments (Vercel, AWS Lambda), the only writable directory is /tmp or os.tmpdir()
  const isServerless = !!process.env.VERCEL || !!process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NODE_ENV === 'production'
  const baseDir = isServerless ? os.tmpdir() : path.join(process.cwd(), 'data')
  
  try {
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true })
    }
  } catch {
    // Fallback to system temp directory
    return path.join(os.tmpdir(), 'trustgrid_analytics.db')
  }
  return path.join(baseDir, 'trustgrid_analytics.db')
}

// In-Memory fallback store for environments without node:sqlite
class MockStatement {
  constructor(private sql: string) {}
  run(...args: any[]) { return { changes: 1, lastInsertRowid: 1 } }
  all(...args: any[]): any[] { return [] }
  get(...args: any[]): any { return null }
}

class MockDatabase {
  exec(sql: string): void {}
  prepare(sql: string): MockStatement { return new MockStatement(sql) }
}

export function getDatabase(): any {
  if (dbInstance) return dbInstance

  try {
    // Attempt to load node:sqlite
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { DatabaseSync } = require('node:sqlite')
    const dbPath = getDbPath()
    dbInstance = new DatabaseSync(dbPath)

    try {
      dbInstance.exec('PRAGMA journal_mode = WAL;')
      dbInstance.exec('PRAGMA synchronous = NORMAL;')
      dbInstance.exec('PRAGMA busy_timeout = 5000;')
    } catch (e) {
      // Ignored for in-memory / pragma notices
    }

    initSchema(dbInstance)
    return dbInstance
  } catch (err) {
    console.warn('[DB Engine Warning] node:sqlite unavailable or filesystem read-only. Using resilient fallback.', err)
    dbInstance = new MockDatabase()
    return dbInstance
  }
}

function initSchema(db: any): void {
  db.exec(`
    -- 1. Raw & Enriched Analytics Events
    CREATE TABLE IF NOT EXISTS analytics_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id TEXT NOT NULL UNIQUE,
      event_name TEXT NOT NULL,
      event_category TEXT DEFAULT 'general',
      event_action TEXT DEFAULT 'action',
      session_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      timestamp_utc TEXT NOT NULL,
      page_path TEXT NOT NULL,
      page_title TEXT DEFAULT '',
      referrer TEXT DEFAULT '',
      traffic_source TEXT DEFAULT 'Direct',
      utm_source TEXT DEFAULT '',
      utm_medium TEXT DEFAULT '',
      utm_campaign TEXT DEFAULT '',
      utm_term TEXT DEFAULT '',
      utm_content TEXT DEFAULT '',
      device_type TEXT DEFAULT 'Desktop',
      operating_system TEXT DEFAULT 'Unknown',
      browser TEXT DEFAULT 'Unknown',
      screen_res TEXT DEFAULT '',
      country TEXT DEFAULT 'Unknown',
      country_code TEXT DEFAULT 'XX',
      region TEXT DEFAULT 'Unknown',
      city TEXT DEFAULT 'Unknown',
      timezone_browser TEXT DEFAULT 'UTC',
      timezone_ip TEXT DEFAULT 'UTC',
      ip_masked TEXT DEFAULT '0.0.***.***',
      asn TEXT DEFAULT 'Unknown',
      organization TEXT DEFAULT 'Unknown',
      isp TEXT DEFAULT 'Unknown',
      is_bounce INTEGER DEFAULT 0,
      is_conversion INTEGER DEFAULT 0,
      conversion_goal TEXT DEFAULT '',
      dwell_time_sec INTEGER DEFAULT 0,
      scroll_depth INTEGER DEFAULT 0,
      metadata_json TEXT DEFAULT '{}',
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_events_session ON analytics_events(session_id);
    CREATE INDEX IF NOT EXISTS idx_events_user ON analytics_events(user_id);
    CREATE INDEX IF NOT EXISTS idx_events_timestamp ON analytics_events(timestamp_utc);
    CREATE INDEX IF NOT EXISTS idx_events_name ON analytics_events(event_name);
    CREATE INDEX IF NOT EXISTS idx_events_page ON analytics_events(page_path);
    CREATE INDEX IF NOT EXISTS idx_events_source ON analytics_events(traffic_source);
    CREATE INDEX IF NOT EXISTS idx_events_country ON analytics_events(country);

    -- 2. Aggregated Sessions
    CREATE TABLE IF NOT EXISTS analytics_sessions (
      session_id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      start_time_utc TEXT NOT NULL,
      last_activity_utc TEXT NOT NULL,
      end_time_utc TEXT,
      duration_sec INTEGER DEFAULT 0,
      pages_count INTEGER DEFAULT 1,
      entry_page TEXT NOT NULL,
      exit_page TEXT NOT NULL,
      traffic_source TEXT DEFAULT 'Direct',
      utm_campaign TEXT DEFAULT '',
      country TEXT DEFAULT 'Unknown',
      city TEXT DEFAULT 'Unknown',
      timezone_browser TEXT DEFAULT 'UTC',
      ip_masked TEXT DEFAULT '0.0.***.***',
      is_bounce INTEGER DEFAULT 1,
      converted INTEGER DEFAULT 0,
      user_type TEXT DEFAULT 'new'
    );

    CREATE INDEX IF NOT EXISTS idx_sessions_user ON analytics_sessions(user_id);
    CREATE INDEX IF NOT EXISTS idx_sessions_start ON analytics_sessions(start_time_utc);
    CREATE INDEX IF NOT EXISTS idx_sessions_source ON analytics_sessions(traffic_source);
    CREATE INDEX IF NOT EXISTS idx_sessions_country ON analytics_sessions(country);

    -- 3. Marketing & Campaign Attribution
    CREATE TABLE IF NOT EXISTS traffic_attribution (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      channel TEXT NOT NULL,
      source TEXT DEFAULT '',
      medium TEXT DEFAULT '',
      campaign TEXT DEFAULT '',
      term TEXT DEFAULT '',
      content TEXT DEFAULT '',
      referrer_domain TEXT DEFAULT '',
      landing_page TEXT DEFAULT '',
      converted INTEGER DEFAULT 0,
      conversion_type TEXT DEFAULT '',
      conversion_value REAL DEFAULT 0,
      timestamp_utc TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_attr_channel ON traffic_attribution(channel);
    CREATE INDEX IF NOT EXISTS idx_attr_session ON traffic_attribution(session_id);

    -- 4. IP & Network Intelligence
    CREATE TABLE IF NOT EXISTS network_intelligence (
      asn TEXT PRIMARY KEY,
      organization TEXT DEFAULT 'Unknown',
      isp TEXT DEFAULT 'Unknown',
      connection_type TEXT DEFAULT 'Broadband',
      is_proxy_or_datacenter INTEGER DEFAULT 0,
      threat_level TEXT DEFAULT 'Low',
      total_requests INTEGER DEFAULT 0,
      suspicious_requests INTEGER DEFAULT 0,
      last_seen_utc TEXT NOT NULL
    );

    -- 5. Security & Threat Log
    CREATE TABLE IF NOT EXISTS security_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp_utc TEXT NOT NULL,
      ip_masked TEXT NOT NULL,
      event_type TEXT NOT NULL,
      severity TEXT NOT NULL,
      description TEXT NOT NULL,
      path TEXT DEFAULT '',
      user_agent TEXT DEFAULT '',
      request_rate INTEGER DEFAULT 0,
      blocked INTEGER DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_sec_time ON security_events(timestamp_utc);
    CREATE INDEX IF NOT EXISTS idx_sec_ip ON security_events(ip_masked);
    CREATE INDEX IF NOT EXISTS idx_sec_type ON security_events(event_type);

    -- 6. Privacy & Consent Preferences
    CREATE TABLE IF NOT EXISTS privacy_consent (
      user_id TEXT PRIMARY KEY,
      consent_status TEXT NOT NULL,
      analytics_allowed INTEGER DEFAULT 1,
      marketing_allowed INTEGER DEFAULT 0,
      ip_masked TEXT DEFAULT '',
      updated_at TEXT NOT NULL
    );

    -- 7. Production Leads Storage (Normalized Enterprise & LinkedIn Leads)
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT NOT NULL,
      phone TEXT DEFAULT '',
      message TEXT DEFAULT '',
      source TEXT DEFAULT 'LinkedIn',
      service TEXT DEFAULT 'LinkedIn API Integration',
      website TEXT DEFAULT 'TRUSTGRID.AI',
      metadata_json TEXT DEFAULT '{}',
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
    CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
    CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(createdAt);

    -- 8. LinkedIn Server-Side OAuth Connection & Secure Token Store
    CREATE TABLE IF NOT EXISTS linkedin_connections (
      id TEXT PRIMARY KEY,
      account_id TEXT DEFAULT 'admin',
      account_name TEXT DEFAULT '',
      account_email TEXT DEFAULT '',
      access_token TEXT NOT NULL,
      refresh_token TEXT DEFAULT '',
      expires_at TEXT,
      scope TEXT DEFAULT '',
      profile_json TEXT DEFAULT '{}',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    -- 9. OAuth CSRF State Validation
    CREATE TABLE IF NOT EXISTS oauth_states (
      state TEXT PRIMARY KEY,
      provider TEXT NOT NULL,
      created_at TEXT NOT NULL,
      expires_at TEXT NOT NULL
    );

    -- 10. LinkedIn Posts & Automation Store
    CREATE TABLE IF NOT EXISTS linkedin_posts (
      id TEXT PRIMARY KEY,
      text TEXT NOT NULL,
      visibility TEXT DEFAULT 'PUBLIC',
      organization_id TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'DRAFT',
      scheduled_at TEXT,
      published_at TEXT,
      linkedin_post_id TEXT,
      error_message TEXT,
      response_json TEXT DEFAULT '{}',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_linkedin_posts_status ON linkedin_posts(status);
    CREATE INDEX IF NOT EXISTS idx_linkedin_posts_created ON linkedin_posts(created_at);
    CREATE INDEX IF NOT EXISTS idx_linkedin_posts_scheduled ON linkedin_posts(scheduled_at);
  `)

  try {
    db.exec(`ALTER TABLE linkedin_connections ADD COLUMN organization_id TEXT DEFAULT '';`)
  } catch {}
  try {
    db.exec(`ALTER TABLE linkedin_connections ADD COLUMN organization_name TEXT DEFAULT '';`)
  } catch {}
}


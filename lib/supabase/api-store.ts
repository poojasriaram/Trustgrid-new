/**
 * ============================================================================
 * TRUSTGRID.AI DIGITAL PRESENCE — SUPABASE REST API PERSISTENCE LAYER
 * ============================================================================
 * Connects every Next.js API route in `app/api/*` to Supabase PostgREST tables:
 * - /api/chat & /api/chat/session       -> `chat_sessions`, `chat_messages`
 * - /api/leads, /stats, /retry          -> `leads`, `form_submissions`, dedicated tables
 * - /api/calendar/availability, /book   -> `session_bookings`
 * - /api/analytics/events, /consent     -> `analytics_events`, `analytics_sessions`, `privacy_consent`, `network_intelligence`, `security_events`
 * - /api/linkedin/*                     -> `linkedin_connections`, `oauth_states`, `linkedin_posts`
 * ============================================================================
 */

import { getSupabaseConfig } from '@/lib/services/supabase-leads'
import type { SessionContext } from '@/lib/chat/context-engine'
import type { StoredChatMessage } from '@/lib/chat/memory-store'
import type { DbLeadRecord, DbLinkedInConnection, DbLinkedInPost } from '@/lib/db/leads'
import type { DbSessionBooking } from '@/lib/db/bookings'

/**
 * Generic Supabase PostgREST Upsert helper (INSERT ... ON CONFLICT DO UPDATE)
 */
export async function supabaseUpsert(
  table: string,
  payload: Record<string, any> | Record<string, any>[],
  onConflict?: string
): Promise<boolean> {
  const { url, key } = getSupabaseConfig()
  if (!url || !key) return false

  const conflictQuery = onConflict ? `?on_conflict=${encodeURIComponent(onConflict)}` : ''
  try {
    const res = await fetch(`${url}/rest/v1/${table}${conflictQuery}`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal'
      },
      body: JSON.stringify(payload)
    })
    return res.ok
  } catch (err) {
    console.warn(`[Supabase Upsert Warning] ${table}:`, err)
    return false
  }
}

/**
 * Generic Supabase PostgREST Select helper
 */
export async function supabaseSelect<T = any>(
  table: string,
  queryParams: string = 'select=*'
): Promise<T[]> {
  const { url, key } = getSupabaseConfig()
  if (!url || !key) return []

  try {
    const res = await fetch(`${url}/rest/v1/${table}?${queryParams}`, {
      method: 'GET',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        Accept: 'application/json'
      },
      cache: 'no-store'
    })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch (err) {
    console.warn(`[Supabase Select Warning] ${table}:`, err)
    return []
  }
}

/**
 * Generic Supabase PostgREST Patch (UPDATE) helper
 */
export async function supabaseUpdate(
  table: string,
  filterQuery: string,
  updates: Record<string, any>
): Promise<boolean> {
  const { url, key } = getSupabaseConfig()
  if (!url || !key) return false

  try {
    const res = await fetch(`${url}/rest/v1/${table}?${filterQuery}`, {
      method: 'PATCH',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(updates)
    })
    return res.ok
  } catch (err) {
    console.warn(`[Supabase Update Warning] ${table}:`, err)
    return false
  }
}

// ============================================================================
// 1. CHAT API STORE (`chat_sessions` & `chat_messages`)
// ============================================================================

export async function getChatSessionFromSupabase(conversationId: string): Promise<SessionContext | null> {
  const rows = await supabaseSelect<any>(
    'chat_sessions',
    `conversation_id=eq.${encodeURIComponent(conversationId)}&limit=1`
  )
  if (rows.length === 0) return null
  const r = rows[0]
  return {
    conversationId: r.conversation_id,
    topicsDiscussed: Array.isArray(r.topics_discussed) ? r.topics_discussed : [],
    statedChallenges: Array.isArray(r.stated_challenges) ? r.stated_challenges : [],
    exploredSolutions: Array.isArray(r.explored_solutions) ? r.explored_solutions : [],
    currentTaskStage: r.current_task_stage || 'exploring',
    consultationIntentDetected: Boolean(r.consultation_intent_detected),
    leadDetails: r.lead_details || {},
    turnCount: Number(r.turn_count || 0),
    rollingSummary: r.rolling_summary || undefined,
    createdAt: r.created_at || new Date().toISOString(),
    updatedAt: r.updated_at || new Date().toISOString()
  }
}

export async function saveChatSessionToSupabase(session: SessionContext): Promise<boolean> {
  return supabaseUpsert(
    'chat_sessions',
    {
      conversation_id: session.conversationId,
      topics_discussed: session.topicsDiscussed || [],
      stated_challenges: session.statedChallenges || [],
      explored_solutions: session.exploredSolutions || [],
      current_task_stage: session.currentTaskStage || 'exploring',
      consultation_intent_detected: Boolean(session.consultationIntentDetected),
      lead_details: session.leadDetails || {},
      turn_count: session.turnCount || 0,
      rolling_summary: session.rollingSummary || '',
      created_at: session.createdAt || new Date().toISOString(),
      updated_at: session.updatedAt || new Date().toISOString()
    },
    'conversation_id'
  )
}

export async function appendChatMessageToSupabase(
  conversationId: string,
  msg: StoredChatMessage
): Promise<boolean> {
  return supabaseUpsert(
    'chat_messages',
    {
      id: msg.id,
      conversation_id: conversationId,
      sender: msg.sender,
      text: msg.text,
      timestamp_label: msg.timestamp || '',
      topics: msg.topics || [],
      offering_tag: msg.offeringTag || null,
      page_link: msg.pageLink || null,
      suggested_follow_ups: msg.suggestedFollowUps || [],
      is_lead_prompt: Boolean(msg.isLeadPrompt),
      created_at: new Date().toISOString()
    },
    'id'
  )
}

export async function getChatHistoryFromSupabase(
  conversationId: string,
  limit: number = 20
): Promise<StoredChatMessage[]> {
  const rows = await supabaseSelect<any>(
    'chat_messages',
    `conversation_id=eq.${encodeURIComponent(conversationId)}&order=created_at.asc&limit=${limit}`
  )
  return rows.map((r) => ({
    id: r.id,
    sender: r.sender === 'assistant' ? 'assistant' : 'user',
    text: r.text,
    timestamp: r.timestamp_label || new Date(r.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    topics: Array.isArray(r.topics) ? r.topics : undefined,
    offeringTag: r.offering_tag || undefined,
    pageLink: r.page_link || undefined,
    suggestedFollowUps: Array.isArray(r.suggested_follow_ups) ? r.suggested_follow_ups : undefined,
    isLeadPrompt: Boolean(r.is_lead_prompt)
  }))
}

// ============================================================================
// 2. LEADS, LINKEDIN & CALENDAR BOOKINGS API STORE
// ============================================================================

export async function syncLeadRecordToSupabase(lead: DbLeadRecord, jiraKey?: string, jiraStatus?: string): Promise<boolean> {
  let metaObj: Record<string, any> = {}
  try {
    if (lead.metadata_json) metaObj = JSON.parse(lead.metadata_json)
  } catch {}

  const isTest = Boolean(metaObj.isTestLead || lead.name.startsWith('[TEST LEAD]') || lead.id.startsWith('TG-TEST-'))
  return supabaseUpsert(
    'leads',
    {
      id: lead.id,
      name: lead.name,
      email: lead.email,
      company: lead.company,
      phone: lead.phone || '',
      message: lead.message || '',
      source: lead.source || 'Website Form',
      service: lead.service || 'Enterprise Inquiry',
      website: lead.website || 'TRUSTGRID.AI',
      jira_key: jiraKey || metaObj.jiraKey || '',
      jira_status: jiraStatus || metaObj.jiraStatus || 'Created',
      is_test_lead: isTest,
      metadata_json: metaObj,
      created_at: lead.createdAt || new Date().toISOString(),
      updated_at: lead.updatedAt || new Date().toISOString()
    },
    'id'
  )
}

export async function fetchAllLeadsFromSupabase(limit: number = 200): Promise<DbLeadRecord[]> {
  const rows = await supabaseSelect<any>('leads', `order=created_at.desc&limit=${limit}`)
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    company: r.company,
    phone: r.phone || '',
    message: r.message || '',
    source: r.source || 'Website Form',
    service: r.service || 'Enterprise Inquiry',
    website: r.website || 'TRUSTGRID.AI',
    metadata_json: typeof r.metadata_json === 'string' ? r.metadata_json : JSON.stringify(r.metadata_json || {}),
    createdAt: r.created_at,
    updatedAt: r.updated_at
  }))
}

export async function syncBookingToSupabase(booking: DbSessionBooking): Promise<boolean> {
  return supabaseUpsert(
    'session_bookings',
    {
      id: booking.id,
      name: booking.name,
      email: booking.email,
      company: booking.company,
      job_title: booking.job_title || '',
      phone: booking.phone || '',
      area_of_interest: booking.area_of_interest,
      challenge_description: booking.challenge_description,
      booking_date: booking.booking_date,
      start_time: booking.start_time,
      end_time: booking.end_time,
      timezone: booking.timezone,
      additional_context: booking.additional_context || '',
      google_calendar_event_id: booking.google_calendar_event_id || '',
      google_calendar_status: booking.google_calendar_status || 'pending',
      meet_link: booking.meet_link || '',
      status: booking.status || 'confirmed',
      created_at: booking.created_at,
      updated_at: booking.updated_at
    },
    'id'
  )
}

export async function syncLinkedInConnectionToSupabase(conn: DbLinkedInConnection): Promise<boolean> {
  let profileObj = {}
  try {
    if (conn.profile_json) profileObj = JSON.parse(conn.profile_json)
  } catch {}

  return supabaseUpsert(
    'linkedin_connections',
    {
      id: conn.id,
      account_id: conn.account_id,
      account_name: conn.account_name,
      account_email: conn.account_email,
      access_token: conn.access_token,
      refresh_token: conn.refresh_token || '',
      expires_at: conn.expires_at || null,
      scope: conn.scope || '',
      organization_id: conn.organization_id || '',
      organization_name: conn.organization_name || '',
      profile_json: profileObj,
      created_at: conn.created_at,
      updated_at: conn.updated_at
    },
    'id'
  )
}

export async function syncLinkedInPostToSupabase(post: DbLinkedInPost): Promise<boolean> {
  let respObj = {}
  try {
    if (post.response_json) respObj = JSON.parse(post.response_json)
  } catch {}

  return supabaseUpsert(
    'linkedin_posts',
    {
      id: post.id,
      text: post.text,
      visibility: post.visibility || 'PUBLIC',
      organization_id: post.organization_id,
      status: post.status,
      scheduled_at: post.scheduled_at || null,
      published_at: post.published_at || null,
      linkedin_post_id: post.linkedin_post_id || null,
      error_message: post.error_message || null,
      response_json: respObj,
      created_at: post.created_at,
      updated_at: post.updated_at
    },
    'id'
  )
}

// ============================================================================
// 3. ANALYTICS & CONSENT API STORE (`privacy_consent`, `analytics_events`, `analytics_sessions`)
// ============================================================================

export async function syncPrivacyConsentToSupabase(params: {
  userId: string
  consentStatus: string
  analyticsAllowed: number
  marketingAllowed: number
  ipMasked: string
  updatedAt: string
}): Promise<boolean> {
  return supabaseUpsert(
    'privacy_consent',
    {
      user_id: params.userId,
      consent_status: params.consentStatus,
      analytics_allowed: params.analyticsAllowed,
      marketing_allowed: params.marketingAllowed,
      ip_masked: params.ipMasked,
      updated_at: params.updatedAt
    },
    'user_id'
  )
}

export async function syncAnalyticsEventAndSessionToSupabase(
  eventRow: Record<string, any>,
  sessionRow: Record<string, any>
): Promise<void> {
  await Promise.allSettled([
    supabaseUpsert('analytics_events', eventRow, 'event_id'),
    supabaseUpsert('analytics_sessions', sessionRow, 'session_id')
  ])
}


/**
 * TRUSTGRID.AI - Supabase Real-Time Dual-Write Service (Leads & 95-Column Telemetry)
 * Synchronizes every website lead, consultation booking, LinkedIn lead, and telemetry event
 * simultaneously into Supabase (https://ndalgvpvpzwrqoikkpyb.supabase.co) alongside Google Sheet #1.
 * Works both on the Next.js server (/api/leads, /api/calendar/book, /api/analytics/events)
 * and directly from the browser as a fallback on static export hosts.
 */

import type { NormalizedLead } from '@/lib/lead-normalization'

const DEFAULT_SUPABASE_URL = 'https://ndalgvpvpzwrqoikkpyb.supabase.co'
const DEFAULT_SUPABASE_KEY = 'sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv'

export function getSupabaseConfig() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    DEFAULT_SUPABASE_URL

  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_KEY ||
    DEFAULT_SUPABASE_KEY

  return { url: url.replace(/\/$/, ''), key }
}

/**
 * Low-level helper to insert one or more rows into a Supabase table via REST API (PostgREST)
 */
export async function supabaseInsert(
  tableName: string,
  rowOrRows: Record<string, any> | Record<string, any>[]
): Promise<{ success: boolean; table: string; error?: string }> {
  const { url, key } = getSupabaseConfig()
  if (!url || !key) {
    return { success: false, table: tableName, error: 'Supabase credentials not configured' }
  }

  try {
    const res = await fetch(`${url}/rest/v1/${tableName}`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(rowOrRows)
    })

    if (!res.ok) {
      const errText = await res.text().catch(() => `HTTP ${res.status}`)
      console.warn(`[Supabase Insert Warning] Table "${tableName}":`, errText)
      return { success: false, table: tableName, error: errText }
    }

    return { success: true, table: tableName }
  } catch (err: any) {
    console.warn(`[Supabase Network Warning] Table "${tableName}":`, err?.message || err)
    return { success: false, table: tableName, error: err?.message || 'Network error' }
  }
}

export interface SupabaseLeadInput {
  leadId: string
  name: string
  email: string
  phone?: string
  company?: string
  role?: string
  formName?: string
  leadType?: string
  message?: string
  requirement?: string
  subject?: string
  source?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
  pageUrl?: string
  ipAddress?: string
  ipLocation?: string
  visitorId?: string
  sessionId?: string
  resumeDriveLink?: string
  driveFileId?: string
  isTestLead?: boolean
  timestamp?: string
  rawPayload?: Record<string, any>
}

export interface SupabaseLeadSyncResult {
  success: boolean
  status: 'Success' | 'Failed'
  tablesWritten: string[]
  errors?: string[]
}

/**
 * Converts a NormalizedLead or raw form payload into a standardized SupabaseLeadInput
 */
export function buildSupabaseLeadInput(
  leadOrPayload: NormalizedLead | Record<string, any>,
  rawOverride?: Record<string, any>
): SupabaseLeadInput {
  const raw = rawOverride || (leadOrPayload as any).rawPayload || leadOrPayload || {}
  const isNormalized = 'leadTypeLabel' in leadOrPayload && 'timestampIso' in leadOrPayload

  const leadId =
    (leadOrPayload as any).leadId ||
    raw.submissionId ||
    raw.lead_id ||
    `TG-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`

  const isTestLead = Boolean((leadOrPayload as any).isTestLead ?? raw.isTestLead ?? false)
  const rawName = (leadOrPayload as any).name || raw.fullName || raw.name || 'Website Lead'
  const cleanName = isTestLead && !String(rawName).startsWith('[TEST LEAD]')
    ? `[TEST LEAD] ${rawName}`
    : String(rawName)

  const company =
    (leadOrPayload as any).company ||
    raw.company ||
    raw.currentPreviousCompany ||
    'Enterprise Organization'

  const role =
    (leadOrPayload as any).role ||
    raw.role ||
    raw.designation ||
    raw.jobTitle ||
    (leadOrPayload as any).interestedSolution ||
    null

  const formName =
    (leadOrPayload as any).formName ||
    raw.formName ||
    raw.form_name ||
    (leadOrPayload as any).leadTypeLabel ||
    'Website Inbound Form'

  const leadType = String(
    (leadOrPayload as any).leadType ||
    raw.formType ||
    raw.form_type ||
    formName
  ).toUpperCase()

  const message =
    (leadOrPayload as any).message ||
    (leadOrPayload as any).requirement ||
    raw.message ||
    raw.requirement ||
    raw.challengeDescription ||
    ''

  const utmSource =
    (leadOrPayload as any).utmSource ||
    raw.utm_source ||
    raw.utmSource ||
    raw.metadata?.utmSource ||
    'direct'

  const utmMedium =
    (leadOrPayload as any).utmMedium ||
    raw.utm_medium ||
    raw.utmMedium ||
    raw.metadata?.utmMedium ||
    null

  const utmCampaign =
    (leadOrPayload as any).utmCampaign ||
    raw.utm_campaign ||
    raw.utmCampaign ||
    raw.metadata?.utmCampaign ||
    null

  const utmTerm =
    (leadOrPayload as any).utmTerm ||
    raw.utm_term ||
    raw.utmTerm ||
    raw.metadata?.utmTerm ||
    null

  const utmContent =
    (leadOrPayload as any).utmContent ||
    raw.utm_content ||
    raw.utmContent ||
    raw.metadata?.utmContent ||
    null

  const source =
    (leadOrPayload as any).channelAttribution ||
    raw.source ||
    raw.leadSource ||
    raw.ctaSource ||
    'Website Form'

  const pageUrl =
    (leadOrPayload as any).pageUrl ||
    raw.page_url ||
    raw.pageUrl ||
    raw.metadata?.pageUrl ||
    'https://trustgrid.ai'

  const timestamp =
    (isNormalized ? (leadOrPayload as NormalizedLead).timestampIso : null) ||
    raw.timestamp ||
    raw.createdAt ||
    new Date().toISOString()

  return {
    leadId,
    name: cleanName,
    email: String((leadOrPayload as any).email || raw.work_email || raw.email || ''),
    phone: String((leadOrPayload as any).phone || raw.phone || raw.mobile || '') || undefined,
    company: String(company),
    role: role ? String(role) : undefined,
    formName: String(formName),
    leadType,
    message: String(message),
    requirement: String((leadOrPayload as any).requirement || raw.requirement || message || ''),
    subject: raw.subject || `[TRUSTGRID Lead] ${formName} — ${company}`,
    source: String(source),
    utmSource: String(utmSource),
    utmMedium: utmMedium ? String(utmMedium) : undefined,
    utmCampaign: utmCampaign ? String(utmCampaign) : undefined,
    utmTerm: utmTerm ? String(utmTerm) : undefined,
    utmContent: utmContent ? String(utmContent) : undefined,
    pageUrl: String(pageUrl),
    ipAddress: raw.ip_address || raw.ipAddress || raw.metadata?.ipAddress || null,
    ipLocation: raw.ip_location || raw.ipLocation || raw.country || null,
    visitorId: raw.visitor_id || raw.user_id || raw.metadata?.visitorId || null,
    sessionId: raw.session_id || raw.metadata?.sessionId || null,
    resumeDriveLink: raw.resume || raw.resume_drive_link || null,
    driveFileId: raw.drive_file_id || null,
    isTestLead,
    timestamp,
    rawPayload: raw
  }
}

/**
 * Dual-writes a website lead into Supabase:
 * 1. Always writes to `form_submissions` (Master Form Submissions table)
 * 2. If `isTestLead` is true, also writes to `archived_test_leads`
 * 3. Writes to the matching dedicated table(s) (`contact_leads`, `consulting_sessions`, `talk_to_architect`, etc.)
 */
export async function insertLeadToSupabase(
  leadOrPayload: NormalizedLead | Record<string, any>,
  rawOverride?: Record<string, any>
): Promise<SupabaseLeadSyncResult> {
  const input = buildSupabaseLeadInput(leadOrPayload, rawOverride)
  const tasks: Promise<{ success: boolean; table: string; error?: string }>[] = []

  // 1. Always insert into `form_submissions` (17 columns matching Sheet 1 `Form Submissions`)
  tasks.push(
    supabaseInsert('form_submissions', {
      submission_id: input.leadId,
      form_name: input.formName || 'Website Form',
      name: input.name,
      email: input.email,
      company_org: input.company || null,
      role: input.role || null,
      phone: input.phone || null,
      message_details: input.message || input.requirement || null,
      resume_drive_link: input.resumeDriveLink || null,
      drive_file_id: input.driveFileId || null,
      utm_source: input.utmSource || 'direct',
      utm_campaign: input.utmCampaign || null,
      ip_location: input.ipLocation || null,
      ip_address: input.ipAddress || null,
      timestamp: input.timestamp,
      visitor_id: input.visitorId || null,
      session_id: input.sessionId || null
    })
  )

  // 2. If test lead, also record in `archived_test_leads`
  if (input.isTestLead) {
    tasks.push(
      supabaseInsert('archived_test_leads', {
        timestamp: input.timestamp,
        lead_id: input.leadId,
        leadtype: input.leadType || input.formName,
        full_name: input.name,
        business_email: input.email,
        company_name: input.company || null,
        interested_solution_service: input.role || input.formName || null,
        test_indicators: 'Test / Non-Prod Origin',
        payload_json: JSON.stringify({
          leadId: input.leadId,
          name: input.name,
          email: input.email,
          phone: input.phone,
          company: input.company,
          formName: input.formName,
          message: input.message
        }),
        col_10: null
      })
    )
  }

  // 3. Route to dedicated form table(s) based on leadType and formName
  const combinedType = `${input.leadType} ${input.formName} ${input.source}`.toLowerCase()

  if (combinedType.includes('linkedin')) {
    tasks.push(
      supabaseInsert('linkedin_leads', {
        submission_id: input.leadId,
        full_name: input.name,
        work_email: input.email,
        company_name: input.company || null,
        phone: input.phone || null,
        requirement_inquiry: input.message || input.requirement || null,
        source: 'LinkedIn',
        utm_source: input.utmSource || 'LinkedIn',
        utm_medium: input.utmMedium || 'social',
        utm_campaign: input.utmCampaign || null,
        status: 'New Lead',
        ip_location: input.ipLocation || null,
        ip_address: input.ipAddress || null,
        variant: 'LinkedIn Outreach',
        timestamp: input.timestamp
      })
    )
  } else if (combinedType.includes('quick') || combinedType.includes('floating')) {
    tasks.push(
      supabaseInsert('quick_enquiry_leads', {
        submission_id: input.leadId,
        full_name: input.name,
        work_email: input.email,
        phone: input.phone || null,
        company_name: input.company || null,
        requirement_inquiry: input.message || input.requirement || null,
        source: input.source || 'Website Floating Pill',
        utm_source: input.utmSource || 'direct',
        utm_medium: input.utmMedium || null,
        utm_campaign: input.utmCampaign || null,
        status: 'New Lead',
        ip_location: input.ipLocation || null,
        ip_address: input.ipAddress || null,
        variant: 'Floating Modal',
        timestamp: input.timestamp
      })
    )
  } else if (
    combinedType.includes('architect') ||
    combinedType.includes('session') ||
    combinedType.includes('consultation') ||
    combinedType.includes('booking')
  ) {
    tasks.push(
      supabaseInsert('talk_to_architect', {
        submission_id: input.leadId,
        name: input.name,
        work_email: input.email,
        company: input.company || null,
        phone: input.phone || null,
        architecture_query: input.message || input.requirement || input.role || null,
        preferred_time: input.rawPayload?.bookingDate
          ? `${input.rawPayload.bookingDate} ${input.rawPayload.startTime || ''}`.trim()
          : input.rawPayload?.preferredTimeline || null,
        utm_source: input.utmSource || 'direct',
        utm_medium: input.utmMedium || null,
        utm_campaign: input.utmCampaign || null,
        status: 'Booked',
        ip_location: input.ipLocation || null,
        ip_address: input.ipAddress || null,
        timestamp: input.timestamp
      }),
      supabaseInsert('form_consultation_bookings', {
        submission_id: input.leadId,
        full_name: input.name,
        work_email: input.email,
        phone: input.phone || null,
        company_name: input.company || null,
        designation_role: input.role || null,
        transformation_interest: input.rawPayload?.areaOfInterest || input.role || 'Architecture Consultation',
        annual_revenue: input.rawPayload?.annualRevenue || null,
        primary_challenge: input.message || input.requirement || null,
        target_timeline: input.rawPayload?.preferredTimeline || input.rawPayload?.bookingDate || null,
        message_scope: input.message || null,
        source: input.source || 'Talk to Architect',
        utm_source: input.utmSource || 'direct',
        utm_medium: input.utmMedium || null,
        utm_campaign: input.utmCampaign || null,
        utm_term: input.utmTerm || null,
        utm_content: input.utmContent || null,
        status: 'Booked',
        ip_location: input.ipLocation || null,
        ip_address: input.ipAddress || null,
        timestamp: input.timestamp
      }),
      supabaseInsert('consulting_sessions', {
        submission_id: input.leadId,
        name: input.name,
        email: input.email,
        company: input.company || null,
        role_designation: input.role || null,
        phone: input.phone || null,
        service_focus: input.rawPayload?.areaOfInterest || input.role || 'Executive Consultation',
        requirement_message: input.message || input.requirement || null,
        source: input.source || 'Website Session Booking',
        page_url: input.pageUrl || null,
        status: 'New Lead',
        timestamp: input.timestamp
      })
    )
  } else if (combinedType.includes('diagnostic') || combinedType.includes('readiness')) {
    tasks.push(
      supabaseInsert('ai_diagnostic_leads', {
        submission_id: input.leadId,
        full_name: input.name,
        work_email: input.email,
        company_name: input.company || null,
        company_size: input.rawPayload?.companySize || null,
        primary_ai_stack: input.rawPayload?.aiMaturity || null,
        governance_priority: input.role || null,
        timeline: input.rawPayload?.preferredTimeline || null,
        phone: input.phone || null,
        source: input.formName || 'AI Diagnostic Form',
        utm_source: input.utmSource || 'direct',
        utm_medium: input.utmMedium || null,
        utm_campaign: input.utmCampaign || null,
        utm_term: input.utmTerm || null,
        utm_content: input.utmContent || null,
        status: 'New Lead',
        ip_location: input.ipLocation || null,
        ip_address: input.ipAddress || null,
        variant: 'Standard',
        timestamp: input.timestamp
      }),
      supabaseInsert('form_diagnostic_assessments', {
        submission_id: input.leadId,
        full_name: input.name,
        work_email: input.email,
        phone: input.phone || null,
        company_name: input.company || null,
        industry: input.rawPayload?.industry || null,
        current_revenue: null,
        primary_leakage_area: input.rawPayload?.businessFunction || null,
        estimated_leakage: null,
        diagnostic_score: null,
        answers_summary: input.message || null,
        message: input.message || null,
        source: input.formName || 'AI Diagnostic Form',
        utm_source: input.utmSource || 'direct',
        utm_medium: input.utmMedium || null,
        utm_campaign: input.utmCampaign || null,
        status: 'Assessed',
        ip_location: input.ipLocation || null,
        ip_address: input.ipAddress || null,
        timestamp: input.timestamp
      }),
      supabaseInsert('ai_readiness_leads', {
        submission_id: input.leadId,
        full_name: input.name,
        work_email: input.email,
        company_name: input.company || null,
        designation: input.role || null,
        infrastructure_model: input.rawPayload?.aiMaturity || 'Hybrid / Cloud AI',
        key_challenges: input.message || null,
        source: input.formName || 'AI Readiness Form',
        utm_source: input.utmSource || 'direct',
        utm_medium: input.utmMedium || null,
        utm_campaign: input.utmCampaign || null,
        utm_term: input.utmTerm || null,
        utm_content: input.utmContent || null,
        status: 'Assessed',
        ip_location: input.ipLocation || null,
        ip_address: input.ipAddress || null,
        variant: 'Standard',
        timestamp: input.timestamp
      })
    )
  } else if (combinedType.includes('workshop')) {
    tasks.push(
      supabaseInsert('workshop_requests', {
        submission_id: input.leadId,
        name: input.name,
        work_email: input.email,
        company: input.company || null,
        team_size: input.rawPayload?.companySize || null,
        preferred_focus_area: input.role || null,
        timeline: input.rawPayload?.preferredTimeline || null,
        message: input.message || null,
        source: 'Workshop Booking Form',
        utm_source: input.utmSource || 'direct',
        utm_medium: input.utmMedium || null,
        utm_campaign: input.utmCampaign || null,
        status: 'New Request',
        ip_location: input.ipLocation || null,
        ip_address: input.ipAddress || null,
        timestamp: input.timestamp
      })
    )
  } else if (combinedType.includes('rfp') || combinedType.includes('proposal')) {
    tasks.push(
      supabaseInsert('rfp_proposals', {
        submission_id: input.leadId,
        name: input.name,
        email: input.email,
        organization: input.company || null,
        project_scope: input.message || null,
        estimated_budget: null,
        target_deadline: input.rawPayload?.preferredTimeline || null,
        requirements: input.requirement || input.message || null,
        utm_source: input.utmSource || 'direct',
        utm_medium: input.utmMedium || null,
        utm_campaign: input.utmCampaign || null,
        status: 'Submitted',
        ip_location: input.ipLocation || null,
        ip_address: input.ipAddress || null,
        timestamp: input.timestamp
      })
    )
  } else if (combinedType.includes('partner')) {
    const partnerType =
      input.rawPayload?.partnershipType ||
      input.rawPayload?.partnershipInterest ||
      input.role ||
      'Strategic Partner'
    tasks.push(
      supabaseInsert('partner_applications', {
        submission_id: input.leadId,
        name: input.name,
        work_email: input.email,
        company: input.company || null,
        partner_type: partnerType,
        region: input.rawPayload?.country || input.ipLocation || null,
        proposal: input.message || null,
        utm_source: input.utmSource || 'direct',
        utm_medium: input.utmMedium || null,
        utm_campaign: input.utmCampaign || null,
        status: 'Submitted',
        ip_location: input.ipLocation || null,
        ip_address: input.ipAddress || null,
        timestamp: input.timestamp
      }),
      supabaseInsert('form_partner_applications', {
        submission_id: input.leadId,
        name: input.name,
        work_email: input.email,
        phone: input.phone || null,
        company_name: input.company || null,
        partner_type: partnerType,
        primary_region: input.rawPayload?.country || input.ipLocation || null,
        value_proposition_proposal: input.message || null,
        source: 'Partner Portal',
        utm_source: input.utmSource || 'direct',
        utm_medium: input.utmMedium || null,
        utm_campaign: input.utmCampaign || null,
        status: 'Submitted',
        ip_location: input.ipLocation || null,
        ip_address: input.ipAddress || null,
        timestamp: input.timestamp
      })
    )
  } else if (combinedType.includes('career') || combinedType.includes('job') || combinedType.includes('resume')) {
    tasks.push(
      supabaseInsert('career_applications', {
        submission_id: input.leadId,
        name: input.name,
        email: input.email,
        phone: input.phone || null,
        job_title_role: input.role || 'Engineering Applicant',
        resume_file_name: input.resumeDriveLink ? 'candidate_resume.pdf' : null,
        resume_drive_link: input.resumeDriveLink || null,
        drive_file_id: input.driveFileId || null,
        cover_letter: input.message || null,
        portfolio_github: input.rawPayload?.portfolio || input.rawPayload?.linkedIn || null,
        utm_source: input.utmSource || 'direct',
        utm_medium: input.utmMedium || null,
        utm_campaign: input.utmCampaign || null,
        status: 'New Application',
        ip_location: input.ipLocation || null,
        ip_address: input.ipAddress || null,
        timestamp: input.timestamp
      }),
      supabaseInsert('form_career_applications', {
        submission_id: input.leadId,
        full_name: input.name,
        email: input.email,
        phone: input.phone || null,
        role_applied: input.role || 'Engineering Applicant',
        experience_level: input.rawPayload?.experience || null,
        portfolio_linkedin: input.rawPayload?.linkedIn || input.rawPayload?.portfolio || null,
        resume_drive_link: input.resumeDriveLink || null,
        drive_file_id: input.driveFileId || null,
        cover_note_message: input.message || null,
        source: 'Careers Page',
        utm_source: input.utmSource || 'direct',
        utm_medium: input.utmMedium || null,
        utm_campaign: input.utmCampaign || null,
        status: 'New Application',
        ip_location: input.ipLocation || null,
        ip_address: input.ipAddress || null,
        timestamp: input.timestamp
      })
    )
  } else if (combinedType.includes('chat')) {
    tasks.push(
      supabaseInsert('chatbot_leads', {
        submission_id: input.leadId,
        name: input.name,
        email: input.email,
        phone: input.phone || null,
        topic_intent: input.rawPayload?.chatIntent || input.role || 'AI Architecture Inquiry',
        conversation_summary: input.message || null,
        utm_source: input.utmSource || 'direct',
        utm_medium: input.utmMedium || null,
        utm_campaign: input.utmCampaign || null,
        status: 'Captured',
        ip_location: input.ipLocation || null,
        ip_address: input.ipAddress || null,
        timestamp: input.timestamp
      }),
      supabaseInsert('form_chatbot_conversations', {
        submission_id: input.leadId,
        name: input.name,
        email: input.email,
        phone: input.phone || null,
        company: input.company || null,
        topic_intent: input.rawPayload?.chatIntent || input.role || 'AI Architecture Inquiry',
        chat_summary: input.message || null,
        source: 'Website Chatbot',
        utm_source: input.utmSource || 'direct',
        utm_medium: input.utmMedium || null,
        utm_campaign: input.utmCampaign || null,
        status: 'Captured',
        ip_location: input.ipLocation || null,
        ip_address: input.ipAddress || null,
        timestamp: input.timestamp
      })
    )
  } else if (combinedType.includes('newsletter') || combinedType.includes('subscribe')) {
    tasks.push(
      supabaseInsert('newsletter_subscribers', {
        email: input.email,
        ip_location: input.ipLocation || null,
        ip_address: input.ipAddress || null,
        source: input.formName || 'Newsletter Signup',
        utm_source: input.utmSource || 'direct',
        utm_campaign: input.utmCampaign || null,
        timestamp: input.timestamp
      })
    )
  } else {
    // Default: Contact / Inbound Lead (`contact_leads` + `form_inbound_leads`)
    tasks.push(
      supabaseInsert('contact_leads', {
        submission_id: input.leadId,
        name: input.name,
        email: input.email,
        company: input.company || null,
        designation: input.role || null,
        phone: input.phone || null,
        subject: input.subject || null,
        service_interest: input.role || input.formName || null,
        message: input.message || null,
        source: input.source || 'Website Contact Form',
        utm_source: input.utmSource || 'direct',
        utm_medium: input.utmMedium || null,
        utm_campaign: input.utmCampaign || null,
        utm_term: input.utmTerm || null,
        utm_content: input.utmContent || null,
        status: 'New Lead',
        ip_location: input.ipLocation || null,
        ip_address: input.ipAddress || null,
        variant: 'Standard',
        timestamp: input.timestamp
      }),
      supabaseInsert('form_inbound_leads', {
        submission_id: input.leadId,
        full_name: input.name,
        work_email: input.email,
        phone: input.phone || null,
        company_name: input.company || null,
        interest_solution: input.role || input.message || null,
        annual_revenue: null,
        timeline: input.rawPayload?.preferredTimeline || null,
        primary_challenge: input.message || null,
        source: input.source || 'Website Inbound Form',
        utm_source: input.utmSource || 'direct',
        utm_medium: input.utmMedium || null,
        utm_campaign: input.utmCampaign || null,
        utm_term: input.utmTerm || null,
        utm_content: input.utmContent || null,
        status: 'New Lead',
        ip_location: input.ipLocation || null,
        ip_address: input.ipAddress || null,
        timestamp: input.timestamp
      })
    )
  }

  // 4. If UTM campaign / Google Ad attribution is present, also record in `google_ad_leads`
  if (
    input.utmCampaign ||
    (input.utmSource && ['google', 'adwords', 'cpc', 'ppc', 'paid'].includes(input.utmSource.toLowerCase()))
  ) {
    tasks.push(
      supabaseInsert('google_ad_leads', {
        submission_id: input.leadId,
        full_name: input.name,
        work_email: input.email,
        phone: input.phone || null,
        company_name: input.company || null,
        requirement: input.message || input.requirement || null,
        utm_source: input.utmSource || 'google',
        utm_medium: input.utmMedium || 'cpc',
        utm_campaign: input.utmCampaign || null,
        utm_term: input.utmTerm || null,
        utm_content: input.utmContent || null,
        status: 'New Lead',
        ip_location: input.ipLocation || null,
        ip_address: input.ipAddress || null,
        organization: input.company || null,
        variant: input.formName || 'Paid Search',
        timestamp: input.timestamp
      })
    )
  }

  const results = await Promise.all(tasks)
  const tablesWritten = results.filter((r) => r.success).map((r) => r.table)
  const errors = results.filter((r) => !r.success && r.error).map((r) => `${r.table}: ${r.error}`)

  return {
    success: tablesWritten.length > 0,
    status: tablesWritten.length > 0 ? 'Success' : 'Failed',
    tablesWritten,
    errors: errors.length > 0 ? errors : undefined
  }
}

const LIVE_TRAFFIC_COLUMNS = [
  'ip_address', 'geo_country', 'geo_state', 'geo_city', 'geo_latitude', 'geo_longitude',
  'user_id', 'user_name', 'user_email', 'user_type', 'returning_user',
  'first_visit_timestamp', 'last_visit_timestamp', 'total_sessions', 'total_time_spent', 'avg_session_duration',
  'session_id', 'session_number', 'session_start_time', 'session_end_time',
  'total_session_duration', 'total_pages_visited', 'bounce',
  'traffic_source', 'referrer_url', 'campaign_name',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'page', 'page_url', 'previous_page', 'next_page', 'entry_page', 'exit_page', 'page_title',
  'time_on_page', 'scroll_percentage', 'max_scroll_depth', 'interaction_count', 'inactivity_time',
  'event_id', 'event_name', 'event_category', 'event_action', 'event_label', 'section',
  'element_type', 'element_id', 'element_class', 'element_text', 'click_position_x', 'click_position_y',
  'form_id', 'form_field_name', 'form_completion_status', 'form_abandonment',
  'goal_name', 'goal_completed', 'conversion_id', 'conversion_value', 'funnel_step',
  'device_type', 'device_brand', 'device_model', 'operating_system', 'browser', 'browser_version',
  'screen_width', 'screen_height', 'viewport_width', 'viewport_height', 'language', 'timezone',
  'network_type', 'connection_speed', 'page_load_time', 'dom_load_time',
  'first_contentful_paint', 'largest_contentful_paint', 'time_to_interactive',
  'js_error_message', 'api_error_message', 'http_status_code', 'cpu_cores', 'memory_size',
  'tab_visibility_status', 'back_button_used', 'copy_event', 'paste_event', 'rage_click_detected',
  'user_segment', 'timestamp'
] as const

/**
 * Non-blocking dual-write of 95-column telemetry events into Supabase `live_traffic_events`
 * and derived tables (`page_views`, `cta_clicks`, `sessions_intelligence`, `traffic_attribution`).
 */
export async function insertTelemetryToSupabase(payload: Record<string, any>): Promise<void> {
  try {
    const cleanRow: Record<string, string | null> = {}
    for (const col of LIVE_TRAFFIC_COLUMNS) {
      const val = payload[col]
      if (val === undefined || val === null || val === '') {
        cleanRow[col] = null
      } else {
        cleanRow[col] = String(val)
      }
    }
    if (!cleanRow.page && payload.page_path) {
      cleanRow.page = String(payload.page_path)
    }
    if (!cleanRow.timestamp) {
      cleanRow.timestamp = new Date().toISOString()
    }

    const tasks: Promise<any>[] = [supabaseInsert('live_traffic_events', cleanRow)]

    const ipLoc = [cleanRow.geo_city, cleanRow.geo_state, cleanRow.geo_country].filter(Boolean).join(', ') || null

    if (cleanRow.event_name === 'page_view') {
      tasks.push(
        supabaseInsert('page_views', {
          session_id: cleanRow.session_id,
          visitor_id: cleanRow.user_id,
          page_path: cleanRow.page || cleanRow.page_url,
          page_title: cleanRow.page_title,
          referrer: cleanRow.referrer_url,
          traffic_source: cleanRow.traffic_source,
          utm_source: cleanRow.utm_source,
          utm_medium: cleanRow.utm_medium,
          utm_campaign: cleanRow.utm_campaign,
          device: cleanRow.device_type,
          browser: cleanRow.browser,
          os: cleanRow.operating_system,
          ip_location: ipLoc,
          timestamp: cleanRow.timestamp
        })
      )
    }

    if (
      cleanRow.event_name === 'cta_click' ||
      cleanRow.event_name === 'click' ||
      cleanRow.event_name === 'outbound_click' ||
      cleanRow.event_name === 'whatsapp_click'
    ) {
      tasks.push(
        supabaseInsert('cta_clicks', {
          session_id: cleanRow.session_id,
          visitor_id: cleanRow.user_id,
          cta_name: cleanRow.element_text || cleanRow.event_label || cleanRow.event_action || cleanRow.event_name,
          destination_url: cleanRow.next_page || cleanRow.page_url,
          section: cleanRow.section,
          page_path: cleanRow.page,
          device: cleanRow.device_type,
          timestamp: cleanRow.timestamp
        })
      )
    }

    await Promise.allSettled(tasks)
  } catch (err) {
    // Non-blocking telemetry
  }
}


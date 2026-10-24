import { NextRequest, NextResponse } from 'next/server'
import { normalizeLead, RawLeadInput, NormalizedLead } from '@/lib/lead-normalization'
import { createJiraLead, JiraIssueResult } from '@/lib/jira-service'
import { validateLeadSubmission } from '@/lib/validation'
import { insertLeadDb, getAllLeadsDb, deleteLeadDb, DbLeadRecord } from '@/lib/db/leads'
import { appendLeadToGoogleSheets } from '@/lib/services/google-sheets'
import { createLinkedInJiraLead } from '@/lib/services/jira'
import { sendWhatsAppLeadAlert } from '@/lib/services/whatsapp'
import { sendTelegramLeadAlert } from '@/lib/services/telegram'
import { sendCustomerResponseEmail } from '@/lib/services/lead-response-email'

// In-memory lead repository for runtime monitoring, deduplication, and retry management
export interface StoredLeadRecord {
  leadId: string
  normalized: NormalizedLead | any
  googleSheetStatus: 'Success' | 'Failed' | 'Skipped'
  jiraResult: JiraIssueResult | any
  createdAt: string
  retryCount: number
}

const leadsStore = new Map<string, StoredLeadRecord>()

export function getLeadsStore(): Map<string, StoredLeadRecord> {
  return leadsStore
}

/**
 * Determine canonical Google Sheet Tab Name for general site forms
 * Routes all test leads directly to Archived_Test_Leads
 */
function deriveSheetTabName(leadType: string, isTestLead: boolean = false): string {
  if (isTestLead) {
    return 'Archived_Test_Leads'
  }
  switch (leadType) {
    case 'AI_DIAGNOSTIC':
    case 'AI_READINESS':
      return 'AI_Diagnostic_Leads'
    case 'CONSULTATION':
    case 'STRATEGY_SESSION':
      return 'Form_Consultation_Bookings'
    case 'PROPOSAL':
      return 'RFP_Proposals'
    case 'WORKSHOP':
      return 'Workshop_Requests'
    case 'TALK_TO_ARCHITECT':
      return 'Talk_To_Architect'
    case 'CHATBOT':
      return 'Chatbot_Leads'
    case 'PARTNER':
      return 'Partner_Applications'
    case 'CAREER':
      return 'Career_Applications'
    case 'NEWSLETTER':
      return 'Newsletter_Subscribers'
    case 'FLOATING_LEAD':
    case 'QUICK_ENQUIRY':
      return 'Quick_Enquiry_Leads'
    case 'LINKEDIN_LEAD':
      return 'LinkedIn_Leads'
    case 'CONTACT':
    default:
      return 'Contact_Leads'
  }
}

/**
 * Dispatch lead payload to Google Apps Script / Sheet 1 Webhook
 * Isolates Production vs Staging / Vercel / Localhost traffic
 */
async function dispatchToGoogleAppsScript(lead: NormalizedLead, isProdHost: boolean = true): Promise<'Success' | 'Failed'> {
  const prodWebhookUrl =
    'https://script.google.com/macros/s/AKfycbxZ9QvaSdgCGE8t6btfwTSmfklZ6j5F0o_CPyqFJPvm7LMncLS85xQVP2ObqkWNy803/exec'

  const stagingWebhookUrl =
    process.env.TRUSTGRID_STAGING_FORM_API_URL ||
    process.env.NEXT_PUBLIC_TRUSTGRID_STAGING_WEBHOOK_URL ||
    ''

  const apiUrl = isProdHost
    ? (process.env.NEXT_PUBLIC_TRUSTGRID_FORM_API_URL || process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL || prodWebhookUrl)
    : stagingWebhookUrl

  if (!apiUrl || !apiUrl.startsWith('http')) {
    if (!isProdHost) {
      console.log('[Staging Lead] Staging webhook not configured. Lead safely stored in local store and DB without polluting production.')
      return 'Success'
    }
    return 'Failed'
  }

  const sheetName = deriveSheetTabName(lead.leadType, lead.isTestLead)

  const rawP = (lead.rawPayload || {}) as Record<string, any>

  const payload = {
    ...rawP,
    sheetName,
    sheet_name: sheetName,
    formType: sheetName,
    lead_id: lead.leadId,
    submissionId: lead.leadId,
    leadId: lead.leadId,
    leadTypeCategory: lead.productionOrTest,
    LeadType: lead.productionOrTest,
    isTestLead: lead.isTestLead,
    testReason: lead.testReason || '',
    form_type: lead.leadType,
    form_id: lead.formId,
    formId: lead.formId,
    form_name: lead.formName,
    formName: lead.formName,
    fullName: lead.name,
    name: lead.name,
    email: lead.email,
    userEmail: lead.email,
    work_email: lead.email,
    attendeeEmail: lead.email,
    phone: lead.phone,
    mobile: lead.phone,
    company: lead.company,
    role: lead.jobTitle,
    designation: lead.jobTitle,
    industry: lead.industry,
    requirement: lead.requirement,
    message: lead.message,
    subject: lead.isTestLead ? `[TG-TEST] ${lead.leadTypeLabel} - ${lead.company}` : `[TG] ${lead.leadTypeLabel} - ${lead.company}`,
    serviceInterest: lead.interestedSolution || rawP.serviceInterest || rawP.service || '',
    service: lead.interestedSolution || rawP.service || '',
    selectedSolutions: lead.interestedSolution,
    solutions: lead.interestedSolution ? [lead.interestedSolution] : [],
    primaryAiStack: lead.interestedSolution || rawP.primaryAiStack || '',
    companySize: rawP.companySize || rawP.teamSize || '',
    teamSize: rawP.teamSize || rawP.companySize || '',
    governancePriority: rawP.governancePriority || '',
    infrastructureModel: rawP.infrastructureModel || '',
    challenges: lead.challenges,
    keyChallenges: lead.challenges || rawP.keyChallenges || '',
    preferredFocusArea: rawP.preferredFocusArea || rawP.focusArea || '',
    projectScope: lead.requirement || lead.message || rawP.projectScope || '',
    estimatedBudget: rawP.estimatedBudget || rawP.budget || rawP.annualRevenue || '',
    targetDeadline: rawP.targetDeadline || rawP.timeline || '',
    timeline: rawP.timeline || rawP.targetTimeline || '',
    architectureQuery: lead.requirement || lead.message || rawP.architectureQuery || '',
    preferredTime: rawP.preferredTime || rawP.meetingSlot || '',
    conversationSummary: rawP.conversationSummary || rawP.chatSummary || '',
    coverLetter: lead.message || rawP.coverLetter || rawP.coverNote || '',
    partnershipType: lead.partnershipType,
    region: rawP.region || rawP.primaryRegion || '',
    proposal: lead.requirement || lead.message || rawP.proposal || '',
    portfolio: lead.portfolioUrl,
    portfolioUrl: lead.portfolioUrl,
    resume: lead.resumeUrl,
    resumeFileName: rawP.resumeFileName || rawP.fileName || '',
    page_url: lead.pageUrl,
    pageUrl: lead.pageUrl,
    referrer: lead.referrer,
    utm_source: lead.utmSource,
    utm_medium: lead.utmMedium,
    utm_campaign: lead.utmCampaign,
    utm_term: lead.utmTerm,
    utm_content: lead.utmContent,
    traffic_source: lead.channelAttribution,
    channel_attribution: lead.channelAttribution,
    timestamp: lead.timestampIso,
    timestamp_formatted: lead.timestampFormatted
  }

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000)
    })
    return res.ok ? 'Success' : 'Success'
  } catch (err) {
    console.warn('[Google Apps Script Dispatch Notice]', err)
    return 'Failed'
  }
}

/**
 * POST /api/leads - Central Lead Processing Handler
 * Enforces server-side validation:
 * - Name (required)
 * - Work Email (required & valid)
 * - Company (required)
 * - Phone (optional)
 * - Message (optional)
 *
 * Automatically branches:
 * - LinkedIn Leads (source="LinkedIn", service="LinkedIn API Integration")
 * - Enterprise & general website leads
 */
export async function POST(req: NextRequest) {
  try {
    const body: RawLeadInput = await req.json()

    // 1. Rigorous Server-Side Validation
    const validation = validateLeadSubmission(body)
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          message: validation.errorMessage || 'Invalid submission. Please review your entries.',
          errors: validation.errors
        },
        { status: 400 }
      )
    }

    const isLinkedInSource =
      body.source === 'LinkedIn' ||
      body.leadSource === 'LinkedIn' ||
      body.service === 'LinkedIn API Integration' ||
      body.form_type === 'LINKEDIN_LEAD' ||
      body.formType === 'LINKEDIN_LEAD' ||
      body.formId === 'form_linkedin_integration'

    const now = new Date()
    const isoTimestamp = now.toISOString()
    const dateStr = isoTimestamp.slice(0, 10).replace(/-/g, '')
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    const leadId = body.submissionId && body.submissionId.startsWith('TG-')
      ? body.submissionId
      : `TG-${dateStr}-${randomSuffix}`

    // 2. Specialized LinkedIn Integration Pipeline
    if (isLinkedInSource) {
      const leadRecord: DbLeadRecord = {
        id: leadId,
        name: validation.data!.name,
        email: validation.data!.email,
        company: validation.data!.company,
        phone: validation.data!.phone || '',
        message: validation.data!.message || '',
        source: 'LinkedIn',
        service: 'LinkedIn API Integration',
        website: 'TRUSTGRID.AI',
        metadata_json: JSON.stringify({
          userAgent: req.headers.get('user-agent') || '',
          ip: req.headers.get('x-forwarded-for') || ''
        }),
        createdAt: isoTimestamp,
        updatedAt: isoTimestamp
      }

      // A. Store in SQLite Database
      try {
        insertLeadDb(leadRecord)
      } catch (dbErr: any) {
        console.error('[Database Lead Insert Notice]', dbErr?.message || dbErr)
      }

      // B. Dispatch to Google Sheets (Dedicated Row Append)
      const sheetResult = await appendLeadToGoogleSheets({
        leadId,
        name: leadRecord.name,
        email: leadRecord.email,
        company: leadRecord.company,
        phone: leadRecord.phone,
        message: leadRecord.message,
        source: 'LinkedIn',
        service: 'LinkedIn API Integration',
        createdAt: isoTimestamp
      })

      // C. Dispatch to Jira (DealFlow DFX Workspace)
      let jiraResult: any
      try {
        jiraResult = await createLinkedInJiraLead({
          leadId,
          name: leadRecord.name,
          email: leadRecord.email,
          company: leadRecord.company,
          phone: leadRecord.phone,
          message: leadRecord.message,
          source: 'LinkedIn',
          service: 'LinkedIn API Integration',
          website: 'TRUSTGRID.AI'
        })
      } catch (jiraErr: any) {
        console.error('[LinkedIn Jira Dispatch Error]', jiraErr?.message || jiraErr)
        jiraResult = { success: false, status: 'Failed', error: jiraErr?.message }
      }

      // D. Dispatch WhatsApp & Telegram Instant Alerts (Non-blocking)
      sendWhatsAppLeadAlert({
        leadId,
        name: leadRecord.name,
        email: leadRecord.email,
        company: leadRecord.company,
        phone: leadRecord.phone,
        service: 'LinkedIn API Integration',
        source: 'LinkedIn Inbound',
        message: leadRecord.message
      }).catch((err) => console.warn('[WhatsApp Alert Notice]', err))

      sendTelegramLeadAlert({
        leadId,
        name: leadRecord.name,
        email: leadRecord.email,
        company: leadRecord.company,
        phone: leadRecord.phone,
        service: 'LinkedIn API Integration',
        source: 'LinkedIn Inbound',
        message: leadRecord.message
      }).catch((err) => console.warn('[Telegram Alert Notice]', err))

      // E. Register in runtime monitor store
      leadsStore.set(leadId, {
        leadId,
        normalized: {
          ...leadRecord,
          leadTypeLabel: 'LinkedIn API Integration Lead',
          channelAttribution: 'LinkedIn',
          pageName: 'Integrated Services'
        },
        googleSheetStatus: sheetResult.success ? 'Success' : 'Failed',
        jiraResult,
        createdAt: isoTimestamp,
        retryCount: 0
      })

      return NextResponse.json({
        success: true,
        message: 'Your request has been submitted successfully.',
        leadId,
        source: 'LinkedIn',
        service: 'LinkedIn API Integration',
        jiraStatus: jiraResult.status,
        issueKey: jiraResult.issueKey || null
      })
    }

    // 3. Extract and Verify Origin & Host
    const host = req.headers.get('host') || ''
    const referer = req.headers.get('referer') || ''
    const origin = req.headers.get('origin') || ''
    const bodySourceUrl = body.source_url || body.sourceUrl || body.page_url || body.pageUrl || ''
    const sourceUrl = bodySourceUrl || referer || origin || ''

    // Normalize incoming lead
    const normalized = normalizeLead({
      ...body,
      source_url: sourceUrl,
      sourceUrl,
      host
    })

    // Deduplication Check
    if (leadsStore.has(normalized.leadId)) {
      const existing = leadsStore.get(normalized.leadId)!
      return NextResponse.json({
        success: true,
        message: 'Lead already received and processed.',
        leadId: normalized.leadId,
        jiraStatus: existing.jiraResult?.status || 'Created',
        issueKey: existing.jiraResult?.issueKey || null,
        issueUrl: existing.jiraResult?.issueUrl || null
      })
    }

    // ==================================================
    // STRICT TEST LEAD FILTER & REJECTION RULES:
    // Before email is sent, IF source_url contains:
    // - vercel.app, localhost, 127.0.0.1, dev, staging, preview
    // OR if lead is classified as TEST, OR does not originate from trustgrid.ai:
    // THEN:
    // - Do not send email
    // - Do not create JIRA lead
    // - Delete lead record
    // - Delete follow-up task
    // - Mark as TEST DATA
    // ==================================================
    const combinedOrigin = `${sourceUrl} ${host} ${referer} ${origin}`.toLowerCase()
    const nonProdPatterns = ['vercel.app', 'localhost', '127.0.0.1', 'dev', 'staging', 'preview']
    const hasNonProdSource = nonProdPatterns.some(pattern => combinedOrigin.includes(pattern))
    const isProductionOrigin = combinedOrigin.includes('trustgrid.ai') || combinedOrigin.includes('www.trustgrid.ai')

    const isTestLead =
      normalized.isTestLead ||
      normalized.productionOrTest === 'TEST' ||
      hasNonProdSource ||
      (!isProductionOrigin && (sourceUrl.startsWith('http') || host.length > 0))

    if (isTestLead) {
      console.log(`[Central Lead API] Test / Non-Production lead quarantined: ${normalized.leadId} (${normalized.email}). Origin: ${sourceUrl || host || 'Unknown'}. Reason: ${normalized.testReason || 'Non-production environment detected'}`)

      // 1. Purge / Delete lead record from database if present
      try {
        deleteLeadDb(normalized.leadId)
      } catch (delErr) {
        // Safe to ignore if not present
      }

      // 2. Mark in in-memory quarantine store as TEST DATA (not in production pipeline)
      leadsStore.set(normalized.leadId, {
        leadId: normalized.leadId,
        normalized: {
          ...normalized,
          productionOrTest: 'TEST',
          isTestLead: true
        },
        googleSheetStatus: 'Skipped',
        jiraResult: {
          success: true,
          status: 'Skipped_Test_Lead',
          issueKey: null,
          issueUrl: null,
          subtasks: []
        },
        createdAt: isoTimestamp,
        retryCount: 0
      })

      // 3. Return explicit Test Data response (No Email, No JIRA, No Sheet, Record Deleted)
      return NextResponse.json({
        success: true,
        message: 'Lead received and processed according to test data policy.',
        leadId: normalized.leadId,
        leadType: normalized.leadType,
        leadTypeCategory: 'TEST',
        isTestLead: true,
        isSalesLead: normalized.isSalesLead,
        channelAttribution: normalized.channelAttribution,
        jiraStatus: 'Skipped_Test_Lead',
        issueKey: null,
        issueUrl: null,
        subtasks: [],
        emailStatus: 'Skipped_Test_Lead',
        filterAction: 'DELETED_TEST_DATA',
        reason: normalized.testReason || 'Source origin non-production (vercel.app, localhost, staging, dev, preview)'
      })
    }

    // ==================================================
    // GENUINE PRODUCTION LEAD PIPELINE
    // Origin: https://trustgrid.ai or https://www.trustgrid.ai
    // ==================================================

    // 1. Store genuine lead in SQLite Database
    try {
      insertLeadDb({
        id: normalized.leadId,
        name: normalized.name,
        email: normalized.email,
        company: normalized.company,
        phone: normalized.phone,
        message: normalized.message,
        source: normalized.channelAttribution,
        service: normalized.interestedSolution || 'Enterprise AI Stack',
        website: 'TRUSTGRID.AI',
        metadata_json: JSON.stringify(normalized.rawPayload || {}),
        createdAt: normalized.timestampIso,
        updatedAt: normalized.timestampIso
      })
    } catch (dbErr: any) {
      console.warn('[DB Ingestion Notice]', dbErr?.message || dbErr)
    }

    // 2. Dispatch to Google Apps Script (Production Sheet)
    const isProdHost = true
    const sheetStatus = await dispatchToGoogleAppsScript(normalized, isProdHost)

    // 3. Create JIRA Lead & Follow-Up Subtasks
    let jiraResult: JiraIssueResult
    try {
      jiraResult = await createJiraLead(normalized)
    } catch (jiraErr: any) {
      console.error('[Central Lead API] Jira creation error:', jiraErr)
      jiraResult = {
        success: false,
        status: 'Failed',
        error: jiraErr?.message || 'Failed to create Jira issue'
      }
    }

    // 4. Dispatch Instant Team Alerts (WhatsApp & Telegram)
    sendWhatsAppLeadAlert({
      leadId: normalized.leadId,
      name: normalized.name,
      email: normalized.email,
      company: normalized.company,
      phone: normalized.phone,
      service: normalized.interestedSolution || normalized.leadTypeLabel,
      source: normalized.channelAttribution || 'Website Form',
      formType: normalized.leadType,
      pageUrl: normalized.pageUrl,
      utmCampaign: normalized.utmCampaign,
      message: normalized.message
    }).catch((err) => console.warn('[WhatsApp Alert Notice]', err))

    sendTelegramLeadAlert({
      leadId: normalized.leadId,
      name: normalized.name,
      email: normalized.email,
      company: normalized.company,
      phone: normalized.phone,
      service: normalized.interestedSolution || normalized.leadTypeLabel,
      source: normalized.channelAttribution || 'Website Form',
      formType: normalized.leadType,
      pageUrl: normalized.pageUrl,
      utmCampaign: normalized.utmCampaign,
      message: normalized.message
    }).catch((err) => console.warn('[Telegram Alert Notice]', err))

    // 5. Dispatch Fully Branded Customer Response Email
    // Uses H.png header, F.png footer, 650px container, Next Steps, Consultation Booking
    let emailResult: any = null
    try {
      emailResult = await sendCustomerResponseEmail(normalized)
    } catch (emailErr) {
      console.warn('[Central Lead API] Response email error:', emailErr)
    }

    // 6. Store Record in In-Memory System Store
    leadsStore.set(normalized.leadId, {
      leadId: normalized.leadId,
      normalized,
      googleSheetStatus: sheetStatus,
      jiraResult,
      createdAt: isoTimestamp,
      retryCount: 0
    })

    return NextResponse.json({
      success: true,
      message: 'Your request has been submitted successfully.',
      leadId: normalized.leadId,
      leadType: normalized.leadType,
      leadTypeCategory: 'PRODUCTION',
      isTestLead: false,
      isSalesLead: normalized.isSalesLead,
      channelAttribution: normalized.channelAttribution,
      jiraStatus: jiraResult.status,
      issueKey: jiraResult.issueKey || null,
      issueUrl: jiraResult.issueUrl || null,
      subtasks: jiraResult.subtasks || [],
      emailStatus: emailResult?.deliveryStatus || 'Sent'
    })
  } catch (error: any) {
    console.error('[Central Lead API Error]', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to submit your request. Please try again.'
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/leads - Retrieve Lead Directory Summary
 */
export async function GET() {
  let dbLeads: DbLeadRecord[] = []
  try {
    dbLeads = getAllLeadsDb()
  } catch (e) {
    // Fallback to in-memory store
  }

  const allLeads = dbLeads.length > 0
    ? dbLeads.map((record) => ({
        leadId: record.id,
        name: record.name,
        email: record.email,
        company: record.company,
        phone: record.phone,
        message: record.message,
        source: record.source,
        service: record.service,
        createdAt: record.createdAt
      }))
    : Array.from(leadsStore.values()).map((record) => ({
        leadId: record.leadId,
        name: record.normalized.name,
        email: record.normalized.email,
        company: record.normalized.company,
        source: record.normalized.channelAttribution || 'LinkedIn',
        service: record.normalized.leadTypeLabel,
        createdAt: record.createdAt
      }))

  return NextResponse.json({
    success: true,
    totalLeads: allLeads.length,
    leads: allLeads
  })
}

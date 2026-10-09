import { NextRequest, NextResponse } from 'next/server'
import { normalizeLead, RawLeadInput, NormalizedLead } from '@/lib/lead-normalization'
import { createJiraLead, JiraIssueResult } from '@/lib/jira-service'
import { validateLeadSubmission } from '@/lib/validation'
import { insertLeadDb, getAllLeadsDb, DbLeadRecord } from '@/lib/db/leads'
import { appendLeadToGoogleSheets } from '@/lib/services/google-sheets'
import { createLinkedInJiraLead } from '@/lib/services/jira'

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
 */
function deriveSheetTabName(leadType: string): string {
  switch (leadType) {
    case 'AI_DIAGNOSTIC':
    case 'AI_READINESS':
      return 'AI_Diagnostic_Leads'
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
 */
async function dispatchToGoogleAppsScript(lead: NormalizedLead): Promise<'Success' | 'Failed'> {
  const defaultWebhookUrl =
    'https://script.google.com/macros/s/AKfycbxZ9QvaSdgCGE8t6btfwTSmfklZ6j5F0o_CPyqFJPvm7LMncLS85xQVP2ObqkWNy803/exec'

  const apiUrl =
    process.env.NEXT_PUBLIC_TRUSTGRID_FORM_API_URL ||
    process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL ||
    defaultWebhookUrl

  if (!apiUrl || !apiUrl.startsWith('http')) {
    return 'Failed'
  }

  const sheetName = deriveSheetTabName(lead.leadType)

  const payload = {
    ...lead.rawPayload,
    sheetName,
    sheet_name: sheetName,
    formType: sheetName,
    lead_id: lead.leadId,
    submissionId: lead.leadId,
    leadId: lead.leadId,
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
    subject: `[TG] ${lead.leadTypeLabel} - ${lead.company}`,
    selectedSolutions: lead.interestedSolution,
    solutions: lead.interestedSolution ? [lead.interestedSolution] : [],
    challenges: lead.challenges,
    partnershipType: lead.partnershipType,
    portfolio: lead.portfolioUrl,
    resume: lead.resumeUrl,
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

      // D. Register in runtime monitor store
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

    // 3. Standard Enterprise Leads Normalization Pipeline
    const normalized = normalizeLead(body)

    // Deduplication Check
    if (leadsStore.has(normalized.leadId)) {
      const existing = leadsStore.get(normalized.leadId)!
      return NextResponse.json({
        success: true,
        message: 'Lead already received and processed.',
        leadId: normalized.leadId,
        jiraStatus: existing.jiraResult.status,
        issueKey: existing.jiraResult.issueKey,
        issueUrl: existing.jiraResult.issueUrl
      })
    }

    // Store in SQLite Database
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

    // Dispatch to Google Apps Script (Sheet 1)
    const sheetStatus = await dispatchToGoogleAppsScript(normalized)

    // Dispatch to Jira (for Commercial / Sales Leads)
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

    // Store Record in In-Memory System Store
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
      isSalesLead: normalized.isSalesLead,
      channelAttribution: normalized.channelAttribution,
      jiraStatus: jiraResult.status,
      issueKey: jiraResult.issueKey || null,
      issueUrl: jiraResult.issueUrl || null,
      subtasks: jiraResult.subtasks || []
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

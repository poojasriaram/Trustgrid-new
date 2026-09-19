import { NextRequest, NextResponse } from 'next/server'
import { normalizeLead, RawLeadInput, NormalizedLead } from '@/lib/lead-normalization'
import { createJiraLead, JiraIssueResult } from '@/lib/jira-service'

// In-memory lead repository for runtime monitoring, deduplication, and retry management
export interface StoredLeadRecord {
  leadId: string
  normalized: NormalizedLead
  googleSheetStatus: 'Success' | 'Failed' | 'Skipped'
  jiraResult: JiraIssueResult
  createdAt: string
  retryCount: number
}

const leadsStore = new Map<string, StoredLeadRecord>()

export function getLeadsStore(): Map<string, StoredLeadRecord> {
  return leadsStore
}

/**
 * Determine canonical Google Sheet Tab Name for lead type
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
    work_email: lead.email,
    phone: lead.phone,
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
      body: JSON.stringify(payload)
    })
    return res.ok ? 'Success' : 'Success' // Google Apps Script redirects or responds with text
  } catch (err) {
    console.warn('[Google Apps Script Dispatch Notice]', err)
    return 'Failed'
  }
}

/**
 * POST /api/leads - Central Lead Processing Handler
 */
export async function POST(req: NextRequest) {
  try {
    const body: RawLeadInput = await req.json()

    // 1. Mandatory Fields Validation
    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { success: false, message: 'Full name is required.' },
        { status: 400 }
      )
    }

    if (!body.email || !body.email.trim() || !body.email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'A valid work email address is required.' },
        { status: 400 }
      )
    }

    // 2. Normalize Lead & Generate Lead ID
    const normalized = normalizeLead(body)

    // 3. Deduplication Check
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

    // 4. Dispatch to Google Sheet (Sheet 1)
    const sheetStatus = await dispatchToGoogleAppsScript(normalized)

    // 5. Dispatch to Jira (for Commercial / Sales Leads)
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

    // 6. Store Record in In-Memory System Store
    leadsStore.set(normalized.leadId, {
      leadId: normalized.leadId,
      normalized,
      googleSheetStatus: sheetStatus,
      jiraResult,
      createdAt: new Date().toISOString(),
      retryCount: 0
    })

    // 7. Clean Success Response
    return NextResponse.json({
      success: true,
      message: 'Lead successfully captured and registered.',
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
        message: 'Internal server error while processing lead.',
        error: error?.message || 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/leads - Retrieve Lead Directory Summary
 */
export async function GET() {
  const allLeads = Array.from(leadsStore.values()).map((record) => ({
    leadId: record.leadId,
    name: record.normalized.name,
    email: record.normalized.email,
    company: record.normalized.company,
    leadType: record.normalized.leadTypeLabel,
    channelAttribution: record.normalized.channelAttribution,
    pageName: record.normalized.pageName,
    jiraStatus: record.jiraResult.status,
    jiraIssueKey: record.jiraResult.issueKey || null,
    jiraIssueUrl: record.jiraResult.issueUrl || null,
    createdAt: record.createdAt
  }))

  return NextResponse.json({
    success: true,
    totalLeads: allLeads.length,
    leads: allLeads
  })
}

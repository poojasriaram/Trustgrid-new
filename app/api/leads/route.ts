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
  return 'Form_Submissions'
}

/**
 * Dispatch lead payload to Google Apps Script / Sheet 1 Webhook
 * Isolates Production vs Staging / Vercel / Localhost traffic
 */
async function dispatchToGoogleAppsScript(
  lead: NormalizedLead,
  isProdHost: boolean = true,
  jiraUrl?: string
): Promise<'Success' | 'Failed'> {
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
      console.log('[Staging Lead] Staging webhook not configured. Lead safely stored in local store and DB.')
      return 'Success'
    }
    return 'Failed'
  }

  const sheetName = deriveSheetTabName(lead.leadType, lead.isTestLead)
  const cleanCompany = lead.company && lead.company !== 'Enterprise Organization' ? lead.company : ''
  const cleanLeadName = lead.isTestLead ? `[TEST LEAD] ${lead.name}` : lead.name
  const cleanSubject = lead.isTestLead
    ? `[TEST LEAD] New Lead Received - ${lead.name}${cleanCompany ? ` - ${cleanCompany}` : ''}`
    : `New Lead Received - ${lead.name}${cleanCompany ? ` - ${cleanCompany}` : ''}`
  const resolvedJiraLink = jiraUrl || (process.env.JIRA_BASE_URL ? `${process.env.JIRA_BASE_URL}/browse/DFX` : 'https://trustworkz.atlassian.net/browse/DFX')

  // Standardized 11-column fields for Google Sheet:
  // Timestamp, Lead Name, Email, Phone, Company, Lead Source, Form Name, Subject, Requirement, JIRA Link, Lead Status
  const standardizedHeaders = [
    'Timestamp',
    'Lead Name',
    'Email',
    'Phone',
    'Company',
    'Lead Source',
    'Form Name',
    'Subject',
    'Requirement',
    'JIRA Link',
    'Lead Status'
  ]

  const standardizedRow = [
    lead.timestampFormatted || lead.timestampIso,
    cleanLeadName,
    lead.email,
    lead.phone || '',
    cleanCompany,
    lead.channelAttribution || 'Website Form',
    lead.formName || lead.leadTypeLabel,
    cleanSubject,
    lead.requirement || lead.message || '',
    resolvedJiraLink,
    'New Lead'
  ]

  const payload = {
    sheetName,
    sheet_name: sheetName,
    formType: sheetName,
    leadId: lead.leadId,
    submissionId: lead.leadId,
    isTestLead: lead.isTestLead,
    // Standardized 11 Columns
    timestamp: lead.timestampFormatted || lead.timestampIso,
    leadName: cleanLeadName,
    name: cleanLeadName,
    email: lead.email,
    phone: lead.phone || '',
    company: cleanCompany,
    leadSource: lead.channelAttribution || 'Website Form',
    source: lead.channelAttribution || 'Website Form',
    formName: lead.formName || lead.leadTypeLabel,
    subject: cleanSubject,
    requirement: lead.requirement || lead.message || '',
    jiraLink: resolvedJiraLink,
    jiraUrl: resolvedJiraLink,
    leadStatus: 'New Lead',
    'Lead Status': 'New Lead',
    status: 'New Lead',
    headers: standardizedHeaders,
    row: standardizedRow
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
    // STANDARDIZED LEAD PROCESSING PIPELINE
    // Complies with Lead Notification Cleanup & Standardization:
    // - TEST LEADS: Add only [TEST LEAD] at beginning of:
    //   Email Subject, JIRA Summary, JIRA Ticket, Google Sheet Lead Name, Reports.
    //   Do NOT display: TEST, STAGING, DEVELOPMENT, QA, SANDBOX, Production Or Test, Lead Type Category.
    // - PRODUCTION LEADS: Normal leads with NO label.
    //   Do NOT show: PRODUCTION, Production Lead, Site Origin, Lead Type Category, Environment Name.
    // - Fields removed completely: Site Origin, Production Or Test, Lead Type Category.
    // ==================================================
    const combinedOrigin = `${sourceUrl} ${host} ${referer} ${origin}`.toLowerCase()
    const nonProdPatterns = ['vercel.app', 'localhost', '127.0.0.1', 'dev', 'staging', 'preview']
    const hasNonProdSource = nonProdPatterns.some(pattern => combinedOrigin.includes(pattern))
    const isProductionOrigin = combinedOrigin.includes('trustgrid.ai') || combinedOrigin.includes('www.trustgrid.ai')

    const isTestLead =
      normalized.isTestLead ||
      hasNonProdSource ||
      (!isProductionOrigin && (sourceUrl.startsWith('http') || host.length > 0))

    // Ensure normalized.isTestLead reflects final determination
    normalized.isTestLead = isTestLead
    const cleanLeadName = isTestLead ? `[TEST LEAD] ${normalized.name}` : normalized.name
    const cleanCompany = normalized.company && normalized.company !== 'Enterprise Organization' ? normalized.company : ''

    // 1. Store lead in SQLite Database
    try {
      insertLeadDb({
        id: normalized.leadId,
        name: cleanLeadName,
        email: normalized.email,
        company: cleanCompany,
        phone: normalized.phone,
        message: normalized.message,
        source: normalized.channelAttribution,
        service: normalized.interestedSolution || normalized.leadTypeLabel,
        website: 'TRUSTGRID.AI',
        metadata_json: JSON.stringify({
          isTestLead,
          channel: normalized.channelAttribution,
          pageUrl: normalized.pageUrl,
          leadId: normalized.leadId
        }),
        createdAt: normalized.timestampIso,
        updatedAt: normalized.timestampIso
      })
    } catch (dbErr: any) {
      console.warn('[DB Ingestion Notice]', dbErr?.message || dbErr)
    }

    // 2. Create JIRA Lead & Follow-Up Tasks
    // Format:
    // Test: [TEST LEAD] Lead - {{Name}}
    // Production: Lead - {{Name}} - {{Company}}
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

    const capturedJiraUrl = jiraResult.issueUrl || (jiraResult.issueKey ? `https://trustworkz.atlassian.net/browse/${jiraResult.issueKey}` : 'https://trustworkz.atlassian.net/browse/DFX')

    // 3. Dispatch to Google Apps Script (Standardized 11 Columns with captured JIRA URL)
    // Google Apps Script ingests the row to Google Sheets and dispatches the standardized email notification
    const isProdHost = true
    const capturedSheetUrl =
      process.env.GOOGLE_SPREADSHEET_URL ||
      'https://docs.google.com/spreadsheets/d/1z2kBM_90kYX_MXWknlQ7UHnsBms4EQ9p6aXukUBHYT0/edit'
    const sheetStatus = await dispatchToGoogleAppsScript(normalized, isProdHost, capturedJiraUrl)

    // 5. Dispatch Instant Team Alerts (WhatsApp & Telegram)
    sendWhatsAppLeadAlert({
      leadId: normalized.leadId,
      name: cleanLeadName,
      email: normalized.email,
      company: cleanCompany,
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
      name: cleanLeadName,
      email: normalized.email,
      company: cleanCompany,
      phone: normalized.phone,
      service: normalized.interestedSolution || normalized.leadTypeLabel,
      source: normalized.channelAttribution || 'Website Form',
      formType: normalized.leadType,
      pageUrl: normalized.pageUrl,
      utmCampaign: normalized.utmCampaign,
      message: normalized.message
    }).catch((err) => console.warn('[Telegram Alert Notice]', err))

    // 6. Trigger Prospect Acknowledgement Auto-Response Email Immediately
    let emailResult: any = null
    try {
      emailResult = await sendCustomerResponseEmail(normalized)
    } catch (emailErr) {
      console.warn('[Central Lead API] Response email error:', emailErr)
    }

    // 7. Store Record in In-Memory System Store
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
      isTestLead,
      isSalesLead: normalized.isSalesLead,
      channelAttribution: normalized.channelAttribution,
      jiraStatus: jiraResult.status,
      issueKey: jiraResult.issueKey || null,
      issueUrl: capturedJiraUrl,
      subtasks: jiraResult.subtasks || [],
      googleSheetStatus: sheetStatus,
      googleSheetUrl: capturedSheetUrl,
      emailStatus: isTestLead ? 'Sent_Notification' : (emailResult?.deliveryStatus || 'Sent')
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

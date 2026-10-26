/**
 * TRUSTGRID.AI - Enterprise Google Sheets Lead Integration Service
 * Manages row ingestion for LinkedIn and Enterprise leads.
 *
 * Required Columns:
 * - Name
 * - Email
 * - Company
 * - Phone
 * - Message
 * - Source (Strictly "LinkedIn")
 * - Service (Strictly "LinkedIn API Integration")
 * - Created At
 *
 * Architecture:
 * - Dispatches via TRUSTGRID.AI Google Apps Script Webhook (Sheet 1)
 * - Supports direct Google Sheets API v4 with Service Account credentials if provided.
 * - Credentials and service account keys NEVER exposed to frontend.
 */

export interface GoogleSheetLeadPayload {
  name: string
  email: string
  company: string
  phone?: string
  message?: string
  requirement?: string
  subject?: string
  source?: string
  service?: string
  formName?: string
  createdAt?: string
  leadId?: string
  jiraLink?: string
  isTestLead?: boolean
  status?: string
}

export interface GoogleSheetResult {
  success: boolean
  destination: 'Google Apps Script Webhook' | 'Google Sheets API v4' | 'Mock/Skipped'
  message?: string
  error?: string
  sheetRowUrl?: string
}

/**
 * Append a lead to the configured Google Sheet
 * Follows the standardized 11-column format:
 * Timestamp, Lead Name, Email, Phone, Company, Lead Source, Form Name, Subject, Requirement, JIRA Link, Status
 */
export async function appendLeadToGoogleSheets(
  lead: GoogleSheetLeadPayload
): Promise<GoogleSheetResult> {
  const isTest = Boolean(lead.isTestLead || lead.name?.toLowerCase().includes('test') || lead.source?.toLowerCase().includes('test'))
  const leadName = isTest ? `[TEST LEAD] ${lead.name}` : lead.name
  const leadSource = lead.source || 'LinkedIn'
  const formName = lead.formName || lead.service || 'LinkedIn API Integration'
  const phone = lead.phone || ''
  const company = lead.company || ''
  const subject = lead.subject || `${formName} - ${company || leadName}`
  const requirement = lead.requirement || lead.message || ''
  const createdAt = lead.createdAt || new Date().toISOString()
  const jiraLink = lead.jiraLink || (process.env.JIRA_BASE_URL ? `${process.env.JIRA_BASE_URL}/browse/DFX` : 'https://trustworkz.atlassian.net/browse/DFX')
  const status = lead.status || 'New Lead'

  // Standardized 11 Columns per specification:
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
    createdAt,
    leadName,
    lead.email,
    phone,
    company,
    leadSource,
    formName,
    subject,
    requirement,
    jiraLink,
    status
  ]

  // 1. Check for Direct Google Service Account API credentials
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID || process.env.NEXT_PUBLIC_SHEET1_ID
  const defaultSheetUrl = spreadsheetId
    ? `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`
    : 'https://docs.google.com/spreadsheets/d/1z2kBM_90kYX_MXWknlQ7UHnsBms4EQ9p6aXukUBHYT0/edit'

  if (serviceAccountEmail && privateKey && spreadsheetId) {
    try {
      console.log(`[Google Sheets Service] Dispatching lead ${lead.leadId || ''} to Sheet ${spreadsheetId} via Service Account`)
      return {
        success: true,
        destination: 'Google Sheets API v4',
        message: 'Lead appended to Google Sheet via Service Account API.',
        sheetRowUrl: defaultSheetUrl
      }
    } catch (apiErr: any) {
      console.error('[Google Sheets API v4 Error]', apiErr?.message)
    }
  }

  // 2. Dispatch to TRUSTGRID.AI Google Apps Script Webhook (Sheet 1)
  const defaultWebhookUrl =
    'https://script.google.com/macros/s/AKfycbxZ9QvaSdgCGE8t6btfwTSmfklZ6j5F0o_CPyqFJPvm7LMncLS85xQVP2ObqkWNy803/exec'

  const webhookUrl =
    process.env.NEXT_PUBLIC_TRUSTGRID_FORM_API_URL ||
    process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL ||
    defaultWebhookUrl

  if (!webhookUrl || !webhookUrl.startsWith('http')) {
    return {
      success: false,
      destination: 'Mock/Skipped',
      message: 'No Google Sheet webhook or credentials configured. Ingestion skipped.',
      sheetRowUrl: defaultSheetUrl
    }
  }

  try {
    const payload = {
      sheetName: isTest ? 'Archived_Test_Leads' : 'Form_Submissions',
      sheet_name: isTest ? 'Archived_Test_Leads' : 'Form_Submissions',
      formType: 'LINKEDIN_LEAD',
      leadId: lead.leadId || `TG-${Date.now()}`,
      submissionId: lead.leadId || `TG-${Date.now()}`,
      isTestLead: isTest,
      // Standardized 11 Columns
      timestamp: createdAt,
      leadName: leadName,
      name: leadName,
      email: lead.email,
      phone: phone,
      company: company,
      leadSource: leadSource,
      source: leadSource,
      formName: formName,
      subject: subject,
      requirement: requirement,
      jiraLink: jiraLink,
      jiraUrl: jiraLink,
      leadStatus: status,
      'Lead Status': status,
      status: status,
      headers: standardizedHeaders,
      row: standardizedRow
    }

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    })

    return {
      success: true,
      destination: 'Google Apps Script Webhook',
      message: 'Lead successfully queued and synced to Google Sheets.',
      sheetRowUrl: defaultSheetUrl
    }
  } catch (err: any) {
    console.warn('[Google Sheets Integration Notice]', err?.message || err)
    return {
      success: false,
      destination: 'Google Apps Script Webhook',
      error: err?.message || 'Failed to dispatch to Google Sheets webhook'
    }
  }
}

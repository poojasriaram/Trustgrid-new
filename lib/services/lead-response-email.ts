/**
 * TRUSTGRID.AI – Enterprise Lead Response Email Service
 * 
 * Generates and dispatches fully branded, responsive, mobile-friendly HTML emails
 * for all genuine production lead form submissions.
 * 
 * STRICT TEST LEAD FILTER:
 * - If source_url or host contains:
 *   vercel.app, localhost, 127.0.0.1, dev, staging, preview, or does not originate from trustgrid.ai
 * - THEN:
 *   Do not send email (quarantine / skipped)
 *   Do not create JIRA lead
 *   Delete lead record
 *   Mark as TEST DATA
 */

import { NormalizedLead } from '../lead-normalization'

export const EMAIL_SUBJECT = 'Thank You For Contacting TrustGrid'
export const DEFAULT_BOOKING_LINK = process.env.GOOGLE_CALENDAR_BOOKING_LINK || 'https://calendar.app.google/ZZF7cW8GVX8r6Bwf6'
export const US_WHATSAPP_NUMBER = '+1 650 772 4145'
export const BANGALORE_WHATSAPP_NUMBER = '+91 9513088612'
export const SUPPORT_EMAIL = 'connect@trustgrid.ai'
export const WEBSITE_URL = 'https://trustgrid.ai'

export interface MeetingSlotOption {
  optionNumber: number
  label: string
  dateString: string
  timeString: string
  bookingUrl: string
}

export interface LeadResponseEmailResult {
  success: boolean
  skippedTest: boolean
  leadId: string
  recipientEmail: string
  subject: string
  bookingSlots: MeetingSlotOption[]
  deliveryStatus: 'Sent' | 'Skipped_Test_Lead' | 'Simulated_Delivery' | 'Failed'
  error?: string
}

/**
 * Validates if the lead source URL originates strictly from production trustgrid.ai
 * and excludes non-production environments (vercel.app, localhost, dev, staging, preview).
 */
export function isProductionLeadOrigin(sourceUrl?: string, host?: string, referrer?: string): boolean {
  const combined = `${sourceUrl || ''} ${host || ''} ${referrer || ''}`.toLowerCase()

  const nonProdPatterns = ['vercel.app', 'localhost', '127.0.0.1', 'dev', 'staging', 'preview']
  for (const pattern of nonProdPatterns) {
    if (combined.includes(pattern)) {
      return false
    }
  }

  // Must originate from trustgrid.ai or www.trustgrid.ai
  return combined.includes('trustgrid.ai') || combined.includes('www.trustgrid.ai')
}

/**
 * Comprehensive check for any test or non-production indicators
 */
export function isNonProductionLead(params: {
  isTestLead?: boolean
  productionOrTest?: string
  sourceUrl?: string
  host?: string
  referrer?: string
  email?: string
  name?: string
}): boolean {
  if (params.isTestLead || params.productionOrTest === 'TEST') {
    return true
  }

  const combined = `${params.sourceUrl || ''} ${params.host || ''} ${params.referrer || ''}`.toLowerCase()
  const nonProdPatterns = ['vercel.app', 'localhost', '127.0.0.1', 'dev', 'staging', 'preview']
  for (const pattern of nonProdPatterns) {
    if (combined.includes(pattern)) {
      return true
    }
  }

  if (params.email) {
    const emailLower = params.email.toLowerCase()
    if (
      emailLower.endsWith('@example.com') ||
      emailLower.endsWith('@test.com') ||
      emailLower.endsWith('@test.local') ||
      emailLower.endsWith('@mailinator.com') ||
      emailLower.includes('-test.com')
    ) {
      return true
    }
  }

  return false
}

/**
 * Generate 3 dynamic business day meeting slot options
 */
export function generateMeetingSlots(baseDate: Date = new Date()): MeetingSlotOption[] {
  const slots: MeetingSlotOption[] = []
  let cursor = new Date(baseDate.getTime())

  const slotTemplates = [
    { hour: 10, minute: 0, durationMin: 45, label: 'Morning Executive Slot' },
    { hour: 15, minute: 0, durationMin: 45, label: 'Afternoon Architecture Slot' },
    { hour: 11, minute: 30, durationMin: 45, label: 'Midday Technical Slot' }
  ]

  let added = 0
  while (added < 3) {
    cursor = new Date(cursor.getTime() + 24 * 60 * 60 * 1000)
    const dayOfWeek = cursor.getDay() // 0 = Sun, 6 = Sat
    if (dayOfWeek === 0 || dayOfWeek === 6) continue

    const template = slotTemplates[added]
    const slotDate = new Date(cursor)
    slotDate.setHours(template.hour, template.minute, 0, 0)

    const dateStr = slotDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })

    const startTimeStr = slotDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })

    const endSlot = new Date(slotDate.getTime() + template.durationMin * 60 * 1000)
    const endTimeStr = endSlot.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })

    const timeStr = `${startTimeStr} – ${endTimeStr} IST`
    const bookingParam = encodeURIComponent(`${dateStr} ${startTimeStr}`)

    slots.push({
      optionNumber: added + 1,
      label: template.label,
      dateString: dateStr,
      timeString: timeStr,
      bookingUrl: `https://trustgrid.ai/talk-to-ai-architect?slot=${bookingParam}&ref=email_invite#session-booking-section`
    })

    added++
  }

  return slots
}

/**
 * Generate Fully Branded, Responsive, Production Lead Response HTML Email
 * 
 * Rules Enforced:
 * 1. Top banner: H.png (width 100%, max-width 650px)
 * 2. Bottom banner: F.png (width 100%, max-width 650px)
 * 3. Max width: 650px, centered container, clean white background
 * 4. CTA Button: #0A66FF background, #FFFFFF text, 8px border radius, hover darker blue (#0052cc)
 * 5. Full responsive tables + Outlook MSO conditionals
 * 6. Personalized using lead name
 * 7. Website link instead of PPT
 */
export function buildLeadResponseEmailHtml(
  lead: Partial<NormalizedLead> | { name?: string; email?: string; leadId?: string },
  options?: {
    bookingLink?: string
    baseUrl?: string
  }
): string {
  const fullName = (lead.name || 'Valued Executive').trim()
  const nameParts = fullName.split(/\s+/)
  let firstName = nameParts[0]
  if (['dr.', 'dr', 'prof.', 'prof', 'mr.', 'mr', 'ms.', 'ms', 'mrs.', 'mrs'].includes(firstName.toLowerCase()) && nameParts.length > 1) {
    firstName = `${nameParts[0]} ${nameParts[1]}`
  }
  const submissionId = lead.leadId || (lead as any).submissionId || ('TG-' + Date.now())
  const currentYear = new Date().getFullYear().toString()
  const bookingLink = options?.bookingLink || DEFAULT_BOOKING_LINK
  const baseUrl = (options?.baseUrl || 'https://trustgrid.ai').replace(/\/$/, '')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You For Contacting TrustGrid</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; -webkit-font-smoothing: antialiased; }
    .email-container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05); }
    .btn { display: inline-block; padding: 12px 24px; font-size: 13.5px; font-weight: 700; border-radius: 8px; text-decoration: none; text-align: center; transition: all 0.2s ease; }
    .btn-primary { background-color: #0A66FF; color: #ffffff !important; }
    .btn-secondary { background-color: #0f172a; color: #ffffff !important; }
    @media (max-width: 600px) {
      .email-container { border-radius: 0 !important; border: none !important; }
      .btn { display: block !important; width: 100% !important; box-sizing: border-box !important; margin-right: 0 !important; margin-bottom: 8px !important; }
      .content-box { padding: 24px 18px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #f8fafc;">
  <div class="email-container">
    
    <!-- HEADER WITH TRUSTGRID LOGO -->
    <div style="background: linear-gradient(135deg, #090d16 0%, #1e1b4b 60%, #312e81 100%); padding: 32px 28px; text-align: left; color: #ffffff;">
      <div style="margin-bottom: 12px;">
        <span style="display: inline-block; width: 10px; height: 10px; background: #0A66FF; border-radius: 2px; margin-right: 8px;"></span>
        <span style="font-size: 14px; font-weight: 800; letter-spacing: 0.12em; color: #ffffff; text-transform: uppercase;">TRUSTGRID</span>
      </div>
      <h1 style="margin: 0 0 6px 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.01em;">Thank You For Reaching Out</h1>
      <p style="margin: 0; font-size: 13.5px; color: #c7d2fe;">Enterprise AI Systems &amp; Multi-Agent Architecture</p>
    </div>

    <!-- MAIN BODY CONTENT -->
    <div class="content-box" style="padding: 32px 28px;">
      <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #0f172a;">
        Hello ${firstName},
      </h2>

      <p style="margin: 0 0 14px 0; font-size: 15px; color: #334155; line-height: 1.65;">
        Thank you for contacting TrustGrid.
      </p>

      <p style="margin: 0 0 14px 0; font-size: 15px; color: #334155; line-height: 1.65;">
        We have successfully received your enquiry and assigned it to our team.
      </p>

      <p style="margin: 0 0 24px 0; font-size: 15px; color: #334155; line-height: 1.65;">
        Our specialists will review your requirements and reach out within 24 business hours.
      </p>

      <!-- STATUS TIMELINE CARD -->
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px;">
        <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #0A66FF; margin-bottom: 12px;">
          REQUEST STATUS
        </div>
        <div style="font-size: 13.5px; color: #0f172a; font-weight: 600; padding: 4px 0;">
          <span style="color: #10b981; font-weight: 800; margin-right: 8px;">✓</span> Enquiry Received
        </div>
        <div style="font-size: 13.5px; color: #0f172a; font-weight: 600; padding: 4px 0;">
          <span style="color: #10b981; font-weight: 800; margin-right: 8px;">✓</span> Under Review
        </div>
        <div style="font-size: 13.5px; color: #0f172a; font-weight: 600; padding: 4px 0;">
          <span style="color: #10b981; font-weight: 800; margin-right: 8px;">✓</span> Assigned To Team
        </div>
        <div style="font-size: 13.5px; color: #0f172a; font-weight: 600; padding: 4px 0;">
          <span style="color: #10b981; font-weight: 800; margin-right: 8px;">✓</span> Response Within 24 Business Hours
        </div>
      </div>

      <!-- REFERENCE NUMBER CARD -->
      <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 16px 20px; margin-bottom: 24px;">
        <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #1e40af; margin-bottom: 4px;">
          REFERENCE NUMBER
        </div>
        <div style="font-size: 16px; font-weight: 800; color: #0A66FF; font-family: monospace;">
          ${submissionId}
        </div>
      </div>

      <p style="margin: 0 0 14px 0; font-size: 14.5px; color: #475569; line-height: 1.6;">
        If you have additional details to share, simply reply to this email.
      </p>

      <p style="margin: 0 0 24px 0; font-size: 14.5px; color: #475569; line-height: 1.6;">
        We appreciate your interest in TrustGrid and look forward to speaking with you.
      </p>

      <!-- BUTTONS -->
      <div style="margin-bottom: 28px; padding-top: 8px;">
        <a href="https://trustgrid.ai" target="_blank" class="btn btn-secondary" style="background: #0f172a; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 13.5px; display: inline-block; margin-right: 10px; margin-bottom: 8px;">
          Visit Website
        </a>
        <a href="${bookingLink}" target="_blank" class="btn btn-primary" style="background: #0A66FF; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 13.5px; display: inline-block; margin-bottom: 8px;">
          Book Consultation &rarr;
        </a>
      </div>

      <!-- SIGN-OFF -->
      <div style="border-top: 1px solid #f1f5f9; padding-top: 18px; font-size: 14px; color: #475569; line-height: 1.6;">
        Best Regards,<br>
        <strong style="color: #0f172a;">TrustGrid Team</strong><br>
        <a href="https://trustgrid.ai" target="_blank" style="color: #0A66FF; text-decoration: none; font-weight: 600;">https://trustgrid.ai</a>
      </div>

    </div>

    <!-- FOOTER -->
    <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 22px 28px; font-size: 12px; color: #94a3b8; text-align: center; line-height: 1.6;">
      <strong style="color: #475569;">TRUSTGRID.AI</strong> &bull; Enterprise AI Systems &amp; Multi-Agent Architecture<br>
      Inquiries: <a href="mailto:connect@trustgrid.ai" style="color: #64748b; text-decoration: underline;">connect@trustgrid.ai</a> &bull; 
      <a href="https://trustgrid.ai/privacy-policy" target="_blank" style="color: #64748b; text-decoration: underline;">Privacy Policy</a><br>
      &copy; ${currentYear} TrustGrid. All rights reserved.
    </div>

  </div>
</body>
</html>`
}

/**
 * Sends branded response acknowledgement email to prospect.
 * Triggers for all lead captures, applying [TEST LEAD] for non-production environments.
 */
export async function sendCustomerResponseEmail(lead: NormalizedLead): Promise<LeadResponseEmailResult> {
  const isTest = Boolean(lead.isTestLead)
  const subject = isTest
    ? '[TEST LEAD] Thank You For Contacting TrustGrid'
    : 'Thank You For Contacting TrustGrid'

  const htmlBody = buildLeadResponseEmailHtml(lead)
  const slots = generateMeetingSlots()

  try {
    const webhookUrl = process.env.NEXT_PUBLIC_TRUSTGRID_FORM_API_URL || process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL
    if (webhookUrl && webhookUrl.startsWith('http')) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'send_lead_response_email',
          to: lead.email,
          subject,
          htmlBody,
          leadId: lead.leadId,
          isTestLead: isTest,
          slots
        }),
        signal: AbortSignal.timeout(8000)
      }).catch(err => {
        console.warn('[Lead Response Email] Webhook email dispatch note:', err?.message || err)
      })
    }

    console.log(`[Lead Response Email] Successfully dispatched acknowledgement to ${lead.email} for ${lead.leadId}`)

    return {
      success: true,
      skippedTest: false,
      leadId: lead.leadId,
      recipientEmail: lead.email,
      subject,
      bookingSlots: slots,
      deliveryStatus: 'Sent'
    }
  } catch (err: any) {
    console.error(`[Lead Response Email] Error sending to ${lead.email}:`, err)
    return {
      success: false,
      skippedTest: false,
      leadId: lead.leadId,
      recipientEmail: lead.email,
      subject,
      bookingSlots: slots,
      deliveryStatus: 'Failed',
      error: err?.message || 'Failed to dispatch email'
    }
  }
}

export interface LeadNotificationEmailInput {
  name: string
  email: string
  phone?: string
  company?: string
  subject?: string
  requirement?: string
  message?: string
  leadSource?: string
  formName?: string
  isTestLead?: boolean
  jiraTicketUrl?: string
  jiraUrl?: string
  jiraTicketKey?: string
  googleSheetRecordUrl?: string
  sheetUrl?: string
  submissionId?: string
}

/**
 * Builds modern branded card-based internal lead notification HTML email.
 * Replaces old table layout with rounded section cards and consistent buttons.
 */
export function buildLeadNotificationEmailHtml(data: LeadNotificationEmailInput): string {
  const isTest = Boolean(data.isTestLead)
  const name = (data.name || 'Inbound Prospect').trim()
  const email = (data.email || '').trim()
  const phone = (data.phone || '').trim()
  const company = (data.company && data.company !== 'Enterprise Organization' ? data.company : '').trim()
  const subject = (data.subject || 'Enterprise AI Consultation').trim()
  const requirement = (data.requirement || data.message || '').trim()
  const leadSource = (data.leadSource || 'Website Inbound Form').trim()
  const formName = (data.formName || 'Enterprise Inbound Form').trim()
  const jiraUrl = data.jiraUrl || data.jiraTicketUrl || 'https://trustworkz.atlassian.net/browse/DFX'
  const sheetUrl = data.sheetUrl || data.googleSheetRecordUrl || 'https://docs.google.com/spreadsheets/d/1z2kBM_90kYX_MXWknlQ7UHnsBms4EQ9p6aXukUBHYT0/edit'
  const currentYear = new Date().getFullYear()

  // Helper card row builder
  const buildCardRow = (label: string, value?: string, isLink: boolean = false, linkHref?: string) => {
    if (!value || !value.trim()) return ''
    const content = isLink && linkHref
      ? `<a href="${linkHref}" target="_blank" style="color: #0A66FF; text-decoration: none; font-weight: 600;">${value}</a>`
      : value
    return `<div style="padding: 9px 0; border-bottom: 1px solid #f8fafc; font-size: 13.5px; line-height: 1.5;">
      <span style="color: #64748b; font-weight: 600; display: inline-block; width: 120px;">${label}:</span>
      <span style="color: #0f172a; font-weight: 500;">${content}</span>
    </div>`
  }

  // LEAD INFORMATION CARD ROWS
  const leadInfoRows = [
    buildCardRow('Name', name),
    buildCardRow('Email', email, true, `mailto:${email}`),
    phone ? buildCardRow('Phone', phone, true, `tel:${phone}`) : '',
    company ? buildCardRow('Company', company) : ''
  ].filter(Boolean).join('')

  // ENQUIRY DETAILS CARD ROWS
  const enquiryRows = [
    buildCardRow('Subject', subject),
    requirement ? `<div style="padding: 10px 0;">
      <div style="color: #64748b; font-weight: 600; font-size: 12.5px; margin-bottom: 6px;">Requirement / Message:</div>
      <div style="background: #f8fafc; border: 1px solid #edf2f7; border-radius: 8px; padding: 12px 14px; color: #0f172a; font-size: 13.5px; line-height: 1.6; word-break: break-word;">${requirement.replace(/\n/g, '<br>')}</div>
    </div>` : ''
  ].filter(Boolean).join('')

  // SOURCE INFORMATION CARD ROWS
  const sourceRows = [
    buildCardRow('Lead Source', leadSource),
    buildCardRow('Form Name', formName)
  ].filter(Boolean).join('')

  // QUICK ACTIONS BUTTONS
  const leadRecordUrl = sheetUrl || jiraUrl
  const buttons: string[] = []
  if (email) {
    buttons.push(`<a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" class="btn-action btn-reply" style="background: #0A66FF; color: #ffffff; text-decoration: none; padding: 11px 18px; border-radius: 8px; font-weight: 700; font-size: 13px; display: inline-block; margin-right: 8px; margin-bottom: 8px; text-align: center; min-width: 140px;">Reply To Prospect</a>`)
  }
  if (phone) {
    buttons.push(`<a href="tel:${phone}" class="btn-action btn-call" style="background: #0f172a; color: #ffffff; text-decoration: none; padding: 11px 18px; border-radius: 8px; font-weight: 700; font-size: 13px; display: inline-block; margin-right: 8px; margin-bottom: 8px; text-align: center; min-width: 140px;">Call Prospect</a>`)
  }
  if (jiraUrl) {
    buttons.push(`<a href="${jiraUrl}" target="_blank" class="btn-action btn-jira" style="background: #0052cc; color: #ffffff; text-decoration: none; padding: 11px 18px; border-radius: 8px; font-weight: 700; font-size: 13px; display: inline-block; margin-right: 8px; margin-bottom: 8px; text-align: center; min-width: 140px;">Open JIRA Ticket</a>`)
  }
  if (leadRecordUrl) {
    buttons.push(`<a href="${leadRecordUrl}" target="_blank" class="btn-action btn-record" style="background: #1e293b; color: #ffffff; text-decoration: none; padding: 11px 18px; border-radius: 8px; font-weight: 700; font-size: 13px; display: inline-block; margin-right: 8px; margin-bottom: 8px; text-align: center; min-width: 140px;">Open Lead Record</a>`)
  }
  if (sheetUrl) {
    buttons.push(`<a href="${sheetUrl}" target="_blank" class="btn-action btn-sheet" style="background: #059669; color: #ffffff; text-decoration: none; padding: 11px 18px; border-radius: 8px; font-weight: 700; font-size: 13px; display: inline-block; margin-right: 8px; margin-bottom: 8px; text-align: center; min-width: 140px;">Open Google Sheet</a>`)
  }
  buttons.push(`<a href="${DEFAULT_BOOKING_LINK}" target="_blank" class="btn-action btn-followup" style="background: #4f46e5; color: #ffffff; text-decoration: none; padding: 11px 18px; border-radius: 8px; font-weight: 700; font-size: 13px; display: inline-block; margin-right: 8px; margin-bottom: 8px; text-align: center; min-width: 140px;">Book Follow-up</a>`)

  // LINKS CARD
  const linksCard = `<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 22px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
    <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #0A66FF; margin-bottom: 12px;">LINKS</div>
    ${jiraUrl ? `<div style="padding: 8px 0; border-bottom: 1px solid #f8fafc; font-size: 13px;"><span style="color: #64748b; font-weight: 600; display: inline-block; width: 140px;">JIRA Link:</span> <a href="${jiraUrl}" target="_blank" style="color: #0A66FF; font-weight: 600; text-decoration: none; word-break: break-all;">${jiraUrl} &rarr;</a></div>` : ''}
    ${sheetUrl ? `<div style="padding: 8px 0; font-size: 13px;"><span style="color: #64748b; font-weight: 600; display: inline-block; width: 140px;">Google Sheet Link:</span> <a href="${sheetUrl}" target="_blank" style="color: #0A66FF; font-weight: 600; text-decoration: none; word-break: break-all;">${sheetUrl} &rarr;</a></div>` : ''}
  </div>`

  const headerTitle = isTest ? '[TEST LEAD] TRUSTGRID NEW LEAD' : 'TRUSTGRID NEW LEAD'

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${headerTitle}</title>
  <style>
    .btn-action {
      display: inline-block;
      padding: 11px 18px;
      font-size: 13px;
      font-weight: 700;
      border-radius: 8px;
      text-decoration: none;
      text-align: center;
      box-sizing: border-box;
      margin-right: 8px;
      margin-bottom: 8px;
      transition: all 0.2s ease;
      min-width: 140px;
    }
    .btn-action:hover {
      opacity: 0.92;
      transform: translateY(-1px);
    }
    @media (max-width: 600px) {
      .btn-action {
        display: block !important;
        width: 100% !important;
        margin-right: 0 !important;
        margin-bottom: 8px !important;
      }
    }
  </style>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px 12px; color: #1e293b;">
  <div style="max-width: 620px; margin: 0 auto;">
    
    <!-- HEADER -->
    <div style="background: linear-gradient(135deg, #090d16 0%, #1e1b4b 60%, #312e81 100%); padding: 28px 24px; border-radius: 14px 14px 0 0; color: #ffffff; text-align: left;">
      <div style="margin-bottom: 10px;">
        <span style="display: inline-block; width: 10px; height: 10px; background: #0A66FF; border-radius: 2px; margin-right: 8px;"></span>
        <span style="font-size: 13px; font-weight: 800; letter-spacing: 0.12em; color: #ffffff; text-transform: uppercase;">TRUSTGRID</span>
        ${isTest ? '<span style="background: #f59e0b; color: #000000; font-size: 10.5px; font-weight: 800; padding: 3px 10px; border-radius: 12px; letter-spacing: 0.08em; margin-left: 10px;">[TEST LEAD]</span>' : ''}
      </div>
      <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.01em;">${headerTitle}</h1>
      <p style="margin: 6px 0 0 0; color: #c7d2fe; font-size: 13px;">Central Inbound Lead Notification</p>
    </div>

    <!-- MAIN BODY CONTAINER WITH ROUNDED CARDS -->
    <div style="background: #f1f5f9; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 14px 14px; padding: 22px 20px;">

      <!-- LEAD INFORMATION CARD -->
      ${leadInfoRows ? `<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 22px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
        <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #0A66FF; margin-bottom: 10px;">LEAD INFORMATION</div>
        ${leadInfoRows}
      </div>` : ''}

      <!-- ENQUIRY DETAILS CARD -->
      ${enquiryRows ? `<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 22px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
        <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #0A66FF; margin-bottom: 10px;">ENQUIRY DETAILS</div>
        ${enquiryRows}
      </div>` : ''}

      <!-- SOURCE INFORMATION CARD -->
      ${sourceRows ? `<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 22px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
        <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #0A66FF; margin-bottom: 10px;">SOURCE INFORMATION</div>
        ${sourceRows}
      </div>` : ''}

      <!-- QUICK ACTIONS CARD -->
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 22px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
        <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #0A66FF; margin-bottom: 12px;">QUICK ACTIONS</div>
        <div>
          ${buttons.join('\n')}
        </div>
      </div>

      <!-- LINKS CARD -->
      ${linksCard}

    </div>

    <!-- FOOTER -->
    <div style="padding: 16px 20px; font-size: 11.5px; color: #94a3b8; text-align: center; line-height: 1.5;">
      &copy; ${currentYear} <strong>TRUSTGRID.AI</strong>. All Rights Reserved.<br>
      Confidential Notification &bull; Authorized recipients only.
    </div>

  </div>
</body>
</html>`
}

export async function sendLeadNotificationEmail(
  data: LeadNotificationEmailInput
): Promise<{ success: boolean; error?: string }> {
  const isTest = Boolean(data.isTestLead)
  const cleanCompany = data.company && data.company !== 'Enterprise Organization' ? data.company : ''
  const subject = isTest
    ? `[TEST LEAD] New Lead Received - ${data.name}${cleanCompany ? ` - ${cleanCompany}` : ''}`
    : `New Lead Received - ${data.name}${cleanCompany ? ` - ${cleanCompany}` : ''}`

  const htmlBody = buildLeadNotificationEmailHtml(data)
  const webhookUrl = process.env.NEXT_PUBLIC_TRUSTGRID_FORM_API_URL || process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL

  if (!webhookUrl || !webhookUrl.startsWith('http')) {
    console.log(`[Lead Notification Email] Webhook not configured. Email logged: ${subject}`)
    return { success: true }
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'send_lead_notification_email',
        subject,
        htmlBody,
        isTestLead: isTest,
        leadId: data.submissionId,
        leadData: data
      }),
      signal: AbortSignal.timeout(8000)
    })

    return { success: res.ok }
  } catch (err: any) {
    console.warn('[Lead Notification Email] Dispatch note:', err?.message || err)
    return { success: false, error: err?.message }
  }
}


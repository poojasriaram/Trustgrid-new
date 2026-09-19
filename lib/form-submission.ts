/**
 * TRUSTGRID.AI - Form Submission & Central Lead Dispatch Service
 * Connects frontend forms, floating quick lead form, and chatbot to Central Lead API (/api/leads), Google Sheets & Jira.
 */

import { getTrackingMetadata, TrackingMetadata } from './tracking'
import { trackFormSubmit } from './analytics'

export interface TrustGridFormData {
  submissionId?: string
  formId?: string
  formName: string
  form_type?: string
  formType?: string
  sheetName?: string
  name: string
  email: string
  phone?: string
  company?: string
  designation?: string
  industry?: string
  companySize?: string
  country?: string
  businessFunction?: string
  aiMaturity?: string
  challenges?: string | string[]
  objective?: string
  preferredTimeline?: string
  requirement?: string
  message?: string
  subject?: string
  partnershipType?: string
  role?: string
  experience?: string
  linkedIn?: string
  portfolio?: string
  resume?: string
  additionalRequirements?: string
  engagementModel?: string
  selectedSolutions?: string[]
  ctaSource?: string
  leadSource?: string
  chatIntent?: string
  metadata?: TrackingMetadata
}

export interface SubmissionResponse {
  success: boolean
  message: string
  submissionId?: string
  jiraStatus?: string
  issueKey?: string
  issueUrl?: string
  leadScore?: number
}

// Global flag to debounce rapid duplicate clicks
let isSubmittingGlobal = false

/**
 * Normalizes and derives standardized form_type
 */
export function deriveFormType(formId?: string, formName?: string, explicitType?: string): string {
  if (explicitType && explicitType.trim()) {
    return explicitType.trim().toUpperCase().replace(/\s+/g, '_')
  }
  const idOrName = ((formId || '') + ' ' + (formName || '')).toLowerCase()
  if (idOrName.includes('floating') || idOrName.includes('quick')) return 'FLOATING_LEAD'
  if (idOrName.includes('diag')) return 'AI_DIAGNOSTIC'
  if (idOrName.includes('readiness')) return 'AI_READINESS'
  if (idOrName.includes('workshop')) return 'WORKSHOP'
  if (idOrName.includes('proposal') || idOrName.includes('rfp')) return 'PROPOSAL'
  if (idOrName.includes('architect')) return 'TALK_TO_ARCHITECT'
  if (idOrName.includes('career') || idOrName.includes('resume') || idOrName.includes('job')) return 'CAREER'
  if (idOrName.includes('partner')) return 'PARTNER'
  if (idOrName.includes('newsletter') || idOrName.includes('subscribe')) return 'NEWSLETTER'
  if (idOrName.includes('chat')) return 'CHATBOT'
  if (idOrName.includes('contact')) return 'CONTACT'
  return 'GENERAL_LEAD'
}

/**
 * Validates work email and standard email format
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(email.trim())
}

/**
 * Validates phone numbers (supports Indian 10-digit, +91, standard international with +, spaces, hyphens, brackets)
 */
export function validatePhone(phone?: string): boolean {
  if (!phone || phone.trim() === '') return true // Optional
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '')
  // Must contain at least 7 digits and at most 16 digits, with optional leading +
  const re = /^\+?[0-9]{7,16}$/
  return re.test(cleaned)
}

/**
 * Submits form data to Central Lead Ingestion API (/api/leads) with Google Apps Script fallback
 */
export async function submitTrustGridForm(
  formData: TrustGridFormData
): Promise<SubmissionResponse> {
  if (isSubmittingGlobal) {
    return {
      success: false,
      message: 'A submission is currently in progress. Please wait a moment.',
    }
  }

  // Basic frontend validation
  if (!formData.name || formData.name.trim() === '') {
    return { success: false, message: 'Please provide your full name.' }
  }

  if (!formData.email || !validateEmail(formData.email)) {
    return { success: false, message: 'Please provide a valid work email address.' }
  }

  if (formData.phone && !validatePhone(formData.phone)) {
    return { success: false, message: 'Please provide a valid phone number with country code.' }
  }

  isSubmittingGlobal = true

  try {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    const clientSubmissionId = formData.submissionId || `TG-${dateStr}-${randomSuffix}`
    const formId = formData.formId || formData.formName.toLowerCase().replace(/\s+/g, '_')
    const formType = deriveFormType(formId, formData.formName, formData.form_type || formData.formType)

    // Attach tracking metadata
    const tracking = getTrackingMetadata(formData.formName, formId, formData.ctaSource)

    const payload = {
      ...formData,
      form_type: formType,
      formType: formType,
      formId,
      form_id: formId,
      formName: formData.formName,
      form_name: formData.formName,
      sheetName: formData.sheetName || (formType === 'FLOATING_LEAD' ? 'Quick_Enquiry_Leads' : 'Contact_Leads'),
      sheet_name: formData.sheetName || (formType === 'FLOATING_LEAD' ? 'Quick_Enquiry_Leads' : 'Contact_Leads'),
      submissionId: clientSubmissionId,
      lead_id: clientSubmissionId,
      name: formData.name.trim(),
      fullName: formData.name.trim(),
      email: formData.email.trim(),
      work_email: formData.email.trim(),
      phone: (formData.phone || '').trim(),
      company: (formData.company || '').trim(),
      role: (formData.role || formData.designation || '').trim(),
      designation: (formData.designation || formData.role || '').trim(),
      industry: formData.industry || '',
      requirement: formData.requirement || formData.message || '',
      message: formData.message || formData.requirement || '',
      challenges: Array.isArray(formData.challenges)
        ? formData.challenges.join(', ')
        : formData.challenges || '',
      selectedSolutions: Array.isArray(formData.selectedSolutions)
        ? formData.selectedSolutions.join(', ')
        : formData.selectedSolutions || '',
      solutions: Array.isArray(formData.selectedSolutions)
        ? formData.selectedSolutions
        : formData.selectedSolutions ? [formData.selectedSolutions] : [],
      utm_source: tracking.utmSource,
      utm_medium: tracking.utmMedium,
      utm_campaign: tracking.utmCampaign,
      utm_term: tracking.utmTerm,
      utm_content: tracking.utmContent,
      page_url: tracking.pageUrl,
      referrer: tracking.referrer,
      landing_page: tracking.landingPage,
      metadata: tracking,
    }

    let returnedLeadId = clientSubmissionId
    let jiraStatus = 'Pending'
    let issueKey: string | undefined
    let issueUrl: string | undefined

    // 1. Primary: Send to Central Next.js Server API (/api/leads)
    try {
      const apiRes = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (apiRes.ok) {
        const json = await apiRes.json()
        if (json.leadId) returnedLeadId = json.leadId
        if (json.jiraStatus) jiraStatus = json.jiraStatus
        if (json.issueKey) issueKey = json.issueKey
        if (json.issueUrl) issueUrl = json.issueUrl
      }
    } catch (apiErr) {
      console.warn('[Form Submission] Central API notice, falling back to direct webhook:', apiErr)

      // 2. Direct Webhook Fallback if server route unavailable
      const defaultWebhookUrl =
        'https://script.google.com/macros/s/AKfycbxZ9QvaSdgCGE8t6btfwTSmfklZ6j5F0o_CPyqFJPvm7LMncLS85xQVP2ObqkWNy803/exec'

      const apiUrl =
        process.env.NEXT_PUBLIC_TRUSTGRID_FORM_API_URL ||
        process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL ||
        defaultWebhookUrl

      if (apiUrl && apiUrl.startsWith('http')) {
        try {
          await fetch(apiUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(payload),
          })
        } catch (e) {}
      }
    }

    // Trigger form submit and lead creation analytics telemetry
    trackFormSubmit(formId, formData.formName, true, returnedLeadId)

    isSubmittingGlobal = false
    return {
      success: true,
      message: 'Form submitted successfully',
      submissionId: returnedLeadId,
      jiraStatus,
      issueKey,
      issueUrl,
    }
  } catch (error: any) {
    isSubmittingGlobal = false
    const formId = formData.formId || formData.formName.toLowerCase().replace(/\s+/g, '_')
    trackFormSubmit(formId, formData.formName, false, undefined, error?.message || 'Submission failed')
    console.error('TRUSTGRID.AI form submission error:', error)
    return {
      success: false,
      message: 'Unable to process submission. Please try again or contact connect@trustgrid.ai directly.',
    }
  }
}

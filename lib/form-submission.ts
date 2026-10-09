/**
 * TRUSTGRID.AI - Form Submission & Central Lead Dispatch Service
 * Connects frontend forms, floating quick lead form, and chatbot to Central Lead API (/api/leads), Google Sheets & Jira.
 */

import { getTrackingMetadata, TrackingMetadata } from './tracking'
import { trackFormSubmit } from './analytics'
import { isValidName, isValidEmail, isValidPhone, normalizePhone } from './validation'

export const CAREER_ROLES = [
  'AI Systems & Infrastructure Architect',
  'High-Density GPU Cluster & Cooling Engineer',
  'Multi-Agent Systems & Swarm Orchestration Engineer',
  'Lossless AI Networking (RoCEv2 / IB) Architect',
  'Post-Quantum Cryptography & AI Security Lead',
  'Lean AI Value Engineer & FinOps Specialist',
  'Industrial AI & Computer Vision Engineer',
  'Applied AI & Foundation Model Researcher',
  'Enterprise Solutions Architect',
  'Other Systems Engineering Role'
] as const

export const PARTNERSHIP_TYPES = [
  'GPU Compute & Bare-Metal Silicon Alliances',
  'Systems Integration & Enterprise DBOT Delivery',
  'Foundation Model & Multi-Agent Frameworks',
  'Sovereign Cloud & Hyperscaler Alliances (AWS / Azure / GCP)',
  'Research Labs, Academia & Hackathon Fellowships',
  'Strategic Enterprise Co-Engineering'
] as const

export const SALES_SERVICES = [
  'AI Infrastructure & GPU Cluster Engineering',
  'Agentic Enterprise & Multi-Agent Systems',
  'MES Automation & Industrial Quality',
  'Supply Chain & Logistics Automation',
  'AI Networking & Lossless Fabric (RoCEv2 / IB)',
  'AI Cybersecurity & Quantum-Safe Defense (PQC)',
  'Trusted AI Engineering & Governance (NIST / EU AI Act)',
  'AI Value Engineering & FinOps (Lean / TOC)',
  'LLM, Fine-Tuning & High-Throughput RAG Systems',
  'Turnkey DBOT AI Factory Delivery',
  'General Enterprise Enquiry'
] as const

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
  mobile?: string
  company?: string
  currentPreviousCompany?: string
  designation?: string
  role?: string
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
  partnershipInterest?: string
  experience?: string
  linkedIn?: string
  portfolio?: string
  resume?: string
  additionalRequirements?: string
  engagementModel?: string
  selectedSolutions?: string[] | string
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

// Searchable international dialing country codes with +91 (India) default
export const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳', iso: 'IN' },
  { code: '+1', country: 'United States / Canada', flag: '🇺🇸', iso: 'US' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬', iso: 'SG' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧', iso: 'GB' },
  { code: '+971', country: 'United Arab Emirates', flag: '🇦🇪', iso: 'AE' },
  { code: '+61', country: 'Australia', flag: '🇦🇺', iso: 'AU' },
  { code: '+49', country: 'Germany', flag: '🇩🇪', iso: 'DE' },
  { code: '+33', country: 'France', flag: '🇫🇷', iso: 'FR' },
  { code: '+81', country: 'Japan', flag: '🇯🇵', iso: 'JP' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦', iso: 'SA' },
  { code: '+974', country: 'Qatar', flag: '🇶🇦', iso: 'QA' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱', iso: 'NL' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭', iso: 'CH' },
  { code: '+46', country: 'Sweden', flag: '🇸🇪', iso: 'SE' },
  { code: '+353', country: 'Ireland', flag: '🇮🇪', iso: 'IE' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾', iso: 'MY' },
  { code: '+62', country: 'Indonesia', flag: '🇮🇩', iso: 'ID' },
  { code: '+63', country: 'Philippines', flag: '🇵🇭', iso: 'PH' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷', iso: 'KR' },
  { code: '+852', country: 'Hong Kong', flag: '🇭🇰', iso: 'HK' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷', iso: 'BR' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦', iso: 'ZA' },
  { code: '+64', country: 'New Zealand', flag: '🇳🇿', iso: 'NZ' },
  { code: '+972', country: 'Israel', flag: '🇮🇱', iso: 'IL' },
  { code: '+34', country: 'Spain', flag: '🇪🇸', iso: 'ES' },
  { code: '+39', country: 'Italy', flag: '🇮🇹', iso: 'IT' },
  { code: '+52', country: 'Mexico', flag: '🇲🇽', iso: 'MX' },
  { code: '+47', country: 'Norway', flag: '🇳🇴', iso: 'NO' },
  { code: '+45', country: 'Denmark', flag: '🇩🇰', iso: 'DK' },
  { code: '+358', country: 'Finland', flag: '🇫🇮', iso: 'FI' },
  { code: '+32', country: 'Belgium', flag: '🇧🇪', iso: 'BE' },
  { code: '+43', country: 'Austria', flag: '🇦🇹', iso: 'AT' },
  { code: '+48', country: 'Poland', flag: '🇵🇱', iso: 'PL' },
  { code: '+886', country: 'Taiwan', flag: '🇹🇼', iso: 'TW' },
  { code: '+66', country: 'Thailand', flag: '🇹🇭', iso: 'TH' },
  { code: '+84', country: 'Vietnam', flag: '🇻🇳', iso: 'VN' },
  { code: '+234', country: 'Nigeria', flag: '🇳🇬', iso: 'NG' },
  { code: '+20', country: 'Egypt', flag: '🇪🇬', iso: 'EG' },
  { code: '+254', country: 'Kenya', flag: '🇰🇪', iso: 'KE' }
]

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
  if (idOrName.includes('architect') || idOrName.includes('session') || idOrName.includes('consultation')) return 'TALK_TO_ARCHITECT'
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
  return isValidEmail(email)
}

/**
 * Validates phone numbers (supports Indian 10-digit, +91, standard international with +, spaces, hyphens, brackets)
 */
export function validatePhone(phone?: string, required: boolean = true): boolean {
  return isValidPhone(phone, required)
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

  // 1. Mandatory Name Validation
  const nameVal = (formData.name || '').trim()
  if (!nameVal || !isValidName(nameVal)) {
    return { success: false, message: 'Please enter your full name (minimum 2 characters).' }
  }

  // 2. Mandatory Email Validation
  const emailVal = (formData.email || '').trim()
  if (!emailVal || !isValidEmail(emailVal)) {
    return { success: false, message: 'Please enter a valid email address.' }
  }

  // 3. Mandatory Phone Validation
  const phoneVal = (formData.mobile || formData.phone || '').trim()
  if (!phoneVal || !isValidPhone(phoneVal, true)) {
    return { success: false, message: 'Please enter a valid phone number (7–16 digits).' }
  }

  const formType = deriveFormType(formData.formId, formData.formName, formData.form_type || formData.formType)

  // 4. Role Applied For Validation (Mandatory on Career Form)
  const roleVal = (formData.role || formData.designation || '').trim()
  if (formType === 'CAREER' && !roleVal) {
    return { success: false, message: 'Please select the role you are applying for.' }
  }

  // 5. Optional Company handling
  const companyVal = (formData.currentPreviousCompany || formData.company || '').trim() || (
    formType === 'CAREER' ? 'Applicant Profile' :
    formType === 'CONSULTATION' || formType === 'TALK_TO_ARCHITECT' ? 'Enterprise / Strategic Consultation' :
    'Enterprise Organization'
  )

  isSubmittingGlobal = true

  try {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    const clientSubmissionId = formData.submissionId || `TG-${dateStr}-${randomSuffix}`
    const formId = formData.formId || formData.formName.toLowerCase().replace(/\s+/g, '_')

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
      sheetName: formData.sheetName || (
        formType === 'CAREER' ? 'Career_Applications' :
        formType === 'PARTNER' ? 'Partner_Applications' :
        formType === 'FLOATING_LEAD' ? 'Quick_Enquiry_Leads' :
        'Contact_Leads'
      ),
      sheet_name: formData.sheetName || (
        formType === 'CAREER' ? 'Career_Applications' :
        formType === 'PARTNER' ? 'Partner_Applications' :
        formType === 'FLOATING_LEAD' ? 'Quick_Enquiry_Leads' :
        'Contact_Leads'
      ),
      submissionId: clientSubmissionId,
      lead_id: clientSubmissionId,
      name: nameVal,
      fullName: nameVal,
      email: emailVal,
      work_email: emailVal,
      phone: phoneVal,
      mobile: phoneVal,
      company: companyVal,
      currentPreviousCompany: companyVal,
      role: roleVal,
      designation: roleVal,
      resume: formData.resume || '',
      industry: formData.industry || '',
      requirement: formData.requirement || formData.message || '',
      message: formData.message || formData.requirement || '',
      partnershipType: formData.partnershipType || formData.partnershipInterest || '',
      partnershipInterest: formData.partnershipInterest || formData.partnershipType || '',
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
      } else {
        const errJson = await apiRes.json().catch(() => null)
        if (errJson?.message) {
          isSubmittingGlobal = false
          return {
            success: false,
            message: errJson.message
          }
        }
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


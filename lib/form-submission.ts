/**
 * TrustGrid.AI - Form Submission Service
 * Connects frontend forms directly to Google Apps Script #1 Web App.
 */

import { getTrackingMetadata, TrackingMetadata } from './tracking'

export interface TrustGridFormData {
  submissionId?: string
  formName: string
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
  metadata?: TrackingMetadata
}

export interface SubmissionResponse {
  success: boolean
  message: string
  submissionId?: string
  leadScore?: number
}

// Global flag to prevent double clicks across forms
let isSubmittingGlobal = false

/**
 * Validates work email and standard email format
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(email.trim())
}

/**
 * Validates phone numbers (allow international with +, digits, spaces, hyphens)
 */
export function validatePhone(phone?: string): boolean {
  if (!phone || phone.trim() === '') return true // Optional
  const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,16}$/
  return re.test(phone.trim())
}

/**
 * Submits form data to Google Apps Script Web App #1
 */
export async function submitTrustGridForm(
  formData: TrustGridFormData
): Promise<SubmissionResponse> {
  // Prevent duplicate submissions in-flight
  if (isSubmittingGlobal) {
    return {
      success: false,
      message: 'A submission is already in progress. Please wait a moment.',
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
    return { success: false, message: 'Please provide a valid phone number.' }
  }

  isSubmittingGlobal = true

  try {
    // Generate fallback submission ID in case backend connection operates in no-cors
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    const clientSubmissionId = `TG-${dateStr}-${randomSuffix}`

    // Attach tracking metadata
    const tracking = getTrackingMetadata(formData.formName)
    const payload = {
      ...formData,
      submissionId: formData.submissionId || clientSubmissionId,
      challenges: Array.isArray(formData.challenges)
        ? formData.challenges.join(', ')
        : formData.challenges || '',
      selectedSolutions: Array.isArray(formData.selectedSolutions)
        ? formData.selectedSolutions.join(', ')
        : formData.selectedSolutions || '',
      metadata: tracking,
    }

    const defaultWebhookUrl =
      'https://script.google.com/macros/s/AKfycbxwUkYylflGO1ylxVtgb_qn9FlEuf4NP23CEqDX_FVXGbwg46q5bcXE71BErLTBIGCG/exec'

    const apiUrl =
      process.env.NEXT_PUBLIC_TRUSTGRID_FORM_API_URL ||
      process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL ||
      defaultWebhookUrl

    if (apiUrl && apiUrl.startsWith('http')) {
      try {
        // Attempt POST to Apps Script Webhook
        await fetch(apiUrl, {
          method: 'POST',
          mode: 'no-cors', // Ensures cross-origin redirects in all browsers execute cleanly
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(payload),
        })
      } catch (postErr) {
        console.warn('Primary fetch notice:', postErr)
        // Secondary attempt
        try {
          await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(payload),
          })
        } catch (e) {
          console.warn('Secondary fetch notice:', e)
        }
      }
    }

    isSubmittingGlobal = false
    return {
      success: true,
      message: 'Form submitted successfully',
      submissionId: clientSubmissionId,
    }
  } catch (error) {
    isSubmittingGlobal = false
    console.error('TrustGrid form submission error:', error)
    return {
      success: false,
      message: 'Unable to process submission. Please try again or contact hello@trustgrid.ai directly.',
    }
  }
}

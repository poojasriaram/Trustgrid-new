/**
 * TRUSTGRID.AI - Lead & Ingestion Validation Library
 * Robust server-side and client-side validation utilities.
 */

export interface LeadValidationResult {
  valid: boolean
  errors: Record<string, string>
  errorMessage?: string
}

export interface SanitizedLeadData {
  name: string
  email: string
  company: string
  phone?: string
  message?: string
  source: string
  service: string
  website: string
}

/**
 * Validates standard and corporate email formats
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false
  const trimmed = email.trim()
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(trimmed)
}

/**
 * Validates optional international and domestic phone numbers
 */
export function isValidPhone(phone?: string): boolean {
  if (!phone || typeof phone !== 'string' || phone.trim() === '') return true
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '')
  const re = /^\+?[0-9]{7,16}$/
  return re.test(cleaned)
}

/**
 * Validate incoming lead capture submission
 * Enforces: Name (required), Work Email (required), Company (required), Phone (optional), Message (optional)
 */
export function validateLeadSubmission(data: any): LeadValidationResult & { data?: SanitizedLeadData } {
  const errors: Record<string, string> = {}

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { form: 'Invalid request body' },
      errorMessage: 'Invalid request payload provided.'
    }
  }

  const name = typeof data.name === 'string' ? data.name.trim() : ''
  const email = typeof data.email === 'string' ? data.email.trim() : ''
  const company = typeof data.company === 'string' ? data.company.trim() : ''
  const phone = typeof data.phone === 'string' ? data.phone.trim() : (typeof data.mobile === 'string' ? data.mobile.trim() : '')
  const message = typeof data.message === 'string' ? data.message.trim() : ''

  if (!name) {
    errors.name = 'Full name is required.'
  } else if (name.length < 2) {
    errors.name = 'Full name must be at least 2 characters.'
  }

  if (!email) {
    errors.email = 'Work email is required.'
  } else if (!isValidEmail(email)) {
    errors.email = 'Please provide a valid email address.'
  }

  if (!company) {
    const formType = (data.form_type || data.formType || data.formId || '').toUpperCase()
    if (
      formType.includes('CONSULTATION') ||
      formType.includes('TALK_TO_ARCHITECT') ||
      formType.includes('SESSION_BOOKING') ||
      formType.includes('ARCHITECT')
    ) {
      data.company = 'Enterprise / Strategic Consultation'
    } else {
      errors.company = 'Company name is required.'
    }
  }

  if (phone && !isValidPhone(phone)) {
    errors.phone = 'Please provide a valid phone number or leave blank.'
  }

  const hasErrors = Object.keys(errors).length > 0
  if (hasErrors) {
    const firstErrorMessage = Object.values(errors)[0]
    return {
      valid: false,
      errors,
      errorMessage: firstErrorMessage
    }
  }

  // Preserve explicit source/service if provided; otherwise identify as LinkedIn
  const source = data.source && String(data.source).trim() ? String(data.source).trim() : 'LinkedIn'
  const service = data.service && String(data.service).trim() ? String(data.service).trim() : 'LinkedIn API Integration'
  const website = data.website && String(data.website).trim() ? String(data.website).trim() : 'TRUSTGRID.AI'

  return {
    valid: true,
    errors: {},
    data: {
      name,
      email,
      company,
      phone: phone || undefined,
      message: message || undefined,
      source,
      service,
      website
    }
  }
}

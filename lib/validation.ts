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
  phone: string
  role?: string
  resume?: string
  message?: string
  source: string
  service: string
  website: string
  partnershipType?: string
}

/**
 * Validates international and common name strings
 * Allows letters (including accented/non-Latin characters), spaces, hyphens, apostrophes, and periods.
 * Minimum 2 meaningful characters.
 */
export function isValidName(name: string): boolean {
  if (!name || typeof name !== 'string') return false
  const trimmed = name.trim()
  if (trimmed.length < 2) return false
  // Allow unicode letter characters, spaces, hyphens, apostrophes, and dots
  const re = /^[\p{L}\p{M}\s\-'.]{2,}$/u
  return re.test(trimmed)
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
 * Validates international and domestic phone numbers
 * Must contain at least 7 digits and at most 16 digits, with optional leading +
 */
export function isValidPhone(phone?: string, required: boolean = true): boolean {
  if (!phone || typeof phone !== 'string' || phone.trim() === '') {
    return !required
  }
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '')
  const re = /^\+?[0-9]{7,16}$/
  return re.test(cleaned)
}

/**
 * Normalizes phone number to clean string
 */
export function normalizePhone(phone?: string): string {
  if (!phone || typeof phone !== 'string') return ''
  return phone.trim().replace(/[\s\-\(\)\.]/g, '')
}

/**
 * Validates resume file extension
 */
export function isValidResumeFormat(filenameOrDataUrl?: string): boolean {
  if (!filenameOrDataUrl || typeof filenameOrDataUrl !== 'string') return true // Optional
  const lower = filenameOrDataUrl.toLowerCase()
  return lower.endsWith('.pdf') || lower.endsWith('.docx') || lower.endsWith('.doc') || lower.startsWith('data:application/pdf') || lower.startsWith('data:application/vnd.openxmlformats') || lower.startsWith('data:application/msword')
}

/**
 * Validate incoming lead capture submission
 * Enforces mandatory fields:
 * - Name (required, >= 2 characters)
 * - Email (required & valid)
 * - Phone (required & valid)
 * 
 * Optional fields:
 * - Company (optional, defaults to 'Enterprise Organization')
 * - Service / Product Interest (optional)
 * - Resume Upload (optional)
 * - Partnership Interest (optional)
 * 
 * Career Form:
 * - Role Applied For is required
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
  const phone = typeof data.phone === 'string' ? data.phone.trim() : (typeof data.mobile === 'string' ? data.mobile.trim() : '')
  const company = typeof data.company === 'string' && data.company.trim() ? data.company.trim() : (typeof data.currentPreviousCompany === 'string' && data.currentPreviousCompany.trim() ? data.currentPreviousCompany.trim() : 'Enterprise Organization')
  const message = typeof data.message === 'string' ? data.message.trim() : (typeof data.requirement === 'string' ? data.requirement.trim() : '')
  const role = typeof data.role === 'string' ? data.role.trim() : (typeof data.designation === 'string' ? data.designation.trim() : '')
  const resume = typeof data.resume === 'string' ? data.resume.trim() : ''
  const partnershipType = typeof data.partnershipType === 'string' ? data.partnershipType.trim() : (typeof data.partnershipInterest === 'string' ? data.partnershipInterest.trim() : '')

  const formType = (data.form_type || data.formType || data.formId || '').toUpperCase()
  const isCareer = formType.includes('CAREER') || formType.includes('JOB') || formType.includes('RESUME')

  // 1. Mandatory Name
  if (!name) {
    errors.name = 'Full name is required.'
  } else if (!isValidName(name)) {
    errors.name = 'Please enter a valid full name (minimum 2 characters).'
  }

  // 2. Mandatory Email
  if (!email) {
    errors.email = 'Email address is required.'
  } else if (!isValidEmail(email)) {
    errors.email = 'Please provide a valid email address.'
  }

  // 3. Mandatory Phone
  if (!phone) {
    errors.phone = 'Phone number is required.'
  } else if (!isValidPhone(phone, true)) {
    errors.phone = 'Please provide a valid phone number (7–16 digits).'
  }

  // 4. Role Applied For is required for Career Form
  if (isCareer && !role) {
    errors.role = 'Please select the role you are applying for.'
  }

  // 5. Resume format validation if supplied (resume is optional)
  if (resume && !isValidResumeFormat(resume)) {
    errors.resume = 'Resume must be in PDF, DOC, or DOCX format.'
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

  const source = data.source && String(data.source).trim() ? String(data.source).trim() : (data.leadSource || 'Website')
  const service = data.service && String(data.service).trim() ? String(data.service).trim() : (data.selectedSolutions ? (Array.isArray(data.selectedSolutions) ? data.selectedSolutions.join(', ') : String(data.selectedSolutions)) : 'Enterprise AI')
  const website = data.website && String(data.website).trim() ? String(data.website).trim() : 'TRUSTGRID.AI'

  return {
    valid: true,
    errors: {},
    data: {
      name,
      email,
      company,
      phone,
      role: role || undefined,
      resume: resume || undefined,
      message: message || undefined,
      source,
      service,
      website,
      partnershipType: partnershipType || undefined
    }
  }
}


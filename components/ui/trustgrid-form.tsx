'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  ArrowUpRight,
  Upload,
  FileText,
  Calendar,
  X,
  ChevronDown
} from 'lucide-react'
import {
  submitTrustGridForm,
  validateEmail,
  validatePhone,
  COUNTRY_CODES,
  CAREER_ROLES,
  PARTNERSHIP_TYPES,
  SALES_SERVICES
} from '@/lib/form-submission'
import { isValidName } from '@/lib/validation'
import {
  trackFormView,
  trackFormStart,
  trackFormFieldInteraction,
  trackFormValidationError,
  trackFormAbandon
} from '@/lib/analytics'

export { CAREER_ROLES, PARTNERSHIP_TYPES, SALES_SERVICES }

export type FormVariant =
  | 'diagnostic'
  | 'strategy_session'
  | 'contact'
  | 'proposal'
  | 'career'
  | 'partner'
  | 'newsletter'
  | 'workshop'
  | 'chat_lead'

interface TrustGridFormProps {
  variant?: FormVariant
  formId?: string
  formName?: string
  ctaSource?: string
  defaultSolution?: string
  defaultIndustry?: string
  compact?: boolean
  includeRequirement?: boolean
  onSuccess?: (submissionId: string) => void
}

export function TrustGridForm({
  variant = 'diagnostic',
  formId: customFormId,
  formName: customFormName,
  ctaSource = 'page_section',
  defaultSolution,
  defaultIndustry,
  compact = false,
  includeRequirement,
  onSuccess
}: TrustGridFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const countryDropdownRef = useRef<HTMLDivElement>(null)

  // Determine Form Identifier & Descriptive Titles
  const resolvedFormId = customFormId || `form_${variant}`
  const resolvedFormName = customFormName || (
    variant === 'diagnostic' ? 'AI Diagnostic Form' :
    variant === 'strategy_session' ? 'Executive Strategy Session Booking' :
    variant === 'contact' ? 'Contact Form' :
    variant === 'proposal' ? 'Enterprise Proposal Form' :
    variant === 'career' ? 'Career Application Form' :
    variant === 'partner' ? 'Partner Application Form' :
    variant === 'newsletter' ? 'Newsletter Subscription Form' :
    variant === 'workshop' ? 'Use Case Workshop Form' :
    'Lead Capture Form'
  )

  const isCareer = variant === 'career'
  const isPartner = variant === 'partner'
  const isSalesEnquiry = variant === 'diagnostic' || variant === 'proposal' || variant === 'contact' || variant === 'strategy_session'
  const showRequirement = includeRequirement ?? (variant === 'contact' || variant === 'proposal' || variant === 'partner' || variant === 'diagnostic' || isCareer)

  // Form Fields State
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState(isCareer ? CAREER_ROLES[0] : '')
  const [partnershipType, setPartnershipType] = useState(isPartner ? PARTNERSHIP_TYPES[0] : '')
  const [selectedService, setSelectedService] = useState(defaultSolution || '')
  const [message, setMessage] = useState('')

  // Country Code Dropdown UI State
  const [isCountryOpen, setIsCountryOpen] = useState(false)
  const [countrySearch, setCountrySearch] = useState('')

  // Careers Specific Resume State
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumeBase64, setResumeBase64] = useState<string>('')
  const [resumeError, setResumeError] = useState<string>('')
  const [isDragging, setIsDragging] = useState(false)

  // Validation & Touched state
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  // Submission UI state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [refId, setRefId] = useState('')

  // Funnel tracking flags
  const hasStartedRef = useRef(false)
  const lastFieldInteractedRef = useRef<string>('')

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const targetNode = event.target as Node
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(targetNode)) {
        setIsCountryOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 1. Funnel View tracking with Intersection Observer
  useEffect(() => {
    const el = formRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          trackFormView(resolvedFormId, resolvedFormName, variant, ctaSource)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [resolvedFormId, resolvedFormName, variant, ctaSource])

  // 2. Funnel Abandon tracking on unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (hasStartedRef.current && !submitted) {
        trackFormAbandon(resolvedFormId, resolvedFormName, lastFieldInteractedRef.current)
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [resolvedFormId, resolvedFormName, submitted])

  const handleFieldFocusOrChange = (fieldName: string) => {
    lastFieldInteractedRef.current = fieldName
    if (!hasStartedRef.current) {
      hasStartedRef.current = true
      trackFormStart(resolvedFormId, resolvedFormName, fieldName)
    } else {
      trackFormFieldInteraction(resolvedFormId, resolvedFormName, fieldName)
    }
  }

  // Standardized validation rules
  const validateField = (fieldName: string, value: string): string => {
    let err = ''
    if (fieldName === 'name') {
      const trimmed = value.trim()
      if (!trimmed) {
        err = 'Please enter your full name'
      } else if (!isValidName(trimmed)) {
        err = 'Please enter a valid name (at least 2 characters)'
      }
    } else if (fieldName === 'email') {
      const trimmed = value.trim()
      if (!trimmed) {
        err = 'Please enter your email address'
      } else if (!validateEmail(trimmed)) {
        err = 'Please enter a valid email address'
      }
    } else if (fieldName === 'phone') {
      const trimmed = value.trim()
      if (!trimmed) {
        err = 'Please enter your phone number'
      } else if (!validatePhone(`${countryCode}${trimmed}`, true)) {
        err = 'Please enter a valid phone number (7–16 digits)'
      }
    } else if (fieldName === 'role' && isCareer) {
      if (!value.trim()) {
        err = 'Please select the role you are applying for'
      }
    }
    setFieldErrors((prev) => ({ ...prev, [fieldName]: err }))
    return err
  }

  const handleBlur = (fieldName: string, value: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }))
    validateField(fieldName, value)
  }

  // Handle File Upload for Careers
  const handleFileSelection = (file: File) => {
    setResumeError('')
    const allowedExtensions = ['.pdf', '.doc', '.docx']
    const ext = '.' + file.name.split('.').pop()?.toLowerCase()
    
    if (!allowedExtensions.includes(ext)) {
      setResumeError('Please upload your resume in PDF, DOC, or DOCX format.')
      return
    }

    // Max 10MB
    const maxBytes = 10 * 1024 * 1024
    if (file.size > maxBytes) {
      setResumeError('Resume file size exceeds the 10 MB limit.')
      return
    }

    setResumeFile(file)
    handleFieldFocusOrChange('resume')

    // Read as Base64 Data URL for secure transmission
    const reader = new FileReader()
    reader.onload = () => {
      setResumeBase64(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0])
    }
  }

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0])
    }
  }

  const removeResumeFile = () => {
    setResumeFile(null)
    setResumeBase64('')
    setResumeError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    setErrorMessage('')
    const errors: Record<string, string> = {}

    const nameErr = validateField('name', name)
    const emailErr = validateField('email', email)
    const phoneErr = validateField('phone', phone)
    const roleErr = isCareer ? validateField('role', role) : ''

    setTouched({
      name: true,
      email: true,
      phone: true,
      role: true
    })

    if (nameErr) errors.name = nameErr
    if (emailErr) errors.email = emailErr
    if (phoneErr) errors.phone = phoneErr
    if (roleErr) errors.role = roleErr

    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0]
      setErrorMessage(firstError)
      trackFormValidationError(resolvedFormId, resolvedFormName, Object.keys(errors)[0], firstError)
      return
    }

    setIsSubmitting(true)

    const formType = isCareer ? 'CAREER' : (
      isPartner ? 'PARTNER' :
      variant === 'diagnostic' ? 'AI_DIAGNOSTIC' :
      variant === 'strategy_session' ? 'STRATEGY_SESSION' :
      variant === 'contact' ? 'CONTACT' :
      variant === 'proposal' ? 'PROPOSAL' :
      variant === 'newsletter' ? 'NEWSLETTER' :
      variant === 'workshop' ? 'WORKSHOP' :
      'GENERAL_LEAD'
    )

    const normalizedPhone = `${countryCode} ${phone.trim()}`

    const result = await submitTrustGridForm({
      formId: resolvedFormId,
      formName: resolvedFormName,
      form_type: formType,
      name: name.trim(),
      email: email.trim(),
      mobile: normalizedPhone,
      phone: normalizedPhone,
      company: company.trim() || undefined,
      currentPreviousCompany: company.trim() || undefined,
      role: isCareer ? role : undefined,
      designation: isCareer ? role : undefined,
      partnershipType: isPartner ? partnershipType : undefined,
      partnershipInterest: isPartner ? partnershipType : undefined,
      resume: isCareer ? (resumeBase64 || resumeFile?.name || '') : undefined,
      message: message.trim() || undefined,
      requirement: message.trim() || (selectedService ? `Interested in: ${selectedService}` : undefined),
      selectedSolutions: selectedService ? [selectedService] : (defaultSolution ? [defaultSolution] : undefined),
      industry: defaultIndustry || undefined,
      ctaSource
    })

    setIsSubmitting(false)

    if (result.success) {
      const generatedId = result.submissionId || `TG-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-0001`
      setRefId(generatedId)
      setSubmitted(true)
      if (onSuccess) onSuccess(generatedId)
    } else {
      setErrorMessage(result.message || 'Unable to submit request. Please try again.')
    }
  }

  // Filtered countries for search
  const filteredCountries = COUNTRY_CODES.filter(c =>
    c.country.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.code.includes(countrySearch)
  )

  // Submit button text based on form type
  const submitButtonText = isCareer
    ? 'Submit Application'
    : isPartner
    ? 'Become a Partner'
    : variant === 'proposal'
    ? 'Submit Proposal Request'
    : 'Submit Enquiry'

  // ==========================================
  // SUCCESS MESSAGE STATE
  // ==========================================
  if (submitted) {
    return (
      <div
        className="diagnostic-success-box tg-card-interactive"
        style={{
          padding: 'clamp(24px, 4vw, 36px)',
          borderRadius: '16px',
          border: '1px solid #86efac',
          background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)',
          boxShadow: '0 10px 30px rgba(22, 163, 74, 0.08)',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ background: '#dcfce7', color: '#15803d', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', fontSize: '11.5px', letterSpacing: '0.04em' }}>
            CONFIRMED &amp; DISPATCHED
          </span>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#1d5cff' }}>
            REF: {refId}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: '#dcfce7',
              border: '1px solid #86efac',
              color: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h3 style={{ margin: '0 0 6px', fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>
              {isCareer
                ? 'Application Successfully Submitted'
                : isPartner
                ? 'Partner Application Received'
                : 'Enquiry Successfully Submitted'}
            </h3>
            <p style={{ margin: 0, color: '#475569', fontSize: '14px', lineHeight: 1.5 }}>
              {isCareer
                ? `Thank you for applying for ${role}. Our talent engineering team will review your profile and reach out directly.`
                : isPartner
                ? 'Thank you for your partnership interest. Our alliances and ecosystem team will connect with you within 24–48 business hours.'
                : 'Your inquiry has been routed to our principal systems engineering team. You will receive a direct technical response within 24–48 business hours.'}
            </p>
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {variant === 'strategy_session' && (
            <a
              href="https://calendar.app.google/voXXRkbgVuuft3fz6"
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary button-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', fontSize: '12.5px', padding: '8px 16px', background: '#1d5cff', color: '#ffffff', borderRadius: '8px', fontWeight: 600 }}
            >
              <Calendar size={14} />
              <span>Lock Slot on Google Calendar</span>
              <ArrowUpRight size={14} />
            </a>
          )}
          <button
            type="button"
            className="button button-ghost button-sm"
            onClick={() => {
              setSubmitted(false)
              setName('')
              setEmail('')
              setPhone('')
              setCompany('')
              setMessage('')
              setResumeFile(null)
              setResumeBase64('')
              setTouched({})
              setFieldErrors({})
              hasStartedRef.current = false
            }}
            style={{ fontSize: '12.5px', padding: '8px 14px' }}
          >
            {isCareer ? 'Submit Another Application' : 'Submit Another Request'}
          </button>
          <a
            href="https://wa.me/15550192834?text=Hi%20TrustGrid%20team%2C%20following%20up%20on%20my%20submission"
            target="_blank"
            rel="noopener noreferrer"
            className="button button-ghost button-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#15803d', borderColor: '#86efac', textDecoration: 'none', fontSize: '12.5px', padding: '8px 14px' }}
          >
            <span>Direct WhatsApp Advisory</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    )
  }

  // ==========================================
  // FORM RENDER - STRICT VERTICAL SINGLE COLUMN
  // ==========================================
  return (
    <form
      ref={formRef}
      className={`interactive-diagnostic-form tg-card-interactive ${compact ? 'form-compact' : ''}`}
      onSubmit={handleSubmit}
      noValidate
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: compact ? '20px' : '28px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* FORM TITLE & HEADER */}
      <div>
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#1d5cff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {isCareer ? 'CAREER APPLICATION' : isPartner ? 'PARTNER PROGRAM' : 'SECURE ENQUIRY'}
        </span>
        <h3 style={{ margin: '4px 0 6px', fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>
          {resolvedFormName}
        </h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: 1.4 }}>
          {isCareer
            ? 'Apply to join TRUSTGRID.AI bare-metal GPU & autonomous systems teams.'
            : isPartner
            ? 'Collaborate on high-density AI infrastructure, compute fabrics, and enterprise DBOT delivery.'
            : 'Connect with our principal AI architects and systems engineers for tailored solutions.'}
        </p>
      </div>

      {/* GLOBAL ERROR BANNER */}
      {errorMessage && (
        <div
          role="alert"
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#b91c1c',
            fontSize: '13px',
            fontWeight: 500
          }}
        >
          <AlertCircle size={16} className="shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 1. FULL NAME (MANDATORY) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label
          htmlFor={`${resolvedFormId}_name`}
          style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}
        >
          Full Name <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input
          id={`${resolvedFormId}_name`}
          type="text"
          name="name"
          autoComplete="name"
          required
          disabled={isSubmitting}
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            if (touched.name) validateField('name', e.target.value)
          }}
          onFocus={() => handleFieldFocusOrChange('name')}
          onBlur={() => handleBlur('name', name)}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '11px 14px',
            minHeight: '44px',
            fontSize: '13.5px',
            borderRadius: '10px',
            border: touched.name && fieldErrors.name ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
            background: touched.name && fieldErrors.name ? '#fef2f2' : '#ffffff',
            color: '#0f172a',
            outline: 'none',
            transition: 'border-color 0.15s ease'
          }}
        />
        {touched.name && fieldErrors.name && (
          <span style={{ fontSize: '11.5px', color: '#dc2626', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <AlertCircle size={12} /> {fieldErrors.name}
          </span>
        )}
      </div>

      {/* 2. EMAIL ADDRESS (MANDATORY) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label
          htmlFor={`${resolvedFormId}_email`}
          style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}
        >
          Email Address <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input
          id={`${resolvedFormId}_email`}
          type="email"
          name="email"
          autoComplete="email"
          required
          disabled={isSubmitting}
          placeholder={isCareer ? 'your.email@domain.com' : 'name@company.com'}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (touched.email) validateField('email', e.target.value)
          }}
          onFocus={() => handleFieldFocusOrChange('email')}
          onBlur={() => handleBlur('email', email)}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '11px 14px',
            minHeight: '44px',
            fontSize: '13.5px',
            borderRadius: '10px',
            border: touched.email && fieldErrors.email ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
            background: touched.email && fieldErrors.email ? '#fef2f2' : '#ffffff',
            color: '#0f172a',
            outline: 'none',
            transition: 'border-color 0.15s ease'
          }}
        />
        {touched.email && fieldErrors.email && (
          <span style={{ fontSize: '11.5px', color: '#dc2626', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <AlertCircle size={12} /> {fieldErrors.email}
          </span>
        )}
      </div>

      {/* 3. PHONE NUMBER (MANDATORY WITH COUNTRY CODE SELECTOR) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label
          htmlFor={`${resolvedFormId}_phone`}
          style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}
        >
          Phone Number <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <div style={{ display: 'flex', gap: '8px', width: '100%', boxSizing: 'border-box' }}>
          {/* Country Code Dropdown */}
          <div style={{ position: 'relative', width: '120px', flexShrink: 0 }} ref={countryDropdownRef}>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setIsCountryOpen(prev => !prev)}
              style={{
                width: '100%',
                minHeight: '44px',
                padding: '10px 8px',
                fontSize: '13px',
                fontWeight: 600,
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                background: '#f8fafc',
                color: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxSizing: 'border-box'
              }}
            >
              <span>{COUNTRY_CODES.find(c => c.code === countryCode)?.flag || '🌐'} {countryCode}</span>
              <ChevronDown size={14} className="text-slate-500" />
            </button>

            {isCountryOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '230px',
                  maxHeight: '210px',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '10px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                  zIndex: 60,
                  marginTop: '4px',
                  overflowY: 'auto',
                  padding: '6px'
                }}
              >
                <div style={{ padding: '4px', borderBottom: '1px solid #f1f5f9', marginBottom: '4px' }}>
                  <input
                    type="text"
                    placeholder="Search country..."
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '6px 8px',
                      fontSize: '12px',
                      borderRadius: '6px',
                      border: '1px solid #e2e8f0',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                {filteredCountries.map(c => (
                  <button
                    key={`${c.iso}_${c.code}`}
                    type="button"
                    onClick={() => {
                      setCountryCode(c.code)
                      setIsCountryOpen(false)
                      setCountrySearch('')
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '7px 8px',
                      fontSize: '12px',
                      borderRadius: '6px',
                      border: 'none',
                      background: countryCode === c.code ? '#eff6ff' : 'transparent',
                      color: countryCode === c.code ? '#1d5cff' : '#1e293b',
                      fontWeight: countryCode === c.code ? 700 : 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>{c.flag}</span>
                    <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.country}</span>
                    <span style={{ color: '#64748b', fontSize: '11px' }}>{c.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Phone Input */}
          <input
            id={`${resolvedFormId}_phone`}
            type="tel"
            name="phone"
            autoComplete="tel"
            required
            disabled={isSubmitting}
            placeholder="9876543210"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value)
              if (touched.phone) validateField('phone', e.target.value)
            }}
            onFocus={() => handleFieldFocusOrChange('phone')}
            onBlur={() => handleBlur('phone', phone)}
            style={{
              flex: 1,
              width: '100%',
              minHeight: '44px',
              boxSizing: 'border-box',
              padding: '11px 14px',
              fontSize: '13.5px',
              borderRadius: '10px',
              border: touched.phone && fieldErrors.phone ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
              background: touched.phone && fieldErrors.phone ? '#fef2f2' : '#ffffff',
              color: '#0f172a',
              outline: 'none',
              transition: 'border-color 0.15s ease'
            }}
          />
        </div>
        {touched.phone && fieldErrors.phone && (
          <span style={{ fontSize: '11.5px', color: '#dc2626', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <AlertCircle size={12} /> {fieldErrors.phone}
          </span>
        )}
      </div>

      {/* 4. CAREER SPECIFIC: ROLE APPLIED FOR (MANDATORY) */}
      {isCareer && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label
            htmlFor={`${resolvedFormId}_role`}
            style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}
          >
            Role Applied For <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <select
            id={`${resolvedFormId}_role`}
            name="role"
            required
            disabled={isSubmitting}
            value={role}
            onChange={(e) => {
              setRole(e.target.value)
              if (touched.role) validateField('role', e.target.value)
            }}
            onFocus={() => handleFieldFocusOrChange('role')}
            onBlur={() => handleBlur('role', role)}
            style={{
              width: '100%',
              minHeight: '44px',
              boxSizing: 'border-box',
              padding: '11px 14px',
              fontSize: '13.5px',
              borderRadius: '10px',
              border: touched.role && fieldErrors.role ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#0f172a',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {CAREER_ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          {touched.role && fieldErrors.role && (
            <span style={{ fontSize: '11.5px', color: '#dc2626', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlertCircle size={12} /> {fieldErrors.role}
            </span>
          )}
        </div>
      )}

      {/* 5. PARTNER SPECIFIC: PARTNERSHIP INTEREST (OPTIONAL) */}
      {isPartner && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label
              htmlFor={`${resolvedFormId}_partnership_type`}
              style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}
            >
              Partnership Interest
            </label>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Optional</span>
          </div>
          <select
            id={`${resolvedFormId}_partnership_type`}
            name="partnershipType"
            disabled={isSubmitting}
            value={partnershipType}
            onChange={(e) => setPartnershipType(e.target.value)}
            onFocus={() => handleFieldFocusOrChange('partnershipType')}
            style={{
              width: '100%',
              minHeight: '44px',
              boxSizing: 'border-box',
              padding: '11px 14px',
              fontSize: '13.5px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#0f172a',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {PARTNERSHIP_TYPES.map((pt) => (
              <option key={pt} value={pt}>
                {pt}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* 6. SALES / DIAGNOSTIC SPECIFIC: SERVICE OR PRODUCT INTEREST (OPTIONAL) */}
      {isSalesEnquiry && !isPartner && !isCareer && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label
              htmlFor={`${resolvedFormId}_service`}
              style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}
            >
              Service / Product Interest
            </label>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Optional</span>
          </div>
          <select
            id={`${resolvedFormId}_service`}
            name="service"
            disabled={isSubmitting}
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            onFocus={() => handleFieldFocusOrChange('service')}
            style={{
              width: '100%',
              minHeight: '44px',
              boxSizing: 'border-box',
              padding: '11px 14px',
              fontSize: '13.5px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#0f172a',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="">Select an interest area (or leave blank for general enquiry)</option>
            {SALES_SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* 7. COMPANY / ORGANIZATION (OPTIONAL) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label
            htmlFor={`${resolvedFormId}_company`}
            style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}
          >
            {isCareer ? 'Current / Previous Organization' : 'Company / Organization'}
          </label>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Optional</span>
        </div>
        <input
          id={`${resolvedFormId}_company`}
          type="text"
          name="company"
          autoComplete="organization"
          disabled={isSubmitting}
          placeholder={isCareer ? 'e.g. Current or past company (optional)' : 'e.g. Enterprise / Company Name'}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          onFocus={() => handleFieldFocusOrChange('company')}
          style={{
            width: '100%',
            minHeight: '44px',
            boxSizing: 'border-box',
            padding: '11px 14px',
            fontSize: '13.5px',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            color: '#0f172a',
            outline: 'none',
            transition: 'border-color 0.15s ease'
          }}
        />
      </div>

      {/* 8. CAREERS FORM: RESUME / CV UPLOAD (OPTIONAL) */}
      {isCareer && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label
              htmlFor={`${resolvedFormId}_resume`}
              style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}
            >
              Resume / CV Upload
            </label>
            <span style={{ fontSize: '11px', color: '#16a34a', background: '#dcfce7', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
              Optional
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
            Accepted formats: PDF, DOCX, DOC • Maximum file size: 10 MB
          </p>

          <input
            ref={fileInputRef}
            id={`${resolvedFormId}_resume`}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          {!resumeFile ? (
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleFileDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: isDragging ? '2px dashed #2563eb' : resumeError ? '2px dashed #ef4444' : '2px dashed #cbd5e1',
                background: isDragging ? '#eff6ff' : resumeError ? '#fef2f2' : '#f8fafc',
                borderRadius: '12px',
                padding: '20px 16px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minHeight: '44px'
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: isDragging ? '#dbeafe' : '#f1f5f9',
                  color: isDragging ? '#2563eb' : '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 8px'
                }}
              >
                <Upload size={18} />
              </div>
              <p style={{ margin: '0 0 2px', fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>
                Click to browse or drag &amp; drop resume
              </p>
              <p style={{ margin: 0, fontSize: '11.5px', color: '#64748b' }}>
                PDF, DOCX, DOC (up to 10 MB)
              </p>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '10px',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: '#dcfce7',
                    color: '#16a34a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <FileText size={16} />
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {resumeFile.name}
                  </p>
                  <p style={{ margin: 0, fontSize: '11px', color: '#15803d' }}>
                    {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to submit
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    color: '#334155',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    padding: '4px 8px',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Replace
                </button>
                <button
                  type="button"
                  onClick={removeResumeFile}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#64748b',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px'
                  }}
                  aria-label="Remove uploaded resume"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}

          {resumeError && (
            <span style={{ fontSize: '11.5px', color: '#dc2626', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <AlertCircle size={12} /> {resumeError}
            </span>
          )}
        </div>
      )}

      {/* 9. MESSAGE / SCOPE / REQUIREMENT (OPTIONAL) */}
      {showRequirement && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label
              htmlFor={`${resolvedFormId}_message`}
              style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}
            >
              {isCareer ? 'Additional Notes / Cover Summary' : isPartner ? 'Partnership Scope / Objectives' : 'Requirements / Message'}
            </label>
            <span style={{ fontSize: '11px', color: '#64748b' }}>
              Optional
            </span>
          </div>
          <textarea
            id={`${resolvedFormId}_message`}
            rows={compact ? 2 : 3}
            disabled={isSubmitting}
            placeholder={
              isCareer
                ? 'Highlight your systems engineering, GPU, or research experience...'
                : isPartner
                ? 'Briefly describe your alliance goals, infrastructure stack, or co-delivery scope...'
                : 'Share any specific requirements or technical objectives...'
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => handleFieldFocusOrChange('message')}
            style={{
              width: '100%',
              minHeight: '75px',
              boxSizing: 'border-box',
              padding: '11px 14px',
              fontSize: '13.5px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              color: '#0f172a',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
        </div>
      )}

      {/* 10. CTA SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="button button-primary tg-btn-shine"
        style={{
          width: '100%',
          minHeight: '46px',
          padding: '13px 20px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #1d5cff 0%, #0d3eb8 100%)',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: '14.5px',
          border: 'none',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          opacity: isSubmitting ? 0.75 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          boxShadow: '0 4px 14px rgba(29, 92, 255, 0.3)',
          transition: 'all 0.2s ease',
          marginTop: '4px'
        }}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <span>{submitButtonText}</span>
            <Send size={15} />
          </>
        )}
      </button>

      {/* CONFIDENTIALITY FOOTNOTE */}
      <p style={{ margin: 0, fontSize: '11.5px', color: '#64748b', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
        <Lock size={12} className="text-slate-400" />
        <span>Enterprise confidentiality guaranteed under mutual NDA standards.</span>
      </p>
    </form>
  )
}

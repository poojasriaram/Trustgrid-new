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
  X
} from 'lucide-react'
import { submitTrustGridForm, validateEmail, validatePhone } from '@/lib/form-submission'
import {
  trackFormView,
  trackFormStart,
  trackFormFieldInteraction,
  trackFormValidationError,
  trackFormAbandon
} from '@/lib/analytics'

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

  // Determine Form Identifier
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
  // Single consolidated requirement field if contact or explicitly requested
  const showRequirement = includeRequirement ?? (variant === 'contact' || variant === 'proposal')

  // Form Fields State
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')

  // Careers Specific State
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
      if (!value.trim()) err = 'Please enter your name'
    } else if (fieldName === 'email') {
      if (!value.trim()) {
        err = 'Please enter a valid email address'
      } else if (!validateEmail(value.trim())) {
        err = 'Please enter a valid email address'
      }
    } else if (fieldName === 'mobile') {
      if (!value.trim()) {
        err = 'Please enter your mobile number'
      } else if (!validatePhone(value.trim())) {
        err = 'Please enter your mobile number'
      }
    } else if (fieldName === 'company') {
      if (!value.trim()) {
        err = isCareer ? 'Please enter your company name' : 'Please enter your company name'
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

    // Read as Base64 Data URL for API transmission
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
    const mobileErr = validateField('mobile', mobile)
    const companyErr = validateField('company', company)

    setTouched({ name: true, email: true, mobile: true, company: true })

    if (nameErr) errors.name = nameErr
    if (emailErr) errors.email = emailErr
    if (mobileErr) errors.mobile = mobileErr
    if (companyErr) errors.company = companyErr

    if (isCareer && !resumeFile) {
      setResumeError('Please upload your resume')
      errors.resume = 'Please upload your resume'
    }

    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0]
      setErrorMessage(firstError)
      trackFormValidationError(resolvedFormId, resolvedFormName, Object.keys(errors)[0], firstError)
      return
    }

    setIsSubmitting(true)

    const formType = isCareer ? 'CAREER' : (
      variant === 'diagnostic' ? 'AI_DIAGNOSTIC' :
      variant === 'strategy_session' ? 'STRATEGY_SESSION' :
      variant === 'contact' ? 'CONTACT' :
      variant === 'proposal' ? 'PROPOSAL' :
      variant === 'partner' ? 'PARTNER' :
      variant === 'newsletter' ? 'NEWSLETTER' :
      variant === 'workshop' ? 'WORKSHOP' :
      'GENERAL_LEAD'
    )

    const result = await submitTrustGridForm({
      formId: resolvedFormId,
      formName: resolvedFormName,
      form_type: formType,
      name: name.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      phone: mobile.trim(),
      company: company.trim(),
      currentPreviousCompany: isCareer ? company.trim() : undefined,
      resume: isCareer ? (resumeBase64 || resumeFile?.name || '') : undefined,
      message: message.trim() || undefined,
      requirement: message.trim() || undefined,
      selectedSolutions: defaultSolution ? [defaultSolution] : undefined,
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

  // ==========================================
  // 10. SUCCESS MESSAGE STATE
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
          boxShadow: '0 10px 30px rgba(22, 163, 74, 0.08)'
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
              {isCareer ? 'Application Submitted' : 'Thank You'}
            </h3>
            <p style={{ margin: 0, color: '#475569', fontSize: '14px', lineHeight: 1.5 }}>
              {isCareer
                ? 'Thank you for your application. Our team will review your resume and contact you if your profile matches an opportunity.'
                : 'Your request has been submitted successfully. Our team will get back to you soon.'}
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
              setMobile('')
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
            href="https://wa.me/15550192834?text=Hi%20TrustGrid%20team%2C%20following%20up%20on%20my%20submission%20"
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
  // FORM RENDER
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
        boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)'
      }}
    >
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
            marginBottom: '18px',
            fontWeight: 500
          }}
        >
          <AlertCircle size={16} className="shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* STRATEGY SESSION: GOOGLE CALENDAR DIRECT BOOKING NOTICE */}
      {variant === 'strategy_session' && (
        <div
          style={{
            background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
            border: '1px solid #bfdbfe',
            borderRadius: '12px',
            padding: '14px 16px',
            marginBottom: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} style={{ color: '#1d5cff' }} />
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e3a8a' }}>
                Direct Calendar Booking Available
              </span>
            </div>
            <a
              href="https://calendar.app.google/voXXRkbgVuuft3fz6"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: '#1d5cff',
                color: '#ffffff',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              <span>Schedule on Google Calendar</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
          <p style={{ margin: 0, fontSize: '12px', color: '#475569', lineHeight: 1.4 }}>
            Prefer to pick a live 45-minute slot immediately? Open our Google Calendar schedule above, or complete this brief intake form to receive a tailored briefing agenda.
          </p>
        </div>
      )}

      {/* INPUTS CONTAINER: BALANCED 2-COL DESKTOP, 1-COL MOBILE */}
      <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
        
        {/* 1. NAME FIELD */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label
            htmlFor={`${resolvedFormId}_name`}
            style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}
          >
            Name <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            id={`${resolvedFormId}_name`}
            type="text"
            name="name"
            autoComplete="name"
            required
            disabled={isSubmitting}
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              if (touched.name) validateField('name', e.target.value)
            }}
            onFocus={() => handleFieldFocusOrChange('name')}
            onBlur={() => handleBlur('name', name)}
            style={{
              width: '100%',
              padding: '11px 14px',
              fontSize: '13.5px',
              borderRadius: '10px',
              border: touched.name && fieldErrors.name ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
              background: touched.name && fieldErrors.name ? '#fef2f2' : '#ffffff',
              color: '#0f172a',
              outline: 'none',
              transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
            }}
          />
          {touched.name && fieldErrors.name && (
            <span style={{ fontSize: '11.5px', color: '#dc2626', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlertCircle size={12} /> {fieldErrors.name}
            </span>
          )}
        </div>

        {/* 2. EMAIL FIELD */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label
            htmlFor={`${resolvedFormId}_email`}
            style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}
          >
            Email <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            id={`${resolvedFormId}_email`}
            type="email"
            name="email"
            autoComplete="email"
            required
            disabled={isSubmitting}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (touched.email) validateField('email', e.target.value)
            }}
            onFocus={() => handleFieldFocusOrChange('email')}
            onBlur={() => handleBlur('email', email)}
            style={{
              width: '100%',
              padding: '11px 14px',
              fontSize: '13.5px',
              borderRadius: '10px',
              border: touched.email && fieldErrors.email ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
              background: touched.email && fieldErrors.email ? '#fef2f2' : '#ffffff',
              color: '#0f172a',
              outline: 'none',
              transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
            }}
          />
          {touched.email && fieldErrors.email && (
            <span style={{ fontSize: '11.5px', color: '#dc2626', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlertCircle size={12} /> {fieldErrors.email}
            </span>
          )}
        </div>

        {/* 3. MOBILE NUMBER FIELD */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label
            htmlFor={`${resolvedFormId}_mobile`}
            style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}
          >
            Mobile Number <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            id={`${resolvedFormId}_mobile`}
            type="tel"
            name="mobile"
            autoComplete="tel"
            required
            disabled={isSubmitting}
            placeholder="Enter your mobile number"
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value)
              if (touched.mobile) validateField('mobile', e.target.value)
            }}
            onFocus={() => handleFieldFocusOrChange('mobile')}
            onBlur={() => handleBlur('mobile', mobile)}
            style={{
              width: '100%',
              padding: '11px 14px',
              fontSize: '13.5px',
              borderRadius: '10px',
              border: touched.mobile && fieldErrors.mobile ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
              background: touched.mobile && fieldErrors.mobile ? '#fef2f2' : '#ffffff',
              color: '#0f172a',
              outline: 'none',
              transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
            }}
          />
          {touched.mobile && fieldErrors.mobile && (
            <span style={{ fontSize: '11.5px', color: '#dc2626', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlertCircle size={12} /> {fieldErrors.mobile}
            </span>
          )}
        </div>

        {/* 4. COMPANY (OR CURRENT / PREVIOUS COMPANY FOR CAREERS) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label
            htmlFor={`${resolvedFormId}_company`}
            style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}
          >
            {isCareer ? 'Current / Previous Company' : 'Company'} <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            id={`${resolvedFormId}_company`}
            type="text"
            name="company"
            autoComplete="organization"
            required
            disabled={isSubmitting}
            placeholder={isCareer ? 'Enter your current or previous company' : 'Enter your company name'}
            value={company}
            onChange={(e) => {
              setCompany(e.target.value)
              if (touched.company) validateField('company', e.target.value)
            }}
            onFocus={() => handleFieldFocusOrChange('company')}
            onBlur={() => handleBlur('company', company)}
            style={{
              width: '100%',
              padding: '11px 14px',
              fontSize: '13.5px',
              borderRadius: '10px',
              border: touched.company && fieldErrors.company ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
              background: touched.company && fieldErrors.company ? '#fef2f2' : '#ffffff',
              color: '#0f172a',
              outline: 'none',
              transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
            }}
          />
          {touched.company && fieldErrors.company && (
            <span style={{ fontSize: '11.5px', color: '#dc2626', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlertCircle size={12} /> {fieldErrors.company}
            </span>
          )}
        </div>
      </div>

      {/* 5. CAREERS FORM: RESUME / CV UPLOAD (ISI SECURITY FUNCTIONAL & UX REFERENCE) */}
      {isCareer && (
        <div style={{ marginBottom: '18px' }}>
          <label
            htmlFor={`${resolvedFormId}_resume`}
            style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1e293b', marginBottom: '4px' }}
          >
            Resume / CV Upload <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <p style={{ margin: '0 0 8px', fontSize: '12px', color: '#64748b' }}>
            Upload your resume (PDF, DOC, or DOCX) • Maximum file size: 10 MB
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
                padding: '24px 16px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: isDragging ? '#dbeafe' : '#f1f5f9',
                  color: isDragging ? '#2563eb' : '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 10px'
                }}
              >
                <Upload size={20} />
              </div>
              <p style={{ margin: '0 0 4px', fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>
                Click to browse or drag and drop your file here
              </p>
              <p style={{ margin: 0, fontSize: '11.5px', color: '#64748b' }}>
                Supported Formats: PDF, DOC, DOCX (Max 10 MB)
              </p>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '10px',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: '#dcfce7',
                    color: '#16a34a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <FileText size={18} />
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
                <X size={18} />
              </button>
            </div>
          )}

          {resumeError && (
            <span style={{ fontSize: '11.5px', color: '#dc2626', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
              <AlertCircle size={12} /> {resumeError}
            </span>
          )}
        </div>
      )}

      {/* 6. CONSOLIDATED LONG FORM: REQUIREMENT / MESSAGE (ONLY WHEN GENUINELY REQUIRED) */}
      {showRequirement && !isCareer && (
        <div style={{ marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <label
              htmlFor={`${resolvedFormId}_message`}
              style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}
            >
              Requirement / Message
            </label>
            <span style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', padding: '1px 6px', borderRadius: '4px' }}>
              Optional
            </span>
          </div>
          <textarea
            id={`${resolvedFormId}_message`}
            rows={compact ? 2 : 3}
            disabled={isSubmitting}
            placeholder="Enter your requirements or message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => handleFieldFocusOrChange('message')}
            style={{
              width: '100%',
              padding: '11px 14px',
              fontSize: '13.5px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              color: '#0f172a',
              outline: 'none',
              resize: 'vertical',
              minHeight: '80px',
              fontFamily: 'inherit'
            }}
          />
        </div>
      )}

      {/* 7. CTA SUBMISSION BUTTON */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="button button-primary tg-btn-shine"
        style={{
          width: '100%',
          padding: '13px 20px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #1d5cff 0%, #0d3eb8 100%)',
          color: '#ffffff',
          fontWeight: 600,
          fontSize: '14px',
          border: 'none',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          opacity: isSubmitting ? 0.75 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          boxShadow: '0 4px 14px rgba(29, 92, 255, 0.3)',
          transition: 'all 0.2s ease'
        }}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Processing Request...</span>
          </>
        ) : (
          <>
            <span>{isCareer ? 'Apply Now' : 'Submit Request'}</span>
            <Send size={15} />
          </>
        )}
      </button>

      {/* CONFIDENTIALITY FOOTNOTE */}
      <p style={{ margin: '12px 0 0', fontSize: '11.5px', color: '#64748b', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
        <Lock size={12} className="text-slate-400" />
        <span>Enterprise confidentiality guaranteed. Disclosures handled under mutual NDA standards.</span>
      </p>
    </form>
  )
}

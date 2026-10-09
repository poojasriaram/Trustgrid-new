'use client'

import React, { useState, useRef, useId, useEffect } from 'react'
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  ArrowUpRight,
  MessageSquare,
  ChevronDown
} from 'lucide-react'
import {
  submitTrustGridForm,
  validateEmail,
  validatePhone,
  COUNTRY_CODES
} from '@/lib/form-submission'
import { isValidName } from '@/lib/validation'
import {
  trackFormView,
  trackFormStart,
  trackFormFieldInteraction,
  trackFormValidationError,
  trackFormSubmit
} from '@/lib/analytics'

export const ENQUIRY_TYPES = [
  'General Business Enquiry',
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
  'Partnership & Ecosystem Alliance',
  'Career & Research Fellowship'
] as const

interface QuickContactFormProps {
  ctaSource?: string
  className?: string
  onSuccess?: (submissionId: string) => void
}

export function QuickContactForm({
  ctaSource = 'contact_page_quick_form',
  className = '',
  onSuccess
}: QuickContactFormProps) {
  const formId = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const countryDropdownRef = useRef<HTMLDivElement>(null)

  // Fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [enquiryType, setEnquiryType] = useState<string>(ENQUIRY_TYPES[0])
  const [message, setMessage] = useState('')

  // Country Code Dropdown UI State
  const [isCountryOpen, setIsCountryOpen] = useState(false)
  const [countrySearch, setCountrySearch] = useState('')

  // State
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [refId, setRefId] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

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

  const validateField = (fieldName: string, value: string): string => {
    let err = ''
    if (fieldName === 'name') {
      const trimmed = value.trim()
      if (!trimmed) {
        err = 'Please enter your full name'
      } else if (!isValidName(trimmed)) {
        err = 'Please enter a valid full name (at least 2 characters)'
      }
    } else if (fieldName === 'email') {
      const trimmed = value.trim()
      if (!trimmed) {
        err = 'Please enter your work email'
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
    }
    setFieldErrors((prev) => ({ ...prev, [fieldName]: err }))
    return err
  }

  const handleBlur = (fieldName: string, value: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }))
    validateField(fieldName, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    setErrorMessage('')
    const errors: Record<string, string> = {}

    const nameErr = validateField('name', name)
    const emailErr = validateField('email', email)
    const phoneErr = validateField('phone', phone)

    setTouched({
      name: true,
      email: true,
      phone: true
    })

    if (nameErr) errors.name = nameErr
    if (emailErr) errors.email = emailErr
    if (phoneErr) errors.phone = phoneErr

    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0]
      setErrorMessage(firstError)
      trackFormValidationError('form_quick_contact', 'Quick Contact Form', Object.keys(errors)[0], firstError)
      return
    }

    setIsSubmitting(true)
    trackFormStart('form_quick_contact', 'Quick Contact Form', 'submit_click')

    const normalizedPhone = `${countryCode} ${phone.trim()}`

    try {
      const result = await submitTrustGridForm({
        formId: 'form_quick_contact',
        formName: 'Quick Contact Form',
        form_type: 'CONTACT',
        name: name.trim(),
        email: email.trim(),
        mobile: normalizedPhone,
        phone: normalizedPhone,
        company: company.trim() || undefined,
        currentPreviousCompany: company.trim() || undefined,
        requirement: `[${enquiryType}] ${message.trim()}`.trim(),
        message: message.trim() || undefined,
        selectedSolutions: enquiryType !== 'General Business Enquiry' ? [enquiryType] : undefined,
        subject: `[TG Contact] ${enquiryType} — ${company.trim() || name.trim()}`,
        ctaSource
      })

      if (result.success) {
        const genId = result.submissionId || `TG-MSG-${Date.now().toString().slice(-6)}`
        setRefId(genId)
        setSubmitted(true)
        trackFormSubmit('form_quick_contact', 'Quick Contact Form', true, genId)
        if (onSuccess) onSuccess(genId)
      } else {
        setErrorMessage(result.message || 'Unable to deliver message. Please try again.')
        trackFormSubmit('form_quick_contact', 'Quick Contact Form', false, undefined, result.message)
      }
    } catch (err: any) {
      console.error('[Quick Contact Submission Error]', err)
      setErrorMessage('Network transmission failure. Please retry or contact connect@trustgrid.ai directly.')
      trackFormSubmit('form_quick_contact', 'Quick Contact Form', false, undefined, err?.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Filtered countries for search
  const filteredCountries = COUNTRY_CODES.filter(c =>
    c.country.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.code.includes(countrySearch)
  )

  // =========================================================================
  // SUCCESS STATE
  // =========================================================================
  if (submitted) {
    return (
      <div
        className={`quick-contact-success-box tg-card-interactive ${className}`}
        style={{
          background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)',
          border: '1px solid #86efac',
          borderRadius: '16px',
          padding: 'clamp(24px, 4vw, 36px)',
          boxShadow: '0 10px 30px rgba(22, 163, 74, 0.08)',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ background: '#dcfce7', color: '#15803d', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', fontSize: '11.5px', letterSpacing: '0.04em' }}>
            MESSAGE DELIVERED
          </span>
          <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#1d5cff' }}>
            REF: {refId}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
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
            <CheckCircle2 size={22} />
          </div>
          <div>
            <h3 style={{ margin: '0 0 6px', fontSize: '19px', fontWeight: 700, color: '#0f172a' }}>
              Thank You for Reaching Out
            </h3>
            <p style={{ margin: 0, color: '#475569', fontSize: '14px', lineHeight: 1.5 }}>
              Your inquiry has been routed to our global executive &amp; systems engineering leads. You will receive a direct technical response within <strong>24–48 business hours</strong>.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
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
              setTouched({})
              setFieldErrors({})
            }}
            style={{ fontSize: '12.5px', padding: '8px 14px' }}
          >
            Send Another Message
          </button>
          <a
            href="https://wa.me/15550192834?text=Hi%20TrustGrid%20team%2C%20following%20up%20on%20my%20enquiry"
            target="_blank"
            rel="noopener noreferrer"
            className="button button-ghost button-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#15803d', borderColor: '#86efac', textDecoration: 'none', fontSize: '12.5px', padding: '8px 14px' }}
          >
            <span>Chat on WhatsApp</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    )
  }

  // =========================================================================
  // QUICK FORM RENDER - STRICT VERTICAL SINGLE COLUMN
  // =========================================================================
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className={`quick-contact-form tg-card-interactive ${className}`}
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: 'clamp(20px, 3vw, 28px)',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#eff6ff', color: '#1d5cff', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '6px' }}>
          <MessageSquare size={12} />
          <span>DIRECT ENQUIRY</span>
        </div>
        <h3 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>
          Send an Executive Message
        </h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: 1.4 }}>
          Have a general question, partnership inquiry, or technical proposal? Send a brief message and our systems leads will respond promptly.
        </p>
      </div>

      {/* ERROR BANNER */}
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
        <label htmlFor={`${formId}_name`} style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
          Full Name <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input
          id={`${formId}_name`}
          type="text"
          required
          disabled={isSubmitting}
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            if (touched.name) validateField('name', e.target.value)
          }}
          onFocus={() => trackFormFieldInteraction('form_quick_contact', 'Quick Contact Form', 'name')}
          onBlur={() => handleBlur('name', name)}
          style={{
            width: '100%',
            minHeight: '44px',
            boxSizing: 'border-box',
            padding: '11px 14px',
            fontSize: '13.5px',
            borderRadius: '10px',
            border: touched.name && fieldErrors.name ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
            background: touched.name && fieldErrors.name ? '#fef2f2' : '#ffffff',
            color: '#0f172a',
            outline: 'none'
          }}
        />
        {touched.name && fieldErrors.name && (
          <span style={{ fontSize: '11.5px', color: '#dc2626', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <AlertCircle size={12} /> {fieldErrors.name}
          </span>
        )}
      </div>

      {/* 2. BUSINESS EMAIL (MANDATORY) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label htmlFor={`${formId}_email`} style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
          Business Email <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input
          id={`${formId}_email`}
          type="email"
          required
          disabled={isSubmitting}
          placeholder="name@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (touched.email) validateField('email', e.target.value)
          }}
          onFocus={() => trackFormFieldInteraction('form_quick_contact', 'Quick Contact Form', 'email')}
          onBlur={() => handleBlur('email', email)}
          style={{
            width: '100%',
            minHeight: '44px',
            boxSizing: 'border-box',
            padding: '11px 14px',
            fontSize: '13.5px',
            borderRadius: '10px',
            border: touched.email && fieldErrors.email ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
            background: touched.email && fieldErrors.email ? '#fef2f2' : '#ffffff',
            color: '#0f172a',
            outline: 'none'
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
        <label htmlFor={`${formId}_phone`} style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
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

          <input
            id={`${formId}_phone`}
            type="tel"
            required
            disabled={isSubmitting}
            placeholder="9876543210"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value)
              if (touched.phone) validateField('phone', e.target.value)
            }}
            onFocus={() => trackFormFieldInteraction('form_quick_contact', 'Quick Contact Form', 'phone')}
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
              outline: 'none'
            }}
          />
        </div>
        {touched.phone && fieldErrors.phone && (
          <span style={{ fontSize: '11.5px', color: '#dc2626', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <AlertCircle size={12} /> {fieldErrors.phone}
          </span>
        )}
      </div>

      {/* 4. COMPANY NAME (OPTIONAL) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label htmlFor={`${formId}_company`} style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
            Company / Organization
          </label>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Optional</span>
        </div>
        <input
          id={`${formId}_company`}
          type="text"
          disabled={isSubmitting}
          placeholder="Enter company name (optional)"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          onFocus={() => trackFormFieldInteraction('form_quick_contact', 'Quick Contact Form', 'company')}
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
            outline: 'none'
          }}
        />
      </div>

      {/* 5. ENQUIRY / SERVICE TYPE (OPTIONAL) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label htmlFor={`${formId}_type`} style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
            Enquiry / Practice Interest
          </label>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Optional</span>
        </div>
        <select
          id={`${formId}_type`}
          value={enquiryType}
          disabled={isSubmitting}
          onChange={(e) => setEnquiryType(e.target.value)}
          style={{
            width: '100%',
            minHeight: '44px',
            boxSizing: 'border-box',
            padding: '11px 14px',
            fontSize: '13.5px',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
            color: '#0f172a',
            background: '#ffffff',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          {ENQUIRY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* 6. MESSAGE (OPTIONAL) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label htmlFor={`${formId}_msg`} style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
            Message / Requirements
          </label>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Optional</span>
        </div>
        <textarea
          id={`${formId}_msg`}
          rows={3}
          disabled={isSubmitting}
          placeholder="How can TRUSTGRID.AI assist your organization? (Optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => trackFormFieldInteraction('form_quick_contact', 'Quick Contact Form', 'message')}
          style={{
            width: '100%',
            minHeight: '80px',
            boxSizing: 'border-box',
            padding: '11px 14px',
            fontSize: '13.5px',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            color: '#0f172a',
            outline: 'none',
            resize: 'vertical',
            fontFamily: 'inherit'
          }}
        />
      </div>

      {/* 7. SUBMIT BUTTON */}
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
            <span>Sending Enquiry...</span>
          </>
        ) : (
          <>
            <span>Submit Enquiry</span>
            <Send size={15} />
          </>
        )}
      </button>

      <p style={{ margin: 0, fontSize: '11px', color: '#64748b', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
        <Lock size={12} className="text-slate-400" />
        <span>Strict enterprise confidentiality and NDA protections apply.</span>
      </p>
    </form>
  )
}

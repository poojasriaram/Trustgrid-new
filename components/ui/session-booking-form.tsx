'use client'

import React, { useState, useEffect, useRef, useId } from 'react'
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Mail,
  User,
  Phone,
  Search,
  Check,
  ChevronDown,
  X
} from 'lucide-react'
import { submitTrustGridForm } from '@/lib/form-submission'
import {
  trackFormView,
  trackFormStart,
  trackFormFieldInteraction,
  trackFormValidationError,
  trackFormSubmit
} from '@/lib/analytics'

// Configured direct Google Calendar scheduling link
export const GOOGLE_CALENDAR_SCHEDULING_URL = 'https://calendar.app.google/voXXRkbgVuuft3fz6'

// Dynamically mapped from TrustGrid.AI verified Offerings list
export const OFFERINGS_SERVICES = [
  { id: 'ai-infra', label: 'AI Infrastructure & GPU Ops', groupTag: 'Compute & DC' },
  { id: 'ai-agents', label: 'Agentic Enterprise & Multi-Agent Systems', groupTag: 'Cognitive' },
  { id: 'mes-automation', label: 'MES Automation & Industrial Quality', groupTag: 'Industrial AI' },
  { id: 'supply-chain', label: 'Supply Chain & Logistics Automation', groupTag: 'Operations' },
  { id: 'ai-networking', label: 'AI Networking & Lossless Fabric (RoCEv2 / IB)', groupTag: 'Lossless Fabric' },
  { id: 'ai-security', label: 'AI Cybersecurity & Quantum-Safe Defense (PQC)', groupTag: 'Quantum-Safe' },
  { id: 'trusted-ai', label: 'Trusted AI Engineering & Governance (NIST / EU AI Act)', groupTag: 'Governance' },
  { id: 'ai-value', label: 'AI Value Engineering & FinOps (Lean / TOC)', groupTag: 'Economics' },
  { id: 'llm-rag', label: 'LLM, Fine-Tuning & High-Throughput RAG Systems', groupTag: 'Models' },
  { id: 'turnkey-dbot', label: 'Turnkey DBOT AI Factory Delivery', groupTag: 'Turnkey Suite' }
]

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

// Backwards compatibility export
export const AREAS_OF_INTEREST = OFFERINGS_SERVICES.map(s => s.label)

interface SessionBookingFormProps {
  initialArea?: string
  ctaSource?: string
  compact?: boolean
  className?: string
  onBookingSuccess?: (result: any) => void
}

export function SessionBookingForm({
  initialArea,
  ctaSource = 'session_booking_flow',
  compact = false,
  className = '',
  onBookingSuccess
}: SessionBookingFormProps) {
  const formId = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const countryDropdownRef = useRef<HTMLDivElement>(null)

  // Form Fields State
  const [name, setName] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [requirements, setRequirements] = useState('')

  // UI / Dropdown Search State
  const [serviceSearch, setServiceSearch] = useState('')
  const [isCountryOpen, setIsCountryOpen] = useState(false)
  const [countrySearch, setCountrySearch] = useState('')

  // Validation and Submission State
  const [touched, setTouched] = useState<{ [k: string]: boolean }>({})
  const [fieldErrors, setFieldErrors] = useState<{ [k: string]: string }>({})
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submissionId, setSubmissionId] = useState('')

  // Track initial view
  useEffect(() => {
    trackFormView('form_session_booking', 'Session Booking Form')
  }, [])

  // Auto-select initial area of interest if provided via props
  useEffect(() => {
    if (initialArea) {
      const match = OFFERINGS_SERVICES.find(s =>
        s.id.toLowerCase().includes(initialArea.toLowerCase()) ||
        s.label.toLowerCase().includes(initialArea.toLowerCase()) ||
        initialArea.toLowerCase().includes(s.id.toLowerCase())
      )
      if (match && !selectedServices.includes(match.label)) {
        setSelectedServices([match.label])
      }
    }
  }, [initialArea])

  // Click Outside Handler for country dropdown
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

  // Validate individual field
  const validateField = (field: string, val: any): string => {
    let err = ''
    if (field === 'name') {
      const trimmed = (val || '').trim()
      if (!trimmed) {
        err = 'Please enter your full name.'
      } else if (trimmed.length < 2) {
        err = 'Name must be at least 2 characters.'
      } else if (!/^[a-zA-Z\s\-'.]+$/.test(trimmed)) {
        err = 'Name must only contain letters, spaces, hyphens, or apostrophes.'
      }
    } else if (field === 'email') {
      const trimmed = (val || '').trim()
      if (!trimmed) {
        err = 'Please enter your email address.'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        err = 'Please enter a valid email address.'
      }
    } else if (field === 'phone') {
      const raw = (val || '').replace(/[\s\-\(\)]/g, '')
      if (!raw) {
        err = 'Please enter your phone number.'
      } else if (!/^\d{6,14}$/.test(raw)) {
        err = 'Please enter a valid phone number (6–14 digits).'
      }
    } else if (field === 'services') {
      if (!val || val.length === 0) {
        err = 'Please select at least one service area.'
      }
    }

    setFieldErrors(prev => ({ ...prev, [field]: err }))
    return err
  }

  const handleBlur = (field: string, val: any) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    validateField(field, val)
  }

  const toggleService = (serviceLabel: string) => {
    let next: string[]
    if (selectedServices.includes(serviceLabel)) {
      next = selectedServices.filter(s => s !== serviceLabel)
    } else {
      next = [...selectedServices, serviceLabel]
    }
    setSelectedServices(next)
    setFieldErrors(prev => ({ ...prev, services: '' }))
    if (touched.services) validateField('services', next)
  }

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    setTouched({
      name: true,
      email: true,
      phone: true,
      services: true
    })

    const nameErr = validateField('name', name)
    const emailErr = validateField('email', email)
    const phoneErr = validateField('phone', phone)
    const servicesErr = validateField('services', selectedServices)

    if (nameErr || emailErr || phoneErr || servicesErr) {
      const first = nameErr || emailErr || phoneErr || servicesErr
      setErrorMessage(first)
      trackFormValidationError('form_session_booking', 'Session Booking Form', 'general', first)
      return
    }

    setErrorMessage('')
    setIsSubmitting(true)
    trackFormStart('form_session_booking', 'Session Booking Form', 'submit_click')

    const normalizedPhone = `${countryCode}${phone.replace(/[\s\-\(\)]/g, '')}`

    try {
      const result = await submitTrustGridForm({
        formId: 'form_session_booking_simplified',
        formName: 'AI Architect Consultation Booking',
        form_type: 'CONSULTATION',
        name: name.trim(),
        email: email.trim(),
        phone: normalizedPhone,
        mobile: normalizedPhone,
        requirement: requirements.trim()
          ? `[Services: ${selectedServices.join(', ')}] ${requirements.trim()}`
          : `[Services: ${selectedServices.join(', ')}]`,
        message: requirements.trim() || `Consultation request for ${selectedServices.join(', ')}`,
        subject: `[Architect Consultation] ${name.trim()} (${selectedServices.join(', ')})`,
        selectedSolutions: selectedServices,
        ctaSource
      })

      if (result.success) {
        const id = result.submissionId || `TG-ARCH-${Date.now().toString().slice(-6)}`
        setSubmissionId(id)
        setSubmitted(true)
        trackFormSubmit('form_session_booking', 'Session Booking Form', true, id)
        if (onBookingSuccess) {
          onBookingSuccess(result)
        }
      } else {
        setErrorMessage(result.message || 'Submission failed. Please try again.')
        trackFormSubmit('form_session_booking', 'Session Booking Form', false, undefined, result.message)
      }
    } catch (err: any) {
      console.error('[Session Booking Error]', err)
      setErrorMessage('Network transmission failure. Please retry or contact connect@trustgrid.ai directly.')
      trackFormSubmit('form_session_booking', 'Session Booking Form', false, undefined, err?.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Filtered services based on search input
  const filteredServices = OFFERINGS_SERVICES.filter(s =>
    s.label.toLowerCase().includes(serviceSearch.toLowerCase()) ||
    s.groupTag.toLowerCase().includes(serviceSearch.toLowerCase())
  )

  // Filtered countries based on search input
  const filteredCountries = COUNTRY_CODES.filter(c =>
    c.country.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.code.includes(countrySearch)
  )

  // =========================================================================
  // SUCCESS STATE (WITH 1-CLICK GOOGLE CALENDAR SCHEDULING LINK)
  // =========================================================================
  if (submitted) {
    return (
      <div
        className={`session-booking-success tg-card-interactive ${className}`}
        style={{
          background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)',
          borderRadius: '20px',
          padding: 'clamp(28px, 4vw, 40px)',
          border: '1px solid #86efac',
          boxShadow: '0 10px 30px rgba(22, 101, 52, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#dcfce7',
              color: '#15803d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <CheckCircle2 size={28} />
          </div>
          <div>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              ENQUIRY SUBMITTED • REF #{submissionId}
            </span>
            <h3 style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>
              Thank You, {name.split(' ')[0]}!
            </h3>
          </div>
        </div>

        <p style={{ margin: 0, fontSize: '14px', color: '#334155', lineHeight: 1.55 }}>
          Your details and selected focus areas (<strong>{selectedServices.join(', ')}</strong>) have been received by our principal systems architecture practice.
        </p>

        {/* PROMINENT GOOGLE CALENDAR BOOKING CARD */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '14px',
            border: '1.5px solid #1d5cff',
            padding: '20px',
            boxShadow: '0 4px 16px rgba(29, 92, 255, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#1d5cff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CalendarIcon size={14} />
              <span>STEP 2: LOCK YOUR 45-MINUTE CALENDAR SLOT</span>
            </span>
            <span style={{ fontSize: '11px', background: '#eff6ff', color: '#1d5cff', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
              45-Min Duration
            </span>
          </div>

          <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: 1.45 }}>
            Pick your preferred date and time directly on our live Google Calendar with principal AI architects.
          </p>

          <a
            href={GOOGLE_CALENDAR_SCHEDULING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '13px 22px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #1d5cff 0%, #0d3eb8 100%)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '14px',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(29, 92, 255, 0.35)',
              transition: 'all 0.2s ease'
            }}
          >
            <CalendarIcon size={16} />
            <span>Book 45-Min Slot on Google Calendar</span>
            <ArrowUpRight size={15} />
          </a>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '4px' }}>
          <button
            type="button"
            className="button button-ghost button-sm"
            onClick={() => {
              setSubmitted(false)
              setName('')
              setEmail('')
              setPhone('')
              setSelectedServices([])
              setRequirements('')
              setTouched({})
              setFieldErrors({})
            }}
            style={{ fontSize: '12.5px' }}
          >
            Submit Another Request
          </button>
        </div>
      </div>
    )
  }

  // =========================================================================
  // SIMPLIFIED SINGLE-COLUMN CONSULTATION FORM RENDER
  // =========================================================================
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className={`session-booking-form tg-card-interactive ${className}`}
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: compact ? '20px 16px' : 'clamp(22px, 3.5vw, 36px)',
        border: '1px solid #e2e8f0',
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        overflow: 'visible'
      }}
    >
      {/* FORM HEADING & DESCRIPTION */}
      <div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#eff6ff',
            color: '#1d5cff',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}
        >
          <Sparkles size={13} />
          <span>DIRECT ARCHITECT CONSULTATION</span>
        </div>
        <h3 style={{ margin: '0 0 6px', fontSize: '21px', fontWeight: 800, color: '#0f172a' }}>
          Book a Session with an AI Architect
        </h3>
        <p style={{ margin: 0, fontSize: '13.5px', color: '#64748b', lineHeight: 1.5 }}>
          Schedule a dedicated 45-minute architectural &amp; strategic briefing with TRUSTGRID.AI principal systems engineers. We evaluate your compute economics, multi-agent readiness, lossless networking, and quantum security to outline a tangible roadmap.
        </p>
      </div>

      {/* ERROR BANNER */}
      {errorMessage && (
        <div
          role="alert"
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '10px',
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

      {/* 1. FULL NAME */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label htmlFor={`${formId}_name`} style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
          Full Name <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <div style={{ position: 'relative' }}>
          <input
            id={`${formId}_name`}
            type="text"
            required
            disabled={isSubmitting}
            placeholder="e.g. Dr. Alex Vance"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              if (touched.name) validateField('name', e.target.value)
            }}
            onFocus={() => trackFormFieldInteraction('form_session_booking', 'Session Booking Form', 'name')}
            onBlur={() => handleBlur('name', name)}
            style={{
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box',
              padding: '11px 14px',
              fontSize: '14px',
              borderRadius: '10px',
              border: touched.name && fieldErrors.name ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
              background: touched.name && fieldErrors.name ? '#fef2f2' : '#ffffff',
              color: '#0f172a',
              outline: 'none'
            }}
          />
        </div>
        {touched.name && fieldErrors.name && (
          <span style={{ fontSize: '12px', color: '#dc2626', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <AlertCircle size={12} /> {fieldErrors.name}
          </span>
        )}
      </div>

      {/* 2 & 3. COUNTRY CODE & PHONE NUMBER */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label htmlFor={`${formId}_phone`} style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
          Phone Number <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <div style={{ display: 'flex', gap: '8px', width: '100%', boxSizing: 'border-box' }}>
          {/* Searchable Country Code Dropdown */}
          <div style={{ position: 'relative', width: '130px', flexShrink: 0 }} ref={countryDropdownRef}>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={(e) => {
                e.stopPropagation()
                setIsCountryOpen(prev => !prev)
              }}
              style={{
                width: '100%',
                padding: '11px 10px',
                fontSize: '13.5px',
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
                  width: '240px',
                  maxHeight: '220px',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '10px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                  zIndex: 50,
                  marginTop: '4px',
                  overflowY: 'auto',
                  padding: '6px'
                }}
                onClick={(e) => e.stopPropagation()}
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
                      fontSize: '12.5px',
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
                    <span style={{ color: '#64748b', fontSize: '11.5px' }}>{c.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Numeric Phone Field */}
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
            onFocus={() => trackFormFieldInteraction('form_session_booking', 'Session Booking Form', 'phone')}
            onBlur={() => handleBlur('phone', phone)}
            style={{
              flex: 1,
              width: '100%',
              boxSizing: 'border-box',
              padding: '11px 14px',
              fontSize: '14px',
              borderRadius: '10px',
              border: touched.phone && fieldErrors.phone ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
              background: touched.phone && fieldErrors.phone ? '#fef2f2' : '#ffffff',
              color: '#0f172a',
              outline: 'none'
            }}
          />
        </div>
        {touched.phone && fieldErrors.phone && (
          <span style={{ fontSize: '12px', color: '#dc2626', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <AlertCircle size={12} /> {fieldErrors.phone}
          </span>
        )}
      </div>

      {/* 4. EMAIL ADDRESS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label htmlFor={`${formId}_email`} style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
          Email Address <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input
          id={`${formId}_email`}
          type="email"
          required
          disabled={isSubmitting}
          placeholder="alex@enterprise.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (touched.email) validateField('email', e.target.value)
          }}
          onFocus={() => trackFormFieldInteraction('form_session_booking', 'Session Booking Form', 'email')}
          onBlur={() => handleBlur('email', email)}
          style={{
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
            padding: '11px 14px',
            fontSize: '14px',
            borderRadius: '10px',
            border: touched.email && fieldErrors.email ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
            background: touched.email && fieldErrors.email ? '#fef2f2' : '#ffffff',
            color: '#0f172a',
            outline: 'none'
          }}
        />
        {touched.email && fieldErrors.email && (
          <span style={{ fontSize: '12px', color: '#dc2626', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <AlertCircle size={12} /> {fieldErrors.email}
          </span>
        )}
      </div>

      {/* 5. SERVICES AREA INTERESTED (INLINE MULTI-SELECT CHECKLIST GRID) */}
      <div
        id={`${formId}_services_group`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          background: '#f8fafc',
          border: touched.services && fieldErrors.services ? '1.5px solid #ef4444' : '1px solid #e2e8f0',
          borderRadius: '14px',
          padding: '14px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', display: 'block' }}>
              Services Area Interested <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <span style={{ fontSize: '11.5px', color: '#64748b' }}>
              Select one or more practice areas you want to consult on
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {selectedServices.length > 0 && (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#1d5cff',
                  background: '#eff6ff',
                  padding: '2px 8px',
                  borderRadius: '100px',
                  border: '1px solid #bfdbfe'
                }}
              >
                {selectedServices.length} Selected
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                if (selectedServices.length === OFFERINGS_SERVICES.length) {
                  setSelectedServices([])
                } else {
                  setSelectedServices(OFFERINGS_SERVICES.map(s => s.label))
                  setFieldErrors(prev => ({ ...prev, services: '' }))
                }
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#1d5cff',
                fontSize: '11.5px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '2px 4px',
                textDecoration: 'underline'
              }}
            >
              {selectedServices.length === OFFERINGS_SERVICES.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
        </div>

        {/* Quick Search / Filter Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            padding: '6px 10px'
          }}
        >
          <Search size={14} className="text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search / filter practice areas..."
            value={serviceSearch}
            onChange={(e) => setServiceSearch(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: '12px',
              width: '100%',
              color: '#0f172a'
            }}
          />
          {serviceSearch && (
            <button
              type="button"
              onClick={() => setServiceSearch('')}
              style={{ border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
              aria-label="Clear filter"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Interactive Selection Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '8px',
            maxHeight: '260px',
            overflowY: 'auto',
            paddingRight: '2px',
            marginTop: '2px'
          }}
        >
          {filteredServices.map(service => {
            const isChecked = selectedServices.includes(service.label)
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => toggleService(service.label)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  border: isChecked ? '1.5px solid #1d5cff' : '1px solid #cbd5e1',
                  background: isChecked ? '#eff6ff' : '#ffffff',
                  color: isChecked ? '#1d5cff' : '#1e293b',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: isChecked ? '0 2px 8px rgba(29, 92, 255, 0.12)' : 'none',
                  minHeight: '44px'
                }}
              >
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '5px',
                    border: isChecked ? '1.5px solid #1d5cff' : '1.5px solid #94a3b8',
                    background: isChecked ? '#1d5cff' : '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.15s ease'
                  }}
                >
                  {isChecked && <Check size={12} style={{ color: '#ffffff', strokeWidth: 3 }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '12.5px',
                      fontWeight: isChecked ? 700 : 600,
                      lineHeight: 1.3,
                      whiteSpace: 'normal',
                      wordBreak: 'break-word'
                    }}
                  >
                    {service.label}
                  </div>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '10.5px',
                      color: isChecked ? '#2563eb' : '#64748b',
                      marginTop: '2px'
                    }}
                  >
                    {service.groupTag}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Selected Services Tags summary */}
        {selectedServices.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              paddingTop: '8px',
              borderTop: '1px solid #e2e8f0'
            }}
          >
            {selectedServices.map(s => (
              <span
                key={`badge_${s}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: '#1d5cff',
                  color: '#ffffff',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600
                }}
              >
                <span>{s}</span>
                <button
                  type="button"
                  onClick={() => toggleService(s)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    padding: 0,
                    cursor: 'pointer',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  aria-label={`Remove ${s}`}
                >
                  <X size={11} />
                </button>
              </span>
            ))}
          </div>
        )}

        {touched.services && fieldErrors.services && (
          <span style={{ fontSize: '12px', color: '#dc2626', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <AlertCircle size={13} /> {fieldErrors.services}
          </span>
        )}
      </div>

      {/* 6. KEY SECTOR REQUIREMENTS / COMMENTS (OPTIONAL) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label htmlFor={`${formId}_req`} style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
            Key Sector Requirements / Comments
          </label>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Optional</span>
        </div>
        <textarea
          id={`${formId}_req`}
          rows={3}
          disabled={isSubmitting}
          placeholder="Briefly describe your requirements or comments."
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          onFocus={() => trackFormFieldInteraction('form_session_booking', 'Session Booking Form', 'requirements')}
          style={{
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
            padding: '11px 14px',
            fontSize: '13.5px',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
            color: '#0f172a',
            outline: 'none',
            resize: 'vertical',
            minHeight: '75px',
            fontFamily: 'inherit'
          }}
        />
      </div>

      {/* 7. BOOK A SLOT NOTICE & PRIMARY SUBMIT BUTTON */}
      <div style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div
          style={{
            background: '#f8fafc',
            border: '1px dashed #cbd5e1',
            borderRadius: '10px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#475569' }}>
            <Clock size={14} className="text-blue-600 shrink-0" />
            <span>Dedicated 45-Minute Briefing with AI Architect</span>
          </div>
          <a
            href={GOOGLE_CALENDAR_SCHEDULING_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '12px', color: '#1d5cff', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '3px' }}
          >
            <span>Preview Calendar</span>
            <ArrowUpRight size={12} />
          </a>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="button button-primary tg-btn-shine"
          style={{
            width: '100%',
            padding: '14px 24px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #1d5cff 0%, #0d3eb8 100%)',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '15px',
            border: 'none',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            opacity: isSubmitting ? 0.75 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 6px 20px rgba(29, 92, 255, 0.35)',
            transition: 'all 0.2s ease'
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Submitting Consultation Request...</span>
            </>
          ) : (
            <>
              <CalendarIcon size={17} />
              <span>Submit &amp; Proceed to Calendar Slot Booking</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>

        <p style={{ margin: '4px 0 0', fontSize: '11.5px', color: '#64748b', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Lock size={12} className="text-slate-400" />
          <span>Enterprise Confidentiality Guaranteed under mutual NDA standards.</span>
        </p>
      </div>
    </form>
  )
}

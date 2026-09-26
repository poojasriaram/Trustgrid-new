'use client'

import React, { FormEvent, useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  Send,
  Check,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Cpu,
  Bot,
  ShieldCheck,
  Sparkles,
  Layers,
  Lock,
  Network,
  TrendingUp,
  Building2,
  Users
} from 'lucide-react'
import { solutions, allIndustries } from '@/lib/solutions'
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
  onSuccess?: (submissionId: string) => void
}

const companySizeOptions = [
  '1–50 employees',
  '51–200 employees',
  '201–500 employees',
  '501–1,000 employees',
  '1,000–5,000 employees',
  '5,000+ Enterprise'
]

const aiMaturityOptions = [
  'Exploring AI Opportunity',
  'Active Proof of Concept (POC)',
  'Multiple Pilot Deployments',
  'Production AI Workloads',
  'Enterprise-Scale Autonomous Operations'
]

const challengeOptions = [
  'GPU Infrastructure & Liquid Cooling',
  'Inference Latency & Token Economics',
  'Multi-Agent System Orchestration',
  'Deterministic Guardrails & Safety',
  'EU AI Act / NIST Governance',
  'Lossless InfiniBand / RoCEv2 Fabric',
  'Post-Quantum Cryptography (PQC / CBOM)',
  'AI FinOps & P&L Value Attribution'
]

const timelineOptions = [
  'Immediate (Next 1–2 weeks)',
  'Within 30 Days',
  'Next Quarter (Q1/Q2)',
  'Strategic Planning Phase'
]

const careerRoleOptions = [
  'Principal AI Infrastructure Engineer',
  'Senior Multi-Agent Systems Architect',
  'Post-Quantum Cryptography & Security Lead',
  'AI Governance & Red Teaming Specialist',
  'Distributed GPU Systems Engineer',
  'Frontier AI Research Fellow (Hackathons / R&D)',
  'Enterprise AI Solutions Lead',
  'Other Systems Engineering Role'
]

const partnershipOptions = [
  'Compute & Cloud Infrastructure Provider',
  'Enterprise Systems Integrator (SI)',
  'Academic & Research Fellowship',
  'Hardware / Silicon OEM Vendor',
  'Independent Software Vendor (ISV)',
  'Other Strategic Collaboration'
]

export function TrustGridForm({
  variant = 'diagnostic',
  formId: customFormId,
  formName: customFormName,
  ctaSource = 'page_section',
  defaultSolution,
  defaultIndustry,
  compact = false,
  onSuccess
}: TrustGridFormProps) {
  const formRef = useRef<HTMLFormElement>(null)

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
    'Chatbot Lead Form'
  )

  // Form Fields State
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [designation, setDesignation] = useState('')
  const [industry, setIndustry] = useState(defaultIndustry || '')
  const [companySize, setCompanySize] = useState('')
  const [country, setCountry] = useState('')
  const [aiMaturity, setAiMaturity] = useState('Active Proof of Concept (POC)')
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>(['GPU Infrastructure & Liquid Cooling'])
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>(
    defaultSolution ? [defaultSolution] : ['ai-infra-engineering']
  )
  const [timeline, setTimeline] = useState('Within 30 Days')
  const [roleApplied, setRoleApplied] = useState('Principal AI Infrastructure Engineer')
  const [partnershipType, setPartnershipType] = useState('Compute & Cloud Infrastructure Provider')
  const [portfolio, setPortfolio] = useState('')
  const [resume, setResume] = useState('')
  const [message, setMessage] = useState('')

  // Validation & Touched state
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [refId, setRefId] = useState('')

  const validateField = (fieldName: string, value: string): string => {
    let err = ''
    if (fieldName === 'name') {
      if (!value.trim()) err = 'Full name is required.'
    } else if (fieldName === 'email') {
      if (!value.trim()) {
        err = 'Work email is required.'
      } else if (!validateEmail(value.trim())) {
        err = 'Please provide a valid work email address (e.g. name@company.com).'
      }
    } else if (fieldName === 'phone') {
      if (!value.trim()) {
        err = 'Phone or WhatsApp number is required for callback.'
      } else if (!validatePhone(value.trim())) {
        err = 'Please provide a valid phone number (e.g. +1 555-0123 or +91 9876543210).'
      }
    }
    setFieldErrors((prev) => ({ ...prev, [fieldName]: err }))
    return err
  }

  const handleBlur = (fieldName: string, value: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }))
    validateField(fieldName, value)
  }

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

  const toggleSolution = (slug: string) => {
    handleFieldFocusOrChange('selectedSolutions')
    if (selectedSolutions.includes(slug)) {
      setSelectedSolutions(selectedSolutions.filter((s) => s !== slug))
    } else {
      setSelectedSolutions([...selectedSolutions, slug])
    }
  }

  const toggleChallenge = (ch: string) => {
    handleFieldFocusOrChange('selectedChallenges')
    if (selectedChallenges.includes(ch)) {
      setSelectedChallenges(selectedChallenges.filter((c) => c !== ch))
    } else {
      setSelectedChallenges([...selectedChallenges, ch])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    setErrorMessage('')
    const validationErrors: Record<string, string> = {}

    // EXACTLY 3 MANDATORY FIELDS ACROSS ALL FORMS:
    const nameErr = validateField('name', name)
    const emailErr = validateField('email', email)
    const phoneErr = validateField('phone', phone)

    setTouched({ name: true, email: true, phone: true })

    if (nameErr) validationErrors.name = nameErr
    if (emailErr) validationErrors.email = emailErr
    if (phoneErr) validationErrors.phone = phoneErr

    if (Object.keys(validationErrors).length > 0) {
      const firstErr = Object.values(validationErrors)[0]
      setErrorMessage(firstErr)
      trackFormValidationError(resolvedFormId, resolvedFormName, Object.keys(validationErrors)[0], firstErr)
      return
    }

    setIsSubmitting(true)

    const formType = 
      variant === 'diagnostic' ? 'AI_DIAGNOSTIC' :
      variant === 'strategy_session' ? 'STRATEGY_SESSION' :
      variant === 'contact' ? 'CONTACT' :
      variant === 'proposal' ? 'PROPOSAL' :
      variant === 'career' ? 'CAREER' :
      variant === 'partner' ? 'PARTNER' :
      variant === 'newsletter' ? 'NEWSLETTER' :
      variant === 'workshop' ? 'WORKSHOP' :
      'GENERAL_LEAD'

    const result = await submitTrustGridForm({
      formId: resolvedFormId,
      formName: resolvedFormName,
      form_type: formType,
      name: name.trim() || (variant === 'newsletter' ? 'Subscriber' : 'Enterprise Inquiry'),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim() || 'Enterprise Organization',
      designation: designation.trim() || (variant === 'career' ? roleApplied : 'Executive / Lead'),
      industry: industry || defaultIndustry || 'Cross-Industry',
      companySize,
      country,
      aiMaturity,
      challenges: selectedChallenges,
      preferredTimeline: timeline,
      role: roleApplied,
      partnershipType,
      portfolio,
      resume,
      message: message.trim() || `Inquiry submitted via ${resolvedFormName}`,
      selectedSolutions: selectedSolutions.map(
        (s) => solutions.find((sol) => sol.slug === s)?.shortTitle || s
      ),
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
        <div className="success-badge-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <span className="success-badge" style={{ background: '#dcfce7', color: '#15803d', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', fontSize: '11.5px', letterSpacing: '0.04em' }}>
            CONFIRMED &amp; DISPATCHED
          </span>
          <span className="success-ref" style={{ fontSize: '12px', fontWeight: 600, color: '#1d5cff' }}>
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
            <h3 className="success-title" style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
              {variant === 'strategy_session'
                ? 'Strategy Session Request Confirmed!'
                : 'Thank you. Your request has been received.'}
            </h3>
            <p className="success-lead" style={{ margin: 0, color: '#475569', fontSize: '13.5px', lineHeight: 1.5 }}>
              Reference ID: <strong style={{ color: '#1d5cff' }}>{refId}</strong>. Our senior TRUSTGRID.AI architecture leads will review your specifications and reach out within 24–48 hours to confirm schedule availability.
            </p>
          </div>
        </div>

        <div className="success-actions" style={{ marginTop: '24px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a
            href="https://wa.me/15550192834?text=Hi%20TrustGrid%20team%2C%20following%20up%20on%20my%20submission%20"
            target="_blank"
            rel="noopener noreferrer"
            className="button button-ghost button-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#15803d', borderColor: '#86efac', textDecoration: 'none' }}
          >
            <span>Direct WhatsApp Advisory</span>
            <ArrowUpRight size={14} />
          </a>
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
              hasStartedRef.current = false
            }}
          >
            Submit Another Request
          </button>
        </div>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      className={`interactive-diagnostic-form tg-card-interactive ${compact ? 'form-compact' : ''}`}
      onSubmit={handleSubmit}
      noValidate
    >
      {errorMessage && (
        <div
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#991b1b',
            fontSize: '13px',
            marginBottom: '16px'
          }}
        >
          <AlertCircle size={16} className="shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 1. NEWSLETTER SIMPLE FORM (3 Mandatory Fields) */}
      {variant === 'newsletter' && (
        <div className="contact-inputs-grid">
          <label className="input-group">
            <span>Full Name <strong style={{ color: '#ef4444' }}>*</strong></span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => handleFieldFocusOrChange('name')}
              required
              placeholder="e.g. Alexander Scott"
            />
          </label>
          <label className="input-group">
            <span>Work Email <strong style={{ color: '#ef4444' }}>*</strong></span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => handleFieldFocusOrChange('email')}
              required
              placeholder="e.g. name@enterprise.com"
            />
          </label>
          <label className="input-group">
            <span>Phone / WhatsApp <strong style={{ color: '#ef4444' }}>*</strong></span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onFocus={() => handleFieldFocusOrChange('phone')}
              required
              placeholder="e.g. +1 (555) 012-3456 or +91 98765 43210"
            />
          </label>
          <label className="input-group">
            <span>Company (Optional)</span>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              onFocus={() => handleFieldFocusOrChange('company')}
              placeholder="e.g. Acme Corp"
            />
          </label>
        </div>
      )}

      {/* 2. DIAGNOSTIC / PROPOSAL / WORKSHOP FORM */}
      {(variant === 'diagnostic' || variant === 'proposal' || variant === 'workshop') && (
        <>
          {/* Solution Selector */}
          <div className="form-step-section" style={{ marginBottom: '20px' }}>
            <span className="step-number">STEP 1 • DOMAIN SELECTION (OPTIONAL)</span>
            <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '4px 0 10px' }}>
              Select Engineering Domain(s) (Optional)
            </h4>
            <div className="solution-pills-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
              {solutions.map((sol) => {
                const isSelected = selectedSolutions.includes(sol.slug)
                return (
                  <button
                    type="button"
                    key={sol.slug}
                    className={`solution-pill-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleSolution(sol.slug)}
                    style={{ padding: '8px 10px', fontSize: '12px' }}
                  >
                    <div className="pill-top" style={{ marginBottom: '2px' }}>
                      {isSelected && <Check size={13} className="pill-check ml-auto" />}
                    </div>
                    <span className="pill-title" style={{ fontSize: '12px' }}>{sol.shortTitle}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Optional Profile Parameters */}
          <div className="form-step-section" style={{ marginBottom: '20px' }}>
            <span className="step-number">STEP 2 • WORKLOAD CONTEXT (OPTIONAL)</span>
            <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '4px 0 10px' }}>
              Organization & Workload Profile
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <div className="input-group">
                <span>Industry Sector (Optional)</span>
                <select
                  className="industry-dropdown"
                  value={industry}
                  onChange={(e) => {
                    setIndustry(e.target.value)
                    handleFieldFocusOrChange('industry')
                  }}
                >
                  <option value="">-- Select Industry --</option>
                  {allIndustries.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <span>Company Size (Optional)</span>
                <select
                  className="industry-dropdown"
                  value={companySize}
                  onChange={(e) => {
                    setCompanySize(e.target.value)
                    handleFieldFocusOrChange('companySize')
                  }}
                >
                  <option value="">-- Select Size --</option>
                  {companySizeOptions.map((sz) => (
                    <option key={sz} value={sz}>{sz}</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <span>AI Maturity Stage (Optional)</span>
                <select
                  className="industry-dropdown"
                  value={aiMaturity}
                  onChange={(e) => {
                    setAiMaturity(e.target.value)
                    handleFieldFocusOrChange('aiMaturity')
                  }}
                >
                  {aiMaturityOptions.map((mat) => (
                    <option key={mat} value={mat}>{mat}</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <span>Timeline (Optional)</span>
                <select
                  className="industry-dropdown"
                  value={timeline}
                  onChange={(e) => {
                    setTimeline(e.target.value)
                    handleFieldFocusOrChange('timeline')
                  }}
                >
                  {timelineOptions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 3. CAREER SPECIFIC FIELDS */}
      {variant === 'career' && (
        <div className="form-step-section" style={{ marginBottom: '20px' }}>
          <span className="step-number">ROLE SELECTION (OPTIONAL)</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginTop: '8px' }}>
            <div className="input-group">
              <span>Role Applied For (Optional)</span>
              <select
                className="industry-dropdown"
                value={roleApplied}
                onChange={(e) => {
                  setRoleApplied(e.target.value)
                  handleFieldFocusOrChange('roleApplied')
                }}
              >
                {careerRoleOptions.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <span>GitHub / Portfolio URL (Optional)</span>
              <input
                type="url"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                onFocus={() => handleFieldFocusOrChange('portfolio')}
                placeholder="https://github.com/..."
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. PARTNER SPECIFIC FIELDS */}
      {variant === 'partner' && (
        <div className="form-step-section" style={{ marginBottom: '20px' }}>
          <span className="step-number">PARTNERSHIP SCOPE (OPTIONAL)</span>
          <div className="input-group" style={{ marginTop: '8px' }}>
            <span>Partnership Type (Optional)</span>
            <select
              className="industry-dropdown"
              value={partnershipType}
              onChange={(e) => {
                setPartnershipType(e.target.value)
                handleFieldFocusOrChange('partnershipType')
              }}
            >
              {partnershipOptions.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* 5. CORE CONTACT DETAILS (MANDATORY 3 FIELDS ACROSS ALL FORMS) */}
      {variant !== 'newsletter' && (
        <div className="form-step-section" style={{ marginBottom: '20px' }}>
          {(variant === 'diagnostic' || variant === 'proposal' || variant === 'workshop') && (
            <span className="step-number">STEP 3 • MANDATORY CONTACT INFORMATION</span>
          )}
          <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '4px 0 10px' }}>
            Contact & Executive Details
          </h4>

          <div className="contact-inputs-grid">
            <label className="input-group">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, fontSize: '13px', color: '#1e293b' }}>
                  Full Name <strong style={{ color: '#ef4444' }}>*</strong>
                </span>
                <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#ef4444', background: '#fef2f2', padding: '1px 6px', borderRadius: '4px' }}>
                  Required
                </span>
              </div>
              <input
                type="text"
                value={name}
                disabled={isSubmitting}
                onChange={(e) => {
                  setName(e.target.value)
                  if (touched.name) validateField('name', e.target.value)
                }}
                onBlur={(e) => handleBlur('name', e.target.value)}
                onFocus={() => handleFieldFocusOrChange('name')}
                required
                placeholder="e.g. Dr. Alexander Scott"
                style={{
                  borderColor: touched.name && fieldErrors.name ? '#f87171' : undefined,
                  background: touched.name && fieldErrors.name ? '#fef2f2' : undefined
                }}
              />
              {touched.name && fieldErrors.name && (
                <span style={{ color: '#dc2626', fontSize: '11.5px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertCircle size={12} /> {fieldErrors.name}
                </span>
              )}
            </label>

            <label className="input-group">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, fontSize: '13px', color: '#1e293b' }}>
                  Work Email <strong style={{ color: '#ef4444' }}>*</strong>
                </span>
                <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#ef4444', background: '#fef2f2', padding: '1px 6px', borderRadius: '4px' }}>
                  Required
                </span>
              </div>
              <input
                type="email"
                value={email}
                disabled={isSubmitting}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (touched.email) validateField('email', e.target.value)
                }}
                onBlur={(e) => handleBlur('email', e.target.value)}
                onFocus={() => handleFieldFocusOrChange('email')}
                required
                placeholder="e.g. a.scott@enterprise.com"
                style={{
                  borderColor: touched.email && fieldErrors.email ? '#f87171' : undefined,
                  background: touched.email && fieldErrors.email ? '#fef2f2' : undefined
                }}
              />
              {touched.email && fieldErrors.email && (
                <span style={{ color: '#dc2626', fontSize: '11.5px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertCircle size={12} /> {fieldErrors.email}
                </span>
              )}
            </label>

            <label className="input-group">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, fontSize: '13px', color: '#1e293b' }}>
                  Phone / WhatsApp <strong style={{ color: '#ef4444' }}>*</strong>
                </span>
                <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#ef4444', background: '#fef2f2', padding: '1px 6px', borderRadius: '4px' }}>
                  Required
                </span>
              </div>
              <input
                type="tel"
                value={phone}
                disabled={isSubmitting}
                onChange={(e) => {
                  setPhone(e.target.value)
                  if (touched.phone) validateField('phone', e.target.value)
                }}
                onBlur={(e) => handleBlur('phone', e.target.value)}
                onFocus={() => handleFieldFocusOrChange('phone')}
                required
                placeholder="e.g. +1 (555) 012-3456 or +91 98765 43210"
                style={{
                  borderColor: touched.phone && fieldErrors.phone ? '#f87171' : undefined,
                  background: touched.phone && fieldErrors.phone ? '#fef2f2' : undefined
                }}
              />
              {touched.phone && fieldErrors.phone && (
                <span style={{ color: '#dc2626', fontSize: '11.5px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertCircle size={12} /> {fieldErrors.phone}
                </span>
              )}
            </label>

            <label className="input-group">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, fontSize: '13px', color: '#1e293b' }}>
                  Company
                </span>
                <span style={{ fontSize: '10.5px', color: '#64748b', background: '#f1f5f9', padding: '1px 6px', borderRadius: '4px' }}>
                  Optional
                </span>
              </div>
              <input
                type="text"
                value={company}
                disabled={isSubmitting}
                onChange={(e) => setCompany(e.target.value)}
                onFocus={() => handleFieldFocusOrChange('company')}
                placeholder="e.g. Global Financial Corp"
              />
            </label>

            <label className="input-group">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, fontSize: '13px', color: '#1e293b' }}>
                  Job Role / Designation
                </span>
                <span style={{ fontSize: '10.5px', color: '#64748b', background: '#f1f5f9', padding: '1px 6px', borderRadius: '4px' }}>
                  Optional
                </span>
              </div>
              <input
                type="text"
                value={designation}
                disabled={isSubmitting}
                onChange={(e) => setDesignation(e.target.value)}
                onFocus={() => handleFieldFocusOrChange('designation')}
                placeholder="e.g. CTO / VP of AI Infrastructure"
              />
            </label>

            {variant === 'contact' && (
              <label className="input-group">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, fontSize: '13px', color: '#1e293b' }}>
                    Industry Sector
                  </span>
                  <span style={{ fontSize: '10.5px', color: '#64748b', background: '#f1f5f9', padding: '1px 6px', borderRadius: '4px' }}>
                    Optional
                  </span>
                </div>
                <select
                  className="industry-dropdown"
                  value={industry}
                  disabled={isSubmitting}
                  onChange={(e) => {
                    setIndustry(e.target.value)
                    handleFieldFocusOrChange('industry')
                  }}
                >
                  <option value="">-- Select Industry --</option>
                  {allIndustries.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </label>
            )}

            <label className="input-group md:col-span-2" style={{ gridColumn: '1 / -1' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, fontSize: '13px', color: '#1e293b' }}>
                  Requirements / Workload Context
                </span>
                <span style={{ fontSize: '10.5px', color: '#64748b', background: '#f1f5f9', padding: '1px 6px', borderRadius: '4px' }}>
                  Optional
                </span>
              </div>
              <textarea
                rows={compact ? 2 : 3}
                value={message}
                disabled={isSubmitting}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => handleFieldFocusOrChange('message')}
                placeholder="Describe your current GPU infrastructure, multi-agent deployment, compliance needs, or key objective..."
              />
            </label>
          </div>
        </div>
      )}

      {/* SUBMISSION BUTTON */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="button button-submit-diag tg-btn-shine"
        style={{
          opacity: isSubmitting ? 0.75 : 1,
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          width: '100%',
          marginTop: '8px'
        }}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Processing Request...</span>
          </>
        ) : (
          <>
            <span>
              {variant === 'diagnostic' ? 'Submit AI Diagnostic Request' :
               variant === 'strategy_session' ? 'Confirm Strategy Session Booking' :
               variant === 'career' ? 'Submit Application' :
               variant === 'partner' ? 'Submit Alliance Proposal' :
               variant === 'newsletter' ? 'Subscribe to Whitepapers' :
               'Submit Inquiry to Senior Architect'}
            </span>
            <Send size={16} />
          </>
        )}
      </button>

      <p className="privacy-note" style={{ marginTop: '12px', fontSize: '11px', textAlign: 'center' }}>
        🔒 Enterprise Confidentiality Guaranteed. Disclosures handled under mutual NDA standards.
      </p>
    </form>
  )
}

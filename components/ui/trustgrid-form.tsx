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

  // UI state
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
    setErrorMessage('')
    const validationErrors: Record<string, string> = {}

    // EXACTLY 3 MANDATORY FIELDS ACROSS ALL FORMS:
    if (!name.trim()) {
      validationErrors.name = 'Please provide your full name.'
    }

    if (!email.trim() || !validateEmail(email)) {
      validationErrors.email = 'Please provide a valid work email address.'
    }

    if (!phone.trim()) {
      validationErrors.phone = 'Please provide your phone / WhatsApp number for callback.'
    } else if (!validatePhone(phone)) {
      validationErrors.phone = 'Please provide a valid phone number (e.g. +1 555-0123 or +91 9876543210).'
    }

    if (Object.keys(validationErrors).length > 0) {
      const firstErr = Object.values(validationErrors)[0]
      setErrorMessage(firstErr)
      trackFormValidationError(resolvedFormId, resolvedFormName, Object.keys(validationErrors)[0], firstErr)
      return
    }

    setIsSubmitting(true)

    const formType = 
      variant === 'diagnostic' ? 'AI_DIAGNOSTIC' :
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
      <div className="diagnostic-success-box tg-card-interactive" style={{ padding: 'clamp(24px, 4vw, 36px)' }}>
        <div className="success-badge-row">
          <span className="success-badge">CONFIRMED</span>
          <span className="success-ref">REF: {refId}</span>
        </div>

        <h3 className="success-title">Thank you. Your request has been received.</h3>
        <p className="success-lead">
          Reference ID: <strong>{refId}</strong>. Our senior TRUSTGRID.AI architecture and engineering team will review your specifications and get in touch within 24–48 hours.
        </p>

        <div className="success-actions" style={{ marginTop: '20px' }}>
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
              <span>Full Name <strong style={{ color: '#ef4444' }}>*</strong></span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => handleFieldFocusOrChange('name')}
                required
                placeholder="e.g. Dr. Alexander Scott"
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
                placeholder="e.g. a.scott@enterprise.com"
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
                placeholder="e.g. Global Financial Corp"
              />
            </label>

            <label className="input-group">
              <span>Job Role / Designation (Optional)</span>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                onFocus={() => handleFieldFocusOrChange('designation')}
                placeholder="e.g. CTO / VP of AI Infrastructure"
              />
            </label>

            {variant === 'contact' && (
              <label className="input-group">
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
              </label>
            )}

            <label className="input-group md:col-span-2" style={{ gridColumn: '1 / -1' }}>
              <span>Requirements / Workload Context (Optional)</span>
              <textarea
                rows={compact ? 2 : 3}
                value={message}
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

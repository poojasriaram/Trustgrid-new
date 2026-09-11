'use client'

import { FormEvent, useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowUpRight,
  Check,
  Building2,
  Calendar,
  Layers,
  Sparkles,
  ShieldCheck,
  Cpu,
  Bot,
  Lock,
  Network,
  TrendingUp,
  FileCheck,
  Send,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { solutions, allIndustries } from '@/lib/solutions'
import { submitTrustGridForm, validateEmail } from '@/lib/form-submission'
import { initUtmTracking } from '@/lib/tracking'

const engagementModelOptions = [
  {
    id: 'audit',
    name: 'Architecture & Readiness Audit (2–4 weeks)',
    desc: 'Comprehensive diagnostic of compute, security, agent workflows, and economics with prioritized engineering roadmap.',
  },
  {
    id: 'sprint',
    name: '90-Day Rapid Sprint / Pilot (12 weeks)',
    desc: 'Intensive delivery of 1–3 production capabilities, foundational governance, and measured ROI proof.',
  },
  {
    id: 'full-build',
    name: 'Full Design & Build Engagement (16–32 weeks)',
    desc: 'Turnkey engineering of production AI Factories, multi-agent platforms, and zero-trust networks.',
  },
  {
    id: 'transformation',
    name: 'Enterprise Transformation Program (12–24 months)',
    desc: 'Comprehensive operating model redesign, internal AI delivery factory, and workforce enablement.',
  },
  {
    id: 'managed',
    name: 'Continuous Optimization / Managed Operations (Ongoing)',
    desc: '24/7 management, performance tuning, trust assurance, and continuous value acceleration.',
  },
]

const aiMaturityOptions = [
  'Exploring AI',
  'AI Proof of Concept',
  'Multiple AI Pilots',
  'Production AI',
  'Enterprise AI at Scale'
]

const aiChallengeOptions = [
  'AI Infrastructure',
  'AI Agents',
  'AI Security',
  'AI Governance',
  'AI Networking',
  'AI Cost Optimization',
  'AI Transformation',
  'AI ROI / Value',
  'Data Quality',
  'Other'
]

const companySizeOptions = [
  '1–50 employees',
  '51–200 employees',
  '201–500 employees',
  '501–1,000 employees',
  '1,000–5,000 employees',
  '5,000+ Enterprise'
]

const businessFunctionOptions = [
  'AI Engineering / Systems',
  'IT & Cloud Infrastructure',
  'C-Suite / Executive Leadership',
  'Security, Risk & Compliance',
  'Data Science & Analytics',
  'Operations & Supply Chain',
  'Product & Digital Innovation',
  'Finance & Procurement',
  'Other'
]

const timelineOptions = [
  'Immediate (Next 1–2 weeks)',
  'Within 30 Days',
  'Next Quarter (Q1/Q2)',
  'Strategic Planning Phase'
]

function DiagnosticForm() {
  const searchParams = useSearchParams()
  const initialSolution = searchParams.get('solution') || ''
  const initialModel = searchParams.get('model') || ''

  // 14 Core Fields State
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [company, setCompany] = useState<string>('')
  const [designation, setDesignation] = useState<string>('')
  const [industry, setIndustry] = useState<string>('')
  const [companySize, setCompanySize] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [businessFunction, setBusinessFunction] = useState<string>('')
  const [aiMaturity, setAiMaturity] = useState<string>('AI Proof of Concept')
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>(['AI Infrastructure', 'AI Governance'])
  const [objective, setObjective] = useState<string>('')
  const [preferredTimeline, setPreferredTimeline] = useState<string>('Immediate (Next 1–2 weeks)')
  const [message, setMessage] = useState<string>('')

  // Solution and Engagement Options
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([])
  const [selectedModel, setSelectedModel] = useState<string>('Architecture & Readiness Audit (2–4 weeks)')

  // UI Flow State
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [refId, setRefId] = useState<string>('')

  useEffect(() => {
    initUtmTracking()
  }, [])

  useEffect(() => {
    if (initialSolution) {
      const match = solutions.find(
        (s) => s.slug === initialSolution || (s.aliases && s.aliases.includes(initialSolution))
      )
      if (match && !selectedSolutions.includes(match.slug)) {
        setSelectedSolutions([match.slug])
      }
    }
  }, [initialSolution])

  useEffect(() => {
    if (initialModel) {
      const found = engagementModelOptions.find(o => o.id === initialModel || o.name.toLowerCase().includes(initialModel.toLowerCase()))
      if (found) {
        setSelectedModel(found.name)
      }
    }
  }, [initialModel])

  const toggleSolution = (slug: string) => {
    if (selectedSolutions.includes(slug)) {
      setSelectedSolutions(selectedSolutions.filter((s) => s !== slug))
    } else {
      setSelectedSolutions([...selectedSolutions, slug])
    }
  }

  const toggleChallenge = (ch: string) => {
    if (selectedChallenges.includes(ch)) {
      setSelectedChallenges(selectedChallenges.filter(c => c !== ch))
    } else {
      setSelectedChallenges([...selectedChallenges, ch])
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.')
      return
    }

    if (!email.trim() || !validateEmail(email)) {
      setErrorMessage('Please enter a valid work email address.')
      return
    }

    setIsSubmitting(true)

    const result = await submitTrustGridForm({
      formName: 'AI Diagnostic Form',
      name,
      email,
      phone,
      company: company || 'Enterprise Client',
      designation: designation || 'Executive / AI Leader',
      industry: industry || 'Enterprise Cross-Industry',
      companySize: companySize || 'Unspecified',
      country: country || 'Global',
      businessFunction: businessFunction || 'AI & Engineering',
      aiMaturity: aiMaturity || 'Exploring Enterprise AI',
      challenges: selectedChallenges,
      objective: objective || 'Production AI Assessment & Acceleration',
      preferredTimeline: preferredTimeline || 'Immediate (Next 30 Days)',
      message,
      selectedSolutions: selectedSolutions.length > 0
        ? selectedSolutions.map(s => solutions.find(sol => sol.slug === s)?.shortTitle || s)
        : ['Comprehensive AI Operating Stack Diagnostic'],
      engagementModel: selectedModel || 'Fixed-Scope Technical Diagnostic',
    })

    setIsSubmitting(false)

    if (result.success) {
      setRefId(result.submissionId || `TG-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-0001`)
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setErrorMessage(result.message || 'Unable to submit diagnostic request. Please try again.')
    }
  }

  return (
    <div className="diagnostic-container">
      {submitted ? (
        <div className="diagnostic-success-box">
          <div className="success-badge-row">
            <span className="success-badge">DIAGNOSTIC REQUEST CONFIRMED</span>
            <span className="success-ref">REF: {refId}</span>
          </div>

          <h2 className="success-title">Thank you. Your request has been received successfully.</h2>

          <p className="success-lead">
            Reference ID: <strong>{refId}</strong>. Our senior AI architecture and systems team has received your enterprise diagnostic request for <strong>{company}</strong>. A principal engineer will review your operational context and reach out directly.
          </p>

          <div className="success-summary-card animated-card reveal-up">
            <h4>Diagnostic Scope Summary</h4>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Selected Solution Areas:</span>
                <strong>
                  {selectedSolutions.length > 0
                    ? selectedSolutions
                      .map((s) => solutions.find((sol) => sol.slug === s)?.shortTitle)
                      .filter(Boolean)
                      .join(', ')
                    : 'Comprehensive All-Stack Diagnostic'}
                </strong>
              </div>
              <div className="summary-item">
                <span className="summary-label">Target Industry:</span>
                <strong>{industry || 'Enterprise Cross-Industry'}</strong>
              </div>
              <div className="summary-item">
                <span className="summary-label">AI Maturity Stage:</span>
                <strong>{aiMaturity}</strong>
              </div>
              <div className="summary-item">
                <span className="summary-label">Engagement Format:</span>
                <strong>{selectedModel}</strong>
              </div>
              <div className="summary-item">
                <span className="summary-label">Key Challenge Focus:</span>
                <strong>{selectedChallenges.join(', ') || 'AI Architecture & Optimization'}</strong>
              </div>
              <div className="summary-item">
                <span className="summary-label">Timeline:</span>
                <strong>{preferredTimeline}</strong>
              </div>
            </div>
          </div>

          <div className="success-actions">
            <Link href="/" className="button button-primary">
              <span>Return to TrustGrid Home</span>
              <ArrowUpRight size={17} />
            </Link>
            <a href="mailto:poojasri.trustgrid@gmail.com" className="button button-ghost">
              Direct Engineering Inquiries
            </a>
          </div>
        </div>
      ) : (
        <div className="diagnostic-grid-layout">
          {/* LEFT: INTRO & LIVE SCOPE PREVIEW */}
          <div className="diagnostic-intro-col">
            <div className="diagnostic-badge-wrap">
              <span className="section-label" style={{ color: '#1d5cff' }}>
                TRUSTGRID.AI / ENTERPRISE DIAGNOSTIC
              </span>
              <h1>
                Find the fastest path from AI ambition to <span>operational value.</span>
              </h1>
              <p className="diagnostic-hero-lead">
                Start with a structured, executive-level technical diagnostic. We evaluate your compute economics, multi-agent readiness, governance posture, and quantum security to build a sequenced execution roadmap.
              </p>
            </div>

            <div className="diagnostic-value-points">
              <div className="value-point">
                <div className="value-point-icon">
                  <Check size={16} />
                </div>
                <div>
                  <strong>Deep Systems Engineering</strong>
                  <p>Direct engagement with senior AI infrastructure and multi-agent architects.</p>
                </div>
              </div>
              <div className="value-point">
                <div className="value-point-icon">
                  <Check size={16} />
                </div>
                <div>
                  <strong>Rigorous Financial & Technical Audit</strong>
                  <p>Quantifiable cost-per-token profiling, bottleneck diagnosis, and TCO modeling.</p>
                </div>
              </div>
              <div className="value-point">
                <div className="value-point-icon">
                  <Check size={16} />
                </div>
                <div>
                  <strong>90-Day Execution Roadmap</strong>
                  <p>Prioritized milestones with clear ownership, risk boundaries, and ROI targets.</p>
                </div>
              </div>
            </div>

            {/* LIVE PREVIEW BOX */}
            <div className="live-scope-card animated-card reveal-up">
              <span className="scope-badge">CONFIGURED SCOPE PREVIEW</span>
              <h4>Diagnostic Scope Summary</h4>
              <ul className="scope-list">
                <li>
                  <span>Solutions:</span>
                  <strong>
                    {selectedSolutions.length > 0
                      ? selectedSolutions
                        .map((s) => solutions.find((sol) => sol.slug === s)?.shortTitle)
                        .filter(Boolean)
                        .join(' + ')
                      : 'All 6 Vertical Engineering Domains'}
                  </strong>
                </li>
                <li>
                  <span>Industry:</span>
                  <strong>{industry || 'Select Industry'}</strong>
                </li>
                <li>
                  <span>AI Maturity:</span>
                  <strong>{aiMaturity}</strong>
                </li>
                <li>
                  <span>Format:</span>
                  <strong>{selectedModel.split('(')[0]}</strong>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE DIAGNOSTIC FORM */}
          <div className="diagnostic-form-col">
            <form className="interactive-diagnostic-form" onSubmit={handleSubmit} noValidate>

              {errorMessage && (
                <div style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '6px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#991b1b',
                  fontSize: '13.5px'
                }}>
                  <AlertCircle size={18} style={{ flexShrink: 0 }} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* STEP 1: SOLUTION SELECTION */}
              <div className="form-step-section">
                <div className="step-header">
                  <span className="step-number">STEP 01</span>
                  <h3>Select Solution Area(s)</h3>
                  <p>Choose one or more domains for your diagnostic assessment:</p>
                </div>

                <div className="solution-pills-grid">
                  {solutions.map((sol) => {
                    const isSelected = selectedSolutions.includes(sol.slug)
                    return (
                      <button
                        type="button"
                        key={sol.slug}
                        className={`solution-pill-btn ${isSelected ? 'selected' : ''}`}
                        onClick={() => toggleSolution(sol.slug)}
                      >
                        <div className="pill-top">
                          <span className="pill-num">{sol.number}</span>
                          {isSelected && <Check size={15} className="pill-check" />}
                        </div>
                        <span className="pill-title">{sol.shortTitle}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* STEP 2: INDUSTRY & ORGANIZATION PROFILE */}
              <div className="form-step-section">
                <div className="step-header">
                  <span className="step-number">STEP 02</span>
                  <h3>Organization & Industry Profile</h3>
                  <p>Align the assessment with your industry compliance and scale requirements:</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="input-group">
                    <span>Industry Sector (Optional)</span>
                    <select
                      className="industry-dropdown"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                    >
                      <option value="">-- Select Industry Sector (Optional) --</option>
                      {allIndustries.map((ind) => (
                        <option key={ind} value={ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="input-group">
                    <span>Company Size / Headcount (Optional)</span>
                    <select
                      className="industry-dropdown"
                      value={companySize}
                      onChange={(e) => setCompanySize(e.target.value)}
                    >
                      <option value="">-- Select Organization Size (Optional) --</option>
                      {companySizeOptions.map((sz) => (
                        <option key={sz} value={sz}>{sz}</option>
                      ))}
                    </select>
                  </div>

                  <div className="input-group">
                    <span>Country / Geographic Region (Optional)</span>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g. United States, Singapore, India, UK..."
                    />
                  </div>

                  <div className="input-group">
                    <span>Business Function (Optional)</span>
                    <select
                      className="industry-dropdown"
                      value={businessFunction}
                      onChange={(e) => setBusinessFunction(e.target.value)}
                    >
                      <option value="">-- Select Primary Function (Optional) --</option>
                      {businessFunctionOptions.map((fn) => (
                        <option key={fn} value={fn}>{fn}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* STEP 3: AI MATURITY & CHALLENGES */}
              <div className="form-step-section">
                <div className="step-header">
                  <span className="step-number">STEP 03</span>
                  <h3>Current AI Maturity & Primary Challenges (Optional)</h3>
                  <p>Select your current stage and specific engineering bottlenecks:</p>
                </div>

                <div className="input-group" style={{ marginBottom: '18px' }}>
                  <span>Current AI Maturity Stage (Optional)</span>
                  <div className="solution-pills-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
                    {aiMaturityOptions.map((mat) => {
                      const isSelected = aiMaturity === mat
                      return (
                        <button
                          type="button"
                          key={mat}
                          className={`solution-pill-btn ${isSelected ? 'selected' : ''}`}
                          onClick={() => setAiMaturity(mat)}
                          style={{ padding: '10px 12px' }}
                        >
                          <div className="pill-top">
                            <span style={{ fontSize: '11px', fontWeight: 600 }}>{mat}</span>
                            {isSelected && <Check size={14} className="pill-check" />}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="input-group" style={{ marginBottom: '18px' }}>
                  <span>Primary AI Challenges (Optional - Select all that apply)</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                    {aiChallengeOptions.map((ch) => {
                      const isSelected = selectedChallenges.includes(ch)
                      return (
                        <button
                          type="button"
                          key={ch}
                          className={`solution-pill-btn ${isSelected ? 'selected' : ''}`}
                          onClick={() => toggleChallenge(ch)}
                          style={{ padding: '8px 12px', borderRadius: '4px', fontSize: '12px' }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {isSelected && <Check size={13} className="pill-check" />}
                            <span>{ch}</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="text-fields-grid">
                  <label className="input-group">
                    <span>Business Objective & Target Outcome (Optional)</span>
                    <textarea
                      rows={2}
                      value={objective}
                      onChange={(e) => setObjective(e.target.value)}
                      placeholder="e.g. Slash inference cost by 40%, prepare for EU AI Act compliance, deploy multi-agent fleet..."
                    />
                  </label>
                </div>
              </div>

              {/* STEP 4: ENGAGEMENT MODEL & TIMELINE */}
              <div className="form-step-section">
                <div className="step-header">
                  <span className="step-number">STEP 04</span>
                  <h3>Engagement Format & Timeline (Optional)</h3>
                  <p>Preferred timeline and scope for the technical diagnostic:</p>
                </div>

                <div className="input-group" style={{ marginBottom: '16px' }}>
                  <span>Preferred Engagement Timeline (Optional)</span>
                  <select
                    className="industry-dropdown"
                    value={preferredTimeline}
                    onChange={(e) => setPreferredTimeline(e.target.value)}
                  >
                    {timelineOptions.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="model-options-list">
                  {engagementModelOptions.map((opt) => {
                    const isSelected = selectedModel === opt.name
                    return (
                      <label
                        key={opt.id}
                        className={`model-option-card ${isSelected ? 'selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name="engagementModel"
                          value={opt.name}
                          checked={isSelected}
                          onChange={() => setSelectedModel(opt.name)}
                        />
                        <div className="model-option-content">
                          <strong>{opt.name}</strong>
                          <p>{opt.desc}</p>
                        </div>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* STEP 5: CONTACT & SUBMISSION */}
              <div className="form-step-section">
                <div className="step-header">
                  <span className="step-number">STEP 05</span>
                  <h3>Contact & Executive Information</h3>
                  <p>Where our senior architecture team should send your assessment schedule:</p>
                </div>

                <div className="contact-inputs-grid">
                  <label className="input-group">
                    <span>Full Name *</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="e.g. Sarah Jenkins"
                    />
                  </label>

                  <label className="input-group">
                    <span>Work Email *</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="e.g. s.jenkins@enterprise.com"
                    />
                  </label>

                  <label className="input-group">
                    <span>Phone Number (Optional)</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +1 (555) 019-2834"
                    />
                  </label>

                  <label className="input-group">
                    <span>Company / Organization (Optional)</span>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Global Financial Corp"
                    />
                  </label>

                  <label className="input-group md:col-span-2">
                    <span>Job Title / Role (Optional)</span>
                    <input
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="e.g. Chief Technology Officer / VP of AI Engineering"
                    />
                  </label>

                  <label className="input-group md:col-span-2">
                    <span>Additional Requirements / Message (Optional)</span>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specific GPU clusters, security clearance, or architectural considerations..."
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button button-submit-diag"
                  style={{ opacity: isSubmitting ? 0.75 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer', marginTop: '16px' }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Processing Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit AI Diagnostic Request</span>
                      <Send size={16} />
                    </>
                  )}
                </button>

                <p className="privacy-note">
                  🔒 Enterprise Confidentiality Guaranteed. All technical disclosures are handled under strict NDA standards. TrustGrid does not sell or share data.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default function BookDiagnosticPage() {
  return (
    <main className="page-wrapper">
      <SiteHeader />
      <Suspense
        fallback={
          <div className="loading-state">
            <p>Loading AI Diagnostic Portal...</p>
          </div>
        }
      >
        <DiagnosticForm />
      </Suspense>
      <SiteFooter />
    </main>
  )
}

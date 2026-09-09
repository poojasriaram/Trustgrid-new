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
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { solutions, allIndustries } from '@/lib/solutions'

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

function DiagnosticForm() {
  const searchParams = useSearchParams()
  const initialSolution = searchParams.get('solution') || ''
  const initialModel = searchParams.get('model') || ''

  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([])
  const [selectedIndustry, setSelectedIndustry] = useState<string>('')
  const [selectedModel, setSelectedModel] = useState<string>('')
  const [currentState, setCurrentState] = useState<string>('')
  const [primaryBottleneck, setPrimaryBottleneck] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [company, setCompany] = useState<string>('')
  const [role, setRole] = useState<string>('')
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [refId, setRefId] = useState<string>('')

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
      setSelectedModel(initialModel)
    }
  }, [initialModel])

  const toggleSolution = (slug: string) => {
    if (selectedSolutions.includes(slug)) {
      setSelectedSolutions(selectedSolutions.filter((s) => s !== slug))
    } else {
      setSelectedSolutions([...selectedSolutions, slug])
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const generatedRef = `TG-DIAG-${Math.floor(100000 + Math.random() * 900000)}`
    setRefId(generatedRef)

    const payload = {
      refId: generatedRef,
      name,
      email,
      company,
      role,
      industry: selectedIndustry || 'Enterprise Cross-Industry',
      solutions: selectedSolutions.length > 0
        ? selectedSolutions.map(s => solutions.find(sol => sol.slug === s)?.shortTitle || s)
        : ['Comprehensive AI Diagnostic'],
      engagementModel: selectedModel || 'Architecture & Readiness Audit (2–4 wks)',
      currentState: currentState || 'Not specified',
      primaryBottleneck: primaryBottleneck || 'Not specified',
      sourceUrl: typeof window !== 'undefined' ? window.location.href : 'https://trustgrid.ai/book-ai-diagnostic',
      timestamp: new Date().toISOString()
    }

    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL
    if (scriptUrl) {
      try {
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
      } catch (err) {
        console.warn('Apps Script dispatch notice:', err)
      }
    }

    setIsSubmitting(false)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="diagnostic-container">
      {submitted ? (
        <div className="diagnostic-success-box">
          <div className="success-badge-row">
            <span className="success-badge">DIAGNOSTIC REQUEST CONFIRMED</span>
            <span className="success-ref">REF: {refId}</span>
          </div>

          <h2 className="success-title">Your AI Diagnostic is scheduled.</h2>

          <p className="success-lead">
            Thank you, <strong>{name}</strong>. Our senior AI architecture team has received your diagnostic request for <strong>{company}</strong>. A dedicated principal engineer will review your context and reach out within 24 hours.
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
                <strong>{selectedIndustry || 'Enterprise Cross-Industry'}</strong>
              </div>
              <div className="summary-item">
                <span className="summary-label">Engagement Format:</span>
                <strong>{selectedModel || 'Architecture & Readiness Audit (2–4 wks)'}</strong>
              </div>
              <div className="summary-item">
                <span className="summary-label">Primary Objective:</span>
                <p>{primaryBottleneck || 'End-to-end production AI assessment and value acceleration.'}</p>
              </div>
            </div>
          </div>

          <div className="success-actions">
            <Link href="/" className="button button-primary">
              Return to TrustGrid Home <ArrowUpRight size={17} />
            </Link>
            <a href="mailto:hello@trustgrid.ai" className="button button-ghost">
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
                TRUSTGRID.AI / DIAGNOSTIC ENGAGEMENT
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
              <span className="scope-badge">LIVE SCOPE CONFIGURATOR</span>
              <h4>Configured Diagnostic Scope</h4>
              <ul className="scope-list">
                <li>
                  <span>Solutions:</span>
                  <strong>
                    {selectedSolutions.length > 0
                      ? selectedSolutions
                          .map((s) => solutions.find((sol) => sol.slug === s)?.shortTitle)
                          .filter(Boolean)
                          .join(' + ')
                      : 'None selected (Click below)'}
                  </strong>
                </li>
                <li>
                  <span>Industry:</span>
                  <strong>{selectedIndustry || 'Select industry'}</strong>
                </li>
                <li>
                  <span>Format:</span>
                  <strong>{selectedModel || 'Select engagement format'}</strong>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT: THE INTERACTIVE 5-STEP FORM */}
          <div className="diagnostic-form-col">
            <form className="interactive-diagnostic-form" onSubmit={handleSubmit}>
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

              {/* STEP 2: INDUSTRY SELECTION */}
              <div className="form-step-section">
                <div className="step-header">
                  <span className="step-number">STEP 02</span>
                  <h3>Select Your Industry</h3>
                  <p>Align the assessment with your industry's compliance and operational requirements:</p>
                </div>

                <div className="industry-select-wrap">
                  <select
                    className="industry-dropdown"
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    required
                  >
                    <option value="">-- Choose Industry Sector --</option>
                    {allIndustries.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* STEP 3: DESCRIBE CURRENT STATE */}
              <div className="form-step-section">
                <div className="step-header">
                  <span className="step-number">STEP 03</span>
                  <h3>Describe Current State</h3>
                  <p>Provide brief context on your current AI compute, agent prototypes, and operational objectives:</p>
                </div>

                <div className="text-fields-grid">
                  <label className="input-group">
                    <span>Current AI Footprint & Infrastructure (e.g. Cloud GPUs, on-prem, models in use):</span>
                    <textarea
                      rows={3}
                      value={currentState}
                      onChange={(e) => setCurrentState(e.target.value)}
                      placeholder="e.g. 64x H100 GPUs in hybrid cloud, experimenting with multi-agent customer service, inference bills growing 30% monthly..."
                      required
                    />
                  </label>

                  <label className="input-group">
                    <span>Primary Challenge or Objective (e.g. Cost reduction, EU AI Act compliance, agent orchestration):</span>
                    <textarea
                      rows={3}
                      value={primaryBottleneck}
                      onChange={(e) => setPrimaryBottleneck(e.target.value)}
                      placeholder="e.g. Need to slash inference cost by 40%, prepare for EU AI Act high-risk audit, and deploy a 24/7 finance agent swarm..."
                      required
                    />
                  </label>
                </div>
              </div>

              {/* STEP 4: SELECT ENGAGEMENT MODEL */}
              <div className="form-step-section">
                <div className="step-header">
                  <span className="step-number">STEP 04</span>
                  <h3>Select Engagement Model</h3>
                  <p>Preferred scope and format for the diagnostic collaboration:</p>
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
                          required
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
                  <h3>Organization & Contact Information</h3>
                  <p>Where our principal architects should send the initial assessment schedule:</p>
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
                    <span>Company / Organization *</span>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                      placeholder="e.g. Global Financial Corp"
                    />
                  </label>

                  <label className="input-group">
                    <span>Job Title / Role *</span>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                      placeholder="e.g. VP of AI Engineering / Chief Technology Officer"
                    />
                  </label>
                </div>

                <button type="submit" className="button button-submit-diag">
                  <span>Submit Diagnostic Request</span>
                  <Send size={16} />
                </button>

                <p className="privacy-note">
                  🔒 Confidentiality guaranteed. TrustGrid does not sell or share information. All technical details are handled under strict NDA standards.
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

      {/* FOOTER */}
      <SiteFooter />
    </main>
  )
}

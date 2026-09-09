'use client'

import { FormEvent, useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  Send,
  Building2,
  Handshake,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Cpu,
  Layers,
  ShieldCheck
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { submitTrustGridForm, validateEmail } from '@/lib/form-submission'
import { initUtmTracking } from '@/lib/tracking'

const partnershipTypes = [
  'Compute & Cloud Infrastructure Partner',
  'Enterprise Systems Integrator (SI)',
  'Academic & Research Fellowship',
  'Hardware / OEM Vendor',
  'Independent Software Vendor (ISV)',
  'Other Strategic Collaboration'
]

export default function PartnersPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [designation, setDesignation] = useState('')
  const [partnershipType, setPartnershipType] = useState('Compute & Cloud Infrastructure Partner')
  const [message, setMessage] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [refId, setRefId] = useState('')

  useEffect(() => {
    initUtmTracking()
  }, [])

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

    if (!company.trim()) {
      setErrorMessage('Please enter your company or organization name.')
      return
    }

    setIsSubmitting(true)

    const result = await submitTrustGridForm({
      formName: 'Partnership Inquiry',
      name,
      email,
      phone,
      company,
      designation,
      partnershipType,
      message: message || 'Strategic partnership proposal from partners page.'
    })

    setIsSubmitting(false)

    if (result.success) {
      setRefId(result.submissionId || `TG-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-0001`)
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setErrorMessage(result.message || 'Unable to submit partnership request. Please try again.')
    }
  }

  return (
    <div className="page-shell">
      <SiteHeader />

      <main className="main-content">
        {/* HERO */}
        <section className="about-hero-section">
          <div className="about-hero-bg" />
          <div className="about-hero-content">
            <div className="about-hero-badge">
              <span className="dot" />
              <span>GLOBAL ECOSYSTEM & ALLIANCES</span>
            </div>
            <h1 className="about-hero-title">
              Partner with TrustGrid.AI
            </h1>
            <p className="about-hero-subtitle">
              Join our global network of GPU compute providers, systems integrators, academic research labs, and enterprise technology innovators.
            </p>
          </div>
        </section>

        {/* CONTENT & FORM */}
        <section className="section" style={{ paddingTop: '20px', paddingBottom: '60px' }}>
          <div className="diagnostic-grid-layout">
            <div className="diagnostic-intro-col">
              <div className="diagnostic-badge-wrap">
                <span className="section-label" style={{ color: '#1d5cff' }}>
                  ECOSYSTEM PROGRAM
                </span>
                <h2>Co-Engineering the Frontier AI Economy</h2>
                <p className="diagnostic-hero-lead">
                  We collaborate with hardware designers, hyperscalers, multi-agent frameworks, and enterprise consultants to deploy trusted AI operating systems.
                </p>
              </div>

              <div className="diagnostic-value-points">
                <div className="value-point">
                  <div className="value-point-icon">
                    <Cpu size={16} />
                  </div>
                  <div>
                    <strong>Compute & Hardware Alliances</strong>
                    <p>Benchmarking, token cost optimization, and bare-metal cluster engineering.</p>
                  </div>
                </div>

                <div className="value-point">
                  <div className="value-point-icon">
                    <Layers size={16} />
                  </div>
                  <div>
                    <strong>Systems Integration</strong>
                    <p>Co-delivery of high-risk enterprise AI platforms and compliance audits.</p>
                  </div>
                </div>

                <div className="value-point">
                  <div className="value-point-icon">
                    <Handshake size={16} />
                  </div>
                  <div>
                    <strong>Research & Innovation Labs</strong>
                    <p>Joint hackathons, post-quantum cryptographic safety, and grant fellowships.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="diagnostic-form-col">
              {submitted ? (
                <div className="diagnostic-success-box" style={{ padding: '36px' }}>
                  <div className="success-badge-row">
                    <span className="success-badge">PROPOSAL SUBMITTED</span>
                    <span className="success-ref">REF: {refId}</span>
                  </div>

                  <h2 className="success-title">Thank you. Your request has been received successfully.</h2>
                  <p className="success-lead">
                    Reference ID: <strong>{refId}</strong>. Our strategic partnerships team has received your alliance proposal for <strong>{company}</strong>. We will review your partnership profile and reach out shortly.
                  </p>

                  <div className="success-actions" style={{ marginTop: '24px' }}>
                    <Link href="/" className="button button-primary">
                      <span>Return to TrustGrid Home</span>
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              ) : (
                <form className="interactive-diagnostic-form" onSubmit={handleSubmit} noValidate>
                  <div className="step-header">
                    <span className="step-number">ALLIANCE APPLICATION</span>
                    <h3>Strategic Partnership Inquiry</h3>
                    <p>Provide your organization details and partnership scope:</p>
                  </div>

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

                  <div className="contact-inputs-grid">
                    <label className="input-group">
                      <span>Full Name *</span>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="e.g. Marcus Vance"
                      />
                    </label>

                    <label className="input-group">
                      <span>Work Email *</span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="e.g. m.vance@partnercorp.com"
                      />
                    </label>

                    <label className="input-group">
                      <span>Phone Number</span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +1 (555) 345-6789"
                      />
                    </label>

                    <label className="input-group">
                      <span>Company / Organization *</span>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                        placeholder="e.g. Silicon GPU Systems"
                      />
                    </label>

                    <label className="input-group">
                      <span>Job Title / Designation</span>
                      <input
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        placeholder="e.g. Head of Strategic Partnerships"
                      />
                    </label>

                    <label className="input-group">
                      <span>Partnership Type *</span>
                      <select
                        className="industry-dropdown"
                        value={partnershipType}
                        onChange={(e) => setPartnershipType(e.target.value)}
                      >
                        {partnershipTypes.map((pt) => (
                          <option key={pt} value={pt}>{pt}</option>
                        ))}
                      </select>
                    </label>

                    <label className="input-group md:col-span-2">
                      <span>Partnership Proposal / Overview *</span>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        placeholder="Please describe your technology stack, co-selling goals, or collaborative research objectives..."
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button button-submit-diag"
                    style={{ opacity: isSubmitting ? 0.75 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Submitting Proposal...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Partnership Inquiry</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

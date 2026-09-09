'use client'

import { FormEvent, useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  Send,
  Building2,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { allIndustries } from '@/lib/solutions'
import { submitTrustGridForm, validateEmail } from '@/lib/form-submission'
import { initUtmTracking } from '@/lib/tracking'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [designation, setDesignation] = useState('')
  const [industry, setIndustry] = useState('')
  const [subject, setSubject] = useState('')
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
      setErrorMessage('Please enter your organization name.')
      return
    }

    setIsSubmitting(true)

    const result = await submitTrustGridForm({
      formName: 'Contact Inquiry',
      name,
      email,
      phone,
      company,
      designation,
      industry: industry || 'Cross-Industry',
      subject: subject || 'General Strategic Inquiry',
      message: message || 'General enterprise inquiry from contact page.'
    })

    setIsSubmitting(false)

    if (result.success) {
      setRefId(result.submissionId || `TG-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-0001`)
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setErrorMessage(result.message || 'Unable to process your inquiry. Please try again.')
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
              <span>GLOBAL ENTERPRISE ENGAGEMENT</span>
            </div>
            <h1 className="about-hero-title">
              Connect with TrustGrid.AI Engineering
            </h1>
            <p className="about-hero-subtitle">
              Reach out to our global architecture leads, systems engineers, and strategic advisors across the United States, Singapore, and India R&D labs.
            </p>
          </div>
        </section>

        {/* CONTENT & FORM GRID */}
        <section className="section" style={{ paddingTop: '20px', paddingBottom: '60px' }}>
          <div className="diagnostic-grid-layout">
            {/* LEFT: CONTACT DETAILS */}
            <div className="diagnostic-intro-col">
              <div className="diagnostic-badge-wrap">
                <span className="section-label" style={{ color: '#1d5cff' }}>
                  DIRECT CHANNELS
                </span>
                <h2>Executive Advisory & Engineering Support</h2>
                <p className="diagnostic-hero-lead">
                  We collaborate with Fortune 500 enterprises, government bodies, defense contractors, and frontier startups to deliver dependable AI infrastructure.
                </p>
              </div>

              <div className="diagnostic-value-points">
                <div className="value-point">
                  <div className="value-point-icon">
                    <Mail size={16} />
                  </div>
                  <div>
                    <strong>Direct Email</strong>
                    <p><a href="mailto:poojasri.trustgrid@gmail.com" style={{ color: '#1d5cff' }}>poojasri.trustgrid@gmail.com</a></p>
                  </div>
                </div>

                <div className="value-point">
                  <div className="value-point-icon">
                    <Building2 size={16} />
                  </div>
                  <div>
                    <strong>Executive HQ & Labs</strong>
                    <p>US Systems Architecture • Singapore APAC Office • India R&D Labs</p>
                  </div>
                </div>

                <div className="value-point">
                  <div className="value-point-icon">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <strong>AI Diagnostic Assessments</strong>
                    <p>For structured technical roadmaps and TCO audits, book an AI Diagnostic session.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: FORM */}
            <div className="diagnostic-form-col">
              {submitted ? (
                <div className="diagnostic-success-box" style={{ padding: '36px' }}>
                  <div className="success-badge-row">
                    <span className="success-badge">INQUIRY RECEIVED</span>
                    <span className="success-ref">REF: {refId}</span>
                  </div>

                  <h2 className="success-title">Thank you. Your request has been received successfully.</h2>
                  <p className="success-lead">
                    Reference ID: <strong>{refId}</strong>. Our enterprise relations and architecture team will review your message for <strong>{company}</strong> and get back to you shortly.
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
                    <span className="step-number">GET IN TOUCH</span>
                    <h3>General & Strategic Inquiries</h3>
                    <p>Fill out the details below to connect directly with our engineering team:</p>
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
                        placeholder="e.g. David Sterling"
                      />
                    </label>

                    <label className="input-group">
                      <span>Work Email *</span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="e.g. d.sterling@enterprise.com"
                      />
                    </label>

                    <label className="input-group">
                      <span>Phone Number</span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +1 (555) 012-3456"
                      />
                    </label>

                    <label className="input-group">
                      <span>Company / Organization *</span>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                        placeholder="e.g. Acme Corp"
                      />
                    </label>

                    <label className="input-group">
                      <span>Job Title / Designation</span>
                      <input
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        placeholder="e.g. Director of Infrastructure"
                      />
                    </label>

                    <label className="input-group">
                      <span>Industry Sector</span>
                      <select
                        className="industry-dropdown"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                      >
                        <option value="">-- Select Industry --</option>
                        {allIndustries.map((ind) => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                    </label>

                    <label className="input-group md:col-span-2">
                      <span>Subject / Topic *</span>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        placeholder="e.g. Inference Infrastructure Optimization & Advisory"
                      />
                    </label>

                    <label className="input-group md:col-span-2">
                      <span>Message / Requirements *</span>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        placeholder="Please describe your AI workload, compute requirements, or strategic inquiry..."
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
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
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

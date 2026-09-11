'use client'

import { FormEvent, useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  Send,
  Building2,
  Award,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Cpu,
  Bot,
  ShieldCheck,
  Briefcase
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { submitTrustGridForm, validateEmail } from '@/lib/form-submission'
import { initUtmTracking } from '@/lib/tracking'

const roleOptions = [
  'Principal AI Infrastructure Engineer',
  'Senior Multi-Agent Systems Architect',
  'Post-Quantum Cryptography & Security Lead',
  'AI Governance & Red Teaming Specialist',
  'Distributed GPU Systems Engineer',
  'Frontier AI Research Fellow (Hackathons / R&D)',
  'Enterprise AI Solutions Lead',
  'Other Engineering Role'
]

const experienceOptions = [
  '1–3 years (Early Career / Fellow)',
  '3–6 years (Senior Systems Engineer)',
  '6–10 years (Staff / Principal Architect)',
  '10+ years (Engineering Leader / Director)'
]

export default function CareersPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('Principal AI Infrastructure Engineer')
  const [experience, setExperience] = useState('3–6 years (Senior Systems Engineer)')
  const [linkedIn, setLinkedIn] = useState('')
  const [portfolio, setPortfolio] = useState('')
  const [resume, setResume] = useState('')
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
      setErrorMessage('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)

    const result = await submitTrustGridForm({
      formName: 'Career Application',
      name,
      email,
      phone,
      company: 'Career Applicant',
      designation: role,
      role,
      experience,
      linkedIn,
      portfolio,
      resume,
      message: message || 'Engineering application submitted via TrustGrid careers portal.'
    })

    setIsSubmitting(false)

    if (result.success) {
      setRefId(result.submissionId || `TG-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-0001`)
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setErrorMessage(result.message || 'Unable to submit application. Please try again.')
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
              <span>CAREERS & RESEARCH FELLOWSHIPS</span>
            </div>
            <h1 className="about-hero-title">
              Build the Enterprise AI Operating System
            </h1>
            <p className="about-hero-subtitle">
              Join elite systems engineers, distributed compute researchers, and multi-agent architects solving the hardest challenges in the AGI economy.
            </p>
          </div>
        </section>

        {/* CONTENT & FORM */}
        <section className="section" style={{ paddingTop: '20px', paddingBottom: '60px' }}>
          <div className="diagnostic-grid-layout">
            <div className="diagnostic-intro-col">
              <div className="diagnostic-badge-wrap">
                <span className="section-label" style={{ color: '#1d5cff' }}>
                  ENGINEERING CULTURE
                </span>
                <h2>Zero Compromise on Architectural Rigor</h2>
                <p className="diagnostic-hero-lead">
                  We are looking for builders who thrive at the intersection of bare-metal GPU clusters, deterministic agent swarms, and mathematical governance.
                </p>
              </div>

              <div className="diagnostic-value-points">
                <div className="value-point">
                  <div className="value-point-icon">
                    <Cpu size={16} />
                  </div>
                  <div>
                    <strong>Cutting-Edge Hardware & Clusters</strong>
                    <p>Direct access to H100/B200 clusters and distributed inference testbeds.</p>
                  </div>
                </div>

                <div className="value-point">
                  <div className="value-point-icon">
                    <Award size={16} />
                  </div>
                  <div>
                    <strong>Hackathons & Open Innovation</strong>
                    <p>Regular hackathon series with real enterprise grants and production launches.</p>
                  </div>
                </div>

                <div className="value-point">
                  <div className="value-point-icon">
                    <Briefcase size={16} />
                  </div>
                  <div>
                    <strong>Global High-Impact Teams</strong>
                    <p>Offices in the United States, Singapore, and India R&D laboratories.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="diagnostic-form-col">
              {submitted ? (
                <div className="diagnostic-success-box" style={{ padding: '36px' }}>
                  <div className="success-badge-row">
                    <span className="success-badge">APPLICATION RECEIVED</span>
                    <span className="success-ref">REF: {refId}</span>
                  </div>

                  <h2 className="success-title">Thank you. Your application has been received successfully.</h2>
                  <p className="success-lead">
                    Reference ID: <strong>{refId}</strong>. Our engineering talent team and technical leads will review your background and reach out for initial discussions.
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
                    <span className="step-number">APPLY NOW</span>
                    <h3>Engineering & Fellowship Application</h3>
                    <p>Submit your profile and technical portfolio directly to our engineering leads:</p>
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
                        placeholder="e.g. Liam Zhang"
                      />
                    </label>

                    <label className="input-group">
                      <span>Email Address *</span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="e.g. liam.zhang@email.com"
                      />
                    </label>

                    <label className="input-group">
                      <span>Phone Number (Optional)</span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +1 (555) 234-5678"
                      />
                    </label>

                    <label className="input-group">
                      <span>Role Applied For (Optional)</span>
                      <select
                        className="industry-dropdown"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        {roleOptions.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </label>

                    <label className="input-group">
                      <span>Years of Experience (Optional)</span>
                      <select
                        className="industry-dropdown"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                      >
                        {experienceOptions.map((exp) => (
                          <option key={exp} value={exp}>{exp}</option>
                        ))}
                      </select>
                    </label>

                    <label className="input-group">
                      <span>LinkedIn Profile URL (Optional)</span>
                      <input
                        type="url"
                        value={linkedIn}
                        onChange={(e) => setLinkedIn(e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </label>

                    <label className="input-group">
                      <span>GitHub / Portfolio / Research URL (Optional)</span>
                      <input
                        type="url"
                        value={portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                        placeholder="https://github.com/username or personal site"
                      />
                    </label>

                    <label className="input-group">
                      <span>Resume / CV Document Link (Optional)</span>
                      <input
                        type="url"
                        value={resume}
                        onChange={(e) => setResume(e.target.value)}
                        placeholder="https://drive.google.com/..."
                      />
                    </label>

                    <label className="input-group md:col-span-2">
                      <span>Cover Note / Technical Achievements (Optional)</span>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about the most complex systems problem you have solved or your key AI engineering contributions..."
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
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
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

'use client'

import React, { useState } from 'react'
import {
  Zap,
  X,
  Send,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  User,
  Sparkles
} from 'lucide-react'
import { submitTrustGridForm, validateEmail, validatePhone } from '@/lib/form-submission'

export function FloatingLeadForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [refId, setRefId] = useState('')

  // Form Fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [company, setCompany] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!name.trim()) {
      setErrorMessage('Please enter your name')
      return
    }

    if (!email.trim() || !validateEmail(email)) {
      setErrorMessage('Please enter a valid email address')
      return
    }

    if (!mobile.trim() || !validatePhone(mobile, true)) {
      setErrorMessage('Please enter your mobile number')
      return
    }

    setIsSubmitting(true)

    const result = await submitTrustGridForm({
      formId: 'form_floating_quick_lead',
      formName: 'Quick Inquiry Floating Form',
      form_type: 'FLOATING_LEAD',
      name: name.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      phone: mobile.trim(),
      company: company.trim() || undefined,
      ctaSource: 'floating_quick_cta'
    })

    setIsSubmitting(false)

    if (result.success) {
      setRefId(result.submissionId || 'TG-LEAD')
      setSubmitted(true)
    } else {
      setErrorMessage(result.message || 'Unable to submit request. Please try again.')
    }
  }

  const handleReset = () => {
    setSubmitted(false)
    setName('')
    setEmail('')
    setMobile('')
    setCompany('')
    setErrorMessage('')
    setIsOpen(false)
  }

  return (
    <>
      {/* FLOATING LAUNCHER PILL (Docked Bottom Left to prevent collision with AI Chatbot on Bottom Right) */}
      <div className="floating-lead-container">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="floating-lead-trigger tg-btn-shine"
            aria-label="Quick AI Inquiry"
          >
            <div className="floating-lead-icon-wrap">
              <Zap size={14} className="animate-pulse" />
            </div>
            <span className="floating-lead-label">Quick Inquiry</span>
          </button>
        )}
      </div>

      {/* FLOATING INQUIRY MODAL / BOTTOM SHEET */}
      {isOpen && (
        <div className="floating-lead-backdrop-wrapper">
          <div
            className="floating-lead-backdrop"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            className="floating-lead-modal tg-card-interactive"
            role="dialog"
            aria-modal="true"
            aria-label="Quick Architecture Inquiry"
          >
            {/* HEADER */}
            <div className="floating-lead-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="floating-lead-header-icon">
                  <Zap size={16} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>
                    Quick Architecture Inquiry
                  </h4>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                    Direct Senior Architect Callback
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="floating-lead-close-btn"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* BODY */}
            <div className="floating-lead-modal-body">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '20px 8px' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      background: '#dcfce7',
                      border: '1px solid #86efac',
                      color: '#16a34a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 14px'
                    }}
                  >
                    <CheckCircle2 size={28} />
                  </div>
                  <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>
                    Thank You
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 8px' }}>
                    REF: <strong style={{ color: '#1d5cff' }}>{refId}</strong>
                  </p>
                  <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.5, margin: '0 0 20px' }}>
                    Your request has been submitted successfully. Our team will get back to you soon.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="button button-primary"
                    style={{ width: '100%', minHeight: '44px', fontSize: '14px', fontWeight: 600 }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="floating-lead-form-fields">
                  {errorMessage && (
                    <div
                      style={{
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        color: '#991b1b',
                        fontSize: '12px',
                        fontWeight: 500
                      }}
                    >
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Name <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="floating-lead-input"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Email <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your work email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="floating-lead-input"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Mobile Number <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Enter your mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="floating-lead-input"
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155' }}>
                        Company
                      </label>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>Optional</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter company name (optional)"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="floating-lead-input"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button button-primary floating-lead-submit-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Request</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>

                  <span style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center', marginTop: '4px' }}>
                    🔒 Confidential & Protected under mutual NDA
                  </span>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

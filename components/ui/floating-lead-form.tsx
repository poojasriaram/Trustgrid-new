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

    if (!mobile.trim() || !validatePhone(mobile)) {
      setErrorMessage('Please enter your mobile number')
      return
    }

    if (!company.trim()) {
      setErrorMessage('Please enter your company name')
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
      company: company.trim(),
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
      {/* FLOATING LAUNCHER PILL (Bottom Right Corner) */}
      <div
        className="floating-lead-container"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9998
        }}
      >
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="floating-lead-trigger tg-btn-shine"
            aria-label="Quick AI Inquiry"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              padding: '11px 18px',
              background: 'linear-gradient(135deg, #091a48 0%, #0d2875 100%)',
              color: '#ffffff',
              border: '1px solid rgba(96, 165, 250, 0.35)',
              borderRadius: '999px',
              boxShadow: '0 8px 25px rgba(5, 15, 45, 0.4)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '13px',
              transition: 'all 0.25s ease'
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'rgba(29, 92, 255, 0.4)',
                border: '1px solid #60a5fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#93c5fd'
              }}
            >
              <Zap size={14} className="animate-pulse" />
            </div>
            <span>Quick Inquiry</span>
          </button>
        )}
      </div>

      {/* FLOATING INQUIRY MODAL / CARD */}
      {isOpen && (
        <div
          className="floating-lead-modal tg-card-interactive"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: 'clamp(320px, 90vw, 380px)',
            background: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 25px 60px rgba(7, 20, 61, 0.4)',
            border: '1px solid #cbd5e1',
            overflow: 'hidden',
            zIndex: 99999,
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {/* HEADER */}
          <div
            style={{
              padding: '14px 18px',
              background: 'linear-gradient(135deg, #050d24 0%, #0c2058 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: 'rgba(29, 92, 255, 0.3)',
                  border: '1px solid rgba(96, 165, 250, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#60a5fa'
                }}
              >
                <Zap size={16} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '13.5px', fontWeight: 700, color: '#ffffff' }}>
                  Quick Architecture Inquiry
                </h4>
                <span style={{ fontSize: '10.5px', color: '#94a3b8' }}>
                  Direct Senior Architect Callback
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '4px'
              }}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* BODY */}
          <div style={{ padding: '16px 18px', background: '#ffffff' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '16px 8px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: '#dcfce7',
                    border: '1px solid #86efac',
                    color: '#16a34a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px'
                  }}
                >
                  <CheckCircle2 size={24} />
                </div>
                <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>
                  Thank You
                </h4>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px' }}>
                  REF: <strong style={{ color: '#1d5cff' }}>{refId}</strong>
                </p>
                <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.4, margin: '0 0 16px' }}>
                  Your request has been submitted successfully. Our team will get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="button button-primary button-sm"
                  style={{ width: '100%', fontSize: '12px' }}
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {errorMessage && (
                  <div
                    style={{
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      borderRadius: '6px',
                      padding: '6px 10px',
                      color: '#991b1b',
                      fontSize: '11.5px',
                      fontWeight: 500
                    }}
                  >
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '3px' }}>
                    Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      fontSize: '12.5px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      outline: 'none',
                      color: '#0f172a'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '3px' }}>
                    Email <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      fontSize: '12.5px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      outline: 'none',
                      color: '#0f172a'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '3px' }}>
                    Mobile Number <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      fontSize: '12.5px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      outline: 'none',
                      color: '#0f172a'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '3px' }}>
                    Company <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your company name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      fontSize: '12.5px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      outline: 'none',
                      color: '#0f172a'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button button-primary"
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '13px',
                    fontWeight: 600,
                    marginTop: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    borderRadius: '8px'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <Send size={13} />
                    </>
                  )}
                </button>

                <span style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'center', marginTop: '2px' }}>
                  🔒 Confidential & Protected under mutual NDA
                </span>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}

'use client'

import React, { useState, useRef } from 'react'
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowUpRight,
  MessageSquare,
  Mail
} from 'lucide-react'
import {
  submitTrustGridForm,
  validateEmail,
  validatePhone
} from '@/lib/form-submission'
import { isValidName } from '@/lib/validation'
import {
  trackFormStart,
  trackFormFieldInteraction,
  trackFormValidationError,
  trackFormSubmit
} from '@/lib/analytics'

export const ENQUIRY_TYPES = [
  'General Business Enquiry',
  'AI Infrastructure & GPU Cluster Engineering',
  'Agentic Enterprise & Multi-Agent Systems',
  'MES Automation & Industrial Quality',
  'Supply Chain & Logistics Automation',
  'AI Networking & Lossless Fabric (RoCEv2 / IB)',
  'AI Cybersecurity & Quantum-Safe Defense (PQC)',
  'Trusted AI Engineering & Governance (NIST / EU AI Act)',
  'AI Value Engineering & FinOps (Lean / TOC)',
  'LLM, Fine-Tuning & High-Throughput RAG Systems',
  'Turnkey DBOT AI Factory Delivery',
  'Partnership & Ecosystem Alliance',
  'Career & Research Fellowship'
] as const

interface QuickContactFormProps {
  ctaSource?: string
  className?: string
  onSuccess?: (submissionId: string) => void
}

export function QuickContactForm({
  ctaSource = 'contact_page_above_fold',
  className = '',
  onSuccess
}: QuickContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null)

  // Fields matching the exact user specification
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [company, setCompany] = useState('')

  // State
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [refId, setRefId] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    setErrorMessage('')

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedMobile = mobile.trim()
    const trimmedCompany = company.trim()

    if (!trimmedName) {
      setErrorMessage('Please enter your name')
      trackFormValidationError('form_quick_contact', 'Contact Us Form', 'name', 'Please enter your name')
      return
    }

    if (!isValidName(trimmedName)) {
      setErrorMessage('Please enter a valid name (at least 2 characters)')
      trackFormValidationError('form_quick_contact', 'Contact Us Form', 'name', 'Invalid name')
      return
    }

    if (!trimmedEmail) {
      setErrorMessage('Please enter your email')
      trackFormValidationError('form_quick_contact', 'Contact Us Form', 'email', 'Please enter your email')
      return
    }

    if (!validateEmail(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address')
      trackFormValidationError('form_quick_contact', 'Contact Us Form', 'email', 'Invalid email')
      return
    }

    if (!trimmedMobile) {
      setErrorMessage('Please enter your mobile number')
      trackFormValidationError('form_quick_contact', 'Contact Us Form', 'mobile', 'Please enter your mobile number')
      return
    }

    if (!validatePhone(trimmedMobile, true)) {
      setErrorMessage('Please enter a valid mobile number (7–16 digits)')
      trackFormValidationError('form_quick_contact', 'Contact Us Form', 'mobile', 'Invalid phone')
      return
    }

    setIsSubmitting(true)
    trackFormStart('form_quick_contact', 'Contact Us Form', 'submit_click')

    try {
      const result = await submitTrustGridForm({
        formId: 'form_quick_contact',
        formName: 'Contact Us Form',
        form_type: 'CONTACT',
        name: trimmedName,
        email: trimmedEmail,
        mobile: trimmedMobile,
        phone: trimmedMobile,
        company: trimmedCompany || undefined,
        currentPreviousCompany: trimmedCompany || undefined,
        requirement: trimmedCompany ? `Contact inquiry from ${trimmedCompany}` : `Contact inquiry from ${trimmedName}`,
        subject: `[TG Contact] Inquiry — ${trimmedCompany || trimmedName}`,
        ctaSource
      })

      if (result.success) {
        const genId = result.submissionId || `TG-MSG-${Date.now().toString().slice(-6)}`
        setRefId(genId)
        setSubmitted(true)
        trackFormSubmit('form_quick_contact', 'Contact Us Form', true, genId)
        if (onSuccess) onSuccess(genId)
      } else {
        setErrorMessage(result.message || 'Unable to deliver message. Please try again.')
        trackFormSubmit('form_quick_contact', 'Contact Us Form', false, undefined, result.message)
      }
    } catch (err: any) {
      console.error('[Quick Contact Submission Error]', err)
      setErrorMessage('Network transmission failure. Please retry or contact connect@trustgrid.ai directly.')
      trackFormSubmit('form_quick_contact', 'Contact Us Form', false, undefined, err?.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // =========================================================================
  // SUCCESS STATE
  // =========================================================================
  if (submitted) {
    return (
      <div
        className={`quick-contact-success-box tg-card-interactive ${className}`}
        style={{
          background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)',
          border: '1px solid #86efac',
          borderRadius: '16px',
          padding: 'clamp(24px, 4vw, 36px)',
          boxShadow: '0 10px 30px rgba(22, 163, 74, 0.08)',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ background: '#dcfce7', color: '#15803d', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', fontSize: '11.5px', letterSpacing: '0.04em' }}>
            MESSAGE DELIVERED
          </span>
          <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#1d5cff' }}>
            REF: {refId}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
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
            <CheckCircle2 size={22} />
          </div>
          <div>
            <h3 style={{ margin: '0 0 6px', fontSize: '19px', fontWeight: 700, color: '#0f172a' }}>
              Thank You for Reaching Out
            </h3>
            <p style={{ margin: 0, color: '#475569', fontSize: '14px', lineHeight: 1.5 }}>
              Your inquiry has been routed to our global executive &amp; systems engineering leads. You will receive a direct technical response within <strong>24–48 business hours</strong>.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="button button-ghost button-sm"
            onClick={() => {
              setSubmitted(false)
              setName('')
              setEmail('')
              setMobile('')
              setCompany('')
            }}
            style={{ fontSize: '12.5px', padding: '8px 14px' }}
          >
            Send Another Message
          </button>
          <a
            href="https://wa.me/15550192834?text=Hi%20TrustGrid%20team%2C%20following%20up%20on%20my%20enquiry"
            target="_blank"
            rel="noopener noreferrer"
            className="button button-ghost button-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#15803d', borderColor: '#86efac', textDecoration: 'none', fontSize: '12.5px', padding: '8px 14px' }}
          >
            <span>Chat on WhatsApp</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    )
  }

  // =========================================================================
  // FORM RENDER - EXACT SPECIFICATION FROM USER
  // =========================================================================
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className={`quick-contact-form tg-card-interactive ${className}`}
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: 'clamp(20px, 3vw, 28px)',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
        maxWidth: '460px',
        boxSizing: 'border-box'
      }}
    >
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#eff6ff', color: '#1d5cff', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '6px' }}>
          <Mail size={12} />
          <span>GET IN TOUCH</span>
        </div>
        <h3 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>
          Connect with Our Solutions Team
        </h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: 1.4 }}>
          Share your details below and an enterprise solution specialist will reach out to you within 24 hours.
        </p>
      </div>

      {/* ERROR BANNER */}
      {errorMessage && (
        <div
          role="alert"
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#b91c1c',
            fontSize: '12.5px',
            fontWeight: 500
          }}
        >
          <AlertCircle size={15} className="shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 1. NAME (MANDATORY) */}
      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '3px' }}>
          Name <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input
          type="text"
          required
          disabled={isSubmitting}
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => trackFormFieldInteraction('form_quick_contact', 'Contact Us Form', 'name')}
          style={{
            width: '100%',
            padding: '8px 10px',
            fontSize: '12.5px',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            outline: 'none',
            color: '#0f172a',
            background: '#ffffff',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* 2. EMAIL (MANDATORY) */}
      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '3px' }}>
          Email <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input
          type="email"
          required
          disabled={isSubmitting}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => trackFormFieldInteraction('form_quick_contact', 'Contact Us Form', 'email')}
          style={{
            width: '100%',
            padding: '8px 10px',
            fontSize: '12.5px',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            outline: 'none',
            color: '#0f172a',
            background: '#ffffff',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* 3. MOBILE NUMBER (MANDATORY) */}
      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '3px' }}>
          Mobile Number <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input
          type="tel"
          required
          disabled={isSubmitting}
          placeholder="Enter your mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          onFocus={() => trackFormFieldInteraction('form_quick_contact', 'Contact Us Form', 'mobile')}
          style={{
            width: '100%',
            padding: '8px 10px',
            fontSize: '12.5px',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            outline: 'none',
            color: '#0f172a',
            background: '#ffffff',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* 4. COMPANY (OPTIONAL) */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
          <label style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>
            Company
          </label>
          <span style={{ fontSize: '10px', color: '#94a3b8' }}>Optional</span>
        </div>
        <input
          type="text"
          disabled={isSubmitting}
          placeholder="Enter company name (optional)"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          onFocus={() => trackFormFieldInteraction('form_quick_contact', 'Contact Us Form', 'company')}
          style={{
            width: '100%',
            padding: '8px 10px',
            fontSize: '12.5px',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            outline: 'none',
            color: '#0f172a',
            background: '#ffffff',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* 5. SUBMIT REQUEST BUTTON */}
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
          borderRadius: '8px',
          cursor: isSubmitting ? 'not-allowed' : 'pointer'
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

      {/* 6. NDA GUARANTEE */}
      <span style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'center', marginTop: '2px' }}>
        🔒 Confidential &amp; Protected under mutual NDA
      </span>
    </form>
  )
}

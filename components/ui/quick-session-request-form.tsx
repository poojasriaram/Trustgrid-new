'use client'

import React, { useState, useRef } from 'react'
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  Clock,
  Zap,
  Building2,
  User,
  Mail,
  Phone,
  ArrowRight,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Check,
  ChevronDown
} from 'lucide-react'
import Link from 'next/link'
import { submitTrustGridForm } from '@/lib/form-submission'
import { isValidEmail } from '@/lib/validation'
import {
  trackFormView,
  trackFormStart,
  trackFormFieldInteraction,
  trackFormValidationError,
  trackFormSubmit
} from '@/lib/analytics'
import { COUNTRY_CODES, GOOGLE_CALENDAR_SCHEDULING_URL } from '@/components/ui/session-booking-form'

export const QUICK_SESSION_TOPICS = [
  'GPU Cluster Optimization & 20% Performance Gain',
  'Autonomous Multi-Agent Systems & Swarm Orchestration',
  'AI Networking & Lossless Fabric (RoCEv2 / InfiniBand)',
  'Quantum-Safe Cybersecurity & Post-Quantum Cryptography',
  'Enterprise AI Diagnostic & Architecture Review',
  'AI FinOps & Token Economics Optimization',
  'Turnkey DBOT AI Factory Delivery',
  'General Enterprise AI Consultation'
] as const

export const CALLBACK_TIMEFRAMES = [
  'Immediate Priority (Within 2 Hours)',
  'Today Afternoon / Evening',
  'Tomorrow Morning',
  'This Week (Schedule Calendar Slot)'
] as const

interface QuickSessionRequestFormProps {
  sourceChannel?: string
  defaultTopic?: string
  className?: string
}

export function QuickSessionRequestForm({
  sourceChannel = 'quick_session_dedicated_page',
  defaultTopic,
  className = ''
}: QuickSessionRequestFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [mobile, setMobile] = useState('')
  const [company, setCompany] = useState('')
  const [topic, setTopic] = useState(defaultTopic || QUICK_SESSION_TOPICS[0])
  const [timeframe, setTimeframe] = useState<string>(CALLBACK_TIMEFRAMES[0])
  const [notes, setNotes] = useState('')
  const [sendCalendarInvite, setSendCalendarInvite] = useState(true)

  const [hasStarted, setHasStarted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submissionId, setSubmissionId] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const formRef = useRef<HTMLFormElement>(null)

  const handleFirstInteraction = (fieldName: string) => {
    if (!hasStarted) {
      setHasStarted(true)
      trackFormStart('quick_session_request_form', 'Quick Session Request Form', fieldName)
    }
    trackFormFieldInteraction('quick_session_request_form', 'Quick Session Request Form', fieldName)
  }

  const validate = (): boolean => {
    const errors: Record<string, string> = {}

    if (!name.trim()) {
      errors.name = 'Full name is required'
    } else if (name.trim().length < 2) {
      errors.name = 'Please provide a valid name'
    }

    if (!email.trim()) {
      errors.email = 'Work email is required'
    } else if (!isValidEmail(email.trim())) {
      errors.email = 'Please provide a valid business email address'
    }

    const cleanMobile = mobile.replace(/[^0-9]/g, '')
    if (!cleanMobile) {
      errors.mobile = 'Mobile or WhatsApp number is required'
    } else if (cleanMobile.length < 7 || cleanMobile.length > 15) {
      errors.mobile = 'Please enter a valid phone number (7-15 digits)'
    }

    if (!company.trim()) {
      errors.company = 'Company name is required'
    }

    setFieldErrors(errors)

    if (Object.keys(errors).length > 0) {
      const firstField = Object.keys(errors)[0]
      trackFormValidationError('quick_session_request_form', 'Quick Session Request Form', firstField, errors[firstField])
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!validate()) return

    setSubmitting(true)
    const fullPhoneNumber = `${countryCode} ${mobile.trim()}`

    try {
      const result = await submitTrustGridForm({
        formName: 'Quick Session Request Form',
        form_type: 'QUICK_SESSION_REQUEST',
        name: name.trim(),
        email: email.trim(),
        phone: fullPhoneNumber,
        mobile: fullPhoneNumber,
        company: company.trim(),
        requirement: `[Quick Session Request] Topic: ${topic} | Preferred Callback: ${timeframe} | Send Calendar Invite: ${sendCalendarInvite ? 'Yes' : 'No'} | Brief Notes: ${notes.trim() || 'None provided'}`,
        objective: topic,
        preferredTimeline: timeframe,
        subject: `Quick Session Request: ${name.trim()} (${company.trim()})`,
        ctaSource: sourceChannel
      })

      if (result.success) {
        setSubmitted(true)
        setSubmissionId(result.submissionId || `QS_${Date.now()}`)
        trackFormSubmit('quick_session_request_form', 'Quick Session Request Form', true, result.submissionId)
      } else {
        setErrorMessage(result.message || 'Unable to submit request. Please try again or WhatsApp us directly.')
        trackFormSubmit('quick_session_request_form', 'Quick Session Request Form', false, undefined, result.message)
      }
    } catch (err: any) {
      console.error('[QuickSessionForm Error]', err)
      setErrorMessage('A network error occurred. Please try again or contact us directly on WhatsApp.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div
        className="quick-session-success-box"
        style={{
          background: 'linear-gradient(135deg, #09142e 0%, #0f2452 100%)',
          borderRadius: '16px',
          padding: '36px 32px',
          color: '#ffffff',
          boxShadow: '0 20px 40px rgba(9, 20, 46, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(34, 197, 94, 0.15)',
            border: '2px solid #22c55e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}
        >
          <CheckCircle2 size={34} color="#22c55e" />
        </div>

        <span
          style={{
            display: 'inline-block',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#60a5fa',
            marginBottom: '8px'
          }}
        >
          SESSION REQUEST CONFIRMED &bull; REF #{submissionId.slice(-8)}
        </span>

        <h3 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 12px', color: '#ffffff' }}>
          We&apos;re Preparing Your Engineering Session
        </h3>

        <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: 1.6, maxWidth: '520px', margin: '0 auto 24px' }}>
          Thank you, <strong style={{ color: '#ffffff' }}>{name}</strong>. Our enterprise systems engineering lead will review your requirement regarding <strong style={{ color: '#93c5fd' }}>{topic}</strong> and connect with you within <strong style={{ color: '#ffffff' }}>{timeframe}</strong>.
        </p>

        {/* IMMEDIATE NEXT ACTIONS */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '24px',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Sparkles size={16} color="#60a5fa" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
              Want to lock your time slot immediately on our calendar?
            </span>
          </div>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 14px', lineHeight: 1.5 }}>
            You can bypass queue wait-time and select an exact 45-minute slot on our principal architect&apos;s Google Calendar right now.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <a
              href={GOOGLE_CALENDAR_SCHEDULING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                background: '#1d5cff',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 600
              }}
            >
              <Calendar size={15} />
              <span>Select Exact Google Calendar Slot</span>
              <ArrowRight size={14} />
            </a>

            <Link
              href={`/whatsapp?source=quick_session_success&topic=${encodeURIComponent(topic)}`}
              className="button button-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                background: 'rgba(34, 197, 94, 0.2)',
                color: '#4ade80',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 600
              }}
            >
              <MessageSquare size={15} />
              <span>Connect on WhatsApp Now</span>
            </Link>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setSubmitted(false)
            setName('')
            setEmail('')
            setMobile('')
            setCompany('')
            setNotes('')
          }}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            fontSize: '13px',
            textDecoration: 'underline',
            cursor: 'pointer'
          }}
        >
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <div
      className={`quick-session-form-container ${className}`}
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        padding: '32px 28px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)'
      }}
    >
      <div style={{ marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#1d5cff',
              background: '#eff6ff',
              padding: '3px 8px',
              borderRadius: '6px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Zap size={12} />
            30-Second Fast-Track Request
          </span>
          <span
            style={{
              fontSize: '11px',
              color: '#16a34a',
              background: '#f0fdf4',
              padding: '3px 8px',
              borderRadius: '6px',
              fontWeight: 600
            }}
          >
            Direct Systems Architect Access
          </span>
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#09142e', margin: '0 0 6px' }}>
          Request an Executive AI Engineering Session
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
          Fill in your details below. A principal architect will review your technical scope and contact you within your chosen timeframe.
        </p>
      </div>

      {errorMessage && (
        <div
          style={{
            marginBottom: '18px',
            padding: '12px 14px',
            borderRadius: '8px',
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#b91c1c',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <AlertCircle size={16} />
          <span>{errorMessage}</span>
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} noValidate>
        {/* ROW 1: NAME & WORK EMAIL */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
              Full Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <User size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Dr. / Mr. / Ms. Full Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (fieldErrors.name) setFieldErrors(prev => ({ ...prev, name: '' }))
                }}
                onFocus={() => handleFirstInteraction('name')}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 36px',
                  borderRadius: '8px',
                  border: `1px solid ${fieldErrors.name ? '#ef4444' : '#cbd5e1'}`,
                  fontSize: '14px',
                  color: '#0f172a',
                  outline: 'none',
                  background: '#f8fafc'
                }}
              />
            </div>
            {fieldErrors.name && (
              <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block' }}>
                {fieldErrors.name}
              </span>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
              Work Email <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: '' }))
                }}
                onFocus={() => handleFirstInteraction('email')}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 36px',
                  borderRadius: '8px',
                  border: `1px solid ${fieldErrors.email ? '#ef4444' : '#cbd5e1'}`,
                  fontSize: '14px',
                  color: '#0f172a',
                  outline: 'none',
                  background: '#f8fafc'
                }}
              />
            </div>
            {fieldErrors.email && (
              <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block' }}>
                {fieldErrors.email}
              </span>
            )}
          </div>
        </div>

        {/* ROW 2: PHONE / WHATSAPP & COMPANY */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
              Mobile / WhatsApp Number <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <div style={{ display: 'flex', gap: '6px' }}>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                style={{
                  padding: '10px 8px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#f8fafc',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#0f172a',
                  outline: 'none',
                  width: '90px'
                }}
              >
                {COUNTRY_CODES.slice(0, 15).map(c => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>

              <div style={{ position: 'relative', flex: 1 }}>
                <Phone size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="tel"
                  placeholder="95130 88612"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value)
                    if (fieldErrors.mobile) setFieldErrors(prev => ({ ...prev, mobile: '' }))
                  }}
                  onFocus={() => handleFirstInteraction('mobile')}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    borderRadius: '8px',
                    border: `1px solid ${fieldErrors.mobile ? '#ef4444' : '#cbd5e1'}`,
                    fontSize: '14px',
                    color: '#0f172a',
                    outline: 'none',
                    background: '#f8fafc'
                  }}
                />
              </div>
            </div>
            {fieldErrors.mobile && (
              <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block' }}>
                {fieldErrors.mobile}
              </span>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
              Company / Organization <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <Building2 size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Enterprise or Data Center Name"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value)
                  if (fieldErrors.company) setFieldErrors(prev => ({ ...prev, company: '' }))
                }}
                onFocus={() => handleFirstInteraction('company')}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 36px',
                  borderRadius: '8px',
                  border: `1px solid ${fieldErrors.company ? '#ef4444' : '#cbd5e1'}`,
                  fontSize: '14px',
                  color: '#0f172a',
                  outline: 'none',
                  background: '#f8fafc'
                }}
              />
            </div>
            {fieldErrors.company && (
              <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block' }}>
                {fieldErrors.company}
              </span>
            )}
          </div>
        </div>

        {/* ROW 3: TOPIC SELECTION */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
            Primary Architecture Focus / Topic
          </label>
          <div style={{ position: 'relative' }}>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onFocus={() => handleFirstInteraction('topic')}
              style={{
                width: '100%',
                padding: '10px 36px 10px 14px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '14px',
                color: '#0f172a',
                outline: 'none',
                background: '#f8fafc',
                appearance: 'none'
              }}
            >
              {QUICK_SESSION_TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748b' }} />
          </div>
        </div>

        {/* ROW 4: CALLBACK TIMEFRAME */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
            Preferred Callback Window
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
            {CALLBACK_TIMEFRAMES.map((tf) => (
              <button
                type="button"
                key={tf}
                onClick={() => setTimeframe(tf)}
                style={{
                  padding: '9px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  textAlign: 'left',
                  cursor: 'pointer',
                  border: timeframe === tf ? '2px solid #1d5cff' : '1px solid #e2e8f0',
                  background: timeframe === tf ? '#eff6ff' : '#f8fafc',
                  color: timeframe === tf ? '#1d5cff' : '#475569',
                  transition: 'all 0.15s ease'
                }}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* OPTIONAL NOTES */}
        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
            Brief Scope / Current Challenge <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 400 }}>(Optional)</span>
          </label>
          <textarea
            placeholder="e.g., Need to audit 64x H100 cluster utilization, evaluate vLLM vs SGLang serving, or design multi-agent workflows."
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onFocus={() => handleFirstInteraction('notes')}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '13px',
              color: '#0f172a',
              outline: 'none',
              background: '#f8fafc',
              resize: 'vertical'
            }}
          />
        </div>

        {/* CALENDAR INVITE CHECKBOX */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
          <input
            type="checkbox"
            id="send-calendar-invite"
            checked={sendCalendarInvite}
            onChange={(e) => setSendCalendarInvite(e.target.checked)}
            style={{ width: '16px', height: '16px', accentColor: '#1d5cff', cursor: 'pointer' }}
          />
          <label htmlFor="send-calendar-invite" style={{ fontSize: '13px', color: '#334155', cursor: 'pointer' }}>
            Send Google Calendar invite directly to my work email
          </label>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={submitting}
          className="button button-primary"
          style={{
            width: '100%',
            padding: '13px 20px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #1d5cff 0%, #0d47e5 100%)',
            color: '#ffffff',
            border: 'none',
            fontSize: '15px',
            fontWeight: 700,
            cursor: submitting ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 4px 14px rgba(29, 92, 255, 0.3)'
          }}
        >
          {submitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Routing to Principal Architect...</span>
            </>
          ) : (
            <>
              <span>Request 45-Min Executive Session</span>
              <ArrowRight size={17} />
            </>
          )}
        </button>

        {/* TRUST BADGE FOOTER */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '16px', color: '#64748b', fontSize: '12px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <ShieldCheck size={14} color="#16a34a" /> Strict Mutual NDA
          </span>
          <span>&bull;</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={14} color="#1d5cff" /> &lt;2 Hr SLA Response
          </span>
          <span>&bull;</span>
          <span>Zero Vendor Fluff</span>
        </div>
      </form>
    </div>
  )
}


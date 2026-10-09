'use client'

import React, { useState, useEffect, useRef, useId } from 'react'
import {
  Calendar as CalendarIcon,
  Clock,
  Globe2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  Lock,
  ArrowUpRight,
  Sparkles,
  Building2,
  Mail,
  User,
  Phone,
  Briefcase,
  HelpCircle,
  RefreshCw,
  Video
} from 'lucide-react'
import { TimeSlot, BookingResult } from '@/lib/services/google-calendar'
import { validateEmail, validatePhone } from '@/lib/form-submission'
import { trackFormView, trackFormStart, trackFormFieldInteraction, trackFormValidationError, trackFormSubmit } from '@/lib/analytics'

export const AREAS_OF_INTEREST = [
  'AI Infrastructure and GPU Optimization',
  'AI Agents and Multi-Agent Systems',
  'LLM and RAG Engineering',
  'AI Security and Governance',
  'AI Networking and Infrastructure',
  'Enterprise AI Architecture',
  'Other'
] as const

export const COMMON_TIMEZONES = [
  { value: 'America/New_York', label: 'Eastern Time (ET) — US & Canada' },
  { value: 'America/Chicago', label: 'Central Time (CT) — US & Canada' },
  { value: 'America/Denver', label: 'Mountain Time (MT) — US & Canada' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT) — US & Canada' },
  { value: 'Europe/London', label: 'London (GMT / BST) — UK' },
  { value: 'Europe/Frankfurt', label: 'Central European Time (CET) — Europe' },
  { value: 'Asia/Dubai', label: 'Gulf Standard Time (GST) — UAE' },
  { value: 'Asia/Kolkata', label: 'India Standard Time (IST) — India (+5:30)' },
  { value: 'Asia/Singapore', label: 'Singapore Standard Time (SGT) — Singapore' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST) — Tokyo' },
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET) — Sydney' },
  { value: 'UTC', label: 'Coordinated Universal Time (UTC)' }
]

// Generate selectable business dates (next 30 days, skipping weekends)
function getSelectableDates(count: number = 20): { dateStr: string; label: string; dayName: string }[] {
  const dates: { dateStr: string; label: string; dayName: string }[] = []
  const d = new Date()
  // Start from next business day
  d.setDate(d.getDate() + 1)

  while (dates.length < count) {
    const day = d.getDay()
    if (day !== 0 && day !== 6) { // Skip Saturday and Sunday
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const dateNum = String(d.getDate()).padStart(2, '0')
      const dateStr = `${year}-${month}-${dateNum}`
      
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' })
      const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      dates.push({ dateStr, label, dayName })
    }
    d.setDate(d.getDate() + 1)
  }
  return dates
}

interface SessionBookingFormProps {
  initialArea?: string
  ctaSource?: string
  compact?: boolean
  className?: string
  onBookingSuccess?: (result: BookingResult) => void
}

export function SessionBookingForm({
  initialArea,
  ctaSource = 'session_booking_flow',
  compact = false,
  className = '',
  onBookingSuccess
}: SessionBookingFormProps) {
  const formId = useId()
  const formRef = useRef<HTMLFormElement>(null)

  // Form Fields State
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [phone, setPhone] = useState('')
  const [areaOfInterest, setAreaOfInterest] = useState(initialArea || AREAS_OF_INTEREST[0])
  const [challengeDescription, setChallengeDescription] = useState('')
  const [additionalContext, setAdditionalContext] = useState('')

  // Calendar & Scheduling State
  const selectableDates = useRef(getSelectableDates(20)).current
  const [selectedDate, setSelectedDate] = useState<string>(selectableDates[0]?.dateStr || '')
  const [timezone, setTimezone] = useState<string>('America/New_York')
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)
  const [slotFetchError, setSlotFetchError] = useState('')

  // Validation & UI State
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [bookingResult, setBookingResult] = useState<BookingResult | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  // Auto-detect browser timezone on mount
  useEffect(() => {
    try {
      const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone
      if (userTz) {
        setTimezone(userTz)
      }
    } catch {
      // Fallback remains America/New_York
    }
  }, [])

  // Update initialArea when prop changes
  useEffect(() => {
    if (initialArea) {
      // Match normalized or partial strings
      const found = AREAS_OF_INTEREST.find(
        (a) => a.toLowerCase().includes(initialArea.toLowerCase()) || initialArea.toLowerCase().includes(a.toLowerCase().slice(0, 10))
      )
      if (found) {
        setAreaOfInterest(found)
      } else {
        setAreaOfInterest(initialArea)
      }
    }
  }, [initialArea])

  // Track form view
  useEffect(() => {
    trackFormView('form_session_booking', 'Executive Session Booking Form', 'strategy_session', ctaSource)
  }, [ctaSource])

  // Fetch available slots when selectedDate or timezone changes
  useEffect(() => {
    if (!selectedDate) return

    let isMounted = true
    setIsLoadingSlots(true)
    setSlotFetchError('')
    setSelectedSlot(null)

    fetch(`/api/calendar/availability?date=${encodeURIComponent(selectedDate)}&timezone=${encodeURIComponent(timezone)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return
        if (data.success && Array.isArray(data.slots)) {
          setSlots(data.slots)
          // Auto-select first available slot
          const firstAvailable = data.slots.find((s: TimeSlot) => s.available)
          if (firstAvailable) {
            setSelectedSlot(firstAvailable)
          }
        } else {
          setSlotFetchError(data.message || 'Unable to load real-time slots.')
        }
      })
      .catch((err) => {
        if (!isMounted) return
        console.error('[Slot Fetch Error]', err)
        setSlotFetchError('Unable to connect to Google Calendar. Please try refreshing.')
      })
      .finally(() => {
        if (isMounted) setIsLoadingSlots(false)
      })

    return () => {
      isMounted = false
    }
  }, [selectedDate, timezone])

  const validateField = (fieldName: string, value: string): string => {
    let err = ''
    if (fieldName === 'name') {
      if (!value.trim()) err = 'Please enter your full name.'
      else if (value.trim().length < 2) err = 'Name must be at least 2 characters.'
    } else if (fieldName === 'email') {
      if (!value.trim()) err = 'Please enter your business email.'
      else if (!validateEmail(value.trim())) err = 'Please enter a valid work email address.'
    } else if (fieldName === 'company') {
      if (!value.trim()) err = 'Please enter your company name.'
    } else if (fieldName === 'phone') {
      if (value.trim() && !validatePhone(value.trim())) err = 'Please enter a valid phone number.'
    } else if (fieldName === 'challengeDescription') {
      if (!value.trim()) err = 'Please provide a brief description of your challenge or business requirement.'
      else if (value.trim().length < 10) err = 'Description must be at least 10 characters.'
    }
    setFieldErrors((prev) => ({ ...prev, [fieldName]: err }))
    return err
  }

  const handleBlur = (fieldName: string, value: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }))
    validateField(fieldName, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    setErrorMessage('')
    const errors: Record<string, string> = {}

    const nameErr = validateField('name', name)
    const emailErr = validateField('email', email)
    const companyErr = validateField('company', company)
    const phoneErr = validateField('phone', phone)
    const descErr = validateField('challengeDescription', challengeDescription)

    setTouched({
      name: true,
      email: true,
      company: true,
      phone: true,
      challengeDescription: true,
      areaOfInterest: true
    })

    if (nameErr) errors.name = nameErr
    if (emailErr) errors.email = emailErr
    if (companyErr) errors.company = companyErr
    if (phoneErr) errors.phone = phoneErr
    if (descErr) errors.challengeDescription = descErr

    if (!selectedDate) {
      errors.selectedDate = 'Please choose a consultation date.'
    }

    if (!selectedSlot) {
      errors.selectedSlot = 'Please choose an available time slot.'
    }

    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0]
      setErrorMessage(firstError)
      trackFormValidationError('form_session_booking', 'Session Booking Form', Object.keys(errors)[0], firstError)
      return
    }

    setIsSubmitting(true)
    trackFormStart('form_session_booking', 'Session Booking Form', 'submit_click')

    try {
      const response = await fetch('/api/calendar/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          jobTitle: jobTitle.trim(),
          phone: phone.trim(),
          areaOfInterest,
          challengeDescription: challengeDescription.trim(),
          bookingDate: selectedDate,
          startTime: selectedSlot!.startTime,
          endTime: selectedSlot!.endTime,
          timezone,
          additionalContext: additionalContext.trim()
        })
      })

      const data: BookingResult = await response.json()

      if (response.ok && data.success) {
        setBookingResult(data)
        setSubmitted(true)
        trackFormSubmit('form_session_booking', 'Session Booking Form', true, data.bookingId)
        if (onBookingSuccess) onBookingSuccess(data)
      } else {
        setErrorMessage(data.message || 'Unable to confirm session booking. Please select another slot or try again.')
        trackFormSubmit('form_session_booking', 'Session Booking Form', false, undefined, data.message)
      }
    } catch (err: any) {
      console.error('[Session Booking Error]', err)
      setErrorMessage('Network error while booking session. Please check your connection and retry.')
      trackFormSubmit('form_session_booking', 'Session Booking Form', false, undefined, err?.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // =========================================================================
  // CONFIRMATION SUCCESS VIEW
  // =========================================================================
  if (submitted && bookingResult) {
    return (
      <div
        className={`session-booking-success-box tg-card-interactive ${className}`}
        style={{
          background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
          border: '1px solid rgba(59, 130, 246, 0.4)',
          borderRadius: '20px',
          padding: 'clamp(24px, 4vw, 40px)',
          color: '#ffffff',
          boxShadow: '0 20px 50px rgba(15, 23, 42, 0.4)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '6px 12px', borderRadius: '8px', color: '#4ade80', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em' }}>
            <CheckCircle2 size={15} />
            <span>SESSION CONFIRMED &amp; DISPATCHED</span>
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#93c5fd', background: 'rgba(59, 130, 246, 0.1)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            REF: {bookingResult.bookingId}
          </span>
        </div>

        <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', margin: '0 0 8px' }}>
          Your AI Architecture Briefing is Confirmed
        </h3>
        <p style={{ color: '#cbd5e1', fontSize: '14.5px', lineHeight: 1.6, margin: '0 0 24px' }}>
          A calendar invitation and briefing agenda have been dispatched to <strong>{email}</strong>. Our Principal Systems Engineers are reviewing your requirement to prepare tailored architectural benchmarks.
        </p>

        {/* DETAILS GRID */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(148, 163, 184, 0.15)',
            borderRadius: '14px',
            padding: '20px',
            marginBottom: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}
        >
          <div>
            <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              Date &amp; Time
            </span>
            <p style={{ margin: '4px 0 0', fontSize: '14px', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CalendarIcon size={15} className="text-blue-400" />
              <span>{bookingResult.date}</span>
            </p>
            <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#60a5fa', fontWeight: 600 }}>
              {bookingResult.startTime} – {bookingResult.endTime}
            </p>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              Time Zone
            </span>
            <p style={{ margin: '4px 0 0', fontSize: '13.5px', fontWeight: 600, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Globe2 size={15} className="text-blue-400" />
              <span>{bookingResult.timezone}</span>
            </p>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              Consultation Topic
            </span>
            <p style={{ margin: '4px 0 0', fontSize: '13.5px', fontWeight: 600, color: '#ffffff' }}>
              {areaOfInterest}
            </p>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              Meeting Channel
            </span>
            <p style={{ margin: '4px 0 0', fontSize: '13.5px', fontWeight: 600, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Video size={15} className="text-green-400" />
              <span>Google Meet / Calendar Invite</span>
            </p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          {bookingResult.googleCalendarUrl && (
            <a
              href={bookingResult.googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#1d5cff',
                color: '#ffffff',
                padding: '12px 20px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '13.5px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(29, 92, 255, 0.4)'
              }}
            >
              <CalendarIcon size={16} />
              <span>Add to Google Calendar</span>
              <ArrowUpRight size={14} />
            </a>
          )}

          <a
            href={`https://wa.me/15550192834?text=Hi%20TrustGrid%20team%2C%20following%20up%20on%20my%20session%20booking%20(Ref%3A%20${bookingResult.bookingId})`}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-ghost"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '11px 18px',
              borderRadius: '10px',
              borderColor: 'rgba(37, 211, 102, 0.4)',
              color: '#25D366',
              background: 'rgba(37, 211, 102, 0.08)',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 600
            }}
          >
            <span>Direct WhatsApp Advisory</span>
            <ArrowUpRight size={14} />
          </a>

          <button
            type="button"
            className="button button-ghost"
            onClick={() => {
              setSubmitted(false)
              setBookingResult(null)
              setName('')
              setEmail('')
              setCompany('')
              setJobTitle('')
              setPhone('')
              setChallengeDescription('')
              setAdditionalContext('')
              setTouched({})
              setFieldErrors({})
            }}
            style={{
              padding: '11px 18px',
              borderRadius: '10px',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              color: '#cbd5e1',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            Book Another Session
          </button>
        </div>
      </div>
    )
  }

  // =========================================================================
  // MAIN SINGLE-COLUMN BOOKING FORM RENDER
  // =========================================================================
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className={`session-booking-form tg-card-interactive ${className}`}
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: compact ? '20px 16px' : 'clamp(20px, 3vw, 32px)',
        border: '1px solid #e2e8f0',
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '22px',
        width: '100%',
        maxWidth: '580px',
        margin: '0 auto',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      {/* FORM HEADER */}
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#eff6ff', color: '#1d5cff', padding: '4px 10px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '8px' }}>
          <Sparkles size={13} />
          <span>DIRECT ARCHITECT CONSULTATION</span>
        </div>
        <h3 style={{ margin: '0 0 6px', fontSize: '21px', fontWeight: 800, color: '#0f172a' }}>
          Book a Session with an AI Architect
        </h3>
        <p style={{ margin: 0, fontSize: '13.5px', color: '#64748b', lineHeight: 1.5 }}>
          Schedule a dedicated 45-minute architectural &amp; strategic briefing with TRUSTGRID.AI principal systems engineers. We evaluate your compute economics, multi-agent readiness, lossless networking, and quantum security.
        </p>
      </div>

      {/* 1-CLICK DIRECT GOOGLE CALENDAR APPOINTMENT BANNER */}
      <div
        style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
          border: '1px solid #86efac',
          borderRadius: '12px',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#16a34a', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CalendarIcon size={16} />
          </div>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#14532d', display: 'block' }}>
              Direct Google Calendar Scheduler
            </span>
            <span style={{ fontSize: '11px', color: '#166534' }}>
              Official auto-booking with Google Meet &amp; timezone sync
            </span>
          </div>
        </div>
        <a
          href="https://calendar.app.google/voXXRkbgVuuft3fz6"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '11.5px',
            fontWeight: 700,
            padding: '7px 12px',
            borderRadius: '8px',
            background: '#16a34a',
            color: '#ffffff',
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(22, 163, 74, 0.25)',
            transition: 'all 0.15s ease'
          }}
        >
          <span>Open Direct Scheduler</span>
          <ArrowUpRight size={13} />
        </a>
      </div>

      {/* GLOBAL ERROR BANNER */}
      {errorMessage && (
        <div
          role="alert"
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '10px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#b91c1c',
            fontSize: '13.5px',
            fontWeight: 500
          }}
        >
          <AlertCircle size={18} className="shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 1: CONTACT DETAILS (PURE SINGLE COLUMN) */}
      {/* ========================================================================= */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#1d5cff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            1. Contact &amp; Organization Details
          </span>
        </div>

        {/* 1. FULL NAME */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor={`${formId}_name`} style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
            Full Name <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            id={`${formId}_name`}
            type="text"
            required
            disabled={isSubmitting}
            placeholder="e.g. Dr. Alex Vance"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              if (touched.name) validateField('name', e.target.value)
            }}
            onFocus={() => trackFormFieldInteraction('form_session_booking', 'Session Booking Form', 'name')}
            onBlur={() => handleBlur('name', name)}
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: '14px',
              borderRadius: '10px',
              border: touched.name && fieldErrors.name ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
              background: touched.name && fieldErrors.name ? '#fef2f2' : '#ffffff',
              color: '#0f172a',
              outline: 'none'
            }}
          />
          {touched.name && fieldErrors.name && (
            <span style={{ fontSize: '12px', color: '#dc2626', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlertCircle size={12} /> {fieldErrors.name}
            </span>
          )}
        </div>

        {/* 2. BUSINESS EMAIL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor={`${formId}_email`} style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
            Business Email <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            id={`${formId}_email`}
            type="email"
            required
            disabled={isSubmitting}
            placeholder="alex@enterprise.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (touched.email) validateField('email', e.target.value)
            }}
            onFocus={() => trackFormFieldInteraction('form_session_booking', 'Session Booking Form', 'email')}
            onBlur={() => handleBlur('email', email)}
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: '14px',
              borderRadius: '10px',
              border: touched.email && fieldErrors.email ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
              background: touched.email && fieldErrors.email ? '#fef2f2' : '#ffffff',
              color: '#0f172a',
              outline: 'none'
            }}
          />
          {touched.email && fieldErrors.email && (
            <span style={{ fontSize: '12px', color: '#dc2626', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlertCircle size={12} /> {fieldErrors.email}
            </span>
          )}
        </div>

        {/* 3. COMPANY NAME */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor={`${formId}_company`} style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
            Company Name <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            id={`${formId}_company`}
            type="text"
            required
            disabled={isSubmitting}
            placeholder="e.g. Apex Global Systems"
            value={company}
            onChange={(e) => {
              setCompany(e.target.value)
              if (touched.company) validateField('company', e.target.value)
            }}
            onFocus={() => trackFormFieldInteraction('form_session_booking', 'Session Booking Form', 'company')}
            onBlur={() => handleBlur('company', company)}
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: '14px',
              borderRadius: '10px',
              border: touched.company && fieldErrors.company ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
              background: touched.company && fieldErrors.company ? '#fef2f2' : '#ffffff',
              color: '#0f172a',
              outline: 'none'
            }}
          />
          {touched.company && fieldErrors.company && (
            <span style={{ fontSize: '12px', color: '#dc2626', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlertCircle size={12} /> {fieldErrors.company}
            </span>
          )}
        </div>

        {/* 4. JOB TITLE (OPTIONAL) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label htmlFor={`${formId}_jobTitle`} style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
              Job Title
            </label>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Optional</span>
          </div>
          <input
            id={`${formId}_jobTitle`}
            type="text"
            disabled={isSubmitting}
            placeholder="e.g. VP AI Infrastructure / CIO / Lead Architect"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            onFocus={() => trackFormFieldInteraction('form_session_booking', 'Session Booking Form', 'jobTitle')}
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: '14px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              color: '#0f172a',
              outline: 'none'
            }}
          />
        </div>

        {/* 5. PHONE NUMBER (OPTIONAL) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label htmlFor={`${formId}_phone`} style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
              Phone Number
            </label>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Optional</span>
          </div>
          <input
            id={`${formId}_phone`}
            type="tel"
            disabled={isSubmitting}
            placeholder="+1 (555) 000-0000"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value)
              if (touched.phone) validateField('phone', e.target.value)
            }}
            onFocus={() => trackFormFieldInteraction('form_session_booking', 'Session Booking Form', 'phone')}
            onBlur={() => handleBlur('phone', phone)}
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: '14px',
              borderRadius: '10px',
              border: touched.phone && fieldErrors.phone ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
              background: touched.phone && fieldErrors.phone ? '#fef2f2' : '#ffffff',
              color: '#0f172a',
              outline: 'none'
            }}
          />
          {touched.phone && fieldErrors.phone && (
            <span style={{ fontSize: '12px', color: '#dc2626', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlertCircle size={12} /> {fieldErrors.phone}
            </span>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: CONSULTATION REQUIREMENTS */}
      {/* ========================================================================= */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#1d5cff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            2. Consultation Focus &amp; Requirements
          </span>
        </div>

        {/* AREA OF INTEREST DROPDOWN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor={`${formId}_area`} style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
            Area of Interest <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <select
            id={`${formId}_area`}
            required
            disabled={isSubmitting}
            value={areaOfInterest}
            onChange={(e) => setAreaOfInterest(e.target.value)}
            onFocus={() => trackFormFieldInteraction('form_session_booking', 'Session Booking Form', 'areaOfInterest')}
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: '14px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              color: '#0f172a',
              background: '#ffffff',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {AREAS_OF_INTEREST.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        {/* BRIEF CHALLENGE / REQUIREMENT DESCRIPTION */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor={`${formId}_challenge`} style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
            Brief Description of Challenge or Business Requirement <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <textarea
            id={`${formId}_challenge`}
            rows={3}
            required
            disabled={isSubmitting}
            placeholder="Describe your compute bottlenecks, agent deployment scale, networking requirements, or current AI initiatives..."
            value={challengeDescription}
            onChange={(e) => {
              setChallengeDescription(e.target.value)
              if (touched.challengeDescription) validateField('challengeDescription', e.target.value)
            }}
            onFocus={() => trackFormFieldInteraction('form_session_booking', 'Session Booking Form', 'challengeDescription')}
            onBlur={() => handleBlur('challengeDescription', challengeDescription)}
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: '14px',
              borderRadius: '10px',
              border: touched.challengeDescription && fieldErrors.challengeDescription ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
              background: touched.challengeDescription && fieldErrors.challengeDescription ? '#fef2f2' : '#ffffff',
              color: '#0f172a',
              outline: 'none',
              resize: 'vertical',
              minHeight: '85px',
              fontFamily: 'inherit'
            }}
          />
          {touched.challengeDescription && fieldErrors.challengeDescription && (
            <span style={{ fontSize: '12px', color: '#dc2626', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlertCircle size={12} /> {fieldErrors.challengeDescription}
            </span>
          )}
        </div>

        {/* ADDITIONAL CONTEXT (OPTIONAL) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label htmlFor={`${formId}_context`} style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
              Additional Context / Current Tech Stack
            </label>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Optional</span>
          </div>
          <textarea
            id={`${formId}_context`}
            rows={2}
            disabled={isSubmitting}
            placeholder="e.g. Currently operating 128x H100 cluster on Slurm, evaluating liquid immersion upgrade..."
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            onFocus={() => trackFormFieldInteraction('form_session_booking', 'Session Booking Form', 'additionalContext')}
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: '14px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              color: '#0f172a',
              outline: 'none',
              resize: 'vertical',
              minHeight: '65px',
              fontFamily: 'inherit'
            }}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: LIVE CALENDAR & REAL-TIME AVAILABILITY */}
      {/* ========================================================================= */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#1d5cff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            3. Select Date &amp; Available Slot (Google Calendar Synced)
          </span>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11.5px', color: '#15803d', background: '#dcfce7', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
            <Clock size={12} />
            <span>45-Min Session Duration</span>
          </div>
        </div>

        {/* TIMEZONE SELECTOR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor={`${formId}_tz`} style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Globe2 size={15} className="text-blue-600" />
            <span>Your Time Zone</span>
          </label>
          <select
            id={`${formId}_tz`}
            value={timezone}
            disabled={isSubmitting}
            onChange={(e) => setTimezone(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              fontSize: '13.5px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              color: '#0f172a',
              background: '#f8fafc',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {COMMON_TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label} ({tz.value})
              </option>
            ))}
          </select>
        </div>

        {/* DATE HORIZONTAL SCROLLER / PICKER */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
            Preferred Consultation Date <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '8px',
              scrollbarWidth: 'thin'
            }}
          >
            {selectableDates.map((d) => {
              const isSelected = selectedDate === d.dateStr
              return (
                <button
                  key={d.dateStr}
                  type="button"
                  onClick={() => setSelectedDate(d.dateStr)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '70px',
                    padding: '10px 8px',
                    borderRadius: '12px',
                    border: isSelected ? '2px solid #1d5cff' : '1px solid #cbd5e1',
                    background: isSelected ? 'linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%)' : '#ffffff',
                    color: isSelected ? '#1e3a8a' : '#334155',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    flexShrink: 0
                  }}
                >
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 600, color: isSelected ? '#1d5cff' : '#64748b' }}>
                    {d.dayName}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 800, marginTop: '2px' }}>
                    {d.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* TIME SLOTS SELECTION */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
              Available Time Slots <span style={{ color: '#ef4444' }}>*</span>
            </label>
            {isLoadingSlots && (
              <span style={{ fontSize: '12px', color: '#1d5cff', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Loader2 size={13} className="animate-spin" />
                <span>Checking live calendar...</span>
              </span>
            )}
          </div>

          {slotFetchError && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '8px 12px', color: '#b91c1c', fontSize: '12px' }}>
              {slotFetchError}
            </div>
          )}

          {!isLoadingSlots && slots.length === 0 && (
            <p style={{ fontSize: '13px', color: '#64748b', fontStyle: 'italic', margin: '4px 0' }}>
              No available slots found for the selected date. Please pick another date.
            </p>
          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '10px'
            }}
          >
            {slots.map((slot) => {
              const isSelected = selectedSlot?.startTime === slot.startTime
              return (
                <button
                  key={slot.startTime}
                  type="button"
                  disabled={!slot.available || isSubmitting}
                  onClick={() => setSelectedSlot(slot)}
                  style={{
                    padding: '10px 8px',
                    borderRadius: '10px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    textAlign: 'center',
                    border: isSelected
                      ? '2px solid #1d5cff'
                      : slot.available
                      ? '1px solid #cbd5e1'
                      : '1px dashed #e2e8f0',
                    background: isSelected
                      ? '#1d5cff'
                      : slot.available
                      ? '#f8fafc'
                      : '#f1f5f9',
                    color: isSelected
                      ? '#ffffff'
                      : slot.available
                      ? '#0f172a'
                      : '#94a3b8',
                    cursor: slot.available ? 'pointer' : 'not-allowed',
                    opacity: slot.available ? 1 : 0.6,
                    transition: 'all 0.15s ease'
                  }}
                >
                  {slot.label.split('–')[0].trim()}
                </button>
              )
            })}
          </div>

          {selectedSlot && (
            <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#15803d', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
              <CheckCircle2 size={14} />
              <span>Selected Slot: {selectedSlot.label} ({timezone})</span>
            </p>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 4: PRIMARY SUBMIT CTA */}
      {/* ========================================================================= */}
      <div style={{ marginTop: '8px' }}>
        <button
          type="submit"
          disabled={isSubmitting}
          className="button button-primary tg-btn-shine"
          style={{
            width: '100%',
            padding: '14px 24px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #1d5cff 0%, #0d3eb8 100%)',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '15px',
            border: 'none',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            opacity: isSubmitting ? 0.75 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 6px 20px rgba(29, 92, 255, 0.35)',
            transition: 'all 0.2s ease'
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Verifying &amp; Reserving Calendar Slot...</span>
            </>
          ) : (
            <>
              <CalendarIcon size={18} />
              <span>Confirm Session Booking</span>
              <ArrowUpRight size={17} />
            </>
          )}
        </button>

        <p style={{ margin: '14px 0 0', fontSize: '11.5px', color: '#64748b', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Lock size={12} className="text-slate-400" />
          <span>Enterprise Confidentiality Guaranteed. Disclosures protected under mutual NDA standards.</span>
        </p>
      </div>
    </form>
  )
}

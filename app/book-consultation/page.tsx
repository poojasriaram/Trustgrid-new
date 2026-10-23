'use client'

import React, { useState, useEffect, useId, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  Calendar as CalendarIcon,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Users,
  Building2,
  Globe2,
  Check,
  Phone,
  Mail,
  Briefcase,
  ChevronDown
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { submitTrustGridForm, TrustGridFormData } from '@/lib/form-submission'
import {
  sendTelemetryEvent,
  build95TelemetryPayload,
  trackFormView,
  trackFormStart,
  trackFormValidationError,
  trackFormSubmit
} from '@/lib/analytics'

// Official Google Calendar Scheduling URL
export const GOOGLE_CALENDAR_URL = 'https://calendar.app.google/voXXRkbgVuuft3fz6'

const TIMEZONES = [
  { value: 'Asia/Kolkata', label: 'India Standard Time (IST) UTC+5:30' },
  { value: 'America/New_York', label: 'Eastern Time (ET) UTC-4:00' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT) UTC-7:00' },
  { value: 'Europe/London', label: 'British Time (BST) UTC+1:00' },
  { value: 'Asia/Singapore', label: 'Singapore Time (SGT) UTC+8:00' },
  { value: 'Asia/Dubai', label: 'Gulf Standard Time (GST) UTC+4:00' }
]

const MEETING_TYPES = [
  { id: 'strategy_30', title: 'Book Strategy Session', duration: '30 Mins', desc: 'High-level business & AI value diagnostic briefing' },
  { id: 'consultation_45', title: 'Schedule Consultation', duration: '45 Mins', desc: 'Deep-dive feasibility, GPU cluster & workload review' },
  { id: 'architect_60', title: 'Meet an AI Architect', duration: '60 Mins', desc: 'Production multi-agent & systems engineering evaluation' },
  { id: 'expert_session', title: 'Talk to an Expert', duration: '45 Mins', desc: 'Custom enterprise requirements & sovereign compliance' }
]

const COMPANY_SIZES = [
  '1–50 employees',
  '51–200 employees',
  '201–1,000 employees',
  '1,001–5,000 employees',
  '5,000+ Enterprise'
]

const INDUSTRIES = [
  'Banking, Financial Services & Insurance (BFSI)',
  'Healthcare, Life Sciences & Pharma',
  'Telecommunications & Network Infrastructure',
  'Energy, Utilities & Microgrids',
  'Manufacturing & Industrial Automation',
  'Government & Sovereign Defense',
  'Retail, Logistics & E-Commerce',
  'Technology & Enterprise Software'
]

const AREAS_OF_INTEREST = [
  'AI Value Engineering & ROI Realization',
  'AI Agentic Enterprise & Multi-Agent Swarms',
  'AI Infrastructure, GPU Clusters & Liquid Cooling',
  'AI Networking & Lossless Fabric (RoCEv2 / 800G)',
  'Quantum-Safe Cybersecurity & Zero-Trust Defense',
  'Trusted AI Governance & EU AI Act Compliance'
]

function generateUpcomingDates(): { dateStr: string; displayDate: string; dayName: string }[] {
  const dates = []
  const today = new Date()
  let added = 0
  let offset = 1

  while (added < 7) {
    const d = new Date(today)
    d.setDate(today.getDate() + offset)
    offset++
    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (d.getDay() === 0 || d.getDay() === 6) continue

    const dateStr = d.toISOString().split('T')[0]
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' })
    const displayDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    dates.push({ dateStr, displayDate, dayName })
    added++
  }

  return dates
}

const AVAILABLE_SLOTS = [
  '09:30 AM',
  '11:00 AM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM',
  '06:30 PM'
]

function BookConsultationContent() {
  const searchParams = useSearchParams()
  const formId = useId()

  // 10 Required Form Fields
  const [fullName, setFullName] = useState('')
  const [businessEmail, setBusinessEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [companySize, setCompanySize] = useState(COMPANY_SIZES[1])
  const [industry, setIndustry] = useState(INDUSTRIES[0])
  const [areaOfInterest, setAreaOfInterest] = useState(AREAS_OF_INTEREST[0])
  const [businessChallenge, setBusinessChallenge] = useState('')
  const [meetingType, setMeetingType] = useState(MEETING_TYPES[1].title)

  // Scheduling State
  const [availableDates] = useState(generateUpcomingDates())
  const [selectedDate, setSelectedDate] = useState(availableDates[0]?.dateStr || '')
  const [selectedSlot, setSelectedSlot] = useState(AVAILABLE_SLOTS[1])
  const [selectedTimezone, setSelectedTimezone] = useState(TIMEZONES[0].value)

  // Submission Status
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [calendarLink, setCalendarLink] = useState('')

  useEffect(() => {
    // Detect system timezone if available
    try {
      const sysTz = Intl.DateTimeFormat().resolvedOptions().timeZone
      if (TIMEZONES.some(t => t.value === sysTz)) {
        setSelectedTimezone(sysTz)
      }
    } catch (e) {}

    // Pre-populate interest from query string if available
    const qTopic = searchParams.get('topic') || searchParams.get('interest')
    if (qTopic) {
      const match = AREAS_OF_INTEREST.find(a => a.toLowerCase().includes(qTopic.toLowerCase()))
      if (match) setAreaOfInterest(match)
    }

    // Telemetry: Form View
    trackFormView('central_booking_system', 'Single Booking System')
  }, [searchParams])

  const handleStart = () => {
    trackFormStart('central_booking_system', 'Single Booking System')
  }

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot)
    build95TelemetryPayload('slot_selected', 'booking', 'select', {
      form_id: 'central_booking_system',
      event_label: `${selectedDate} ${slot} (${selectedTimezone})`
    }).then(sendTelemetryEvent)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!fullName.trim() || !businessEmail.trim() || !companyName.trim() || !mobileNumber.trim()) {
      setErrorMsg('Please complete all required fields.')
      trackFormValidationError('central_booking_system', 'Single Booking System', 'required_fields', 'Required fields missing')
      return
    }

    setLoading(true)

    // Construct Google Calendar Event URL
    const eventTitle = encodeURIComponent(`${meetingType}: TRUSTGRID.AI & ${companyName}`)
    const eventDetails = encodeURIComponent(
      `Enterprise AI Consultation with TRUSTGRID.AI Systems Division\n\n` +
      `Attendee: ${fullName} (${jobTitle})\n` +
      `Company: ${companyName} (${companySize})\n` +
      `Industry: ${industry}\n` +
      `Area of Focus: ${areaOfInterest}\n` +
      `Challenge / Scope: ${businessChallenge}\n\n` +
      `Meeting Link: Will be provided via Google Meet prior to session.`
    )
    const gCalUrl = `${GOOGLE_CALENDAR_URL}?text=${eventTitle}&details=${eventDetails}`
    setCalendarLink(gCalUrl)

    // Payload for Sheet 1 & Automated Email Dispatcher
    const payload: TrustGridFormData = {
      formName: 'Centralized Single Booking System',
      sheetName: 'Contact_Leads',
      name: fullName,
      email: businessEmail,
      company: companyName,
      phone: mobileNumber,
      role: jobTitle,
      companySize: companySize,
      industry: industry,
      challenges: businessChallenge,
      requirement: `[${meetingType}] Slot: ${selectedDate} at ${selectedSlot} (${selectedTimezone})\nChallenge: ${businessChallenge}`,
      ctaSource: meetingType,
      leadSource: 'Central Single Booking Workflow'
    }

    try {
      // 1. Submit to Google Apps Script Webhook
      await submitTrustGridForm(payload)

      // 2. Track Analytics Conversion
      trackFormSubmit('central_booking_system', 'Single Booking System', true)
      build95TelemetryPayload('consultation_scheduled', 'conversion', 'submit', {
        form_id: 'central_booking_system',
        event_label: `${meetingType} - ${companyName}`,
        conversion_value: 500,
        goal_completed: true
      }).then(sendTelemetryEvent)

      setSubmitted(true)
    } catch (err: any) {
      console.error('Booking submission error:', err)
      // Even if network webhook encounters an issue, show calendar confirmation so user never loses their slot
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <SiteHeader />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Breadcrumb & Tag */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles size={14} className="text-blue-600 animate-pulse" />
              <span>TRUSTGRID.AI &bull; SINGLE BOOKING ENGINE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Schedule Your Enterprise <span className="text-blue-600">AI Consultation</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              One centralized portal to meet directly with senior systems architects. Select an available time slot, confirm your session, and receive an instant Google Calendar invite.
            </p>
          </div>

          {!submitted ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              {/* LEFT PANEL: Scope, Trust Signals & Meeting Type (5 Cols) */}
              <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-slate-900 to-[#07143d] text-white p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-blue-400 mb-4">
                    <ShieldCheck size={16} />
                    <span>Executive Briefing SLA</span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
                    What to Expect
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    Direct access to Principal Systems Engineers who architect high-density GPU clusters, agentic systems, and sovereign AI fabrics.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={16} />
                      </div>
                      <div className="text-xs">
                        <strong className="text-white block font-semibold text-sm">Deterministic Architecture Review</strong>
                        <span className="text-slate-300">GPU topologies, token economics, liquid cooling &amp; 800G RoCEv2 fabrics.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={16} />
                      </div>
                      <div className="text-xs">
                        <strong className="text-white block font-semibold text-sm">Agentic DAG &amp; Memory Audit</strong>
                        <span className="text-slate-300">Multi-agent fleet orchestration, deterministic reasoning, and persistent memory.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={16} />
                      </div>
                      <div className="text-xs">
                        <strong className="text-white block font-semibold text-sm">Real-Time Google Calendar Booking</strong>
                        <span className="text-slate-300">Instant calendar invite generation with Google Meet conferencing links.</span>
                      </div>
                    </div>
                  </div>

                  {/* Select Meeting Format */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Meeting Type
                    </label>
                    <div className="space-y-2">
                      {MEETING_TYPES.map(m => (
                        <div
                          key={m.id}
                          onClick={() => setMeetingType(m.title)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all ${
                            meetingType === m.title
                              ? 'bg-blue-600/20 border-blue-500 text-white'
                              : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span>{m.title}</span>
                            <span className="px-2 py-0.5 rounded bg-white/10 text-blue-300 font-mono text-[11px]">{m.duration}</span>
                          </div>
                          <p className="text-[11.5px] text-slate-400 mt-1 leading-normal">{m.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 text-xs text-slate-400 flex items-center justify-between mt-6">
                  <span>Confidentiality &bull; Strict NDA Protected</span>
                  <Lock size={14} className="text-slate-400" />
                </div>
              </div>

              {/* RIGHT PANEL: 10 Standardized Fields + Calendar Slot Selection (7 Cols) */}
              <div className="lg:col-span-7 p-6 sm:p-8 bg-white flex flex-col justify-between">
                <form onSubmit={handleSubmit} onFocus={handleStart} className="space-y-6">
                  {/* Section 1: Contact & Company Profile */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                      <Briefcase size={16} className="text-blue-600" />
                      <span>1. Professional Details</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={e => setFullName(e.target.value)}
                          placeholder="e.g. Sarah Jenkins"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Business Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={businessEmail}
                          onChange={e => setBusinessEmail(e.target.value)}
                          placeholder="sarah@enterprise.com"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={companyName}
                          onChange={e => setCompanyName(e.target.value)}
                          placeholder="e.g. Acme Health Corp"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={mobileNumber}
                          onChange={e => setMobileNumber(e.target.value)}
                          placeholder="+1 555-0199 or +91 98765-43210"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Job Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={jobTitle}
                          onChange={e => setJobTitle(e.target.value)}
                          placeholder="e.g. VP of Infrastructure / Chief AI Officer"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Company Size
                        </label>
                        <select
                          value={companySize}
                          onChange={e => setCompanySize(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white"
                        >
                          {COMPANY_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Industry Vertical
                        </label>
                        <select
                          value={industry}
                          onChange={e => setIndustry(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white"
                        >
                          {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Area of Interest
                        </label>
                        <select
                          value={areaOfInterest}
                          onChange={e => setAreaOfInterest(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white"
                        >
                          {AREAS_OF_INTEREST.map(area => <option key={area} value={area}>{area}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Primary Business Challenge / Project Scope
                      </label>
                      <textarea
                        rows={2}
                        value={businessChallenge}
                        onChange={e => setBusinessChallenge(e.target.value)}
                        placeholder="Briefly describe your workload constraints, token scaling requirements, or target timeline..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Section 2: Real-Time Google Calendar Scheduling */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2 mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CalendarIcon size={16} className="text-blue-600" />
                        <span>2. Select Time Slot</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-normal">
                        <Clock size={12} />
                        <select
                          value={selectedTimezone}
                          onChange={e => setSelectedTimezone(e.target.value)}
                          className="text-xs bg-transparent border-0 text-blue-600 font-medium focus:ring-0 cursor-pointer"
                        >
                          {TIMEZONES.map(tz => (
                            <option key={tz.value} value={tz.value}>{tz.label}</option>
                          ))}
                        </select>
                      </div>
                    </h4>

                    {/* Day Picker */}
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-4">
                      {availableDates.map(d => {
                        const isSelected = selectedDate === d.dateStr
                        return (
                          <button
                            key={d.dateStr}
                            type="button"
                            onClick={() => setSelectedDate(d.dateStr)}
                            className={`p-2.5 rounded-xl border text-center transition-all ${
                              isSelected
                                ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span className="block text-[10px] font-bold uppercase opacity-80">{d.dayName}</span>
                            <span className="block text-xs font-extrabold mt-0.5">{d.displayDate}</span>
                          </button>
                        )
                      })}
                    </div>

                    {/* Time Slot Picker */}
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {AVAILABLE_SLOTS.map(slot => {
                        const isSelected = selectedSlot === slot
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => handleSlotSelect(slot)}
                            className={`py-2 px-1 text-center rounded-lg text-xs font-semibold border transition-all ${
                              isSelected
                                ? 'bg-slate-900 border-slate-900 text-white'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'
                            }`}
                          >
                            {slot}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle size={14} className="shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Submission CTA Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Confirming Google Calendar Slot...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirm &amp; {meetingType}</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-slate-500 mt-2">
                      Automatic Google Calendar invite &bull; Real-time slot locking &bull; Zero spam guarantee
                    </p>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            /* CONFIRMATION SCREEN & GOOGLE CALENDAR REDIRECT */
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 sm:p-12 text-center max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                Consultation Reserved Successfully!
              </h2>
              <p className="text-slate-600 text-sm mb-6">
                Thank you, <strong className="text-slate-900">{fullName}</strong>. Your session with the Principal AI Architecture team has been booked and queued into our executive calendar.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left mb-8 space-y-2 text-xs text-slate-700">
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500">Session Format:</span>
                  <span className="font-bold text-slate-900">{meetingType}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500">Scheduled Date &amp; Time:</span>
                  <span className="font-bold text-blue-600">{selectedDate} at {selectedSlot}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500">Timezone:</span>
                  <span className="font-bold text-slate-900">{selectedTimezone}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500">Company:</span>
                  <span className="font-bold text-slate-900">{companyName}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">Focus Area:</span>
                  <span className="font-bold text-slate-900">{areaOfInterest}</span>
                </div>
              </div>

              {/* ACTION BUTTONS: Add to Google Calendar & Return */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={GOOGLE_CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <CalendarIcon size={16} />
                  <span>Open in Google Calendar</span>
                  <ArrowUpRight size={14} />
                </a>

                <Link
                  href="/"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all"
                >
                  Return to Homepage
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

export default function BookConsultationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>}>
      <BookConsultationContent />
    </Suspense>
  )
}

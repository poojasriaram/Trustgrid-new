'use client'

import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Send,
  Loader2,
  Calendar,
  MessageSquare
} from 'lucide-react'
import { insertLeadToSupabase } from '@/lib/services/supabase-leads'
import { dispatchDirectToGoogleSheets } from '@/lib/form-submission'

const SERVICE_OPTIONS = [
  '20% Assured GPU Cluster & Infrastructure Optimization',
  'Autonomous Multi-Agent Swarm & Agentic Factory',
  '400G / 800G Lossless AI Networking (RoCEv2 / InfiniBand)',
  'Quantum-Safe Cybersecurity & Sovereign AI Compliance',
  'AI Value Engineering & FinOps Cost Governance',
  'Turnkey DBOT AI Factory Buildout & Operations'
]

const INDUSTRY_OPTIONS = [
  'Technology, Cloud & Hyperscale Data Centers',
  'Banking, Financial Services & Insurance (BFSI)',
  'Manufacturing, Robotics & Industrial Automation',
  'Healthcare, Life Sciences & Pharmaceuticals',
  'Energy, Utilities & Smart Infrastructure',
  'Telecommunications, Subsea & Satellite Networks',
  'Government, Defense & Sovereign Public Sector',
  'Retail, E-Commerce & Global Supply Chain'
]

function StandaloneGeneralFormContent() {
  const [fullName, setFullName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [serviceInterestedIn, setServiceInterestedIn] = useState(SERVICE_OPTIONS[0])
  const [industry, setIndustry] = useState(INDUSTRY_OPTIONS[0])
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!fullName.trim() || !company.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('Please enter all required fields.')
      return
    }

    setIsSubmitting(true)
    try {
      const leadId = `TG-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`
      const payload = {
        submissionId: leadId,
        leadId,
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company.trim(),
        role: serviceInterestedIn,
        industry,
        message: message.trim() || `Enterprise Inquiry for ${serviceInterestedIn} (${industry})`,
        source: 'General Enterprise Form (/forms)',
        formName: 'Enterprise Lead Capture Form',
        leadType: 'GENERAL_FORM',
        service: serviceInterestedIn,
        website: 'TRUSTGRID.AI',
        directDispatched: true
      }

      const [supaRes, sheetOk, apiRes] = await Promise.all([
        insertLeadToSupabase(payload).catch(() => ({ success: false })),
        dispatchDirectToGoogleSheets(payload),
        fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null)
      ])

      if (supaRes.success || sheetOk || (apiRes && apiRes.success)) {
        setSubmittedLeadId(apiRes?.leadId || leadId)
      } else {
        setErrorMsg('Failed to register inquiry. Please try again.')
      }
    } catch {
      setErrorMsg('Connection error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-sm">
            TG
          </div>
          <span className="font-bold text-slate-100 text-sm tracking-wide">
            TRUSTGRID.AI • Enterprise Inquiries
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <Link
            href="/booking"
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition no-underline"
          >
            Book a Meeting
          </Link>
          <Link
            href="/chat"
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition no-underline"
          >
            Live AI Chat
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8 flex items-center justify-center">
        {submittedLeadId ? (
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full">
                Proposal Request Logged
              </span>
              <h2 className="text-2xl font-bold text-white mt-3">Inquiry Successfully Registered</h2>
              <p className="text-slate-400 text-xs mt-1">
                Your dossier reference:{' '}
                <strong className="text-blue-400 font-mono">{submittedLeadId}</strong>
              </p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our principal AI systems architect will review your infrastructure parameters and deliver an initial architecture scope &amp; proposal within 24 business hours.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/booking"
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition no-underline"
              >
                Schedule an Immediate Advisory Call
              </Link>
              <Link
                href="/chat"
                className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition no-underline"
              >
                Open AI Architect Chat Desk
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-900/40 text-blue-300 border border-blue-700/50">
                  <Sparkles className="w-3.5 h-3.5" />
                  Request Official Proposal
                </span>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  Engineer Your Enterprise AI Infrastructure &amp; Agentic Stack
                </h1>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Submit your compute, networking, or autonomous agent requirements. Our principal systems engineering group will prepare a tailored techno-commercial blueprint within 24 hours.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xl font-bold text-blue-400">20%+</div>
                  <div className="text-[11px] text-slate-400">Assured GPU Yield Gain</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xl font-bold text-emerald-400">&lt; 1.10 PUE</div>
                  <div className="text-[11px] text-slate-400">Liquid-Cooled AI Factories</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xl font-bold text-cyan-400">400G / 800G</div>
                  <div className="text-[11px] text-slate-400">Lossless RoCEv2 Fabrics</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xl font-bold text-amber-400">24/7/365</div>
                  <div className="text-[11px] text-slate-400">Autonomous Fleet Ops</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p>
                  All inquiries are processed under ISO 27001 &amp; Quantum-Safe data security guidelines. Your architectural details remain strictly confidential under mutual NDA.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-500/40 text-xs text-rose-200">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-300 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ananya Roy"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-slate-100 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Global Cloud Infrastructure"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-slate-100 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Corporate Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@enterprise.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-slate-100 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Direct Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 95130 88612"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-slate-100 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-300 block mb-1">Service Interested In *</label>
                    <select
                      value={serviceInterestedIn}
                      onChange={(e) => setServiceInterestedIn(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-slate-100 focus:border-blue-500 focus:outline-none"
                    >
                      {SERVICE_OPTIONS.map((srv, idx) => (
                        <option key={idx} value={srv}>
                          {srv}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Industry Vertical *</label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-slate-100 focus:border-blue-500 focus:outline-none"
                    >
                      {INDUSTRY_OPTIONS.map((ind, idx) => (
                        <option key={idx} value={ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="text-xs">
                  <label className="text-slate-300 block mb-1">Detailed Message / Project Scope</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your GPU cluster capacity, agentic workflow objectives, network topology, or timeline..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Proposal Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default function FormsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center text-sm">Loading Enterprise Inquiry Portal...</div>}>
      <StandaloneGeneralFormContent />
    </Suspense>
  )
}

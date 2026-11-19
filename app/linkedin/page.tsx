'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Bot,
  ShieldCheck,
  Network,
  Sparkles,
  Send,
  Loader2
} from 'lucide-react'
import { insertLeadToSupabase } from '@/lib/services/supabase-leads'
import { dispatchDirectToGoogleSheets } from '@/lib/form-submission'

export default function LinkedInCampaignPage() {
  const [hasLoggedVisit, setHasLoggedVisit] = useState(false)
  const [name, setName] = useState('')
  const [workEmail, setWorkEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [designation, setDesignation] = useState('')
  const [clusterScope, setClusterScope] = useState('64 – 512 GPUs (Enterprise Cluster)')
  const [serviceNeeded, setServiceNeeded] = useState('20% Assured GPU Cluster & Infrastructure Optimization')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined' && !hasLoggedVisit) {
      setHasLoggedVisit(true)
      const referrer = document.referrer || 'https://www.linkedin.com/company/trustgridai/'
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'LinkedIn Visitor',
          email: 'inbound.linkedin@trustgrid.ai',
          company: 'LinkedIn Inbound Prospect',
          message: `Arrived directly from LinkedIn Campaign Portal (/linkedin): ${referrer}`,
          source: 'LinkedIn',
          service: 'LinkedIn Campaign Landing Page Visit',
          website: 'TRUSTGRID.AI'
        })
      }).catch(() => {})
    }
  }, [hasLoggedVisit])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!name.trim() || !workEmail.trim() || !phone.trim() || !company.trim()) {
      setErrorMsg('Please complete all mandatory fields.')
      return
    }

    setIsSubmitting(true)
    try {
      const leadId = `TG-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`
      const payload = {
        submissionId: leadId,
        leadId,
        name: name.trim(),
        email: workEmail.trim(),
        phone: phone.trim(),
        company: company.trim(),
        role: designation.trim() || 'Executive Prospect',
        message: `LinkedIn Campaign Lead | Title: ${designation || 'N/A'} | Scope: ${clusterScope} | Focus: ${serviceNeeded}`,
        source: 'LinkedIn',
        utmSource: 'linkedin',
        utmMedium: 'social_cpc',
        utmCampaign: 'executive_ai_2026',
        formName: 'LinkedIn Executive Portal',
        leadType: 'LINKEDIN_LEAD',
        service: serviceNeeded,
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
        setErrorMsg('Submission error. Please retry.')
      }
    } catch {
      setErrorMsg('Network connectivity error. Please try again.')
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
            TRUSTGRID.AI • LinkedIn Executive Advisory Portal
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <Link
            href="/booking"
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition no-underline"
          >
            Book VIP Consultation
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950/80 text-blue-300 border border-blue-800/80">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              B2B Enterprise AI Architecture Brief
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              20% Assured GPU Performance Optimization &amp; Autonomous Agent Factories
            </h1>

            <p className="text-slate-300 text-sm leading-relaxed">
              TRUSTGRID.AI engineers high-density GPU data centers, lossless 400G/800G RoCEv2 fabrics, and deterministic multi-agent swarms for global enterprises and hyperscale cloud operators.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="font-semibold text-slate-100 flex items-center gap-1.5 mb-1">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  20%+ Assured GPU Yield
                </div>
                <p className="text-slate-400 text-[11px]">
                  Eliminate compute waste, thermal throttling, and KV-cache stalls across H100/H200/Blackwell clusters.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="font-semibold text-slate-100 flex items-center gap-1.5 mb-1">
                  <Bot className="w-4 h-4 text-emerald-400" />
                  Agentic Swarm Factories
                </div>
                <p className="text-slate-400 text-[11px]">
                  Production multi-agent DAGs with runtime guardrails, persistent memory, and full AgentOps telemetry.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="font-semibold text-slate-100 flex items-center gap-1.5 mb-1">
                  <Network className="w-4 h-4 text-cyan-400" />
                  400G / 800G AI Networking
                </div>
                <p className="text-slate-400 text-[11px]">
                  Non-blocking RoCEv2, InfiniBand, and GPUDirect Storage interconnects engineered for zero packet loss.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="font-semibold text-slate-100 flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  Quantum-Safe &amp; ISO 27001
                </div>
                <p className="text-slate-400 text-[11px]">
                  Post-quantum cryptographic (PQC) baselines and sovereign air-gapped compliance architectures.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <span>
                Direct Systems Line:{' '}
                <a href="tel:+919513088612" className="text-blue-400 hover:underline font-medium no-underline">
                  +91 95130 88612
                </a>
              </span>
              <span>•</span>
              <Link href="/whatsapp" className="text-emerald-400 hover:underline font-medium no-underline">
                WhatsApp Engineering Desk
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative">
            {submittedLeadId ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white">Executive Brief Requested</h3>
                <p className="text-xs text-slate-400">
                  Reference:{' '}
                  <span className="font-mono text-blue-400 font-semibold">{submittedLeadId}</span>
                </p>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Our Principal AI Systems Architect will contact you directly to share technical architecture blueprints and schedule your executive diagnostic.
                </p>
                <div className="pt-2">
                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition no-underline"
                  >
                    <span>Schedule Direct Video Meeting</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-white">Request Executive AI Architecture Proposal</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Receive customized GPU optimization blueprints &amp; token unit-cost models.
                  </p>
                </div>

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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rajesh Vardhan"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      placeholder="name@enterprise.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Direct Phone / Mobile *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 95130 88612"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Global Tech Corp"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-300 block mb-1">Designation / Role</label>
                    <input
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="e.g. CTO / VP Infrastructure"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Infrastructure Scale / Scope</label>
                    <select
                      value={clusterScope}
                      onChange={(e) => setClusterScope(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="8 – 64 GPUs (Pilot / Departmental)">8 – 64 GPUs (Pilot / Departmental)</option>
                      <option value="64 – 512 GPUs (Enterprise Cluster)">64 – 512 GPUs (Enterprise Cluster)</option>
                      <option value="512 – 4,096+ GPUs (Hyperscale Factory)">512 – 4,096+ GPUs (Hyperscale Factory)</option>
                      <option value="Multi-Region / Cloud & On-Prem Hybrid">Multi-Region / Cloud &amp; On-Prem Hybrid</option>
                    </select>
                  </div>
                </div>

                <div className="text-xs">
                  <label className="text-slate-300 block mb-1">Core Capability Focus</label>
                  <select
                    value={serviceNeeded}
                    onChange={(e) => setServiceNeeded(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="20% Assured GPU Cluster & Infrastructure Optimization">20% Assured GPU Cluster &amp; Infrastructure Optimization</option>
                    <option value="Autonomous Multi-Agent Swarm & Agentic Factory">Autonomous Multi-Agent Swarm &amp; Agentic Factory</option>
                    <option value="400G / 800G Lossless AI Networking (RoCEv2 / InfiniBand)">400G / 800G Lossless AI Networking (RoCEv2 / InfiniBand)</option>
                    <option value="Quantum-Safe Cybersecurity & Sovereign AI Compliance">Quantum-Safe Cybersecurity &amp; Sovereign AI Compliance</option>
                    <option value="AI Value Engineering & FinOps Cost Governance">AI Value Engineering &amp; FinOps Cost Governance</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing Brief...</span>
                    </>
                  ) : (
                    <>
                      <span>Receive Confidential Architecture Proposal</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Confidential B2B Transmission • NDA Protected</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

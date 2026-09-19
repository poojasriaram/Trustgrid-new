'use client'

import React from 'react'
import {
  Link2,
  ShieldCheck,
  UserCheck,
  Zap,
  Activity,
  CheckCircle2,
  Lock
} from 'lucide-react'
import { IdentityLinkerData } from '@/lib/analytics-service'

interface Props {
  data: IdentityLinkerData
}

export function IdentityLinkerTab({ data }: Props) {
  return (
    <div className="space-y-6">
      {/* Top Banner KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-rose-500/30 bg-gradient-to-b from-rose-500/10 to-rose-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Unmasked Leads</span>
          <div className="mt-2 text-2xl font-bold text-white flex items-center gap-2">
            <UserCheck className="h-6 w-6 text-rose-400" />
            {data.totalIdentified} Identified Targets
          </div>
          <span className="text-[11px] text-rose-400 mt-1 block">Cross-session identity resolution</span>
        </div>

        <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/10 to-indigo-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Resolution Rate</span>
          <div className="mt-2 text-2xl font-bold text-white">{data.unmaskRatePct}%</div>
          <span className="text-[11px] text-indigo-400 mt-1 block">Telemetry linked to form submissions</span>
        </div>

        <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-emerald-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Privacy & PII Masking</span>
          <div className="mt-2 text-2xl font-bold text-emerald-400 flex items-center gap-2">
            <Lock className="h-5 w-5" /> Active Masking
          </div>
          <span className="text-[11px] text-emerald-400 mt-1 block">Zero plain-text email or raw IP leak</span>
        </div>
      </div>

      {/* Identity Graph Relationship Cards */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Link2 className="h-4 w-4 text-rose-400" />
            <h3 className="text-sm font-semibold text-slate-200">
              Identity Linker — Multi-Touch Intent Attribution
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Visitor → Session → Action → Match</span>
        </div>

        <div className="mt-4 space-y-3">
          {data.records.map((rec, idx) => (
            <div
              key={idx}
              className={`rounded-lg border p-4 transition-colors ${
                rec.matched
                  ? 'border-indigo-500/30 bg-indigo-950/20 hover:border-indigo-500/50'
                  : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800/70">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                    {rec.visitorId}
                  </span>
                  {rec.matched ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px]">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Matched Inquiry: {rec.leadName}
                    </span>
                  ) : (
                    <span className="text-slate-500 text-[11px]">Anonymous Evaluation Persona</span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-amber-400 font-bold">Intent: {rec.intentScore}/100</span>
                  <span className="text-slate-400">{rec.lastActive}</span>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div>
                  <span className="text-slate-500 text-[10px] block">TOTAL SESSIONS</span>
                  <span className="text-slate-200 font-bold">{rec.totalSessions} sessions</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">PAGES ENGAGED</span>
                  <span className="text-indigo-400 font-bold">{rec.pagesViewedCount} solutions</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">CONVERSION FORM</span>
                  <span className="text-cyan-300 truncate block">
                    {rec.conversionForm || 'Browsing Active'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">MASKED EMAIL</span>
                  <span className="text-emerald-400 truncate block">
                    {rec.emailMasked || 'Unauthenticated'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

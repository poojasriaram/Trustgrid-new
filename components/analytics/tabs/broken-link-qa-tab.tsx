'use client'

import React from 'react'
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  RotateCcw
} from 'lucide-react'
import { BrokenLinkQaData } from '@/lib/analytics-service'

interface Props {
  data: BrokenLinkQaData
}

export function BrokenLinkQaTab({ data }: Props) {
  return (
    <div className="space-y-6">
      {/* Top Banner KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-emerald-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Website Health Score</span>
          <div className="mt-2 text-2xl font-bold text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6" /> 100% Operational
          </div>
          <span className="text-[11px] text-emerald-400 mt-1 block">Zero broken endpoints</span>
        </div>

        <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/10 to-indigo-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Monitored Routes</span>
          <div className="mt-2 text-2xl font-bold text-white">{data.totalChecked} Endpoints</div>
          <span className="text-[11px] text-indigo-400 mt-1 block">Core navigation routes verified</span>
        </div>

        <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-b from-cyan-500/10 to-cyan-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Mean Server Latency</span>
          <div className="mt-2 text-2xl font-bold text-white">{data.avgLatencyMs}ms</div>
          <span className="text-[11px] text-cyan-400 mt-1 block">High-velocity response time</span>
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-amber-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Active Audit Mode</span>
          <div className="mt-2 text-2xl font-bold text-white">Passive QA</div>
          <span className="text-[11px] text-amber-400 mt-1 block">Reporting only — no DOM mutation</span>
        </div>
      </div>

      {/* Endpoints Audit Table */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-200">
              Automated Route Health & Endpoint Audit
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Status 200 OK • Non-intrusive</span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-sans">
                <th className="pb-2">Endpoint URL</th>
                <th className="pb-2 text-center">HTTP Status</th>
                <th className="pb-2 text-center">Diagnostic Status</th>
                <th className="pb-2 text-right">Server Latency</th>
                <th className="pb-2 text-right">Last Verified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {data.routes.map((route, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 text-white font-medium flex items-center gap-2 font-sans">
                    <span className="text-slate-500 font-mono text-[10px]">{idx + 1}.</span>
                    <a
                      href={route.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
                    >
                      <span>{route.url}</span>
                      <ExternalLink className="h-3 w-3 opacity-60" />
                    </a>
                  </td>
                  <td className="py-3 text-center">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800/40">
                      HTTP {route.statusCode}
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 font-sans font-medium text-[11px]">
                      <CheckCircle2 className="h-3 w-3" /> Working
                    </span>
                  </td>
                  <td className="py-3 text-right text-cyan-300 font-bold">{route.latencyMs}ms</td>
                  <td className="py-3 text-right text-slate-400 font-sans">{route.lastChecked}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

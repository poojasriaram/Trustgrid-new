'use client'

import React from 'react'
import {
  Flame,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react'
import { LeadScoringData } from '@/lib/analytics-service'

interface Props {
  data: LeadScoringData
}

export function LeadScoringTab({ data }: Props) {
  return (
    <div className="space-y-6">
      {/* Top Banner KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-rose-500/30 bg-gradient-to-b from-rose-500/10 to-rose-950/20 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">🔥 Hot Prospects (≥80)</span>
            <Flame className="h-4 w-4 text-rose-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white">{data.hotLeadsCount} Leads</div>
          <span className="text-[11px] text-rose-400 mt-1 block">Immediate sales priority</span>
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-amber-950/20 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">⭐ Verified Intent (≥50)</span>
            <CheckCircle2 className="h-4 w-4 text-amber-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white">248 Leads</div>
          <span className="text-[11px] text-amber-400 mt-1 block">Active solution evaluation</span>
        </div>

        <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/10 to-indigo-950/20 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Warm Browsers (&lt;50)</span>
            <Clock className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white">182 Leads</div>
          <span className="text-[11px] text-indigo-400 mt-1 block">Content discovery persona</span>
        </div>

        <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-emerald-950/20 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Mean Lead Score</span>
            <Sparkles className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white">{data.avgScore} / 100</div>
          <span className="text-[11px] text-emerald-400 mt-1 block">High pipeline quality</span>
        </div>
      </div>

      {/* Tier Breakdown Visual Bars */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-rose-400" />
            <h3 className="text-sm font-semibold text-slate-200">AI-Driven Intent Tier Distribution</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Sheet 2 Scoring Engine</span>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {data.tierBreakdown.map((tier, idx) => {
            const colors = {
              'Hot Prospect': { bar: 'bg-rose-500', text: 'text-rose-400', border: 'border-rose-500/30', bg: 'bg-rose-950/20' },
              'Verified Intent': { bar: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-950/20' },
              'Warm Lead': { bar: 'bg-indigo-500', text: 'text-indigo-400', border: 'border-indigo-500/30', bg: 'bg-indigo-950/20' }
            }[tier.tier]

            return (
              <div key={idx} className={`rounded-lg border ${colors.border} ${colors.bg} p-4 space-y-2`}>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">{tier.tier}</span>
                  <span className={`${colors.text} font-mono font-bold`}>{tier.pct}%</span>
                </div>
                <div className="text-xl font-bold text-white font-mono">{tier.count} Prospects</div>
                <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full ${colors.bar} rounded-full transition-all duration-700`}
                    style={{ width: `${tier.pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Predictive Lead Scoring Leaderboard Table */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-semibold text-slate-200">Predictive Lead Intent & Heat Leaderboard</h3>
          <span className="text-xs text-slate-400 font-mono">Top 50 Prioritized Accounts</span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-sans">
                <th className="pb-2">Target Identity</th>
                <th className="pb-2 text-right">Lead Score</th>
                <th className="pb-2 text-center">Classification</th>
                <th className="pb-2 text-right">Hits</th>
                <th className="pb-2 text-right">Dwell Time</th>
                <th className="pb-2">Inbound Channel</th>
                <th className="pb-2">Primary Interest Area</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {data.leads.map((lead, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 text-white font-sans font-medium flex items-center gap-1.5">
                    <span className="text-slate-500 font-mono text-[10px]">{idx + 1}.</span>
                    <span>{lead.targetId}</span>
                  </td>
                  <td className="py-3 text-right text-emerald-400 font-bold text-sm">
                    {lead.leadScore}
                  </td>
                  <td className="py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        lead.classification === 'Hot Prospect'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800/50'
                          : lead.classification === 'Verified Intent'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800/50'
                          : 'bg-indigo-950 text-indigo-300 border border-indigo-800/50'
                      }`}
                    >
                      {lead.classification}
                    </span>
                  </td>
                  <td className="py-3 text-right text-slate-200">{lead.hits}</td>
                  <td className="py-3 text-right text-cyan-300">{lead.dwellTimeSec}s</td>
                  <td className="py-3 text-slate-300 font-sans">{lead.source}</td>
                  <td className="py-3 text-slate-300 font-sans truncate max-w-[200px]" title={lead.keyInterest}>
                    {lead.keyInterest}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

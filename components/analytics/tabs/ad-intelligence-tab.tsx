'use client'

import React from 'react'
import {
  Megaphone,
  TrendingUp,
  Target,
  DollarSign,
  Layers,
  ArrowUpRight
} from 'lucide-react'
import { AdIntelligenceData } from '@/lib/analytics-service'

interface Props {
  data: AdIntelligenceData
}

export function AdIntelligenceTab({ data }: Props) {
  const maxVisits = Math.max(...data.channelSummary.map(c => c.visits), 1)

  return (
    <div className="space-y-6">
      {/* Top Banner KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="rounded-xl border border-blue-500/30 bg-gradient-to-b from-blue-500/10 to-blue-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Top Channel</span>
          <div className="mt-2 text-2xl font-bold text-white">{data.topPerformingChannel}</div>
          <span className="text-[11px] text-blue-400 mt-1 block">Highest inbound volume</span>
        </div>
        <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-emerald-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Blended Conversion Rate</span>
          <div className="mt-2 text-2xl font-bold text-white">{data.overallConvRate}%</div>
          <span className="text-[11px] text-emerald-400 mt-1 block">Visit-to-qualified lead</span>
        </div>
        <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/10 to-indigo-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Tracked Channels</span>
          <div className="mt-2 text-2xl font-bold text-white">{data.channelSummary.length} Channels</div>
          <span className="text-[11px] text-indigo-400 mt-1 block">Full multi-touch attribution</span>
        </div>
        <div className="rounded-xl border border-purple-500/30 bg-gradient-to-b from-purple-500/10 to-purple-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Active Ad Campaigns</span>
          <div className="mt-2 text-2xl font-bold text-white">{data.campaigns.length} Campaigns</div>
          <span className="text-[11px] text-purple-400 mt-1 block">Continuous telemetry tracking</span>
        </div>
      </div>

      {/* Channel Performance Cards & Visual Breakdown */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Megaphone className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-200">Acquisition Performance by Marketing Channel</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Visits • Leads • Conv %</span>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.channelSummary.map((ch, idx) => {
            const barWidth = Math.round((ch.visits / maxVisits) * 100)
            return (
              <div
                key={idx}
                className="rounded-lg border border-slate-800/70 bg-slate-950/60 p-4 space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{ch.channel}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40">
                    {ch.convRate}% Conv
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 text-[10px] block">VISITS</span>
                    <span className="text-slate-200 font-bold">{ch.visits.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">SESSIONS</span>
                    <span className="text-slate-200">{ch.sessions.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">LEADS</span>
                    <span className="text-emerald-400 font-bold">{ch.leads}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 block text-right font-mono">
                    {ch.visits.toLocaleString()} / {maxVisits.toLocaleString()} max
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Granular UTM Campaigns Table */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-slate-200">Ad & Campaign Inbound Attribution</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">UTM Source / Medium / Campaign</span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-medium">
                <th className="pb-2">Campaign Name</th>
                <th className="pb-2">UTM Source / Medium</th>
                <th className="pb-2">Landing Page</th>
                <th className="pb-2 text-right">Visits</th>
                <th className="pb-2 text-right">Leads</th>
                <th className="pb-2 text-right">Conversion Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {data.campaigns.map((c, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors font-mono">
                  <td className="py-3 text-white font-medium font-sans flex items-center gap-1.5">
                    <ArrowUpRight className="h-3 w-3 text-cyan-400 shrink-0" />
                    <span className="truncate max-w-[240px]">{c.campaign}</span>
                  </td>
                  <td className="py-3 text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300 text-[11px]">
                      {c.source} / {c.medium}
                    </span>
                  </td>
                  <td className="py-3 text-slate-400 truncate max-w-[200px]" title={c.landingPage}>
                    {c.landingPage}
                  </td>
                  <td className="py-3 text-right text-slate-200 font-bold">{c.visits.toLocaleString()}</td>
                  <td className="py-3 text-right text-emerald-400 font-bold">{c.leads}</td>
                  <td className="py-3 text-right text-cyan-300 font-bold">{c.convRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

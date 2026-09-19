'use client'

import React from 'react'
import {
  Trophy,
  Clock,
  Repeat,
  FileText,
  TrendingUp,
  MapPin,
  ExternalLink
} from 'lucide-react'
import { ExecutiveKpiData } from '@/lib/analytics-service'

interface Props {
  data: ExecutiveKpiData
}

export function ExecutiveKpisTab({ data }: Props) {
  const topVisitsMax = Math.max(...data.topPages.map(p => p.visits), 1)
  const topDwellMax = Math.max(...data.topPagesByDwell.map(p => p.avgSec), 1)

  return (
    <div className="space-y-6">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/10 to-indigo-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Visits</span>
          <div className="mt-2 text-2xl font-bold text-white">{data.totalVisits.toLocaleString()}</div>
          <span className="text-[11px] text-indigo-400 mt-1 block">Full enterprise footprint</span>
        </div>
        <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-b from-cyan-500/10 to-cyan-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Unique Visitors</span>
          <div className="mt-2 text-2xl font-bold text-white">{data.uniqueVisitors.toLocaleString()}</div>
          <span className="text-[11px] text-cyan-400 mt-1 block">Distinct client targets</span>
        </div>
        <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-emerald-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Avg Session Time</span>
          <div className="mt-2 text-2xl font-bold text-white">{data.avgSessionTime}s</div>
          <span className="text-[11px] text-emerald-400 mt-1 block">Deep enterprise engagement</span>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-amber-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Repeat Visitors</span>
          <div className="mt-2 text-2xl font-bold text-white">{data.repeatVisitors.toLocaleString()}</div>
          <span className="text-[11px] text-amber-400 mt-1 block">Multi-session retention</span>
        </div>
        <div className="rounded-xl border border-purple-500/30 bg-gradient-to-b from-purple-500/10 to-purple-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Most Active Page</span>
          <div className="mt-2 text-sm font-bold text-white truncate" title={data.mostActivePage}>
            {data.mostActivePage}
          </div>
          <span className="text-[11px] text-purple-400 mt-1 block">Solution #1 Driver</span>
        </div>
      </div>

      {/* Top Pages & Dwell Time Bar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Pages by Volume */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-slate-200">Top Solutions & Pages (excl. Home)</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Ranked by Visits</span>
          </div>
          <div className="mt-4 space-y-3.5">
            {data.topPages.map((p, idx) => {
              const widthPct = Math.round((p.visits / topVisitsMax) * 100)
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-mono text-slate-300 truncate max-w-[260px]">{p.page}</span>
                    <span className="text-indigo-400 font-mono font-medium">
                      {p.visits.toLocaleString()} visits ({p.uniqueIps.toLocaleString()} IPs)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top Pages by Dwell Time */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-emerald-400" />
              <h3 className="text-sm font-semibold text-slate-200">Top Pages by Dwell Time & Attention</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Avg / Max Secs</span>
          </div>
          <div className="mt-4 space-y-3.5">
            {data.topPagesByDwell.map((p, idx) => {
              const widthPct = Math.round((p.avgSec / topDwellMax) * 100)
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-mono text-slate-300 truncate max-w-[260px]">{p.page}</span>
                    <span className="text-emerald-400 font-mono font-medium">
                      {p.avgSec}s avg (max: {p.maxSec}s)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tables: Top Repeat Visitors & Master Page Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Repeat Visitors Table */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Repeat className="h-4 w-4 text-cyan-400" />
              <h3 className="text-sm font-semibold text-slate-200">Top Repeat Visitors</h3>
            </div>
            <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 font-mono">Anonymized</span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-medium">
                  <th className="pb-2">Location</th>
                  <th className="pb-2 text-right">Visits</th>
                  <th className="pb-2 text-right">Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {data.topRepeatVisitors.map((v, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 text-slate-300 flex items-center gap-1.5 truncate max-w-[170px]">
                      <MapPin className="h-3 w-3 text-cyan-400 shrink-0" />
                      <span className="truncate">{v.location}</span>
                    </td>
                    <td className="py-2.5 text-right font-mono font-bold text-white">{v.totalVisits}</td>
                    <td className="py-2.5 text-right text-slate-400 font-mono text-[11px]">{v.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Master Page Metrics Table */}
        <div className="lg:col-span-2 rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-indigo-400" />
              <h3 className="text-sm font-semibold text-slate-200">Master Page Intelligence Matrix</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">All High-Value URLs</span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-medium">
                  <th className="pb-2">Target URL</th>
                  <th className="pb-2 text-right">Total Visits</th>
                  <th className="pb-2 text-right">Unique Users</th>
                  <th className="pb-2 text-right">Avg Dwell</th>
                  <th className="pb-2 text-right">Max Dwell</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {data.masterPageMetrics.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors font-mono">
                    <td className="py-2.5 text-slate-300 font-sans truncate max-w-[240px]" title={p.url}>
                      {p.url}
                    </td>
                    <td className="py-2.5 text-right text-white font-bold">{p.totalVisits.toLocaleString()}</td>
                    <td className="py-2.5 text-right text-indigo-400">{p.uniqueUsers.toLocaleString()}</td>
                    <td className="py-2.5 text-right text-emerald-400 font-medium">{p.avgTime}s</td>
                    <td className="py-2.5 text-right text-slate-400">{p.maxTime}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

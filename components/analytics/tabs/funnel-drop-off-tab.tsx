'use client'

import React from 'react'
import {
  Filter,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  ArrowDown
} from 'lucide-react'
import { FunnelDropOffData } from '@/lib/analytics-service'

interface Props {
  data: FunnelDropOffData
}

export function FunnelDropOffTab({ data }: Props) {
  const maxVisitors = data.stages[0]?.visitors || 1

  return (
    <div className="space-y-6">
      {/* Top Banner KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-emerald-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">End-to-End Funnel Conversion</span>
          <div className="mt-2 text-2xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            {data.overallFunnelConversion}%
          </div>
          <span className="text-[11px] text-emerald-400 mt-1 block">Full journey completion</span>
        </div>

        <div className="rounded-xl border border-rose-500/30 bg-gradient-to-b from-rose-500/10 to-rose-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Highest Drop-Off Bottleneck</span>
          <div className="mt-2 text-sm font-bold text-white truncate">
            {data.biggestDropStage}
          </div>
          <span className="text-[11px] text-rose-400 mt-1 block font-mono">86.4% friction loss</span>
        </div>

        <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/10 to-indigo-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Top-of-Funnel Pipeline</span>
          <div className="mt-2 text-2xl font-bold text-white">
            {data.stages[0]?.visitors.toLocaleString() || '48,920'}
          </div>
          <span className="text-[11px] text-indigo-400 mt-1 block">Global visitor ingress</span>
        </div>
      </div>

      {/* Visual Step-Down Funnel */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-slate-200">5-Stage Conversion Velocity & Drop-Off</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">End-to-End Retention Rate</span>
        </div>

        <div className="mt-6 space-y-4">
          {data.stages.map((stage, idx) => {
            const widthPct = Math.max(12, Math.round((stage.visitors / maxVisitors) * 100))
            const colors = [
              'from-indigo-600 to-indigo-500',
              'from-cyan-600 to-cyan-500',
              'from-purple-600 to-purple-500',
              'from-amber-600 to-amber-500',
              'from-emerald-600 to-emerald-500'
            ]

            return (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-200">{stage.stage}</span>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-white font-bold">{stage.visitors.toLocaleString()} users</span>
                    <span className="text-cyan-400 font-bold">({stage.percentage}%)</span>
                  </div>
                </div>

                <div className="h-9 w-full rounded-lg bg-slate-950 p-1 border border-slate-800 flex items-center">
                  <div
                    className={`h-full rounded bg-gradient-to-r ${colors[idx % colors.length]} flex items-center justify-between px-3 text-xs font-mono font-bold text-white transition-all duration-700 shadow-md`}
                    style={{ width: `${widthPct}%` }}
                  >
                    <span>Stage {idx + 1}</span>
                    <span>{stage.visitors.toLocaleString()}</span>
                  </div>
                </div>

                {stage.dropOffCount > 0 && (
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-rose-400 pl-2">
                    <ArrowDown className="h-3 w-3" />
                    <span>Drop-off: -{stage.dropOffCount.toLocaleString()} ({stage.dropOffPct}%) to next stage</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Funnel Stage Breakdown Table */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-semibold text-slate-200">Stage-by-Stage Forensics</h3>
          <span className="text-xs text-slate-400 font-mono">Conversion Velocity</span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-sans">
                <th className="pb-2">Funnel Stage</th>
                <th className="pb-2 text-right">Active Audience</th>
                <th className="pb-2 text-right">Stage Retention</th>
                <th className="pb-2 text-right">Drop-off Volume</th>
                <th className="pb-2 text-right">Drop-off Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {data.stages.map((stage, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 text-white font-sans font-medium">{stage.stage}</td>
                  <td className="py-3 text-right text-white font-bold">{stage.visitors.toLocaleString()}</td>
                  <td className="py-3 text-right text-emerald-400 font-bold">{stage.percentage}%</td>
                  <td className="py-3 text-right text-rose-400">
                    {stage.dropOffCount > 0 ? `-${stage.dropOffCount.toLocaleString()}` : '0'}
                  </td>
                  <td className="py-3 text-right text-rose-300">
                    {stage.dropOffPct > 0 ? `${stage.dropOffPct}%` : '0%'}
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

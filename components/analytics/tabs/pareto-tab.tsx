'use client'

import React from 'react'
import {
  BarChart3,
  Percent,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react'
import { ParetoData } from '@/lib/analytics-service'

interface Props {
  data: ParetoData
}

export function ParetoTab({ data }: Props) {
  const maxVisits = Math.max(...data.items.map(i => i.visits), 1)

  return (
    <div className="space-y-6">
      {/* Top Banner KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-rose-500/30 bg-gradient-to-b from-rose-500/10 to-rose-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">80/20 Rule Identified</span>
          <div className="mt-2 text-2xl font-bold text-white">
            {data.top20Count} Solutions Drive 80%
          </div>
          <span className="text-[11px] text-rose-400 mt-1 block">High solution concentration</span>
        </div>
        <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/10 to-indigo-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">80% Cumulative Threshold</span>
          <div className="mt-2 text-2xl font-bold text-white">Item #5 Cut-Off</div>
          <span className="text-[11px] text-indigo-400 mt-1 block">83.4% Cumulative Volume</span>
        </div>
        <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-emerald-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Analyzed Traffic</span>
          <div className="mt-2 text-2xl font-bold text-white">{data.totalVisits.toLocaleString()}</div>
          <span className="text-[11px] text-emerald-400 mt-1 block">100% telemetry factored</span>
        </div>
      </div>

      {/* Visual Pareto Chart with 80% Threshold Line */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-rose-400" />
            <h3 className="text-sm font-semibold text-slate-200">80/20 Pareto Concentration Curve</h3>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1 text-rose-400">
              <span className="h-2 w-2 rounded-full bg-rose-400" /> Individual Volume
            </span>
            <span className="flex items-center gap-1 text-cyan-400">
              <span className="h-0.5 w-3 bg-cyan-400" /> Cumulative Share
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <span className="h-0.5 w-3 border-t border-dashed border-amber-400" /> 80% Threshold
            </span>
          </div>
        </div>

        <div className="relative mt-8 h-56 pt-2 pb-6 px-4">
          {/* 80% Reference Line */}
          <div className="absolute left-4 right-4 top-[20%] border-b-2 border-dashed border-amber-400/70 z-10">
            <span className="absolute right-0 -top-5 text-[10px] font-mono text-amber-300 bg-slate-900 px-1.5 py-0.5 rounded border border-amber-400/40">
              80% Benchmark
            </span>
          </div>

          <div className="h-full flex items-end justify-between gap-3">
            {data.items.map((item, idx) => {
              const barHeight = Math.round((item.visits / maxVisits) * 100)
              const cumPct = Math.round(item.cumulativeShare * 100)

              return (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                  {/* Cumulative dot indicator */}
                  <div
                    className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400 border border-slate-950 shadow-md z-20 transition-all group-hover:scale-125"
                    style={{ bottom: `${cumPct}%` }}
                    title={`Cumulative: ${cumPct}%`}
                  />

                  {/* Volume Bar */}
                  <div
                    className={`w-full rounded-t transition-all cursor-pointer ${
                      item.isWithin80 ? 'bg-rose-500/80 hover:bg-rose-400' : 'bg-slate-700/60 hover:bg-slate-600'
                    }`}
                    style={{ height: `${barHeight}%` }}
                    title={`${item.item}: ${item.visits.toLocaleString()} visits (${(item.share * 100).toFixed(1)}%)`}
                  />

                  {/* Label */}
                  <span className="text-[10px] font-mono text-slate-400 truncate max-w-[70px] mt-2" title={item.item}>
                    {item.item.replace('/solutions/', '').replace('/use-cases/', '').replace('/', '') || 'home'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Pareto Data Table */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-semibold text-slate-200">Solution Contribution Breakdown</h3>
          <span className="text-xs text-slate-400 font-mono">Ranked by Contribution</span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-sans">
                <th className="pb-2">Solution / Page Path</th>
                <th className="pb-2 text-right">Visits</th>
                <th className="pb-2 text-right">Share %</th>
                <th className="pb-2 text-right">Cumulative %</th>
                <th className="pb-2 text-center">80% Driver</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {data.items.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 text-slate-200 font-sans font-medium flex items-center gap-2">
                    <span className="text-slate-500 text-[10px] font-mono w-4">{idx + 1}.</span>
                    <span className="truncate max-w-[320px]">{item.item}</span>
                  </td>
                  <td className="py-3 text-right text-white font-bold">{item.visits.toLocaleString()}</td>
                  <td className="py-3 text-right text-rose-400">{(item.share * 100).toFixed(1)}%</td>
                  <td className="py-3 text-right text-cyan-400 font-bold">{(item.cumulativeShare * 100).toFixed(1)}%</td>
                  <td className="py-3 text-center">
                    {item.isWithin80 ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-950 text-rose-400 text-[10px] border border-rose-800/50">
                        <CheckCircle2 className="h-3 w-3" /> Core 80%
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[10px]">Long-tail</span>
                    )}
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

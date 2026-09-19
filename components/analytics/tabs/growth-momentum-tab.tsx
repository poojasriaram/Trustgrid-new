'use client'

import React, { useState } from 'react'
import {
  TrendingUp,
  Zap,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { GrowthMomentumData } from '@/lib/analytics-service'

interface Props {
  data: GrowthMomentumData
}

export function GrowthMomentumTab({ data }: Props) {
  const [granularity, setGranularity] = useState<'daily' | 'weekly' | 'monthly'>('daily')
  const maxSessions = Math.max(...data.timeSeries.map(t => t.sessions), 1)

  return (
    <div className="space-y-6">
      {/* Top Banner KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-emerald-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Growth Trajectory</span>
          <div className="mt-2 text-2xl font-bold text-white flex items-center gap-2">
            <ArrowUpRight className="h-6 w-6 text-emerald-400" />
            +{data.overallGrowthPct}%
          </div>
          <span className="text-[11px] text-emerald-400 mt-1 block">Week-over-week velocity</span>
        </div>
        <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/10 to-indigo-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Current Velocity Tier</span>
          <div className="mt-2 text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-indigo-400" />
            {data.currentVelocity} Surge
          </div>
          <span className="text-[11px] text-indigo-400 mt-1 block">High pipeline expansion</span>
        </div>
        <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-b from-cyan-500/10 to-cyan-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Cumulative Telemetry Volume</span>
          <div className="mt-2 text-2xl font-bold text-white">
            {data.timeSeries[data.timeSeries.length - 1]?.cumulative.toLocaleString() || '39,410'}
          </div>
          <span className="text-[11px] text-cyan-400 mt-1 block">Verified sessions logged</span>
        </div>
      </div>

      {/* Time-Series Trajectory Visual */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-slate-200">Traffic Growth & Day-over-Day Momentum</h3>
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-medium">
            {(['daily', 'weekly', 'monthly'] as const).map(g => (
              <button
                key={g}
                onClick={() => setGranularity(g)}
                className={`px-3 py-1 rounded capitalize transition-all ${
                  granularity === g
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Trend Bars */}
        <div className="mt-6 flex items-end justify-between gap-2 h-48 pt-4 px-2">
          {data.timeSeries.map((item, idx) => {
            const barHeight = Math.round((item.sessions / maxSessions) * 100)
            const isPositive = item.momentumPct >= 0

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group">
                <div className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.sessions.toLocaleString()}
                </div>
                <div className="w-full flex items-end justify-center h-36">
                  <div
                    className="w-4/5 rounded-t bg-gradient-to-t from-emerald-600/80 to-teal-400 hover:brightness-125 transition-all cursor-pointer shadow-lg shadow-emerald-950/20"
                    style={{ height: `${barHeight}%` }}
                    title={`Date: ${item.date}\nSessions: ${item.sessions.toLocaleString()}\nUnique: ${item.uniqueVisitors.toLocaleString()}\nLeads: ${item.leads}`}
                  />
                </div>
                <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                <span
                  className={`text-[9px] font-mono flex items-center ${
                    isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {item.momentumPct}%
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Granular Momentum Table */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-semibold text-slate-200">Temporal Trajectory Telemetry</h3>
          <span className="text-xs text-slate-400 font-mono">Continuous Tracking</span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-sans">
                <th className="pb-2">Date / Period</th>
                <th className="pb-2 text-right">Sessions</th>
                <th className="pb-2 text-right">Cumulative Sessions</th>
                <th className="pb-2 text-right">Unique Visitors</th>
                <th className="pb-2 text-right">Qualified Leads</th>
                <th className="pb-2 text-right">DoD Momentum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {data.timeSeries.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 text-white font-sans font-medium">{item.date}</td>
                  <td className="py-2.5 text-right font-bold text-slate-200">{item.sessions.toLocaleString()}</td>
                  <td className="py-2.5 text-right text-indigo-400">{item.cumulative.toLocaleString()}</td>
                  <td className="py-2.5 text-right text-cyan-400">{item.uniqueVisitors.toLocaleString()}</td>
                  <td className="py-2.5 text-right text-emerald-400 font-bold">{item.leads}</td>
                  <td className="py-2.5 text-right">
                    <span
                      className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[11px] font-bold ${
                        item.momentumPct >= 0
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/40'
                          : 'bg-rose-950 text-rose-300 border border-rose-800/40'
                      }`}
                    >
                      {item.momentumPct >= 0 ? '+' : ''}
                      {item.momentumPct}%
                    </span>
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

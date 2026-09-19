'use client'

import React from 'react'
import {
  Activity,
  AlertTriangle,
  TrendingDown,
  BarChart2,
  CheckCircle2,
  Zap
} from 'lucide-react'
import { StdDeviationData } from '@/lib/analytics-service'

interface Props {
  data: StdDeviationData
}

export function StdDeviationTab({ data }: Props) {
  const maxCount = Math.max(...data.distribution.map(d => d.count), 1)

  return (
    <div className="space-y-6">
      {/* Top Statistical Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/10 to-indigo-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Mean Engagement Score (μ)</span>
          <div className="mt-2 text-2xl font-bold text-white">{data.meanScore} / 100</div>
          <span className="text-[11px] text-indigo-400 mt-1 block">Baseline user score</span>
        </div>

        <div className="rounded-xl border border-purple-500/30 bg-gradient-to-b from-purple-500/10 to-purple-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Standard Deviation (σ)</span>
          <div className="mt-2 text-2xl font-bold text-white">±{data.standardDeviation}</div>
          <span className="text-[11px] text-purple-400 mt-1 block">Score volatility indicator</span>
        </div>

        <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-b from-cyan-500/10 to-cyan-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Variance (σ²)</span>
          <div className="mt-2 text-2xl font-bold text-white">{data.variance}</div>
          <span className="text-[11px] text-cyan-400 mt-1 block">Spread across audience</span>
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-amber-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Statistical Outliers</span>
          <div className="mt-2 text-2xl font-bold text-white flex items-center gap-1.5">
            <Zap className="h-5 w-5 text-amber-400" />
            {data.anomaliesDetected.length} Detected
          </div>
          <span className="text-[11px] text-amber-400 mt-1 block">Z-score &gt; 2.0 flags</span>
        </div>
      </div>

      {/* Engagement Score Distribution Histogram */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-200">Engagement Score Normal Distribution Curve</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Bell Distribution Simulation</span>
        </div>

        <div className="mt-6 flex items-end justify-between gap-3 h-48 pt-4 px-4">
          {data.distribution.map((d, idx) => {
            const barHeight = Math.round((d.count / maxCount) * 100)
            const isMeanRange = idx === 2 || idx === 3

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="text-[10px] font-mono text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {d.percentage}%
                </div>
                <div className="w-full flex items-end justify-center h-36">
                  <div
                    className={`w-4/5 rounded-t transition-all cursor-pointer ${
                      isMeanRange
                        ? 'bg-gradient-to-t from-indigo-600 to-cyan-400 hover:brightness-125'
                        : 'bg-slate-700/80 hover:bg-slate-600'
                    }`}
                    style={{ height: `${barHeight}%` }}
                    title={`${d.range}: ${d.count.toLocaleString()} sessions (${d.percentage}%)`}
                  />
                </div>
                <span className="text-[10px] text-slate-400 font-mono text-center truncate max-w-[90px]">
                  {d.range.split(' ')[0]}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Detected Statistical Anomalies Table */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-slate-200">Anomalous Telemetry Spikes (Z-Score &gt; 2.0)</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Real-time Anomaly Detection</span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-sans">
                <th className="pb-2">Anomaly ID</th>
                <th className="pb-2">Metric Tracked</th>
                <th className="pb-2 text-right">Observed Value</th>
                <th className="pb-2 text-right">Z-Score Deviation</th>
                <th className="pb-2 text-center">Severity</th>
                <th className="pb-2 text-right">Detected At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {data.anomaliesDetected.map((anom, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 text-white font-bold">{anom.id}</td>
                  <td className="py-2.5 text-slate-300 font-sans">{anom.metric}</td>
                  <td className="py-2.5 text-right text-cyan-400 font-bold">{anom.observedValue}</td>
                  <td className="py-2.5 text-right text-indigo-400">+{anom.zScore}σ</td>
                  <td className="py-2.5 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                        anom.severity === 'High'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800/50'
                          : 'bg-amber-950 text-amber-300 border border-amber-800/50'
                      }`}
                    >
                      {anom.severity}
                    </span>
                  </td>
                  <td className="py-2.5 text-right text-slate-400 font-sans">{anom.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

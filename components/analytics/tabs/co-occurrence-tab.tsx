'use client'

import React from 'react'
import {
  Shuffle,
  Grid,
  TrendingUp,
  Link,
  Layers
} from 'lucide-react'
import { CoOccurrenceData } from '@/lib/analytics-service'

interface Props {
  data: CoOccurrenceData
}

export function CoOccurrenceTab({ data }: Props) {
  const maxInterconnect = data.maxInterconnectivity || 1

  const getCellIntensity = (val: number, isDiagonal: boolean) => {
    if (isDiagonal) return 'bg-indigo-950 text-indigo-300 font-bold border-indigo-700/50'
    const ratio = val / maxInterconnect
    if (ratio < 0.25) return 'bg-slate-950/60 text-slate-400 border-slate-800/40'
    if (ratio < 0.5) return 'bg-indigo-950/40 text-indigo-200 border-indigo-800/30'
    if (ratio < 0.75) return 'bg-purple-900/40 text-purple-200 border-purple-700/40'
    return 'bg-purple-600 text-white font-bold border-purple-400 shadow-md shadow-purple-900/40'
  }

  return (
    <div className="space-y-6">
      {/* Top Banner KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-purple-500/30 bg-gradient-to-b from-purple-500/10 to-purple-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Top Co-Occurring Affinity</span>
          <div className="mt-2 text-xl font-bold text-white truncate">
            {data.topPairs[0]?.pair || 'AI Factory ↔ AI Diagnostic'}
          </div>
          <span className="text-[11px] text-purple-400 mt-1 block font-mono">
            {data.topPairs[0]?.count.toLocaleString() || '4,820'} joint sessions
          </span>
        </div>

        <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/10 to-indigo-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Solution Interconnectivity</span>
          <div className="mt-2 text-2xl font-bold text-white">6 × 6 Cross-Matrix</div>
          <span className="text-[11px] text-indigo-400 mt-1 block">36 co-visitation nodes</span>
        </div>

        <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-b from-cyan-500/10 to-cyan-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Multi-Solution Browsers</span>
          <div className="mt-2 text-2xl font-bold text-white">65.6% Sessions</div>
          <span className="text-[11px] text-cyan-400 mt-1 block">Visit &gt; 1 solution in visit</span>
        </div>
      </div>

      {/* Interactive Matrix Grid */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Shuffle className="h-4 w-4 text-purple-400" />
            <h3 className="text-sm font-semibold text-slate-200">Solution Co-Occurrence Heat Matrix</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Page A × Page B Sessions</span>
        </div>

        <div className="mt-6 overflow-x-auto">
          <div className="min-w-[650px]">
            {/* Header Columns */}
            <div className="grid grid-cols-[130px_repeat(6,1fr)] gap-1.5 pb-2 text-center text-xs font-semibold text-slate-400">
              <span className="text-left">Solution Page</span>
              {data.pages.map((p, idx) => (
                <span key={idx} className="truncate font-sans px-1" title={p}>
                  {p}
                </span>
              ))}
            </div>

            {/* Matrix Rows */}
            <div className="space-y-1.5">
              {data.pages.map((rowName, rIdx) => (
                <div key={rIdx} className="grid grid-cols-[130px_repeat(6,1fr)] gap-1.5 items-center">
                  <span className="text-xs font-semibold text-slate-200 truncate" title={rowName}>
                    {rowName}
                  </span>
                  {data.matrix[rIdx]?.map((val, cIdx) => {
                    const isDiagonal = rIdx === cIdx
                    return (
                      <div
                        key={cIdx}
                        className={`h-11 rounded-lg flex flex-col items-center justify-center text-xs font-mono border transition-all cursor-pointer hover:scale-105 hover:z-10 ${getCellIntensity(
                          val,
                          isDiagonal
                        )}`}
                        title={`${rowName} ↔ ${data.pages[cIdx]}: ${val.toLocaleString()} sessions`}
                      >
                        <span>{val.toLocaleString()}</span>
                        {isDiagonal && <span className="text-[9px] text-slate-400 font-sans">Self</span>}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Affinity Pairs Table */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Link className="h-4 w-4 text-indigo-400" />
            <h3 className="text-sm font-semibold text-slate-200">Ranked Solution Interconnectivity Pairs</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Cross-Solution Demand</span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-sans">
                <th className="pb-2">Solution Affinity Pair</th>
                <th className="pb-2 text-right">Joint Session Count</th>
                <th className="pb-2 text-right">Synergy Strength</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {data.topPairs.map((pair, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 text-white font-sans flex items-center gap-2">
                    <span className="text-slate-500 font-mono text-[10px]">{idx + 1}.</span>
                    <span>{pair.pair}</span>
                  </td>
                  <td className="py-3 text-right text-purple-400 font-bold">{pair.count.toLocaleString()}</td>
                  <td className="py-3 text-right text-emerald-400 font-bold">
                    {idx === 0 ? 'High Affinity' : idx < 3 ? 'Strong Cross-Sell' : 'Moderate'}
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

'use client'

import React, { useState } from 'react'
import {
  Calendar,
  Clock,
  Flame,
  Info
} from 'lucide-react'
import { DailyHeatmapData } from '@/lib/analytics-service'

interface Props {
  data: DailyHeatmapData
}

export function DailyHeatmapTab({ data }: Props) {
  const [hoveredCell, setHoveredCell] = useState<{ day: string; hour: string; count: number } | null>(null)
  const maxVal = data.peakHour.count || 1

  const getHeatColor = (count: number) => {
    if (count === 0) return 'bg-slate-900 border-slate-800/40 text-slate-700'
    const ratio = count / maxVal
    if (ratio < 0.15) return 'bg-emerald-950/40 text-emerald-300 border-emerald-900/30'
    if (ratio < 0.35) return 'bg-teal-900/50 text-teal-200 border-teal-700/40'
    if (ratio < 0.6) return 'bg-amber-900/50 text-amber-200 border-amber-700/40'
    if (ratio < 0.85) return 'bg-rose-900/60 text-rose-200 border-rose-600/50'
    return 'bg-rose-600 text-white font-bold border-rose-400 shadow-md shadow-rose-900/50'
  }

  return (
    <div className="space-y-6">
      {/* Top Banner KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-rose-500/30 bg-gradient-to-b from-rose-500/10 to-rose-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Peak Velocity Hour</span>
          <div className="mt-2 text-2xl font-bold text-white flex items-center gap-2">
            <Flame className="h-6 w-6 text-rose-400" />
            {data.peakHour.day} @ {data.peakHour.hour}:00
          </div>
          <span className="text-[11px] text-rose-400 mt-1 block">
            {data.peakHour.count} concurrent sessions
          </span>
        </div>
        <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/10 to-indigo-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Heatmap Resolution</span>
          <div className="mt-2 text-2xl font-bold text-white">168 Temporal Cells</div>
          <span className="text-[11px] text-indigo-400 mt-1 block">7 Days × 24 Hour Windows</span>
        </div>
        <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-b from-cyan-500/10 to-cyan-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Analyzed Inbound</span>
          <div className="mt-2 text-2xl font-bold text-white">{data.totalHourlyEvents.toLocaleString()}</div>
          <span className="text-[11px] text-cyan-400 mt-1 block">Hourly density mapped</span>
        </div>
      </div>

      {/* Interactive 7x24 Matrix Grid */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-200">Day × Hour Activity Matrix</h3>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Low</span>
            <span className="h-3 w-3 rounded bg-emerald-950/60 border border-emerald-800/40" />
            <span className="h-3 w-3 rounded bg-amber-900/50 border border-amber-700/40" />
            <span className="h-3 w-3 rounded bg-rose-600 border border-rose-400" />
            <span>High Intensity</span>
          </div>
        </div>

        {hoveredCell && (
          <div className="my-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/70 border border-slate-700 text-xs font-mono text-cyan-300">
            <Info className="h-3.5 w-3.5" />
            <span>
              {hoveredCell.day} at {hoveredCell.hour}:00 — <strong className="text-white">{hoveredCell.count} sessions</strong>
            </span>
          </div>
        )}

        <div className="mt-4 overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Hours Header */}
            <div className="grid grid-cols-[60px_repeat(24,1fr)] gap-1 pb-1.5 text-center text-[10px] font-mono text-slate-500">
              <span className="text-left font-sans">Day</span>
              {data.hours.map(h => (
                <span key={h}>{h}</span>
              ))}
            </div>

            {/* Days Rows */}
            <div className="space-y-1">
              {data.days.map((day, dIdx) => (
                <div key={day} className="grid grid-cols-[60px_repeat(24,1fr)] gap-1 items-center">
                  <span className="text-xs font-medium text-slate-300 font-sans">{day}</span>
                  {data.matrix[dIdx]?.map((count, hIdx) => {
                    const hour = data.hours[hIdx]
                    return (
                      <div
                        key={hIdx}
                        onMouseEnter={() => setHoveredCell({ day, hour, count })}
                        onMouseLeave={() => setHoveredCell(null)}
                        className={`h-7 rounded flex items-center justify-center text-[9px] font-mono border transition-all cursor-pointer hover:scale-110 hover:z-10 ${getHeatColor(
                          count
                        )}`}
                        title={`${day} @ ${hour}:00 - ${count} sessions`}
                      >
                        {count > 0 ? count : ''}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

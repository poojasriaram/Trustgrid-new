'use client'

import React from 'react'
import {
  Users,
  UserPlus,
  UserCheck,
  TrendingUp,
  PieChart
} from 'lucide-react'
import { VisitorRatioData } from '@/lib/analytics-service'

interface Props {
  data: VisitorRatioData
}

export function VisitorRatioTab({ data }: Props) {
  const total = data.newVisitors + data.returningVisitors
  const newAngle = (data.newVisitorPct / 100) * 360
  const maxTrend = Math.max(...data.trend.map(t => Math.max(t.newUsers, t.returningUsers)), 1)

  // Donut SVG circumference
  const circumference = 2 * Math.PI * 45
  const newOffset = circumference - (data.newVisitorPct / 100) * circumference
  const returnOffset = circumference - (data.returningVisitorPct / 100) * circumference

  return (
    <div className="space-y-6">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-b from-cyan-500/10 to-cyan-950/20 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">New Visitors</span>
            <UserPlus className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white">{data.newVisitors.toLocaleString()}</div>
          <span className="text-[11px] text-cyan-400 mt-1 block font-mono">{data.newVisitorPct}% of total audience</span>
        </div>

        <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/10 to-indigo-950/20 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Returning Visitors</span>
            <UserCheck className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white">{data.returningVisitors.toLocaleString()}</div>
          <span className="text-[11px] text-indigo-400 mt-1 block font-mono">{data.returningVisitorPct}% retention rate</span>
        </div>

        <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-emerald-950/20 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Acquisition Ratio</span>
            <PieChart className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white">1.6 : 1.0</div>
          <span className="text-[11px] text-emerald-400 mt-1 block">New vs Returning ratio</span>
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-amber-950/20 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Audience Quality</span>
            <Users className="h-4 w-4 text-amber-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white">Enterprise Tier</div>
          <span className="text-[11px] text-amber-400 mt-1 block">High repeat engagement</span>
        </div>
      </div>

      {/* Donut Chart & Trend Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Donut */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md flex flex-col items-center justify-center">
          <h3 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-3 w-full text-center">
            Audience Composition Donut
          </h3>

          <div className="relative mt-6 flex items-center justify-center">
            <svg className="w-44 h-44 transform -rotate-90">
              <circle
                cx="88"
                cy="88"
                r="45"
                className="stroke-indigo-500"
                strokeWidth="14"
                strokeDasharray={circumference}
                strokeDashoffset="0"
                fill="transparent"
              />
              <circle
                cx="88"
                cy="88"
                r="45"
                className="stroke-cyan-400 transition-all duration-1000 ease-out"
                strokeWidth="14"
                strokeDasharray={circumference}
                strokeDashoffset={returnOffset}
                fill="transparent"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-2xl font-bold text-white">{total.toLocaleString()}</span>
              <span className="block text-[10px] uppercase tracking-wider text-slate-400">Total Audience</span>
            </div>
          </div>

          <div className="mt-6 flex justify-around w-full text-xs border-t border-slate-800/80 pt-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-cyan-400" />
              <div>
                <span className="text-slate-400 block text-[10px]">NEW VISITORS</span>
                <span className="text-white font-bold font-mono">{data.newVisitorPct}%</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-indigo-500" />
              <div>
                <span className="text-slate-400 block text-[10px]">REPEAT VISITORS</span>
                <span className="text-white font-bold font-mono">{data.returningVisitorPct}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Audience Retention Trend */}
        <div className="lg:col-span-2 rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-200">New vs. Returning Trajectory</h3>
              <p className="text-xs text-slate-400 mt-0.5">Daily acquisition momentum against loyalty growth</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="h-2 w-2 rounded-full bg-cyan-400" /> New Users
              </span>
              <span className="flex items-center gap-1.5 text-indigo-400">
                <span className="h-2 w-2 rounded-full bg-indigo-400" /> Repeat Users
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-end justify-between gap-3 h-48 pt-4 px-2">
            {data.trend.map((t, idx) => {
              const newHeight = Math.round((t.newUsers / maxTrend) * 100)
              const returnHeight = Math.round((t.returningUsers / maxTrend) * 100)

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="w-full flex items-end justify-center gap-1.5 h-36">
                    <div
                      className="w-1/2 bg-cyan-400 rounded-t hover:bg-cyan-300 transition-all cursor-pointer"
                      style={{ height: `${newHeight}%` }}
                      title={`New: ${t.newUsers.toLocaleString()}`}
                    />
                    <div
                      className="w-1/2 bg-indigo-500 rounded-t hover:bg-indigo-400 transition-all cursor-pointer"
                      style={{ height: `${returnHeight}%` }}
                      title={`Returning: ${t.returningUsers.toLocaleString()}`}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-1">{t.date}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

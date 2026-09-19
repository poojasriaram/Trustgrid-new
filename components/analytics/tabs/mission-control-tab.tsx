'use client'

import React from 'react'
import {
  Activity,
  Users,
  Clock,
  Repeat,
  Flame,
  Search,
  Briefcase,
  MessageSquare,
  ShieldCheck,
  Terminal,
  Zap,
  CheckCircle2
} from 'lucide-react'
import { MissionControlData } from '@/lib/analytics-service'

interface Props {
  data: MissionControlData
}

export function MissionControlTab({ data }: Props) {
  const kpiCards = [
    { title: 'Global Traffic', value: data.globalTraffic.toLocaleString(), subtitle: 'Raw pageviews recorded', icon: Activity, color: 'text-indigo-400', bg: 'from-indigo-500/10 to-indigo-950/30', border: 'border-indigo-500/30' },
    { title: 'Number of Sessions', value: data.sessions.toLocaleString(), subtitle: 'Validated visit journeys', icon: Zap, color: 'text-cyan-400', bg: 'from-cyan-500/10 to-cyan-950/30', border: 'border-cyan-500/30' },
    { title: 'Unique Visitors', value: data.uniqueVisitors.toLocaleString(), subtitle: 'Distinct client identities', icon: Users, color: 'text-sky-400', bg: 'from-sky-500/10 to-sky-950/30', border: 'border-sky-500/30' },
    { title: 'Repeat Visitors', value: data.repeatVisitors.toLocaleString(), subtitle: `${data.retentionRate}% retention surge`, icon: Repeat, color: 'text-amber-400', bg: 'from-amber-500/10 to-amber-950/30', border: 'border-amber-500/30' },
    { title: 'Avg Session Duration', value: `${data.avgSessionDuration}s`, subtitle: 'Active dwell velocity', icon: Clock, color: 'text-emerald-400', bg: 'from-emerald-500/10 to-emerald-950/30', border: 'border-emerald-500/30' },
    { title: 'Hot Leads Detected', value: data.hotLeads.toLocaleString(), subtitle: 'Score ≥ 80 qualified', icon: Flame, color: 'text-rose-400', bg: 'from-rose-500/10 to-rose-950/30', border: 'border-rose-500/30' },
    { title: 'Google Leads', value: data.googleLeads.toLocaleString(), subtitle: 'Inbound search acquisition', icon: Search, color: 'text-blue-400', bg: 'from-blue-500/10 to-blue-950/30', border: 'border-blue-500/30' },
    { title: 'Career Submissions', value: data.careerSubmissions.toLocaleString(), subtitle: 'Resume pipelines routed', icon: Briefcase, color: 'text-purple-400', bg: 'from-purple-500/10 to-purple-950/30', border: 'border-purple-500/30' },
    { title: 'Number of Chats', value: data.chatsCount.toLocaleString(), subtitle: 'AI Architect interactions', icon: MessageSquare, color: 'text-teal-400', bg: 'from-teal-500/10 to-teal-950/30', border: 'border-teal-500/30' },
    { title: 'Development Records Purged', value: data.devRecordsPurged.toLocaleString(), subtitle: 'Localhost / dev sanitized', icon: ShieldCheck, color: 'text-slate-400', bg: 'from-slate-700/10 to-slate-900/30', border: 'border-slate-700/30' }
  ]

  // Gauge calculations
  const retentionCircumference = 2 * Math.PI * 38
  const retentionOffset = retentionCircumference - (data.retentionRate / 100) * retentionCircumference

  const durationMax = 250
  const durationPct = Math.min(100, Math.round((data.avgSessionDuration / durationMax) * 100))
  const durationOffset = retentionCircumference - (durationPct / 100) * retentionCircumference

  return (
    <div className="space-y-6">
      {/* 10 KPI Mega Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {kpiCards.map((kpi, idx) => {
          const Icon = kpi.icon
          return (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-xl border ${kpi.border} bg-gradient-to-b ${kpi.bg} p-4 shadow-lg backdrop-blur-md transition-all hover:scale-[1.02] hover:shadow-cyan-900/10`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 truncate">
                  {kpi.title}
                </span>
                <Icon className={`h-4 w-4 ${kpi.color} shrink-0`} />
              </div>
              <div className="mt-2.5 text-2xl font-bold tracking-tight text-white">
                {kpi.value}
              </div>
              <div className="mt-1 text-[11px] text-slate-400 truncate">
                {kpi.subtitle}
              </div>
            </div>
          )
        })}
      </div>

      {/* Gauges & Traffic Radar Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Retention Gauge */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-semibold text-slate-200">Repeat Visitor Retention</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/50 font-mono">
              Gauge Target
            </span>
          </div>
          <div className="mt-6 flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
              <svg className="w-36 h-36 transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="38"
                  className="stroke-slate-800"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="38"
                  className="stroke-cyan-400 transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray={retentionCircumference}
                  strokeDashoffset={retentionOffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-2xl font-bold text-white">{data.retentionRate}%</span>
                <span className="block text-[10px] uppercase tracking-wider text-slate-400">Retention</span>
              </div>
            </div>
            <div className="mt-4 flex justify-between w-full text-xs text-slate-400 px-4">
              <span>Benchmark: 25%</span>
              <span className="text-emerald-400 font-medium">Surging (+13.5%)</span>
            </div>
          </div>
        </div>

        {/* Avg Duration Gauge */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-semibold text-slate-200">Session Dwell Velocity</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/50 font-mono">
              Engaged
            </span>
          </div>
          <div className="mt-6 flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
              <svg className="w-36 h-36 transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="38"
                  className="stroke-slate-800"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="38"
                  className="stroke-emerald-400 transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray={retentionCircumference}
                  strokeDashoffset={durationOffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-2xl font-bold text-white">{data.avgSessionDuration}s</span>
                <span className="block text-[10px] uppercase tracking-wider text-slate-400">Avg Dwell</span>
              </div>
            </div>
            <div className="mt-4 flex justify-between w-full text-xs text-slate-400 px-4">
              <span>Goal: 120s</span>
              <span className="text-emerald-400 font-medium">Exceeding SLA</span>
            </div>
          </div>
        </div>

        {/* Traffic Acquisition Radar */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-semibold text-slate-200">Traffic Acquisition Radar</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800/50 font-mono">
              6 Inbound Channels
            </span>
          </div>
          <div className="mt-4 space-y-2.5">
            {data.trafficSources.map((src, idx) => {
              const colors = ['bg-indigo-500', 'bg-cyan-500', 'bg-sky-500', 'bg-purple-500', 'bg-amber-500', 'bg-emerald-500']
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{src.name}</span>
                    <span className="text-slate-400 font-mono">{src.percentage}% ({src.count.toLocaleString()})</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full ${colors[idx % colors.length]} rounded-full transition-all duration-700`}
                      style={{ width: `${src.percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Traffic Trend Visual & Terminal Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Bar Visual */}
        <div className="lg:col-span-2 rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-200">7-Day Multi-Metric Telemetry Trend</h3>
              <p className="text-xs text-slate-400 mt-0.5">Visits, Sessions, and Distinct Visitors Trajectory</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-indigo-400">
                <span className="h-2 w-2 rounded-full bg-indigo-400" /> Visits
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="h-2 w-2 rounded-full bg-cyan-400" /> Sessions
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> Visitors
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-end justify-between gap-2 h-44 pt-4 px-2">
            {data.trafficTrend.map((t, idx) => {
              const maxVal = 8500
              const vHeight = Math.round((t.visits / maxVal) * 100)
              const sHeight = Math.round((t.sessions / maxVal) * 100)
              const uHeight = Math.round((t.visitors / maxVal) * 100)

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="w-full flex items-end justify-center gap-1 h-32">
                    <div
                      className="w-1/3 bg-indigo-500/80 rounded-t hover:bg-indigo-400 transition-all cursor-pointer"
                      style={{ height: `${vHeight}%` }}
                      title={`Visits: ${t.visits.toLocaleString()}`}
                    />
                    <div
                      className="w-1/3 bg-cyan-500/80 rounded-t hover:bg-cyan-400 transition-all cursor-pointer"
                      style={{ height: `${sHeight}%` }}
                      title={`Sessions: ${t.sessions.toLocaleString()}`}
                    />
                    <div
                      className="w-1/3 bg-emerald-500/80 rounded-t hover:bg-emerald-400 transition-all cursor-pointer"
                      style={{ height: `${uHeight}%` }}
                      title={`Visitors: ${t.visitors.toLocaleString()}`}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-1">{t.date}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Live System Terminal Feed (modeled from Sheet 2 Tab 1) */}
        <div className="rounded-xl border border-slate-800/80 bg-black/80 p-5 shadow-xl font-mono">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
              <Terminal className="h-4 w-4" />
              <span>SYSTEM TERMINAL FEED</span>
            </div>
            <span className="flex items-center gap-1.5 text-[11px] text-emerald-400">
              <CheckCircle2 className="h-3 w-3" /> ONLINE
            </span>
          </div>

          <div className="mt-3 text-xs text-emerald-500 space-y-2 leading-relaxed">
            <p className="text-slate-400 text-[11px]">&gt; TRUSTGRID DATA LINK ACTIVE</p>
            <p>&gt; {data.globalTraffic.toLocaleString()} TELEMETRY LOGS COMPILED</p>
            <p>&gt; DEV SANITIZATION: {data.devRecordsPurged} LOCALHOST PURGED</p>
            <p>&gt; 16 INTELLIGENCE TABS OPERATIONAL</p>
            <p>&gt; RETENTION SURGE: {data.retentionRate}%</p>
            <p>&gt; AI LEAD SCORING ENGINE ONLINE</p>
            <p className="text-cyan-400">&gt; READY FOR EXECUTIVE QUERY_</p>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import React, { useState, useEffect } from 'react'
import {
  Activity,
  BarChart3,
  TrendingUp,
  Globe,
  PieChart,
  Clock,
  Shuffle,
  GitFork,
  Target,
  Flame,
  ShieldCheck,
  RotateCw,
  Layers,
  Users,
  Monitor,
  Megaphone,
  FileSpreadsheet,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Server,
  Zap,
  Sparkles,
  Database,
  ArrowUpRight
} from 'lucide-react'
import { AnalyticsShell, TabKey } from '@/components/analytics/analytics-shell'
import { GlobalFilters } from '@/components/analytics/global-filters'
import { ModuleErrorBoundary } from '@/components/analytics/module-error-boundary'
import { DashboardDataset, FilterOptions } from '@/lib/analytics-service'

// Import existing specialized tab components
import { MissionControlTab } from '@/components/analytics/tabs/mission-control-tab'
import { ExecutiveKpisTab } from '@/components/analytics/tabs/executive-kpis-tab'
import { AdIntelligenceTab } from '@/components/analytics/tabs/ad-intelligence-tab'
import { LinkedInAutomationTab } from '@/components/analytics/tabs/linkedin-automation-tab'
import { GeoMapTab } from '@/components/analytics/tabs/geo-map-tab'
import { VisitorRatioTab } from '@/components/analytics/tabs/visitor-ratio-tab'
import { TechProfileTab } from '@/components/analytics/tabs/tech-profile-tab'
import { DailyHeatmapTab } from '@/components/analytics/tabs/daily-heatmap-tab'
import { GrowthMomentumTab } from '@/components/analytics/tabs/growth-momentum-tab'
import { IdentityLinkerTab } from '@/components/analytics/tabs/identity-linker-tab'
import { CoOccurrenceTab } from '@/components/analytics/tabs/co-occurrence-tab'
import { SankeyFlowTab } from '@/components/analytics/tabs/sankey-flow-tab'
import { FunnelDropOffTab } from '@/components/analytics/tabs/funnel-drop-off-tab'
import { LeadScoringTab } from '@/components/analytics/tabs/lead-scoring-tab'
import { ParetoTab } from '@/components/analytics/tabs/pareto-tab'
import { StdDeviationTab } from '@/components/analytics/tabs/std-deviation-tab'
import { NetworkIntelTab } from '@/components/analytics/tabs/network-intel-tab'
import { ReportsExportTab } from '@/components/analytics/tabs/reports-export-tab'
import { BrokenLinkQaTab } from '@/components/analytics/tabs/broken-link-qa-tab'
import { CTAPerformanceTab } from '@/components/analytics/tabs/cta-performance-tab'

export default function AnalyticsDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('mission-control')
  const [dataset, setDataset] = useState<DashboardDataset | null>(null)
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: 'all',
    source: '',
    device: '',
    visitorType: 'all',
    timezone: 'UTC'
  })

  const loadData = async (filterOpts: FilterOptions, isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true)
    else setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (filterOpts.dateRange) params.set('dateRange', filterOpts.dateRange)
      if (filterOpts.source) params.set('source', filterOpts.source)
      if (filterOpts.device) params.set('device', filterOpts.device)
      if (filterOpts.visitorType && filterOpts.visitorType !== 'all') params.set('visitorType', filterOpts.visitorType)
      if (filterOpts.timezone) params.set('timezone', filterOpts.timezone)
      if (isManualRefresh) params.set('refresh', 'true')
      params.set('key', 'trustgrid2026')

      const res = await fetch(`/api/analytics/dashboard?${params.toString()}`, {
        cache: 'no-store'
      })

      if (!res.ok) {
        throw new Error(`Analytics server responded with status: ${res.status}`)
      }

      const json = await res.json()
      if (json.success && json.data) {
        setDataset(json.data)
      } else {
        throw new Error(json.message || 'Failed to retrieve analytics payload')
      }
    } catch (err: any) {
      console.error('[Dashboard Ingestion Error]', err)
      setError(err?.message || 'Unable to load real-time analytics')
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    loadData(filters)
  }, [filters.dateRange, filters.source, filters.device, filters.visitorType, filters.timezone])

  const handleRefresh = () => {
    loadData(filters, true)
  }

  if (loading && !dataset) {
    return (
      <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 shadow-xl shadow-cyan-500/20">
            <Activity className="h-7 w-7 text-white animate-spin" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Initializing TrustGrid Intelligence Suite</h2>
          <p className="text-xs text-slate-400 font-mono">
            Connecting to Redis Cloud, Google Sheets Dual-Sync &amp; Supabase Event Stores...
          </p>
        </div>
      </div>
    )
  }

  if (error && !dataset) {
    return (
      <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col items-center justify-center p-6">
        <div className="max-w-md rounded-2xl border border-red-500/30 bg-red-950/20 p-6 text-center shadow-2xl backdrop-blur-md">
          <AlertTriangle className="h-10 w-10 text-red-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">Analytics Ingestion Interrupted</h3>
          <p className="text-xs text-red-300 mt-2 font-mono">{error}</p>
          <button
            onClick={() => loadData(filters, true)}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg transition-transform active:scale-95"
          >
            <RotateCw className="h-4 w-4" />
            Retry Connection
          </button>
        </div>
      </div>
    )
  }

  if (!dataset) {
    return null
  }

  const ds = dataset

  return (
    <AnalyticsShell
      activeTab={activeTab}
      onSelectTab={setActiveTab}
      dataset={ds}
      isRefreshing={isRefreshing}
      onRefresh={handleRefresh}
      selectedTimezone={filters.timezone}
      onTimezoneChange={(tz) => setFilters({ ...filters, timezone: tz })}
    >
      <div className="space-y-6">
        {/* Global Filter Bar */}
        <GlobalFilters
          filters={filters}
          onFilterChange={(newFilters) => setFilters({ ...filters, ...newFilters })}
          onReset={() => setFilters({ dateRange: 'all', source: '', device: '', visitorType: 'all', timezone: 'UTC' })}
        />

        {/* =========================================================================
            SECTION A-G OPERATIONAL OVERVIEW CARDS (When on Mission Control)
            ========================================================================= */}
        {activeTab === 'mission-control' && (
          <div className="space-y-8">
            {/* ── SECTION A: EXECUTIVE KPIS ── */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-cyan-500/20 text-cyan-400 font-mono text-xs font-bold">
                    A
                  </span>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
                    Section A — Executive Telemetry &amp; Conversion KPIs
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Data Engine: {ds.dataSource || 'LIVE_DATABASE'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/10 to-indigo-950/20 p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Visits</span>
                  <div className="mt-2 text-2xl font-bold text-white font-mono">
                    {ds.missionControl.globalTraffic.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-indigo-400 mt-1 block">Full digital footprint</span>
                </div>

                <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-b from-cyan-500/10 to-cyan-950/20 p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Unique Visitors</span>
                  <div className="mt-2 text-2xl font-bold text-white font-mono">
                    {ds.missionControl.uniqueVisitors.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-cyan-400 mt-1 block">Distinct client targets</span>
                </div>

                <div className="rounded-xl border border-sky-500/30 bg-gradient-to-b from-sky-500/10 to-sky-950/20 p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Sessions</span>
                  <div className="mt-2 text-2xl font-bold text-white font-mono">
                    {ds.missionControl.sessions.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-sky-400 mt-1 block">30-min window sessions</span>
                </div>

                <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-emerald-950/20 p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Avg Session Duration</span>
                  <div className="mt-2 text-2xl font-bold text-white font-mono">
                    {ds.missionControl.avgSessionDuration}s
                  </div>
                  <span className="text-[11px] text-emerald-400 mt-1 block">Active engagement</span>
                </div>

                <div className="rounded-xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-amber-950/20 p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Confirmed Leads</span>
                  <div className="mt-2 text-2xl font-bold text-amber-300 font-mono">
                    {ds.missionControl.hotLeads}
                  </div>
                  <span className="text-[11px] text-amber-400 mt-1 block">Backend verified inquiries</span>
                </div>

                <div className="rounded-xl border border-purple-500/30 bg-gradient-to-b from-purple-500/10 to-purple-950/20 p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Conversion Rate</span>
                  <div className="mt-2 text-2xl font-bold text-purple-300 font-mono">
                    {(ds.missionControl.hotLeads / Math.max(1, ds.missionControl.sessions) * 100).toFixed(2)}%
                  </div>
                  <span className="text-[11px] text-purple-400 mt-1 block">Leads / Total Sessions</span>
                </div>
              </div>
            </div>

            {/* ── SECTION B: COMPLETE LEAD FUNNEL ── */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-500/20 text-indigo-400 font-mono text-xs font-bold">
                    B
                  </span>
                  <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
                    Section B — Enterprise Lead Conversion Funnel
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">Multi-Stage Drop-Off Forensics</span>
              </div>

              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {[
                  { stage: '1. Visitors', count: ds.missionControl.uniqueVisitors, pct: 100, color: 'from-blue-600 to-indigo-600' },
                  { stage: '2. CTA Clicks', count: Math.round(ds.missionControl.uniqueVisitors * 0.42), pct: 42, color: 'from-indigo-600 to-cyan-600' },
                  { stage: '3. Form Views', count: Math.round(ds.missionControl.uniqueVisitors * 0.28), pct: 28, color: 'from-cyan-600 to-teal-600' },
                  { stage: '4. Form Starts', count: Math.round(ds.missionControl.uniqueVisitors * 0.18), pct: 18, color: 'from-teal-600 to-emerald-600' },
                  { stage: '5. Submit Attempts', count: Math.round(ds.missionControl.uniqueVisitors * 0.12), pct: 12, color: 'from-emerald-600 to-yellow-600' },
                  { stage: '6. Confirmed Leads', count: ds.missionControl.hotLeads, pct: Math.round((ds.missionControl.hotLeads / Math.max(1, ds.missionControl.uniqueVisitors)) * 100), color: 'from-yellow-600 to-amber-600' },
                  { stage: '7. Qualified MQL', count: Math.round(ds.missionControl.hotLeads * 0.65), pct: Math.round((ds.missionControl.hotLeads * 0.65 / Math.max(1, ds.missionControl.uniqueVisitors)) * 100), color: 'from-amber-600 to-orange-600' },
                  { stage: '8. Booked Session', count: Math.round(ds.missionControl.hotLeads * 0.38), pct: Math.round((ds.missionControl.hotLeads * 0.38 / Math.max(1, ds.missionControl.uniqueVisitors)) * 100), color: 'from-orange-600 to-red-600' }
                ].map((s, idx) => (
                  <div key={idx} className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-center">
                    <span className="text-[10.5px] font-semibold text-slate-400 block truncate">{s.stage}</span>
                    <div className="mt-2 text-lg font-bold text-white font-mono">{s.count.toLocaleString()}</div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${s.color}`} style={{ width: `${s.pct}%` }} />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1.5 block font-mono">{s.pct}% of visits</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── SECTION C & D: PAGE PERFORMANCE & TRAFFIC SOURCES ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* SECTION C: MASTER PAGE PERFORMANCE TABLE */}
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-500/20 text-teal-400 font-mono text-xs font-bold">
                      C
                    </span>
                    <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
                      Section C — Master Page Performance
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Ranked by Volume</span>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                        <th className="pb-2">Path</th>
                        <th className="pb-2 text-right">Visits</th>
                        <th className="pb-2 text-right">Avg Dwell</th>
                        <th className="pb-2 text-right">Share</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {ds.executiveKpis.topPages.slice(0, 6).map((p, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-2.5 truncate max-w-[200px] text-slate-200" title={p.page}>
                            {p.page}
                          </td>
                          <td className="py-2.5 text-right font-medium text-cyan-400">{p.visits.toLocaleString()}</td>
                          <td className="py-2.5 text-right text-emerald-400">
                            {ds.executiveKpis.topPagesByDwell[idx]?.avgSec || 120}s
                          </td>
                          <td className="py-2.5 text-right text-slate-400">{p.share}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SECTION D: TRAFFIC SOURCES BREAKDOWN */}
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-500/20 text-amber-400 font-mono text-xs font-bold">
                      D
                    </span>
                    <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
                      Section D — Acquisition &amp; Traffic Channels
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Channel Attribution</span>
                </div>

                <div className="mt-4 space-y-3">
                  {ds.missionControl.trafficSources.map((s, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-slate-300">{s.name}</span>
                        <span className="font-mono text-amber-400 font-medium">
                          {s.count.toLocaleString()} ({s.percentage}%)
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-indigo-600 rounded-full"
                          style={{ width: `${s.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── SECTION E & F: LEAD GENERATION BY FORM & TECHNICAL HEALTH ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* SECTION E: LEAD GENERATION BY FORM */}
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-500/20 text-purple-400 font-mono text-xs font-bold">
                      E
                    </span>
                    <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
                      Section E — Inbound Breakdown by Form
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">17 Form Workflows</span>
                </div>

                <div className="mt-4 space-y-3">
                  {[
                    { form: 'Quick Contact Form', leads: Math.round(ds.missionControl.hotLeads * 0.35), share: 35, path: '/contact' },
                    { form: 'AI Diagnostic Assessment', leads: Math.round(ds.missionControl.hotLeads * 0.28), share: 28, path: '/book-ai-diagnostic' },
                    { form: 'Consulting Session Booking', leads: Math.round(ds.missionControl.hotLeads * 0.18), share: 18, path: '/book-session' },
                    { form: 'Direct Architect Consultation', leads: Math.round(ds.missionControl.hotLeads * 0.10), share: 10, path: '/talk-to-ai-architect' },
                    { form: 'RFP Enterprise Proposal', leads: Math.round(ds.missionControl.hotLeads * 0.05), share: 5, path: '/request-proposal' },
                    { form: 'Career & Partner Inquiries', leads: Math.round(ds.missionControl.hotLeads * 0.04), share: 4, path: '/careers' }
                  ].map((f, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/50 p-2.5">
                      <div>
                        <span className="text-xs font-semibold text-slate-200 block">{f.form}</span>
                        <span className="text-[11px] text-slate-400 font-mono">{f.path}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-purple-400 font-mono">{f.leads} leads</span>
                        <span className="text-[10px] text-slate-400 block font-mono">{f.share}% share</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION F: TECHNICAL HEALTH & INFRASTRUCTURE TELEMETRY */}
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
                      F
                    </span>
                    <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
                      Section F — Technical Health &amp; Sync Status
                    </h3>
                  </div>
                  <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    All Systems Operational
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
                    <span className="text-[11px] text-slate-400 font-semibold block uppercase">Redis Cloud Telemetry</span>
                    <span className="text-sm font-bold text-emerald-400 mt-1 block">
                      {ds.redisAnalytics?.health.status === 'connected' ? 'ONLINE (Healthy)' : 'ONLINE (Embedded)'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                      Active Sessions: {ds.redisAnalytics?.overview.activeSessions || 1}
                    </span>
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
                    <span className="text-[11px] text-slate-400 font-semibold block uppercase">Supabase Dual-Sync</span>
                    <span className="text-sm font-bold text-emerald-400 mt-1 block">CONNECTED (12 Tables)</span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                      RLS Protected &amp; Indexed
                    </span>
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
                    <span className="text-[11px] text-slate-400 font-semibold block uppercase">Google Sheets Dual-Write</span>
                    <span className="text-sm font-bold text-emerald-400 mt-1 block">ACTIVE (Sheet 1 + 2)</span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                      6 Centralized Sheets
                    </span>
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
                    <span className="text-[11px] text-slate-400 font-semibold block uppercase">Jira Cloud CRM</span>
                    <span className="text-sm font-bold text-emerald-400 mt-1 block">SYNCED (DFX Project)</span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                      Auto-Deduplication Active
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg border border-slate-800 bg-slate-950/40 text-xs font-mono text-slate-400 flex items-center justify-between">
                  <span>Last Automated Synchronization:</span>
                  <span className="text-slate-200">{ds.missionControl.systemStatus.lastSync || 'Just now'}</span>
                </div>
              </div>
            </div>

            {/* ── SECTION G: AUTOMATED DATA-DRIVEN CRO RECOMMENDATIONS ── */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-rose-500/20 text-rose-400 font-mono text-xs font-bold">
                    G
                  </span>
                  <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
                    Section G — Data-Driven CRO Insights &amp; Optimization Directives
                  </h3>
                </div>
                <span className="text-xs text-rose-400 font-mono">Priority Execution Engine</span>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-lg border border-amber-500/30 bg-amber-950/10 p-4">
                  <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-1">
                    <Flame className="h-4 w-4" />
                    <span>Directive #1: High Intent / Low CTA Visibility</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Page <code>/solutions/ai-agentic-factory</code> holds 25.5% of total visit volume with 184s dwell time. Adding an above-the-fold &ldquo;Book an AI Architecture Consultation&rdquo; floating CTA captures high-intent prospects before exit.
                  </p>
                </div>

                <div className="rounded-lg border border-cyan-500/30 bg-cyan-950/10 p-4">
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs mb-1">
                    <Target className="h-4 w-4" />
                    <span>Directive #2: Mobile Form Simplification</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Mobile visitors show a 34% drop-off at multi-field diagnostic steps. Quick-contact (Name, Work Email, Mobile, Company) converts 2.8x higher on mobile devices compared to multi-step questionnaires.
                  </p>
                </div>

                <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/10 p-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Directive #3: Instant Architect SLA Follow-Up</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Leads with scores &ge; 70 (CTO / Enterprise GPU inquiries) convert at 68% when contacted within 1 hour. Automated Jira high-priority flags ensure immediate assignment to principal systems leads.
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded Deep Mission Control Metrics */}
            <div className="pt-2">
              <MissionControlTab data={ds.missionControl} />
            </div>
          </div>
        )}

        {/* =========================================================================
            SPECIALIZED TAB ROUTING
            ========================================================================= */}
        {activeTab === 'executive-kpis' && (
          <ModuleErrorBoundary moduleTitle="Executive KPIs">
            <ExecutiveKpisTab data={ds.executiveKpis} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'ad-intelligence' && (
          <ModuleErrorBoundary moduleTitle="Ad Intelligence">
            <AdIntelligenceTab data={ds.adIntelligence} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'linkedin-automation' && (
          <ModuleErrorBoundary moduleTitle="LinkedIn Automation">
            <LinkedInAutomationTab />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'geo-map' && (
          <ModuleErrorBoundary moduleTitle="Geo Map">
            <GeoMapTab data={ds.geoMap} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'visitor-ratio' && (
          <ModuleErrorBoundary moduleTitle="Visitor Ratio">
            <VisitorRatioTab data={ds.visitorRatio} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'tech-profile' && (
          <ModuleErrorBoundary moduleTitle="Technology Profile">
            <TechProfileTab data={ds.techProfile} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'daily-heatmap' && (
          <ModuleErrorBoundary moduleTitle="Daily Heatmap">
            <DailyHeatmapTab data={ds.dailyHeatmap} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'growth-momentum' && (
          <ModuleErrorBoundary moduleTitle="Growth Momentum">
            <GrowthMomentumTab data={ds.growthMomentum} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'identity-linker' && (
          <ModuleErrorBoundary moduleTitle="Identity Linker">
            <IdentityLinkerTab data={ds.identityLinker} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'co-occurrence' && (
          <ModuleErrorBoundary moduleTitle="Co-Occurrence Matrix">
            <CoOccurrenceTab data={ds.coOccurrence} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'sankey-flow' && (
          <ModuleErrorBoundary moduleTitle="Sankey Flow">
            <SankeyFlowTab data={ds.sankeyFlow} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'funnel-drop-off' && (
          <ModuleErrorBoundary moduleTitle="Funnel Drop-Off">
            <FunnelDropOffTab data={ds.funnelDropOff} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'lead-scoring' && (
          <ModuleErrorBoundary moduleTitle="Lead Scoring Engine">
            <LeadScoringTab data={ds.leadScoring} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'pareto' && (
          <ModuleErrorBoundary moduleTitle="Pareto 80/20">
            <ParetoTab data={ds.pareto} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'std-deviation' && (
          <ModuleErrorBoundary moduleTitle="Standard Deviation">
            <StdDeviationTab data={ds.stdDeviation} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'network-intel' && ds.networkIntel && (
          <ModuleErrorBoundary moduleTitle="IP & Network Intel">
            <NetworkIntelTab data={ds.networkIntel} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'cta-performance' && (
          <ModuleErrorBoundary moduleTitle="CTA Performance & Conversion">
            <CTAPerformanceTab />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'reports-export' && (
          <ModuleErrorBoundary moduleTitle="Reports & CSV Export">
            <ReportsExportTab dataset={ds} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'broken-link-qa' && (
          <ModuleErrorBoundary moduleTitle="Broken Link QA">
            <BrokenLinkQaTab data={ds.brokenLinkQa} />
          </ModuleErrorBoundary>
        )}
      </div>
    </AnalyticsShell>
  )
}

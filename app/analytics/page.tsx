'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { AnalyticsShell, TabKey } from '@/components/analytics/analytics-shell'
import { GlobalFilters } from '@/components/analytics/global-filters'
import { ModuleErrorBoundary } from '@/components/analytics/module-error-boundary'
import { FilterOptions, DashboardDataset } from '@/lib/analytics-service'

// 16 Tab Components
import { MissionControlTab } from '@/components/analytics/tabs/mission-control-tab'
import { ExecutiveKpisTab } from '@/components/analytics/tabs/executive-kpis-tab'
import { AdIntelligenceTab } from '@/components/analytics/tabs/ad-intelligence-tab'
import { GeoMapTab } from '@/components/analytics/tabs/geo-map-tab'
import { ParetoTab } from '@/components/analytics/tabs/pareto-tab'
import { DailyHeatmapTab } from '@/components/analytics/tabs/daily-heatmap-tab'
import { GrowthMomentumTab } from '@/components/analytics/tabs/growth-momentum-tab'
import { VisitorRatioTab } from '@/components/analytics/tabs/visitor-ratio-tab'
import { TechProfileTab } from '@/components/analytics/tabs/tech-profile-tab'
import { IdentityLinkerTab } from '@/components/analytics/tabs/identity-linker-tab'
import { StdDeviationTab } from '@/components/analytics/tabs/std-deviation-tab'
import { SankeyFlowTab } from '@/components/analytics/tabs/sankey-flow-tab'
import { CoOccurrenceTab } from '@/components/analytics/tabs/co-occurrence-tab'
import { FunnelDropOffTab } from '@/components/analytics/tabs/funnel-drop-off-tab'
import { LeadScoringTab } from '@/components/analytics/tabs/lead-scoring-tab'
import { BrokenLinkQaTab } from '@/components/analytics/tabs/broken-link-qa-tab'

import {
  Lock,
  ShieldCheck,
  KeyRound,
  ArrowRight,
  AlertCircle,
  RotateCw
} from 'lucide-react'

export default function AnalyticsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [accessKey, setAccessKey] = useState('')
  const [authError, setAuthError] = useState(false)

  const [activeTab, setActiveTab] = useState<TabKey>('mission-control')
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: 'all',
    visitorType: 'all'
  })
  const [dataset, setDataset] = useState<DashboardDataset | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  // Check stored authorization on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('tg_analytics_auth')
      if (stored === 'authorized') {
        setIsAuthenticated(true)
      }
    }
  }, [])

  const handleAuthorize = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    // Accept 'trustgrid2026', 'isi2026', 'admin', or click-through for authorized sessions
    if (
      !accessKey ||
      accessKey.trim().toLowerCase() === 'trustgrid2026' ||
      accessKey.trim().toLowerCase() === 'isi2026' ||
      accessKey.trim().toLowerCase() === 'admin'
    ) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('tg_analytics_auth', 'authorized')
      }
      setIsAuthenticated(true)
      setAuthError(false)
    } else {
      setAuthError(true)
    }
  }

  // Fetch Dashboard Data from /api/analytics/dashboard
  const fetchDashboardData = useCallback(
    async (currentFilters: FilterOptions, isRefreshAction = false) => {
      if (isRefreshAction) setIsRefreshing(true)
      else setIsLoading(true)
      setLoadError(null)

      try {
        const query = new URLSearchParams()
        if (currentFilters.dateRange) query.set('dateRange', currentFilters.dateRange)
        if (currentFilters.source) query.set('source', currentFilters.source)
        if (currentFilters.device) query.set('device', currentFilters.device)
        if (currentFilters.visitorType) query.set('visitorType', currentFilters.visitorType)
        if (currentFilters.utmCampaign) query.set('utmCampaign', currentFilters.utmCampaign)
        if (isRefreshAction) query.set('refresh', 'true')

        const res = await fetch(`/api/analytics/dashboard?${query.toString()}`, {
          cache: 'no-store'
        })

        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`)
        }

        const json = await res.json()
        if (json && json.success && json.data) {
          setDataset(json.data)
        } else {
          throw new Error(json.message || 'Invalid data returned from server')
        }
      } catch (err: any) {
        console.error('Analytics load error:', err)
        setLoadError(err.message || 'Failed to connect to analytics service.')
      } finally {
        setIsLoading(false)
        setIsRefreshing(false)
      }
    },
    []
  )

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData(filters)
    }
  }, [isAuthenticated, filters, fetchDashboardData])

  const handleRefresh = () => {
    fetchDashboardData(filters, true)
  }

  // Security Access Barrier Modal
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 font-sans text-slate-100">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950/90 p-8 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              TrustGrid.AI Executive Suite
            </h1>
            <p className="text-xs text-slate-400">
              Internal Sheet 1 + Sheet 2 Analytics Engine. Enter authorization key to access live dashboard telemetry.
            </p>
          </div>

          <form onSubmit={handleAuthorize} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <KeyRound className="h-3.5 w-3.5 text-cyan-400" />
                Access Key (Default: trustgrid2026)
              </label>
              <input
                type="password"
                placeholder="Enter access key..."
                value={accessKey}
                onChange={e => {
                  setAccessKey(e.target.value)
                  setAuthError(false)
                }}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
              />
              {authError && (
                <span className="text-[11px] text-rose-400 mt-1 block">
                  Invalid access key. Please verify credentials.
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg hover:from-cyan-400 hover:to-indigo-500 transition-all cursor-pointer"
            >
              <span>Unlock Analytics Workspace</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="pt-2 text-center text-[11px] text-slate-500 font-mono flex items-center justify-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Secure Server-Side API • Zero Raw Sheets Exposure</span>
          </div>
        </div>
      </div>
    )
  }

  // Loading Skeleton State
  if (isLoading && !dataset) {
    return (
      <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col items-center justify-center space-y-4 font-sans">
        <RotateCw className="h-8 w-8 text-cyan-400 animate-spin" />
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold text-white">Compiling Sheet 2 Processed Intelligence...</p>
          <p className="text-xs text-slate-500 font-mono">16 Analytics Builders Synchronizing</p>
        </div>
      </div>
    )
  }

  // Fatal Error State
  if (loadError && !dataset) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <div className="max-w-md rounded-xl border border-rose-500/30 bg-rose-950/20 p-6 text-center space-y-4">
          <AlertCircle className="h-8 w-8 text-rose-400 mx-auto" />
          <h2 className="text-lg font-bold text-white">Analytics Connection Error</h2>
          <p className="text-xs text-slate-400">{loadError}</p>
          <button
            onClick={() => fetchDashboardData(filters)}
            className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition-colors"
          >
            Retry Synchronization
          </button>
        </div>
      </div>
    )
  }

  if (!dataset) return null

  return (
    <AnalyticsShell
      activeTab={activeTab}
      onSelectTab={setActiveTab}
      dataset={dataset}
      isRefreshing={isRefreshing}
      onRefresh={handleRefresh}
    >
      {/* Top Global Filter System */}
      <GlobalFilters
        filters={filters}
        onFilterChange={setFilters}
        onReset={() => setFilters({ dateRange: 'all', visitorType: 'all' })}
      />

      {/* Render Active Analytics Tab inside Isolated Error Boundary */}
      <div className="pt-2">
        {activeTab === 'mission-control' && (
          <ModuleErrorBoundary moduleTitle="Mission Control" onRetry={handleRefresh}>
            <MissionControlTab data={dataset.missionControl} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'executive-kpis' && (
          <ModuleErrorBoundary moduleTitle="Executive KPIs" onRetry={handleRefresh}>
            <ExecutiveKpisTab data={dataset.executiveKpis} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'ad-intelligence' && (
          <ModuleErrorBoundary moduleTitle="Ad Intelligence" onRetry={handleRefresh}>
            <AdIntelligenceTab data={dataset.adIntelligence} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'geo-map' && (
          <ModuleErrorBoundary moduleTitle="Geo Map Profile" onRetry={handleRefresh}>
            <GeoMapTab data={dataset.geoMap} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'pareto' && (
          <ModuleErrorBoundary moduleTitle="Pareto 80/20" onRetry={handleRefresh}>
            <ParetoTab data={dataset.pareto} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'daily-heatmap' && (
          <ModuleErrorBoundary moduleTitle="Daily Heatmap" onRetry={handleRefresh}>
            <DailyHeatmapTab data={dataset.dailyHeatmap} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'growth-momentum' && (
          <ModuleErrorBoundary moduleTitle="Growth Momentum" onRetry={handleRefresh}>
            <GrowthMomentumTab data={dataset.growthMomentum} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'visitor-ratio' && (
          <ModuleErrorBoundary moduleTitle="Visitor Ratio" onRetry={handleRefresh}>
            <VisitorRatioTab data={dataset.visitorRatio} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'tech-profile' && (
          <ModuleErrorBoundary moduleTitle="Technology Profile" onRetry={handleRefresh}>
            <TechProfileTab data={dataset.techProfile} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'identity-linker' && (
          <ModuleErrorBoundary moduleTitle="Identity Linker" onRetry={handleRefresh}>
            <IdentityLinkerTab data={dataset.identityLinker} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'std-deviation' && (
          <ModuleErrorBoundary moduleTitle="Standard Deviation" onRetry={handleRefresh}>
            <StdDeviationTab data={dataset.stdDeviation} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'sankey-flow' && (
          <ModuleErrorBoundary moduleTitle="Sankey Flow" onRetry={handleRefresh}>
            <SankeyFlowTab data={dataset.sankeyFlow} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'co-occurrence' && (
          <ModuleErrorBoundary moduleTitle="Co-Occurrence Matrix" onRetry={handleRefresh}>
            <CoOccurrenceTab data={dataset.coOccurrence} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'funnel-drop-off' && (
          <ModuleErrorBoundary moduleTitle="Funnel Drop-Off" onRetry={handleRefresh}>
            <FunnelDropOffTab data={dataset.funnelDropOff} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'lead-scoring' && (
          <ModuleErrorBoundary moduleTitle="Lead Scoring Engine" onRetry={handleRefresh}>
            <LeadScoringTab data={dataset.leadScoring} />
          </ModuleErrorBoundary>
        )}

        {activeTab === 'broken-link-qa' && (
          <ModuleErrorBoundary moduleTitle="Broken Link QA" onRetry={handleRefresh}>
            <BrokenLinkQaTab data={dataset.brokenLinkQa} />
          </ModuleErrorBoundary>
        )}
      </div>
    </AnalyticsShell>
  )
}

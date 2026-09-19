'use client'

import React, { useState } from 'react'
import Link from 'next/link'
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
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Lock,
  Layers,
  CheckCircle2,
  Users,
  Compass,
  Cpu,
  Monitor,
  Megaphone,
  ArrowLeft
} from 'lucide-react'
import { DashboardDataset } from '@/lib/analytics-service'

export type TabKey =
  | 'mission-control'
  | 'executive-kpis'
  | 'ad-intelligence'
  | 'geo-map'
  | 'visitor-ratio'
  | 'tech-profile'
  | 'daily-heatmap'
  | 'growth-momentum'
  | 'identity-linker'
  | 'co-occurrence'
  | 'sankey-flow'
  | 'funnel-drop-off'
  | 'lead-scoring'
  | 'pareto'
  | 'std-deviation'
  | 'broken-link-qa'

interface NavGroup {
  name?: string
  items: {
    key: TabKey
    label: string
    icon: React.ComponentType<{ className?: string }>
    badge?: string
  }[]
}

const NAVIGATION_GROUPS: NavGroup[] = [
  {
    items: [
      { key: 'mission-control', label: 'Mission Control', icon: Activity, badge: 'Live' },
      { key: 'executive-kpis', label: 'Executive KPIs', icon: Target }
    ]
  },
  {
    name: 'Acquisition',
    items: [
      { key: 'ad-intelligence', label: 'Ad Intelligence', icon: Megaphone }
    ]
  },
  {
    name: 'Audience',
    items: [
      { key: 'geo-map', label: 'Geo Map', icon: Globe },
      { key: 'visitor-ratio', label: 'Visitor Ratio', icon: PieChart },
      { key: 'tech-profile', label: 'Technology Profile', icon: Monitor }
    ]
  },
  {
    name: 'Behaviour',
    items: [
      { key: 'daily-heatmap', label: 'Daily Heatmap', icon: Clock },
      { key: 'growth-momentum', label: 'Growth Momentum', icon: TrendingUp },
      { key: 'identity-linker', label: 'Identity Linker', icon: Users },
      { key: 'co-occurrence', label: 'Co-Occurrence Matrix', icon: Shuffle },
      { key: 'sankey-flow', label: 'Sankey Flow', icon: GitFork }
    ]
  },
  {
    name: 'Conversion',
    items: [
      { key: 'funnel-drop-off', label: 'Funnel Drop-Off', icon: Layers },
      { key: 'lead-scoring', label: 'Lead Scoring Engine', icon: Flame, badge: 'AI' }
    ]
  },
  {
    name: 'Performance',
    items: [
      { key: 'pareto', label: 'Pareto 80/20', icon: BarChart3 },
      { key: 'std-deviation', label: 'Standard Deviation', icon: Sparkles }
    ]
  },
  {
    name: 'Technical QA',
    items: [
      { key: 'broken-link-qa', label: 'Broken Link QA', icon: ShieldCheck }
    ]
  }
]

interface AnalyticsShellProps {
  activeTab: TabKey
  onSelectTab: (tab: TabKey) => void
  dataset: DashboardDataset
  isRefreshing: boolean
  onRefresh: () => void
  children: React.ReactNode
}

export function AnalyticsShell({
  activeTab,
  onSelectTab,
  dataset,
  isRefreshing,
  onRefresh,
  children
}: AnalyticsShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  // Current tab name lookup
  let currentTabLabel = 'Mission Control'
  NAVIGATION_GROUPS.forEach(g => {
    const found = g.items.find(i => i.key === activeTab)
    if (found) currentTabLabel = found.label
  })

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 h-16 border-b border-slate-800/80 bg-[#020617]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/" className="flex items-center gap-2 group">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 text-white font-bold text-sm shadow-md shadow-cyan-900/30">
              TG
            </span>
            <div className="hidden sm:block">
              <span className="text-sm font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                TRUSTGRID.AI
              </span>
              <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-500">
                ISI Enterprise Intelligence Suite
              </span>
            </div>
          </Link>

          <span className="hidden md:block h-5 w-px bg-slate-800 mx-1" />

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sheet 2 Engine Online</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-500">
              {dataset.missionControl.devRecordsPurged} Localhost Purged
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Last Updated Timestamp */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
            <Clock className="h-3.5 w-3.5 text-cyan-400" />
            <span>Last Updated: {dataset.timestamp}</span>
          </div>

          {/* Refresh Analytics Button */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold tracking-wide transition-all shadow-sm hover:shadow-cyan-500/20 disabled:opacity-50 cursor-pointer"
          >
            <RotateCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh Analytics</span>
            <span className="sm:hidden">Sync</span>
          </button>

          <Link
            href="/"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            title="Return to Public Site"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">Exit to Website</span>
          </Link>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:block w-64 shrink-0 border-r border-slate-800/80 bg-slate-950/40 p-4 overflow-y-auto space-y-6">
          <div className="px-2 py-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" />
              ISI Analytics Engine
            </span>
            <span className="block text-[11px] text-slate-500 mt-0.5 font-mono">
              16 Processed Tabs
            </span>
          </div>

          <nav className="space-y-5">
            {NAVIGATION_GROUPS.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                {group.name && (
                  <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {group.name}
                  </div>
                )}
                {group.items.map(item => {
                  const Icon = item.icon
                  const isActive = activeTab === item.key

                  return (
                    <button
                      key={item.key}
                      onClick={() => onSelectTab(item.key)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/10 text-cyan-200 border border-cyan-500/40 shadow-sm font-semibold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon
                          className={`h-4 w-4 shrink-0 ${
                            isActive ? 'text-cyan-400' : 'text-slate-500'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                            isActive
                              ? 'bg-cyan-400 text-slate-950'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            ))}
          </nav>

          <div className="pt-4 border-t border-slate-800/80 px-2 text-[11px] text-slate-500 font-mono space-y-1">
            <div className="flex items-center gap-1 text-slate-400">
              <Lock className="h-3 w-3 text-emerald-400" />
              <span>Internal Intelligence Only</span>
            </div>
            <p className="text-[10px] text-slate-600">
              Google Sheet 1 & 2 Live Synchronizer
            </p>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="fixed inset-0 top-16 z-50 lg:hidden bg-black/80 backdrop-blur-md flex">
            <div className="w-72 bg-slate-950 border-r border-slate-800 p-4 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold font-mono text-cyan-400 uppercase">
                  Analytics Modules
                </span>
                <button
                  onClick={() => setMobileNavOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="space-y-4">
                {NAVIGATION_GROUPS.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-1">
                    {group.name && (
                      <div className="px-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        {group.name}
                      </div>
                    )}
                    {group.items.map(item => {
                      const Icon = item.icon
                      const isActive = activeTab === item.key
                      return (
                        <button
                          key={item.key}
                          onClick={() => {
                            onSelectTab(item.key)
                            setMobileNavOpen(false)
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left ${
                            isActive
                              ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 font-semibold'
                              : 'text-slate-400 hover:bg-slate-900'
                          }`}
                        >
                          <Icon className="h-4 w-4 shrink-0 text-cyan-400" />
                          <span className="truncate">{item.label}</span>
                        </button>
                      )
                    })}
                  </div>
                ))}
              </nav>
            </div>
            <div className="flex-1" onClick={() => setMobileNavOpen(false)} />
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Active Tab Heading */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>ISI ANALYTICS</span>
                <ChevronRight className="h-3 w-3 text-slate-600" />
                <span className="text-cyan-400 font-semibold">{currentTabLabel}</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
                {currentTabLabel}
              </h1>
            </div>
          </div>

          {/* Children: Global Filters + Active Tab Visualization */}
          {children}
        </main>
      </div>
    </div>
  )
}

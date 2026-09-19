'use client'

import React from 'react'
import {
  GitFork,
  ArrowRight,
  TrendingDown,
  Layers,
  Compass
} from 'lucide-react'
import { SankeyFlowData } from '@/lib/analytics-service'

interface Props {
  data: SankeyFlowData
}

export function SankeyFlowTab({ data }: Props) {
  const sources = data.nodes.filter(n => n.category === 'source')
  const entryPages = data.nodes.filter(n => n.category === 'entry')
  const secondaryPages = data.nodes.filter(n => n.category === 'secondary')
  const actions = data.nodes.filter(n => n.category === 'action')
  const conversions = data.nodes.filter(n => n.category === 'conversion')

  return (
    <div className="space-y-6">
      {/* Top Banner KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-b from-cyan-500/10 to-cyan-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Navigation Multi-Touch Paths</span>
          <div className="mt-2 text-2xl font-bold text-white">5-Step Sequential Journey</div>
          <span className="text-[11px] text-cyan-400 mt-1 block">Source → Entry → Page → CTA → Lead</span>
        </div>

        <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/10 to-indigo-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Top Navigation Sequence</span>
          <div className="mt-2 text-sm font-bold text-white truncate">Google Ads → AI Factory → Diagnostic</div>
          <span className="text-[11px] text-indigo-400 mt-1 block">2,450 completed journeys</span>
        </div>

        <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-emerald-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Graph Transition Links</span>
          <div className="mt-2 text-2xl font-bold text-white">{data.links.length} Tracked Bridges</div>
          <span className="text-[11px] text-emerald-400 mt-1 block">Continuous path reconstruction</span>
        </div>
      </div>

      {/* Multi-Column Sankey Flow Diagram */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <GitFork className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-200">Visitor Journey Navigation Flow (Sankey Graph)</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">5 Progression Stages</span>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* 1. Inbound Sources */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
              <span>1. Inbound Source</span>
            </div>
            <div className="space-y-2">
              {sources.map(s => (
                <div
                  key={s.id}
                  className="rounded-lg border border-cyan-500/30 bg-cyan-950/30 p-3 text-xs text-slate-200 font-medium shadow-sm hover:border-cyan-400 transition-colors"
                >
                  <span className="block font-bold">{s.name}</span>
                  <span className="text-[10px] text-cyan-400 font-mono">Traffic Influx</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Landing Pages */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1">
              <span>2. Landing Entry</span>
            </div>
            <div className="space-y-2">
              {entryPages.map(e => (
                <div
                  key={e.id}
                  className="rounded-lg border border-indigo-500/30 bg-indigo-950/30 p-3 text-xs text-slate-200 font-medium shadow-sm hover:border-indigo-400 transition-colors"
                >
                  <span className="block font-bold truncate">{e.name}</span>
                  <span className="text-[10px] text-indigo-400 font-mono">Initial Touchpoint</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Secondary Evaluation */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 flex items-center gap-1">
              <span>3. Secondary Path</span>
            </div>
            <div className="space-y-2">
              {secondaryPages.map(sp => (
                <div
                  key={sp.id}
                  className="rounded-lg border border-purple-500/30 bg-purple-950/30 p-3 text-xs text-slate-200 font-medium shadow-sm hover:border-purple-400 transition-colors"
                >
                  <span className="block font-bold truncate">{sp.name}</span>
                  <span className="text-[10px] text-purple-400 font-mono">High Dwell Area</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Action & CTA */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1">
              <span>4. High-Intent Action</span>
            </div>
            <div className="space-y-2">
              {actions.map(act => (
                <div
                  key={act.id}
                  className="rounded-lg border border-amber-500/30 bg-amber-950/30 p-3 text-xs text-slate-200 font-medium shadow-sm hover:border-amber-400 transition-colors"
                >
                  <span className="block font-bold truncate">{act.name}</span>
                  <span className="text-[10px] text-amber-400 font-mono">CTA Interaction</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Qualified Conversion */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              <span>5. Lead Conversion</span>
            </div>
            <div className="space-y-2">
              {conversions.map(conv => (
                <div
                  key={conv.id}
                  className="rounded-lg border border-emerald-500/40 bg-emerald-950/40 p-3 text-xs text-white font-medium shadow-sm hover:border-emerald-400 transition-colors"
                >
                  <span className="block font-bold">{conv.name}</span>
                  <span className="text-[10px] text-emerald-400 font-mono">DealFlow Routed</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Multi-Touch Navigation Paths Table */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-slate-200">High-Converting Visitor Paths</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Ranked by Volume</span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-sans">
                <th className="pb-2">Path Trajectory Sequence</th>
                <th className="pb-2 text-right">Volume</th>
                <th className="pb-2 text-right">Drop-off Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {data.topPaths.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 text-white font-sans flex items-center gap-2">
                    <span className="text-slate-500 font-mono text-[10px]">{idx + 1}.</span>
                    <span>{p.path}</span>
                  </td>
                  <td className="py-3 text-right text-emerald-400 font-bold">{p.count.toLocaleString()}</td>
                  <td className="py-3 text-right text-slate-400">{p.dropRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

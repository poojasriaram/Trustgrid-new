'use client'

import React, { useState } from 'react'
import {
  Globe,
  MapPin,
  Compass,
  TrendingUp,
  ShieldCheck,
  Building
} from 'lucide-react'
import { GeoMapData } from '@/lib/analytics-service'

interface Props {
  data: GeoMapData
}

export function GeoMapTab({ data }: Props) {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const maxVisitors = Math.max(...data.countryBreakdown.map(c => c.visitors), 1)

  // Top regions coordinates representation on stylized cyber world map
  const mapNodes = [
    { country: 'United States', code: 'US', x: 22, y: 38, count: '16.8K', color: '#0ea5e9' },
    { country: 'Germany', code: 'DE', x: 52, y: 30, count: '6.9K', color: '#6366f1' },
    { country: 'United Kingdom', code: 'GB', x: 48, y: 28, count: '5.8K', color: '#8b5cf6' },
    { country: 'India', code: 'IN', x: 68, y: 48, count: '5.4K', color: '#10b981' },
    { country: 'Singapore', code: 'SG', x: 76, y: 58, count: '3.9K', color: '#06b6d4' },
    { country: 'Japan', code: 'JP', x: 84, y: 38, count: '3.1K', color: '#f59e0b' }
  ]

  return (
    <div className="space-y-6">
      {/* Top Banner KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-b from-cyan-500/10 to-cyan-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Countries</span>
          <div className="mt-2 text-2xl font-bold text-white">{data.totalCountries} Nations</div>
          <span className="text-[11px] text-cyan-400 mt-1 block">Global enterprise distribution</span>
        </div>
        <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/10 to-indigo-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Top Geo Region</span>
          <div className="mt-2 text-2xl font-bold text-white">{data.topGeoRegion}</div>
          <span className="text-[11px] text-indigo-400 mt-1 block">North American dominance</span>
        </div>
        <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-emerald-950/20 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">IP Privacy Protection</span>
          <div className="mt-2 text-2xl font-bold text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="h-6 w-6" /> Anonymized
          </div>
          <span className="text-[11px] text-emerald-400 mt-1 block">Zero raw IP exposure</span>
        </div>
      </div>

      {/* Interactive Vector Cyber World Map */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-200">Global Visitor Geographic Map</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Live Telemetry Nodes</span>
        </div>

        <div className="relative mt-4 h-72 w-full rounded-lg bg-slate-950/80 border border-slate-800/80 overflow-hidden flex items-center justify-center">
          {/* Cyber Grid Lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          {/* Continents Outline Silhouette (SVG) */}
          <svg className="w-full h-full opacity-25" viewBox="0 0 1000 500" fill="none" stroke="currentColor">
            <path
              d="M150,150 Q180,100 240,120 T320,180 T260,260 T180,240 Z"
              className="fill-slate-800 stroke-slate-700"
            />
            <path
              d="M260,280 Q300,320 320,400 T260,460 T220,380 Z"
              className="fill-slate-800 stroke-slate-700"
            />
            <path
              d="M480,120 Q540,80 600,120 T620,200 T520,220 Z"
              className="fill-slate-800 stroke-slate-700"
            />
            <path
              d="M490,240 Q560,240 580,340 T540,440 T460,340 Z"
              className="fill-slate-800 stroke-slate-700"
            />
            <path
              d="M620,120 Q740,90 840,160 T860,280 T700,260 Z"
              className="fill-slate-800 stroke-slate-700"
            />
            <path
              d="M740,360 Q820,340 840,420 T760,450 Z"
              className="fill-slate-800 stroke-slate-700"
            />
          </svg>

          {/* Hotspot Radar Nodes */}
          {mapNodes.map((node, idx) => (
            <div
              key={idx}
              className="absolute cursor-pointer group"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onClick={() => setSelectedCountry(node.country)}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className="animate-ping absolute inline-flex h-4 w-4 rounded-full opacity-75"
                  style={{ backgroundColor: node.color }}
                />
                <span
                  className="relative inline-flex rounded-full h-3 w-3 shadow-lg border border-white/40"
                  style={{ backgroundColor: node.color }}
                />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-4 hidden group-hover:block z-10 whitespace-nowrap rounded bg-slate-900 border border-slate-700 px-2 py-1 text-[10px] text-white shadow-lg font-mono">
                {node.country}: {node.count}
              </div>
            </div>
          ))}

          <div className="absolute bottom-3 left-3 flex items-center gap-3 text-[11px] font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="h-2 w-2 rounded-full bg-cyan-400" /> North America
            </span>
            <span className="flex items-center gap-1.5 text-indigo-400">
              <span className="h-2 w-2 rounded-full bg-indigo-400" /> EMEA
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> APAC
            </span>
          </div>
        </div>
      </div>

      {/* Country & City Breakdown Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Country Breakdown */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-semibold text-slate-200">Country Traffic Distribution</h3>
            <span className="text-xs text-slate-400 font-mono">Ranked by Volume</span>
          </div>

          <div className="mt-4 space-y-3">
            {data.countryBreakdown.map((c, idx) => {
              const widthPct = Math.round((c.visitors / maxVisitors) * 100)
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium flex items-center gap-1.5">
                      <span className="font-mono text-slate-500 text-[10px] w-4">{idx + 1}.</span>
                      {c.country}
                    </span>
                    <span className="text-cyan-400 font-mono font-medium">
                      {c.visitors.toLocaleString()} ({c.percentage}%)
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-cyan-500 rounded-full transition-all duration-700"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top Cities Intelligence */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-emerald-400" />
              <h3 className="text-sm font-semibold text-slate-200">Enterprise City Clusters</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Engagement & Leads</span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-sans">
                  <th className="pb-2">City</th>
                  <th className="pb-2">Country</th>
                  <th className="pb-2 text-right">Visitors</th>
                  <th className="pb-2 text-right">Score</th>
                  <th className="pb-2 text-right">Leads</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {data.cityBreakdown.map((city, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 text-white font-sans font-medium flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 text-cyan-400 shrink-0" />
                      {city.city}
                    </td>
                    <td className="py-2.5 text-slate-400 font-sans">{city.country}</td>
                    <td className="py-2.5 text-right text-slate-200 font-bold">{city.visitors.toLocaleString()}</td>
                    <td className="py-2.5 text-right text-emerald-400">{city.engagementScore}/100</td>
                    <td className="py-2.5 text-right text-cyan-300 font-bold">{city.leads}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

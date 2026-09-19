'use client'

import React from 'react'
import {
  Smartphone,
  Laptop,
  Monitor,
  Globe,
  Wifi,
  Moon,
  Clock,
  Maximize2
} from 'lucide-react'
import { TechProfileData } from '@/lib/analytics-service'

interface Props {
  data: TechProfileData
}

export function TechProfileTab({ data }: Props) {
  const maxOs = Math.max(...data.osDistribution.map(o => o.count), 1)
  const maxBrowser = Math.max(...data.browserDistribution.map(b => b.count), 1)

  return (
    <div className="space-y-6">
      {/* Top Banner KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/10 to-indigo-950/20 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Desktop Dominance</span>
            <Laptop className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white">86.2%</div>
          <span className="text-[11px] text-indigo-400 mt-1 block">Workstations & Laptops</span>
        </div>

        <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-b from-cyan-500/10 to-cyan-950/20 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Top Operating System</span>
            <Monitor className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white">macOS (37.7%)</div>
          <span className="text-[11px] text-cyan-400 mt-1 block">Followed by Windows (34.5%)</span>
        </div>

        <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-emerald-950/20 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Dark Theme Adoption</span>
            <Moon className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white">78.5%</div>
          <span className="text-[11px] text-emerald-400 mt-1 block">Developer & architect profile</span>
        </div>

        <div className="rounded-xl border border-purple-500/30 bg-gradient-to-b from-purple-500/10 to-purple-950/20 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Top Screen Display</span>
            <Maximize2 className="h-4 w-4 text-purple-400" />
          </div>
          <div className="mt-2 text-xl font-bold text-white">1920×1080 FHD</div>
          <span className="text-[11px] text-purple-400 mt-1 block">High 2K & 4K representation</span>
        </div>
      </div>

      {/* OS & Browser Distribution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Operating Systems */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Laptop className="h-4 w-4 text-indigo-400" />
              <h3 className="text-sm font-semibold text-slate-200">Operating System Footprint</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Ranked by Volume</span>
          </div>

          <div className="mt-4 space-y-3.5">
            {data.osDistribution.map((os, idx) => {
              const barWidth = Math.round((os.count / maxOs) * 100)
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{os.name}</span>
                    <span className="text-indigo-400 font-mono font-bold">
                      {os.percentage}% ({os.count.toLocaleString()})
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Browsers */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-cyan-400" />
              <h3 className="text-sm font-semibold text-slate-200">Browser Distribution</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Chromium & WebKit</span>
          </div>

          <div className="mt-4 space-y-3.5">
            {data.browserDistribution.map((b, idx) => {
              const barWidth = Math.round((b.count / maxBrowser) * 100)
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{b.name}</span>
                    <span className="text-cyan-400 font-mono font-bold">
                      {b.percentage}% ({b.count.toLocaleString()})
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 rounded-full transition-all duration-700"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Hardware Details & Timezones Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Screen Resolutions */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Maximize2 className="h-4 w-4 text-purple-400" />
            <h3 className="text-sm font-semibold text-slate-200">Screen Resolutions</h3>
          </div>
          <div className="mt-4 space-y-2.5">
            {data.screenResolutions.map((res, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-slate-800/40">
                <span className="font-mono text-slate-300">{res.res}</span>
                <span className="font-mono text-purple-400 font-bold">{res.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Network & Connectivity */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Wifi className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-slate-200">Network & Bandwidth</h3>
          </div>
          <div className="mt-4 space-y-2.5">
            {data.connectionTypes.map((conn, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-slate-800/40">
                <span className="text-slate-300">{conn.type}</span>
                <span className="font-mono text-emerald-400 font-bold">{conn.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timezones */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Clock className="h-4 w-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-slate-200">Primary Timezones</h3>
          </div>
          <div className="mt-4 space-y-2.5">
            {data.timezones.map((tz, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-slate-800/40">
                <span className="font-mono text-slate-300 text-[11px] truncate max-w-[170px]">{tz.tz}</span>
                <span className="font-mono text-amber-400 font-bold">{tz.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

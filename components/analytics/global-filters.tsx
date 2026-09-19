'use client'

import React from 'react'
import {
  Calendar,
  Filter,
  Monitor,
  Users,
  RotateCcw,
  Search,
  ChevronDown
} from 'lucide-react'
import { FilterOptions } from '@/lib/analytics-service'

interface GlobalFiltersProps {
  filters: FilterOptions
  onFilterChange: (filters: FilterOptions) => void
  onReset: () => void
}

export function GlobalFilters({ filters, onFilterChange, onReset }: GlobalFiltersProps) {
  const dateRanges = [
    { label: 'All Time', value: 'all' },
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 Days', value: '7d' },
    { label: 'Last 30 Days', value: '30d' },
    { label: 'This Month', value: 'thisMonth' },
    { label: 'Previous Month', value: 'lastMonth' }
  ]

  const sources = [
    { label: 'All Sources', value: '' },
    { label: 'Google Ads', value: 'Google Ads' },
    { label: 'Direct / Organic', value: 'Direct / Organic' },
    { label: 'LinkedIn / Social', value: 'LinkedIn / Social' },
    { label: 'YouTube Tech', value: 'YouTube Tech' },
    { label: 'Affiliates / Partners', value: 'Affiliates / Partners' },
    { label: 'Community Referrals', value: 'Community Referrals' }
  ]

  const devices = [
    { label: 'All Devices', value: '' },
    { label: 'Desktop / Workstation', value: 'Desktop' },
    { label: 'Mobile Devices', value: 'Mobile' },
    { label: 'Tablet / iPad', value: 'Tablet' }
  ]

  const visitorTypes = [
    { label: 'All Visitors', value: 'all' },
    { label: 'New Visitors Only', value: 'new' },
    { label: 'Repeat Visitors Only', value: 'returning' }
  ]

  const hasActiveFilters =
    (filters.dateRange && filters.dateRange !== 'all') ||
    Boolean(filters.source) ||
    Boolean(filters.device) ||
    (filters.visitorType && filters.visitorType !== 'all') ||
    Boolean(filters.utmCampaign)

  return (
    <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-xl backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Filter className="h-4 w-4 text-cyan-400" />
          <span>Executive Intelligence Filters</span>
          {hasActiveFilters && (
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-400 hover:text-cyan-300 hover:bg-slate-800/70 rounded-md transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset All Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
        {/* Date Range Dropdown */}
        <div className="relative">
          <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
            <Calendar className="h-3 w-3 text-cyan-400" />
            Date Range
          </label>
          <div className="relative">
            <select
              value={filters.dateRange || 'all'}
              onChange={e => onFilterChange({ ...filters, dateRange: e.target.value })}
              className="w-full appearance-none rounded-lg border border-slate-700/80 bg-slate-950/70 px-3 py-2 text-xs font-medium text-slate-200 focus:border-cyan-500 focus:outline-none pr-8 cursor-pointer"
            >
              {dateRanges.map(d => (
                <option key={d.value} value={d.value} className="bg-slate-900 text-slate-200">
                  {d.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
          </div>
        </div>

        {/* Traffic Source Dropdown */}
        <div className="relative">
          <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
            <Search className="h-3 w-3 text-indigo-400" />
            Acquisition Source
          </label>
          <div className="relative">
            <select
              value={filters.source || ''}
              onChange={e => onFilterChange({ ...filters, source: e.target.value || undefined })}
              className="w-full appearance-none rounded-lg border border-slate-700/80 bg-slate-950/70 px-3 py-2 text-xs font-medium text-slate-200 focus:border-cyan-500 focus:outline-none pr-8 cursor-pointer"
            >
              {sources.map(s => (
                <option key={s.value} value={s.value} className="bg-slate-900 text-slate-200">
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
          </div>
        </div>

        {/* Device & Hardware */}
        <div className="relative">
          <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
            <Monitor className="h-3 w-3 text-emerald-400" />
            Hardware & Platform
          </label>
          <div className="relative">
            <select
              value={filters.device || ''}
              onChange={e => onFilterChange({ ...filters, device: e.target.value || undefined })}
              className="w-full appearance-none rounded-lg border border-slate-700/80 bg-slate-950/70 px-3 py-2 text-xs font-medium text-slate-200 focus:border-cyan-500 focus:outline-none pr-8 cursor-pointer"
            >
              {devices.map(dev => (
                <option key={dev.value} value={dev.value} className="bg-slate-900 text-slate-200">
                  {dev.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
          </div>
        </div>

        {/* Visitor Segment */}
        <div className="relative">
          <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
            <Users className="h-3 w-3 text-amber-400" />
            Visitor Intent Segment
          </label>
          <div className="relative">
            <select
              value={filters.visitorType || 'all'}
              onChange={e =>
                onFilterChange({
                  ...filters,
                  visitorType: (e.target.value as 'all' | 'new' | 'returning')
                })
              }
              className="w-full appearance-none rounded-lg border border-slate-700/80 bg-slate-950/70 px-3 py-2 text-xs font-medium text-slate-200 focus:border-cyan-500 focus:outline-none pr-8 cursor-pointer"
            >
              {visitorTypes.map(vt => (
                <option key={vt.value} value={vt.value} className="bg-slate-900 text-slate-200">
                  {vt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  )
}

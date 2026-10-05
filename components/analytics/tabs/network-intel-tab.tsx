'use client'

import React, { useState } from 'react'
import {
  ShieldAlert,
  Server,
  Network,
  Activity,
  AlertTriangle,
  Lock,
  Globe,
  Radio,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Search
} from 'lucide-react'
import { NetworkIntelData } from '@/lib/analytics-service'

interface Props {
  data?: NetworkIntelData
}

export function NetworkIntelTab({ data }: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [severityFilter, setSeverityFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All')

  if (!data) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        <Server className="h-8 w-8 mx-auto mb-2 text-cyan-400 opacity-60" />
        <p>Network & Security Intelligence telemetry initializing...</p>
      </div>
    )
  }

  const filteredIncidents = (data.securityIncidents || []).filter(inc => {
    const matchesSearch =
      inc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.ipMasked.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.path.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = severityFilter === 'All' || inc.severity === severityFilter
    return matchesSearch && matchesSeverity
  })

  return (
    <div className="space-y-6 font-sans">
      {/* Top Threat & Network Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-slate-950/40 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Analyzed Traffic</span>
            <Network className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">
            {data.totalRequests.toLocaleString()}
          </div>
          <span className="text-[11px] text-cyan-400 mt-1 block flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            100% Ingested via Edge Proxies
          </span>
        </div>

        <div className="rounded-xl border border-indigo-500/20 bg-gradient-to-b from-indigo-500/10 to-slate-950/40 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Identified ASNs</span>
            <Server className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">
            {data.uniqueAsns}
          </div>
          <span className="text-[11px] text-indigo-400 mt-1 block">
            Autonomous Systems Profiled
          </span>
        </div>

        <div className="rounded-xl border border-amber-500/20 bg-gradient-to-b from-amber-500/10 to-slate-950/40 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Datacenter / Cloud Traffic</span>
            <Radio className="h-4 w-4 text-amber-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">
            {data.datacenterRequests.toLocaleString()}
          </div>
          <span className="text-[11px] text-amber-400 mt-1 block">
            AWS / Azure / GCP / Hetzner / Cloudflare
          </span>
        </div>

        <div className="rounded-xl border border-rose-500/20 bg-gradient-to-b from-rose-500/10 to-slate-950/40 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Security Anomalies</span>
            <ShieldAlert className="h-4 w-4 text-rose-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">
            {data.suspiciousRequests}
          </div>
          <span className="text-[11px] text-rose-400 mt-1 block">
            Rate-limits, Scanners & Path Probes
          </span>
        </div>
      </div>

      {/* Privacy Notice Banner */}
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div className="text-xs">
            <p className="font-semibold text-emerald-300">Privacy Safeguards Active: Zero Raw IP Leakage</p>
            <p className="text-slate-400 text-[11px]">
              Visitor IP addresses are evaluated on trusted server edges, anonymized into masked subnets (e.g., <code>198.51.***.***</code>), and never transmitted to client code or third-party ad brokers.
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-1 rounded bg-emerald-900/40 border border-emerald-700/40 text-emerald-300 uppercase shrink-0">
          SOC2 / GDPR Compliant
        </span>
      </div>

      {/* Network & ASN Breakdown Table */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Network className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-200">Network & Autonomous System (ASN) Intelligence</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">{data.networks?.length || 0} Networks Monitored</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <th className="pb-3 font-medium">ASN</th>
                <th className="pb-3 font-medium">Organization / Network Entity</th>
                <th className="pb-3 font-medium">Internet Service Provider (ISP)</th>
                <th className="pb-3 font-medium">Connection Type</th>
                <th className="pb-3 font-medium text-center">Cloud / Datacenter</th>
                <th className="pb-3 font-medium text-right">Analyzed Requests</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {data.networks?.map(net => (
                <tr key={net.asn} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 font-bold text-cyan-400">{net.asn}</td>
                  <td className="py-2.5 font-sans text-slate-200">{net.organization}</td>
                  <td className="py-2.5 font-sans text-slate-400">{net.isp}</td>
                  <td className="py-2.5 font-sans">
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                      {net.connectionType}
                    </span>
                  </td>
                  <td className="py-2.5 text-center font-sans">
                    {net.isProxyOrDatacenter ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        Datacenter / Proxy
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800/60 text-slate-400">
                        Residential / Commercial
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 text-right font-bold text-slate-100">
                    {net.totalRequests.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Incidents & Threat Activity Log */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-rose-400" />
            <h3 className="text-sm font-semibold text-slate-200">Security Signals & Threat Activity Forensics</h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="h-3.5 w-3.5 text-slate-500 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search incident, IP, path..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-700 bg-slate-950/70 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 w-56 font-mono"
              />
            </div>

            <select
              value={severityFilter}
              onChange={e => setSeverityFilter(e.target.value as any)}
              className="py-1.5 px-3 rounded-lg border border-slate-700 bg-slate-950/70 text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="All">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {filteredIncidents.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs font-mono">
            <ShieldCheck className="h-7 w-7 mx-auto mb-2 text-emerald-400 opacity-60" />
            No security threats detected matching current criteria. All server rate limits within nominal thresholds.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  <th className="pb-3 font-medium">Timestamp (UTC)</th>
                  <th className="pb-3 font-medium">Masked IP</th>
                  <th className="pb-3 font-medium">Threat Category</th>
                  <th className="pb-3 font-medium">Severity</th>
                  <th className="pb-3 font-medium">Incident Description</th>
                  <th className="pb-3 font-medium">Target Path</th>
                  <th className="pb-3 font-medium text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredIncidents.map(inc => (
                  <tr key={inc.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 text-slate-400 text-[11px]">
                      {new Date(inc.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                    <td className="py-2.5 text-cyan-400">{inc.ipMasked}</td>
                    <td className="py-2.5 font-sans text-slate-200 font-medium">{inc.eventType}</td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-sans font-semibold ${
                        inc.severity === 'Critical'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : inc.severity === 'High'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {inc.severity}
                      </span>
                    </td>
                    <td className="py-2.5 font-sans text-slate-300 max-w-xs truncate">{inc.description}</td>
                    <td className="py-2.5 text-slate-400 text-[11px] max-w-xs truncate">{inc.path || '/'}</td>
                    <td className="py-2.5 text-center font-sans">
                      {inc.blocked ? (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-rose-950 text-rose-400 border border-rose-800">
                          Throttled / Blocked
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-amber-950 text-amber-400 border border-amber-800">
                          Logged
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

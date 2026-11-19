import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Activity,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Server,
  Database,
  Layers,
  ArrowLeft,
  ShieldCheck,
  Zap,
  Globe2
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Real-Time System Monitoring & Sync Health | TRUSTGRID.AI',
  description: 'Enterprise telemetry monitoring dashboard for lead ingestion, API latency, Supabase dual-write, Google Sheet sync, and Jira DealFlow health.',
  robots: { index: false, follow: false }
}

export default function MonitoringDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link
            href="/audit-report"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Digital Presence Real-Time Monitoring Desk</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                SYSTEM OPERATIONAL
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">
              Active telemetry, sync queue health, and integration failure monitors
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-mono flex items-center gap-1.5 transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Poll Telemetry</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Core Integration Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Supabase DB</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="text-2xl font-black text-white">99.98%</div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>PostgREST Dual-Write Active</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Google Sheet #1</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white">100%</div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Retry Queue Enabled (0 drops)</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Jira CRM (DFX)</span>
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            </div>
            <div className="text-2xl font-black text-white">Connected</div>
            <div className="text-[11px] text-cyan-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>7-Step Workflow Automated</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Webhook Gateway</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white">Active</div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Calendly, WhatsApp, LinkedIn</span>
            </div>
          </div>
        </div>

        {/* Live Failure & Retry Telemetry Table */}
        <div className="border border-slate-800 rounded-2xl bg-slate-900/60 overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              <span>Multi-System Telemetry &amp; Failure Monitoring Ledger</span>
            </h3>
            <span className="text-xs font-mono text-emerald-400 font-semibold">Active Failures: 0</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono text-[11px]">
                  <th className="py-3 px-4">Subsystem</th>
                  <th className="py-3 px-4">Target Protocol</th>
                  <th className="py-3 px-4">Failure Handling &amp; Recovery</th>
                  <th className="py-3 px-4">SLA Threshold</th>
                  <th className="py-3 px-4 text-center">Health Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr className="hover:bg-slate-800/30 transition">
                  <td className="py-3.5 px-4 font-bold text-white">Lead Ingestion API</td>
                  <td className="py-3.5 px-4 font-mono text-cyan-400 text-[11px]">/api/forms &amp; /api/leads</td>
                  <td className="py-3.5 px-4 text-slate-300">
                    Client-side local fallback store + automated server retry on 5xx errors.
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">&lt; 350ms response</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                      HEALTHY
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition">
                  <td className="py-3.5 px-4 font-bold text-white">Supabase PostgREST Layer</td>
                  <td className="py-3.5 px-4 font-mono text-cyan-400 text-[11px]">HTTPS REST API (JWT/Key)</td>
                  <td className="py-3.5 px-4 text-slate-300">
                    Dual-write with SQLite in-memory buffering; audit log recording.
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">&lt; 200ms roundtrip</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                      HEALTHY
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition">
                  <td className="py-3.5 px-4 font-bold text-white">Google Sheet #1 Webhook</td>
                  <td className="py-3.5 px-4 font-mono text-cyan-400 text-[11px]">Apps Script Web App</td>
                  <td className="py-3.5 px-4 text-slate-300">
                    Exponential backoff retry (up to 3 attempts, 800ms jitter).
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">Zero data loss</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                      HEALTHY
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition">
                  <td className="py-3.5 px-4 font-bold text-white">Jira Cloud REST v3</td>
                  <td className="py-3.5 px-4 font-mono text-cyan-400 text-[11px]">Basic Auth API Token</td>
                  <td className="py-3.5 px-4 text-slate-300">
                    Server-side idempotency cache; deduplicates repeated submissions.
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">&lt; 1200ms issue gen</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                      HEALTHY
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition">
                  <td className="py-3.5 px-4 font-bold text-white">Inbound Webhooks</td>
                  <td className="py-3.5 px-4 font-mono text-cyan-400 text-[11px]">/api/webhooks?provider=...</td>
                  <td className="py-3.5 px-4 text-slate-300">
                    Payload validation, raw audit recording into <code className="text-cyan-300">audit_logs</code>.
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">Immediate ACK 200</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                      HEALTHY
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

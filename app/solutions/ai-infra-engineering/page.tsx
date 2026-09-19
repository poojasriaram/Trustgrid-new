'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Cpu,
  Layers,
  Building2,
  Network,
  Activity,
  Workflow,
  ShieldCheck,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  Check,
  Zap,
  Gauge,
  Clock,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal,
  Server,
  Database,
  Lock,
  Flame,
  Globe2,
  FileSpreadsheet,
  AlertCircle,
  HelpCircle,
  ChevronUp,
  FileCheck,
  Briefcase,
  Terminal,
  Radio,
  Sliders,
  Award
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { TrustGridForm } from '@/components/ui/trustgrid-form'
import { WhatsAppCTA } from '@/components/ui/whatsapp-cta'
import { HeroCanvas } from '@/components/ui/hero-canvas'
import { BorderBeam } from '@/components/ui/border-beam'

export default function AIInfraEngineeringPage() {
  const [activeSection, setActiveSection] = useState('family-1')
  const [activeMetricsTab, setActiveMetricsTab] = useState<'infra' | 'compute' | 'economic' | 'operational' | 'security'>('infra')
  const [expandedOfferings, setExpandedOfferings] = useState<Record<string, boolean>>({
    '1A': true,
    '2B': true,
    '3B': true,
    '5A': true
  })

  const toggleOffering = (key: string) => {
    setExpandedOfferings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // Active section spy on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'market-context',
        'family-1',
        'family-2',
        'family-3',
        'family-4',
        'family-5',
        'family-6',
        'family-7',
        'lifecycle-metrics',
        'maturity-progression',
        'methodology-engine',
        'use-cases',
        'ecosystem',
        'commercial-model'
      ]
      
      const scrollPos = window.scrollY + 180
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navSubmenus = [
    { id: 'family-1', label: '1. Architecture & Design', icon: Layers },
    { id: 'family-2', label: '2. Greenfield DC (100MW–GW)', icon: Building2 },
    { id: 'family-3', label: '3. GPU Cluster Engineering', icon: Cpu },
    { id: 'family-4', label: '4. Systems Integration', icon: Network },
    { id: 'family-5', label: '5. GPU & LLM Ops', icon: Activity },
    { id: 'family-6', label: '6. HPC Convergence', icon: Workflow },
    { id: 'family-7', label: '7. Security & Sovereignty', icon: ShieldCheck },
    { id: 'lifecycle-metrics', label: '8. Lifecycle Metrics & OpEx', icon: BarChart3 }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans">
      <SiteHeader />

      {/* DARK HERO SECTION WITH 21ST.DEV CONNECTED DOTS ANIMATIONS */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-950 text-white border-b border-slate-800">
        {/* Interactive Floating & Connected Dots Canvas */}
        <HeroCanvas />

        {/* 21st.dev Style Radial Ambient Glow Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(29,78,216,0.35),rgba(255,255,255,0))] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-indigo-600/20 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-6">
            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <ChevronRight size={12} className="text-slate-600" />
            <Link href="/solutions" className="hover:text-cyan-400 transition-colors">Solutions</Link>
            <ChevronRight size={12} className="text-slate-600" />
            <span className="text-cyan-400 font-semibold">AI Infrastructure & Data Center</span>
          </div>

          <div className="max-w-4xl">
            {/* 21st.dev Style Glowing Badge with Pulsing Node */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
              </span>
              <span>Version 2.0 — Expanded Market-Aligned Portfolio</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300 font-medium">Strategic Offering Blueprint</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
              AI Infrastructure & <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                Data Center Practice
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal mb-8 max-w-3xl">
              TrustGrid operates as an <strong className="text-white font-semibold">AI Infrastructure Operating Company</strong>. We design, build, integrate, operate, and continuously optimize production-grade AI Factories that treat intelligence production with the same industrial rigor semiconductor fabs apply to chip manufacturing.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a
                href="#family-1"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(37,99,235,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] hover:-translate-y-0.5 transition-all"
              >
                <span>Explore 7 Offering Families</span>
                <ArrowRight size={16} />
              </a>
              <Link
                href="/book-ai-diagnostic?solution=ai-infra-engineering"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 hover:border-cyan-500/50 backdrop-blur-md shadow-xs hover:-translate-y-0.5 transition-all"
              >
                <Sparkles size={16} className="text-cyan-400" />
                <span>Book AI Infrastructure Diagnostic</span>
              </Link>
              <a
                href="#market-context"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-slate-400 hover:text-cyan-300 font-semibold text-sm transition-colors"
              >
                <span>Market Context</span>
                <ChevronDown size={16} />
              </a>
            </div>
          </div>

          {/* Quick Pillar Highlights Cards in Glassmorphic Dark Style with BorderBeam */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80">
            <div className="relative p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all overflow-hidden group">
              <BorderBeam size={160} duration={7} colorFrom="#38bdf8" colorTo="#3b82f6" />
              <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 block mb-1 tracking-tight">PUE &lt; 1.10</span>
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Power-First DC Design</span>
              <span className="text-xs text-slate-400 mt-1 block">30–100kW/rack direct liquid cooling</span>
            </div>
            <div className="relative p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md hover:border-blue-500/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] transition-all overflow-hidden group">
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-400 block mb-1 tracking-tight">30–60%</span>
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Token Cost Reduction</span>
              <span className="text-xs text-slate-400 mt-1 block">PagedAttention & KV-cache tuning</span>
            </div>
            <div className="relative p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md hover:border-indigo-500/40 hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] transition-all overflow-hidden group">
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-400 block mb-1 tracking-tight">70–85%</span>
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">GPU Utilization Yield</span>
              <span className="text-xs text-slate-400 mt-1 block">Up from typical 30–50% baseline</span>
            </div>
            <div className="relative p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] transition-all overflow-hidden group">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 block mb-1 tracking-tight">&gt;99.5%</span>
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">GPU Availability</span>
              <span className="text-xs text-slate-400 mt-1 block">24/7 predictive failure telemetry</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">

        {/* PART I: MARKET CONTEXT & STRATEGIC POSITIONING */}
        <section id="market-context" className="scroll-mt-32">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
              Part I: Strategic Blueprint
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Market Context & Strategic Positioning
            </h2>
            <p className="text-base text-slate-600 mt-2">
              The shift from speculative AI research to industrialized production has exposed deep structural friction across compute procurement, power density, and token unit economics.
            </p>
          </div>

          {/* Positioning Statement Callout Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/80 border border-blue-200/80 shadow-xs mb-10">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-600 text-white shadow-sm shrink-0">
                <Sparkles size={24} />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">
                  1.2 TrustGrid Positioning Statement
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                  An AI Infrastructure Operating Company
                </h3>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  TrustGrid operates as an AI Infrastructure Operating Company — not a consultancy, not a hardware vendor, not a cloud reseller. TrustGrid designs, builds, integrates, operates, and continuously optimizes production-grade AI Factories that treat intelligence production with the same rigor that semiconductor fabs apply to chip manufacturing.
                </p>
                <div className="mt-4 pt-4 border-t border-blue-100 flex items-center gap-2 text-xs font-semibold text-blue-800">
                  <CheckCircle2 size={16} className="text-blue-600" />
                  <span>Core differentiator: Full vertical stack accountability from power delivery to token delivery, with measurable unit economics at every layer.</span>
                </div>
              </div>
            </div>
          </div>

          {/* 1.1 Market Imperatives Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-base">1.1 Market Imperatives Driving Portfolio Expansion</h4>
                <p className="text-xs text-slate-500">How macroeconomic compute forces dictate TrustGrid engineering capabilities</p>
              </div>
              <span className="text-xs font-bold text-slate-500 bg-white px-2.5 py-1 rounded border border-slate-200">
                8 Core Forces
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-6">Market Force</th>
                    <th className="py-3.5 px-6">Impact on TrustGrid Offerings</th>
                    <th className="py-3.5 px-6">Operational Focus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-900">GPU scarcity & allocation complexity</td>
                    <td className="py-3.5 px-6 text-slate-700">End-to-end GPU lifecycle management, multi-vendor procurement strategy</td>
                    <td className="py-3.5 px-6"><span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">Hardware Allocation</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-900">Inference overtaking training as primary workload</td>
                    <td className="py-3.5 px-6 text-slate-700">Dedicated inference economics layer with cost-per-token engineering</td>
                    <td className="py-3.5 px-6"><span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Token FinOps</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-900">Energy constraints on AI deployment</td>
                    <td className="py-3.5 px-6 text-slate-700">Power-first data center design; PUE &lt; 1.10 commitments</td>
                    <td className="py-3.5 px-6"><span className="text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">Thermal & Power</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-900">Sovereign & air-gapped requirements</td>
                    <td className="py-3.5 px-6 text-slate-700">Full-stack private AI factory with domestic supply chain assurance</td>
                    <td className="py-3.5 px-6"><span className="text-xs px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">National Defense</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-900">HPC/AI convergence</td>
                    <td className="py-3.5 px-6 text-slate-700">Unified architectures serving simulation, training, and inference</td>
                    <td className="py-3.5 px-6"><span className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">Unified Fabric</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-900">Regulatory acceleration (EU AI Act, NIST AI RMF)</td>
                    <td className="py-3.5 px-6 text-slate-700">Compliance-by-design at every architectural layer</td>
                    <td className="py-3.5 px-6"><span className="text-xs px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">Auditable Controls</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-900">Agent-based AI systems</td>
                    <td className="py-3.5 px-6 text-slate-700">Infrastructure designed for high-concurrency, low-latency agentic workloads</td>
                    <td className="py-3.5 px-6"><span className="text-xs px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200">Agent Concurrency</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-900">Inference-time compute scaling</td>
                    <td className="py-3.5 px-6 text-slate-700">Dynamic compute allocation for chain-of-thought and multi-pass inference</td>
                    <td className="py-3.5 px-6"><span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">Reasoning Scaling</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* OFFERING FAMILY 1 */}
        <section id="family-1" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Offering Family 1</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                AI Factory Architecture & Design
              </h3>
            </div>
          </div>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Strategic benchmarking, workload profiling, and end-to-end architectural blueprints covering power, cooling, network topologies, storage fabrics, and token cost economics.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1A */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">1A</span>
                  <span className="text-xs font-semibold text-slate-500">Duration: 4 Weeks</span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">AI Factory Strategic Assessment & Benchmarking</h4>
                <p className="text-xs text-slate-600 mb-4">
                  Enterprise-wide audit of existing or planned AI infrastructure posture with TOC bottleneck ranking.
                </p>
                <div className="space-y-1.5 mb-6">
                  <span className="text-xs font-bold text-slate-700 block mb-1">Key Deliverables:</span>
                  {[
                    'Topology map (compute, storage, network, cooling)',
                    'GPU utilization baseline with per-workload breakdown',
                    'Cost-per-token & cost-per-step benchmarking',
                    'Bottleneck identification (TOC-based ranking)',
                    '12/24/36-month board-ready infrastructure roadmap'
                  ].map((d, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check size={14} className="text-blue-600 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 bg-slate-50/60 -mx-6 -mb-6 p-4 rounded-b-2xl">
                <span className="text-xs font-bold text-slate-700 block mb-1.5">Target Metric:</span>
                <div className="text-xs font-medium text-slate-800 flex items-center justify-between">
                  <span>GPU Baseline Accuracy:</span>
                  <strong className="text-blue-600">±2% of actual</strong>
                </div>
              </div>
            </div>

            {/* 1B */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">1B</span>
                  <span className="text-xs font-semibold text-slate-500">Duration: 4–8 Weeks</span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Inference Economics Assessment & Optimization</h4>
                <p className="text-xs text-slate-600 mb-4">
                  Deep technical and economic analysis of production inference workloads to drastically cut cost-per-token.
                </p>
                <div className="space-y-1.5 mb-6">
                  <span className="text-xs font-bold text-slate-700 block mb-1">Key Deliverables:</span>
                  {[
                    'Per-workload inference profiling (latency, throughput, cost)',
                    'KV-cache & PagedAttention memory optimization',
                    'Quantization assessment (INT4/INT8/FP8) + regression test',
                    'Continuous batching & chunked prefill strategy',
                    'Working Proof-of-Concept on critical production workload'
                  ].map((d, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 bg-emerald-50/40 -mx-6 -mb-6 p-4 rounded-b-2xl">
                <span className="text-xs font-bold text-slate-700 block mb-1.5">Target Metric:</span>
                <div className="text-xs font-medium text-slate-800 flex items-center justify-between">
                  <span>Cost-per-Token PoC Reduction:</span>
                  <strong className="text-emerald-600">30–60% reduction</strong>
                </div>
              </div>
            </div>

            {/* 1C */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">1C</span>
                  <span className="text-xs font-semibold text-slate-500">Duration: 8–16 Weeks</span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Full AI Factory Architecture Design</h4>
                <p className="text-xs text-slate-600 mb-4">
                  Comprehensive architectural blueprint covering all seven layers for turn-key deployment.
                </p>
                <div className="space-y-1.5 mb-6">
                  <span className="text-xs font-bold text-slate-700 block mb-1">Key Deliverables:</span>
                  {[
                    'Full-stack architecture specification (PUE < 1.10)',
                    'Accelerator cluster topology & interconnect planning',
                    'Parallel file storage & NVMe-oF low-latency fabrics',
                    'Lossless RoCE / InfiniBand network fabric blueprint',
                    '5-year Total Cost of Ownership (TCO) model'
                  ].map((d, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check size={14} className="text-indigo-600 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 bg-indigo-50/40 -mx-6 -mb-6 p-4 rounded-b-2xl">
                <span className="text-xs font-bold text-slate-700 block mb-1.5">Target Metric:</span>
                <div className="text-xs font-medium text-slate-800 flex items-center justify-between">
                  <span>Throughput Increase (GPU):</span>
                  <strong className="text-indigo-600">25–50% increase</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OFFERING FAMILY 2 */}
        <section id="family-2" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <div>
              <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider">Offering Family 2</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Greenfield Data Center Design & Build (100MW – GW Scale)
              </h3>
            </div>
          </div>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Addressing the physical, electrical, and thermal envelope required for gigawatt-scale AI factories with direct-to-chip liquid cooling and utility-grade power integration.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* 2A */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 inline-block mb-3">2A. Site Selection & Feasibility</span>
              <h4 className="font-bold text-slate-900 mb-2">Multi-Criteria Grid & Climate Analysis</h4>
              <p className="text-xs text-slate-600 mb-4">
                Evaluating power grid capacity, renewable energy access, water tables for liquid cooling, and latency.
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li>• <strong>Renewable Coverage:</strong> &gt;80% renewable or carbon-offset capable</li>
                <li>• <strong>WUE Target:</strong> &lt;0.5 L/kWh for liquid-cooled facilities</li>
                <li>• <strong>Build Timeline:</strong> 18–30 months phased operational delivery</li>
              </ul>
            </div>

            {/* 2B */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block mb-3">2B. Power Infrastructure (100MW–GW)</span>
              <h4 className="font-bold text-slate-900 mb-2">Medium-Voltage & Substation Engineering</h4>
              <p className="text-xs text-slate-600 mb-4">
                13.8kV/33kV/66kV distribution, Tier III+ concurrently maintainable UPS, remote PDUs for 30–100kW racks.
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li>• <strong>Design PUE:</strong> &lt; 1.10 design (&lt; 1.15 operational)</li>
                <li>• <strong>Rack Density:</strong> 30–100kW (liquid); 15–30kW (air)</li>
                <li>• <strong>Cold Start:</strong> Time to full power &lt; 10 minutes</li>
              </ul>
            </div>

            {/* 2C */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200 inline-block mb-3">2C. Cooling Infrastructure</span>
              <h4 className="font-bold text-slate-900 mb-2">Direct-to-Chip & Immersion Cooling</h4>
              <p className="text-xs text-slate-600 mb-4">
                Cold plate, rear-door heat exchangers (RDHx), Cooling Distribution Units (CDUs), and waste heat recovery.
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li>• <strong>Cooling Overhead:</strong> &lt;0.05 additional beyond facility PUE</li>
                <li>• <strong>Thermal Response:</strong> Detection &lt;10s; mitigation &lt;60s</li>
                <li>• <strong>Chip Tj:</strong> Within vendor max with 10% safety margin</li>
              </ul>
            </div>

            {/* 2D */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 inline-block mb-3">2D. Physical Infrastructure & Build-Out</span>
              <h4 className="font-bold text-slate-900 mb-2">Civil, Structural & Security Engineering</h4>
              <p className="text-xs text-slate-600 mb-3">
                High slab loading designs, clean agent fire suppression, optical fiber pathways, and perimeter SCIF grade physical security.
              </p>
              <span className="text-xs font-semibold text-slate-500">Commissioning: Full IST (Integrated Systems Testing)</span>
            </div>

            {/* 2E */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs md:col-span-2">
              <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 inline-block mb-3">2E. Modular & Scalable AI Data Center Deployment</span>
              <h4 className="font-bold text-slate-900 mb-2">Rapid-Deployment Pre-Fabricated AI Pods</h4>
              <p className="text-xs text-slate-600 mb-4">
                Single-rack edge micro DCs (up to 100kW), pod-based modular deployments (1–10MW), and phased master-planned hyperscale campuses (100MW–1GW+).
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 block">Modular Speed:</span>
                  <strong className="text-slate-900">8–16 Weeks</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 block">Campus Build:</span>
                  <strong className="text-slate-900">18–36 Months</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 block">Scalability:</span>
                  <strong className="text-slate-900">10x Expansion</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 block">Standardization:</span>
                  <strong className="text-slate-900">&gt;80% Common</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OFFERING FAMILY 3 */}
        <section id="family-3" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <div>
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Offering Family 3</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                GPU & Accelerator Cluster Engineering
              </h3>
            </div>
          </div>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Physical and logical cluster topology design, high-speed rail-optimized fabrics, parallel NVMe storage architectures, and rigorous 9-step burn-in validation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* 3A & 3B */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 inline-block mb-2">3A & 3B</span>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Multi-Vendor Silicon & Topology Interconnect</h4>
              <p className="text-xs text-slate-600 mb-4">
                Architecture roadmap covering NVIDIA Blackwell (GB200 NVL72, B200), Hopper (H100/H200), AMD Instinct MI300X/MI350X, Intel Gaudi 3, and custom ASICs (TPU, Trainium).
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 rounded bg-slate-50">
                  <span className="text-slate-600">Intra-Node Bandwidth (NVLink):</span>
                  <strong className="text-slate-900">900 GB/s per GPU (Blackwell)</strong>
                </div>
                <div className="flex justify-between p-2 rounded bg-slate-50">
                  <span className="text-slate-600">Inter-Node All-Reduce Efficiency:</span>
                  <strong className="text-slate-900">&gt;90% of theoretical bandwidth</strong>
                </div>
                <div className="flex justify-between p-2 rounded bg-slate-50">
                  <span className="text-slate-600">Intra-Node GPU Latency:</span>
                  <strong className="text-slate-900">&lt;1 microsecond</strong>
                </div>
                <div className="flex justify-between p-2 rounded bg-slate-50">
                  <span className="text-slate-600">Failure Domain Isolation:</span>
                  <strong className="text-slate-900">Single node impacts &lt;2% of cluster</strong>
                </div>
              </div>
            </div>

            {/* 3C Storage Architecture */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 inline-block mb-2">3C</span>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Parallel Storage for Distributed AI</h4>
              <p className="text-xs text-slate-600 mb-4">
                Parallel file systems (GPFS, Lustre, BeeGFS, WekaIO) combined with NVMe-over-Fabrics (NVMe-oF) to feed GPUs at line speed without I/O starvation.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 rounded bg-slate-50">
                  <span className="text-slate-600">Aggregate Storage Bandwidth:</span>
                  <strong className="text-slate-900">&gt;100 GB/s per 8-GPU node</strong>
                </div>
                <div className="flex justify-between p-2 rounded bg-slate-50">
                  <span className="text-slate-600">Random 4K Read IOPS:</span>
                  <strong className="text-slate-900">&gt;10 Million IOPS per rack</strong>
                </div>
                <div className="flex justify-between p-2 rounded bg-slate-50">
                  <span className="text-slate-600">Checkpoint Save Time (70B model):</span>
                  <strong className="text-slate-900">&lt;5 minutes</strong>
                </div>
                <div className="flex justify-between p-2 rounded bg-slate-50">
                  <span className="text-slate-600">GPU Data Loading Idle:</span>
                  <strong className="text-slate-900">&lt;5% during training</strong>
                </div>
              </div>
            </div>
          </div>

          {/* 3D 9-Step Commissioning Process */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">3D. Quality Verification</span>
                <h4 className="text-lg sm:text-xl font-bold text-white">Systematic 9-Step GPU Cluster Commissioning & Burn-In</h4>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 hidden sm:inline">
                Zero-Defect Standard
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {[
                { step: '1', title: 'Hardware Verification', desc: 'GPU count, memory integrity, NVLink & NVSwitch full connectivity' },
                { step: '2', title: 'Thermal Stress Testing', desc: 'Sustained 100% compute utilization for 72+ consecutive hours' },
                { step: '3', title: 'Memory Error Detection', desc: 'ECC correctable/uncorrectable bit error tracking & row hammer validation' },
                { step: '4', title: 'Communication Benchmarks', desc: 'NCCL all-reduce, all-to-all, broadcast throughput profiling' },
                { step: '5', title: 'Failure Injection Testing', desc: 'Node kill, switch reboot, and network partition recovery validation' },
                { step: '6', title: 'Power Verification', desc: 'Confirm branch circuits, PDU loads, and peak kW under synthetic spikes' },
                { step: '7', title: 'Cooling Loop Validation', desc: 'Flow rate, supply/return delta-T under full thermal load' },
                { step: '8', title: 'Full System MLPerf', desc: 'Standardized MLPerf Training & MLPerf Inference baseline runs' },
                { step: '9', title: 'Burn-In Certification', desc: 'Official baseline telemetry log and production readiness sign-off' }
              ].map((item) => (
                <div key={item.step} className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white inline-flex items-center justify-center font-bold text-xs mb-1.5">
                    {item.step}
                  </span>
                  <h5 className="font-bold text-slate-100 mb-1">{item.title}</h5>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OFFERING FAMILY 4 */}
        <section id="family-4" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-sm">
              04
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Offering Family 4</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Systems Integration & Software Stack
              </h3>
            </div>
          </div>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Full-stack software orchestration combining Kubernetes GPU scheduling, Slurm HPC queues, multi-tenant QoS isolation, and hybrid cloud compute bursting.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 4A */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 inline-block mb-3">4A. AI Software Stack Integration</span>
              <h4 className="font-bold text-slate-900 mb-2">End-to-End Orchestration & Runtime</h4>
              <p className="text-xs text-slate-600 mb-4">
                Tuned operating systems, driver stacks, distributed frameworks, and serving engines.
              </p>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="p-2 rounded bg-slate-50"><strong>Inference Serving:</strong> vLLM, TensorRT-LLM, Triton, SGLang</div>
                <div className="p-2 rounded bg-slate-50"><strong>Distributed Training:</strong> DeepSpeed, FSDP, Megatron-LM</div>
                <div className="p-2 rounded bg-slate-50"><strong>Data Pipelines:</strong> Apache Spark, Ray Data, NVIDIA DALI</div>
                <div className="p-2 rounded bg-slate-50"><strong>Observability:</strong> Prometheus, Grafana, DCGM Telemetry</div>
              </div>
            </div>

            {/* 4B */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 inline-block mb-3">4B. Multi-Tenant Resource Management</span>
              <h4 className="font-bold text-slate-900 mb-2">Partitioning & Strict Tenant QoS</h4>
              <p className="text-xs text-slate-600 mb-4">
                NVIDIA Multi-Instance GPU (MIG) slicing, Kubernetes device plugins, and fair-share scheduling.
              </p>
              <ul className="text-xs text-slate-600 space-y-2">
                <li>• <strong>Utilization Yield:</strong> &gt;70% average; &gt;85% peak fleet</li>
                <li>• <strong>Tenant Interference:</strong> &lt;2% cross-tenant performance impact</li>
                <li>• <strong>Allocation Latency:</strong> &lt;30 seconds for new workload placement</li>
                <li>• <strong>Fairness Index:</strong> &gt;0.9 (Jain&apos;s Index) across equal priority</li>
              </ul>
            </div>

            {/* 4C */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200 inline-block mb-3">4C. Hybrid & Multi-Cloud Federation</span>
              <h4 className="font-bold text-slate-900 mb-2">On-Prem to Cloud Workload Mobility</h4>
              <p className="text-xs text-slate-600 mb-4">
                Seamless cloud bursting, global weight distribution, and unified identity for distributed clusters.
              </p>
              <ul className="text-xs text-slate-600 space-y-2">
                <li>• <strong>Hybrid Cloud Bursting:</strong> Low-friction spike orchestration</li>
                <li>• <strong>Edge Model Distribution:</strong> Instant synchronization to edge nodes</li>
                <li>• <strong>Unified Telemetry:</strong> Cross-cloud single-pane observability</li>
                <li>• <strong>Zero Egress Waste:</strong> Intelligent dataset chunk caching</li>
              </ul>
            </div>
          </div>
        </section>

        {/* OFFERING FAMILY 5 */}
        <section id="family-5" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
              05
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Offering Family 5</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                AI Factory Operations & GPU Ops
              </h3>
            </div>
          </div>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Continuous operational excellence: 24/7 GPU health monitoring, LLM Ops lifecycle pipelines, inference & training micro-optimization, gang scheduling, and predictive thermal maintenance.
          </p>

          {/* 6 Sub-offerings in Family 5 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 5A GPU Ops */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">5A</span>
                <span className="text-xs font-bold text-emerald-600">&gt;99.5% Uptime</span>
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">GPU Operations (GPU Ops)</h4>
              <p className="text-xs text-slate-600 mb-3">
                Telemetry monitoring, staged driver/firmware updates with rollback, predictive failure alerting, and vendor RMA spare pool management.
              </p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• <strong>MTTD:</strong> &lt;5 minutes to detect GPU anomaly</li>
                <li>• <strong>MTTR:</strong> &lt;2 hours (hot spare); &lt;24 hours (RMA)</li>
                <li>• <strong>Predictive Accuracy:</strong> &gt;80% failures caught early</li>
              </ul>
            </div>

            {/* 5B LLM Ops */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">5B</span>
                <span className="text-xs font-bold text-blue-600">&gt;99.9% Endpoint SLA</span>
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">LLM Operations (LLM Ops)</h4>
              <p className="text-xs text-slate-600 mb-3">
                Blue/green canary model deployments, prompt & output guardrail monitoring, model drift detection, automated fine-tuning, and RAG index maintenance.
              </p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• <strong>P50 Latency:</strong> &lt;200ms standard request</li>
                <li>• <strong>P99 Latency:</strong> &lt;1000ms standard request</li>
                <li>• <strong>Rollback Time:</strong> &lt;5 minutes to previous version</li>
              </ul>
            </div>

            {/* 5C Inference Performance */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">5C</span>
                <span className="text-xs font-bold text-indigo-600">2–5x Throughput</span>
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Inference Performance Optimization</h4>
              <p className="text-xs text-slate-600 mb-3">
                Quantization (INT4/INT8/FP8), speculative decoding, continuous batching, prefix/prompt caching, custom CUDA FlashAttention kernels.
              </p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• <strong>TTFT:</strong> &lt;100ms Time-to-First-Token</li>
                <li>• <strong>ITL:</strong> &lt;30ms Inter-Token Latency (streaming)</li>
                <li>• <strong>HBM Memory Yield:</strong> &gt;85% actively utilized</li>
              </ul>
            </div>

            {/* 5D Training Optimization */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">5D</span>
                <span className="text-xs font-bold text-purple-600">&gt;45% MFU</span>
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Training Performance Optimization</h4>
              <p className="text-xs text-slate-600 mb-3">
                Distributed strategies (FSDP, ZeRO, Megatron), gradient compression, micro-batch tuning, asynchronous incremental checkpointing.
              </p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• <strong>Training GPU Yield:</strong> &gt;80% sustained under load</li>
                <li>• <strong>Job Completion:</strong> &gt;95% without human intervention</li>
                <li>• <strong>Failure Resume:</strong> &lt;15 minutes auto-restart</li>
              </ul>
            </div>

            {/* 5E Workload Scheduling */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">5E</span>
                <span className="text-xs font-bold text-amber-600">&lt;60s Scheduling</span>
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Cluster Workload Operations</h4>
              <p className="text-xs text-slate-600 mb-3">
                Workload-aware placement, gang scheduling for distributed runs, priority preemption, automated runbooks, and SLA incident management.
              </p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• <strong>Cluster GPU Utilization:</strong> 70–85% fleet average</li>
                <li>• <strong>Incident Rate:</strong> &lt;2 incidents/mo per 100 GPUs</li>
                <li>• <strong>Tier-1 Compliance:</strong> &gt;99% SLA adherence</li>
              </ul>
            </div>

            {/* 5F Predictive Maintenance */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">5F</span>
                <span className="text-xs font-bold text-rose-600">&lt;0.5% Unplanned</span>
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Predictive Maintenance & Thermals</h4>
              <p className="text-xs text-slate-600 mb-3">
                Junction hot-spot prediction, cooling pump/fan health, memory error trends, cable BER degradation, and inventory spare optimization.
              </p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• <strong>Predictive Accuracy:</strong> &gt;80% caught in advance</li>
                <li>• <strong>Alert False Positives:</strong> &lt;10% threshold</li>
                <li>• <strong>Spare Availability:</strong> &gt;95% critical components</li>
              </ul>
            </div>
          </div>
        </section>

        {/* OFFERING FAMILY 6 */}
        <section id="family-6" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
              06
            </div>
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Offering Family 6</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                HPC Convergence & High-Performance Computing
              </h3>
            </div>
          </div>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Unified compute infrastructure supporting traditional scientific simulation (CFD, FEA, molecular dynamics) alongside massive AI training and inference.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block mb-3">6A. Converged Architecture</span>
              <h4 className="font-bold text-slate-900 mb-2">Unified MPI & NCCL Fabric</h4>
              <p className="text-xs text-slate-600 mb-4">
                Simultaneous support for all-to-all collective AI traffic and nearest-neighbor HPC stencil communications.
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li>• <strong>HPC Efficiency (HPL):</strong> &gt;85% of peak theoretical FLOPS</li>
                <li>• <strong>AI Efficiency (MFU):</strong> &gt;45% of peak theoretical FLOPS</li>
                <li>• <strong>Co-Scheduling Impact:</strong> &lt;5% interference penalty</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 inline-block mb-3">6B. HPC Cluster Deployment</span>
              <h4 className="font-bold text-slate-900 mb-2">Scale from 10 to 1,000+ Nodes</h4>
              <p className="text-xs text-slate-600 mb-4">
                Turn-key deployment with InfiniBand NDR/XDR, Lustre/GPFS parallel file systems, and optimized math compilers.
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li>• <strong>Departmental Scale:</strong> 1–10 nodes</li>
                <li>• <strong>Institutional Scale:</strong> 10–100 nodes</li>
                <li>• <strong>National Lab Scale:</strong> 100–1,000+ nodes</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 inline-block mb-3">6C. Performance Tuning</span>
              <h4 className="font-bold text-slate-900 mb-2">Application Acceleration</h4>
              <p className="text-xs text-slate-600 mb-4">
                Profiling and vectorizing ANSYS, OpenFOAM, GROMACS, WRF with GPU kernel tuning (CUDA/HIP).
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li>• <strong>Strong Scaling:</strong> &gt;70% efficiency at 100 nodes</li>
                <li>• <strong>Weak Scaling:</strong> &gt;90% efficiency at 100 nodes</li>
                <li>• <strong>Runtime Reduction:</strong> 20–50% vs. baseline</li>
              </ul>
            </div>
          </div>
        </section>

        {/* OFFERING FAMILY 7 */}
        <section id="family-7" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-sm">
              07
            </div>
            <div>
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Offering Family 7</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Security, Sovereignty & Compliance
              </h3>
            </div>
          </div>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Air-gapped sovereign deployments, confidential GPU computing, Post-Quantum Cryptography (PQC), and automated conformity with the EU AI Act, NIST AI RMF, and ISO 42001.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 inline-block mb-3">7A. Sovereign & Air-Gapped AI</span>
              <h4 className="font-bold text-slate-900 mb-2">Completely Isolated Operations</h4>
              <p className="text-xs text-slate-600 mb-3">
                Air-gapped network fabric, domestic hardware supply chain assurance, private container registries, and SCIF-grade physical facility integration.
              </p>
              <div className="text-xs font-semibold text-purple-700 bg-purple-50 p-2 rounded">
                Defense & Sovereign State Ready
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 inline-block mb-3">7B. AI Security & PQC</span>
              <h4 className="font-bold text-slate-900 mb-2">Zero-Trust & Quantum Resistance</h4>
              <p className="text-xs text-slate-600 mb-3">
                NVIDIA Confidential Computing, model IP watermarking, data poisoning detection, and NIST Post-Quantum Cryptography (PQC / CBOM) implementation.
              </p>
              <div className="text-xs font-semibold text-rose-700 bg-rose-50 p-2 rounded">
                Threat MTTD: &lt;15 minutes
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mb-3">7C. Regulatory Compliance</span>
              <h4 className="font-bold text-slate-900 mb-2">Compliance-by-Design</h4>
              <p className="text-xs text-slate-600 mb-3">
                EU AI Act risk classification gateways, NIST AI RMF govern/map/measure/manage cycles, ISO 42001 alignment, and real-time evidence collection.
              </p>
              <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 p-2 rounded">
                Audit Pass Rate Target: &gt;98%
              </div>
            </div>
          </div>
        </section>

        {/* PART III: COMPLETE LIFECYCLE METRICS DASHBOARD */}
        <section id="lifecycle-metrics" className="scroll-mt-32">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
              Part III: Quantified Impact
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Complete Lifecycle Metrics Dashboard
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Verifiable, SLA-backed performance guarantees contrasting industry baseline status with TrustGrid optimized production targets.
            </p>
          </div>

          {/* Metric Category Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="flex border-b border-slate-200 overflow-x-auto bg-slate-50/70 p-2 gap-2">
              {[
                { id: 'infra', label: '3.1 Infrastructure Layer' },
                { id: 'compute', label: '3.2 Compute Layer' },
                { id: 'economic', label: '3.3 Economic & Cost' },
                { id: 'operational', label: '3.4 Operational & Reliability' },
                { id: 'security', label: '3.5 Security & Compliance' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMetricsTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeMetricsTab === tab.id
                      ? 'bg-white text-blue-600 shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeMetricsTab === 'infra' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
                        <th className="pb-3 px-4">Metric Category</th>
                        <th className="pb-3 px-4">Metric</th>
                        <th className="pb-3 px-4">Baseline (Typical)</th>
                        <th className="pb-3 px-4 text-blue-600">TrustGrid Optimized Target</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr><td className="py-3 px-4 font-semibold">Power</td><td className="py-3 px-4">PUE (Power Usage Effectiveness)</td><td className="py-3 px-4 text-slate-500">1.4–1.8</td><td className="py-3 px-4 font-bold text-emerald-600">&lt; 1.10 (design); &lt; 1.15 (ops)</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Power</td><td className="py-3 px-4">Power density per rack</td><td className="py-3 px-4 text-slate-500">5–15kW</td><td className="py-3 px-4 font-bold text-blue-600">30–100kW (liquid-cooled)</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Cooling</td><td className="py-3 px-4">WUE (Water Usage Effectiveness)</td><td className="py-3 px-4 text-slate-500">1.0–2.0 L/kWh</td><td className="py-3 px-4 font-bold text-emerald-600">&lt; 0.5 L/kWh</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Cooling</td><td className="py-3 px-4">Thermal events per month</td><td className="py-3 px-4 text-slate-500">5–15 events</td><td className="py-3 px-4 font-bold text-emerald-600">&lt; 1 event per month</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Facility</td><td className="py-3 px-4">Facility Electrical Availability</td><td className="py-3 px-4 text-slate-500">99.0–99.5%</td><td className="py-3 px-4 font-bold text-blue-600">&gt; 99.99% (Tier III+)</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeMetricsTab === 'compute' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
                        <th className="pb-3 px-4">Domain</th>
                        <th className="pb-3 px-4">Metric</th>
                        <th className="pb-3 px-4">Baseline (Typical)</th>
                        <th className="pb-3 px-4 text-blue-600">TrustGrid Optimized Target</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr><td className="py-3 px-4 font-semibold">GPU</td><td className="py-3 px-4">Cluster utilization</td><td className="py-3 px-4 text-slate-500">30–50%</td><td className="py-3 px-4 font-bold text-blue-600">70–85% sustained</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">GPU</td><td className="py-3 px-4">GPU availability</td><td className="py-3 px-4 text-slate-500">95–98%</td><td className="py-3 px-4 font-bold text-emerald-600">&gt; 99.5% per month</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">GPU</td><td className="py-3 px-4">MFU (Model FLOPS Utilization)</td><td className="py-3 px-4 text-slate-500">25–35%</td><td className="py-3 px-4 font-bold text-indigo-600">&gt; 45% for large models</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">GPU</td><td className="py-3 px-4">Inference throughput (tokens/s/GPU)</td><td className="py-3 px-4 text-slate-500">Baseline unoptimized</td><td className="py-3 px-4 font-bold text-purple-600">2–5x over baseline</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Storage</td><td className="py-3 px-4">Aggregate bandwidth</td><td className="py-3 px-4 text-slate-500">Varies (10–30 GB/s)</td><td className="py-3 px-4 font-bold text-blue-600">&gt; 100 GB/s per 8-GPU node</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Storage</td><td className="py-3 px-4">Training data GPU idle time</td><td className="py-3 px-4 text-slate-500">15–30%</td><td className="py-3 px-4 font-bold text-emerald-600">&lt; 5% during training</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Network</td><td className="py-3 px-4">All-reduce collective efficiency</td><td className="py-3 px-4 text-slate-500">70–80%</td><td className="py-3 px-4 font-bold text-cyan-600">&gt; 90% theoretical bandwidth</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeMetricsTab === 'economic' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
                        <th className="pb-3 px-4">Category</th>
                        <th className="pb-3 px-4">Economic Metric</th>
                        <th className="pb-3 px-4">Baseline</th>
                        <th className="pb-3 px-4 text-emerald-600">TrustGrid Optimized Target</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr><td className="py-3 px-4 font-semibold">Cost</td><td className="py-3 px-4">Effective cost of intelligence</td><td className="py-3 px-4 text-slate-500">Baseline</td><td className="py-3 px-4 font-bold text-emerald-600">20–40% reduction</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Cost</td><td className="py-3 px-4">Production cost-per-token</td><td className="py-3 px-4 text-slate-500">Baseline</td><td className="py-3 px-4 font-bold text-emerald-600">Up to 60% reduction</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Cost</td><td className="py-3 px-4">Cost-per-training-step</td><td className="py-3 px-4 text-slate-500">Baseline</td><td className="py-3 px-4 font-bold text-emerald-600">30–50% reduction</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Cost</td><td className="py-3 px-4">Infrastructure TCO (5-year)</td><td className="py-3 px-4 text-slate-500">Baseline</td><td className="py-3 px-4 font-bold text-blue-600">25–40% reduction</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Speed</td><td className="py-3 px-4">Time-to-production</td><td className="py-3 px-4 text-slate-500">6–12 months</td><td className="py-3 px-4 font-bold text-indigo-600">Weeks to months faster</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Value</td><td className="py-3 px-4">GPU-hour utilization for cost recovery</td><td className="py-3 px-4 text-slate-500">50–60%</td><td className="py-3 px-4 font-bold text-purple-600">&gt; 80% recovered</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeMetricsTab === 'operational' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
                        <th className="pb-3 px-4">Category</th>
                        <th className="pb-3 px-4">Operational Metric</th>
                        <th className="pb-3 px-4">Baseline</th>
                        <th className="pb-3 px-4 text-blue-600">TrustGrid Optimized Target</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr><td className="py-3 px-4 font-semibold">Reliability</td><td className="py-3 px-4">Mean Time Between Failures (MTBF)</td><td className="py-3 px-4 text-slate-500">Varies (~1,500 hrs)</td><td className="py-3 px-4 font-bold text-emerald-600">&gt; 5,000 hours per GPU</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Reliability</td><td className="py-3 px-4">Mean Time To Recovery (MTTR)</td><td className="py-3 px-4 text-slate-500">8–24 hours</td><td className="py-3 px-4 font-bold text-blue-600">&lt; 2 hours (hot spare)</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Operations</td><td className="py-3 px-4">Unplanned downtime</td><td className="py-3 px-4 text-slate-500">2–5%</td><td className="py-3 px-4 font-bold text-emerald-600">&lt; 0.5%</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Operations</td><td className="py-3 px-4">Deployment frequency (models)</td><td className="py-3 px-4 text-slate-500">Weekly/monthly</td><td className="py-3 px-4 font-bold text-indigo-600">Multiple per day (CI/CD)</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Operations</td><td className="py-3 px-4">Rollback time</td><td className="py-3 px-4 text-slate-500">Hours</td><td className="py-3 px-4 font-bold text-purple-600">&lt; 5 minutes</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Operations</td><td className="py-3 px-4">Operational incident rate</td><td className="py-3 px-4 text-slate-500">5–10 per month</td><td className="py-3 px-4 font-bold text-emerald-600">&lt; 2 / month per 100 GPUs</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeMetricsTab === 'security' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
                        <th className="pb-3 px-4">Category</th>
                        <th className="pb-3 px-4">Metric</th>
                        <th className="pb-3 px-4">Baseline</th>
                        <th className="pb-3 px-4 text-purple-600">TrustGrid Target</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr><td className="py-3 px-4 font-semibold">Compliance</td><td className="py-3 px-4">Compliance audit pass rate</td><td className="py-3 px-4 text-slate-500">70–85%</td><td className="py-3 px-4 font-bold text-emerald-600">&gt; 98% pass rate</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Compliance</td><td className="py-3 px-4">Evidence collection time</td><td className="py-3 px-4 text-slate-500">Weeks of manual audit</td><td className="py-3 px-4 font-bold text-blue-600">Automated, continuous real-time</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Security</td><td className="py-3 px-4">Mean time to detect threat</td><td className="py-3 px-4 text-slate-500">Hours–days</td><td className="py-3 px-4 font-bold text-rose-600">&lt; 15 minutes</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Security</td><td className="py-3 px-4">Supply chain verification coverage</td><td className="py-3 px-4 text-slate-500">Partial / ad-hoc</td><td className="py-3 px-4 font-bold text-indigo-600">100% of critical components</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Security</td><td className="py-3 px-4">Post-quantum readiness</td><td className="py-3 px-4 text-slate-500">Not addressed</td><td className="py-3 px-4 font-bold text-purple-600">Integrated PQC / CBOM</td></tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* PART IV: ENGAGEMENT MODELS & MATURITY PROGRESSION */}
        <section id="maturity-progression" className="scroll-mt-32">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200/60 inline-block mb-3">
              Part IV: Delivery & Roadmap
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Engagement Framework & Maturity Progression
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Flexible commercial entry points mapped against a progressive five-phase journey to fully autonomous, self-tuning AI infrastructure.
            </p>
          </div>

          {/* 5-Phase Maturity Progression Visual Pipeline */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-10">
            <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Sparkles size={18} className="text-blue-600" />
              <span>4.2 Enterprise AI Maturity Progression</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  phase: 'PHASE 1',
                  time: 'Weeks 1–4',
                  title: 'Assess & Diagnose',
                  color: 'border-blue-500 bg-blue-50/50',
                  badge: 'text-blue-700 bg-blue-100',
                  items: ['Infrastructure audit & baseline', 'TOC bottleneck identification', 'Cost-per-token benchmarking', 'GPU utilization assessment', 'Prioritized roadmap']
                },
                {
                  phase: 'PHASE 2',
                  time: 'Weeks 4–12',
                  title: 'Optimize & Accelerate',
                  color: 'border-cyan-500 bg-cyan-50/50',
                  badge: 'text-cyan-700 bg-cyan-100',
                  items: ['Architectural improvements', 'KV-cache & quantization tuning', 'Distributed strategy optimization', 'Scheduling improvements', '30–60% efficiency gains']
                },
                {
                  phase: 'PHASE 3',
                  time: 'Weeks 12–24',
                  title: 'Integrate & Standardize',
                  color: 'border-indigo-500 bg-indigo-50/50',
                  badge: 'text-indigo-700 bg-indigo-100',
                  items: ['Full software stack integration', 'Multi-tenant QoS management', 'Observability deployment', 'Operational runbooks', 'LLM Ops & GPU Ops tooling']
                },
                {
                  phase: 'PHASE 4',
                  time: 'Months 6–12',
                  title: 'Industrialize & Scale',
                  color: 'border-purple-500 bg-purple-50/50',
                  badge: 'text-purple-700 bg-purple-100',
                  items: ['Enterprise GPU fleet management', 'Multi-site standardization', 'Capacity planning optimization', 'Compliance automation', 'Cost engineering at scale']
                },
                {
                  phase: 'PHASE 5',
                  time: 'Months 12+',
                  title: 'Autonomous Compounding',
                  color: 'border-emerald-500 bg-emerald-50/50',
                  badge: 'text-emerald-700 bg-emerald-100',
                  items: ['Self-tuning infrastructure', 'Predictive capacity management', 'Closed-loop optimization', 'Quantum-hybrid readiness', 'Full operational autonomy']
                }
              ].map((p, idx) => (
                <div key={idx} className={`p-4 rounded-xl border-t-4 ${p.color} border-slate-200 flex flex-col justify-between`}>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${p.badge}`}>{p.phase}</span>
                      <span className="text-[11px] font-medium text-slate-500">{p.time}</span>
                    </div>
                    <h5 className="font-bold text-slate-900 text-sm mb-3">{p.title}</h5>
                    <ul className="space-y-1.5 text-[11.5px] text-slate-600">
                      {p.items.map((it, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check size={12} className="text-blue-600 shrink-0 mt-0.5" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4.1 Engagement Matrix Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-base">4.1 Engagement Framework Matrix</h4>
                <p className="text-xs text-slate-500">Scoping and delivery models tailored to enterprise readiness</p>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                11 Engagement Models
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider">
                    <th className="py-3 px-6">Engagement</th>
                    <th className="py-3 px-6">Duration</th>
                    <th className="py-3 px-6">Scope</th>
                    <th className="py-3 px-6">Entry Point</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr><td className="py-3 px-6 font-semibold text-slate-900">AI Factory Architecture Audit</td><td className="py-3 px-6">4 weeks</td><td className="py-3 px-6">Full-stack assessment and roadmap</td><td className="py-3 px-6">Any maturity level</td></tr>
                  <tr><td className="py-3 px-6 font-semibold text-slate-900">Inference Economics Assessment</td><td className="py-3 px-6">4–8 weeks</td><td className="py-3 px-6">Deep-dive on inference cost and performance</td><td className="py-3 px-6">Production inference workloads</td></tr>
                  <tr><td className="py-3 px-6 font-semibold text-slate-900">GPU Cluster Optimization</td><td className="py-3 px-6">4–8 weeks</td><td className="py-3 px-6">Cluster utilization and performance improvement</td><td className="py-3 px-6">Existing GPU clusters</td></tr>
                  <tr><td className="py-3 px-6 font-semibold text-slate-900">HPC-AI Convergence Assessment</td><td className="py-3 px-6">4–6 weeks</td><td className="py-3 px-6">HPC workload profiling and convergence strategy</td><td className="py-3 px-6">Organizations with HPC and AI needs</td></tr>
                  <tr><td className="py-3 px-6 font-semibold text-slate-900">Data Center Feasibility Study</td><td className="py-3 px-6">6–12 weeks</td><td className="py-3 px-6">Site selection, power analysis, build-out planning</td><td className="py-3 px-6">Greenfield or expansion projects</td></tr>
                  <tr><td className="py-3 px-6 font-semibold text-slate-900">Data Center Design & Build</td><td className="py-3 px-6">12–36 months</td><td className="py-3 px-6">Full facility design, construction, commissioning</td><td className="py-3 px-6">100MW+ new builds</td></tr>
                  <tr><td className="py-3 px-6 font-semibold text-slate-900">Full AI Factory Design & Build</td><td className="py-3 px-6">16–32 weeks</td><td className="py-3 px-6">Complete architecture, procurement, deployment</td><td className="py-3 px-6">Turnkey AI factory</td></tr>
                  <tr><td className="py-3 px-6 font-semibold text-slate-900">GPU Ops Managed Service</td><td className="py-3 px-6">Ongoing</td><td className="py-3 px-6">Day-to-day GPU cluster operations</td><td className="py-3 px-6">Production GPU clusters</td></tr>
                  <tr><td className="py-3 px-6 font-semibold text-slate-900">LLM Ops Managed Service</td><td className="py-3 px-6">Ongoing</td><td className="py-3 px-6">Model serving, fine-tuning, lifecycle management</td><td className="py-3 px-6">Production LLM deployments</td></tr>
                  <tr><td className="py-3 px-6 font-semibold text-slate-900">Continuous Optimization</td><td className="py-3 px-6">Ongoing</td><td className="py-3 px-6">Performance, cost, and reliability optimization</td><td className="py-3 px-6">Any production AI infrastructure</td></tr>
                  <tr><td className="py-3 px-6 font-semibold text-slate-900">Managed AI Factory</td><td className="py-3 px-6">Ongoing</td><td className="py-3 px-6">Full infrastructure operations and optimization</td><td className="py-3 px-6">Enterprise AI factories</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* PART V: METHODOLOGY ENGINE */}
        <section id="methodology-engine" className="scroll-mt-32">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60 inline-block mb-3">
              Part V: Methodology Engine
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Industrial Engineering Applied to AI Infrastructure
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Transforming intelligence production by applying century-proven manufacturing disciplines to eliminate compute waste, optimize yield, and minimize cost-per-token.
            </p>
          </div>

          {/* OpEx Continuous Loop Visual */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-md mb-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">5.2 Operational Excellence Framework</span>
                <h4 className="text-xl font-bold text-white mt-1">Continuous Closed-Loop Infrastructure Tuning</h4>
              </div>
              <div className="text-xs text-slate-400 max-w-sm">
                Measure → Analyze → Improve → Control loop enforced 24/7 across every compute cluster.
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-xs font-bold text-blue-400 block mb-1">01. MEASURE</span>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li>• Telemetry capture</li>
                  <li>• Benchmarking</li>
                  <li>• OEE scoring</li>
                  <li>• Cost tracking</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-xs font-bold text-cyan-400 block mb-1">02. ANALYZE</span>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li>• Root cause analysis</li>
                  <li>• TOC constraint ranking</li>
                  <li>• Capacity modeling</li>
                  <li>• Variance detection</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-xs font-bold text-emerald-400 block mb-1">03. IMPROVE</span>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li>• Kernel optimization</li>
                  <li>• PagedAttention tuning</li>
                  <li>• Automation runbooks</li>
                  <li>• Dynamic scheduling</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-xs font-bold text-purple-400 block mb-1">04. CONTROL</span>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li>• Statistical control (SPC)</li>
                  <li>• Baseline drift alerts</li>
                  <li>• Compliance audit</li>
                  <li>• Board ROI reporting</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 5.1 Industrial Engineering Grid */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 bg-slate-50 border-b border-slate-200">
              <h4 className="font-bold text-slate-900 text-base">5.1 Applied Industrial Engineering Methodologies</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider">
                    <th className="py-3 px-6">Methodology</th>
                    <th className="py-3 px-6">Application Domain</th>
                    <th className="py-3 px-6">Specific AI Infrastructure Use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 text-xs sm:text-sm">
                  <tr><td className="py-3 px-6 font-bold text-slate-900">Lean Thinking</td><td className="py-3 px-6 text-slate-600">Waste elimination</td><td className="py-3 px-6">Eliminate idle GPU time, memory waste, network underutilization</td></tr>
                  <tr><td className="py-3 px-6 font-bold text-slate-900">Value Stream Mapping</td><td className="py-3 px-6 text-slate-600">Process optimization</td><td className="py-3 px-6">Map token production from prompt ingestion to response delivery</td></tr>
                  <tr><td className="py-3 px-6 font-bold text-slate-900">Theory of Constraints (TOC)</td><td className="py-3 px-6 text-slate-600">Bottleneck management</td><td className="py-3 px-6">Identify and elevate infrastructure bottlenecks (memory, PCIe, network, power)</td></tr>
                  <tr><td className="py-3 px-6 font-bold text-slate-900">OEE</td><td className="py-3 px-6 text-slate-600">Equipment effectiveness</td><td className="py-3 px-6">Measure GPU OEE = Availability × Performance × Quality</td></tr>
                  <tr><td className="py-3 px-6 font-bold text-slate-900">TPM</td><td className="py-3 px-6 text-slate-600">Preventive maintenance</td><td className="py-3 px-6">Proactive GPU, cooling, and power system maintenance</td></tr>
                  <tr><td className="py-3 px-6 font-bold text-slate-900">SMED</td><td className="py-3 px-6 text-slate-600">Changeover reduction</td><td className="py-3 px-6">Minimize model deployment and workload switching time</td></tr>
                  <tr><td className="py-3 px-6 font-bold text-slate-900">5S / 6S</td><td className="py-3 px-6 text-slate-600">Environment organization</td><td className="py-3 px-6">Systematic data center and cluster hygiene</td></tr>
                  <tr><td className="py-3 px-6 font-bold text-slate-900">DMAIC</td><td className="py-3 px-6 text-slate-600">Quality improvement</td><td className="py-3 px-6">Structured latency, throughput, and cost improvement cycles</td></tr>
                  <tr><td className="py-3 px-6 font-bold text-slate-900">Kaizen</td><td className="py-3 px-6 text-slate-600">Continuous improvement</td><td className="py-3 px-6">Ongoing cost-per-token and throughput optimization</td></tr>
                  <tr><td className="py-3 px-6 font-bold text-slate-900">FMEA</td><td className="py-3 px-6 text-slate-600">Risk management</td><td className="py-3 px-6">Infrastructure failure mode analysis and prevention</td></tr>
                  <tr><td className="py-3 px-6 font-bold text-slate-900">SPC</td><td className="py-3 px-6 text-slate-600">Statistical control</td><td className="py-3 px-6">Real-time monitoring with statistical process control charts</td></tr>
                  <tr><td className="py-3 px-6 font-bold text-slate-900">Life Cycle Costing</td><td className="py-3 px-6 text-slate-600">Total cost engineering</td><td className="py-3 px-6">Complete TCO modeling including power, cooling, depreciation</td></tr>
                  <tr><td className="py-3 px-6 font-bold text-slate-900">Target Costing</td><td className="py-3 px-6 text-slate-600">Cost engineering</td><td className="py-3 px-6">Infrastructure design to meet target cost-per-token</td></tr>
                  <tr><td className="py-3 px-6 font-bold text-slate-900">Six Sigma</td><td className="py-3 px-6 text-slate-600">Variation reduction</td><td className="py-3 px-6">Reduce inference latency variance, training time variance</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* PART VI: PRODUCTION USE CASES */}
        <section id="use-cases" className="scroll-mt-32">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
              Part VI: Production Scenarios
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Production Use Cases
            </h2>
            <p className="text-base text-slate-600 mt-2">
              From gigawatt hyperscale training clusters to sovereign defense facilities and edge micro-DCs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Private/Sovereign AI Factory', scale: '10–100MW', reqs: 'Air-gapped, domestic, fully auditable', sol: 'Full-stack deployment, security, compliance' },
              { title: 'Hyperscale Training Cluster', scale: '100MW–1GW', reqs: '10,000+ GPUs, extreme interconnect', sol: 'Power engineering, cluster topology, HPC convergence' },
              { title: 'Enterprise Inference Platform', scale: '1–10MW', reqs: 'Low latency, high availability, multi-model', sol: 'Inference optimization, GPU Ops, LLM Ops' },
              { title: 'HPC-AI Converged Facility', scale: '10–50MW', reqs: 'Simulation + AI, dual workload support', sol: 'Converged architecture, dual-stack operations' },
              { title: 'Edge AI Inference', scale: '100kW–1MW', reqs: 'Low latency, compact deployment', sol: 'Modular data center, optimized serving' },
              { title: 'Financial Services AI', scale: '5–50MW', reqs: 'Ultra-low latency, regulatory compliance', sol: 'GPU placement, compliance engineering' },
              { title: 'Defense / Aerospace AI', scale: 'Variable', reqs: 'Security, air-gapped, high assurance', sol: 'Sovereign deployment, SCIF integration' },
              { title: 'Life Sciences AI', scale: '5–20MW', reqs: 'Data-intensive, model-heavy, compliance', sol: 'Storage architecture, HPC convergence' },
              { title: 'AI Cloud Service Provider', scale: '50–500MW', reqs: 'Multi-tenant, cost-optimized, scalable', sol: 'Multi-tenant ops, GPU Ops, capacity planning' }
            ].map((uc, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-900 text-sm">{uc.title}</h4>
                  <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">{uc.scale}</span>
                </div>
                <div className="space-y-2 text-xs text-slate-600 mt-3">
                  <div>
                    <span className="text-slate-400 block text-[10.5px] uppercase font-bold">Key Requirements:</span>
                    <span className="text-slate-800 font-medium">{uc.reqs}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10.5px] uppercase font-bold">TrustGrid Solution:</span>
                    <span className="text-blue-700 font-medium">{uc.sol}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PART VII: TECHNOLOGY VENDOR ECOSYSTEM */}
        <section id="ecosystem" className="scroll-mt-32">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200/60 inline-block mb-3">
              Part VII: Ecosystem Alliances
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Technology Vendor Ecosystem
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Unbiased multi-vendor engineering across silicon, power, cooling, optics, and software stacks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 7.1 Hardware Landscape */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h4 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
                <Cpu size={18} className="text-blue-600" />
                <span>7.1 Hardware Partner Landscape</span>
              </h4>
              <div className="space-y-3 text-xs">
                {[
                  { cat: 'GPU - Training', vendors: 'NVIDIA H100/H200/B100/B200/GB200 NVL72, AMD MI300X/MI350X' },
                  { cat: 'GPU - Inference', vendors: 'NVIDIA L4/L40S/H100, AMD MI300X, Intel Gaudi 3' },
                  { cat: 'Custom ASIC', vendors: 'Google TPU v5/v6, AWS Trainium/Inferentia, Microsoft Maia' },
                  { cat: 'CPU', vendors: 'AMD EPYC 9004/9005, Intel Xeon 5th/6th Gen, ARM Neoverse' },
                  { cat: 'Interconnect', vendors: 'NVIDIA InfiniBand NDR/XDR, RoCEv2, Ethernet 400G/800G' },
                  { cat: 'Storage', vendors: 'DDN, VAST Data, NetApp, Pure Storage, WekaIO, Dell PowerScale' },
                  { cat: 'Networking', vendors: 'Arista, Mellanox/NVIDIA, Cisco, Juniper' },
                  { cat: 'Cooling', vendors: 'Vertiv, Schneider Electric, CoolIT, GRC (immersion), Motivair' },
                  { cat: 'Power', vendors: 'Schneider Electric, Eaton, Vertiv, Cummins, Caterpillar' },
                  { cat: 'Racks & Infra', vendors: 'Schneider Electric, Vertiv, Rittal, Chatsworth' }
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:justify-between gap-1">
                    <strong className="text-slate-900 min-w-36">{item.cat}:</strong>
                    <span className="text-slate-600 sm:text-right">{item.vendors}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 7.2 Software Landscape */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h4 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
                <Terminal size={18} className="text-indigo-600" />
                <span>7.2 Software Partner Landscape</span>
              </h4>
              <div className="space-y-3 text-xs">
                {[
                  { cat: 'Orchestration', vendors: 'Kubernetes (GPU operator), Slurm, OpenCycleLab' },
                  { cat: 'Inference Serving', vendors: 'vLLM, TensorRT-LLM, Triton, SGLang, Ollama (edge)' },
                  { cat: 'Training Frameworks', vendors: 'PyTorch, DeepSpeed, Megatron-LM, FSDP, JAX' },
                  { cat: 'Monitoring', vendors: 'Prometheus, Grafana, DCGM, custom telemetry' },
                  { cat: 'Storage Filesystem', vendors: 'GPFS/Spectrum Scale, Lustre, BeeGFS, JuiceFS' },
                  { cat: 'Security & PQC', vendors: 'NVIDIA Confidential Computing, HashiCorp Vault, custom PQC' }
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:justify-between gap-1">
                    <strong className="text-slate-900 min-w-36">{item.cat}:</strong>
                    <span className="text-slate-600 sm:text-right">{item.vendors}</span>
                  </div>
                ))}
              </div>

              {/* Commercial Models Summary Mini-Card */}
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">Commercial Engagement</span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Project-Based (Fixed Scope) • Time & Materials • Managed Services (GPU Ops / LLM Ops) • Outcome-Based (Token Cost Reduction) • Hybrid Models.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PART VIII: VALUE PROPOSITION BY STAKEHOLDER */}
        <section id="commercial-model" className="scroll-mt-32">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60 inline-block mb-3">
              Part VIII: Stakeholder Value Realization
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Value Proposition by Stakeholder
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Transforming AI infrastructure from an unpredictable cost center into a board-defensible, high-yield enterprise asset.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded border border-purple-200 inline-block mb-3">C-Suite</span>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Strategic Defensibility</h4>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li>• Predictable, board-defensible AI infrastructure investment</li>
                <li>• Verified compliance with emerging AI regulations</li>
                <li>• Measurable ROI with unit economics transparency</li>
                <li>• Compounding operational advantage over time</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200 inline-block mb-3">VP of Infra / CTO</span>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Operational Elimination</h4>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li>• Eliminated operational complexity across GPU, network, power</li>
                <li>• Single point of accountability from power to token delivery</li>
                <li>• Industry-leading utilization rates & cost efficiency</li>
                <li>• Proactive operations with predictive maintenance</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200 inline-block mb-3">AI / ML Engineering</span>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Developer Velocity</h4>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li>• Faster time-to-production for new models and workloads</li>
                <li>• Optimized inference & training performance</li>
                <li>• Self-service provisioning within governance guardrails</li>
                <li>• Reliable infrastructure without manual babysitting</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 inline-block mb-3">CFO & Finance</span>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Unit Economic Yield</h4>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li>• 20–40% reduction in effective cost of intelligence</li>
                <li>• Up to 60% reduction in production cost-per-token</li>
                <li>• Clear cost attribution per workload, tenant, model</li>
                <li>• 5-year TCO optimization with continuous cost engineering</li>
              </ul>
            </div>
          </div>
        </section>

        {/* APPENDIX: ACRONYM REFERENCE & DOCUMENT CONTROL */}
        <section className="pt-8 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-slate-600">
            <div className="p-6 rounded-2xl bg-white border border-slate-200">
              <h5 className="font-bold text-slate-900 text-sm mb-3">Appendix A: Acronym & Term Reference</h5>
              <div className="space-y-1.5">
                <div><strong>AI Factory:</strong> Purpose-engineered compute system producing intelligence as reliably as a semiconductor fab produces chips.</div>
                <div><strong>GPU Ops:</strong> Operational management of GPU clusters (health telemetry, driver management, lifecycle).</div>
                <div><strong>LLM Ops:</strong> Operational management of large language model serving, deployment, versioning, and lifecycle.</div>
                <div><strong>MFU:</strong> Model FLOPS Utilization — ratio of achieved compute to theoretical peak.</div>
                <div><strong>OEE:</strong> Overall Equipment Effectiveness = Availability × Performance × Quality.</div>
                <div><strong>PUE:</strong> Power Usage Effectiveness = Total facility energy / IT equipment energy.</div>
                <div><strong>WUE:</strong> Water Usage Effectiveness = Liters of water / kWh of IT energy.</div>
                <div><strong>TTFT & ITL:</strong> Time To First Token & Inter-Token Latency.</div>
                <div><strong>KV-cache:</strong> Key-Value cache storing attention keys/values for autoregressive generation.</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between">
              <div>
                <h5 className="font-bold text-slate-900 text-sm mb-3">Appendix B: Document Control</h5>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-500">Document Version:</span>
                    <strong className="text-slate-900">2.0</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-500">Classification:</span>
                    <strong className="text-blue-600">Strategic Offering Blueprint</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-500">Scope:</span>
                    <span className="text-slate-800">Complete AI Infrastructure & Data Center Portfolio</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-500">Expansion Areas:</span>
                    <span className="text-slate-800">HPC, GPU Ops, LLM Ops, 100MW–GW DC Design/Build, Systems Integration</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Review Cycle:</span>
                    <span className="text-slate-800">Quarterly Continuous Alignment</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>TrustGrid.AI Infrastructure Practice</span>
                <span>Confidential & Proprietary</span>
              </div>
            </div>
          </div>
        </section>

        {/* PROPOSAL & DIAGNOSTIC CTA FORM SECTION */}
        <section id="contact-advisory" className="pt-12 pb-6">
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-12 shadow-2xl border border-slate-800 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Header & Value Proposition */}
            <div className="max-w-4xl mx-auto text-center mb-10 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/60 border border-blue-700 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
                <Sparkles size={13} />
                <span>Executive Engagement</span>
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-white">
                Schedule Your AI Factory Strategic Assessment
              </h3>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mb-6">
                Engage directly with TrustGrid Principal Infrastructure Architects to benchmark your GPU utilization, profile token unit economics, and review greenfield power/cooling feasibility.
              </p>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8 text-left text-xs sm:text-sm text-slate-300 max-w-4xl mx-auto">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>GPU cluster topology & interconnect review</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>Inference cost-per-token optimization roadmap</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>Liquid cooling & power distribution (100MW–GW)</span>
                </div>
              </div>

              {/* Quick CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <WhatsAppCTA />
                <Link
                  href="/book-ai-diagnostic?solution=ai-infra-engineering"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all hover:border-white/40"
                >
                  <span>Self-Service Readiness Assessment</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* Wide Full-Width Light Form Card */}
            <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl text-slate-900 border border-slate-200 relative z-10">
              <div className="border-b border-slate-200 pb-5 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xl sm:text-2xl tracking-tight">Request AI Infra Architecture Consultation</h4>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Direct engagement with our AI Systems Engineering team</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Senior Architect Review (24-48h SLA)
                  </span>
                </div>
              </div>

              <TrustGridForm defaultSolution="ai-infra-engineering" variant="proposal" />
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  )
}

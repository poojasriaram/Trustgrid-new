'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import {
  Network,
  Lock,
  ShieldCheck,
  Cpu,
  Zap,
  Workflow,
  Satellite,
  Cable,
  Plane,
  Building2,
  Factory,
  Radio,
  Wifi,
  Globe2,
  SlidersHorizontal,
  Sparkles,
  CheckCircle2,
  Activity,
  BarChart3,
  Target,
  Layers,
  ShieldAlert,
  Server,
  FileSpreadsheet,
  Boxes,
  Compass,
  Briefcase,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  ChevronDown,
  Check,
  Clock,
  Search,
  Filter,
  Shield,
  Phone,
  Mail,
  HelpCircle,
  TrendingUp,
  FileText
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { TrustGridForm } from '@/components/ui/trustgrid-form'
import { WhatsAppCTA } from '@/components/ui/whatsapp-cta'
import { HeroCanvas } from '@/components/ui/hero-canvas'
import { BorderBeam } from '@/components/ui/border-beam'
import { trackCTA, sendAnalyticsEvent } from '@/lib/analytics'
import {
  sectorPortfolios,
  deliveryPhases,
  aiNocSetupSteps,
  platformOfferings,
  engagementModels,
  wifiEngagementTracks,
  entryPointGuidance,
  valueRealizationMetrics,
  glossaryTerms,
  acronymsList,
  SectorPortfolio
} from '@/lib/ai-networking-cybersecurity-data'

export default function AINetworkingCybersecurityPage() {
  // Sector Portfolio interactive state
  const [activeSectorId, setActiveSectorId] = useState<string>('enterprises')
  const [sectorPhaseFilter, setSectorPhaseFilter] = useState<'All' | 'Plan' | 'Design' | 'Implement' | 'Operate'>('All')

  // Delivery Framework interactive state
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0)

  // Hash navigation and sector auto-switching
  useEffect(() => {
    const handleHash = () => {
      if (typeof window === 'undefined') return
      const rawHash = window.location.hash.replace('#', '')
      if (!rawHash) return

      // Sector mapping by hash
      const sectorIds = ['enterprises', 'hyperscale-datacenters', 'campus-environments', 'manufacturing-mission-critical', 'satellite-networking', 'cable-landing-stations', 'aerospace-air-tech']
      const matchingSector = sectorIds.find(id => id === rawHash || rawHash.includes(id) || id.includes(rawHash))
      
      if (matchingSector) {
        setActiveSectorId(matchingSector)
      } else if (rawHash.includes('satellite') || rawHash.includes('subsea') || rawHash === 'ntn-satellite-subsea') {
        if (rawHash.includes('subsea') || rawHash.includes('cable-landing')) {
          setActiveSectorId('cable-landing-stations')
        } else {
          setActiveSectorId('satellite-networking')
        }
      } else if (rawHash.includes('urwb') || rawHash.includes('manufacturing') || rawHash === 'urwb-mission-critical') {
        setActiveSectorId('manufacturing-mission-critical')
      } else if (rawHash.includes('aerospace')) {
        setActiveSectorId('aerospace-air-tech')
      } else if (rawHash.includes('campus')) {
        setActiveSectorId('campus-environments')
      } else if (rawHash.includes('hyperscale') || rawHash.includes('datacenter')) {
        setActiveSectorId('hyperscale-datacenters')
      }

      // Smooth scroll with offset for sticky header
      setTimeout(() => {
        const el = document.getElementById(rawHash)
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 90
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }, 80)
    }

    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])


  // Calculator state
  const [gpuCount, setGpuCount] = useState<number>(1024)
  const [fabricType, setFabricType] = useState<'roce' | 'infiniband' | 'spectrum-x' | 'hybrid'>('spectrum-x')
  const [pqcEnabled, setPqcEnabled] = useState<boolean>(true)

  // Acronym search state
  const [acronymQuery, setAcronymQuery] = useState<string>('')
  const [acronymDomainFilter, setAcronymDomainFilter] = useState<string>('All')

  // Active sector lookup
  const currentSector: SectorPortfolio = useMemo(() => {
    return sectorPortfolios.find(s => s.id === activeSectorId) || sectorPortfolios[0]
  }, [activeSectorId])

  // Filtered offerings for the current sector
  const filteredOfferings = useMemo(() => {
    if (sectorPhaseFilter === 'All') return currentSector.offerings
    return currentSector.offerings.filter(o => o.phase === sectorPhaseFilter)
  }, [currentSector, sectorPhaseFilter])

  // Filtered acronyms
  const filteredAcronyms = useMemo(() => {
    return acronymsList.filter(item => {
      const matchesQuery = item.acronym.toLowerCase().includes(acronymQuery.toLowerCase()) ||
        item.meaning.toLowerCase().includes(acronymQuery.toLowerCase())
      const matchesDomain = acronymDomainFilter === 'All' || item.domain === acronymDomainFilter
      return matchesQuery && matchesDomain
    })
  }, [acronymQuery, acronymDomainFilter])

  const acronymDomains = useMemo(() => {
    const set = new Set<string>()
    acronymsList.forEach(a => set.add(a.domain))
    return ['All', ...Array.from(set)]
  }, [])

  // Calculator computed metrics
  const calculatedResults = useMemo(() => {
    const throughputMultiplier = fabricType === 'infiniband' ? 0.98 : fabricType === 'spectrum-x' ? 0.96 : fabricType === 'roce' ? 0.94 : 0.91
    const baseEffectiveThroughput = Math.round(gpuCount * 400 * throughputMultiplier) // Gbps
    const jctImprovement = fabricType === 'infiniband' ? 42 : fabricType === 'spectrum-x' ? 38 : fabricType === 'roce' ? 32 : 25
    const silentDropMs = fabricType === 'infiniband' ? '<50 ms' : '<100 ms'
    const containmentMins = pqcEnabled ? 'Sub-1 min' : 'Sub-3 min'
    const annualRiskSavings = Math.round(gpuCount * 1450 * (pqcEnabled ? 1.25 : 1.0))

    return {
      effectiveGbps: baseEffectiveThroughput.toLocaleString(),
      jctGain: jctImprovement,
      silentDropTime: silentDropMs,
      mttc: containmentMins,
      savings: annualRiskSavings.toLocaleString()
    }
  }, [gpuCount, fabricType, pqcEnabled])

  return (
    <div className="page-wrapper bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      <SiteHeader />

      {/* =================================================================== */}
      {/* 1. HERO SECTION & POSITIONING */}
      {/* =================================================================== */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-slate-950 text-white border-b border-slate-800">
        <HeroCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-slate-950 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-md">
              <Sparkles size={14} className="text-cyan-400 animate-pulse" />
              <span>Unified Full-Stack Offering · Master Portfolio v1.0</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
              AI Networking &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
                Cybersecurity Intelligence
              </span>
            </h1>

            {/* Subhead / Positioning Statement */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mb-8">
              From the LAN switch and WiFi access point to the orbital asset and the hyperscale AI factory —
              TrustGrid AI delivers measurable, purpose-engineered resilience with <strong>zero packet loss</strong>,
              <strong>sub-microsecond tail latency</strong>, and <strong>L1–L7 post-quantum cyber defense</strong> engineered as one nervous system.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#intake-form"
                onClick={() => trackCTA('book_diagnostic_hero', 'solutions_ai_net_cyber')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Book Executive Diagnostic (2–4 Wks)</span>
                <ArrowRight size={16} />
              </a>

              <WhatsAppCTA inline label="Discuss with Network & Cyber Architect" />

              <a
                href="#sectors"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
              >
                <span>Explore 7 Sector Portfolios</span>
                <ChevronDown size={16} />
              </a>
            </div>
          </div>

          {/* Quick Metrics Ticker */}
          <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl font-black text-cyan-400">&gt;96%</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Effective Bandwidth</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Zero packet loss</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl font-black text-blue-400">Sub-μs</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Tail Latency</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Jitter eliminated</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl font-black text-indigo-400">30–60%</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Latency Reduction</div>
              <div className="text-[11px] text-slate-500 mt-0.5">AI workload speedup</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl font-black text-emerald-400">&lt;3 Min</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">MTTC Target</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Sub-minute ambitions</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl font-black text-purple-400">70–80%</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Self-Healing</div>
              <div className="text-[11px] text-slate-500 mt-0.5">AIOps remediation</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl font-black text-cyan-300">100%</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">CBOM Coverage</div>
              <div className="text-[11px] text-slate-500 mt-0.5">NIST PQC migration</div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 2. THE UNIFYING IDEA: ONE NERVOUS SYSTEM */}
      {/* =================================================================== */}
      <section className="py-20 bg-white border-b border-slate-200" id="nervous-system">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/70 inline-block mb-3">
              The Unifying Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              One Nervous System: Unified NOC &amp; SOC Intelligence
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
              Why sell networking and cybersecurity separately when the modern AI estate cannot function without both?
              The same telemetry, self-healing engines, zero-trust identity fabric, and quantum-safe cryptography
              serve both performance and security outcomes across every domain.
            </p>
          </div>

          {/* Interactive Visual Correlation Flow */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
            {/* Left Column: Network Telemetry */}
            <div id="agent-identity-iam" className="relative p-6 sm:p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl overflow-hidden">
              <BorderBeam size={160} duration={9} colorFrom="#38bdf8" colorTo="#3b82f6" />
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold mb-5 border border-blue-500/30">
                <Network size={24} />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">AI Networking Layer</span>
              <h3 className="text-xl font-bold text-white mt-1 mb-3">Lossless Fabrics &amp; INT Telemetry</h3>
              <p className="text-sm text-slate-300 mb-6">
                Real-time In-Band Network Telemetry (INT) monitors microbursts, buffer saturation, PFC pause frames, and optical signal levels at line rate.
              </p>
              <ul className="text-xs text-slate-300 space-y-2.5 border-t border-slate-800 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                  <span>Silent-drop detection under 100 ms</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                  <span>Collective tuning (NCCL/RCCL)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                  <span>Cognitive WiFi 7 radio resource management</span>
                </li>
              </ul>
              <div className="mt-6 p-3 rounded-lg bg-blue-950/60 border border-blue-800/40 text-[11px] text-blue-200">
                <strong>Signal to SOC:</strong> Packet drops or unexpected buffer spikes trigger instant behavioral investigation.
              </div>
            </div>

            {/* Center Column: Correlation Engine */}
            <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white border border-indigo-700/50 shadow-2xl overflow-hidden flex flex-col justify-between">
              <BorderBeam size={200} duration={7} colorFrom="#60a5fa" colorTo="#c084fc" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold mb-5 border border-indigo-400/30">
                  <Workflow size={24} />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-300 font-semibold">Unified Correlation Core</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-3">Autonomous AI NOC/SOC Engine</h3>
                <p className="text-sm text-slate-200 mb-6">
                  Cross-domain correlation links network telemetry, agent behavior, prompt firewalls, and model runtimes into a unified closed loop.
                </p>
                <div className="space-y-3 border-t border-indigo-800/60 pt-4">
                  <div className="p-3 rounded-lg bg-indigo-950/70 border border-indigo-700/50 text-xs">
                    <span className="font-semibold text-cyan-300">Continuous Closed Loop:</span>
                    <p className="text-slate-300 text-[11px] mt-1">
                      70–80% of operational faults remediated autonomously; security containment triggers network-level micro-segmentation in seconds.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-indigo-950/70 border border-indigo-700/50 text-xs">
                    <span className="font-semibold text-cyan-300">Root-Cause SLA:</span>
                    <p className="text-slate-300 text-[11px] mt-1">
                      Sub-5-minute automated isolation separating physical faults, optical cuts, and adversarial lateral moves.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-indigo-800/40 text-center">
                <span className="text-[11px] uppercase tracking-wider font-bold text-indigo-300">
                  Shared Nervous System Across 7 Sectors
                </span>
              </div>
            </div>

            {/* Right Column: Cybersecurity Layer */}
            <div className="relative p-6 sm:p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl overflow-hidden">
              <BorderBeam size={160} duration={9} colorFrom="#a855f7" colorTo="#6366f1" />
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold mb-5 border border-purple-500/30">
                <Lock size={24} />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold">AI Cybersecurity Layer</span>
              <h3 className="text-xl font-bold text-white mt-1 mb-3">Quantum-Safe &amp; Zero-Trust</h3>
              <p className="text-sm text-slate-300 mb-6">
                Automated CBOM inventory, NIST PQC migration, SPIFFE/SPIRE agent IAM, prompt-injection firewalls, and model-weight signing protect the intellectual core.
              </p>
              <ul className="text-xs text-slate-300 space-y-2.5 border-t border-slate-800 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-purple-400 shrink-0" />
                  <span>Harvest Now Decrypt Later (HNDL) defense</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-purple-400 shrink-0" />
                  <span>Ephemeral agent identity revocation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-purple-400 shrink-0" />
                  <span id="confidential-compute">Hardware TEEs &amp; confidential compute</span>
                </li>
              </ul>
              <div className="mt-6 p-3 rounded-lg bg-purple-950/60 border border-purple-800/40 text-[11px] text-purple-200">
                <strong>Signal to NOC:</strong> Compromised agent session revokes SPIFFE identity and instructs fabric to reroute clean flows.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 3. CORE CROSS-CUTTING PLATFORM OFFERINGS */}
      {/* =================================================================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200" id="platform-offerings">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100/60 px-3 py-1 rounded-full border border-blue-200 inline-block mb-3">
                Section 3 · Platform Foundation
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Core Cross-Cutting Platform Offerings
              </h2>
              <p className="text-base text-slate-600 mt-2 max-w-2xl">
                These six core offerings are available standalone or act as the foundational bedrock across every sector engagement.
              </p>
            </div>
            <a
              href="#intake-form"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              <span>Request Platform Scope</span>
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {platformOfferings.map((item, idx) => {
              const Icon = item.icon
              const anchorIds = ['lossless-fabrics', 'autonomous-ai-noc', 'pqc-cbom', 'managed-ai-soc', 'cognitive-wifi-7-offering', 'domain-overlay']
              const cardId = anchorIds[idx] || `platform-offering-${idx}`
              return (
                <div
                  key={idx}
                  id={cardId}
                  className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/50">
                        Offering {item.number}
                      </span>
                      <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                        <Icon size={18} />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
                      {item.summary}
                    </p>
                    <div className="space-y-2 border-t border-slate-100 pt-4 mb-4">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Key Deliverables</div>
                      <ul className="text-xs text-slate-700 space-y-1.5">
                        {item.deliverables.map((del, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <Check size={13} className="text-blue-600 shrink-0 mt-0.5" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 italic">
                    <strong>Differentiator:</strong> {item.differentiator}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Cognitive WiFi Excellence Spotlight */}
          <div id="cognitive-wifi-7" className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white border border-blue-800 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold px-2.5 py-1 rounded bg-blue-800/50 border border-blue-400/30 inline-block mb-3">
                  Offering 3.5 Deep Dive · WiFi Excellence Layer
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Cognitive / AI-Native WiFi as a First-Class Fabric
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  Wireless is no longer an afterthought. TrustGrid AI engineers WiFi 6E/7 as an intelligent, zero-trust,
                  high-density access fabric capable of supporting tens of thousands of roams per second at stadium and campus scale,
                  with real-time AI radio resource management, WPA3 + MACsec, and autonomous rogue AP containment feeding the AI SOC.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
                    <span>AI-RRM with 70–80% autonomous remediation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
                    <span>Dynamic Segmentation &amp; WPA3 + MACsec</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
                    <span>Campus-gateway-scale seamless roaming</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
                    <span>Private 5G &amp; URWB industrial convergence</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-3 justify-center items-start lg:items-end">
                <div className="p-4 rounded-xl bg-blue-950/80 border border-blue-700/50 text-left w-full">
                  <div className="text-xs text-cyan-300 font-semibold">Cognitive WiFi Value Sprint</div>
                  <div className="text-lg font-bold text-white mt-0.5">4–8 Weeks Pilot</div>
                  <div className="text-[11px] text-slate-400 mt-1">Rapid AI-RRM &amp; zero-trust access control stand-up.</div>
                </div>
                <a
                  href="#intake-form"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-600/30"
                >
                  <span>Book WiFi Assessment</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 4. DELIVERY FRAMEWORK: PLAN -> DESIGN -> IMPLEMENT -> OPERATE */}
      {/* =================================================================== */}
      <section className="py-20 bg-white border-b border-slate-200" id="lifecycle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/70 inline-block mb-3">
              Section 2 · Engineering Lifecycle
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Plan → Design → Implement → Operate (with AIOps)
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Every engagement follows the same stage-gated pathway with explicit deliverables, milestones, and verifiable business impact.
              <strong> AIOps is not a phase; it is a thread</strong> that runs through all four phases.
            </p>
          </div>

          {/* Phase Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-slate-100 max-w-3xl mx-auto mb-10 border border-slate-200">
            {deliveryPhases.map((phase, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhaseIndex(idx)}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activePhaseIndex === idx
                    ? 'bg-white text-blue-600 shadow-sm border border-slate-200/70'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {phase.phase === 'AIOps' ? 'AIOps Thread' : `Phase 0${idx + 1}: ${phase.phase}`}
              </button>
            ))}
          </div>

          {/* Active Phase Detail Card */}
          {deliveryPhases[activePhaseIndex] && (
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl max-w-5xl mx-auto relative overflow-hidden">
              <BorderBeam size={220} duration={8} colorFrom="#38bdf8" colorTo="#818cf8" />
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                      {deliveryPhases[activePhaseIndex].phase === 'AIOps' ? 'Cross-Cutting Automation Thread' : `Lifecycle Stage 0${activePhaseIndex + 1}`}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                      {deliveryPhases[activePhaseIndex].title}
                    </h3>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-lg bg-blue-500/10 border border-blue-400/30 text-xs font-semibold text-blue-300">
                    Automation: {deliveryPhases[activePhaseIndex].automationFocus}
                  </div>
                </div>

                <div className="py-6 border-b border-slate-800">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">Stage Objective</h4>
                  <p className="text-base sm:text-lg text-slate-200 font-medium">
                    {deliveryPhases[activePhaseIndex].objective}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
                      <Workflow size={14} className="text-cyan-400" />
                      <span>Typical Engineering Activities</span>
                    </h4>
                    <ul className="text-xs sm:text-sm text-slate-300 space-y-2.5">
                      {deliveryPhases[activePhaseIndex].typicalActivities.map((act, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2.5">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-400" />
                      <span>Key Outputs &amp; Deliverables</span>
                    </h4>
                    <ul className="text-xs sm:text-sm text-slate-300 space-y-2.5">
                      {deliveryPhases[activePhaseIndex].keyOutputs.map((out, oIdx) => (
                        <li key={oIdx} className="flex items-start gap-2.5">
                          <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{out}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI NOC 5-Step Setup Pathway */}
          <div id="ai-noc-setup" className="mt-16 max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Standard Operational Pathway
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Setting Up the Autonomous AI NOC (5-Step Framework)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {aiNocSetupSteps.map((step, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 relative">
                  <div className="text-xs font-mono font-bold text-blue-600 mb-1">Step {step.step}</div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 5. SECTOR PORTFOLIOS — DEEP INTERACTIVE EXPLORER */}
      {/* =================================================================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200" id="sectors">
        <div id="sector-portfolios-diagnostic" />
        <div id="ntn-satellite-subsea" />
        <div id="urwb-mission-critical" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100/60 px-3 py-1 rounded-full border border-blue-200 inline-block mb-3">
              Section 4 · Domain Architectures
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              7 Sector Portfolios &amp; Capabilities
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Each sector includes <strong>11–12 focused offerings</strong> spanning Plan, Design, Implement, and Operate,
              plus <strong>4–7 measurable capabilities</strong>, real-world solutions, and cross-domain synergies.
            </p>
          </div>

          {/* Sector Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {sectorPortfolios.map((sec) => {
              const Icon = sec.icon
              const isSelected = sec.id === activeSectorId
              return (
                <button
                  key={sec.id}
                  onClick={() => {
                    setActiveSectorId(sec.id)
                    setSectorPhaseFilter('All')
                    sendAnalyticsEvent({
                      action: 'select_sector_portfolio',
                      category: 'portfolio_navigation',
                      label: sec.title
                    })
                  }}
                  id={sec.id}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Icon size={16} />
                  <span>{sec.title}</span>
                </button>
              )
            })}
          </div>

          {/* Current Sector Explorer Header Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-md mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0 border border-blue-100">
                  <currentSector.icon size={28} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
                      {currentSector.badge}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500">WiFi Emphasis: <strong>{currentSector.wifiEmphasis}</strong></span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {currentSector.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-3xl leading-relaxed">
                    {currentSector.overview}
                  </p>
                </div>
              </div>

              {/* At A Glance Badge Strip */}
              <div className="flex flex-wrap gap-2.5 lg:flex-col lg:items-end shrink-0">
                <div className="px-3.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-700 font-semibold">
                  {currentSector.offeringsCount} Focused Offerings
                </div>
                <div className="px-3.5 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-700 font-semibold">
                  {currentSector.capabilitiesCount} Core Capabilities
                </div>
                <div className="px-3.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-semibold">
                  {currentSector.phasesSummary}
                </div>
              </div>
            </div>

            {/* Offerings Filter Controls */}
            <div className="pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Sector Offerings ({filteredOfferings.length} of {currentSector.offerings.length})
                  </h4>
                  <p className="text-xs text-slate-500">Filter offerings by engineering lifecycle phase:</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {(['All', 'Plan', 'Design', 'Implement', 'Operate'] as const).map((phase) => (
                    <button
                      key={phase}
                      onClick={() => setSectorPhaseFilter(phase)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        sectorPhaseFilter === phase
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {phase === 'All' ? 'All (12)' : `${phase} (3)`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Offerings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredOfferings.map((offering) => {
                  const phaseColors = {
                    Plan: 'bg-amber-50 text-amber-700 border-amber-200',
                    Design: 'bg-blue-50 text-blue-700 border-blue-200',
                    Implement: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    Operate: 'bg-purple-50 text-purple-700 border-purple-200'
                  }
                  return (
                    <div
                      key={offering.id}
                      className="p-5 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-blue-300 hover:bg-white transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-mono font-bold text-slate-400">
                            Offering #{offering.id}
                          </span>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${phaseColors[offering.phase]}`}>
                            {offering.phase}
                          </span>
                        </div>
                        <h5 className="font-bold text-slate-900 text-sm mb-2">{offering.title}</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">{offering.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Capabilities Badges */}
            <div className="mt-8 pt-8 border-t border-slate-100">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
                Measurable Capabilities ({currentSector.capabilities.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {currentSector.capabilities.map((cap, cIdx) => (
                  <div key={cIdx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-blue-600 shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-World Solutions & Use Cases */}
            <div className="mt-8 pt-8 border-t border-slate-100">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
                Solutions &amp; Use Cases
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentSector.solutionsUseCases.map((sol, sIdx) => (
                  <div key={sIdx} className="p-4 rounded-xl bg-blue-50/40 border border-blue-100">
                    <h5 className="text-sm font-bold text-slate-900 mb-1">{sol.title}</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">{sol.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cross-Domain Synergy Callout */}
            <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-cyan-300 uppercase tracking-wider mr-2">Cross-Domain Synergy:</span>
                <span className="text-slate-200">{currentSector.crossDomainSynergy}</span>
              </div>
              <a
                href="#intake-form"
                className="shrink-0 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all text-center"
              >
                Discuss {currentSector.title} Pilot
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 6. INTERACTIVE NETWORK & CYBER RESILIENCE CALCULATOR */}
      {/* =================================================================== */}
      <section className="py-20 bg-slate-900 text-white border-b border-slate-800" id="calculator">
        <div id="collective-tuning" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/80 inline-block mb-3">
              Interactive ROI &amp; Resilience Simulator
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              AI Fabric Yield &amp; Cyber Defense Calculator
            </h2>
            <p className="text-base text-slate-300 mt-2">
              Model how lossless interconnects, collective-communication tuning, and PQC-ready zero-trust architecture
              impact your effective GPU throughput and risk exposure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
            {/* Input Controls (Left Column) */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
              {/* Slider 1: GPU Accelerator Count */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Accelerator Cluster Scale (GPUs / Nodes)
                  </label>
                  <span className="text-sm font-mono font-bold text-cyan-400 bg-slate-900 px-3 py-1 rounded border border-slate-800">
                    {gpuCount.toLocaleString()} GPUs
                  </span>
                </div>
                <input
                  type="range"
                  min="64"
                  max="16384"
                  step="64"
                  value={gpuCount}
                  onChange={(e) => setGpuCount(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>64 (Pilot Pod)</span>
                  <span>1,024 (Tier-1 Cluster)</span>
                  <span>16,384 (Hyperscale AI Factory)</span>
                </div>
              </div>

              {/* Selector 2: Network Fabric Type */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                  Interconnect Fabric Architecture
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'infiniband', label: 'Quantum-2 InfiniBand', desc: 'NDR/XDR 400G–800G' },
                    { id: 'spectrum-x', label: 'Spectrum-X Ethernet', desc: 'RoCEv2 Lossless Rail' },
                    { id: 'roce', label: 'Standard RoCEv2', desc: 'PFC/ECN Tuned' },
                    { id: 'hybrid', label: 'Hybrid Multi-Domain', desc: 'Terrestrial + NTN' }
                  ].map((fab) => (
                    <button
                      key={fab.id}
                      onClick={() => setFabricType(fab.id as any)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        fabricType === fab.id
                          ? 'bg-blue-600/20 border-blue-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-xs font-bold">{fab.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{fab.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle 3: PQC Enablement */}
              <div className="pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-200">Post-Quantum Cryptography (PQC) &amp; CBOM</div>
                    <div className="text-[11px] text-slate-400">NIST ML-KEM / ML-DSA hybrid migration with line-rate MACsec.</div>
                  </div>
                  <button
                    onClick={() => setPqcEnabled(!pqcEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${pqcEnabled ? 'bg-blue-600' : 'bg-slate-800'}`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white transition-transform ${pqcEnabled ? 'translate-x-7' : 'translate-x-1'}`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Output (Right Column) */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 border border-blue-800/60 shadow-xl relative overflow-hidden">
              <BorderBeam size={180} duration={8} colorFrom="#38bdf8" colorTo="#818cf8" />
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Simulated Impact Model
              </span>
              <h3 className="text-xl font-bold text-white mt-1 mb-6">Estimated Performance &amp; Risk Yield</h3>

              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400">Total Non-Blocking Bandwidth</div>
                  <div className="text-2xl font-black text-white mt-0.5">{calculatedResults.effectiveGbps} <span className="text-sm font-normal text-cyan-400">Gbps</span></div>
                  <div className="text-[11px] text-emerald-400 mt-0.5">&gt;96% effective yield guarantee</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400">Job Completion Time (JCT) Acceleration</div>
                  <div className="text-2xl font-black text-cyan-400 mt-0.5">+{calculatedResults.jctGain}% <span className="text-sm font-normal text-slate-300">faster throughput</span></div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Collective communication barrier wait eliminated</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">Silent Drop Alert</div>
                    <div className="text-base font-bold text-white mt-0.5">{calculatedResults.silentDropTime}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">Threat Containment</div>
                    <div className="text-base font-bold text-purple-400 mt-0.5">{calculatedResults.mttc}</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40">
                  <div className="text-[11px] uppercase tracking-wider text-emerald-300">Annual Risk &amp; Idle-GPU Avoidance</div>
                  <div className="text-xl font-black text-emerald-400 mt-0.5">${calculatedResults.savings} <span className="text-xs font-normal text-slate-300">estimated value</span></div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Calculated based on training restart prevention and breach containment.</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-center">
                <a
                  href="#intake-form"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md"
                >
                  <span>Validate Targets in 2-Wk Diagnostic</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 7. ENGAGEMENT MODELS & DELIVERY TRACKS */}
      {/* =================================================================== */}
      <section className="py-20 bg-white border-b border-slate-200" id="engagement-models">
        <div id="diagnostic-engagement" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/70 inline-block mb-3">
              Section 5 · Structured Commercial Pathways
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Engagement Models &amp; Delivery Tracks
            </h2>
            <p className="text-base text-slate-600 mt-2">
              All engagements follow an accountable engineering pathway with explicit deliverables, milestones,
              and verifiable business impact.
            </p>
          </div>

          {/* 4 Core Engagement Models Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-14">
            {engagementModels.map((model) => (
              <div
                key={model.id}
                className="p-7 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-blue-600 bg-blue-100/60 px-2.5 py-1 rounded">
                      Duration: {model.duration}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">Stage-Gated</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{model.title}</h3>
                  <p className="text-xs text-slate-600 mb-4 italic"><strong>Ideal for:</strong> {model.idealFor}</p>

                  <div className="space-y-2 border-t border-slate-200 pt-4 mb-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Scope &amp; Activities</div>
                    <ul className="text-xs text-slate-700 space-y-1.5">
                      {model.scope.slice(0, 4).map((sc, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>{sc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {model.variant && (
                    <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200/60 mb-4">
                      <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wide">
                        Variant: {model.variant.title} ({model.variant.duration})
                      </span>
                      <p className="text-[11px] text-blue-900 mt-0.5">{model.variant.description}</p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">Explicit engineering deliverables</span>
                  <a
                    href="#intake-form"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    <span>Request Model Sizing</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* WiFi-Weighted Engagement Tracks Table */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 max-w-5xl mx-auto mb-14">
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                Specialized Track Summary
              </span>
              <h3 className="text-xl font-bold text-white mt-1">WiFi-Weighted Engagement Tracks</h3>
              <p className="text-xs text-slate-400 mt-1">
                Fast-track pathways optimized for campus, enterprise, and industrial wireless modernization.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2.5 pr-4 font-bold uppercase tracking-wider">Track</th>
                    <th className="py-2.5 px-4 font-bold uppercase tracking-wider">Duration</th>
                    <th className="py-2.5 px-4 font-bold uppercase tracking-wider">Engineering Focus</th>
                    <th className="py-2.5 pl-4 font-bold uppercase tracking-wider">Ideal For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {wifiEngagementTracks.map((trk, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 pr-4 font-bold text-white">{trk.track}</td>
                      <td className="py-3 px-4 text-cyan-400 font-mono">{trk.duration}</td>
                      <td className="py-3 px-4">{trk.focus}</td>
                      <td className="py-3 pl-4 text-slate-400">{trk.idealFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Decision Matrix: Where Should You Start? */}
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Decision Guide</span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">Where Should Your Organization Start?</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {entryPointGuidance.map((guide, gIdx) => (
                <div key={gIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">If your situation is...</span>
                    <p className="text-xs font-semibold text-slate-800 mt-1 mb-3">{guide.situation}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-200">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Start with:</span>
                    <div className="text-xs font-bold text-slate-900 mt-0.5">{guide.recommendation}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Typical: {guide.timeframe}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 8. VALUE REALIZATION METRICS TABLE (SECTION 7) */}
      {/* =================================================================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200" id="metrics">
        <div id="compliance-immutable-audit" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-3">
              Section 7 · Verifiable Outcomes
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Value Realization Metrics &amp; Benchmarks
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Every deliverable is anchored to empirical engineering targets and industry benchmarks,
              validated during the Diagnostic phase and verified in production.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden max-w-5xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Metric</th>
                    <th className="py-3.5 px-4">What It Measures</th>
                    <th className="py-3.5 px-4">Indicative Target</th>
                    <th className="py-3.5 px-4">Primary Domains</th>
                    <th className="py-3.5 px-4 text-right">Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {valueRealizationMetrics.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">{row.metric}</td>
                      <td className="py-3 px-4 text-slate-600">{row.whatItMeasures}</td>
                      <td className="py-3 px-4 font-mono font-bold text-blue-600">{row.indicativeTarget}</td>
                      <td className="py-3 px-4 text-slate-500">{row.primaryDomains}</td>
                      <td className="py-3 px-4 text-right">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          {row.impactBadge}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 9. GLOSSARY & ACRONYMS (SECTION 8) */}
      {/* =================================================================== */}
      <section className="py-20 bg-white border-b border-slate-200" id="glossary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 inline-block mb-3">
              Section 8 · Engineering Definitions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Glossary &amp; Industry Acronyms
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Definitive technical vocabulary spanning AI fabrics, quantum-safe cryptography, and autonomous AIOps.
            </p>
          </div>

          {/* Key Terms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mb-14">
            {glossaryTerms.map((term, tIdx) => (
              <div key={tIdx} className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold text-slate-900">{term.term}</h4>
                  {term.fullName && (
                    <span className="text-[10px] font-mono text-slate-400">{term.fullName}</span>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">{term.definition}</p>
              </div>
            ))}
          </div>

          {/* Searchable Acronyms Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Full Acronym Directory ({filteredAcronyms.length} items)</h3>
                <p className="text-xs text-slate-400">Search and filter across 34 engineering acronyms:</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search acronym..."
                    value={acronymQuery}
                    onChange={(e) => setAcronymQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 w-44"
                  />
                </div>

                <select
                  value={acronymDomainFilter}
                  onChange={(e) => setAcronymDomainFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
                >
                  {acronymDomains.map((dom) => (
                    <option key={dom} value={dom}>{dom}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-72 overflow-y-auto pr-2">
              {filteredAcronyms.map((ac, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-cyan-400 text-xs mr-2">{ac.acronym}</span>
                    <span className="text-[11px] text-slate-300">{ac.meaning}</span>
                  </div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 bg-slate-700 px-1.5 py-0.5 rounded shrink-0">
                    {ac.domain}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 10. EXECUTIVE INTAKE & DIAGNOSTIC BOOKING */}
      {/* =================================================================== */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden" id="intake-form">
        <HeroCanvas />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Context & Assurances */}
            <div className="lg:col-span-5">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold px-2.5 py-1 rounded bg-blue-900/50 border border-blue-500/30 inline-block mb-3">
                Diagnostic Intake Gate
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Initiate Your AI Networking &amp; Cyber Diagnostic
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
                Connect with our Principal AI Network &amp; Security Architects to baseline your fabric,
                discover your Cryptographic Bill of Materials (CBOM), and architect a zero-loss, quantum-safe operating model.
              </p>

              <div className="space-y-4 mt-8">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs font-bold text-cyan-300">Phase 01: 2–4 Week Diagnostic Sprint</div>
                  <p className="text-xs text-slate-400 mt-1">
                    Delivers a board-ready posture report, passive INT telemetry analysis, RF spectrum study, and 90-day ROI realization roadmap.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs font-bold text-emerald-300">Confidentiality &amp; Security Standard</div>
                  <p className="text-xs text-slate-400 mt-1">
                    All telemetry ingestion, packet inspection, and CBOM discovery are executed under mutual enterprise NDA with strict data-residency controls.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-cyan-400" />
                  <span>Direct Advisory: advisory@trustgrid.ai</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-cyan-400" />
                  <span>Global Response: +1 (800) 878-7847</span>
                </div>
              </div>

              <div className="mt-6">
                <WhatsAppCTA inline label="Instant WhatsApp Consultation" />
              </div>
            </div>

            {/* Right Column: Lead Form */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white text-slate-900 shadow-2xl border border-slate-200">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">Request Diagnostic Proposal</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Complete this form to schedule your technical scoping session. An architect will respond within 4 business hours.
                </p>
              </div>

              <TrustGridForm
                variant="diagnostic"
                formName="AI Networking & Cybersecurity Diagnostic"
                ctaSource="solutions_ai_networking_cybersecurity"
                defaultSolution="AI Networking & Cybersecurity Intelligence"
                includeRequirement={true}
              />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

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
  Award,
  Sun,
  Wind,
  Leaf,
  DollarSign,
  LineChart,
  Cable,
  Satellite,
  ShieldAlert,
  Scale,
  Building,
  Compass,
  Share2,
  Anchor,
  FileText,
  CheckSquare,
  Boxes,
  MapPin,
  Maximize2,
  Phone,
  Mail,
  Users,
  Shield,
  Layers3
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { TrustGridForm } from '@/components/ui/trustgrid-form'
import { WhatsAppCTA } from '@/components/ui/whatsapp-cta'
import { HeroCanvas } from '@/components/ui/hero-canvas'
import { BorderBeam } from '@/components/ui/border-beam'
import { ICPSlider } from '@/components/ui/icp-slider'
import { trackCTA, sendAnalyticsEvent } from '@/lib/analytics'

export default function AIInfraEngineeringPage() {
  const [activeLifecycleStage, setActiveLifecycleStage] = useState(0)
  const [activeOfferingsTab, setActiveOfferingsTab] = useState<'site' | 'design' | 'build' | 'ops'>('site')
  const [activeMetricsTab, setActiveMetricsTab] = useState<'infra' | 'compute' | 'economic' | 'operational' | 'security'>('infra')
  const [activeComplianceDimension, setActiveComplianceDimension] = useState<'design' | 'audit' | 'readiness' | 'certification' | 'monitoring'>('design')
  const [activePillarsTab, setActivePillarsTab] = useState<'catalog' | 'governance' | 'sales'>('catalog')

  // 7 Lifecycle Stages Data from Source Document
  const lifecycleStages = [
    {
      step: '01',
      title: 'Land Identification & Acquisition',
      subtitle: 'Site Due Diligence & Power-Grid Analysis',
      icon: MapPin,
      color: 'blue',
      desc: 'Geospatial and power-grid analytics shortlist sites with low-latency fibre, reliable substations, hazard resilience and favourable policy. Candidate sites are validated for legal title, zoning, Tier III/IV suitability, and screened for environmental and compliance risk before structuring control of the land.',
      deliverables: [
        'Geospatial & power-grid analysis (33kV / 66kV / 220kV dedicated bay feasibility)',
        'Fibre proximity, latency & route-diversity mapping',
        'Title, zoning & encumbrance due diligence with SEZ / industrial park authorities',
        'ELV systems planning (perimeter security, surveillance, access control)',
        'CFD & thermal modelling for cooling efficiency in tropical climates',
        'Purchase / long-term lease / landowner joint-development structuring'
      ],
      milestone: 'Shortlisted, de-risked site under control'
    },
    {
      step: '02',
      title: 'Business Development',
      subtitle: 'Demand Mapping & Commercial Frameworks',
      icon: Briefcase,
      color: 'cyan',
      desc: 'Before design is frozen, we build the demand side. Our business development team sizes the market, defines the product, engages anchor tenants and converts interest into pre-leasing, letters of intent (LOIs) and commercial frameworks — so the asset moves toward revenue from day one.',
      deliverables: [
        'Market sizing & AI/cloud compute demand mapping across APAC & EMEA',
        'Anchor-tenant, hyperscaler & frontier AI lab direct engagement',
        'Pre-leasing, MOUs, LOIs & master lease agreement structuring',
        'Product definition: Turnkey Colocation, Wholesale, Build-to-Suit, GPUaaS',
        'Pricing strategy, long-term power tariff escalation & commercial model design',
        'Concession, incentive & revenue-share negotiations with government counterparties'
      ],
      milestone: 'Committed demand & commercial framework'
    },
    {
      step: '03',
      title: 'Investment Development',
      subtitle: 'Financial Modelling & Capital Syndication',
      icon: LineChart,
      color: 'emerald',
      desc: 'We build the financial architecture of the project: techno-commercial feasibility, investor-grade financial models, structuring of the SPV/JV, and syndication of debt and equity to global institutional standards. Funders get line-of-sight from land to revenue and exit.',
      deliverables: [
        'Techno-commercial feasibility & 15-year DCF, IRR, DSCR & NPV models',
        'Information Memorandum (IM), teasers & investor data room preparation',
        'SPV setup, JV structuring & shareholder governance frameworks',
        'Debt syndication: Green loans, External Commercial Borrowings (ECBs) & bonds',
        'Equity placement with global infrastructure funds, SWFs & pension strategics',
        'Central & State data center policy incentive monetisation & subsidy structuring'
      ],
      milestone: 'Financed, shovels-ready project'
    },
    {
      step: '04',
      title: 'Design & Engineering',
      subtitle: 'AI-Ready MEP, High-Density & Liquid Cooling',
      icon: Cpu,
      color: 'indigo',
      desc: 'We master-plan and engineer facilities purpose-built for high-density GPU clusters (30–120 kW+/rack), ultra-low-latency networks and autonomous operations. Design is value-engineered against capex, opex and PUE targets, and coordinated with permitting so approvals and construction move in step.',
      deliverables: [
        'Concept & Master Plan: Capacity roadmap, heavy floor plates (>2,500 kg/m²), MW phasing',
        'Power & Cooling Design: N+1/N+2 topologies, 30–120 kW+ rack power, DLC & immersion',
        'AI Network Architecture: 400G/800G InfiniBand NDR/XDR, RoCEv2, lossless interconnect',
        'ELV & Safety Systems: Integrated fire detection, clean-agent suppression & SCIF access',
        'Digital Twin: Simulation of airflow, power and capacity for what-if commissioning',
        'Value Engineering: Capex/opex optimization, constructability reviews & permit alignment'
      ],
      milestone: 'Buildable, certified-ready design package'
    },
    {
      step: '05',
      title: 'Build, Implementation & Commissioning',
      subtitle: 'EPC Execution & Phased Energisation',
      icon: Building2,
      color: 'purple',
      desc: 'We procure, manage and commission construction end-to-end. EPC tendering, construction management, QA/QC discipline, electrical distribution and structured cabling are driven to schedule and budget, with ISO/Uptime certification and integrated system testing (IST) completed before handover to operations.',
      deliverables: [
        'Turnkey EPC tendering, evaluation, award management & contractor coordination',
        'Cooling systems installation & secondary fluid loop pressure validation',
        'Electrical distribution, medium-voltage switchgear, UPS & high-density structured cabling',
        'Network architecture & multi-path optical interconnect deployment',
        'Level 1 to Level 5 commissioning, load-bank thermal stress testing & IST verification',
        'Uptime Institute Tier III/IV, ISO and DPDP Act 2023 certification management',
        'Phased utility energisation connecting power ramp to early hall revenue'
      ],
      milestone: 'Commissioned, certified, energised facility'
    },
    {
      step: '06',
      title: 'Operate, Optimise & Transfer-Readiness',
      subtitle: 'AI-DCIM, AIOps & Predictive SLA Assurance',
      icon: Activity,
      color: 'amber',
      desc: 'Operations run on an autonomous DCIM platform unifying power, cooling, space and connectivity telemetry in real time, with AIOps agents driving optimisation, anomaly detection and self-healing remediation. SLA assurance, SOPs, security operations and compliance are managed to hyperscale standards, 24×7.',
      deliverables: [
        'AI-Driven DCIM & AIOps (Always-On): Real-time telemetry, anomaly detection, digital twin',
        'Managed Operations & Support (24×7): NOC & SOC, remote/smart-hands, maintenance',
        'Predictive cooling/power optimization maintaining PUE < 1.15 in Indian climates',
        'SOPs & Talent Ecosystem: Standard operating procedures, escalation matrices & DC talent training',
        'Knowledge Transfer & Handover: As-builts, client shadow operations & warranty management',
        'Sustainability & ESG: Continuous carbon accounting, water usage tracking & ESG reporting'
      ],
      milestone: 'Stabilised, SLA-compliant operations'
    },
    {
      step: '07',
      title: 'Transfer, Monetisation & Exit',
      subtitle: 'DBOT Handover, Asset Monetisation & REIT Readiness',
      icon: DollarSign,
      color: 'rose',
      desc: 'We prepare and execute the monetisation path chosen by the owner — from sale-leaseback and equity sale to REIT/InvIT listings and refinancing — and manage operational and contractual handover so the asset transitions without value leakage.',
      deliverables: [
        'Sale-Leaseback: Immediate capital release while retaining operational control and occupancy',
        'Equity Sale / Divestment: Partial or full exit to strategic or financial buyers at market value',
        'REIT / InvIT Readiness: Public-market listing packaging for yield-oriented stabilized assets',
        'Refinancing: Lower cost of capital and debt restructuring as the operating asset de-risks',
        'DBOT Handover: Contractual transfer of commissioned, operating asset to government/client',
        'Contractual novation, tenant relationship transfer & post-transfer exit advisory'
      ],
      milestone: 'Value realised for investors & owners'
    }
  ]

  // 4 Core Capability Pillars Data
  const coreCapabilities = {
    site: {
      title: 'A. Site & Planning Engineering',
      desc: 'De-risking hyperscale land parcels with rigorous grid, environmental, and connectivity due diligence.',
      icon: MapPin,
      items: [
        { name: 'Land Feasibility & Due Diligence', desc: 'Topographical, geotechnical, title scrutiny, zoning approvals, and land aggregation structuring.' },
        { name: 'Power-Grid Integration & Substation', desc: 'Substation capacity analysis, 33kV/66kV/220kV dedicated bay planning, and dual-grid transmission lines.' },
        { name: 'Fibre Proximity & Route Diversity', desc: 'Right-of-Way (RoW) validation, multi-carrier dark fibre ingress, and diverse physical path planning.' },
        { name: 'Environmental & Regulatory Checks', desc: 'Hydrology, seismic zones, 100-year flood plain modelling, and industrial hazard proximity screening.' },
        { name: 'CFD & Microclimate Modelling', desc: 'Computational Fluid Dynamics for external ambient heat dissipation and site wind vector analysis.' },
        { name: 'ELV & Master Campus Planning', desc: 'Extra Low Voltage perimeter security conduits, water retention ponds, and substation setbacks.' }
      ]
    },
    design: {
      title: 'B. Design & Hyperscale Engineering',
      desc: 'Architecting ultra-high-density AI compute envelopes with extreme power and thermal efficiency.',
      icon: Layers,
      items: [
        { name: 'Master Planning & Architectural Layouts', desc: 'Heavy floor loading (>2,500 kg/m²), clear ceiling heights, and optimized hot/cold air-flow containment.' },
        { name: 'N+1 / N+2 Concurrently Maintainable Power', desc: 'Modular UPS topologies, lithium-ion BESS backup, medium-voltage busways, and fast-sync generators.' },
        { name: '30–120 kW+ Rack Density Architecture', desc: 'High-density busbar power distribution, in-row CDUs, and rear-door heat exchanger (RDHx) integration.' },
        { name: 'Direct Liquid & Immersion Cooling', desc: 'Direct-to-chip cold plates, single/two-phase immersion tanks, dielectric fluid circulation, and dry cooler loops.' },
        { name: '400G / 800G AI Networking Fabric', desc: 'Non-blocking fat-tree spine-leaf architecture, InfiniBand NDR/XDR, and lossless RoCEv2 fabric design.' },
        { name: 'Digital Twin & PUE/WUE Optimisation', desc: 'Full building information modelling (BIM), real-time thermal simulations, and PUE < 1.15 engineering.' }
      ]
    },
    build: {
      title: 'C. Build, EPC & Commissioning',
      desc: 'Industrial-grade project execution, rigorous vendor governance, and zero-defect Level 1–5 commissioning.',
      icon: Building2,
      items: [
        { name: 'EPC Tendering & Project Management', desc: 'Turnkey contract administration, milestone-linked escrow management, and supply chain tracking.' },
        { name: 'QA/QC & Structural Integrity', desc: 'Rigorous material testing, seismic bracing, cleanroom-grade containment, and electrical joint thermal scans.' },
        { name: 'Cooling & Electrical Installation', desc: 'Secondary fluid loop piping, leak-detection sensing, medium-voltage transformers, and switchgear.' },
        { name: 'Structured Cabling & Optics Deployment', desc: 'MPO/MTP high-density trunk cabling, optical loss testing (OTDR), and automated cable path labeling.' },
        { name: 'Integrated Systems Testing (IST)', desc: 'Full-capacity load-bank testing across 100% thermal and electrical capacity under simulated failure.' },
        { name: 'Phased Energisation & Statutory Handover', desc: 'Electrical inspectorate sanctions (CEIG), fire NOC validation, grid sync, and final operational handover.' }
      ]
    },
    ops: {
      title: 'D. Operations, AI-DCIM & AIOps',
      desc: 'Full-lifecycle facility and cluster operations driven by predictive intelligence and guaranteed SLAs.',
      icon: Activity,
      items: [
        { name: 'AI-DCIM & Real-Time Telemetry', desc: 'Continuous telemetry ingestion across power, CDU delta-T, ambient humidity, and rack-level kW draw.' },
        { name: 'AIOps & Self-Healing Remediation', desc: 'Automated cooling pump modulation, dynamic chiller staging, and proactive thermal throttling prevention.' },
        { name: '24/7 Tier-3 NOC & SOC Operations', desc: 'Round-the-clock physical and cyber surveillance, SIEM/SOAR threat monitoring, and SLA assurance.' },
        { name: 'Smart Hands & Remote Hands', desc: 'Certified on-site engineers for GPU blade swaps, fiber transceiver replacements, and urgent RMA handling.' },
        { name: 'Predictive Component Maintenance', desc: 'Vibration analysis on pumps/fans, capacitor wear prediction, and UPS battery impedance monitoring.' },
        { name: 'Talent Development & Knowledge Transfer', desc: 'Comprehensive SOP training, emergency drill simulations, and client team operational upskilling.' }
      ]
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans">
      <SiteHeader />

      {/* DARK HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-950 text-white border-b border-slate-800">
        <HeroCanvas />

        {/* Radial Ambient Glow Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(29,78,216,0.35),rgba(255,255,255,0))] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-6">
            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <ChevronRight size={12} className="text-slate-600" />
            <Link href="/solutions" className="hover:text-cyan-400 transition-colors">Solutions</Link>
            <ChevronRight size={12} className="text-slate-600" />
            <span className="text-cyan-400 font-semibold">AI Infrastructure & Data Center Engineering</span>
          </div>

          <div className="max-w-4xl">
            {/* Enterprise Lifecycle Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
              </span>
              <span>End-to-End Infrastructure Lifecycle</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300 font-medium">Land → Design → Build → Operate → Transfer</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
              AI Infrastructure & <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                Hyperscale Data Center Engineering
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal mb-8 max-w-3xl">
              From land and power strategy to AI-ready design, construction, operations and asset monetisation — one integrated delivery spine for next-generation AI infrastructure, cable landing stations and satellite gateways.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link
                href="/book-ai-diagnostic?solution=ai-infra-engineering"
                onClick={() => trackCTA('Book AI Infrastructure Diagnostic', 'hero', '/book-ai-diagnostic')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(37,99,235,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] hover:-translate-y-0.5 transition-all"
              >
                <Sparkles size={16} />
                <span>Book AI Infrastructure Diagnostic</span>
              </Link>
              <a
                href="#core-offerings"
                onClick={() => trackCTA('Explore AI Data Center Capabilities', 'hero_cta', 'core-offerings')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 hover:border-cyan-500/50 backdrop-blur-md shadow-xs hover:-translate-y-0.5 transition-all"
              >
                <span>Explore AI Data Center Capabilities</span>
                <ArrowRight size={16} />
              </a>
              <a
                href="#lifecycle"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-slate-400 hover:text-cyan-300 font-semibold text-sm transition-colors"
              >
                <span>7-Stage Lifecycle</span>
                <ChevronDown size={16} />
              </a>
            </div>
          </div>

          {/* 7 Verified Capability Indicators Grid from Document */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 pt-8 border-t border-slate-800/80">
            <div className="relative p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md hover:border-cyan-500/40 transition-all overflow-hidden group">
              <BorderBeam size={120} duration={7} colorFrom="#38bdf8" colorTo="#3b82f6" />
              <span className="text-xl sm:text-2xl font-extrabold text-cyan-400 block mb-0.5 tracking-tight">50–500+ MW</span>
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Campus Scale</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Hyperscale ready</span>
            </div>

            <div className="relative p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md hover:border-emerald-500/40 transition-all overflow-hidden group">
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-400 block mb-0.5 tracking-tight">PUE &lt;1.15</span>
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Target Efficiency</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Liquid-cooled target</span>
            </div>

            <div className="relative p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md hover:border-blue-500/40 transition-all overflow-hidden group">
              <span className="text-xl sm:text-2xl font-extrabold text-blue-400 block mb-0.5 tracking-tight">30–120 kW+</span>
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Rack Density</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">High-density GPU racks</span>
            </div>

            <div className="relative p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md hover:border-indigo-500/40 transition-all overflow-hidden group">
              <span className="text-xl sm:text-2xl font-extrabold text-indigo-400 block mb-0.5 tracking-tight">400G / 800G</span>
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">AI Networking</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">InfiniBand / RoCEv2</span>
            </div>

            <div className="relative p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md hover:border-purple-500/40 transition-all overflow-hidden group">
              <span className="text-xl sm:text-2xl font-extrabold text-purple-400 block mb-0.5 tracking-tight">Liquid Cooling</span>
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Direct &amp; Immersion</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">CDU &amp; cold-plate loops</span>
            </div>

            <div className="relative p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md hover:border-amber-500/40 transition-all overflow-hidden group">
              <span className="text-xl sm:text-2xl font-extrabold text-amber-400 block mb-0.5 tracking-tight">AI-DCIM</span>
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">&amp; AIOps Telemetry</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Self-healing operations</span>
            </div>

            <div className="relative p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md hover:border-teal-500/40 transition-all overflow-hidden group col-span-2 sm:col-span-1">
              <span className="text-xl sm:text-2xl font-extrabold text-teal-400 block mb-0.5 tracking-tight">100% RE</span>
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Green PPAs</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Solar, wind &amp; BESS</span>
            </div>
          </div>
        </div>
      </section>


      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-28">

        {/* SECTION 1: 7-STAGE END-TO-END LIFECYCLE VISUALIZATION */}
        <section id="lifecycle" className="scroll-mt-32">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
              02 / Lifecycle Map
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              The Full Data Center Lifecycle — Stage-Gated Offerings
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Seven stages, one accountable partner. Each gate carries defined deliverables, risk owners and investor reporting — aligned with Digital India, Make in India, and State IT/ITES Data Center policies.
            </p>
          </div>

          {/* Interactive 7-Stage Horizontal Pipeline */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-8 border-b border-slate-100 pb-6">
              {lifecycleStages.map((stage, idx) => {
                const isSelected = activeLifecycleStage === idx
                const StageIcon = stage.icon
                return (
                  <button
                    key={stage.step}
                    onClick={() => {
                      setActiveLifecycleStage(idx)
                      sendAnalyticsEvent({ event: 'lifecycle_stage_select', stage: stage.step, title: stage.title })
                    }}
                    className={`text-left p-3 rounded-xl transition-all border ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-500 shadow-xs ring-2 ring-blue-500/20'
                        : 'bg-slate-50/60 border-slate-200/70 hover:bg-slate-100/80 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {stage.step}
                      </span>
                      <StageIcon size={14} className={isSelected ? 'text-blue-600' : 'text-slate-400'} />
                    </div>
                    <span className={`text-xs font-bold block truncate ${isSelected ? 'text-blue-950 font-extrabold' : 'text-slate-800'}`}>
                      {stage.title}
                    </span>
                    <span className="text-[10px] text-slate-500 block truncate mt-0.5">
                      {stage.subtitle.split('&')[0]}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Active Stage Detailed Breakdown Card */}
            {(() => {
              const current = lifecycleStages[activeLifecycleStage]
              const CurrentIcon = current.icon
              return (
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white relative overflow-hidden border border-slate-800">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
                          <CurrentIcon size={24} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                              Stage {current.step} of 07
                            </span>
                            <span className="text-slate-500">•</span>
                            <span className="text-xs font-medium text-slate-300">Phase Gate Framework</span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                            {current.title}
                          </h3>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-700 text-blue-300 text-xs font-semibold">
                        <CheckCircle2 size={14} className="text-cyan-400" />
                        <span>Gate Deliverable: {current.milestone}</span>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                      {current.desc}
                    </p>

                    <div className="space-y-2.5">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Core Offering Components &amp; Gate Deliverables:
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {current.deliverables.map((item, i) => (
                          <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs text-xs sm:text-sm text-slate-200">
                            <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        </section>

        {/* SECTION 2: AI INFRASTRUCTURE VALUE PROPOSITION */}
        <section id="value-prop" className="scroll-mt-32">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-blue-200/80 shadow-xs">
            <div className="max-w-4xl">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-2">
                01 / Executive Summary
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                From Land Opportunity to Bankable, Operated, Transferable Infrastructure
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base mb-6">
                TRUSTGRID.AI partners with governments, investors, hyperscalers, cable consortiums, satellite operators and enterprise clients to conceive, finance, design, construct, operate and monetise next-generation AI data centers, cable landing stations and satellite landing stations across India. Our integrated capability spans the full asset lifecycle — from land identification and government allotment, through business development, investment structuring, permitting and concession agreements, to design, build, operate and transfer (DBOT).
              </p>

              {/* Parallel-Track Principle Box */}
              <div className="p-4 rounded-2xl bg-blue-100/60 border border-blue-300/80 mb-6">
                <div className="flex items-start gap-3">
                  <Sparkles size={20} className="text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-blue-900 text-sm font-bold block mb-1">Parallel-Track Principle</strong>
                    <p className="text-xs text-blue-800 leading-relaxed">
                      Land and demand are developed together. Site shortlisting (Stage 01) and anchor-tenant engagement (Stage 02) run as one integrated workstream, so projects enter design with committed capacity and a defensible business case.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-blue-100">
                <div className="p-4 rounded-xl bg-white border border-blue-100 shadow-xs">
                  <strong className="text-blue-900 text-sm font-bold block mb-1">Technically Robust</strong>
                  <p className="text-xs text-slate-600">Built to global standards with N+1/N+2 power, 30–120kW+ liquid cooling, and lossless RoCEv2 interconnects.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-blue-100 shadow-xs">
                  <strong className="text-blue-900 text-sm font-bold block mb-1">Operationally Resilient</strong>
                  <p className="text-xs text-slate-600">Automated, compliant, and sustainable with continuous AI-DCIM telemetry and PUE &lt;1.15 targets.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-blue-100 shadow-xs">
                  <strong className="text-blue-900 text-sm font-bold block mb-1">Commercially Viable</strong>
                  <p className="text-xs text-slate-600">Investment-ready, sales-enabled, and globally positioned with active pre-leasing and DBOT/DBFO models.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: AI DATA CENTER CORE OFFERINGS (4 PILLARS) */}
        <section id="core-offerings" className="scroll-mt-32">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-200/60 inline-block mb-3">
              03 / Service Catalog Matrix
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              AI Data Center Core Capabilities
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Structured into four specialized engineering domains delivering turnkey certainty from initial site selection through 24/7 autonomous operations.
            </p>
          </div>

          {/* 4 Pillars Navigation Tabs */}
          <div className="flex border-b border-slate-200 overflow-x-auto bg-slate-100/80 p-1.5 rounded-2xl gap-2 mb-8">
            {(['site', 'design', 'build', 'ops'] as const).map((tabKey) => {
              const tab = coreCapabilities[tabKey]
              const TabIcon = tab.icon
              const isSelected = activeOfferingsTab === tabKey
              return (
                <button
                  key={tabKey}
                  onClick={() => {
                    setActiveOfferingsTab(tabKey)
                    sendAnalyticsEvent({ event: 'capability_tab_select', tab: tabKey, title: tab.title })
                  }}
                  className={`flex-1 min-w-48 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'bg-white text-blue-600 shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <TabIcon size={16} />
                  <span>{tab.title.split(':')[0]}</span>
                </button>
              )
            })}
          </div>

          {/* Active Pillar Capabilities Grid */}
          {(() => {
            const currentPillar = coreCapabilities[activeOfferingsTab]
            return (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{currentPillar.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{currentPillar.desc}</p>
                    </div>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 w-fit">
                      {currentPillar.items.length} Core Disciplines
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentPillar.items.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <CheckCircle2 size={14} className="text-blue-600 shrink-0" />
                            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{item.name}</h4>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed pl-5">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })()}
        </section>

        {/* SECTION 4: HYPERSCALE AI TECHNICAL CAPABILITIES */}
        <section id="high-density-engineering" className="scroll-mt-32">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200/60 inline-block mb-3">
              14 / Technical Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Engineering for High-Density AI Workloads
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Facilities and IT systems engineered beyond conventional cloud specifications — eliminating thermal bottlenecks and maximizing GPU throughput.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* GPU Infrastructure */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-4">
                <Cpu size={20} />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">GPU Infrastructure</h4>
              <p className="text-xs text-slate-600 mb-4">Multi-vendor silicon architectures tuned for distributed LLM training and high-throughput inference.</p>
              <ul className="text-xs text-slate-700 space-y-2">
                <li className="flex items-center gap-2"><strong>• NVIDIA H100 / H200:</strong> HGX SXM5 8-GPU nodes</li>
                <li className="flex items-center gap-2"><strong>• NVIDIA Blackwell:</strong> GB200 NVL72 / B200</li>
                <li className="flex items-center gap-2"><strong>• AMD Instinct:</strong> MI300X &amp; MI350X</li>
                <li className="flex items-center gap-2"><strong>• Custom ASICs:</strong> TPU, Trainium &amp; Gaudi 3</li>
              </ul>
            </div>

            {/* Rack Infrastructure */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold mb-4">
                <Server size={20} />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Rack Infrastructure</h4>
              <p className="text-xs text-slate-600 mb-4">Ultra-high density structural and power distribution envelopes engineered for next-gen GPU clusters.</p>
              <ul className="text-xs text-slate-700 space-y-2">
                <li className="flex items-center gap-2"><strong>• Rack Density:</strong> 30 kW to 120 kW+ continuous</li>
                <li className="flex items-center gap-2"><strong>• Busbar / Busway:</strong> Overhead plug-in tap-offs</li>
                <li className="flex items-center gap-2"><strong>• Dual PDU:</strong> A+B redundant intelligent feeds</li>
                <li className="flex items-center gap-2"><strong>• Floor Loading:</strong> 2,500–3,500 kg/m² rated</li>
              </ul>
            </div>

            {/* AI Networking */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
                <Network size={20} />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">AI Networking</h4>
              <p className="text-xs text-slate-600 mb-4">Lossless, non-blocking interconnects designed for sub-microsecond collective all-reduce operations.</p>
              <ul className="text-xs text-slate-700 space-y-2">
                <li className="flex items-center gap-2"><strong>• Speed:</strong> 400G / 800G Ethernet &amp; InfiniBand</li>
                <li className="flex items-center gap-2"><strong>• Fabric:</strong> NDR / XDR &amp; RoCEv2 RDMA</li>
                <li className="flex items-center gap-2"><strong>• Congestion:</strong> ECN, PFC &amp; adaptive routing</li>
                <li className="flex items-center gap-2"><strong>• Spine-Leaf:</strong> EVPN-VXLAN non-oversubscribed</li>
              </ul>
            </div>

            {/* AI Operations */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-4">
                <Activity size={20} />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">AI Operations</h4>
              <p className="text-xs text-slate-600 mb-4">Real-time telemetry ingestion and predictive self-healing across physical and compute planes.</p>
              <ul className="text-xs text-slate-700 space-y-2">
                <li className="flex items-center gap-2"><strong>• AI-DCIM:</strong> Power/cooling/space telemetry</li>
                <li className="flex items-center gap-2"><strong>• AIOps:</strong> Real-time anomaly detection</li>
                <li className="flex items-center gap-2"><strong>• Digital Twin:</strong> Continuous thermal simulation</li>
                <li className="flex items-center gap-2"><strong>• Self-Healing:</strong> Automated workload failover</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 5: POWER & COOLING INFRASTRUCTURE */}
        <section id="power-cooling" className="scroll-mt-32">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
              HVAC &amp; Precision Cooling
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Power &amp; Direct Liquid Immersion (DLI) Cooling
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Direct liquid cooling, immersion solutions, and Indian-climate thermal strategies ensuring PUE below 1.15 even under peak summer conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Power Engineering Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                  <Zap size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Power Distribution &amp; Resiliency</h4>
                  <span className="text-xs text-slate-500">Tier III+ Concurrently Maintainable</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                Engineered for rapid step-load transient response when GPU clusters suddenly spike from idle to 100% compute load within milliseconds.
              </p>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between">
                  <span className="text-slate-700 font-semibold">Substation &amp; Ingress:</span>
                  <strong className="text-slate-900">33kV / 66kV / 220kV dedicated feeds</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between">
                  <span className="text-slate-700 font-semibold">UPS Redundancy:</span>
                  <strong className="text-slate-900">2N / N+1 with Li-ion BESS fast discharge</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between">
                  <span className="text-slate-700 font-semibold">Rack Power Feeds:</span>
                  <strong className="text-slate-900">3-phase 415V / 480V overhead busways</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between">
                  <span className="text-slate-700 font-semibold">Cold-Start Full Load:</span>
                  <strong className="text-slate-900">&lt;10 minutes to full campus energisation</strong>
                </div>
              </div>
            </div>

            {/* Cooling Engineering Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-600">
                  <Flame size={22} className="rotate-180" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Direct Liquid &amp; Immersion Cooling</h4>
                  <span className="text-xs text-slate-500">PUE &lt;1.15 Target in Tropical Climates</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                Multi-mode cooling topologies incorporating direct-to-chip cold plates, in-row CDUs, and dielectric fluid immersion tanks.
              </p>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between">
                  <span className="text-slate-700 font-semibold">Direct Liquid Cooling (DLC):</span>
                  <strong className="text-slate-900">Cold plates with 35°C–45°C warm water supply</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between">
                  <span className="text-slate-700 font-semibold">Immersion Cooling:</span>
                  <strong className="text-slate-900">Single &amp; two-phase synthetic fluids (&gt;100kW/rack)</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between">
                  <span className="text-slate-700 font-semibold">CDU Loop Redundancy:</span>
                  <strong className="text-slate-900">N+1 cooling distribution with auto-isolation</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between">
                  <span className="text-slate-700 font-semibold">Indian Climate Strategy:</span>
                  <strong className="text-slate-900">Adiabatic dry coolers + indirect evaporative cooling</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: AI NETWORKING & FABRIC ARCHITECTURE */}
        <section id="ai-networking" className="scroll-mt-32">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200/60 inline-block mb-3">
              Scale-Out AI Interconnect
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              High-Speed 400G / 800G AI Networking
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Non-blocking spine-leaf fabrics with RoCEv2 and InfiniBand NDR/XDR delivering zero packet loss and predictable tail latency for tens of thousands of GPUs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200 inline-block mb-3">01. Collective Fabric</span>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Rail-Optimized Spine-Leaf</h4>
              <p className="text-xs text-slate-600 mb-4">GPU-to-GPU rail alignment ensuring all GPUs at index 0 across all nodes communicate on a dedicated non-interfering spine plane.</p>
              <div className="text-xs text-slate-800 font-medium bg-slate-50 p-3 rounded-xl">
                All-Reduce Efficiency: &gt;90% theoretical peak
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200 inline-block mb-3">02. Congestion Control</span>
              <h4 className="font-bold text-slate-900 text-sm mb-2">RoCEv2 &amp; InfiniBand Tuning</h4>
              <p className="text-xs text-slate-600 mb-4">Explicit Congestion Notification (ECN), Priority Flow Control (PFC), and Fast Recovery algorithms preventing head-of-line blocking.</p>
              <div className="text-xs text-slate-800 font-medium bg-slate-50 p-3 rounded-xl">
                Packet Loss: 0.00% lossless guaranteed
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded border border-cyan-200 inline-block mb-3">03. Dual-Path Diversity</span>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Carrier &amp; Fiber Diversity</h4>
              <p className="text-xs text-slate-600 mb-4">Diverse underground fiber conduits, multi-carrier ingress meet-me rooms, and terrestrial backhaul interconnecting campus zones.</p>
              <div className="text-xs text-slate-800 font-medium bg-slate-50 p-3 rounded-xl">
                Failover Switching: &lt;50ms sub-second recovery
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: AI-DCIM & AIOPS */}
        <section id="ai-dcim-ops" className="scroll-mt-32">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60 inline-block mb-3">
              Predictive Autonomy
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              AI-DCIM &amp; AIOps Facility Intelligence
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Transforming traditional reactive facilities into predictive, self-tuning AI environments with full-stack visibility from chiller pumps down to GPU tensor cores.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-xs font-bold text-cyan-400 block mb-1">Real-Time Telemetry</span>
                <p className="text-xs text-slate-300">Continuous ingestion of rack kW, CDU fluid temperatures, ambient wet-bulb, and optical transceiver BER.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-xs font-bold text-blue-400 block mb-1">Predictive Anomaly Detection</span>
                <p className="text-xs text-slate-300">Machine learning models detecting capacitor wear, pump cavitation, and GPU thermal runaway 72 hours before failure.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-xs font-bold text-emerald-400 block mb-1">Self-Healing Remediation</span>
                <p className="text-xs text-slate-300">Automated coolant flow redistribution, dynamic fan staging, and workload draining to healthy spare nodes.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-xs font-bold text-purple-400 block mb-1">Digital Twin Simulations</span>
                <p className="text-xs text-slate-300">Live 3D thermodynamic digital twin predicting thermal hot-spots before deploying new high-density clusters.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: CYBERSECURITY, GOVERNANCE & TIER COMPLIANCE */}
        <section id="cybersecurity-compliance" className="scroll-mt-32">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200/60 inline-block mb-3">
              08 / Security &amp; Assurance
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Cybersecurity, Audits &amp; Compliance
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Auditable security posture, recognized certifications, and continuous compliance — ISO · SOC · Uptime Tier III · DPDP Act 2023.
            </p>
          </div>

          {/* Standards Badges Row */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['ISO 27001', 'ISO 22301', 'ISO 9001', 'ISO 50001', 'ISO 14001', 'SOC 1 / SOC 2 TYPE I & II', 'UPTIME TIER III DESIGN', 'UPTIME TIER III FACILITY', 'TIER IV READINESS', 'DPDP ACT 2023', 'GDPR', 'PCI-DSS', 'HIPAA'].map((badge, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-bold border border-slate-200">
                {badge}
              </span>
            ))}
          </div>

          {/* 5 Assurance Dimensions Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden mb-8">
            <div className="flex border-b border-slate-200 overflow-x-auto bg-slate-50/70 p-2 gap-2">
              {[
                { id: 'design', label: '1. DESIGN (PROTECT)' },
                { id: 'audit', label: '2. AUDIT (ASSURE)' },
                { id: 'readiness', label: '3. READINESS (PREPARE)' },
                { id: 'certification', label: '4. CERTIFICATION' },
                { id: 'monitoring', label: '5. MONITORING (OBSERVE)' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveComplianceDimension(tab.id as any)
                    sendAnalyticsEvent({ event: 'compliance_tab_select', dimension: tab.id, label: tab.label })
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeComplianceDimension === tab.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeComplianceDimension === 'design' && (
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 text-sm">Security Architecture &amp; Zero-Trust Design (PROTECT)</h4>
                  <p className="text-xs text-slate-600">Architecting physical SCIF-grade perimeter security, air-gapped sovereign fabrics, IT/OT network segmentation, and hardware root-of-trust from Day 1.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100"><strong>Zero Trust Architecture:</strong> Micro-segmented control &amp; data planes</div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100"><strong>IT/OT Segmentation:</strong> Air-gapped BMS/DCIM from compute networks</div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100"><strong>DDoS &amp; IAM:</strong> Multi-Tbps edge protection and granular access control</div>
                  </div>
                </div>
              )}

              {activeComplianceDimension === 'audit' && (
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 text-sm">Audits &amp; Industry Certifications (ASSURE)</h4>
                  <p className="text-xs text-slate-600">Conducting structured third-party and internal audits across energy efficiency, data sovereignty, and cyber posture.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100"><strong>ISO 27001 &amp; ISO 22301:</strong> Information security &amp; business continuity</div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100"><strong>DPDP Act 2023 &amp; GDPR:</strong> Data privacy &amp; sovereign data residency</div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100"><strong>SOC 1 &amp; SOC 2 Type I &amp; II:</strong> Audited security, availability, confidentiality</div>
                  </div>
                </div>
              )}

              {activeComplianceDimension === 'readiness' && (
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 text-sm">Audit Readiness &amp; Remediation (PREPARE)</h4>
                  <p className="text-xs text-slate-600">Preparing facilities to pass demanding Tier III/IV Uptime Institute reviews and financial regulatory mandates.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100"><strong>Uptime Tier III / IV:</strong> Concurrently maintainable &amp; fault tolerant design</div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100"><strong>RBI / SEBI Alignment:</strong> Stringent financial sector DC guidelines</div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100"><strong>Pre-Audit Dry Runs:</strong> Remediation roadmaps and evidence gathering</div>
                  </div>
                </div>
              )}

              {activeComplianceDimension === 'certification' && (
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 text-sm">Formal Certification Coordination</h4>
                  <p className="text-xs text-slate-600">Liaison and technical evidence package management to achieve formal international certifications with accredited certifying bodies.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100"><strong>ISO 9001 / 14001 / 50001:</strong> Quality, environmental &amp; energy management</div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100"><strong>Uptime Institute Tier III:</strong> Design and Facility official certification</div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100"><strong>PCI-DSS &amp; HIPAA:</strong> Sovereign cloud data isolation readiness</div>
                  </div>
                </div>
              )}

              {activeComplianceDimension === 'monitoring' && (
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 text-sm">DCIM, AIOps &amp; Continuous Assurance (OBSERVE)</h4>
                  <p className="text-xs text-slate-600">Real-time threat monitoring, automated vulnerability scanning, and continuous compliance evidence collection.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100"><strong>SIEM / SOAR SOC:</strong> Continuous intrusion detection &amp; threat mitigation</div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100"><strong>Automated Audit Reports:</strong> Real-time compliance dashboards for auditors</div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100"><strong>Integrated Monitoring:</strong> Combined IT, OT, and physical surveillance logs</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 9: TELECOM & CONNECTIVITY (TSP) */}
        <section id="telecom-connectivity" className="scroll-mt-32">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
              09 / Telecom &amp; Connectivity
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Telecom Services Provider (TSP) &amp; Connectivity Offerings
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Carrier-grade connectivity products, licensing support and interconnection — enabling campuses and landing stations to sell carrier-grade connectivity alongside space, power and compute (&ldquo;Campus-as-a-TSP&rdquo;).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 inline-block mb-3">ENABLE</span>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Licensing &amp; Regulatory Support</h4>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li>• TSP / ISP / ILD / NLD &amp; OSP licence application support (DoT/TRAI)</li>
                <li>• Regulatory compliance, reporting &amp; renewals</li>
                <li>• Right-of-Way (ROW) permission &amp; cable protection coordination</li>
                <li>• Spectrum &amp; landing-rights coordination</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-cyan-50 text-cyan-700 border border-cyan-200 inline-block mb-3">BUILD</span>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Network Build &amp; Architecture</h4>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li>• DWDM / ROADM, lit &amp; dark fibre, IP/MPLS &amp; EVPN-VXLAN</li>
                <li>• Terrestrial backhaul rings &amp; metro fibre build</li>
                <li>• Cloud on-ramps &amp; Data Center Interconnect (DCI)</li>
                <li>• Subsea &amp; satellite landing integration</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 inline-block mb-3">SELL</span>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Connectivity Products</h4>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li>• IPLC / IEPL, MPLS VPN, dedicated internet access &amp; P2P links</li>
                <li>• Wavelength, dark-fibre and capacity (IRU / lease) services</li>
                <li>• SD-WAN, cloud connectivity &amp; managed network services</li>
                <li>• Wholesale capacity to carriers, ISPs &amp; enterprises</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 inline-block mb-3">OPERATE</span>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Interconnection &amp; NOC</h4>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li>• Carrier-neutral meet-me rooms &amp; IX peering</li>
                <li>• Cross-connect provisioning &amp; interconnect management</li>
                <li>• 24×7 NOC, network monitoring &amp; fault restoration</li>
                <li>• Telecom readiness assessments &amp; network audits</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 10: CABLE LANDING STATION (CLS) OFFERINGS */}
        <section id="cable-landing" className="scroll-mt-32">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-200/60 inline-block mb-3">
              12 / Cable Landing
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Cable Landing Station (CLS) Offerings
            </h2>
            <p className="text-base text-slate-600 mt-2">
              India as a strategic subsea gateway between Europe, the Middle East, Africa and Asia-Pacific. From marine surveys and landing permits through carrier-neutral meet-me rooms and diversified backhaul.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded inline-block mb-2">BUILD</span>
                <h4 className="font-bold text-slate-900 text-sm mb-2">CLS Development</h4>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li>• Greenfield &amp; brownfield CLS construction</li>
                  <li>• Beach manholes &amp; cable landing rooms</li>
                  <li>• Marine route surveys &amp; cable protection zones</li>
                  <li>• Landing permits with DOT, MoEFCC &amp; coastal authorities</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded inline-block mb-2">CONNECT</span>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Subsea Systems Integration</h4>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li>• Integration with SMW, IEX, MIST, 2Africa, SEA-ME-WE</li>
                  <li>• Submarine line terminal equipment (SLTE) &amp; power-feed</li>
                  <li>• Consortium engagement &amp; landing-party coordination</li>
                  <li>• Fault-location, resilience &amp; restoration planning</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded inline-block mb-2">DISTRIBUTE</span>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Backhaul &amp; Terrestrial Fibre</h4>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li>• Diverse backhaul fibre to hyperscale campuses &amp; IXs</li>
                  <li>• Redundant terrestrial rings linking CLS to Tier-1 cities</li>
                  <li>• Latency-optimized routes for finance &amp; AI inference</li>
                  <li>• Dark-fibre &amp; lit-wavelength provisioning</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded inline-block mb-2">SELL</span>
                <h4 className="font-bold text-slate-900 text-sm mb-2">CLS Monetisation &amp; Services</h4>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li>• Capacity planning, IRU / lease negotiation</li>
                  <li>• CLS-as-a-Service &amp; meet-me-room monetisation</li>
                  <li>• Colocation of carrier equipment &amp; cross-connects</li>
                  <li>• Bandwidth partner programmes &amp; REIT/InvIT advisory</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 11: SATELLITE LANDING STATIONS — 9 TBPS */}
        <section id="satellite-landing" className="scroll-mt-32">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200/60 inline-block mb-3">
              13 / Satellite Landing
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Satellite Landing Stations — 9 Tbps Landing Capacity
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Teleport and ground-segment infrastructure for GEO, MEO and LEO constellations across South Asia.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white border border-indigo-800/60 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-indigo-800/50 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/60 border border-indigo-500 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <Satellite size={14} />
                  <span>Space-Segment Infrastructure</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white">9 Tbps Satellite Landing Capacity</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  Aggregate satellite landing bandwidth across Ku / Ka / Q / V bands — delivered in modular increments (typically 1–2 Tbps per phase) and backed by carrier-grade SLAs.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs text-xs text-slate-200 max-w-xs">
                <strong className="text-cyan-400 font-bold block mb-1">Why it matters:</strong>
                Satellite gateways complement subsea fibre, adding route diversity and reaching regions fibre cannot economically serve.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">BUILD</span>
                <h4 className="font-bold text-white text-sm mb-1.5">Site &amp; Ground Segment</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  RF line-of-sight analysis, rain-fade &amp; elevation planning, ITU coordination zones, civil teleport foundations, and mission-critical hardening.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">LAND</span>
                <h4 className="font-bold text-white text-sm mb-1.5">9 Tbps Landing Infrastructure</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  GEO large-aperture &amp; LEO/MEO phased-array antenna farms, RF chains, multi-band aggregation (Ku/Ka/Q/V), and core gateway systems.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">SERVE</span>
                <h4 className="font-bold text-white text-sm mb-1.5">Ground-Station-as-a-Service (GSaaS)</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Antenna-as-a-Service, TT&amp;C mission operations, multi-mission scheduling, virtualised ground segment, and pay-per-use hosting.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">COMPLY</span>
                <h4 className="font-bold text-white text-sm mb-1.5">Spectrum &amp; Licensing</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  ITU filing coordination, WPC / DoT licensing, landing rights, NOCC approvals, and government/defense spectrum protection.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">CONNECT</span>
                <h4 className="font-bold text-white text-sm mb-1.5">Interconnection &amp; Backhaul</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Terrestrial fibre backhaul to CLS and data centers, cloud on-ramps, and hybrid subsea + satellite resilient connectivity design.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">SELL</span>
                <h4 className="font-bold text-white text-sm mb-1.5">Capacity Monetisation</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Satellite capacity IRUs, hosted payload hosting, broadcast DTH/mobility, and wholesale bandwidth trading.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 12: ENERGY & GREEN INFRASTRUCTURE */}
        <section id="energy-green-power" className="scroll-mt-32">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60 inline-block mb-3">
              10 / Energy &amp; PPAs
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Energy, Green Energy &amp; Power Purchase Agreements
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Structuring resilient, low-cost, 100% renewable power supply — and signing the contracts that lock it in. Energy is the largest opex line and the largest lever.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-teal-950 via-slate-900 to-slate-950 text-white border border-teal-800/60">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 pb-6 border-b border-teal-800/40">
              <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
                <span className="text-xl sm:text-2xl font-black text-teal-300 block mb-0.5">100% RE</span>
                <span className="text-[11px] text-slate-300">Renewable pathway &amp; net-zero</span>
              </div>
              <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
                <span className="text-xl sm:text-2xl font-black text-teal-300 block mb-0.5">PPA</span>
                <span className="text-[11px] text-slate-300">Solar · Wind · Hybrid contracts</span>
              </div>
              <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
                <span className="text-xl sm:text-2xl font-black text-teal-300 block mb-0.5">Open Access</span>
                <span className="text-[11px] text-slate-300">Captive &amp; group-captive</span>
              </div>
              <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
                <span className="text-xl sm:text-2xl font-black text-teal-300 block mb-0.5">BESS</span>
                <span className="text-[11px] text-slate-300">On-site energy storage</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block mb-1">SOURCE</span>
                <h4 className="font-bold text-white text-sm mb-1">Power Sourcing &amp; Structuring</h4>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li>• Open-access captive &amp; group-captive</li>
                  <li>• Power-exchange tariff optimization</li>
                  <li>• Substation dedicated feeders &amp; HT links</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block mb-1">CONTRACT</span>
                <h4 className="font-bold text-white text-sm mb-1">PPA Structuring &amp; Signing</h4>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li>• Solar, wind and hybrid PPA negotiation</li>
                  <li>• Generator &amp; DISCOM counterparty terms</li>
                  <li>• Renewable Energy Certificates (RECs)</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block mb-1">GREEN</span>
                <h4 className="font-bold text-white text-sm mb-1">Green Energy &amp; Storage</h4>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li>• 100% renewable pathways &amp; net-zero</li>
                  <li>• Battery Energy Storage Systems (BESS)</li>
                  <li>• Sustainability-linked green financing</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block mb-1">MANAGE</span>
                <h4 className="font-bold text-white text-sm mb-1">Energy Management &amp; Liaison</h4>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li>• ISO 50001 energy management audits</li>
                  <li>• Metering, billing &amp; demand-side response</li>
                  <li>• DISCOM, SLDC &amp; CERC/SERC liaison</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 13: ENVIRONMENT & REGULATORY LIAISON */}
        <section id="environment-regulatory" className="scroll-mt-32">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 inline-block mb-3">
              11 / Environment &amp; Regulatory
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Environmental Liaison, Approvals &amp; Regulatory Compliance
            </h2>
            <p className="text-base text-slate-600 mt-2">
              End-to-end engagement with environmental departments and agencies — running liaison in parallel with land and design (Stages 01–04) so projects stay on schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded inline-block mb-2">ENGAGE</span>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Agency Liaison</h4>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li>• MoEFCC (Ministry of Environment)</li>
                <li>• State Pollution Control Boards (SPCB &amp; CPCB)</li>
                <li>• SEIAA / EAC &amp; Coastal Zone Authorities</li>
                <li>• Forest, wildlife &amp; water-resource bodies</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded inline-block mb-2">APPROVE</span>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Approvals &amp; Clearances</h4>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li>• Environmental Clearance (EC)</li>
                <li>• Consent to Establish (CTE) &amp; Operate (CTO)</li>
                <li>• CRZ clearance &amp; forest/wildlife approvals</li>
                <li>• Water &amp; groundwater (CGWA) approvals</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded inline-block mb-2">ASSESS</span>
              <h4 className="font-bold text-slate-900 text-sm mb-2">EIA, EMP &amp; Studies</h4>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li>• Environmental Impact Assessment (EIA)</li>
                <li>• Environment Management Plan (EMP)</li>
                <li>• Public hearings &amp; stakeholder consultation</li>
                <li>• Baseline &amp; continuous monitoring</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block mb-2">SUSTAIN</span>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Ongoing Compliance</h4>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li>• Pollution-control &amp; e-waste compliance</li>
                <li>• CPCB / SPCB returns, audits &amp; renewals</li>
                <li>• ESG, carbon accounting &amp; CDP disclosure</li>
                <li>• Environmental audits &amp; corrective actions</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 14: INVESTMENT DEVELOPMENT & BANKABILITY */}
        <section id="investment-bankability" className="scroll-mt-32">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60 inline-block mb-3">
              04 / Capital &amp; Structuring
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Investment Development &amp; Capital Formation
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Turning a commercially-committed project into a financed, investment-grade asset with bankability built in by design from Day 1.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 text-xs mb-1">Investor Readiness</h4>
                <p className="text-[11px] text-slate-600">Feasibility reports, IMs, teasers, valuation and due-diligence packs to institutional standards.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 text-xs mb-1">Capital Raising</h4>
                <p className="text-[11px] text-slate-600">Introductions to global infra funds, SWFs, pension funds and strategic hyperscalers.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 text-xs mb-1">Vehicle Structuring</h4>
                <p className="text-[11px] text-slate-600">SPV creation, JV &amp; co-development structures, shareholder agreements and governance.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 text-xs mb-1">Debt &amp; Project Finance</h4>
                <p className="text-[11px] text-slate-600">Debt syndication, green loans, external commercial borrowings (ECBs) and institutional bonds.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 text-xs mb-1">Public Capital &amp; PPP</h4>
                <p className="text-[11px] text-slate-600">PPP frameworks, concession financing and capture of state incentive packages.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 text-xs mb-1">Risk &amp; Reporting</h4>
                <p className="text-[11px] text-slate-600">Stage-gate risk registers, drawdown governance and lender covenant reporting.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 15: DBOT DELIVERY SUITE */}
        <section id="delivery-models" className="scroll-mt-32">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200/60 inline-block mb-3">
              06 / Delivery Models
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Design – Build – Operate – Transfer (DBOT) Suite
            </h2>
            <p className="text-base text-slate-600 mt-2">
              One accountable partner, matched to your balance sheet, risk appetite and ownership intent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                model: 'DBOT',
                badge: 'FLAGSHIP',
                full: 'Design · Build · Operate · Transfer',
                role: 'Single contract across the full lifecycle, concept to handover. We design, construct, operate to stabilisation, then transfer.',
                context: 'Ideal for government, PSU and institutional owners requiring defined transfer conditions and turnkey operational maturity.'
              },
              {
                model: 'DBFO',
                badge: 'FINANCED',
                full: 'Design · Build · Finance · Operate',
                role: 'Adds project finance to the design-build-operate mandate. We arrange capital; the client pays over the concession term via availability payments.',
                context: 'Attractive for public-sector and capex-constrained owners seeking private investment backing.'
              },
              {
                model: 'DBO',
                badge: 'RETAINED',
                full: 'Design · Build · Operate',
                role: 'We deliver and operate; the client retains permanent ownership with long-term operations & SLA management mandate.',
                context: 'Best for enterprise and hyperscaler self-build programmes seeking outsourced operational execution.'
              },
              {
                model: 'BOT',
                badge: 'CONCESSION',
                full: 'Build · Operate · Transfer',
                role: 'We fund/develop and operate to stabilisation, then transfer ownership with concession-period economics.',
                context: 'Attractive for investors seeking de-risked cash flow and structured revenue-share/PPP frameworks.'
              },
              {
                model: 'BOO',
                badge: 'TURNKEY',
                full: 'Build · Own · Operate',
                role: 'Client owns the asset; we deliver turnkey EPC + long-term operations under one accountable partner with performance guarantees.',
                context: 'Enterprises wanting clear capex, schedule, and uptime guarantees with optional transition to client-run ops.'
              },
              {
                model: 'GSaaS / Landing',
                badge: 'CONNECTIVITY',
                full: 'Ground-Station-as-a-Service',
                role: 'Managed landing operations, capacity leasing, IRUs and teleport hosting for subsea cable & satellite landing assets.',
                context: 'Asset-light entry for satellite operators, telecom carriers, and international cable consortiums.'
              }
            ].map((m, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:border-blue-300 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">{m.model}</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-slate-100 text-slate-700">{m.badge}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2">{m.full}</h4>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">{m.role}</p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[11px] text-slate-500 block">
                    <strong className="text-slate-700">Best For:</strong> {m.context}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 16: NINE PILLARS & GOVERNANCE OFFICES */}
        <section id="nine-pillars" className="scroll-mt-32">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
              05 / Engagement Models &amp; PMO
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Nine Pillars of Engagement &amp; Governance Offices
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Disciplined delivery and investable vehicles — governed end-to-end through Technical PMO, Enterprise PMO, and Corporate Business Office (CBO).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded inline-block mb-2">DELIVERY</span>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Technical PMO</h4>
              <p className="text-xs text-slate-600 mb-3">End-to-end program management for technical delivery, vendor/EPC coordination, and schedule/cost/risk control.</p>
              <span className="text-[11px] font-medium text-slate-500 block">Beneficiary: Engineering &amp; EPC teams</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded inline-block mb-2">GOVERNANCE</span>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Enterprise PMO</h4>
              <p className="text-xs text-slate-600 mb-3">Cross-phase governance across all stakeholders, steering-committee reporting, and policy compliance.</p>
              <span className="text-[11px] font-medium text-slate-500 block">Beneficiary: Owners, board &amp; investors</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block mb-2">GROWTH</span>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Corporate Business Office (CBO)</h4>
              <p className="text-xs text-slate-600 mb-3">Business development, investor engagement, structuring investment vehicles (SPVs/DBFO), and deal structuring.</p>
              <span className="text-[11px] font-medium text-slate-500 block">Beneficiary: Sponsors &amp; corporate funds</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded inline-block mb-2">ADVISORY</span>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Consulting &amp; Advisory</h4>
              <p className="text-xs text-slate-600 mb-3">Systems integration consulting, investment readiness, compliance advisory, and outcome-based models tied to KPIs.</p>
              <span className="text-[11px] font-medium text-slate-500 block">Beneficiary: Enterprise leadership</span>
            </div>
          </div>
        </section>

        {/* SECTION 17: SELLING DC SERVICES TO GLOBAL MARKETS & GTM */}
        <section id="global-sales-gtm" className="scroll-mt-32">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-200/60 inline-block mb-3">
              07 / Global Markets
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Selling Data Center Services to Global Markets &amp; Enterprises
            </h2>
            <p className="text-base text-slate-600 mt-2">
              A productised service catalogue, global go-to-market engine, and enterprise-ready commercial models connecting asset capacity to global revenue.
            </p>
          </div>

          <div className="space-y-8">
            {/* Productised Service Catalogue Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded inline-block mb-2">RETAIL / ENTERPRISE</span>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Colocation &amp; Interconnection</h4>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li>• Rack, cage &amp; private-suite colocation</li>
                  <li>• Cross-connects, MMR &amp; IX access</li>
                  <li>• Cloud on-ramps &amp; direct connectivity</li>
                  <li>• Remote hands, storage &amp; backup</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded inline-block mb-2">HYPERSCALE</span>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Wholesale &amp; Hyperscale Leasing</h4>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li>• Wholesale hall / suite MW-scale leasing</li>
                  <li>• Build-to-suit campuses &amp; powered shell</li>
                  <li>• Long-term master leases &amp; anchor frameworks</li>
                  <li>• Scalable footprints tied to client roadmaps</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded inline-block mb-2">COMPUTE</span>
                <h4 className="font-bold text-slate-900 text-sm mb-2">GPU-as-a-Service &amp; AI Cloud</h4>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li>• On-demand &amp; reserved GPU clusters (H100/H200/Blackwell, MI300X)</li>
                  <li>• Training, fine-tuning &amp; inference-as-a-service</li>
                  <li>• Managed AI platforms &amp; MLOps tooling</li>
                  <li>• Consumption &amp; committed-capacity pricing</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block mb-2">NETWORK</span>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Connectivity &amp; Capacity Sales</h4>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li>• Subsea capacity, IRUs &amp; dark fibre</li>
                  <li>• Satellite landing capacity (9 Tbps) &amp; GSaaS</li>
                  <li>• Terrestrial backhaul &amp; private lines</li>
                  <li>• Bandwidth partner trading programmes</li>
                </ul>
              </div>
            </div>

            {/* Buyers Grid */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-3">
                Buyers We Sell To:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  'HYPERSCALERS & CLOUD PROVIDERS',
                  'AI LABS & GPU CLOUD PROVIDERS',
                  'GLOBAL ENTERPRISES & MNCS',
                  'FINANCIAL SERVICES & TRADING',
                  'TELECOMS & ISPS',
                  'CABLE & SATELLITE OPERATORS',
                  'CONTENT, MEDIA & GAMING',
                  'GOVERNMENT & PUBLIC SECTOR',
                  'CHANNEL PARTNERS & RESELLERS',
                  'MANAGED SERVICE PROVIDERS'
                ].map((b, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 font-bold text-slate-200">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 18: WHY TRUSTGRID.AI DIFFERENTIATORS */}
        <section id="differentiators" className="scroll-mt-32">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
              15 / Why Partner with TRUSTGRID.AI
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Bridging Ambitious Infrastructure Vision and Executable Reality
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Our multidisciplinary team unites data center engineering, government relations, capital markets, AI operations, cybersecurity, energy and connectivity expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Single Accountability', desc: 'From land identification to 24×7 operations and monetisation.' },
              { title: 'India-Specific Expertise', desc: 'Regulatory, policy, state subsidies & CEIG/SPCB liaison mastery.' },
              { title: 'Hyperscale EPC & OEM Ecosystem', desc: 'Unbiased direct engineering with NVIDIA, AMD, Schneider, Vertiv.' },
              { title: 'AI-Native Design', desc: 'Purpose-built for 30–120 kW+ GPU racks and sub-microsecond interconnects.' },
              { title: 'Investment & JV Structuring', desc: 'Techno-commercial bankability models, investor IMs, and debt syndication.' },
              { title: 'Sustainability-First', desc: 'PUE <1.15 engineering with open-access solar/wind PPAs and zero-water cooling.' },
              { title: 'Subsea Cable Know-How', desc: 'Greenfield/brownfield CLS, beach manholes, SLTE & backhaul integration.' },
              { title: 'Satellite 9 Tbps Gateway', desc: 'Teleport ground segment, WPC licensing & GSaaS infrastructure.' },
              { title: 'Cybersecurity & Audits', desc: 'Zero Trust, SOC 2, ISO 27001, DPDP Act 2023 & Uptime Tier III certification.' },
              { title: 'Energy & PPA Structuring', desc: 'Group-captive renewable power models providing long-term tariff predictability.' },
              { title: 'Environmental Liaison', desc: 'Rigorous EIA, EMP, and statutory consent management ensuring zero regulatory delay.' },
              { title: 'Global Market Sales', desc: 'Productised services, GTM acceleration and active tenant demand syndication.' }
            ].map((diff, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                  <h4 className="font-bold text-slate-900 text-sm">{diff.title}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">{diff.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 19: ENGAGEMENT PATHWAY */}
        <section id="engagement-pathway" className="scroll-mt-32">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200/60 inline-block mb-3">
              Engagement Pathway
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Four-Step Project Execution Pathway
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white inline-flex items-center justify-center font-black text-xs mb-3">1</span>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Discovery &amp; Site Screening</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Evaluate candidate sites and markets against power, fibre, regulatory and demand criteria.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white inline-flex items-center justify-center font-black text-xs mb-3">2</span>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Feasibility &amp; Structuring</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Techno-commercial studies, financial models, and concession / JV / SPV frameworks.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white inline-flex items-center justify-center font-black text-xs mb-3">3</span>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Development &amp; Delivery</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Design, EPC, commissioning and Tier certification under one accountable partner.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white inline-flex items-center justify-center font-black text-xs mb-3">4</span>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Operations &amp; Monetisation</h4>
              <p className="text-xs text-slate-600 leading-relaxed">AI-DCIM-led operations and support for sale, REIT, or DBOT transfer outcomes.</p>
            </div>
          </div>
        </section>

        {/* SECTION 20: COMPLETE LIFECYCLE METRICS DASHBOARD */}
        <section id="lifecycle-metrics" className="scroll-mt-32">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
              Quantified Impact
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Lifecycle Metrics &amp; OpEx Benchmarks
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Verifiable engineering benchmarks contrasting typical unoptimized industry baselines with TrustGrid engineered targets.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="flex border-b border-slate-200 overflow-x-auto bg-slate-50/70 p-2 gap-2">
              {[
                { id: 'infra', label: '1. Infrastructure Layer' },
                { id: 'compute', label: '2. Compute Layer' },
                { id: 'economic', label: '3. Economic & Cost' },
                { id: 'operational', label: '4. Operational & Reliability' },
                { id: 'security', label: '5. Security & Compliance' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveMetricsTab(tab.id as any)
                    sendAnalyticsEvent({ event: 'metrics_tab_select', category: tab.id, label: tab.label })
                  }}
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
                    <tbody className="divide-y divide-slate-100 text-slate-700 text-xs sm:text-sm">
                      <tr><td className="py-3 px-4 font-semibold">Power</td><td className="py-3 px-4">PUE (Power Usage Effectiveness)</td><td className="py-3 px-4 text-slate-500">1.4–1.8</td><td className="py-3 px-4 font-bold text-emerald-600">&lt; 1.15 operational target</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Power</td><td className="py-3 px-4">Power density per rack</td><td className="py-3 px-4 text-slate-500">5–15kW</td><td className="py-3 px-4 font-bold text-blue-600">30–120 kW+ (liquid-cooled)</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Cooling</td><td className="py-3 px-4">WUE (Water Usage Effectiveness)</td><td className="py-3 px-4 text-slate-500">1.0–2.0 L/kWh</td><td className="py-3 px-4 font-bold text-emerald-600">&lt; 0.5 L/kWh (Zero-water options)</td></tr>
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
                    <tbody className="divide-y divide-slate-100 text-slate-700 text-xs sm:text-sm">
                      <tr><td className="py-3 px-4 font-semibold">GPU</td><td className="py-3 px-4">Cluster utilization</td><td className="py-3 px-4 text-slate-500">30–50%</td><td className="py-3 px-4 font-bold text-blue-600">70–85% sustained</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">GPU</td><td className="py-3 px-4">GPU availability</td><td className="py-3 px-4 text-slate-500">95–98%</td><td className="py-3 px-4 font-bold text-emerald-600">&gt; 99.5% per month</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">GPU</td><td className="py-3 px-4">MFU (Model FLOPS Utilization)</td><td className="py-3 px-4 text-slate-500">25–35%</td><td className="py-3 px-4 font-bold text-indigo-600">&gt; 45% for large models</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Storage</td><td className="py-3 px-4">Aggregate bandwidth</td><td className="py-3 px-4 text-slate-500">10–30 GB/s</td><td className="py-3 px-4 font-bold text-blue-600">&gt; 100 GB/s per 8-GPU node</td></tr>
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
                    <tbody className="divide-y divide-slate-100 text-slate-700 text-xs sm:text-sm">
                      <tr><td className="py-3 px-4 font-semibold">Cost</td><td className="py-3 px-4">Effective cost of intelligence</td><td className="py-3 px-4 text-slate-500">Baseline</td><td className="py-3 px-4 font-bold text-emerald-600">20–40% reduction</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Cost</td><td className="py-3 px-4">Production cost-per-token</td><td className="py-3 px-4 text-slate-500">Baseline</td><td className="py-3 px-4 font-bold text-emerald-600">Up to 60% reduction</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Cost</td><td className="py-3 px-4">Infrastructure TCO (5-year)</td><td className="py-3 px-4 text-slate-500">Baseline</td><td className="py-3 px-4 font-bold text-blue-600">25–40% reduction</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Speed</td><td className="py-3 px-4">Time-to-production</td><td className="py-3 px-4 text-slate-500">6–12 months</td><td className="py-3 px-4 font-bold text-indigo-600">Weeks to months faster</td></tr>
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
                    <tbody className="divide-y divide-slate-100 text-slate-700 text-xs sm:text-sm">
                      <tr><td className="py-3 px-4 font-semibold">Reliability</td><td className="py-3 px-4">Mean Time To Recovery (MTTR)</td><td className="py-3 px-4 text-slate-500">8–24 hours</td><td className="py-3 px-4 font-bold text-blue-600">&lt; 2 hours (hot spare)</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Operations</td><td className="py-3 px-4">Unplanned downtime</td><td className="py-3 px-4 text-slate-500">2–5%</td><td className="py-3 px-4 font-bold text-emerald-600">&lt; 0.5%</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Operations</td><td className="py-3 px-4">Rollback time</td><td className="py-3 px-4 text-slate-500">Hours</td><td className="py-3 px-4 font-bold text-purple-600">&lt; 5 minutes</td></tr>
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
                    <tbody className="divide-y divide-slate-100 text-slate-700 text-xs sm:text-sm">
                      <tr><td className="py-3 px-4 font-semibold">Compliance</td><td className="py-3 px-4">Compliance audit pass rate</td><td className="py-3 px-4 text-slate-500">70–85%</td><td className="py-3 px-4 font-bold text-emerald-600">&gt; 98% pass rate</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Compliance</td><td className="py-3 px-4">Evidence collection time</td><td className="py-3 px-4 text-slate-500">Weeks of manual audit</td><td className="py-3 px-4 font-bold text-blue-600">Automated, continuous real-time</td></tr>
                      <tr><td className="py-3 px-4 font-semibold">Security</td><td className="py-3 px-4">Mean time to detect threat</td><td className="py-3 px-4 text-slate-500">Hours–days</td><td className="py-3 px-4 font-bold text-rose-600">&lt; 15 minutes</td></tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 21: DIRECT LEADERSHIP CONTACTS */}
        <section id="leadership-contacts" className="scroll-mt-32">
          <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-1">
                16 / Contact Leadership
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Let&rsquo;s Build India&rsquo;s AI Infrastructure Together
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Whether you bring land, capital, a hyperscale workload, a cable ready to land, or satellite spectrum ready to terminate — we can structure and deliver it.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white mb-0.5">Balaji</h4>
                  <span className="text-xs text-cyan-400 font-semibold block mb-4">Director — Hyperscale &amp; AI Infrastructure</span>
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-slate-400" />
                      <a href="mailto:bv@trustgrid.ai" className="hover:text-cyan-300 transition-colors">bv@trustgrid.ai</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-slate-400" />
                      <a href="tel:+919886318611" className="hover:text-cyan-300 transition-colors">+91 9886318611</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white mb-0.5">Shaji K Namath</h4>
                  <span className="text-xs text-cyan-400 font-semibold block mb-4">Director — AI Transformation &amp; Acceleration</span>
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-slate-400" />
                      <a href="mailto:shaji@trustgrid.ai" className="hover:text-cyan-300 transition-colors">shaji@trustgrid.ai</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-slate-400" />
                      <a href="tel:+919880425247" className="hover:text-cyan-300 transition-colors">+91 9880425247</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SUPPORTING ICP / PROBLEM / CHALLENGES / METRICS (WO-157) */}
        <div className="my-12">
          <ICPSlider />
        </div>

        {/* SECTION 22: PRIMARY CTA & EXECUTIVE CONSULTATION FORM */}
        <section id="contact-advisory" className="pt-6 pb-6">
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-12 shadow-2xl border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center mb-10 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/60 border border-blue-700 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
                <Sparkles size={13} />
                <span>Executive Engagement</span>
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-white">
                Book Your AI Infrastructure Diagnostic
              </h3>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mb-6">
                Request a confidential capability presentation or a site feasibility assessment. Tell us what you bring — land, capital, workload, cable or spectrum — and we will structure the asset and the route to revenue.
              </p>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8 text-left text-xs sm:text-sm text-slate-300 max-w-4xl mx-auto">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>Land, grid &amp; substation capacity feasibility review</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>30–120 kW+ direct liquid cooling &amp; PUE architecture</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>DBOT / DBFO commercial &amp; financing advisory</span>
                </div>
              </div>

              {/* Quick CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <WhatsAppCTA />
                <Link
                  href="/book-ai-diagnostic?solution=ai-infra-engineering"
                  onClick={() => trackCTA('Diagnostic Assessment Direct Link', 'bottom_cta', '/book-ai-diagnostic')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all hover:border-white/40"
                >
                  <span>Interactive Diagnostic Assessment</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* Enterprise Embedded Form Card */}
            <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl text-slate-900 border border-slate-200 relative z-10">
              <div className="border-b border-slate-200 pb-5 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xl sm:text-2xl tracking-tight">Request AI Infrastructure Diagnostic Consultation</h4>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Direct engagement with our AI Data Center Engineering team</p>
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

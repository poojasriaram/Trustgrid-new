'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Building2,
  Users,
  Award,
  MapPin,
  FileText,
  Cpu,
  Layers,
  ShieldCheck,
  Network,
  TrendingUp,
  BrainCircuit,
  Bot,
  Compass,
  BookOpen,
  CheckCircle2,
  Trophy,
  Lock,
  Workflow,
  BarChart3,
  Lightbulb,
  FileSpreadsheet,
  FolderOpen,
  Globe2,
  Phone,
  MessageCircle,
  Zap,
  Cable,
  Satellite,
  Leaf,
  Boxes,
  ShieldAlert,
  SlidersHorizontal,
  Target
} from 'lucide-react'
import { logoUrl, solutions } from '@/lib/solutions'
import { industriesData } from '@/lib/industries-data'
import { trackWhatsAppClick } from '@/lib/analytics'

// 1. AI Infra Menu Items (12 Items)
const aiInfraMenuItems = [
  {
    id: 'lifecycle',
    label: '7-Stage Lifecycle',
    desc: 'Turnkey site selection, power, build, commissioning & ops',
    icon: Layers
  },
  {
    id: 'core-offerings',
    label: 'Core Infrastructure Pillars',
    desc: 'Greenfield, high density, power/cooling & DCIM ops',
    icon: Building2
  },
  {
    id: 'high-density-engineering',
    label: 'GPU Cluster & High-Density',
    desc: '30–100kW/rack, NVLink, InfiniBand & Blackwell scale',
    icon: Cpu
  },
  {
    id: 'power-cooling',
    label: 'Power & Liquid Immersion',
    desc: 'Substations, direct-to-chip, DLC & PUE < 1.10 target',
    icon: Zap
  },
  {
    id: 'ai-networking',
    label: '400G / 800G AI Networking',
    desc: 'Non-blocking RoCEv2, InfiniBand & ultra-low latency',
    icon: Network
  },
  {
    id: 'ai-dcim-ops',
    label: 'AI-DCIM & GPU Fleet Ops',
    desc: 'Autonomous telemetry, Slurm/K8s, and AIOps predictive DCIM',
    icon: Workflow
  },
  {
    id: 'cybersecurity-compliance',
    label: 'Quantum-Safe & Compliance',
    desc: 'Tier III/IV, L1–L7 PQC, ISO 27001 & sovereign governance',
    icon: ShieldCheck
  },
  {
    id: 'cable-landing',
    label: 'Subsea Cable Landing (CLS)',
    desc: 'Turnkey CLS, wet-plant, beach manholes & backhaul',
    icon: Cable
  },
  {
    id: 'satellite-landing',
    label: 'Satellite Ground Stations',
    desc: '9 Tbps landing capacity, LEO/MEO tracking & GSaaS',
    icon: Satellite
  },
  {
    id: 'energy-green-power',
    label: 'Green Energy & PPAs',
    desc: 'Renewable microgrids, BESS, solar/hydro & utility grid',
    icon: Leaf
  },
  {
    id: 'delivery-models',
    label: 'Turnkey DBOT Suite',
    desc: 'Design, Build, Operate, Transfer & EPC accountability',
    icon: Boxes
  },
  {
    id: 'lifecycle-metrics',
    label: 'Lifecycle Metrics & OpEx',
    desc: 'Lean, TOC, OEE scoring & cost-per-token economics',
    icon: BarChart3
  }
]

// 2. Agentic Enterprise Menu Items (12 Items)
const agenticEnterpriseMenuItems = [
  {
    id: 'agent-architecture',
    label: 'Autonomous Agent Architecture',
    desc: 'Cognitive loops, ReAct, Tree-of-Thought & persistent memory',
    icon: Bot
  },
  {
    id: 'multi-agent-orchestration',
    label: 'Multi-Agent Swarm Orchestration',
    desc: 'LangGraph, AutoGen, CrewAI & deterministic consensus DAGs',
    icon: Workflow
  },
  {
    id: 'vertical-factories',
    label: 'Vertical Enterprise Agent Factories',
    desc: 'Pre-built autonomous agents for Finance, Supply Chain, SRE & HR',
    icon: Layers
  },
  {
    id: 'mcp-tool-integration',
    label: 'Model Context Protocol & Tools',
    desc: 'Standardized tool interfaces, ERP/CRM & database connectors',
    icon: Cpu
  },
  {
    id: 'agentops-governance',
    label: 'Enterprise AgentOps & Telemetry',
    desc: 'Distributed trace observability, token telemetry & failure triage',
    icon: BarChart3
  },
  {
    id: 'guardrails-safety',
    label: 'Runtime Guardrails & Firewalls',
    desc: 'Anti-injection shields, semantic boundary enforcement & safety',
    icon: ShieldCheck
  },
  {
    id: 'human-agent-teaming',
    label: 'Human-in-the-Loop (HITL) Teaming',
    desc: 'Dynamic confidence gates, approval workflows & workforce ops',
    icon: Users
  },
  {
    id: 'synthetic-eval-sprints',
    label: 'Continuous Agent Evaluation',
    desc: 'Synthetic benchmarking, automated red-teaming & regression suites',
    icon: Target
  },
  {
    id: 'edge-onprem-runtimes',
    label: 'Sovereign & On-Prem Agent Runtimes',
    desc: 'Air-gapped SLMs, local inference pods & zero-data-leakage',
    icon: Building2
  },
  {
    id: 'agentic-transformation',
    label: '12–24 Wk Pilot to Factory Delivery',
    desc: 'Organizational enablement, change management & DBOT delivery',
    icon: Compass
  },
  {
    id: 'fleet-metrics-roi',
    label: 'Agent Fleet Yield & SLA Metrics',
    desc: 'Task autonomy rate, cost-per-successful-task & cycle time reduction',
    icon: TrendingUp
  },
  {
    id: 'agentic-diagnostic',
    label: 'Enterprise Agentic Diagnostic',
    desc: 'Executive technical readiness audit, opportunity prioritization & roadmap',
    icon: Sparkles
  }
]

// 3. AI Networking Menu Items (12 Items)
const aiNetworkingMenuItems = [
  {
    id: 'lossless-fabrics',
    label: 'Lossless RoCEv2 & InfiniBand',
    desc: 'Quantum-2 InfiniBand & Spectrum-X RoCEv2 for zero packet loss',
    icon: Network
  },
  {
    id: 'rail-topologies',
    label: 'Rail-Optimized & Dragonfly+',
    desc: 'Symmetrical Fat-Tree, non-blocking bisection & GPU-rail alignment',
    icon: Layers
  },
  {
    id: 'collective-tuning',
    label: 'Collective Communications & NCCL',
    desc: 'AllReduce, AlltoAll barrier tuning, SHARP in-network compute',
    icon: Cpu
  },
  {
    id: 'optics-transceivers',
    label: '400G / 800G / 1.6T Co-Packaged Optics',
    desc: 'OSFP, QSFP-DD, low-loss active optical cabling & single-mode fiber',
    icon: Zap
  },
  {
    id: 'autonomous-ai-noc',
    label: 'Autonomous AI NOC & Telemetry',
    desc: 'In-band Network Telemetry (INT), silent drop detection & self-healing',
    icon: Workflow
  },
  {
    id: 'congestion-control',
    label: 'Hardware Congestion Control',
    desc: 'PFC watchdog, ECN thresholds & dynamic packet routing algorithms',
    icon: SlidersHorizontal
  },
  {
    id: 'ntn-satellite',
    label: 'Non-Terrestrial Networks (NTN)',
    desc: '9 Tbps satellite ground stations, LEO/MEO tracking & space relay',
    icon: Satellite
  },
  {
    id: 'dci-interconnect',
    label: 'Coherent Data Center Interconnect',
    desc: 'Sub-millisecond DWDM metro interconnects & multi-campus sync',
    icon: Cable
  },
  {
    id: 'storage-fabrics',
    label: 'NVMe-oF & GPUDirect Storage',
    desc: 'Sub-microsecond storage transport, parallel file systems & zero-copy',
    icon: Building2
  },
  {
    id: 'hybrid-multicloud-mesh',
    label: 'Hybrid Sovereign Cloud Fabric',
    desc: 'Private AI clusters securely meshed with sovereign cloud enclaves',
    icon: Globe2
  },
  {
    id: 'network-yield-kpis',
    label: 'Fabric Throughput & OEE Metrics',
    desc: 'Effective bandwidth yield, tail latency elimination & jitter metrics',
    icon: BarChart3
  },
  {
    id: 'network-diagnostic',
    label: 'AI Network Diagnostic & Audit',
    desc: 'Live fabric packet loss analysis, latency profiling & topology audit',
    icon: Sparkles
  }
]

// 4. AI Cybersecurity Menu Items (12 Items)
const aiCybersecurityMenuItems = [
  {
    id: 'pqc-cbom',
    label: 'L1–L7 Post-Quantum Cryptography',
    desc: 'NIST PQC standards (ML-KEM, ML-DSA) & automated CBOM discovery',
    icon: Lock
  },
  {
    id: 'prompt-firewalls',
    label: 'Prompt Firewalls & Hijack Defense',
    desc: 'In-line real-time prompt injection shields, jailbreak defense & safety',
    icon: ShieldAlert
  },
  {
    id: 'agent-identity-iam',
    label: 'Zero-Trust Identity for Agents',
    desc: 'Cryptographic SPIFFE/SPIRE workload identity & ephemeral IAM',
    icon: ShieldCheck
  },
  {
    id: 'training-security',
    label: 'Model Provenance & Data Defense',
    desc: 'Cryptographic weight signing, data pipeline verification & watermarks',
    icon: CheckCircle2
  },
  {
    id: 'managed-ai-soc',
    label: '24/7 Managed AI SOC & Hunting',
    desc: 'Autonomous threat detection, AI SIEM correlation & synthetic triage',
    icon: Workflow
  },
  {
    id: 'confidential-compute',
    label: 'Confidential Compute & Enclaves',
    desc: 'Hardware TEEs, encrypted GPU memory & multi-party computation',
    icon: Cpu
  },
  {
    id: 'air-gapped-sovereign',
    label: 'Air-Gapped Sovereign AI Enclaves',
    desc: 'Classified zero-outbound defense pods & defense-grade isolation',
    icon: Building2
  },
  {
    id: 'ai-red-teaming',
    label: 'Automated Red-Teaming & Stress Tests',
    desc: 'Continuous model fuzzing, evasion probes & hallucination testing',
    icon: Target
  },
  {
    id: 'regulatory-compliance',
    label: 'EU AI Act & ISO 42001 Compliance',
    desc: 'Automated conformity assessment, NIST AI RMF & audit-ready evidence',
    icon: FileSpreadsheet
  },
  {
    id: 'immutable-audit',
    label: 'Cryptographic Decision Provenance',
    desc: 'Tamper-proof audit ledgers, causal decision replay & legal defense logs',
    icon: Layers
  },
  {
    id: 'cyber-posture-kpis',
    label: 'Quantum & Cyber Resilience Metrics',
    desc: 'Harvest-Now risk index, CBOM migration progress & containment times',
    icon: BarChart3
  },
  {
    id: 'cyber-audit-cta',
    label: 'Quantum & AI Security Diagnostic',
    desc: 'Cryptographic inventory assessment, agent vulnerability audit & roadmap',
    icon: Sparkles
  }
]

// 5. AI Value Engineering Menu Items (12 Items)
const aiValueMenuItems = [
  {
    id: 'value-discovery',
    label: 'AI Value Discovery & Prioritization',
    desc: 'Quantitative business case modeling, feasibility matrices & ROI ranking',
    icon: TrendingUp
  },
  {
    id: 'finops-economics',
    label: 'AI FinOps & Unit Economics Engine',
    desc: 'Cost-per-token analytics, GPU allocation chargebacks & OpEx modeling',
    icon: BarChart3
  },
  {
    id: 'throughput-toc',
    label: 'Theory of Constraints Compute Yield',
    desc: 'Goldratt bottleneck resolution applied to token throughput & cash flow',
    icon: Workflow
  },
  {
    id: 'lean-waste-elimination',
    label: 'Lean AI Waste Elimination',
    desc: 'Eliminating idle GPU cycles, over-provisioning & redundant passes',
    icon: SlidersHorizontal
  },
  {
    id: 'acceleration-sprints',
    label: '90-Day Rapid Acceleration Sprints',
    desc: 'Fast-track from diagnostic to verified production value & savings',
    icon: Zap
  },
  {
    id: 'enterprise-ai-os',
    label: 'Enterprise AI Operating System',
    desc: 'Cross-functional delivery hubs, capability compounding & operating models',
    icon: Boxes
  },
  {
    id: 'vro-office',
    label: 'Value Realization Office Setup',
    desc: 'Institutionalized ROI tracking, CFO dashboards & governance cadences',
    icon: Building2
  },
  {
    id: 'cloud-vs-onprem',
    label: 'Cloud vs. On-Premises TCO Arbitrage',
    desc: 'CapEx vs OpEx break-even models, hybrid repatriation & payback math',
    icon: Cpu
  },
  {
    id: 'hoshin-kanri-kpis',
    label: 'Hoshin Kanri Strategic Cascading',
    desc: 'Aligning corporate board goals directly to AI engineering execution',
    icon: Layers
  },
  {
    id: 'compounding-capital',
    label: 'Capital Reinvestment & Scaling',
    desc: 'Reinvesting verified AI efficiency savings into high-yield capability',
    icon: ArrowUpRight
  },
  {
    id: 'verified-roi-metrics',
    label: 'Verified Value Metrics & P&L',
    desc: 'Audited 3–10x ROI benchmarks, 6–18 month payback & balance sheet gains',
    icon: CheckCircle2
  },
  {
    id: 'value-diagnostic',
    label: 'Enterprise Value Diagnostic',
    desc: 'Executive economic evaluation, payback modeling & CFO consensus canvas',
    icon: Sparkles
  }
]


// 6. Common Foundation Menu Items (6 Items)
const commonFoundationMenuItems = [
  {
    label: 'Industries',
    href: '/industries',
    icon: Building2,
    desc: '20+ specialized enterprise verticals from banking to aerospace & defense'
  },
  {
    label: 'Methodology Engine',
    href: '/methodology-engine',
    icon: Sparkles,
    desc: 'Lean, TOC, DMAIC, OEE, TPM and 80+ operational AI engineering models'
  },
  {
    label: 'Engagement Models',
    href: '/request-proposal',
    icon: Workflow,
    desc: 'Diagnostic, sprint, co-engineering, and turnkey DBOT delivery frameworks'
  },
  {
    label: 'Case Studies & Metrics',
    href: '/case-studies',
    icon: BarChart3,
    desc: 'Measurable enterprise impact, GPU yield, latency & P&L outcomes'
  },
  {
    label: 'Technology Ecosystem',
    href: '/partners',
    icon: Network,
    desc: 'Hardware accelerators, silicon platforms, orchestration & PQC stacks'
  },
  {
    label: 'Book Your AI Diagnostic',
    href: '/book-ai-diagnostic',
    icon: ArrowUpRight,
    desc: 'Executive technical & financial evaluation of enterprise AI readiness'
  }
]

// 7. About Us Menu Items (6 Items)
const aboutMenuItems = [
  {
    label: 'About TrustGrid.AI',
    href: '/about',
    icon: Building2,
    desc: 'Our mission, vision, and full-spectrum engineering verticals'
  },
  {
    label: 'Leadership & Teams',
    href: '/leadership',
    icon: Users,
    desc: 'World-class AI architects, systems leads, and advisory board'
  },
  {
    label: 'Careers & Fellowships',
    href: '/careers',
    icon: Award,
    desc: 'Frontier AI hackathons, research fellowships, and open roles'
  },
  {
    label: 'Global Presence',
    href: '/about#presence',
    icon: MapPin,
    desc: 'Executive offices in US, Singapore, and India R&D labs'
  },
  {
    label: 'Case Studies',
    href: '/case-studies',
    icon: FileText,
    desc: 'Production outcomes across defense, banking, and enterprise AI'
  },
  {
    label: 'Methodology Engine',
    href: '/methodology-engine',
    icon: Sparkles,
    desc: 'Proprietary AI-driven methodology implementation framework'
  }
]

const methodologyCategories = [
  {
    title: 'AI Engineering',
    icon: Cpu,
    desc: 'Eliminate compute waste, maximize GPU utilization, and engineer factory throughput.',
    items: [
      'Lean Thinking',
      'TOC',
      'DMAIC',
      'OEE',
      'TPM',
      'SMED',
      'Value Stream Mapping'
    ]
  },
  {
    title: 'Agentic AI',
    icon: Bot,
    desc: 'Orchestrate multi-agent DAGs, mistake-proof tool calls, and monitor agent fleet SLA.',
    items: [
      'AgentOps',
      'Agile/Scrum',
      'DevOps/CI/CD',
      'FMEA',
      'Poka-Yoke',
      'Jidoka',
      'OKR'
    ]
  },
  {
    title: 'Trusted AI',
    icon: ShieldCheck,
    desc: 'Deterministic guardrails, mathematical explainability, and regulatory governance.',
    items: [
      'Responsible AI',
      'Explainability',
      'FMEA',
      'SPC',
      'Governance',
      'Continuous Assurance'
    ]
  },
  {
    title: 'AI Value Engineering',
    icon: TrendingUp,
    desc: 'Bridge technical compute metrics directly to CFO-approved P&L earnings.',
    items: [
      'Hoshin Kanri',
      'Balanced Scorecard',
      'OKR',
      'Throughput Accounting',
      'Value Engineering',
      'Portfolio Optimization'
    ]
  }
]

const insightsMenuItems = [
  {
    label: 'AI Insights',
    href: '/insights',
    icon: BookOpen,
    desc: 'Core perspectives on frontier AI architectures, systems, and enterprise deployment.'
  },
  {
    label: 'Case Studies',
    href: '/case-studies',
    icon: FileText,
    desc: 'Production outcomes in defense, tier-1 banking, healthcare, and industrial manufacturing.'
  },
  {
    label: 'Whitepapers',
    href: '/insights',
    icon: FileSpreadsheet,
    desc: 'Inference economics, token cost reduction blueprints, and hardware benchmarks.'
  },
  {
    label: 'Research',
    href: '/insights',
    icon: Compass,
    desc: 'Post-quantum cryptographic transitions (PQC / CBOM) and agent safety research.'
  },
  {
    label: 'Blog',
    href: '/insights',
    icon: Lightbulb,
    desc: 'Engineering dispatches, architectural reviews, and operational methodologies.'
  },
  {
    label: 'Resources & Frameworks',
    href: '/insights',
    icon: FolderOpen,
    desc: 'Frameworks, maturity assessment models, and technical reference guides.'
  },
  {
    label: 'Site Map v14.0',
    href: '/sitemap',
    icon: Layers,
    desc: 'Complete 5-level expert content model spanning 6 Groups and 18 Engineering Areas.'
  },
  {
    label: 'Crowd Safety Predictor',
    href: 'https://crowd-safety-predictor.vercel.app/',
    icon: Trophy,
    isExternal: true,
    desc: 'Live open innovation hackathon project: multi-camera computer vision & telemetry.'
  }
]

const solutionGroups = [
  {
    groupTag: 'AGENTIC ENTERPRISE',
    name: 'AGENTIC ENTERPRISE',
    title: 'AGENTIC ENTERPRISE',
    slug: 'ai-agentic-factory',
    sitemapAnchor: 'group-1',
    desc: 'Autonomous Agent Design, Multi-Agent Orchestration, Vertical Agent Fleets & Governed AgentOps',
    icon: Bot,
  },
  {
    groupTag: 'AI INFRASTRUCTURE',
    name: 'AI INFRASTRUCTURE & AI DATA CENTER ENGINEERING',
    title: 'AI INFRASTRUCTURE & AI DATA CENTER ENGINEERING',
    slug: 'ai-infra-engineering',
    sitemapAnchor: 'group-2',
    desc: 'Strategic Site Due Diligence, High-Density Facilities (30–100kW), GPU Acceleration & Cluster Fabric',
    icon: Cpu,
  },
  {
    groupTag: 'AI NETWORKING',
    name: 'AI NETWORKING',
    title: 'AI NETWORKING',
    slug: 'ai-networking',
    sitemapAnchor: 'group-3',
    desc: 'Enterprise & DC Fabrics, Non-Terrestrial Networks (NTN / Satellite / FSO) & Autonomous AI NOC',
    icon: Network,
  },
  {
    groupTag: 'AI CYBERSECURITY',
    name: 'AI CYBERSECURITY & QUANTUM-SAFE NETWORKING',
    title: 'AI CYBERSECURITY & QUANTUM-SAFE NETWORKING',
    slug: 'ai-cybersecurity-quantum-safe',
    sitemapAnchor: 'group-4',
    desc: 'L1–L7 Post-Quantum Cryptography (PQC / CBOM), Agent Guardrails, Zero-Trust & Managed AI SOC',
    icon: Lock,
  },
  {
    groupTag: 'TRUSTED AI',
    name: 'TRUSTED AI ENGINEERING',
    title: 'TRUSTED AI ENGINEERING',
    slug: 'trusted-ai-transformation',
    sitemapAnchor: 'group-5',
    desc: 'Mathematical Explainability (SHAP/LIME), Formal Robustness, Responsible AI & Continuous SPC',
    icon: ShieldCheck,
  },
  {
    groupTag: 'VALUE ENGINEERING',
    name: 'AI VALUE ENGINEERING & ACCELERATION',
    title: 'AI VALUE ENGINEERING & ACCELERATION',
    slug: 'ai-value-engineering',
    sitemapAnchor: 'group-6',
    desc: 'Value Discovery, FinOps Unit Economics, Acceleration Sprints & Enterprise Operating System',
    icon: TrendingUp,
  },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = (menuName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setActiveMenu(menuName)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
    }, 180)
  }

  const closeAll = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setActiveMenu(null)
    setOpen(false)
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    closeAll()
    if (!href || !href.includes('#')) return

    const [targetPath, hash] = href.split('#')
    if (!hash) return

    const currentPath = (typeof window !== 'undefined' ? window.location.pathname : '').replace(/\/$/, '') || '/'
    const normTarget = (targetPath || '').replace(/\/$/, '') || '/'

    // If already on the target page, intercept and scroll smoothly with header offset
    if (currentPath === normTarget) {
      e.preventDefault()
      window.history.pushState(null, '', href)
      const el = document.getElementById(hash)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 90
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
  }

  // Cross-page and initial load hash scroll handler
  useEffect(() => {
    const scrollToHash = () => {
      if (typeof window === 'undefined') return
      const hash = window.location.hash.replace('#', '')
      if (!hash) return

      let attempts = 0
      const tryScroll = () => {
        const el = document.getElementById(hash)
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 90
          window.scrollTo({ top, behavior: 'smooth' })
        } else if (attempts < 15) {
          attempts++
          setTimeout(tryScroll, 80)
        }
      }

      setTimeout(tryScroll, 60)
    }

    scrollToHash()
    window.addEventListener('hashchange', scrollToHash)
    return () => window.removeEventListener('hashchange', scrollToHash)
  }, [pathname])

  const toggleMenu = (menuName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setActiveMenu(activeMenu === menuName ? null : menuName)
  }

  const toggleMobileSection = (sec: string) => {
    setMobileSection(mobileSection === sec ? null : sec)
  }

  return (
    <header
      ref={headerRef}
      className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}
    >
      <Link className="brand" href="/" aria-label="TRUSTGRID.AI home" onClick={closeAll}>
        <img src={logoUrl} alt="TRUSTGRID.AI" />
      </Link>

      <nav className={`nav ${open ? 'nav-open' : ''}`} aria-label="Primary navigation">
        {/* 1. HOME */}
        <Link href="/" className="nav-link" onClick={closeAll}>
          Home
        </Link>

        {/* 2. AI INFRA & DATA CENTER */}
        <div
          className="nav-dropdown-wrapper"
          onMouseEnter={() => handleMouseEnter('ai-infra')}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`nav-menu-trigger ${activeMenu === 'ai-infra' ? 'active' : ''}`}
            onClick={() => toggleMenu('ai-infra')}
            aria-expanded={activeMenu === 'ai-infra'}
          >
            <span>AI Infra & Data Center</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'ai-infra' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'ai-infra' && (
            <div className="isi-mega-panel isi-mega-infra">
              <div className="isi-mega-layout">
                {/* Left Category Introduction */}
                <div className="isi-mega-sidebar">
                  <div className="isi-sidebar-top">
                    <span className="isi-sidebar-badge">
                      <span className="pulse-dot" />
                      STRATEGIC BLUEPRINT V2.0
                    </span>
                    <h3 className="isi-sidebar-title">AI Infra & Data Center</h3>
                    <p className="isi-sidebar-desc">
                      End-to-end AI Factory engineering from 100MW–GW greenfield to GPU Ops & token unit economics.
                    </p>
                  </div>
                  <div className="isi-sidebar-bottom">
                    <div className="isi-sidebar-metric-chip">
                      <Sparkles size={12} className="text-blue-600" />
                      <span>30–70% Higher GPU Yield</span>
                    </div>
                    <Link
                      href="/solutions/ai-infra-engineering"
                      className="isi-sidebar-action"
                      onClick={closeAll}
                    >
                      <span>Explore Blueprint</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>

                {/* Right Structured Grid (3 columns, 12 items) */}
                <div className="isi-mega-content columns-3">
                  {aiInfraMenuItems.map((item, idx) => {
                    const Icon = item.icon
                    const itemHref = `/solutions/ai-infra-engineering#${item.id}`
                    return (
                      <Link
                        key={idx}
                        href={itemHref}
                        className="isi-menu-card"
                        onClick={(e) => handleNavClick(e, itemHref)}
                      >
                        <div className="isi-card-icon">
                          <Icon size={16} />
                        </div>
                        <div className="isi-card-body">
                          <div className="isi-card-heading">
                            <span className="isi-card-title">{item.label}</span>
                            <ArrowRight size={13} className="isi-card-arrow" />
                          </div>
                          <p className="isi-card-desc">{item.desc}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Mega-Menu Footer */}
              <div className="isi-mega-footer">
                <div className="isi-footer-badge">
                  <Sparkles size={13} className="text-blue-600" />
                  <span>Full-stack engineering accountability from power delivery to token delivery</span>
                </div>
                <Link
                  href="/book-ai-diagnostic?solution=ai-infra-engineering"
                  className="isi-footer-action"
                  onClick={closeAll}
                >
                  <span>Book AI Diagnostic Assessment</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 3. AGENTIC ENTERPRISE */}
        <div
          className="nav-dropdown-wrapper"
          onMouseEnter={() => handleMouseEnter('agentic')}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`nav-menu-trigger ${activeMenu === 'agentic' ? 'active' : ''}`}
            onClick={() => toggleMenu('agentic')}
            aria-expanded={activeMenu === 'agentic'}
          >
            <span>Agentic Enterprise</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'agentic' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'agentic' && (
            <div className="isi-mega-panel isi-mega-agentic">
              <div className="isi-mega-layout">
                {/* Left Category Introduction */}
                <div className="isi-mega-sidebar">
                  <div className="isi-sidebar-top">
                    <span className="isi-sidebar-badge">
                      <span className="pulse-dot" />
                      AUTONOMOUS AGENTIC FACTORY
                    </span>
                    <h3 className="isi-sidebar-title">Agentic Enterprise</h3>
                    <p className="isi-sidebar-desc">
                      Architect, deploy, and govern production multi-agent systems with deterministic reasoning DAGs and persistent memory.
                    </p>
                  </div>
                  <div className="isi-sidebar-bottom">
                    <div className="isi-sidebar-metric-chip">
                      <Sparkles size={12} className="text-blue-600" />
                      <span>&gt;95% Task Accuracy with SLA</span>
                    </div>
                    <Link
                      href="/solutions/ai-agentic-factory"
                      className="isi-sidebar-action"
                      onClick={closeAll}
                    >
                      <span>Explore Blueprint</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>

                {/* Right Structured Grid (3 columns, 12 items) */}
                <div className="isi-mega-content columns-3">
                  {agenticEnterpriseMenuItems.map((item, idx) => {
                    const Icon = item.icon
                    const itemHref = `/solutions/ai-agentic-factory#${item.id}`
                    return (
                      <Link
                        key={idx}
                        href={itemHref}
                        className="isi-menu-card"
                        onClick={(e) => handleNavClick(e, itemHref)}
                      >
                        <div className="isi-card-icon">
                          <Icon size={16} />
                        </div>
                        <div className="isi-card-body">
                          <div className="isi-card-heading">
                            <span className="isi-card-title">{item.label}</span>
                            <ArrowRight size={13} className="isi-card-arrow" />
                          </div>
                          <p className="isi-card-desc">{item.desc}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Mega-Menu Footer */}
              <div className="isi-mega-footer">
                <div className="isi-footer-badge">
                  <Sparkles size={13} className="text-blue-600" />
                  <span>Governed AgentOps, continuous evaluation & multi-agent swarms</span>
                </div>
                <Link
                  href="/book-ai-diagnostic?solution=ai-agentic-factory"
                  className="isi-footer-action"
                  onClick={closeAll}
                >
                  <span>Book AI Diagnostic Assessment</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 4. AI NETWORKING */}
        <div
          className="nav-dropdown-wrapper"
          onMouseEnter={() => handleMouseEnter('networking')}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`nav-menu-trigger ${activeMenu === 'networking' ? 'active' : ''}`}
            onClick={() => toggleMenu('networking')}
            aria-expanded={activeMenu === 'networking'}
          >
            <span>AI Networking</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'networking' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'networking' && (
            <div className="isi-mega-panel isi-mega-networking">
              <div className="isi-mega-layout">
                {/* Left Category Introduction */}
                <div className="isi-mega-sidebar">
                  <div className="isi-sidebar-top">
                    <span className="isi-sidebar-badge">
                      <span className="pulse-dot" />
                      LOSSLESS FABRIC & INTERCONNECT
                    </span>
                    <h3 className="isi-sidebar-title">AI Networking</h3>
                    <p className="isi-sidebar-desc">
                      Ultra-low latency, non-blocking InfiniBand and RoCEv2 fabrics engineered for zero packet loss.
                    </p>
                  </div>
                  <div className="isi-sidebar-bottom">
                    <div className="isi-sidebar-metric-chip">
                      <Sparkles size={12} className="text-blue-600" />
                      <span>Zero Loss at 400G / 800G</span>
                    </div>
                    <Link
                      href="/solutions/ai-networking"
                      className="isi-sidebar-action"
                      onClick={closeAll}
                    >
                      <span>Explore Blueprint</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>

                {/* Right Structured Grid (3 columns, 12 items) */}
                <div className="isi-mega-content columns-3">
                  {aiNetworkingMenuItems.map((item, idx) => {
                    const Icon = item.icon
                    const itemHref = `/solutions/ai-networking#${item.id}`
                    return (
                      <Link
                        key={idx}
                        href={itemHref}
                        className="isi-menu-card"
                        onClick={(e) => handleNavClick(e, itemHref)}
                      >
                        <div className="isi-card-icon">
                          <Icon size={16} />
                        </div>
                        <div className="isi-card-body">
                          <div className="isi-card-heading">
                            <span className="isi-card-title">{item.label}</span>
                            <ArrowRight size={13} className="isi-card-arrow" />
                          </div>
                          <p className="isi-card-desc">{item.desc}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Mega-Menu Footer */}
              <div className="isi-mega-footer">
                <div className="isi-footer-badge">
                  <Sparkles size={13} className="text-blue-600" />
                  <span>Rail-optimized Dragonfly+ topologies & autonomous NOC self-healing</span>
                </div>
                <Link
                  href="/book-ai-diagnostic?solution=ai-networking"
                  className="isi-footer-action"
                  onClick={closeAll}
                >
                  <span>Book AI Diagnostic Assessment</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 5. AI CYBERSECURITY */}
        <div
          className="nav-dropdown-wrapper"
          onMouseEnter={() => handleMouseEnter('cybersecurity')}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`nav-menu-trigger ${activeMenu === 'cybersecurity' ? 'active' : ''}`}
            onClick={() => toggleMenu('cybersecurity')}
            aria-expanded={activeMenu === 'cybersecurity'}
          >
            <span>AI Cybersecurity</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'cybersecurity' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'cybersecurity' && (
            <div className="isi-mega-panel isi-mega-cybersecurity">
              <div className="isi-mega-layout">
                {/* Left Category Introduction */}
                <div className="isi-mega-sidebar">
                  <div className="isi-sidebar-top">
                    <span className="isi-sidebar-badge">
                      <span className="pulse-dot" />
                      QUANTUM-SAFE DEFENSE & SOC
                    </span>
                    <h3 className="isi-sidebar-title">AI Cybersecurity</h3>
                    <p className="isi-sidebar-desc">
                      L1–L7 Post-Quantum Cryptography (PQC / CBOM) paired with non-deterministic agent guardrails.
                    </p>
                  </div>
                  <div className="isi-sidebar-bottom">
                    <div className="isi-sidebar-metric-chip">
                      <Sparkles size={12} className="text-blue-600" />
                      <span>100% CBOM Visibility</span>
                    </div>
                    <Link
                      href="/solutions/ai-cybersecurity-quantum-safe"
                      className="isi-sidebar-action"
                      onClick={closeAll}
                    >
                      <span>Explore Blueprint</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>

                {/* Right Structured Grid (3 columns, 12 items) */}
                <div className="isi-mega-content columns-3">
                  {aiCybersecurityMenuItems.map((item, idx) => {
                    const Icon = item.icon
                    const itemHref = `/solutions/ai-cybersecurity-quantum-safe#${item.id}`
                    return (
                      <Link
                        key={idx}
                        href={itemHref}
                        className="isi-menu-card"
                        onClick={(e) => handleNavClick(e, itemHref)}
                      >
                        <div className="isi-card-icon">
                          <Icon size={16} />
                        </div>
                        <div className="isi-card-body">
                          <div className="isi-card-heading">
                            <span className="isi-card-title">{item.label}</span>
                            <ArrowRight size={13} className="isi-card-arrow" />
                          </div>
                          <p className="isi-card-desc">{item.desc}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Mega-Menu Footer */}
              <div className="isi-mega-footer">
                <div className="isi-footer-badge">
                  <Sparkles size={13} className="text-blue-600" />
                  <span>Air-gapped defense, prompt firewalls & 24/7 Managed AI SOC</span>
                </div>
                <Link
                  href="/book-ai-diagnostic?solution=ai-cybersecurity-quantum-safe"
                  className="isi-footer-action"
                  onClick={closeAll}
                >
                  <span>Book AI Diagnostic Assessment</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 6. AI VALUE ENGINEERING */}
        <div
          className="nav-dropdown-wrapper"
          onMouseEnter={() => handleMouseEnter('value')}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`nav-menu-trigger ${activeMenu === 'value' ? 'active' : ''}`}
            onClick={() => toggleMenu('value')}
            aria-expanded={activeMenu === 'value'}
          >
            <span>AI Value Engineering</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'value' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'value' && (
            <div className="isi-mega-panel isi-mega-value">
              <div className="isi-mega-layout">
                {/* Left Category Introduction */}
                <div className="isi-mega-sidebar">
                  <div className="isi-sidebar-top">
                    <span className="isi-sidebar-badge">
                      <span className="pulse-dot" />
                      ECONOMIC GOVERNANCE & FINOPS
                    </span>
                    <h3 className="isi-sidebar-title">AI Value Engineering</h3>
                    <p className="isi-sidebar-desc">
                      Bridge technical compute metrics directly to CFO-approved P&L earnings and unit economics.
                    </p>
                  </div>
                  <div className="isi-sidebar-bottom">
                    <div className="isi-sidebar-metric-chip">
                      <Sparkles size={12} className="text-blue-600" />
                      <span>3–10x Verifiable ROI</span>
                    </div>
                    <Link
                      href="/solutions/ai-value-engineering"
                      className="isi-sidebar-action"
                      onClick={closeAll}
                    >
                      <span>Explore Blueprint</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>

                {/* Right Structured Grid (3 columns, 12 items) */}
                <div className="isi-mega-content columns-3">
                  {aiValueMenuItems.map((item, idx) => {
                    const Icon = item.icon
                    const itemHref = `/solutions/ai-value-engineering#${item.id}`
                    return (
                      <Link
                        key={idx}
                        href={itemHref}
                        className="isi-menu-card"
                        onClick={(e) => handleNavClick(e, itemHref)}
                      >
                        <div className="isi-card-icon">
                          <Icon size={16} />
                        </div>
                        <div className="isi-card-body">
                          <div className="isi-card-heading">
                            <span className="isi-card-title">{item.label}</span>
                            <ArrowRight size={13} className="isi-card-arrow" />
                          </div>
                          <p className="isi-card-desc">{item.desc}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Mega-Menu Footer */}
              <div className="isi-mega-footer">
                <div className="isi-footer-badge">
                  <Sparkles size={13} className="text-blue-600" />
                  <span>Throughput accounting, TOC & CFO consensus canvases</span>
                </div>
                <Link
                  href="/book-ai-diagnostic?solution=ai-value-engineering"
                  className="isi-footer-action"
                  onClick={closeAll}
                >
                  <span>Book AI Diagnostic Assessment</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 7. COMMON FOUNDATION */}
        <div
          className="nav-dropdown-wrapper"
          onMouseEnter={() => handleMouseEnter('foundation')}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`nav-menu-trigger ${activeMenu === 'foundation' ? 'active' : ''}`}
            onClick={() => toggleMenu('foundation')}
            aria-expanded={activeMenu === 'foundation'}
          >
            <span>Common Foundation</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'foundation' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'foundation' && (
            <div className="isi-mega-panel isi-mega-foundation">
              <div className="isi-mega-layout">
                {/* Left Category Introduction */}
                <div className="isi-mega-sidebar">
                  <div className="isi-sidebar-top">
                    <span className="isi-sidebar-badge">
                      <span className="pulse-dot" />
                      STRATEGIC ENABLERS
                    </span>
                    <h3 className="isi-sidebar-title">Common Foundation</h3>
                    <p className="isi-sidebar-desc">
                      Enterprise frameworks, industry vertical blueprints, operational methodology engines, and partner ecosystems.
                    </p>
                  </div>
                  <div className="isi-sidebar-bottom">
                    <div className="isi-sidebar-metric-chip">
                      <Sparkles size={12} className="text-blue-600" />
                      <span>80+ Operational Methodologies</span>
                    </div>
                    <Link
                      href="/sitemap"
                      className="isi-sidebar-action"
                      onClick={closeAll}
                    >
                      <span>Full Taxonomy</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>

                {/* Right Structured Grid (2 columns, 6 items) */}
                <div className="isi-mega-content columns-2">
                  {commonFoundationMenuItems.map((item, idx) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={idx}
                        href={item.href}
                        className="isi-menu-card"
                        onClick={(e) => handleNavClick(e, item.href)}
                      >
                        <div className="isi-card-icon">
                          <Icon size={16} />
                        </div>
                        <div className="isi-card-body">
                          <div className="isi-card-heading">
                            <span className="isi-card-title">{item.label}</span>
                            <ArrowRight size={13} className="isi-card-arrow" />
                          </div>
                          <p className="isi-card-desc">{item.desc}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Mega-Menu Footer */}
              <div className="isi-mega-footer">
                <div className="isi-footer-badge">
                  <Sparkles size={13} className="text-blue-600" />
                  <span>Executive technical & financial evaluation of enterprise AI readiness</span>
                </div>
                <Link
                  href="/book-ai-diagnostic"
                  className="isi-footer-action"
                  onClick={closeAll}
                >
                  <span>Schedule AI Diagnostic</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 8. ABOUT US */}
        <div
          className="nav-dropdown-wrapper"
          onMouseEnter={() => handleMouseEnter('about')}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`nav-menu-trigger ${activeMenu === 'about' ? 'active' : ''}`}
            onClick={() => toggleMenu('about')}
            aria-expanded={activeMenu === 'about'}
          >
            <span>About Us</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'about' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'about' && (
            <div className="isi-mega-panel isi-mega-about">
              <div className="isi-mega-layout">
                {/* Left Category Introduction */}
                <div className="isi-mega-sidebar">
                  <div className="isi-sidebar-top">
                    <span className="isi-sidebar-badge">
                      <span className="pulse-dot" />
                      COMPANY & TALENT
                    </span>
                    <h3 className="isi-sidebar-title">About TrustGrid.AI</h3>
                    <p className="isi-sidebar-desc">
                      Full-Spectrum AI Engineering Company for the Global AI Economy with executive offices in US, Singapore & India.
                    </p>
                  </div>
                  <div className="isi-sidebar-bottom">
                    <div className="isi-sidebar-metric-chip">
                      <Building2 size={12} className="text-blue-600" />
                      <span>Global R&D & Delivery Labs</span>
                    </div>
                    <Link
                      href="/about"
                      className="isi-sidebar-action"
                      onClick={closeAll}
                    >
                      <span>Explore Company Profile</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>

                {/* Right Structured Grid (2 columns, 6 items) */}
                <div className="isi-mega-content columns-2">
                  {aboutMenuItems.map((item, idx) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={idx}
                        href={item.href}
                        className="isi-menu-card"
                        onClick={(e) => handleNavClick(e, item.href)}
                      >
                        <div className="isi-card-icon">
                          <Icon size={16} />
                        </div>
                        <div className="isi-card-body">
                          <div className="isi-card-heading">
                            <span className="isi-card-title">{item.label}</span>
                            <ArrowRight size={13} className="isi-card-arrow" />
                          </div>
                          <p className="isi-card-desc">{item.desc}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Mega-Menu Footer */}
              <div className="isi-mega-footer">
                <div className="isi-footer-badge">
                  <Users size={13} className="text-blue-600" />
                  <span>World-class AI architects, systems leads, and advisory board</span>
                </div>
                <Link
                  href="/contact"
                  className="isi-footer-action"
                  onClick={closeAll}
                >
                  <span>Contact Leadership</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* WHATSAPP ADVISORY CTA (Icon Only) */}
        <a
          href="https://wa.me/15550192834?text=Hi%20TrustGrid%20team%2C%20I%20would%20like%20to%20discuss%20an%20enterprise%20AI%20requirement."
          target="_blank"
          rel="noopener noreferrer"
          className="nav-whatsapp-cta"
          aria-label="Chat with AI Advisory on WhatsApp"
          title="Chat with AI Advisory on WhatsApp"
          onClick={() => {
            closeAll()
            if (typeof window !== 'undefined') {
              trackWhatsAppClick('navbar_cta', 'header', 'Navbar WhatsApp Advisory')
            }
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="19"
            height="19"
            fill="currentColor"
            className="whatsapp-icon"
            aria-hidden="true"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.73 2.64 4.2 3.7.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.23-.19-.48-.31z" />
          </svg>
        </a>

        {/* 9. CONTACT US — Primary CTA */}
        <Link
          href="/contact"
          className="nav-cta"
          onClick={closeAll}
        >
          <span>Contact Us</span>
          <ArrowUpRight size={14} />
        </Link>
      </nav>

      {/* MOBILE HAMBURGER BUTTON */}
      <button
        className="menu-button"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-content">
            <Link href="/" className="mobile-nav-link" onClick={closeAll}>
              Home
            </Link>

            {/* Mobile AI Infra & Data Center Accordion */}
            <div className="mobile-accordion">
              <button
                className="mobile-accordion-btn"
                onClick={() => toggleMobileSection('ai-infra')}
              >
                <span>AI Infra & Data Center</span>
                <ChevronDown size={16} className={`chevron-icon ${mobileSection === 'ai-infra' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'ai-infra' && (
                <div className="mobile-accordion-body">
                  <Link href="/solutions/ai-infra-engineering" className="mobile-sublink font-semibold" onClick={closeAll}>
                    <span>AI Infra Blueprint Overview →</span>
                  </Link>
                  {aiInfraMenuItems.map((item, i) => {
                    const itemHref = `/solutions/ai-infra-engineering#${item.id}`
                    return (
                      <Link
                        key={i}
                        href={itemHref}
                        className="mobile-sublink"
                        onClick={(e) => handleNavClick(e, itemHref)}
                      >
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Mobile Agentic Enterprise Accordion */}
            <div className="mobile-accordion">
              <button
                className="mobile-accordion-btn"
                onClick={() => toggleMobileSection('agentic')}
              >
                <span>Agentic Enterprise</span>
                <ChevronDown size={16} className={`chevron-icon ${mobileSection === 'agentic' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'agentic' && (
                <div className="mobile-accordion-body">
                  <Link href="/solutions/ai-agentic-factory" className="mobile-sublink font-semibold" onClick={closeAll}>
                    <span>Agentic Enterprise Blueprint Overview →</span>
                  </Link>
                  {agenticEnterpriseMenuItems.map((item, i) => {
                    const itemHref = `/solutions/ai-agentic-factory#${item.id}`
                    return (
                      <Link
                        key={i}
                        href={itemHref}
                        className="mobile-sublink"
                        onClick={(e) => handleNavClick(e, itemHref)}
                      >
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Mobile AI Networking Accordion */}
            <div className="mobile-accordion">
              <button
                className="mobile-accordion-btn"
                onClick={() => toggleMobileSection('networking')}
              >
                <span>AI Networking</span>
                <ChevronDown size={16} className={`chevron-icon ${mobileSection === 'networking' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'networking' && (
                <div className="mobile-accordion-body">
                  <Link href="/solutions/ai-networking" className="mobile-sublink font-semibold" onClick={closeAll}>
                    <span>AI Networking Blueprint Overview →</span>
                  </Link>
                  {aiNetworkingMenuItems.map((item, i) => {
                    const itemHref = `/solutions/ai-networking#${item.id}`
                    return (
                      <Link
                        key={i}
                        href={itemHref}
                        className="mobile-sublink"
                        onClick={(e) => handleNavClick(e, itemHref)}
                      >
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Mobile AI Cybersecurity Accordion */}
            <div className="mobile-accordion">
              <button
                className="mobile-accordion-btn"
                onClick={() => toggleMobileSection('cybersecurity')}
              >
                <span>AI Cybersecurity</span>
                <ChevronDown size={16} className={`chevron-icon ${mobileSection === 'cybersecurity' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'cybersecurity' && (
                <div className="mobile-accordion-body">
                  <Link href="/solutions/ai-cybersecurity-quantum-safe" className="mobile-sublink font-semibold" onClick={closeAll}>
                    <span>AI Cybersecurity Blueprint Overview →</span>
                  </Link>
                  {aiCybersecurityMenuItems.map((item, i) => {
                    const itemHref = `/solutions/ai-cybersecurity-quantum-safe#${item.id}`
                    return (
                      <Link
                        key={i}
                        href={itemHref}
                        className="mobile-sublink"
                        onClick={(e) => handleNavClick(e, itemHref)}
                      >
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Mobile AI Value Engineering Accordion */}
            <div className="mobile-accordion">
              <button
                className="mobile-accordion-btn"
                onClick={() => toggleMobileSection('value')}
              >
                <span>AI Value Engineering</span>
                <ChevronDown size={16} className={`chevron-icon ${mobileSection === 'value' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'value' && (
                <div className="mobile-accordion-body">
                  <Link href="/solutions/ai-value-engineering" className="mobile-sublink font-semibold" onClick={closeAll}>
                    <span>AI Value Engineering Blueprint Overview →</span>
                  </Link>
                  {aiValueMenuItems.map((item, i) => {
                    const itemHref = `/solutions/ai-value-engineering#${item.id}`
                    return (
                      <Link
                        key={i}
                        href={itemHref}
                        className="mobile-sublink"
                        onClick={(e) => handleNavClick(e, itemHref)}
                      >
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Mobile Common Foundation Accordion */}
            <div className="mobile-accordion">
              <button
                className="mobile-accordion-btn"
                onClick={() => toggleMobileSection('foundation')}
              >
                <span>Common Foundation</span>
                <ChevronDown size={16} className={`chevron-icon ${mobileSection === 'foundation' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'foundation' && (
                <div className="mobile-accordion-body">
                  <Link href="/sitemap" className="mobile-sublink font-semibold" onClick={closeAll}>
                    <span>Full Taxonomy Overview →</span>
                  </Link>
                  {commonFoundationMenuItems.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      className="mobile-sublink"
                      onClick={(e) => handleNavClick(e, item.href)}
                    >
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile About Us Accordion */}
            <div className="mobile-accordion">
              <button
                className="mobile-accordion-btn"
                onClick={() => toggleMobileSection('about')}
              >
                <span>About Us</span>
                <ChevronDown size={16} className={`chevron-icon ${mobileSection === 'about' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'about' && (
                <div className="mobile-accordion-body">
                  <Link href="/about" className="mobile-sublink font-semibold" onClick={closeAll}>
                    <span>About TrustGrid.AI Overview →</span>
                  </Link>
                  {aboutMenuItems.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      className="mobile-sublink"
                      onClick={(e) => handleNavClick(e, item.href)}
                    >
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mobile-cta-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href="https://wa.me/15550192834?text=Hi%20TrustGrid%20team%2C%20I%20would%20like%20to%20discuss%20an%20enterprise%20AI%20requirement."
                target="_blank"
                rel="noopener noreferrer"
                className="button button-ghost button-full"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  borderColor: 'rgba(37, 211, 102, 0.4)',
                  color: '#25D366',
                  background: 'rgba(37, 211, 102, 0.08)'
                }}
                onClick={() => {
                  closeAll()
                  if (typeof window !== 'undefined') {
                    trackWhatsAppClick('mobile_drawer_cta', 'mobile_header', 'Mobile Drawer WhatsApp')
                  }
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.73 2.64 4.2 3.7.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.23-.19-.48-.31z" />
                </svg>
                <span>Chat on WhatsApp</span>
              </a>
              <Link
                href="/contact"
                className="button button-primary button-full"
                onClick={closeAll}
              >
                <span>Contact Us</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

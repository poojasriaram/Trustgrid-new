'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Users,
  ShieldCheck,
  Cpu,
  Bot,
  Network,
  Lock,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers
} from 'lucide-react'

export interface ICPPersona {
  id: string
  role: string
  title: string
  badge: string
  whatTheyCareAbout: string[]
  theirChallenge: string
  trustgridRelevance: string
  relevantSolutions: {
    title: string
    slug: string
  }[]
  expectedOutcome: string
  ctaText: string
  ctaLink: string
  icon: React.ElementType
}

export const defaultICPs: ICPPersona[] = [
  {
    id: 'cio',
    role: 'Chief Information Officer (CIO)',
    title: 'Enterprise AI Strategy & Governance',
    badge: 'EXECUTIVE LEADERSHIP',
    whatTheyCareAbout: [
      'Enterprise AI Strategy & Cross-Unit Alignment',
      'Technology Investment Return & Capex/Opex Efficiency',
      'AI Value Realization & Compounding Productivity',
      'Continuous Governance & EU AI Act / NIST Compliance'
    ],
    theirChallenge: 'Trapped between board demands for rapid AI adoption and operational realities of uncoordinated pilot sprawl, runaway token costs, and black-box regulatory risk.',
    trustgridRelevance: 'TrustGrid provides structured Enterprise AI Factory operating models, industrial Lean/TOC disciplines, and mathematical governance to turn experimental pilots into reliable, compounding balance sheet assets.',
    relevantSolutions: [
      { title: 'AI Value Engineering', slug: 'ai-value-engineering' },
      { title: 'Trusted AI Transformation', slug: 'trusted-ai-transformation' },
      { title: 'Agentic Enterprise Factory', slug: 'ai-agentic-factory' }
    ],
    expectedOutcome: 'Predictable, board-defensible AI deployment with verified compliance, unified FinOps governance, and sustainable organizational adoption.',
    ctaText: 'Explore CIO Executive Diagnostic',
    ctaLink: '/book-ai-diagnostic?role=cio',
    icon: Users
  },
  {
    id: 'cto',
    role: 'Chief Technology Officer (CTO)',
    title: 'Scalable Systems & AI Architecture',
    badge: 'TECHNICAL LEADERSHIP',
    whatTheyCareAbout: [
      'Production AI Systems Architecture & Modularity',
      'GPU Compute & Accelerator Utilization Efficiency',
      'Low-Latency Inference Serving at Scale',
      'Avoiding Premature Vendor Lock-In & Retaining Sovereign IP'
    ],
    theirChallenge: 'Engineering teams struggle with cluster thermal throttling, distributed inter-node network latency, model fragmentation, and fragile multi-agent orchestration DAGs.',
    trustgridRelevance: 'TrustGrid delivers hardware-to-code systems engineering: 30–100kW direct-to-chip liquid cooling, lossless InfiniBand/RoCEv2 fabrics, kernel micro-tuning, and robust Model Context Protocol (MCP) multi-agent runtimes.',
    relevantSolutions: [
      { title: 'AI Infra & Data Center', slug: 'ai-infra-engineering' },
      { title: 'Lossless AI Networking', slug: 'ai-networking' },
      { title: 'Agentic Enterprise Systems', slug: 'ai-agentic-factory' }
    ],
    expectedOutcome: 'High-throughput, resilient AI platform architecture operating with maximum accelerator utilization and ultra-low inference latency.',
    ctaText: 'Schedule CTO Technical Audit',
    ctaLink: '/book-ai-diagnostic?role=cto',
    icon: Cpu
  },
  {
    id: 'ciso',
    role: 'Chief Information Security Officer (CISO)',
    title: 'AI Cybersecurity & Quantum Defense',
    badge: 'SECURITY & RISK LEADERSHIP',
    whatTheyCareAbout: [
      'Defending Against Prompt Injection & Agent Hijacking',
      'Zero-Trust Identity for Non-Deterministic Agents',
      'NIST Post-Quantum Cryptography Migration (PQC)',
      'Real-Time Cryptographic Bill of Materials (CBOM) Visibility'
    ],
    theirChallenge: 'Autonomous agents introduce novel attack surfaces across tool integrations while harvest-now-decrypt-later quantum campaigns threaten existing enterprise encryption foundations.',
    trustgridRelevance: 'TrustGrid engineers runtime prompt firewalls, behavioral tool sandboxing, automated CBOM inventory, and L1–L7 post-quantum cryptographic transitions compliant with NIST FIPS 203/204/205.',
    relevantSolutions: [
      { title: 'AI Cybersecurity & Quantum-Safe', slug: 'ai-cybersecurity-quantum-safe' },
      { title: 'Trusted AI Governance', slug: 'trusted-ai-transformation' }
    ],
    expectedOutcome: 'Zero-trust agent isolation, complete visibility across cryptographic assets, and perpetual resilience against quantum decryption threats.',
    ctaText: 'Audit Security & PQC Posture',
    ctaLink: '/book-ai-diagnostic?role=ciso',
    icon: Lock
  },
  {
    id: 'ai-ml-leader',
    role: 'Head of AI / ML & Platform Engineering',
    title: 'Agentic Fleets & Productionization',
    badge: 'AI ENGINEERING LEADERSHIP',
    whatTheyCareAbout: [
      'Multi-Agent System Orchestration (LangGraph / AutoGen / CrewAI)',
      'Persistent Memory Fabrics (Episodic, Semantic, Relational)',
      'Real-Time AgentOps Tracing, Evaluation & Drift Telemetry',
      'Deterministic Task Execution Accuracy with Strict SLAs'
    ],
    theirChallenge: 'Simple chatbot wrappers fail in production when executing multi-step business logic due to hallucination compounding, context drift, and unmonitored tool failures.',
    trustgridRelevance: 'TrustGrid architects governed multi-agent cognitive swarms with deterministic reasoning DAGs, automated fallback circuits, Model Context Protocol tooling, and real-time AgentOps evaluation.',
    relevantSolutions: [
      { title: 'Agentic Enterprise Factory', slug: 'ai-agentic-factory' },
      { title: 'Trusted AI Transformation', slug: 'trusted-ai-transformation' }
    ],
    expectedOutcome: 'Autonomous digital worker fleets executing complex operational processes with deterministic accuracy and full auditability.',
    ctaText: 'Deploy Governed Agent Fleets',
    ctaLink: '/book-ai-diagnostic?solution=ai-agentic-factory',
    icon: Bot
  },
  {
    id: 'infra-dc-leader',
    role: 'Data Center & Infrastructure Director',
    title: 'High-Density Facilities & Compute Density',
    badge: 'INFRASTRUCTURE LEADERSHIP',
    whatTheyCareAbout: [
      'High-Density Power & Thermal Envelope (30–100kW/rack)',
      'Direct-to-Chip & Immersion Liquid Cooling Retrofits',
      'Power Usage Effectiveness (PUE) Optimization',
      'Predictive Facilities Maintenance & 24/7 AI NOC Telemetry'
    ],
    theirChallenge: 'Legacy air-cooled facilities hit immediate power and thermal walls with modern accelerator clusters (NVIDIA Blackwell, HGX, AMD MI300X), stranding capital and stalling growth.',
    trustgridRelevance: 'TrustGrid delivers turnkey facility thermal engineering, liquid cooling retrofits, power distribution design, and continuous AI NOC telemetry to safely operate up to 100kW per rack.',
    relevantSolutions: [
      { title: 'AI Infra & Data Center', slug: 'ai-infra-engineering' },
      { title: 'Lossless AI Networking', slug: 'ai-networking' }
    ],
    expectedOutcome: 'High-density, liquid-cooled compute facilities operating at industry-leading PUE with zero thermal throttling.',
    ctaText: 'Evaluate Facility Density & PUE',
    ctaLink: '/book-ai-diagnostic?solution=ai-infra-engineering',
    icon: Layers
  },
  {
    id: 'cfo-business',
    role: 'Chief Financial Officer & Business Leaders',
    title: 'Unit Economics & CFO-Defensible ROI',
    badge: 'FINANCIAL LEADERSHIP',
    whatTheyCareAbout: [
      'Transparent AI Unit Economics & Cost-Per-Task Attribution',
      'Rapid Time-to-First-Measurable Yield (90 Days)',
      'Elimination of Unattributed Subscription & Token Sprawl',
      'Defensible Balance Sheet Returns Tied to Operational Throughput'
    ],
    theirChallenge: 'Substantial capital allocated to AI initiatives with zero transparency into cost-per-task, ballooning cloud inference bills, and unverified top-line revenue attribution.',
    trustgridRelevance: 'TrustGrid embeds Theory of Constraints (TOC) value stream mapping, AI FinOps governance, and the Value Realization Office (VRO) to guarantee measurable financial yield.',
    relevantSolutions: [
      { title: 'AI Value Engineering', slug: 'ai-value-engineering' },
      { title: 'Agentic Enterprise Factory', slug: 'ai-agentic-factory' }
    ],
    expectedOutcome: 'Defensible 90-day ROI, deterministic cost-per-task unit economics, and total visibility over enterprise token expenditure.',
    ctaText: 'Calculate AI Unit Economics',
    ctaLink: '/book-ai-diagnostic?role=cfo',
    icon: TrendingUp
  }
]

export function ICPSlider({ personas = defaultICPs }: { personas?: ICPPersona[] }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const current = personas[activeIdx]
  const Icon = current.icon || Users
  const total = personas.length

  const handleNext = React.useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % total)
  }, [total])

  const handlePrev = React.useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + total) % total)
  }, [total])

  // Autoplay cycle
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      handleNext()
    }, 6500)
    return () => clearInterval(timer)
  }, [isPaused, handleNext])

  return (
    <div
      className="icp-slider-wrapper animated-card"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <span className="card-corner-tl" />
      <span className="card-corner-br" />

      {/* ICP Tabs Header Strip */}
      <div className="icp-tabs-header-strip" role="tablist" aria-label="Select Executive Persona">
        {personas.map((p, idx) => {
          const PIcon = p.icon || Users
          const isActive = idx === activeIdx
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`icp-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveIdx(idx)}
            >
              <PIcon size={14} />
              <span>{p.role.split('(')[0].trim()}</span>
            </button>
          )
        })}
      </div>

      {/* Main Slide Card Body */}
      <div className="icp-slide-content">
        <div className="icp-slide-grid">
          {/* Left Column: Who, What they care about & Challenge */}
          <div className="icp-left-col">
            <div className="icp-meta-strip">
              <span className="icp-badge-pill">{current.badge}</span>
              <span className="icp-role-label">{current.role}</span>
            </div>

            <h3 className="icp-focus-title">{current.title}</h3>

            <div className="icp-care-box">
              <div className="box-flag">
                <Sparkles size={15} className="text-blue-500" />
                <span>What They Care About Most</span>
              </div>
              <ul className="care-list">
                {current.whatTheyCareAbout.map((item, i) => (
                  <li key={i}>
                    <CheckCircle2 size={13} className="text-blue-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="icp-challenge-box">
              <div className="box-flag">
                <AlertTriangle size={15} className="text-amber-500" />
                <span>Their Core Enterprise Challenge</span>
              </div>
              <p>{current.theirChallenge}</p>
            </div>
          </div>

          {/* Right Column: TrustGrid Relevance, Relevant Solutions & Outcome */}
          <div className="icp-right-col">
            <div className="icp-relevance-box">
              <div className="box-flag">
                <Layers size={14} className="text-blue-500" />
                <span>How TrustGrid Engineers the Resolution</span>
              </div>
              <p>{current.trustgridRelevance}</p>
            </div>

            <div className="icp-solutions-stack">
              <span className="solutions-label">Directly Aligned TrustGrid Offerings:</span>
              <div className="solutions-pills-row">
                {current.relevantSolutions.map((sol, i) => (
                  <Link key={i} href={`/solutions/${sol.slug}`} className="solution-pill-link">
                    <span>{sol.title}</span>
                    <ArrowUpRight size={13} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="icp-outcome-card">
              <div className="outcome-head">
                <TrendingUp size={15} className="text-blue-500" />
                <span>Expected Executive Outcome</span>
              </div>
              <p>{current.expectedOutcome}</p>
            </div>

            {/* Actions & Navigation */}
            <div className="icp-actions-footer">
              <Link href={current.ctaLink} className="button button-primary button-sm">
                <span>{current.ctaText}</span>
                <ArrowUpRight size={15} />
              </Link>
              <Link href="/contact" className="button button-ghost button-sm">
                <span>Speak to Practice Lead</span>
              </Link>

              <div className="icp-nav-arrows ml-auto">
                <button
                  type="button"
                  className="slider-arrow-btn"
                  onClick={handlePrev}
                  aria-label="Previous persona"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  className="slider-arrow-btn"
                  onClick={handleNext}
                  aria-label="Next persona"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

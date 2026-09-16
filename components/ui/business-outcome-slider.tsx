'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Bot,
  ShieldCheck,
  Lock,
  Workflow,
  Sparkles,
  CheckCircle2,
  Gauge,
  Layers
} from 'lucide-react'

export interface OutcomePillar {
  pillarId: string
  title: string
  badge: string
  headline: string
  summary: string
  qualitativeGains: string[]
  architecturalEnablers: string[]
  strategicBenefit: string
  relevantStakeholders: string[]
  icon: React.ElementType
}

export const defaultOutcomePillars: OutcomePillar[] = [
  {
    pillarId: 'efficiency',
    title: 'Operational Efficiency',
    badge: 'PROCESS TRANSFORMATION',
    headline: 'Compressing complex multi-step workflows from weeks to deterministic minutes.',
    summary: 'By orchestrating multi-agent cognitive fleets with persistent memory and tool sandboxing, enterprises eliminate manual data handoffs and friction points across operations, finance, and logistics.',
    qualitativeGains: [
      'Elimination of manual cross-application data re-entry and verification bottlenecks',
      'Autonomous reconciliation of complex enterprise records with deterministic audit trails',
      'Continuous workflow execution without off-shift operational delays or backlog accumulation',
      'Standardized exception handling with automated escalation to human supervisors'
    ],
    architecturalEnablers: [
      'Model Context Protocol (MCP) Enterprise Tool Connectors',
      'Persistent Episodic & Relational Memory Fabrics',
      'Deterministic Reasoning Directed Acyclic Graphs (DAGs)'
    ],
    strategicBenefit: 'Transforms repetitive operational cost centers into high-speed autonomous execution engines.',
    relevantStakeholders: ['Chief Information Officer (CIO)', 'Head of Global Shared Services', 'Operations Directors'],
    icon: Workflow
  },
  {
    pillarId: 'infra-opt',
    title: 'Infrastructure Optimization',
    badge: 'COMPUTE & SILICON YIELD',
    headline: 'Maximizing intelligence throughput per dollar and watt across GPU clusters.',
    summary: 'Hardware-level kernel micro-optimization, intelligent KV-cache management, and direct-to-chip liquid cooling engineering maximize accelerator utilization and eliminate power/cooling bottlenecks.',
    qualitativeGains: [
      'Significant increase in accelerator utilization across distributed training and inference clusters',
      'Elimination of thermal throttling and stranded power capacity in high-density facilities',
      'Drastic reduction in inter-node tail latency jitter and collective communication stalls',
      'Predictive component telemetry preventing unexpected cluster downtime and job restarts'
    ],
    architecturalEnablers: [
      'Kernel Optimization & Continuous Batching (vLLM / TensorRT-LLM)',
      'High-Density Direct-to-Chip Liquid Cooling Architectures (30–100kW)',
      'Lossless RoCEv2 & InfiniBand Rail-Optimized Network Topologies'
    ],
    strategicBenefit: 'Enables massive AI scale within existing data center power budgets without premature capacity exhaustion.',
    relevantStakeholders: ['Chief Technology Officer (CTO)', 'Infrastructure Director', 'Data Center Facilities Director'],
    icon: Cpu
  },
  {
    pillarId: 'security-pqc',
    title: 'Security & Quantum Defense',
    badge: 'CRYPTOGRAPHIC AGILITY',
    headline: 'Defending autonomous agent execution while migrating to NIST Post-Quantum standards.',
    summary: 'Zero-trust cryptographic isolation for autonomous agents combined with full Cryptographic Bill of Materials (CBOM) visibility neutralizes novel prompt attacks and harvest-now-decrypt-later quantum threats.',
    qualitativeGains: [
      'Complete visibility and automated inventory of all enterprise cryptographic assets and keys',
      'Runtime prompt firewall protection preventing prompt injection, jailbreaking, and agent hijacking',
      'Zero-trust cryptographic identity binding non-deterministic agent tool execution',
      'Seamless transition pathways to NIST Post-Quantum Cryptographic algorithms (FIPS 203/204/205)'
    ],
    architecturalEnablers: [
      'Cryptographic Bill of Materials (CBOM) Discovery Engine',
      'L1–L7 Post-Quantum Lattice Cryptography Integration',
      'Runtime Agent Tool Sandboxing & Behavioral Anomaly Detection'
    ],
    strategicBenefit: 'Ensures perpetual data sovereignty and regulatory compliance against future quantum and AI threats.',
    relevantStakeholders: ['Chief Information Security Officer (CISO)', 'Chief Risk Officer (CRO)', 'Security Operations Lead'],
    icon: Lock
  },
  {
    pillarId: 'trust-gov',
    title: 'AI Governance & Compliance',
    badge: 'VERIFIABLE ASSURANCE',
    headline: 'Transforming black-box non-deterministic AI into mathematically verifiable decisions.',
    summary: 'Mathematical feature attribution (SHAP/LIME), continuous statistical process control (SPC), and immutable cryptographic audit logging ensure board-level oversight and regulatory audit survival.',
    qualitativeGains: [
      'Complete explainability for high-stakes credit, clinical, underwriting, and mission decisions',
      'Automated compliance gateways aligned with EU AI Act, NIST AI RMF, and ISO 42001',
      'Immutable cryptographic decision replay logs providing causal provenance for every tool call',
      'Continuous drift, bias, and hallucination monitoring with automated circuit breakers'
    ],
    architecturalEnablers: [
      'Mathematical Feature Attribution Engine (SHAP / LIME / Integrated Gradients)',
      'Statistical Process Control (SPC) Telemetry Gateways',
      'Cryptographically Sealed Decision Provenance Ledger'
    ],
    strategicBenefit: 'De-risks enterprise AI deployment, earning total trust from board committees, regulators, and customers.',
    relevantStakeholders: ['Chief Information Officer (CIO)', 'Chief Risk Officer (CRO)', 'General Counsel & Compliance'],
    icon: ShieldCheck
  },
  {
    pillarId: 'time-to-value',
    title: 'Time-to-Value & Compounding ROI',
    badge: 'VALUE REALIZATION',
    headline: 'Bridging technical compute metrics directly to CFO-approved balance sheet earnings.',
    summary: 'Operational excellence frameworks (Lean Thinking, Theory of Constraints, DMAIC) prioritize highest-yield initiatives, eliminate token sprawl, and ensure rapid, compounding financial returns.',
    qualitativeGains: [
      'Rapid progression from diagnostic evaluation to production deployment in weeks, not years',
      'Deterministic cost-per-task accounting replacing opaque subscription and token sprawl',
      'Targeted elimination of infrastructure bottlenecks that constrain business throughput',
      'Continuous quarterly compounding of organizational capability through internal AI factories'
    ],
    architecturalEnablers: [
      'Value Realization Office (VRO) KPI Telemetry Framework',
      'Theory of Constraints (TOC) Value Stream Mapping',
      'AI FinOps Unit Economic Attribution Models'
    ],
    strategicBenefit: 'Provides CFO-defensible accountability and turns AI from an experimental expense into a compounding asset.',
    relevantStakeholders: ['Chief Executive Officer (CEO)', 'Chief Financial Officer (CFO)', 'Head of Enterprise Strategy'],
    icon: TrendingUp
  }
]

export function BusinessOutcomeSlider({ pillars = defaultOutcomePillars }: { pillars?: OutcomePillar[] }) {
  const [activeIdx, setActiveIdx] = useState(0)

  const current = pillars[activeIdx]
  const Icon = current.icon || TrendingUp

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % pillars.length)
  }

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + pillars.length) % pillars.length)
  }

  return (
    <div className="business-outcome-slider-wrapper animated-card">
      <span className="card-corner-tl" />
      <span className="card-corner-br" />

      {/* Clean Carousel Navigation Header */}
      <div className="outcome-slider-header-bar">
        <div className="outcome-header-left">
          <div className="outcome-icon-tag">
            <Icon size={16} className="text-blue-500" />
            <span className="outcome-counter-text">{current.title}</span>
          </div>
          <span className="outcome-badge-pill">{current.badge}</span>
        </div>

        <div className="outcome-header-controls">
          {/* Navigation Dots */}
          <div className="outcome-dots-row">
            {pillars.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`outcome-dot ${i === activeIdx ? 'active' : ''}`}
                onClick={() => setActiveIdx(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Prev / Next Arrows */}
          <div className="outcome-arrows-row">
            <button
              type="button"
              className="slider-arrow-btn"
              onClick={handlePrev}
              aria-label="Previous outcome"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              className="slider-arrow-btn"
              onClick={handleNext}
              aria-label="Next outcome"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Slide Card Body */}
      <div className="outcome-slide-content">
        <div className="outcome-slide-grid">
          {/* Left Column: Qualitative Synthesis & Strategic Benefit */}
          <div className="outcome-left-col">
            <div className="outcome-meta-row">
              <span className="outcome-badge-tag">{current.badge}</span>
              <span className="outcome-pillar-name">{current.title}</span>
            </div>

            <h3 className="outcome-headline">{current.headline}</h3>
            <p className="outcome-summary">{current.summary}</p>

            <div className="outcome-strategic-box">
              <div className="box-flag">
                <Sparkles size={15} className="text-blue-500" />
                <span>Strategic Business Impact</span>
              </div>
              <p>{current.strategicBenefit}</p>
            </div>

            <div className="outcome-stakeholders-box">
              <span className="box-label">Executive Alignment:</span>
              <div className="stakeholder-tags-wrap">
                {current.relevantStakeholders.map((s, i) => (
                  <span key={i} className="stakeholder-pill">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Qualitative Gains & Enablers */}
          <div className="outcome-right-col">
            <div className="outcome-gains-box">
              <span className="section-title">
                <CheckCircle2 size={15} className="text-blue-500" />
                Qualitative Enterprise Realizations
              </span>
              <ul className="gains-checklist">
                {current.qualitativeGains.map((g, i) => (
                  <li key={i}>
                    <CheckCircle2 size={14} className="text-blue-500 shrink-0 mt-0.5" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="outcome-enablers-box">
              <span className="section-title">
                <Layers size={14} className="text-cyan-400" />
                Architectural Enablers
              </span>
              <div className="enablers-pills-row">
                {current.architecturalEnablers.map((en, i) => (
                  <div key={i} className="enabler-item">
                    <span className="bullet-dot" />
                    <span>{en}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions & Navigation */}
            <div className="outcome-footer-actions">
              <Link href="/book-ai-diagnostic" className="button button-primary button-sm">
                <span>Evaluate {current.title} Posture</span>
                <ArrowUpRight size={15} />
              </Link>
              <Link href="/request-proposal" className="button button-ghost button-sm">
                <span>Request Custom Blueprint</span>
              </Link>

              <div className="outcome-nav-arrows ml-auto">
                <button
                  type="button"
                  className="slider-arrow-btn"
                  onClick={handlePrev}
                  aria-label="Previous outcome"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  className="slider-arrow-btn"
                  onClick={handleNext}
                  aria-label="Next outcome"
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

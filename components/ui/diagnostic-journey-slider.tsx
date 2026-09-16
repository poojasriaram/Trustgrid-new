'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Compass,
  Search,
  Activity,
  Layers,
  FileCheck,
  TrendingUp,
  CheckCircle2,
  Users,
  Sparkles,
  Workflow
} from 'lucide-react'

export interface DiagnosticStep {
  id: string
  name: string
  subtitle: string
  badge: string
  objective: string
  whatWeExamine: string[]
  deliverables: string[]
  stakeholders: string[]
  expectedOutcome: string
  icon: React.ElementType
}

export const defaultDiagnosticSteps: DiagnosticStep[] = [
  {
    id: 'discover',
    name: 'DISCOVER',
    subtitle: 'Scope & Architecture Mapping',
    badge: 'STAGE 1',
    objective: 'Map your existing compute footprint, data flows, agent prototypes, and operational priorities.',
    whatWeExamine: [
      'Active hardware accelerators, GPU cluster topologies, and cloud compute contracts',
      'Production vs. pilot AI workloads, inference latency bottlenecks, and token consumption',
      'Current data governance boundaries, air-gapping requirements, and regulatory mandates',
      'High-priority business unit workflows targeted for autonomous agent orchestration'
    ],
    deliverables: [
      'Enterprise AI Footprint & Workload Topology Map',
      'High-Priority Autonomous Process Opportunity List',
      'Initial Compute & Token Expenditure Baseline'
    ],
    stakeholders: ['Chief Information Officer (CIO)', 'Head of AI Platform', 'Enterprise Architects'],
    expectedOutcome: 'Clear boundaries and targeted focus areas agreed across technical and business leadership.',
    icon: Search
  },
  {
    id: 'assess',
    name: 'ASSESS',
    subtitle: 'Deep Telemetry & Threat Modeling',
    badge: 'STAGE 2',
    objective: 'Perform non-intrusive cluster telemetry, agent security profiling, and network lossless analysis.',
    whatWeExamine: [
      'Granular GPU accelerator utilization, memory bandwidth, and thermal headroom',
      'InfiniBand and RoCEv2 inter-node fabric congestion, packet drops, and tail latency jitter',
      'Agent prompt injection vulnerabilities, tool sandbox permissions, and API exposure',
      'Current cryptographic algorithms against NIST Post-Quantum Cryptography standards'
    ],
    deliverables: [
      'GPU Cluster Telemetry & Thermal Efficiency Profile',
      'Lossless Network Congestion & Jitter Audit',
      'Cryptographic Bill of Materials (CBOM) & PQC Readiness Scorecard'
    ],
    stakeholders: ['Chief Technology Officer (CTO)', 'Chief Information Security Officer (CISO)', 'Infrastructure Leads'],
    expectedOutcome: 'Empirical, data-backed identification of hidden infrastructure waste and security vulnerabilities.',
    icon: Activity
  },
  {
    id: 'diagnose',
    name: 'DIAGNOSE',
    subtitle: 'Root Cause & Constraint Analysis',
    badge: 'STAGE 3',
    objective: 'Apply Theory of Constraints (TOC) and DMAIC disciplines to isolate root cause bottlenecks.',
    whatWeExamine: [
      'Identifying the primary throughput constraint limiting distributed training or inference',
      'Evaluating KV-cache fragmentation and kernel batching inefficiencies',
      'Failure Mode and Effects Analysis (FMEA) across non-deterministic agent workflows',
      'Statistical Process Control (SPC) analysis of model drift and hallucination escape rates'
    ],
    deliverables: [
      'Theory of Constraints (TOC) Bottleneck Root Cause Report',
      'Agent Reliability & Guardrail Failure Mode Matrix',
      'Token FinOps Unit Economic Leakage Analysis'
    ],
    stakeholders: ['Lead Systems Architects', 'AI Safety Engineers', 'Operations Quality Leads'],
    expectedOutcome: 'Definitive diagnosis of what is actually constraining your AI throughput, reliability, and returns.',
    icon: Compass
  },
  {
    id: 'prioritize',
    name: 'PRIORITIZE',
    subtitle: 'Economic & Feasibility Matrix',
    badge: 'STAGE 4',
    objective: 'Rank prospective AI initiatives by strategic value, technical feasibility, and CFO-defensible ROI.',
    whatWeExamine: [
      'Quantifying cost-per-task reduction across candidate autonomous agent use cases',
      'Evaluating silicon modernization pathways (NVIDIA Blackwell, AMD MI300X, custom ASICs)',
      'Balancing rapid 90-day time-to-first-value with long-term sovereign infrastructure scaling',
      'Risk-weighting initiatives based on EU AI Act, NIST AI RMF, and internal compliance readiness'
    ],
    deliverables: [
      'Value Realization Opportunity Prioritization Matrix',
      'Cost-Benefit & Token Unit Economic Payback Models',
      'Executive Risk vs. Yield Scoring Canvas'
    ],
    stakeholders: ['Chief Financial Officer (CFO)', 'Chief Information Officer (CIO)', 'Business Unit General Managers'],
    expectedOutcome: 'CFO-approved consensus on which high-yield AI initiatives to fund and execute first.',
    icon: Layers
  },
  {
    id: 'recommend',
    name: 'RECOMMEND',
    subtitle: 'Turnkey Architectural Blueprint',
    badge: 'STAGE 5',
    objective: 'Deliver vendor-neutral architectural specifications for compute, networking, agents, and security.',
    whatWeExamine: [
      'Turnkey high-density facility and direct-to-chip liquid cooling specifications (30–100kW)',
      'Lossless network routing topologies with rail-optimized collective communication tuning',
      'Governed multi-agent cognitive DAG schemas and Model Context Protocol tool definitions',
      'L1–L7 post-quantum cryptographic integration pathways (FIPS 203/204/205)'
    ],
    deliverables: [
      'Full-Stack Target Architecture Specification Document',
      'Component Selection & Vendor-Neutral Hardware Bills of Material',
      'NIST PQC Migration & Agent Zero-Trust Security Specification'
    ],
    stakeholders: ['Enterprise Architecture Board', 'Infrastructure Engineering Directors', 'Security Architecture Leads'],
    expectedOutcome: 'Engineering-ready architectural blueprint eliminating guesswork and preventing vendor lock-in.',
    icon: FileCheck
  },
  {
    id: 'roadmap',
    name: 'ROADMAP',
    subtitle: '90-Day Production Execution Plan',
    badge: 'STAGE 6',
    objective: 'Formulate an actionable, milestone-gated deployment roadmap from sprint kickoff to production scale.',
    whatWeExamine: [
      'Milestone gating, resource allocation, and co-engineering sprint pod structures',
      'KPI instrumentation for real-time tracking of latency, accuracy, and financial returns',
      'Internal team upskilling plan and Enterprise AI Factory transition protocols',
      'Post-deployment SLA guarantees and 24/7 managed NOC/SOC support options'
    ],
    deliverables: [
      '90-Day Rapid Value Realization Execution Schedule',
      'Co-Engineering Sprint Pod Staffing & Resourcing Plan',
      'Value Realization Office (VRO) KPI Dashboard Blueprint'
    ],
    stakeholders: ['Executive Leadership Committee', 'Program Directors', 'Engineering Managers'],
    expectedOutcome: 'Clear, de-risked path forward to execute and operate production AI with compounding enterprise yield.',
    icon: Rocket
  }
]

function Rocket(props: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return <TrendingUp {...props} />
}

export function DiagnosticJourneySlider({ steps = defaultDiagnosticSteps }: { steps?: DiagnosticStep[] }) {
  const [activeIdx, setActiveIdx] = useState(0)

  const current = steps[activeIdx]

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % steps.length)
  }

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + steps.length) % steps.length)
  }

  return (
    <div className="diagnostic-journey-slider-wrapper animated-card">
      <span className="card-corner-tl" />
      <span className="card-corner-br" />

      {/* Steps Navigation Strip */}
      <div className="diag-steps-strip" role="tablist" aria-label="Diagnostic Journey Stages">
        {steps.map((st, idx) => {
          const StIcon = st.icon || Search
          const isActive = idx === activeIdx
          return (
            <button
              key={st.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`diag-step-tab ${isActive ? 'active' : ''}`}
              onClick={() => setActiveIdx(idx)}
            >
              <div className="tab-icon-box">
                <StIcon size={14} />
              </div>
              <span className="tab-name-text">{st.name}</span>
            </button>
          )
        })}
      </div>

      {/* Main Slide Card Content */}
      <div className="diag-slide-content">
        <div className="diag-slide-grid">
          {/* Left Column: Objective & What We Examine */}
          <div className="diag-left-col">
            <div className="diag-meta-row">
              <span className="diag-badge-tag">{current.badge}</span>
              <span className="diag-stage-subtitle">{current.subtitle}</span>
            </div>

            <h3 className="diag-stage-title">{current.name}</h3>

            <div className="diag-objective-box">
              <div className="box-flag">
                <Sparkles size={15} className="text-blue-400" />
                <span>Diagnostic Objective</span>
              </div>
              <p>{current.objective}</p>
            </div>

            <div className="diag-examine-box">
              <div className="box-flag">
                <Search size={14} className="text-cyan-400" />
                <span>What TrustGrid Evaluates</span>
              </div>
              <ul className="examine-list">
                {current.whatWeExamine.map((item, i) => (
                  <li key={i}>
                    <span className="bullet-dot" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="diag-stakeholders-box">
              <span className="box-title">
                <Users size={14} className="text-blue-400" />
                Stakeholder Engagement:
              </span>
              <div className="stakeholders-tags">
                {current.stakeholders.map((s, i) => (
                  <span key={i} className="stakeholder-pill">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Deliverables & Expected Outcome */}
          <div className="diag-right-col">
            <div className="diag-deliverables-box">
              <span className="section-label">
                <FileCheck size={14} className="text-blue-400" />
                Tangible Diagnostic Deliverables
              </span>
              <ul className="deliverables-checklist">
                {current.deliverables.map((del, i) => (
                  <li key={i}>
                    <CheckCircle2 size={14} className="text-blue-400 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="diag-outcome-banner">
              <div className="outcome-banner-head">
                <TrendingUp size={15} className="text-blue-400" />
                <span>Expected Enterprise Outcome</span>
              </div>
              <p>{current.expectedOutcome}</p>
            </div>

            {/* Actions & Navigation */}
            <div className="diag-actions-footer">
              <div className="diag-cta-group">
                <a href="#intake-form" className="button button-primary button-sm">
                  <span>Start with {current.name}</span>
                  <ArrowUpRight size={15} />
                </a>
                <Link href="/contact" className="button button-ghost button-sm">
                  <span>Consult Senior Architect</span>
                </Link>
              </div>

              <div className="diag-nav-arrows">
                <button
                  type="button"
                  className="slider-arrow-btn"
                  onClick={handlePrev}
                  aria-label="Previous diagnostic stage"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  className="slider-arrow-btn"
                  onClick={handleNext}
                  aria-label="Next diagnostic stage"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

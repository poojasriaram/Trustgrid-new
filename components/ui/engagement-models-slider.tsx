'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Workflow,
  Clock,
  Users,
  CheckCircle2,
  Sparkles,
  Layers,
  FileCheck,
  TrendingUp,
  ShieldCheck
} from 'lucide-react'

export interface EngagementModelDetail {
  id: string
  title: string
  badge: string
  duration: string
  bestFor: string
  whenToUse: string
  whoIsInvolved: string[]
  howTrustgridWorks: string
  deliverables: string[]
  expectedOutcome: string
  ctaText: string
  ctaLink: string
}

export const defaultEngagementModels: EngagementModelDetail[] = [
  {
    id: 'diagnostic',
    title: 'Executive AI Diagnostic',
    badge: 'STAGE 1 • EVALUATION',
    duration: '2–4 Weeks',
    bestFor: 'Enterprises needing clear technical & financial evaluation before large capital deployment.',
    whenToUse: 'When leadership requires an objective architectural audit of GPU clusters, agent readiness, inference latency, security gaps, and token spend.',
    whoIsInvolved: ['CIO / CTO / CISO', 'Infrastructure Director', 'Lead AI Architects', 'TrustGrid Principal Fellows'],
    howTrustgridWorks: 'On-site technical interviews, passive cluster telemetry analysis, threat modeling, and unit economic benchmarking with zero disruption to active systems.',
    deliverables: [
      'Comprehensive AI Infrastructure & Compute Yield Audit',
      'Autonomous Agent Readiness & Process Opportunity Matrix',
      'Cryptographic Bill of Materials (CBOM) & NIST PQC Posture Report',
      '90-Day Prioritized Value Realization Roadmap'
    ],
    expectedOutcome: 'Board-ready executive report with definitive technical baselines, prioritized high-yield projects, and clear ROI targets.',
    ctaText: 'Book Executive Diagnostic',
    ctaLink: '/book-ai-diagnostic'
  },
  {
    id: 'sprint',
    title: 'Value Realization Sprints',
    badge: 'STAGE 2 • RAPID PRODUCTION',
    duration: '6–12 Weeks',
    bestFor: 'Deploying a high-stakes production AI system or agent fleet with rapid time-to-value.',
    whenToUse: 'When an organization has a high-value bottleneck (e.g., inference latency, multi-agent workflow, network packet drops) requiring senior engineering execution.',
    whoIsInvolved: ['Product Owners', 'SRE / DevOps Leads', 'AI Platform Engineers', 'TrustGrid Co-Engineering Squad'],
    howTrustgridWorks: 'Dedicated sprint pods working alongside your internal team with daily standups, automated testing, and milestone-gated code deliveries.',
    deliverables: [
      'Hardened Production AI Capability Deployed on Enterprise Infrastructure',
      'Governed Multi-Agent Execution Fabric with Persistent Memory',
      'Continuous Explainability (SHAP/LIME) & Audit Replay Gateways',
      'Complete Source Code, CI/CD Pipelines & Operational Runbooks'
    ],
    expectedOutcome: 'Measurable production milestone achieved in 90 days with verifiable performance and human-in-the-loop governance.',
    ctaText: 'Request Value Sprint',
    ctaLink: '/request-proposal?model=sprint'
  },
  {
    id: 'co-engineering',
    title: 'Strategic Co-Engineering Partnership',
    badge: 'STAGE 3 • COLLABORATIVE SCALE',
    duration: '3–12 Months',
    bestFor: 'Building long-term internal AI factory capability while delivering complex multi-agent platforms.',
    whenToUse: 'When enterprises want to upskill their internal workforce while architecting proprietary AI systems without permanent agency dependence.',
    whoIsInvolved: ['VP of Engineering', 'Enterprise Architects', 'Cross-Functional Staff', 'TrustGrid Senior Systems Leads'],
    howTrustgridWorks: 'Embedded principal architects and systems engineers pairing directly with your engineering leads to transfer deep operational and architectural IP.',
    deliverables: [
      'Internal Enterprise AI Factory & Agent Operating Hub',
      'Custom Model Context Protocol (MCP) Enterprise Tooling Catalog',
      'Automated Evaluation, Regression & Prompt Defense Harnesses',
      'Workforce Upskilling & Architectural Certification Curriculum'
    ],
    expectedOutcome: 'Self-sustaining internal engineering capability with compounding organizational autonomy and intellectual property ownership.',
    ctaText: 'Explore Co-Engineering',
    ctaLink: '/request-proposal?model=co-engineering'
  },
  {
    id: 'turnkey',
    title: 'Turnkey AI Factory & Managed NOC/SOC',
    badge: 'STAGE 4 • FULL-SPECTRUM OPERATIONS',
    duration: 'Multi-Year SLA',
    bestFor: 'Sovereign private AI data centers, high-density compute facilities, and air-gapped agent operations.',
    whenToUse: 'When enterprises require end-to-end design, construction, optimization, and 24/7 managed operations for high-density compute and security.',
    whoIsInvolved: ['Executive Committee', 'Data Center Facilities Team', 'SOC / NOC Directors', 'TrustGrid Managed Operations Pod'],
    howTrustgridWorks: 'Full-lifecycle delivery from facility thermal engineering and accelerator topology to 24/7 proactive predictive maintenance and threat monitoring.',
    deliverables: [
      'Turnkey High-Density Liquid-Cooled AI Factory (30–100kW/rack)',
      'Lossless InfiniBand/RoCEv2 Rail-Optimized Network Fabric',
      '24/7 Proactive AI Factory NOC Telemetry & Congestion Avoidance',
      '24/7 Managed AI SOC & Cryptographic Key Governance'
    ],
    expectedOutcome: 'Mission-critical enterprise infrastructure operating at peak accelerator utilization with zero unplanned downtime and sovereign compliance.',
    ctaText: 'Discuss Turnkey Operations',
    ctaLink: '/request-proposal?model=turnkey'
  }
]

export function EngagementModelsSlider({ models = defaultEngagementModels }: { models?: EngagementModelDetail[] }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const current = models[activeIdx]
  const total = models.length

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % total)
  }, [total])

  const handlePrev = useCallback(() => {
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
      className="engagement-models-slider-wrapper animated-card"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <span className="card-corner-tl" />
      <span className="card-corner-br" />

      {/* Model Selector Tabs */}
      <div className="eng-model-tabs-header" role="tablist" aria-label="Engagement Model Frameworks">
        {models.map((m, idx) => {
          const isActive = idx === activeIdx
          return (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`eng-model-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveIdx(idx)}
            >
              <Workflow size={15} />
              <span>{m.title}</span>
            </button>
          )
        })}
      </div>

      {/* Main Slide Card Body */}
      <div className="eng-slide-content">
        <div className="eng-slide-grid">
          {/* Left Column: Model Fit, Scope & Workflow */}
          <div className="eng-left-col">
            <div className="eng-meta-row">
              <span className="eng-badge-tag">{current.badge}</span>
              <div className="eng-duration-chip">
                <Clock size={13} />
                <span>{current.duration}</span>
              </div>
            </div>

            <h3 className="eng-model-title">{current.title}</h3>
            <p className="eng-best-for-text">{current.bestFor}</p>

            <div className="eng-detail-callout when-box">
              <div className="callout-head">
                <Sparkles size={15} className="text-blue-500" />
                <span>When to Select This Model</span>
              </div>
              <p>{current.whenToUse}</p>
            </div>

            <div className="eng-detail-callout how-box">
              <div className="callout-head">
                <Layers size={15} className="text-cyan-400" />
                <span>How TrustGrid Works With You</span>
              </div>
              <p>{current.howTrustgridWorks}</p>
            </div>

            <div className="eng-stakeholders-box">
              <span className="box-title">
                <Users size={14} className="text-blue-500" />
                Key Stakeholders Involved:
              </span>
              <div className="stakeholders-pills">
                {current.whoIsInvolved.map((s, i) => (
                  <span key={i} className="stakeholder-tag">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Deliverables & Expected Outcome */}
          <div className="eng-right-col">
            <div className="eng-deliverables-box">
              <span className="box-heading">
                <FileCheck size={14} className="text-blue-500" />
                Tangible Engineering Deliverables
              </span>
              <ul className="deliverables-checklist">
                {current.deliverables.map((del, i) => (
                  <li key={i}>
                    <CheckCircle2 size={14} className="text-blue-500 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="eng-outcome-banner">
              <div className="outcome-banner-head">
                <TrendingUp size={15} className="text-blue-500" />
                <span>Expected Enterprise Outcome</span>
              </div>
              <p>{current.expectedOutcome}</p>
            </div>

            {/* Actions & Navigation */}
            <div className="eng-actions-footer">
              <Link href={current.ctaLink} className="button button-primary button-sm">
                <span>{current.ctaText}</span>
                <ArrowUpRight size={15} />
              </Link>
              <Link href="/contact" className="button button-ghost button-sm">
                <span>Speak with an Architect</span>
              </Link>

              <div className="eng-nav-arrows ml-auto">
                <button
                  type="button"
                  className="slider-arrow-btn"
                  onClick={handlePrev}
                  aria-label="Previous engagement model"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  className="slider-arrow-btn"
                  onClick={handleNext}
                  aria-label="Next engagement model"
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

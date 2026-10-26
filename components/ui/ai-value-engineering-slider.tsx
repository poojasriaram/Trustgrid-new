'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  Layers,
  BarChart3,
  CheckCircle2,
  Workflow,
  Zap,
  Boxes,
  ShieldCheck,
  Cpu,
  Clock,
  Gauge
} from 'lucide-react'

export interface ValueSlideData {
  id: string
  stepNumber: string
  title: string
  tagline: string
  badge: string
  metricValue: string
  metricLabel: string
  description: string
  coreCapabilities: string[]
  deliverable: string
  methodologyTool: string
  image: string
}

export const valueSlidesData: ValueSlideData[] = [
  {
    id: 'opportunity-discovery',
    stepNumber: '01',
    title: 'Economic Opportunity Discovery & Mapping',
    tagline: 'Capital Efficiency & Strategic P&L Value Alignment',
    badge: 'DISCOVERY & SELECTION',
    metricValue: '3.8× – 7.5×',
    metricLabel: 'Prioritized ROI Multiplier',
    description: 'Systematic identification and mathematical ranking of high-impact AI value streams before committing capital expenditures to compute or foundational models.',
    coreCapabilities: [
      'Value Stream Mapping across enterprise business units',
      'Economic Hurdle-Rate & Payback Modeling',
      'Risk-Weighted Opportunity Matrix (Feasibility vs Return)'
    ],
    deliverable: 'Board-Ready AI Capital Allocation Roadmap & Economic Case',
    methodologyTool: 'Theory of Constraints + Value Stream Mapping (VSM)',
    image: '/images/offering-value.jpg'
  },
  {
    id: 'finops-token-economics',
    stepNumber: '02',
    title: 'AI FinOps & Token Unit Economics',
    tagline: 'Granular Cost-per-Task & Inference Unit Economics',
    badge: 'TOKEN FINOPS',
    metricValue: '40–65%',
    metricLabel: 'Inference Spend Reduction',
    description: 'Real-time telemetry, cache hit optimization, and granular per-task token cost attribution bridging developer commits directly to CFO balance sheets.',
    coreCapabilities: [
      'Function-Cost Ledger Decomposition per API & Agent',
      'Speculative Decoding & KV-Cache Hit Rate Optimization',
      'Continuous Cloud & Silicon Arbitrage (GPU vs NPU vs TPU)'
    ],
    deliverable: 'Real-Time Unit Economics Dashboard & Token Cost Allocation Ledger',
    methodologyTool: 'Activity-Based Costing (ABC) + AI FinOps Protocol',
    image: '/images/offering-infra.jpg'
  },
  {
    id: 'toc-bottleneck-elimination',
    stepNumber: '03',
    title: 'Theory of Constraints Bottleneck Removal',
    tagline: 'System-Wide Throughput Maximization',
    badge: 'DRUM-BUFFER-ROPE',
    metricValue: '12×',
    metricLabel: 'Throughput Velocity Lift',
    description: 'Locating and systematically subordinating the single operational constraint—whether data staging, memory bandwidth, or human-in-the-loop review—that throttles end-to-end flow.',
    coreCapabilities: [
      'Identification of System Drum, Buffer & Rope Constraints',
      'Subordination of Non-Critical Pipeline Latencies',
      'Dynamic Work-in-Progress (WIP) Throttling across Agent DAGs'
    ],
    deliverable: 'Friction-Free High-Throughput Production Execution Engine',
    methodologyTool: 'Goldratt Theory of Constraints (TOC)',
    image: '/images/offering-networking.jpg'
  },
  {
    id: 'lean-waste-elimination',
    stepNumber: '04',
    title: 'Lean Thinking & 7 Algorithmic Mudas Elimination',
    tagline: 'Systematic Removal of Non-Value-Adding Compute',
    badge: 'LEAN OPERATIONS',
    metricValue: '55%',
    metricLabel: 'Latency & Compute Waste Removal',
    description: 'Applying industrial Lean principles to eliminate computational overproduction, redundant context windows, stale cache re-runs, and unnecessary agent tool hops.',
    coreCapabilities: [
      'Identification of the 7 AI Mudas (Over-generation, Latency, Rework)',
      'Single-Piece Flow for Streaming Inference Tasks',
      'SMED (Single-Minute Exchange of Dies) for Prompt Context Switches'
    ],
    deliverable: 'Lean AI Operating System & Waste Reduction Telemetry',
    methodologyTool: 'Toyota Production System (TPS) + SMED',
    image: '/images/methodology-engine.jpg'
  },
  {
    id: 'dmaic-quality-control',
    stepNumber: '05',
    title: 'DMAIC Six Sigma Statistical Quality Control',
    tagline: 'Deterministic Defect Prevention & Zero Hallucination',
    badge: 'SIX SIGMA RIGOR',
    metricValue: '99.98%',
    metricLabel: 'First-Pass Yield (FPY)',
    description: 'Define-Measure-Analyze-Improve-Control statistical process control applied to agentic workflows, eliminating non-deterministic errors and hallucination escape rates.',
    coreCapabilities: [
      'Statistical Process Control (SPC) on Agent Output Distributions',
      'Failure Mode & Effects Analysis (FMEA) for Edge Scenarios',
      'Automated Poka-Yoke (Mistake-Proofing) Verification Gateways'
    ],
    deliverable: 'Production FMEA Register & Continuous Statistical Process Charts',
    methodologyTool: 'Six Sigma DMAIC + AI FMEA',
    image: '/images/offering-trusted-ai.jpg'
  },
  {
    id: 'vro-governance',
    stepNumber: '06',
    title: 'Value Realization Office (VRO) Governance',
    tagline: 'Executive Scorecards & Boardroom Capital Attribution',
    badge: 'VALUE GOVERNANCE',
    metricValue: '100%',
    metricLabel: 'P&L Capital Attribution',
    description: 'Institutionalizing enterprise AI governance with real-time value realization dashboards, hurdle-rate verification, and milestone-gated capital deployment.',
    coreCapabilities: [
      'Hoshin Kanri Strategic AI Policy Deployment',
      'CFO-Aligned Key Performance Indicator (KPI) Scorecards',
      'Independent Pre-Cutover Value Assurance Gates'
    ],
    deliverable: 'Enterprise VRO Charter, Executive Cockpit & Audit Gateway',
    methodologyTool: 'Hoshin Kanri + Balanced Scorecard',
    image: '/images/case-study-medical-packaging.jpg'
  },
  {
    id: 'cost-to-serve-ledger',
    stepNumber: '07',
    title: 'P&L Cost-to-Serve Ledger Engineering',
    tagline: 'Direct Financial Traceability from Silicon to Customer',
    badge: 'P&L LEDGER INTEGRATION',
    metricValue: '4.2×',
    metricLabel: 'Average Net Yield Realized',
    description: 'Direct attribution of GPU watt-hour, networking bandwidth, and inference seconds to discrete customer transactions, contracts, and revenue lines.',
    coreCapabilities: [
      'Transaction-Level Hardware & Silicon Cost Decomposition',
      'Gross Margin Impact Analysis per AI Capability',
      'Automated Enterprise ERP & FinOps Ledger Synchronization'
    ],
    deliverable: 'Audited Cost-to-Serve Ledger & Unit Margin Reports',
    methodologyTool: 'Standard Cost Accounting + ERP Ledger Hooks',
    image: '/images/hero-ai-infra.jpg'
  },
  {
    id: 'turnkey-dbot',
    stepNumber: '08',
    title: 'Turnkey DBOT: Design, Build, Operate, Transfer',
    tagline: '90-Day Execution Sprints with Seamless Handover',
    badge: 'TURNKEY DBOT',
    metricValue: '90 Days',
    metricLabel: 'From Diagnostic to Production Value',
    description: 'Structured engagement framework ensuring rapid payback periods, internal team enablement, co-engineering pairing, and frictionless ownership handover.',
    coreCapabilities: [
      'Phase 1: 14-Day Architectural Diagnostic & Value Mapping',
      'Phase 2: Embedded Forward Deployment Co-Engineering',
      'Phase 3: Managed Production Run & Knowledge Transfer'
    ],
    deliverable: 'Fully Operational Production Stack & Upskilled Internal Team',
    methodologyTool: 'DBOT Turnkey Engineering Framework',
    image: '/images/offering-agentic.jpg'
  },
  {
    id: 'compounding-flywheel',
    stepNumber: '09',
    title: 'Self-Funding Compounding AI Flywheel',
    tagline: 'Reinvesting Efficiency Savings into Second-Horizon AI',
    badge: 'VALUE COMPOUNDING',
    metricValue: '10×',
    metricLabel: 'Multi-Year Enterprise Equity Value',
    description: 'Reinvesting verified operational savings from early compute optimization into second-horizon autonomous agent fleets, creating a self-funding enterprise value engine.',
    coreCapabilities: [
      'Self-Funding AI Innovation Reserve Architecture',
      'Compound Capability Velocity Modeling',
      'Long-Term Strategic Competitive Advantage Moat'
    ],
    deliverable: 'Multi-Year Compounding Enterprise AI Expansion Blueprint',
    methodologyTool: 'Compounding Value Engineering Engine',
    image: '/images/offering-value.jpg'
  }
]

export function AiValueEngineeringSlider() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const current = valueSlidesData[activeIdx]
  const total = valueSlidesData.length

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % total)
  }, [total])

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + total) % total)
  }, [total])

  // Autoplay cycle (6s with pause on hover)
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      handleNext()
    }, 6000)
    return () => clearInterval(timer)
  }, [isPaused, handleNext])

  return (
    <div
      className="value-showcase-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ position: 'relative' }}
    >
      {/* 9 Tab Jump Bar */}
      <div
        className="value-tabs-bar"
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '20px',
          scrollbarWidth: 'none'
        }}
      >
        {valueSlidesData.map((item, idx) => {
          const isActive = activeIdx === idx
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIdx(idx)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '8px',
                background: isActive ? '#1d4ed8' : '#0f172a',
                color: isActive ? '#ffffff' : '#94a3b8',
                border: isActive ? '1px solid #3b82f6' : '1px solid #334155',
                fontSize: '12px',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 0 16px rgba(37,99,235,0.35)' : 'none'
              }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: isActive ? '#93c5fd' : '#64748b'
                }}
              >
                {item.stepNumber}
              </span>
              <span>{item.title.split(' ')[0]} {item.title.split(' ')[1] || ''}</span>
            </button>
          )
        })}
      </div>

      {/* Main Value Feature Split Card */}
      <div
        className="value-feature-card animated-card"
        style={{
          background: 'linear-gradient(145deg, #071330 0%, #030818 100%)',
          borderRadius: '20px',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          padding: 'clamp(20px, 3.5vw, 36px)',
          boxShadow: '0 25px 60px -15px rgba(2, 6, 23, 0.7), 0 0 40px -10px rgba(37, 99, 235, 0.15)',
          position: 'relative'
        }}
      >
        <span className="card-corner-tl" />
        <span className="card-corner-br" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(24px, 4vw, 44px)',
            alignItems: 'center'
          }}
        >
          {/* Visual Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                aspectRatio: '16/10',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <Image
                src={current.image}
                alt={current.title}
                width={540}
                height={338}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 540px"
                quality={85}
                className="object-cover w-full h-full"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(3, 8, 24, 0.9) 0%, rgba(3, 8, 24, 0.2) 60%, transparent 100%)'
                }}
              />
              
              {/* Floating Metric Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: 'rgba(7, 19, 48, 0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)'
                }}
              >
                <div>
                  <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
                    {current.metricLabel}
                  </span>
                  <span style={{ fontSize: '24px', fontWeight: 800, color: '#38bdf8', letterSpacing: '-0.02em' }}>
                    {current.metricValue}
                  </span>
                </div>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
                  <TrendingUp size={22} />
                </div>
              </div>

              {/* Floating Stage Tag */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  background: 'rgba(2, 6, 23, 0.8)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                  color: '#60a5fa',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Zap size={13} className="text-cyan-400" />
                <span>{current.badge}</span>
              </div>
            </div>

            {/* Slider Navigation Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '4px 2px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#38bdf8', fontSize: '13px', fontWeight: 700 }}>
                  Stage {current.stepNumber} of 0{total}
                </span>
                <span style={{ color: '#64748b', fontSize: '12px' }}>
                  • {current.methodologyTool}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous value slide"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    color: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next value slide"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    color: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#38bdf8',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '6px'
                }}
              >
                {current.tagline}
              </span>
              <h3
                style={{
                  fontSize: 'clamp(20px, 2.5vw, 28px)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.25,
                  letterSpacing: '-0.02em',
                  marginBottom: '10px'
                }}
              >
                {current.title}
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  color: '#94a3b8',
                  lineHeight: 1.65,
                  margin: 0
                }}
              >
                {current.description}
              </p>
            </div>

            {/* Core Capabilities */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.65)',
                border: '1px solid rgba(51, 65, 85, 0.6)',
                borderRadius: '12px',
                padding: '16px'
              }}
            >
              <span
                style={{
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: '#cbd5e1',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'block',
                  marginBottom: '10px'
                }}
              >
                Engineered Capabilities:
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {current.coreCapabilities.map((cap, ci) => (
                  <li
                    key={ci}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      fontSize: '13px',
                      color: '#cbd5e1',
                      lineHeight: 1.45
                    }}
                  >
                    <CheckCircle2 size={15} style={{ color: '#38bdf8', flexShrink: 0, marginTop: '2px' }} />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcome Deliverable Banner */}
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '10px',
                background: 'rgba(30, 58, 138, 0.25)',
                border: '1px solid rgba(59, 130, 246, 0.35)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <BarChart3 size={18} style={{ color: '#60a5fa', flexShrink: 0 }} />
              <div style={{ fontSize: '12.5px', color: '#e2e8f0', lineHeight: 1.4 }}>
                <strong style={{ color: '#93c5fd' }}>Verified Deliverable: </strong>
                <span>{current.deliverable}</span>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', paddingTop: '4px' }}>
              <Link
                href="/book-ai-diagnostic?solution=ai-value-engineering#diagnostic-form-section"
                className="button button-primary button-sm"
              >
                <span>Book Value Diagnostic</span>
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/solutions/ai-value-engineering"
                className="button button-ghost button-sm"
              >
                <span>Explore Value Engineering</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

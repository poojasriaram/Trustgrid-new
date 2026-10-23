'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Cpu,
  ShieldCheck,
  Bot,
  Building2,
  TrendingUp,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  ChevronRight
} from 'lucide-react'

export interface ICPSegment {
  id: string
  role: string
  title: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  challenge: string
  solution: string
  offeringSlug: string
  offeringName: string
  keyOutcomes: string[]
  ctaText: string
  ctaHref: string
}

export const icpSegments: ICPSegment[] = [
  {
    id: 'cio-cto',
    role: 'CIO / CTO',
    title: 'Enterprise Architecture & Infrastructure Scale',
    icon: Cpu,
    challenge: 'High inference latency, runaway GPU compute spend (30–50% idle waste), and lack of predictable system throughput.',
    solution: 'Turnkey high-density AI Factories, liquid cooling engineering, and hardware-level accelerator optimization.',
    offeringSlug: 'ai-infra-engineering',
    offeringName: 'AI Infrastructure & AI Data Center Engineering',
    keyOutcomes: [
      '30–60% reduction in total inference cost-per-token (TCO)',
      '30–70% increase in cluster compute utilization yield',
      'Zero physical bottleneck up to 100kW/rack density'
    ],
    ctaText: 'Assess Your Compute Architecture',
    ctaHref: '/book-ai-diagnostic?solution=ai-infra-engineering#diagnostic-form-section'
  },
  {
    id: 'ciso',
    role: 'CISO / Head of Cyber Risk',
    title: 'Agent Security & Quantum-Safe Resilience',
    icon: ShieldCheck,
    challenge: 'Non-deterministic agent execution paths, prompt injection attack surfaces, and looming Harvest Now Decrypt Later quantum threats.',
    solution: 'Zero-trust cryptographic agent IAM, runtime prompt firewalls, and NIST Post-Quantum Cryptography (PQC) migration.',
    offeringSlug: 'ai-cybersecurity-quantum-safe',
    offeringName: 'AI Cybersecurity & Quantum-Safe Networking',
    keyOutcomes: [
      '100% automated Cryptographic Bill of Materials (CBOM) visibility',
      'Full immunity against post-quantum decrypt-later breaches',
      'Ephemeral, least-privilege tool access for autonomous agents'
    ],
    ctaText: 'Evaluate Your AI Security Posture',
    ctaHref: '/book-ai-diagnostic?solution=ai-cybersecurity-quantum-safe#diagnostic-form-section'
  },
  {
    id: 'ai-leaders',
    role: 'AI & Engineering Leaders',
    title: 'Autonomous Multi-Agent Systems & AgentOps',
    icon: Bot,
    challenge: 'Fragile single-prompt copilots that hallucinate under real enterprise workflows and lack durable cross-session context.',
    solution: 'Production multi-agent DAG orchestration (LangGraph/CrewAI), persistent memory fabrics, and real-time AgentOps tracing.',
    offeringSlug: 'ai-agentic-factory',
    offeringName: 'Agentic Enterprise',
    keyOutcomes: [
      '>95% multi-step task completion with SLA enforcement',
      '50–80% reduction in operational business cycle times',
      'Native enterprise tool integration via Model Context Protocol (MCP)'
    ],
    ctaText: 'Discuss Your Agentic AI Fleet',
    ctaHref: '/book-ai-diagnostic?solution=ai-agentic-factory#diagnostic-form-section'
  },
  {
    id: 'infra-leaders',
    role: 'Data Center & Network Directors',
    title: 'Lossless Fabrics & High-Density Facilities',
    icon: Building2,
    challenge: 'Silent packet drops, inter-node jitter stalling collective training jobs, and thermal limits shutting down high-density compute.',
    solution: 'Non-blocking InfiniBand / RoCEv2 network fabrics, dragonfly+ topologies, and direct-to-chip liquid thermal distribution.',
    offeringSlug: 'ai-networking-cybersecurity',
    offeringName: 'AI Networking & Cybersecurity Intelligence',
    keyOutcomes: [
      'Zero-loss packet flow at full 400G/800G line rate',
      'Minimization of GPU collective wait states (NCCL/RCCL)',
      'Self-healing autonomous AI NOC packet telemetry'
    ],
    ctaText: 'Evaluate Your AI Network Fabric',
    ctaHref: '/book-ai-diagnostic?solution=ai-networking-cybersecurity#diagnostic-form-section'
  },
  {
    id: 'cfo-finance',
    role: 'CFO / Transformation & Finance Leaders',
    title: 'AI FinOps & Compounding P&L Attribution',
    icon: TrendingUp,
    challenge: 'Billions committed to exploratory pilots with opaque returns, unpredictable token sprawl, and zero balance-sheet attribution.',
    solution: 'Industrial operational excellence (Lean Thinking, Theory of Constraints, DMAIC) combined with granular AI FinOps unit economics.',
    offeringSlug: 'ai-value-engineering',
    offeringName: 'AI Value Engineering & Acceleration',
    keyOutcomes: [
      '3–10x verified production ROI realized in 90 days',
      'Granular cost-per-task unit economics tracking',
      'Executive Value Realization Office (VRO) governance'
    ],
    ctaText: 'Identify AI Value Opportunities',
    ctaHref: '/book-ai-diagnostic?solution=ai-value-engineering#diagnostic-form-section'
  }
]

export function ICPMatrix() {
  const [activeTab, setActiveTab] = useState('cio-cto')
  const current = icpSegments.find((s) => s.id === activeTab) || icpSegments[0]
  const Icon = current.icon

  return (
    <div className="icp-matrix-container animated-card reveal-up">
      {/* TABS HEADER */}
      <div className="icp-tabs-bar" role="tablist" aria-label="Executive Persona Tabs">
        {icpSegments.map((segment) => (
          <button
            key={segment.id}
            role="tab"
            aria-selected={activeTab === segment.id}
            onClick={() => setActiveTab(segment.id)}
            className={`icp-tab-btn ${activeTab === segment.id ? 'active' : ''}`}
          >
            <span>{segment.role}</span>
          </button>
        ))}
      </div>

      {/* ACTIVE SEGMENT DETAILS */}
      <div className="icp-details-grid">
        {/* LEFT COLUMN: PROBLEM & SOLUTION */}
        <div className="icp-details-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#eff6ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1d5cff',
              flexShrink: 0
            }}>
              <Icon size={18} />
            </div>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#1d5cff', letterSpacing: '0.06em' }}>
              {current.role.toUpperCase()} PERSPECTIVE
            </span>
          </div>

          <h3 className="icp-matrix-title">
            {current.title}
          </h3>

          <div className="icp-matrix-bottleneck-box">
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#991b1b', marginBottom: '4px', letterSpacing: '0.05em' }}>
              CRITICAL ENTERPRISE BOTTLENECK
            </div>
            <p style={{ fontSize: '13.5px', color: '#7f1d1d', margin: 0, lineHeight: 1.5 }}>
              {current.challenge}
            </p>
          </div>

          <div className="icp-matrix-solution-box">
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#166534', marginBottom: '4px', letterSpacing: '0.05em' }}>
              TRUSTGRID.AI ENGINEERED RESOLUTION
            </div>
            <p style={{ fontSize: '13.5px', color: '#14532d', margin: 0, lineHeight: 1.5 }}>
              {current.solution}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: OUTCOMES & CTA */}
        <div className="icp-details-right">
          <div>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748b', letterSpacing: '0.06em', display: 'block' }}>
              EXPECTED BUSINESS &amp; TECHNICAL OUTCOMES
            </span>
            <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {current.keyOutcomes.map((outcome, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', fontSize: '13.5px', color: '#1e293b', lineHeight: 1.45 }}>
                  <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="icp-matrix-cta-row">
            <Link
              href={current.ctaHref}
              className="button button-primary button-sm icp-matrix-primary-cta"
            >
              <span>{current.ctaText}</span>
              <ArrowUpRight size={14} />
            </Link>

            <Link
              href={`/solutions/${current.offeringSlug}`}
              className="icp-matrix-secondary-link"
            >
              <span>Explore Offering Blueprint</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import React from 'react'
import Link from 'next/link'
import {
  Building2,
  Sparkles,
  Workflow,
  BarChart3,
  Network,
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
  Lock,
  Boxes
} from 'lucide-react'

interface FoundationPillar {
  id: string
  badge: string
  title: string
  description: string
  icon: React.ElementType
  href: string
  ctaText: string
  items: string[]
  highlightMetric: string
}

const foundationPillars: FoundationPillar[] = [
  {
    id: 'industries',
    badge: 'VERTICAL DOMAIN MASTERY',
    title: '12+ Regulated Industries',
    description: 'Pre-calibrated compliance and systems engineering across mission-critical enterprise sectors.',
    icon: Building2,
    href: '/industries',
    ctaText: 'Explore All Industry Verticals',
    items: [
      'Healthcare & Life Sciences (HIPAA / FDA 21 CFR)',
      'BFSI & Capital Markets (SEC / FINRA / FedRAMP)',
      'Manufacturing & MES Automation (ISA-95)',
      'Semiconductor & High-Density Foundry',
      'Energy, Utilities & Microgrid Power',
      'Aerospace, Defense & Sovereign AI Systems'
    ],
    highlightMetric: '100% Regulated Compliance Pre-Configured'
  },
  {
    id: 'methodology',
    badge: 'OPERATIONAL EXCELLENCE',
    title: 'Methodology Engine',
    description: '80+ industrial engineering frameworks combined with deterministic AI systems engineering.',
    icon: Sparkles,
    href: '/methodology-engine',
    ctaText: 'View 80+ Methodology Engine',
    items: [
      'Theory of Constraints (TOC) Bottleneck Elimination',
      'DMAIC & Six Sigma Statistical Process Control',
      'OEE & TPM Real-Time Machine Scoring',
      'SMED Setup Reduction & Throughput Accounting',
      'Hoshin Kanri Strategic Policy Deployment',
      'Poka-Yoke & Jidoka Deterministic Autonomation'
    ],
    highlightMetric: '3–10x Measurable ROI in 90 Days'
  },
  {
    id: 'engagement',
    badge: 'DELIVERY ACCOUNTABILITY',
    title: 'Turnkey Engagement Models',
    description: 'Predictable, milestone-backed delivery frameworks tailored for rapid proof-of-value to full-scale DBOT operations.',
    icon: Workflow,
    href: '/request-proposal',
    ctaText: 'Explore Delivery Frameworks',
    items: [
      'Phase 0: 2–4 Wk AI Diagnostic Assessment',
      'Phase 1: 6–12 Wk High-Velocity Production Sprints',
      'Phase 2: Strategic Co-Engineering & Capability Transfer',
      'Phase 3: Turnkey DBOT (Design, Build, Operate, Transfer)',
      '24/7 Managed AI Factory & AI SOC Telemetry',
      'Continuous FinOps Token Cost Attributions'
    ],
    highlightMetric: 'Deterministic SLA & Fixed Milestones'
  },
  {
    id: 'metrics',
    badge: 'FINANCIAL ATTRIBUTION',
    title: 'Key Metrics & ROI Attribution',
    description: 'Hardware-level telemetry mapped directly to CFO balance sheets, token economics, and P&L outcomes.',
    icon: BarChart3,
    href: '/case-studies',
    ctaText: 'Review Verified Case Studies',
    items: [
      '30–60% Inference & KV-Cache Cost Reduction',
      '>95% Multi-Agent Task Accuracy with Zero Drift',
      'Zero-Loss RoCEv2 & InfiniBand Network Flow',
      '100% Cryptographic Bill of Materials (CBOM) Visibility',
      'Real-Time P&L Attribution per User / Inference Query',
      'Full EU AI Act & NIST AI RMF Audit Trails'
    ],
    highlightMetric: 'Hardware-to-P&L Verifiable Telemetry'
  },
  {
    id: 'ecosystem',
    badge: 'SILICON & INFRASTRUCTURE',
    title: 'Technology & Partner Ecosystem',
    description: 'Integrated across tier-1 silicon accelerators, direct-to-chip cooling, lossless networking, and quantum-safe algorithms.',
    icon: Network,
    href: '/partners',
    ctaText: 'View Ecosystem Architecture',
    items: [
      'Silicon: NVIDIA Blackwell, HGX, AMD MI300X, Intel Gaudi',
      'Cooling: Direct-to-Chip Liquid & Immersion Systems',
      'Fabric: 400G/800G RoCEv2 & Quantum-2 InfiniBand',
      'Frameworks: LangGraph, AutoGen, CrewAI, vLLM, TensorRT-LLM',
      'Security: NIST Post-Quantum Cryptography (FIPS 203/204)',
      'Governance: ISO 42001, SOC 2 Type II, ISO 27001'
    ],
    highlightMetric: 'Tier-1 Hardware & Enterprise Stacks'
  },
  {
    id: 'consultation',
    badge: 'DIRECT ARCHITECT ACCESS',
    title: 'AI Strategy & Diagnostic Portal',
    description: 'Direct collaboration with senior systems engineering practice leads to audit compute, agents, networking, and governance.',
    icon: ShieldCheck,
    href: '/talk-to-ai-architect#session-booking-section',
    ctaText: 'Book 45-Min Strategy Session',
    items: [
      'Principal Systems Architect Consultation',
      'Hardware & GPU Cluster Utilization Audit',
      'Multi-Agent Fleet Readiness & MCP Review',
      'Lossless Fabric & Dragonfly+ Topologies',
      'Post-Quantum & Zero-Trust Security Baseline',
      'Customized 90-Day Enterprise AI Roadmap'
    ],
    highlightMetric: 'Dedicated 45-Min Architect Briefing'
  }
]

export function CommonFoundationSection() {
  return (
    <section className="section common-foundation-section" id="common-foundation" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
      <div className="section-intro">
        <div className="intro-left">
          <span className="section-badge" style={{ background: '#eff6ff', color: '#1d5cff', borderColor: '#bfdbfe' }}>
            L1 COMMON FOUNDATION
          </span>
          <p className="section-label">Cross-Cutting Systems Engineering, Methodology &amp; Governance</p>
        </div>
        <span className="section-index">FOUNDATION</span>
      </div>

      <div className="section-heading" style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
          The foundational architecture powering <span>every enterprise solution.</span>
        </h2>
        <p style={{ fontSize: '16px', color: '#475569', maxWidth: '850px', lineHeight: 1.6, marginTop: '12px' }}>
          Integrated across all TRUSTGRID.AI engineering groups to ensure industrial engineering rigor, regulatory compliance across 12 regulated industries, and verifiable P&amp;L return on invested compute.
        </p>
      </div>

      {/* 6-CARD FOUNDATION GRID */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px'
        }}
      >
        {foundationPillars.map((pillar) => {
          const Icon = pillar.icon
          return (
            <div
              key={pillar.id}
              className="foundation-card tg-card-interactive"
              style={{
                background: '#ffffff',
                borderRadius: '18px',
                padding: '28px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: '#eff6ff',
                      color: '#1d5cff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 700,
                      background: '#f0fdf4',
                      border: '1px solid #86efac',
                      color: '#15803d',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      letterSpacing: '0.04em'
                    }}
                  >
                    {pillar.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.5, margin: '0 0 16px' }}>
                  {pillar.description}
                </p>

                {/* Items bullet checklist */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
                  {pillar.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px', color: '#334155' }}>
                      <CheckCircle2 size={13} className="text-blue-600 shrink-0" style={{ marginTop: '2px' }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Metric & CTA */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', marginTop: '8px' }}>
                <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                  <span style={{ color: '#64748b', fontWeight: 500 }}>Outcome: </span>
                  {pillar.highlightMetric}
                </div>
                <Link
                  href={pillar.href}
                  className="button button-sm"
                  style={{
                    width: '100%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '9px 14px',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    background: '#f8fafc',
                    color: '#1d5cff',
                    border: '1px solid #cbd5e1'
                  }}
                >
                  <span>{pillar.ctaText}</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

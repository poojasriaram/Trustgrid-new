'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  Bot,
  Zap,
  Network,
  Lock,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  LucideIcon
} from 'lucide-react'

export interface KPISlideItem {
  value: string
  label: string
  context: string
  benchmark: string
  icon: LucideIcon
  badge: string
  strategicValue: string
  deliverable: string
}

export const kpiSlidesData: KPISlideItem[] = [
  {
    value: '30–60%',
    label: 'Inference Cost Reduction (TCO)',
    context: 'Achieved through KV-cache management, quantization & continuous batching.',
    benchmark: 'Benchmarked across Llama-3 & Mistral workloads',
    icon: Cpu,
    badge: 'COMPUTE EFFICIENCY',
    strategicValue: 'Slashes recurring token cost while maintaining continuous low-latency throughput across high-density clusters.',
    deliverable: 'Kernel-level PagedAttention, INT4/FP8 quantization runtimes, and dynamic request batching.'
  },
  {
    value: '>95%',
    label: 'Deterministic Task Accuracy',
    context: 'Multi-agent orchestration DAGs with persistent memory & tool sandboxing.',
    benchmark: 'LangGraph & Model Context Protocol (MCP)',
    icon: Bot,
    badge: 'AGENT SLA',
    strategicValue: 'Eliminates pilot fragility, ensuring enterprise agent fleets complete complex multi-step workflows without human intervention.',
    deliverable: 'Deterministic reasoning DAGs, episodic semantic memory fabrics, and real-time AgentOps tracing.'
  },
  {
    value: '30–100 kW',
    label: 'High-Density Rack Envelope',
    context: 'Direct-to-chip liquid cooling & power conditioning for Blackwell & MI300X.',
    benchmark: 'PUE optimization below 1.15',
    icon: Zap,
    badge: 'FACILITY DENSITY',
    strategicValue: 'Overcomes power and thermal walls, packing maximum compute density per square foot for next-gen silicon.',
    deliverable: 'Turnkey liquid-cooling facility engineering, CDA distribution, and thermal loop telemetry.'
  },
  {
    value: '0.0%',
    label: 'Lossless Packet Flow',
    context: 'RoCEv2 & InfiniBand fabrics with autonomous NOC packet telemetry.',
    benchmark: 'Rail-optimized Dragonfly+ topologies',
    icon: Network,
    badge: 'NETWORK FABRIC',
    strategicValue: 'Prevents silent packet drops and tail latency spikes that stall distributed GPU training lines.',
    deliverable: 'Non-blocking fat-tree topologies, NCCL collective tuning, and proactive telemetry self-healing.'
  },
  {
    value: '100%',
    label: 'Cryptographic Bill of Materials',
    context: 'NIST Post-Quantum Cryptography transition protecting against harvest-now attacks.',
    benchmark: 'FIPS 203 (ML-KEM) & FIPS 204 (ML-DSA)',
    icon: Lock,
    badge: 'QUANTUM DEFENSE',
    strategicValue: 'Delivers full cryptographic agility across the enterprise, defending long-lived assets from quantum decryption.',
    deliverable: 'Automated CBOM discovery, zero-trust agent permissions, and hybrid NIST PQC protocols.'
  },
  {
    value: '3–10x',
    label: 'Verified Production ROI',
    context: 'Operational excellence (Lean, TOC, DMAIC) tied directly to CFO balance sheets.',
    benchmark: '90-Day rapid value realization sprint',
    icon: TrendingUp,
    badge: 'P&L IMPACT',
    strategicValue: 'Transitions enterprise AI from an opaque experimental cost center into a compounding balance sheet asset.',
    deliverable: 'FinOps unit-cost attribution, Theory of Constraints bottleneck removal, and VRO scorecards.'
  }
]

export function KPISlider() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const total = kpiSlidesData.length

  const handleNext = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % total)
  }, [total])

  const handlePrev = useCallback(() => {
    setCurrentIdx((prev) => (prev - 1 + total) % total)
  }, [total])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      handleNext()
    }, 6500)
    return () => clearInterval(timer)
  }, [isPaused, handleNext])

  const current = kpiSlidesData[currentIdx]
  const Icon = current.icon

  return (
    <div
      className="kpi-slider-wrapper animated-card"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <span className="card-corner-tl" />
      <span className="card-corner-br" />

      {/* Header controls */}
      <div className="kpi-slider-header">
        <div className="kpi-header-left">
          <div className="kpi-badge-icon">
            <Icon size={16} className="text-blue-500" />
            <span className="kpi-badge-title">{current.badge}</span>
          </div>
          <span className="kpi-live-tag">VERIFIED BENCHMARK</span>
        </div>

        <div className="kpi-header-controls">
          <div className="kpi-dots-row">
            {kpiSlidesData.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`kpi-dot ${i === currentIdx ? 'active' : ''}`}
                onClick={() => setCurrentIdx(i)}
                aria-label={`Jump to benchmark ${i + 1}`}
              />
            ))}
          </div>

          <div className="kpi-arrows-row">
            <button
              type="button"
              className="slider-arrow-btn"
              onClick={handlePrev}
              aria-label="Previous benchmark"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              className="slider-arrow-btn"
              onClick={handleNext}
              aria-label="Next benchmark"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main KPI slide body */}
      <div className="kpi-slide-body">
        <div className="kpi-slide-grid">
          {/* Left Column: Huge Metric Stat & Verification */}
          <div className="kpi-stat-col">
            <div className="kpi-stat-big-val">{current.value}</div>
            <h3 className="kpi-stat-label">{current.label}</h3>
            <p className="kpi-stat-context">{current.context}</p>

            <div className="kpi-benchmark-pill">
              <ShieldCheck size={14} className="text-blue-500 shrink-0" />
              <span>{current.benchmark}</span>
            </div>
          </div>

          {/* Right Column: Strategic Value & Engineered Deliverable */}
          <div className="kpi-strategic-col">
            <div className="kpi-strategic-box">
              <span className="kpi-box-label">Strategic Enterprise Impact</span>
              <p>{current.strategicValue}</p>
            </div>

            <div className="kpi-deliverable-box">
              <span className="kpi-box-label">Engineered Architectural Deliverable</span>
              <p>{current.deliverable}</p>
            </div>

            <div className="kpi-action-row">
              <Link href="/book-ai-diagnostic" className="button button-primary button-sm">
                <span>Audit Your Organization&apos;s Baseline</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

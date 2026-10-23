'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  Layers,
  BarChart3
} from 'lucide-react'

export interface IndustryCardData {
  id: string
  name: string
  tagline: string
  image: string
  opportunities: string[]
  solutions: string[]
  outcomes: string
  href: string
}

const industryList: IndustryCardData[] = [
  {
    id: 'manufacturing',
    name: 'Discrete & Process Manufacturing',
    tagline: 'Industrial AI Factories & Predictive Operations',
    image: '/images/industry-manufacturing.jpg',
    opportunities: [
      'Autonomous assembly line quality inspection',
      'Overall Equipment Effectiveness (OEE) optimization',
      'Real-time supply chain constraint management'
    ],
    solutions: [
      'AI Infra Engineering (Edge Inferencing)',
      'Autonomous Agentic Fleets (Shopfloor Ops)',
      'Lean & DMAIC Value Engineering'
    ],
    outcomes: '35–50% reduction in defect escape rates and 15–25% OEE yield improvement.',
    href: '/industries#manufacturing'
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Life Sciences',
    tagline: 'Clinical AI Precision & Diagnostic Governance',
    image: '/images/industry-healthcare.jpg',
    opportunities: [
      'Multi-modal clinical diagnostic inference',
      'Secure federated medical record intelligence',
      'AI-driven drug target discovery pipelines'
    ],
    solutions: [
      'TRUSTED AI Engineering (SHAP/LIME)',
      'Quantum-Safe Cryptography (HIPAA / PQC)',
      'High-Density AI Compute Fabrics'
    ],
    outcomes: '99.4% explainability compliance with zero data privacy leakage.',
    href: '/industries#healthcare'
  },
  {
    id: 'finance',
    name: 'Banking & Financial Services',
    tagline: 'High-Frequency Risk Intelligence & PQC Security',
    image: '/images/industry-finance.jpg',
    opportunities: [
      'Sub-millisecond fraud and anomaly detection',
      'Autonomous accounts reconciliation agents',
      'Automated Basel III & regulatory compliance tracing'
    ],
    solutions: [
      'Lossless RoCEv2 AI Networking',
      'L1–L7 Post-Quantum Cryptography (PQC / CBOM)',
      'Multi-Agent Finance Fleets'
    ],
    outcomes: '40–70% reduction in manual reconciliation cost with deterministic audit trails.',
    href: '/industries#banking-finance'
  },
  {
    id: 'energy',
    name: 'Energy, Utilities & Smart Grids',
    tagline: 'Smart Grid Load Balancing & Infrastructure AI',
    image: '/images/industry-energy.jpg',
    opportunities: [
      'Predictive grid load balancing & renewable curtailment',
      'Substation and pipeline thermal computer vision',
      'Autonomous maintenance scheduling agents'
    ],
    solutions: [
      'Edge AI Inference Clusters',
      'Zero-Trust Critical Infrastructure Defense',
      'Theory of Constraints (TOC) Value Engineering'
    ],
    outcomes: '20–30% reduction in grid transmission loss and proactive outage prevention.',
    href: '/industries#energy'
  },
  {
    id: 'defense',
    name: 'Aerospace & Defense',
    tagline: 'Air-Gapped Sovereign AI & Tactical Mesh',
    image: '/images/industry-defense.jpg',
    opportunities: [
      'Air-gapped tactical multi-domain situational awareness',
      'Autonomous mission planning multi-agent swarms',
      'Zero-trust hardware cryptographic enclaves'
    ],
    solutions: [
      'Sovereign AI Factory Deployments',
      'Non-Terrestrial Networking (NTN / Satellite)',
      'Post-Quantum Lattice Cryptography'
    ],
    outcomes: '100% sovereign data air-gapping with deterministic decision logging.',
    href: '/industries#defense'
  },
  {
    id: 'telecom',
    name: 'Telecommunications & High-Speed Networks',
    tagline: 'Autonomous 5G/6G Core & Intelligent RAN',
    image: '/images/offering-networking.jpg',
    opportunities: [
      'Real-time dynamic RAN beamforming optimization',
      'Autonomous subscriber churn prediction and remediation',
      'Self-healing optical transport telemetry networks'
    ],
    solutions: [
      'Lossless RoCEv2 Network Topologies',
      'Autonomous Network SRE Agent Fleets',
      'AI FinOps Compute Optimization'
    ],
    outcomes: '3.5× network throughput efficiency and 45% reduction in MTTR.',
    href: '/industries#telecommunications'
  },
  {
    id: 'retail',
    name: 'Retail, Consumer Goods & E-Commerce',
    tagline: 'Demand Sensing & Omnichannel Dynamic Pricing',
    image: '/images/offering-value.jpg',
    opportunities: [
      'Real-time inventory allocation & localized demand sensing',
      'Multi-modal visual product search & cataloging',
      'Autonomous supplier contract reconciliation agents'
    ],
    solutions: [
      'Low-Latency Inference Serving (TensorRT-LLM)',
      'Agentic Supply Chain Fleets',
      'Lean Inventory Value Engineering'
    ],
    outcomes: '28% reduction in out-of-stock incidents and 14–22% gross margin lift.',
    href: '/industries#retail'
  },
  {
    id: 'supply-chain',
    name: 'Supply Chain & Freight Logistics',
    tagline: 'Multi-Modal Routing & Autonomous Warehouse Fleets',
    image: '/images/offering-infra.jpg',
    opportunities: [
      'Autonomous global customs document verification',
      'Dynamic multimodal freight route optimization under shocks',
      'Cold-chain telemetry and spoilage prediction'
    ],
    solutions: [
      'Autonomous Document Processing Agents',
      'Real-Time Jitter Telemetry Fabrics',
      'Theory of Constraints (TOC) Flow Optimization'
    ],
    outcomes: '32% faster port-to-door transit times and 50% decrease in demurrage.',
    href: '/industries#logistics'
  },
  {
    id: 'public-sector',
    name: 'Public Sector, Sovereign Cloud & Smart Cities',
    tagline: 'Sovereign AI Governance & Civic Intelligence',
    image: '/images/offering-trusted-ai.jpg',
    opportunities: [
      'Sovereign civic engagement and multilingual citizen service',
      'Real-time municipal traffic flow and emergency dispatch',
      'Automated statutory regulatory compliance & policy auditing'
    ],
    solutions: [
      'Trusted AI Mathematical Explainability',
      'Air-Gapped Sovereign Infrastructure',
      'EU AI Act / NIST RMF Gateways'
    ],
    outcomes: '60% faster citizen service resolution with 100% sovereign data residency.',
    href: '/industries#public-sector'
  }
]

export function IndustryShowcaseSlider() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const current = industryList[activeIdx]
  const total = industryList.length

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
    }, 6000)
    return () => clearInterval(timer)
  }, [isPaused, handleNext])

  return (
    <div
      className="industry-showcase-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Showcase Split Card */}
      <div className="industry-feature-card animated-card">
        <span className="card-corner-tl" />
        <span className="card-corner-br" />

        <div className="industry-card-grid">
          {/* Visual Column */}
          <div className="industry-visual-col">
            <div className="industry-image-wrapper relative overflow-hidden aspect-[16/10]">
              <Image
                src={current.image}
                alt={current.name}
                width={540}
                height={338}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 540px"
                quality={80}
                className="industry-img object-cover w-full h-full"
              />
              <div className="industry-img-overlay" />
              
              <div className="industry-floating-tag">
                <Building2 size={15} className="text-cyan-400" />
                <span>VERTICAL DOMAIN BLUEPRINT</span>
              </div>
            </div>

            {/* Slider Navigation Bar with Index and Controls */}
            <div className="industry-nav-bar">
              <div className="industry-counter" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="text-cyan-400 font-semibold">{current.name.split(' ')[0]}</span>
                <span className="text-xs text-slate-400 font-mono font-bold">
                  ({String(activeIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')})
                </span>
              </div>

              {/* Indicator dots for quick navigation across all 9 models */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  margin: '0 8px'
                }}
                aria-label="Industry slides"
              >
                {industryList.map((ind, i) => (
                  <button
                    key={ind.id}
                    type="button"
                    onClick={() => setActiveIdx(i)}
                    aria-label={`Jump to ${ind.name}`}
                    style={{
                      width: activeIdx === i ? '18px' : '6px',
                      height: '6px',
                      borderRadius: '3px',
                      background: activeIdx === i ? '#38bdf8' : 'rgba(148, 163, 184, 0.35)',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'all 0.25s ease'
                    }}
                  />
                ))}
              </div>

              <div className="industry-nav-arrows">
                <button
                  type="button"
                  className="industry-arrow"
                  onClick={handlePrev}
                  aria-label="Previous industry"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  className="industry-arrow"
                  onClick={handleNext}
                  aria-label="Next industry"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="industry-content-col">
            <div className="industry-meta-strip">
              <span className="industry-badge">INDUSTRY BLUEPRINT {String(activeIdx + 1).padStart(2, '0')}</span>
              <span className="industry-tagline">{current.tagline}</span>
            </div>

            <h3 className="industry-name">{current.name}</h3>

            <div className="industry-two-col-details">
              {/* Opportunities */}
              <div className="industry-detail-block">
                <span className="detail-block-title">Key AI Opportunities:</span>
                <ul className="detail-bullet-list">
                  {current.opportunities.map((op, oi) => (
                    <li key={oi}>
                      <Sparkles size={13} className="text-blue-500 shrink-0 mt-1" />
                      <span>{op}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div className="industry-detail-block">
                <span className="detail-block-title">TRUSTGRID.AI Stacks:</span>
                <ul className="detail-bullet-list">
                  {current.solutions.map((sol, si) => (
                    <li key={si}>
                      <Layers size={13} className="text-cyan-600 shrink-0 mt-1" />
                      <span>{sol}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Outcomes Pill */}
            <div className="industry-outcome-banner">
              <div className="outcome-banner-head">
                <BarChart3 size={15} className="text-blue-500" />
                <span>Quantified Business Outcome:</span>
              </div>
              <p>{current.outcomes}</p>
            </div>

            <div className="industry-card-cta">
              <Link href="/book-ai-diagnostic#diagnostic-form-section" className="button button-primary button-sm">
                <span>Book an AI Diagnostic</span>
                <ArrowUpRight size={16} />
              </Link>
              <Link href={current.href} className="button button-ghost button-sm">
                <span>Explore {current.name.split(' ')[0]} Solutions</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Check,
  Sparkles,
  Layers,
  BarChart3,
  LucideIcon
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
    href: '/industries'
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
    href: '/industries'
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
    href: '/industries'
  },
  {
    id: 'energy',
    name: 'Energy & Utilities',
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
    href: '/industries'
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
    href: '/industries'
  }
]

export function IndustryShowcaseSlider() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

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
            <div className="industry-image-wrapper">
              <img
                src={current.image}
                alt={current.name}
                className="industry-img"
              />
              <div className="industry-img-overlay" />
              
              <div className="industry-floating-tag">
                <Building2 size={15} className="text-cyan-400" />
                <span>VERTICAL DOMAIN BLUEPRINT</span>
              </div>
            </div>

            {/* Slider Navigation Bar */}
            <div className="industry-nav-bar">
              <div className="industry-counter">
                <span className="text-cyan-400 font-semibold">{current.name.split(' ')[0]}</span>
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
              <span className="industry-badge">INDUSTRY BLUEPRINT</span>
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
                <span className="detail-block-title">TrustGrid.AI Stacks:</span>
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
              <Link href={current.href} className="button button-primary button-sm">
                <span>Explore {current.name.split(' ')[0]} Solutions</span>
                <ArrowUpRight size={16} />
              </Link>
              <Link href="/book-ai-diagnostic" className="button button-ghost button-sm">
                <span>Request Industry Diagnostic</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

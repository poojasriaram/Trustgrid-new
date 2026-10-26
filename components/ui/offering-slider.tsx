'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  Bot,
  Cpu,
  Network,
  Lock,
  ShieldCheck,
  TrendingUp,
  LucideIcon
} from 'lucide-react'

export interface PrimaryOffering {
  num?: string
  groupTag: string
  title: string
  slug: string
  icon?: LucideIcon
  badge: string
  image: string
  problem: string
  solution: string
  deliverables: string[]
  metric: string
  duration: string
}

const defaultOfferingIcons: Record<string, LucideIcon> = {
  'ai-infra-engineering': Cpu,
  'ai-agentic-factory': Bot,
  'ai-networking': Network,
  'ai-networking-cybersecurity': Network,
  'ai-cybersecurity-quantum-safe': Lock,
  'trusted-ai-transformation': ShieldCheck,
  'ai-value-engineering': TrendingUp,
}

// Concise 1-line summaries capped at <= 120 characters per requirements
const conciseSummaries: Record<string, string> = {
  'ai-infra-engineering': 'High-density AI Factories (30–100kW/rack) with direct-to-chip liquid cooling and low-latency inference serving.',
  'ai-agentic-factory': 'Production multi-agent systems with deterministic reasoning DAGs, persistent memory fabrics, and native MCP tools.',
  'ai-networking': 'Ultra-low latency, non-blocking InfiniBand and RoCEv2 network fabrics engineered for zero packet loss at scale.',
  'ai-networking-cybersecurity': 'Zero-loss RoCEv2 fabrics, Cognitive WiFi 7, and post-quantum cryptographic defense unified as one nervous system.',
  'ai-cybersecurity-quantum-safe': 'Zero-trust agent protection and runtime prompt firewalls migrating enterprise crypto to NIST post-quantum standards.',
  'trusted-ai-transformation': 'Mathematical explainability (SHAP/LIME), continuous SPC, formal robustness, and immutable decision audit trails.',
  'ai-value-engineering': 'Industrial operational excellence (Lean, TOC, DMAIC) and AI FinOps unit economics ensuring compounding 3–10x ROI.'
}

interface OfferingSliderProps {
  offerings: PrimaryOffering[]
}

export function OfferingSlider({ offerings }: OfferingSliderProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0)
  const [displayedDesc, setDisplayedDesc] = useState<string>(
    conciseSummaries[offerings[0]?.slug] || offerings[0]?.solution?.slice(0, 118) || ''
  )
  const [isFading, setIsFading] = useState<boolean>(false)
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const activeOffering = offerings[activeIdx] || offerings[0]

  const handleSelect = (idx: number) => {
    if (idx === activeIdx) return
    setActiveIdx(idx)

    // Smooth 200ms to 300ms fade transition without layout shift
    setIsFading(true)
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current)
    fadeTimeoutRef.current = setTimeout(() => {
      const summary = conciseSummaries[offerings[idx]?.slug] || offerings[idx]?.solution?.slice(0, 118) || ''
      setDisplayedDesc(summary)
      setIsFading(false)
    }, 150)
  }

  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current)
    }
  }, [])

  return (
    <div className="services-card-grid-container" aria-label="Enterprise AI Services Navigation">
      {/* 1. Symmetrical Clean Card Grid (Navigation Tab Style: Icon + Title only) */}
      <div
        className="services-tabs-grid"
        role="tablist"
        aria-label="Enterprise AI Offerings"
      >
        {offerings.map((offering, idx) => {
          const Icon = offering.icon || defaultOfferingIcons[offering.slug] || Cpu
          const isActive = idx === activeIdx

          return (
            <button
              key={offering.slug}
              type="button"
              role="tab"
              id={`service-card-tab-${offering.slug}`}
              aria-selected={isActive}
              aria-controls="selected-service-ribbon"
              tabIndex={0}
              onClick={() => handleSelect(idx)}
              onMouseEnter={() => handleSelect(idx)}
              onFocus={() => handleSelect(idx)}
              className={`service-tab-card ${isActive ? 'active-tab' : ''}`}
            >
              <div className="tab-card-inner">
                <div className={`tab-icon-box ${isActive ? 'icon-active' : ''}`}>
                  <Icon size={20} className="tab-icon" />
                </div>
                <span className="tab-title">{offering.title}</span>
              </div>
              <div className={`tab-active-indicator ${isActive ? 'indicator-visible' : ''}`} />
            </button>
          )
        })}
      </div>

      {/* 2. Single Dedicated Information Ribbon Section */}
      <div
        id="selected-service-ribbon"
        role="region"
        aria-live="polite"
        className="selected-service-ribbon"
      >
        <div className="ribbon-header-row">
          <div className="ribbon-label-group">
            <span className="ribbon-status-dot" />
            <span className="ribbon-label">SELECTED SERVICE INFORMATION</span>
            <span className="ribbon-service-name">{activeOffering.title}</span>
          </div>

          <Link
            href={`/solutions/${activeOffering.slug}`}
            className="ribbon-action-link"
            title={`View full engineering architecture for ${activeOffering.title}`}
          >
            <span>Explore Practice</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        <div className="ribbon-body-wrap">
          <p className={`ribbon-description ${isFading ? 'fade-out' : 'fade-in'}`}>
            {displayedDesc}
          </p>
        </div>
      </div>
    </div>
  )
}

'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Cpu,
  Bot,
  Network,
  Lock,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  ArrowUpRight,
  LucideIcon
} from 'lucide-react'

export interface ServiceCardItem {
  id: string
  slug: string
  title: string
  groupTag: string
  icon: LucideIcon
  shortDescription: string
}

export const defaultServices: ServiceCardItem[] = [
  {
    id: 'ai-infra',
    slug: 'ai-infra-engineering',
    title: 'AI Infra & Data Center',
    groupTag: 'AI INFRASTRUCTURE',
    icon: Cpu,
    shortDescription: 'High-density AI Factories (30–100kW/rack) with direct-to-chip liquid cooling and low-latency inference serving.'
  },
  {
    id: 'ai-agentic',
    slug: 'ai-agentic-factory',
    title: 'Agentic Enterprise',
    groupTag: 'AGENTIC ENTERPRISE',
    icon: Bot,
    shortDescription: 'Production multi-agent systems with deterministic reasoning DAGs, persistent memory fabrics, and native MCP tools.'
  },
  {
    id: 'ai-networking',
    slug: 'ai-networking',
    title: 'AI Networking',
    groupTag: 'AI NETWORKING',
    icon: Network,
    shortDescription: 'Ultra-low latency, non-blocking InfiniBand and RoCEv2 network fabrics engineered for zero packet loss at scale.'
  },
  {
    id: 'ai-cybersecurity',
    slug: 'ai-cybersecurity-quantum-safe',
    title: 'AI Cybersecurity',
    groupTag: 'AI CYBERSECURITY',
    icon: Lock,
    shortDescription: 'Zero-trust agent protection and runtime prompt firewalls migrating enterprise crypto to NIST post-quantum standards.'
  },
  {
    id: 'trusted-ai',
    slug: 'trusted-ai-transformation',
    title: 'Trusted AI Engineering',
    groupTag: 'TRUSTED AI',
    icon: ShieldCheck,
    shortDescription: 'Mathematical explainability (SHAP/LIME), continuous SPC, formal robustness, and immutable decision audit trails.'
  },
  {
    id: 'ai-value',
    slug: 'ai-value-engineering',
    title: 'AI Value Engineering',
    groupTag: 'VALUE ENGINEERING',
    icon: TrendingUp,
    shortDescription: 'Industrial operational excellence (Lean, TOC, DMAIC) and AI FinOps unit economics ensuring compounding 3–10x ROI.'
  }
]

interface ServicesCardGridProps {
  services?: ServiceCardItem[]
}

export function ServicesCardGrid({ services = defaultServices }: ServicesCardGridProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0)
  const [displayedDesc, setDisplayedDesc] = useState<string>(services[0]?.shortDescription || '')
  const [isFading, setIsFading] = useState<boolean>(false)
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const activeService = services[activeIdx] || services[0]

  const handleSelectService = (idx: number) => {
    if (idx === activeIdx) return
    setActiveIdx(idx)

    // Smooth 200ms-300ms fade transition without layout shift
    setIsFading(true)
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current)
    fadeTimeoutRef.current = setTimeout(() => {
      setDisplayedDesc(services[idx]?.shortDescription || '')
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
      {/* 1. Symmetrical Clean Card Grid (Tabs Style) */}
      <div
        className="services-tabs-grid"
        role="tablist"
        aria-label="Enterprise AI Primary Services"
      >
        {services.map((service, idx) => {
          const Icon = service.icon
          const isActive = idx === activeIdx

          return (
            <button
              key={service.id}
              type="button"
              role="tab"
              id={`service-tab-${service.id}`}
              aria-selected={isActive}
              aria-controls="selected-service-ribbon"
              tabIndex={0}
              onClick={() => handleSelectService(idx)}
              onMouseEnter={() => handleSelectService(idx)}
              onFocus={() => handleSelectService(idx)}
              className={`service-tab-card ${isActive ? 'active-tab' : ''}`}
            >
              <div className="tab-card-inner">
                <div className={`tab-icon-box ${isActive ? 'icon-active' : ''}`}>
                  <Icon size={20} className="tab-icon" />
                </div>
                <span className="tab-title">{service.title}</span>
              </div>
              <div className={`tab-active-indicator ${isActive ? 'indicator-visible' : ''}`} />
            </button>
          )
        })}
      </div>

      {/* 2. Dedicated Single Clean Information Ribbon */}
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
            <span className="ribbon-service-name">{activeService.title}</span>
          </div>

          <Link
            href={`/solutions/${activeService.slug}`}
            className="ribbon-action-link"
            title={`View full architecture for ${activeService.title}`}
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

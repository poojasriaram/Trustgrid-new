'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Cpu,
  Bot,
  Network,
  Lock,
  ShieldCheck,
  TrendingUp,
  Activity,
  CheckCircle2,
  Zap,
  Gauge,
  Layers,
  LucideIcon
} from 'lucide-react'
import { HeroCanvas } from '@/components/ui/hero-canvas'

export interface HeroSlideData {
  id: string
  pillBadge: string
  layerTag: string
  title: string
  titleHighlight: string
  copy: string
  thesisHighlight: string
  primaryCtaText: string
  primaryCtaLink: string
  secondaryCtaText: string
  secondaryCtaLink: string
  solutionSlug: string
  engineLayerIndex: number
  icon: LucideIcon
  image: string
  statMetric: string
  statLabel: string
  keyFeatures: string[]
}

export const heroSlidesData: HeroSlideData[] = [
  {
    id: 'infra',
    pillBadge: 'ENTERPRISE AI OPERATING COMPANY',
    layerTag: 'HIGH-DENSITY COMPUTE (30–100kW)',
    title: 'From Infrastructure to Intelligence.',
    titleHighlight: 'Engineered for Scale.',
    copy: 'TrustGrid is the engineering and value realization partner that global enterprises trust to design, deploy, secure, and operate the complete AI lifecycle — from high-density GPU factories with direct-to-chip liquid cooling to low-latency inference serving.',
    thesisHighlight: 'Strategic Core: Purpose-engineered AI Factories delivering maximum intelligence per dollar and watt with 30–70% higher accelerator utilization.',
    primaryCtaText: 'Book an AI Diagnostic',
    primaryCtaLink: '/book-ai-diagnostic',
    secondaryCtaText: 'Explore AI Infra Practice',
    secondaryCtaLink: '/solutions/ai-infra-engineering',
    solutionSlug: 'ai-infra-engineering',
    engineLayerIndex: 0,
    icon: Cpu,
    image: '/images/hero-ai-infra.jpg',
    statMetric: '30–60% TCO Reduction',
    statLabel: 'Direct-to-Chip Liquid Cooled',
    keyFeatures: [
      '30–100kW/Rack AI Factory Engineering',
      'Blackwell & Hopper GPU Kernel Tuning',
      '24/7 Managed Predictive Maintenance'
    ]
  },
  {
    id: 'agentic',
    pillBadge: 'AUTONOMOUS OPERATIONS PLATFORM',
    layerTag: 'MULTI-AGENT FLEETS & ORCHESTRATION',
    title: 'From Simple Chatbots to',
    titleHighlight: 'Autonomous Agent Fleets.',
    copy: 'Architect, deploy, and govern production multi-agent systems with deterministic reasoning DAGs, persistent memory fabrics, tool sandboxing, and native Model Context Protocol (MCP) integrations across enterprise systems.',
    thesisHighlight: 'Strategic Core: Turning autonomy into compounding enterprise capability with deterministic execution and strict SLA guarantees.',
    primaryCtaText: 'Deploy Agentic Fleets',
    primaryCtaLink: '/book-ai-diagnostic?solution=ai-agentic-factory',
    secondaryCtaText: 'Explore Agentic Factory',
    secondaryCtaLink: '/solutions/ai-agentic-factory',
    solutionSlug: 'ai-agentic-factory',
    engineLayerIndex: 1,
    icon: Bot,
    image: '/images/offering-agentic.jpg',
    statMetric: '>95% Task Accuracy',
    statLabel: 'Deterministic Multi-Agent DAGs',
    keyFeatures: [
      'Autonomous Reasoning & Cognitive Blueprinting',
      'LangGraph & CrewAI Production Orchestration',
      'Enterprise AgentOps & Real-Time Guardrails'
    ]
  },
  {
    id: 'networking',
    pillBadge: 'HIGH-PERFORMANCE AI NETWORKING',
    layerTag: 'LOSSLESS RoCEv2 & INFINIBAND FABRICS',
    title: 'Ultra-Low Latency AI Fabrics.',
    titleHighlight: 'Zero Packet Drops.',
    copy: 'Ultra-low latency, non-blocking InfiniBand and RoCEv2 network fabrics engineered for zero packet loss, rail-optimized node alignment, and autonomous NOC telemetry for massive distributed AI training and inference.',
    thesisHighlight: 'Strategic Core: Eliminating tail jitter and silent network congestion that stall GPU clusters at line speed.',
    primaryCtaText: 'Optimize AI Fabrics',
    primaryCtaLink: '/book-ai-diagnostic?solution=ai-networking',
    secondaryCtaText: 'Explore AI Networking',
    secondaryCtaLink: '/solutions/ai-networking',
    solutionSlug: 'ai-networking',
    engineLayerIndex: 2,
    icon: Network,
    image: '/images/offering-networking.jpg',
    statMetric: '0.00% Packet Loss',
    statLabel: 'Rail-Optimized Fabric Throughput',
    keyFeatures: [
      'Quantum-2 InfiniBand & Lossless RoCEv2',
      'NCCL Collective Communications Optimization',
      'Autonomous AI NOC & Telemetry Telemetry'
    ]
  },
  {
    id: 'security',
    pillBadge: 'POST-QUANTUM & AGENT DEFENSE',
    layerTag: 'QUANTUM-SAFE DEFENSE & CBOM',
    title: 'Defending Autonomous AI &',
    titleHighlight: 'Post-Quantum Resilience.',
    copy: 'Comprehensive security engineering protecting autonomous agents with zero-trust permissions and runtime prompt firewalls while transitioning enterprise cryptography to NIST Post-Quantum Cryptographic standards.',
    thesisHighlight: 'Strategic Core: Neutralizing novel AI attack surfaces and Harvest Now Decrypt Later quantum threats across L1–L7.',
    primaryCtaText: 'Audit AI Security & CBOM',
    primaryCtaLink: '/book-ai-diagnostic?solution=ai-cybersecurity-quantum-safe',
    secondaryCtaText: 'Explore AI Cybersecurity',
    secondaryCtaLink: '/solutions/ai-cybersecurity-quantum-safe',
    solutionSlug: 'ai-cybersecurity-quantum-safe',
    engineLayerIndex: 3,
    icon: Lock,
    image: '/images/offering-security.jpg',
    statMetric: '100% CBOM Visibility',
    statLabel: 'NIST PQC & Zero-Trust Agent Defense',
    keyFeatures: [
      'L1–L7 Post-Quantum Cryptography (PQC)',
      'Agent Guardrails & Runtime Prompt Firewalls',
      '24/7 Managed AI Security Operations Center'
    ]
  },
  {
    id: 'trusted',
    pillBadge: 'CONTINUOUS AI GOVERNANCE',
    layerTag: 'EXPLAINABLE & GOVERNED SYSTEMS',
    title: 'Explainable, Robust & Governed.',
    titleHighlight: 'Zero Black-Box Risk.',
    copy: 'Rigorous engineering of mathematical explainability (SHAP/LIME), continuous statistical process control (SPC), formal robustness verification, and immutable cryptographic decision audit trails for EU AI Act & NIST AI RMF compliance.',
    thesisHighlight: 'Strategic Core: Guaranteeing board oversight, mathematical verifiability, and regulatory assurance in high-stakes mission-critical workflows.',
    primaryCtaText: 'Verify Trusted AI Posture',
    primaryCtaLink: '/book-ai-diagnostic?solution=trusted-ai-transformation',
    secondaryCtaText: 'Explore Trusted AI',
    secondaryCtaLink: '/solutions/trusted-ai-transformation',
    solutionSlug: 'trusted-ai-transformation',
    engineLayerIndex: 4,
    icon: ShieldCheck,
    image: '/images/offering-trusted-ai.jpg',
    statMetric: 'Zero Black-Box Risk',
    statLabel: 'EU AI Act & NIST AI RMF Verified',
    keyFeatures: [
      'SHAP & Integrated Gradients Explainability',
      'Continuous Statistical Process Control (SPC)',
      'Cryptographic Decision Audit Trails'
    ]
  },
  {
    id: 'value',
    pillBadge: 'ECONOMIC VALUE REALIZATION',
    layerTag: 'FINANCIAL ATTRIBUTION & FinOps',
    title: 'CFO-Defensible AI Returns.',
    titleHighlight: 'Measurable P&L Impact.',
    copy: 'Industrial operational excellence (Lean Thinking, Theory of Constraints, DMAIC) combined with AI FinOps to prioritize high-yield initiatives, eliminate token sprawl, and ensure compounding business ROI tied to CFO balance sheets.',
    thesisHighlight: 'Strategic Core: Bridging compute spend directly to enterprise revenue growth, unit cost reduction, and defensible ROI.',
    primaryCtaText: 'Calculate AI Unit Economics',
    primaryCtaLink: '/book-ai-diagnostic?solution=ai-value-engineering',
    secondaryCtaText: 'Explore Value Engineering',
    secondaryCtaLink: '/solutions/ai-value-engineering',
    solutionSlug: 'ai-value-engineering',
    engineLayerIndex: 5,
    icon: TrendingUp,
    image: '/images/offering-value.jpg',
    statMetric: '4.2x Average ROI',
    statLabel: 'TOC, Lean & FinOps Attribution',
    keyFeatures: [
      'Value Discovery & Economic Opportunity Mapping',
      'Unit Economics & Cost-Per-Task Modeling',
      'Continuous FinOps Value Governance'
    ]
  }
]

export function HeroSlider() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const total = heroSlidesData.length

  const goToNext = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % total)
  }, [total])

  const goToPrev = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  // Autoplay cycle (4s with pause on hover)
  useEffect(() => {
    if (isPaused || isDragging) return
    const timer = setInterval(() => {
      goToNext()
    }, 4000)
    return () => clearInterval(timer)
  }, [isPaused, isDragging, goToNext])

  const currentSlide = heroSlidesData[currentSlideIndex]
  const Icon = currentSlide.icon

  // Drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    setDragOffset(e.touches[0].clientX - startX)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    if (dragOffset < -50) {
      goToNext()
    } else if (dragOffset > 50) {
      goToPrev()
    }
    setDragOffset(0)
  }

  return (
    <section
      className="hero hero-slider-section"
      id="top"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false)
        if (isDragging) setIsDragging(false)
      }}
    >
      {/* Dynamic Background Banner Image with Space-Grade Glassmorphic Overlay */}
      <div className="hero-banner-image-backdrop" key={currentSlide.id + '-backdrop'}>
        <img
          src={currentSlide.image}
          alt={currentSlide.title}
          className="hero-banner-img"
        />
        <div className="hero-banner-overlay" />
      </div>

      <HeroCanvas />
      <div className="hero-grid-bg" />
      <div className="hero-glow-sphere" />

      {/* 6 FLOATING SIDE DOTS WITH DOMAIN TOOLTIPS */}
      <div className="hero-side-dots-bar" aria-label="Hero slide indicators">
        {heroSlidesData.map((slide, idx) => {
          const isActive = idx === currentSlideIndex
          return (
            <button
              key={slide.id}
              type="button"
              className={`hero-side-dot ${isActive ? 'active' : ''}`}
              onClick={() => setCurrentSlideIndex(idx)}
              aria-label={`Jump to ${slide.layerTag}`}
            >
              <span className="hero-side-dot-circle" />
              <span className="hero-side-dot-tooltip">
                <span className="tooltip-num">0{idx + 1}</span>
                <span className="tooltip-text">{slide.layerTag.split('(')[0].trim()}</span>
              </span>
            </button>
          )
        })}
      </div>

      {/* MAIN HERO SLIDER DUAL-COLUMN CONTENT LAYOUT */}
      <div
        className="hero-main-layout hero-slide-transition-wrap"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* LEFT COLUMN: CRISP TYPOGRAPHY & STRATEGIC CONTENT */}
        <div className="hero-content hero-slide-animated" key={currentSlide.id}>
          <div className="hero-badge-row">
            <span className="hero-badge">
              <span className="hero-pulse-dot" />
              {currentSlide.pillBadge}
            </span>
            <span className="hero-badge-tag">{currentSlide.layerTag}</span>
          </div>

          <h1 className="hero-title">
            {currentSlide.title} <em>{currentSlide.titleHighlight}</em>
          </h1>

          <p className="hero-copy">
            {currentSlide.copy}
          </p>

          <div className="hero-thesis-pill">
            <div className="thesis-icon-box">
              <Sparkles size={16} />
            </div>
            <span>
              <strong>{currentSlide.thesisHighlight.split(':')[0]}:</strong>
              {currentSlide.thesisHighlight.substring(currentSlide.thesisHighlight.indexOf(':') + 1)}
            </span>
          </div>

          <div className="hero-actions">
            <Link className="button button-primary hero-btn-main" href={currentSlide.primaryCtaLink}>
              <span>{currentSlide.primaryCtaText}</span>
              <ArrowUpRight size={17} />
            </Link>
            <Link className="button button-ghost" href={currentSlide.secondaryCtaLink}>
              <span>{currentSlide.secondaryCtaText}</span>
              <ArrowRight size={17} />
            </Link>
            <Link className="text-link" href="/contact">
              <span>Talk to an Architect</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Minimalist Slide Progress Dots & Arrow Controls */}
          <div className="hero-bottom-controls">
            <div className="hero-indicator-dots">
              {heroSlidesData.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`hero-dot-pill ${idx === currentSlideIndex ? 'active' : ''}`}
                  onClick={() => setCurrentSlideIndex(idx)}
                  aria-label={`Jump to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="hero-slider-nav-arrows">
              <button
                type="button"
                className="hero-arrow-btn"
                onClick={goToPrev}
                aria-label="Previous hero slide"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                className="hero-arrow-btn"
                onClick={goToNext}
                aria-label="Next hero slide"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: HIGH-IMPACT ENTERPRISE BANNER VISUAL SHOWCASE */}
        <div className="hero-aside-banner-card" aria-label="TrustGrid Offering Banner Showcase">
          <div className="banner-card-frame">
            {/* The Main High-Res Thematic Image */}
            <div className="banner-card-image-wrap">
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="banner-card-img"
              />
              <div className="banner-card-glow-overlay" />
              <div className="banner-card-scanline" />
            </div>

            {/* Top Live Domain Status Chip */}
            <div className="banner-card-top-chip">
              <div className="banner-chip-pulse">
                <span className="live-pulse" />
                <span>ACTIVE ENTERPRISE DOMAIN</span>
              </div>
              <span className="banner-chip-domain">{currentSlide.layerTag.split('(')[0].trim()}</span>
            </div>

            {/* Key Capability Chips Overlaid */}
            <div className="banner-card-capabilities-stack">
              {currentSlide.keyFeatures.map((feat, i) => (
                <div key={i} className="banner-capability-pill">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Bottom Glassmorphic Metric Footer */}
            <div className="banner-card-footer">
              <div className="banner-footer-stat-group">
                <div className="banner-footer-stat-value">
                  <Icon size={20} className="banner-stat-icon" />
                  <span>{currentSlide.statMetric}</span>
                </div>
                <span className="banner-footer-stat-label">{currentSlide.statLabel}</span>
              </div>

              <Link
                href={currentSlide.secondaryCtaLink}
                className="banner-footer-action-btn"
                aria-label={`Explore ${currentSlide.layerTag}`}
              >
                <span>View Architecture</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="banner-card-sub-telemetry">
            <span className="sub-telemetry-item">VERIFIABLE</span>
            <span className="sub-telemetry-dot">•</span>
            <span className="sub-telemetry-item">AUTONOMOUS</span>
            <span className="sub-telemetry-dot">•</span>
            <span className="sub-telemetry-item">COMPOUNDING VALUE</span>
          </div>
        </div>
      </div>
    </section>
  )
}

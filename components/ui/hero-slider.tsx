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
  LucideIcon
} from 'lucide-react'
import { HeroCanvas } from '@/components/ui/hero-canvas'
import { AnimatedMetricCard } from '@/components/ui/animated-metric-card'

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
}

export const heroSlidesData: HeroSlideData[] = [
  {
    id: 'infra',
    pillBadge: 'ENTERPRISE AI OPERATING COMPANY',
    layerTag: 'HIGH-DENSITY COMPUTE',
    title: 'From Infrastructure to Intelligence.',
    titleHighlight: 'Engineered for Scale.',
    copy: 'TrustGrid is the engineering and value realization partner that global enterprises trust to design, deploy, secure, and operate the complete AI lifecycle — from high-density GPU factories (30–100kW/rack) and direct-to-chip liquid cooling to low-latency inference serving.',
    thesisHighlight: 'Strategic Core: Purpose-engineered AI Factories delivering maximum intelligence per dollar and watt with 30–70% higher accelerator utilization.',
    primaryCtaText: 'Book an AI Diagnostic',
    primaryCtaLink: '/book-ai-diagnostic',
    secondaryCtaText: 'Explore AI Infra Practice',
    secondaryCtaLink: '/solutions/ai-infra-engineering',
    solutionSlug: 'ai-infra-engineering',
    engineLayerIndex: 0,
    icon: Cpu,
    image: '/images/hero-ai-infra.jpg'
  },
  {
    id: 'agentic',
    pillBadge: 'AUTONOMOUS OPERATIONS PLATFORM',
    layerTag: 'MULTI-AGENT FLEETS',
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
    image: '/images/offering-agentic.jpg'
  },
  {
    id: 'networking',
    pillBadge: 'HIGH-PERFORMANCE AI NETWORKING',
    layerTag: 'LOSSLESS FABRIC',
    title: 'Ultra-Low Latency AI Fabrics.',
    titleHighlight: 'Zero Packet Drops.',
    copy: 'Ultra-low latency, non-blocking InfiniBand and RoCEv2 network fabrics engineered for zero packet loss, rail-optimized node alignment, and autonomous NOC telemetry for massive distributed AI training and inference.',
    thesisHighlight: 'Strategic Core: Eliminating tail jitter and silent network congestion that stall GPU clusters at line speed.',
    primaryCtaText: 'Optimize AI Fabrics',
    primaryCtaLink: '/book-ai-diagnostic?solution=ai-networking',
    secondaryCtaText: 'Explore AI Networking',
    secondaryCtaLink: '/solutions/ai-networking',
    solutionSlug: 'ai-networking',
    engineLayerIndex: 4,
    icon: Network,
    image: '/images/offering-networking.jpg'
  },
  {
    id: 'security',
    pillBadge: 'POST-QUANTUM & AGENT DEFENSE',
    layerTag: 'QUANTUM-SAFE DEFENSE',
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
    image: '/images/offering-security.jpg'
  },
  {
    id: 'trusted',
    pillBadge: 'CONTINUOUS AI GOVERNANCE',
    layerTag: 'EXPLAINABLE & GOVERNED',
    title: 'Explainable, Robust & Governed.',
    titleHighlight: 'Zero Black-Box Risk.',
    copy: 'Rigorous engineering of mathematical explainability (SHAP/LIME), continuous statistical process control (SPC), formal robustness verification, and immutable cryptographic decision audit trails for EU AI Act & NIST AI RMF compliance.',
    thesisHighlight: 'Strategic Core: Guaranteeing board oversight, mathematical verifiability, and regulatory assurance in high-stakes mission-critical workflows.',
    primaryCtaText: 'Verify Trusted AI Posture',
    primaryCtaLink: '/book-ai-diagnostic?solution=trusted-ai-transformation',
    secondaryCtaText: 'Explore Trusted AI',
    secondaryCtaLink: '/solutions/trusted-ai-transformation',
    solutionSlug: 'trusted-ai-transformation',
    engineLayerIndex: 2,
    icon: ShieldCheck,
    image: '/images/offering-trusted-ai.jpg'
  },
  {
    id: 'value',
    pillBadge: 'ECONOMIC VALUE REALIZATION',
    layerTag: 'FINANCIAL ATTRIBUTION',
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
    image: '/images/offering-value.jpg'
  }
]

const engineNodes = [
  { id: 'infra', label: 'Infra Factory', icon: Cpu, desc: 'AI Factories, GPU cluster orchestration & 30–70% utilization gains' },
  { id: 'agents', label: 'Agent Fleets', icon: Bot, desc: 'Industrialized multi-agent DAGs with persistent memory & deterministic execution' },
  { id: 'trust', label: 'Trusted AI', icon: ShieldCheck, desc: 'Continuous assurance, explainability & EU AI Act / NIST governance' },
  { id: 'security', label: 'Quantum-Safe', icon: Lock, desc: 'Zero-trust agent sandboxing, CBOM visibility & post-quantum cryptography' },
  { id: 'networking', label: 'AI Fabrics', icon: Network, desc: 'Ultra-low latency RoCEv2/InfiniBand & congestion-free lossless fabrics' },
  { id: 'value', label: 'Value Eng', icon: TrendingUp, desc: 'TOC, Lean, DMAIC & FinOps tied directly to P&L business impact' }
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

  // Autoplay cycle (5.5s with pause on hover)
  useEffect(() => {
    if (isPaused || isDragging) return
    const timer = setInterval(() => {
      goToNext()
    }, 5500)
    return () => clearInterval(timer)
  }, [isPaused, isDragging, goToNext])

  const currentSlide = heroSlidesData[currentSlideIndex]
  const activeEngineIndex = currentSlide.engineLayerIndex

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

      {/* HERO SLIDER CONTROLS BAR (CLEAN CAROUSEL NAVIGATION) */}
      <div className="hero-slider-tabs-container">
        <div className="hero-slider-dots-wrap">
          <span className="hero-slider-step-badge">
            <span className="hero-pulse-dot" />
            {currentSlide.layerTag}
          </span>
          <div className="hero-slider-dot-indicators">
            {heroSlidesData.map((_, i) => (
              <button
                key={i}
                className={`hero-nav-dot ${i === currentSlideIndex ? 'active' : ''}`}
                onClick={() => setCurrentSlideIndex(i)}
                aria-label={`Jump to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Arrow Controls */}
        <div className="hero-slider-nav-arrows">
          <button
            className="hero-arrow-btn"
            onClick={goToPrev}
            aria-label="Previous hero slide"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            className="hero-arrow-btn"
            onClick={goToNext}
            aria-label="Next hero slide"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* MAIN HERO SLIDER CONTENT LAYOUT */}
      <div
        className="hero-main-layout hero-slide-transition-wrap"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
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
        </div>

        {/* HERO INTERACTIVE OPERATING ENGINE DIAGRAM (SYNCHRONIZED WITH ACTIVE SLIDE) */}
        <div className="hero-aside" aria-label="TrustGrid Operating Engine Interactive Architecture">
          <div className="engine-orbit-canvas">
            <svg className="engine-circuit-svg" viewBox="0 0 440 440" fill="none">
              <circle cx="220" cy="220" r="190" stroke="rgba(29, 92, 255, 0.15)" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="220" cy="220" r="130" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" />
              <circle cx="220" cy="220" r="70" stroke="rgba(29, 92, 255, 0.25)" strokeWidth="1.5" />
              
              <line x1="220" y1="220" x2="220" y2="40" stroke="rgba(29, 92, 255, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="220" y1="220" x2="376" y2="130" stroke="rgba(29, 92, 255, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="220" y1="220" x2="376" y2="310" stroke="rgba(29, 92, 255, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="220" y1="220" x2="220" y2="400" stroke="rgba(29, 92, 255, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="220" y1="220" x2="64" y2="310" stroke="rgba(29, 92, 255, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="220" y1="220" x2="64" y2="130" stroke="rgba(29, 92, 255, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>

            <div className="orbit-core">
              <div className="orbit-core-glow" />
              <span className="orbit-label">TRUSTGRID</span>
              <strong>OPERATING</strong>
              <strong>ENGINE</strong>
              <div className="orbit-status-tag">
                <span className="live-pulse" />
                ACTIVE MESH
              </div>
            </div>

            {engineNodes.map((node, index) => {
              const Icon = node.icon
              const isActive = activeEngineIndex === index
              return (
                <div
                  key={node.id}
                  className={`orbit-node node-${index + 1} ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    const matchedSlideIdx = heroSlidesData.findIndex((s) => s.engineLayerIndex === index)
                    if (matchedSlideIdx !== -1) {
                      setCurrentSlideIndex(matchedSlideIdx)
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${node.label}: ${node.desc}`}
                >
                  <div className="node-icon-wrap">
                    <Icon size={16} />
                  </div>
                  <div className="node-text-wrap">
                    <span className="node-title">{node.label}</span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="engine-telemetry-badge">
            <div className="telemetry-header">
              <span className="telemetry-indicator" />
              <span className="telemetry-title">
                {engineNodes[activeEngineIndex]?.label}
              </span>
              <span className="telemetry-layer">
                ACTIVE DOMAIN
              </span>
            </div>
            <p className="telemetry-desc">
              {engineNodes[activeEngineIndex]?.desc}
            </p>
          </div>

          <span className="orbit-caption">VERIFIABLE • AUTONOMOUS • COMPOUNDING</span>
        </div>
      </div>
    </section>
  )
}

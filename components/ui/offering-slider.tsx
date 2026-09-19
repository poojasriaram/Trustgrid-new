'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Check,
  BarChart3,
  Clock,
  Layers,
  Sparkles,
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
  icon: LucideIcon
  badge: string
  image: string
  problem: string
  solution: string
  deliverables: string[]
  metric: string
  duration: string
}

interface OfferingSliderProps {
  offerings: PrimaryOffering[]
}

export function OfferingSlider({ offerings }: OfferingSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [expandedDeliverables, setExpandedDeliverables] = useState<Record<string, boolean>>({})
  const [isPaused, setIsPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const sliderTrackRef = useRef<HTMLDivElement>(null)

  const total = offerings.length

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total)
  }, [total])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  // Autoplay
  useEffect(() => {
    if (isPaused || isDragging) return
    const timer = setInterval(() => {
      goToNext()
    }, 7000)
    return () => clearInterval(timer)
  }, [isPaused, isDragging, goToNext])

  // Toggle deliverables expand
  const toggleDeliverables = (slug: string) => {
    setExpandedDeliverables((prev) => ({ ...prev, [slug]: !prev[slug] }))
  }

  // Drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const currentX = e.touches[0].clientX
    const diff = currentX - startX
    setDragOffset(diff)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    if (dragOffset < -45) {
      goToNext()
    } else if (dragOffset > 45) {
      goToPrev()
    }
    setDragOffset(0)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const diff = e.clientX - startX
    setDragOffset(diff)
  }

  const handleMouseUp = () => {
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
    <div
      className="offering-slider-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false)
        if (isDragging) setIsDragging(false)
      }}
    >
      {/* Slider Controls Bar */}
      <div className="offering-slider-header">
        <div className="offering-slider-counter">
          <span className="slider-live-label">
            {offerings[currentIndex]?.badge}
          </span>
          <span className="slider-practice-tag">
            {offerings[currentIndex]?.groupTag}
          </span>
        </div>

        {/* Progress Dots */}
        <div className="offering-slider-dots">
          {offerings.map((_, i) => (
            <button
              key={i}
              className={`slider-dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="offering-slider-nav-btns">
          <button
            className="slider-arrow-btn"
            onClick={goToPrev}
            aria-label="Previous offering"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="slider-arrow-btn"
            onClick={goToNext}
            aria-label="Next offering"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Slider Viewport */}
      <div
        className="offering-slider-viewport"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          ref={sliderTrackRef}
          className="offering-slider-track"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
            transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {offerings.map((offering, idx) => {
            const Icon = offering.icon
            const isExpanded = !!expandedDeliverables[offering.slug]
            const isSlideActive = idx === currentIndex

            return (
              <div
                key={offering.slug}
                className={`offering-slide-item ${isSlideActive ? 'slide-active' : ''}`}
              >
                <article className="enhanced-offering-card animated-card">
                  <span className="card-corner-tl" />
                  <span className="card-corner-br" />

                  {/* Top Split: Visual Preview + Summary */}
                  <div className="offering-card-main-split">
                    {/* Visual Media Container with Hover Zoom */}
                    <div className="offering-image-container">
                      <img
                        src={offering.image}
                        alt={offering.title}
                        className="offering-featured-img"
                        loading={idx === 0 ? 'eager' : 'lazy'}
                      />
                      <div className="offering-image-overlay" />
                      
                      <div className="offering-image-badge-floating">
                        <Icon size={16} className="text-cyan-400" />
                        <span>{offering.groupTag}</span>
                      </div>

                      <div className="offering-image-metric-chip">
                        <BarChart3 size={13} className="text-cyan-300" />
                        <span>{offering.metric}</span>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className="offering-content-col">
                      <div className="offering-header-row">
                        <div className="offering-title-wrap">
                          <span className="offering-badge-pill">{offering.badge}</span>
                          <h3 className="offering-heading-title">
                            <Link href={`/solutions/${offering.slug}`}>
                              {offering.title}
                            </Link>
                          </h3>
                        </div>
                      </div>

                      <div className="offering-problem-statement">
                        <span className="problem-label">Buyer Bottleneck:</span>
                        <p>{offering.problem}</p>
                      </div>

                      <p className="offering-solution-summary">
                        {offering.solution}
                      </p>

                      <div className="offering-impact-badges">
                        <div className="impact-pill">
                          <BarChart3 size={14} className="text-blue-500" />
                          <span><strong>Impact:</strong> {offering.metric}</span>
                        </div>
                        <div className="duration-pill">
                          <Clock size={13} className="text-slate-400" />
                          <span><strong>Timeframe:</strong> {offering.duration}</span>
                        </div>
                      </div>

                      {/* Expandable Engineering Deliverables */}
                      <div className="offering-deliverables-section">
                        <button
                          type="button"
                          className="deliverables-toggle-btn"
                          onClick={() => toggleDeliverables(offering.slug)}
                        >
                          <span>{isExpanded ? 'Hide Key Deliverables' : 'View Engineering Deliverables'}</span>
                          <span className="toggle-indicator">{isExpanded ? '−' : '+'}</span>
                        </button>

                        <div className={`deliverables-drawer ${isExpanded ? 'drawer-open' : ''}`}>
                          <ul className="deliverables-grid-list">
                            {offering.deliverables.map((d, dIdx) => (
                              <li key={dIdx} className="deliverable-list-item">
                                <Check size={14} className="text-blue-500 shrink-0" />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Footer CTA Action Group */}
                      <div className="offering-card-actions">
                        <Link
                          href={`/solutions/${offering.slug}`}
                          className="button button-primary button-sm"
                        >
                          <span>Explore {offering.title}</span>
                          <ArrowUpRight size={16} />
                        </Link>
                        <Link
                          href={`/book-ai-diagnostic?solution=${offering.slug}`}
                          className="button button-ghost button-sm"
                        >
                          <span>Audit & Diagnostic</span>
                        </Link>
                        <Link
                          href="/sitemap"
                          className="text-link-subtle ml-auto"
                        >
                          <span>Taxonomy →</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            )
          })}
        </div>
      </div>

      {/* 21st.dev inspired minimal bottom dots & arrows */}
      <div className="flex items-center justify-between pt-5 px-1">
        <div className="text-xs font-semibold text-slate-500">
          Slide <strong>0{currentIndex + 1}</strong> / 0{total}
        </div>
        <div className="flex items-center gap-2">
          {offerings.map((_, i) => (
            <button
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'w-8 bg-blue-600 shadow-xs'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button
            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all shadow-xs"
            onClick={goToPrev}
            aria-label="Previous offering"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all shadow-xs"
            onClick={goToNext}
            aria-label="Next offering"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

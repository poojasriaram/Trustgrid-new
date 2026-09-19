'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Cpu,
  Bot,
  ShieldCheck,
  Lock,
  TrendingUp,
  AlertTriangle,
  ArrowRight
} from 'lucide-react'

export interface MarketGapItem {
  number: string
  name: string
  tagline: string
  description: string
  image: string
  resolution: string
  impactLabel: string
}

interface MarketGapsSliderProps {
  gaps: MarketGapItem[]
}

export function MarketGapsSlider({ gaps }: MarketGapsSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const gapIcons = [Cpu, Bot, ShieldCheck, Lock, TrendingUp]
  const total = gaps.length

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total)
  }, [total])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  // Autoplay cycle
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      handleNext()
    }, 6500)
    return () => clearInterval(timer)
  }, [isPaused, handleNext])

  const current = gaps[activeIndex]
  const Icon = gapIcons[activeIndex] || Cpu

  return (
    <div
      className="market-gaps-slider-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Category Tab Bar */}
      <div className="gaps-tab-header">
        {gaps.map((gap, idx) => {
          const TabIcon = gapIcons[idx] || Cpu
          const isActive = idx === activeIndex
          return (
            <button
              key={gap.name}
              type="button"
              className={`gap-tab-pill ${isActive ? 'active' : ''}`}
              onClick={() => setActiveIndex(idx)}
            >
              <TabIcon size={14} className="tab-icon" />
              <span className="tab-name">{gap.name.replace('The ', '').replace(' Gap', '')}</span>
            </button>
          )
        })}
      </div>

      {/* Main Storytelling Visual Card */}
      <div className="gap-storytelling-card animated-card">
        <span className="card-corner-tl" />
        <span className="card-corner-br" />

        <div className="gap-story-grid">
          {/* Left Column: Problem & Market Context */}
          <div className="gap-problem-column">
            <div className="gap-meta-row">
              <span className="gap-pill-badge">INDUSTRY BOTTLENECK</span>
              <span className="gap-tagline-text">{current.tagline}</span>
            </div>

            <h3 className="gap-main-title">{current.name}</h3>

            <div className="gap-problem-card">
              <div className="problem-flag">
                <AlertTriangle size={15} className="text-amber-500" />
                <span>The Industry Reality & Bottleneck</span>
              </div>
              <p className="problem-text">{current.description}</p>
            </div>

            {/* TrustGrid Resolution Block */}
            <div className="gap-resolution-card">
              <div className="resolution-flag">
                <CheckCircle2 size={16} className="text-blue-500" />
                <span>TrustGrid.AI Engineered Resolution</span>
              </div>
              <p className="resolution-text">{current.resolution}</p>
              
              <div className="resolution-impact-pill">
                <strong>Verifiable Outcome:</strong> {current.impactLabel}
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Visual */}
          <div className="gap-visual-column">
            <div className="gap-image-frame">
              <img
                src={current.image}
                alt={current.name}
                className="gap-featured-visual"
              />
              <div className="gap-visual-gradient" />
              
              <div className="gap-visual-overlay-badge">
                <Icon size={18} className="text-cyan-400" />
                <span>ARCHITECTURAL RESOLUTION</span>
              </div>
            </div>

            {/* Slider Navigation Bar Inside Card */}
            <div className="gap-story-nav">
              <div className="story-nav-counter">
                <span className="text-cyan-400 font-semibold">{current.name.replace('The ', '')}</span>
              </div>

              {/* Little Dots Down Indicator */}
              <div className="flex items-center gap-1.5 px-2">
                {gaps.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeIndex
                        ? 'w-6 bg-cyan-400 shadow-xs'
                        : 'w-1.5 bg-slate-600 hover:bg-slate-400'
                    }`}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Jump to gap ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="story-nav-buttons">
                <button
                  type="button"
                  className="story-nav-btn"
                  onClick={handlePrev}
                  aria-label="Previous gap"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  className="story-nav-btn"
                  onClick={handleNext}
                  aria-label="Next gap"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

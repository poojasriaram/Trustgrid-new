'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  Gauge,
  Workflow
} from 'lucide-react'

export interface PrincipleItem {
  number: string
  title: string
  description: string
}

interface PrinciplesSliderProps {
  principles: PrincipleItem[]
}

const principleIcons = [
  ShieldCheck,
  Cpu,
  Workflow,
  Zap,
  Gauge,
  Layers,
  Sparkles
]

export function PrinciplesSlider({ principles }: PrinciplesSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const total = principles.length

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
    }, 6000)
    return () => clearInterval(timer)
  }, [isPaused, isDragging, goToNext])

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
    if (dragOffset < -40) {
      goToNext()
    } else if (dragOffset > 40) {
      goToPrev()
    }
    setDragOffset(0)
  }

  return (
    <div
      className="principles-slider-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Selector Strip */}
      <div className="principles-nav-strip">
        <div className="principles-pill-tabs">
          {principles.map((item, idx) => {
            const Icon = principleIcons[idx % principleIcons.length]
            const isActive = idx === currentIndex
            return (
              <button
                key={item.title}
                className={`principle-tab-chip ${isActive ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              >
                <Icon size={13} className={isActive ? 'text-blue-500' : 'text-slate-400'} />
                <span className="chip-title">{item.title}</span>
              </button>
            )
          })}
        </div>

        <div className="principles-arrows">
          <button
            className="slider-arrow-btn"
            onClick={goToPrev}
            aria-label="Previous principle"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            className="slider-arrow-btn"
            onClick={goToNext}
            aria-label="Next principle"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Featured Active Principle Spotlight + Grid Preview */}
      <div
        className="principles-viewport"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="principle-spotlight-card animated-card">
          <span className="card-corner-tl" />
          <span className="card-corner-br" />
          
          <div className="spotlight-left">
            <div className="spotlight-badge-row">
              <span className="spotlight-num-tag">OPERATING PRINCIPLE</span>
              <span className="spotlight-dna-tag">CORE DNA</span>
            </div>
            
            <h3 className="spotlight-title">{principles[currentIndex].title}</h3>
            <p className="spotlight-desc">{principles[currentIndex].description}</p>
            
            <div className="spotlight-progress-dots">
              {principles.map((_, i) => (
                <button
                  key={i}
                  className={`spotlight-dot ${i === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to principle ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="spotlight-right-grid">
            <span className="spotlight-grid-label">ALL CORE PRINCIPLES</span>
            <div className="principles-compact-list">
              {principles.map((p, idx) => {
                const Icon = principleIcons[idx % principleIcons.length]
                const isSelected = idx === currentIndex
                return (
                  <div
                    key={p.title}
                    className={`principle-list-row ${isSelected ? 'row-selected' : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                  >
                    <Icon size={15} className={isSelected ? 'text-blue-500' : 'text-slate-400'} />
                    <span className="row-title">{p.title}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

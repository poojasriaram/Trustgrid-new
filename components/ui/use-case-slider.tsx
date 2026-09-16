'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'

export interface UseCaseItem {
  title: string
  description: string
}

interface UseCaseSliderProps {
  useCases: UseCaseItem[]
  solutionTitle?: string
}

export function UseCaseSlider({ useCases, solutionTitle }: UseCaseSliderProps) {
  const [currentIdx, setCurrentIdx] = useState(0)

  const total = useCases.length

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % total)
  }

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + total) % total)
  }

  return (
    <div className="usecase-slider-wrapper">
      <div className="usecase-slider-nav-row">
        <div className="usecase-slider-counter">
          <span className="usecase-status-chip">PRODUCTION CASE STUDY</span>
        </div>

        {/* Quick Jump Dots */}
        <div className="usecase-slider-dots">
          {useCases.map((_, i) => (
            <button
              key={i}
              className={`slider-dot ${i === currentIdx ? 'active' : ''}`}
              onClick={() => setCurrentIdx(i)}
              aria-label={`Jump to use case ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrow Controls */}
        <div className="usecase-slider-arrows">
          <button
            type="button"
            className="slider-arrow-btn"
            onClick={handlePrev}
            aria-label="Previous use case"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            className="slider-arrow-btn"
            onClick={handleNext}
            aria-label="Next use case"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Main Active Use Case Card */}
      <div className="usecase-highlight-card animated-card">
        <span className="card-corner-tl" />
        <span className="card-corner-br" />

        <div className="usecase-card-inner">
          <div className="usecase-meta-head">
            <span className="usecase-badge-tag">VERIFIED CASE STUDY</span>
            {solutionTitle && <span className="usecase-sol-tag">{solutionTitle}</span>}
          </div>

          <h3 className="usecase-highlight-title">{useCases[currentIdx]?.title}</h3>
          <p className="usecase-highlight-desc">{useCases[currentIdx]?.description}</p>

          <div className="usecase-highlights-strip">
            <div className="usecase-feat-pill">
              <CheckCircle2 size={14} className="text-blue-500" />
              <span>Hardened Production Reliability</span>
            </div>
            <div className="usecase-feat-pill">
              <Sparkles size={14} className="text-blue-500" />
              <span>Full SLA & Audit Telemetry</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

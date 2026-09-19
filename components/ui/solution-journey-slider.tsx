'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Layers,
  Users,
  TrendingUp,
  Workflow,
  ShieldCheck,
  Cpu
} from 'lucide-react'

export interface SolutionJourneySlide {
  stageId: string
  stageLabel: string
  title: string
  subtitle: string
  problemText: string
  solutionText: string
  capabilities: string[]
  useCases: string[]
  targetICP: {
    role: string
    focus: string
  }[]
  outcomes: string[]
  ctaText: string
  ctaLink: string
}

interface SolutionJourneySliderProps {
  slides?: SolutionJourneySlide[]
  solutionName?: string
}

export function SolutionJourneySlider({ slides = [], solutionName = 'Enterprise Solution' }: SolutionJourneySliderProps) {
  const [activeIdx, setActiveIdx] = useState(0)

  if (!slides || slides.length === 0) return null

  const current = slides[activeIdx]

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % slides.length)
  }

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="solution-journey-slider-wrapper animated-card">
      <span className="card-corner-tl" />
      <span className="card-corner-br" />

      {/* Quick Stage Selection Tabs */}
      <div className="journey-tabs-header" role="tablist" aria-label="Solution Architecture Journey">
        {slides.map((s, idx) => {
          const isActive = idx === activeIdx
          return (
            <button
              key={s.stageId}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`journey-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveIdx(idx)}
            >
              <span className="journey-tab-label">{s.stageLabel}</span>
              <span className="journey-tab-title">{s.title}</span>
            </button>
          )
        })}
      </div>

      {/* Main Slide Card Content */}
      <div className="journey-slide-body">
        <div className="journey-body-grid">
          {/* Left Column: Problem & Solution Synthesis */}
          <div className="journey-left-col">
            <div className="journey-stage-meta">
              <span className="journey-badge-pill">{current.stageLabel}</span>
              <span className="journey-sol-name">{solutionName}</span>
            </div>

            <h3 className="journey-main-title">{current.title}</h3>
            <p className="journey-subtitle">{current.subtitle}</p>

            {/* Problem Card */}
            <div className="journey-callout-card problem-card">
              <div className="callout-header">
                <AlertTriangle size={15} className="text-amber-500" />
                <span>Enterprise Friction & Problem</span>
              </div>
              <p>{current.problemText}</p>
            </div>

            {/* Solution Card */}
            <div className="journey-callout-card solution-card">
              <div className="callout-header">
                <CheckCircle2 size={15} className="text-blue-500" />
                <span>TrustGrid Engineered Approach</span>
              </div>
              <p>{current.solutionText}</p>
            </div>

            {/* Target Stakeholders / ICP */}
            <div className="journey-icp-box">
              <div className="icp-box-header">
                <Users size={15} className="text-blue-500" />
                <span>Relevant Decision Makers & Stakeholders</span>
              </div>
              <div className="icp-roles-grid">
                {current.targetICP.map((icp, i) => (
                  <div key={i} className="icp-role-pill">
                    <strong>{icp.role}:</strong>
                    <span>{icp.focus}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Capabilities, Use Cases & Outcomes */}
          <div className="journey-right-col">
            {/* Key Capabilities */}
            <div className="journey-detail-block">
              <span className="detail-block-heading">
                <Layers size={14} className="text-blue-500" />
                Core Technical Capabilities
              </span>
              <ul className="journey-check-list">
                {current.capabilities.map((cap, i) => (
                  <li key={i}>
                    <CheckCircle2 size={13} className="text-blue-500 shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enterprise Use Cases */}
            <div className="journey-detail-block">
              <span className="detail-block-heading">
                <Workflow size={14} className="text-cyan-400" />
                Production Use Cases
              </span>
              <ul className="journey-check-list">
                {current.useCases.map((uc, i) => (
                  <li key={i}>
                    <Sparkles size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>{uc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business & Technical Outcomes */}
            <div className="journey-outcomes-box">
              <div className="outcomes-header">
                <TrendingUp size={15} className="text-blue-500" />
                <span>Verifiable Business & Technical Outcomes</span>
              </div>
              <ul className="outcomes-list">
                {current.outcomes.map((out, i) => (
                  <li key={i}>{out}</li>
                ))}
              </ul>
            </div>

            {/* CTA and Navigation Buttons */}
            <div className="journey-actions-row">
              <Link href={current.ctaLink} className="button button-primary button-sm">
                <span>{current.ctaText}</span>
                <ArrowUpRight size={15} />
              </Link>
              
              <div className="journey-nav-arrows ml-auto">
                <button
                  type="button"
                  className="slider-arrow-btn"
                  onClick={handlePrev}
                  aria-label="Previous step"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  className="slider-arrow-btn"
                  onClick={handleNext}
                  aria-label="Next step"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

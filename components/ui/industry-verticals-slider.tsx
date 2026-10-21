'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Building2,
  AlertTriangle,
  Sparkles,
  Layers,
  Users,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
  Cpu
} from 'lucide-react'
import { IndustryDetail, industriesData } from '@/lib/industries-data'

interface IndustryVerticalsSliderProps {
  industries?: IndustryDetail[]
}

export function IndustryVerticalsSlider({ industries = industriesData }: IndustryVerticalsSliderProps) {
  const [activeIdx, setActiveIdx] = useState(0)

  if (!industries || industries.length === 0) return null

  const current = industries[activeIdx]

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % industries.length)
  }

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + industries.length) % industries.length)
  }

  return (
    <div className="industry-verticals-slider-wrapper animated-card">
      <span className="card-corner-tl" />
      <span className="card-corner-br" />

      {/* Industry Tabs Header */}
      <div className="industry-tabs-header-strip" role="tablist" aria-label="Select Vertical Sector">
        {industries.map((ind, idx) => {
          const isActive = idx === activeIdx
          return (
            <button
              key={ind.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`ind-tab-pill ${isActive ? 'active' : ''}`}
              onClick={() => setActiveIdx(idx)}
            >
              <Building2 size={14} />
              <span>{ind.name.split(' ')[0]}</span>
            </button>
          )
        })}
      </div>

      {/* Main Slide Card */}
      <div className="ind-slide-content">
        <div className="ind-slide-grid">
          {/* Left Column: Challenges & Technical Opportunities */}
          <div className="ind-left-panel">
            <div className="ind-meta-tag-row">
              <span className="ind-sector-badge">{current.badge}</span>
              <span className="ind-vertical-name">{current.name}</span>
            </div>

            <h3 className="ind-slide-title">{current.name}</h3>
            <p className="ind-tagline-text">{current.tagline}</p>

            <div className="ind-problem-box">
              <div className="box-title">
                <AlertTriangle size={15} className="text-amber-500" />
                <span>Sector Constraint & Regulatory Bottleneck</span>
              </div>
              <ul className="ind-bullet-list">
                {(current.challenges || []).map((c, i) => (
                  <li key={i}>
                    <span className="bullet-dot" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ind-opportunity-box">
              <div className="box-title">
                <Sparkles size={15} className="text-blue-500" />
                <span>AI & Automation Opportunity</span>
              </div>
              <p>{current.summary}</p>
            </div>

            {/* Stakeholder Involvement */}
            <div className="ind-stakeholders-box">
              <div className="box-title">
                <Users size={14} className="text-cyan-400" />
                <span>Target Stakeholders & Decision Makers</span>
              </div>
              <div className="ind-stakeholders-tags">
                {(current.icp?.decisionMakers || [
                  'Chief Information Officer (CIO)',
                  'Chief Technology Officer (CTO)',
                  'Chief Information Security Officer (CISO)',
                  'Domain Operations Leaders'
                ]).slice(0, 4).map((dm, idx) => (
                  <span key={idx} className="stakeholder-tag">{dm}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Solution Mappings, Use Cases & Outcomes */}
          <div className="ind-right-panel">
            <div className="ind-solutions-section">
              <span className="section-label-chip">
                <Layers size={14} className="text-blue-500" />
                TRUSTGRID.AI Solution Architecture
              </span>
              <div className="solutions-cards-stack">
                {(current.solutionApplications || []).map((app, i) => (
                  <div key={i} className="solution-app-mini-card">
                    <div className="app-card-head">
                      <Cpu size={14} className="text-blue-500" />
                      <strong>{app.solutionTitle}</strong>
                    </div>
                    <ul className="app-uc-list">
                      {(app.useCases || []).map((uc, ucIdx) => (
                        <li key={ucIdx}>
                          <CheckCircle2 size={13} className="text-blue-500 shrink-0 mt-0.5" />
                          <span>{uc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="ind-outcomes-banner">
              <div className="outcomes-title">
                <TrendingUp size={15} className="text-blue-500" />
                <span>Engineered Business & Technical Outcomes</span>
              </div>
              <div className="ind-metrics-pills">
                {(current.statCards?.slice(0, 4) || []).map((m, i) => (
                  <div key={i} className="metric-pill-item">
                    <strong>{m.value}:</strong>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions and Navigation */}
            <div className="ind-actions-footer">
              <Link
                href={`/industries/${current.slug}`}
                className="button button-ghost button-sm"
              >
                <span>View Full Blueprint</span>
                <ArrowUpRight size={13} />
              </Link>
              <Link
                href={`/book-ai-diagnostic?industry=${encodeURIComponent(current.name)}#diagnostic-form-section`}
                className="button button-primary button-sm"
              >
                <span>Schedule Diagnostic</span>
                <ArrowUpRight size={14} />
              </Link>

              <div className="ind-nav-buttons ml-auto">
                <button
                  type="button"
                  className="slider-arrow-btn"
                  onClick={handlePrev}
                  aria-label="Previous industry"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  className="slider-arrow-btn"
                  onClick={handleNext}
                  aria-label="Next industry"
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

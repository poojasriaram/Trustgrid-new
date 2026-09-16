'use client'

import React, { useState } from 'react'
import { CheckCircle2, XCircle, ShieldCheck, Zap, ChevronLeft, ChevronRight } from 'lucide-react'

export interface DifferentiationRow {
  dimension: string
  typical: string
  trustgrid: string
}

interface ComparisonTableProps {
  data: DifferentiationRow[]
}

export function ComparisonTable({ data }: ComparisonTableProps) {
  const [mobileIdx, setMobileIdx] = useState(0)

  const handleNext = () => {
    setMobileIdx((prev) => (prev + 1) % data.length)
  }

  const handlePrev = () => {
    setMobileIdx((prev) => (prev - 1 + data.length) % data.length)
  }

  const currentMobile = data[mobileIdx]

  return (
    <div className="comparison-component-wrapper">
      {/* Desktop Interactive Table View */}
      <div className="diff-table-wrapper animated-card reveal-up desktop-only-table">
        <span className="card-corner-tl" />
        <span className="card-corner-br" />
        <table className="diff-table">
          <thead>
            <tr>
              <th style={{ width: '18%' }}>Engineering Dimension</th>
              <th style={{ width: '38%' }}>
                <div className="th-header-cell">
                  <span>Typical AI Vendors / Consultants</span>
                </div>
              </th>
              <th style={{ width: '44%' }}>
                <div className="th-header-cell tg-highlight-cell">
                  <ShieldCheck size={16} className="text-cyan-400" />
                  <span>TrustGrid Operating Company</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={row.dimension} className="diff-row-hover">
                <td className="diff-dim">
                  <div className="dim-cell-inner">
                    <span className="dim-index">0{idx + 1}</span>
                    <strong>{row.dimension}</strong>
                  </div>
                </td>
                <td className="diff-typical">
                  <div className="diff-typical-content">
                    <XCircle size={15} className="text-slate-400 shrink-0 mt-0.5" />
                    <span>{row.typical}</span>
                  </div>
                </td>
                <td className="diff-tg">
                  <div className="diff-tg-content">
                    <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
                    <span>{row.trustgrid}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Swipeable Comparison Cards View */}
      <div className="mobile-comparison-container">
        <div className="mobile-diff-nav">
          <div className="mobile-diff-counter">
            <span>0{mobileIdx + 1}</span>
            <span className="slash">/</span>
            <span>0{data.length}</span>
            <span className="diff-active-label">{currentMobile.dimension}</span>
          </div>

          <div className="mobile-diff-buttons">
            <button
              type="button"
              className="diff-nav-btn"
              onClick={handlePrev}
              aria-label="Previous dimension"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="diff-nav-btn"
              onClick={handleNext}
              aria-label="Next dimension"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="mobile-diff-card animated-card">
          <span className="card-corner-tl" />
          <span className="card-corner-br" />

          <div className="mobile-diff-header">
            <span className="mobile-diff-num">DIMENSION 0{mobileIdx + 1}</span>
            <h4 className="mobile-diff-title">{currentMobile.dimension}</h4>
          </div>

          {/* Typical */}
          <div className="mobile-typical-box">
            <div className="typical-label-row">
              <XCircle size={15} className="text-slate-400" />
              <span>Typical AI Vendors / Consultants:</span>
            </div>
            <p>{currentMobile.typical}</p>
          </div>

          {/* TrustGrid */}
          <div className="mobile-tg-box">
            <div className="tg-label-row">
              <CheckCircle2 size={16} className="text-blue-500" />
              <span>TrustGrid Operating Company:</span>
            </div>
            <p>{currentMobile.trustgrid}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react'

interface CaseStudyCardProps {
  variant?: 'featured' | 'standard'
  className?: string
}

export function MedicalSuppliesCaseStudyCard({
  variant = 'featured',
  className = ''
}: CaseStudyCardProps) {
  const tags = [
    'Generative AI',
    'Computer Vision',
    'Regulatory AI',
    'Supply Chain',
    'Warranty Automation'
  ]

  return (
    <div
      className={`medical-case-study-card animated-card reveal-up ${variant === 'featured' ? 'featured-spotlight' : ''} ${className}`}
    >
      <div className="card-header-bar">
        <div className="industry-badge">
          <span className="pulse-dot" />
          <span>Medical Supplies & Manufacturing</span>
        </div>
        <span className="case-study-eyebrow">GLOBAL CASE STUDY</span>
      </div>

      <div className="card-body">
        <div className="card-content-main">
          <div className="title-area">
            <h3 className="card-title">
              <span className="title-eyebrow">GLOBAL CASE STUDY</span>
              Medical Supplies & Manufacturing
            </h3>
            <p className="card-subtitle">
              End-to-End AI Automation in Medical Supplies Packaging, Regulatory Labeling, Supply Chain Inspection & Warranty Management
            </p>
          </div>

          <p className="card-description">
            How TRUSTGRID.AI combines Generative AI, RAG, Edge Computer Vision, dynamic regulatory labeling, and agentic warranty automation to transform global compliance, quality verification, supply chain inspection, and claim adjudication.
          </p>

          <div className="card-tags-row">
            {tags.map((tag, idx) => (
              <span key={idx} className="cs-tag-pill">
                {tag}
              </span>
            ))}
          </div>

          <div className="card-metrics-preview">
            <div className="mini-metric">
              <span className="metric-val">3 Days</span>
              <span className="metric-lbl">T&C Lead Time (vs 3-4 Wks)</span>
            </div>
            <div className="mini-metric">
              <span className="metric-val">300%</span>
              <span className="metric-lbl">Velocity Increase</span>
            </div>
            <div className="mini-metric">
              <span className="metric-val">90%</span>
              <span className="metric-lbl">Return & Recall Drop</span>
            </div>
            <div className="mini-metric">
              <span className="metric-val">99.9%</span>
              <span className="metric-lbl">License Defect Prevention</span>
            </div>
          </div>
        </div>

        <div className="card-visual-column">
          <div className="image-wrap">
            <img
              src="/images/case-study-medical-packaging.jpg"
              alt="Medical Supplies AI Packaging Automation & Inspection"
              className="card-feature-img"
            />
            <div className="img-overlay-badge">
              <ShieldCheck size={14} />
              <span>FDA • ANVISA • CDSCO Validated</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card-footer-action">
        <Link
          href="/case-studies/medical-supplies-ai"
          className="button button-primary button-md"
          id="btn-view-medical-case-study"
        >
          <span>View Case Study</span>
          <ArrowRight size={16} />
        </Link>
        <span className="footer-subtext">Enterprise Transformation • Full Architecture & KPI Breakdown</span>
      </div>
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ChevronDown
} from 'lucide-react'
import { strategicClustersData, StrategicCluster } from '@/lib/strategic-clusters-data'

interface AiInfraMegaMenuProps {
  onNavigate?: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
  onClose?: () => void
}

export function AiInfraMegaMenu({ onNavigate, onClose }: AiInfraMegaMenuProps) {
  const [selectedClusterIndex, setSelectedClusterIndex] = useState<number>(0)
  const activeCluster: StrategicCluster = strategicClustersData[selectedClusterIndex] || strategicClustersData[0]

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      onNavigate(e, href)
    }
  }

  return (
    <div
      className="isi-mega-panel isi-mega-v5-infra"
      role="region"
      aria-label="AI Infrastructure & Data Center Mega Menu"
    >
      {/* 2-Column Split: Strategic Clusters (Left) + Services Grid (Right) */}
      <div className="v5-mega-layout">
        {/* LEFT COLUMN: 5 STRATEGIC CLUSTERS */}
        <div
          className="v5-mega-clusters-nav"
          role="tablist"
          aria-label="Five Strategic AI Infrastructure Clusters"
        >
          <div className="v5-clusters-header">
            <span className="v5-clusters-badge">
              <span className="v5-pulse-dot" />
              V5 STRATEGIC ARCHITECTURE
            </span>
            <span className="v5-clusters-count">5 Clusters</span>
          </div>

          <div className="v5-clusters-list">
            {strategicClustersData.map((cluster, idx) => {
              const isActive = idx === selectedClusterIndex
              const ClusterIcon = cluster.icon

              return (
                <div
                  key={cluster.id}
                  role="tab"
                  tabIndex={0}
                  aria-selected={isActive}
                  id={`cluster-tab-${cluster.id}`}
                  aria-controls={`cluster-panel-${cluster.id}`}
                  className={`v5-cluster-item ${isActive ? 'cluster-active' : ''}`}
                  onMouseEnter={() => setSelectedClusterIndex(idx)}
                  onClick={() => setSelectedClusterIndex(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelectedClusterIndex(idx)
                    }
                  }}
                >
                  <div className="v5-cluster-num-box">
                    <span className="v5-cluster-num">{cluster.number}</span>
                  </div>

                  <div className="v5-cluster-text-wrap">
                    <div className="v5-cluster-title-row">
                      <span className="v5-cluster-title">{cluster.title}</span>
                      <ChevronRight size={14} className="v5-cluster-chevron" />
                    </div>
                    <p className="v5-cluster-desc">{cluster.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: SERVICES / OFFERINGS GRID */}
        <div
          className="v5-mega-services-panel"
          role="tabpanel"
          id={`cluster-panel-${activeCluster.id}`}
          aria-labelledby={`cluster-tab-${activeCluster.id}`}
        >
          {/* Active Cluster Header Summary */}
          <div className="v5-services-header">
            <div className="v5-services-header-left">
              <div className="v5-services-badge-row">
                <span className="v5-services-cluster-tag">CLUSTER {activeCluster.number}</span>
                <span className="v5-services-cluster-name">{activeCluster.title}</span>
              </div>
              <p className="v5-services-cluster-summary">{activeCluster.description}</p>
            </div>
            
            <Link
              href={activeCluster.ctaHref}
              className="v5-services-cluster-cta-top"
              onClick={(e) => handleClick(e, activeCluster.ctaHref)}
            >
              <span>{activeCluster.ctaText}</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* 3-Column Service Cards Grid */}
          <div className="v5-services-grid">
            {activeCluster.services.map((service, sIdx) => {
              const ServiceIcon = service.icon
              return (
                <Link
                  key={sIdx}
                  href={service.href}
                  className="v5-service-card"
                  onClick={(e) => handleClick(e, service.href)}
                >
                  <div className="v5-service-icon-box">
                    <ServiceIcon size={16} />
                  </div>
                  <div className="v5-service-body">
                    <div className="v5-service-title-row">
                      <span className="v5-service-title">{service.title}</span>
                      <ArrowRight size={13} className="v5-service-arrow" />
                    </div>
                    <p className="v5-service-desc">{service.desc}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* FULL-WIDTH FOOTER STRIP */}
      <div className="v5-mega-footer-strip">
        <div className="v5-footer-statement">
          <Sparkles size={14} className="text-blue-600 shrink-0" />
          <span>Full-stack engineering accountability from power delivery to token delivery</span>
        </div>

        <div className="v5-footer-actions">
          <Link
            href={activeCluster.ctaHref}
            className="v5-footer-cluster-btn"
            onClick={(e) => handleClick(e, activeCluster.ctaHref)}
          >
            <span>{activeCluster.ctaText}</span>
            <ArrowRight size={13} />
          </Link>

          <Link
            href="/book-ai-diagnostic?solution=ai-infra-engineering#diagnostic-form-section"
            className="v5-footer-primary-cta"
            onClick={(e) => handleClick(e, '/book-ai-diagnostic?solution=ai-infra-engineering#diagnostic-form-section')}
          >
            <span>Book AI Diagnostic Assessment</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}

/**
 * Mobile Accordion Component for AI Infra & Data Center in the Mobile Drawer
 */
export function MobileAiInfraAccordion({
  onNavigate,
  onClose
}: {
  onNavigate?: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
  onClose?: () => void
}) {
  const [expandedCluster, setExpandedCluster] = useState<string | null>('infrastructure-build')

  const toggleCluster = (id: string) => {
    setExpandedCluster(expandedCluster === id ? null : id)
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      onNavigate(e, href)
    }
  }

  return (
    <div className="v5-mobile-accordion-wrap">
      <Link
        href="/solutions/ai-infra-engineering"
        className="mobile-sublink font-bold text-blue-700 pb-2 mb-2 border-b border-slate-200 block"
        onClick={(e) => handleClick(e, '/solutions/ai-infra-engineering')}
      >
        <span>AI Infra Blueprint Overview →</span>
      </Link>

      <div className="v5-mobile-cluster-list">
        {strategicClustersData.map((cluster) => {
          const isExpanded = expandedCluster === cluster.id

          return (
            <div key={cluster.id} className="v5-mobile-cluster-group">
              <button
                type="button"
                className={`v5-mobile-cluster-btn ${isExpanded ? 'active' : ''}`}
                onClick={() => toggleCluster(cluster.id)}
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-2">
                  <span className="v5-mobile-cluster-num">{cluster.number}</span>
                  <span className="v5-mobile-cluster-title">{cluster.title}</span>
                </div>
                <ChevronDown size={14} className={`v5-mobile-chevron ${isExpanded ? 'rotate-180' : ''}`} />
              </button>

              {isExpanded && (
                <div className="v5-mobile-cluster-body">
                  <p className="v5-mobile-cluster-desc">{cluster.description}</p>
                  
                  <div className="v5-mobile-services-list">
                    {cluster.services.map((svc, sIdx) => {
                      const SvcIcon = svc.icon
                      return (
                        <Link
                          key={sIdx}
                          href={svc.href}
                          className="v5-mobile-service-item"
                          onClick={(e) => handleClick(e, svc.href)}
                        >
                          <div className="v5-mobile-service-icon">
                            <SvcIcon size={14} />
                          </div>
                          <div className="v5-mobile-service-text">
                            <span className="v5-mobile-service-title">{svc.title}</span>
                            <span className="v5-mobile-service-desc">{svc.desc}</span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>

                  <Link
                    href={cluster.ctaHref}
                    className="v5-mobile-cluster-action"
                    onClick={(e) => handleClick(e, cluster.ctaHref)}
                  >
                    <span>{cluster.ctaText} →</span>
                  </Link>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

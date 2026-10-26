'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Building2,
  Zap,
  Activity,
  TrendingUp,
  ShieldCheck,
  Compass,
  Layers,
  Flame,
  BarChart3,
  Network,
  Server,
  Workflow,
  Boxes,
  Globe2,
  Cpu
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { strategicClustersData, StrategicCluster, StrategicServiceItem } from '@/lib/strategic-clusters-data'

interface AiInfraMegaMenuProps {
  onNavigate?: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
  onClose?: () => void
}

interface ClusterCategory {
  title: string
  badge: string
  icon: LucideIcon
  items: StrategicServiceItem[]
}

function getClusterCategories(cluster: StrategicCluster): ClusterCategory[] {
  const categoryMap: Record<string, { title: string; badge: string; icon: LucideIcon }[]> = {
    'infrastructure-build': [
      { title: 'Site & Architecture', badge: 'L1 PLANNING', icon: Compass },
      { title: 'Fit-Out & Retrofit', badge: 'FACILITIES', icon: Layers },
      { title: 'Engineering & QA', badge: 'GOVERNANCE', icon: ShieldCheck }
    ],
    'power-cooling': [
      { title: 'Power & Resiliency', badge: 'SUBSTATION & UPS', icon: Zap },
      { title: 'Liquid Cooling', badge: 'DLC & IMMERSION', icon: Flame },
      { title: 'Thermal Efficiency', badge: 'PUE < 1.15', icon: BarChart3 }
    ],
    'datacenter-operations': [
      { title: 'Network & Cloud Ops', badge: 'NETOPS & DCI', icon: Network },
      { title: 'Hardware & Facility', badge: 'CRITICAL OPS', icon: Server },
      { title: 'AIOps & Autonomy', badge: 'SELF-HEALING', icon: Workflow }
    ],
    'sales-revenue-acceleration': [
      { title: 'Wholesale & Campuses', badge: 'HYPERSCALE MW', icon: Building2 },
      { title: 'Interconnect & Attach', badge: 'ECOSYSTEM', icon: Network },
      { title: 'Commercial Strategy', badge: 'TOKEN ECONOMICS', icon: TrendingUp }
    ],
    'strategic-advisory': [
      { title: 'Finance & Delivery', badge: 'DBOT & PPAS', icon: Boxes },
      { title: 'Security & Gateways', badge: 'SOVEREIGNTY', icon: ShieldCheck },
      { title: 'Economics & Policy', badge: 'GOVERNANCE', icon: Globe2 }
    ]
  }

  const defaultMeta = [
    { title: 'Architecture & Design', badge: 'FOUNDATION', icon: Layers },
    { title: 'Systems & Compute', badge: 'ACCELERATION', icon: Cpu },
    { title: 'Lifecycle & Operations', badge: 'OPERATIONS', icon: Activity }
  ]

  const meta = categoryMap[cluster.id] || defaultMeta
  const services = cluster.services || []

  return [
    {
      title: meta[0].title,
      badge: meta[0].badge,
      icon: meta[0].icon,
      items: services.slice(0, 3)
    },
    {
      title: meta[1].title,
      badge: meta[1].badge,
      icon: meta[1].icon,
      items: services.slice(3, 6)
    },
    {
      title: meta[2].title,
      badge: meta[2].badge,
      icon: meta[2].icon,
      items: services.slice(6, 9)
    }
  ]
}

export function AiInfraMegaMenu({ onNavigate, onClose }: AiInfraMegaMenuProps) {
  const [selectedClusterIndex, setSelectedClusterIndex] = useState<number>(0)
  const activeCluster: StrategicCluster = strategicClustersData[selectedClusterIndex] || strategicClustersData[0]
  const ActiveIcon = activeCluster.icon
  const categories = getClusterCategories(activeCluster)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      onNavigate(e, href)
    }
  }

  return (
    <div
      className="isi-mega-panel isi-mega-infra isi-mega-practice-areas tg-tabbed-mega"
      role="region"
      aria-label="AI Infrastructure Mega Menu"
    >
      <div className="isi-mega-layout">
        {/* Left Side Bar: Clean Main Menu Only */}
        <div className="isi-mega-sidebar tg-clean-sidebar">
          <div className="tg-sidebar-domain-switch" role="tablist" aria-label="AI Infrastructure Clusters">
            {strategicClustersData.map((sec, idx) => {
              const SecIcon = sec.icon
              const isActive = selectedClusterIndex === idx
              return (
                <button
                  key={sec.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`tg-domain-tab-btn ${isActive ? 'active-networking' : ''}`}
                  onClick={() => setSelectedClusterIndex(idx)}
                  onMouseEnter={() => setSelectedClusterIndex(idx)}
                >
                  <div className="tg-domain-tab-left">
                    <div
                      className={`tg-tab-icon-box ${isActive ? 'tg-icon-net' : ''}`}
                      style={!isActive ? { background: '#f1f5f9', color: '#64748b' } : undefined}
                    >
                      <SecIcon size={14} />
                    </div>
                    <span className="tg-tab-title">{sec.title}</span>
                  </div>
                  <ChevronRight size={12} className="tg-tab-chevron" />
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Structured Submenus Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#ffffff', minWidth: 0 }}>
          {/* Active Section Header Bar */}
          <div
            style={{
              padding: '6px 14px',
              borderBottom: '1px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
              background: '#fafafa'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '5px',
                  background: 'rgba(37, 99, 235, 0.1)',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <ActiveIcon size={13} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <h4 style={{ margin: 0, fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>
                    {activeCluster.title}
                  </h4>
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      color: '#2563eb',
                      background: 'rgba(37, 99, 235, 0.08)',
                      padding: '1px 5px',
                      borderRadius: '4px'
                    }}
                  >
                    CLUSTER {activeCluster.number}
                  </span>
                </div>
                <p style={{ margin: '1px 0 0', fontSize: '10.5px', color: '#64748b', lineHeight: 1.25 }}>
                  {activeCluster.description}
                </p>
              </div>
            </div>

            <Link
              href={activeCluster.ctaHref}
              className="isi-footer-action"
              style={{ fontSize: '10.5px', padding: '3px 8px', flexShrink: 0 }}
              onClick={(e) => handleClick(e, activeCluster.ctaHref)}
            >
              <span>{activeCluster.ctaText}</span>
              <ArrowRight size={11} />
            </Link>
          </div>

          {/* 3 Categorized Columns */}
          <div
            style={{
              padding: '8px 12px',
              overflowY: 'auto',
              flex: 1,
              display: 'flex'
            }}
          >
            <div className="tg-thematic-columns-3" style={{ width: '100%' }}>
              {categories.map((cat, cIdx) => {
                const CatIcon = cat.icon
                return (
                  <div key={cIdx} className="tg-category-col">
                    <div className="tg-category-col-header">
                      <div className="tg-category-col-left">
                        <CatIcon size={12} className="text-blue-600" />
                        <span className="tg-category-col-title">{cat.title}</span>
                      </div>
                      <span className="tg-category-col-badge">{cat.badge}</span>
                    </div>

                    <div className="tg-category-items-stack">
                      {cat.items.map((item, iIdx) => {
                        const ItemIcon = item.icon
                        return (
                          <Link
                            key={iIdx}
                            href={item.href}
                            className="tg-compact-menu-card"
                            title={item.desc || item.title}
                            onClick={(e) => handleClick(e, item.href)}
                          >
                            <div className="tg-compact-icon-box">
                              <ItemIcon size={13} />
                            </div>
                            <div className="tg-compact-card-body">
                              <div className="tg-compact-card-head">
                                <span className="tg-compact-card-title">{item.title}</span>
                                <ArrowRight size={11} className="tg-compact-arrow" />
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mega-Menu Footer */}
      <div className="isi-mega-footer">
        <div className="isi-footer-badge">
          <Sparkles size={13} className="text-blue-600" />
          <span>Full-stack engineering accountability from power delivery to token delivery</span>
        </div>
        <Link
          href="/solutions/ai-infra-engineering"
          className="isi-footer-action"
          onClick={(e) => handleClick(e, '/solutions/ai-infra-engineering')}
        >
          <span>Explore AI Infrastructure Blueprint</span>
          <ArrowUpRight size={13} />
        </Link>
      </div>
    </div>
  )
}

/**
 * Mobile Accordion Component for AI Infra & Data Center in the Mobile Drawer
 * Conforms to the standard mobile accordion pattern
 */
export function MobileAiInfraAccordion({
  onNavigate,
  onClose
}: {
  onNavigate?: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
  onClose?: () => void
}) {
  const [mobileOpenGroups, setMobileOpenGroups] = useState<Record<string, boolean>>({
    'infrastructure-build': true
  })

  const toggleGroup = (id: string) => {
    setMobileOpenGroups((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      onNavigate(e, href)
    }
  }

  return (
    <div>
      <Link
        href="/solutions/ai-infra-engineering"
        className="mobile-sublink font-semibold text-blue-600 mb-1"
        onClick={(e) => handleClick(e, '/solutions/ai-infra-engineering')}
      >
        <span>★ AI Infra Blueprint Overview →</span>
      </Link>

      {strategicClustersData.map((cluster) => {
        const ClusterIcon = cluster.icon
        const isOpen = !!mobileOpenGroups[cluster.id]

        return (
          <div key={cluster.id} className="mobile-group-wrapper">
            <button
              type="button"
              className="mobile-group-accordion-btn"
              onClick={() => toggleGroup(cluster.id)}
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-2 min-w-0">
                <ClusterIcon size={12} className="text-blue-600 shrink-0" />
                <span className="truncate">{cluster.title}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="mobile-group-count">{cluster.services.length}</span>
                <ChevronDown
                  size={12}
                  className={`chevron-icon transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </div>
            </button>

            {isOpen && (
              <div className="mobile-group-body">
                {cluster.services.map((item, i) => {
                  const ItemIcon = item.icon
                  return (
                    <Link
                      key={i}
                      href={item.href}
                      className="mobile-cap-card"
                      onClick={(e) => handleClick(e, item.href)}
                    >
                      <div className="mobile-cap-icon">
                        <ItemIcon size={12} />
                      </div>
                      <div className="mobile-cap-info">
                        <span className="mobile-cap-title">{item.title}</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

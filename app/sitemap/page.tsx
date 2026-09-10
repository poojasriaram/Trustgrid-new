'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Search,
  Layers,
  Sparkles,
  Cpu,
  Bot,
  ShieldCheck,
  Lock,
  Network,
  TrendingUp,
  Building2,
  CheckCircle2,
  Filter,
  ExternalLink,
  Code2,
  Terminal,
  Compass,
  FileCheck,
  Share2
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { siteMapV14 } from '@/lib/sitemap-v14-data'

const groupIcons: Record<string, typeof Cpu> = {
  'group-1': Bot,
  'group-2': Cpu,
  'group-3': Network,
  'group-4': Lock,
  'group-5': ShieldCheck,
  'group-6': TrendingUp,
}

export default function SiteMapV14Page() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGroup, setSelectedGroup] = useState<string>('all')
  const [expandedOfferings, setExpandedOfferings] = useState<Record<string, boolean>>({})

  const toggleOffering = (id: string) => {
    setExpandedOfferings((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const expandAll = () => {
    const allIds: Record<string, boolean> = {}
    siteMapV14.groups.forEach((g) => {
      g.solutionAreas.forEach((sa) => {
        sa.engineeringAreas.forEach((ea) => {
          ea.offerings.forEach((o) => {
            allIds[o.id] = true
          })
        })
      })
    })
    setExpandedOfferings(allIds)
  }

  const collapseAll = () => {
    setExpandedOfferings({})
  }

  // Filtered groups based on search & group selection
  const filteredGroups = useMemo(() => {
    return siteMapV14.groups
      .filter((group) => selectedGroup === 'all' || group.id === selectedGroup)
      .map((group) => {
        if (!searchQuery.trim()) return group

        const query = searchQuery.toLowerCase()
        const matchingSolutionAreas = group.solutionAreas
          .map((sa) => {
            const matchingEAs = sa.engineeringAreas
              .map((ea) => {
                const matchingOfferings = ea.offerings.filter((o) => {
                  const titleMatch = o.title.toLowerCase().includes(query)
                  const subMatch = o.subOfferings.some((s) => s.toLowerCase().includes(query))
                  const delivMatch = o.deliverables?.some((d) => d.toLowerCase().includes(query))
                  const techMatch = o.techStack?.some((t) => t.toLowerCase().includes(query))
                  return titleMatch || subMatch || delivMatch || techMatch
                })

                const eaMatches =
                  ea.title.toLowerCase().includes(query) ||
                  (ea.description && ea.description.toLowerCase().includes(query))

                if (matchingOfferings.length > 0 || eaMatches) {
                  return {
                    ...ea,
                    offerings: matchingOfferings.length > 0 ? matchingOfferings : ea.offerings
                  }
                }
                return null
              })
              .filter(Boolean) as typeof sa.engineeringAreas

            const saMatches =
              sa.title.toLowerCase().includes(query) ||
              (sa.subtitle && sa.subtitle.toLowerCase().includes(query))

            if (matchingEAs.length > 0 || saMatches) {
              return {
                ...sa,
                engineeringAreas: matchingEAs.length > 0 ? matchingEAs : sa.engineeringAreas
              }
            }
            return null
          })
          .filter(Boolean) as typeof group.solutionAreas

        const groupMatches =
          group.title.toLowerCase().includes(query) ||
          (group.description && group.description.toLowerCase().includes(query)) ||
          (group.mapping && group.mapping.toLowerCase().includes(query))

        if (matchingSolutionAreas.length > 0 || groupMatches) {
          return {
            ...group,
            solutionAreas: matchingSolutionAreas.length > 0 ? matchingSolutionAreas : group.solutionAreas
          }
        }
        return null
      })
      .filter(Boolean) as typeof siteMapV14.groups
  }, [searchQuery, selectedGroup])

  const totalOfferingsCount = useMemo(() => {
    let count = 0
    siteMapV14.groups.forEach((g) => {
      g.solutionAreas.forEach((sa) => {
        sa.engineeringAreas.forEach((ea) => {
          count += ea.offerings.length
        })
      })
    })
    return count
  }, [])

  return (
    <main className="page-wrapper">
      <SiteHeader />

      {/* HERO SECTION */}
      <section className="sitemap-hero">
        <div className="sitemap-hero-container">
          <div className="sitemap-badge-row">
            <span className="sitemap-badge">
              <Sparkles size={13} className="text-blue-400" />
              <span>CONTENT MODEL v{siteMapV14.version}</span>
            </span>
            <span className="sitemap-badge-sub">5 LEVELS DEEP • COMPLETE TAXONOMY</span>
          </div>

          <h1 className="sitemap-hero-title">
            Enterprise AI Architecture & Engineering Site Map
          </h1>

          <p className="sitemap-hero-desc">
            The comprehensive hierarchical content model spanning <strong>6 Core Groups</strong>,{' '}
            <strong>8 Solution Areas</strong>, <strong>18 Engineering Areas</strong>, and{' '}
            <strong>{totalOfferingsCount} Production Offerings</strong> with granular deliverables and technology stacks.
          </p>

          {/* HIERARCHY PILL TRAIL */}
          <div className="sitemap-trail-bar">
            <div className="sitemap-trail-node">
              <span className="trail-lvl">L1</span>
              <span className="trail-txt">Group</span>
            </div>
            <ChevronRight size={14} className="trail-arrow" />
            <div className="sitemap-trail-node">
              <span className="trail-lvl">L2</span>
              <span className="trail-txt">Solution Area</span>
            </div>
            <ChevronRight size={14} className="trail-arrow" />
            <div className="sitemap-trail-node">
              <span className="trail-lvl">L3</span>
              <span className="trail-txt">Engineering Area</span>
            </div>
            <ChevronRight size={14} className="trail-arrow" />
            <div className="sitemap-trail-node">
              <span className="trail-lvl">L4</span>
              <span className="trail-txt">Offering</span>
            </div>
            <ChevronRight size={14} className="trail-arrow" />
            <div className="sitemap-trail-node">
              <span className="trail-lvl">L5</span>
              <span className="trail-txt">Sub-Offering / Deliverables / Tech Stack</span>
            </div>
          </div>

          {/* SEARCH & FILTER CONTROLS */}
          <div className="sitemap-controls-box">
            <div className="sitemap-search-input-wrap">
              <Search size={18} className="sitemap-search-icon" />
              <input
                type="text"
                className="sitemap-search-input"
                placeholder="Search across all 5 levels (e.g. CUDA, PQC, RoCEv2, Jidoka, FinOps, LEO, SHAP)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="sitemap-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="sitemap-filter-row">
              <div className="sitemap-group-filters">
                <button
                  className={`sitemap-filter-btn ${selectedGroup === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedGroup('all')}
                >
                  All Groups
                </button>
                {siteMapV14.groups.map((g) => (
                  <button
                    key={g.id}
                    className={`sitemap-filter-btn ${selectedGroup === g.id ? 'active' : ''}`}
                    onClick={() => setSelectedGroup(g.id)}
                  >
                    {g.number}
                  </button>
                ))}
              </div>

              <div className="sitemap-view-toggles">
                <button className="sitemap-toggle-btn" onClick={expandAll}>
                  Expand All
                </button>
                <button className="sitemap-toggle-btn" onClick={collapseAll}>
                  Collapse All
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT MODEL HIERARCHY TREE */}
      <section className="sitemap-content-section">
        <div className="sitemap-container">
          {filteredGroups.length === 0 ? (
            <div className="sitemap-empty-state">
              <Compass size={40} className="empty-icon" />
              <h3>No matching capabilities found</h3>
              <p>Try searching for a different keyword like "InfiniBand", "Kyber", "AgentOps", "Hoshin", or reset filters.</p>
              <button
                className="button button-primary"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedGroup('all')
                }}
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="sitemap-groups-list">
              {filteredGroups.map((group) => {
                const GroupIcon = groupIcons[group.id] || Layers

                return (
                  <div key={group.id} className="sitemap-group-card" id={group.id}>
                    {/* LEVEL 1: GROUP HEADER */}
                    <div className="group-card-header">
                      <div className="group-badge-line">
                        <span className="lvl-badge l1-badge">L1 GROUP</span>
                        <span className="group-num-tag">{group.number}</span>
                        {group.mapping && (
                          <span className="group-mapping-tag">Maps to: {group.mapping}</span>
                        )}
                      </div>
                      <div className="group-title-row">
                        <div className="group-icon-wrapper">
                          <GroupIcon size={24} />
                        </div>
                        <div>
                          <h2 className="group-title">{group.title}</h2>
                          {group.description && <p className="group-desc">{group.description}</p>}
                        </div>
                      </div>
                    </div>

                    {/* LEVEL 2: SOLUTION AREAS */}
                    <div className="solution-areas-container">
                      {group.solutionAreas.map((sa) => (
                        <div key={sa.id} className="solution-area-block" id={sa.id}>
                          <div className="solution-area-header">
                            <div className="sa-title-meta">
                              <span className="lvl-badge l2-badge">L2 SOLUTION AREA</span>
                              <span className="sa-code">{sa.code}</span>
                            </div>
                            <div className="sa-heading-row">
                              <h3 className="sa-title">{sa.title}</h3>
                              <Link
                                href={`/solutions/${sa.slug}`}
                                className="sa-explore-link"
                              >
                                <span>Solution Deep-Dive</span>
                                <ArrowUpRight size={14} />
                              </Link>
                            </div>
                            {sa.subtitle && <p className="sa-subtitle">{sa.subtitle}</p>}
                          </div>

                          {/* LEVEL 3: ENGINEERING AREAS */}
                          <div className="engineering-areas-grid">
                            {sa.engineeringAreas.map((ea) => (
                              <div key={ea.id} className="engineering-area-card" id={ea.id}>
                                <div className="ea-header">
                                  <div className="ea-code-badge">
                                    <span className="lvl-badge l3-badge">L3</span>
                                    <span className="ea-code-txt">{ea.code}</span>
                                  </div>
                                  <h4 className="ea-title">{ea.title}</h4>
                                </div>
                                {ea.description && <p className="ea-desc">{ea.description}</p>}

                                {/* LEVEL 4: OFFERINGS */}
                                <div className="offerings-list">
                                  {ea.offerings.map((offering) => {
                                    const isExpanded = !!expandedOfferings[offering.id]

                                    return (
                                      <div
                                        key={offering.id}
                                        className={`offering-item-card ${isExpanded ? 'offering-expanded' : ''}`}
                                      >
                                        <div
                                          className="offering-summary-row"
                                          onClick={() => toggleOffering(offering.id)}
                                          role="button"
                                          tabIndex={0}
                                          aria-expanded={isExpanded}
                                        >
                                          <div className="offering-summary-left">
                                            <span className="lvl-badge l4-badge">L4</span>
                                            <h5 className="offering-title">{offering.title}</h5>
                                          </div>
                                          <div className="offering-summary-right">
                                            <span className="offering-count-badge">
                                              {offering.subOfferings.length} Sub-Offerings
                                            </span>
                                            <ChevronDown
                                              size={16}
                                              className={`offering-chevron ${isExpanded ? 'rotate-180' : ''}`}
                                            />
                                          </div>
                                        </div>

                                        {/* LEVEL 5: SUB-OFFERINGS / DELIVERABLES / TECH STACK */}
                                        <div className="offering-details-body">
                                          <div className="l5-sub-offerings-box">
                                            <div className="l5-header">
                                              <span className="lvl-badge l5-badge">L5</span>
                                              <span className="l5-heading-text">
                                                Sub-Offerings & Capabilities
                                              </span>
                                            </div>
                                            <ul className="l5-sub-list">
                                              {offering.subOfferings.map((sub, idx) => (
                                                <li key={idx} className="l5-sub-item">
                                                  <CheckCircle2 size={13} className="l5-check-icon" />
                                                  <span>{sub}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>

                                          {/* DELIVERABLES & TECH STACK (IF AVAILABLE) */}
                                          {((offering.deliverables && offering.deliverables.length > 0) ||
                                            (offering.techStack && offering.techStack.length > 0)) && (
                                            <div className="l5-technical-meta-grid">
                                              {offering.deliverables && offering.deliverables.length > 0 && (
                                                <div className="l5-meta-col">
                                                  <span className="l5-meta-label">
                                                    <FileCheck size={13} /> Deliverables
                                                  </span>
                                                  <ul className="l5-deliverable-items">
                                                    {offering.deliverables.map((d, dIdx) => (
                                                      <li key={dIdx}>{d}</li>
                                                    ))}
                                                  </ul>
                                                </div>
                                              )}

                                              {offering.techStack && offering.techStack.length > 0 && (
                                                <div className="l5-meta-col">
                                                  <span className="l5-meta-label">
                                                    <Terminal size={13} /> Tech Stack & Tools
                                                  </span>
                                                  <div className="l5-tech-tags">
                                                    {offering.techStack.map((tech, tIdx) => (
                                                      <span key={tIdx} className="tech-tag">
                                                        {tech}
                                                      </span>
                                                    ))}
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          )}

                                          <div className="offering-cta-row">
                                            <Link
                                              href={`/book-ai-diagnostic?group=${group.id}&solution=${sa.slug}&offering=${encodeURIComponent(offering.title)}`}
                                              className="offering-action-link"
                                            >
                                              <span>Scope this capability</span>
                                              <ArrowUpRight size={13} />
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* COMMON FOUNDATION SECTION */}
      <section className="sitemap-foundation-section">
        <div className="sitemap-container">
          <div className="foundation-header">
            <span className="lvl-badge l1-badge">L1 COMMON FOUNDATION</span>
            <h2 className="foundation-title">Cross-Cutting Foundation & Engagement Architecture</h2>
            <p className="foundation-desc">
              Integrated across all 6 engineering groups to ensure regulatory compliance, industrial engineering rigor, and measurable P&L returns.
            </p>
          </div>

          <div className="foundation-grid-3">
            {/* 1. INDUSTRIES */}
            <div className="foundation-card">
              <div className="foundation-card-head">
                <Building2 size={20} className="foundation-icon" />
                <div>
                  <span className="lvl-badge l2-badge">L2</span>
                  <h3>12 Regulated Industries</h3>
                </div>
              </div>
              <ul className="foundation-list-badges">
                {siteMapV14.commonFoundation.industries.map((ind, idx) => (
                  <li key={idx}>
                    <Link href={`/industries#${ind.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                      <span>{ind}</span>
                      <ArrowUpRight size={11} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. METHODOLOGY DOMAINS */}
            <div className="foundation-card">
              <div className="foundation-card-head">
                <Sparkles size={20} className="foundation-icon" />
                <div>
                  <span className="lvl-badge l2-badge">L2</span>
                  <h3>Methodology Engine</h3>
                </div>
              </div>
              <p className="foundation-card-copy">
                Cross-cutting operational excellence rigor across 6 domains: Value, Infrastructure, Agentic, Trust, Security, and Networking.
              </p>
              <div className="foundation-method-tags">
                <span className="method-pill">Hoshin Kanri</span>
                <span className="method-pill">TOC</span>
                <span className="method-pill">DMAIC</span>
                <span className="method-pill">OEE & TPM</span>
                <span className="method-pill">SMED</span>
                <span className="method-pill">Jidoka & Poka-Yoke</span>
                <span className="method-pill">FMEA</span>
                <span className="method-pill">SPC</span>
                <span className="method-pill">Toyota Kata</span>
                <span className="method-pill">Throughput Accounting</span>
              </div>
              <div className="foundation-card-foot">
                <Link href="/methodology-engine" className="text-link-arrow">
                  <span>Explore 80+ Methodology Framework</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* 3. KEY METRICS & BUSINESS IMPACT */}
            <div className="foundation-card">
              <div className="foundation-card-head">
                <TrendingUp size={20} className="foundation-icon" />
                <div>
                  <span className="lvl-badge l2-badge">L2</span>
                  <h3>Key Metrics & Impact</h3>
                </div>
              </div>
              <ul className="foundation-metrics-list">
                {siteMapV14.commonFoundation.keyMetrics.slice(0, 5).map((m, idx) => (
                  <li key={idx} className="metric-row">
                    <span className="metric-name">{m.name}</span>
                    <span className="metric-val">{m.benchmarkOrImpact}</span>
                  </li>
                ))}
              </ul>
              <div className="foundation-card-foot">
                <Link href="/book-ai-diagnostic" className="text-link-arrow">
                  <span>Model your workload economics</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* DIAGNOSTIC BOOKING CTA STRIP */}
          <div className="sitemap-diagnostic-banner">
            <div className="diag-banner-content">
              <span className="lvl-badge l2-badge">L2 BOOK YOUR AI DIAGNOSTIC</span>
              <h3>Execute a 5-Step Architectural Assessment</h3>
              <p>
                Select Group &rarr; Select Solution Area &rarr; Select Engineering Area &rarr; Select Industry &rarr; Submit Workload Parameters
              </p>
            </div>
            <Link href="/book-ai-diagnostic" className="button button-primary">
              Book AI Diagnostic <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

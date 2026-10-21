'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Search,
  Filter,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Building2,
  Layers,
  ShieldCheck,
  Zap,
  TrendingUp,
  Cpu,
  Clock,
  CheckCircle2,
  FileCheck,
  Boxes,
  Users,
  Compass,
  ChevronRight,
  X,
  ExternalLink
} from 'lucide-react'
import {
  crossIndustryPractices,
  industryVerticalPractices,
  CrossIndustryPractice,
  IndustryVertical,
  CrossPracticeArea,
  IndustryPracticeArea,
  getAllIndustryPracticeAreas,
  getAllCrossPracticeAreas
} from '@/lib/comprehensive-practice-areas'

export function ComprehensivePracticeExplorer() {
  const [activeMainTab, setActiveMainTab] = useState<'verticals' | 'cross-industry'>('verticals')
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>('manufacturing')
  const [selectedSubVerticalCode, setSelectedSubVerticalCode] = useState<string>('all')
  const [selectedCrossPracticeId, setSelectedCrossPracticeId] = useState<string>('grc')
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  const [filterTier, setFilterTier] = useState<string>('all')

  // Modal detail view state
  const [activeModalData, setActiveModalData] = useState<{
    code: string
    title: string
    slug: string
    category: 'Industry Vertical' | 'Cross-Industry'
    parentTitle: string
    overview: string
    solutionAcceleration: string
    kpisBanked: string
    timeToValue: string
    valueAssurance: string
    targetStakeholder: string
    relatedTags: string[]
  } | null>(null)

  // Current active industry
  const currentIndustry = useMemo(() => {
    return industryVerticalPractices.find((ind) => ind.id === selectedIndustryId) || industryVerticalPractices[0]
  }, [selectedIndustryId])

  // Current active horizontal practice
  const currentCrossPractice = useMemo(() => {
    return crossIndustryPractices.find((cp) => cp.id === selectedCrossPracticeId) || crossIndustryPractices[0]
  }, [selectedCrossPracticeId])

  // Subverticals for the active industry
  const currentSubVerticals = useMemo(() => {
    return currentIndustry.subVerticals
  }, [currentIndustry])

  // Displayed practice areas for the active industry based on subvertical filter
  const displayedIndustryPracticeAreas = useMemo(() => {
    if (selectedSubVerticalCode === 'all') {
      return currentSubVerticals.flatMap((sub) => sub.practiceAreas.map((pa) => ({ ...pa, subVerticalTitle: sub.title })))
    }
    const targetSub = currentSubVerticals.find((s) => s.code === selectedSubVerticalCode)
    return targetSub ? targetSub.practiceAreas.map((pa) => ({ ...pa, subVerticalTitle: targetSub.title })) : []
  }, [currentSubVerticals, selectedSubVerticalCode])

  // Global search filtering across all 148 practice areas
  const allIndustryPAs = useMemo(() => getAllIndustryPracticeAreas(), [])
  const allCrossPAs = useMemo(() => getAllCrossPracticeAreas(), [])

  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return null

    const matchedIndustry = allIndustryPAs.filter((pa) => {
      const text = `${pa.code} ${pa.title} ${pa.overview} ${pa.solutionAcceleration} ${pa.kpisBanked} ${pa.valueAssurance} ${pa.industryTitle} ${pa.targetStakeholder}`.toLowerCase()
      return text.includes(q)
    })

    const matchedCross = allCrossPAs.filter((pa) => {
      const text = `${pa.code} ${pa.title} ${pa.overview} ${pa.solutionAcceleration} ${pa.kpisBanked} ${pa.valueAssurance} ${pa.practiceTitle} ${pa.buyer}`.toLowerCase()
      return text.includes(q)
    })

    return {
      industry: matchedIndustry,
      cross: matchedCross,
      totalCount: matchedIndustry.length + matchedCross.length
    }
  }, [searchQuery, allIndustryPAs, allCrossPAs])

  return (
    <div className="tg-comprehensive-explorer" id="comprehensive-explorer">
      {/* 1. TOP DUAL-CATEGORY SWITCHER & GLOBAL SEARCH */}
      <div className="tg-explorer-control-bar">
        {/* Main Pillar Tabs */}
        <div className="tg-main-tabs" role="tablist" aria-label="Practice Area Pillars">
          <button
            type="button"
            role="tab"
            aria-selected={activeMainTab === 'verticals'}
            className={`tg-main-tab-btn ${activeMainTab === 'verticals' ? 'active' : ''}`}
            onClick={() => {
              setActiveMainTab('verticals')
              setSearchQuery('')
            }}
          >
            <div className="tg-tab-btn-icon">
              <Building2 size={16} />
            </div>
            <div className="tg-tab-btn-text">
              <span className="tg-tab-btn-title">Industry Vertical Practices</span>
              <span className="tg-tab-btn-sub">Division 3 · 8 Industries · 34 Sub-Verticals · 103 Practice Areas</span>
            </div>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeMainTab === 'cross-industry'}
            className={`tg-main-tab-btn ${activeMainTab === 'cross-industry' ? 'active' : ''}`}
            onClick={() => {
              setActiveMainTab('cross-industry')
              setSearchQuery('')
            }}
          >
            <div className="tg-tab-btn-icon">
              <Layers size={16} />
            </div>
            <div className="tg-tab-btn-text">
              <span className="tg-tab-btn-title">Cross-Industry Practices</span>
              <span className="tg-tab-btn-sub">Division 2 · 15 Horizontal Functions · 45 Practice Areas</span>
            </div>
          </button>
        </div>

        {/* Search Input Box */}
        <div className="tg-explorer-search-box">
          <div className="tg-search-wrapper">
            <Search size={15} className="tg-search-icon" />
            <input
              type="text"
              className="tg-search-input"
              placeholder="Search by practice name, capability, KPI, regulation, or code (e.g. 6.1.1.1, IATF, FinOps, AML)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search practice areas"
            />
            {searchQuery && (
              <button
                type="button"
                className="tg-search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. SEARCH RESULTS VIEW (IF USER IS ACTIVELY SEARCHING) */}
      {searchResults ? (
        <div className="tg-search-results-panel">
          <div className="tg-search-results-header">
            <div>
              <h3 className="tg-results-title">
                Search Results for &ldquo;{searchQuery}&rdquo;
              </h3>
              <p className="tg-results-subtitle">
                Found {searchResults.totalCount} matching practice areas ({searchResults.industry.length} Industry Verticals, {searchResults.cross.length} Cross-Industry)
              </p>
            </div>
            <button
              type="button"
              className="tg-reset-search-btn"
              onClick={() => setSearchQuery('')}
            >
              Reset Search Filter
            </button>
          </div>

          {searchResults.totalCount === 0 ? (
            <div className="tg-empty-state">
              <Sparkles size={28} className="text-blue-500 mb-2" />
              <h4>No matching practice areas found</h4>
              <p>Try searching for a different capability, standard (e.g. ISO 27001, CSRD, FDA), or code (e.g. 6.2, 5.1).</p>
              <button
                type="button"
                className="button button-outline mt-3"
                onClick={() => setSearchQuery('')}
              >
                View All Practice Areas
              </button>
            </div>
          ) : (
            <div className="tg-results-grid">
              {/* Industry Matches */}
              {searchResults.industry.map((item) => (
                <div key={item.code} className="tg-practice-card group">
                  <div className="tg-card-top-bar">
                    <span className="tg-code-badge">{item.code}</span>
                    <span className="tg-industry-pill">{item.industryTitle}</span>
                  </div>
                  <h4 className="tg-card-title">{item.title}</h4>
                  <p className="tg-card-overview">{item.overview}</p>

                  <div className="tg-card-specs-grid">
                    <div className="tg-spec-item">
                      <span className="tg-spec-label">SOLUTION ACCELERATION</span>
                      <span className="tg-spec-val">{item.solutionAcceleration}</span>
                    </div>
                    <div className="tg-spec-item">
                      <span className="tg-spec-label">KPIS BANKED</span>
                      <span className="tg-spec-val text-emerald-400">{item.kpisBanked}</span>
                    </div>
                    <div className="tg-spec-item">
                      <span className="tg-spec-label">TIME TO VALUE</span>
                      <span className="tg-spec-val text-blue-400 font-mono">{item.timeToValue}</span>
                    </div>
                    <div className="tg-spec-item">
                      <span className="tg-spec-label">VALUE ASSURANCE</span>
                      <span className="tg-spec-val text-slate-300 font-mono">{item.valueAssurance}</span>
                    </div>
                  </div>

                  <div className="tg-card-footer">
                    <button
                      type="button"
                      className="tg-view-blueprint-btn"
                      onClick={() =>
                        setActiveModalData({
                          code: item.code,
                          title: item.title,
                          slug: item.slug,
                          category: 'Industry Vertical',
                          parentTitle: item.industryTitle,
                          overview: item.overview,
                          solutionAcceleration: item.solutionAcceleration,
                          kpisBanked: item.kpisBanked,
                          timeToValue: item.timeToValue,
                          valueAssurance: item.valueAssurance,
                          targetStakeholder: item.targetStakeholder,
                          relatedTags: item.relatedCrossPractices
                        })
                      }
                    >
                      <span>Explore Detail Blueprint</span>
                      <ArrowRight size={13} />
                    </button>
                    <Link href={`/practice-areas/${item.slug}`} className="tg-permalink-icon" title="Open Dedicated Page">
                      <ExternalLink size={13} />
                    </Link>
                  </div>
                </div>
              ))}

              {/* Cross-Industry Matches */}
              {searchResults.cross.map((item) => (
                <div key={item.code} className="tg-practice-card tg-card-cross group">
                  <div className="tg-card-top-bar">
                    <span className="tg-code-badge tg-badge-cross">{item.code}</span>
                    <span className="tg-industry-pill tg-pill-cross">{item.practiceTitle}</span>
                  </div>
                  <h4 className="tg-card-title">{item.title}</h4>
                  <p className="tg-card-overview">{item.overview}</p>

                  <div className="tg-card-specs-grid">
                    <div className="tg-spec-item">
                      <span className="tg-spec-label">SOLUTION ACCELERATION</span>
                      <span className="tg-spec-val">{item.solutionAcceleration}</span>
                    </div>
                    <div className="tg-spec-item">
                      <span className="tg-spec-label">KPIS BANKED</span>
                      <span className="tg-spec-val text-emerald-400">{item.kpisBanked}</span>
                    </div>
                    <div className="tg-spec-item">
                      <span className="tg-spec-label">TIME TO VALUE</span>
                      <span className="tg-spec-val text-indigo-400 font-mono">{item.timeToValue}</span>
                    </div>
                    <div className="tg-spec-item">
                      <span className="tg-spec-label">VALUE ASSURANCE</span>
                      <span className="tg-spec-val text-slate-300 font-mono">{item.valueAssurance}</span>
                    </div>
                  </div>

                  <div className="tg-card-footer">
                    <button
                      type="button"
                      className="tg-view-blueprint-btn"
                      onClick={() =>
                        setActiveModalData({
                          code: item.code,
                          title: item.title,
                          slug: item.slug,
                          category: 'Cross-Industry',
                          parentTitle: item.practiceTitle,
                          overview: item.overview,
                          solutionAcceleration: item.solutionAcceleration,
                          kpisBanked: item.kpisBanked,
                          timeToValue: item.timeToValue,
                          valueAssurance: item.valueAssurance,
                          targetStakeholder: item.buyer,
                          relatedTags: item.relatedIndustries
                        })
                      }
                    >
                      <span>Explore Detail Blueprint</span>
                      <ArrowRight size={13} />
                    </button>
                    <Link href={`/practice-areas/${item.slug}`} className="tg-permalink-icon" title="Open Dedicated Page">
                      <ExternalLink size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : activeMainTab === 'verticals' ? (
        /* ==========================================================================
           3. INDUSTRY VERTICAL PRACTICES EXPLORER (DIVISION 3)
           ========================================================================== */
        <div className="tg-verticals-container">
          {/* 8 Industries Selector Bar */}
          <div className="tg-industries-selector-grid">
            {industryVerticalPractices.map((ind) => {
              const isSelected = ind.id === selectedIndustryId
              return (
                <button
                  key={ind.id}
                  type="button"
                  className={`tg-industry-selector-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedIndustryId(ind.id)
                    setSelectedSubVerticalCode('all')
                  }}
                >
                  <div className="tg-ind-card-top">
                    <span className="tg-ind-code">{ind.code}</span>
                    <span className={`tg-tier-badge tier-${ind.tier}`}>Tier {ind.tier}</span>
                  </div>
                  <h4 className="tg-ind-title">{ind.shortTitle}</h4>
                  <div className="tg-ind-meta">
                    <span>{ind.subVerticals.length} Sub-Verticals</span>
                    <span className="bullet">•</span>
                    <span>{ind.medianTtv} TTV</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Active Industry Information Banner */}
          <div className="tg-active-industry-banner">
            <div className="tg-banner-left">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="tg-banner-code">{currentIndustry.code}</span>
                <h3 className="tg-banner-title">{currentIndustry.title}</h3>
                <span className={`tg-tier-badge tier-${currentIndustry.tier}`}>Tier {currentIndustry.tier} — {currentIndustry.tier === 1 ? 'Build Depth' : currentIndustry.tier === 2 ? 'Selective Delivery' : 'Partner-Led'}</span>
              </div>
              <p className="tg-banner-desc">{currentIndustry.description}</p>
              
              <div className="tg-banner-metrics">
                <div className="tg-b-metric">
                  <span className="label">ECONOMIC POOL:</span>
                  <span className="val text-blue-400">{currentIndustry.poolSize}</span>
                </div>
                <div className="tg-b-metric">
                  <span className="label">TARGET BUYER:</span>
                  <span className="val">{currentIndustry.buyer}</span>
                </div>
                <div className="tg-b-metric">
                  <span className="label">BANKED AGAINST:</span>
                  <span className="val text-emerald-400">{currentIndustry.bankedAgainst}</span>
                </div>
                <div className="tg-b-metric">
                  <span className="label">MEDIAN TTV:</span>
                  <span className="val font-mono">{currentIndustry.medianTtv}</span>
                </div>
              </div>
            </div>

            <div className="tg-banner-right">
              <Link
                href="/book-ai-diagnostic#diagnostic-form-section"
                className="button button-primary"
              >
                <span>Book Industry Diagnostic</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Sub-Verticals Filter Pills */}
          <div className="tg-subverticals-pill-row">
            <button
              type="button"
              className={`tg-sub-pill ${selectedSubVerticalCode === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedSubVerticalCode('all')}
            >
              All Sub-Verticals ({currentIndustry.subVerticals.flatMap((s) => s.practiceAreas).length} Practices)
            </button>
            {currentSubVerticals.map((sub) => (
              <button
                key={sub.code}
                type="button"
                className={`tg-sub-pill ${selectedSubVerticalCode === sub.code ? 'active' : ''}`}
                onClick={() => setSelectedSubVerticalCode(sub.code)}
              >
                <span className="font-mono text-blue-400 text-[10px] mr-1">{sub.code}</span>
                <span>{sub.title}</span>
                <span className="text-[10px] text-slate-400 ml-1.5">({sub.practiceAreas.length})</span>
              </button>
            ))}
          </div>

          {/* Practice Areas Grid for this Industry */}
          <div className="tg-practices-cards-grid">
            {displayedIndustryPracticeAreas.map((pa) => (
              <div key={pa.code} className="tg-practice-card group">
                <div className="tg-card-top-bar">
                  <span className="tg-code-badge">{pa.code}</span>
                  <span className="tg-subv-badge">{pa.subVerticalTitle}</span>
                </div>

                <h4 className="tg-card-title">{pa.title}</h4>
                <p className="tg-card-overview">{pa.overview}</p>

                {/* 4 Standardized Blueprint Dimensions */}
                <div className="tg-card-specs-grid">
                  <div className="tg-spec-item">
                    <span className="tg-spec-label">SOLUTION ACCELERATION</span>
                    <span className="tg-spec-val">{pa.solutionAcceleration}</span>
                  </div>
                  <div className="tg-spec-item">
                    <span className="tg-spec-label">KPIS BANKED</span>
                    <span className="tg-spec-val text-emerald-400">{pa.kpisBanked}</span>
                  </div>
                  <div className="tg-spec-item">
                    <span className="tg-spec-label">TIME TO VALUE</span>
                    <span className="tg-spec-val text-blue-400 font-mono">{pa.timeToValue}</span>
                  </div>
                  <div className="tg-spec-item">
                    <span className="tg-spec-label">VALUE ASSURANCE</span>
                    <span className="tg-spec-val text-slate-300 font-mono">{pa.valueAssurance}</span>
                  </div>
                </div>

                <div className="tg-card-attach-row">
                  <span className="text-[10px] uppercase font-semibold text-slate-500 mr-1">ATTACHED CAPABILITIES:</span>
                  {pa.relatedCrossPractices.map((tag, idx) => (
                    <span key={idx} className="tg-attach-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="tg-card-footer">
                  <button
                    type="button"
                    className="tg-view-blueprint-btn"
                    onClick={() =>
                      setActiveModalData({
                        code: pa.code,
                        title: pa.title,
                        slug: pa.slug,
                        category: 'Industry Vertical',
                        parentTitle: currentIndustry.title,
                        overview: pa.overview,
                        solutionAcceleration: pa.solutionAcceleration,
                        kpisBanked: pa.kpisBanked,
                        timeToValue: pa.timeToValue,
                        valueAssurance: pa.valueAssurance,
                        targetStakeholder: pa.targetStakeholder,
                        relatedTags: pa.relatedCrossPractices
                      })
                    }
                  >
                    <span>Full Practice Blueprint</span>
                    <ArrowRight size={13} />
                  </button>

                  <Link href={`/practice-areas/${pa.slug}`} className="tg-permalink-icon" title="Open Dedicated Page">
                    <ExternalLink size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ==========================================================================
           4. CROSS-INDUSTRY PRACTICES EXPLORER (DIVISION 2)
           ========================================================================== */
        <div className="tg-cross-industry-container">
          {/* Horizontal Practices Selector List */}
          <div className="tg-cross-selector-grid">
            {crossIndustryPractices.map((cp) => {
              const isSelected = cp.id === selectedCrossPracticeId
              return (
                <button
                  key={cp.id}
                  type="button"
                  className={`tg-cross-selector-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedCrossPracticeId(cp.id)}
                >
                  <div className="tg-cross-card-top">
                    <span className="tg-cross-code">{cp.code}</span>
                    {cp.originator && <span className="tg-originator-badge">Originator</span>}
                  </div>
                  <h4 className="tg-cross-title">{cp.shortTitle}</h4>
                  <div className="tg-cross-buyer truncate">{cp.buyer}</div>
                  <div className="tg-cross-footer-meta">
                    <span>{cp.practiceAreas.length} Areas</span>
                    <span className="bullet">•</span>
                    <span>{cp.medianTtv} TTV</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Active Horizontal Practice Details Banner */}
          <div className="tg-active-industry-banner tg-active-cross-banner">
            <div className="tg-banner-left">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="tg-banner-code tg-code-cross">{currentCrossPractice.code}</span>
                <h3 className="tg-banner-title">{currentCrossPractice.title}</h3>
                {currentCrossPractice.originator && (
                  <span className="tg-originator-badge">Originator Practice</span>
                )}
              </div>
              <p className="tg-banner-desc">{currentCrossPractice.description}</p>

              <div className="tg-banner-metrics">
                <div className="tg-b-metric">
                  <span className="label">TARGET EXECUTIVE BUYER:</span>
                  <span className="val text-indigo-400">{currentCrossPractice.buyer}</span>
                </div>
                <div className="tg-b-metric">
                  <span className="label">BUDGET POOL:</span>
                  <span className="val">{currentCrossPractice.budget}</span>
                </div>
                <div className="tg-b-metric">
                  <span className="label">PRIMARY VERTICAL ATTACH:</span>
                  <span className="val text-emerald-400 font-mono">
                    {currentCrossPractice.attachVerticals.join(', ')}
                  </span>
                </div>
                <div className="tg-b-metric">
                  <span className="label">MEDIAN TIME TO VALUE:</span>
                  <span className="val font-mono">{currentCrossPractice.medianTtv}</span>
                </div>
              </div>
            </div>

            <div className="tg-banner-right">
              <Link
                href="/contact?subject=Practice+Scope+Request"
                className="button button-primary"
              >
                <span>Request Practice Scope</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Practice Areas Grid for Active Horizontal Function */}
          <div className="tg-practices-cards-grid">
            {currentCrossPractice.practiceAreas.map((pa) => (
              <div key={pa.code} className="tg-practice-card tg-card-cross group">
                <div className="tg-card-top-bar">
                  <span className="tg-code-badge tg-badge-cross">{pa.code}</span>
                  <span className="tg-subv-badge tg-subv-cross">{currentCrossPractice.shortTitle}</span>
                </div>

                <h4 className="tg-card-title">{pa.title}</h4>
                <p className="tg-card-overview">{pa.overview}</p>

                {/* 4 Standardized Blueprint Dimensions */}
                <div className="tg-card-specs-grid">
                  <div className="tg-spec-item">
                    <span className="tg-spec-label">SOLUTION ACCELERATION</span>
                    <span className="tg-spec-val">{pa.solutionAcceleration}</span>
                  </div>
                  <div className="tg-spec-item">
                    <span className="tg-spec-label">KPIS BANKED</span>
                    <span className="tg-spec-val text-emerald-400">{pa.kpisBanked}</span>
                  </div>
                  <div className="tg-spec-item">
                    <span className="tg-spec-label">TIME TO VALUE</span>
                    <span className="tg-spec-val text-indigo-400 font-mono">{pa.timeToValue}</span>
                  </div>
                  <div className="tg-spec-item">
                    <span className="tg-spec-label">VALUE ASSURANCE</span>
                    <span className="tg-spec-val text-slate-300 font-mono">{pa.valueAssurance}</span>
                  </div>
                </div>

                <div className="tg-card-attach-row">
                  <span className="text-[10px] uppercase font-semibold text-slate-500 mr-1">PRIMARY INDUSTRY ATTACH:</span>
                  {pa.relatedIndustries.map((tag, idx) => (
                    <span key={idx} className="tg-attach-tag tg-attach-cross">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="tg-card-footer">
                  <button
                    type="button"
                    className="tg-view-blueprint-btn"
                    onClick={() =>
                      setActiveModalData({
                        code: pa.code,
                        title: pa.title,
                        slug: pa.slug,
                        category: 'Cross-Industry',
                        parentTitle: currentCrossPractice.title,
                        overview: pa.overview,
                        solutionAcceleration: pa.solutionAcceleration,
                        kpisBanked: pa.kpisBanked,
                        timeToValue: pa.timeToValue,
                        valueAssurance: pa.valueAssurance,
                        targetStakeholder: pa.buyer,
                        relatedTags: pa.relatedIndustries
                      })
                    }
                  >
                    <span>Full Practice Blueprint</span>
                    <ArrowRight size={13} />
                  </button>

                  <Link href={`/practice-areas/${pa.slug}`} className="tg-permalink-icon" title="Open Dedicated Page">
                    <ExternalLink size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. INTERACTIVE PRACTICE DETAIL MODAL / DRAWER */}
      {activeModalData && (
        <div className="tg-practice-modal-backdrop" onClick={() => setActiveModalData(null)}>
          <div className="tg-practice-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="tg-modal-header">
              <div className="tg-modal-header-info">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="tg-modal-code">{activeModalData.code}</span>
                  <span className="tg-modal-category">{activeModalData.category}</span>
                  <span className="tg-modal-parent">{activeModalData.parentTitle}</span>
                </div>
                <h3 className="tg-modal-title">{activeModalData.title}</h3>
              </div>
              <button
                type="button"
                className="tg-modal-close-btn"
                onClick={() => setActiveModalData(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="tg-modal-body">
              {/* 1. Overview */}
              <div className="tg-modal-section">
                <h5 className="tg-modal-section-title">1. Practice Overview &amp; Business Objective</h5>
                <p className="tg-modal-text">{activeModalData.overview}</p>
              </div>

              {/* 2. Solution Acceleration & Capability */}
              <div className="tg-modal-section">
                <h5 className="tg-modal-section-title">2. Solution Acceleration &amp; Reusable Capabilities</h5>
                <p className="tg-modal-text">{activeModalData.solutionAcceleration}</p>
              </div>

              {/* 3 & 4. KPIs Banked and Time to Value */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                <div className="tg-modal-subbox">
                  <span className="tg-subbox-label">3. KPIs Banked (Financial &amp; Operational Metrics)</span>
                  <p className="text-emerald-400 font-medium text-sm mt-1">{activeModalData.kpisBanked}</p>
                </div>
                <div className="tg-modal-subbox">
                  <span className="tg-subbox-label">4. Time to Value (Reference Delivery Velocity)</span>
                  <p className="text-blue-400 font-mono font-bold text-base mt-1">{activeModalData.timeToValue}</p>
                </div>
              </div>

              {/* 5. Value Assurance */}
              <div className="tg-modal-section">
                <h5 className="tg-modal-section-title">5. Value Assurance &amp; Regulatory Defensibility</h5>
                <div className="bg-slate-900/80 border border-slate-800 rounded p-3 text-xs font-mono text-slate-300">
                  {activeModalData.valueAssurance}
                </div>
              </div>

              {/* 6. Target Stakeholders & Related Attachments */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                <div className="tg-modal-subbox">
                  <span className="tg-subbox-label">6. Target Stakeholder / Executive Buyer</span>
                  <p className="text-white font-semibold text-sm mt-1">{activeModalData.targetStakeholder}</p>
                </div>
                <div className="tg-modal-subbox">
                  <span className="tg-subbox-label">7. Related Cross-Domain Linkages</span>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {activeModalData.relatedTags.map((tag, idx) => (
                      <span key={idx} className="tg-attach-tag text-[10px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="tg-modal-footer">
              <Link
                href={`/practice-areas/${activeModalData.slug}`}
                className="button button-outline text-xs"
                onClick={() => setActiveModalData(null)}
              >
                <span>Open Dedicated Permalink Page</span>
                <ArrowRight size={13} />
              </Link>
              <Link
                href={`/book-ai-diagnostic?practice=${activeModalData.slug}#diagnostic-form-section`}
                className="button button-primary text-xs"
                onClick={() => setActiveModalData(null)}
              >
                <span>Discuss with TRUSTGRID.AI Architect</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

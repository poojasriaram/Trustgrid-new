'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Layers,
  Building2,
  ShieldCheck,
  TrendingUp,
  Cpu,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Search,
  Filter,
  Workflow,
  Target
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { industriesData, IndustryDetail } from '@/lib/industries-data'
import { PageBannerHero } from '@/components/ui/page-banner-hero'

export default function UseCasesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Filter use cases based on selected industry and search query
  const filteredIndustries = useMemo(() => {
    return industriesData.filter((ind) => {
      const matchesIndustry = selectedIndustry === 'all' || ind.id === selectedIndustry
      if (!matchesIndustry) return false

      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase()
      const inName = ind.name.toLowerCase().includes(q)
      const inSummary = ind.summary.toLowerCase().includes(q)
      const inChallenges = ind.challenges.some((c) => c.toLowerCase().includes(q))
      const inMethods = ind.keyMethodologies.some((m) => m.toLowerCase().includes(q))
      const inApps = ind.solutionApplications.some(
        (app) =>
          app.solutionTitle.toLowerCase().includes(q) ||
          app.useCases.some((uc) => uc.toLowerCase().includes(q))
      )
      return inName || inSummary || inChallenges || inMethods || inApps
    })
  }, [selectedIndustry, searchQuery])

  return (
    <div className="page-shell">
      <SiteHeader />

      <main className="main-content">
        {/* PAGE HERO */}
        <PageBannerHero
          badge="PRACTICAL ENTERPRISE DEPLOYMENTS"
          badgeTag="CROSS-INDUSTRY BLUEPRINTS"
          title="Enterprise AI Use Cases:"
          titleHighlight="From Problem to P&L Impact."
          description="A curated compendium of practical enterprise and regulated AI use cases. Each blueprint details the operational constraint, proposed architecture, applicable methodologies, and measurable performance criteria."
          thesisHighlight="Domain Rigor: Real deployment frameworks, operational methodologies, and mathematically verified success criteria across 70 industry sectors."
          image="/images/industry-manufacturing.jpg"
          primaryCta={{
            text: 'Book Use Case Workshop',
            href: '/use-case-workshop'
          }}
          secondaryCta={{
            text: 'Browse 70 Industries Directory',
            href: '/industries'
          }}
          metrics={{
            statValue: '12 Sectors',
            statLabel: 'Turnkey Enterprise Blueprints',
            icon: Target,
            features: [
              'Zero-Hallucination Decision Lineage',
              'Sub-Millisecond Regulated Inference',
              'Deterministic ROI & FinOps Governance'
            ]
          }}
        />

        {/* SEARCH & FILTER CONTROLS */}
        <section className="section" style={{ paddingTop: '28px', paddingBottom: '20px' }}>
          <div className="section-intro">
            <div className="intro-left">
              <span className="section-badge">USE CASE DIRECTORY</span>
              <p className="section-label">Filter by Sector or Search Specific Operational Capabilities</p>
            </div>
            <span className="section-index">{filteredIndustries.length} SECTORS MATCHED</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
            {/* Search Input Bar */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '640px' }}>
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94a3b8'
                }}
              />
              <input
                type="text"
                placeholder="Search use cases, methodologies (e.g. FMEA, OEE), or operational problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 16px 11px 40px',
                  fontSize: '13.5px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#0f172a',
                  outline: 'none',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    fontSize: '12px',
                    color: '#64748b',
                    cursor: 'pointer'
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="industry-filter-bar">
              <button
                className={`filter-pill ${selectedIndustry === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedIndustry('all')}
              >
                All Sectors ({industriesData.length})
              </button>
              {industriesData.map((ind) => (
                <button
                  key={ind.id}
                  className={`filter-pill ${selectedIndustry === ind.id ? 'active' : ''}`}
                  onClick={() => setSelectedIndustry(ind.id)}
                >
                  {ind.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* USE CASE CARDS GRID */}
        <section className="section" id="use-cases-grid" style={{ paddingTop: '0px', paddingBottom: '60px' }}>
          {filteredIndustries.length === 0 ? (
            <div
              style={{
                padding: '48px 24px',
                textAlign: 'center',
                background: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
              }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>No use cases match your search</h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '8px 0 16px' }}>
                Try searching for broader keywords such as &quot;fraud&quot;, &quot;OEE&quot;, &quot;clinical&quot;, or &quot;manufacturing&quot;.
              </p>
              <button
                onClick={() => {
                  setSelectedIndustry('all')
                  setSearchQuery('')
                }}
                className="button button-primary button-sm"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="industries-deep-grid">
              {filteredIndustries.map((ind: IndustryDetail) => (
                <div key={ind.id} className="industry-deep-card animated-card reveal-up" id={ind.slug}>
                  {/* CARD HEADER */}
                  <div className="ind-header-row">
                    <div className="ind-title-block">
                      <span className="ind-badge">{ind.badge}</span>
                      <h2>{ind.name}</h2>
                      <p className="ind-tagline">{ind.tagline}</p>
                    </div>
                    <div className="ind-metrics-strip">
                      {ind.metricsImpact.map((metric, mIdx) => (
                        <div key={mIdx} className="ind-metric-box">
                          <div className="metric-val">{metric.value}</div>
                          <div className="metric-lbl">{metric.metric}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="ind-summary">{ind.summary}</p>

                  {/* STAGE GATE IMPLEMENTATION FLOW */}
                  <div className="my-4 py-2 px-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between text-[11px] font-mono text-slate-700 overflow-x-auto shadow-xs">
                    <span className="flex items-center gap-1.5 whitespace-nowrap text-blue-900 font-bold">
                      <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px] font-bold">
                        1
                      </span>
                      Operational Problem
                    </span>
                    <span className="text-slate-600 px-1 font-bold">→</span>
                    <span className="flex items-center gap-1.5 whitespace-nowrap text-amber-900 font-bold">
                      <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-bold">
                        2
                      </span>
                      Methodology Selection
                    </span>
                    <span className="text-slate-600 px-1 font-bold">→</span>
                    <span className="flex items-center gap-1.5 whitespace-nowrap text-cyan-900 font-bold">
                      <span className="w-4 h-4 rounded-full bg-cyan-100 text-cyan-800 flex items-center justify-center text-[10px] font-bold">
                        3
                      </span>
                      AI Architecture
                    </span>
                    <span className="text-slate-600 px-1 font-bold">→</span>
                    <span className="flex items-center gap-1.5 whitespace-nowrap text-emerald-900 font-bold">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold">
                        4
                      </span>
                      Measurable ROI
                    </span>
                  </div>

                  {/* SPLIT CONTENT: CHALLENGES & USE CASES */}
                  <div className="ind-split-content">
                    {/* LEFT COLUMN: CONSTRAINTS & METHODOLOGIES */}
                    <div className="ind-left-col">
                      <div className="ind-sub-box">
                        <h4>
                          <ShieldCheck size={16} className="text-blue-600" />
                          <span>Operational Challenges & Regulatory Constraints</span>
                        </h4>
                        <ul className="ind-list">
                          {ind.challenges.map((c, cIdx) => (
                            <li key={cIdx}>
                              <span className="bullet-dot" />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="ind-sub-box" style={{ marginTop: '16px' }}>
                        <h4>
                          <TrendingUp size={16} className="text-blue-600" />
                          <span>Applied Methodologies</span>
                        </h4>
                        <div className="ind-method-tags">
                          {ind.keyMethodologies.map((m, mIdx) => (
                            <Link
                              key={mIdx}
                              href="/methodology-engine"
                              className="method-pill"
                              style={{ textDecoration: 'none' }}
                            >
                              {m}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: DETAILED USE CASES */}
                    <div className="ind-right-col">
                      <h4>
                        <Layers size={16} className="text-blue-600" />
                        <span>Practical AI Use Cases & Implementation Architectures</span>
                      </h4>
                      <div className="ind-solutions-stack">
                        {ind.solutionApplications.map((app, aIdx) => (
                          <div key={aIdx} className="ind-solution-app-card animated-card">
                            <div className="app-card-top">
                              <Cpu size={14} />
                              <Link href={`/solutions/${app.solutionSlug}`} className="app-title-link">
                                <span>{app.solutionTitle}</span>
                                <ArrowUpRight size={12} />
                              </Link>
                            </div>
                            <ul className="app-usecases-list">
                              {app.useCases.map((uc, ucIdx) => (
                                <li key={ucIdx}>
                                  <CheckCircle2 size={13} className="text-emerald-600" />
                                  <span>{uc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CARD FOOTER */}
                  <div className="ind-card-footer">
                    <span className="ind-footer-text">
                      Interested in evaluating use cases for <strong>{ind.name}</strong>?
                    </span>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <Link
                        href={`/book-ai-diagnostic?industry=${encodeURIComponent(ind.name)}#diagnostic-form-section`}
                        className="button button-primary button-sm"
                      >
                        <span>Schedule Use Case Assessment</span>
                        <ArrowUpRight size={14} />
                      </Link>
                      <Link
                        href="/use-case-workshop"
                        className="button button-ghost button-sm"
                      >
                        <span>Prioritization Workshop</span>
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* WORKSHOP CTA STRIP */}
        <section className="section cta-section">
          <div className="cta-container">
            <div className="cta-badge">
              <Sparkles size={14} />
              <span>EXECUTIVE USE CASE SPRINT</span>
            </div>
            <h2>Prioritize High-ROI Use Cases with Mathematical Precision</h2>
            <p>
              Our principal systems architects and value engineers conduct rapid 90-day diagnostic sprints to evaluate your technical feasibility, data readiness, unit economics, and P&L impact.
            </p>
            <div className="cta-actions">
              <Link href="/use-case-workshop" className="button button-primary">
                <span>Book Use Case Prioritization Workshop</span>
                <ArrowUpRight size={16} />
              </Link>
              <Link href="/book-ai-diagnostic#diagnostic-form-section" className="button button-ghost">
                <span>Schedule Technical Diagnostic</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Building2,
  ShieldCheck,
  TrendingUp,
  Layers,
  Cpu,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  ChevronRight
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { industriesData, IndustryDetail } from '@/lib/industries-data'
import { PageBannerHero } from '@/components/ui/page-banner-hero'
import { IndustryVerticalsSlider } from '@/components/ui/industry-verticals-slider'

export default function IndustriesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all')

  const filteredIndustries = selectedIndustry === 'all'
    ? industriesData
    : industriesData.filter((ind) => ind.id === selectedIndustry)

  return (
    <div className="page-shell">
      <SiteHeader />

      <main className="main-content">
        {/* STANDARD PAGE BANNER HERO */}
        <PageBannerHero
          badge="MISSION-CRITICAL & REGULATED SECTORS"
          badgeTag="12 INDUSTRY BLUEPRINTS"
          title="Industrial-Grade AI Engineering Across"
          titleHighlight="Regulated Verticals."
          description="From sovereign high-frequency banking enclaves and FDA-compliant clinical AI to air-gapped defense meshes and discrete shop floors. We engineer the hardware, agent architectures, and operational excellence for the world's most demanding enterprises."
          thesisHighlight="Domain Rigor: Zero-downtime, mathematically verified, and compliance-ready architectures engineered for high-stakes environments."
          image="/images/industry-manufacturing.jpg"
          primaryCta={{ text: 'Book Industry Diagnostic', href: '/book-ai-diagnostic#diagnostic-form-section' }}
          secondaryCta={{ text: 'Explore All 12 Verticals', href: '#industries-list' }}
          metrics={{
            statValue: '12 Sectors',
            statLabel: 'Turnkey Industry Blueprints',
            icon: Building2,
            features: [
              'Banking & High-Frequency Trading (HFT)',
              'Healthcare, Biopharma & FDA AI Validation',
              'Energy, Smart Grids & Defense Grade Meshes'
            ]
          }}
        />

        {/* ENTERPRISE INDUSTRY VERTICALS SLIDER */}
        <section className="section" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
          <IndustryVerticalsSlider />
        </section>

        {/* INDUSTRY FILTER PILLS */}
        <section className="section" style={{ paddingTop: '20px', paddingBottom: '30px' }}>
          <div className="section-intro">
            <div className="intro-left">
              <span className="section-badge">SECTOR DIRECTORY</span>
              <p className="section-label">Select an Industry to Explore Tailored Architectures</p>
            </div>
            <span className="section-index">12 VERTICALS</span>
          </div>

          <div className="industry-filter-bar">
            <button
              className={`filter-pill ${selectedIndustry === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedIndustry('all')}
            >
              All 12 Industries
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
        </section>

        {/* INDUSTRIES LIST GRID */}
        <section className="section" style={{ paddingTop: '0px' }}>
          <div className="industries-deep-grid">
            {filteredIndustries.map((ind: IndustryDetail) => (
              <div key={ind.id} className="industry-deep-card animated-card reveal-up" id={ind.slug}>
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

                {/* 5-STAGE BLUEPRINT FLOW STRIP (HIGH-CONTRAST LIGHT THEME) */}
                <div className="my-4 py-2 px-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between text-[11px] font-mono text-slate-700 overflow-x-auto shadow-xs">
                  <span className="flex items-center gap-1.5 whitespace-nowrap text-blue-900 font-bold">
                    <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px] font-bold">1</span>
                    Industry
                  </span>
                  <span className="text-slate-400 px-1 font-bold">→</span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap text-amber-900 font-bold">
                    <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-bold">2</span>
                    Enterprise Challenge
                  </span>
                  <span className="text-slate-400 px-1 font-bold">→</span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap text-cyan-900 font-bold">
                    <span className="w-4 h-4 rounded-full bg-cyan-100 text-cyan-800 flex items-center justify-center text-[10px] font-bold">3</span>
                    AI Architecture
                  </span>
                  <span className="text-slate-400 px-1 font-bold">→</span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap text-indigo-900 font-bold">
                    <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center text-[10px] font-bold">4</span>
                    TrustGrid Solution
                  </span>
                  <span className="text-slate-400 px-1 font-bold">→</span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap text-emerald-900 font-bold">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold">5</span>
                    Business Outcome
                  </span>
                </div>

                <div className="ind-split-content">
                  {/* LEFT: CHALLENGES & METHODOLOGIES */}
                  <div className="ind-left-col">
                    <div className="ind-sub-box">
                      <h4>
                        <ShieldCheck size={16} className="text-blue-600" />
                        <span>Enterprise Challenges & Technical Constraints</span>
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
                        <span>Applied AI Methodologies</span>
                      </h4>
                      <div className="ind-method-tags">
                        {ind.keyMethodologies.map((m, mIdx) => (
                          <span key={mIdx} className="method-pill">{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: SOLUTION APPLICATIONS */}
                  <div className="ind-right-col">
                    <h4>
                      <Layers size={16} className="text-blue-600" />
                      <span>AI Architecture & TrustGrid Solution Deployments</span>
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
                                <CheckCircle2 size={13} />
                                <span>{uc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="ind-card-footer">
                  <span className="ind-footer-text">
                    Ready to deploy production AI for <strong>{ind.name}</strong>?
                  </span>
                  <Link
                    href={`/book-ai-diagnostic?industry=${encodeURIComponent(ind.name)}#diagnostic-form-section`}
                    className="button button-primary button-sm"
                  >
                    <span>Request {ind.name} Diagnostic</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="section cta-section">
          <div className="cta-container">
            <div className="cta-badge">
              <Sparkles size={14} />
              <span>CUSTOM ENTERPRISE ROADMAP</span>
            </div>
            <h2>Execute Your High-Stakes AI Transformation with Absolute Rigor</h2>
            <p>
              Our principal systems architects and methodology black belts deliver concrete production architectures, air-gapped deployments, and provable economic value.
            </p>
            <div className="cta-actions">
              <Link href="/book-ai-diagnostic#diagnostic-form-section" className="button button-primary">
                <span>Schedule an AI Diagnostic Assessment</span>
                <ArrowUpRight size={16} />
              </Link>
              <Link href="/methodology-engine" className="button button-ghost">
                <span>Explore AI Methodology Engine</span>
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

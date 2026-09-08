'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { industriesData, IndustryDetail } from '@/lib/industries-data'
import { ArrowUpRight, CheckCircle2, ChevronRight, Filter, Layers, ShieldCheck, Sparkles, TrendingUp, Cpu } from 'lucide-react'

export default function IndustriesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all')

  const filteredIndustries = selectedIndustry === 'all'
    ? industriesData
    : industriesData.filter((ind) => ind.id === selectedIndustry)

  return (
    <div className="page-shell">
      <SiteHeader />

      <main className="main-content">
        {/* HERO SECTION */}
        <section className="about-hero-section">
          <div className="about-hero-bg" />
          <div className="about-hero-content">
            <div className="about-hero-badge">
              <span className="dot" />
              <span>MISSION-CRITICAL & REGULATED SECTORS</span>
            </div>
            <h1 className="about-hero-title">
              Industrial-Grade AI Engineering Across 12 Regulated Verticals
            </h1>
            <p className="about-hero-subtitle">
              From sovereign high-frequency banking enclaves and FDA-compliant clinical AI to air-gapped defense meshes and discrete shop floors. We engineer the hardware, agent architectures, and operational excellence for the world's most demanding enterprises.
            </p>

            <div className="about-hero-actions">
              <Link href="/book-ai-diagnostic" className="button button-primary">
                <span>Book Industry AI Diagnostic</span>
                <ArrowUpRight size={16} />
              </Link>
              <Link href="/solutions/ai-infra-engineering" className="button button-ghost">
                <span>Explore Solutions Stack</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
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
              <div key={ind.id} className="industry-deep-card" id={ind.slug}>
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

                <div className="ind-split-content">
                  {/* LEFT: CHALLENGES & METHODOLOGIES */}
                  <div className="ind-left-col">
                    <div className="ind-sub-box">
                      <h4>
                        <ShieldCheck size={16} className="text-blue-600" />
                        <span>Core Industry Constraints</span>
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
                      <span>TrustGrid Solution Architecture Mappings</span>
                    </h4>
                    <div className="ind-solutions-stack">
                      {ind.solutionApplications.map((app, aIdx) => (
                        <div key={aIdx} className="ind-solution-app-card">
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
                    href={`/book-ai-diagnostic?industry=${encodeURIComponent(ind.name)}`}
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
              <Link href="/book-ai-diagnostic" className="button button-primary">
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

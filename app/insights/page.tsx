'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { insightsArticles, InsightArticle } from '@/lib/insights-data'
import { ArrowUpRight, BookOpen, Calendar, CheckCircle2, Clock, FileText, Sparkles, Trophy } from 'lucide-react'

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filteredArticles = activeCategory === 'all'
    ? insightsArticles
    : insightsArticles.filter((art) => art.category.toLowerCase().replace(' ', '-') === activeCategory)

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
              <span>RESEARCH, CASE STUDIES & BENCHMARKS</span>
            </div>
            <h1 className="about-hero-title">
              Frontier AI Engineering Insights & Technical Whitepapers
            </h1>
            <p className="about-hero-subtitle">
              Rigorous architectural papers, real-world enterprise outcomes, post-quantum research, and open innovation breakthroughs from the engineers at TrustGrid.AI.
            </p>

            <div className="about-hero-actions">
              <Link href="/book-ai-diagnostic" className="button button-primary">
                <span>Request Executive Briefing</span>
                <ArrowUpRight size={16} />
              </Link>
              <a
                href="https://crowd-safety-predictor.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="button button-ghost"
              >
                <span>Launch Crowd Safety Predictor</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* OPEN INNOVATION SPOTLIGHT BANNER */}
        <section className="section" style={{ paddingTop: '20px', paddingBottom: '30px' }}>
          <div className="hackathon-spotlight-banner animated-card reveal-up">
            <div className="spotlight-left">
              <div className="spotlight-badge">
                <Trophy size={14} />
                <span>FEATURED OPEN INNOVATION HACKATHON PROJECT</span>
              </div>
              <h2>Crowd Safety Predictor</h2>
              <p>
                A production-grade computer vision and spatial telemetry system designed during our AI Hackathon series to predict crowd surges, thermal stress, and stampede risks in real-time across multi-camera streams.
              </p>
              <div className="spotlight-tags">
                <span className="tag-pill">Real-Time Computer Vision</span>
                <span className="tag-pill">Spatial Density Telemetry</span>
                <span className="tag-pill">Edge AI Inference</span>
                <span className="tag-pill">Early Hazard Alerting</span>
              </div>
            </div>
            <div className="spotlight-right">
              <a
                href="https://crowd-safety-predictor.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="button button-primary button-lg"
              >
                <span>Launch Live Application</span>
                <ArrowUpRight size={18} />
              </a>
              <span className="spotlight-note">Opens interactive live web application</span>
            </div>
          </div>
        </section>

        {/* CATEGORY FILTER BAR */}
        <section className="section" style={{ paddingTop: '10px' }}>
          <div className="section-intro">
            <div className="intro-left">
              <span className="section-badge">PUBLICATIONS & RESEARCH</span>
              <p className="section-label">Explore Engineering Perspectives</p>
            </div>
            <span className="section-index">INSIGHTS ARCHIVE</span>
          </div>

          <div className="industry-filter-bar">
            <button
              className={`filter-pill ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Publications
            </button>
            <button
              className={`filter-pill ${activeCategory === 'whitepaper' ? 'active' : ''}`}
              onClick={() => setActiveCategory('whitepaper')}
            >
              Whitepapers
            </button>
            <button
              className={`filter-pill ${activeCategory === 'case-study' ? 'active' : ''}`}
              onClick={() => setActiveCategory('case-study')}
            >
              Case Studies
            </button>
            <button
              className={`filter-pill ${activeCategory === 'research' ? 'active' : ''}`}
              onClick={() => setActiveCategory('research')}
            >
              Research Papers
            </button>
            <button
              className={`filter-pill ${activeCategory === 'blog' ? 'active' : ''}`}
              onClick={() => setActiveCategory('blog')}
            >
              Technical Blog
            </button>
            <button
              className={`filter-pill ${activeCategory === 'open-innovation' ? 'active' : ''}`}
              onClick={() => setActiveCategory('open-innovation')}
            >
              Open Innovation
            </button>
          </div>

          <div className="insights-grid" style={{ marginTop: '32px' }}>
            {filteredArticles.map((article: InsightArticle) => (
              <div key={article.id} className="insight-card animated-card reveal-up">
                <div className="insight-card-meta">
                  <span className="insight-badge">{article.category}</span>
                  <div className="insight-meta-details">
                    <span><Clock size={12} /> {article.readTime}</span>
                    <span><Calendar size={12} /> {article.date}</span>
                  </div>
                </div>

                <h3>{article.title}</h3>
                <p className="insight-abstract">{article.abstract}</p>

                <div className="insight-highlights-box">
                  <strong>Key Takeaways:</strong>
                  <ul>
                    {article.highlights.map((hl, hlIdx) => (
                      <li key={hlIdx}>
                        <CheckCircle2 size={13} />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="insight-card-footer">
                  {article.externalUrl ? (
                    <a
                      href={article.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button button-primary button-sm"
                    >
                      <span>Launch Interactive App</span>
                      <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    <Link
                      href="/book-ai-diagnostic"
                      className="button button-ghost button-sm"
                    >
                      <span>Request Full Document</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  )}
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
              <span>COLLABORATIVE RESEARCH & DIAGNOSTICS</span>
            </div>
            <h2>Partner with TrustGrid Labs on Frontier AI Engineering</h2>
            <p>
              Engage our systems architects for specialized architecture audits, inference benchmarking, or joint enterprise research initiatives.
            </p>
            <div className="cta-actions">
              <Link href="/book-ai-diagnostic" className="button button-primary">
                <span>Book Your AI Diagnostic Assessment</span>
                <ArrowUpRight size={16} />
              </Link>
              <Link href="/about" className="button button-ghost">
                <span>About Our Engineering Team</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

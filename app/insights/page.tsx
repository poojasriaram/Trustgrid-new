'use client'

import { FormEvent, useState, useEffect } from 'react'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { insightsArticles, InsightArticle } from '@/lib/insights-data'
import { allIndustries } from '@/lib/solutions'
import { submitTrustGridForm, validateEmail } from '@/lib/form-submission'
import { initUtmTracking } from '@/lib/tracking'
import {
  ArrowUpRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Sparkles,
  Trophy,
  Mail,
  Send,
  Loader2,
  AlertCircle
} from 'lucide-react'

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  // Newsletter Form State
  const [nlName, setNlName] = useState('')
  const [nlEmail, setNlEmail] = useState('')
  const [nlCompany, setNlCompany] = useState('')
  const [nlIndustry, setNlIndustry] = useState('')
  const [nlSubmitting, setNlSubmitting] = useState(false)
  const [nlSuccess, setNlSuccess] = useState(false)
  const [nlError, setNlError] = useState('')
  const [nlRefId, setNlRefId] = useState('')

  useEffect(() => {
    initUtmTracking()
  }, [])

  const filteredArticles = activeCategory === 'all'
    ? insightsArticles
    : insightsArticles.filter((art) => art.category.toLowerCase().replace(' ', '-') === activeCategory)

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setNlError('')

    if (!nlName.trim()) {
      setNlError('Please provide your name.')
      return
    }

    if (!nlEmail.trim() || !validateEmail(nlEmail)) {
      setNlError('Please provide a valid work email.')
      return
    }

    setNlSubmitting(true)

    const res = await submitTrustGridForm({
      formName: 'Newsletter / Insights Subscription',
      name: nlName,
      email: nlEmail,
      company: nlCompany || 'Enterprise Subscriber',
      industry: nlIndustry || 'Cross-Industry',
      message: 'Subscribed to TrustGrid Research & Whitepapers'
    })

    setNlSubmitting(false)

    if (res.success) {
      setNlRefId(res.submissionId || `TG-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-0001`)
      setNlSuccess(true)
    } else {
      setNlError(res.message || 'Unable to subscribe. Please try again.')
    }
  }

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

        {/* NEWSLETTER / INSIGHTS SUBSCRIPTION SECTION */}
        <section className="section" style={{ paddingTop: '20px', paddingBottom: '30px' }}>
          <div className="animated-card reveal-up" style={{
            background: '#ffffff',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(28px, 4vw, 40px)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#eff6ff', color: '#1d5cff', padding: '4px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '10px' }}>
                <Mail size={13} />
                <span>EXECUTIVE TECHNICAL BRIEFINGS</span>
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--foreground)', margin: '0 0 8px' }}>
                Subscribe to TrustGrid AI Engineering Dispatches
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--ink-soft)', margin: 0 }}>
                Receive peer-reviewed token economics benchmarks, hardware teardowns, and multi-agent safety whitepapers delivered directly to your inbox.
              </p>
            </div>

            {nlSuccess ? (
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '8px',
                padding: '24px',
                textAlign: 'center',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                <CheckCircle2 size={32} style={{ color: '#16a34a', margin: '0 auto 12px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#166534', margin: '0 0 6px' }}>
                  Thank you. Your subscription has been confirmed.
                </h3>
                <p style={{ fontSize: '13.5px', color: '#15803d', margin: 0 }}>
                  Reference ID: <strong>{nlRefId}</strong>. You will receive our next quarterly architecture whitepaper.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} style={{ maxWidth: '780px', margin: '0 auto' }} noValidate>
                {nlError && (
                  <div style={{
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '6px',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#991b1b',
                    fontSize: '13px',
                    marginBottom: '16px'
                  }}>
                    <AlertCircle size={16} />
                    <span>{nlError}</span>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                  <div className="input-group">
                    <span>Full Name *</span>
                    <input
                      type="text"
                      value={nlName}
                      onChange={(e) => setNlName(e.target.value)}
                      placeholder="e.g. Elena Rostova"
                      required
                    />
                  </div>

                  <div className="input-group">
                    <span>Work Email *</span>
                    <input
                      type="email"
                      value={nlEmail}
                      onChange={(e) => setNlEmail(e.target.value)}
                      placeholder="e.g. elena@company.com"
                      required
                    />
                  </div>

                  <div className="input-group">
                    <span>Company</span>
                    <input
                      type="text"
                      value={nlCompany}
                      onChange={(e) => setNlCompany(e.target.value)}
                      placeholder="e.g. TechCorp"
                    />
                  </div>

                  <div className="input-group">
                    <span>Industry</span>
                    <select
                      className="industry-dropdown"
                      value={nlIndustry}
                      onChange={(e) => setNlIndustry(e.target.value)}
                    >
                      <option value="">-- Select Industry --</option>
                      {allIndustries.map((ind) => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <button
                    type="submit"
                    disabled={nlSubmitting}
                    className="button button-card"
                    style={{ display: 'inline-flex', width: 'auto', padding: '12px 32px', gap: '8px' }}
                  >
                    {nlSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe to Whitepapers</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
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

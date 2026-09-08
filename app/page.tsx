'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowDown,
  ArrowUpRight,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Bot,
  Lock,
  Network,
  TrendingUp,
  Layers,
  Sparkles,
  CheckCircle2,
  Workflow,
  Zap,
  Clock,
  Gauge,
  Check,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MethodologyEngineSpecialSection } from '@/components/methodology-engine-special-section'
import {
  solutions,
  marketGaps,
  architectureStack,
  differentiationData,
  operatingPrinciples,
} from '@/lib/solutions'

const solutionIcons = [
  Cpu,
  Bot,
  ShieldCheck,
  Lock,
  Network,
  TrendingUp,
]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <main className="page-wrapper">
      <SiteHeader />

      {/* HERO SECTION */}
      <section className="hero" id="top">
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-badge-row">
            <span className="hero-badge">THE ENTERPRISE AI OPERATING COMPANY</span>
            <span className="hero-badge-tag">AGI ERA ARCHITECTURE</span>
          </div>

          <h1 className="hero-title">
            The enterprise AI operating company for the <em>AGI era.</em>
          </h1>

          <p className="hero-copy">
            TrustGrid is not an AI vendor. We are the engineering and operating company that enterprises trust to design, build, secure, govern, and continuously optimize the complete AI stack — from silicon to strategy, from infrastructure to autonomous agents, from first deployment to sustained enterprise value.
          </p>

          <div className="hero-thesis-pill">
            <Sparkles size={16} className="text-blue-400" />
            <span>
              <strong>Market Imperative:</strong> Intelligence without trust is risk. Infrastructure without autonomy is waste. TrustGrid delivers both.
            </span>
          </div>

          <div className="hero-actions">
            <Link className="button button-primary" href="/book-ai-diagnostic">
              Book an AI diagnostic <ArrowUpRight size={17} />
            </Link>
            <a className="button button-ghost" href="#solutions">
              Explore the 6 solutions <ArrowDown size={17} />
            </a>
            <a className="text-link" href="#stack">
              View operating stack <span>→</span>
            </a>
          </div>
        </div>

        {/* HERO TELEMETRY ORBIT / ASIDE */}
        <div className="hero-aside" aria-hidden="true">
          <div className="orbit-core">
            <span className="orbit-label">TRUSTGRID</span>
            <strong>OPERATING</strong>
            <strong>ENGINE</strong>
          </div>
          <div className="orbit-node node-1">
            <Cpu size={14} />
            <span>Infra Factory</span>
          </div>
          <div className="orbit-node node-2">
            <Bot size={14} />
            <span>Agent Fleets</span>
          </div>
          <div className="orbit-node node-3">
            <ShieldCheck size={14} />
            <span>Trusted AI</span>
          </div>
          <div className="orbit-node node-4">
            <Lock size={14} />
            <span>Quantum-Safe</span>
          </div>
          <div className="orbit-node node-5">
            <Network size={14} />
            <span>AI Fabrics</span>
          </div>
          <div className="orbit-node node-6">
            <TrendingUp size={14} />
            <span>Value Eng</span>
          </div>
          <span className="orbit-caption">VERIFIABLE • AUTONOMOUS • COMPOUNDING</span>
        </div>

        <div className="hero-footer">
          <div className="hero-footer-item">
            <span className="footer-stat">30–60%</span>
            <span className="footer-label">Inference Cost Reduction</span>
          </div>
          <div className="hero-footer-item">
            <span className="footer-stat">&gt;95%</span>
            <span className="footer-label">Multi-Step Agent Completion</span>
          </div>
          <div className="hero-footer-item">
            <span className="footer-stat">100%</span>
            <span className="footer-label">Cryptographic CBOM Visibility</span>
          </div>
          <div className="hero-footer-item">
            <span className="footer-stat">90 Days</span>
            <span className="footer-label">To Measurable Production ROI</span>
          </div>
        </div>
      </section>

      {/* WHY TRUSTGRID EXISTS - THE 5 GAPS */}
      <section className="section why-section" id="why">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">MARKET CONTEXT</span>
            <p className="section-label">Why TrustGrid Exists — The Market Imperative</p>
          </div>
          <span className="section-index">01</span>
        </div>

        <div className="why-heading">
          <h2>
            Five critical gaps stand between AI experimentation and <span>enterprise-grade operations.</span>
          </h2>
          <p>
            The global enterprise AI market is undergoing a fundamental phase transition. Organizations are no longer asking whether to adopt AI — they are asking how to industrialize it, trust it, secure it, and extract compounding value from it at scale.
          </p>
        </div>

        <div className="gap-grid">
          {marketGaps.map((gap, index) => (
            <article className="gap-card" key={gap.name}>
              <div className="gap-card-top">
                <span className="gap-card-num">{gap.number}</span>
                <span className="gap-card-tag">{gap.tagline}</span>
              </div>
              <h3 className="gap-card-title">{gap.name}</h3>
              <p className="gap-card-desc">{gap.description}</p>
              <div className="gap-card-footer">
                <span className="gap-resolution-label">TrustGrid Resolution:</span>
                <span className="gap-resolution-text">
                  {index === 0 && 'Purpose-engineered AI Factories with 30–70% higher GPU utilization.'}
                  {index === 1 && 'Industrialized multi-agent systems with persistent memory and governance.'}
                  {index === 2 && 'First-class explainability, auditability, and EU AI Act / NIST alignment.'}
                  {index === 3 && 'Zero-trust agent sandboxing and post-quantum PQC cryptographic migration.'}
                  {index === 4 && 'Rigorous operational excellence (TOC, Lean, DMAIC) and AI FinOps.'}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CROSS-SOLUTION ARCHITECTURE STACK */}
      <section className="section stack-section" id="stack">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">INTEGRATED OPERATING MODEL</span>
            <p className="section-label">Cross-Solution Architecture Statement</p>
          </div>
          <span className="section-index">02</span>
        </div>

        <div className="stack-heading">
          <h2>
            A vertically integrated operating stack for <span>enterprise AI.</span>
          </h2>
          <p>
            This is not a portfolio of disconnected services. Every layer reinforces every other layer, ensuring that your infrastructure, agents, trust, security, networking, transformation, and economics compound over time.
          </p>
        </div>

        <div className="stack-visual-wrapper">
          <div className="stack-flow-list">
            {architectureStack.map((item, index) => (
              <div key={item.number} className="stack-flow-item">
                <div className="stack-flow-node">
                  <div className="flow-node-index">{item.number}</div>
                  <div className="flow-node-content">
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </div>
                  <Link href={`/solutions/${item.slug}`} className="flow-node-link">
                    <span>Explore Layer</span>
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
                {index < architectureStack.length - 1 && (
                  <div className="flow-connector">
                    <div className="flow-line" />
                    <span className="flow-arrow">↓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 PRIMARY SOLUTIONS SHOWCASE */}
      <section className="section solutions-showcase" id="solutions">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">PRIMARY SOLUTIONS</span>
            <p className="section-label">The 6 Solution Areas</p>
          </div>
          <span className="section-index">03</span>
        </div>

        <div className="showcase-header">
          <h2>
            Engineered from silicon to strategy. <span>Explore each domain.</span>
          </h2>
          <p>
            Dive deep into each of TrustGrid's 6 core solution practices. Built for enterprise scale, regulatory scrutiny, and compounding return.
          </p>
        </div>

        <div className="solutions-grid">
          {solutions.map((solution, idx) => {
            const Icon = solutionIcons[idx] || Cpu
            return (
              <article key={solution.slug} className="solution-card">
                <div className="solution-card-top">
                  <div className="solution-card-icon-wrap">
                    <Icon size={24} className="solution-card-icon" />
                    <span className="solution-card-num">{solution.number}</span>
                  </div>
                  <span className="solution-card-tag">{solution.shortTitle}</span>
                </div>

                <h3 className="solution-card-title">{solution.label.split('. ')[1]}</h3>
                <p className="solution-card-hero-stmt">{solution.heroStatement}</p>

                <div className="solution-card-offerings">
                  <span className="offerings-heading">Core Engineering Offerings:</span>
                  <ul>
                    {solution.offerings.slice(0, 3).map((offering) => (
                      <li key={offering.title}>
                        <Check size={14} className="text-blue-500 shrink-0" />
                        <span>{offering.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="solution-card-metric-highlight">
                  <div className="metric-highlight-label">{solution.metrics[0].metric}</div>
                  <div className="metric-highlight-val">{solution.metrics[0].range}</div>
                </div>

                <div className="solution-card-actions">
                  <Link href={`/solutions/${solution.slug}`} className="button button-card">
                    <span>Explore {solution.shortTitle}</span>
                    <ArrowUpRight size={16} />
                  </Link>
                  <Link
                    href={`/book-ai-diagnostic?solution=${solution.slug}`}
                    className="card-quick-diag"
                  >
                    <span>Book Diagnostic</span>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* AI METHODOLOGY ENGINE SHOWCASE */}
      <section className="section methodology-section" id="methodology">
        <MethodologyEngineSpecialSection />
      </section>

      {/* DIFFERENTIATION FRAMEWORK */}
      <section className="section differentiation-section" id="differentiation">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">WHY TRUSTGRID IS DIFFERENT</span>
            <p className="section-label">TrustGrid vs Typical AI Vendors & Consultants</p>
          </div>
          <span className="section-index">05</span>
        </div>

        <div className="differentiation-heading">
          <h2>
            A fundamentally different model for <span>the AGI era.</span>
          </h2>
          <p>
            Most AI vendors deliver isolated point solutions or high-level slide decks. TrustGrid provides vertically integrated engineering, first-class trust, and outcome accountability.
          </p>
        </div>

        <div className="diff-table-wrapper">
          <table className="diff-table">
            <thead>
              <tr>
                <th style={{ width: '18%' }}>Dimension</th>
                <th style={{ width: '38%' }}>Typical AI Vendors / Consultants</th>
                <th style={{ width: '44%' }}>TrustGrid Operating Company</th>
              </tr>
            </thead>
            <tbody>
              {differentiationData.map((row) => (
                <tr key={row.dimension}>
                  <td className="diff-dim">
                    <strong>{row.dimension}</strong>
                  </td>
                  <td className="diff-typical">{row.typical}</td>
                  <td className="diff-tg">
                    <div className="diff-tg-content">
                      <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                      <span>{row.trustgrid}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* OPERATING PRINCIPLES */}
      <section className="section principles-section" id="principles">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">CORE DNA</span>
            <p className="section-label">TrustGrid Operating Principles</p>
          </div>
          <span className="section-index">06</span>
        </div>

        <div className="principles-grid">
          {operatingPrinciples.map((item) => (
            <div key={item.number} className="principle-card">
              <span className="principle-num">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GLOBAL DIAGNOSTIC CTA PANEL */}
      <section className="section cta-section" id="contact">
        <div className="cta-panel">
          <div className="cta-content">
            <span className="section-label" style={{ color: '#91b3ff' }}>
              GLOBAL CONTACT & ENGAGEMENT
            </span>
            <h2>
              Engineering enterprise AI for the <span>AGI era.</span>
            </h2>
            <p className="cta-lead">
              Every layer of the stack. Every dimension of trust. Every unit of value. Begin with a structured AI Diagnostic to assess your infrastructure, agentic readiness, trust posture, and value economics.
            </p>
            <div className="cta-highlights">
              <div className="cta-pill">
                <Check size={16} />
                <span>Executive-Level Clarity</span>
              </div>
              <div className="cta-pill">
                <Check size={16} />
                <span>Deep Systems Engineering</span>
              </div>
              <div className="cta-pill">
                <Check size={16} />
                <span>90-Day ROI Roadmap</span>
              </div>
            </div>
          </div>
          <div className="cta-actions">
            <Link className="button button-light" href="/book-ai-diagnostic">
              Book your AI diagnostic <ArrowUpRight size={17} />
            </Link>
            <span className="cta-subtext">Typically 2–4 weeks structured engagement with senior AI architects.</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <SiteFooter />
    </main>
  )
}

'use client'

import { useState, useEffect } from 'react'
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
  Building2,
  Boxes,
  Activity,
  ArrowRight,
  SlidersHorizontal,
  Compass,
  KeyRound,
  FileCheck,
  Eye,
  Filter
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

const engineNodes = [
  { id: 'infra', label: 'Infra Factory', icon: Cpu, layer: '01', desc: 'AI Factories, GPU cluster orchestration & 30–70% utilization gains' },
  { id: 'agents', label: 'Agent Fleets', icon: Bot, layer: '02', desc: 'Industrialized multi-agent DAGs with persistent memory & deterministic execution' },
  { id: 'trust', label: 'Trusted AI', icon: ShieldCheck, layer: '03', desc: 'Continuous assurance, explainability & EU AI Act / NIST governance' },
  { id: 'security', label: 'Quantum-Safe', icon: Lock, layer: '04', desc: 'Zero-trust agent sandboxing, CBOM visibility & post-quantum cryptography' },
  { id: 'networking', label: 'AI Fabrics', icon: Network, layer: '05', desc: 'Ultra-low latency RoCEv2/InfiniBand & congestion-free lossless fabrics' },
  { id: 'value', label: 'Value Eng', icon: TrendingUp, layer: '06', desc: 'TOC, Lean, DMAIC & FinOps tied directly to P&L business impact' },
]

export default function HomePage() {
  const [activeEngineNode, setActiveEngineNode] = useState<number | null>(null)
  const [activeStackLayer, setActiveStackLayer] = useState<number>(0)
  const [activeGapIndex, setActiveGapIndex] = useState<number>(0)
  const [solutionFilter, setSolutionFilter] = useState<string>('all')

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEngineNode((prev) => (prev === null ? 0 : (prev + 1) % engineNodes.length))
    }, 3800)
    return () => clearInterval(interval)
  }, [])

  const filteredSolutions = solutions.filter((sol) => {
    if (solutionFilter === 'all') return true
    if (solutionFilter === 'infra' && (sol.slug === 'ai-infra-engineering' || sol.slug === 'ai-networking')) return true
    if (solutionFilter === 'agents' && (sol.slug === 'ai-agentic-factory')) return true
    if (solutionFilter === 'trust' && (sol.slug === 'trusted-ai-transformation' || sol.slug === 'ai-cybersecurity-quantum-safe')) return true
    if (solutionFilter === 'value' && (sol.slug === 'ai-value-engineering')) return true
    return true
  })

  return (
    <main className="page-wrapper">
      <SiteHeader />

      {/* HERO SECTION */}
      <section className="hero" id="top">
        <div className="hero-grid-bg" />
        <div className="hero-glow-sphere" />

        <div className="hero-main-layout">
          <div className="hero-content">
            <div className="hero-badge-row">
              <span className="hero-badge">
                <span className="hero-pulse-dot" />
                THE ENTERPRISE AI OPERATING COMPANY
              </span>
              <span className="hero-badge-tag">AGI ERA ARCHITECTURE</span>
            </div>

            <h1 className="hero-title">
              The enterprise AI operating company for the <em>AGI era.</em>
            </h1>

            <p className="hero-copy">
              TrustGrid is not an AI vendor. We are the engineering and operating company that enterprises trust to design, build, secure, govern, and continuously optimize the complete AI stack — from silicon to strategy, from infrastructure to autonomous agents, from first deployment to sustained enterprise value.
            </p>

            <div className="hero-thesis-pill">
              <div className="thesis-icon-box">
                <Sparkles size={16} />
              </div>
              <span>
                <strong>Market Imperative:</strong> Intelligence without trust is risk. Infrastructure without autonomy is waste. TrustGrid delivers both.
              </span>
            </div>

            <div className="hero-actions">
              <Link className="button button-primary hero-btn-main" href="/book-ai-diagnostic">
                <span>Book an AI diagnostic</span>
                <ArrowUpRight size={17} />
              </Link>
              <a className="button button-ghost" href="#solutions">
                <span>Explore the 6 solutions</span>
                <ArrowDown size={17} />
              </a>
              <a className="text-link" href="#stack">
                <span>View operating stack</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* HERO INTERACTIVE OPERATING ENGINE DIAGRAM */}
          <div className="hero-aside" aria-label="TrustGrid Operating Engine Interactive Architecture">
            <div className="engine-orbit-canvas">
              {/* Ambient circuit grid lines */}
              <svg className="engine-circuit-svg" viewBox="0 0 440 440" fill="none">
                <circle cx="220" cy="220" r="190" stroke="rgba(29, 92, 255, 0.15)" strokeWidth="1" strokeDasharray="4 6" />
                <circle cx="220" cy="220" r="130" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" />
                <circle cx="220" cy="220" r="70" stroke="rgba(29, 92, 255, 0.25)" strokeWidth="1.5" />
                
                {/* Connecting bus lines to nodes */}
                <line x1="220" y1="220" x2="220" y2="40" stroke="rgba(29, 92, 255, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="220" y1="220" x2="376" y2="130" stroke="rgba(29, 92, 255, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="220" y1="220" x2="376" y2="310" stroke="rgba(29, 92, 255, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="220" y1="220" x2="220" y2="400" stroke="rgba(29, 92, 255, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="220" y1="220" x2="64" y2="310" stroke="rgba(29, 92, 255, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="220" y1="220" x2="64" y2="130" stroke="rgba(29, 92, 255, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>

              {/* Central Engine Core */}
              <div className="orbit-core">
                <div className="orbit-core-glow" />
                <span className="orbit-label">TRUSTGRID</span>
                <strong>OPERATING</strong>
                <strong>ENGINE</strong>
                <div className="orbit-status-tag">
                  <span className="live-pulse" />
                  ACTIVE MESH
                </div>
              </div>

              {/* 6 Interconnected Orbit Nodes */}
              {engineNodes.map((node, index) => {
                const Icon = node.icon
                const isActive = activeEngineNode === index
                return (
                  <div
                    key={node.id}
                    className={`orbit-node node-${index + 1} ${isActive ? 'active' : ''}`}
                    onMouseEnter={() => setActiveEngineNode(index)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${node.label}: ${node.desc}`}
                  >
                    <div className="node-icon-wrap">
                      <Icon size={16} />
                    </div>
                    <div className="node-text-wrap">
                      <span className="node-layer">{node.layer}</span>
                      <span className="node-title">{node.label}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Active Node Telemetry Live Card */}
            <div className="engine-telemetry-badge">
              <div className="telemetry-header">
                <span className="telemetry-indicator" />
                <span className="telemetry-title">
                  {activeEngineNode !== null ? engineNodes[activeEngineNode].label : 'OPERATING TELEMETRY'}
                </span>
                <span className="telemetry-layer">
                  {activeEngineNode !== null ? `LAYER ${engineNodes[activeEngineNode].layer}` : 'ALL LAYERS'}
                </span>
              </div>
              <p className="telemetry-desc">
                {activeEngineNode !== null
                  ? engineNodes[activeEngineNode].desc
                  : 'Hover or tap any layer to inspect the interconnected enterprise AI operating architecture.'}
              </p>
            </div>

            <span className="orbit-caption">VERIFIABLE • AUTONOMOUS • COMPOUNDING</span>
          </div>
        </div>

        {/* HERO PROOF METRICS STRIP */}
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

      {/* WHY TRUSTGRID EXISTS - THE 5 GAPS (MARKET IMPERATIVE) */}
      <section className="section why-section" id="why">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">01 / MARKET CONTEXT</span>
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

        {/* Interactive 5 Gaps Quick Navigation Pills */}
        <div className="gap-tab-bar">
          {marketGaps.map((gap, index) => (
            <button
              key={gap.number}
              className={`gap-tab-btn ${activeGapIndex === index ? 'active' : ''}`}
              onClick={() => {
                setActiveGapIndex(index)
                const target = document.getElementById(`gap-card-${index}`)
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }
              }}
            >
              <span className="tab-num">{gap.number}</span>
              <span>{gap.name}</span>
            </button>
          ))}
        </div>

        {/* Interactive 5 Gaps Card Showcase */}
        <div className="gaps-horizontal-container">
          <div className="gap-grid">
            {marketGaps.map((gap, index) => {
              const resolutions = [
                'Purpose-engineered AI Factories with 30–70% higher GPU utilization and low-latency scheduling.',
                'Industrialized multi-agent systems with persistent memory, tool sandboxing, and deterministic verification.',
                'First-class explainability, cryptographic audit trails, and automated EU AI Act / NIST alignment.',
                'Zero-trust agent isolation, runtime anomaly detection, and post-quantum PQC cryptographic migration.',
                'Rigorous operational excellence (TOC, Lean, DMAIC) and AI FinOps tied directly to P&L earnings.',
              ]

              return (
                <article
                  id={`gap-card-${index}`}
                  className={`gap-card animated-card ${activeGapIndex === index ? 'gap-active' : ''}`}
                  key={gap.name}
                  onClick={() => setActiveGapIndex(index)}
                  onMouseEnter={() => setActiveGapIndex(index)}
                >
                  <span className="card-corner-tl" />
                  <span className="card-corner-br" />

                  <div className="gap-card-top">
                    <span className="gap-card-num">{gap.number}</span>
                    <span className="gap-card-tag">{gap.tagline}</span>
                  </div>

                  <h3 className="gap-card-title">{gap.name}</h3>
                  <p className="gap-card-desc">{gap.description}</p>

                  <div className="gap-card-footer">
                    <div className="gap-res-header">
                      <CheckCircle2 size={15} className="text-blue-500 shrink-0" />
                      <span className="gap-resolution-label">TrustGrid Resolution:</span>
                    </div>
                    <p className="gap-resolution-text">{resolutions[index]}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* CROSS-SOLUTION ARCHITECTURE STACK */}
      <section className="section stack-section" id="stack">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">02 / INTEGRATED OPERATING MODEL</span>
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

        <div className="stack-interactive-layout">
          {/* 7-Layer Architecture Stack List */}
          <div className="stack-flow-list">
            {architectureStack.map((item, index) => {
              const isSelected = activeStackLayer === index
              return (
                <div
                  key={item.number}
                  className={`stack-flow-item ${isSelected ? 'selected' : ''}`}
                  onMouseEnter={() => setActiveStackLayer(index)}
                  onClick={() => setActiveStackLayer(index)}
                  tabIndex={0}
                  role="button"
                >
                  <div className="stack-flow-node animated-card reveal-up">
                    <span className="card-corner-tl" />
                    <span className="card-corner-br" />
                    <div className="flow-node-index">{item.number}</div>
                    <div className="flow-node-content">
                      <div className="flow-node-title-row">
                        <strong>{item.title}</strong>
                        <span className="flow-node-pill">Layer 0{index + 1}</span>
                      </div>
                      <p>{item.description}</p>
                    </div>
                    <Link href={`/solutions/${item.slug}`} className="flow-node-link">
                      <span>Explore</span>
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                  {index < architectureStack.length - 1 && (
                    <div className="flow-connector">
                      <div className="flow-line active-beam" />
                      <span className="flow-arrow">↓</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Architecture Visual Preview Card */}
          <div className="stack-layer-preview-card animated-card">
            <span className="card-corner-tl" />
            <span className="card-corner-br" />
            <div className="preview-card-header">
              <span className="preview-badge">ACTIVE LAYER ARCHITECTURE</span>
              <span className="preview-num">{architectureStack[activeStackLayer].number}</span>
            </div>
            <h3>{architectureStack[activeStackLayer].title}</h3>
            <p className="preview-desc">{architectureStack[activeStackLayer].description}</p>

            <div className="preview-highlights">
              <div className="preview-point">
                <Check size={14} className="text-blue-500 shrink-0" />
                <span>Vertically integrated with adjacent telemetry layers</span>
              </div>
              <div className="preview-point">
                <Check size={14} className="text-blue-500 shrink-0" />
                <span>Deterministic operational verification & auditability</span>
              </div>
              <div className="preview-point">
                <Check size={14} className="text-blue-500 shrink-0" />
                <span>Engineered for 90-day production ROI</span>
              </div>
            </div>

            <div className="preview-actions">
              <Link
                href={`/solutions/${architectureStack[activeStackLayer].slug}`}
                className="button button-primary button-sm"
              >
                <span>Deep Dive into Layer</span>
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href={`/book-ai-diagnostic?solution=${architectureStack[activeStackLayer].slug}`}
                className="button button-ghost button-sm"
              >
                <span>Audit This Layer</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6 PRIMARY SOLUTIONS SHOWCASE */}
      <section className="section solutions-showcase" id="solutions">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">03 / PRIMARY SOLUTIONS</span>
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

        {/* Filter Pills for Solution Areas */}
        <div className="solution-filter-bar">
          <button
            className={`filter-btn ${solutionFilter === 'all' ? 'active' : ''}`}
            onClick={() => setSolutionFilter('all')}
          >
            All 6 Solutions
          </button>
          <button
            className={`filter-btn ${solutionFilter === 'infra' ? 'active' : ''}`}
            onClick={() => setSolutionFilter('infra')}
          >
            Compute & Fabrics
          </button>
          <button
            className={`filter-btn ${solutionFilter === 'agents' ? 'active' : ''}`}
            onClick={() => setSolutionFilter('agents')}
          >
            Agentic AI & Factory
          </button>
          <button
            className={`filter-btn ${solutionFilter === 'trust' ? 'active' : ''}`}
            onClick={() => setSolutionFilter('trust')}
          >
            Trust & Security
          </button>
          <button
            className={`filter-btn ${solutionFilter === 'value' ? 'active' : ''}`}
            onClick={() => setSolutionFilter('value')}
          >
            Value & P&L
          </button>
        </div>

        <div className="solutions-grid">
          {filteredSolutions.map((solution) => {
            const originalIndex = solutions.findIndex((s) => s.slug === solution.slug)
            const Icon = solutionIcons[originalIndex] || Cpu

            return (
              <article key={solution.slug} className="solution-card animated-card reveal-up">
                <span className="card-corner-tl" />
                <span className="card-corner-br" />

                <div className="solution-card-top">
                  <div className="solution-card-icon-wrap">
                    <Icon size={22} className="solution-card-icon" />
                    <span className="solution-card-num">{solution.number}</span>
                  </div>
                  <span className="solution-card-tag">{solution.shortTitle}</span>
                </div>

                <h3 className="solution-card-title">{solution.label.split('. ')[1]}</h3>
                <p className="solution-card-hero-stmt">{solution.heroStatement}</p>

                <div className="solution-card-offerings">
                  <div className="offerings-header-row">
                    <span className="offerings-heading">Core Offerings</span>
                  </div>
                  <ul>
                    {solution.offerings.map((offering) => (
                      <li key={offering.title}>
                        <Check size={14} className="text-blue-500 shrink-0 mt-0.5" />
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
            <span className="section-badge">05 / WHY TRUSTGRID IS DIFFERENT</span>
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

        <div className="diff-table-wrapper animated-card reveal-up">
          <span className="card-corner-tl" />
          <span className="card-corner-br" />
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
                <tr key={row.dimension} className="diff-row-hover">
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

      {/* OPERATING PRINCIPLES (CORE DNA) */}
      <section className="section principles-section" id="principles">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">06 / CORE DNA</span>
            <p className="section-label">TrustGrid Operating Principles</p>
          </div>
          <span className="section-index">06</span>
        </div>

        <div className="principles-grid">
          {operatingPrinciples.map((item) => (
            <div key={item.number} className="principle-card animated-card reveal-up">
              <span className="card-corner-tl" />
              <span className="card-corner-br" />
              <div className="principle-top">
                <span className="principle-num">{item.number}</span>
                <span className="principle-bullet-dot" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GLOBAL DIAGNOSTIC CTA PANEL */}
      <section className="section cta-section" id="contact">
        <div className="cta-panel animated-card reveal-up">
          <span className="card-corner-tl" />
          <span className="card-corner-br" />
          <div className="cta-circuit-bg" />
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
              <span>Book your AI diagnostic</span>
              <ArrowUpRight size={17} />
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

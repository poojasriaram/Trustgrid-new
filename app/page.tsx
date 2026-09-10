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
  Filter,
  BarChart3,
  Globe2,
  FileSpreadsheet,
  Award,
  Users
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
  allIndustries,
} from '@/lib/solutions'

const primaryOfferings = [
  {
    num: '01',
    groupTag: 'GROUP 1',
    title: 'Agentic Enterprise',
    slug: 'ai-agentic-factory',
    icon: Bot,
    badge: 'AUTONOMOUS OPERATIONS',
    problem: 'Enterprises remain trapped in fragile chatbot pilots unable to execute multi-step business operations.',
    solution: 'Architect, deploy, and govern production multi-agent systems with deterministic reasoning DAGs, persistent memory fabrics, and native Model Context Protocol (MCP) integrations.',
    deliverables: [
      'Autonomous Agent Design & Cognitive Blueprinting',
      'Multi-Agent Orchestration (LangGraph / CrewAI / AutoGen)',
      'Vertical Agent Fleets (Finance, Supply Chain, SRE)',
      'Enterprise AgentOps, Tracing & Real-Time Guardrails'
    ],
    metric: '>95% Task Accuracy with Deterministic SLA',
    duration: '6–12 Wks Sprints'
  },
  {
    num: '02',
    groupTag: 'GROUP 2',
    title: 'AI Infra & Data Center',
    slug: 'ai-infra-engineering',
    icon: Cpu,
    badge: 'HIGH-DENSITY COMPUTE',
    problem: 'GPU clusters suffer from 30–50% utilization while data center power & cooling walls halt scale.',
    solution: 'Turnkey engineering of high-density AI Factories (30–100kW/rack) with direct-to-chip liquid cooling, kernel-level accelerator tuning, and low-latency inference serving.',
    deliverables: [
      'High-Density Facility & Liquid Cooling Engineering',
      'Accelerator Cluster Topology (Blackwell, HGX, MI300X)',
      'Inference Optimization & KV-Cache Management',
      '24/7 Managed AI Factory & Predictive Maintenance'
    ],
    metric: '30–60% Inference Cost Reduction (TCO)',
    duration: '8–16 Wks Full Deployment'
  },
  {
    num: '03',
    groupTag: 'GROUP 3',
    title: 'AI Networking',
    slug: 'ai-networking',
    icon: Network,
    badge: 'LOSSLESS FABRIC',
    problem: 'Inter-node latency spikes and silent packet drops stall distributed AI training and inference.',
    solution: 'Ultra-low latency, non-blocking InfiniBand and RoCEv2 network fabrics engineered for zero packet loss, rail-optimized node alignment, and autonomous NOC telemetry.',
    deliverables: [
      'Lossless RoCEv2 & Quantum-2 InfiniBand Fabrics',
      'Rail-Optimized Dragonfly+ & Fat-Tree Topologies',
      'Collective Communications Tuning (NCCL / RCCL)',
      'Autonomous AI NOC & Telemetry-Driven Self-Healing'
    ],
    metric: 'Zero-Loss Packet Flow & Minimized Tail Jitter',
    duration: '4–8 Wks Optimization'
  },
  {
    num: '04',
    groupTag: 'GROUP 4',
    title: 'AI Cybersecurity',
    slug: 'ai-cybersecurity-quantum-safe',
    icon: Lock,
    badge: 'QUANTUM-SAFE DEFENSE',
    problem: 'Novel AI attack surfaces (prompt injection, agent hijacking) paired with Harvest Now Decrypt Later quantum threats.',
    solution: 'Comprehensive security engineering protecting autonomous agents with zero-trust permissions while migrating enterprise cryptography to NIST Post-Quantum Cryptographic standards.',
    deliverables: [
      'L1–L7 Post-Quantum Cryptography (PQC / CBOM)',
      'Agent Guardrails, Prompt Firewalls & Model Defense',
      'Zero-Trust Identity for Non-Deterministic Agents',
      '24/7 Managed AI Security Operations Center (AI SOC)'
    ],
    metric: '100% Cryptographic Bill of Materials (CBOM) Visibility',
    duration: '6–12 Wks Transition'
  },
  {
    num: '05',
    groupTag: 'GROUP 5',
    title: 'AI Value Engineering',
    slug: 'ai-value-engineering',
    icon: TrendingUp,
    badge: 'FINANCIAL ATTRIBUTION',
    problem: 'Opaque AI returns, untracked token sprawl, and failure to bridge compute spend directly to CFO balance sheets.',
    solution: 'Industrial operational excellence (Lean Thinking, Theory of Constraints, DMAIC) combined with AI FinOps to prioritize high-yield initiatives and ensure compounding business ROI.',
    deliverables: [
      'AI Value Discovery & Economic Opportunity Mapping',
      'Unit Economics & Cost-Per-Task Token Modeling',
      'Theory of Constraints (TOC) Bottleneck Removal',
      'Value Realization Office (VRO) Governance & Dashboards'
    ],
    metric: '3–10x Measurable Production ROI in 90 Days',
    duration: '4–12 Wks Value Sprint'
  }
]

const proofMetrics = [
  { val: '30–60%', label: 'Inference Cost Reduction', desc: 'Granular KV-cache & kernel optimization' },
  { val: '30–100kW', label: 'High-Density Rack Envelope', desc: 'Liquid-cooled AI factory topologies' },
  { val: 'Zero', label: 'Packet Drop AI Fabrics', desc: 'Lossless InfiniBand & RoCEv2 networks' },
  { val: 'L1–L7', label: 'Post-Quantum Defense', desc: 'NIST PQC & CBOM cryptographic resilience' },
  { val: '3–10x', label: 'Realized Enterprise ROI', desc: 'Lean & TOC economic value engineering' }
]

const engagementStages = [
  {
    step: '01',
    name: 'Discover',
    duration: '1–2 Wks',
    desc: 'Map enterprise AI workflows, assess technical feasibility, and quantify economic opportunity candidates.',
    deliverable: 'Opportunity Prioritization Matrix'
  },
  {
    step: '02',
    name: 'Diagnose',
    duration: '2–4 Wks',
    desc: 'Deep audit of compute infrastructure, cluster utilization, agent security posture, and token unit costs.',
    deliverable: 'Full Architectural Diagnostic Report'
  },
  {
    step: '03',
    name: 'Design',
    duration: '3–6 Wks',
    desc: 'Formulate target state architectures, cognitive DAG blueprints, high-density topologies, and FinOps models.',
    deliverable: 'Engineering Blueprint & Roadmap'
  },
  {
    step: '04',
    name: 'Engineer',
    duration: '6–16 Wks',
    desc: 'Deploy, configure, and validate production multi-agent systems, compute fabrics, and cryptographic guardrails.',
    deliverable: 'Production-Ready Stack Deployment'
  },
  {
    step: '05',
    name: 'Optimize',
    duration: 'Ongoing',
    desc: 'Continuous kernel profiling, token cost reduction, agent accuracy calibration, and constraint elimination.',
    deliverable: 'Weekly Telemetry & Value Metrics'
  },
  {
    step: '06',
    name: 'Scale',
    duration: 'Continuous',
    desc: 'Expand industrialized agent fleets and dedicated AI factories across business units with VRO governance.',
    deliverable: 'Enterprise AI Operating System'
  }
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEngineNode((prev) => (prev === null ? 0 : (prev + 1) % engineNodes.length))
    }, 3800)
    return () => clearInterval(interval)
  }, [])

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
                ENTERPRISE AI OPERATING COMPANY
              </span>
              <span className="hero-badge-tag">OFFERING-LED • OUTCOME-DRIVEN</span>
            </div>

            <h1 className="hero-title">
              From Infrastructure to Intelligence. <em>Engineered for Scale.</em>
            </h1>

            <p className="hero-copy">
              TrustGrid is the engineering and value realization partner that global enterprises trust to design, deploy, secure, and operate the complete AI lifecycle — from high-density GPU infrastructure and lossless network fabrics to autonomous agent fleets and CFO-defensible ROI.
            </p>

            <div className="hero-thesis-pill">
              <div className="thesis-icon-box">
                <Sparkles size={16} />
              </div>
              <span>
                <strong>Strategic Core:</strong> What business problem are we solving? Here is the offering engineered to deliver verifiable, compounding enterprise outcomes.
              </span>
            </div>

            <div className="hero-actions">
              <Link className="button button-primary hero-btn-main" href="/book-ai-diagnostic">
                <span>Book an AI Diagnostic</span>
                <ArrowUpRight size={17} />
              </Link>
              <a className="button button-ghost" href="#offerings">
                <span>Explore 5 Core Offerings</span>
                <ArrowDown size={17} />
              </a>
              <Link className="text-link" href="/contact">
                <span>Talk to an Architect</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* HERO INTERACTIVE OPERATING ENGINE DIAGRAM */}
          <div className="hero-aside" aria-label="TrustGrid Operating Engine Interactive Architecture">
            <div className="engine-orbit-canvas">
              <svg className="engine-circuit-svg" viewBox="0 0 440 440" fill="none">
                <circle cx="220" cy="220" r="190" stroke="rgba(29, 92, 255, 0.15)" strokeWidth="1" strokeDasharray="4 6" />
                <circle cx="220" cy="220" r="130" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" />
                <circle cx="220" cy="220" r="70" stroke="rgba(29, 92, 255, 0.25)" strokeWidth="1.5" />
                
                <line x1="220" y1="220" x2="220" y2="40" stroke="rgba(29, 92, 255, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="220" y1="220" x2="376" y2="130" stroke="rgba(29, 92, 255, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="220" y1="220" x2="376" y2="310" stroke="rgba(29, 92, 255, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="220" y1="220" x2="220" y2="400" stroke="rgba(29, 92, 255, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="220" y1="220" x2="64" y2="310" stroke="rgba(29, 92, 255, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="220" y1="220" x2="64" y2="130" stroke="rgba(29, 92, 255, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>

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
          {proofMetrics.map((pm, idx) => (
            <div key={idx} className="hero-footer-item">
              <span className="footer-stat">{pm.val}</span>
              <span className="footer-label">{pm.label}</span>
              <span className="text-xs opacity-75 mt-0.5 block">{pm.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5 PRIMARY MARKET OFFERINGS SHOWCASE */}
      <section className="section offerings-showcase" id="offerings">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">01 / PRIMARY OFFERINGS</span>
            <p className="section-label">Enterprise AI Offering Architecture</p>
          </div>
          <span className="section-index">01</span>
        </div>

        <div className="showcase-header">
          <h2>
            Purpose-built offerings. <span>Engineered for enterprise outcomes.</span>
          </h2>
          <p>
            Five dedicated engineering practices designed to solve the critical bottlenecks in compute efficiency, multi-agent autonomy, network throughput, cybersecurity, and financial realization.
          </p>
        </div>

        <div className="offerings-enterprise-grid">
          {primaryOfferings.map((offering) => {
            const Icon = offering.icon
            return (
              <article key={offering.slug} className="offering-enterprise-card animated-card reveal-up">
                <span className="card-corner-tl" />
                <span className="card-corner-br" />

                <div className="offering-card-head">
                  <div className="offering-icon-badge-box">
                    <div className="offering-icon-wrap">
                      <Icon size={24} className="text-blue-500" />
                    </div>
                    <div>
                      <span className="offering-group-tag">{offering.groupTag}</span>
                      <span className="offering-status-badge">{offering.badge}</span>
                    </div>
                  </div>
                  <span className="offering-card-number">{offering.num}</span>
                </div>

                <h3 className="offering-card-heading">
                  <Link href={`/solutions/${offering.slug}`}>{offering.title}</Link>
                </h3>

                <div className="offering-problem-box">
                  <span className="problem-tag">Buyer Problem Addressed:</span>
                  <p>{offering.problem}</p>
                </div>

                <p className="offering-solution-scope">{offering.solution}</p>

                <div className="offering-deliverables-list">
                  <span className="deliverables-heading">Key Engineering Deliverables:</span>
                  <ul>
                    {offering.deliverables.map((item, i) => (
                      <li key={i}>
                        <Check size={14} className="text-blue-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="offering-card-impact-bar">
                  <div className="impact-metric-pill">
                    <BarChart3 size={14} className="text-blue-500" />
                    <span>{offering.metric}</span>
                  </div>
                  <div className="impact-duration-pill">
                    <Clock size={13} className="text-slate-400" />
                    <span>{offering.duration}</span>
                  </div>
                </div>

                <div className="offering-card-footer-actions">
                  <Link href={`/solutions/${offering.slug}`} className="button button-card">
                    <span>Explore {offering.title}</span>
                    <ArrowUpRight size={16} />
                  </Link>
                  <Link
                    href={`/book-ai-diagnostic?solution=${offering.slug}`}
                    className="card-quick-diag"
                  >
                    <span>Book Diagnostic →</span>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* WHY TRUSTGRID EXISTS - THE 5 GAPS (MARKET IMPERATIVE) */}
      <section className="section why-section" id="why">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">02 / MARKET CONTEXT</span>
            <p className="section-label">Why TrustGrid Exists — The 5 Critical Gaps</p>
          </div>
          <span className="section-index">02</span>
        </div>

        <div className="why-heading">
          <h2>
            Five critical gaps stand between AI experimentation and <span>enterprise-grade operations.</span>
          </h2>
          <p>
            Organizations are moving beyond exploratory prototypes. They require industrial engineering rigor to solve infrastructure waste, unmonitored agent hallucination, network congestion, and ambiguous ROI.
          </p>
        </div>

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

        <div className="gaps-horizontal-container">
          <div className="gap-grid">
            {marketGaps.map((gap, index) => {
              const resolutions = [
                'Purpose-engineered AI Factories with 30–70% higher GPU utilization and low-latency serving.',
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
            <span className="section-badge">03 / 5-LAYER OPERATING MODEL</span>
            <p className="section-label">Integrated Full-Stack Architecture</p>
          </div>
          <span className="section-index">03</span>
        </div>

        <div className="stack-heading">
          <h2>
            A vertically integrated operating stack for <span>enterprise AI.</span>
          </h2>
          <p>
            Every layer reinforces every adjacent layer. Infrastructure feeds lossless networks; networks sustain low-latency compute; compute powers autonomous agents; cybersecurity protects execution; and value engineering guarantees compounding financial yield.
          </p>
        </div>

        <div className="stack-interactive-layout">
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

      {/* 6-STAGE ENGAGEMENT JOURNEY */}
      <section className="section engagement-section" id="engagement">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">04 / ENGAGEMENT JOURNEY</span>
            <p className="section-label">The 6-Stage Path from Diagnostic to Production Scale</p>
          </div>
          <span className="section-index">04</span>
        </div>

        <div className="engagement-heading">
          <h2>
            Structured, accountable execution. <span>From Diagnostic to Compounding Value.</span>
          </h2>
          <p>
            We do not sell open-ended consulting hours or vague prototypes. Every engagement follows a deterministic engineering pathway with explicit deliverables, milestones, and verifiable business impact.
          </p>
        </div>

        <div className="engagement-grid">
          {engagementStages.map((st) => (
            <div key={st.step} className="engagement-card animated-card reveal-up">
              <span className="card-corner-tl" />
              <span className="card-corner-br" />
              <div className="engagement-card-head">
                <span className="engagement-step-num">{st.step}</span>
                <span className="engagement-duration-badge">{st.duration}</span>
              </div>
              <h3 className="engagement-step-name">{st.name}</h3>
              <p className="engagement-step-desc">{st.desc}</p>
              <div className="engagement-deliverable-box">
                <span className="deliverable-label">Key Deliverable:</span>
                <strong>{st.deliverable}</strong>
              </div>
            </div>
          ))}
        </div>

        <div className="engagement-cta-bar">
          <div>
            <strong>Ready to begin your enterprise assessment?</strong>
            <p className="text-sm opacity-80 mt-0.5">Start with a structured, senior architect-led AI Diagnostic.</p>
          </div>
          <Link href="/book-ai-diagnostic" className="button button-primary">
            <span>Book Your AI Diagnostic</span>
            <ArrowUpRight size={16} />
          </Link>
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
            <p className="section-label">TrustGrid vs Typical AI Vendors & Strategy Consultancies</p>
          </div>
          <span className="section-index">05</span>
        </div>

        <div className="differentiation-heading">
          <h2>
            A fundamentally different model for <span>the AGI era.</span>
          </h2>
          <p>
            Most AI vendors deliver isolated point tools or PowerPoint strategy decks. TrustGrid delivers full-stack systems engineering, hardware-level rigor, and verifiable P&L outcome accountability.
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

      {/* 20+ REGULATED INDUSTRIES DOMAIN COVERAGE */}
      <section className="section industries-section" id="industries">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">06 / DOMAIN MASTERY</span>
            <p className="section-label">Engineered Across 20+ Regulated Global Industries</p>
          </div>
          <span className="section-index">06</span>
        </div>

        <div className="industries-heading">
          <h2>
            Deep domain specialization. <span>Zero generic solutions.</span>
          </h2>
          <p>
            Our engineering architectures, agent fleets, and compliance models are pre-calibrated to the strict regulatory and operational realities of mission-critical global industries.
          </p>
        </div>

        <div className="industries-pill-grid">
          {allIndustries.map((ind, i) => (
            <div key={i} className="industry-coverage-card">
              <Building2 size={16} className="text-blue-500 shrink-0" />
              <span>{ind}</span>
            </div>
          ))}
        </div>
      </section>

      {/* OPERATING PRINCIPLES (CORE DNA) */}
      <section className="section principles-section" id="principles">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">07 / CORE DNA</span>
            <p className="section-label">TrustGrid Operating Principles</p>
          </div>
          <span className="section-index">07</span>
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
            <Link className="button button-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.25)' }} href="/contact">
              <span>Contact Us Directly</span>
              <ArrowRight size={16} />
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


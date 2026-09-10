import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowUpRight,
  ChevronRight,
  Check,
  Cpu,
  Bot,
  ShieldCheck,
  Lock,
  Network,
  TrendingUp,
  Layers,
  Sparkles,
  Briefcase,
  Wrench,
  Gauge,
  Calendar,
  Building2,
  Workflow,
  Target,
  BarChart3,
  CheckCircle2,
  Clock,
  Zap,
  ArrowRight,
  ShieldAlert,
  SlidersHorizontal,
  FileSpreadsheet
} from 'lucide-react'
import { getSolution, solutions, allIndustries, Solution, logoUrl, differentiationData } from '@/lib/solutions'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

const solutionIcons = {
  'ai-infra-engineering': Cpu,
  'ai-agentic-factory': Bot,
  'trusted-ai-transformation': ShieldCheck,
  'ai-cybersecurity-quantum-safe': Lock,
  'ai-networking': Network,
  'ai-value-engineering': TrendingUp,
}

// 5-Layer Engineering Architecture Mappings
const fiveLayerModels: Record<string, { name: string; purpose: string; components: string[]; outcome: string }[]> = {
  'ai-agentic-factory': [
    { name: 'Layer 01: Cognitive Foundation', purpose: 'Establish reasoning models, memory architectures, and MCP interfaces.', components: ['Model Context Protocol (MCP) servers', 'Episodic & vector semantic memory', 'ReAct / Tree-of-Thought planning'], outcome: 'Standardized tool integration and durable cross-session context' },
    { name: 'Layer 02: Multi-Agent Orchestration', purpose: 'Coordinate specialized agent swarms with deterministic execution DAGs.', components: ['LangGraph / AutoGen / CrewAI engines', 'Agent-to-Agent (A2A) protocol', 'Consensus & conflict resolution'], outcome: 'Deadlock-free, predictable multi-agent collaboration' },
    { name: 'Layer 03: Domain Reasoning & Connectors', purpose: 'Equip agent teams with industry schemas and enterprise connectors.', components: ['ERP/CRM/ITSM enterprise connectors', 'Dynamic few-shot context retrieval', 'Test-time compute allocation'], outcome: 'High-precision task execution in complex domain systems' },
    { name: 'Layer 04: AgentOps & Governance', purpose: 'Continuous real-time observability, policy enforcement, and validation.', components: ['Distributed trace logging', 'Real-time safety guardrails', 'Human-in-the-loop approval gates'], outcome: 'Deterministic compliance and complete decision auditability' },
    { name: 'Layer 05: Autonomous Business Outcome', purpose: 'Embed digital workers into core enterprise operations to compound productivity.', components: ['Autonomous finance reconciliation', 'Supply chain inventory balancing', 'Autonomous SRE incident loops'], outcome: '50–80% reduction in operational cycle times' }
  ],
  'ai-infra-engineering': [
    { name: 'Layer 01: High-Density Physical Facility', purpose: 'Build the physical, electrical, and thermal envelope for extreme density.', components: ['Direct-to-chip liquid cooling', '30–100kW per rack distribution', 'PUE optimization & power conditioning'], outcome: 'Uninterrupted power & thermal stability for dense compute' },
    { name: 'Layer 02: Accelerator Cluster Topology', purpose: 'Interconnect GPU/ASIC compute nodes and ultra-fast NVMe storage.', components: ['NVIDIA HGX/Blackwell & AMD MI300X', 'NVMe-over-Fabrics parallel storage', 'Lossless cluster interconnects'], outcome: 'Continuous data feeding without GPU I/O starvation' },
    { name: 'Layer 03: Inference & Serving Acceleration', purpose: 'Minimize latency and cost-per-token through runtime kernel optimization.', components: ['PagedAttention KV-cache management', 'Continuous batching & chunked prefill', 'INT4/INT8/FP8 quantization runtimes'], outcome: '30–60% reduction in production cost-per-token' },
    { name: 'Layer 04: Cluster Workload Operations', purpose: 'Maximize equipment effectiveness and balance multi-tenant resource demand.', components: ['Workload-aware scheduling', 'MIG/vGPU partition management', 'Thermal telemetry & predictive maintenance'], outcome: '30–70% higher GPU cluster utilization yield' },
    { name: 'Layer 05: Sovereign & Economical AI Factory', purpose: 'Deliver fully controlled, cost-governed enterprise intelligence production.', components: ['Private/sovereign AI deployment', 'Total cost of ownership modeling', 'Carbon-optimized compute scheduling'], outcome: 'Predictable, sustainable intelligence scaling' }
  ],
  'ai-networking': [
    { name: 'Layer 01: Physical Optics & Cabling', purpose: 'Ensure flawless physical signal integrity across high-speed connections.', components: ['400G/800G OSFP/QSFP optics', 'Structured high-density fiber arrays', 'Low-loss active optical cables'], outcome: 'Clean, error-free physical signal transmission' },
    { name: 'Layer 02: Non-Blocking Switching Fabric', purpose: 'Design symmetrical switching topologies for collective AI communication.', components: ['Fat-Tree & Dragonfly+ topologies', 'Quantum-2 InfiniBand & Spectrum-X', 'Rail-optimized node alignment'], outcome: 'Non-blocking, low-latency inter-accelerator bandwidth' },
    { name: 'Layer 03: Congestion Control & Collective Tuning', purpose: 'Eliminate buffer overruns and synchronization wait times.', components: ['NCCL / RCCL collective library tuning', 'DCQCN & Priority Flow Control (PFC)', 'Adaptive packet routing engines'], outcome: 'Zero packet loss and minimized tail latency jitter' },
    { name: 'Layer 04: Autonomous AI NOC & Telemetry', purpose: 'Real-time packet telemetry and proactive self-healing network operations.', components: ['In-band Network Telemetry (INT)', 'Automated link degradation detection', 'Non-Terrestrial Network (NTN) integration'], outcome: 'Proactive incident resolution and zero job restarts' },
    { name: 'Layer 05: Distributed Intelligence Transport', purpose: 'Seamless data mobility from remote edge devices to core AI compute clusters.', components: ['Edge-to-cloud transport fabrics', 'Satellite / 5G NTN connectivity', 'Unified data transport mesh'], outcome: 'Real-time distributed data movement at global scale' }
  ],
  'ai-cybersecurity-quantum-safe': [
    { name: 'Layer 01: Cryptographic Inventory & PQC', purpose: 'Discover cryptographic assets and transition to NIST quantum-safe algorithms.', components: ['Automated Cryptographic Bill of Materials (CBOM)', 'NIST PQC migration (ML-KEM, ML-DSA)', 'Post-quantum TLS & PKI infrastructure'], outcome: 'Full immunity against Harvest Now Decrypt Later attacks' },
    { name: 'Layer 02: Model & Pipeline Protection', purpose: 'Secure training environments, fine-tuning data, and model weights.', components: ['Model weight signing & provenance', 'Data poisoning detection engines', 'Confidential compute & secure enclaves'], outcome: 'Tamper-proof AI intellectual property and training integrity' },
    { name: 'Layer 03: Runtime Guardrails & Prompt Defense', purpose: 'Sanitize runtime inputs and filter non-deterministic outputs in real-time.', components: ['Prompt injection firewalls', 'Semantic jailbreak detection', 'Output hallucination & PII filters'], outcome: 'Safe, policy-bounded model execution' },
    { name: 'Layer 04: Zero-Trust Agent IAM & AI SOC', purpose: 'Enforce ephemeral permissions and monitor agent execution paths 24/7.', components: ['Ephemeral tool-access tokens', 'AI-aware SIEM/SOC correlation', 'Tamper-proof immutable audit logs'], outcome: 'Least-privilege agent autonomy and instant threat containment' },
    { name: 'Layer 05: Enterprise Trust & Regulatory Posture', purpose: 'Provide verifiable compliance with global AI and data protection standards.', components: ['NIST AI RMF & ISO 42001 governance', 'EU AI Act compliance reporting', 'Board-level cyber risk dashboards'], outcome: 'Confident, board-approved enterprise AI scaling' }
  ],
  'ai-value-engineering': [
    { name: 'Layer 01: Economic Value Discovery', purpose: 'Identify and prioritize high-yield enterprise AI opportunities.', components: ['Value stream opportunity mapping', 'Technical feasibility scoring', 'Preliminary ROI business case modeling'], outcome: 'Prioritized roadmap of high-yield AI initiatives' },
    { name: 'Layer 02: Unit Economics & FinOps Modeling', purpose: 'Establish transparent cost-per-task and token consumption attribution.', components: ['Granular inference cost models', 'Total Cost of Ownership (TCO) calculators', 'Cloud vs on-prem cost benchmarking'], outcome: 'Predictable, margin-preserving AI unit economics' },
    { name: 'Layer 03: Operational Excellence & Bottleneck Removal', purpose: 'Apply industrial engineering rigor to accelerate system throughput.', components: ['Theory of Constraints (TOC) analysis', 'Lean compute waste elimination', 'DMAIC latency & quality improvement'], outcome: 'Maximized operational throughput and minimized cycle times' },
    { name: 'Layer 04: Value Realization Office (VRO)', purpose: 'Institutionalize ongoing financial governance and performance tracking.', components: ['Real-time FinOps budget alerting', 'Value realization executive dashboards', 'Hoshin Kanri strategic cascading'], outcome: 'Continuous budget adherence and tracked ROI' },
    { name: 'Layer 05: Compounding Enterprise Advantage', purpose: 'Turn AI capabilities into a sustainable, balance-sheet-accretive engine.', components: ['Executive value realization reports', 'Capital reinvestment models', 'Enterprise AI Operating System'], outcome: '3–10x verified ROI and compounding business valuation' }
  ]
}

// Temporal Spectrum Mappings
const temporalSpectrums: Record<string, { phase: string; title: string; focus: string; outcome: string }[]> = {
  default: [
    { phase: 'NOW', title: 'Assess & Benchmark', focus: 'Audit existing systems, identify bottlenecks, and establish baseline performance metrics.', outcome: 'Actionable diagnostic & gap prioritization roadmap' },
    { phase: 'NEXT', title: 'Optimize & Re-architect', focus: 'Deploy targeted architectural improvements, guardrails, and runtime acceleration.', outcome: 'Immediate 30–60% efficiency & throughput gains' },
    { phase: 'SCALE', title: 'Industrialize & Expand', focus: 'Roll out enterprise-grade fleets, high-density pods, and multi-tenant operations.', outcome: 'Predictable, continuous enterprise-wide scaling' },
    { phase: 'FUTURE', title: 'Autonomous Compounding', focus: 'Self-tuning architectures, closed-loop telemetry, and quantum-hybrid readiness.', outcome: 'Defensible, compounding competitive advantage' }
  ]
}

export function generateStaticParams() {
  const params: { slug: string }[] = []
  solutions.forEach((sol) => {
    params.push({ slug: sol.slug })
    if (sol.aliases) {
      sol.aliases.forEach((alias) => params.push({ slug: alias }))
    }
  })
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const solution = getSolution(slug)
  if (!solution) return {}

  return {
    title: `${solution.label} | TrustGrid.ai`,
    description: solution.heroStatement,
    alternates: { canonical: `/solutions/${solution.slug}` },
    openGraph: {
      title: `${solution.label} | TrustGrid.ai`,
      description: solution.heroStatement,
    },
  }
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const solution = getSolution(slug)
  if (!solution) notFound()

  const currentIndex = solutions.findIndex((s) => s.slug === solution.slug)
  const nextSolution = solutions[(currentIndex + 1) % solutions.length]
  const SolutionIcon = solutionIcons[solution.slug as keyof typeof solutionIcons] || Cpu
  const fiveLayerModel = fiveLayerModels[solution.slug] || fiveLayerModels['ai-agentic-factory']
  const temporalSpectrum = temporalSpectrums[solution.slug] || temporalSpectrums['default']

  return (
    <main className="page-wrapper">
      <SiteHeader />

      {/* LAYER 01: HERO HEADER & POSITIONING */}
      <section className="solution-hero">
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="solution-badge-row">
            <span className="solution-badge-num">{solution.number}</span>
            <span className="solution-badge-label">{solution.label}</span>
          </div>

          <h1 className="solution-hero-title">{solution.shortTitle}</h1>
          <p className="solution-hero-copy">{solution.heroStatement}</p>

          <div className="solution-hero-actions">
            <Link
              className="button button-primary"
              href={`/book-ai-diagnostic?solution=${solution.slug}`}
            >
              <span>Book {solution.shortTitle} Diagnostic</span>
              <ArrowUpRight size={17} />
            </Link>
            <a className="button button-ghost" href="#architecture">
              <span>View 5-Layer Model</span>
              <ChevronRight size={16} />
            </a>
            <a className="text-link" href="#engagement">
              <span>Engagement Journey</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>

        {/* Dynamic Metadata Strip */}
        <div className="hero-footer">
          <span>{solution.label}</span>
          <span>FULL-STACK ENTERPRISE AI ENGINEERING</span>
        </div>
      </section>

      {/* LAYER 02: OUTCOMES / PROOF BAR */}
      <section className="solution-outcomes-bar">
        <div className="outcomes-bar-inner">
          {solution.metrics.slice(0, 4).map((m, idx) => (
            <div key={idx} className="outcome-metric-card">
              <span className="outcome-metric-val">{m.range}</span>
              <span className="outcome-metric-label">{m.metric}</span>
            </div>
          ))}
        </div>
      </section>

      {/* LAYER 03: THE ENTERPRISE CHALLENGE / PAIN POINTS */}
      <section className="section solution-context-section" id="challenge">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">01 / THE ENTERPRISE CHALLENGE</span>
            <p className="section-label">Operational Realities & Architectural Friction</p>
          </div>
          <span className="section-index">01</span>
        </div>

        <div className="context-two-col">
          <div className="context-left">
            <h2 className="context-heading">
              The hard architectural truths enterprises face in <span>{solution.shortTitle}.</span>
            </h2>
            <div className="market-context-box">
              <span className="problem-tag">Market Reality</span>
              <p>{solution.marketContext}</p>
            </div>
          </div>

          <div className="context-right">
            <div className="problem-statement-box">
              <span className="problem-tag">Core Technical Bottleneck</span>
              <p>{solution.problemStatement}</p>
            </div>

            <div className="overview-box">
              <span className="problem-tag">TrustGrid Engineered Solution</span>
              <p>{solution.overview}</p>
            </div>

            <Link
              className="inline-diagnostic-link"
              href={`/book-ai-diagnostic?solution=${solution.slug}`}
            >
              <span>Assess your organization&apos;s posture in this domain</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* LAYER 04: 5-LAYER ENGINEERING ARCHITECTURE MODEL */}
      <section className="section solution-architecture-section" id="architecture">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">02 / 5-LAYER ENGINEERING MODEL</span>
            <p className="section-label">Full-Stack Architectural Blueprint</p>
          </div>
          <span className="section-index">02</span>
        </div>

        <div className="offerings-header">
          <h2>
            A rigorous 5-layer engineering model. <span>From Foundation to Business Outcome.</span>
          </h2>
          <p>
            Every layer is purpose-engineered to solve specific technical constraints and deliver verifiable, compounding performance.
          </p>
        </div>

        <div className="five-layer-grid">
          {fiveLayerModel.map((layer, idx) => (
            <div key={idx} className="five-layer-card animated-card reveal-up">
              <div className="layer-card-head">
                <span className="layer-number-pill">0{idx + 1}</span>
                <h3 className="layer-name">{layer.name}</h3>
              </div>
              <p className="layer-purpose">{layer.purpose}</p>

              <div className="layer-components-box">
                <span className="components-label">Key Engineering Components:</span>
                <ul>
                  {layer.components.map((comp, i) => (
                    <li key={i}>
                      <Check size={14} className="text-blue-500 shrink-0 mt-0.5" />
                      <span>{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="layer-outcome-box">
                <span className="outcome-label">Engineered Outcome:</span>
                <strong>{layer.outcome}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LAYER 05: TEMPORAL SPECTRUM / MATURITY ROADMAP */}
      <section className="section solution-temporal-section" id="maturity">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">03 / TEMPORAL SPECTRUM</span>
            <p className="section-label">Enterprise AI Maturity & Compounding Progression</p>
          </div>
          <span className="section-index">03</span>
        </div>

        <div className="offerings-header">
          <h2>
            Compounding progression over time. <span>Not a one-off implementation.</span>
          </h2>
          <p>
            How TrustGrid partners with your leadership from immediate bottleneck diagnosis to continuous enterprise AI operations.
          </p>
        </div>

        <div className="temporal-grid">
          {temporalSpectrum.map((stage, idx) => (
            <div key={idx} className="temporal-card animated-card reveal-up">
              <div className="temporal-phase-badge">{stage.phase}</div>
              <h3 className="temporal-title">{stage.title}</h3>
              <p className="temporal-focus">{stage.focus}</p>
              <div className="temporal-outcome-tag">
                <CheckCircle2 size={14} className="text-blue-500 shrink-0" />
                <span>{stage.outcome}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LAYER 06: DIFFERENTIATION (CONVENTIONAL VS TRUSTGRID) */}
      <section className="section solution-diff-section" id="differentiation">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">04 / DIFFERENTIATION</span>
            <p className="section-label">Conventional Approach vs. TrustGrid Operating Model</p>
          </div>
          <span className="section-index">04</span>
        </div>

        <div className="offerings-header">
          <h2>
            Why traditional point solutions fail. <span>And how TrustGrid is different.</span>
          </h2>
          <p>
            We eliminate the handoff friction between strategy, silicon, code, security, and financial value.
          </p>
        </div>

        <div className="diff-table-wrapper animated-card reveal-up">
          <span className="card-corner-tl" />
          <span className="card-corner-br" />
          <table className="diff-table">
            <thead>
              <tr>
                <th style={{ width: '22%' }}>Dimension</th>
                <th style={{ width: '38%' }}>Conventional Point Vendors / Consultancies</th>
                <th style={{ width: '40%' }}>TrustGrid Operating Company</th>
              </tr>
            </thead>
            <tbody>
              {differentiationData.slice(0, 5).map((row) => (
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

      {/* LAYER 07: 6-STAGE ENGAGEMENT JOURNEY */}
      <section className="section solution-engagement-section" id="engagement">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">05 / ENGAGEMENT JOURNEY</span>
            <p className="section-label">Structured Paths from Diagnostic to Operations</p>
          </div>
          <span className="section-index">05</span>
        </div>

        <div className="engagement-header">
          <h2>
            Structured engagement frameworks. <span>From Diagnostic to Compounding ROI.</span>
          </h2>
          <p>
            Choose the engagement model that matches your enterprise timeline and operational urgency.
          </p>
        </div>

        <div className="engagement-models-grid">
          {solution.engagementModels.map((model, idx) => (
            <div key={model.title} className="engagement-model-card animated-card reveal-up">
              <div className="engagement-body">
                <div className="engagement-top">
                  <span className="engagement-num">{model.number}</span>
                  <span className="engagement-duration">
                    <Calendar size={13} />
                    {model.duration}
                  </span>
                </div>
                <h3 className="engagement-title">{model.title}</h3>
                <p className="engagement-desc">{model.description}</p>
                <Link
                  href={`/book-ai-diagnostic?solution=${solution.slug}&model=${encodeURIComponent(model.title)}`}
                  className="engagement-cta-link"
                >
                  <span>Select this model</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTION USE CASES */}
      <section className="section solution-usecases-section" id="use-cases">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">06 / PRODUCTION USE CASES</span>
            <p className="section-label">Where the Engineering Becomes Real</p>
          </div>
          <span className="section-index">06</span>
        </div>

        <div className="usecases-header">
          <h2>
            Proven enterprise applications in <span>mission-critical environments.</span>
          </h2>
          <p>
            From high-throughput private AI factories to autonomous agent fleets and quantum-safe communications.
          </p>
        </div>

        <div className="usecases-grid">
          {solution.useCases.map((useCase, idx) => (
            <article key={useCase.title} className="usecase-card animated-card reveal-up">
              <div className="usecase-card-header">
                <span className="usecase-badge">USE CASE 0{idx + 1}</span>
                <h4>{useCase.title}</h4>
              </div>
              <p>{useCase.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* METHODOLOGY ENGINE APPLICATION */}
      <section className="section solution-methodology-section" id="methodology">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">07 / METHODOLOGY ENGINE</span>
            <p className="section-label">{solution.methodologyDomain || 'AI Methodology Engine'}</p>
          </div>
          <span className="section-index">07</span>
        </div>

        <div className="methodology-domain-header">
          <h2>
            Operational excellence applied to <span>{solution.shortTitle}.</span>
          </h2>
          <p>
            How industrial engineering methodologies (Lean, Theory of Constraints, Six Sigma, FMEA, Kaizen, SPC) drive deterministic outcomes.
          </p>
        </div>

        <div className="methodology-table-wrapper">
          <table className="methodology-table">
            <thead>
              <tr>
                <th style={{ width: '28%' }}>Methodology</th>
                <th style={{ width: '72%' }}>Domain Focus & AI Application</th>
              </tr>
            </thead>
            <tbody>
              {solution.methodologies.map((item) => (
                <tr key={item.method}>
                  <td className="method-name">
                    <strong>{item.method}</strong>
                  </td>
                  <td className="method-focus">
                    <span className="focus-arrow">→</span>
                    <span>{item.focus}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* NEXT SOLUTION & CROSS-SOLUTION NAVIGATION */}
      <section className="section next-solution-section">
        <div className="next-solution-card animated-card">
          <div className="next-solution-info">
            <span className="section-label" style={{ color: '#91b3ff' }}>NEXT IN THE OPERATING STACK</span>
            <h2>{nextSolution.label}</h2>
            <p>{nextSolution.heroStatement}</p>
          </div>
          <Link href={`/solutions/${nextSolution.slug}`} className="button button-light">
            <span>Explore {nextSolution.shortTitle}</span>
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      {/* FINAL SOLUTION CTA */}
      <section className="section solution-cta-final">
        <div className="solution-cta-panel">
          <div className="cta-left">
            <span className="section-label" style={{ color: '#91b3ff' }}>START WITH THE SIGNAL</span>
            <h2>
              Ready to engineer <span>{solution.shortTitle}?</span>
            </h2>
            <p>
              Begin with a structured AI Diagnostic Assessment. Our senior architects will evaluate your current architecture, identify bottlenecks, and deliver an actionable execution roadmap.
            </p>
          </div>
          <div className="cta-right">
            <Link
              className="button button-light"
              href={`/book-ai-diagnostic?solution=${solution.slug}`}
            >
              <span>Book {solution.shortTitle} Diagnostic</span>
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <SiteFooter />
    </main>
  )
}


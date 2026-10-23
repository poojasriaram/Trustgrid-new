'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Boxes,
  Cpu,
  Layers,
  Building2,
  TrendingUp,
  CheckCircle2,
  Workflow,
  ArrowRight,
  ArrowUpRight,
  Zap,
  ShieldCheck,
  Server,
  Bot,
  Network,
  Radio,
  Factory,
  Leaf,
  SlidersHorizontal,
  BarChart3,
  Sparkles,
  Target,
  BrainCircuit,
  Users,
  FileText,
  ChevronRight,
  HeartPulse,
  Activity,
  DollarSign,
  Award
} from 'lucide-react'

export interface PracticeDivisionItem {
  category: string
  label: string
  href: string
  desc: string
  icon: any
  bullets?: string[]
}

export interface PracticeDivision {
  id: string
  num: string
  title: string
  shortLabel: string
  sub: string
  badge: string
  headerTitle: string
  tagline: string
  ctaText: string
  ctaHref: string
  icon: any
  items: PracticeDivisionItem[]
}

export const practiceDivisionsData: PracticeDivision[] = [
  {
    id: 'engagement',
    num: '1',
    title: 'Engagement Models',
    shortLabel: 'Engagement Models',
    sub: '5-Stage Proof · DBOT · Operating Model',
    badge: 'OUTCOME-BASED DELIVERY',
    headerTitle: 'Outcome-Based Engagement Models & FDE Delivery',
    tagline: 'Commercially accountable delivery models tied directly to verified business impact and permanent capability transfer.',
    ctaText: 'Explore Engagement Models',
    ctaHref: '/practice-areas#engagement-models',
    icon: Boxes,
    items: [
      {
        category: 'OUTCOME PROOF',
        label: '5-Stage Outcome Proof Framework',
        href: '/practice-areas#engagement-models',
        desc: 'Deterministic progression where clients only commit to subsequent phases upon verified milestone delivery.',
        icon: CheckCircle2,
        bullets: [
          'PoC: Technical Feasibility & rapid prototype sandbox',
          'PoV: Business Impact & financial baseline validation',
          'PoP: Production Hardening, P99 latency & scale validation'
        ]
      },
      {
        category: 'OPERATING MODEL',
        label: 'Forward Deployment Engineering (FDE)',
        href: '/practice-areas/forward-deployment-engineering',
        desc: 'Elite systems engineers embedding directly into client environments to bridge the strategy-to-code chasm.',
        icon: Layers,
        bullets: [
          'Embedded Domain-Agentic Delivery Pods on-site or integrated',
          'Full-Stack Execution: Production-grade Python, Rust & TypeScript',
          'End-to-End Delivery: Architecture, testing & live cutover'
        ]
      },
      {
        category: 'TURNKEY LIFECYCLE',
        label: 'Turnkey DBOT (Design, Build, Operate, Transfer)',
        href: '/practice-areas#engagement-models',
        desc: 'Full-lifecycle delivery with paired engineering transfer & 100% intellectual property sovereignty.',
        icon: Workflow,
        bullets: [
          'Single-contract accountability across silicon, compute & agent fleets',
          '100% client intellectual property, model weights & code ownership',
          'Structured transition gates to client internal teams upon maturity'
        ]
      },
      {
        category: 'DELIVERY CADENCE',
        label: '5-Step AI Engineering Delivery Lifecycle',
        href: '/solutions/ai-value-engineering',
        desc: 'Rigorous engineering delivery cycle executed within every milestone stage.',
        icon: Zap,
        bullets: [
          'Discovery: Architecture diagnostic & compute bottleneck audit',
          'Improve & Validate: Value realization sprints & chaos stress tests',
          'Assurance & Scale: Regulatory gating & permanent capability transfer'
        ]
      },
      {
        category: 'CERTIFIED STANDARDS',
        label: 'Certified Engineering Standards',
        href: '/methodology-engine',
        desc: 'Industry-certified methodologies grounding every systems engineering engagement.',
        icon: ShieldCheck,
        bullets: [
          'AI Governance: NIST AI RMF & ISO/IEC 42001 compliance alignment',
          'Operational Excellence: Lean Six Sigma (DMAIC) workflow optimization',
          'Financial Accountability: TBM Council & FinOps Foundation standards'
        ]
      },
      {
        category: 'EXECUTIVE DIAGNOSTIC',
        label: 'FDE Talent Profile & Architecture Diagnostic',
        href: '/book-ai-diagnostic#diagnostic-form-section',
        desc: 'Executive technical diagnostic conducted by multidisciplinary Forward Deployed Engineers.',
        icon: ArrowUpRight,
        bullets: [
          '6+ Years multidisciplinary experience across systems, ML & finance',
          'Frontier AI fluency: deep evaluation rigor & prompt jailbreak defense',
          'Definitive diagnostic audit & prioritized value roadmap delivery'
        ]
      }
    ]
  },
  {
    id: 'engineering',
    num: '2',
    title: 'Engineering Practices',
    shortLabel: 'Engineering Practices',
    sub: 'Silicon, Compute, Fabrics & Cyber',
    badge: 'CORE SYSTEMS ARCHITECTURE',
    headerTitle: 'Engineering Practices — Systems Architecture & High-Density AI',
    tagline: 'Deterministic AI systems, high-density compute, agentic orchestration, lossless fabrics, and cyber defense.',
    ctaText: 'Explore Engineering Directory',
    ctaHref: '/solutions/ai-infra-engineering',
    icon: Cpu,
    items: [
      {
        category: 'COMPUTE INFRASTRUCTURE',
        label: 'AI Infrastructure & High-Density Compute',
        href: '/solutions/ai-infra-engineering',
        desc: 'Turnkey engineering of high-density AI Factories resolving 30–50% GPU cluster utilization bottlenecks.',
        icon: Cpu,
        bullets: [
          'AI Factory Design (30–100kW/rack high-density deployments)',
          'Direct-to-Chip Liquid Cooling (DLC) loops & thermal optimization',
          'GPU cluster profiling, NCCL benchmarking & workload placement'
        ]
      },
      {
        category: 'AGENT ORCHESTRATION',
        label: 'Agentic Enterprise & Multi-Agent Orchestration',
        href: '/solutions/ai-agentic-factory',
        desc: 'Architecting production-ready multi-agent systems with deterministic reasoning DAGs and memory fabrics.',
        icon: Bot,
        bullets: [
          'Multi-Agent Architecture with deterministic reasoning DAGs',
          'Persistent memory fabrics & context engineering pipelines',
          'Standardized MCP tool integration & LangSmith/AgentOps telemetry'
        ]
      },
      {
        category: 'AI FABRICS & NETWORKING',
        label: 'Lossless AI Networking & Systems Integration',
        href: '/solutions/ai-networking-cybersecurity',
        desc: 'Ultra-low latency, non-blocking 800G fabrics and secure API orchestration bridging enterprise estates.',
        icon: Network,
        bullets: [
          'InfiniBand & RoCEv2 lossless fabric engineering with PFC/ECN',
          'Semantic data layers & low-latency enterprise RAG pipelines',
          'Legacy SCADA, OT, and core banking/ERP secure bridge patterns'
        ]
      },
      {
        category: 'CYBERSECURITY & DEFENSE',
        label: 'AI Cybersecurity & Quantum-Safe Defense',
        href: '/practice-areas/ai-cybersecurity-quantum-safe-defense',
        desc: 'Securing novel AI attack surfaces with zero-trust permissions and post-quantum cryptographic standards.',
        icon: ShieldCheck,
        bullets: [
          'Prompt injection defense, semantic firewalls & jailbreak interdiction',
          'Zero-trust non-human agent permissions & credential brokerage',
          'NIST PQC post-quantum migration roadmaps (Kyber/Dilithium CBOM)'
        ]
      },
      {
        category: 'EDGE & AIR-GAPPED',
        label: 'Edge & Air-Gapped Deployment Engineering',
        href: '/practice-areas/forward-deployment-engineering',
        desc: 'Edge-native, sovereign and air-gapped deployment tailored to mission-critical operational constraints.',
        icon: Server,
        bullets: [
          'Ruggedized hardware-software co-design for harsh industrial sites',
          'Air-gapped inference blueprints & tamper-evident attestation',
          'Offline-first, blackout-resilient local execution architectures'
        ]
      },
      {
        category: 'OBSERVABILITY & SRE',
        label: 'AI SRE & Continuous Observability',
        href: '/practice-areas/forward-deployment-engineering',
        desc: 'Site Reliability Engineering tailored for non-deterministic AI models, token drift, and latency SLAs.',
        icon: Activity,
        bullets: [
          'Real-time P99 inference latency & throughput SLA monitoring',
          'Algorithmic drift detection, hallucination scoring & guardrails',
          'Automated canary deployment, rollback & multi-region failover'
        ]
      }
    ]
  },
  {
    id: 'functional',
    num: '3',
    title: 'Functional Practices',
    shortLabel: 'Functional Practices',
    sub: 'RevOps, GRC, Finance & Workforce',
    badge: 'ENTERPRISE STRATEGY & CAPABILITIES',
    headerTitle: 'Functional Practices — Enterprise Strategy, Economics & Governance',
    tagline: 'Horizontal business capabilities, operational intelligence, FinOps, and global workforce enablement deployed enterprise-wide.',
    ctaText: 'Explore Functional Directory',
    ctaHref: '/practice-areas/ai-governance-risk-compliance',
    icon: Layers,
    items: [
      {
        category: 'GOVERNANCE & RISK',
        label: 'Governance, Risk & Compliance (GRC)',
        href: '/practice-areas/ai-governance-risk-compliance',
        desc: 'Automated policy-as-code enforcement, live regulatory change horizon scanning, and immutable decision audit logs.',
        icon: ShieldCheck,
        bullets: [
          'Policy-as-code control library (EU AI Act, NIST AI RMF, ISO 42001)',
          'Regulatory horizon scanning & obligation-to-control mapping',
          'Immutable WORM audit fabric with cryptographic hash chaining'
        ]
      },
      {
        category: 'REVENUE & MARGINS',
        label: 'Revenue Operations (RevOps) & Dynamic Pricing',
        href: '/solutions/ai-value-engineering',
        desc: 'Predictive pipeline deal scoring, willingness-to-pay margin elasticity, and autonomous GTM agent fleets.',
        icon: TrendingUp,
        bullets: [
          'Predictive deal scoring & CRM deduplication agents',
          'Dynamic price elasticity modeling & deal desk guardrails',
          'Autonomous outbound prospecting fleets with human-in-the-loop SLAs'
        ]
      },
      {
        category: 'SUPPLY & DEMAND',
        label: 'Supply Chain & Demand Chain Orchestration',
        href: '/industries/supply-chain-logistics',
        desc: 'Multi-tier supplier risk visibility, procurement should-cost modeling, and multi-echelon inventory optimization.',
        icon: Boxes,
        bullets: [
          'Tier-n supplier distress discovery & adverse media intelligence',
          'Spend cube analytics, should-cost models & RFQ automation',
          'Demand sensing, multi-echelon S&OP & available-to-promise logic'
        ]
      },
      {
        category: 'FINANCE & RUN COSTS',
        label: 'AI FinOps & Finance Command',
        href: '/solutions/ai-value-engineering#finops',
        desc: 'Granular per-call token attribution, departmental chargeback engines, and CFO-ready balance sheet reporting.',
        icon: BarChart3,
        bullets: [
          'TBM-aligned compute tagging schema & automated chargeback engine',
          'Model cost attribution per accepted transaction and GPU cycle',
          'CFO investment ledger linking banked benefits to FP&A hurdles'
        ]
      },
      {
        category: 'PEOPLE & CULTURE',
        label: 'Workforce Transformation & Role Co-Pilots',
        href: '/about#careers-hackathons',
        desc: 'Role-based AI enablement curriculums, specialized internal copilots, and structured change management.',
        icon: Users,
        bullets: [
          'Role-based AI upskilling academies & hands-on sandbox tenants',
          'Function-specific copilots for HR, legal, customer service & DevOps',
          'Task-level role impact maps & change adoption champion networks'
        ]
      },
      {
        category: 'DATA & KNOWLEDGE',
        label: 'Enterprise Knowledge & Semantic Fabric',
        href: '/practice-areas/data-engineering-realtime-pipelines',
        desc: 'Enterprise semantic layers, ontology graphs, governed RAG content pipelines, and unstructured data ingestion.',
        icon: BrainCircuit,
        bullets: [
          'Domain-specific knowledge graphs & centralized metric definitions',
          'RAG content freshness pipelines & groundedness validation testing',
          'Unstructured document extraction for multi-format contracts & scans'
        ]
      }
    ]
  },
  {
    id: 'industry',
    num: '4',
    title: 'Industry Practices',
    shortLabel: 'Industry Practices',
    sub: '8 Verticals & Physical Operations',
    badge: 'VERTICAL DOMAIN BLUEPRINTS',
    headerTitle: 'Industry Practices — High-Consequence Sector Solutions',
    tagline: 'Solving high-consequence operational and physical bottlenecks through embedded systems engineering and sector assurance.',
    ctaText: 'Explore All 8 Industry Sectors',
    ctaHref: '/industries',
    icon: Building2,
    items: [
      {
        category: 'DISCRETE & PROCESS MFG',
        label: 'Manufacturing & Industrial Production',
        href: '/industries/manufacturing-discrete',
        desc: 'Sub-10ms line-side vision inspection, predictive maintenance, and energy-per-tonne optimization across 6 sub-verticals.',
        icon: Factory,
        bullets: [
          'Automotive body shop & paint vision QC with automated Andon triggers',
          'Electronics SMT line AOI augmentation & FPY/OEE yield tuning',
          'Metals furnace anomaly detection & EU ETS emissions accounting'
        ]
      },
      {
        category: 'BANKING & INSURANCE',
        label: 'Financial Services & Insurance',
        href: '/industries/banking-financial-services',
        desc: 'Agentic KYC/AML alert triage, explainable credit underwriting, claims fraud interdiction, and automated COREP filings.',
        icon: DollarSign,
        bullets: [
          'Agentic AML alert triage cutting false positives by 40–60%',
          'Credit risk intelligence with mathematically provable reason codes',
          'Claims subrogation & First Notice of Loss (FNOL) parsing'
        ]
      },
      {
        category: 'RETAIL & CONSUMER',
        label: 'Retail, Wholesale & Consumer Brands',
        href: '/industries',
        desc: 'Dynamic shelf vision, markdown elasticity modeling, trade promotion ROI, and farm-to-fork batch traceability.',
        icon: Target,
        bullets: [
          'Store shelf out-of-stock computer vision & planogram parsing',
          'Revenue Growth Management (RGM) & trade promotion lift analysis',
          'Produce optical grading vision & FSMA 204 batch custody tracking'
        ]
      },
      {
        category: 'CLINICAL & PHARMA',
        label: 'Healthcare & Life Sciences',
        href: '/industries/healthcare-life-sciences',
        desc: 'Ambient clinical documentation, GxP deviation review, pharmacovigilance screening, and diagnostic worklist triage.',
        icon: HeartPulse,
        bullets: [
          'Ambient clinical documentation extracting structured EHR notes',
          'Pharmacovigilance ICSR intake & adverse event literature screening',
          'Operating room capacity flow optimization & diagnostic imaging triage'
        ]
      },
      {
        category: 'POWER & UTILITIES',
        label: 'Energy, Utilities & Natural Resources',
        href: '/industries/energy-utilities',
        desc: 'Dynamic grid dispatch load balancing, acoustic water leak triage, predictive pipeline integrity, and unit LP optimization.',
        icon: Zap,
        bullets: [
          'High-voltage grid load balancing & DER virtual power plant dispatch',
          'Acoustic and flow leak detection cutting non-revenue water (NRW)',
          'Process safety early warning & refinery unit yield optimization'
        ]
      },
      {
        category: 'TRANSIT & ASSETS',
        label: 'Mobility, Logistics & Infrastructure',
        href: '/industries/supply-chain-logistics',
        desc: 'Autonomous container gantry cranes, rolling stock predictive maintenance, Scan-to-BIM progress, and ANPR tolling.',
        icon: Radio,
        bullets: [
          'Port gantry crane & airside AGV autonomy integrated with TOS',
          'Rolling stock component prognostic models & trackside wayside vision',
          'Scan-to-BIM construction progress verification & contract claims tracking'
        ]
      }
    ]
  },
  {
    id: 'value-engineering',
    num: '5',
    title: 'AI Value Engineering',
    shortLabel: 'AI Value Engineering',
    sub: '5 Stages · 4 Engineers · 5 Proofs · Forward Deployed Pods',
    badge: 'SECTION 4 · DIVISION 1',
    headerTitle: 'Division 1 · Delivery Practice: AI Value Engineering',
    tagline: 'Forward deployment for value delivery — across agents, data, robotics, IoT, RPA, DLT and physical AI. Five stages, four engineers, five proofs, one number Finance signs.',
    ctaText: 'Explore AI Value Engineering Practice',
    ctaHref: '/practice-areas/ai-value-engineering',
    icon: TrendingUp,
    items: [
      {
        category: 'VALUE LIFECYCLE',
        label: '5-Stage Value Lifecycle & Stage Gates',
        href: '/practice-areas/ai-value-engineering#lifecycle',
        desc: 'Deterministic stage progression from Value Discovery and Framing to Production Delivery, Repeatable Realization and Value Assurance.',
        icon: Workflow,
        bullets: [
          'Stage 01 Discover & Stage 02 Design: P&L value pool sizing, binding constraints & frozen baselines',
          'Stage 03 Deploy & Stage 04 Perform: Thinnest production path, unaided operator lift & 3 signed cycles',
          'Stage 05 Prove: Complete versioned assurance dossier, control mapping & capability certification'
        ]
      },
      {
        category: 'SCOPE & TECHNOLOGIES',
        label: '7 Technology Families in Scope',
        href: '/practice-areas/ai-value-engineering#technologies',
        desc: 'The proof standard does not change with technology: agentic AI, blockchain/DLT, IoT & edge, robotics/AMR, RPA, physical AI, and data pipelines.',
        icon: Cpu,
        bullets: [
          'Agentic AI, DLT & IoT: Judgement-heavy workflows, dispute elimination & asset uptime sensor fleets',
          'Robotics, AMR & Physical AI: Space between machines, unstructured automation & signed safety cases',
          'Data & Platform Engineering: Freshness, quality, lineage, and pipeline cost optimization'
        ]
      },
      {
        category: 'EVIDENCE STANDARD',
        label: 'The Five Proofs (PoC → PoComp)',
        href: '/practice-areas/ai-value-engineering#proofs',
        desc: 'Deterministic escalation: Proof of Concept, Proof of Value, Proof of Performance, Proof of Recurring Value, and Proof of Compounding.',
        icon: Award,
        bullets: [
          'PoC & PoV: Task accuracy on real samples and locked baseline lift against controls',
          'PoP & PoRV: Production standards (p95/p99 latency) and 3 consecutive Finance-signed cycles',
          'PoComp: Marginal cost decline, named asset reuse and empirical cost curve validation'
        ]
      },
      {
        category: 'FORWARD-DEPLOYED POD',
        label: 'Pod Architecture: 4 Ours, 3 Theirs',
        href: '/practice-areas/ai-value-engineering#pod',
        desc: 'Forward-deployed pod with ≤4 elite engineers embedded in client environment paired with 3 client-side decision roles.',
        icon: Users,
        bullets: [
          'TrustGrid Pod: FDE Lead, Domain Engineer, AI Agentic Engineer, AI Operational Engineer',
          'Client Leadership: Client Product Lead, Client Project Lead, Functional Process Lead',
          'Disciplined Delivery: P&L accountability and code reviews held in the same afternoon'
        ]
      },
      {
        category: 'ENGAGEMENT MODELS',
        label: '6 Accountable Engagement Shapes',
        href: '/practice-areas/ai-value-engineering#engagement-models',
        desc: 'Flexible models mapped to enterprise readiness without speculative commitments: Diagnostic, Sprint, Proof, Deployment, Embedded, and Rescue.',
        icon: Boxes,
        bullets: [
          'Value Diagnostic (3–5 wk) & Value Sprint (4–6 wk): Board decision & pre-capital de-risking',
          'Proof Engagement (10–14 wk) & Deployment & Banking (2–4 quarters): Feasibility & adoption risk',
          'Embedded VE (Quarterly cycles) & Value Assurance / Rescue (6–12 wk): Compounding & audit readiness'
        ]
      },
      {
        category: 'METHODOLOGY ENGINE',
        label: 'Deterministic Industrial Tooling & Interfaces',
        href: '/methodology-engine',
        desc: 'Operates on the methodology engine, uniting VSM, TOC, FMEA, Poka-Yoke, SMED, FinOps, and DMAIC with Divisions 2 & 3.',
        icon: Sparkles,
        bullets: [
          'Named industrial methods applied deliberately rather than improvised',
          'Interfaces with Division 2 (Horizontal Functions) and Division 3 (Industry Verticals)',
          'Complete IP handover: Models, pipelines, runbooks, evidence dossier & cost models'
        ]
      }
    ]
  }
]

export function PracticeDivisionsExplorer() {
  const [activeTab, setActiveTab] = useState<string>('engagement')

  const activeDivision =
    practiceDivisionsData.find((d) => d.id === activeTab) || practiceDivisionsData[0]
  const ActiveIcon = activeDivision.icon

  return (
    <div className="tg-divisions-explorer-wrapper">
      <div className="tg-divisions-layout">
        {/* Left Side Bar Menu: The 5 Menus */}
        {/* Left Side Bar Menu: Clean Main Menu Only */}
        <aside className="tg-divisions-sidebar tg-clean-divisions-sidebar" aria-label="Practice Areas Divisions">
          <nav className="tg-divisions-nav" role="tablist">
            {practiceDivisionsData.map((division) => {
              const DivIcon = division.icon
              const isActive = activeTab === division.id
              return (
                <button
                  key={division.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`tg-divisions-nav-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(division.id)}
                >
                  <div className="tg-divisions-nav-btn-left">
                    <div className="tg-divisions-icon-box">
                      <DivIcon size={16} />
                    </div>
                    <span className="tg-divisions-title">{division.title}</span>
                  </div>
                  <ChevronRight size={14} className="tg-divisions-nav-chevron" />
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Right Side Content Panel */}
        <main className="tg-divisions-content-panel">
          {/* Active Pillar Top Header Bar */}
          <div className="tg-divisions-panel-header">
            <div className="tg-divisions-panel-header-left">
              <div className="tg-divisions-active-icon-box">
                <ActiveIcon size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="tg-divisions-panel-title">
                    {activeDivision.headerTitle}
                  </h3>
                  <span className="tg-divisions-panel-badge">
                    {activeDivision.badge}
                  </span>
                </div>
                <p className="tg-divisions-panel-tagline">
                  {activeDivision.tagline}
                </p>
              </div>
            </div>

            <Link
              href={activeDivision.ctaHref}
              className="tg-divisions-panel-action"
            >
              <span>{activeDivision.ctaText}</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Quick Pillar Selector Pills on Mobile/Tablet */}
          <div className="tg-divisions-mobile-pills" role="tablist">
            {practiceDivisionsData.map((d) => (
              <button
                key={d.id}
                type="button"
                className={`tg-quick-pill ${activeTab === d.id ? 'active-pill' : ''}`}
                onClick={() => setActiveTab(d.id)}
              >
                <span>{d.num}. {d.shortLabel}</span>
              </button>
            ))}
          </div>

          {/* Symmetrically Aligned Cards Grid */}
          <div className="tg-divisions-cards-grid">
            {activeDivision.items.map((item, idx) => {
              const ItemIcon = item.icon
              return (
                <div key={idx} className="tg-division-card group">
                  <div className="tg-division-card-top">
                    <div className="tg-division-card-icon">
                      <ItemIcon size={18} />
                    </div>
                    <span className="tg-division-card-category">
                      {item.category}
                    </span>
                  </div>

                  <h4 className="tg-division-card-heading">
                    {item.label}
                  </h4>

                  <p className="tg-division-card-desc">
                    {item.desc}
                  </p>

                  {/* Bullet points & sub-items */}
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="tg-division-bullets">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="tg-division-bullet-item">
                          <CheckCircle2 size={12} className="tg-bullet-icon" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="tg-division-card-footer">
                    <Link
                      href={item.href}
                      className="tg-division-link"
                    >
                      <span>Explore Capability</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}

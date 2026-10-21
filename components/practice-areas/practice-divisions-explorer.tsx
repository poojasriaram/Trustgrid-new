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
  ChevronRight
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
    tagline: 'Commercially accountable delivery models tied directly to verified business impact & capability transfer.',
    ctaText: 'Request Outcome Proposal',
    ctaHref: '/request-proposal',
    icon: Boxes,
    items: [
      {
        category: 'OUTCOME PROOF',
        label: '5-Stage Outcome Proof Framework',
        href: '/request-proposal?model=proof-framework',
        desc: 'Deterministic 5-stage progression where clients only commit to the next stage upon verified milestone delivery.',
        icon: CheckCircle2,
        bullets: [
          'PoC: Technical Feasibility Sandbox (Can we build this?)',
          'PoV: Business Impact & Metric Validation (Does it move the needle?)',
          'PoP: Production Hardening, Latency & Scale (Will it work reliably?)',
          'PoCI: Eval-Driven Telemetry & Drift Detection (Continuous improvement)',
          'PoCV: Strategic Co-Engineering & Compounding Multi-Agent ROI'
        ]
      },
      {
        category: 'OPERATING MODEL',
        label: 'Forward Deployment Engineering (FDE)',
        href: '/practice-areas/forward-deployment-engineering',
        desc: 'Domain-Agentic Experts embedding directly into client environments to bridge the strategy-to-engineering gap.',
        icon: Layers,
        bullets: [
          'Embedded Domain-Agentic Delivery Pods on-site or integrated',
          'Full-Stack Execution: Write & review production-grade Python/JS code',
          'End-to-End Delivery: Discovery, scoping, build & production cutover',
          'Codify & Scale: Turn working patterns into reusable client playbooks'
        ]
      },
      {
        category: 'TURNKEY LIFECYCLE',
        label: 'Turnkey DBOT (Design, Build, Operate, Transfer)',
        href: '/request-proposal?model=turnkey',
        desc: 'Full-lifecycle delivery with paired engineering transfer & 100% intellectual property ownership.',
        icon: Workflow,
        bullets: [
          'Single-contract accountability across silicon, compute & agent fleets',
          'Complete intellectual property, model weights & code sovereignty',
          '24/7 Follow-the-Sun SRE and AI NOC/SOC monitoring backed by strict SLAs',
          'Structured transition gates to client internal teams upon maturity'
        ]
      },
      {
        category: 'DELIVERY LIFECYCLE',
        label: '5-Step AI Engineering Delivery Lifecycle',
        href: '/solutions/ai-value-engineering',
        desc: 'Rigorous 5-step operational lifecycle executed within every engagement stage.',
        icon: Zap,
        bullets: [
          '1. DISCOVERY: Executive AI Diagnostic & infra bottleneck mapping',
          '2. IMPROVE: Value Realization Sprints for high-stakes agent fleets',
          '3. VALIDATE: Chaos stress testing, SPC monitoring & deterministic sign-off',
          '4. ASSURANCE: Value Assurance Activation & compliance auditing',
          '5. DELIVERY: Scale, capability transfer & long-term managed DBOT'
        ]
      },
      {
        category: 'CERTIFIED STANDARDS',
        label: 'Certified Methodologies Backing the Model',
        href: '/methodology-engine',
        desc: 'Well-tested, industry-certified frameworks grounding every engineering engagement.',
        icon: ShieldCheck,
        bullets: [
          'AI Governance: NIST AI RMF & ISO/IEC 42001 compliance alignment',
          'Operational Excellence: Lean Six Sigma (DMAIC) workflow optimization',
          'Financial Accountability: Technology Business Management (TBM) & FinOps'
        ]
      },
      {
        category: 'STRATEGIC EVALUATION',
        label: 'FDE Talent Profile & Architecture Diagnostic',
        href: '/book-ai-diagnostic#diagnostic-form-section',
        desc: 'Executive technical diagnostic conducted by multidisciplinary Forward Deployed Engineers.',
        icon: ArrowUpRight,
        bullets: [
          '6+ Years multidisciplinary experience: domain, finance & systems depth',
          'Proven ability to scope and design complex systems in high ambiguity',
          'Frontier AI fluency: deep LLM behavior understanding & eval rigor',
          'Clear communication across engineers, domain leads & C-level boards'
        ]
      }
    ]
  },
  {
    id: 'engineering',
    num: '2',
    title: 'Engineering Practices',
    shortLabel: 'Engineering Practices',
    sub: 'DIVISION 1 · How We Build',
    badge: 'DIVISION 1 · HOW WE BUILD',
    headerTitle: 'Division 1 — Engineering Practices (How We Build)',
    tagline: 'Deterministic AI systems, high-density compute, agentic orchestration, loss-free fabrics, cyber defense & edge deployment.',
    ctaText: 'Explore Engineering Directory',
    ctaHref: '/solutions/ai-infra-engineering',
    icon: Cpu,
    items: [
      {
        category: 'ENGINEERING · 4.1',
        label: '4.1 AI Infrastructure & High-Density Compute',
        href: '/solutions/ai-infra-engineering',
        desc: 'Turnkey engineering of high-density AI Factories resolving 30–50% GPU utilization bottlenecks.',
        icon: Cpu,
        bullets: [
          '4.1.1 AI Factory Design (30–100kW/rack)',
          '4.1.2 Direct-to-Chip Liquid Cooling & DLC loops',
          '4.1.3 GPU Cluster Optimization & Benchmarking',
          '4.1.4 Data Center Site Selection & Power Strategy'
        ]
      },
      {
        category: 'ENGINEERING · 4.2',
        label: '4.2 Agentic Enterprise & Orchestration',
        href: '/solutions/ai-agentic-factory',
        desc: 'Architecting production-ready multi-agent systems with deterministic reasoning DAGs and persistent memory fabrics.',
        icon: Bot,
        bullets: [
          '4.2.1 Multi-Agent Architecture (Deterministic reasoning DAGs)',
          '4.2.2 Memory Fabrics & Context Engineering',
          '4.2.3 MCP Integrations & Standardized Agent Tooling',
          '4.2.4 Agent Evaluation & Observability (LangSmith/AgentOps)'
        ]
      },
      {
        category: 'ENGINEERING · 4.3',
        label: '4.3 AI Networking & Systems Integration',
        href: '/solutions/ai-networking-cybersecurity',
        desc: 'Ultra-low latency, non-blocking fabrics and secure API orchestration bridging enterprise systems.',
        icon: Network,
        bullets: [
          '4.3.1 InfiniBand / RoCEv2 Fabric Engineering',
          '4.3.2 Semantic Data Layers & Enterprise RAG',
          '4.3.3 Legacy ERP / SCADA Bridge Patterns',
          '4.3.4 Secure API Orchestration & Gateway Design'
        ]
      },
      {
        category: 'ENGINEERING · 4.4',
        label: '4.4 AI Cybersecurity & Quantum-Safe Defense',
        href: '/practice-areas/ai-cybersecurity-quantum-safe-defense',
        desc: 'Protecting novel AI attack surfaces with zero-trust permissions and post-quantum cryptographic standards.',
        icon: ShieldCheck,
        bullets: [
          '4.4.1 Prompt Injection & Agent Hijacking Defense',
          '4.4.2 Zero-Trust Agent Permissions & Semantic Firewalls',
          '4.4.3 NIST PQC Migration Roadmaps (CBOM / Kyber)',
          '4.4.4 AI Red Teaming & Adversarial Stress Testing'
        ]
      },
      {
        category: 'ENGINEERING · 4.5',
        label: '4.5 Edge & Air-Gapped Deployment Engineering',
        href: '/practice-areas/forward-deployment-engineering',
        desc: 'Edge-native, sovereign and air-gapped deployment tailored to mission-critical operational constraints.',
        icon: Server,
        bullets: [
          '4.5.1 Ruggedized Hardware-Software Co-Design',
          '4.5.2 AI SRE (Site Reliability Engineering for AI)',
          '4.5.3 Real-Time Data Pipeline Engineering',
          '4.5.4 Offline-First / Blackout-Resilient Architectures'
        ]
      }
    ]
  },
  {
    id: 'cross-domain',
    num: '3',
    title: 'Cross Domain Practices',
    shortLabel: 'Cross Domain Practices',
    sub: 'DIVISION 2 · Deliver Everywhere',
    badge: 'DIVISION 2 · WHAT WE DELIVER',
    headerTitle: 'Division 2 — Cross-Industry Practices (What We Deliver — Everywhere)',
    tagline: 'Horizontal business capabilities, operational intelligence, FinOps, and global workforce enablement deployed enterprise-wide.',
    ctaText: 'Explore Cross-Domain Blueprint',
    ctaHref: '/practice-areas/forward-deployment-engineering',
    icon: Layers,
    items: [
      {
        category: 'CROSS-DOMAIN · 5.1',
        label: '5.1 Forward Deployment Engineering (FDE)',
        href: '/practice-areas/forward-deployment-engineering',
        desc: 'Embedded delivery pods engineering the last-mile of AI productionization with paired capability transfer.',
        icon: Layers,
        bullets: [
          '5.1.1 Embedded Delivery Pods',
          '5.1.2 Knowledge Transfer & Playbooks'
        ]
      },
      {
        category: 'CROSS-DOMAIN · 5.2',
        label: '5.2 Supply Chain & Intelligent Operations',
        href: '/industries/supply-chain-logistics',
        desc: 'End-to-end demand sensing, supplier risk prediction, and automated network route optimization.',
        icon: Boxes,
        bullets: [
          '5.2.1 Demand Sensing & Forecasting Agents',
          '5.2.2 Supplier Risk & Resilience Intelligence',
          '5.2.3 Logistics & Network Optimization'
        ]
      },
      {
        category: 'CROSS-DOMAIN · 5.3',
        label: '5.3 Revenue Operations (RevOps)',
        href: '/solutions/ai-value-engineering',
        desc: 'Automating enterprise deal flow, dynamic pricing elasticity, and deploying GTM autonomous agent fleets.',
        icon: TrendingUp,
        bullets: [
          '5.3.1 Pipeline Intelligence & Deal Scoring',
          '5.3.2 Pricing & Margin Optimization',
          '5.3.3 GTM Agent Fleets'
        ]
      },
      {
        category: 'CROSS-DOMAIN · 5.4',
        label: '5.4 Governance, Risk & Compliance (GRC)',
        href: '/practice-areas/ai-governance-risk-compliance',
        desc: 'Automated policy enforcement, live regulatory change tracking, and immutable cryptographic decision logs.',
        icon: ShieldCheck,
        bullets: [
          '5.4.1 Policy Automation Agents',
          '5.4.2 Regulatory Change Monitoring',
          '5.4.3 Immutable Audit Fabric'
        ]
      },
      {
        category: 'CROSS-DOMAIN · 5.5',
        label: '5.5 Global Workforce Acceleration',
        href: '/about#careers-hackathons',
        desc: 'Enterprise-wide AI enablement programs, specialized domain co-pilots, and organizational change management.',
        icon: Users,
        bullets: [
          '5.5.1 AI Upskilling & Enablement Programs',
          '5.5.2 Workforce Co-Pilots (HR, support, engineering)',
          '5.5.3 Change Management & Adoption'
        ]
      },
      {
        category: 'CROSS-DOMAIN · 5.6',
        label: '5.6 Customer & Partner Experience (CXP)',
        href: '/case-studies',
        desc: 'Multi-agent customer journey orchestration, churn intelligence, and automated partner ecosystem gateways.',
        icon: Target,
        bullets: [
          '5.6.1 Journey Agents (service, onboarding, success)',
          '5.6.2 Loyalty & Churn Intelligence',
          '5.6.3 Partner Portal & Ecosystem Agents'
        ]
      },
      {
        category: 'CROSS-DOMAIN · 5.7',
        label: '5.7 Finance & AI FinOps Command',
        href: '/solutions/ai-value-engineering#finops',
        desc: 'Transforming compute spend into CFO-visible balance sheet ROI with model attribution and chargeback models.',
        icon: BarChart3,
        bullets: [
          '5.7.1 Spend Telemetry & Chargeback Models',
          '5.7.2 Model Cost Attribution',
          '5.7.3 CFO-Ready AI Investment Reporting'
        ]
      },
      {
        category: 'CROSS-DOMAIN · 5.8',
        label: '5.8 Enterprise Data & Knowledge Fabric',
        href: '/practice-areas/data-engineering-realtime-pipelines',
        desc: 'Enterprise semantic layers, knowledge graph integration, data readiness governance, and RAG pipelines.',
        icon: BrainCircuit,
        bullets: [
          '5.8.1 Semantic Layer / Knowledge Graph Design',
          '5.8.2 Data Governance for AI Readiness',
          '5.8.3 RAG Governance & Content Pipelines'
        ]
      }
    ]
  },
  {
    id: 'industry',
    num: '4',
    title: 'Focused Industry Practices',
    shortLabel: 'Focused Industry Practices',
    sub: 'Vertical Domain Blueprints',
    badge: 'VERTICAL DOMAIN BLUEPRINTS',
    headerTitle: 'Focused Industry Practices (Vertical Blueprints)',
    tagline: 'Solving high-consequence physical and operational bottlenecks through a deterministic triad: FDE, Value Realization & Value Assurance.',
    ctaText: 'Explore All 70 Industries',
    ctaHref: '/industries',
    icon: Building2,
    items: [
      {
        category: 'VERTICAL BLUEPRINT · 1',
        label: 'Ports, Airports & Global Logistics Hubs',
        href: '/industries/supply-chain-logistics',
        desc: 'Autonomous multi-agent systems for container gantry cranes, baggage handling, and airside AGVs.',
        icon: Boxes,
        bullets: [
          'FDE: Edge-native deployment integrated with legacy Terminal Operating Systems (TOS)',
          'Value Realization: Maximizing asset throughput (TEUs/hr, flights/gate) & reducing fuel burn',
          'Value Assurance: Safety-critical AI governance to prevent physical collisions & SLA uptime'
        ]
      },
      {
        category: 'VERTICAL BLUEPRINT · 2',
        label: 'Urban Mass Transportation & Rail Operations',
        href: '/industries/supply-chain-logistics',
        desc: 'Ruggedized edge computer vision and predictive maintenance deployed on rolling stock and trackside sensors.',
        icon: Workflow,
        bullets: [
          'FDE: Forward deployment directly onto moving trains operating during network blackouts',
          'Value Realization: Transforming maintenance from reactive to predictive & optimizing energy',
          'Value Assurance: Deterministic fail-safe AI architectures & immutable cryptographic audit'
        ]
      },
      {
        category: 'VERTICAL BLUEPRINT · 3',
        label: 'Energy, Utilities & Smart Infrastructure',
        href: '/industries/energy-utilities',
        desc: 'Sensor-fusion and load-balancing agents deployed to smart grids, water treatment, and DER assets.',
        icon: Zap,
        bullets: [
          'FDE: Deploying autonomous sensor-fusion agents securely bridging the OT/IT divide',
          'Value Realization: Dynamic grid load balancing, leak triage & municipal energy spend optimization',
          'Value Assurance: Quantum-safe grid encryption & deterministic failover preventing blackouts'
        ]
      },
      {
        category: 'VERTICAL BLUEPRINT · 4',
        label: 'Telecom Services & MEC Infrastructure',
        href: '/industries/telecommunications',
        desc: 'Multi-access Edge Computing (MEC) and central office AI optimizing Radio Access Network (RAN) intelligence.',
        icon: Radio,
        bullets: [
          'FDE: Deploying AI at MEC edge nodes and central offices for real-time network slicing',
          'Value Realization: Self-Organizing Network (SON) capabilities cutting NOC OPEX & CAPEX',
          'Value Assurance: Zero-touch provisioning security & rigorous five-nines (99.999%) availability'
        ]
      },
      {
        category: 'VERTICAL BLUEPRINT · 5',
        label: 'Electronic Manufacturing (Semiconductors, PCB, SMT)',
        href: '/industries/manufacturing-discrete',
        desc: 'Ultra-low latency computer vision and multi-agent quality control deployed directly on high-speed SMT lines.',
        icon: Factory,
        bullets: [
          'FDE: Sub-10ms computer vision integrated locally with PLCs and Manufacturing Execution Systems',
          'Value Realization: Maximizing First Pass Yield (FPY) and OEE, drastically cutting scrap rates',
          'Value Assurance: Rigorous Statistical Process Control (SPC) & cryptographic logging for traceability'
        ]
      },
      {
        category: 'VERTICAL BLUEPRINT · 6',
        label: 'Food Processing & Agri-Tech Operations',
        href: '/industries',
        desc: 'Washdown-proof edge vision and sorting agents operating reliably on high-speed sorting conveyors.',
        icon: Leaf,
        bullets: [
          'FDE: Ruggedized edge vision deployed in extreme temperatures and washdown environments',
          'Value Realization: Maximizing yield and minimizing waste via dynamic sorting parameter tuning',
          'Value Assurance: Strict FDA/FSMA compliance assurance & zero-allergen cross-contamination tracking'
        ]
      }
    ]
  },
  {
    id: 'value-engineering',
    num: '5',
    title: 'Value Engineering Framework',
    shortLabel: 'Value Engineering Framework',
    sub: 'CFO-Visible Compounding ROI',
    badge: '80+ METHODS · FINOPS',
    headerTitle: 'Value Engineering Framework & Financial Accountability',
    tagline: 'Transforming opaque AI compute spend into transparent, compounding balance sheet returns via 80+ operational methods.',
    ctaText: 'Explore Value Engineering Blueprint',
    ctaHref: '/solutions/ai-value-engineering',
    icon: TrendingUp,
    items: [
      {
        category: 'PROVEN FRAMEWORK',
        label: '5-Stage Outcome Proof Framework',
        href: '/request-proposal?model=proof-framework',
        desc: 'Guaranteed milestone-based technical and commercial progression linking fees to measurable business outcomes.',
        icon: CheckCircle2,
        bullets: [
          'PoC (Technical Feasibility) → PoV (Business Impact Validation)',
          'PoP (Production Hardening & Scale) → PoCI (Eval-Driven Optimization)',
          'PoCV (Compounding Strategic Transformation & Multi-Agent ROI)'
        ]
      },
      {
        category: 'BLACK-BOX ELIMINATION',
        label: 'Value Assurance Services',
        href: '/practice-areas/value-assurance-services',
        desc: 'Eliminating black-box risks with formal robustness testing, explainability, and regulatory audits.',
        icon: ShieldCheck,
        bullets: [
          'SHAP / LIME mathematical explainability for mission-critical inference',
          'Continuous Statistical Process Control (SPC) & automated drift triage',
          'Immutable cryptographic audit trails aligned with EU AI Act, NIST AI RMF & ISO 42001'
        ]
      },
      {
        category: 'FINANCIAL GOVERNANCE',
        label: 'AI FinOps Command & Spend Telemetry',
        href: '/solutions/ai-value-engineering#finops',
        desc: 'Granular token cost allocation, hardware utilization tuning, and CFO-ready investment reporting.',
        icon: BarChart3,
        bullets: [
          'Real-time token spend telemetry & departmental chargeback models',
          'Model cost attribution per task, prompt context & API gateway',
          'Direct mapping of GPU CapEx/OpEx to EBITDA velocity and working capital'
        ]
      },
      {
        category: 'OPERATIONAL METHOD',
        label: 'Lean Thinking & DOWNTIME Waste Elimination',
        href: '/solutions/ai-value-engineering#waste-governance',
        desc: 'Applying classic Lean Thinking to eliminate 8 deadly wastes across AI compute pipelines.',
        icon: SlidersHorizontal,
        bullets: [
          'Eliminating Defect, Overproduction, Waiting & Non-utilized talent in AI workflows',
          'Removing Transport, Inventory, Motion & Excess compute processing waste',
          '40–70% drop in cost-to-serve via caching, model quantization & routing'
        ]
      },
      {
        category: 'BOTTLENECK TRIAGE',
        label: 'Theory of Constraints (TOC) & Throughput Accounting',
        href: '/methodology-engine#diagnostic',
        desc: 'Systematic identification and exploitation of GPU cluster, memory, and queue bottlenecks.',
        icon: TrendingUp,
        bullets: [
          'Identify and exploit GPU cluster utilization bottlenecks (resolving 30–50% idle rates)',
          'Drum-Buffer-Rope scheduling for inference queues and model dispatch',
          'Throughput accounting connecting GPU utilization directly to cash generation'
        ]
      },
      {
        category: 'GLOBAL STANDARD',
        label: '70-Year AI-VE Job Plan (8 Stages)',
        href: '/solutions/ai-value-engineering#job-plan-stages',
        desc: 'The SAVE International 70-year standard re-engineered with AI and operational automation.',
        icon: FileText,
        bullets: [
          '8 Disciplined Stages: Information, Function, Creative, Evaluation, Dev, Pres, Impl, Audit',
          'Automated method recommendation selecting from 80+ operational frameworks',
          'Post-implementation attestation verifying audited balance sheet outcomes'
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
        {/* Left Side Bar Menu: The 5 Divisions */}
        <aside className="tg-divisions-sidebar" aria-label="Practice Areas Divisions">
          <div className="tg-divisions-sidebar-header">
            <span className="tg-divisions-badge">
              <span className="pulse-dot" />
              PRACTICE ARCHITECTURE
            </span>
            <h3 className="tg-divisions-sidebar-title">Practice Areas</h3>
            <p className="tg-divisions-sidebar-desc">
              5 enterprise divisions: from silicon engineering to cross-industry capabilities &amp; outcome models.
            </p>
          </div>

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
                    <div className="tg-divisions-nav-text">
                      <div className="tg-divisions-nav-title-row">
                        <span className="tg-divisions-num">{division.num}.</span>
                        <span className="tg-divisions-title">{division.title}</span>
                      </div>
                      <span className="tg-divisions-sub">{division.sub}</span>
                    </div>
                  </div>
                  <ChevronRight size={14} className="tg-divisions-nav-chevron" />
                </button>
              )
            })}
          </nav>

          <div className="tg-divisions-sidebar-footer">
            <div className="tg-divisions-metric-chip">
              <Sparkles size={13} className="text-blue-400" />
              <span>5 Divisions • 30+ Disciplines</span>
            </div>
            <Link
              href="/book-ai-diagnostic#diagnostic-form-section"
              className="tg-divisions-sidebar-cta"
            >
              <span>Schedule Architecture Diagnostic</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </aside>

        {/* Right Side Content Panel */}
        <main className="tg-divisions-content-panel">
          {/* Active Division Top Header Bar */}
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

          {/* Quick Division Selector Pills on Mobile/Tablet */}
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

          {/* Structured Cards Grid */}
          <div className={`tg-divisions-cards-grid ${activeDivision.items.length > 5 ? 'columns-3' : 'columns-2'}`}>
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

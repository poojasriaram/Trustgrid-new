'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Compass,
  Layers,
  Cpu,
  Bot,
  Users,
  Rocket,
  CheckCircle2,
  Workflow,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  FileCheck
} from 'lucide-react'

export interface MethodologyJourneyStage {
  stageId: string
  name: string
  subtitle: string
  objective: string
  whatHappens: string
  trustgridActivities: string[]
  deliverables: string[]
  stakeholders: string[]
  expectedOutcome: string
  methods: string[]
}

export const defaultMethodologyJourney: MethodologyJourneyStage[] = [
  {
    stageId: 'diagnose',
    name: 'DIAGNOSE',
    subtitle: 'Technical & Economic Discovery',
    objective: 'Establish a concrete, auditable baseline of enterprise compute efficiency, multi-agent readiness, security posture, and unit economics.',
    whatHappens: 'TrustGrid principal architects conduct on-site and telemetry-driven audits across GPU clusters, inference latency, agent reasoning reliability, and token spend.',
    trustgridActivities: [
      'Value Stream Mapping of existing AI inference pipelines',
      'Theory of Constraints (TOC) bottleneck identification across GPU compute and network fabrics',
      'Failure Mode and Effects Analysis (FMEA) across agent guardrails and model endpoints',
      'Token FinOps profiling and cost-per-task economic baseline modeling'
    ],
    deliverables: [
      'AI Infrastructure & Cluster Yield Technical Audit',
      'Agentic Readiness & Autonomous Process Opportunity Matrix',
      'Cryptographic Bill of Materials (CBOM) & Security Posture Report',
      '90-Day Prioritized Value Realization Roadmap'
    ],
    stakeholders: ['Chief Information Officer (CIO)', 'Chief Technology Officer (CTO)', 'Infrastructure Director', 'Head of AI/ML'],
    expectedOutcome: 'Clear executive alignment on high-yield AI initiatives with quantified technical baselines and defensible ROI targets.',
    methods: ['Value Stream Mapping', 'Theory of Constraints', 'FMEA', 'FinOps Accounting']
  },
  {
    stageId: 'architect',
    name: 'ARCHITECT',
    subtitle: 'Deterministic Systems Blueprinting',
    objective: 'Design future-state high-density AI Factories, multi-agent cognitive DAGs, lossless networking topologies, and post-quantum cryptographic defenses.',
    whatHappens: 'Systems engineers convert diagnostic findings into turnkey engineering specifications, component selection matrices, and integration blueprints.',
    trustgridActivities: [
      'Engineering high-density rack topologies (30–100kW) and direct-to-chip liquid cooling loops',
      'Architecting multi-agent reasoning DAGs with persistent memory fabrics (Episodic, Semantic, Working)',
      'Designing non-blocking InfiniBand/RoCEv2 lossless network fabrics with zero packet drop guarantees',
      'Drafting NIST Post-Quantum Cryptography (PQC) transition plans (FIPS 203/204/205)'
    ],
    deliverables: [
      'High-Density AI Factory Facilities Specification Blueprint',
      'Multi-Agent System Architecture & Model Context Protocol (MCP) Schemas',
      'Lossless Rail-Optimized Network Fabric Topologies',
      'Enterprise Zero-Trust Cryptographic Transition Blueprint'
    ],
    stakeholders: ['Enterprise Architects', 'AI Platform Leads', 'CISO & Security Architects', 'Data Center Facilities Directors'],
    expectedOutcome: 'Deterministic, vendor-neutral engineering blueprint eliminating architectural rework and preventing premature vendor lock-in.',
    methods: ['Lean Architecture', 'Poka-Yoke System Design', 'Target Costing', 'Formal Modeling']
  },
  {
    stageId: 'implement',
    name: 'IMPLEMENT',
    subtitle: 'Production Systems Engineering',
    objective: 'Deploy, calibrate, benchmark, and harden production-grade GPU clusters, multi-agent execution fabrics, and continuous explainability pipelines.',
    whatHappens: 'TrustGrid co-engineering squads deploy verified infrastructure, configure low-latency inference runtimes, tune collective communications, and install guardrail firewalls.',
    trustgridActivities: [
      'Deploying and micro-optimizing inference engines (vLLM, TensorRT-LLM) with granular KV-cache tuning',
      'Orchestrating multi-agent runtimes with tool sandboxing and real-time AgentOps tracing',
      'Calibrating NCCL/RCCL collective communication parameters on InfiniBand/RoCEv2 fabrics',
      'Implementing mathematical explainability gateways (SHAP, LIME) and immutable decision logging'
    ],
    deliverables: [
      'Turnkey High-Throughput AI Compute Cluster & Inference Serving Engine',
      'Governed Multi-Agent Execution Fabric with Persistent Vector & Relational Memory',
      'Lossless Network Fabric with Autonomous NOC Congestion Avoidance Telemetry',
      'Automated EU AI Act & NIST AI RMF Audit Replay System'
    ],
    stakeholders: ['AI Platform Engineers', 'DevOps & SRE Leads', 'Security Operations (SOC)', 'Lead Data Scientists'],
    expectedOutcome: 'Hardened, production-ready AI capabilities running with enterprise SLAs, sub-millisecond network latency, and verified auditability.',
    methods: ['DevOps / CI/CD', 'SMED Rapid Changeover', 'DMAIC Quality Assurance', 'Poka-Yoke']
  },
  {
    stageId: 'automate',
    name: 'AUTOMATE',
    subtitle: 'Industrialized Agent Fleet Execution',
    objective: 'Scale multi-agent autonomy across mission-critical enterprise workflows with continuous evaluation and mistake-proof execution.',
    whatHappens: 'Digital workers and autonomous multi-agent swarms take over complex, multi-step business workflows in finance, supply chain, cybersecurity, and engineering.',
    trustgridActivities: [
      'Configuring hierarchical and consensus-driven multi-agent coordination protocols',
      'Embedding real-time confidence scoring and automated human-in-the-loop escalation fail-safes',
      'Setting up automated fleet benchmarking, regression evaluation, and prompt regression testing',
      'Connecting enterprise ERP, CRM, and internal databases through secure Model Context Protocol connectors'
    ],
    deliverables: [
      'Autonomous Multi-Agent Workflow Orchestration Engine',
      'Enterprise Tool Sandbox & Secure Connector Catalog',
      'Real-Time AgentOps Telemetry, Tracing & Latency Dashboards',
      'Continuous Drift, Hallucination & Accuracy Monitoring Pipeline'
    ],
    stakeholders: ['Business Unit Leaders', 'Operations Directors', 'Transformation Leads', 'Agent Fleet Operators'],
    expectedOutcome: 'Dramatic compression in operational cycle times with deterministic accuracy and verifiable human oversight.',
    methods: ['Jidoka Self-Stopping', 'Kanban Flow Control', 'Statistical Process Control (SPC)', 'Continuous Benchmarking']
  },
  {
    stageId: 'adopt',
    name: 'ADOPT',
    subtitle: 'Workforce Enablement & Governance',
    objective: 'Integrate autonomous systems smoothly into day-to-day organizational workflows with executive governance and workforce capability building.',
    whatHappens: 'TrustGrid facilitators upskill internal teams, establish internal AI Factory Centers of Excellence, and verify regulatory compliance with board committees.',
    trustgridActivities: [
      'Conducting hands-on co-engineering sprints with internal engineering and operations squads',
      'Establishing standard operating procedures for agent monitoring, retraining, and incident response',
      'Executing formal ISO 42001 and EU AI Act readiness audits for governance and compliance committees',
      'Deploying Hoshin Kanri policy deployment matrices connecting AI metrics to executive scorecards'
    ],
    deliverables: [
      'Enterprise AI Operating Model & Escalation Playbook',
      'Internal Engineering Co-Development & Certification Curriculum',
      'Board-Level AI Governance, Compliance & Risk Management Framework',
      'Executive KPI Dashboard & Hoshin Kanri Value Tracking System'
    ],
    stakeholders: ['Chief Information Officer (CIO)', 'HR & Transformation Leaders', 'Chief Risk Officer (CRO)', 'Legal & Compliance Counsel'],
    expectedOutcome: 'Compounding organizational AI maturity with cross-functional fluency, regulatory compliance, and total employee buy-in.',
    methods: ['Hoshin Kanri', 'Balanced Scorecard', 'Change Management', 'Standard Work (SOP)']
  },
  {
    stageId: 'accelerate',
    name: 'ACCELERATE',
    subtitle: 'Compounding Value & Continuous Yield',
    objective: 'Drive continuous yield improvements, expand AI factories across new business domains, and optimize long-term inference economics.',
    whatHappens: 'The Value Realization Office (VRO) continuously audits token utilization, optimizes compute kernels, and prioritizes new autonomous agent expansion.',
    trustgridActivities: [
      'Conducting weekly inference profiling to prune dead KV-cache memory and eliminate token waste',
      'Executing Kaizen continuous improvement cycles across production agent fleets and GPU utilization',
      'Assisting leadership in scaling sovereign private AI data centers and edge inference deployments',
      'Quarterly financial attribution reviews tying compute expenditure directly to CFO balance sheets'
    ],
    deliverables: [
      'Value Realization Office (VRO) Quarterly Yield Audits',
      'Kernel-Level Accelerator Micro-Optimization Updates',
      'Cross-Domain Autonomous Agent Expansion Roadmap',
      'Executive CFO Value & Token Attribution Reports'
    ],
    stakeholders: ['Chief Executive Officer (CEO)', 'Chief Financial Officer (CFO)', 'Chief Information Officer (CIO)', 'Business Unit General Managers'],
    expectedOutcome: 'Compounding enterprise competitive advantage with defensible ROI, minimal cost of intelligence, and continuous operational superiority.',
    methods: ['Kaizen', 'Throughput Accounting', 'Statistical Quality Control', 'Total Productive Maintenance (TPM)']
  }
]

const stageIcons: Record<string, React.ElementType> = {
  diagnose: Compass,
  architect: Layers,
  implement: Cpu,
  automate: Bot,
  adopt: Users,
  accelerate: Rocket
}

export function MethodologyJourneySlider() {
  const [activeIdx, setActiveIdx] = useState(0)

  const current = defaultMethodologyJourney[activeIdx]
  const Icon = stageIcons[current.stageId] || Compass

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % defaultMethodologyJourney.length)
  }

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + defaultMethodologyJourney.length) % defaultMethodologyJourney.length)
  }

  return (
    <div className="methodology-journey-slider-wrapper animated-card">
      <span className="card-corner-tl" />
      <span className="card-corner-br" />

      {/* Navigation Stage Strip */}
      <div className="meth-journey-strip" role="tablist" aria-label="Methodology Journey Stages">
        {defaultMethodologyJourney.map((st, idx) => {
          const StIcon = stageIcons[st.stageId] || Compass
          const isActive = idx === activeIdx
          return (
            <button
              key={st.stageId}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`meth-stage-tab ${isActive ? 'active' : ''}`}
              onClick={() => setActiveIdx(idx)}
            >
              <div className="tab-icon-wrap">
                <StIcon size={15} />
              </div>
              <span className="tab-stage-name">{st.name}</span>
            </button>
          )
        })}
      </div>

      {/* Main Active Stage Detailed View */}
      <div className="meth-stage-content">
        <div className="meth-stage-grid">
          {/* Left Column: Stage Objective & What Happens */}
          <div className="meth-left-col">
            <div className="meth-stage-head">
              <span className="meth-badge-pill">ENGAGEMENT STAGE</span>
              <span className="meth-stage-sub">{current.subtitle}</span>
            </div>

            <h3 className="meth-stage-heading">{current.name}</h3>

            <div className="meth-objective-card">
              <div className="card-flag">
                <Sparkles size={15} className="text-blue-500" />
                <span>Core Engineering Objective</span>
              </div>
              <p>{current.objective}</p>
            </div>

            <div className="meth-what-happens-card">
              <div className="card-flag">
                <Workflow size={15} className="text-cyan-400" />
                <span>Execution & Activities</span>
              </div>
              <p className="mb-2">{current.whatHappens}</p>
              <ul className="activities-list">
                {current.trustgridActivities.map((act, i) => (
                  <li key={i}>
                    <CheckCircle2 size={13} className="text-blue-500 shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stakeholder Involvement */}
            <div className="meth-stakeholders-card">
              <div className="card-flag">
                <Users size={14} className="text-blue-500" />
                <span>Key Stakeholder Involvement</span>
              </div>
              <div className="stakeholders-pills-wrap">
                {current.stakeholders.map((s, i) => (
                  <span key={i} className="stakeholder-chip">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Deliverables, Expected Outcomes & Applied Methods */}
          <div className="meth-right-col">
            {/* Tangible Deliverables */}
            <div className="meth-deliverables-box">
              <span className="box-title-label">
                <FileCheck size={14} className="text-blue-500" />
                Tangible Engineering Deliverables
              </span>
              <ul className="deliverables-checklist">
                {current.deliverables.map((del, i) => (
                  <li key={i}>
                    <CheckCircle2 size={14} className="text-blue-500 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Expected Business Outcome */}
            <div className="meth-outcome-box">
              <div className="outcome-head">
                <TrendingUp size={15} className="text-blue-500" />
                <span>Expected Enterprise Outcome</span>
              </div>
              <p>{current.expectedOutcome}</p>
            </div>

            {/* Applied Methodologies */}
            <div className="meth-frameworks-box">
              <span className="box-title-label">
                <ShieldCheck size={14} className="text-cyan-400" />
                Industrial Engineering Methodologies Applied
              </span>
              <div className="methods-tags-row">
                {current.methods.map((m, i) => (
                  <span key={i} className="method-tag-pill">{m}</span>
                ))}
              </div>
            </div>

            {/* Footer Actions & Navigation */}
            <div className="meth-actions-footer">
              <Link href="/book-ai-diagnostic" className="button button-primary button-sm">
                <span>Initiate {current.name} Stage</span>
                <ArrowUpRight size={15} />
              </Link>
              <Link href="/request-proposal" className="button button-ghost button-sm">
                <span>Request Custom Proposal</span>
              </Link>

              <div className="meth-nav-arrows ml-auto">
                <button
                  type="button"
                  className="slider-arrow-btn"
                  onClick={handlePrev}
                  aria-label="Previous methodology stage"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  className="slider-arrow-btn"
                  onClick={handleNext}
                  aria-label="Next methodology stage"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

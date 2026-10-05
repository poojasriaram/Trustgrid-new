'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  TrendingUp,
  BarChart3,
  Workflow,
  SlidersHorizontal,
  Zap,
  Boxes,
  Building2,
  Cpu,
  Layers,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  LineChart,
  Scale,
  ShieldCheck,
  AlertCircle,
  Check,
  Activity,
  Clock,
  Target,
  FileText,
  RefreshCw,
  Shield,
  Eye,
  Layers3,
  ChevronDown,
  ChevronRight,
  Calendar,
  DollarSign,
  Award,
  Compass,
  Lock,
  FileSpreadsheet,
  Coins,
  Flame,
  CheckSquare,
  HelpCircle,
  Search,
  Filter,
  Users
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { TrustGridForm } from '@/components/ui/trustgrid-form'
import { WhatsAppCTA } from '@/components/ui/whatsapp-cta'
import { HeroCanvas } from '@/components/ui/hero-canvas'
import { BorderBeam } from '@/components/ui/border-beam'
import { trackCTA } from '@/lib/analytics'

// ==========================================
// 1. DATA: 8 STAGES OF THE AI-VE JOB PLAN
// ==========================================
interface JobPlanStage {
  id: string
  number: string
  name: string
  subtitle: string
  summary: string
  classicalBasis: string
  aiIndustrialization: string
  signatureDeliverable: string
  financeGate: string
}

const jobPlanStages: JobPlanStage[] = [
  {
    id: 'info',
    number: '01',
    name: 'INFORMATION',
    subtitle: 'AI Process Mining & Unit Economics Baseline',
    summary: 'Ingest enterprise event logs, telemetry streams, and financial ledgers to construct an empirical baseline of operations before human debate begins.',
    classicalBasis: 'Information Phase (Miles 1947, SAVE International Standard)',
    aiIndustrialization: 'Unsupervised process mining, automated telemetry extraction, token-cost telemetry, and ERP data-lineage reconciliation.',
    signatureDeliverable: 'Empirical Process Model & Signed Baseline Economics Dossier',
    financeGate: 'Historical variance baseline certified; baseline spend locked with Finance.'
  },
  {
    id: 'function',
    number: '02',
    name: 'FUNCTION ANALYSIS',
    subtitle: 'Enterprise Function-Cost Ledger',
    summary: 'Decompose enterprise activity into discrete verb–noun functions (e.g., "Moves ore", "Verifies identity", "Inspects weld") and price each function with precision.',
    classicalBasis: 'Function Analysis System Technique (FAST), Cost-to-Function Analysis',
    aiIndustrialization: 'LLM semantic activity classification, multi-dimensional activity-based costing (ABC), and real-time unit economics attribution.',
    signatureDeliverable: 'Enterprise Function-Cost Ledger (Baseline Cost vs. Should-Cost)',
    financeGate: 'Every dollar of direct and indirect cost mapped to a verified functional unit.'
  },
  {
    id: 'creative',
    number: '03',
    name: 'CREATIVE',
    subtitle: 'Generative Alternatives, TRIZ & Digital Twins',
    summary: 'Systematically generate non-obvious engineering solutions to perform basic functions at radically reduced cost without sacrificing performance.',
    classicalBasis: 'Creative Phase, TRIZ (Theory of Inventive Problem Solving), Synectics',
    aiIndustrialization: 'Generative design agents, patent-corpus TRIZ contradiction matrices, synthetic operational simulation, and physics-informed digital twins.',
    signatureDeliverable: 'Function Alternative Portfolio & Physics/Data Simulation Results',
    financeGate: 'Feasibility boundary checks cleared; no violation of critical performance thresholds.'
  },
  {
    id: 'eval',
    number: '04',
    name: 'EVALUATION',
    subtitle: 'Financial Modeling & Risk-Adjusted Ranking',
    summary: 'Subject every proposed alternative to rigorous financial modeling, constraint-impact analysis, and risk-adjusted ranking.',
    classicalBasis: 'Evaluation Matrix, Pugh Concept Selection, Monte Carlo Risk Simulation',
    aiIndustrialization: 'Automated DCF/NPV engines, stochastic risk bounds, Theory of Constraints (TOC) throughput modeling, and implementation friction scoring.',
    signatureDeliverable: 'Ranked Multi-Criteria Decision Matrix & Risk-Adjusted Value Scorecard',
    financeGate: 'CFO-grade hurdle rate verified; downside risk bounded within corporate tolerance.'
  },
  {
    id: 'dev',
    number: '05',
    name: 'DEVELOPMENT',
    subtitle: 'Implementation Design & Agent Fleet Architecture',
    summary: 'Engineer the detailed operational execution plan: define multi-agent orchestration DAGs, tool connectors, guardrail policies, and SOP revisions.',
    classicalBasis: 'Development Phase, Failure Mode and Effects Analysis (FMEA), Pilot Design',
    aiIndustrialization: 'LangGraph/AutoGen agent architecture synthesis, Model Context Protocol (MCP) tooling specs, living FMEA risk trees, and synthetic sandbox rehearsal.',
    signatureDeliverable: 'Multi-Agent Fleet Blueprint, MCP Tooling Schema & Living FMEA Matrix',
    financeGate: 'Unit-cost economics verified; capital expenditure and payback schedule co-signed.'
  },
  {
    id: 'presentation',
    number: '06',
    name: 'PRESENTATION',
    subtitle: 'Finance-Certified Value Cases',
    summary: 'Present defensible business cases to executive sponsors and the capital allocation committee, backed by mathematical proof and Finance co-signatures.',
    classicalBasis: 'Management Presentation, A3 Strategic Proposal, Capital Allocation Dossier',
    aiIndustrialization: 'Automated executive narrative generation, interactive C-suite scenario simulators, and cryptographic proof-of-concept verification logs.',
    signatureDeliverable: 'Board-Ready Value Acceleration Dossier & Finance Co-Signature',
    financeGate: 'P&L line-item ownership assigned; CFO formal sign-off for wave deployment.'
  },
  {
    id: 'impl',
    number: '07',
    name: 'IMPLEMENTATION',
    subtitle: 'AI-Accelerated 4–10x Deployment',
    summary: 'Deploy the engineered agent fleets into live production operations, operating in tight closed-loop coordination with human workforce tiers.',
    classicalBasis: 'Implementation Phase, Kaizen Execution, Daily Tier Rhythm, Andon Gates',
    aiIndustrialization: 'Continuous integration of digital workers, automated failover circuit breakers, daily Kata coaching LLMs, and real-time operational telemetry.',
    signatureDeliverable: 'Live Production Fleet Telemetry & Daily Tier Execution Dashboard',
    financeGate: 'Weekly value realization tracking; cash and cost variance monitoring.'
  },
  {
    id: 'audit',
    number: '08',
    name: 'AUDIT & PERMANENCE',
    subtitle: 'Value Guardians & 6-Month Permanence Audit',
    summary: 'Ensure gains do not decay. Autonomous Value Guardian agents continuously monitor baseline metrics and trigger automated interventions if decay starts.',
    classicalBasis: 'Audit & Follow-up Phase, Statistical Process Control (SPC), 6-Month Post-Audit',
    aiIndustrialization: 'Autonomous Value Guardian agents, automated Shewhart drift detectors, difference-in-differences causal attribution, and continuous compounding loops.',
    signatureDeliverable: '6-Month Permanence Audit Certificate (≥90% Value Retention Gate)',
    financeGate: 'Final P&L reconciliation; annual compounding factor certified for board audit.'
  }
]

// ==========================================
// 2. DATA: FUNCTION-COST LEDGER (ILLUSTRATIVE)
// ==========================================
interface LedgerItem {
  id: string
  industry: string
  verbNoun: string
  operationalScope: string
  baselineCost: string
  engineeredCost: string
  savingsPct: string
  annualizedValue: string
  agentFleet: string
  financeAttribution: string
}

const ledgerData: LedgerItem[] = [
  {
    id: 'mining-1',
    industry: 'Mining & Heavy Operations',
    verbNoun: 'Moves ore',
    operationalScope: 'Haul truck cycle routing, pit-to-crusher payload dispatch (85M tonnes/yr)',
    baselineCost: '$14.20 / tonne',
    engineeredCost: '$9.80 / tonne',
    savingsPct: '31% cost-out',
    annualizedValue: '$37.4M certified savings',
    agentFleet: 'Dispatch & Payload Optimization Agent Fleet with real-time road friction telemetry',
    financeAttribution: 'Causal fuel and tire telemetry reconciled against GL diesel ledger (diff-in-diff vs. pit B)'
  },
  {
    id: 'mining-2',
    industry: 'Mining & Heavy Operations',
    verbNoun: 'Crushes rock',
    operationalScope: 'Semi-Autogenous Grinding (SAG) mill throughput & power optimization (24/7)',
    baselineCost: '$6.50 / tonne',
    engineeredCost: '$4.90 / tonne',
    savingsPct: '25% cost-out',
    annualizedValue: '$18.2M throughput gain',
    agentFleet: 'Acoustic & Vibration Sensor-Fusion Fleet adjusting feed-rate sub-second to prevent overload',
    financeAttribution: 'Specific energy consumption (kWh/t) verified directly against grid utility billing'
  },
  {
    id: 'finance-1',
    industry: 'Financial Services & KYC',
    verbNoun: 'Verifies identity',
    operationalScope: 'Institutional AML/KYC onboarding & UBO beneficial ownership tracing (320K entities/yr)',
    baselineCost: '$285.00 / entity',
    engineeredCost: '$38.00 / entity',
    savingsPct: '87% cost-out',
    annualizedValue: '$24.6M operational cost-out',
    agentFleet: 'Multi-Jurisdictional Cross-Registry Tracing Fleet with deterministic audit graph provenance',
    financeAttribution: 'Operations FTE reallocation verified; third-party data vendor API expense reduction'
  },
  {
    id: 'mfg-1',
    industry: 'Advanced Manufacturing',
    verbNoun: 'Inspects weld',
    operationalScope: 'Automotive robotic seam welding QA & structural acoustic inspection (4.2M joints/yr)',
    baselineCost: '$4.80 / joint',
    engineeredCost: '$1.15 / joint',
    savingsPct: '76% cost-out',
    annualizedValue: '$15.3M defect & scrap out',
    agentFleet: 'High-speed Vision & Acoustic Inspection Agents operating inline at 120 frames/second',
    financeAttribution: 'Post-weld scrap rates and warranty claim reserve release audited by Corporate Risk'
  },
  {
    id: 'claims-1',
    industry: 'Insurance & Healthcare',
    verbNoun: 'Settles claim',
    operationalScope: 'Commercial property & casualty first-notice-of-loss through final adjudication (180K claims/yr)',
    baselineCost: '$420.00 / claim',
    engineeredCost: '$94.00 / claim',
    savingsPct: '78% cost-out',
    annualizedValue: '$29.1M ALAE expense out',
    agentFleet: 'Policy Coverage & Medical Forensic Adjudication Swarm with anti-fraud causal validation',
    financeAttribution: 'Allocated Loss Adjustment Expense (ALAE) savings certified by Actuarial & Finance'
  },
  {
    id: 'telecom-1',
    industry: 'Telecommunications & Cloud',
    verbNoun: 'Routes packet',
    operationalScope: 'Core backbone transit arbitration, peering congestion, and AI cluster telemetry',
    baselineCost: '$0.85 / GB transferred',
    engineeredCost: '$0.32 / GB transferred',
    savingsPct: '62% cost-out',
    annualizedValue: '$21.8M transit savings',
    agentFleet: 'Autonomous BGP Routing & Traffic Engineering Fleet with real-time latency arbitration',
    financeAttribution: 'Direct carrier invoice audit comparing committed CIR vs. actual burst billing'
  }
]

// ==========================================
// 3. DATA: 7 VALUE LEVERS (PROVEN PORTFOLIO)
// ==========================================
interface ValueLever {
  id: string
  name: string
  tag: string
  methodologies: string[]
  aiExecution: string
  valueSignature: string
  description: string
}

const valueLevers: ValueLever[] = [
  {
    id: 'flow',
    name: 'FLOW & SPEED',
    tag: 'LEVER 01',
    methodologies: ['Lean Thinking', 'Value Stream Mapping (VSM)', 'JIT / Kanban', 'Theory of Constraints (TOC)', 'SMED'],
    aiExecution: 'Process-mined living value stream maps; reinforcement learning-tuned pull systems; autonomous constraint identification and dynamic buffer management.',
    valueSignature: 'Lead time ↓30–60% · Work-in-Progress (WIP) ↓25–50%',
    description: 'Eliminates waiting, transport, and inventory queues across enterprise workflows by aligning operational tempo to actual demand pull.'
  },
  {
    id: 'quality',
    name: 'QUALITY & VARIABILITY',
    tag: 'LEVER 02',
    methodologies: ['Six Sigma / DMAIC', 'Statistical Process Control (SPC)', 'Poka-Yoke', '8D Problem Solving', 'Ishikawa / 5 Whys'],
    aiExecution: 'Causal-inference root-cause engines; deep-learning Shewhart SPC; automated 8D synthesis; perpetual causal error catalog with zero recurrent defects.',
    valueSignature: 'Defects & Rework ↓50–80% · Process Capability (Cpk) ↑0.4–0.8',
    description: 'Stabilizes process execution by eliminating variance at the root before errors escape downstream into customer hands.'
  },
  {
    id: 'risk',
    name: 'RISK & RELIABILITY',
    tag: 'LEVER 03',
    methodologies: ['Failure Mode & Effects Analysis (FMEA)', 'Fault Tree Analysis (FTA)', 'Total Productive Maintenance (TPM)', 'Reliability-Centered Maintenance (RCM)', 'OEE'],
    aiExecution: 'Living predictive FMEA graphs; multi-modal sensor-fusion failure prediction; automated barrier and safety interlock integrity audits.',
    valueSignature: 'Unplanned Downtime ↓30–50% · Overall Equipment Effectiveness (OEE) ↑15–25 pts',
    description: 'Transforms reactive maintenance and emergency fire-drills into mathematically deterministic asset and process availability.'
  },
  {
    id: 'cost',
    name: 'COST & CAPITAL',
    tag: 'LEVER 04',
    methodologies: ['Value Engineering', 'Target Costing', 'Kaizen Costing', 'Activity-Based Costing (ABC)', 'Cost of Quality (COQ)'],
    aiExecution: 'Generative function-alternatives; machine-learning should-cost models; sub-second unit economics decomposition; enterprise Function-Cost Ledger.',
    valueSignature: 'Addressable Operational Cost ↓15–30% · Capital Payback <6 months',
    description: 'Scrutinizes every dollar spent against the functional value delivered, systematically removing non-value-adding operational waste.'
  },
  {
    id: 'strategy',
    name: 'STRATEGY & ALIGNMENT',
    tag: 'LEVER 05',
    methodologies: ['Hoshin Kanri', 'Balanced Scorecard (BSC)', 'Objectives & Key Results (OKR)', 'Sales & Operations Planning (S&OP)'],
    aiExecution: 'Knowledge-graph strategy cascade verification; causally-validated Balanced Scorecards; multi-horizon demand sensing and supply balancing.',
    valueSignature: 'Forecast Error ↓20–40% · Strategic Initiative On-Time Delivery ↑35–50%',
    description: 'Bridges executive board vision to frontline daily execution, guaranteeing that 100% of deployed resources serve top strategic imperatives.'
  },
  {
    id: 'people',
    name: 'PEOPLE & CAPABILITY',
    tag: 'LEVER 06',
    methodologies: ['Kaizen Continuous Improvement', 'Toyota Kata', 'A3 Problem Solving', 'Gemba Walks', 'Teian Suggestion Systems'],
    aiExecution: 'Context-aware LLM coaching at enterprise scale; NLP continuous idea mining; automated daily tier stand-up synthesis and hurdle escalation.',
    valueSignature: 'Ideas Implemented / Employee ↑5–10x · Operational Problem Cycle Time ↓60–80%',
    description: 'Democratizes operational excellence across the entire workforce by equipping every frontline worker with a private Black Belt co-pilot.'
  },
  {
    id: 'growth',
    name: 'GROWTH & DESIGN',
    tag: 'LEVER 07',
    methodologies: ['Quality Function Deployment (QFD)', 'Kano Model', 'Jobs to Be Done (JTBD)', 'Design for Six Sigma (DFSS)', 'TRIZ Inventive Principles'],
    aiExecution: 'Continuous Voice-of-Customer corpus mining; behavioral Kano sentiment classifiers; generative design exploration; patent-mining TRIZ engines.',
    valueSignature: 'Time-to-Market ↓20–40% · Feature Adoption Yield ↑40–60%',
    description: 'Engineers customer value into products and services before capital is committed, ensuring new offerings hit true market demand.'
  }
]

// ==========================================
// 4. DATA: 5 VALUE CURRENCIES
// ==========================================
interface Currency {
  id: string
  code: string
  name: string
  executiveQuestion: string
  whatYouReceive: string
  verificationDiscipline: string
  balanceSheetImpact: string
}

const valueCurrencies: Currency[] = [
  {
    id: 'c1',
    code: '01',
    name: 'Cost OUT',
    executiveQuestion: 'Where does our operating expense immediately decline?',
    whatYouReceive: 'Structural efficiency: elimination of systemic waste (Muda), defects, overprocessing, idle wait states, and unnecessary software/vendor fees.',
    verificationDiscipline: 'Finance-certified baseline vs. actual expense line items; difference-in-differences causal attribution.',
    balanceSheetImpact: 'Direct reduction in OPEX; operating margin expansion in the current fiscal quarter.'
  },
  {
    id: 'c2',
    code: '02',
    name: 'Cash OUT',
    executiveQuestion: 'How does working capital and liquidity improve?',
    whatYouReceive: 'Working capital release through inventory compression, work-in-progress (WIP) reduction, accelerated invoicing, and deferred capital expenditure.',
    verificationDiscipline: 'Cash flow statement reconciliation; balance-sheet working capital audit co-signed by Corporate Treasury.',
    balanceSheetImpact: 'Immediate liquidity release; improved Cash Conversion Cycle (CCC) and free cash flow generation.'
  },
  {
    id: 'c3',
    code: '03',
    name: 'Revenue UP',
    executiveQuestion: 'How do our customers experience speed and superior value?',
    whatYouReceive: 'Accelerated time-to-market, improved service-level attainment, higher product quality, and zero-latency customer experiences that customers pay for.',
    verificationDiscipline: 'Causally-validated revenue attribution models isolating macroeconomic variance from operational improvements.',
    balanceSheetImpact: 'Top-line organic revenue growth and enhanced customer lifetime value (LTV).'
  },
  {
    id: 'c4',
    code: '04',
    name: 'Risk DOWN',
    executiveQuestion: 'How are operational failures, fines, and outages prevented?',
    whatYouReceive: 'Drastic reduction in unplanned downtime, safety incidents, compliance violations, security vulnerabilities, and supplier disruptions.',
    verificationDiscipline: 'Tamper-proof audit trails, automated incident frequency tracking, and mandatory 6-month permanence re-audits.',
    balanceSheetImpact: 'Reduction in warranty reserves, lower insurance premiums, and preservation of enterprise market capitalization.'
  },
  {
    id: 'c5',
    code: '05',
    name: 'Growth OPTION',
    executiveQuestion: 'How does this build sustainable enterprise capability?',
    whatYouReceive: 'Permanent organizational muscle that compounds: the enterprise learns to transform faster each cycle, self-funding subsequent evolutions.',
    verificationDiscipline: 'Measured annual Compounding Factor (≥1.3x) audited and reported directly to the Board of Directors.',
    balanceSheetImpact: 'Strategic capability expansion and multiple-expansion in enterprise equity valuation.'
  }
]

// ==========================================
// 5. DATA: 5-LAYER ENGINEERING MODEL
// ==========================================
interface LayerModel {
  layer: string
  name: string
  focus: string
  engineeredOutcome: string
  subcomponents: string[]
}

const fiveLayerModel: LayerModel[] = [
  {
    layer: '01',
    name: 'Value Discovery & Function Analysis',
    focus: 'Empirical discovery of operational constraints and functional decomposition',
    engineeredOutcome: 'The Function-Cost Ledger and a Finance-certified value-at-stake map across all enterprise operations.',
    subcomponents: ['Unsupervised process mining', 'Verb-noun functional parsing', 'Constraint bottleneck isolation', 'Value-at-stake certification']
  },
  {
    layer: '02',
    name: 'Cost Truth & Unit Economics',
    focus: 'Decomposing macro budgets into deterministic unit costs',
    engineeredOutcome: 'Enterprise cost-per-function, cost-per-transaction, and cost-per-decision — the empirical denominator of value.',
    subcomponents: ['Activity-based unit costing', 'Token & compute FinOps attribution', 'Should-cost engineering baselines', 'ERP financial line-item binding']
  },
  {
    layer: '03',
    name: 'The Methodology Execution Engine',
    focus: 'Industrializing proven operational excellence with AI fleets',
    engineeredOutcome: 'Structured, bundle-based AI agent fleet execution of the 40+ proven methodologies — the heart of enterprise value creation.',
    subcomponents: ['Multi-agent orchestration DAGs', 'Domain-specific reasoning connectors', 'Real-time telemetry closed loops', 'Deterministic guardrail execution']
  },
  {
    layer: '04',
    name: 'Value Realization Office (VRO)',
    focus: 'Institutional financial governance and permanence architecture',
    engineeredOutcome: 'Permanent governance: certification, guardianship, and the 6-month value permanence audit.',
    subcomponents: ['Real-time CFO dashboards', 'Autonomous Value Guardians', 'Difference-in-differences attribution', 'Permanence re-audit verification']
  },
  {
    layer: '05',
    name: 'Compounding Enterprise Advantage',
    focus: 'Self-transforming enterprise operating system',
    engineeredOutcome: 'Measured annual compounding factor (≥1.3x); the value engine self-funds the next wave of autonomous evolution.',
    subcomponents: ['Self-funding capital waterfall', 'Cross-unit capability knowledge graph', 'Autonomous opportunity discovery', 'Executive board value scorecard']
  }
]

// ==========================================
// 6. DATA: ENGAGEMENT MODELS & DIFFERENTIATION
// ==========================================
interface EngagementModel {
  number: string
  title: string
  duration: string
  deliverables: string
  bestFor: string
}

const engagementModels: EngagementModel[] = [
  {
    number: '01',
    title: 'AI Value Discovery Workshop',
    duration: '1–2 Weeks',
    deliverables: 'Function-Cost Ledger of one primary value stream + certified value-at-stake map + tailored methodology prescription.',
    bestFor: 'Enterprises needing an immediate, CFO-vetted roadmap before committing major transformation capital.'
  },
  {
    number: '02',
    title: 'AI Value Acceleration Sprint',
    duration: '8–12 Weeks',
    deliverables: 'One proven methodology (e.g. SMED, TOC, or DMAIC), AI-executed end-to-end — banked, certified value in the P&L by exit.',
    bestFor: 'Operations with a severe, identified constraint requiring rapid breakthrough results and tangible cash-out.'
  },
  {
    number: '03',
    title: 'Full AI Value Engineering',
    duration: '16–32 Weeks',
    deliverables: 'Multi-methodology program through the complete 8-stage Job Plan with a self-funding value waterfall across 3–5 value streams.',
    bestFor: 'Divisions or business units seeking comprehensive operational restructuring with guaranteed ROI.'
  },
  {
    number: '04',
    title: 'Value Realization Office (VRO) Setup',
    duration: '16–24 Weeks',
    deliverables: 'Permanent value governance capability: automated value telemetry, Value Guardians, and Finance certification rhythm.',
    bestFor: 'Enterprises whose AI budget spend is outrunning realized business value and needing permanent governance.'
  },
  {
    number: '05',
    title: 'Enterprise AI Operating System',
    duration: '24–40 Weeks',
    deliverables: 'The complete enterprise engine: permanent agent fleets across all seven levers, continuous compounding factor, self-transforming operations.',
    bestFor: 'Global market leaders establishing permanent, unassailable cost and agility advantage.'
  }
]

export default function AIValueEngineeringPage() {
  const [selectedStage, setSelectedStage] = useState<string>('function')
  const [activeLedgerIndustry, setActiveLedgerIndustry] = useState<string>('Mining & Heavy Operations')
  const [activeLever, setActiveLever] = useState<string>('cost')

  const currentStageData = jobPlanStages.find((s) => s.id === selectedStage) || jobPlanStages[1]
  const filteredLedger = ledgerData.filter((item) => item.industry === activeLedgerIndustry)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      <SiteHeader />

      {/* ========================================================= */}
      {/* HERO SECTION */}
      {/* ========================================================= */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-950 border-b border-slate-800">
        <HeroCanvas />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/40 text-blue-300 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400 shadow-[0_0_8px_#3b82f6]"></span>
              </span>
              <span>AI VALUE ENGINEERING &amp; ACCELERATION</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300 font-medium">Enterprise Value Operating System</span>
            </div>

            {/* Primary Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
              Proven Methodologies.{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                Industrialized by AI.
              </span>{' '}
              Value That Compounds.
            </h1>

            {/* Supporting Copy */}
            <div className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-8 space-y-4 max-w-3xl">
              <p>
                <strong className="text-white font-semibold">Lean saved Toyota.</strong> Six Sigma saved Motorola and GE. Theory of Constraints, TPM, Hoshin Kanri, and classical Value Engineering built entire industrial legends. These operational sciences are proven — what fails is their traditional execution economics: too slow, too human-bottlenecked, and gone the day consultants pack their bags.
              </p>
              <p>
                TrustGrid fixes the execution, not the method. AI agent fleets run the world&apos;s proven operational performance methodologies <strong className="text-white font-semibold">4–10x faster, 24/7</strong>, across your entire enterprise — structured through the 70-year-old Value Engineering Job Plan, certified by your Finance function, and compounding at a measured factor year after year.
              </p>
              <p className="text-blue-300 font-medium text-sm sm:text-base border-l-2 border-blue-500 pl-3">
                We don&apos;t invent new ways to create value. We industrialize the proven ones — permanently.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <a
                href="#intake-form"
                onClick={() => trackCTA('Book AI Value Engineering Diagnostic', 'hero', '#intake-form')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(37,99,235,0.35)] hover:shadow-[0_0_35px_rgba(59,130,246,0.5)] hover:-translate-y-0.5 transition-all"
              >
                <Sparkles size={16} />
                <span>Book AI Value Engineering Diagnostic</span>
              </a>
              <a
                href="#job-plan"
                onClick={() => trackCTA('View the AI-VE Job Plan', 'hero', '#job-plan')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 hover:border-blue-500/50 backdrop-blur-md shadow-xs hover:-translate-y-0.5 transition-all"
              >
                <span>View the AI-VE Job Plan</span>
                <ChevronDown size={16} />
              </a>
              <a
                href="#function-cost-ledger"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-slate-400 hover:text-cyan-300 font-semibold text-sm transition-colors"
              >
                <span>Function-Cost Ledger</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Stat Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80">
            <div className="relative p-5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md hover:border-blue-500/40 transition-all overflow-hidden group">
              <BorderBeam size={100} duration={8} colorFrom="#38bdf8" colorTo="#3b82f6" />
              <span className="text-2xl sm:text-4xl font-extrabold text-blue-400 block mb-1 tracking-tight">3–10x</span>
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">ROI on Initiatives</span>
              <span className="text-[11px] text-slate-400 mt-1 block">P&amp;L-engineered return</span>
            </div>

            <div className="relative p-5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md hover:border-cyan-500/40 transition-all overflow-hidden group">
              <span className="text-2xl sm:text-4xl font-extrabold text-cyan-400 block mb-1 tracking-tight">4–10x</span>
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">Execution Speed</span>
              <span className="text-[11px] text-slate-400 mt-1 block">Accelerated methodology cycle</span>
            </div>

            <div className="relative p-5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md hover:border-emerald-500/40 transition-all overflow-hidden group">
              <span className="text-2xl sm:text-4xl font-extrabold text-emerald-400 block mb-1 tracking-tight">100%</span>
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">Finance-Certified</span>
              <span className="text-[11px] text-slate-400 mt-1 block">Co-signed value claims</span>
            </div>

            <div className="relative p-5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md hover:border-purple-500/40 transition-all overflow-hidden group">
              <span className="text-2xl sm:text-4xl font-extrabold text-purple-400 block mb-1 tracking-tight">≥1.3x</span>
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">Compounding Factor</span>
              <span className="text-[11px] text-slate-400 mt-1 block">Measured annual advantage</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 1: WHAT AI VALUE ENGINEERING IS — AND IS NOT */}
      {/* ========================================================= */}
      <section className="scroll-mt-28 py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-flex items-center gap-1.5 mb-3">
              <ShieldCheck size={12} className="text-blue-600" />
              01 / Definition &amp; Precision
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              What AI Value Engineering Is — and Is Not
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
              Clear enterprise positioning: we are an industrial value creation system, not an experimental software bet or another consulting slide deck.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* NOT THIS CARD */}
            <div className="p-8 rounded-2xl bg-rose-50/40 border border-rose-200/80 shadow-xs relative overflow-hidden">
              <div className="flex items-center gap-2.5 text-rose-700 font-extrabold text-sm uppercase tracking-wider mb-6">
                <span className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 text-xs">✕</span>
                <span>NOT THIS</span>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                  <div>
                    <strong className="text-slate-900 block font-semibold text-base">Not a tool to reduce the cost of AI</strong>
                    <span className="text-sm text-slate-600">We do not focus on penny-pinching API calls in isolation; we focus on the multi-million-dollar economic impact of the business operations being transformed.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                  <div>
                    <strong className="text-slate-900 block font-semibold text-base">Not another strategy deck</strong>
                    <span className="text-sm text-slate-600">We do not hand over high-level PowerPoint roadmaps and exit. We deploy the actual execution engine that captures the value in the daily operating rhythm.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                  <div>
                    <strong className="text-slate-900 block font-semibold text-base">Not experimental technology bets</strong>
                    <span className="text-sm text-slate-600">No brittle prototypes or unproven algorithms. Only validated, production-grade agent architectures anchored to mathematically proven engineering models.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* THIS CARD */}
            <div className="p-8 rounded-2xl bg-emerald-50/40 border border-emerald-200/80 shadow-xs relative overflow-hidden">
              <div className="flex items-center gap-2.5 text-emerald-800 font-extrabold text-sm uppercase tracking-wider mb-6">
                <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs">✓</span>
                <span>THIS</span>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0"></span>
                  <div>
                    <strong className="text-slate-900 block font-semibold text-base">A discipline to create enterprise value using AI as execution engine</strong>
                    <span className="text-sm text-slate-600">AI is the workforce; operational science is the management discipline. Together they unlock value at speed and scale previously unattainable.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0"></span>
                  <div>
                    <strong className="text-slate-900 block font-semibold text-base">Engineering-grade function analysis of the operation</strong>
                    <span className="text-sm text-slate-600">Granular verb-noun decomposition of enterprise activities, pricing what each operational function costs today versus what it should cost.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0"></span>
                  <div>
                    <strong className="text-slate-900 block font-semibold text-base">Proven methodologies industrialized through AI</strong>
                    <span className="text-sm text-slate-600">40+ years of operational excellence — Lean, Six Sigma, TOC, FMEA, TPM — automated via agent fleets, guarded by Finance, and compounding continuously.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Definition Callout Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                FORMAL CANONICAL DEFINITION
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Source: TrustGrid AI-VE Standard v4.2
              </span>
            </div>
            <p className="text-base sm:text-xl font-medium text-slate-200 leading-relaxed">
              <span className="text-white font-bold">AI Value Engineering (n.):</span> The discipline of creating measurable, compounding enterprise value by executing proven operational excellence methodologies through structured, AI-driven application.{' '}
              <span className="text-cyan-300 font-semibold">Every dollar engineered. Every claim certified. Every gain defended.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2: THE EXECUTION ECONOMICS PROBLEM */}
      {/* ========================================================= */}
      <section className="scroll-mt-28 py-16 sm:py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-flex items-center gap-1.5 mb-3">
              <AlertCircle size={12} className="text-blue-600" />
              02 / The Enterprise Challenge
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              The Execution Economics Problem
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
              Enterprises will spend over <strong className="text-slate-900 font-semibold">$500B on AI this cycle</strong> — yet most cannot connect it to bottom-line P&amp;L results. Meanwhile, <strong className="text-slate-900 font-semibold">70% of operational excellence initiatives fail to sustain beyond 18 months</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between">
              <div>
                <span className="text-2xl font-black text-blue-600 font-mono block mb-2">01</span>
                <h3 className="text-lg font-bold text-slate-900 mb-3">KNOWLEDGE DECAYS</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Methodology knowledge leaves with expensive external consultants. Process improvements and standardized work decay the moment human measurement stops, causing operations to regress to historical chaos.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Root Cause: Ephemeral Human Memory
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between">
              <div>
                <span className="text-2xl font-black text-cyan-600 font-mono block mb-2">02</span>
                <h3 className="text-lg font-bold text-slate-900 mb-3">HUMAN EXECUTION BOTTLENECK</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  A certified Master Black Belt or Industrial Engineer completes 2–4 projects per year. Your operation generates thousands of improvement opportunities every month. Human capacity cannot keep pace with operational scale.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Root Cause: Manual Bandwidth Caps
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between">
              <div>
                <span className="text-2xl font-black text-indigo-600 font-mono block mb-2">03</span>
                <h3 className="text-lg font-bold text-slate-900 mb-3">VALUE CLAIMED, NOT CERTIFIED</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Project savings are celebrated in executive slide decks, but rarely reconciled in the general ledger. Without Finance co-signatures and continuous defense, claimed ROI evaporates before audits take place.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Root Cause: Unverified Attribution
              </div>
            </div>
          </div>

          {/* TrustGrid Resolution Card */}
          <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white border border-blue-800/60 shadow-lg">
            <div className="max-w-4xl">
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase block mb-2">
                TRUSTGRID&apos;S RESOLUTION
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-4">
                AI does not replace the methodology. AI industrializes its execution.
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                We combine the 70-year discipline of classical Value Engineering and operational excellence with autonomous AI agent fleets operating at a speed, scale, and continuity no human team can match — under a strict governance standard where <strong className="text-white">nothing is claimed that Finance has not certified, and nothing certified is left unguarded.</strong>
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-cyan-300">
                <span className="inline-flex items-center gap-1.5 bg-blue-950/80 px-3 py-1.5 rounded-lg border border-blue-700/50">
                  <Check size={14} /> 24/7 Continuous Telemetry
                </span>
                <span className="inline-flex items-center gap-1.5 bg-blue-950/80 px-3 py-1.5 rounded-lg border border-blue-700/50">
                  <Check size={14} /> Difference-in-Differences Attribution
                </span>
                <span className="inline-flex items-center gap-1.5 bg-blue-950/80 px-3 py-1.5 rounded-lg border border-blue-700/50">
                  <Check size={14} /> Autonomous Value Guardians
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3: THE VALUE TRINITY */}
      {/* ========================================================= */}
      <section className="scroll-mt-28 py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-flex items-center gap-1.5 mb-3">
              <Zap size={12} className="text-blue-600" />
              03 / Governing Formula
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Value = Methodology × AI Execution × Structured Adoption
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
              These three factors are <strong className="text-slate-900 font-semibold">multiplicative</strong>. If any single component is zero, enterprise value is zero.
            </p>
          </div>

          {/* Trinity 3-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs relative">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-xl mb-4 font-mono">
                M
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">PROVEN METHODOLOGY</h3>
              <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-4">The Trust Layer</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                70 years of validated operational science: Lean, Six Sigma, Theory of Constraints, FMEA, TPM, TRIZ, and Hoshin Kanri. Validated principles that have built trillions in enterprise valuation.
              </p>
              <div className="mt-6 pt-4 border-t border-slate-200 text-xs font-medium text-slate-500">
                Ensures you solve the right operational problem.
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs relative">
              <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-extrabold text-xl mb-4 font-mono">
                A
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">AI EXECUTION POWER</h3>
              <p className="text-xs text-cyan-600 font-bold uppercase tracking-wider mb-4">The Speed Layer</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Autonomous agent fleets running 24/7 across every operational dataset: 4–10x execution speed, continuous root-cause analysis, total data depth, and automated closed-loop intervention.
              </p>
              <div className="mt-6 pt-4 border-t border-slate-200 text-xs font-medium text-slate-500">
                Breaks the human capacity and bandwidth bottleneck.
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs relative">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-xl mb-4 font-mono">
                S
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">STRUCTURED ADOPTION</h3>
              <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider mb-4">The Permanence Layer</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Daily Tier 1–3 operating rhythm, automated Kata coaching, capability graphs, and Finance-certified governance that locks gains into the general ledger permanently.
              </p>
              <div className="mt-6 pt-4 border-t border-slate-200 text-xs font-medium text-slate-500">
                Prevents decay and institutionalizes continuous compounding.
              </div>
            </div>
          </div>

          {/* Trinity Result Banner */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white text-center border border-slate-800 shadow-sm mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase block mb-1">
              MULTIPLIED RESULT
            </span>
            <div className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              ENTERPRISE VALUE: Created · Certified · Defended · Compounding
            </div>
          </div>

          {/* Comparative Yield Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-900 font-bold text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">Approach</th>
                  <th className="py-4 px-6">Methodology</th>
                  <th className="py-4 px-6">AI Execution</th>
                  <th className="py-4 px-6">Structured Adoption</th>
                  <th className="py-4 px-6 text-right">Value Yield</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-900">Traditional Consulting</td>
                  <td className="py-4 px-6 text-slate-700">Strong (70 yrs science)</td>
                  <td className="py-4 px-6 text-rose-600 font-medium">Manual, periodic, slow</td>
                  <td className="py-4 px-6 text-rose-600 font-medium">Decays on consultant exit</td>
                  <td className="py-4 px-6 text-right font-mono font-bold text-slate-600">~10% of potential</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-900">Pure AI / Tech Vendors</td>
                  <td className="py-4 px-6 text-rose-600 font-medium">Weak (tools, no method)</td>
                  <td className="py-4 px-6 text-slate-700">Strong software capabilities</td>
                  <td className="py-4 px-6 text-rose-600 font-medium">Weak (left to customer)</td>
                  <td className="py-4 px-6 text-right font-mono font-bold text-slate-600">~5% of potential</td>
                </tr>
                <tr className="bg-blue-50/50 hover:bg-blue-50 transition-colors">
                  <td className="py-4 px-6 font-extrabold text-blue-900 flex items-center gap-2">
                    <Sparkles size={16} className="text-blue-600" />
                    TrustGrid AVE
                  </td>
                  <td className="py-4 px-6 font-semibold text-blue-900">Proven portfolio, correctly applied</td>
                  <td className="py-4 px-6 font-semibold text-blue-900">Industrialized agent fleets (4–10x)</td>
                  <td className="py-4 px-6 font-semibold text-blue-900">Engineered rhythm + Value Guardians</td>
                  <td className="py-4 px-6 text-right font-mono font-extrabold text-blue-700">Compounding (≥1.3x/yr)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4: THE AI-VE JOB PLAN */}
      {/* ========================================================= */}
      <section id="job-plan" className="scroll-mt-28 py-16 sm:py-24 bg-slate-950 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-slate-900 px-2.5 py-1 rounded-md border border-cyan-500/40 inline-flex items-center gap-1.5 mb-3">
              <Workflow size={12} className="text-cyan-400" />
              04 / Signature Framework
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              The AI-VE Job Plan
            </h2>
            <h3 className="text-lg sm:text-xl font-bold text-cyan-300 mt-2">
              The 70-year-old engineering discipline — re-engineered with AI at every step
            </h3>
            <p className="text-base text-slate-300 mt-3 leading-relaxed">
              Classical Value Engineering follows a disciplined 8-stage Job Plan. TrustGrid executes it through autonomous agent fleets — turning it from a periodic consulting exercise into a permanent, living enterprise operating system.
            </p>
          </div>

          {/* Stage Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-8">
            {jobPlanStages.map((stage) => {
              const isSelected = stage.id === selectedStage
              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStage(stage.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-blue-600/30 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span className="text-xs font-mono font-bold block mb-1 text-cyan-400">{stage.number}</span>
                  <span className="text-xs font-extrabold tracking-tight block truncate">{stage.name}</span>
                </button>
              )
            })}
          </div>

          {/* Active Stage Detailed Panel */}
          <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
              <div className="max-w-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black font-mono text-cyan-400">
                    STAGE {currentStageData.number}
                  </span>
                  <span className="text-slate-600">|</span>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Continuous Value Loop
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {currentStageData.name}: {currentStageData.subtitle}
                </h3>
                <p className="text-base text-slate-300 leading-relaxed">
                  {currentStageData.summary}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                  <div>
                    <span className="text-xs font-bold uppercase text-slate-400 block mb-1">Classical Science Basis</span>
                    <p className="text-sm font-medium text-slate-200">{currentStageData.classicalBasis}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase text-slate-400 block mb-1">AI Industrialization</span>
                    <p className="text-sm font-medium text-slate-200">{currentStageData.aiIndustrialization}</p>
                  </div>
                </div>
              </div>

              {/* Deliverable & Finance Gate Card */}
              <div className="lg:w-80 shrink-0 p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                    Signature Deliverable
                  </span>
                  <p className="text-sm font-semibold text-white">
                    {currentStageData.signatureDeliverable}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                    Finance Certification Gate
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentStageData.financeGate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 5: FUNCTION-COST LEDGER (SIGNATURE FEATURE) */}
      {/* ========================================================= */}
      <section id="function-cost-ledger" className="scroll-mt-28 py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
              <FileSpreadsheet size={13} />
              Step 2 Signature Instrument
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              The Enterprise Function-Cost Ledger
            </h2>
            <h3 className="text-lg sm:text-xl font-bold text-slate-700 mt-2">
              Decomposing Enterprise Activity into Verb–Noun Functional Units &amp; Unit Economics
            </h3>
            <p className="text-base text-slate-600 mt-3 leading-relaxed">
              Classical Value Engineering begins by asking two foundational questions: <strong className="text-slate-900 font-semibold">&ldquo;What does it do?&rdquo;</strong> and <strong className="text-slate-900 font-semibold">&ldquo;What does that function cost?&rdquo;</strong>.
              TrustGrid decomposes your enterprise into verb–noun functions — <span className="text-blue-700 font-semibold">Moves ore</span>, <span className="text-blue-700 font-semibold">Verifies identity</span>, <span className="text-blue-700 font-semibold">Inspects weld</span>, <span className="text-blue-700 font-semibold">Settles claim</span> — and prices each one against its target should-cost.
            </p>
          </div>

          {/* Industry Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(ledgerData.map((d) => d.industry))).map((industry) => (
                <button
                  key={industry}
                  onClick={() => setActiveLedgerIndustry(industry)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeLedgerIndustry === industry
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>

            <div className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200/80 inline-flex items-center gap-1.5">
              <span>⚠️</span>
              <span>[ILLUSTRATIVE ENTERPRISE FUNCTION-COST LEDGER]</span>
            </div>
          </div>

          {/* Interactive Ledger Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white mb-8">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">Verb–Noun Function</th>
                  <th className="py-4 px-6">Operational Scope &amp; Scale</th>
                  <th className="py-4 px-6">Cost Today (Baseline)</th>
                  <th className="py-4 px-6">Engineered Cost (AI)</th>
                  <th className="py-4 px-6">Net Yield</th>
                  <th className="py-4 px-6">AI Agent Fleet Mechanism</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredLedger.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-extrabold text-blue-900">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        <span className="text-base font-mono">{row.verbNoun}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 max-w-xs">
                      {row.operationalScope}
                    </td>
                    <td className="py-4 px-6 font-mono font-semibold text-slate-900">
                      {row.baselineCost}
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-emerald-700">
                      {row.engineeredCost}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex flex-col">
                        <span className="text-xs font-extrabold text-emerald-700">{row.savingsPct}</span>
                        <span className="text-[11px] text-slate-500 font-mono">{row.annualizedValue}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-700 max-w-sm">
                      <p className="font-medium text-slate-900 mb-1">{row.agentFleet}</p>
                      <p className="text-[11px] text-slate-500 italic">Proof: {row.financeAttribution}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-700">
              <strong className="text-slate-900 font-semibold">Want to see your company&apos;s Function-Cost Ledger?</strong> The first deliverable of every engagement is a certified analysis of your primary value stream.
            </div>
            <a
              href="#intake-form"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shrink-0"
            >
              Request Value Stream Diagnostic
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 6: THE PROVEN PORTFOLIO (SEVEN VALUE LEVERS) */}
      {/* ========================================================= */}
      <section className="scroll-mt-28 py-16 sm:py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-flex items-center gap-1.5 mb-3">
              <Boxes size={12} className="text-blue-600" />
              05 / Operational Breadth
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Seven Value Levers. 40+ Proven Methodologies. One AI Execution Engine.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
              We did not invent these methods. We industrialized them. Every lever couples classical operational science with autonomous digital workers.
            </p>
          </div>

          {/* 7 Levers Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {valueLevers.map((lever) => (
              <button
                key={lever.id}
                onClick={() => setActiveLever(lever.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeLever === lever.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-blue-600 mr-1.5">{lever.tag}:</span>
                <span>{lever.name}</span>
              </button>
            ))}
          </div>

          {/* Selected Lever Card */}
          {(() => {
            const current = valueLevers.find((l) => l.id === activeLever) || valueLevers[3]
            return (
              <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-6">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block mb-1">
                      {current.tag}
                    </span>
                    <h3 className="text-2xl font-extrabold text-slate-900">
                      {current.name}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
                      {current.description}
                    </p>
                  </div>
                  <div className="px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200/80 shrink-0">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                      Value Signature
                    </span>
                    <span className="text-sm font-extrabold text-emerald-700 font-mono">
                      {current.valueSignature}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Proven Methodologies (The Trust Layer)
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {current.methodologies.map((m) => (
                        <span
                          key={m}
                          className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      AI-Driven Execution (The Speed Layer)
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                      {current.aiExecution}
                    </p>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 7: FIVE VALUE CURRENCIES */}
      {/* ========================================================= */}
      <section className="scroll-mt-28 py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-flex items-center gap-1.5 mb-3">
              <Coins size={12} className="text-blue-600" />
              06 / Balance Sheet Proof
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How Companies Actually Receive Value
            </h2>
            <h3 className="text-lg sm:text-xl font-bold text-slate-700 mt-2">
              Where does the value actually appear? Five discrete, balance-sheet-verifiable currencies.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valueCurrencies.map((c) => (
              <div
                key={c.id}
                className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest">
                      CURRENCY {c.code}
                    </span>
                    <span className="text-xs font-bold text-slate-400 font-mono">P&amp;L Accretive</span>
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-900 mb-2">{c.name}</h4>
                  <p className="text-xs font-semibold text-blue-700 mb-3 italic">&ldquo;{c.executiveQuestion}&rdquo;</p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {c.whatYouReceive}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 space-y-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Verification Discipline</span>
                    <p className="text-xs font-medium text-slate-700">{c.verificationDiscipline}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-emerald-600 block">Financial Impact</span>
                    <p className="text-xs font-semibold text-emerald-800">{c.balanceSheetImpact}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Compounding Callout Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-2">
                  ANNUAL AUDIT REQUIREMENT
                </span>
                <h4 className="text-xl font-extrabold text-white mb-3">The Measured Compounding Factor</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Every year, TrustGrid calculates your enterprise Compounding Factor (target ≥1.3x). This audits whether the capability gained in wave 1 accelerated the velocity and reduced the cost of wave 2.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-800 text-xs text-cyan-300 font-mono font-semibold">
                Reported annually directly to the Board of Directors &amp; Audit Committee.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 8: FIVE-LAYER ENGINEERING MODEL */}
      {/* ========================================================= */}
      <section className="scroll-mt-28 py-16 sm:py-24 bg-slate-950 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-slate-900 px-2.5 py-1 rounded-md border border-cyan-500/40 inline-flex items-center gap-1.5 mb-3">
              <Layers3 size={12} className="text-cyan-400" />
              07 / Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              The Five-Layer Engineering Model
            </h2>
            <p className="text-base sm:text-lg text-slate-300 mt-3 leading-relaxed">
              Every layer purpose-engineered. Two trust and adoption planes cross-cut all layers.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            {fiveLayerModel.map((item) => (
              <div
                key={item.layer}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4 max-w-xl">
                  <span className="text-xl sm:text-2xl font-black font-mono text-cyan-400 shrink-0">
                    {item.layer}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.focus}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.subcomponents.map((c) => (
                        <span
                          key={c}
                          className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] border border-slate-700"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:w-80 shrink-0 p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                    Engineered Outcome
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {item.engineeredOutcome}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Cross-Cutting Trust & Adoption Planes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
            <div className="border-b md:border-b-0 md:border-r border-slate-800 pb-6 md:pb-0 md:pr-6">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-2">
                CROSS-CUTTING PLANE A
              </span>
              <h4 className="text-lg font-bold text-white mb-2">Trusted AI Engineering</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Deterministic explainability, cryptographically hashed audit trails, and strict alignment with the EU AI Act, NIST AI RMF, and ISO 42001. Trust is an architectural system property of every layer, not an afterthought.
              </p>
            </div>
            <div className="md:pl-6">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest block mb-2">
                CROSS-CUTTING PLANE B
              </span>
              <h4 className="text-lg font-bold text-white mb-2">Structured Adoption</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Daily Tier 1–3 operational rhythm, automated Kata coaching, and enterprise capability graphs. Digital workers do not create value if frontline operators do not embrace and trust their execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 9: MATURITY ARC */}
      {/* ========================================================= */}
      <section className="scroll-mt-28 py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-flex items-center gap-1.5 mb-3">
              <Activity size={12} className="text-blue-600" />
              08 / Transformation Journey
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              From First Diagnosis to Self-Transforming Enterprise
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
              A disciplined four-horizon progression that shifts your organization from reactive cost tracking to autonomous, self-funded compounding.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 relative">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center mb-4 font-mono">
                01
              </div>
              <span className="text-xs font-mono font-bold text-blue-600 uppercase block mb-1">HORIZON 1</span>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">NOW: Assess &amp; Function-Analyze</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Construct the empirical Function-Cost Ledger. Quantify addressable waste and achieve Finance co-signature on the baseline value-at-stake map.
              </p>
              <span className="text-[11px] font-bold text-slate-500 uppercase">Duration: 1–2 Weeks</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 relative">
              <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 font-black text-xs flex items-center justify-center mb-4 font-mono">
                02
              </div>
              <span className="text-xs font-mono font-bold text-cyan-600 uppercase block mb-1">HORIZON 2</span>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">NEXT: Execute &amp; Bank</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Deploy first AI-run methodologies against primary operational bottlenecks. Bank Finance-certified P&amp;L value in weeks to self-fund expansion.
              </p>
              <span className="text-[11px] font-bold text-slate-500 uppercase">Duration: 8–12 Weeks</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 relative">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center mb-4 font-mono">
                03
              </div>
              <span className="text-xs font-mono font-bold text-indigo-600 uppercase block mb-1">HORIZON 3</span>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">SCALE: Industrialize</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Agent fleets operate 40+ methodologies 24/7 across multiple value streams. Value Realization Office institutionalizes continuous guardianship.
              </p>
              <span className="text-[11px] font-bold text-slate-500 uppercase">Duration: 16–32 Weeks</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 relative">
              <div className="w-8 h-8 rounded-full bg-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center mb-4 font-mono">
                04
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase block mb-1">HORIZON 4</span>
              <h3 className="text-lg font-extrabold text-white mb-2">FUTURE: Self-Transforming</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                The AI Value Operating System autonomously discovers new constraints, funds improvements, and executes enterprise evolution at compounding scale.
              </p>
              <span className="text-[11px] font-bold text-cyan-300 uppercase">Perpetual Operating State</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 10: GOVERNANCE & PROOF DISCIPLINE */}
      {/* ========================================================= */}
      <section className="scroll-mt-28 py-16 sm:py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-flex items-center gap-1.5 mb-3">
              <Scale size={12} className="text-blue-600" />
              09 / Proof &amp; Governance
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Nothing Claimed That Finance Hasn&apos;t Certified. Nothing Certified Left Unguarded.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
              We eliminate disputed savings. TrustGrid establishes a 5-point governance standard that links operational telemetry directly to the general ledger.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xl font-black font-mono text-blue-600 block mb-2">01</span>
              <h3 className="text-sm font-bold text-slate-900 mb-2">Baselines Locked at Diagnose</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prior to executing any initiative, historical performance baselines are locked and signed by your corporate Finance function.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xl font-black font-mono text-blue-600 block mb-2">02</span>
              <h3 className="text-sm font-bold text-slate-900 mb-2">Difference-in-Differences Attribution</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Statistical comparison of AI-assisted operational lines against parallel unassisted lines to eliminate macroeconomic noise.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xl font-black font-mono text-blue-600 block mb-2">03</span>
              <h3 className="text-sm font-bold text-slate-900 mb-2">Certified Per Wave</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No savings are recorded into transformation reports without a formal co-signature from line-of-business controllers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xl font-black font-mono text-blue-600 block mb-2">04</span>
              <h3 className="text-sm font-bold text-slate-900 mb-2">Defended Permanently</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Autonomous Value Guardian agents continuously monitor baseline metrics and trigger automated interventions if decay starts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xl font-black font-mono text-blue-600 block mb-2">05</span>
              <h3 className="text-sm font-bold text-slate-900 mb-2">Re-Audited at 6 Months</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The Value Permanence Test: ≥90% of banked value must still be actively flowing at month six to pass formal certification.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-600" />
              <span>TRUST → PROOF → GOVERNANCE → PERMANENCE</span>
            </div>
            <div className="text-slate-500 font-mono">
              Audit Standard: ISO 42001 · SOX 404 Control Compliance
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 11: ENGAGEMENT JOURNEY & DIFFERENTIATION */}
      {/* ========================================================= */}
      <section className="scroll-mt-28 py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-flex items-center gap-1.5 mb-3">
              <Calendar size={12} className="text-blue-600" />
              10 / Delivery Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Enterprise Engagement Models
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
              Structured entry points tailored to your organization&apos;s current AI maturity and transformation urgency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {engagementModels.map((m) => (
              <div
                key={m.number}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-blue-600 uppercase">
                      MODEL {m.number}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold font-mono">
                      {m.duration}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">{m.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{m.deliverables}</p>
                </div>
                <div className="pt-4 border-t border-slate-200 text-[11px] font-medium text-slate-500">
                  <strong className="text-slate-800 font-semibold block mb-0.5">Best For:</strong> {m.bestFor}
                </div>
              </div>
            ))}

            {/* Quick Diagnostic Card */}
            <div className="p-6 rounded-2xl bg-blue-600 text-white shadow-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-blue-200 uppercase tracking-widest block mb-2">
                  RECOMMENDED ENTRY POINT
                </span>
                <h3 className="text-xl font-extrabold text-white mb-2">AI Value Engineering Diagnostic</h3>
                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed mb-4">
                  A high-velocity technical assessment to uncover trapped value across your compute, workflows, and operations.
                </p>
              </div>
              <a
                href="#intake-form"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-blue-900 font-bold text-xs hover:bg-blue-50 transition-colors"
              >
                <span>Book Diagnostic</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Differentiation Matrix */}
          <div className="max-w-4xl">
            <h3 className="text-xl font-extrabold text-slate-900 mb-6">
              How TrustGrid Differs from Conventional Consultancies &amp; Tech Vendors
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-900 font-bold text-xs uppercase tracking-wider">
                  <tr>
                    <th className="py-4 px-6" style={{ width: '25%' }}>Dimension</th>
                    <th className="py-4 px-6" style={{ width: '35%' }}>Conventional Vendors / Consultancies</th>
                    <th className="py-4 px-6 text-blue-700" style={{ width: '40%' }}>TrustGrid AVE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                  <tr className="hover:bg-slate-50/80">
                    <td className="py-4 px-6 font-bold text-slate-900">Method Basis</td>
                    <td className="py-4 px-6 text-slate-600">Proprietary house frameworks, or one generic method for everything</td>
                    <td className="py-4 px-6 font-semibold text-blue-900 bg-blue-50/30">Only proven, 40+ year-validated methodologies — industrialized, never reinvented</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80">
                    <td className="py-4 px-6 font-bold text-slate-900">Execution</td>
                    <td className="py-4 px-6 text-slate-600">Human-capped, project-scoped, ends when consultants exit</td>
                    <td className="py-4 px-6 font-semibold text-blue-900 bg-blue-50/30">Autonomous agent fleets: 4–10x speed, 24/7 continuity, unlimited data depth</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80">
                    <td className="py-4 px-6 font-bold text-slate-900">Value Basis</td>
                    <td className="py-4 px-6 text-slate-600">Activity-based hourly billing; claims asserted in slide decks</td>
                    <td className="py-4 px-6 font-semibold text-blue-900 bg-blue-50/30">Engineered via Job Plan, certified by Finance, guarded by agents, 6-mo permanence audit</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80">
                    <td className="py-4 px-6 font-bold text-slate-900">End State</td>
                    <td className="py-4 px-6 text-slate-600">Transformation halts and gains decay when budget terminates</td>
                    <td className="py-4 px-6 font-semibold text-blue-900 bg-blue-50/30">Permanent engine; measured compounding (≥1.3x/yr); self-transforming enterprise</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 12: CONVERSION & DIAGNOSTIC INTAKE */}
      {/* ========================================================= */}
      <section id="intake-form" className="scroll-mt-28 py-16 sm:py-24 bg-slate-950 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-slate-900 px-3 py-1 rounded-md border border-cyan-500/40 inline-flex items-center gap-1.5 mb-4">
              <Target size={12} className="text-cyan-400" />
              Direct Executive Intake
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Start With the Value You Can Prove.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Identify where value is trapped. Engineer the opportunity. Certify the economics. Deploy the AI execution layer. Compound the result.
            </p>
            <p className="text-sm text-cyan-300 font-medium mt-2">
              The first deliverable of every engagement is your Function-Cost Ledger — a Finance-certified view of what each function costs, and what it could.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            <BorderBeam size={180} duration={10} colorFrom="#38bdf8" colorTo="#6366f1" />
            <TrustGridForm
              variant="diagnostic"
              formId="form_ai_value_engineering"
              formName="AI Value Engineering Diagnostic"
              defaultSolution="ai-value-engineering"
              ctaSource="solution_page_ai_value_engineering"
            />
            <div className="mt-6 pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
              <Lock size={13} className="text-cyan-400" />
              <span>Enterprise confidentiality guaranteed. Disclosures handled under mutual NDA standards.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* NEXT SOLUTION & CROSS-NAVIGATION */}
      {/* ========================================================= */}
      <section className="py-16 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 block mb-2">
                NEXT IN THE OPERATING STACK
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                Autonomous Agentic Systems (AI Agentic Factory)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Scale your digital workforce from individual copilots to multi-agent swarms executing complex enterprise workflows with deterministic safety and auditability.
              </p>
            </div>
            <Link
              href="/solutions/ai-agentic-factory"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 hover:border-cyan-500/50 transition-all shrink-0"
            >
              <span>Explore AI Agentic Factory</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER & WHATSAPP FLOATING CTA */}
      <SiteFooter />
      <WhatsAppCTA />
    </div>
  )
}

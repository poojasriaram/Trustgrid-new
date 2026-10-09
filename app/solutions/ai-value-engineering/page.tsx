'use client'

import React, { useState, useEffect, useCallback } from 'react'
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
  ChevronLeft,
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
  Users,
  Send,
  Loader2,
  Bot
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { WhatsAppCTA } from '@/components/ui/whatsapp-cta'
import { HeroCanvas } from '@/components/ui/hero-canvas'
import { BorderBeam } from '@/components/ui/border-beam'
import { trackCTA } from '@/lib/analytics'
import { submitTrustGridForm, validateEmail, validatePhone } from '@/lib/form-submission'

// ==========================================
// 1. DATA: 8 AI VALUE ENGINEERING MODELS (4 x 2 GRID)
// ==========================================
interface ModelCardItem {
  number: string
  name: string
  tag: string
  icon: React.ElementType
  description: string
  linkHref: string
  actionLabel: string
}

const aiValueModelsData: ModelCardItem[] = [
  {
    number: '01',
    name: 'AI VALUE DISCOVERY',
    tag: 'OPPORTUNITY MAPPING',
    icon: Sparkles,
    description: 'Identify where enterprise value is trapped, analyze binding operational constraints, and quantify addressable cost opportunities before software commitments.',
    linkHref: '#spin-model',
    actionLabel: 'Explore Model'
  },
  {
    number: '02',
    name: 'AI PROCESS INTELLIGENCE',
    tag: 'TELEMETRY MINING',
    icon: Activity,
    description: 'Use AI-driven process discovery and telemetry analytics across ERP, MES, and cloud logs to understand how work, inventory, and decisions actually flow.',
    linkHref: '#industrial-use-cases',
    actionLabel: 'Explore Model'
  },
  {
    number: '03',
    name: 'FUNCTION-COST ENGINEERING',
    tag: 'UNIT ECONOMICS',
    icon: FileSpreadsheet,
    description: 'Decompose enterprise activity into discrete verb–noun functions and connect each function to its empirical baseline cost versus target Should-Cost.',
    linkHref: '#ledger-economics',
    actionLabel: 'Explore Model'
  },
  {
    number: '04',
    name: 'AI METHODOLOGY EXECUTION',
    tag: 'PROVEN SCIENCES',
    icon: Workflow,
    description: 'Industrialize proven operational excellence methodologies (Lean, Six Sigma, TOC, TPS, TPM) by executing them through autonomous AI agent fleets 4–10x faster.',
    linkHref: '#methodology-engine',
    actionLabel: 'Explore Model'
  },
  {
    number: '05',
    name: 'AI AGENT FLEETS',
    tag: 'DIGITAL WORKFORCE',
    icon: Bot,
    description: 'Deploy specialized multi-agent fleets operating 24/7 across physical and digital operations, gated by deterministic human approval risk bands.',
    linkHref: '#tier-architecture',
    actionLabel: 'Explore Model'
  },
  {
    number: '06',
    name: 'VALUE REALIZATION',
    tag: 'P&L ACCRETION',
    icon: CheckCircle2,
    description: 'Track and verify whether engineered improvements actually become measurable enterprise P&L value, verified by Finance and reconciled against the general ledger.',
    linkHref: '#value-currencies',
    actionLabel: 'Explore Model'
  },
  {
    number: '07',
    name: 'VALUE GUARDIANSHIP',
    tag: 'PERMANENCE DEFENSE',
    icon: ShieldCheck,
    description: 'Autonomous Value Guardian agents continuously monitor baseline metrics and Shewhart SPC bounds to defend banked gains from performance decay.',
    linkHref: '#governance-proof',
    actionLabel: 'Explore Model'
  },
  {
    number: '08',
    name: 'COMPOUNDING VALUE',
    tag: 'COMPOUNDING FACTOR',
    icon: TrendingUp,
    description: 'Continuously identify shifting constraints and reinvest realized operational savings into the next high-yield capability waterfall (target ≥1.3x/year).',
    linkHref: '#five-layer-architecture',
    actionLabel: 'Explore Model'
  }
]

// ==========================================
// 2. DATA: VALUE ENGINE 7-STAGE PROGRESSION SLIDER
// ==========================================
interface ValueEngineStage {
  step: string
  name: string
  headline: string
  summary: string
  agentRole: string
  keyDeliverable: string
  balanceSheetMetric: string
}

const valueEngineStages: ValueEngineStage[] = [
  {
    step: '01',
    name: 'Discover',
    headline: 'Empirical Operational Baseline & Opportunity Mapping',
    summary: 'Ingest enterprise transaction logs, SCADA streams, and ERP event history to map operational reality without human bias.',
    agentRole: 'Unsupervised process discovery agents & telemetry parsers mapping end-to-end execution paths.',
    keyDeliverable: 'Certified Process Inventory & Value-at-Stake Map',
    balanceSheetMetric: '100% baseline spend locked with Corporate Finance'
  },
  {
    step: '02',
    name: 'Analyze',
    headline: 'Function-Cost Decomposition & Bottleneck Isolation',
    summary: 'Decompose every workflow into discrete verb–noun functions and price them with activity-based should-cost rigor.',
    agentRole: 'Semantic FAST analysis LLMs and Theory of Constraints (TOC) throughput balance evaluators.',
    keyDeliverable: 'Enterprise Function-Cost Ledger (Baseline vs. Should-Cost)',
    balanceSheetMetric: 'Cost-per-function baseline indexed to general ledger'
  },
  {
    step: '03',
    name: 'Engineer',
    headline: 'Generative Alternatives, Should-Cost & Fleet Blueprint',
    summary: 'Systematically generate non-obvious engineering solutions to execute essential functions at radically reduced unit cost.',
    agentRole: 'Generative design agents, patent TRIZ contradiction solvers, and synthetic sandbox simulators.',
    keyDeliverable: 'Multi-Agent Fleet Architecture & Risk-Adjusted Decision Matrix',
    balanceSheetMetric: 'Risk-bounded DCF / NPV and <6-month payback verification'
  },
  {
    step: '04',
    name: 'Execute',
    headline: 'Industrialized Multi-Agent Methodology Deployment',
    summary: 'Deploy specialized digital worker fleets running Lean, Six Sigma, and TOC workflows 24/7 at 4–10x classical execution speed.',
    agentRole: 'Autonomous agent swarms executing continuous root-cause analysis, dispatch, and automated work orders.',
    keyDeliverable: 'Live Production Fleet Telemetry & Daily Tier Kata Dashboard',
    balanceSheetMetric: '30–60% cycle time compression & direct OPEX reduction'
  },
  {
    step: '05',
    name: 'Certify',
    headline: 'Finance Co-Signatures & Difference-in-Differences Attribution',
    summary: 'Subject every dollar of claimed yield to econometric validation and formal controller co-signatures per wave.',
    agentRole: 'Statistical difference-in-differences causal attribution engine isolating macro market noise.',
    keyDeliverable: 'Signed Finance Co-Signature Dossier & P&L Attribution Report',
    balanceSheetMetric: '100% verified accounting reconciliation'
  },
  {
    step: '06',
    name: 'Defend',
    headline: 'Autonomous Guardianship & 6-Month Permanence Audit',
    summary: 'Permanently defend realized gains against human regression through continuous automated Shewhart drift detection.',
    agentRole: '24/7 autonomous Value Guardian agents triggering automated circuit breakers upon variance drift.',
    keyDeliverable: '6-Month Permanence Audit Certificate (≥90% Value Retention)',
    balanceSheetMetric: 'Zero performance decay & audited permanent margin lift'
  },
  {
    step: '07',
    name: 'Compound',
    headline: 'Dynamic Constraint Re-mapping & Self-Funding Waterfall',
    summary: 'As operational bottlenecks elevate, automatically re-map the next binding constraint and self-fund continuous expansion.',
    agentRole: 'Cross-plant knowledge graph allocators and autonomous opportunity prioritization agents.',
    keyDeliverable: 'Board of Directors Value Scorecard & Annual Compounding Audit',
    balanceSheetMetric: '≥1.3x measured annual compounding factor'
  }
]

// ==========================================
// 3. DATA: SPIN MODEL
// ==========================================
interface SpinItem {
  letter: string
  name: string
  subtitle: string
  focus: string
  operationalReality: string
  economicConsequence: string
  engineeredOutcome: string
  badge: string
}

const spinData: SpinItem[] = [
  {
    letter: 'S',
    name: 'SITUATION',
    subtitle: 'Current Operating Environment',
    focus: 'Understand how work, data, and compute actually flow.',
    operationalReality: 'Enterprises operate complex, heterogeneous systems with sprawling ERPs, hybrid clouds, high-cost GPU infrastructure, and manual handoffs.',
    economicConsequence: 'Operational reality is obscured by static departmental reporting and unmonitored baseline variances.',
    engineeredOutcome: 'Automated telemetry ingestion and process mining construct an indisputable empirical operating baseline in days.',
    badge: 'STAGE 1: DIAGNOSTIC'
  },
  {
    letter: 'P',
    name: 'PROBLEM',
    subtitle: 'Constraints, Waste & Performance Gaps',
    focus: 'Identify the binding bottlenecks that cap performance.',
    operationalReality: '30–50% GPU underutilization, pervasive DOWNTIME waste, human analytical bottlenecks, and fragmented agent pilots trapped in silos.',
    economicConsequence: 'Over 70% of enterprise AI budgets produce no verifiable P&L yield while operational costs climb unchecked.',
    engineeredOutcome: 'Theory of Constraints (TOC) and verb–noun function analysis isolate the exact binding bottleneck capping overall cash flow.',
    badge: 'STAGE 2: ANALYSIS'
  },
  {
    letter: 'I',
    name: 'IMPLICATION',
    subtitle: 'Quantify Economic & Risk Consequences',
    focus: 'Model the true cost of inaction and operational variance.',
    operationalReality: 'Unchecked defect escapes, unplanned machine downtime, bloated working capital, and token cost runaway without attribution.',
    economicConsequence: 'Multi-million-dollar balance-sheet leaks: excessive scrap, customer churn, warranty claims, and wasted capital allocations.',
    engineeredOutcome: 'Activity-based costing binds every operational variance to direct general ledger line items with difference-in-differences rigor.',
    badge: 'STAGE 3: FINANCIAL TRUTH'
  },
  {
    letter: 'N',
    name: 'NEED / NEED-PAYOFF',
    subtitle: 'Required Improvement & Enterprise Yield',
    focus: 'Define the engineered execution plan and certified return.',
    operationalReality: 'The enterprise requires an industrialized operational system combining validated methodologies with autonomous digital workers.',
    economicConsequence: 'Guaranteed 3–10x ROI on engineered initiatives, 4–10x execution speed, and finance-certified P&L margin expansion.',
    engineeredOutcome: 'Autonomous agent fleets execute the 8-stage Job Plan 24/7, guarded by Finance and compounding annually at ≥1.3x.',
    badge: 'STAGE 4: PRODUCTION VALUE'
  }
]

// ==========================================
// 4. DATA: 8 STAGES OF THE AI-VE JOB PLAN
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
// 5. DATA: FUNCTION-COST LEDGER
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
// 6. DATA: 7 VALUE LEVERS
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
// 7. DATA: 5 VALUE CURRENCIES
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
// 8. DATA: FIVE-LAYER ENGINEERING MODEL
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
// 9. DATA: MATURITY ARC SLIDER (NOW -> NEXT -> SCALE -> FUTURE)
// ==========================================
interface MaturityStage {
  step: string
  title: string
  horizon: string
  duration: string
  summary: string
  deliverables: string[]
  financialImpact: string
}

const maturityStages: MaturityStage[] = [
  {
    step: '01',
    title: 'Assess & Function-Analyze',
    horizon: 'NOW',
    duration: '1–2 Weeks',
    summary: 'Construct the empirical Function-Cost Ledger of one primary value stream. Quantify addressable waste and achieve Finance co-signature on the baseline value-at-stake map.',
    deliverables: [
      'Empirical Function-Cost Ledger',
      'Value-at-stake baseline map',
      'Binding constraint identification',
      'CFO consensus business case'
    ],
    financialImpact: 'Baseline spend certified and locked with Finance'
  },
  {
    step: '02',
    title: 'Execute & Bank',
    horizon: 'NEXT',
    duration: '8–12 Weeks',
    summary: 'Deploy first AI-run methodologies against primary operational bottlenecks. Bank Finance-certified P&L value in weeks to create a self-funding transformation waterfall.',
    deliverables: [
      'First AI agent fleet deployed in production',
      'Closed-loop process telemetry streaming',
      'Initial wave P&L savings certified',
      'Operator daily Kata feedback loop'
    ],
    financialImpact: '3–10x ROI realized and banked in current fiscal quarter'
  },
  {
    step: '03',
    title: 'Industrialize Across Units',
    horizon: 'SCALE',
    duration: '16–32 Weeks',
    summary: 'Agent fleets operate 40+ methodologies 24/7 across multiple core value streams. Value Realization Office (VRO) institutionalizes continuous guardianship.',
    deliverables: [
      'Multi-value-stream fleet orchestration',
      'Autonomous Value Guardian agents active',
      '6-month permanence audit passed',
      'Cross-plant capability knowledge graph'
    ],
    financialImpact: 'Permanent 15–30% addressable OPEX reduction'
  },
  {
    step: '04',
    title: 'Self-Transforming Enterprise',
    horizon: 'FUTURE',
    duration: 'Perpetual State',
    summary: 'The AI Value Operating System autonomously discovers new constraints, funds subsequent evolutions, and executes enterprise improvement at compounding scale.',
    deliverables: [
      'Self-funding capital reinvestment engine',
      'Autonomous continuous constraint re-mapping',
      'Board of Directors Value Scorecard',
      'Measured compounding audit (≥1.3x/yr)'
    ],
    financialImpact: 'Compounding enterprise margin and equity multiple expansion'
  }
]

// ==========================================
// 10. DATA: 5 ENGAGEMENT MODELS
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

// ==========================================
// 11. DATA: 10 INDUSTRIAL VERTICALS COMPENDIUM
// ==========================================
interface IndustrialCompendiumItem {
  id: string
  name: string
  scope: string
  technologies: string[]
  useCase: string
  provenYield: string
}

const industrialCompendium: IndustrialCompendiumItem[] = [
  {
    id: 'auto',
    name: 'Automotive & Tier-1 Suppliers',
    scope: 'Press shop, robotic welding, paint finish, powertrain assembly & warranty tracking',
    technologies: ['High-speed VLM optical inspection', 'Acoustic resonance testing', 'Blockchain warranty passports'],
    useCase: 'Predictive weld spatter and seam defect classification on body-in-white (BIW) lines. Autonomous closed loop adjusts weld gun amperage and clamping pressure in <8ms.',
    provenYield: '68% defect reduction · $4.2M scrap savings · 100% weld traceability'
  },
  {
    id: 'heavy',
    name: 'Heavy Machinery & Industrial Equipment',
    scope: 'Castings defect tomography, hydraulic pressure loss diagnostics, CNC spindle vibration',
    technologies: ['IIoT multi-axis vibration sensors', 'Edge thermal imaging', 'Physics-informed digital twins'],
    useCase: 'Continuous spindle vibration FFT spectral decomposition on 5-axis gantry mills. AI agents detect sub-micron bearing races and schedule autonomous tool-offset recalibration.',
    provenYield: '84% unplanned downtime eliminated · 32% tool life extension'
  },
  {
    id: 'pharma',
    name: 'Pharmaceuticals & Life Sciences',
    scope: 'Cleanroom environmental monitoring, bioreactor batch yield, sterile vial fill-finish',
    technologies: ['21 CFR Part 11 compliant audit agents', 'Spectroscopic PAT sensors', 'Autonomous environmental loops'],
    useCase: 'Real-time multivariate bioreactor dissolved oxygen and pH trajectory control using multi-model agentic reasoning to avoid batch contamination and premature cell lysis.',
    provenYield: '99.4% batch right-first-time · 4.8x faster deviation closure'
  },
  {
    id: 'semi',
    name: 'Semiconductor & Electronics',
    scope: 'Wafer fab defect classification, wire-bonding shear testing, SMT pick-and-place accuracy',
    technologies: ['Sub-nanometer scanning electron microscopy AI', 'High-frequency acoustic sensors', 'Yield prediction DAGs'],
    useCase: 'Automated die defect spatial pattern recognition on 300mm silicon wafers. Triangulates particle excursion root causes to specific gas valves in photolithography tracks.',
    provenYield: '1.4% absolute yield lift · $14M annual gross margin expansion'
  },
  {
    id: 'aero',
    name: 'Aerospace & Defense',
    scope: 'AS9100 composite layup inspection, titanium milling chatter, turbine blade thermal barrier',
    technologies: ['Laser profilometry', 'Cryptographic CBOM lineage', 'Autonomous MRO inspection copilots'],
    useCase: 'Automated ultrasonic C-scan composite delamination detection on carbon-fiber wing spars. Validates structural margins against FAA / EASA airworthiness models.',
    provenYield: '92% reduction in non-conformance quarantine time · 100% digital thread'
  },
  {
    id: 'cpg',
    name: 'Consumer Packaged Goods (CPG)',
    scope: 'High-speed bottling, packaging seal thermography, SMED automated changeovers',
    technologies: ['High-speed Line-scan cameras', 'Edge vision inference', 'Automated SMED sequence assistants'],
    useCase: '1,200 bottles/minute closure torque and foil-seal hermeticity inspection. Detects micro-pinholes using thermal decay profiling, rejecting defective packs without line halts.',
    provenYield: '0.002% false-reject rate · 28-minute reduction in changeover times'
  },
  {
    id: 'mining',
    name: 'Mining, Metals & Materials',
    scope: 'Autonomous haulage dispatch, primary crusher throughput, flotation froth visual analytics',
    technologies: ['Millimeter-wave radar', 'Froth bubble segmentation VLM', 'Belt conveyor ultrasonic scans'],
    useCase: 'Primary gyratory crusher mantle wear and ore fragmentation monitoring. AI dynamically balances feeder rates based on rock hardness telemetry to maintain optimal cavity fill.',
    provenYield: '14% crusher throughput increase · $8.6M annualized recovery yield'
  },
  {
    id: 'energy',
    name: 'Energy, Utilities & Power',
    scope: 'Substation thermal runaway warning, wind turbine blade vibration, grid transmission loss',
    technologies: ['Long-wave infrared (LWIR) thermography', 'Acoustic edge sensors', 'Predictive heat-rate models'],
    useCase: 'Acoustic emission and vibration harmonics on combined-cycle gas turbine rotor blades. Forecasts micro-fissure propagation 400 operating hours prior to critical failure.',
    provenYield: '$6.5M avoided catastrophic turbine trip · 2.1% heat-rate efficiency gain'
  },
  {
    id: 'logistics',
    name: 'Logistics, Warehousing & Fleet',
    scope: 'Autonomous cross-dock routing, cold-chain temperature excursion alerts, pallet density',
    technologies: ['BLE beacon mesh', 'Pallet optical volumetric scanners', 'Multi-agent dispatch DAGs'],
    useCase: 'Autonomous cross-dock dispatch coordinating inbound reefers with cold-storage berths. Re-routes perishable shipments dynamically based on real-time transit telemetry.',
    provenYield: '41% dwell time compression · 0% spoilage on temperature-sensitive cargo'
  },
  {
    id: 'tooling',
    name: 'Precision Tooling & Fabrication',
    scope: 'Progressive stamping die wear tracking, EDM micro-crack detection, coolant lifecycle',
    technologies: ['Tonnage monitor strain gauges', 'Die acoustic sensors', 'Optical tool-wear microscopes'],
    useCase: 'Progressive die tonnage signature curve monitoring. Microsecond anomaly detection triggers press ram micro-reversals to prevent catastrophic tool smash and burr formation.',
    provenYield: '99.8% die smash prevention · 4.5x die service life before re-grind'
  }
]

// ==========================================
// 12. DATA: TECHNOLOGY ENABLERS MATRIX
// ==========================================
interface TechEnablerItem {
  tech: string
  role: string
  tier: string
  benefit: string
}

const technologyStackEnablers: TechEnablerItem[] = [
  {
    tech: 'RFID (Passive / Active / BLE)',
    role: 'Item-level identification, automated WIP tracking, gate-reader dispatch',
    tier: 'Tier 0–1 (Deterministic read & rule trigger)',
    benefit: 'Eliminates manual barcode scanning and enables continuous physical-to-digital inventory state synchronization.'
  },
  {
    tech: 'Industrial IoT (IIoT) Sensors',
    role: 'High-frequency condition monitoring (vibration, temp, pressure, current, acoustics)',
    tier: 'Tier 1–2 (SPC & classical ML anomaly detection)',
    benefit: 'Streams sub-second physical machine telemetry directly into agent feature stores without human polling.'
  },
  {
    tech: 'WiFi 6 / 6E Industrial Routers & Edge Gateways',
    role: 'Low-latency shop-floor connectivity, device orchestration, on-prem edge relay',
    tier: 'Infrastructure Layer (Enables all Tiers)',
    benefit: 'Guarantees sub-5ms deterministic wireless latency across dense metal-shielded industrial environments.'
  },
  {
    tech: 'Industrial Networking (OPC-UA / MQTT / TSN)',
    role: 'Time-Sensitive Networking, machine-to-machine and machine-to-agent telemetry buses',
    tier: 'Infrastructure Layer (Zero packet loss)',
    benefit: 'Standardizes multi-vendor PLC / SCADA / DCS protocols into open semantic event streams.'
  },
  {
    tech: 'Video Analytics & Vision-Language Models (VLM)',
    role: 'Visual defect detection, operator safety compliance, multi-camera spatial fusion',
    tier: 'Tier 2–3 (Vision models) & Tier 4 (VLM reasoning)',
    benefit: 'Replaces human visual fatigue with 100% automated optical inspection running at line speed.'
  },
  {
    tech: 'Blockchain & Distributed Ledger',
    role: 'Immutable audit trails, supplier provenance, digital product passports, smart contracts',
    tier: 'Tier 4 (Validator & critic) & Governance Layer',
    benefit: 'Provides tamper-proof legal and regulatory verification for mission-critical parts and warranty claims.'
  },
  {
    tech: 'Physics + Data Hybrid Digital Twins',
    role: 'What-if constraint simulation, predictive maintenance rehearsal, stress testing',
    tier: 'Tier 3–4 (Simulation before action)',
    benefit: 'Validates operational changes virtually in milliseconds before granting physical agent execution rights.'
  },
  {
    tech: 'Agentic AI (Multi-Agent Fleets)',
    role: 'Autonomous sensing, decision routing, tool execution, knowledge compounding',
    tier: 'Tier 2–5 (Multi-agent orchestration)',
    benefit: 'Performs continuous root-cause analysis, coordinates ERP/MES interventions, and permanently guards savings.'
  }
]

// ==========================================
// 13. DATA: 7-STEP OPERATING SYSTEM METHOD
// ==========================================
interface HandbookStep {
  step: string
  name: string
  discipline: string
  action: string
  deliverable: string
}

const handbookSteps: HandbookStep[] = [
  {
    step: '01',
    name: 'CHOOSE THE CONSTRAINT',
    discipline: 'Theory of Constraints + Critical Chain (TOC/CCPM)',
    action: 'Locate the single machine, process, or decision bottleneck that caps overall enterprise cash flow.',
    deliverable: 'Certified Constraint Map & Throughput Buffer Diagnostic'
  },
  {
    step: '02',
    name: 'QUANTIFY THE WASTE',
    discipline: 'Lean Science (DOWNTIME Waste Taxonomy)',
    action: 'Measure the eight forms of industrial waste (Defects, Overproduction, Waiting, Non-utilized talent, Transportation, Inventory, Motion, Extra-processing).',
    deliverable: 'Empirical DOWNTIME Waste Ledger & Dollarized Value Loss Map'
  },
  {
    step: '03',
    name: 'PROVE THE FIX',
    discipline: 'Six Sigma (SPC, MSA, Process Capability, DMAIC)',
    action: 'Eliminate anecdotal debates using statistical hypothesis testing, capability indices (Cp/Cpk), and difference-in-differences causal attribution.',
    deliverable: 'Statistical Proof Dossier & Measurement System Analysis (MSA)'
  },
  {
    step: '04',
    name: 'STABILISE THE FLOW',
    discipline: 'Toyota Production System (Standard Work, Jidoka, Pull, Andon, Poka-Yoke)',
    action: 'Level production with Heijunka, mistake-proof tool calls with digital Poka-Yoke, and autonomate line halts via AI Andon signals.',
    deliverable: 'Living Standard Work Model & Autonomous Jidoka Control Rules'
  },
  {
    step: '05',
    name: 'EARN EVERY FUNCTION',
    discipline: 'Classical Value Engineering (FAST, Cheapest Sufficient Method)',
    action: 'Price each discrete verb–noun function against its Should-Cost baseline. Eliminate any cost that does not contribute to essential function.',
    deliverable: 'Enterprise Function-Cost Ledger & Certified Should-Cost Basis'
  },
  {
    step: '06',
    name: 'EXECUTE WITH AI',
    discipline: 'Multi-Model & Agentic AI Cascade + Risk-Band Governance',
    action: 'Deploy specialized agent fleets running 24/7 across physical and financial systems, gated by deterministic human approval bands.',
    deliverable: 'Autonomous Agent Fleet Deployment & Risk Boundary Enforcement'
  },
  {
    step: '07',
    name: 'COMPOUND THE VALUE',
    discipline: 'Continuous Assessment, Re-mapping & Governance',
    action: 'Re-map constraints dynamically as bottlenecks shift. Reinvest verified operational savings into the next high-yield capability waterfall.',
    deliverable: 'Annual Compounding Factor Audit (≥1.3x) & Board Value Ledger'
  }
]

// ==========================================
// 14. DATA: TIER 0 TO TIER 6 ARCHITECTURE
// ==========================================
interface TierArchitectureItem {
  tier: string
  name: string
  latency: string
  technology: string
  operationalRole: string
  governance: string
}

const tierArchitecture: TierArchitectureItem[] = [
  {
    tier: 'Tier 0',
    name: 'Deterministic Sensor & Signal Ingestion',
    latency: '<1 millisecond',
    technology: 'OPC-UA, RFID Readers, BLE Beacons, TSN, MQTT Brokers',
    operationalRole: 'High-speed physical data acquisition from PLCs, machine encoders, smart tools, and environmental sensors without buffering loss.',
    governance: 'Hardware-verified checksums & cryptographic time-stamping.'
  },
  {
    tier: 'Tier 1',
    name: 'Real-Time Statistical Process Control (SPC)',
    latency: '1–10 milliseconds',
    technology: 'Streaming SPC Engines, Nelson Rules, Western Electric Limits',
    operationalRole: 'Automated out-of-control point detection, rule-based alarm dispatch, and microsecond machine interlock triggers.',
    governance: 'Deterministic mathematical bounds; zero generative hallucination risk.'
  },
  {
    tier: 'Tier 2',
    name: 'Classical Machine Learning & Anomaly Forecasting',
    latency: '50–200 milliseconds',
    technology: 'Isolation Forests, Spectral FFT Decomposition, RUL Regressors',
    operationalRole: 'Bearing vibration degradation forecasting, motor current signature analysis, and thermal drift trend projection.',
    governance: 'Trained and validated against ISO 10816 machinery vibration standards.'
  },
  {
    tier: 'Tier 3',
    name: 'Vision-Language Models & Physics Digital Twins',
    latency: '200ms – 1 second',
    technology: 'Fine-tuned Visual Inspection Models (VLM), Physics Solvers',
    operationalRole: 'Complex geometric defect recognition, optical character verification on parts, and dynamic fluid/thermal constraint simulation.',
    governance: 'Dual-model cross-validation with synthetic edge case calibration.'
  },
  {
    tier: 'Tier 4',
    name: 'Multi-Agent Orchestration & Problem-Solving DAGs',
    latency: '1–5 seconds',
    technology: 'Autonomous Agent Fleets, Tool Calling, Domain Reasoning Connectors',
    operationalRole: 'Decomposes operational anomalies into root-cause trees, queries ERP inventory and MES schedules, and proposes optimal corrective work orders.',
    governance: 'Cryptographic execution ledger; tool sandboxing & RBAC constraints.'
  },
  {
    tier: 'Tier 5',
    name: 'Human-in-the-Loop Risk-Band Execution',
    latency: 'Real-time to Scheduled',
    technology: 'Deterministic Policy Enforcement, Mobile Andon App, Operator UI',
    operationalRole: 'Routes proposed actions through three strict risk bands: Band 1 (Autonomous), Band 2 (Supervised with undo), Band 3 (Mandatory human co-signature).',
    governance: 'SOX 404 & OSHA compliant audit trails signed with biometric/SSO keys.'
  },
  {
    tier: 'Tier 6',
    name: 'Compounding Enterprise Intelligence',
    latency: 'Continuous / Periodic',
    technology: 'Cross-Plant Knowledge Graph, Capital Reinvestment Allocators',
    operationalRole: 'Aggregates lessons learned across multiple factories and global supply chains. Automatically tunes hyperparameters for subsequent waves.',
    governance: 'Audited annually by corporate controllers; Board of Directors reporting.'
  }
]
// ==========================================
// HERO SLIDER DATA
// ==========================================
interface HeroSlide {
  tag: string
  eyebrow: string
  headline: string
  headlineAccent: string
  subheadline: string
  description: string
  points: string[]
  primaryCTA: { label: string; href: string }
  secondaryCTA: { label: string; href: string }
  accentColor: string
  accentSolid: string
  bgGradient: string
  rightMetrics: { value: string; label: string; color: string }[]
}

const heroSlides: HeroSlide[] = [
  {
    tag: '01 / VALUE ENGINEERING',
    eyebrow: 'Enterprise Value Operating System',
    headline: 'Proven Methodologies.',
    headlineAccent: 'Industrialized\nby AI.',
    subheadline: 'Value That Compounds — Year After Year.',
    description: 'TrustGrid runs Lean, Six Sigma, TOC and TPM 4–10x faster through autonomous AI agent fleets — structured through the 70-year-old Value Engineering Job Plan, certified by Finance, and compounding at a measured factor annually.',
    points: ['Finance-certified value claims only', 'Autonomous 24/7 agent execution', '≥1.3x annual compounding factor'],
    primaryCTA: { label: 'Book Strategy Session', href: '#strategy-session-section' },
    secondaryCTA: { label: 'Explore AI-VE Models', href: '#models-section' },
    accentColor: 'from-blue-400 via-cyan-400 to-indigo-400',
    accentSolid: '#38bdf8',
    bgGradient: 'linear-gradient(135deg, #050d1a 0%, #0a1628 40%, #0d2149 100%)',
    rightMetrics: [
      { value: '3–10x', label: 'Engineered ROI', color: '#38bdf8' },
      { value: '4–10x', label: 'Execution Speed', color: '#818cf8' },
      { value: '100%', label: 'Finance-Certified', color: '#34d399' }
    ]
  },
  {
    tag: '02 / FUNCTION-COST',
    eyebrow: 'Function-Cost Intelligence',
    headline: 'Every Function.',
    headlineAccent: 'Every Dollar\nMapped.',
    subheadline: 'Finance-Certified. Permanently Defended.',
    description: 'Our Function-Cost Ledger decomposes every enterprise activity into discrete verb–noun functions — connecting each one to its empirical baseline cost versus Should-Cost target. 100% of value co-signed by Finance before banking.',
    points: ['Verb–noun function decomposition', 'Activity-based Should-Cost analysis', 'General ledger reconciliation per wave'],
    primaryCTA: { label: 'View Function-Cost Ledger', href: '#ledger-economics' },
    secondaryCTA: { label: 'See the Job Plan', href: '#job-plan-stages' },
    accentColor: 'from-cyan-400 via-teal-400 to-emerald-400',
    accentSolid: '#2dd4bf',
    bgGradient: 'linear-gradient(135deg, #011a14 0%, #042924 40%, #063d2e 100%)',
    rightMetrics: [
      { value: '100%', label: 'Finance Co-Signed', color: '#34d399' },
      { value: '8-Stage', label: 'Job Plan Rigor', color: '#2dd4bf' },
      { value: 'P&L', label: 'Balance Sheet Tied', color: '#a3e635' }
    ]
  },
  {
    tag: '03 / AGENT FLEETS',
    eyebrow: 'Autonomous AI Agent Fleets',
    headline: 'AI Agents.',
    headlineAccent: 'Not Pilots.\nProduction.',
    subheadline: 'Multi-Agent Fleets Operating 24/7 at Scale.',
    description: 'Specialized multi-agent fleets execute continuous Lean, Six Sigma, and Theory of Constraints workflows across your operations — gated by deterministic human approval risk bands, monitored by Value Guardian agents, with full corporate audit trails.',
    points: ['3-tier human approval risk bands', 'SOX-compliant audit ledger', 'Cross-plant knowledge graph'],
    primaryCTA: { label: 'Explore Agent Architecture', href: '#tier-architecture' },
    secondaryCTA: { label: 'See Methodology Engine', href: '#methodology-engine' },
    accentColor: 'from-violet-400 via-purple-400 to-indigo-400',
    accentSolid: '#a78bfa',
    bgGradient: 'linear-gradient(135deg, #08051a 0%, #100d2e 40%, #1a1048 100%)',
    rightMetrics: [
      { value: '4–10x', label: 'Faster Execution', color: '#a78bfa' },
      { value: '24/7', label: 'Continuous Operation', color: '#818cf8' },
      { value: 'Tier 1–3', label: 'Risk Band Control', color: '#c084fc' }
    ]
  },
  {
    tag: '04 / VALUE COMPOUNDING',
    eyebrow: 'Compounding Enterprise Advantage',
    headline: 'Value Realized.',
    headlineAccent: 'Value Defended.\nValue Compounded.',
    subheadline: '≥1.3x Annual Compounding Factor — Audited.',
    description: 'TrustGrid\'s Value Realization Office tracks, certifies, and guards every improvement wave. As bottlenecks elevate, autonomous agents re-map the next constraint and self-fund continuous expansion — building a permanent enterprise advantage.',
    points: ['6-month permanence audit certificate', 'Shewhart SPC drift detection', 'Board-level compounding scorecard'],
    primaryCTA: { label: 'Explore Value Realization', href: '#governance-proof' },
    secondaryCTA: { label: 'See Maturity Model', href: '#maturity-arc' },
    accentColor: 'from-amber-400 via-orange-400 to-yellow-400',
    accentSolid: '#fb923c',
    bgGradient: 'linear-gradient(135deg, #180b02 0%, #251205 40%, #3d1e08 100%)',
    rightMetrics: [
      { value: '≥1.3x', label: 'Annual Compounding', color: '#fb923c' },
      { value: '≥90%', label: 'Value Retention Rate', color: '#fbbf24' },
      { value: '∞', label: 'Self-Funding Cycle', color: '#f59e0b' }
    ]
  }
]

export default function AIValueEngineeringPage() {
  // Interactive UI States
  const [activeEngineStep, setActiveEngineStep] = useState<number>(0)
  const [selectedSpin, setSelectedSpin] = useState<string>('S')
  const [selectedStage, setSelectedStage] = useState<string>('function')
  const [activeLedgerIndustry, setActiveLedgerIndustry] = useState<string>('Mining & Heavy Operations')
  const [activeLever, setActiveLever] = useState<string>('cost')
  const [activeCompendiumIndustry, setActiveCompendiumIndustry] = useState<string>('auto')
  const [activeTier, setActiveTier] = useState<string>('Tier 0')
  const [activeMaturityIndex, setActiveMaturityIndex] = useState<number>(0)

  // Hero Slider State
  const [heroIndex, setHeroIndex] = useState<number>(0)
  const [heroAnimating, setHeroAnimating] = useState<boolean>(false)
  const [heroProgress, setHeroProgress] = useState<number>(0)
  const SLIDE_DURATION = 7000

  const goToHeroSlide = useCallback((index: number) => {
    if (heroAnimating) return
    setHeroAnimating(true)
    setHeroProgress(0)
    setTimeout(() => {
      setHeroIndex(index)
      setHeroAnimating(false)
    }, 400)
  }, [heroAnimating])

  const heroNext = useCallback(() => {
    goToHeroSlide((heroIndex + 1) % heroSlides.length)
  }, [heroIndex, goToHeroSlide])

  const heroPrev = useCallback(() => {
    goToHeroSlide((heroIndex - 1 + heroSlides.length) % heroSlides.length)
  }, [heroIndex, goToHeroSlide])

  // Auto-advance with progress tracking
  useEffect(() => {
    setHeroProgress(0)
    const startTime = Date.now()
    const rafId = { current: 0 }
    const animate = () => {
      const elapsed = Date.now() - startTime
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100)
      setHeroProgress(pct)
      if (pct < 100) {
        rafId.current = requestAnimationFrame(animate)
      } else {
        setHeroIndex((prev) => (prev + 1) % heroSlides.length)
        setHeroProgress(0)
      }
    }
    rafId.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId.current)
  }, [heroIndex])

  // Keyboard navigation for hero
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') heroPrev()
      if (e.key === 'ArrowRight') heroNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [heroPrev, heroNext])

  const currentHero = heroSlides[heroIndex]

  // Dedicated Strategy Session Form States (ISI Security clean corporate model)
  const [formFullName, setFormFullName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formMobile, setFormMobile] = useState('')
  const [formCompany, setFormCompany] = useState('')
  const [formJobTitle, setFormJobTitle] = useState('')
  const [formIndustry, setFormIndustry] = useState('Manufacturing & Industrial')
  const [formAreaOfInterest, setFormAreaOfInterest] = useState('AI Value Discovery & Constraint Analysis')
  const [formDiscussion, setFormDiscussion] = useState('')
  const [formSessionFormat, setFormSessionFormat] = useState('45-Minute Virtual Architectural Briefing')
  const [formDateTime, setFormDateTime] = useState('')

  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState('')

  // Derived current items
  const currentEngineData = valueEngineStages[activeEngineStep]
  const currentSpinData = spinData.find((s) => s.letter === selectedSpin) || spinData[0]
  const currentStageData = jobPlanStages.find((s) => s.id === selectedStage) || jobPlanStages[1]
  const filteredLedger = ledgerData.filter((item) => item.industry === activeLedgerIndustry)
  const currentLever = valueLevers.find((l) => l.id === activeLever) || valueLevers[3]
  const currentCompendium = industrialCompendium.find((item) => item.id === activeCompendiumIndustry) || industrialCompendium[0]
  const currentTier = tierArchitecture.find((t) => t.tier === activeTier) || tierArchitecture[0]
  const currentMaturity = maturityStages[activeMaturityIndex]

  // Strategy session submit handler
  const handleStrategySessionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (!formFullName.trim()) {
      setFormError('Please enter your full name.')
      return
    }
    if (!formEmail.trim() || !validateEmail(formEmail)) {
      setFormError('Please enter a valid work email address.')
      return
    }
    if (formMobile.trim() && !validatePhone(formMobile)) {
      setFormError('Please enter a valid phone number.')
      return
    }
    if (!formCompany.trim()) {
      setFormError('Please enter your organization name.')
      return
    }

    setFormSubmitting(true)
    try {
      const res = await submitTrustGridForm({
        formId: 'form_ai_value_strategy_session',
        formName: 'AI Value Engineering Strategy Session Booking',
        formType: 'STRATEGY_SESSION',
        name: formFullName.trim(),
        email: formEmail.trim(),
        phone: formMobile.trim() || undefined,
        company: formCompany.trim(),
        designation: formJobTitle.trim() || undefined,
        industry: formIndustry,
        objective: formAreaOfInterest,
        message: formDiscussion.trim() || undefined,
        engagementModel: formSessionFormat,
        preferredTimeline: formDateTime.trim() || undefined,
        ctaSource: 'ai_value_engineering_strategy_session_section'
      })

      if (res.success) {
        setFormSubmitted(true)
      } else {
        setFormError(res.message || 'Unable to schedule strategy session. Please try again or use direct calendar.')
      }
    } catch (err: any) {
      setFormError(err.message || 'An error occurred while booking. Please try again.')
    } finally {
      setFormSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      <SiteHeader />

      {/* ========================================================= */}
      {/* 1. HERO SLIDER — PREMIUM ISI SECURITY SPLIT LAYOUT */}
      {/* ========================================================= */}
      <section
        className="relative flex flex-col overflow-hidden"
        style={{ minHeight: '100vh', background: currentHero.bgGradient, transition: 'background 0.8s ease' }}
        aria-label="AI Value Engineering Hero"
      >
        {/* === LAYERED BACKGROUND === */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <HeroCanvas />
          {/* Fine grid overlay */}
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
          {/* Radial glow from slide accent color */}
          <div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none"
            style={{ background: currentHero.accentSolid, transition: 'background 0.8s ease' }}
          />
          {/* Bottom fade to next section */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
        </div>

        {/* === ANIMATED PROGRESS BAR at very top === */}
        <div className="absolute top-0 inset-x-0 z-30 h-[3px] bg-white/10">
          <div
            className="h-full transition-none"
            style={{
              width: `${heroProgress}%`,
              background: `linear-gradient(90deg, ${currentHero.accentSolid}, white)`,
              transition: heroProgress === 0 ? 'none' : undefined
            }}
          />
        </div>

        {/* === MAIN SLIDE CONTENT === */}
        <div className="relative z-10 flex-1 flex items-center pt-24 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-center">

              {/* LEFT — Content */}
              <div
                style={{
                  opacity: heroAnimating ? 0 : 1,
                  transform: heroAnimating ? 'translateX(-20px)' : 'translateX(0)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease'
                }}
              >
                {/* Slide tag */}
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="text-[10px] font-black tracking-[0.25em] uppercase px-3 py-1 rounded border"
                    style={{ color: currentHero.accentSolid, borderColor: `${currentHero.accentSolid}40`, background: `${currentHero.accentSolid}12` }}
                  >
                    {currentHero.tag}
                  </span>
                  <span className="text-white/40 text-xs font-medium tracking-wider">{currentHero.eyebrow}</span>
                </div>

                {/* Headline — ISI-style large split */}
                <h1 className="font-black text-white leading-[1.04] tracking-tight mb-5"
                  style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)' }}
                >
                  {currentHero.headline}<br />
                  <span
                    className={`bg-gradient-to-r ${currentHero.accentColor} bg-clip-text text-transparent`}
                    style={{ whiteSpace: 'pre-line' }}
                  >
                    {currentHero.headlineAccent}
                  </span>
                </h1>

                {/* Subheadline */}
                <p className="text-lg sm:text-xl font-semibold mb-4 tracking-wide" style={{ color: `${currentHero.accentSolid}cc` }}>
                  {currentHero.subheadline}
                </p>

                {/* Description */}
                <p className="text-white/55 text-base sm:text-[17px] leading-relaxed mb-8 max-w-xl">
                  {currentHero.description}
                </p>

                {/* Bullet points */}
                <ul className="space-y-2.5 mb-10">
                  {currentHero.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5">
                      <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: `${currentHero.accentSolid}25`, border: `1px solid ${currentHero.accentSolid}60` }}
                      >
                        <Check size={9} style={{ color: currentHero.accentSolid }} />
                      </span>
                      <span className="text-sm text-white/70 font-medium">{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={currentHero.primaryCTA.href}
                    onClick={() => trackCTA(currentHero.primaryCTA.label, 'hero_slider', currentHero.primaryCTA.href)}
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm text-slate-950 shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all"
                    style={{ background: `linear-gradient(135deg, ${currentHero.accentSolid}, white 200%)` }}
                  >
                    <Sparkles size={16} />
                    {currentHero.primaryCTA.label}
                  </a>
                  <a
                    href={currentHero.secondaryCTA.href}
                    onClick={() => trackCTA(currentHero.secondaryCTA.label, 'hero_slider', currentHero.secondaryCTA.href)}
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm text-white border hover:bg-white/10 backdrop-blur-sm transition-all"
                    style={{ borderColor: `${currentHero.accentSolid}50` }}
                  >
                    {currentHero.secondaryCTA.label}
                    <ArrowRight size={15} />
                  </a>
                </div>
              </div>

              {/* RIGHT — Floating Metric Cards */}
              <div
                className="hidden lg:flex flex-col gap-4"
                style={{
                  opacity: heroAnimating ? 0 : 1,
                  transform: heroAnimating ? 'translateX(20px)' : 'translateX(0)',
                  transition: 'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s'
                }}
              >
                {/* TrustGrid label card */}
                <div
                  className="rounded-2xl p-5 border backdrop-blur-md"
                  style={{ background: 'rgba(255,255,255,0.04)', borderColor: `${currentHero.accentSolid}30` }}
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: currentHero.accentSolid }} />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-white/40">TrustGrid AI-VE</span>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">
                    The only AI platform that industrializes proven operational methodologies with Finance-certified, compounding enterprise value.
                  </p>
                </div>

                {/* Metric cards from slide data */}
                {currentHero.rightMetrics.map((m, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-5 border backdrop-blur-md flex items-center gap-4"
                    style={{
                      background: 'rgba(255,255,255,0.035)',
                      borderColor: `${m.color}30`,
                      transitionDelay: `${i * 60}ms`
                    }}
                  >
                    <span className="text-3xl font-black tracking-tight flex-shrink-0" style={{ color: m.color }}>
                      {m.value}
                    </span>
                    <span className="text-sm font-semibold text-white/70">{m.label}</span>
                  </div>
                ))}

                {/* Decorative bottom tag */}
                <div className="rounded-xl p-3 flex items-center gap-2 border border-white/10 bg-white/[0.025]">
                  <Lock size={12} className="text-white/30" />
                  <span className="text-[10px] text-white/35 font-medium tracking-wide">Nothing claimed that Finance hasn't certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === BOTTOM NAVIGATION BAR (ISI-style) === */}
        <div className="relative z-10 border-t backdrop-blur-md" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.35)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-stretch min-h-[64px]">

              {/* Slide tabs — ISI signature style */}
              <div className="flex-1 flex items-center gap-0 overflow-x-auto scrollbar-none">
                {heroSlides.map((slide, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToHeroSlide(idx)}
                    className="relative flex-shrink-0 flex items-center gap-2.5 px-4 py-5 text-left transition-all group"
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    {/* Active indicator line at top */}
                    <span
                      className="absolute top-0 inset-x-0 h-[3px] transition-all duration-300"
                      style={{
                        background: idx === heroIndex ? currentHero.accentSolid : 'transparent',
                        opacity: idx === heroIndex ? 1 : 0
                      }}
                    />
                    <span
                      className="text-[10px] font-black tracking-widest transition-colors"
                      style={{ color: idx === heroIndex ? currentHero.accentSolid : 'rgba(255,255,255,0.25)' }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="text-xs font-semibold tracking-wide whitespace-nowrap transition-colors hidden sm:block"
                      style={{ color: idx === heroIndex ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)' }}
                    >
                      {slide.tag.split(' / ')[1]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="w-px bg-white/10 my-3" />

              {/* Prev / Next + Counter */}
              <div className="flex items-center gap-1 pl-4">
                <span className="text-xs font-mono text-white/30 mr-3 hidden sm:block">
                  {String(heroIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(heroSlides.length).padStart(2, '0')}
                </span>
                <button
                  onClick={heroPrev}
                  aria-label="Previous slide"
                  className="w-9 h-9 rounded-full border border-white/15 bg-white/8 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-all"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={heroNext}
                  aria-label="Next slide"
                  className="w-9 h-9 rounded-full border border-white/15 bg-white/8 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-all"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. STATS BAR */}
      {/* ========================================================= */}
      <section className="bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[
              { value: '3–10x', label: 'ROI on Initiatives', sub: 'P&L-engineered return', color: '#38bdf8', border: 'border-r border-slate-800/60' },
              { value: '4–10x', label: 'Execution Speed', sub: 'Accelerated methodology cycle', color: '#818cf8', border: 'border-r border-slate-800/60' },
              { value: '100%', label: 'Finance-Certified', sub: 'Co-signed value claims', color: '#34d399', border: 'border-r border-slate-800/60' },
              { value: '≥1.3x', label: 'Compounding Factor', sub: 'Measured annual advantage', color: '#fb923c', border: '' },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`p-6 sm:p-10 flex flex-col justify-center hover:bg-slate-900/40 transition-colors ${stat.border} border-b sm:border-b-0 border-slate-800/60`}
              >
                <span className="text-3xl sm:text-[2.6rem] font-black tracking-tight mb-1" style={{ color: stat.color }}>{stat.value}</span>
                <span className="text-xs font-black text-white uppercase tracking-[0.12em] mb-0.5">{stat.label}</span>
                <span className="text-[11px] text-slate-500">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 3. AI VALUE ENGINEERING MODELS (4 x 2 GRID) */}
      {/* ========================================================= */}
      <section id="models-section" className="scroll-mt-28 py-16 sm:py-24 bg-slate-900/90 text-white border-b border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-slate-800/80 px-3 py-1 rounded-md border border-cyan-500/40 inline-flex items-center gap-1.5 mb-3">
              <Boxes size={12} className="text-cyan-400" />
              Core Architecture Portfolio
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              AI VALUE ENGINEERING MODELS
            </h2>
            <p className="text-base sm:text-lg text-slate-300 mt-3 leading-relaxed">
              A structured portfolio of proven methodologies, AI execution capabilities and value-realization models designed to create measurable enterprise improvement.
            </p>
          </div>

          {/* 4 x 2 Responsive Model Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {aiValueModelsData.map((model) => {
              const Icon = model.icon
              return (
                <div
                  key={model.number}
                  className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-950 transition-all flex flex-col justify-between group shadow-sm hover:shadow-[0_10px_30px_rgba(30,58,138,0.25)]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-black font-mono text-cyan-400 group-hover:text-blue-400 transition-colors">
                        {model.number}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {model.tag}
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/30 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      <Icon size={18} />
                    </div>

                    <h3 className="text-base font-extrabold text-white tracking-tight mb-2.5 group-hover:text-cyan-300 transition-colors">
                      {model.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                      {model.description}
                    </p>
                  </div>

                  <a
                    href={model.linkHref}
                    className="pt-4 border-t border-slate-800/80 inline-flex items-center justify-between text-xs font-semibold text-blue-400 hover:text-cyan-300 transition-colors group-hover:translate-x-0.5"
                  >
                    <span>{model.actionLabel}</span>
                    <ArrowRight size={14} className="ml-1" />
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. PROBLEM / OPPORTUNITY (DEFINITION & CHALLENGE) */}
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

          {/* Canonical Definition */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                FORMAL CANONICAL DEFINITION
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Standard Standard v4.2
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
      {/* 5. THE VALUE ENGINE (7-STAGE SLIDER) */}
      {/* ========================================================= */}
      <section id="value-engine" className="scroll-mt-28 py-16 sm:py-24 bg-slate-950 text-white border-b border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-slate-900 px-3 py-1 rounded-md border border-cyan-500/40 inline-flex items-center gap-1.5 mb-3">
                <Workflow size={12} className="text-cyan-400" />
                Continuous Compounding Journey
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                THE VALUE ENGINE
              </h2>
              <p className="text-base sm:text-lg text-slate-300 mt-2">
                Discover → Analyze → Engineer → Execute → Certify → Defend → Compound
              </p>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setActiveEngineStep((prev) => (prev - 1 + valueEngineStages.length) % valueEngineStages.length)}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 text-white flex items-center justify-center transition-all"
                aria-label="Previous Value Engine Stage"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-xs font-mono font-bold text-cyan-400 px-2">
                {activeEngineStep + 1} / {valueEngineStages.length}
              </span>
              <button
                onClick={() => setActiveEngineStep((prev) => (prev + 1) % valueEngineStages.length)}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 text-white flex items-center justify-center transition-all"
                aria-label="Next Value Engine Stage"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
            {valueEngineStages.map((stg, i) => (
              <button
                key={stg.step}
                onClick={() => setActiveEngineStep(i)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  activeEngineStep === i
                    ? 'bg-blue-600/30 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span className="text-xs font-mono font-bold block mb-1 text-cyan-400">{stg.step}</span>
                <span className="text-xs font-extrabold tracking-tight block truncate">{stg.name}</span>
              </button>
            ))}
          </div>

          {/* Active Engine Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            <BorderBeam size={180} duration={9} colorFrom="#38bdf8" colorTo="#3b82f6" />
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
              <div className="max-w-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black font-mono text-cyan-400">
                    STAGE {currentEngineData.step}
                  </span>
                  <span className="text-slate-600">|</span>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    {currentEngineData.name} Phase
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {currentEngineData.headline}
                </h3>
                <p className="text-base text-slate-300 leading-relaxed">
                  {currentEngineData.summary}
                </p>

                <div className="pt-4 border-t border-slate-800">
                  <span className="text-xs font-bold uppercase text-cyan-400 block mb-1.5 font-mono">
                    Autonomous AI Agent Fleet Role
                  </span>
                  <p className="text-sm font-medium text-slate-200 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                    {currentEngineData.agentRole}
                  </p>
                </div>
              </div>

              {/* Deliverable & Metric Impact */}
              <div className="lg:w-80 shrink-0 p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                    Signature Deliverable
                  </span>
                  <p className="text-sm font-semibold text-white">
                    {currentEngineData.keyDeliverable}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                    Balance Sheet &amp; Finance Impact
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono">
                    {currentEngineData.balanceSheetMetric}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. AI VALUE ENGINEERING MODEL (THE VALUE TRINITY) */}
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
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. SPIN MODEL (4 CONNECTED MODEL CARDS) */}
      {/* ========================================================= */}
      <section id="spin-model" className="scroll-mt-28 py-16 sm:py-24 bg-slate-900 text-white border-b border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-slate-800 px-3 py-1 rounded-md border border-cyan-500/40 inline-flex items-center gap-1.5 mb-3">
              <SlidersHorizontal size={12} className="text-cyan-400" />
              Diagnostic Inquiry Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              THE SPIN VALUE ENGINEERING MODEL
            </h2>
            <p className="text-base sm:text-lg text-slate-300 mt-3 leading-relaxed">
              Four connected model cards structuring the journey from current operational state to finance-certified enterprise yield.
            </p>
          </div>

          {/* 4 Connected Model Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {spinData.map((item) => {
              const isSelected = selectedSpin === item.letter
              return (
                <div
                  key={item.letter}
                  onClick={() => setSelectedSpin(item.letter)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-950 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.25)]'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl font-black font-mono text-cyan-400">
                        {item.letter}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-white mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-cyan-300 font-semibold mb-3">
                      {item.subtitle}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {item.focus}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-300">
                    <strong className="text-slate-400 block font-mono text-[10px] uppercase">Engineered Focus:</strong>
                    <span className="line-clamp-2">{item.engineeredOutcome}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Selected SPIN Detail Deep-Dive */}
          <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl font-bold font-mono text-cyan-400">
                PHASE {currentSpinData.letter}
              </span>
              <span className="text-slate-600">|</span>
              <h4 className="text-xl font-extrabold text-white">
                {currentSpinData.name} — {currentSpinData.subtitle}
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-800/80 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Operational Reality Observed
                </span>
                <p className="text-slate-300 leading-relaxed">{currentSpinData.operationalReality}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block mb-1">
                  Economic &amp; Cost Consequence
                </span>
                <p className="text-slate-300 leading-relaxed">{currentSpinData.economicConsequence}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  Engineered Payoff &amp; Value Delivery
                </span>
                <p className="text-slate-300 leading-relaxed">{currentSpinData.engineeredOutcome}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. THE AI-VE JOB PLAN (8 STAGES) */}
      {/* ========================================================= */}
      <section id="job-plan-stages" className="scroll-mt-28 py-16 sm:py-24 bg-slate-950 text-white border-b border-slate-800 relative">
        <span id="job-plan" className="scroll-mt-28 -top-28 absolute block" />
        <span id="part4-job-plan" className="scroll-mt-28 -top-28 absolute block" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-slate-900 px-2.5 py-1 rounded-md border border-cyan-500/40 inline-flex items-center gap-1.5 mb-3">
              <Workflow size={12} className="text-cyan-400" />
              04 / Signature Process
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
      {/* 9. FUNCTION-COST LEDGER */}
      {/* ========================================================= */}
      <section id="ledger-economics" className="scroll-mt-28 py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200 relative">
        <span id="function-cost-ledger" className="scroll-mt-28 -top-28 absolute block" />
        <span id="part4-function-cost-ledger" className="scroll-mt-28 -top-28 absolute block" />
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
              href="#strategy-session-section"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shrink-0"
            >
              Request Value Stream Diagnostic
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. SEVEN VALUE LEVERS */}
      {/* ========================================================= */}
      <section id="methodology-engine" className="scroll-mt-28 py-16 sm:py-24 bg-slate-50 text-slate-900 border-b border-slate-200 relative">
        <span id="part2-methodology-engine" className="scroll-mt-28 -top-28 absolute block" />
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
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-6">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block mb-1">
                  {currentLever.tag}
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  {currentLever.name}
                </h3>
                <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
                  {currentLever.description}
                </p>
              </div>
              <div className="px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200/80 shrink-0">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                  Value Signature
                </span>
                <span className="text-sm font-extrabold text-emerald-700 font-mono">
                  {currentLever.valueSignature}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Proven Methodologies (The Trust Layer)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentLever.methodologies.map((m) => (
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
                  {currentLever.aiExecution}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 11. INDUSTRIAL VERTICALS & TECHNOLOGY STACK */}
      {/* ========================================================= */}
      <section id="industrial-use-cases" className="scroll-mt-28 py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200 relative">
        <span id="part1-use-cases" className="scroll-mt-28 -top-28 absolute block" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-md border border-blue-200/60 inline-flex items-center gap-1.5 mb-3">
              <Building2 size={12} className="text-blue-600" />
              Industrial Use Case Compendium
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              10 Industrial Verticals Compendium
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
              Industrialized operational excellence across manufacturing, life sciences, process, and aerospace supply chains.
            </p>
          </div>

          {/* Industry Vertical Selector Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {industrialCompendium.map((ind) => (
              <button
                key={ind.id}
                onClick={() => setActiveCompendiumIndustry(ind.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCompendiumIndustry === ind.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{ind.name}</span>
              </button>
            ))}
          </div>

          {/* Active Industry Deep-Dive Card */}
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm mb-16">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block mb-1">
                  INDUSTRY VERTICAL · {currentCompendium.name}
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  {currentCompendium.name}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  <strong>Operational Scope:</strong> {currentCompendium.scope}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs shrink-0 font-mono font-bold">
                <span className="text-[10px] text-emerald-600 uppercase block font-sans">Proven Operational Impact</span>
                <span>{currentCompendium.provenYield}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Autonomous Industrial Use Case
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
                  {currentCompendium.useCase}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Activated Technology Enablers
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentCompendium.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-100 flex items-center gap-1.5"
                    >
                      <Cpu size={12} className="text-blue-600" />
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Technology Enablers Matrix */}
          <div id="technology-enablers" className="scroll-mt-28 mb-16 relative">
            <span id="part1-tech-stack" className="scroll-mt-28 -top-28 absolute block" />
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block mb-2">
                PHYSICAL TO DIGITAL ENABLERS
              </span>
              <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900">
                Technology Enablers Activated Across All Use Cases
              </h3>
              <p className="text-sm text-slate-600 mt-2">
                Mapped to the Tier Architecture (Tier 0–6) and DOWNTIME waste elimination taxonomy.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-900 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-4 px-6" style={{ width: '22%' }}>Technology</th>
                    <th className="py-4 px-6" style={{ width: '32%' }}>Primary Operational Function</th>
                    <th className="py-4 px-6" style={{ width: '20%' }}>Typical Tier Placement</th>
                    <th className="py-4 px-6" style={{ width: '26%' }}>Enterprise Value Benefit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {technologyStackEnablers.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-2">
                        <Cpu size={14} className="text-blue-600 shrink-0" />
                        <span>{item.tech}</span>
                      </td>
                      <td className="py-4 px-6 text-slate-700">{item.role}</td>
                      <td className="py-4 px-6 font-mono font-semibold text-blue-700 text-xs">{item.tier}</td>
                      <td className="py-4 px-6 text-slate-600 text-xs">{item.benefit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Edge Gateways & Determinism */}
          <div id="edge-orchestration" className="scroll-mt-28 p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
            <span id="part1-edge-orchestration" className="scroll-mt-28 -top-28 absolute block" />
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-2">
                SHOP-FLOOR LOW-LATENCY DETERMINISM
              </span>
              <h4 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                Edge Gateways &amp; Autonomous Industrial Fleets
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                TrustGrid edge nodes operate on-premise within factory air-gaps, executing sub-5ms sensor-to-action control loops via TSN, OPC-UA, and ROS 2 without dependence on public cloud availability.
              </p>
            </div>
            <a
              href="#strategy-session-section"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shrink-0 shadow-md"
            >
              <span>Request Edge Diagnostic</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 12. THE ONE-PAGE OPERATING SYSTEM & TIER 0-6 STACK */}
      {/* (BV RAMAN SECTION COMPLETELY REMOVED - REPLACED WITH STANDARD) */}
      {/* ========================================================= */}
      <section id="operating-system" className="scroll-mt-28 py-16 sm:py-24 bg-slate-900 text-white border-b border-slate-800 relative">
        <span id="part3-operating-system" className="scroll-mt-28 -top-28 absolute block" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-slate-800 px-3 py-1 rounded-md border border-cyan-500/40 inline-flex items-center gap-1.5 mb-3">
                <SlidersHorizontal size={12} className="text-cyan-400" />
                The Lean AI Value Engineering Operating Standard
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                The One-Page Operating System: The 7-Step Method
              </h2>
              <p className="text-base sm:text-lg text-slate-300 mt-3 leading-relaxed">
                Agentic AI, Multi-Model Intelligence, Lean Six Sigma, Theory of Constraints and the Toyota Production System for Industrial Operations.
              </p>
            </div>
            {/* Standard Practice Benchmark Badge (No personal names) */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1 shrink-0 lg:max-w-xs">
              <div className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">
                TRUSTGRID PRACTICE STANDARD
              </div>
              <p className="font-semibold text-white">Industrial Engineering Standard</p>
              <p className="text-slate-400 text-[11px]">Autonomous Operations &amp; Value Realization Standard</p>
            </div>
          </div>

          {/* 7-Step Method Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3 mb-16">
            {handbookSteps.map((step) => (
              <div
                key={step.step}
                className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-xl font-black font-mono text-cyan-400 block mb-1">
                    {step.step}
                  </span>
                  <h3 className="text-xs font-extrabold text-white uppercase tracking-tight mb-2">
                    {step.name}
                  </h3>
                  <p className="text-[11px] text-cyan-300 font-semibold mb-2">
                    {step.discipline}
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                    {step.action}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                  <strong className="text-slate-300 block">Deliverable:</strong>
                  <span>{step.deliverable}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Tier 0 to Tier 6 Architecture Section */}
          <div id="tier-architecture" className="scroll-mt-28 mb-16 relative">
            <span id="part3-tier-architecture" className="scroll-mt-28 -top-28 absolute block" />
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-2">
                MULTI-TIER INTELLIGENCE STACK
              </span>
              <h3 className="text-xl sm:text-3xl font-extrabold text-white">
                Tier 0 to Tier 6 Operational Intelligence Architecture
              </h3>
              <p className="text-sm text-slate-300 mt-2">
                From microsecond deterministic sensor reads on the factory floor to autonomous multi-agent reasoning and Board-level value realization.
              </p>
            </div>

            {/* Interactive Tier Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
              {tierArchitecture.map((t) => (
                <button
                  key={t.tier}
                  onClick={() => setActiveTier(t.tier)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeTier === t.tier
                      ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-mono font-bold text-cyan-400 block mb-0.5">{t.tier}</span>
                  <span className="text-xs font-extrabold truncate block">{t.name}</span>
                </button>
              ))}
            </div>

            {/* Selected Tier Details Panel */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                    {currentTier.tier} · Deep Dive
                  </span>
                  <h4 className="text-xl sm:text-2xl font-extrabold text-white">
                    {currentTier.name}
                  </h4>
                  <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                    {currentTier.operationalRole}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs shrink-0">
                  <span className="text-slate-400 uppercase tracking-wider block text-[10px] font-bold">Execution Latency</span>
                  <span className="text-cyan-400 font-mono font-extrabold text-sm block">{currentTier.latency}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-800/80 text-xs">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-1">
                    Activated Technology &amp; Protocols
                  </span>
                  <p className="text-slate-200 font-mono">{currentTier.technology}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block mb-1">
                    Governance &amp; Deterministic Boundary
                  </span>
                  <p className="text-slate-200">{currentTier.governance}</p>
                </div>
              </div>
            </div>
          </div>

          {/* DOWNTIME Waste Taxonomy & Risk Bands */}
          <div id="waste-governance" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-slate-800 relative">
            <span id="part3-waste-governance" className="scroll-mt-28 -top-28 absolute block" />
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-2">
                LEAN TAXONOMY
              </span>
              <h4 className="text-lg font-bold text-white mb-2">
                DOWNTIME Waste Elimination Engine
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                TrustGrid automates the identification and measurement of all eight classical Lean wastes across human and machine workflows:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800"><span className="text-cyan-400 font-bold block">D</span>Defects</div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800"><span className="text-cyan-400 font-bold block">O</span>Overproduction</div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800"><span className="text-cyan-400 font-bold block">W</span>Waiting</div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800"><span className="text-cyan-400 font-bold block">N</span>Non-utilized</div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800"><span className="text-cyan-400 font-bold block">T</span>Transport</div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800"><span className="text-cyan-400 font-bold block">I</span>Inventory</div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800"><span className="text-cyan-400 font-bold block">M</span>Motion</div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800"><span className="text-cyan-400 font-bold block">E</span>Extra-processing</div>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest block mb-2">
                GOVERNANCE SAFETY GATES
              </span>
              <h4 className="text-lg font-bold text-white mb-2">
                Three-Band Human Risk-Gated Execution
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                No autonomous action exceeds its verified operating envelope without explicit deterministic approval gates:
              </p>
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-emerald-500/30 flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-400 font-mono font-bold text-[10px]">BAND 1</span>
                  <div>
                    <strong className="text-white block font-semibold">Autonomous Read &amp; Recommend</strong>
                    <span className="text-slate-400">Low-risk telemetry gathering, anomaly flagging, and parameter suggestions.</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-amber-500/30 flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded-md bg-amber-950 text-amber-400 font-mono font-bold text-[10px]">BAND 2</span>
                  <div>
                    <strong className="text-white block font-semibold">Supervised Execution with Undo Window</strong>
                    <span className="text-slate-400">Automated machine offsets, inventory routing with a 5-minute operator rollback latch.</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-rose-500/30 flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded-md bg-rose-950 text-rose-400 font-mono font-bold text-[10px]">BAND 3</span>
                  <div>
                    <strong className="text-white block font-semibold">Mandatory Dual-Human Sign-Off</strong>
                    <span className="text-slate-400">High-consequence actions: line halts, safety resets, general ledger writes.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 13. FIVE VALUE CURRENCIES */}
      {/* ========================================================= */}
      <section id="value-currencies" className="scroll-mt-28 py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200 relative">
        <span id="part2-value-currencies" className="scroll-mt-28 -top-28 absolute block" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-flex items-center gap-1.5 mb-3">
              <Coins size={12} className="text-blue-600" />
              06 / Balance Sheet Proof
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Five Enterprise Value Currencies
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
      {/* 14. FIVE-LAYER ENGINEERING MODEL */}
      {/* ========================================================= */}
      <section id="five-layer-architecture" className="scroll-mt-28 py-16 sm:py-24 bg-slate-950 text-white border-b border-slate-800 relative">
        <span id="five-layer-model" className="scroll-mt-28 -top-28 absolute block" />
        <span id="part2-five-layer-architecture" className="scroll-mt-28 -top-28 absolute block" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-slate-900 px-2.5 py-1 rounded-md border border-cyan-500/40 inline-flex items-center gap-1.5 mb-3">
              <Layers3 size={12} className="text-cyan-400" />
              07 / System Architecture
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
      {/* 15. MATURITY MODEL (NOW -> NEXT -> SCALE -> FUTURE SLIDER) */}
      {/* ========================================================= */}
      <section id="maturity-arc" className="scroll-mt-28 py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-flex items-center gap-1.5 mb-3">
                <Activity size={12} className="text-blue-600" />
                08 / Transformation Journey
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Enterprise AI-VE Maturity Arc
              </h2>
              <p className="text-base sm:text-lg text-slate-600 mt-2">
                NOW → NEXT → SCALE → FUTURE: A disciplined four-horizon progression.
              </p>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setActiveMaturityIndex((prev) => (prev - 1 + maturityStages.length) % maturityStages.length)}
                className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 hover:border-blue-500 text-slate-800 flex items-center justify-center transition-all"
                aria-label="Previous Maturity Horizon"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-xs font-mono font-bold text-blue-600 px-2">
                {activeMaturityIndex + 1} / {maturityStages.length}
              </span>
              <button
                onClick={() => setActiveMaturityIndex((prev) => (prev + 1) % maturityStages.length)}
                className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 hover:border-blue-500 text-slate-800 flex items-center justify-center transition-all"
                aria-label="Next Maturity Horizon"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {maturityStages.map((m, i) => (
              <button
                key={m.step}
                onClick={() => setActiveMaturityIndex(i)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  activeMaturityIndex === i
                    ? 'bg-blue-600 text-white shadow-md border-blue-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-mono font-bold ${activeMaturityIndex === i ? 'text-blue-200' : 'text-blue-600'}`}>
                    HORIZON {m.step}
                  </span>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${activeMaturityIndex === i ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {m.horizon}
                  </span>
                </div>
                <span className="text-sm font-extrabold block truncate">{m.title}</span>
              </button>
            ))}
          </div>

          {/* Active Maturity Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
              <div className="max-w-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold font-mono text-blue-600">
                    HORIZON {currentMaturity.step} · {currentMaturity.horizon}
                  </span>
                  <span className="text-slate-400">|</span>
                  <span className="text-xs font-semibold text-slate-500">
                    Typical Duration: {currentMaturity.duration}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {currentMaturity.title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  {currentMaturity.summary}
                </p>

                <div className="pt-4 border-t border-slate-200">
                  <span className="text-xs font-bold uppercase text-slate-700 block mb-2">
                    Key Engineered Deliverables
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentMaturity.deliverables.map((deliv, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
                        <Check size={14} className="text-emerald-600 shrink-0" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Financial Impact Box */}
              <div className="lg:w-80 shrink-0 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block font-mono">
                  Finance Hurdle &amp; P&amp;L Yield
                </span>
                <p className="text-sm font-semibold text-slate-900 leading-snug">
                  {currentMaturity.financialImpact}
                </p>
                <div className="pt-4 border-t border-slate-100">
                  <a
                    href="#strategy-session-section"
                    className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    <span>Assess Your Horizon</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 16. GOVERNANCE & PROOF DISCIPLINE */}
      {/* ========================================================= */}
      <section id="governance-proof" className="scroll-mt-28 py-16 sm:py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
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
      {/* 16.5. DEDICATED INDUSTRIES VALUE ENGINEERING SECTION */}
      {/* ========================================================= */}
      <section id="industries" className="scroll-mt-28 py-16 sm:py-24 bg-slate-50 text-slate-900 border-b border-slate-200 relative">
        <span id="value-engineering-industries" className="scroll-mt-28 -top-28 absolute block" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-flex items-center gap-1.5 mb-3">
              <Building2 size={12} className="text-blue-600" />
              Vertical Domain Mastery
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              AI Value Engineering Across Regulated Industries
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
              Industrial operational excellence, Theory of Constraints bottleneck removal, and unit-economic attribution calibrated to mission-critical global sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. MANUFACTURING & MES */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Boxes size={20} />
                  </div>
                  <span className="text-[10.5px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                    ISA-95 · OEE · TPM
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-2">Manufacturing &amp; MES</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Autonomous vision inspection, real-time OEE machine scoring, and predictive maintenance to compress cycle times and eliminate scrap.
                </p>
                <div className="space-y-1.5 border-t border-slate-100 pt-3 mb-4 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    <span>+18–28% OEE Throughput Lift</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    <span>40% Unplanned Downtime Drop</span>
                  </div>
                </div>
              </div>
              <Link
                href="/talk-to-ai-architect?topic=ai-value-engineering#session-booking-section"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline pt-2 border-t border-slate-100"
              >
                <span>Explore MES Blueprint</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* 2. HEALTHCARE & LIFE SCIENCES */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="text-[10.5px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                    FDA 21 CFR · HIPAA
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-2">Healthcare &amp; Life Sciences</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Deterministic regulatory documentation agents, clinical trial pipeline acceleration, and GxP-compliant audit logging.
                </p>
                <div className="space-y-1.5 border-t border-slate-100 pt-3 mb-4 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    <span>3.5x Faster Protocol Drafting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    <span>100% Audit-Ready Provenance</span>
                  </div>
                </div>
              </div>
              <Link
                href="/talk-to-ai-architect?topic=ai-value-engineering#session-booking-section"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline pt-2 border-t border-slate-100"
              >
                <span>Explore BioTech Scope</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* 3. BFSI & CAPITAL MARKETS */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <BarChart3 size={20} />
                  </div>
                  <span className="text-[10.5px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200/60">
                    SEC · FINRA · SOX 404
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-2">BFSI &amp; Capital Markets</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Agentic AML investigation, automated SOX 404 ledger reconciliations, and real-time portfolio risk sensitivity analysis.
                </p>
                <div className="space-y-1.5 border-t border-slate-100 pt-3 mb-4 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    <span>65% AML False-Positive Reduction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    <span>Zero Reconciliation Drift</span>
                  </div>
                </div>
              </div>
              <Link
                href="/talk-to-ai-architect?topic=ai-value-engineering#session-booking-section"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline pt-2 border-t border-slate-100"
              >
                <span>Explore BFSI Models</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* 4. SEMICONDUCTOR & FOUNDRY */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                    <Cpu size={20} />
                  </div>
                  <span className="text-[10.5px] font-mono font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/60">
                    SECS/GEM · Yield ML
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-2">Semiconductor &amp; Fab</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Lithography parameter tuning, wafer defect classification, and fab cycle-time Theory of Constraints scheduling.
                </p>
                <div className="space-y-1.5 border-t border-slate-100 pt-3 mb-4 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    <span>+3.2% Wafer Yield Recovery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    <span>14% Fab Cycle Time Compression</span>
                  </div>
                </div>
              </div>
              <Link
                href="/talk-to-ai-architect?topic=ai-value-engineering#session-booking-section"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline pt-2 border-t border-slate-100"
              >
                <span>Explore Fab Engineering</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* 5. SUPPLY CHAIN & LOGISTICS */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Workflow size={20} />
                  </div>
                  <span className="text-[10.5px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                    TOC Buffers · Routing
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-2">Supply Chain &amp; Logistics</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Multi-echelon inventory buffer management, dynamic dispatching agents, and warehouse throughput optimization.
                </p>
                <div className="space-y-1.5 border-t border-slate-100 pt-3 mb-4 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    <span>22–35% Working Capital Release</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    <span>99.2% On-Time Fulfillment SLA</span>
                  </div>
                </div>
              </div>
              <Link
                href="/talk-to-ai-architect?topic=ai-value-engineering#session-booking-section"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline pt-2 border-t border-slate-100"
              >
                <span>Explore Logistics Stack</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* 6. ENERGY, UTILITIES & POWER */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Zap size={20} />
                  </div>
                  <span className="text-[10.5px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                    BESS · Grid AI · PPA
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-2">Energy &amp; Utilities</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Microgrid load forecasting, BESS battery degradation mitigation, and renewable curtailment minimization.
                </p>
                <div className="space-y-1.5 border-t border-slate-100 pt-3 mb-4 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    <span>15–24% Peak Tariff Reduction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    <span>Maximized Clean Energy Yield</span>
                  </div>
                </div>
              </div>
              <Link
                href="/talk-to-ai-architect?topic=ai-value-engineering#session-booking-section"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline pt-2 border-t border-slate-100"
              >
                <span>Explore Energy Blueprint</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* 7. TELECOM & DATA CENTERS */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                    <Layers size={20} />
                  </div>
                  <span className="text-[10.5px] font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200/60">
                    PUE &lt; 1.2 · Optical NOC
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-2">Telecom &amp; Data Centers</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Direct-to-chip liquid cooling tuning, autonomous optical NOC fault isolation, and PUE optimization across 50–100kW racks.
                </p>
                <div className="space-y-1.5 border-t border-slate-100 pt-3 mb-4 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    <span>PUE Slashed to &lt;1.18</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    <span>99.999% Lossless Uptime</span>
                  </div>
                </div>
              </div>
              <Link
                href="/talk-to-ai-architect?topic=ai-value-engineering#session-booking-section"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline pt-2 border-t border-slate-100"
              >
                <span>Explore Infra Blueprint</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* 8. AEROSPACE, DEFENSE & SOVEREIGN AI */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
                    <Lock size={20} />
                  </div>
                  <span className="text-[10.5px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
                    ITAR · Air-Gapped · PQC
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-2">Aerospace &amp; Sovereign AI</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Air-gapped agentic orchestration, post-quantum cryptographic defenses, and formal safety verification for mission systems.
                </p>
                <div className="space-y-1.5 border-t border-slate-100 pt-3 mb-4 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    <span>100% Air-Gapped Sovereignty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    <span>Zero External Cloud Leaks</span>
                  </div>
                </div>
              </div>
              <Link
                href="/talk-to-ai-architect?topic=ai-value-engineering#session-booking-section"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline pt-2 border-t border-slate-100"
              >
                <span>Explore Defense Scope</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 17. ENGAGEMENT MODELS & DIFFERENTIATION */}
      {/* ========================================================= */}
      <section id="sprints-diagnostic" className="scroll-mt-28 py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200 relative">
        <span id="acceleration-sprints" className="scroll-mt-28 -top-28 absolute block" />
        <span id="part4-sprints-diagnostic" className="scroll-mt-28 -top-28 absolute block" />
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
                href="#strategy-session-section"
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
      {/* 18. STRATEGY SESSION FORM (CLEAN CORPORATE EXPERIENCE) */}
      {/* ========================================================= */}
      <section id="strategy-session-section" className="scroll-mt-28 py-16 sm:py-24 bg-slate-950 text-white border-b border-slate-800 relative">
        {/* Aliases for smooth anchor landing from existing CTA links */}
        <span id="intake-form" className="scroll-mt-28 -top-28 absolute block" />
        <span id="diagnostic-form-section" className="scroll-mt-28 -top-28 absolute block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-slate-900 px-3 py-1 rounded-md border border-cyan-500/40 inline-flex items-center gap-1.5 mb-4">
              <Target size={12} className="text-cyan-400" />
              Executive Intake
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              BOOK A STRATEGY SESSION
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Let&apos;s identify where AI can create measurable enterprise value in your operation.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            <BorderBeam size={200} duration={10} colorFrom="#38bdf8" colorTo="#6366f1" />

            {/* LIVE GOOGLE CALENDAR DIRECT BOOKING BANNER */}
            <div className="mb-10 p-5 rounded-2xl bg-gradient-to-r from-blue-950/80 via-indigo-950/60 to-slate-950 border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/40 text-cyan-400 flex items-center justify-center shrink-0">
                  <Calendar size={22} />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold tracking-wider text-cyan-400 uppercase block">
                    INSTANT GOOGLE CALENDAR CONFIRMATION
                  </span>
                  <p className="text-sm font-semibold text-white">
                    Need an immediate 45-minute architectural Strategy Session?
                  </p>
                  <p className="text-xs text-slate-400">
                    Lock a direct slot on our live Google Calendar with principal systems architects.
                  </p>
                </div>
              </div>
              <Link
                href="/talk-to-ai-architect?topic=ai-value-engineering#session-booking-section"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide shadow-md transition-all shrink-0 hover:scale-105"
              >
                <Calendar size={15} />
                <span>Schedule Strategy Session</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Corporate Strategy Session Form */}
            {formSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white">Strategy Session Request Confirmed</h3>
                <p className="text-sm text-slate-300 max-w-lg mx-auto">
                  Thank you, <strong>{formFullName}</strong>. Your session request has been received. Our senior systems engineering practice lead will review your submission and contact you within one business day with a confirmed briefing invitation.
                </p>
                <div className="pt-4">
                  <Link
                    href="/talk-to-ai-architect?topic=ai-value-engineering#session-booking-section"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:underline"
                  >
                    <span>Need instant slot confirmation? Book live with AI Architect</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleStrategySessionSubmit} className="space-y-6">
                {formError && (
                  <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle size={16} className="shrink-0 text-rose-400" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formFullName}
                      onChange={(e) => setFormFullName(e.target.value)}
                      placeholder="e.g. Elena Rostova"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500 outline-hidden transition-all"
                    />
                  </div>

                  {/* Work Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Work Email <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="name@enterprise.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500 outline-hidden transition-all"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Mobile Number <span className="text-slate-500">(with country code)</span>
                    </label>
                    <input
                      type="tel"
                      value={formMobile}
                      onChange={(e) => setFormMobile(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500 outline-hidden transition-all"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Company Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formCompany}
                      onChange={(e) => setFormCompany(e.target.value)}
                      placeholder="e.g. Global Industrial Corp"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500 outline-hidden transition-all"
                    />
                  </div>

                  {/* Job Title */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={formJobTitle}
                      onChange={(e) => setFormJobTitle(e.target.value)}
                      placeholder="e.g. Chief Operating Officer / VP Engineering"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500 outline-hidden transition-all"
                    />
                  </div>

                  {/* Industry */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Industry
                    </label>
                    <select
                      value={formIndustry}
                      onChange={(e) => setFormIndustry(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white outline-hidden transition-all"
                    >
                      <option value="Manufacturing & Industrial">Manufacturing &amp; Industrial</option>
                      <option value="Automotive & Mobility">Automotive &amp; Mobility</option>
                      <option value="Financial Services & Banking">Financial Services &amp; Banking</option>
                      <option value="Pharmaceuticals & Healthcare">Pharmaceuticals &amp; Healthcare</option>
                      <option value="Energy & Utilities">Energy &amp; Utilities</option>
                      <option value="Telecommunications & Cloud">Telecommunications &amp; Cloud</option>
                      <option value="Mining & Heavy Operations">Mining &amp; Heavy Operations</option>
                      <option value="Aerospace & Defense">Aerospace &amp; Defense</option>
                      <option value="Logistics & Supply Chain">Logistics &amp; Supply Chain</option>
                      <option value="Other Regulated Enterprise">Other Regulated Enterprise</option>
                    </select>
                  </div>

                  {/* Area of Interest */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Area of Interest
                    </label>
                    <select
                      value={formAreaOfInterest}
                      onChange={(e) => setFormAreaOfInterest(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white outline-hidden transition-all"
                    >
                      <option value="AI Value Discovery & Constraint Analysis">01 AI Value Discovery &amp; Constraint Analysis</option>
                      <option value="Process Intelligence & Telemetry Mining">02 Process Intelligence &amp; Telemetry Mining</option>
                      <option value="Function-Cost Engineering & Unit Economics">03 Function-Cost Engineering &amp; Unit Economics</option>
                      <option value="AI Methodology Execution (Lean / Six Sigma / TOC)">04 AI Methodology Execution (Lean / Six Sigma / TOC)</option>
                      <option value="AI Agent Fleets Deployment">05 AI Agent Fleets Deployment</option>
                      <option value="Value Realization Office (VRO) Governance">06 Value Realization Office (VRO) Governance</option>
                      <option value="Value Guardianship & Permanence Audit">07 Value Guardianship &amp; Permanence Audit</option>
                      <option value="Compounding Value Operating System">08 Compounding Value Operating System</option>
                    </select>
                  </div>

                  {/* What would you like to discuss? */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      What would you like to discuss?
                    </label>
                    <textarea
                      rows={3}
                      value={formDiscussion}
                      onChange={(e) => setFormDiscussion(e.target.value)}
                      placeholder="Describe your primary operational bottlenecks, compute cost concerns, or transformation targets..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500 outline-hidden transition-all"
                    />
                  </div>

                  {/* Preferred Strategy Session Format */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Preferred Strategy Session Format
                    </label>
                    <select
                      value={formSessionFormat}
                      onChange={(e) => setFormSessionFormat(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white outline-hidden transition-all"
                    >
                      <option value="45-Minute Virtual Architectural Briefing">45-Minute Virtual Architectural Briefing</option>
                      <option value="On-Site Executive Scoping Workshop">On-Site Executive Scoping Workshop</option>
                      <option value="C-Suite P&L Alignment Session">C-Suite P&amp;L Alignment Session</option>
                      <option value="Value Stream Diagnostic Discovery">Value Stream Diagnostic Discovery</option>
                    </select>
                  </div>

                  {/* Preferred Date / Time */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Preferred Date / Time
                    </label>
                    <input
                      type="text"
                      value={formDateTime}
                      onChange={(e) => setFormDateTime(e.target.value)}
                      placeholder="e.g. Next Tuesday at 2:00 PM EST"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500 outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {formSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Submitting Session Request...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Book Strategy Session</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            <div className="mt-8 pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
              <Lock size={13} className="text-cyan-400" />
              <span>Enterprise confidentiality guaranteed. Disclosures handled under mutual NDA standards.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 19. NEXT IN THE OPERATING STACK */}
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

      {/* FOOTER */}
      <SiteFooter />
    </div>
  )
}

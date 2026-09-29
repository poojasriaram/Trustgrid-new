'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  TrendingUp,
  BarChart3,
  Workflow,
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
  Activity,
  Clock,
  Target,
  Truck,
  HeartPulse,
  Factory,
  ChevronRight,
  AlertCircle,
  Eye,
  RefreshCw,
  Search,
  Sliders,
  Award,
  Layers3,
  Database,
  FileCheck
} from 'lucide-react'

// 7-LAYER COMPOUND-AI STACK DATA
const compoundStackLayers = [
  {
    layer: 'L7',
    name: 'Governance, Safety & Meta',
    type: 'UPPER = EVOLVE',
    badge: 'Meta Control',
    color: 'from-purple-600 to-indigo-600',
    borderColor: 'border-purple-500',
    textColor: 'text-purple-400',
    desc: 'Audit, escalation, self-reorg, safety interlock, regulatory compliance and continuous topology validation.',
    recursive: 'LL7 reorganizes L5 execution topology & reconfigures L6 learning directives when enterprise constraints migrate.'
  },
  {
    layer: 'L6',
    name: 'Learning & Optimization',
    type: 'UPPER = EVOLVE',
    badge: 'Recursive Learning',
    color: 'from-purple-700 to-indigo-700',
    borderColor: 'border-purple-600',
    textColor: 'text-purple-300',
    desc: 'Outcome capture (fuel, OTIF, LOS, OEE, WIP), policy auto-updates, skill refinement, and surrogate model training.',
    recursive: 'LL6 retrains L2 waste/constraint detectors and optimizes L3 buffer parameters based on ground-truth delta.'
  },
  {
    layer: 'L5',
    name: 'Execution & Orchestration',
    type: 'CORE = ACT',
    badge: 'Closed-Loop Action',
    color: 'from-indigo-600 to-blue-600',
    borderColor: 'border-indigo-500',
    textColor: 'text-indigo-400',
    desc: 'Autonomous machine dispatch, dynamic schedule rebalancing, predictive maintenance execution, and AGV rerouting.',
    recursive: 'LL5 feeds execution telemetry and latency signals up to L6 while enforcing L4 simulation recommendations.'
  },
  {
    layer: 'L4',
    name: 'Decision & Recommendation',
    type: 'CORE = SIMULATE',
    badge: 'Digital Twin',
    color: 'from-blue-600 to-cyan-600',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-400',
    desc: 'Simulated operational trade-offs, What-if digital twin projections, multi-objective Pareto optimization.',
    recursive: 'LL4 projects downstream bottleneck impacts, dynamically adjusting L3 pacing and Drum-Buffer-Rope rules.'
  },
  {
    layer: 'L3',
    name: 'Monitoring & Compliance',
    type: 'LOWER = SENSE',
    badge: 'Flow Control',
    color: 'from-cyan-600 to-teal-600',
    borderColor: 'border-cyan-500',
    textColor: 'text-cyan-400',
    desc: 'Real-time Takt compliance, Pull vs. Push adherence, Flow starvation alerts, and Buffer Burn rate tracking.',
    recursive: 'LL3 validates compliance against L2 constraint boundaries and signals anomalies down to L1 perception filters.'
  },
  {
    layer: 'L2',
    name: 'Diagnostic & Constraint',
    type: 'LOWER = SENSE',
    badge: 'Constraint Elevation',
    color: 'from-teal-600 to-emerald-600',
    borderColor: 'border-teal-500',
    textColor: 'text-teal-400',
    desc: '120+ Waste pattern classifier (DOWNTIME), Goldratt 5 Focusing Steps, and automated Root-Cause Attribution.',
    recursive: 'LL2 dynamically targets L1 ingestion frequencies around active system constraints in <4 minutes.'
  },
  {
    layer: 'L1',
    name: 'Perception & Data Fusion',
    type: 'LOWER = SENSE',
    badge: 'Edge Telemetry',
    color: 'from-slate-700 to-slate-800',
    borderColor: 'border-slate-600',
    textColor: 'text-slate-300',
    desc: 'Real-time edge ingestion fused across MES, SCADA, IoT, ERP, WMS, CRM, and Hospital EMR / ADT streams.',
    recursive: 'Forms the foundational ground-truth sensory nervous system for the entire compounding loop.'
  }
]

// 25 METHODOLOGIES ACROSS 4 GROUPS
const methodologyGroups = {
  lean: {
    name: 'Lean (8 Methodologies)',
    tag: 'Group 1 · DOWNTIME, TPS & Flow',
    items: [
      {
        name: 'DOWNTIME',
        classic: '8 wastes hidden in flow',
        pain: '$18k/mo COPQ, 28% idle, 35% motion',
        agent: 'Waste-classifier + Process-Mining Agent',
        impact: '94% auto-classify, <4min detection'
      },
      {
        name: 'TPS',
        classic: 'Toyota Prod Sys — Jidoka, JIT, Heijunka',
        pain: 'Overprod 19%, uneven batch 500 vs takt 120',
        agent: 'Heijunka + JIT Throttle Agent',
        impact: 'Level load -32%, OTIF +14%'
      },
      {
        name: 'Jidoka',
        classic: 'Autonomation with human touch',
        pain: 'Defects escape downstream, 11% rework',
        agent: 'Vision Jidoka Agent (Cognex + MSA)',
        impact: 'Auto-stop <200ms, FPY +12%'
      },
      {
        name: 'Andon',
        classic: 'Visual alert & line stop',
        pain: '22 queue triangles, late escalation',
        agent: 'Andon Fusion Agent',
        impact: 'Trigger <60s, MTTR -40%'
      },
      {
        name: 'Pull',
        classic: 'Pull vs Push, Kanban',
        pain: 'Push WIP 19% over, blocks flow',
        agent: 'Pull Compliance + Kanban ML',
        impact: 'Inv -32%, Svc +15%'
      },
      {
        name: 'Flow',
        classic: 'Continuous flow, one-piece flow',
        pain: '2.1km travel, starvation barriers',
        agent: 'Flow Diagnostic Agent',
        impact: 'Travel -31%, Thr +22%'
      },
      {
        name: 'SMED',
        classic: 'Single-Minute Exchange of Die',
        pain: 'Changeover 54\' blocks line OEE',
        agent: 'SMED Agent + Vision TimeStudy',
        impact: '54\'→23\' (-57%), OEE +8%'
      },
      {
        name: 'Poka-Yoke',
        classic: 'Mistake proofing & defect locking',
        pain: 'Skill mismatch 35%, rework 11%',
        agent: 'Poka-Yoke Vision + Skill-Match',
        impact: 'Rework 11→3%, PPM 6k→180'
      }
    ]
  },
  sixSigma: {
    name: 'Six Sigma (6 Methodologies)',
    tag: 'Group 2 · DMAIC, SPC & Capability',
    items: [
      {
        name: 'DMAIC',
        classic: 'Define-Measure-Analyze-Improve-Control',
        pain: '45-day cycles, anecdotal root cause',
        agent: 'DMAIC Digital Agent',
        impact: '45d→12d, 3.7x faster'
      },
      {
        name: 'DMADV',
        classic: 'DFSS Define-Measure-Analyze-Design-Verify',
        pain: 'NPI late, 22% extra cycle time',
        agent: 'DMADV Design Agent + Digital Twin',
        impact: 'DFSS cycle -38%, FPY +18%'
      },
      {
        name: 'MSA',
        classic: 'Gage R&R <10% required',
        pain: 'False SPC alarms -62% noise',
        agent: 'Vision MSA Agent',
        impact: 'Drift <200ms, R&R auto'
      },
      {
        name: 'SPC',
        classic: 'Control charts UCL/LCL limits',
        pain: 'Special cause late, Cpk 0.87 drift',
        agent: 'SPC Predictive Violation Agent',
        impact: 'Predict 2h early, Cpk +0.6'
      },
      {
        name: 'FMEA',
        classic: 'S×O×D RPN scoring >120 action',
        pain: 'Static FMEA, CAPA backlog 18d',
        agent: 'FMEA RPN Live Agent',
        impact: 'RPN -38%, CAPA 18→6d'
      },
      {
        name: 'Cp / Cpk',
        classic: 'Process capability Cp>1.33',
        pain: '6k PPM, machine centering drift',
        agent: 'Cpk Live + Auto Tool Offset',
        impact: '0.87→1.44, PPM 6k→180'
      }
    ]
  },
  toc: {
    name: 'TOC / CCPM (5 Methodologies)',
    tag: 'Group 3 · Constraints & Buffer Management',
    items: [
      {
        name: '5 Focusing Steps',
        classic: 'Identify-Exploit-Subordinate-Elevate-Repeat',
        pain: 'Throughput -22% from local optima',
        agent: 'Constraint Monitor <4min',
        impact: 'Detect <4min, new drum 12min'
      },
      {
        name: 'DBR',
        classic: 'Drum-Buffer-Rope WIP cap',
        pain: 'Bullwhip, WIP imbalance across 3 plants',
        agent: 'DBR Release Control Agent',
        impact: 'WIP -32%, transfers 18→7%'
      },
      {
        name: 'Buffer Management',
        classic: 'Green/Yellow/Red/Black zones',
        pain: 'Stockouts 68%, manual board walks',
        agent: 'Buffer Burn Rate ML',
        impact: 'Stockout -68%, 90min early'
      },
      {
        name: 'Fever Chart',
        classic: 'Buffer burn vs progress warning',
        pain: 'Project OTD 78%, late escalation',
        agent: 'Fever Chart Agent + Burn ML',
        impact: 'OTD 78→94%, 2.1x proj/yr'
      },
      {
        name: 'Project Buffer',
        classic: '50% chain buffer, feeding buffers',
        pain: 'Task safety padding, multitasking',
        agent: 'CCPM Buffer Monitor + Skill-Match',
        impact: 'Duration -23%, overload -41%'
      }
    ]
  },
  extended: {
    name: 'Extended (6 Methodologies)',
    tag: 'Group 4 · Digital Twin, TPM & Process Mining',
    items: [
      {
        name: 'Value Eng • FAST / VEC',
        classic: 'Function Analysis, FAST diagram, VEC score',
        pain: '22% extra-processing, over-tolerancing',
        agent: 'Function-Cost Agent + FAST AI',
        impact: 'Function/Cost -28%, VEC +1.8'
      },
      {
        name: 'TPM • OEE / MTBF',
        classic: 'Total Productive Maint, Autonomous Maint',
        pain: 'OEE 61%, breakdown 18% downtime',
        agent: 'TPM Predictive + Autonomous Agent',
        impact: 'OEE 61→82%, MTBF +42%'
      },
      {
        name: 'Agile Hybrid',
        classic: 'Scrum + Kanban + Lean hybrid ops',
        pain: 'Sprint overload, resource contention 35%',
        agent: 'Agile Ops Agent + WIP throttle',
        impact: 'Velocity +34%, lead time -27%'
      },
      {
        name: 'Human Factors',
        classic: 'Ergonomics, cognitive load, safety',
        pain: '120 bends/shift, search time 54min',
        agent: 'Ergonomics Vision (Pose) Agent',
        impact: 'Bends -42%, incidents -44%'
      },
      {
        name: 'Digital Twin',
        classic: 'Virtual replica of plant & network',
        pain: 'Layout spaghetti, 2.1km travel',
        agent: 'Digital Twin Sync Agent',
        impact: 'Sync <2s, layout -31% travel'
      },
      {
        name: 'Process Mining',
        classic: 'Discovers hidden process variants',
        pain: '28% hidden waste missing from SOPs',
        agent: 'Process Mining Agent',
        impact: 'Discovers 28% hidden, cycle -19%'
      }
    ]
  }
}

// 8 LEAN WASTES (DOWNTIME)
const downtimeWastes = [
  {
    letter: 'D',
    name: 'Defects',
    badge: 'FPY +12%',
    classic: 'Tool wear → dimension drift, 11% rework, $18k/mo COPQ. Scrap pile 6% FPY loss.',
    aiImpact: 'Vision Defect Agent (Cognex + MSA) detects 200ms before scrap via SPC-drift. Auto-tool offset saves $14k/shift.'
  },
  {
    letter: 'O',
    name: 'Overproduction',
    badge: 'WIP -32%',
    classic: 'Batch 500 vs takt 120, WIP 19% overprod, blocks flow, hides defects across line.',
    aiImpact: 'Demand-Sensing Throttle + DBR Release cuts WIP -32%, OTIF +14%, prevents bullwhip. WC freed $420k.'
  },
  {
    letter: 'W',
    name: 'Waiting',
    badge: 'Idle 28% → 11%',
    classic: 'Idle 28% operator + machine waits for material, approvals, or changeover queue.',
    aiImpact: 'RFID Waiting Waste + Process-Mining detects idle in <4min, auto-dispatches L5. OEE +8%, saves $12k/shift.'
  },
  {
    letter: 'N',
    name: 'Non-utilized Talent',
    badge: 'OEE +11%',
    classic: '35% skill mismatch, bottleneck starves while skilled workers idle. OEE loss 30%.',
    aiImpact: 'RFID Skill Matrix + Rotation Agent performs skill-match routing, rework 11%→3%, retention +18%.'
  },
  {
    letter: 'T',
    name: 'Transportation',
    badge: 'Travel -31%',
    classic: 'Forklift 2.1km/day/operator, spaghetti layout, fuel 18% waste, transit WIP 25%.',
    aiImpact: 'AGV Tracker + Slotting Perception with Digital Twin optimizes path -31% travel, fuel -18%, auto-reroutes.'
  },
  {
    letter: 'I',
    name: 'Inventory',
    badge: 'Inv -32%',
    classic: '18% transfer waste multi-site, 22 queue triangles, $420k WC locked in buffer stocks.',
    aiImpact: 'Multi-site Constraint Monitor + Buffer Mgmt ML cuts inventory -32%, turns +1.8x, prevents bullwhip.'
  },
  {
    letter: 'M',
    name: 'Motion',
    badge: 'Steps -42%',
    classic: '35% extra steps, 120 bends/shift, search time 54min, high ergonomics injury risk.',
    aiImpact: 'Motion Classifier (Pose + MES) + SMED reorganizes workbench, steps -42%, changeover 54\'→23\'.'
  },
  {
    letter: 'E',
    name: 'Extra-processing',
    badge: 'CT -19%',
    classic: 'Over-tolerancing, 3 redundant inspection passes, 22% extra cycle time, $9k/mo COPQ.',
    aiImpact: 'Vision + SPC Extra-Processing Agent conducts auto-tolerance check, cuts inspection -40%, cycle -19%.'
  }
]

// AI IMPACT DIMENSIONS MATRIX DATA
const impactMatrixData = [
  {
    category: 'Defects / Variation',
    type: 'WASTE',
    sense: 'Vision + MSA',
    quantify: '$18k/mo COPQ',
    automate: 'Auto Andon + Tool Offset',
    compound: 'SPC drift model learns → FPY +12% compounding'
  },
  {
    category: 'Overproduction',
    type: 'WASTE',
    sense: 'Process-Mining Waste Classifier',
    quantify: '19% WIP ($420k locked)',
    automate: 'DBR Release + Throttle',
    compound: 'WC funds 3PL sensors → self-organizing expansion'
  },
  {
    category: 'Waiting / Idle 28%',
    type: 'WASTE',
    sense: 'RFID + MES Idle Telemetry',
    quantify: '$12k/shift lost',
    automate: 'Auto Dispatch L5 Execution',
    compound: 'OEE +8% → frees capacity for continuous training'
  },
  {
    category: 'Talent / 35% Mismatch',
    type: 'WASTE',
    sense: 'RFID Dynamic Skill Matrix',
    quantify: 'OEE -30% local hit',
    automate: 'Skill-Match Routing Agent',
    compound: 'Rework 11%→3% → skill model self-improves'
  },
  {
    category: 'Transportation',
    type: 'WASTE',
    sense: 'AGV + Slotting Perception',
    quantify: '2.1km/day, fuel +18%',
    automate: 'Path Optimizer Engine',
    compound: 'Digital twin learns layout → -31% travel recursive'
  },
  {
    category: 'Inventory / Bullwhip',
    type: 'WASTE',
    sense: 'Constraint Monitor',
    quantify: '18% transfer cost',
    automate: 'Buffer Mgmt ML Engine',
    compound: 'Inv -32% → virtual factory achieves +1.8 turns'
  },
  {
    category: 'Motion 35% Steps',
    type: 'WASTE',
    sense: 'Pose + Motion Classifier',
    quantify: '54min search/shift',
    automate: 'SMED + Workbench Bot',
    compound: 'Changeover 54\'→23\', safety incidents -44%'
  },
  {
    category: 'Extra-processing',
    type: 'WASTE',
    sense: 'SPC + Vision Inspection',
    quantify: '22% extra Cycle Time',
    automate: 'Auto Tolerance Gate',
    compound: 'CT -19%, living FMEA auto-update'
  },
  {
    category: 'SPC / Cpk Drift',
    type: 'VARIATION',
    sense: 'SPC-Drift + Cpk Live',
    quantify: 'Cpk 0.87 = 6k PPM',
    automate: 'Predict 2h + Auto Tool Offset',
    compound: 'Cpk 0.87→1.44, limits auto-learn & self-tighten'
  },
  {
    category: 'Drum / Buffer Contention',
    type: 'CONSTRAINT',
    sense: 'Constraint Monitor <4min',
    quantify: 'Throughput -22% ceiling',
    automate: 'DBR + Buffer Burn ML',
    compound: 'Capacity +22% → constraint migrates, auto re-drum'
  }
]

// 4 DETAILED COMPOUNDING USE CASES
const detailedUseCases = [
  {
    id: 'fleet',
    title: 'A • Logistics Fleet Operations',
    subtitle: 'Last-Mile & Fleet Dispatch',
    stats: '120 Trucks • Fuel 35% Cost',
    kpis: [
      { label: 'OTIF Baseline', value: '82%' },
      { label: 'Idle Waste', value: '28%' },
      { label: 'Route Overprod', value: '19%' }
    ],
    agents: [
      'Route Perception (GPS/Traffic)',
      'Traffic Diagnostic Agent',
      'Driver Behavior Monitor',
      'Load-Balancing Decision Twin',
      'Dispatch Execution L5',
      'Fuel-Learning Optimizer'
    ],
    mechanism:
      'Initial diagnostic finds idle/waiting 28% + route overproduction 19%. Execution cuts idle 40%, fuel -12%. Learning updates driver score model, discovers cross-dock constraint, elevates. Second cycle discovers multi-drop batch policy waste.',
    outcomeBadge: 'OTIF 82% → 96% | Fuel -18% | Transit WIP -25%',
    freedResource:
      'Freed working capital funds telemetry sensors to 3PL fleet partners → self-organizing routing extends beyond owned fleet.'
  },
  {
    id: 'hospital',
    title: 'B • Hospital Patient Flow & OT',
    subtitle: 'Operating Theater & Bed Allocation',
    stats: '400 Beds • OT Utilization 68%',
    kpis: [
      { label: 'Patient Queue Wait', value: '4.2h' },
      { label: 'OT Constraint', value: '68%' },
      { label: 'Nurse Overtime', value: '22%' }
    ],
    agents: [
      'Bed Perception (ADT / EMR)',
      'Bottleneck Diagnostic (OT)',
      'Takt Compliance Triage',
      'OT + Staff Scheduling Decision',
      'Dynamic Bed Allocation L5',
      'LOS Prediction Learning L6'
    ],
    mechanism:
      'Elevate OT constraint +18% throughput, waiting 4.2h → 2.1h. Learning finds pre-op waiting waste masked by OT starvation. Reorganizes triage rules. Enables 2 new surgical service lines from freed OT blocks.',
    outcomeBadge: 'Wait 4.2h → 2.1h | OT 68% → 89% | +2 New Lines',
    freedResource:
      'LOS reduced by 31%, Nurse OT -40%, dynamic pull for discharge frees capacity to launch 2 high-margin elective surgical lines.'
  },
  {
    id: 'cnc',
    title: 'C • Skill Matrix & CNC Machining',
    subtitle: 'Precision Machining & Setup Reduction',
    stats: '45 CNC Machines • 120 Operators',
    kpis: [
      { label: 'OEE Skill Variation', value: '61%' },
      { label: 'SMED Setup Loss', value: '54\'' },
      { label: 'Rework Mismatch', value: '11%' }
    ],
    agents: [
      'RFID Skill Tracking',
      'IoT Machine State Monitor',
      'SMED TimeStudy Agent',
      'Skill-Match Routing Engine',
      'Operator Rotation Agent',
      'Tool-Wear Predictive Model'
    ],
    mechanism:
      'SMED 54\'→23min (-57%), OEE 61→82%. Skill-match reduces rework 11→3%. Learning refines dynamic skill matrix and suggests micro-training. Self-organizing creates agile multi-skilled cells around active bottleneck.',
    outcomeBadge: 'OEE 61% → 82% | SMED 54\' → 23\' (-57%) | Rework 11% → 3%',
    freedResource:
      'Eliminated 30% OEE loss from operator mismatch. Autonomous cells dynamically rebalance when product mix shifts.'
  },
  {
    id: 'multisite',
    title: 'D • Multi-Site Manufacturing Sync',
    subtitle: 'Distributed Production Synchronization',
    stats: '3 Plants • 18% Transfer Cost',
    kpis: [
      { label: 'WIP Bullwhip', value: 'Severe' },
      { label: 'Inter-plant Cost', value: '18%' },
      { label: 'Service Level', value: '78%' }
    ],
    agents: [
      'Multi-site Constraint Monitor',
      'DBR Release Control Agent',
      'Demand-Sensing Throttle',
      'AGV & RFID Tracking Mesh',
      'Enterprise S&OP Decision Agent',
      'Buffer Burn ML Optimizer'
    ],
    mechanism:
      'DBR caps WIP across all plants; inventory drops -32%, service rises +15%. Learning reveals Plant 2 heat-treatment furnace is true network constraint. Elevates capacity +22%. Merges 3 facilities into a single virtual factory.',
    outcomeBadge: 'Inventory -32% | Service +15% | Transfers 18% → 7%',
    freedResource:
      'Demand-sensing throttle completely stops the bullwhip effect; Plant 2 capacity +22% unlocks $420k in working capital.'
  }
]

export function AIValueCapabilities() {
  const [selectedMethodGroup, setSelectedMethodGroup] = useState<'lean' | 'sixSigma' | 'toc' | 'extended'>('lean')
  const [activeStackLayer, setActiveStackLayer] = useState(0)
  const [selectedUseCase, setSelectedUseCase] = useState(0)
  const [osTab, setOsTab] = useState<'wastes' | 'sigma' | 'toc' | 'matrix'>('wastes')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
      {/* 01: HERO & EXECUTIVE SUMMARY */}
      <section id="ai-value-hero" className="scroll-mt-32">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 text-white border border-indigo-900/60 relative overflow-hidden shadow-2xl">
          {/* Subtle Glow Backgrounds */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-700/60 inline-flex items-center gap-1.5">
                <Sparkles size={12} className="text-indigo-400" />
                TRUSTGRID.AI · AI VALUE ENGINEERING
              </span>
              <span className="text-[11px] font-semibold text-slate-300 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700">
                Recursive Self-Learning · Self-Organizing · Self-Optimizing
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              Engineering Self-Evolving AI Systems for{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Compounding Operational Value
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed mb-6">
              Diagnoses Lean Wastes &amp; Theory of Constraints (ToC) bottlenecks • Deploys 7-Layer Recursive Agents • Unlocks Exponential Yield via Closed-Loop Autonomous Action.
            </p>

            {/* 3 Metric Cards + 3 Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="text-2xl sm:text-4xl font-black text-blue-400 mb-0.5">120+</div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">Waste Patterns</div>
                <div className="text-[11px] text-slate-400">Diagnosed in &lt;4 minutes</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="text-2xl sm:text-4xl font-black text-purple-400 mb-0.5">7</div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">Agent Layers</div>
                <div className="text-[11px] text-slate-400">Recursive self-improving stack</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs col-span-2 sm:col-span-1">
                <div className="text-2xl sm:text-4xl font-black text-emerald-400 mb-0.5">3.2x</div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">Compounding Yield</div>
                <div className="text-[11px] text-slate-400">Average Year 1 lift</div>
              </div>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2.5 pb-6 border-b border-slate-800">
              {['No-Code Agent Builder', 'MES / SCADA / ERP Native', 'Self-Organizing Cells'].map((pill) => (
                <span key={pill} className="text-xs font-bold px-3 py-1 bg-indigo-900/40 text-indigo-300 border border-indigo-700/50 rounded-lg">
                  ✓ {pill}
                </span>
              ))}
            </div>

            {/* Executive Summary Card */}
            <div className="mt-6 p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">Executive Summary</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Traditional Lean relies on episodic human kaizen — linear value, static baselines. TrustGrid.ai Lean AI Value Engineering continuously diagnoses wastes and ToC constraints via Perception agents fused from MES, SCADA, IoT, ERP, WMS, EMR/ADT, acts autonomously through Execution &amp; Orchestration agents, learns from every outcome (fuel, OTIF, LOS, OEE, WIP), and reorganizes itself — topology, policies, skill routing — to elevate the next constraint.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Result is exponential, not incremental. Freed capacity funds sensors and training, improving learning rate (L), which discovers hidden wastes (W) and innovations (I), shortening cycle time (TTM). Each loop raises V₀ — the baseline — creating compounding operational value that self-extends beyond the initial scope.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5 pt-4 border-t border-slate-800 text-[11px] font-mono">
                <div className="text-indigo-300">🔍 Diagnose: 120+ wastes</div>
                <div className="text-blue-300">⚡ Act: Closed-loop exec</div>
                <div className="text-purple-300">🧠 Learn: Policy auto-update</div>
                <div className="text-emerald-300">🔄 Reorg: Self-org cells</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TASK 1: TRUSTGRID FOOTPRINT */}
      <section id="trustgrid-footprint" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
            Task 1 · TrustGrid Footprint
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            38 Verticals • 8,690 Processes • 1,600 Wastes • 360 Constraints
          </h2>
          <p className="text-base text-slate-600 mt-2">
            The largest codified operational ontology linking industrial processes, failure modes, and constraint archetypes directly to autonomous agent dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-blue-400 transition-all group">
            <div className="text-3xl mb-2">🌐</div>
            <div className="text-3xl font-black text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">38</div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">Industry Verticals</h4>
            <p className="text-xs text-slate-500">From Precision Machining to Healthcare to Logistics Fleet.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-indigo-400 transition-all group">
            <div className="text-3xl mb-2">⚙️</div>
            <div className="text-3xl font-black text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">8,690+</div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">Processes</h4>
            <p className="text-xs text-slate-500">End-to-end mapped, benchmarked and agentified.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-purple-400 transition-all group">
            <div className="text-3xl mb-2">🔍</div>
            <div className="text-3xl font-black text-slate-900 mb-1 group-hover:text-purple-600 transition-colors">1,600+</div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">Waste Patterns</h4>
            <p className="text-xs text-slate-500">DOWNTIME variants identified with automated detectors.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-400 transition-all group">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-3xl font-black text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">360+</div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">Constraints Unlocked</h4>
            <p className="text-xs text-slate-500">TOC/CCPM bottlenecks elevated into revenue capacity.</p>
          </div>
        </div>
      </section>

      {/* 02: MATHEMATICAL MODEL — COMPOUNDING VALUE LAW */}
      <section id="compounding-math-model" className="scroll-mt-32">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white border border-slate-800 relative overflow-hidden">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-md border border-cyan-800 inline-block mb-3">
              02 — Mathematical Model
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              The Compounding Value Law: dV/dt ∝ V(t)
            </h2>
            <p className="text-base text-slate-300 mt-2">
              Unlike linear Kaizen, growth rate itself increases each cycle. Higher layers improve lower layers → α, β, γ, δ all grow recursively.
            </p>
          </div>

          {/* Formula Display */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-indigo-800/60 mb-8 text-center relative overflow-hidden">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-2 font-mono">
              COMPOUNDING MODEL v1.0
            </span>
            <div className="text-2xl sm:text-4xl font-black text-white font-mono tracking-wider py-2">
              V(t) = V₀ · e<sup className="text-cyan-400 font-bold">(αL + βW + γI + δ/TTM)·t</sup>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
              Recursive compounding where growth rate itself increases each cycle. Freed capacity funds sensors, which improves L, which unlocks higher W &amp; I.
            </p>
          </div>

          {/* Variables breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-xl font-black text-blue-400 block mb-0.5">L</span>
              <strong className="text-xs text-white block">Learning Rate</strong>
              <p className="text-[11px] text-slate-400 mt-1">Model improvement per outcome feedback loop.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-xl font-black text-cyan-400 block mb-0.5">W</span>
              <strong className="text-xs text-white block">Waste / Constraint Δ</strong>
              <p className="text-[11px] text-slate-400 mt-1">ToC + Lean 7 wastes permanently removed.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-xl font-black text-purple-400 block mb-0.5">I</span>
              <strong className="text-xs text-white block">Innovation Rate</strong>
              <p className="text-[11px] text-slate-400 mt-1">New service lines / products unlocked by freed capacity.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-xl font-black text-emerald-400 block mb-0.5">TTM</span>
              <strong className="text-xs text-white block">Cycle Time</strong>
              <p className="text-[11px] text-slate-400 mt-1">Time-to-Market inverse accelerator.</p>
            </div>
          </div>

          {/* Comparison Cards: Linear vs Compound */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-800">
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-300 text-sm">Linear (Kaizen Events)</h4>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">V = V₀ + k·t</span>
              </div>
              <p className="text-xs text-slate-400 mb-3">Isolated kaizen workshops with static baselines and human friction. Plateau occurs after initial low-hanging fruit.</p>
              <div className="text-lg font-bold text-slate-300 font-mono">$120K / 90 Days</div>
            </div>

            <div className="p-5 rounded-xl bg-indigo-950/40 border border-indigo-700/60">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white text-sm">COMPOUND-AI™ Architecture</h4>
                <span className="text-[10px] font-mono text-indigo-300 bg-indigo-900/60 px-2 py-0.5 rounded">dV/dt ∝ V(t)</span>
              </div>
              <p className="text-xs text-indigo-200/90 mb-3">Recursive self-improvement: Month 6–8 tipping point triggers exponential compounding across adjacent lines.</p>
              <div className="text-lg font-bold text-cyan-400 font-mono">$890K / 90 Days (7.4x)</div>
            </div>
          </div>
        </div>
      </section>

      {/* TASK 2: TIME COMPRESSION (MINUTES / HOURS / DAYS VS WEEKS / MONTHS / YEARS) */}
      <section id="time-compression" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200/60 inline-block mb-3">
            Task 2 · Time Compression
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Compounding Time = Minutes / Hours / Days
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Compressing the cycle from months into continuous autonomous loops: Real-time Sense, Hourly Quantify, Daily Automate, Weekly Reorganize.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Traditional Lean */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-2">
              TRADITIONAL LEAN • WEEKS / MONTHS / YEARS
            </span>
            <div className="space-y-4 mb-6">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <strong className="text-xs font-bold text-slate-900 block">Weeks to Diagnose</strong>
                <span className="text-xs text-slate-600">Manual 5-Why gemba walks &amp; paper Value Stream Mapping (VSM).</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <strong className="text-xs font-bold text-slate-900 block">Months to Elevate</strong>
                <span className="text-xs text-slate-600">CAPA meetings, offline kaizen committees, and slow pilot changes.</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <strong className="text-xs font-bold text-slate-900 block">Years to Compound</strong>
                <span className="text-xs text-slate-600">Culture shift, training turnover, and gradual fading of gains.</span>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-200 text-xs text-slate-600 font-mono">
              Outcome: <strong className="text-slate-900">$120K in 90 days</strong> • Linear V = V₀ + k·t
            </div>
          </div>

          {/* Lean AI Value Engineering */}
          <div className="p-6 rounded-3xl bg-slate-950 text-white border border-indigo-900/60 shadow-xl">
            <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider block mb-2">
              LEAN AI VALUE ENGINEERING • MINUTES / HOURS / DAYS
            </span>
            <div className="space-y-4 mb-6">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <strong className="text-xs font-bold text-white block">Minutes to Sense</strong>
                <span className="text-xs text-slate-300">Perception agents fuse MES, SCADA &amp; IoT in &lt;4 minutes.</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <strong className="text-xs font-bold text-white block">Hours to Quantify &amp; Automate</strong>
                <span className="text-xs text-slate-300">Drum-Buffer-Rope throttle, auto-Andon triggers, and skill routing.</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <strong className="text-xs font-bold text-white block">Days to Reorganize</strong>
                <span className="text-xs text-slate-300">Self-organizing cells establish new baseline V₀ autonomously.</span>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800 text-xs text-indigo-300 font-mono">
              Outcome: <strong className="text-cyan-400">$890K in 90 days (7.4x)</strong> • Exponential V(t)
            </div>
          </div>
        </div>

        {/* 0-90 Days Timeline */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-6">
            Exponential Impact Curve • 0–90 Days Execution Milestones
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-mono font-bold text-blue-600 block mb-1">DAY 03</span>
              <h5 className="font-bold text-slate-900 text-xs mb-1">Constraint Identified</h5>
              <p className="text-[11px] text-slate-600">Perception agents fuse MES/IoT data in &lt;4min to locate bottleneck.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-mono font-bold text-indigo-600 block mb-1">DAY 12</span>
              <h5 className="font-bold text-slate-900 text-xs mb-1">First Elevation</h5>
              <p className="text-[11px] text-slate-600">OTIF +14% lift unlocks first tranches of operating working capital.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-mono font-bold text-purple-600 block mb-1">DAY 23</span>
              <h5 className="font-bold text-slate-900 text-xs mb-1">Capacity Unlocks Innovation</h5>
              <p className="text-[11px] text-slate-600">Freed machine hours enable launch of 2 new high-margin service lines.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-mono font-bold text-emerald-600 block mb-1">DAY 45</span>
              <h5 className="font-bold text-slate-900 text-xs mb-1">Self-Org Extends</h5>
              <p className="text-[11px] text-slate-600">Agents autonomously expand policy optimization to adjacent lines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 03: AGENT ARCHITECTURE — 7-LAYER COMPOUND-AI STACK */}
      <section id="compound-ai-stack" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200/60 inline-block mb-3">
            03 — Agent Architecture
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            7-Layer Compound-AI™ Stack
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Recursive Self-Improvement Architecture: Higher layers improve lower layers. L6 retrains L2 detectors; L7 reorganizes L5 execution topology when constraints shift.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Stack list */}
          <div className="lg:col-span-5 space-y-2">
            {compoundStackLayers.map((layer, idx) => (
              <button
                key={layer.layer}
                type="button"
                onClick={() => setActiveStackLayer(idx)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                  activeStackLayer === idx
                    ? 'bg-slate-900 text-white border-purple-500 shadow-md'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono font-black px-2 py-0.5 rounded ${
                    activeStackLayer === idx ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {layer.layer}
                  </span>
                  <span className="text-xs font-bold">{layer.name}</span>
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-wider ${
                  activeStackLayer === idx ? 'text-purple-300' : 'text-slate-400'
                }`}>
                  {layer.badge}
                </span>
              </button>
            ))}
          </div>

          {/* Active Layer Deep Dive Card */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-950 text-white border border-purple-900/60 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-mono font-black text-purple-400">
                    {compoundStackLayers[activeStackLayer].layer}
                  </span>
                  <h4 className="text-xl font-bold text-white">
                    {compoundStackLayers[activeStackLayer].name}
                  </h4>
                </div>
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-purple-950 border border-purple-700 text-purple-300">
                  {compoundStackLayers[activeStackLayer].type}
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {compoundStackLayers[activeStackLayer].desc}
              </p>

              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-1.5 flex items-center gap-1.5">
                  <RefreshCw size={13} />
                  Recursive Upward Feedback Loop
                </span>
                <p className="text-xs text-indigo-200/90 leading-relaxed">
                  {compoundStackLayers[activeStackLayer].recursive}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Higher layers rewrite lower-layer control policies</span>
              <span className="text-purple-400 font-mono">Self-Organizing Topology</span>
            </div>
          </div>
        </div>
      </section>

      {/* TASK 3: FULL OS — AI ACROSS 25 METHODOLOGIES */}
      <section id="full-methodologies-os" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
            Task 3 · Full OS
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            AI Application Across Methodologies — The Full OS
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Lean (DOWNTIME, TPS, Jidoka, SMED) • Six Sigma (DMAIC, SPC, FMEA, Cpk) • TOC/CCPM (5 Focusing Steps, DBR, Fever Chart) • Extended (FAST, TPM, Digital Twin, Process Mining).
          </p>
        </div>

        {/* Group Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(Object.keys(methodologyGroups) as Array<keyof typeof methodologyGroups>).map((grpKey) => {
            const grp = methodologyGroups[grpKey]
            const isSelected = selectedMethodGroup === grpKey
            return (
              <button
                key={grpKey}
                type="button"
                onClick={() => setSelectedMethodGroup(grpKey)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {grp.name}
              </button>
            )
          })}
        </div>

        {/* Method Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {methodologyGroups[selectedMethodGroup].items.map((method) => (
            <div
              key={method.name}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between"
              style={{ borderLeftWidth: '4px', borderLeftColor: '#0F3DDE' }}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-extrabold text-slate-900 text-sm">{method.name}</h4>
                  <span className="text-[10px] font-mono uppercase bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full font-bold">
                    AI Agent
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mb-2">
                  <strong className="text-slate-700">Classic:</strong> {method.classic}
                </div>
                <div className="text-[11px] text-rose-600 mb-3 bg-rose-50/60 p-2 rounded-lg border border-rose-100">
                  <strong>Pain:</strong> {method.pain}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  AI Agent &amp; Impact
                </span>
                <p className="text-xs font-semibold text-slate-800 mb-1">{method.agent}</p>
                <div className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-1 rounded inline-block">
                  → {method.impact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEW: THE OPERATING SYSTEM — WASTES, VARIATION & CONSTRAINTS */}
      <section id="operating-system-breakdown" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200/60 inline-block mb-3">
            The Operating System
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Wastes, Variation &amp; Constraints + AI Impact
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Every waste, variation source, and constraint has a continuous Sense → Quantify → Automate → Compound agent loop.
          </p>
        </div>

        {/* Sub-tabs */}
        <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200 mb-6">
          <button
            type="button"
            onClick={() => setOsTab('wastes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              osTab === 'wastes' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            A: 8 Lean Wastes (DOWNTIME)
          </button>
          <button
            type="button"
            onClick={() => setOsTab('sigma')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              osTab === 'sigma' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            B: Six Sigma Variation Killers
          </button>
          <button
            type="button"
            onClick={() => setOsTab('toc')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              osTab === 'toc' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            C: TOC &amp; Critical Chain
          </button>
          <button
            type="button"
            onClick={() => setOsTab('matrix')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              osTab === 'matrix' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            D: AI Impact Matrix
          </button>
        </div>

        {/* TAB A: 8 LEAN WASTES */}
        {osTab === 'wastes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {downtimeWastes.map((waste) => (
              <div
                key={waste.letter}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-indigo-400 transition-all flex flex-col justify-between"
                style={{ borderLeftWidth: '4px', borderLeftColor: '#0F3DDE' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl font-black text-indigo-700">{waste.letter}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
                      {waste.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2">{waste.name}</h4>
                  <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
                    <strong className="text-slate-700">Classic:</strong> {waste.classic}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-xl">
                  <strong className="text-indigo-600 block mb-1">AI Agent Action:</strong>
                  {waste.aiImpact}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB B: SIX SIGMA */}
        {osTab === 'sigma' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs" style={{ borderLeftWidth: '4px', borderLeftColor: '#0F3DDE' }}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-900 text-sm">DMAIC Digital Agent</h4>
                <span className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded">45d → 12d</span>
              </div>
              <p className="text-xs text-slate-600 mb-3">Auto-generates charter from waste signals, process-mining for Measure, ML root-cause for Analyze, closed-loop Control via L7 Governance.</p>
              <div className="text-[11px] font-bold text-indigo-700">3.7x faster problem resolution</div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs" style={{ borderLeftWidth: '4px', borderLeftColor: '#0F3DDE' }}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-900 text-sm">Vision MSA Agent</h4>
                <span className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded">R&amp;R &lt;10%</span>
              </div>
              <p className="text-xs text-slate-600 mb-3">Cross-checks camera inspection vs. manual gages, executes automated Gage R&amp;R, and catches measurement drift in &lt;200ms.</p>
              <div className="text-[11px] font-bold text-indigo-700">Prevents false SPC alarms -62%</div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs" style={{ borderLeftWidth: '4px', borderLeftColor: '#0F3DDE' }}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-900 text-sm">SPC-Drift Agent</h4>
                <span className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded">Predict 2h Early</span>
              </div>
              <p className="text-xs text-slate-600 mb-3">Auto-recalculates control limits, predicts UCL/LCL violations 2 hours ahead via LSTM, and triggers automated tool offsets.</p>
              <div className="text-[11px] font-bold text-indigo-700">False alarms -62% · Cpk +0.6</div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs" style={{ borderLeftWidth: '4px', borderLeftColor: '#0F3DDE' }}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-900 text-sm">FMEA Knowledge Agent</h4>
                <span className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded">CAPA 3x Faster</span>
              </div>
              <p className="text-xs text-slate-600 mb-3">Mines MES deviations to dynamically re-score S×O×D RPN, auto-triggers action when RPN &gt;120, and maintains a living digital risk register.</p>
              <div className="text-[11px] font-bold text-indigo-700">CAPA cycle 18d → 6d · RPN -38%</div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs" style={{ borderLeftWidth: '4px', borderLeftColor: '#0F3DDE' }}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-900 text-sm">Cpk Live Agent</h4>
                <span className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded">0.87 → 1.44</span>
              </div>
              <p className="text-xs text-slate-600 mb-3">Streams telemetry from machinery, forecasts capability drops 4 hours ahead, and executes tool offsets via L5 Orchestration.</p>
              <div className="text-[11px] font-bold text-indigo-700">Defect rate 6k PPM → 180 PPM</div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs" style={{ borderLeftWidth: '4px', borderLeftColor: '#0F3DDE' }}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-900 text-sm">Auto Hypothesis Testing</h4>
                <span className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded">p &lt; 0.05 Auto</span>
              </div>
              <p className="text-xs text-slate-600 mb-3">Conducts automated A/B tests and statistical Design of Experiments (DOE) on agent dispatch rules to confirm improvement without MBB bottleneck.</p>
              <div className="text-[11px] font-bold text-indigo-700">120 DOE experiments/quarter</div>
            </div>
          </div>
        )}

        {/* TAB C: TOC & CRITICAL CHAIN */}
        {osTab === 'toc' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs" style={{ borderLeftWidth: '4px', borderLeftColor: '#0F3DDE' }}>
              <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded font-bold uppercase mb-2 inline-block">
                5FS · 5 Focusing Steps
              </span>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">Constraint Monitor &amp; Elevation</h4>
              <p className="text-xs text-slate-600 mb-3">Fuses MES/IoT streams to identify active constraint in &lt;4min. Exploit via scheduling (L5), Subordinate via DBR, Elevate CapEx.</p>
              <span className="text-xs font-bold text-indigo-600">Detect &lt;4min · New drum in 12min</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs" style={{ borderLeftWidth: '4px', borderLeftColor: '#0F3DDE' }}>
              <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded font-bold uppercase mb-2 inline-block">
                DBR · Drum-Buffer-Rope
              </span>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">DBR Release Control Agent</h4>
              <p className="text-xs text-slate-600 mb-3">Rope throttles material release based on buffer consumption at the active drum. Eliminates bullwhip across multi-facility networks.</p>
              <span className="text-xs font-bold text-indigo-600">WIP -32% · Transfers 18% → 7%</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs" style={{ borderLeftWidth: '4px', borderLeftColor: '#0F3DDE' }}>
              <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded font-bold uppercase mb-2 inline-block">
                BM · Buffer Management
              </span>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">Buffer Burn Rate ML</h4>
              <p className="text-xs text-slate-600 mb-3">Color zones (Green/Yellow/Red/Black). ML predicts buffer penetration 90 minutes early and triggers auto-expedite before line starvation.</p>
              <span className="text-xs font-bold text-indigo-600">Stockouts -68% · 90min early notice</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs" style={{ borderLeftWidth: '4px', borderLeftColor: '#0F3DDE' }}>
              <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded font-bold uppercase mb-2 inline-block">
                CC · Critical Chain
              </span>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">CCPM Resource Resolver</h4>
              <p className="text-xs text-slate-600 mb-3">Resolves resource contention and bad multitasking across engineering teams using dynamic RFID/Skill matrix coordination.</p>
              <span className="text-xs font-bold text-indigo-600">Project duration -23% · Overload -41%</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs" style={{ borderLeftWidth: '4px', borderLeftColor: '#0F3DDE' }}>
              <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded font-bold uppercase mb-2 inline-block">
                PB · Fever Chart Early Warning
              </span>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">Fever Chart Real-Time Agent</h4>
              <p className="text-xs text-slate-600 mb-3">Tracks buffer consumption vs. chain completion. Automatically triggers L7 escalation when tracking into Red territory.</p>
              <span className="text-xs font-bold text-indigo-600">On-Time Delivery 78% → 94%</span>
            </div>
          </div>
        )}

        {/* TAB D: AI IMPACT MATRIX */}
        {osTab === 'matrix' && (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3.5">Category / Row</th>
                  <th className="p-3.5">Sense (Detection)</th>
                  <th className="p-3.5">Quantify ($ Impact)</th>
                  <th className="p-3.5">Automate (Agent Action)</th>
                  <th className="p-3.5">Compound (Recursive)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {impactMatrixData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded mr-1.5 ${
                        row.type === 'WASTE' ? 'bg-red-50 text-red-700' : row.type === 'VARIATION' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
                      }`}>
                        {row.type}
                      </span>
                      {row.category}
                    </td>
                    <td className="p-3.5 text-slate-600">{row.sense}</td>
                    <td className="p-3.5 font-mono font-semibold text-rose-600">{row.quantify}</td>
                    <td className="p-3.5 text-indigo-700 font-medium">{row.automate}</td>
                    <td className="p-3.5 text-purple-700 font-semibold">{row.compound}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 05: DETAILED COMPOUNDING USE CASES (4 DETAILED PLAYS) */}
      <section id="compounding-use-cases" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200/60 inline-block mb-3">
            05 — Mode Example Use Cases
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            4 Detailed Compounding Plays
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Examining how autonomous agent feedback loops continuously free operating capacity to fund self-organization beyond initial scope.
          </p>
        </div>

        {/* Use case tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {detailedUseCases.map((uc, idx) => (
            <button
              key={uc.id}
              type="button"
              onClick={() => setSelectedUseCase(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedUseCase === idx
                  ? 'bg-slate-950 text-white border-purple-500 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {uc.title}
            </button>
          ))}
        </div>

        {/* Selected Use Case Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 text-white border border-indigo-900/60 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-1">
                {detailedUseCases[selectedUseCase].subtitle}
              </span>
              <h3 className="text-xl sm:text-3xl font-bold text-white">
                {detailedUseCases[selectedUseCase].title}
              </h3>
            </div>
            <div className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-indigo-950 border border-indigo-700 text-indigo-300">
              {detailedUseCases[selectedUseCase].stats}
            </div>
          </div>

          {/* 3 KPI Cards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {detailedUseCases[selectedUseCase].kpis.map((kpi, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-0.5">{kpi.label}</span>
                <span className="text-lg sm:text-2xl font-black text-cyan-400 font-mono">{kpi.value}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Deployed Agents */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                <Cpu size={14} />
                Agents Deployed
              </h4>
              <ul className="space-y-2">
                {detailedUseCases[selectedUseCase].agents.map((agent, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-indigo-400 shrink-0" />
                    <span>{agent}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Compounding Mechanism */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-2">
                  <Workflow size={14} />
                  Compounding Mechanism
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {detailedUseCases[selectedUseCase].mechanism}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-800/60 text-xs text-cyan-300 font-bold">
                ★ {detailedUseCases[selectedUseCase].outcomeBadge}
              </div>
            </div>
          </div>

          {/* Freed Resource Callout */}
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-200">
            <strong className="text-emerald-400 block mb-0.5">Compounding Extensibility:</strong>
            {detailedUseCases[selectedUseCase].freedResource}
          </div>
        </div>

        {/* 3 Secondary Use Case Cards (E-comm, Sustainability, Life Sciences) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase">E-Commerce</span>
            <h4 className="font-bold text-slate-900 text-sm mt-2 mb-1">Warehouse Slotting &amp; Pick-Path</h4>
            <p className="text-xs text-slate-600 mb-2">Slotting Perception + Path Diagnostic + Cart Execution. Travel -27%, pick rate +34%.</p>
            <span className="text-[11px] font-bold text-emerald-600">Pick +34% · Compounding</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded uppercase">Sustainability</span>
            <h4 className="font-bold text-slate-900 text-sm mt-2 mb-1">Energy &amp; Utility Peak Shaving</h4>
            <p className="text-xs text-slate-600 mb-2">Load Perception + Peak Diagnostic + BMS Execution. Shifts loads to thermal buffer.</p>
            <span className="text-[11px] font-bold text-emerald-600">Peak -23% · Compounding</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded uppercase">Life Sciences</span>
            <h4 className="font-bold text-slate-900 text-sm mt-2 mb-1">Quality Lab &amp; Deviation CAPA</h4>
            <p className="text-xs text-slate-600 mb-2">LIMS Perception + Deviation Diagnostic + QMS Execution. Resolves root cause 3x faster.</p>
            <span className="text-[11px] font-bold text-emerald-600">CAPA 3x Faster · Compounding</span>
          </div>
        </div>
      </section>

      {/* 06: IMPLEMENTATION FRAMEWORK & OUTCOMES */}
      <section id="implementation-outcomes" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200/60 inline-block mb-3">
            06 — Implementation Framework
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            6 Steps to Compounding — 90 Days to Self-Evolution
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Structured roadmap from initial value stream scan to fully autonomous self-organizing cells.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-lg font-black text-indigo-600 block mb-1 font-mono">01</span>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Discover</h4>
            <p className="text-xs text-slate-600">Value Stream + ToC scan, 120+ waste signatures, and live constraint mapping.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-lg font-black text-indigo-600 block mb-1 font-mono">02</span>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Deploy L1–L3</h4>
            <p className="text-xs text-slate-600">Perception, Diagnostic &amp; Monitoring agents — non-invasive MES/SCADA/ERP edge tap.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-lg font-black text-indigo-600 block mb-1 font-mono">03</span>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Actuate L4–L5</h4>
            <p className="text-xs text-slate-600">Decision twin + Execution orchestration with closed-loop pilot validation.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-lg font-black text-indigo-600 block mb-1 font-mono">04</span>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Learn L6</h4>
            <p className="text-xs text-slate-600">Continuous outcome capture, policy retraining, and dynamic skill matrix updates.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-lg font-black text-indigo-600 block mb-1 font-mono">05</span>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Reorganize L7</h4>
            <p className="text-xs text-slate-600">Governance audit, self-organizing cells, and automatic execution topology shifts.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-lg font-black text-indigo-600 block mb-1 font-mono">06</span>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Compound</h4>
            <p className="text-xs text-slate-600">Freed working capital funds additional sensors, setting a higher baseline V₀ and repeating.</p>
          </div>
        </div>

        {/* 07: OUTCOMES & TCO TABLE */}
        <div className="max-w-3xl mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60 inline-block mb-3">
            07 — Outcomes &amp; TCO
          </span>
          <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Technical → Operational → Financial Outcomes
          </h3>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs mb-12">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3.5">Technical Metric</th>
                <th className="p-3.5">Operational Lift</th>
                <th className="p-3.5">Financial Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/80">
                <td className="p-3.5 font-bold text-slate-900">Constraint Detection &lt; 4 min</td>
                <td className="p-3.5 text-slate-700">OTIF 82 → 96%, OEE 61 → 82%</td>
                <td className="p-3.5 text-emerald-600 font-bold">Revenue +$2.1M / line</td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="p-3.5 font-bold text-slate-900">Waste Auto-Classify 94%</td>
                <td className="p-3.5 text-slate-700">Waiting -58%, Transport -31%</td>
                <td className="p-3.5 text-emerald-600 font-bold">Working capital -25% to -32%</td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="p-3.5 font-bold text-slate-900">Policy Update &lt; 24h</td>
                <td className="p-3.5 text-slate-700">Changeover 54\' → 23\', CAPA 3x</td>
                <td className="p-3.5 text-emerald-600 font-bold">Opex -12% to -18%, Fuel -18%</td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="p-3.5 font-bold text-slate-900">Self-Org Topology Shift</td>
                <td className="p-3.5 text-slate-700">Service +15%, 2 new service lines</td>
                <td className="p-3.5 text-emerald-600 font-bold">TCO Payback in 5.8 months</td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="p-3.5 font-bold text-slate-900">Digital Twin Accuracy 91%</td>
                <td className="p-3.5 text-slate-700">Inventory in transit -25%</td>
                <td className="p-3.5 text-emerald-600 font-bold">Inventory turns +1.8x</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* WHY TRUSTGRID.AI DIFFERENTIATORS */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 mb-12">
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-4">
            Why TrustGrid.ai: The Only Lean AI That Reorganizes Itself
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <span className="text-cyan-400 font-bold">•</span>
              <span><strong>Native MES/SCADA/ERP connectors:</strong> No rip &amp; replace; 2-week non-invasive perception layer deployment.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-indigo-400 font-bold">•</span>
              <span><strong>7-layer recursive stack:</strong> Higher layers continuously retrain and improve lower layers — not just passive dashboards.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-purple-400 font-bold">•</span>
              <span><strong>Self-organizing cells:</strong> When the constraint shifts, execution topology shifts automatically across lines.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>Governance &amp; Safety (L7):</strong> Audit logs, escalation matrices, and hardware safety interlocks built for regulated ops.</span>
            </div>
            <div className="flex items-start gap-2.5 col-span-1 md:col-span-2">
              <span className="text-blue-400 font-bold">•</span>
              <span><strong>Freed capacity funds expansion:</strong> Compounding extends beyond the initial project scope by mathematical design.</span>
            </div>
          </div>
        </div>

        {/* NEXT STEP: 10-DAY DIAGNOSTIC CTA CARD */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white relative overflow-hidden shadow-2xl border border-indigo-800/80">
          <div className="max-w-2xl relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-900/60 px-3 py-1 rounded-full border border-indigo-600">
                10-Day Diagnostic
              </span>
              <span className="text-xs font-semibold text-slate-300">
                Boardroom-Ready 25:16 Deliverable
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              AI Lean Value Engineering Diagnostic
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              Constraint map + 120 waste signatures + TTM model + compounding simulation for your highest-value flow. Delivered as an executive, CFO-ready blueprint.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Input</span>
                <strong className="text-white">MES + Shift Logs</strong>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Output</span>
                <strong className="text-white">Tailored Agent Blueprint</strong>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Outcome</span>
                <strong className="text-emerald-400">Verified Pilot ROI Model</strong>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/book-ai-diagnostic?solution=ai-value-engineering"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg transition-all"
              >
                <span>Schedule 10-Day Diagnostic</span>
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 transition-all"
              >
                <span>Consult Value Engineers</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Brand Line */}
        <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
          <span className="font-mono text-[11px]">
            TRUSTGRID.AI — Full-Spectrum AI Engineering | Diagnose. Agent. Learn. Organize. Optimize. Compound.
          </span>
          <span className="font-semibold text-indigo-600">
            © TRUSTGRID.AI • AI VALUE ENGINEERING
          </span>
        </div>
      </section>
    </div>
  )
}

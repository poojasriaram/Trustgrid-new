'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  TrendingUp,
  Workflow,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldCheck,
  Activity,
  Users,
  Target,
  FileText,
  Boxes,
  Zap,
  Award,
  ChevronRight,
  Database,
  Lock,
  Compass,
  AlertTriangle,
  Flame,
  Check
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default function AIValueEngineeringPracticePage() {
  const [activeStage, setActiveStage] = useState<number>(0)
  const [selectedTech, setSelectedTech] = useState<string | null>(null)

  const stagesData = [
    {
      num: '01',
      id: 'discover',
      title: 'Discover',
      subtitle: 'Value Discovery',
      objective: 'Find where value is trapped and who is allowed to claim it.',
      deliverables: [
        'Value pool sized from the P&L, not from a use-case list',
        'Binding constraint named — the queue, approval or handoff that caps throughput',
        'Value owner identified and the KPI they already report agreed'
      ],
      exitGate: 'Exits when the owner accepts the KPI'
    },
    {
      num: '02',
      id: 'design',
      title: 'Design',
      subtitle: 'Value Framing',
      objective: 'Convert an opportunity into a testable, costed, falsifiable claim.',
      deliverables: [
        'Baseline measured and frozen, with its source system named',
        'Success threshold pre-registered before anything is built',
        'Total cost of ownership modelled — build, run, assure, change'
      ],
      exitGate: 'Exits when owner and Finance sign the frame'
    },
    {
      num: '03',
      id: 'deploy',
      title: 'Deploy',
      subtitle: 'Value Delivery',
      objective: 'Get the thinnest end-to-end path into production without losing the evidence.',
      deliverables: [
        'Vertical slice used by an operator on real work, unaided',
        'Accuracy measured by segment, not as an aggregate score',
        'Assurance evidence captured as built, not reconstructed'
      ],
      exitGate: 'Exits when PoC and PoV are passed'
    },
    {
      num: '04',
      id: 'perform',
      title: 'Perform',
      subtitle: 'Repeatable Realization',
      objective: 'Turn a result into a run-rate that survives the quarter.',
      deliverables: [
        'Adoption at habitual use, not entitlement or a first login',
        'The superseded process retired, or the benefit restated as capacity',
        'Three consecutive cycles signed by Finance'
      ],
      exitGate: 'Exits when a run-rate claim is licensed'
    },
    {
      num: '05',
      id: 'prove',
      title: 'Prove',
      subtitle: 'Value Assurance',
      objective: 'Make the outcome defensible without us in the room.',
      deliverables: [
        'Assurance dossier complete and versioned with the system',
        'Obligations mapped to controls, with owners and dates',
        'Client staff certified to operate, and the record kept'
      ],
      exitGate: 'Exits when attestation is signed'
    }
  ]

  const workstreamsMatrix = [
    {
      stream: 'Value',
      discover: 'Size the pool; name the owner',
      design: 'Baseline locked; threshold set',
      deploy: 'First measured lift',
      perform: 'Three signed cycles',
      prove: 'Ledger audit trail'
    },
    {
      stream: 'Data',
      discover: 'Source inventory; quality probe',
      design: 'Pipeline designed; lineage wired',
      deploy: 'Live feeds; monitoring on',
      perform: 'Drift and freshness checks',
      prove: 'Retention and deletion evidence'
    },
    {
      stream: 'Engineering',
      discover: 'Constraint and feasibility scan',
      design: 'Proof of Concept on real sample',
      deploy: 'Vertical slice in production',
      perform: 'SLOs held; cost per outcome',
      prove: 'Runbooks; client commits'
    },
    {
      stream: 'Assurance',
      discover: 'Risk class; obligations screened',
      design: 'Controls mapped; DPIA/FRIA',
      deploy: 'Evidence captured as built',
      perform: 'Incidents logged; changes tested',
      prove: 'Dossier closed; attestation'
    }
  ]

  const technologiesInScope = [
    {
      id: 'agents',
      family: 'Agentic AI & copilots',
      valueTrapped: 'Judgement-heavy work: triage, drafting, research, exception handling',
      proof: 'PoV against a control; PoP on tail latency and failure modes',
      regime: 'EU AI Act, NIST AI RMF, ISO/IEC 42001, SR 11-7',
      icon: Cpu
    },
    {
      id: 'dlt',
      family: 'Blockchain / DLT',
      valueTrapped: 'Reconciliation and settlement cost between parties who do not trust each other; disputed audit trails',
      proof: 'Same transaction on- and off-ledger: exception rate, close time, dispute volume',
      regime: 'MiCA, DORA, AML/KYC, smart-contract audit, consortium governance',
      icon: Lock
    },
    {
      id: 'iot',
      family: 'IoT & edge',
      valueTrapped: 'Uptime, energy and yield visible only at the physical asset; data that exists but never reaches a decision',
      proof: 'Sensor coverage, false-positive rate at fleet scale, completeness of the signal chain',
      regime: 'IEC 62443 OT security, device certification, GDPR on telemetry',
      icon: Activity
    },
    {
      id: 'robotics',
      family: 'Robotics & AMR',
      valueTrapped: 'Throughput per hour, labour redeployment, incident rate — and the space between machines',
      proof: 'Cycle time, intervention frequency, signed safety case',
      regime: 'ISO 10218 / TS 15066, ISO 3691-4, ISO 13849, CE marking',
      icon: Boxes
    },
    {
      id: 'rpa',
      family: 'RPA & workflow automation',
      valueTrapped: 'FTE hours in repetitive work; error and rework rates at the seams',
      proof: 'Bot success rate, exception queue depth, maintenance load per bot at month nine',
      regime: 'SOX ITGC, least-privilege access, change management',
      icon: Workflow
    },
    {
      id: 'physical-ai',
      family: 'Physical AI (embodied)',
      valueTrapped: 'Adaptive physical work that fixed automation cannot reach — unstructured pick, inspect, move',
      proof: 'Success rate in unstructured settings, intervention rate, sim-to-real delta',
      regime: 'Machinery Regulation 2023/1230, functional safety, insurance',
      icon: Zap
    },
    {
      id: 'data-platform',
      family: 'Data & platform engineering',
      valueTrapped: 'Everything above: freshness, quality, lineage, and an estate nobody has optimised',
      proof: 'Data freshness, pipeline SLA, cost per pipeline, utilisation',
      regime: 'ISO 8000, BCBS 239, SOX ITGC, ISO 27001',
      icon: Database
    }
  ]

  const engagementModels = [
    {
      title: 'Value diagnostic',
      stage: 'Discover',
      objective: 'The board needs a decision, not a build.',
      duration: '3–5 weeks'
    },
    {
      title: 'Value sprint',
      stage: 'Discover → Design',
      objective: 'The case must be de-risked before anyone commits capital.',
      duration: '4–6 weeks'
    },
    {
      title: 'Proof engagement',
      stage: 'Design → Deploy',
      objective: 'Technical feasibility is the open question.',
      duration: '10–14 weeks'
    },
    {
      title: 'Deployment & banking',
      stage: 'Deploy → Perform',
      objective: 'Value is agreed; execution and adoption are the risk.',
      duration: '2–4 quarters'
    },
    {
      title: 'Embedded value engineering',
      stage: 'Any, ongoing',
      objective: 'Multiple use cases, one platform, compounding expected.',
      duration: 'Quarterly cycles'
    },
    {
      title: 'Value assurance & rescue',
      stage: 'Prove',
      objective: 'A programme has stalled, or an audit is coming.',
      duration: '6–12 weeks'
    }
  ]

  const fiveProofs = [
    {
      num: '1',
      name: 'Proof of Concept (PoC)',
      question: 'Can it work at all, on our data, in our building?',
      evidence: 'Task-level accuracy on a representative sample; failure taxonomy documented; long tail visible; physical constraints measured',
      stage: 'Produced in Design stage',
      licenses: 'Licenses spend on Framing and Deploy — nothing more',
      badge: 'FEASIBILITY'
    },
    {
      num: '2',
      name: 'Proof of Value (PoV)',
      question: 'Does it pay, here?',
      evidence: 'Locked baseline; control or matched cohort; identical metric both sides; confidence interval; decision on the lower bound',
      stage: 'Produced in Deploy stage',
      licenses: 'Licenses deployment and an in-flight benefit',
      badge: 'ECONOMIC LIFT'
    },
    {
      num: '3',
      name: 'Proof of Performance (PoP)',
      question: 'Does it hold at production standard?',
      evidence: 'SLOs attained; p95 and p99 latency; accuracy by segment; adversarial input; rollback tested; security and safety reviewed',
      stage: 'Produced in Deploy stage',
      licenses: 'Licenses operation and handover to a run team',
      badge: 'PRODUCTION HARDENING'
    },
    {
      num: '4',
      name: 'Proof of Recurring Value (PoRV)',
      question: 'Does it pay every cycle?',
      evidence: 'Three consecutive finance-signed cycles; adoption at activated and habitual use; attrition tracked; old process retired',
      stage: 'Produced in Perform stage',
      licenses: 'Licenses a run-rate claim and the removal of the pilot label',
      badge: 'RUN-RATE'
    },
    {
      num: '5',
      name: 'Proof of Compounding (PoComp)',
      question: 'Is the next one cheaper?',
      evidence: 'Deployment two vs one on cycle time, build cost, cost per outcome; named reuse; marginal cost per added use case',
      stage: 'Produced in Next Discover',
      licenses: 'Licenses calling this a practice — and pricing from a curve, not a guess',
      badge: 'COMPOUNDING CURVE'
    }
  ]

  const focalMatrixRows = [
    {
      stage: 'Value Discovery (Discover)',
      poc: { text: 'Sample scoped', produced: false },
      pov: { text: 'Threshold set', produced: false },
      pop: { text: 'SLOs agreed', produced: false },
      porv: { text: 'KPI and formula fixed', produced: false },
      pocomp: { text: 'Prior cycle compared', produced: false }
    },
    {
      stage: 'Value Framing (Design)',
      poc: { text: 'Feasibility proven', produced: true },
      pov: { text: 'Baseline locked', produced: false },
      pop: { text: 'Instrumented', produced: false },
      porv: { text: 'Measurement plan', produced: false },
      pocomp: { text: 'Priced into frame', produced: false }
    },
    {
      stage: 'Value Delivery (Deploy)',
      poc: { text: 'Re-used', produced: false },
      pov: { text: 'Lift vs control', produced: true },
      pop: { text: 'Production standard held', produced: true },
      porv: { text: 'Telemetry live', produced: false },
      pocomp: { text: 'Asset tagged', produced: false }
    },
    {
      stage: 'Repeatable Realization (Perform)',
      poc: { text: '—', produced: false, na: true },
      pov: { text: 'Re-checked', produced: false },
      pop: { text: 'Monitored', produced: false },
      porv: { text: 'Three signed cycles', produced: true },
      pocomp: { text: 'Cost curve measured', produced: false }
    },
    {
      stage: 'Value Assurance (Prove)',
      poc: { text: '—', produced: false, na: true },
      pov: { text: 'Audited', produced: false },
      pop: { text: 'Audited', produced: false },
      porv: { text: 'Attested', produced: false },
      pocomp: { text: 'Reviewed', produced: false }
    }
  ]

  const clientKeeps = [
    {
      title: 'Models and prompts',
      desc: 'With version history, and the eval sets that test them.'
    },
    {
      title: 'The pipeline',
      desc: 'In their repository, deployable by their engineers.'
    },
    {
      title: 'Runbooks',
      desc: 'Certified against by their staff, with the certification record.'
    },
    {
      title: 'The evidence',
      desc: 'A dossier they can hand to an auditor without us in the room.'
    },
    {
      title: 'The economics',
      desc: 'A cost model their Finance team owns and can update.'
    },
    {
      title: 'And nothing else',
      desc: 'No dependency, no retainer implied by architecture, no lock-in dressed as partnership.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <SiteHeader />

      <main className="relative pt-24 pb-20">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-600/5 via-indigo-600/2 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-600 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight size={12} className="text-slate-600" />
            <Link href="/practice-areas" className="hover:text-blue-600 transition-colors">Practice Areas</Link>
            <ChevronRight size={12} className="text-slate-600" />
            <span className="text-blue-600 font-semibold">Section 4 · Division 1 · Delivery Practice</span>
          </nav>

          {/* Hero Header */}
          <header className="mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Section 4 · Division 1 · Delivery Practice
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              AI Value Engineering <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-300 bg-clip-text text-transparent">Practice</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-4xl leading-relaxed font-normal mb-8">
              Forward deployment for value delivery — across agents, data, robotics, IoT, RPA, DLT and physical AI. 
              Five stages, four engineers, five proofs, one number Finance signs.
            </p>

            {/* Quick Stats Pill Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/methodology-engine"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-slate-900 text-xs font-mono font-semibold transition-all shadow-sm hover:shadow-blue-500/20"
              >
                <span>Methodology Engine</span>
                <ArrowUpRight size={13} />
              </Link>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-mono font-medium">
                <span className="text-blue-600 font-bold">7</span> technology families in scope
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-mono font-medium">
                <span className="text-emerald-600 font-bold">5</span> stage gates
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-mono font-medium">
                <span className="text-indigo-600 font-bold">≤4</span> engineers per pod
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-mono font-medium">
                <span className="text-amber-600 font-bold">1</span> number Finance signs
              </div>
            </div>
          </header>

          {/* Section 4.0: What this practice is */}
          <section id="what-this-is" className="mb-20 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="px-2.5 py-1 rounded bg-blue-900/40 border border-blue-500/30 text-blue-600 font-mono text-xs font-bold">
                4.0
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                What this practice is
              </h2>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                <strong className="text-slate-900">Forward Deployed Engineering</strong> described where we sit. <strong className="text-slate-900">AI Value Engineering</strong> describes what we are accountable for: a number Finance signs. The practice is one thing with two halves — the discipline of defining, engineering and proving value, delivered by engineers deployed inside the client&apos;s environment.
              </p>
              <p>
                It is not a horizontal function: there is no separate budget owner, because the budget owner is the vertical executive buying the outcome. It is not a vertical: there is no industry P&L. It is the delivery practice that carries Divisions 2 and 3 — and it is deliberately not an agent-only practice. The same five stages and the same five proofs apply to a data pipeline, a robotic cell, a sensor fleet or a settlement ledger.
              </p>
              <p>
                It runs on the methodology engine. Deterministic stage gates, named industrial methods, and value that compounds rather than decays —{' '}
                <Link 
                  href="/methodology-engine" 
                  className="text-blue-600 hover:text-blue-300 underline font-mono text-xs inline-flex items-center gap-1"
                >
                  trustgrid.ai/methodology-engine <ArrowRight size={12} />
                </Link>. This section is the delivery practice that operates it.
              </p>

              {/* The Test of the Practice Callout */}
              <div className="mt-6 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-blue-950/60 to-slate-900/80 border-l-4 border-blue-500 border-t border-r border-b border-slate-200">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="text-blue-600 shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1 font-mono">
                      The Test of the Practice
                    </h4>
                    <p className="text-sm text-slate-600 italic">
                      &ldquo;If a client cannot say which of the five proofs they are currently being shown, the pod has stopped doing value engineering and become a project team with better vocabulary.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4.1: The value lifecycle — five stages, five gates */}
          <section id="lifecycle" className="mb-20 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-2.5 py-1 rounded bg-blue-900/40 border border-blue-500/30 text-blue-600 font-mono text-xs font-bold">
                4.1
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                The value lifecycle — five stages, five gates
              </h2>
            </div>
            
            <p className="text-slate-600 text-sm sm:text-base mb-8 max-w-4xl">
              Every engagement runs the same five stages in the same order, whether it lasts six weeks or four quarters. 
              The stage names are the client&apos;s language, not ours. Each stage exits on a signature, not a consensus.
            </p>

            {/* 5 Stages Interactive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
              {stagesData.map((stage, idx) => {
                const isSelected = activeStage === idx
                return (
                  <div
                    key={stage.id}
                    onClick={() => setActiveStage(idx)}
                    className={`cursor-pointer rounded-xl p-5 border transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-blue-950/50 border-blue-500 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/40'
                        : 'bg-white border-slate-200 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`font-mono text-xs font-extrabold px-2 py-0.5 rounded ${
                          isSelected ? 'bg-blue-600 text-slate-900' : 'bg-slate-800 text-slate-600'
                        }`}>
                          STAGE {stage.num}
                        </span>
                        <span className="text-[11px] font-mono text-slate-600">{stage.title}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-2">{stage.subtitle}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        <strong className="text-blue-600">Objective:</strong> {stage.objective}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200">
                      <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                        Gate Exit
                      </span>
                      <span className="text-xs text-slate-600 font-medium">
                        {stage.exitGate}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Selected Stage Detail Panel */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 mb-12">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-blue-600 bg-blue-950/60 border border-blue-800/40 px-2.5 py-1 rounded">
                    STAGE {stagesData[activeStage].num} DEEP-DIVE
                  </span>
                  <h4 className="text-lg font-bold text-slate-900">
                    {stagesData[activeStage].subtitle} ({stagesData[activeStage].title})
                  </h4>
                </div>
                <span className="text-xs font-mono text-emerald-600 font-semibold bg-emerald-950/40 border border-emerald-800/30 px-3 py-1 rounded-full">
                  {stagesData[activeStage].exitGate}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {stagesData[activeStage].deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                    <CheckCircle2 size={15} className="text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-600 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Workstreams Running Through Every Stage */}
            <div className="mb-12">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                Workstreams running through every stage
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-5">
                Four workstreams run in parallel, not in sequence. Serial phases are the largest single cause of elapsed time in enterprise technology programmes.
              </p>

              <div className="overflow-x-auto border border-slate-200 rounded-xl bg-slate-50">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-white border-b border-slate-200 text-slate-600 font-mono text-[11px] uppercase tracking-wider">
                      <th className="py-3 px-4 font-bold text-slate-900">Workstream</th>
                      <th className="py-3 px-4">01 Discover</th>
                      <th className="py-3 px-4">02 Design</th>
                      <th className="py-3 px-4">03 Deploy</th>
                      <th className="py-3 px-4">04 Perform</th>
                      <th className="py-3 px-4">05 Prove</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70 text-slate-600 font-normal">
                    {workstreamsMatrix.map((row) => (
                      <tr key={row.stream} className="hover:bg-slate-900/40 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900 bg-slate-900/40">{row.stream}</td>
                        <td className="py-3.5 px-4">{row.discover}</td>
                        <td className="py-3.5 px-4">{row.design}</td>
                        <td className="py-3.5 px-4">{row.deploy}</td>
                        <td className="py-3.5 px-4">{row.perform}</td>
                        <td className="py-3.5 px-4">{row.prove}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AI Value Acceleration is the lifecycle, compressed */}
            <div className="bg-gradient-to-r from-blue-950/30 via-slate-900/80 to-slate-950 border border-slate-200 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-blue-600" />
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  AI Value Acceleration is the lifecycle, compressed
                </h3>
              </div>
              
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Acceleration is not a sixth stage and not a separate offering. It is what happens when the five stages run faster on each lap — because the assets are reusable, the evidence carries forward, and decisions are made in the room.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-mono text-xs font-bold text-blue-600 block mb-1">Lever 01 · Reusable assets</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Kits, connectors and eval sets mean Deploy does not start from zero. This is the only lever that improves with every engagement.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-mono text-xs font-bold text-indigo-600 block mb-1">Lever 02 · Parallel stages</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Data and assurance run alongside delivery. A serial assurance phase adds a quarter and no additional certainty.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-mono text-xs font-bold text-emerald-600 block mb-1">Lever 03 · One decision owner</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Every gate exits on a signature. Waiting for consensus is the largest component of elapsed time in most programmes.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 font-mono">
                <span className="text-slate-700 font-semibold">Measurement standard:</span> Measured as cycle time against the last cycle — not against a benchmark we invented. If the second engagement in an account takes as long as the first, acceleration is not happening.
              </div>
            </div>
          </section>

          {/* Section 4.2: Technologies in scope — not just agents */}
          <section id="technologies" className="mb-20 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-2.5 py-1 rounded bg-blue-900/40 border border-blue-500/30 text-blue-600 font-mono text-xs font-bold">
                4.2
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Technologies in scope — not just agents
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base mb-8 max-w-4xl leading-relaxed">
              The proof standard does not change with the technology. Only the evidence does: a robotics proof is won on cycle time and interventions, a DLT proof on reconciliation exceptions, an RPA proof on what happens in month nine. A practice that can only price agents has nothing to say when the value is in a sensor fleet.
            </p>

            {/* 7 Technologies Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl bg-slate-50 mb-8">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-white border-b border-slate-200 text-slate-600 font-mono text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-4 font-bold text-slate-900">Technology family</th>
                    <th className="py-3 px-4">Where the value is trapped</th>
                    <th className="py-3 px-4">The proof that decides it</th>
                    <th className="py-3 px-4">Assurance regime</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70 text-slate-600">
                  {technologiesInScope.map((tech) => {
                    const TechIcon = tech.icon
                    const isRowSelected = selectedTech === tech.id
                    return (
                      <tr 
                        key={tech.id} 
                        onClick={() => setSelectedTech(isRowSelected ? null : tech.id)}
                        className={`cursor-pointer transition-colors ${
                          isRowSelected ? 'bg-blue-950/40' : 'hover:bg-slate-900/40'
                        }`}
                      >
                        <td className="py-3.5 px-4 font-semibold text-slate-900 whitespace-nowrap">
                          <div className="flex items-center gap-2.5">
                            <TechIcon size={15} className="text-blue-600" />
                            <span>{tech.family}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-xs sm:text-sm leading-relaxed max-w-xs">{tech.valueTrapped}</td>
                        <td className="py-3.5 px-4 text-xs sm:text-sm leading-relaxed max-w-xs">{tech.proof}</td>
                        <td className="py-3.5 px-4 text-xs font-mono text-slate-600">{tech.regime}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Three Failure Modes Callout */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 mb-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={17} />
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                    Three technology-specific failure modes worth pricing in
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <strong>RPA</strong> banks fastest and decays fastest — <em>PoRV is the decisive proof, not PoV</em>. <strong>Robotics and physical AI</strong> move the TTV because commissioning changes the building, not just the software. And <strong>DLT value</strong> almost never comes from the ledger: it comes from removing a reconciliation step, which means the proof must be measured in the finance close, not in node throughput.
                  </p>
                </div>
              </div>
            </div>

            {/* The engineering toolkit */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 font-mono">
                The engineering toolkit
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                Named industrial methods, applied deliberately rather than improvised.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { name: 'Value Stream Mapping', stage: 'Discover', desc: 'Find the queue' },
                  { name: 'Theory of Constraints', stage: 'Discover', desc: 'Find the bottleneck' },
                  { name: 'FMEA', stage: 'Design', desc: 'Failure modes before build' },
                  { name: 'Poka-Yoke', stage: 'Deploy', desc: 'Error-proof the handoff' },
                  { name: 'SMED', stage: 'Deploy', desc: 'Cut changeover, physical or system' },
                  { name: 'FinOps', stage: 'Perform', desc: 'Cost per accepted outcome' },
                  { name: 'Throughput Accounting', stage: 'Perform', desc: 'Bank at the constraint' },
                  { name: 'DMAIC', stage: 'Prove', desc: 'Evidence discipline' }
                ].map((tool, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white border border-slate-200">
                    <span className="font-semibold text-xs text-slate-900 block mb-0.5">{tool.name}</span>
                    <span className="text-[10px] font-mono font-bold text-blue-600 block mb-1">
                      {tool.stage}
                    </span>
                    <span className="text-[11px] text-slate-600 block">{tool.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 4.3: The delivery cycle vs. a conventional engagement */}
          <section id="delivery-cycle" className="mb-20 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-2.5 py-1 rounded bg-blue-900/40 border border-blue-500/30 text-blue-600 font-mono text-xs font-bold">
                4.3
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                The delivery cycle vs. a conventional engagement
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base mb-8 max-w-4xl leading-relaxed">
              Conventional consulting runs a line: assess, recommend, build, hand over, close. Value appears in the business case at the start and in the status report at the end, and nobody is accountable for the gap. 
              The value cycle runs a loop instead — <span className="text-blue-600 font-medium">Discover → Design → Deploy → Perform → Prove</span>, then back to Discover with the assets and the evidence from the last lap.
            </p>

            <div className="overflow-x-auto border border-slate-200 rounded-xl bg-slate-50 mb-6">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-white border-b border-slate-200 text-slate-600 font-mono text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-4 font-bold text-slate-900 w-1/4">Dimension</th>
                    <th className="py-3 px-4 text-slate-600 w-3/8">Conventional engagement</th>
                    <th className="py-3 px-4 text-blue-600 font-bold w-3/8">The value cycle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70 text-slate-600">
                  {[
                    {
                      dimension: 'Starting point',
                      conventional: 'Scope and statement of work',
                      cycle: 'A number and its owner'
                    },
                    {
                      dimension: 'Sequence',
                      conventional: 'Assess → recommend → build → hand over → close',
                      cycle: 'Discover → design → deploy → perform → prove, then repeat'
                    },
                    {
                      dimension: 'Evidence',
                      conventional: 'Business case up front; status report at the end',
                      cycle: 'A proof at every gate; a ledger at the end'
                    },
                    {
                      dimension: 'Who builds',
                      conventional: 'Our team; the client observes',
                      cycle: 'Pod plus client engineers, committing from week one'
                    },
                    {
                      dimension: 'Ending',
                      conventional: 'Handover and invoice',
                      cycle: 'Capability certificate; benefit still tracked'
                    },
                    {
                      dimension: 'Second act',
                      conventional: 'Starts from zero',
                      cycle: 'Starts from the assets, the proofs, and the cost curve'
                    }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900 bg-slate-900/40">{row.dimension}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.conventional}</td>
                      <td className="py-3.5 px-4 font-medium text-blue-300 bg-blue-950/20">{row.cycle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-slate-900/70 border border-slate-200 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong className="text-slate-900">The loop must close.</strong> A cycle that does not return to Discover is a project. Prove feeds the next Discovery with three things: reusable assets, a cost curve that prices the next case, and evidence that shortens the next assurance review. That return path is the first thing lost when a pod is managed as a fixed-scope project.
            </div>
          </section>

          {/* Section 4.4: The pod — four of ours, three of theirs */}
          <section id="pod" className="mb-20 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-2.5 py-1 rounded bg-blue-900/40 border border-blue-500/30 text-blue-600 font-mono text-xs font-bold">
                4.4
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                The pod — four of ours, three of theirs
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base mb-8">
              A fifth engineer on our side means the scope is too large, or the pod has quietly become a project team.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
              {/* TrustGrid Pod (Maximum 4) */}
              <div className="bg-slate-50 border border-blue-900/40 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <Users size={18} className="text-blue-600" />
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">Forward-deployed pod</h3>
                  </div>
                  <span className="font-mono text-xs font-bold text-blue-600 bg-blue-950/60 border border-blue-800 px-2.5 py-0.5 rounded">
                    Maximum 4
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      role: 'FDE Lead',
                      desc: 'The number, the relationship, the sequencing. Holds a P&L conversation and a code review in the same afternoon.'
                    },
                    {
                      role: 'Domain Engineer',
                      desc: 'The workflow and the industry content. Models the process and knows where it actually breaks — in a plant, a terminal or a ledger.'
                    },
                    {
                      role: 'AI Agentic Engineer',
                      desc: 'Agent design, tools, retrieval, evaluation. Builds the intelligent layer and owns its eval sets.'
                    },
                    {
                      role: 'AI Operational Engineer',
                      desc: 'Reliability, cost, deployment, monitoring. Runs it at 3am and holds cost per accepted outcome to target.'
                    }
                  ].map((p, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold text-sm text-blue-300 block mb-1 font-mono">{p.role}</span>
                      <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Side (Roles, not attendees) */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <Workflow size={18} className="text-indigo-600" />
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">Client side</h3>
                  </div>
                  <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-950/60 border border-indigo-800 px-2.5 py-0.5 rounded">
                    Roles, not attendees
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  {[
                    {
                      role: 'Client Product Lead',
                      desc: 'Priorities, trade-offs, and the decision at each gate.'
                    },
                    {
                      role: 'Client Project Lead',
                      desc: 'Dependencies, access, sign-offs, the path to production.'
                    },
                    {
                      role: 'Functional Lead',
                      desc: 'The process change, adoption, and retirement of the old way of working.'
                    }
                  ].map((c, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold text-sm text-indigo-300 block mb-1 font-mono">{c.role}</span>
                      <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-900/40 text-xs text-slate-600 leading-relaxed">
                  <strong className="text-blue-300">The functional lead is the role most often missing</strong> and most often the reason a benefit fails to repeat. A product lead can approve a deployment; only the functional lead can change how the work is actually done. Where the technology is physical, the domain engineer is an OT or robotics engineer — and the safety case is part of the deliverable, not an appendix.
                </div>
              </div>
            </div>
          </section>

          {/* Section 4.5: Engagement models (WITHOUT fixed pricing) */}
          <section id="engagement-models" className="mb-20 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-2.5 py-1 rounded bg-blue-900/40 border border-blue-500/30 text-blue-600 font-mono text-xs font-bold">
                4.5
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Engagement models
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base mb-8 max-w-4xl">
              Six shapes, each entering the lifecycle at a different stage. Choosing the wrong one is the most common commercial error: a proof sold to a client who needs a decision, or a diagnostic sold to a client who has already decided.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {engagementModels.map((model, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-slate-900/70 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-blue-600 bg-blue-950/60 border border-blue-900/40 px-2 py-0.5 rounded">
                        {model.stage}
                      </span>
                      <span className="font-mono text-xs text-slate-600">{model.duration}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">{model.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {model.objective}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Two Rules on Model Selection */}
            <div className="p-4 sm:p-5 rounded-xl bg-white border-l-4 border-amber-500 border-t border-r border-b border-slate-200 space-y-2">
              <h4 className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                Two rules on model selection
              </h4>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-1 list-disc list-inside">
                <li>Never sell a proof to a client whose real question is strategic — they will treat the proof as procrastination.</li>
                <li>Never sell deployment before Framing is signed — a deployment without a frame is a build with no definition of done.</li>
              </ul>
            </div>
          </section>

          {/* Section 4.6: The five proofs */}
          <section id="proofs" className="mb-20 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-2.5 py-1 rounded bg-blue-900/40 border border-blue-500/30 text-blue-600 font-mono text-xs font-bold">
                4.6
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                The five proofs
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base mb-8 max-w-4xl leading-relaxed">
              The proofs are the practice&apos;s evidence standard and the engine&apos;s stage gates in practice. 
              They escalate: each answers a harder question, and each is a gate to the next. All five are required; none can be skipped by asserting the one below it.
            </p>

            {/* 5 Proof Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-14">
              {fiveProofs.map((proof) => (
                <div key={proof.num} className="rounded-xl p-5 bg-slate-900/70 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-base font-extrabold text-blue-600">{proof.num}</span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-600">
                        {proof.badge}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">{proof.name}</h3>
                    <p className="text-xs font-medium text-slate-700 mb-3 italic">
                      &ldquo;{proof.question}&rdquo;
                    </p>
                    <p className="text-[11px] text-slate-600 leading-relaxed mb-4">
                      <strong className="text-slate-600">Evidence:</strong> {proof.evidence}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 space-y-1 text-[11px]">
                    <span className="font-mono text-blue-600 block">{proof.stage}</span>
                    <span className="text-slate-600 block font-normal">{proof.licenses}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* The Focal Value Creation Model Matrix */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">The Focal Value Creation Model</h3>
                  <p className="text-xs text-slate-600">
                    Operating model of the practice: Rows are value stages; columns are proofs.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-600">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-500 inline-block" /> Evidence produced
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2.5 h-2.5 rounded bg-slate-800 inline-block" /> Consumed or prepared
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white mb-6">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-200 text-slate-600 font-mono text-[11px] uppercase tracking-wider">
                      <th className="py-3 px-4 font-bold text-slate-900">Value stage ↓ / Proof →</th>
                      <th className="py-3 px-4">Proof of Concept</th>
                      <th className="py-3 px-4">Proof of Value</th>
                      <th className="py-3 px-4">Proof of Performance</th>
                      <th className="py-3 px-4">Proof of Recurring Value</th>
                      <th className="py-3 px-4">Proof of Compounding</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-600">
                    {focalMatrixRows.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-900/40 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-slate-900 bg-white whitespace-nowrap">{row.stage}</td>
                        <td className={`py-3.5 px-4 ${row.poc.produced ? 'bg-emerald-950/30 text-emerald-300 font-bold border-l-2 border-emerald-500' : row.poc.na ? 'text-slate-600' : ''}`}>
                          {row.poc.text} {row.poc.produced && '★'}
                        </td>
                        <td className={`py-3.5 px-4 ${row.pov.produced ? 'bg-emerald-950/30 text-emerald-300 font-bold border-l-2 border-emerald-500' : ''}`}>
                          {row.pov.text} {row.pov.produced && '★'}
                        </td>
                        <td className={`py-3.5 px-4 ${row.pop.produced ? 'bg-emerald-950/30 text-emerald-300 font-bold border-l-2 border-emerald-500' : ''}`}>
                          {row.pop.text} {row.pop.produced && '★'}
                        </td>
                        <td className={`py-3.5 px-4 ${row.porv.produced ? 'bg-emerald-950/30 text-emerald-300 font-bold border-l-2 border-emerald-500' : ''}`}>
                          {row.porv.text} {row.porv.produced && '★'}
                        </td>
                        <td className={`py-3.5 px-4 ${row.pocomp.produced ? 'bg-emerald-950/30 text-emerald-300 font-bold border-l-2 border-emerald-500' : ''}`}>
                          {row.pocomp.text}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed italic">
                <strong className="text-slate-600 not-italic">Why the model is shaped this way:</strong> PoC and PoV are produced in consecutive stages, which is why pilots feel fast and bank nothing. PoRV cannot be produced before month four, and PoComp cannot be produced inside the same cycle at all — it needs a second deployment to compare against. That is the structural reason compounding is rare: it is the only proof that cannot be manufactured within a single engagement.
              </p>
            </div>
          </section>

          {/* Section 4.7: Where value engineering sits in the stack */}
          <section id="stack" className="mb-20 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-2.5 py-1 rounded bg-blue-900/40 border border-blue-500/30 text-blue-600 font-mono text-xs font-bold">
                4.7
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Where value engineering sits in the stack
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base mb-8 max-w-4xl leading-relaxed">
              The{' '}
              <Link
                href="/methodology-engine"
                className="text-blue-600 hover:text-blue-300 underline font-mono text-xs inline-flex items-center gap-1"
              >
                methodology engine <ArrowRight size={12} />
              </Link>{' '}
              describes six vertically integrated tiers. Value engineering is not a layer on top of the stack — it is the discipline that prices every layer beneath it.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-12">
              {[
                {
                  tier: 'L01',
                  name: 'Infrastructure',
                  desc: 'GPU clusters, lossless fabrics, sovereign power, sensor estates — costed per accepted outcome, not per token or per device'
                },
                {
                  tier: 'L02',
                  name: 'Intelligence',
                  desc: 'Model serving, quantization, fine-tuning — chosen backwards from the cost target'
                },
                {
                  tier: 'L03',
                  name: 'Agents & devices',
                  desc: 'Tool access, memory, retrieval, actuators — evaluated against task-level thresholds, not aggregate scores'
                },
                {
                  tier: 'L04',
                  name: 'Operations',
                  desc: 'Self-healing execution, telemetry, Poka-Yoke gates — where PoP is won or lost'
                },
                {
                  tier: 'L05',
                  name: 'Governance',
                  desc: 'EU AI Act, ISO 42001, IEC 62443, SR 11-7 — evidence captured as built, not reconstructed'
                },
                {
                  tier: 'L06',
                  name: 'Business value',
                  desc: 'Unit economics, banked ledger, compounding curve — this practice\'s home tier'
                }
              ].map((t) => (
                <div key={t.tier} className="p-4 rounded-xl bg-slate-900/70 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-blue-600 bg-blue-950/60 border border-blue-900/40 px-2 py-0.5 rounded">
                      {t.tier}
                    </span>
                    <span className="text-xs font-semibold text-slate-900">{t.name}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>

            {/* Compounding, by design */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-6 font-mono">
                Compounding, by design
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    year: 'Year 1',
                    stage: 'Foundation',
                    desc: 'The pod is deployed. Baselines lock. The first proofs pass and the first number is banked.'
                  },
                  {
                    year: 'Year 2',
                    stage: 'Acceleration',
                    desc: 'Assets compound. Cycle time falls. The second and third deployments cost less than the first.'
                  },
                  {
                    year: 'Year 3',
                    stage: 'Compounding',
                    desc: 'Cost per outcome is on a declining curve. New cases are priced from evidence, not from estimates.'
                  },
                  {
                    year: 'Year N',
                    stage: 'Operating capability',
                    desc: 'The client runs it. Our pod has moved on, and the capability claim survives without us in the room.'
                  }
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-blue-600 block mb-1">{item.year}</span>
                      <h4 className="text-sm font-bold text-slate-900 mb-2">{item.stage}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 4.8: What the client keeps */}
          <section id="what-client-keeps" className="mb-20 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-2.5 py-1 rounded bg-blue-900/40 border border-blue-500/30 text-blue-600 font-mono text-xs font-bold">
                4.8
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                What the client keeps
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base mb-8 max-w-4xl">
              Transfer is not a closing slide. At the end of the fifth stage the client holds, demonstrably:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {clientKeeps.map((item, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-slate-900/70 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-emerald-500 border-t border-r border-b border-slate-200 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong className="text-slate-900">Strict Assurance Exit Criteria:</strong> If any of the five is missing, the assurance stage does not close and the capability claim is withdrawn. That is a harder line than most practices take — and it is why the next engagement starts faster.
            </div>
          </section>

          {/* Section 4.9: Interfaces */}
          <section id="interfaces" className="mb-20 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-2.5 py-1 rounded bg-blue-900/40 border border-blue-500/30 text-blue-600 font-mono text-xs font-bold">
                4.9
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Interfaces
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-200">
                <span className="text-xs font-mono font-bold text-blue-600 block mb-1">
                  Division 2 · Section 5
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">Horizontal functions</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The pod delivers GRC, ESG, data integration or CIO operations through the same five stages and five proofs. The function supplies domain content; the pod supplies delivery and evidence.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-200">
                <span className="text-xs font-mono font-bold text-indigo-600 block mb-1">
                  Division 3 · Section 6
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">Industry verticals</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The vertical supplies the buyer, the workflow and the regulatory stack. The proof standard does not change by industry — which is what lets a client compare two engagements honestly.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-200">
                <span className="text-xs font-mono font-bold text-emerald-600 block mb-1">
                  Section 3
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">The value spine</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The ledger entry produced at stage four is the same object the enterprise spine defines. This section is where that object is manufactured.
                </p>
              </div>
            </div>

            {/* Section 4 Footer Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 to-slate-900 border border-blue-800/40 text-center space-y-2">
              <h4 className="text-base font-bold text-slate-900">
                Section 4 · AI Value Engineering Practice — Forward Deployment & Value Delivery
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Runs on the{' '}
                <Link
                  href="/methodology-engine"
                  className="text-blue-600 hover:text-blue-300 underline font-semibold"
                >
                  TRUSTGRID methodology engine
                </Link>{' '}
                · deterministic stage gates · compounding value
              </p>
            </div>
          </section>

          {/* Action CTAs */}
          <section className="rounded-2xl bg-gradient-to-br from-blue-900/30 via-slate-900 to-slate-950 border border-blue-500/30 p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
              Ready to engineer defensible, compounding AI value?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mb-8">
              Engage an elite forward-deployed pod to run the five stages, pass the five proofs, and deliver a number Finance signs.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/book-ai-diagnostic#diagnostic-form-section"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-slate-900 font-semibold text-sm transition-all shadow-lg shadow-blue-600/30"
              >
                <span>Book AI Value Diagnostic</span>
                <ArrowUpRight size={16} />
              </Link>

              <Link
                href="/methodology-engine"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-700 font-semibold text-sm border border-slate-700 transition-all"
              >
                <span>Explore Methodology Engine</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/talk-to-ai-architect?topic=ai-value-engineering#session-booking-section"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-transparent hover:bg-slate-800/60 text-blue-600 hover:text-slate-900 font-semibold text-sm border border-blue-500/30 transition-all"
              >
                <span>Talk to an AI Architect</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

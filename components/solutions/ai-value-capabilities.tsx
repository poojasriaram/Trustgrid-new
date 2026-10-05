'use client'

import React from 'react'
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
  Truck,
  HeartPulse,
  Factory
} from 'lucide-react'

export function AIValueCapabilities() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-28">
      {/* SECTION 1: AI VALUE DISCOVERY & LEAN AI VALUE ENGINEERING HANDBOOK FRAMEWORK */}
      <section id="value-discovery" className="scroll-mt-32 space-y-16">
        {/* 1.1 Section Header & Philosophy */}
        <div>
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-flex items-center gap-1.5 mb-3">
              <Sparkles size={12} className="text-blue-600" />
              01 / Value Discovery
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              VALUE DISCOVERY
            </h2>
            <h3 className="text-lg sm:text-2xl font-bold text-slate-800 mt-2">
              Find Where AI Value Is Actually Trapped
            </h3>
            <p className="text-base text-slate-600 mt-3 leading-relaxed">
              TRUSTGRID.AI begins with the operating constraint—not the AI model.
            </p>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              Our Lean AI Value Engineering methodology combines Theory of Constraints, Critical Chain, Lean Six Sigma, the Toyota Production System and Value Engineering to identify where waste, variation, capacity loss and decision friction are limiting enterprise performance.
            </p>
          </div>

          {/* Existing Foundation Cards Preserved */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-4">
                <TrendingUp size={20} />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">P&amp;L Value Stream Mapping</h4>
              <p className="text-xs text-slate-600 mb-4">Translating corporate strategic objectives into specific operational bottlenecks addressable by AI engineering.</p>
              <ul className="text-xs text-slate-700 space-y-2">
                <li className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> Cost-out and margin expansion attribution</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> Working capital reduction modeling</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> Revenue acceleration opportunity scoring</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold mb-4">
                <Scale size={20} />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Technical Feasibility Matrix</h4>
              <p className="text-xs text-slate-600 mb-4">Filtering out high-risk research experiments in favor of mathematically solvable problems with established training and eval data.</p>
              <ul className="text-xs text-slate-700 space-y-2">
                <li className="flex items-center gap-2"><Check size={14} className="text-cyan-600" /> Data readiness and ground-truth availability scoring</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-cyan-600" /> System integration complexity assessment</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-cyan-600" /> Regulatory and security friction analysis</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
                <BarChart3 size={20} />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">CFO Consensus Canvas</h4>
              <p className="text-xs text-slate-600 mb-4">Constructing transparent economic models that bridge the communication gap between technical AI engineers and the finance committee.</p>
              <ul className="text-xs text-slate-700 space-y-2">
                <li className="flex items-center gap-2"><Check size={14} className="text-indigo-600" /> Net Present Value (NPV) &amp; IRR projections</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-indigo-600" /> Sensitivity analysis under varying token volumes</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-indigo-600" /> Verified milestone-gated capital commitments</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 1.2 Core Lifecycle Stepper */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-lg">
          <div className="max-w-2xl mb-6">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800 inline-block mb-2">
              Methodology Lifecycle
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              The Lean AI Value Engineering Lifecycle
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              A closed-loop operational governance framework from baseline measurement to compounding constraint elevation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 relative">
              <span className="text-xs font-mono font-bold text-blue-400 block mb-1">01</span>
              <strong className="text-xs sm:text-sm text-white block mb-1">ASSESSMENT / AUDIT</strong>
              <p className="text-[11px] text-slate-300">Measure evidence-based baseline, VSM &amp; constraint register.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 relative">
              <span className="text-xs font-mono font-bold text-cyan-400 block mb-1">02</span>
              <strong className="text-xs sm:text-sm text-white block mb-1">DISCOVERY</strong>
              <p className="text-[11px] text-slate-300">Quantify &amp; score AI workflow pipeline with formula S.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 relative">
              <span className="text-xs font-mono font-bold text-indigo-400 block mb-1">03</span>
              <strong className="text-xs sm:text-sm text-white block mb-1">AUTOMATION</strong>
              <p className="text-[11px] text-slate-300">Deploy bounded agent loops across 7 governed tiers.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 relative">
              <span className="text-xs font-mono font-bold text-emerald-400 block mb-1">04</span>
              <strong className="text-xs sm:text-sm text-white block mb-1">VALUE REALISATION</strong>
              <p className="text-[11px] text-slate-300">Validate 5 gates, book financial ROI &amp; establish SWA.</p>
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/80 border border-indigo-700/80 relative">
              <span className="text-xs font-mono font-bold text-purple-400 block mb-1">↺ NEXT</span>
              <strong className="text-xs sm:text-sm text-white block mb-1">CONSTRAINT RE-MAP</strong>
              <p className="text-[11px] text-indigo-200">Elevate newly emerged bottleneck for compounding returns.</p>
            </div>
          </div>
        </div>

        {/* 1.3 Stage 01 & Stage 02 Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stage 01 — Assessment / Audit */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between" style={{ borderLeftWidth: '5px', borderLeftColor: '#0F3DDE' }}>
            <div>
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
                <span className="text-xs font-mono font-extrabold text-blue-600 uppercase tracking-wider">
                  STAGE 01
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 uppercase">
                  Baseline
                </span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">ASSESSMENT / AUDIT</h4>
              <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                <strong className="text-slate-800">Purpose:</strong> Build a measured, evidence-based baseline. Establishing the true constraint, waste quantity, capability condition, data state, governance boundaries, and value definition.
              </p>

              <div className="mb-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Key Diagnostic Inclusions
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <li className="flex items-center gap-1.5">• Value-stream mapping (VSM)</li>
                  <li className="flex items-center gap-1.5">• Constraint identification</li>
                  <li className="flex items-center gap-1.5">• DOWNTIME waste baseline</li>
                  <li className="flex items-center gap-1.5">• SPC / capability analysis</li>
                  <li className="flex items-center gap-1.5">• Measurement System Analysis</li>
                  <li className="flex items-center gap-1.5">• Data readiness audit</li>
                  <li className="flex items-center gap-1.5">• Governance boundaries</li>
                  <li className="flex items-center gap-1.5">• Business owner &amp; KPI targets</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Deliverable Outputs
              </span>
              <p className="text-xs text-slate-600 leading-relaxed font-mono">
                Signed current-state VSM · Constraint register · Baseline capability · Assessment charter · Business case &amp; KPI targets
              </p>
            </div>
          </div>

          {/* Stage 02 — Discovery */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between" style={{ borderLeftWidth: '5px', borderLeftColor: '#0F3DDE' }}>
            <div>
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
                <span className="text-xs font-mono font-extrabold text-cyan-600 uppercase tracking-wider">
                  STAGE 02
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-50 text-cyan-700 uppercase">
                  Quantification
                </span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">DISCOVERY</h4>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                <strong className="text-slate-800">Purpose:</strong> Convert operational evidence into a prioritized pipeline of AI workflows that attack the constraint.
              </p>
              <p className="text-xs text-slate-600 mb-5 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                Discovery is a quantification stage. Agents observe, quantify and draft; humans validate and accept.
              </p>

              <div className="mb-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Detection &amp; Scoring Scope
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <li className="flex items-center gap-1.5">• Process mining &amp; variant discovery</li>
                  <li className="flex items-center gap-1.5">• DOWNTIME waste classification</li>
                  <li className="flex items-center gap-1.5">• Constraint monitoring (&lt;4min)</li>
                  <li className="flex items-center gap-1.5">• Critical-chain buffer monitoring</li>
                  <li className="flex items-center gap-1.5">• SPC drift anomaly detection</li>
                  <li className="flex items-center gap-1.5">• Shadow-mode agent evaluation</li>
                  <li className="flex items-center gap-1.5">• AI opportunity scoring (S)</li>
                  <li className="flex items-center gap-1.5">• Human-reviewed discovery gate</li>
                </ul>
              </div>
            </div>

            {/* Discovery Score Formula Block */}
            <div className="p-4 rounded-xl bg-slate-950 text-white border border-slate-800">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                Handbook Opportunity Score Formula
              </span>
              <div className="text-xs sm:text-sm font-mono font-bold text-white tracking-wide py-1 text-center bg-slate-900 rounded p-2 border border-slate-800">
                S = 0.25V + 0.20C + 0.10B + 0.10W + 0.10D + 0.10T − 0.10R + 0.05A
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px] text-slate-300 font-mono mt-2 pt-2 border-t border-slate-800">
                <span>V = Financial Value</span>
                <span>C = Constraint Impact</span>
                <span>B = Buffer Impact</span>
                <span>W = Waste Severity</span>
                <span>D = Data Readiness</span>
                <span>T = Tech Feasibility</span>
                <span>R = Risk Penalty</span>
                <span>A = Org Readiness</span>
              </div>
            </div>
          </div>
        </div>

        {/* 1.4 Value Engineering Ratio & Cheapest-Sufficient Intelligence */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* VE Ratio Formula */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800 inline-block">
                Value Engineering Principle
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                EVERY AI FUNCTION MUST EARN ITS COST
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                AI is treated as an execution layer within a value equation. The objective is not maximum model intelligence; it is the cheapest-sufficient method that reliably performs the required function.
              </p>

              {/* Handbook Ratio Equation */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-2">Value Engineering Ratio</span>
                <div className="text-xs sm:text-sm font-bold text-cyan-400 pb-1 border-b border-slate-700 inline-block px-3">
                  DECISIONS VALUE × ACCURACY × SPEED
                </div>
                <div className="text-[11px] sm:text-xs text-slate-300 pt-1.5">
                  COMPUTE COST + HUMAN REVIEW COST + FAILURE COST + QUEUE COST
                </div>
              </div>
            </div>

            {/* Cheapest-Sufficient Intelligence Cascade */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-950 border border-indigo-900/60">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
                  CHEAPEST-SUFFICIENT INTELLIGENCE
                </h4>
                <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                  Cascade Routing
                </span>
              </div>

              <blockquote className="text-xs text-indigo-200 italic mb-4 border-l-2 border-indigo-500 pl-3">
                &ldquo;Do not use an LLM if a rule will do. Do not use a large model where a small model passes MSA.&rdquo;
              </blockquote>

              <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
                Every operational event terminates at the cheapest sufficient intelligence tier, while ambiguous, high-variance, or higher-risk cases escalate upward.
              </p>

              {/* Cascade visual flow */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-center">
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">1. RULES</div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">2. ARITHMETIC / SPC</div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">3. CLASSICAL ML</div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-blue-300">4. SLM (8B)</div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-indigo-300">5. LLM / REASON</div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-purple-300">6. VALIDATOR</div>
                <div className="p-2 rounded bg-rose-950/60 border border-rose-800 text-rose-300 col-span-2">7. HUMAN EXCEPTION</div>
              </div>
            </div>
          </div>
        </div>

        {/* 1.5 Stage 03 — Automation & Controlled Autonomy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Stage 03 Card */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between" style={{ borderLeftWidth: '5px', borderLeftColor: '#0F3DDE' }}>
            <div>
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
                <span className="text-xs font-mono font-extrabold text-indigo-600 uppercase tracking-wider">
                  STAGE 03
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 uppercase">
                  Execution
                </span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">AUTOMATION</h4>
              <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                <strong className="text-slate-800">Purpose:</strong> Move validated opportunities into controlled, governed AI execution across industrial systems.
              </p>

              {/* 7 Governed Architecture Tiers */}
              <div className="mb-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Handbook Architecture Tiers (Tier 0–6)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="p-2 bg-slate-50 rounded border border-slate-100 font-mono text-[11px]">
                    <strong>Tier 0:</strong> Deterministic rules &amp; hard limits
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-100 font-mono text-[11px]">
                    <strong>Tier 1:</strong> Retrieval &amp; context fusion
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-100 font-mono text-[11px]">
                    <strong>Tier 2:</strong> Analytical detection
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-100 font-mono text-[11px]">
                    <strong>Tier 3:</strong> Reasoning &amp; hypothesis
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-100 font-mono text-[11px]">
                    <strong>Tier 4:</strong> Validator &amp; critic check
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-100 font-mono text-[11px]">
                    <strong>Tier 5:</strong> Human exception bands
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-100 font-mono text-[11px] sm:col-span-2">
                    <strong>Tier 6:</strong> Observability, telemetry &amp; audit trails
                  </div>
                </div>
              </div>

              {/* Bounded Agent Loop */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-mono font-bold text-slate-600 uppercase block mb-1">
                  Bounded Agent Execution Loop
                </span>
                <div className="text-xs font-mono font-bold text-indigo-700 flex flex-wrap items-center gap-1.5">
                  <span>OBSERVE</span> → <span>ORIENT</span> → <span>DECIDE</span> → <span>VALIDATE</span> → <span>ACT</span> → <span>LOG</span> → <span>ESCALATE</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-4 italic border-t border-slate-100 pt-3">
              *Irreversible, safety-critical, and higher-risk operational actions remain strictly human-governed.
            </p>
          </div>

          {/* Controlled Autonomy Progression */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 block mb-1">
                Controlled Autonomy
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                Operational Maturity Progression
              </h4>
              <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                Autonomy is graduated based on empirical verification, process stability, and established risk bounds.
              </p>

              <div className="space-y-2.5">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-blue-400 font-mono">L1 — SHADOW</span>
                    <span className="text-[10px] text-slate-400">Observe Only</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">Recommend + log only; zero automated physical actions.</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-cyan-400 font-mono">L2 — COPILOT</span>
                    <span className="text-[10px] text-slate-400">Operator Gated</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">One-tap accept / reject by line operator or technician.</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-indigo-400 font-mono">L3 — BOUNDED</span>
                    <span className="text-[10px] text-slate-400">Low-Risk Rules</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">Validated low-risk automated adjustments within strict safety envelopes.</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-purple-400 font-mono">L4 — ASSISTANT</span>
                    <span className="text-[10px] text-slate-400">Evidence Packet</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">Comprehensive evidence packet compiled + human confirmation before execution.</p>
                </div>

                <div className="p-2.5 rounded-xl bg-indigo-950/80 border border-indigo-700">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-emerald-400 font-mono">L5 — MANAGED AUTONOMY</span>
                    <span className="text-[10px] text-emerald-300">Continuous Monitoring</span>
                  </div>
                  <p className="text-[11px] text-indigo-200 mt-0.5">Continuous automated loops with periodic re-validation and hard safety interlocks.</p>
                </div>
              </div>
            </div>

            <span className="text-[10px] text-slate-400 font-mono block mt-4 pt-3 border-t border-slate-800">
              *L5 represents managed, bounded autonomy—never unrestricted execution.
            </span>
          </div>
        </div>

        {/* 1.6 Stage 04 — Value Realisation & The Constraint Re-Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Stage 04 Card */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between" style={{ borderLeftWidth: '5px', borderLeftColor: '#0F3DDE' }}>
            <div>
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
                <span className="text-xs font-mono font-extrabold text-emerald-600 uppercase tracking-wider">
                  STAGE 04
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 uppercase">
                  Institutionalization
                </span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">VALUE REALISATION</h4>
              <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                A use case is not considered complete simply because an AI workflow is deployed. Realisation requires operational stability and audited financial capture.
              </p>

              {/* 5 Realisation Gates */}
              <div className="mb-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  The Five Realisation Gates
                </span>
                <div className="space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-100">
                    <strong className="text-slate-900 font-mono">Gate 1:</strong> Operational stability &amp; SPC compliance
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-100">
                    <strong className="text-slate-900 font-mono">Gate 2:</strong> Financial value booked &amp; CFO audit signed
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-100">
                    <strong className="text-slate-900 font-mono">Gate 3:</strong> Constraint relief &amp; network re-map
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-100">
                    <strong className="text-slate-900 font-mono">Gate 4:</strong> Sustainability, operator training &amp; governance
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-100">
                    <strong className="text-slate-900 font-mono">Gate 5:</strong> Compounding improvement &amp; next-wave use cases
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <strong className="text-slate-800 block mb-1">Standard Work for Agents (SWA):</strong>
              Signed SWA protocol, continuous drift monitoring, operator retraining, emergency kill switch, and living FMEA/SOP updates.
            </div>
          </div>

          {/* The Constraint Re-Map */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-slate-950 text-white border border-indigo-900/60 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400 block mb-1">
                Continuous Compounding
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                THE CONSTRAINT RE-MAP
              </h4>
              <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                After every improvement cycle, the constraint moves. The next constraint becomes the next value opportunity.
              </p>

              {/* Compounding Cycle Stepper */}
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40 space-y-2 font-mono text-xs mb-5">
                <div className="text-blue-300">1. ASSESS (Baseline)</div>
                <div className="text-cyan-300">2. DISCOVER (Quantify &amp; Score)</div>
                <div className="text-indigo-300">3. AUTOMATE (Governed Execution)</div>
                <div className="text-emerald-300">4. REALISE VALUE (Book ROI)</div>
                <div className="text-purple-300 font-bold">5. RE-MAP CONSTRAINT (Locate next bottleneck)</div>
                <div className="text-slate-400">↺ REPEAT (Exponential Compounding)</div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 pt-3 border-t border-slate-800">
              The objective is a continuously self-evolving operational improvement engine where capacity freed in cycle $N$ directly funds telemetry in cycle $N+1$.
            </p>
          </div>
        </div>

        {/* 1.7 DOWNTIME × AI DETECTION MATRIX */}
        <div>
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200/60 inline-block mb-2">
              Waste Detection Architecture
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              DOWNTIME × AI DETECTION
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Automated detection and closed-loop control across all eight classical Toyota Production System waste categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* D */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between" style={{ borderLeftWidth: '4px', borderLeftColor: '#0F3DDE' }}>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-lg font-black text-blue-600 font-mono">D</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Defects</span>
                </div>
                <div className="text-[11px] text-slate-600 space-y-1 mb-3">
                  <div><strong>Data Source:</strong> Machine vision, inline CMM, SPC logs</div>
                  <div><strong>AI Detection:</strong> Real-time drift &amp; pixel anomaly model</div>
                  <div><strong>Control Action:</strong> Auto-stop line, offset tool, quarantine</div>
                </div>
              </div>
              <div className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">
                KPI: FPY +12% · Scrap -45%
              </div>
            </div>

            {/* O */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between" style={{ borderLeftWidth: '4px', borderLeftColor: '#0F3DDE' }}>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-lg font-black text-blue-600 font-mono">O</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Overproduction</span>
                </div>
                <div className="text-[11px] text-slate-600 space-y-1 mb-3">
                  <div><strong>Data Source:</strong> ERP orders, MES line counters, buffer levels</div>
                  <div><strong>AI Detection:</strong> Takt deviation &amp; bullwhip forecast</div>
                  <div><strong>Control Action:</strong> DBR rope throttle, batch down-sizing</div>
                </div>
              </div>
              <div className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">
                KPI: WIP -32% · Working Capital +$420k
              </div>
            </div>

            {/* W */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between" style={{ borderLeftWidth: '4px', borderLeftColor: '#0F3DDE' }}>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-lg font-black text-blue-600 font-mono">W</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Waiting</span>
                </div>
                <div className="text-[11px] text-slate-600 space-y-1 mb-3">
                  <div><strong>Data Source:</strong> RFID badges, machine state signals, queue timers</div>
                  <div><strong>AI Detection:</strong> Idle state pattern classifier (&lt;4min)</div>
                  <div><strong>Control Action:</strong> Dynamic tech dispatch, buffer replenishment</div>
                </div>
              </div>
              <div className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">
                KPI: Idle -58% · OEE +8%
              </div>
            </div>

            {/* N */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between" style={{ borderLeftWidth: '4px', borderLeftColor: '#0F3DDE' }}>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-lg font-black text-blue-600 font-mono">N</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Not-used Talent</span>
                </div>
                <div className="text-[11px] text-slate-600 space-y-1 mb-3">
                  <div><strong>Data Source:</strong> Skills matrix, shift rosters, task logs</div>
                  <div><strong>AI Detection:</strong> Skill-workload mismatch analytics</div>
                  <div><strong>Control Action:</strong> Skill-match routing, micro-training prompt</div>
                </div>
              </div>
              <div className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">
                KPI: Rework 11%→3% · Retention +18%
              </div>
            </div>

            {/* T */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between" style={{ borderLeftWidth: '4px', borderLeftColor: '#0F3DDE' }}>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-lg font-black text-blue-600 font-mono">T</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Transportation</span>
                </div>
                <div className="text-[11px] text-slate-600 space-y-1 mb-3">
                  <div><strong>Data Source:</strong> AGV telemetry, RTLS tags, forklift GPS</div>
                  <div><strong>AI Detection:</strong> Spaghetti route tracking, transit delays</div>
                  <div><strong>Control Action:</strong> Dynamic route rerouting, slotting optimization</div>
                </div>
              </div>
              <div className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">
                KPI: Travel -31% · Fuel -18%
              </div>
            </div>

            {/* I */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between" style={{ borderLeftWidth: '4px', borderLeftColor: '#0F3DDE' }}>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-lg font-black text-blue-600 font-mono">I</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Inventory</span>
                </div>
                <div className="text-[11px] text-slate-600 space-y-1 mb-3">
                  <div><strong>Data Source:</strong> WMS lot scans, multi-site transit buffers</div>
                  <div><strong>AI Detection:</strong> Buffer burn anomaly &amp; stockout predictor</div>
                  <div><strong>Control Action:</strong> Demand-sensing dynamic reorder, Kanban sync</div>
                </div>
              </div>
              <div className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">
                KPI: Inventory -32% · Turns +1.8x
              </div>
            </div>

            {/* M */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between" style={{ borderLeftWidth: '4px', borderLeftColor: '#0F3DDE' }}>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-lg font-black text-blue-600 font-mono">M</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Motion</span>
                </div>
                <div className="text-[11px] text-slate-600 space-y-1 mb-3">
                  <div><strong>Data Source:</strong> Ergonomic pose video, wearable IMUs</div>
                  <div><strong>AI Detection:</strong> Excessive bend/reach &amp; tool search detection</div>
                  <div><strong>Control Action:</strong> Workbench layout reconfig, kit pre-staging</div>
                </div>
              </div>
              <div className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">
                KPI: Steps -42% · Incidents -44%
              </div>
            </div>

            {/* E */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between" style={{ borderLeftWidth: '4px', borderLeftColor: '#0F3DDE' }}>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-lg font-black text-blue-600 font-mono">E</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Excess Processing</span>
                </div>
                <div className="text-[11px] text-slate-600 space-y-1 mb-3">
                  <div><strong>Data Source:</strong> Machine runtimes, inspection pass logs</div>
                  <div><strong>AI Detection:</strong> Over-tolerancing &amp; redundant QC passes</div>
                  <div><strong>Control Action:</strong> Auto-tolerance gate, skip redundant test</div>
                </div>
              </div>
              <div className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">
                KPI: Cycle Time -19% · Inspection -40%
              </div>
            </div>
          </div>
        </div>

        {/* 1.8 Industrial Application Areas */}
        <div>
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 inline-block mb-2">
              Industry Playbooks
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              INDUSTRIAL APPLICATION AREAS
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Field-proven deployment blueprints tailored to discrete and process manufacturing sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Automotive */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-2 text-blue-600 flex items-center gap-1.5">
                <Truck size={14} />
                Automotive &amp; Tier-1
              </h4>
              <ul className="text-[11px] text-slate-600 space-y-1">
                <li>• Changeover / SMED reduction</li>
                <li>• Paint defect visual detection</li>
                <li>• Dock / JIT supply sequencing</li>
                <li>• Quality engineering copilot</li>
              </ul>
            </div>

            {/* CPG */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-2 text-cyan-600 flex items-center gap-1.5">
                <Boxes size={14} />
                CPG, Food &amp; Beverage
              </h4>
              <ul className="text-[11px] text-slate-600 space-y-1">
                <li>• CIP wash cycle optimisation</li>
                <li>• High-speed filler drift correction</li>
                <li>• Demand sensing &amp; promo lift</li>
                <li>• Shelf-life / FIFO &amp; OTIF assurance</li>
              </ul>
            </div>

            {/* Electronics */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-2 text-indigo-600 flex items-center gap-1.5">
                <Cpu size={14} />
                Electronics &amp; Semi
              </h4>
              <ul className="text-[11px] text-slate-600 space-y-1">
                <li>• Solder defect inline vision</li>
                <li>• SMT feeder misload prevention</li>
                <li>• Test time / yield optimization</li>
                <li>• Cleanroom WIP allocation</li>
              </ul>
            </div>

            {/* Pharma */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-2 text-emerald-600 flex items-center gap-1.5">
                <HeartPulse size={14} />
                Pharma &amp; Devices
              </h4>
              <ul className="text-[11px] text-slate-600 space-y-1">
                <li>• Batch release readiness audits</li>
                <li>• 2D lot-code inspection</li>
                <li>• Deviation / CAPA drafting bot</li>
                <li>• Cold-chain excursion monitoring</li>
              </ul>
            </div>

            {/* Heavy Mfg */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-2 text-purple-600 flex items-center gap-1.5">
                <Factory size={14} />
                Heavy Manufacturing
              </h4>
              <ul className="text-[11px] text-slate-600 space-y-1">
                <li>• Ladle &amp; furnace scheduling</li>
                <li>• Thermal SPC &amp; cooling control</li>
                <li>• Slab ageing queue management</li>
                <li>• Maintenance windows &amp; EHS safety</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 1.9 Human-Governed AI Risk Bands */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
                Operational Safety Framework
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-white">
                HUMAN-GOVERNED AI
              </h4>
            </div>
            <span className="text-xs font-semibold text-slate-300 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              Deterministic Safety Inviolability
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            AI can sense, quantify, recommend and execute within defined boundaries, but it must not override deterministic safety or governance controls.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700">
              <span className="text-xs font-mono font-bold text-rose-400 block mb-1">BAND 0</span>
              <strong className="text-white block mb-0.5">Hard Safety Interlocks</strong>
              <p className="text-[11px] text-slate-400">Strict regulatory, chemical, and physical safety limits. Zero AI overrides permitted.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700">
              <span className="text-xs font-mono font-bold text-cyan-400 block mb-1">BAND 1–2</span>
              <strong className="text-white block mb-0.5">Routine Reversible Actions</strong>
              <p className="text-[11px] text-slate-400">Automated micro-adjustments, dynamic alerts, and reversible WIP routing.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700">
              <span className="text-xs font-mono font-bold text-indigo-400 block mb-1">BAND 3</span>
              <strong className="text-white block mb-0.5">Medium-Risk Confirmation</strong>
              <p className="text-[11px] text-slate-400">Requires line supervisor confirmation with packaged evidence dossier.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700">
              <span className="text-xs font-mono font-bold text-purple-400 block mb-1">BAND 4–5</span>
              <strong className="text-white block mb-0.5">Executive &amp; Manager Sign-off</strong>
              <p className="text-[11px] text-slate-400">High-consequence decisions, line shutdowns, and contractual dispatch changes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: AI FINOPS & UNIT ECONOMICS ENGINE */}
      <section id="finops-economics" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200/60 inline-block mb-3">
            02 / FinOps Intelligence
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            AI FinOps &amp; Unit Economics Engine
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Establishing real-time transparency into cost-per-token, cost-per-task, and department-level compute chargebacks across cloud and on-premises environments.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-2">Cost-Per-Token Telemetry</span>
              <h4 className="text-lg font-bold text-white mb-2">Micro-Cost Attribution</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Granular attribution tracking prompt vs. completion tokens, caching hit rates, and embedding generation costs for every model query.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2">Unit Economics</span>
              <h4 className="text-lg font-bold text-white mb-2">Cost-Per-Successful-Task</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Measuring total compute, model calls, and latency costs required to complete a verified business transaction (e.g., loan processed or invoice reconciled).
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block mb-2">GPU Allocation</span>
              <h4 className="text-lg font-bold text-white mb-2">Multi-Tenant Chargebacks</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Automated monthly compute cost allocation across product teams and business units based on actual GPU memory-hour and compute reservation utilization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THEORY OF CONSTRAINTS (TOC) COMPUTE YIELD */}
      <section id="throughput-toc" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
            03 / Operations Rigor
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Theory of Constraints (TOC) &amp; Throughput Accounting
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Applying Eliyahu Goldratt&apos;s Theory of Constraints to eliminate system bottlenecks in data pipelines, inference queues, and model synchronization barriers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-base mb-2">Constraint Identification &amp; Subordination</h4>
            <p className="text-xs text-slate-600 mb-4">Treating the primary compute bottleneck (GPU memory bandwidth, network fabric, or token budget) as the pacing drum for the entire system.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• Drum-Buffer-Rope scheduling for inference request batches</li>
              <li className="flex items-center gap-2">• Eliminating non-constraint local optimizations that waste compute</li>
              <li className="flex items-center gap-2">• Maximizing continuous token throughput through the active bottleneck</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-base mb-2">Throughput Accounting Metric Alignment</h4>
            <p className="text-xs text-slate-600 mb-4">Replacing distorted cost-accounting models with Throughput (T), Investment (I), and Operating Expense (OE) metrics.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• Throughput defined as real cash generated through verified AI operations</li>
              <li className="flex items-center gap-2">• Investment tracking hardware CapEx and persistent data assets</li>
              <li className="flex items-center gap-2">• Clear focus on growing (T) while reducing (OE) systematically</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4: LEAN AI WASTE ELIMINATION */}
      <section id="lean-waste-elimination" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60 inline-block mb-3">
            04 / Waste Elimination
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Lean AI Engineering: Eliminating the 8 Forms of Compute Waste
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Applying Toyota Production System (TPS) rigor to remove over-provisioning, redundant prompt tokens, idle accelerator cycles, and excessive model sizing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs font-extrabold text-red-600 block mb-1">MUDA #1: OVER-SIZING</span>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Frontier Model Waste</h4>
            <p className="text-xs text-slate-600">Routing simple classification tasks to 400B models instead of optimized 8B SLMs. Solution: Dynamic model routing tiering.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs font-extrabold text-red-600 block mb-1">MUDA #2: IDLE WAITING</span>
            <h4 className="font-bold text-slate-900 text-sm mb-1">GPU Memory Starvation</h4>
            <p className="text-xs text-slate-600">Accelerators idling while waiting for slow disk I/O or network barriers. Solution: GDS and chunked prefill pipelines.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs font-extrabold text-red-600 block mb-1">MUDA #3: RE-PROCESSING</span>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Redundant Tokenization</h4>
            <p className="text-xs text-slate-600">Repeatedly tokenizing shared system prompts across thousands of queries. Solution: Prompt prefix caching.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs font-extrabold text-red-600 block mb-1">MUDA #4: DEFECTS</span>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Failed Task Retries</h4>
            <p className="text-xs text-slate-600">Multi-agent loops failing at step 10 and restarting from scratch. Solution: Deterministic checkpointing and fallback states.</p>
          </div>
        </div>
      </section>

      {/* SECTION 5: 90-DAY RAPID ACCELERATION SPRINTS */}
      <section id="acceleration-sprints" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
            05 / Rapid Value Realization
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            90-Day Rapid Acceleration Sprints
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Structured 90-day time-to-first-value engagement model delivering documented cost savings and production capability within a single financial quarter.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-extrabold text-blue-600 block mb-1">DAYS 01–30</span>
              <h4 className="font-bold text-slate-900 text-base mb-2">Audit &amp; Quick Wins</h4>
              <p className="text-xs text-slate-600 mb-3">Deploy FinOps telemetry, identify compute waste, implement prefix caching and model tier routing to capture immediate 30% savings.</p>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Immediate OpEx Reduction</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-extrabold text-indigo-600 block mb-1">DAYS 31–60</span>
              <h4 className="font-bold text-slate-900 text-base mb-2">Architecture Optimization</h4>
              <p className="text-xs text-slate-600 mb-3">Re-engineer the top 2 highest-volume use cases with fine-tuned SLMs, quantization (FP8), and streamlined multi-agent DAGs.</p>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">Throughput Scaled 3x</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-extrabold text-teal-600 block mb-1">DAYS 61–90</span>
              <h4 className="font-bold text-slate-900 text-base mb-2">Verified Value Verification</h4>
              <p className="text-xs text-slate-600 mb-3">Audit savings against baseline financial records, deliver executive board verification report, and institutionalize ongoing VRO governance.</p>
              <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">CFO-Signed Value Audit</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: ENTERPRISE AI OPERATING SYSTEM */}
      <section id="enterprise-ai-os" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200/60 inline-block mb-3">
            06 / Scaled Operating Model
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Enterprise AI Operating System (EAIS-OS)
          </h2>
          <p className="text-base text-slate-600 mt-2">
            The structural framework uniting business units, data science, infrastructure engineering, security, and finance into an integrated capability factory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <Boxes size={20} className="text-blue-600 mb-3" />
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Cross-Functional Delivery Pods</h4>
            <p className="text-xs text-slate-600 mb-3">Autonomous product pods combining AI engineers, domain experts, and FinOps analysts accountable for specific P&amp;L lines.</p>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">Decentralized Execution</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <Workflow size={20} className="text-indigo-600 mb-3" />
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Standardized Reusable Assets</h4>
            <p className="text-xs text-slate-600 mb-3">Shared enterprise repository of verified evaluation harnesses, MCP connectors, guardrail templates, and fine-tuned base models.</p>
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">Zero Re-Invention Waste</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <Scale size={20} className="text-teal-600 mb-3" />
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Governance Cadences</h4>
            <p className="text-xs text-slate-600 mb-3">Weekly FinOps triage, monthly portfolio review, and quarterly capital rebalancing ensuring investments track strategic goals.</p>
            <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">Continuous Capital Control</span>
          </div>
        </div>
      </section>

      {/* SECTION 7: VALUE REALIZATION OFFICE (VRO) SETUP */}
      <section id="vro-office" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
            07 / Permanent Governance
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Value Realization Office (VRO) Enablement
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Establishing a permanent operational entity that tracks, validates, and compounds AI ROI across the enterprise with live executive dashboards.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Building2 size={20} className="text-cyan-400 mb-2" />
              <h4 className="font-bold text-white text-base mb-1">CFO-Grade Dashboard</h4>
              <p className="text-xs text-slate-300">Real-time executive tracking comparing verified savings and new revenue against original business case assumptions.</p>
            </div>
            <div>
              <LineChart size={20} className="text-blue-400 mb-2" />
              <h4 className="font-bold text-white text-base mb-1">Benefit Realization Audits</h4>
              <p className="text-xs text-slate-300">Quarterly post-implementation reviews validating that anticipated headcount efficiency or cost reductions occurred in reality.</p>
            </div>
            <div>
              <ShieldCheck size={20} className="text-teal-400 mb-2" />
              <h4 className="font-bold text-white text-base mb-1">Disinvestment Gateways</h4>
              <p className="text-xs text-slate-300">Disciplined criteria to sunset underperforming AI pilots and reallocate compute tokens to initiatives generating proven yield.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: CLOUD VS ON-PREMISES TCO ARBITRAGE */}
      <section id="cloud-vs-onprem" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60 inline-block mb-3">
            08 / Capital Arbitrage
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Cloud vs. On-Premises TCO Arbitrage &amp; Repatriation
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Unbiased financial modeling comparing public cloud GPU on-demand pricing with reserved instances and private on-premises AI Factory ownership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-base mb-2">TCO Break-Even Analysis</h4>
            <p className="text-xs text-slate-600 mb-4">Workload profiling demonstrating the exact monthly token volume threshold where private infrastructure achieves payback.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• Incorporates power, cooling, real estate, and networking CapEx</li>
              <li className="flex items-center gap-2">• Compares 3-year cloud GPU commit vs. bare-metal deployment</li>
              <li className="flex items-center gap-2">• Typically achieves break-even within 8–14 months at scale</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-base mb-2">Hybrid Bursting Strategy</h4>
            <p className="text-xs text-slate-600 mb-4">Designing hybrid architectures keeping predictable baseline training on-prem while dynamically bursting peak inference to cloud.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• Minimizes expensive on-demand cloud surge charges</li>
              <li className="flex items-center gap-2">• Maximizes internal GPU cluster utilization (&gt;85%)</li>
              <li className="flex items-center gap-2">• 40–60% lower total cost of intelligence across 3 years</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 9: HOSHIN KANRI STRATEGIC CASCADING */}
      <section id="hoshin-kanri-kpis" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200/60 inline-block mb-3">
            09 / Strategic Alignment
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hoshin Kanri Strategic Cascading &amp; AI Scorecards
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Using Hoshin Kanri X-matrices to translate board-level strategic mandates directly into daily engineering sprints, model benchmarks, and token budgets.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">Tier 01</span>
              <h4 className="font-bold text-slate-900 text-base mb-1.5">Board Objectives</h4>
              <p className="text-xs text-slate-600">3-to-5 year breakthrough targets (e.g., reduce operating cost by $120M, accelerate time-to-market by 40%).</p>
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block mb-1">Tier 02</span>
              <h4 className="font-bold text-slate-900 text-base mb-1.5">Annual AI Priorities</h4>
              <p className="text-xs text-slate-600">Specific capability deployments (e.g., automate 80% of customer support workflows, deploy sovereign finance agents).</p>
            </div>
            <div>
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">Tier 03</span>
              <h4 className="font-bold text-slate-900 text-base mb-1.5">Engineering Metrics</h4>
              <p className="text-xs text-slate-600">Granular sprint targets (e.g., p95 latency &lt;200ms, task accuracy &gt;97%, inference unit cost &lt;$0.0004/task).</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: CAPITAL REINVESTMENT & SCALING ENGINE */}
      <section id="compounding-capital" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60 inline-block mb-3">
            10 / Compounding Returns
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Capital Reinvestment &amp; Compounding Scaling Engine
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Structuring verified efficiency gains to self-fund subsequent waves of AI capability, turning early operational savings into a compounding enterprise moat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-base mb-2">Self-Funding AI Flywheel</h4>
            <p className="text-xs text-slate-600 mb-3">Savings harvested from quick-win inference optimizations directly fund high-value multi-agent workflow automation.</p>
            <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">Self-Sustaining Investment</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-base mb-2">Capability Compounding</h4>
            <p className="text-xs text-slate-600 mb-3">Every deployed agent and fine-tuned model becomes an enterprise digital asset whose productivity compounds quarterly.</p>
            <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">Persistent Corporate IP</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-base mb-2">Enterprise Valuation Accretion</h4>
            <p className="text-xs text-slate-600 mb-3">Documented operational margin expansion translating directly into higher multiple and EBITDA expansion on the balance sheet.</p>
            <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">Direct Shareholder Value</span>
          </div>
        </div>
      </section>

      {/* SECTION 11: VERIFIED VALUE METRICS & P&L ATTRIBUTION */}
      <section id="verified-roi-metrics" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
            11 / Financial Outcomes
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Audited Value Metrics &amp; P&amp;L Benchmarks
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Verifiable economic benchmarks achieved across TrustGrid enterprise value engineering deployments.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 block">Verified Production ROI</span>
              <span className="text-3xl font-extrabold text-blue-600 block my-1">3x–10x</span>
              <span className="text-[11px] text-slate-600 block">Audited net returns on optimized production AI workloads within 12 months.</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 block">Capital Payback Window</span>
              <span className="text-3xl font-extrabold text-emerald-600 block my-1">6–18 Mos</span>
              <span className="text-[11px] text-slate-600 block">Complete capital expenditure amortization through verified operational savings.</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 block">Effective Cost of Intelligence</span>
              <span className="text-3xl font-extrabold text-indigo-600 block my-1">-30% to -60%</span>
              <span className="text-[11px] text-slate-600 block">Reduction in cost-per-token and infrastructure spend achieved within 90 days.</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: ENTERPRISE VALUE DIAGNOSTIC CTA */}
      <section id="value-diagnostic" className="scroll-mt-32">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 text-white relative overflow-hidden shadow-xl border border-blue-800">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800 inline-block mb-3">
              12 / Executive Diagnostic
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Book Your Enterprise AI Value Realization Diagnostic
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              Partner with our AI economics and operations engineering team to audit your current AI spend, eliminate compute waste, model unit economics, and build a CFO-approved business case.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/book-ai-diagnostic?solution=ai-value-engineering"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-bold shadow-lg transition-all"
              >
                <span>Schedule Value Diagnostic</span>
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
      </section>
    </div>
  )
}

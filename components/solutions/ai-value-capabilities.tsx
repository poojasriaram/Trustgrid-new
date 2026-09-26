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
  ShieldCheck
} from 'lucide-react'

export function AIValueCapabilities() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-28">
      {/* SECTION 1: AI VALUE DISCOVERY & PRIORITIZATION */}
      <section id="value-discovery" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
            01 / Value Discovery
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            AI Value Discovery &amp; Quantitative Opportunity Prioritization
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Eliminating pilot purgatory by rigorously evaluating enterprise AI use cases against balance-sheet impact, technical feasibility, and payback velocity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-4">
              <TrendingUp size={20} />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">P&amp;L Value Stream Mapping</h4>
            <p className="text-xs text-slate-600 mb-4">Translating high-level corporate strategic objectives into specific operational bottlenecks addressable by AI engineering.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• Cost-out and margin expansion attribution</li>
              <li className="flex items-center gap-2">• Working capital reduction modeling</li>
              <li className="flex items-center gap-2">• Revenue acceleration opportunity scoring</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold mb-4">
              <Scale size={20} />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">Technical Feasibility Matrix</h4>
            <p className="text-xs text-slate-600 mb-4">Filtering out high-risk research experiments in favor of mathematically solvable problems with established training and eval data.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• Data readiness and ground-truth availability scoring</li>
              <li className="flex items-center gap-2">• System integration complexity assessment</li>
              <li className="flex items-center gap-2">• Regulatory and security friction analysis</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
              <BarChart3 size={20} />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">CFO Consensus Canvas</h4>
            <p className="text-xs text-slate-600 mb-4">Constructing transparent economic models that bridge the communication gap between technical AI engineers and the finance committee.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• Net Present Value (NPV) &amp; IRR projections</li>
              <li className="flex items-center gap-2">• Sensitivity analysis under varying token volumes</li>
              <li className="flex items-center gap-2">• Verified milestone-gated capital commitments</li>
            </ul>
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

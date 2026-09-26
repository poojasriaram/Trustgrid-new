'use client'

import React from 'react'
import Link from 'next/link'
import {
  Bot,
  Workflow,
  Layers,
  Cpu,
  BarChart3,
  ShieldCheck,
  Users,
  Target,
  Building2,
  Compass,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  ShieldAlert,
  Zap,
  SlidersHorizontal,
  Lock,
  Network
} from 'lucide-react'

export function AgenticFactoryCapabilities() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-28">
      {/* SECTION 1: AUTONOMOUS AGENT ARCHITECTURE */}
      <section id="agent-architecture" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
            01 / Cognitive Foundation
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Autonomous Agent Architecture &amp; Cognitive Engines
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Moving beyond brittle prompt-response chains into stateful cognitive loops equipped with multi-step reasoning, persistent semantic memory, and reflexive planning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-4">
              <Bot size={20} />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">ReAct &amp; Tree-of-Thought</h4>
            <p className="text-xs text-slate-600 mb-4">Dual-mode deliberation engines that decompose complex goals into observable sub-actions with backtracking capability.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• Reflexion-based self-correction loops</li>
              <li className="flex items-center gap-2">• Monte Carlo tree search for strategy ranking</li>
              <li className="flex items-center gap-2">• Deterministic step-limit enforcement</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold mb-4">
              <Layers size={20} />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">Hierarchical Memory Store</h4>
            <p className="text-xs text-slate-600 mb-4">Multi-tiered storage bridging short-term working context with long-term episodic vector recall across enterprise sessions.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• Sub-50ms semantic vector indexing</li>
              <li className="flex items-center gap-2">• Graph-based entity relationship mapping</li>
              <li className="flex items-center gap-2">• Cross-session episodic conversation state</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
              <Cpu size={20} />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">Dynamic Context Allocation</h4>
            <p className="text-xs text-slate-600 mb-4">Test-time compute scaling allocating variable token budgets dynamically according to task complexity.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• Dynamic KV-cache sliding window</li>
              <li className="flex items-center gap-2">• Few-shot exemplar retrieval from golden corpus</li>
              <li className="flex items-center gap-2">• Token budget exhaustion guardrails</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 2: MULTI-AGENT SWARM ORCHESTRATION */}
      <section id="multi-agent-orchestration" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200/60 inline-block mb-3">
            02 / Swarm Orchestration
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Multi-Agent Swarm Orchestration &amp; Consensus
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Coordinating specialized digital agent teams with deterministic Directed Acyclic Graphs (DAGs), consensus voting, and automated rollback state machines.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-2">LangGraph &amp; AutoGen Core</span>
              <h4 className="text-lg font-bold text-white mb-2">Deterministic Execution DAGs</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Stateful, circular graph topologies where every node represents a specialized agent and transitions are governed by strict conditional edge contracts.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2">A2A Protocol</span>
              <h4 className="text-lg font-bold text-white mb-2">Agent-to-Agent Messaging</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Structured JSON-Schema inter-agent message buses with cryptographic signature validation, preventing hallucinated intent or unauthorized delegation.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block mb-2">Consensus Gateways</span>
              <h4 className="text-lg font-bold text-white mb-2">Consensus &amp; Disagreement Quorum</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Multi-agent quorum mechanisms where critical business actions require independent majority validation before committing writes to production databases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: VERTICAL ENTERPRISE AGENT FACTORIES */}
      <section id="vertical-factories" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
            03 / Vertical Workforces
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Domain-Specific Enterprise Agent Factories
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Turnkey, pre-trained vertical worker fleets pre-integrated into mission-critical systems across Finance, Site Reliability, Supply Chain, and Legal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition-all">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider block mb-2">Finance &amp; Audit</span>
            <h4 className="font-bold text-slate-900 text-base mb-2">Autonomous Reconciliation</h4>
            <p className="text-xs text-slate-600 mb-3">Reconciles 100,000+ line GL entries against bank feeds, identifies anomalies, and drafts journal vouchers.</p>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">80% faster close cycle</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition-all">
            <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider block mb-2">Site Reliability</span>
            <h4 className="font-bold text-slate-900 text-base mb-2">Autonomous SRE Copilot</h4>
            <p className="text-xs text-slate-600 mb-3">Ingests live Datadog/CloudWatch telemetry, isolates crashing containers, correlates root cause, and executes runbooks.</p>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">65% reduction in MTTR</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition-all">
            <span className="text-xs font-extrabold text-cyan-600 uppercase tracking-wider block mb-2">Supply Chain</span>
            <h4 className="font-bold text-slate-900 text-base mb-2">Dynamic PO Optimization</h4>
            <p className="text-xs text-slate-600 mb-3">Tracks supplier lead-times, port congestion telemetry, and inventory levels to autonomously re-route purchase orders.</p>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">40% lower stockout risk</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition-all">
            <span className="text-xs font-extrabold text-purple-600 uppercase tracking-wider block mb-2">Legal &amp; Contracts</span>
            <h4 className="font-bold text-slate-900 text-base mb-2">Contract Compliance Guard</h4>
            <p className="text-xs text-slate-600 mb-3">Extracts redline deviations across MSA, DPA, and SLA agreements, mapping clauses against enterprise risk appetite.</p>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">90% faster contract triage</span>
          </div>
        </div>
      </section>

      {/* SECTION 4: MODEL CONTEXT PROTOCOL & TOOLS */}
      <section id="mcp-tool-integration" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60 inline-block mb-3">
            04 / Standardized Tooling
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Model Context Protocol (MCP) &amp; Tool Connectors
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Universal, schema-governed tool calling standards allowing agents to securely interact with ERPs, CRMs, relational databases, and proprietary APIs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 text-base mb-2">Enterprise MCP Server Mesh</h4>
            <p className="text-xs text-slate-600 mb-4">Centralized MCP registry exposing discoverable tools with strict authorization scopes and input validation.</p>
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-700">mcp://sap-s4hana.erp/v1/create_purchase_requisition</div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-700">mcp://salesforce.crm/v2/update_opportunity_stage</div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-700">mcp://servicenow.itsm/v1/trigger_incident_remediation</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 text-base mb-2">Sandboxed Execution &amp; Rollback</h4>
            <p className="text-xs text-slate-600 mb-4">Every destructive tool call is simulated in a sandboxed staging replica with cryptographic state rollbacks on validation failure.</p>
            <ul className="text-xs text-slate-700 space-y-2.5">
              <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-teal-600" /> Ephemeral isolated micro-containers for code execution</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-teal-600" /> Pre-execution parameter validation against OpenAPI schemas</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-teal-600" /> Automated two-phase commit transactions for database writes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 5: ENTERPRISE AGENTOPS & TELEMETRY */}
      <section id="agentops-governance" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
            05 / Production Observability
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Enterprise AgentOps, Tracing &amp; Telemetry
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Real-time step-level observability into multi-agent decision trees, token usage, tool invocation latency, and failure classifications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-2xl font-black text-blue-600 block mb-1">100%</span>
            <span className="text-xs font-bold text-slate-900 block">Span Traceability</span>
            <span className="text-[11px] text-slate-500 mt-1 block">Full OpenTelemetry spans for every LLM reasoning turn and tool execution.</span>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-2xl font-black text-indigo-600 block mb-1">&lt;2ms</span>
            <span className="text-xs font-bold text-slate-900 block">Telemetry Overhead</span>
            <span className="text-[11px] text-slate-500 mt-1 block">Asynchronous non-blocking metrics emission to Datadog, Prometheus, or Grafana.</span>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-2xl font-black text-cyan-600 block mb-1">Granular</span>
            <span className="text-xs font-bold text-slate-900 block">Token Accounting</span>
            <span className="text-[11px] text-slate-500 mt-1 block">Cost-per-agent, cost-per-step, and department chargeback allocation.</span>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-2xl font-black text-red-600 block mb-1">Instant</span>
            <span className="text-xs font-bold text-slate-900 block">Anomaly Alerting</span>
            <span className="text-[11px] text-slate-500 mt-1 block">Automated kill-switches for infinite loops, tool timeouts, and budget spikes.</span>
          </div>
        </div>
      </section>

      {/* SECTION 6: RUNTIME GUARDRAILS & SAFETY */}
      <section id="guardrails-safety" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600 bg-red-50 px-2.5 py-1 rounded-md border border-red-200/60 inline-block mb-3">
            06 / Deterministic Protection
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Runtime Guardrails, Prompt Firewalls &amp; Safety
          </h2>
          <p className="text-base text-slate-600 mt-2">
            In-line defensive boundaries filtering adversarial prompts, blocking prompt injection, and sanitizing non-deterministic agent outputs before user delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <ShieldAlert size={20} className="text-red-600 mb-3" />
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Anti-Jailbreak Firewall</h4>
            <p className="text-xs text-slate-600 mb-3">Multi-vector input scanning detecting direct and indirect prompt injections in uploaded docs, emails, and user queries.</p>
            <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded">99.8% Injection Block Rate</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <Lock size={20} className="text-blue-600 mb-3" />
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Automated PII Sanitization</h4>
            <p className="text-xs text-slate-600 mb-3">Bidirectional redaction and synthetic masking of SSNs, credit cards, proprietary IP, and healthcare data.</p>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">Zero-Data Leakage Posture</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <Target size={20} className="text-teal-600 mb-3" />
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Hallucination Verification</h4>
            <p className="text-xs text-slate-600 mb-3">NLI-based citation ground-truth validation ensuring every numeric claim is mathematically tied to source documents.</p>
            <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">100% Verifiable Source Attribution</span>
          </div>
        </div>
      </section>

      {/* SECTION 7: HUMAN-IN-THE-LOOP (HITL) TEAMING */}
      <section id="human-agent-teaming" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
            07 / Human-Agent Teaming
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Human-in-the-Loop Gateways &amp; Workforce Integration
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Empowering human operators with dynamic confidence-based escalation pathways, approval interfaces, and seamless workforce enablement.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-50 via-indigo-50 to-white border border-blue-200/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">Step 01</span>
              <h4 className="font-bold text-slate-900 text-base mb-1.5">Confidence Scoring</h4>
              <p className="text-xs text-slate-600">The agent computes a calibrated confidence metric for every proposed action. Tasks scoring &gt;95% execute autonomously.</p>
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block mb-1">Step 02</span>
              <h4 className="font-bold text-slate-900 text-base mb-1.5">Contextual Escalation</h4>
              <p className="text-xs text-slate-600">If confidence drops below threshold, the agent compiles a summarized decision packet with source links to Slack or Teams.</p>
            </div>
            <div>
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">Step 03</span>
              <h4 className="font-bold text-slate-900 text-base mb-1.5">Human Feedback Loop</h4>
              <p className="text-xs text-slate-600">Human approval, modification, or rejection is recorded to fine-tune the agent policy, compounding accuracy over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: CONTINUOUS AGENT EVALUATION */}
      <section id="synthetic-eval-sprints" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200/60 inline-block mb-3">
            08 / Continuous Evaluation
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Synthetic Evaluation &amp; Automated Red-Teaming
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Rigorous regression test harnesses testing agent swarms across thousands of synthetic edge cases, policy mutations, and adversarial injections before production release.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-base mb-2">Automated Regression Suites</h4>
            <p className="text-xs text-slate-600 mb-3">Continuous CI/CD validation of agent performance against golden enterprise ground-truth datasets.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• Semantic similarity and exact-match verification</li>
              <li className="flex items-center gap-2">• Tool parameter accuracy and sequencing validation</li>
              <li className="flex items-center gap-2">• Multi-turn dialogue drift detection</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-base mb-2">Adversarial LLM-as-a-Judge</h4>
            <p className="text-xs text-slate-600 mb-3">Dedicated adversarial agent models simulating aggressive user behavior to discover failure modes and policy gaps.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• Automated jailbreak fuzzing and stress testing</li>
              <li className="flex items-center gap-2">• Tone, compliance, and regulatory rubric scoring</li>
              <li className="flex items-center gap-2">• Automated pass/fail gate before deployment promotion</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 9: SOVEREIGN & ON-PREM AGENT RUNTIMES */}
      <section id="edge-onprem-runtimes" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
            09 / Sovereign Infrastructure
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Air-Gapped &amp; On-Premises Agent Runtimes
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Running autonomous agent fleets entirely within your private data center or sovereign cloud perimeter with zero external API calls.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Building2 size={20} className="text-cyan-400 mb-2" />
              <h4 className="font-bold text-white text-base mb-1">100% Air-Gapped</h4>
              <p className="text-xs text-slate-300">Self-contained SLM inference pods running on private NVIDIA/AMD GPU nodes with zero external internet dependencies.</p>
            </div>
            <div>
              <SlidersHorizontal size={20} className="text-blue-400 mb-2" />
              <h4 className="font-bold text-white text-base mb-1">Optimized Local Models</h4>
              <p className="text-xs text-slate-300">Fine-tuned domain SLMs (7B–70B quantized to FP8/INT4) matching proprietary frontier model performance on domain tasks.</p>
            </div>
            <div>
              <ShieldCheck size={20} className="text-teal-400 mb-2" />
              <h4 className="font-bold text-white text-base mb-1">Sovereign Compliance</h4>
              <p className="text-xs text-slate-300">Complete compliance with GDPR, HIPAA, FedRAMP, and national data sovereignty regulations without third-party exposure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: 12-24 WK PILOT TO FACTORY DELIVERY */}
      <section id="agentic-transformation" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60 inline-block mb-3">
            10 / Delivery Framework
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            12–24 Week Pilot-to-Production DBOT Delivery
          </h2>
          <p className="text-base text-slate-600 mt-2">
            A battle-tested transformation sprint progressing from opportunity mapping to fully operational, self-governing enterprise agent factories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs font-extrabold text-blue-600 block mb-1">WEEKS 01–04</span>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Architecture &amp; Discovery</h4>
            <p className="text-xs text-slate-600">Audit existing workflows, map system connectors, establish ground-truth eval datasets, and select multi-agent topology.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs font-extrabold text-indigo-600 block mb-1">WEEKS 05–10</span>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Sandbox Build &amp; Tooling</h4>
            <p className="text-xs text-slate-600">Implement MCP servers, configure memory stores, deploy guardrails, and train domain-specific reasoning models.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs font-extrabold text-cyan-600 block mb-1">WEEKS 11–16</span>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Shadow Production Ops</h4>
            <p className="text-xs text-slate-600">Deploy agents in shadow execution mode alongside human teams, benchmarking autonomy rates and calibrating confidence gates.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs font-extrabold text-teal-600 block mb-1">WEEKS 17–24+</span>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Full Autonomy &amp; Transfer</h4>
            <p className="text-xs text-slate-600">Live operational handover, training internal AgentOps teams, establishing continuous evaluation cadences and VRO tracking.</p>
          </div>
        </div>
      </section>

      {/* SECTION 11: AGENT FLEET YIELD & SLA METRICS */}
      <section id="fleet-metrics-roi" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
            11 / Operational Metrics
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Autonomous Fleet Yield &amp; SLA Benchmarks
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Quantitative service-level agreements and financial return metrics engineered into every enterprise agent deployment.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 block">Task Autonomy Rate</span>
              <span className="text-3xl font-extrabold text-blue-600 block my-1">&gt;94%</span>
              <span className="text-[11px] text-slate-600 block">Autonomous completion without human escalation across verified workflows.</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 block">Cost Reduction per Task</span>
              <span className="text-3xl font-extrabold text-emerald-600 block my-1">60–85%</span>
              <span className="text-[11px] text-slate-600 block">Compared to conventional manual human operations and outsourced BPO.</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 block">Cycle Time Acceleration</span>
              <span className="text-3xl font-extrabold text-indigo-600 block my-1">5x–12x</span>
              <span className="text-[11px] text-slate-600 block">From multi-day queues down to sub-second parallelized execution.</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: ENTERPRISE AGENTIC DIAGNOSTIC CTA */}
      <section id="agentic-diagnostic" className="scroll-mt-32">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 text-white relative overflow-hidden shadow-xl border border-blue-800">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800 inline-block mb-3">
              12 / Executive Diagnostic
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Book Your Enterprise Agentic Architecture Audit
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              Evaluate your enterprise workflows, identify top multi-agent candidate tasks, benchmark security guardrails, and receive a quantitative 12-week deployment roadmap.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/book-ai-diagnostic?solution=ai-agentic-factory"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-bold shadow-lg transition-all"
              >
                <span>Schedule Agentic Diagnostic</span>
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 transition-all"
              >
                <span>Speak with an Agent Architect</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

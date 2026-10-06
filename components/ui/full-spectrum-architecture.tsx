'use client'

import React from 'react'
import Link from 'next/link'
import {
  Cpu,
  Brain,
  Bot,
  Activity,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  ArrowDown,
  Layers,
  Sparkles,
  CheckCircle2,
  Lock,
  Zap
} from 'lucide-react'

export function FullSpectrumArchitecture() {
  const layers = [
    {
      num: '01',
      name: 'AI Infrastructure & Networking',
      concept: 'Infrastructure',
      tagline: 'Bare-metal compute, sovereign power & lossless RoCEv2 fabrics',
      description: 'High-density GPU clusters, dynamic resource allocation, non-blocking Spectrum-X networks, and sovereign datacenter power convergence.',
      technologies: ['NVIDIA H100/B200', 'CUDA & NCCL', 'Lossless RoCEv2', 'Kubernetes DRA', 'Subsea CLS & Power'],
      practices: 'Practice 1 & 3: AI Infrastructure Engineering & AI Networking',
      practiceHref: '/solutions/ai-infra-engineering',
      accentColor: 'border-blue-500/40 text-blue-400 bg-blue-500/10'
    },
    {
      num: '02',
      name: 'AI Intelligence & Foundation Models',
      concept: 'Intelligence',
      tagline: 'Kernel-level LLMOps, model serving & precision quantization',
      description: 'Foundation model selection, FP8/INT4 quantization, continuous fine-tuning (LoRA/DPO), and low-latency serving via vLLM and TensorRT-LLM.',
      technologies: ['TensorRT-LLM', 'vLLM & Triton', 'FP8 / INT4 Quant', 'LoRA / DPO Tuning', 'Speculative Decoding'],
      practices: 'Practice 1 & 2: High-Performance Model Engineering & LLMOps',
      practiceHref: '/solutions/ai-infra-engineering',
      accentColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10'
    },
    {
      num: '03',
      name: 'Agent Intelligence & Enterprise Memory',
      concept: 'Agents',
      tagline: 'Hierarchical multi-agent swarms & persistent long-term memory',
      description: 'Model Context Protocol (MCP) tool integration, hybrid knowledge graphs, vector embeddings, and persistent episodic memory for autonomous fleets.',
      technologies: ['Long-Memory AI', 'Knowledge Graphs', 'Vector Memory', 'Model Context Protocol', 'Graph State Machines'],
      practices: 'Practice 2: AI Agentic + Factory',
      practiceHref: '/solutions/ai-agentic-factory',
      accentColor: 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10'
    },
    {
      num: '04',
      name: 'AI Operations & Autonomous Execution',
      concept: 'Operations',
      tagline: 'Automated task execution, continuous telemetry & self-healing SRE',
      description: 'Closed-loop execution engines applying industrial Toyota VSM, SMED, and Theory of Constraints to eliminate latency bottlenecks and token waste.',
      technologies: ['Poka-Yoke Gates', 'Autonomous NOC/SRE', 'Telemetry Telemetry', 'Dynamic DAG Routing', 'Self-Healing Loops'],
      practices: 'Practice 4: AI-Driven Operational Excellence Engine',
      practiceHref: '/methodology-engine',
      accentColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
    },
    {
      num: '05',
      name: 'Governance, Guardrails & Trust',
      concept: 'Governance',
      tagline: 'Post-quantum cryptographic safety, red teaming & compliance',
      description: 'Continuous auditability, mathematical explainability, zero-trust network isolation, and automated validation against EU AI Act and Fed SR 11-7.',
      technologies: ['NIST PQC (FIPS 203/204)', 'Zero-Trust Isolation', 'Continuous Red Teaming', 'Deterministic Guardrails', 'SR 11-7 Audit Rails'],
      practices: 'Practice 5: AI Cybersecurity & Trusted AI Transformation',
      practiceHref: '/solutions/ai-cybersecurity-quantum-safe-networking',
      accentColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10'
    },
    {
      num: '06',
      name: 'Business Value & Compounding ROI',
      concept: 'Business Value',
      tagline: 'Token unit economics, GPU cost reduction & enterprise velocity',
      description: 'Connecting model performance to bottom-line profitability with 40–75% compute cost optimization and verified 10x delivery speedups.',
      technologies: ['Token Unit Economics', 'FinOps Automation', '40–75% Cost Reduction', '10x Faster Velocity', 'Throughput Accounting'],
      practices: 'Practice 6: AI Value Engineering & FinOps Strategy',
      practiceHref: '/solutions/ai-value-engineering',
      accentColor: 'border-rose-500/40 text-rose-400 bg-rose-500/10'
    }
  ]

  return (
    <section className="section" id="full-spectrum-architecture" style={{ paddingTop: '30px', paddingBottom: '40px' }}>
      <div className="section-intro">
        <div className="intro-left">
          <span className="section-badge">FULL-SPECTRUM AI ARCHITECTURE</span>
          <p className="section-label">Vertically Integrated Systems from Silicon to Value</p>
        </div>
        <span className="section-index">6-TIER STACK</span>
      </div>

      <div className="showcase-header">
        <h2>
          From raw silicon to <span>compounding business value.</span>
        </h2>
        <p>
          TrustGrid integrates every layer of enterprise AI into a coherent, vertically verified architecture. Each tier directly powers the next — connecting hardware efficiency to autonomous operational outcomes.
        </p>
      </div>

      {/* HORIZONTAL / VERTICAL CHAIN FLOW INDICATOR */}
      <div className="my-6 p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 shadow-xs flex items-center justify-between text-xs font-mono text-slate-700 overflow-x-auto gap-2">
        <span className="text-blue-900 font-bold flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px] font-bold">1</span>
          Infrastructure
        </span>
        <span className="text-slate-400 font-bold">→</span>
        <span className="text-cyan-900 font-bold flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-800 flex items-center justify-center text-[10px] font-bold">2</span>
          Intelligence
        </span>
        <span className="text-slate-400 font-bold">→</span>
        <span className="text-indigo-900 font-bold flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center text-[10px] font-bold">3</span>
          Agents
        </span>
        <span className="text-slate-400 font-bold">→</span>
        <span className="text-emerald-900 font-bold flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold">4</span>
          Operations
        </span>
        <span className="text-slate-400 font-bold">→</span>
        <span className="text-amber-900 font-bold flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-bold">5</span>
          Governance
        </span>
        <span className="text-slate-400 font-bold">→</span>
        <span className="text-rose-900 font-bold flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center text-[10px] font-bold">6</span>
          Business Value
        </span>
      </div>

      {/* 6 LAYERS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {layers.map((layer) => (
          <div
            key={layer.num}
            className="animated-card p-6 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${layer.accentColor}`}>
                  LAYER {layer.num} • {layer.concept.toUpperCase()}
                </span>
                <span className="text-xs text-slate-500 font-mono font-medium">Vertically Verified</span>
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 mb-1">{layer.name}</h3>
              <p className="text-xs text-blue-600 font-semibold mb-3">{layer.tagline}</p>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">{layer.description}</p>

              <div className="mb-4">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2 font-semibold">
                  Engineered Frameworks:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {layer.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-800 border border-slate-200/90 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-2">
              <Link
                href={layer.practiceHref}
                className="text-xs text-blue-600 hover:text-blue-800 flex items-center justify-between font-bold group"
              >
                <span>{layer.practices}</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

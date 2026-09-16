'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Compass,
  Layers,
  Cpu,
  Bot,
  Users,
  Rocket,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Sparkles,
  FileCheck
} from 'lucide-react'

export interface MethodologyStage {
  step: string
  name: string
  duration: string
  tagline: string
  desc: string
  deliverables: string[]
  keyOutcome: string
  methods: string[]
}

const defaultStages: MethodologyStage[] = [
  {
    step: '01',
    name: 'DIAGNOSE',
    duration: '2–4 Wks',
    tagline: 'Technical & Economic Discovery',
    desc: 'Audit existing compute infrastructure, GPU cluster utilization, agent security posture, token economics, and organizational readiness.',
    deliverables: [
      'Comprehensive AI Infrastructure & Cluster Utilization Audit',
      'Agentic Readiness & Process Opportunity Matrix',
      'Token FinOps & Unit Economic Baseline Report'
    ],
    keyOutcome: 'Verifiable roadmap prioritizing high-yield AI initiatives with quantified ROI targets.',
    methods: ['Value Stream Mapping', 'TOC Bottleneck Identification', 'FMEA Risk Profiling']
  },
  {
    step: '02',
    name: 'ARCHITECT',
    duration: '3–6 Wks',
    tagline: 'Deterministic Systems Blueprinting',
    desc: 'Formulate target-state high-density compute topologies, multi-agent cognitive DAG blueprints, zero-trust cryptographic guardrails, and FinOps models.',
    deliverables: [
      'High-Density AI Factory (30–100kW) Facility Specs',
      'Multi-Agent System Architecture & MCP Tooling Schemas',
      'L1–L7 Post-Quantum Cryptography & CBOM Migration Blueprint'
    ],
    keyOutcome: 'End-to-end engineered architecture ready for turnkey deployment without vendor lock-in.',
    methods: ['Lean Architecture', 'Poka-Yoke Interface Design', 'Target Costing']
  },
  {
    step: '03',
    name: 'IMPLEMENT',
    duration: '6–16 Wks',
    tagline: 'Production Systems Engineering',
    desc: 'Deploy, configure, and validate production-grade GPU clusters, lossless network fabrics, multi-agent reasoning DAGs, and explainability pipelines.',
    deliverables: [
      'Turnkey AI Compute Cluster & KV-Cache Inference Engine',
      'Governed Multi-Agent Execution Fabric with Persistent Memory',
      'Real-Time Explainability (SHAP/LIME) & Audit Logging Infrastructure'
    ],
    keyOutcome: 'Production-ready AI capabilities running at scale with enterprise-grade SLAs.',
    methods: ['DevOps / CI/CD', 'SMED Rapid Changeover', 'DMAIC Quality Control']
  },
  {
    step: '04',
    name: 'AUTOMATE',
    duration: '4–12 Wks',
    tagline: 'Industrialized Agent Fleet Execution',
    desc: 'Automate high-volume workflows across finance, supply chain, cybersecurity, and customer operations with autonomous agent swarms.',
    deliverables: [
      'Autonomous Multi-Agent Workflow Orchestration Engine',
      'Real-Time Confidence Scoring & Fail-Safe Routing',
      'AgentOps Telemetry, Tracing & Performance Dashboards'
    ],
    keyOutcome: '50–80% reduction in workflow cycle times with >95% deterministic task accuracy.',
    methods: ['Jidoka Self-Stopping', 'Kanban Flow Control', 'Continuous Benchmarking']
  },
  {
    step: '05',
    name: 'ADOPT',
    duration: '4–8 Wks',
    tagline: 'Workforce Enablement & Governance',
    desc: 'Embed human-agent collaborative operating models, roll out enterprise AI literacy programs, and enforce continuous compliance policies.',
    deliverables: [
      'Enterprise AI Operating Model & Escalation Protocols',
      'Cross-Functional AI Literacy & Co-Engineering Training',
      'EU AI Act, NIST AI RMF & ISO 42001 Compliance Certification'
    ],
    keyOutcome: 'Sustainable organizational adoption with complete board-level governance and cultural buy-in.',
    methods: ['Hoshin Kanri Policy Deployment', 'Change Management', 'Balanced Scorecard']
  },
  {
    step: '06',
    name: 'ACCELERATE',
    duration: 'Continuous',
    tagline: 'Compounding Value & Continuous Yield',
    desc: 'Expand industrialized agent fleets and dedicated AI factories across business units while optimizing inference costs and maximizing P&L returns.',
    deliverables: [
      'Value Realization Office (VRO) Governance & Tracking',
      'Weekly Inference Profiling & Kernel Micro-Optimization',
      'Continuous Organizational AI Capability Compounding'
    ],
    keyOutcome: '3–10x realized enterprise ROI compounding quarterly across all business units.',
    methods: ['Kaizen Continuous Improvement', 'Throughput Accounting', 'SPC Quality Control']
  }
]

const stageIcons = [Compass, Layers, Cpu, Bot, Users, Rocket]

export function MethodologyTimeline() {
  const [activeStage, setActiveStage] = useState(0)

  const current = defaultStages[activeStage]
  const Icon = stageIcons[activeStage]

  return (
    <div className="methodology-timeline-wrapper">
      {/* Desktop Horizontal / Mobile Step Navigation Bar */}
      <div className="timeline-stepper-nav" role="tablist">
        <div className="timeline-stepper-track">
          <div
            className="timeline-progress-fill"
            style={{ width: `${(activeStage / (defaultStages.length - 1)) * 100}%` }}
          />
        </div>

        {defaultStages.map((st, idx) => {
          const StepIcon = stageIcons[idx]
          const isSelected = activeStage === idx
          const isPassed = idx <= activeStage

          return (
              <button
                key={st.name}
                type="button"
                className={`timeline-step-btn ${isSelected ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                onClick={() => setActiveStage(idx)}
                role="tab"
                aria-selected={isSelected}
              >
                <div className="step-circle">
                  <StepIcon size={16} className="step-icon" />
                </div>
                <span className="step-label">{st.name}</span>
              </button>
            )
          })}
        </div>

        {/* Active Stage Detail Stage Card */}
        <div className="stage-detail-card animated-card">
          <span className="card-corner-tl" />
          <span className="card-corner-br" />

          <div className="stage-detail-grid">
            {/* Main Info */}
            <div className="stage-info-column">
              <div className="stage-meta-strip">
                <span className="stage-badge">ENGAGEMENT STAGE</span>
                <span className="stage-tagline">{current.tagline}</span>
                <div className="stage-duration-chip">
                  <Clock size={13} />
                  <span>{current.duration}</span>
                </div>
              </div>

              <h3 className="stage-title">
                {current.name}
              </h3>

            <p className="stage-description">{current.desc}</p>

            <div className="stage-deliverables-block">
              <span className="block-title">Key Engineering Deliverables:</span>
              <ul className="stage-deliverables-list">
                {current.deliverables.map((item, i) => (
                  <li key={i}>
                    <CheckCircle2 size={15} className="text-blue-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Outcomes & Methodology Links */}
          <div className="stage-outcome-column">
            <div className="outcome-highlight-box">
              <div className="outcome-icon-row">
                <Sparkles size={18} className="text-blue-500" />
                <span className="outcome-label">Verifiable Business Outcome</span>
              </div>
              <p className="outcome-text">{current.keyOutcome}</p>
            </div>

            <div className="stage-methods-box">
              <span className="methods-label">Methodology Frameworks Applied:</span>
              <div className="methods-tags-grid">
                {current.methods.map((m, mi) => (
                  <span key={mi} className="method-pill">{m}</span>
                ))}
              </div>
            </div>

            <div className="stage-action-row">
              <Link href="/book-ai-diagnostic" className="button button-primary button-sm">
                <span>Initiate Diagnostic Assessment</span>
                <ArrowUpRight size={16} />
              </Link>
              <Link href="/methodology-engine" className="button button-ghost button-sm">
                <span>Methodology Engine →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

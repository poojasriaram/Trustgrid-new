'use client'

import React from 'react'
import Link from 'next/link'
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Bot,
  Lock,
  Network,
  TrendingUp,
  Layers,
  Sparkles,
  CheckCircle2,
  Workflow,
  Zap,
  Clock,
  Gauge,
  Check,
  Building2,
  Boxes,
  Activity,
  SlidersHorizontal,
  Compass,
  KeyRound,
  FileCheck,
  Eye,
  Filter,
  BarChart3,
  Globe2,
  FileSpreadsheet,
  Award,
  Users
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MethodologyEngineSpecialSection } from '@/components/methodology-engine-special-section'
import { HeroSlider } from '@/components/ui/hero-slider'
import { OfferingSlider, PrimaryOffering } from '@/components/ui/offering-slider'
import { MarketGapsSlider, MarketGapItem } from '@/components/ui/market-gaps-slider'
import { InteractiveOperatingStack, StackLayerItem } from '@/components/ui/interactive-operating-stack'
import { MethodologyTimeline } from '@/components/ui/methodology-timeline'
import { IndustryShowcaseSlider } from '@/components/ui/industry-showcase-slider'
import { ComparisonTable } from '@/components/ui/comparison-table'
import { PrinciplesSlider } from '@/components/ui/principles-slider'
import { ICPSlider } from '@/components/ui/icp-slider'
import { EngagementModelsSlider } from '@/components/ui/engagement-models-slider'
import {
  solutions,
  differentiationData,
  operatingPrinciples,
  allIndustries
} from '@/lib/solutions'

const primaryOfferingsData: PrimaryOffering[] = [
  {
    groupTag: 'AI INFRASTRUCTURE',
    title: 'AI Infra & Data Center',
    slug: 'ai-infra-engineering',
    icon: Cpu,
    badge: 'HIGH-DENSITY COMPUTE',
    image: '/images/offering-infra.jpg',
    problem: 'GPU clusters suffer from 30–50% utilization while data center power & cooling walls halt scale.',
    solution: 'Turnkey engineering of high-density AI Factories (30–100kW/rack) with direct-to-chip liquid cooling, kernel-level accelerator tuning, and low-latency inference serving.',
    deliverables: [
      'High-Density Facility & Liquid Cooling Engineering',
      'Accelerator Cluster Topology (Blackwell, HGX, MI300X)',
      'Inference Optimization & KV-Cache Management',
      '24/7 Managed AI Factory & Predictive Maintenance'
    ],
    metric: '30–60% Inference Cost Reduction (TCO)',
    duration: '8–16 Wks Full Deployment'
  },
  {
    groupTag: 'AGENTIC ENTERPRISE',
    title: 'Agentic Enterprise',
    slug: 'ai-agentic-factory',
    icon: Bot,
    badge: 'AUTONOMOUS OPERATIONS',
    image: '/images/offering-agentic.jpg',
    problem: 'Enterprises remain trapped in fragile chatbot pilots unable to execute multi-step business operations.',
    solution: 'Architect, deploy, and govern production multi-agent systems with deterministic reasoning DAGs, persistent memory fabrics, and native Model Context Protocol (MCP) integrations.',
    deliverables: [
      'Autonomous Agent Design & Cognitive Blueprinting',
      'Multi-Agent Orchestration (LangGraph / CrewAI / AutoGen)',
      'Vertical Agent Fleets (Finance, Supply Chain, SRE)',
      'Enterprise AgentOps, Tracing & Real-Time Guardrails'
    ],
    metric: '>95% Task Accuracy with Deterministic SLA',
    duration: '6–12 Wks Sprints'
  },
  {
    groupTag: 'AI NETWORKING',
    title: 'AI Networking',
    slug: 'ai-networking',
    icon: Network,
    badge: 'LOSSLESS FABRIC',
    image: '/images/offering-networking.jpg',
    problem: 'Inter-node latency spikes and silent packet drops stall distributed AI training and inference.',
    solution: 'Ultra-low latency, non-blocking InfiniBand and RoCEv2 network fabrics engineered for zero packet loss, rail-optimized node alignment, and autonomous NOC telemetry.',
    deliverables: [
      'Lossless RoCEv2 & Quantum-2 InfiniBand Fabrics',
      'Rail-Optimized Dragonfly+ & Fat-Tree Topologies',
      'Collective Communications Tuning (NCCL / RCCL)',
      'Autonomous AI NOC & Telemetry-Driven Self-Healing'
    ],
    metric: 'Zero-Loss Packet Flow & Minimized Tail Jitter',
    duration: '4–8 Wks Optimization'
  },
  {
    groupTag: 'AI CYBERSECURITY',
    title: 'AI Cybersecurity',
    slug: 'ai-cybersecurity-quantum-safe',
    icon: Lock,
    badge: 'QUANTUM-SAFE DEFENSE',
    image: '/images/offering-security.jpg',
    problem: 'Novel AI attack surfaces (prompt injection, agent hijacking) paired with Harvest Now Decrypt Later quantum threats.',
    solution: 'Comprehensive security engineering protecting autonomous agents with zero-trust permissions while migrating enterprise cryptography to NIST Post-Quantum Cryptographic standards.',
    deliverables: [
      'L1–L7 Post-Quantum Cryptography (PQC / CBOM)',
      'Agent Guardrails, Prompt Firewalls & Model Defense',
      'Zero-Trust Identity for Non-Deterministic Agents',
      '24/7 Managed AI Security Operations Center (AI SOC)'
    ],
    metric: '100% Cryptographic Bill of Materials (CBOM) Visibility',
    duration: '6–12 Wks Transition'
  },
  {
    groupTag: 'TRUSTED AI',
    title: 'Trusted AI Engineering',
    slug: 'trusted-ai-transformation',
    icon: ShieldCheck,
    badge: 'EXPLAINABLE & GOVERNED',
    image: '/images/offering-trusted-ai.jpg',
    problem: 'Black-box non-deterministic AI decisions fail EU AI Act, NIST AI RMF, ISO 42001, and board oversight audits.',
    solution: 'Rigorous engineering of mathematical explainability (SHAP/LIME), continuous statistical process control (SPC), formal robustness testing, and immutable cryptographic decision audit trails.',
    deliverables: [
      'Mathematical Explainability (SHAP, LIME, Integrated Gradients)',
      'Deterministic AI Safety Guardrails & Robustness Verification',
      'EU AI Act & NIST AI RMF Automated Compliance Gateways',
      'Immutable Decision Logging, Causal Provenance & Audit Replay'
    ],
    metric: '100% Verifiable Auditability & Zero Black-Box Risk',
    duration: '6–16 Wks Full Assurance'
  },
  {
    groupTag: 'VALUE ENGINEERING',
    title: 'AI Value Engineering',
    slug: 'ai-value-engineering',
    icon: TrendingUp,
    badge: 'FINANCIAL ATTRIBUTION',
    image: '/images/offering-value.jpg',
    problem: 'Opaque AI returns, untracked token sprawl, and failure to bridge compute spend directly to CFO balance sheets.',
    solution: 'Industrial operational excellence (Lean Thinking, Theory of Constraints, DMAIC) combined with AI FinOps to prioritize high-yield initiatives and ensure compounding business ROI.',
    deliverables: [
      'AI Value Discovery & Economic Opportunity Mapping',
      'Unit Economics & Cost-Per-Task Token Modeling',
      'Theory of Constraints (TOC) Bottleneck Removal',
      'Value Realization Office (VRO) Governance & Dashboards'
    ],
    metric: '3–10x Measurable Production ROI in 90 Days',
    duration: '4–12 Wks Value Sprint'
  }
]

const enrichedGapsData: MarketGapItem[] = [
  {
    number: 'Infrastructure',
    name: 'The Infrastructure Gap',
    tagline: 'Underutilized & Misarchitected Compute',
    description: 'Over 70% of enterprise AI budgets are consumed by infrastructure that is underutilized, misarchitected, or operationally immature. GPU clusters sit idle at 30–50% utilization. Inference costs balloon uncontrollably while the promise of AI economics fails to materialize.',
    image: '/images/offering-infra.jpg',
    resolution: 'Purpose-engineered AI Factories with direct-to-chip liquid cooling, continuous KV-cache tuning, and kernel micro-optimization delivering 30–70% higher GPU utilization.',
    impactLabel: '30–60% Inference Cost Reduction (TCO)'
  },
  {
    number: 'Agentic',
    name: 'The Agentic Gap',
    tagline: 'From Copilots to Autonomous Fleets',
    description: 'The shift from simple chatbots to autonomous multi-agent systems is the most consequential architectural change since the internet. Most enterprises lack the engineering capability to architect, govern, evaluate, and scale agent fleets safely.',
    image: '/images/offering-agentic.jpg',
    resolution: 'Production multi-agent systems with deterministic reasoning DAGs, persistent memory fabrics, tool sandboxing, and real-time AgentOps tracing.',
    impactLabel: '>95% Task Completion with SLA Enforced'
  },
  {
    number: 'Trust',
    name: 'The Trust Gap',
    tagline: 'Black-Box Decisions in High-Stakes Environments',
    description: 'As AI systems take autonomous actions and make consequential decisions, trust is the non-negotiable precondition for adoption. Black-box models cannot survive regulatory scrutiny, board oversight, or public accountability.',
    image: '/images/offering-security.jpg',
    resolution: 'Mathematical explainability (SHAP/LIME), certified robustness verification, and immutable cryptographic audit trails ensuring EU AI Act & NIST compliance.',
    impactLabel: '100% Verifiable Auditability & Zero Black-Box Risk'
  },
  {
    number: 'Security',
    name: 'The Security Gap',
    tagline: 'Novel AI Attack Surfaces & the Quantum Threat',
    description: 'AI introduces entirely new attack surfaces — prompt injection, agent hijacking, data poisoning, and model theft — while quantum computing and Harvest Now Decrypt Later campaigns render today\'s cryptographic foundations obsolete.',
    image: '/images/offering-networking.jpg',
    resolution: 'Zero-trust agent permissions, runtime prompt firewalls, automated Cryptographic Bill of Materials (CBOM), and NIST Post-Quantum Cryptography migration.',
    impactLabel: 'L1–L7 Quantum-Resistant Cryptographic Defense'
  },
  {
    number: 'Value',
    name: 'The Value Gap',
    tagline: 'Opaque ROI & Unsustainable Cost of Intelligence',
    description: 'Billions are invested globally, yet the majority of enterprises cannot clearly attribute measurable business value to their AI spend. The cost of intelligence remains too high, and returns remain opaque without operational excellence rigor.',
    image: '/images/offering-value.jpg',
    resolution: 'Industrial operational excellence (Theory of Constraints, Lean Thinking, DMAIC) paired with AI FinOps unit economics directly tied to CFO balance sheets.',
    impactLabel: '3–10x Realized Enterprise ROI in 90 Days'
  }
]

const enrichedLayersData: StackLayerItem[] = [
  {
    number: 'INFRA',
    title: 'Efficient AI Infrastructure',
    description: 'Purpose-engineered AI Factories delivering maximum intelligence per dollar and watt.',
    slug: 'ai-infra-engineering',
    icon: Cpu,
    image: '/images/hero-ai-infra.jpg',
    capabilities: [
      'High-Density Facility (30–100kW/rack) & Liquid Cooling',
      'Accelerator Cluster Topology (NVIDIA Blackwell, AMD MI300X)',
      'Low-Latency Inference Serving (vLLM / TensorRT-LLM)'
    ],
    impactMetric: '30–60% Inference Cost Reduction'
  },
  {
    number: 'AGENTS',
    title: 'Autonomous Agentic Systems',
    description: 'Digital workers and multi-agent systems turning autonomy into compounding capability.',
    slug: 'ai-agentic-factory',
    icon: Bot,
    image: '/images/offering-agentic.jpg',
    capabilities: [
      'Hierarchical, Swarm & Consensus Orchestration Protocols',
      'Persistent Memory Fabrics (Episodic, Semantic, Working)',
      'Enterprise Tool Integrations via Model Context Protocol (MCP)'
    ],
    impactMetric: '50–80% Process Cycle Time Reduction'
  },
  {
    number: 'TRUST',
    title: 'Trusted, Governed Intelligence',
    description: 'Explainable, robust, auditable AI meeting strict global regulatory and board standards.',
    slug: 'trusted-ai-transformation',
    icon: ShieldCheck,
    image: '/images/offering-security.jpg',
    capabilities: [
      'Mathematical Explainability (SHAP, LIME, Integrated Gradients)',
      'Automated EU AI Act, NIST AI RMF & ISO 42001 Gateways',
      'Immutable Cryptographic Decision Logging & Audit Replay'
    ],
    impactMetric: '100% Instrumented Auditability'
  },
  {
    number: 'CYBER',
    title: 'Secure & Quantum-Ready Foundations',
    description: 'Zero-trust agent protection and post-quantum cryptographic transitions (PQC / CBOM).',
    slug: 'ai-cybersecurity-quantum-safe',
    icon: Lock,
    image: '/images/offering-security.jpg',
    capabilities: [
      'NIST Post-Quantum Cryptography (CRYSTALS-Kyber/Dilithium)',
      'Zero-Trust Cryptographic Identity for Autonomous Agents',
      '24/7 Managed AI Security Operations Center (AI SOC)'
    ],
    impactMetric: 'Complete Cryptographic Asset Agility'
  },
  {
    number: 'FABRIC',
    title: 'High-Performance AI Networking',
    description: 'Ultra-low latency InfiniBand/RoCEv2 fabrics connecting distributed AI compute lines.',
    slug: 'ai-networking',
    icon: Network,
    image: '/images/offering-networking.jpg',
    capabilities: [
      'Lossless RoCEv2 & Quantum-2 InfiniBand Network Fabrics',
      'Rail-Optimized Dragonfly+ & Fat-Tree Network Topologies',
      'Autonomous Self-Healing Network NOC & Jitter Telemetry'
    ],
    impactMetric: 'Zero Packet Drops at Full Line Speed'
  },
  {
    number: 'TRANSFORM',
    title: 'Rapid Organizational Transformation',
    description: 'Accelerating enterprises from pilot purgatory to production-scale AI operations in months.',
    slug: 'trusted-ai-transformation',
    icon: Workflow,
    image: '/images/methodology-engine.jpg',
    capabilities: [
      'Internal AI Factory & Agent Factory Operating Hubs',
      'Hoshin Kanri Strategic Policy Deployment & Scorecards',
      'Cross-Functional Workforce Literacy & Co-Engineering Sprints'
    ],
    impactMetric: '90-Day Sprint to First Measurable Value'
  },
  {
    number: 'VALUE',
    title: 'Measurable, Compounding Business Value',
    description: 'Operational excellence (Lean, TOC, DMAIC) and AI FinOps ensuring 3-10x ROI.',
    slug: 'ai-value-engineering',
    icon: TrendingUp,
    image: '/images/offering-value.jpg',
    capabilities: [
      'Theory of Constraints (TOC) Infrastructure Bottleneck Removal',
      'Unit Economics & Cost-Per-Task Token Modeling',
      'Value Realization Office (VRO) Governance & Telemetry'
    ],
    impactMetric: '3–10x Realized Enterprise ROI'
  }
]

export default function HomePage() {
  return (
    <main className="page-wrapper">
      <SiteHeader />

      {/* 1. HERO 6-SLIDE INTERACTIVE CAROUSEL */}
      <HeroSlider />

      {/* 2. PRIMARY OFFERINGS SHOWCASE - HORIZONTAL SLIDER */}
      <section className="section offerings-showcase" id="offerings">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">PRIMARY OFFERINGS</span>
            <p className="section-label">Enterprise AI Offering Architecture</p>
          </div>
          <span className="section-index">OFFERINGS</span>
        </div>

        <div className="showcase-header">
          <h2>
            Purpose-built offerings. <span>Engineered for enterprise outcomes.</span>
          </h2>
          <p>
            Six dedicated engineering practices designed to solve the critical bottlenecks in compute efficiency, multi-agent autonomy, network throughput, cybersecurity, trusted AI governance, and financial realization.
          </p>
        </div>

        {/* Dynamic Offering Horizontal Slider */}
        <OfferingSlider offerings={primaryOfferingsData} />
      </section>

      {/* ICP / TARGET AUDIENCE CLARITY SLIDER */}
      <section className="section icp-section" id="icp">
        <ICPSlider />
      </section>

      {/* WHY TRUSTGRID EXISTS - THE 5 GAPS (INTERACTIVE STORYTELLING SLIDER) */}
      <section className="section why-section" id="why">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">MARKET CONTEXT</span>
            <p className="section-label">Why TrustGrid Exists — The Critical Market Gaps</p>
          </div>
          <span className="section-index">MARKET GAPS</span>
        </div>

        <div className="why-heading">
          <h2>
            Critical gaps stand between AI experimentation and <span>enterprise-grade operations.</span>
          </h2>
          <p>
            Organizations are moving beyond exploratory prototypes. They require industrial engineering rigor to solve infrastructure waste, unmonitored agent hallucination, network congestion, and ambiguous ROI.
          </p>
        </div>

        {/* Interactive Market Gaps Slider */}
        <MarketGapsSlider gaps={enrichedGapsData} />
      </section>

      {/* OPERATING MODEL (INTERACTIVE ARCHITECTURE STACK) */}
      <section className="section stack-section" id="stack">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">OPERATING MODEL</span>
            <p className="section-label">Integrated Full-Stack Architecture</p>
          </div>
          <span className="section-index">ARCHITECTURE</span>
        </div>

        <div className="stack-heading">
          <h2>
            A vertically integrated operating stack for <span>enterprise AI.</span>
          </h2>
          <p>
            Every layer reinforces every adjacent layer. Infrastructure feeds lossless networks; networks sustain low-latency compute; compute powers autonomous agents; cybersecurity protects execution; and value engineering guarantees compounding financial yield.
          </p>
        </div>

        {/* Interactive Operating Stack */}
        <InteractiveOperatingStack layers={enrichedLayersData} />
      </section>

      {/* ENGAGEMENT JOURNEY */}
      <section className="section engagement-section" id="engagement">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">ENGAGEMENT JOURNEY</span>
            <p className="section-label">The Path from Diagnostic to Production Scale</p>
          </div>
          <span className="section-index">METHODOLOGY</span>
        </div>

        <div className="engagement-heading">
          <h2>
            Structured, accountable execution. <span>From Diagnostic to Compounding Value.</span>
          </h2>
          <p>
            We do not sell open-ended consulting hours or vague prototypes. Every engagement follows a deterministic engineering pathway with explicit deliverables, milestones, and verifiable business impact.
          </p>
        </div>

        {/* Interactive Engagement Models Slider */}
        <div style={{ marginBottom: '40px' }}>
          <EngagementModelsSlider />
        </div>

        {/* Interactive Methodology Timeline */}
        <MethodologyTimeline />
      </section>

      {/* AI METHODOLOGY ENGINE SHOWCASE */}
      <section className="section methodology-section" id="methodology">
        <MethodologyEngineSpecialSection />
      </section>

      {/* DIFFERENTIATION FRAMEWORK */}
      <section className="section differentiation-section" id="differentiation">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">WHY TRUSTGRID IS DIFFERENT</span>
            <p className="section-label">TrustGrid vs Typical AI Vendors & Strategy Consultancies</p>
          </div>
          <span className="section-index">DIFFERENTIATION</span>
        </div>

        <div className="differentiation-heading">
          <h2>
            A fundamentally different model for <span>the AGI era.</span>
          </h2>
          <p>
            Most AI vendors deliver isolated point tools or PowerPoint strategy decks. TrustGrid delivers full-stack systems engineering, hardware-level rigor, and verifiable P&L outcome accountability.
          </p>
        </div>

        {/* Interactive Comparison Component */}
        <ComparisonTable data={differentiationData} />
      </section>

      {/* REGULATED INDUSTRIES DOMAIN COVERAGE */}
      <section className="section industries-section" id="industries">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">DOMAIN MASTERY</span>
            <p className="section-label">Engineered Across Regulated Global Industries</p>
          </div>
          <span className="section-index">INDUSTRIES</span>
        </div>

        <div className="industries-heading">
          <h2>
            Deep domain specialization. <span>Zero generic solutions.</span>
          </h2>
          <p>
            Our engineering architectures, agent fleets, and compliance models are pre-calibrated to the strict regulatory and operational realities of mission-critical global industries.
          </p>
        </div>

        {/* Industry Showcase Slider */}
        <IndustryShowcaseSlider />

        {/* Industry Pill Grid */}
        <div className="industries-pill-grid" style={{ marginTop: '36px' }}>
          {allIndustries.map((ind, i) => (
            <div key={i} className="industry-coverage-card">
              <Building2 size={16} className="text-blue-500 shrink-0" />
              <span>{ind}</span>
            </div>
          ))}
        </div>
      </section>

      {/* OPERATING PRINCIPLES (INTERACTIVE CORE DNA SLIDER) */}
      <section className="section principles-section" id="principles">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">CORE DNA</span>
            <p className="section-label">TrustGrid Operating Principles</p>
          </div>
          <span className="section-index">PRINCIPLES</span>
        </div>

        <div className="principles-heading">
          <h2>
            Engineered on non-negotiable <span>operating principles.</span>
          </h2>
          <p>
            How TrustGrid approaches every problem, designs every system, and delivers compounding enterprise capability.
          </p>
        </div>

        {/* Interactive Principles Slider */}
        <PrinciplesSlider principles={operatingPrinciples} />
      </section>

      {/* GLOBAL DIAGNOSTIC CTA PANEL */}
      <section className="section cta-section" id="contact">
        <div className="cta-panel animated-card reveal-up">
          <span className="card-corner-tl" />
          <span className="card-corner-br" />
          <div className="cta-circuit-bg" />
          <div className="cta-content">
            <span className="section-label" style={{ color: '#91b3ff' }}>
              GLOBAL CONTACT & ENGAGEMENT
            </span>
            <h2>
              Engineering enterprise AI for the <span>AGI era.</span>
            </h2>
            <p className="cta-lead">
              Every layer of the stack. Every dimension of trust. Every unit of value. Begin with a structured AI Diagnostic to assess your infrastructure, agentic readiness, trust posture, and value economics.
            </p>
            <div className="cta-highlights">
              <div className="cta-pill">
                <Check size={16} />
                <span>Executive-Level Clarity</span>
              </div>
              <div className="cta-pill">
                <Check size={16} />
                <span>Deep Systems Engineering</span>
              </div>
              <div className="cta-pill">
                <Check size={16} />
                <span>90-Day ROI Roadmap</span>
              </div>
            </div>
          </div>
          <div className="cta-actions">
            <Link className="button button-light" href="/book-ai-diagnostic">
              <span>Book your AI diagnostic</span>
              <ArrowUpRight size={17} />
            </Link>
            <Link className="button button-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.25)' }} href="/contact">
              <span>Contact Us Directly</span>
              <ArrowRight size={16} />
            </Link>
            <span className="cta-subtext">Typically 2–4 weeks structured engagement with senior AI architects.</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <SiteFooter />
    </main>
  )
}

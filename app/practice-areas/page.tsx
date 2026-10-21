import { Metadata } from 'next'
import Link from 'next/link'
import './practice-areas.css'
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  Sparkles,
  Layers,
  Cpu,
  Bot,
  Network,
  Database,
  ShieldCheck,
  Activity,
  Workflow,
  TrendingUp,
  FileCheck,
  SlidersHorizontal,
  FileText,
  Boxes,
  Zap,
  Lock,
  Compass,
  CheckCircle2,
  Building2,
  Users
} from 'lucide-react'
import {
  functionalPractices,
  technologyPractices,
  crossCuttingCapabilities,
  allPracticeAreas,
  industryOutcomes,
  engagementModelCards
} from '@/lib/practice-areas-data'
import { PracticeAreasDirectory } from '@/components/practice-areas/practice-directory'
import { PracticeDivisionsExplorer } from '@/components/practice-areas/practice-divisions-explorer'
import { ComprehensivePracticeExplorer } from '@/components/practice-areas/comprehensive-explorer'

export const metadata: Metadata = {
  title: 'Enterprise AI Engineering Practice Areas | TRUSTGRID.AI',
  description:
    'Explore TRUSTGRID.AI enterprise practice areas across Functional Practices, Technology Practices, and Cross-Cutting Engineering Capabilities. High-density compute, agentic orchestration, lossless networking, and mathematical value engineering.',
  keywords: [
    'AI Engineering Practice Areas',
    'Forward Deployment Engineering',
    'AI Value Engineering',
    'AI Infrastructure Compute',
    'Agentic AI Multi-Agent Orchestration',
    'Lossless AI Networking',
    'AI SRE Observability',
    'AI FinOps'
  ],
  alternates: {
    canonical: 'https://trustgrid.ai/practice-areas'
  },
  openGraph: {
    title: 'Enterprise AI Engineering Practice Areas | TRUSTGRID.AI',
    description:
      'Full-spectrum systems engineering and functional practices architecting, deploying, securing, and operating production-grade enterprise AI.',
    url: 'https://trustgrid.ai/practice-areas',
    type: 'website'
  }
}


const engagementPathway = [
  {
    step: '01',
    title: 'Discovery & Architectural Diagnostic',
    timeline: 'Weeks 1–2',
    description:
      'Comprehensive audit of current infrastructure, data topologies, compute bottlenecks, and value stream economics to establish a mathematically sound baseline.',
    outcome: 'Definitive Architecture Audit & Prioritized Value Roadmap'
  },
  {
    step: '02',
    title: 'Forward Deployment & Co-Engineering',
    timeline: 'Weeks 3–6',
    description:
      'Embedded TRUSTGRID.AI systems engineers deploy directly into client environments, pairing with internal teams to build resilient prototypes and containerized pipelines.',
    outcome: 'Production-Ready Microservices & Infrastructure-as-Code'
  },
  {
    step: '03',
    title: 'Validation & Value Assurance Gating',
    timeline: 'Weeks 7–8',
    description:
      'Independent stress testing, algorithmic red-teaming, P99 latency verification, and regulatory compliance audit through our four-gate assurance framework.',
    outcome: 'Certified Compliance, Security & Performance Sign-Off'
  },
  {
    step: '04',
    title: 'Production Cutover & Managed Operations',
    timeline: 'Week 9+',
    description:
      'Canary deployment with zero downtime, continuous telemetry baselines, and 24/7 SRE monitoring backed by stringent uptime and response SLAs.',
    outcome: '99.99% Availability & Real-Time Unit-Economic Tracking'
  },
  {
    step: '05',
    title: 'Capability Transfer & Sovereignty',
    timeline: 'Transfer Phase',
    description:
      'Turnkey DBOT delivery: complete code ownership, structured architectural bootcamps, and runbooks empowering internal teams to operate and scale autonomously.',
    outcome: '100% Operational Sovereignty & Zero Vendor Lock-In'
  }
]

export default function PracticeAreasPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Enterprise AI Engineering Practice Areas | TRUSTGRID.AI',
    description:
      'Comprehensive enterprise practice areas covering Functional Practices, Technology Practices, and Cross-Cutting Capabilities.',
    url: 'https://trustgrid.ai/practice-areas',
    publisher: {
      '@type': 'Organization',
      name: 'TRUSTGRID.AI',
      url: 'https://trustgrid.ai',
      logo: 'https://trustgrid.ai/logo.png'
    }
  }

  return (
    <div className="practice-areas-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SECTION */}
      <section className="pa-hero-section">
        <div className="pa-hero-glow" aria-hidden="true" />
        <div className="container">
          <div className="pa-hero-badge">
            <span className="pulse-dot" />
            <span>FULL-SPECTRUM SYSTEMS INTEGRATION &amp; PRACTICE AREAS</span>
          </div>

          <h1 className="pa-hero-title">
            AI Consulting <span className="text-gradient">Practice Areas</span>
          </h1>

          <p className="pa-hero-description" style={{ maxWidth: '820px' }}>
            TRUSTGRID.AI combines industry expertise, AI engineering, enterprise data integration, and intelligent automation to solve complex business challenges.
          </p>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl mx-auto mt-3">
            We help organizations transform business operations, optimize technology infrastructure, accelerate decision-making, and implement secure, scalable AI solutions with measurable business outcomes. Our Practice Areas bring together industry-specific expertise and cross-industry capabilities to help enterprises move from strategy to production-ready implementation.
          </p>

          <div className="pa-hero-stats">
            <div className="pa-stat-card">
              <span className="pa-stat-number">8</span>
              <span className="pa-stat-label">Industry Verticals</span>
            </div>
            <div className="pa-stat-divider" />
            <div className="pa-stat-card">
              <span className="pa-stat-number">34</span>
              <span className="pa-stat-label">Sub-Verticals</span>
            </div>
            <div className="pa-stat-divider" />
            <div className="pa-stat-card">
              <span className="pa-stat-number">15</span>
              <span className="pa-stat-label">Cross-Industry Practices</span>
            </div>
            <div className="pa-stat-divider" />
            <div className="pa-stat-card">
              <span className="pa-stat-number">148</span>
              <span className="pa-stat-label">Production Practice Areas</span>
            </div>
          </div>

          <div className="pa-hero-actions">
            <Link href="#primary-categories" className="button button-primary">
              <span>Explore Practice Categories</span>
              <ArrowRight size={15} />
            </Link>
            <Link href="#engagement-models" className="button button-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#ffffff' }}>
              <span>View Engagement Models</span>
              <ArrowDown size={14} />
            </Link>
            <Link href="/book-ai-diagnostic#diagnostic-form-section" className="button button-outline">
              <span>Schedule Architecture Diagnostic</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TWO PRIMARY CATEGORIES SHOWCASE */}
      <section className="py-14 bg-slate-950/90 border-b border-slate-800" id="primary-categories">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Category 1: Industry Vertical Practices */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-500/30 hover:border-blue-500/60 transition-all flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    PRIMARY CATEGORY 1
                  </span>
                  <span className="text-xs text-slate-400 font-mono">8 Verticals · 34 Sub-Verticals</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  Industry Vertical Practices
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">
                  Deliver AI-powered solutions tailored to the operational requirements, business models, and regulatory environments of different industries.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 mb-6 font-medium">
                  <div className="flex items-center gap-1.5 p-2 rounded bg-slate-900/80 border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>Manufacturing &amp; Industrial</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded bg-slate-900/80 border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>Financial Services &amp; BFSI</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded bg-slate-900/80 border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>Retail, Wholesale &amp; CPG</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded bg-slate-900/80 border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>Healthcare &amp; Life Sciences</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded bg-slate-900/80 border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>Energy &amp; Utilities</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded bg-slate-900/80 border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>Mobility &amp; Logistics</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded bg-slate-900/80 border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>Telecom &amp; Digital Platforms</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded bg-slate-900/80 border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>Public Sector &amp; Defense</span>
                  </div>
                </div>
              </div>
              <Link href="#comprehensive-explorer" className="button button-primary w-fit text-xs">
                <span>Explore Industry Verticals</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Category 2: Cross-Industry Practices */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/30 hover:border-cyan-500/60 transition-all flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    PRIMARY CATEGORY 2
                  </span>
                  <span className="text-xs text-slate-400 font-mono">15 Horizontal Disciplines</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  Cross-Industry Practices
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">
                  Provide reusable enterprise capabilities across governance, finance, workforce, revenue, supply chain, cybersecurity, customer operations, data management, enterprise knowledge, technology operations, and legal functions.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 mb-6 font-medium">
                  <div className="flex items-center gap-1.5 p-2 rounded bg-slate-900/80 border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Governance, Risk &amp; GRC</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded bg-slate-900/80 border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>ESG &amp; Sustainability</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded bg-slate-900/80 border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Workforce Transformation</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded bg-slate-900/80 border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>AI FinOps &amp; Finance Command</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded bg-slate-900/80 border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Revenue &amp; Sales Acceleration</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded bg-slate-900/80 border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Supply Chain &amp; Demand Chain</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded bg-slate-900/80 border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Cybersecurity &amp; AI Security</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded bg-slate-900/80 border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>End-to-End Data &amp; Knowledge</span>
                  </div>
                </div>
              </div>
              <Link href="#comprehensive-explorer" className="button button-outline w-fit text-xs">
                <span>Explore Cross-Industry Capabilities</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. AI ENGINEERING & VALUE REALIZATION CONNECTIVITY */}
      <section className="py-16 bg-slate-900/40 border-b border-slate-800" id="value-realization">
        <div className="container">
          <div className="section-head text-center max-w-3xl mx-auto mb-12">
            <span className="badge badge-accent">Supporting Framework</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-2">
              AI Engineering &amp; Value Realization
            </h2>
            <p className="text-slate-300 mt-2 text-sm leading-relaxed">
              How TRUSTGRID.AI connects business objectives, AI architecture, data foundations, implementation, governance, and measurable outcomes into a unified delivery chain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-blue-500/40 transition-colors">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider block mb-2">01 · Strategic Alignment</span>
              <h3 className="text-lg font-bold text-white mb-2">Business Objectives</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Ground every AI initiative in board-level value streams. We decompose strategic priorities into measurable P&amp;L outcomes: Cost Down, Cash Out, Revenue Up, and Risk Down.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-2">02 · Systems Design</span>
              <h3 className="text-lg font-bold text-white mb-2">AI Architecture</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Deterministic multi-agent swarms, model routing, high-density GPU computing, and lossless networking fabrics engineered for resilient, low-latency execution.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition-colors">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider block mb-2">03 · Semantic Fabric</span>
              <h3 className="text-lg font-bold text-white mb-2">Data Foundations</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                End-to-end data pipelines, master data governance, semantic knowledge graphs, and hybrid retrieval-augmented generation ensuring zero hallucination.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 transition-colors">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-2">04 · Productionization</span>
              <h3 className="text-lg font-bold text-white mb-2">Production Implementation</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Forward Deployed Engineers (FDEs) embedded directly on-site to build, harden, and scale production containerized microservices under turnkey DBOT.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-colors">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-2">05 · Board Defense</span>
              <h3 className="text-lg font-bold text-white mb-2">Governance &amp; Risk</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                EU AI Act readiness, continuous automated audit evidence, model risk management (SR 11-7), algorithmic red-teaming, and deterministic human-in-the-loop rails.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-purple-500/40 transition-colors">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider block mb-2">06 · Value Verification</span>
              <h3 className="text-lg font-bold text-white mb-2">Measurable Outcomes</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Contractually banked KPIs verified against financial baselines. Commercial milestones tied directly to certified operational performance and unit economics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPREHENSIVE PRACTICE AREAS EXPLORER */}
      <section className="py-16 bg-slate-950 border-b border-slate-800" id="comprehensive-explorer">
        <div className="container">
          <div className="section-head text-center mb-8 max-w-3xl mx-auto">
            <span className="badge badge-accent">Enterprise Practice Areas</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-2">
              Industry Verticals &amp; Cross-Industry Practices
            </h2>
            <p className="text-slate-300 mt-2 text-sm leading-relaxed">
              Explore all 8 industry verticals (34 sub-verticals, 103 practice areas) and 15 cross-industry functional practices (45 practice areas). Every practice defines solution acceleration, KPIs banked, time to value, and value assurance.
            </p>
          </div>

          <ComprehensivePracticeExplorer />
        </div>
      </section>

      {/* 3. PRACTICE ARCHITECTURE & DELIVERY CONSOLE */}
      <section className="py-16 bg-slate-950/80 border-b border-slate-800" id="practice-architecture">
        <div className="container">
          <div className="section-head text-center mb-8 max-w-3xl mx-auto">
            <span className="badge badge-primary">Operating Architecture &amp; Delivery</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-2">
              Enterprise Practice Architecture
            </h2>
            <p className="text-slate-300 mt-2 text-sm leading-relaxed">
              Explore TRUSTGRID.AI across Engagement Models, Engineering Practices, Functional Practices, Industry Blueprints, and Value Engineering.
            </p>
          </div>

          <PracticeDivisionsExplorer />
        </div>
      </section>

      {/* 3. INTERACTIVE SEARCHABLE / FILTERABLE PRACTICE DIRECTORY */}
      <section className="py-16 bg-slate-900/40 border-b border-slate-800" id="practice-directory">
        <div className="container">
          <div className="section-head text-center mb-10">
            <span className="badge badge-accent">Interactive Directory</span>
            <h2 className="text-3xl font-bold text-white mt-2">
              Filter by Practice Domain
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto mt-2 text-sm">
              Quickly locate specialized technical capabilities, functional practices, and cross-cutting integration frameworks.
            </p>
          </div>

          <PracticeAreasDirectory practices={allPracticeAreas} />
        </div>
      </section>

      {/* 3. FUNCTIONAL PRACTICES SECTION */}
      <section className="py-20" id="functional-practices">
        <div className="container">
          <div className="section-head mb-12">
            <span className="badge badge-primary">Strategic Alignment &amp; Economics</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3">
              Functional Practices
            </h2>
            <p className="text-slate-300 max-w-3xl mt-3 text-base leading-relaxed">
              Disciplined business, economic, and governance methodologies connecting AI 
              initiatives directly to P&amp;L impact, board assurance, and enterprise regulatory readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {functionalPractices.map((practice) => (
              <div key={practice.slug} className="pa-card group">
                <div className="pa-card-header">
                  <div className="pa-card-badge-row">
                    <span className="pa-category-pill">{practice.categoryLabel}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-2 group-hover:text-blue-400 transition-colors">
                    {practice.title}
                  </h3>
                  <p className="text-slate-400 text-sm mt-2 line-clamp-3">
                    {practice.tagline}
                  </p>
                </div>

                <div className="pa-card-body">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-2">
                    Core Engineering Deliverables
                  </h4>
                  <ul className="pa-capability-list">
                    {practice.deliverables.slice(0, 3).map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 size={13} className="text-blue-500 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 pt-3 border-t border-slate-800">
                    <span className="text-[11px] text-slate-400 block mb-1">Target Outcome:</span>
                    <span className="text-xs font-semibold text-emerald-400">
                      {practice.outcomesAndKpis[0]?.metric} — {practice.outcomesAndKpis[0]?.description}
                    </span>
                  </div>
                </div>

                <div className="pa-card-footer">
                  <Link
                    href={`/practice-areas/${practice.slug}`}
                    className="pa-explore-link"
                    aria-label={`Explore ${practice.title}`}
                  >
                    <span>Explore Practice Blueprint</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TECHNOLOGY PRACTICES SECTION */}
      <section className="py-20 bg-slate-950/60 border-t border-slate-800" id="technology-practices">
        <div className="container">
          <div className="section-head mb-12">
            <span className="badge badge-accent">Core Systems Engineering</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3">
              Technology Practices
            </h2>
            <p className="text-slate-300 max-w-3xl mt-3 text-base leading-relaxed">
              Full-stack technical engineering from high-density liquid-cooled compute and 
              lossless 800G networking to autonomous agent swarms, context retrieval, and quantum-safe defense.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologyPractices.map((practice) => (
              <div key={practice.slug} className="pa-card group">
                <div className="pa-card-header">
                  <div className="pa-card-badge-row">
                    <span className="pa-category-pill pa-pill-tech">{practice.categoryLabel}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-2 group-hover:text-cyan-400 transition-colors">
                    {practice.title}
                  </h3>
                  <p className="text-slate-400 text-sm mt-2 line-clamp-3">
                    {practice.tagline}
                  </p>
                </div>

                <div className="pa-card-body">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-2">
                    Key Technical Capabilities
                  </h4>
                  <ul className="pa-capability-list">
                    {practice.capabilities.slice(0, 3).map((cap, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 size={13} className="text-cyan-500 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 pt-3 border-t border-slate-800">
                    <span className="text-[11px] text-slate-400 block mb-1">Performance Benchmark:</span>
                    <span className="text-xs font-semibold text-cyan-400">
                      {practice.outcomesAndKpis[0]?.metric} — {practice.outcomesAndKpis[0]?.description}
                    </span>
                  </div>
                </div>

                <div className="pa-card-footer">
                  <Link
                    href={`/practice-areas/${practice.slug}`}
                    className="pa-explore-link"
                    aria-label={`Explore ${practice.title}`}
                  >
                    <span>Explore Technology Architecture</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CROSS-CUTTING ENGINEERING CAPABILITIES SECTION */}
      <section className="py-20 border-t border-slate-800" id="cross-cutting-capabilities">
        <div className="container">
          <div className="section-head mb-12">
            <span className="badge badge-secondary">Shared Capabilities</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3">
              Cross-Cutting Engineering Capabilities
            </h2>
            <p className="text-slate-300 max-w-3xl mt-3 text-base leading-relaxed">
              Foundational disciplines that span every functional and technology practice — ensuring 
              cohesive architecture, resilient productionization, secure integration, and complete client sovereignty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crossCuttingCapabilities.map((practice) => (
              <div key={practice.slug} className="pa-card group">
                <div className="pa-card-header">
                  <div className="pa-card-badge-row">
                    <span className="pa-category-pill pa-pill-cross">{practice.categoryLabel}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-2 group-hover:text-indigo-400 transition-colors">
                    {practice.title}
                  </h3>
                  <p className="text-slate-400 text-sm mt-2 line-clamp-3">
                    {practice.tagline}
                  </p>
                </div>

                <div className="pa-card-body">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-2">
                    Enterprise Impact
                  </h4>
                  <ul className="pa-capability-list">
                    {practice.capabilities.slice(0, 3).map((cap, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 size={13} className="text-indigo-500 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 pt-3 border-t border-slate-800">
                    <span className="text-[11px] text-slate-400 block mb-1">Autonomy Metric:</span>
                    <span className="text-xs font-semibold text-indigo-400">
                      {practice.outcomesAndKpis[0]?.metric} — {practice.outcomesAndKpis[0]?.description}
                    </span>
                  </div>
                </div>

                <div className="pa-card-footer">
                  <Link
                    href={`/practice-areas/${practice.slug}`}
                    className="pa-explore-link"
                    aria-label={`Explore ${practice.title}`}
                  >
                    <span>View Engineering Standards</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRACTICE-TO-INDUSTRY OUTCOMES & VALUE IMPACT */}
      <section className="py-20 bg-slate-950/70 border-t border-slate-800" id="industry-outcomes">
        <div className="container">
          <div className="section-head text-center max-w-3xl mx-auto mb-14">
            <span className="badge badge-accent">Vertical Industrialization &amp; P&amp;L Outcomes</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3">
              Industry Outcomes &amp; Value Impact
            </h2>
            <p className="text-slate-300 mt-3 text-base">
              How our functional and technical practices converge into quantified, board-level balance sheet impact across mission-critical enterprise sectors.
            </p>
          </div>

          <div className="pa-outcome-grid">
            {industryOutcomes.map((item) => (
              <div key={item.id} className="pa-outcome-card">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white leading-snug">
                      {item.industry}
                    </h3>
                    <Link
                      href={item.anchor}
                      className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 shrink-0 mt-0.5"
                    >
                      <span>Sector Blueprint</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>

                  <p className="text-slate-300 text-xs mb-4 leading-relaxed font-light">
                    {item.highlight}
                  </p>

                  {/* Quantifiable KPI Metrics */}
                  <div className="pa-metric-grid">
                    {item.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="pa-metric-item">
                        <span className="pa-metric-val">{m.value}</span>
                        <span className="pa-metric-lbl">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* 4-Way Value Impact Ledger */}
                  <div className="pa-value-ledger">
                    <span className="pa-value-ledger-title">
                      <Sparkles size={11} className="text-cyan-400" />
                      4-Way Value Impact Ledger
                    </span>
                    <div className="pa-value-grid">
                      <div className="pa-value-cell">
                        <span className="pa-value-tag pa-val-cost">📉 Cost Down</span>
                        <p className="pa-value-text">{item.valueImpact.costDown}</p>
                      </div>
                      <div className="pa-value-cell">
                        <span className="pa-value-tag pa-val-rev">📈 Revenue Up</span>
                        <p className="pa-value-text">{item.valueImpact.revenueUp}</p>
                      </div>
                      <div className="pa-value-cell">
                        <span className="pa-value-tag pa-val-risk">🛡️ Risk Down</span>
                        <p className="pa-value-text">{item.valueImpact.riskDown}</p>
                      </div>
                      <div className="pa-value-cell">
                        <span className="pa-value-tag pa-val-cash">⚡ Cash Out</span>
                        <p className="pa-value-text">{item.valueImpact.cashOut}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                    Primary Intersecting Practices:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.primaryPractices.map((p, pIdx) => (
                      <Link
                        key={pIdx}
                        href={`/practice-areas/${p.slug}`}
                        className="pa-tag-chip"
                      >
                        <span>{p.name}</span>
                        <ArrowRight size={10} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/industries" className="button button-outline">
              <span>Explore All 70 Industry Sectors &amp; Use Cases</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. ENGAGEMENT MODELS & EXECUTION CADENCE */}
      <section className="py-20 border-t border-slate-800" id="engagement-models">
        <div className="container">
          <div className="section-head text-center max-w-3xl mx-auto mb-16">
            <span className="badge badge-primary">Turnkey Execution &amp; Co-Engineering</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3">
              Enterprise Engagement Models
            </h2>
            <p className="text-slate-300 mt-3 text-base">
              Four structured engagement tiers tailored to your engineering maturity, risk posture, and delivery velocity — backed by strict SLAs and complete intellectual property sovereignty.
            </p>
          </div>

          {/* 4 Core Engagement Model Cards */}
          <div className="pa-engagement-grid mb-16">
            {engagementModelCards.map((model) => (
              <div key={model.id} className="pa-engagement-card">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="pa-stage-pill">{model.stageBadge}</span>
                    <span className="pa-timeline-badge">{model.duration}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {model.title}
                  </h3>

                  <p className="text-slate-300 text-xs mb-3 leading-relaxed">
                    <strong className="text-slate-100">Target Fit: </strong>
                    {model.idealFor}
                  </p>

                  <p className="text-slate-400 text-xs mb-4 leading-relaxed font-light">
                    {model.keyFocus}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 mb-4">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                      Core Engineering Deliverables:
                    </span>
                    {model.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>

                  {/* Team Profile Pills */}
                  <div className="mb-4">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1.5 font-semibold">
                      Dedicated Systems Squad:
                    </span>
                    <div className="pa-team-profile-row">
                      {model.teamProfile.map((role, rIdx) => (
                        <span key={rIdx} className="pa-team-profile-pill">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expected Balance-Sheet Outcome */}
                  <div className="pa-expected-outcome">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block font-bold mb-1">
                      Target Balance-Sheet Outcome:
                    </span>
                    <p className="text-slate-200 text-xs leading-relaxed m-0">
                      {model.expectedOutcome}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <Link
                    href={model.ctaHref}
                    className="button button-primary w-full text-center justify-center text-xs"
                  >
                    <span>{model.ctaText}</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* 5-Stage Delivery Cadence Pathway */}
          <div className="pt-8 border-t border-slate-800">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="badge badge-accent">Chronological Delivery Cadence</span>
              <h3 className="text-2xl font-bold text-white mt-2">
                Five-Stage Delivery Cadence
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                From initial zero-footprint diagnostic to full operational sovereignty under Turnkey DBOT.
              </p>
            </div>

            <div className="pa-pathway-grid">
              {engagementPathway.map((stage, idx) => (
                <div key={idx} className="pa-pathway-card">
                  <div className="pa-pathway-header">
                    <span className="pa-pathway-number">{stage.step}</span>
                    <span className="pa-pathway-timeline">{stage.timeline}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-3 mb-2">
                    {stage.title}
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    {stage.description}
                  </p>
                  <div className="pa-pathway-outcome">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Key Output:</span>
                    <span className="text-xs font-semibold text-cyan-300">{stage.outcome}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA SECTION */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-black border-t border-slate-800 text-center">
        <div className="container max-w-4xl mx-auto">
          <span className="badge badge-accent mb-4">Practice Advisory Consultation</span>
          <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
            Discuss Your Engineering Challenge
          </h2>
          <p className="text-slate-300 mt-4 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Connect directly with a TRUSTGRID.AI Practice Lead to audit your architecture, 
            evaluate compute bottlenecks, or scope a Forward Deployment sprint.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book-ai-diagnostic#diagnostic-form-section"
              className="button button-primary button-lg"
            >
              <span>Schedule Architecture Diagnostic</span>
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="button button-outline button-lg"
            >
              <span>Contact Global Leadership</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-400">
            <span>✓ Direct Access to Systems Architects</span>
            <span>✓ No-Obligation Architecture Review</span>
            <span>✓ US, Singapore &amp; India Labs</span>
          </div>
        </div>
      </section>
    </div>
  )
}

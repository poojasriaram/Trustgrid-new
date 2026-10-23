import { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import Link from 'next/link'
import '../practice-areas.css'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Layers,
  Workflow,
  ShieldCheck,
  Zap,
  TrendingUp,
  Boxes,
  Building2,
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react'
import {
  allPracticeAreas,
  getPracticeBySlug,
  getAllPracticeSlugs,
  getIndustryOutcomesForPractice,
  engagementModelCards,
  PracticeArea
} from '@/lib/practice-areas-data'
import {
  getComprehensivePracticeBySlug,
  getAllComprehensivePracticeSlugs
} from '@/lib/comprehensive-practice-areas'
import { ComprehensiveDetailView } from '@/components/practice-areas/comprehensive-detail-view'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

// Comprehensive Alias and Routing Redirection Map
const PRACTICE_ROUTE_ALIASES: Record<string, string> = {
  // Practice Area Slugs to canonical
  'enterprise-ai-governance-grc': '/practice-areas/ai-governance-risk-compliance',
  'compute-data-center': '/practice-areas/ai-infrastructure-high-density-compute',
  'lossless-datacenter-fabric': '/practice-areas/ai-native-networking-systems-integration',
  'distributed-agent-swarms': '/practice-areas/agentic-ai-multi-agent-orchestration',
  'air-gapped-edge-ai': '/practice-areas/ai-cybersecurity-quantum-safe-defense',
  'agentic-threat-detection': '/practice-areas/security-engineering-governance',
  'legal-contracts-regulatory-compliance': '/practice-areas/regulatory-change-monitoring',
  'customer-operations-service-excellence': '/practice-areas/workforce-co-pilots',
  'supply-chain-logistics-intelligence': '/practice-areas/supplier-risk-resilience-intelligence',
  'finance-accounting-treasury-automation': '/practice-areas/spend-telemetry-chargeback',
  'enterprise-knowledge-semantic-fabric': '/practice-areas/enterprise-llm-rag-context-engineering',
  'esg-sustainability-intelligence': '/practice-areas/carbon-accounting-mrv-agents',
  'sales-engineering-deal-intelligence': '/practice-areas/sales-productivity-deal-acceleration',
  'revenue-operations-growth-ai': '/practice-areas/pipeline-intelligence-deal-scoring',
  'ai-data-center-compute-factory': '/practice-areas/ai-infrastructure-high-density-compute',
  'lossless-ai-networking-fabrics': '/practice-areas/ai-native-networking-systems-integration',
  'high-density-power-facilities': '/practice-areas/ai-infrastructure-high-density-compute',
  'agentic-workflow-orchestration': '/practice-areas/agentic-ai-multi-agent-orchestration',
  'ai-native-cybersecurity-defense-mesh': '/practice-areas/security-engineering-governance',
  'edge-ai-sovereign-air-gapped': '/practice-areas/ai-cybersecurity-quantum-safe-defense',

  // Industry Verticals requested under /practice-areas/
  'banking-financial-services-bfsi': '/industries/banking-financial-services',
  'banking-financial-services': '/industries/banking-financial-services',
  'public-sector-defense-civic': '/industries/government-public-sector',
  'government-public-sector': '/industries/government-public-sector',
  'healthcare-life-sciences': '/industries/healthcare-life-sciences',
  'life-sciences-pharma': '/industries/healthcare-life-sciences',
  'energy-utilities-smart-infrastructure': '/industries/energy-utilities',
  'energy-utilities': '/industries/energy-utilities',
  'manufacturing-industrial': '/industries/manufacturing-discrete',
  'manufacturing-discrete': '/industries/manufacturing-discrete',
  'process-manufacturing': '/industries/process-manufacturing',
  'retail-ecommerce-consumer-goods': '/industries/retail-consumer-goods',
  'retail-consumer-goods': '/industries/retail-consumer-goods',
  'telecommunications-media': '/industries/telecommunications',
  'telecommunications': '/industries/telecommunications',
  'technology-software': '/industries/technology-software',
  'aerospace-defense': '/industries/aerospace-defense',
  'supply-chain-logistics': '/industries/supply-chain-logistics',
  'insurance': '/industries/insurance',

  // Solutions requested under /practice-areas/
  'ai-infra-engineering': '/solutions/ai-infra-engineering',
  'ai-agentic-factory': '/solutions/ai-agentic-factory',
  'ai-networking-cybersecurity': '/solutions/ai-networking-cybersecurity',
  'trusted-ai-transformation': '/solutions/trusted-ai-transformation',
  'ai-value-engineering': '/practice-areas/ai-value-engineering'
}

function findFuzzyPracticeAreaSlug(slug: string): string {
  if (PRACTICE_ROUTE_ALIASES[slug]) {
    return PRACTICE_ROUTE_ALIASES[slug]
  }

  const cleanTokens = slug
    .toLowerCase()
    .split(/[-_]+/)
    .filter(t => t.length > 2 && !['and', 'the', 'for', 'with', 'ai'].includes(t))

  let bestSlug = ''
  let maxScore = 0

  for (const pa of allPracticeAreas) {
    const paTokens = pa.slug.split(/[-_]+/)
    let score = 0
    for (const token of cleanTokens) {
      if (paTokens.includes(token)) score += 3
      else if (pa.slug.includes(token) || pa.title.toLowerCase().includes(token)) score += 1
    }
    if (score > maxScore) {
      maxScore = score
      bestSlug = `/practice-areas/${pa.slug}`
    }
  }

  if (maxScore > 0 && bestSlug) {
    return bestSlug
  }

  return '/practice-areas'
}

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const legacySlugs = getAllPracticeSlugs()
  const compSlugs = getAllComprehensivePracticeSlugs()
  const aliasSlugs = Object.keys(PRACTICE_ROUTE_ALIASES)
  const allSlugs = Array.from(new Set([...legacySlugs, ...compSlugs, ...aliasSlugs]))
  return allSlugs.map((slug) => ({
    slug
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params

  const targetRoute = PRACTICE_ROUTE_ALIASES[slug]
  const effectiveSlug = targetRoute ? targetRoute.replace(/^\/practice-areas\//, '').replace(/^\/industries\//, '').replace(/^\/solutions\//, '') : slug

  // Check comprehensive practice areas first
  const comp = getComprehensivePracticeBySlug(effectiveSlug)
  if (comp) {
    const area = comp.area
    const parentTitle = comp.type === 'cross' ? comp.practice.title : comp.industry.title
    return {
      title: `${area.code} ${area.title} | ${parentTitle} | TRUSTGRID.AI`,
      description: area.overview || `${area.title} practice area in ${parentTitle}.`,
      keywords: [
        area.title,
        area.code,
        parentTitle,
        area.valueAssurance,
        'TRUSTGRID.AI Systems Engineering'
      ],
      alternates: {
        canonical: `https://trustgrid.ai/practice-areas/${area.slug}`
      },
      openGraph: {
        title: `${area.code} ${area.title} | TRUSTGRID.AI`,
        description: area.overview || `${area.title} practice area in ${parentTitle}.`,
        url: `https://trustgrid.ai/practice-areas/${area.slug}`,
        type: 'article'
      }
    }
  }

  // Fallback to legacy practice areas
  const practice = getPracticeBySlug(effectiveSlug)

  if (!practice) {
    return {
      title: 'Enterprise Practice Areas | TRUSTGRID.AI',
      description: 'Autonomous Systems Architecture, High-Density AI Infrastructure, and Zero-Trust Cybersecurity Engineering.'
    }
  }

  return {
    title: `${practice.title} | Practice Areas | TRUSTGRID.AI`,
    description: practice.overview.slice(0, 160),
    keywords: [
      practice.title,
      practice.categoryLabel,
      ...practice.technologiesAndStandards.slice(0, 5),
      'TRUSTGRID.AI Systems Engineering'
    ],
    alternates: {
      canonical: `https://trustgrid.ai/practice-areas/${practice.slug}`
    },
    openGraph: {
      title: `${practice.title} | TRUSTGRID.AI`,
      description: practice.tagline,
      url: `https://trustgrid.ai/practice-areas/${practice.slug}`,
      type: 'article'
    }
  }
}

export default async function PracticeDetailPage({ params }: PageProps) {
  const { slug } = await params

  // 1. Direct Alias Redirection
  if (PRACTICE_ROUTE_ALIASES[slug]) {
    permanentRedirect(PRACTICE_ROUTE_ALIASES[slug])
  }

  // 2. Render comprehensive practice area if matched
  const comp = getComprehensivePracticeBySlug(slug)
  if (comp) {
    return <ComprehensiveDetailView data={comp} />
  }

  // 3. Render core practice area if matched
  const practice = getPracticeBySlug(slug)
  if (practice) {

  const sectorOutcomes = getIndustryOutcomesForPractice(slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: practice.title,
    description: practice.overview,
    provider: {
      '@type': 'Organization',
      name: 'TRUSTGRID.AI',
      url: 'https://trustgrid.ai'
    },
    serviceType: practice.categoryLabel,
    areaServed: 'Global',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${practice.title} Deliverables`,
      itemListElement: practice.deliverables.map((del, i) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: del
        }
      }))
    }
  }

  const isTech = practice.category === 'technology'
  const isCross = practice.category === 'cross-cutting'

  return (
    <div className="page-shell min-h-screen flex flex-col justify-between bg-[#020617] text-slate-100">
      <SiteHeader />

      <main className="flex-1 relative pt-20">
        <article className="practice-detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Header */}
      <section className="pa-detail-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="pa-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={13} className="text-slate-600" />
            <Link href="/practice-areas" className="hover:text-white transition-colors">
              Practice Areas
            </Link>
            <ChevronRight size={13} className="text-slate-600" />
            <span className="text-blue-400 font-medium truncate">{practice.shortTitle}</span>
          </nav>

          <div className="mt-6">
            <span
              className={`pa-category-pill ${
                isTech ? 'pa-pill-tech' : isCross ? 'pa-pill-cross' : ''
              }`}
            >
              {practice.categoryLabel}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 tracking-tight leading-tight">
              {practice.title}
            </h1>

            <p className="text-lg text-slate-300 max-w-3xl mt-4 leading-relaxed font-light">
              {practice.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#consultation-booking"
                className="button button-primary"
              >
                <span>Consult Practice Lead</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/book-ai-diagnostic#diagnostic-form-section"
                className="button button-outline"
              >
                <span>Schedule Architectural Diagnostic</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Body Column (8 cols) */}
          <div className="lg:col-span-8 space-y-16">
            {/* 1. PRACTICE OVERVIEW */}
            <section id="overview" className="pa-content-section">
              <h2 className="pa-section-heading">
                <span className="pa-heading-bar" />
                Practice Overview
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mt-4">
                {practice.overview}
              </p>
            </section>

            {/* 2. ENTERPRISE CHALLENGES ADDRESSED */}
            <section id="challenges" className="pa-content-section">
              <h2 className="pa-section-heading">
                <span className="pa-heading-bar" />
                Enterprise Challenges Addressed
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {practice.challenges.map((c, i) => (
                  <div key={i} className="pa-challenge-card">
                    <AlertCircle size={18} className="text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-slate-300 text-xs leading-relaxed">{c}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. OUR ENGINEERING APPROACH */}
            <section id="approach" className="pa-content-section">
              <h2 className="pa-section-heading">
                <span className="pa-heading-bar" />
                Implementation Approach &amp; Methodology
              </h2>
              <div className="space-y-4 mt-6">
                {practice.approach.map((step, i) => (
                  <div key={i} className="pa-approach-step">
                    <span className="pa-step-counter">0{i + 1}</span>
                    <p className="text-slate-200 text-sm leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. REFERENCE ARCHITECTURE & WORKFLOW */}
            <section id="reference-architecture" className="pa-content-section">
              <h2 className="pa-section-heading">
                <span className="pa-heading-bar" />
                Reference Architecture &amp; Delivery Workflow
              </h2>
              <div className="pa-arch-box mt-6">
                <div className="mb-4">
                  <span className="text-xs uppercase font-mono text-cyan-400 font-bold tracking-wider">
                    Blueprint Topology
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {practice.referenceArchitecture.title}
                  </h3>
                  <p className="text-slate-300 text-xs mt-1">
                    {practice.referenceArchitecture.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {practice.referenceArchitecture.phases.map((ph, idx) => (
                    <div key={idx} className="pa-phase-card">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="pa-phase-badge">Phase {idx + 1}</span>
                        <h4 className="text-sm font-bold text-white">{ph.name}</h4>
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed">{ph.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. CORE TECHNICAL CAPABILITIES */}
            <section id="capabilities" className="pa-content-section">
              <h2 className="pa-section-heading">
                <span className="pa-heading-bar" />
                Core Technical Capabilities
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {practice.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-2.5 pa-capability-item">
                    <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-slate-200 text-xs font-medium leading-relaxed">{cap}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 6. IMPLEMENTATION DELIVERABLES & ARTIFACTS */}
            <section id="deliverables" className="pa-content-section">
              <h2 className="pa-section-heading">
                <span className="pa-heading-bar" />
                Implementation Deliverables &amp; Artifacts
              </h2>
              <div className="space-y-3 mt-6">
                {practice.deliverables.map((d, i) => (
                  <div key={i} className="pa-deliverable-row">
                    <Boxes size={16} className="text-cyan-400 shrink-0" />
                    <span className="text-slate-200 text-xs font-medium">{d}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 7. BUSINESS OUTCOMES & 4-WAY VALUE LEDGER */}
            <section id="outcomes" className="pa-content-section">
              <h2 className="pa-section-heading">
                <span className="pa-heading-bar" />
                Measurable Practice KPIs &amp; Industry Outcomes
              </h2>

              {/* Practice-Level Performance Criteria */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                {practice.outcomesAndKpis.map((kpi, i) => (
                  <div key={i} className="pa-kpi-card">
                    <span className="text-lg font-bold text-white block mb-1">
                      {kpi.metric}
                    </span>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {kpi.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Industry-Specific Outcomes & 4-Way Value Ledger */}
              {sectorOutcomes.length > 0 && (
                <div className="mt-8 pt-8 border-t border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold block">
                        Enterprise Sector Industrialization
                      </span>
                      <h3 className="text-lg font-bold text-white mt-1">
                        Quantified Industry Outcomes &amp; Value Impact
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-6 mt-4">
                    {sectorOutcomes.map((io) => (
                      <div key={io.id} className="pa-outcome-card">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h4 className="text-base font-bold text-white">
                            {io.industry}
                          </h4>
                          <Link
                            href={io.anchor}
                            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 shrink-0"
                          >
                            <span>Sector Blueprint</span>
                            <ArrowUpRight size={12} />
                          </Link>
                        </div>

                        <p className="text-slate-300 text-xs mb-3 font-light leading-relaxed">
                          {io.highlight}
                        </p>

                        {/* Metric Row */}
                        <div className="pa-metric-grid">
                          {io.metrics.map((m, mIdx) => (
                            <div key={mIdx} className="pa-metric-item">
                              <span className="pa-metric-val">{m.value}</span>
                              <span className="pa-metric-lbl">{m.label}</span>
                            </div>
                          ))}
                        </div>

                        {/* 4-Way Value Ledger */}
                        <div className="pa-value-ledger">
                          <span className="pa-value-ledger-title">
                            <Sparkles size={11} className="text-cyan-400" />
                            4-Way Value Impact Ledger
                          </span>
                          <div className="pa-value-grid">
                            <div className="pa-value-cell">
                              <span className="pa-value-tag pa-val-cost">📉 Cost Down</span>
                              <p className="pa-value-text">{io.valueImpact.costDown}</p>
                            </div>
                            <div className="pa-value-cell">
                              <span className="pa-value-tag pa-val-rev">📈 Revenue Up</span>
                              <p className="pa-value-text">{io.valueImpact.revenueUp}</p>
                            </div>
                            <div className="pa-value-cell">
                              <span className="pa-value-tag pa-val-risk">🛡️ Risk Down</span>
                              <p className="pa-value-text">{io.valueImpact.riskDown}</p>
                            </div>
                            <div className="pa-value-cell">
                              <span className="pa-value-tag pa-val-cash">⚡ Cash Out</span>
                              <p className="pa-value-text">{io.valueImpact.cashOut}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 8. ENGAGEMENT OPTIONS & ENTERPRISE MODELS */}
            <section id="engagement" className="pa-content-section">
              <h2 className="pa-section-heading">
                <span className="pa-heading-bar" />
                Engagement Options &amp; Delivery Frameworks
              </h2>

              {/* Dedicated Practice Tracks */}
              <div className="grid grid-cols-1 gap-4 mt-6">
                {practice.engagementOptions.map((opt, i) => (
                  <div key={i} className="pa-engagement-row">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h4 className="text-sm font-bold text-white">{opt.model}</h4>
                      <span className="pa-timeline-badge">{opt.duration}</span>
                    </div>
                    <p className="text-slate-300 text-xs">{opt.focus}</p>
                  </div>
                ))}
              </div>

              {/* 4 Enterprise Engagement Models Accordion / Cards */}
              <div className="mt-8 pt-8 border-t border-slate-800">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold block mb-1">
                  Structured Execution Cadence
                </span>
                <h3 className="text-lg font-bold text-white mb-4">
                  Enterprise Engagement Models
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {engagementModelCards.map((model) => (
                    <div key={model.id} className="pa-engagement-card">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="pa-stage-pill">{model.stageBadge}</span>
                          <span className="pa-timeline-badge">{model.duration}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white mb-2">
                          {model.title}
                        </h4>
                        <p className="text-slate-300 text-xs mb-3 font-light leading-relaxed">
                          {model.keyFocus}
                        </p>
                        <div className="pa-expected-outcome my-3">
                          <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider block font-bold mb-0.5">
                            Outcome:
                          </span>
                          <p className="text-slate-200 text-xs leading-snug m-0">
                            {model.expectedOutcome}
                          </p>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-slate-800">
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
              </div>
            </section>
          </div>

          {/* Sticky Sidebar Column (4 cols) */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Action Box */}
            <div className="pa-sidebar-box">
              <h3 className="text-base font-bold text-white mb-2">
                Initiate Practice Engagement
              </h3>
              <p className="text-slate-300 text-xs mb-4 leading-relaxed">
                Connect directly with our {practice.shortTitle} lead architect to evaluate your technical constraints.
              </p>
              <div className="space-y-3">
                <Link
                  href="/book-ai-diagnostic#diagnostic-form-section"
                  className="button button-primary w-full text-center justify-center text-xs"
                >
                  <span>Book Architecture Diagnostic</span>
                </Link>
                <Link
                  href="/contact?subject=Custom+Proposal+Request"
                  className="button button-outline w-full text-center justify-center text-xs"
                >
                  <span>Request Custom Proposal (SOW)</span>
                </Link>
              </div>
            </div>

            {/* Technologies & Applicable Standards */}
            <div className="pa-sidebar-box">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 font-bold block mb-3">
                Technologies &amp; Applicable Standards
              </span>
              <div className="flex flex-wrap gap-1.5">
                {practice.technologiesAndStandards.map((tech, i) => (
                  <span key={i} className="pa-tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Target Industries */}
            <div className="pa-sidebar-box">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 font-bold block mb-3">
                Applicable Industries
              </span>
              <div className="space-y-2">
                {practice.targetIndustries.map((ind, i) => (
                  <Link
                    key={i}
                    href={`/industries#${ind.anchor}`}
                    className="flex items-center justify-between text-xs text-slate-300 hover:text-blue-400 py-1.5 border-b border-slate-800 last:border-0 transition-colors"
                  >
                    <span>{ind.name}</span>
                    <ArrowUpRight size={13} className="text-slate-300" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Related Practices */}
            <div className="pa-sidebar-box">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 font-bold block mb-3">
                Related Practice Areas
              </span>
              <div className="space-y-2">
                {practice.relatedPractices.map((rp, i) => (
                  <Link
                    key={i}
                    href={`/practice-areas/${rp.slug}`}
                    className="flex items-center justify-between text-xs text-slate-300 hover:text-cyan-400 py-1.5 border-b border-slate-800 last:border-0 transition-colors"
                  >
                    <span>{rp.title}</span>
                    <ArrowRight size={13} className="text-slate-300" />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Consultation Booking Section */}
      <section className="py-20 bg-slate-950 border-t border-slate-800" id="consultation-booking">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="badge badge-primary mb-3">Direct Engagement</span>
          <h2 className="text-3xl font-bold text-white">
            Schedule a {practice.shortTitle} Diagnostic
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mt-2 leading-relaxed">
            Our systems engineers assess your workload topology, identify throughput or governance bottlenecks, and map out a fixed-duration proof of execution.
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
              href="/practice-areas"
              className="button button-outline button-lg"
            >
              <ArrowLeft size={16} />
              <span>Back to Practice Directory</span>
            </Link>
          </div>
        </div>
      </section>
        </article>
      </main>

      <SiteFooter />
    </div>
  )
  }

  // 4. Never 404: Resolve to best matching practice or directory
  const fallbackTarget = findFuzzyPracticeAreaSlug(slug)
  permanentRedirect(fallbackTarget)
}


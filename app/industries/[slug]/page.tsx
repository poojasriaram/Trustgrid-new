import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import {
  Building2,
  ShieldCheck,
  TrendingUp,
  Layers,
  Cpu,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  Workflow,
  SlidersHorizontal,
  Target,
  Zap,
  Lock,
  BarChart3
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { industriesData, IndustryDetail } from '@/lib/industries-data'
import { PageBannerHero } from '@/components/ui/page-banner-hero'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return industriesData.map((ind) => ({
    slug: ind.slug
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const industry = industriesData.find((ind) => ind.slug === slug)

  if (!industry) {
    return {
      title: 'Industry Not Found | TRUSTGRID.AI',
      description: 'The requested industry blueprint could not be found.'
    }
  }

  return {
    title: `${industry.name} AI Architecture & Operational Blueprints | TRUSTGRID.AI`,
    description: industry.summary,
    openGraph: {
      title: `${industry.name} Enterprise AI Engineering | TRUSTGRID.AI`,
      description: industry.tagline
    }
  }
}

export default async function IndustryDetailPage({ params }: PageProps) {
  const { slug } = await params
  const industry = industriesData.find((ind) => ind.slug === slug)

  if (!industry) {
    notFound()
  }

  // Find index for next/prev navigation
  const currentIndex = industriesData.findIndex((ind) => ind.slug === slug)
  const prevIndustry = currentIndex > 0 ? industriesData[currentIndex - 1] : industriesData[industriesData.length - 1]
  const nextIndustry = currentIndex < industriesData.length - 1 ? industriesData[currentIndex + 1] : industriesData[0]

  return (
    <div className="page-shell">
      <SiteHeader />

      <main className="main-content">
        {/* BREADCRUMB STRIP */}
        <div className="bg-slate-900 border-b border-slate-800 text-xs py-3 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
              <ChevronRight size={12} className="text-slate-600" />
              <Link href="/industries" className="hover:text-blue-400 transition-colors">Industries</Link>
              <ChevronRight size={12} className="text-slate-600" />
              <span className="text-white font-medium">{industry.name}</span>
            </div>
            <Link
              href="/industries"
              className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              <ArrowLeft size={13} />
              <span>Back to Sector Directory</span>
            </Link>
          </div>
        </div>

        {/* PAGE HERO BANNER */}
        <PageBannerHero
          badge={industry.badge.toUpperCase()}
          badgeTag="MISSION-CRITICAL SECTOR BLUEPRINT"
          title={`${industry.name} AI Engineering &`}
          titleHighlight="Architecture."
          description={industry.summary}
          thesisHighlight={`Strategic Thesis: ${industry.tagline}`}
          image="/images/industry-manufacturing.jpg"
          primaryCta={{
            text: `Book ${industry.name} Diagnostic`,
            href: `/book-ai-diagnostic?industry=${encodeURIComponent(industry.name)}#diagnostic-form-section`
          }}
          secondaryCta={{
            text: 'Explore Applied Methodologies',
            href: '#applied-methodologies'
          }}
          metrics={{
            statValue: industry.metricsImpact[0]?.value || 'Production',
            statLabel: industry.metricsImpact[0]?.metric || 'Impact Metric',
            icon: Building2,
            features: [
              `${industry.keyMethodologies.slice(0, 3).join(', ')} Applied`,
              `${industry.solutionApplications.length} Specialized Solution Stacks`,
              `${industry.metricsImpact.length} Quantified Balance-Sheet KPIs`
            ]
          }}
        />

        {/* 3-PILLAR EXECUTIVE ARCHITECTURE NAV STRIP */}
        <section className="bg-white border-b border-slate-200 sticky top-[72px] z-30 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between overflow-x-auto">
            <div className="flex items-center gap-6 text-sm font-semibold text-slate-600 whitespace-nowrap">
              <a href="#sector-challenges" className="hover:text-blue-600 transition-colors flex items-center gap-1.5 text-blue-600">
                <ShieldCheck size={16} />
                <span>1. Challenges & Constraints</span>
              </a>
              <a href="#applied-methodologies" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
                <Workflow size={16} />
                <span>2. Applied Methodologies</span>
              </a>
              <a href="#enterprise-use-cases" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
                <Target size={16} />
                <span>3. Production Use Cases</span>
              </a>
              <a href="#balance-sheet-impact" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
                <BarChart3 size={16} />
                <span>4. Balance-Sheet KPIs</span>
              </a>
            </div>
            <Link
              href={`/book-ai-diagnostic?industry=${encodeURIComponent(industry.name)}#diagnostic-form-section`}
              className="button button-primary button-sm whitespace-nowrap hidden md:inline-flex"
            >
              <span>Schedule Diagnostic</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </section>

        {/* 1. SECTOR CHALLENGES & TECHNICAL CONSTRAINTS */}
        <section className="section" id="sector-challenges">
          <div className="section-intro">
            <div className="intro-left">
              <span className="section-badge">HIGH-STAKES CONSTRAINTS</span>
              <p className="section-label">Enterprise Challenges in {industry.name}</p>
            </div>
            <span className="section-index">01 / 04</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {industry.challenges.map((challenge, cIdx) => (
              <div
                key={cIdx}
                className="p-6 rounded-xl border border-slate-200 bg-white shadow-xs hover:border-blue-300 transition-all flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-mono font-bold text-sm shrink-0">
                  {cIdx + 1}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{challenge}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Addressed through rigorous hardware isolation, deterministic inference guards, and formal verification frameworks.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. APPLIED OPERATIONAL METHODOLOGIES */}
        <section className="section bg-slate-50/70 border-y border-slate-200" id="applied-methodologies">
          <div className="section-intro">
            <div className="intro-left">
              <span className="section-badge">METHODOLOGY ENGINE</span>
              <p className="section-label">Operational Disciplines Applied to {industry.name}</p>
            </div>
            <span className="section-index">02 / 04</span>
          </div>

          <div className="mt-6 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Governed Quality & Defect Mitigation Stack
                </h3>
                <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                  We industrialize classic operational disciplines using autonomous AI agents, ensuring deterministic execution and eliminating production failure modes.
                </p>
              </div>
              <Link
                href="/methodology-engine"
                className="button button-ghost button-sm whitespace-nowrap self-start md:self-auto"
              >
                <span>Explore Full 80+ Methodology Engine</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-6">
              {industry.keyMethodologies.map((m, mIdx) => (
                <div
                  key={mIdx}
                  className="p-4 rounded-xl border border-blue-100 bg-blue-50/40 hover:bg-blue-50 hover:border-blue-300 transition-all text-center flex flex-col items-center justify-center gap-2"
                >
                  <Workflow size={20} className="text-blue-600" />
                  <span className="text-sm font-bold text-slate-900">{m}</span>
                  <span className="text-[10px] font-mono text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                    Active Agent
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. PRACTICAL ENTERPRISE USE CASES */}
        <section className="section" id="enterprise-use-cases">
          <div className="section-intro">
            <div className="intro-left">
              <span className="section-badge">ENTERPRISE DEPLOYMENTS</span>
              <p className="section-label">Production AI Architecture & Solutions</p>
            </div>
            <span className="section-index">03 / 04</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {industry.solutionApplications.map((app, aIdx) => (
              <div
                key={aIdx}
                className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Cpu size={16} />
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{app.solutionTitle}</h3>
                    </div>
                    <Link
                      href={`/solutions/${app.solutionSlug}`}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <span>Blueprint</span>
                      <ArrowUpRight size={12} />
                    </Link>
                  </div>

                  <ul className="space-y-3">
                    {app.useCases.map((uc, ucIdx) => (
                      <li key={ucIdx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                        <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{uc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">
                    Stack: {app.solutionSlug}
                  </span>
                  <Link
                    href={`/solutions/${app.solutionSlug}`}
                    className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    <span>View Stack Architecture →</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/use-cases" className="button button-ghost button-sm">
              <span>View All Cross-Industry Use Cases Compendium →</span>
            </Link>
          </div>
        </section>

        {/* 4. BALANCE-SHEET KPIS & VERIFIED IMPACT */}
        <section className="section bg-slate-900 text-white" id="balance-sheet-impact">
          <div className="section-intro">
            <div className="intro-left">
              <span className="section-badge bg-blue-900 text-blue-300 border-blue-800">
                PROVABLE ROI
              </span>
              <p className="section-label text-slate-200">Quantified Economic & Operational Impact</p>
            </div>
            <span className="section-index text-slate-400">04 / 04</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            {industry.metricsImpact.map((metric, mIdx) => (
              <div
                key={mIdx}
                className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 text-center flex flex-col items-center justify-center gap-2"
              >
                <div className="text-4xl font-extrabold text-blue-400 tracking-tight font-mono">
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-slate-300">
                  {metric.metric}
                </div>
                <span className="text-[11px] text-slate-500">
                  Verified in production deployments
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* NEXT / PREV NAVIGATION */}
        <section className="section border-t border-slate-200 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href={`/industries/${prevIndustry.slug}`}
              className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-all text-left w-full sm:w-auto"
            >
              <ArrowLeft size={16} className="text-blue-600" />
              <div>
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Previous Vertical</span>
                <span className="text-sm font-bold text-slate-900">{prevIndustry.name}</span>
              </div>
            </Link>

            <Link
              href="/industries"
              className="button button-ghost button-sm"
            >
              <span>View All 12 Verticals</span>
            </Link>

            <Link
              href={`/industries/${nextIndustry.slug}`}
              className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-all text-right w-full sm:w-auto justify-end"
            >
              <div>
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Next Vertical</span>
                <span className="text-sm font-bold text-slate-900">{nextIndustry.name}</span>
              </div>
              <ChevronRight size={16} className="text-blue-600" />
            </Link>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="section cta-section">
          <div className="cta-container">
            <div className="cta-badge">
              <Sparkles size={14} />
              <span>CUSTOM {industry.name.toUpperCase()} ROADMAP</span>
            </div>
            <h2>Ready to Deploy Industrial-Grade AI in {industry.name}?</h2>
            <p>
              Connect directly with our principal systems architects and industry vertical leads to architect your sovereign, high-throughput AI deployment.
            </p>
            <div className="cta-actions">
              <Link
                href={`/book-ai-diagnostic?industry=${encodeURIComponent(industry.name)}#diagnostic-form-section`}
                className="button button-primary"
              >
                <span>Book {industry.name} Diagnostic</span>
                <ArrowUpRight size={16} />
              </Link>
              <Link href="/contact" className="button button-ghost">
                <span>Contact Industry Practice Lead</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

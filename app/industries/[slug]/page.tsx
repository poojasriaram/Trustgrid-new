import { notFound, permanentRedirect } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import {
  Building2,
  ShieldCheck,
  TrendingUp,
  Layers,
  Cpu,
  ArrowUpRight,
  ChevronRight,
  ArrowLeft,
  Workflow,
  Target,
  BarChart3,
  Users,
  AlertTriangle,
  Calendar
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { industriesData } from '@/lib/industries-data'
import { IndustryVerticalLayout } from '@/components/enterprise/industry-vertical-layout'
import { TrustGridForm } from '@/components/ui/trustgrid-form'

const INDUSTRY_ALIASES: Record<string, string> = {
  'banking-financial-services-bfsi': 'banking-financial-services',
  'bfsi': 'banking-financial-services',
  'banking': 'banking-financial-services',
  'financial-services': 'banking-financial-services',
  'capital-markets': 'banking-financial-services',
  'public-sector-defense-civic': 'government-public-sector',
  'civic-defense': 'government-public-sector',
  'defense': 'aerospace-defense',
  'life-sciences-pharma': 'healthcare-life-sciences',
  'pharma': 'healthcare-life-sciences',
  'healthcare': 'healthcare-life-sciences',
  'energy-utilities-smart-infrastructure': 'energy-utilities',
  'energy': 'energy-utilities',
  'manufacturing-industrial': 'manufacturing-discrete',
  'manufacturing': 'manufacturing-discrete',
  'industrial': 'manufacturing-discrete',
  'retail-ecommerce-consumer-goods': 'retail-consumer-goods',
  'retail': 'retail-consumer-goods',
  'ecommerce': 'retail-consumer-goods',
  'telecommunications-media': 'telecommunications',
  'telecom': 'telecommunications',
  'technology': 'technology-software',
  'software': 'technology-software',
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const baseSlugs = industriesData.map((ind) => ind.slug)
  const aliasSlugs = Object.keys(INDUSTRY_ALIASES)
  const allSlugs = Array.from(new Set([...baseSlugs, ...aliasSlugs]))
  return allSlugs.map((slug) => ({
    slug
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const effectiveSlug = INDUSTRY_ALIASES[slug] || slug
  const industry = industriesData.find((ind) => ind.slug === effectiveSlug)

  if (!industry) {
    return {
      title: 'Industry Sector Directory | TRUSTGRID.AI',
      description: 'Enterprise AI Architecture & Operational Blueprints across all major market verticals.'
    }
  }

  return {
    title: `${industry.name} AI Architecture & Operational Blueprints | TRUSTGRID.AI`,
    description: industry.heroSubtitle || industry.summary,
    openGraph: {
      title: `${industry.name} Enterprise AI Engineering | TRUSTGRID.AI`,
      description: industry.tagline
    }
  }
}

export default async function IndustryDetailPage({ params }: PageProps) {
  const { slug } = await params

  if (INDUSTRY_ALIASES[slug]) {
    permanentRedirect(`/industries/${INDUSTRY_ALIASES[slug]}`)
  }

  const industry = industriesData.find((ind) => ind.slug === slug)

  if (!industry) {
    permanentRedirect('/industries')
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
              <span className="text-slate-400">{industry.category}</span>
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

        {/* 7-SECTION EXECUTIVE ARCHITECTURE NAV STRIP */}
        <section className="bg-white border-b border-slate-200 sticky top-[72px] z-30 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-2.5 flex items-center justify-between overflow-x-auto">
            <div className="flex items-center gap-5 text-xs font-semibold text-slate-600 whitespace-nowrap">
              <a href="#top" className="hover:text-blue-600 transition-colors text-blue-600 flex items-center gap-1.5 font-bold">
                <span>1. Overview</span>
              </a>
              <a href="#icp-profile" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
                <Users size={14} />
                <span>2. ICP Profile</span>
              </a>
              <a href="#challenges" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
                <AlertTriangle size={14} />
                <span>3. Challenges</span>
              </a>
              <a href="#engineered-solutions" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
                <Workflow size={14} />
                <span>4. Solutions</span>
              </a>
              <a href="#capabilities" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
                <Layers size={14} />
                <span>5. Capabilities</span>
              </a>
              <a href="#outcomes" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
                <BarChart3 size={14} />
                <span>6. Outcomes</span>
              </a>
              <a href="#diagnostic-intake" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
                <Calendar size={14} />
                <span>7. Engagement</span>
              </a>
            </div>

            <Link
              href={`/book-ai-diagnostic?industry=${encodeURIComponent(industry.name)}#diagnostic-form-section`}
              className="button button-primary button-sm whitespace-nowrap hidden lg:inline-flex"
            >
              <span>Schedule Diagnostic</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </section>

        {/* FULL 7-SECTION ENTERPRISE CONTENT MODEL */}
        <IndustryVerticalLayout
          industry={industry}
          prevIndustry={prevIndustry}
          nextIndustry={nextIndustry}
          isEmbedded={false}
        />

        {/* DIRECT EMBEDDED DIAGNOSTIC EVALUATION FORM */}
        <section className="section py-14 bg-slate-900 border-t border-slate-800 text-white" id="diagnostic-form-section">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <span className="section-badge bg-blue-900/60 text-blue-300 border-blue-700 font-semibold uppercase text-xs tracking-wider px-3 py-1 rounded-full border">
                CONFIDENTIAL ARCHITECTURAL INTAKE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
                Request a {industry.name} Systems Diagnostic
              </h2>
              <p className="text-sm text-slate-300 mt-2 max-w-xl mx-auto">
                Submit your current compute constraints and compliance requirements. Our principal architects will prepare a tailored engineering briefing within 24 hours.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900 shadow-xl border border-slate-200">
              <TrustGridForm
                variant="diagnostic"
                formId={`form_industry_${industry.slug}`}
                formName={`${industry.name} Industry Diagnostic`}
                defaultIndustry={industry.name}
                ctaSource={`industry_page_${industry.slug}`}
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
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
  Zap,
  Users,
  AlertTriangle,
  Workflow,
  Clock,
  Lock,
  Activity,
  Award,
  BarChart3
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { industriesData, IndustryDetail, macroCategories } from '@/lib/industries-data'
import { PageBannerHero } from '@/components/ui/page-banner-hero'

const DEFAULT_MACRO_CATEGORIES = [
  'All Verticals',
  'Financial Services',
  'Healthcare & Life Sciences',
  'Manufacturing & Industrial',
  'Energy & Utilities',
  'Technology & Electronics',
  'Infrastructure & Construction',
  'Consumer & Retail',
  'Media & Services'
] as const

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Cpu,
  Zap,
  TrendingUp,
  ShieldCheck,
  Lock,
  Bot: Users,
  Activity,
  CheckCircle2,
  Award,
  Clock,
  Layers,
  Building2,
  AlertTriangle,
  ArrowUpRight,
  Workflow,
  Sparkles,
  Users
}

function resolveIcon(name: string) {
  return iconMap[name] || Sparkles
}

export default function IndustriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Verticals')
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all')

  const categories = (macroCategories && Array.isArray(macroCategories) && macroCategories.length > 0)
    ? macroCategories
    : DEFAULT_MACRO_CATEGORIES

  const allIndustries = (industriesData && Array.isArray(industriesData))
    ? industriesData
    : []

  // Filter by category first, then by individual industry
  const categoryFiltered = selectedCategory === 'All Verticals'
    ? allIndustries
    : allIndustries.filter((ind) => ind?.category === selectedCategory)

  const finalFiltered = selectedIndustry === 'all'
    ? categoryFiltered
    : categoryFiltered.filter((ind) => ind?.id === selectedIndustry)

  return (
    <div className="page-shell">
      <SiteHeader />

      <main className="main-content">
        {/* STANDARD PAGE BANNER HERO */}
        <PageBannerHero
          badge="MISSION-CRITICAL & REGULATED SECTORS"
          badgeTag="12 INDUSTRY BLUEPRINTS"
          title="Industrial-Grade AI Engineering Across"
          titleHighlight="Regulated Verticals."
          description="From sovereign high-frequency banking enclaves and FDA-compliant clinical AI to air-gapped defense meshes and discrete shop floors. We engineer the hardware, agent architectures, and operational excellence for the world's most demanding enterprises."
          thesisHighlight="Domain Rigor: Zero-downtime, mathematically verified, and compliance-ready architectures engineered for high-stakes environments."
          image="/images/industry-manufacturing.jpg"
          primaryCta={{ text: 'Book an AI Diagnostic', href: '/book-ai-diagnostic#diagnostic-form-section' }}
          secondaryCta={{ text: 'Explore All 12 Verticals', href: '#industries-list' }}
          metrics={{
            statValue: '12 Sectors',
            statLabel: 'Turnkey Industry Blueprints',
            icon: Building2,
            features: [
              'Banking & High-Frequency Trading (HFT)',
              'Healthcare, Biopharma & FDA AI Validation',
              'Energy, Smart Grids & Defense Grade Meshes'
            ]
          }}
        />

        {/* MACRO CATEGORY & SECTOR FILTER NAV STRIP */}
        <section className="section bg-white border-b border-slate-200" id="industries-list" style={{ paddingTop: '28px', paddingBottom: '28px' }}>
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="section-badge text-blue-600 bg-blue-50 border-blue-200 font-semibold uppercase text-xs tracking-wider px-3 py-1 rounded-full border">
                  SECTOR TAXONOMY
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                  Browse by Industry Vertical & Category
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Select a category or specific vertical to explore verified metrics, ICPs, and engineered architectures.
                </p>
              </div>

              <div className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 self-start md:self-auto">
                Showing {finalFiltered.length} of {industriesData.length} Verticals
              </div>
            </div>

            {/* 8 MACRO CATEGORIES */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-thin">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat)
                      setSelectedIndustry('all')
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                      isActive
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-white'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>

            {/* INDIVIDUAL VERTICAL PILLS */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
              <button
                className={`filter-pill text-xs py-1 px-3 ${selectedIndustry === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedIndustry('all')}
              >
                All in Category
              </button>
              {categoryFiltered.map((ind) => (
                <button
                  key={ind.id}
                  className={`filter-pill text-xs py-1 px-3 ${selectedIndustry === ind.id ? 'active' : ''}`}
                  onClick={() => setSelectedIndustry(ind.id)}
                >
                  {ind.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* VERTICALS SHOWCASE CARDS (ISI VERTICALS STRUCTURAL REFERENCE) */}
        <section className="section py-12 md:py-16 bg-slate-50/50" id="industries-directory">
          <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
            {finalFiltered.map((ind: IndustryDetail) => (
              <div
                key={ind.id}
                id={ind.slug}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-md"
              >
                {/* 1. INDUSTRY HEADER (Prominent, Centered Reference) */}
                <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white p-8 sm:p-10 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_-20%,rgba(29,92,255,0.2),rgba(255,255,255,0))] pointer-events-none" />

                  <div className="relative z-10 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-3">
                      <span>{ind.badge}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-300">{ind.category}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                      {ind.name}
                    </h2>

                    <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
                      {ind.heroSubtitle || ind.summary}
                    </p>

                    <div className="mt-4 text-xs font-mono text-slate-400 flex items-center justify-center gap-2">
                      <span className="text-blue-400 font-semibold">Strategic Focus:</span>
                      <span>{ind.tagline}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-10">
                  {/* 2. 4 BALANCED STAT CARDS DESKTOP GRID */}
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
                      <div className="flex items-center gap-2">
                        <BarChart3 size={16} className="text-blue-600" />
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                          Verified Sector Performance Indicators
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">4 Proven Benchmarks</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {(ind.statCards || []).map((stat, sIdx) => {
                        const StatIcon = resolveIcon(stat.iconName)
                        return (
                          <div
                            key={sIdx}
                            className="bg-slate-50/70 border border-slate-200/90 rounded-xl p-4 flex flex-col justify-between hover:bg-white hover:border-blue-300 transition-all"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-2xl font-mono font-extrabold text-slate-900">
                                {stat.value}
                              </span>
                              <div className="w-8 h-8 rounded-lg bg-blue-100/60 text-blue-700 flex items-center justify-center">
                                <StatIcon size={16} />
                              </div>
                            </div>
                            <div className="text-xs font-bold text-slate-800 mb-1 leading-snug">
                              {stat.label}
                            </div>
                            <p className="text-[11px] text-slate-500 leading-relaxed">
                              {stat.context}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* 3. IDEAL CUSTOMER PROFILE & CHALLENGES SPLIT */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* ICP CARD */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 pb-3 border-b border-slate-200 mb-3">
                          <Users size={16} className="text-blue-600" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                            Ideal Customer Profile (ICP)
                          </h4>
                        </div>

                        <div className="space-y-2 mb-4">
                          <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold block">
                            Key Decision Makers:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {(ind.icp?.decisionMakers || []).map((dm, dIdx) => (
                              <span
                                key={dIdx}
                                className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10.5px] font-medium text-slate-800"
                              >
                                {dm}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1.5 mb-3">
                          <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold block">
                            Target Organizations:
                          </span>
                          <ul className="space-y-1">
                            {(ind.icp?.targetOrgs || []).slice(0, 3).map((org, oIdx) => (
                              <li key={oIdx} className="flex items-start gap-1.5 text-xs text-slate-700">
                                <CheckCircle2 size={13} className="text-blue-600 shrink-0 mt-0.5" />
                                <span>{org}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200">
                        <span className="text-[10px] font-mono text-slate-400 block uppercase">Operational Complexity:</span>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                          {ind.icp?.scaleComplexity || 'Mission-critical enterprise scale.'}
                        </p>
                      </div>
                    </div>

                    {/* 4. PROBLEMS & CHALLENGES PREVIEW (2 Cards) */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(ind.detailedChallenges || []).slice(0, 2).map((ch, cIdx) => (
                        <div
                          key={cIdx}
                          className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-2xs hover:border-amber-300 transition-colors"
                        >
                          <div>
                            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                              <span className="w-5 h-5 rounded bg-amber-100 text-amber-800 font-mono text-xs font-bold flex items-center justify-center">
                                {cIdx + 1}
                              </span>
                              <span className="text-[10px] font-mono text-amber-700 uppercase font-semibold">
                                Sector Constraint
                              </span>
                            </div>
                            <h4 className="text-xs font-bold text-slate-900 mb-1.5 leading-snug">
                              {ch.title}
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed mb-3">
                              {ch.issue}
                            </p>
                          </div>

                          <div className="p-2 rounded bg-red-50/70 border border-red-100 text-[11px] text-red-900">
                            <strong>Impact:</strong> {ch.businessImpact}
                          </div>
                        </div>
                      ))}

                      {/* 5. ENGINEERED SOLUTIONS PREVIEW (2 Cards) */}
                      {(ind.engineeredSolutions || []).slice(0, 2).map((sol, sIdx) => (
                        <div
                          key={sIdx}
                          className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-2xs hover:border-blue-300 transition-colors"
                        >
                          <div>
                            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                              <span className="w-5 h-5 rounded bg-blue-100 text-blue-800 font-mono text-xs font-bold flex items-center justify-center">
                                {sIdx + 1}
                              </span>
                              <span className="text-[10px] font-mono text-blue-700 uppercase font-semibold">
                                Engineered Solution
                              </span>
                            </div>
                            <h4 className="text-xs font-bold text-slate-900 mb-1.5 leading-snug">
                              {sol.capabilityName}
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed mb-3">
                              {sol.engineered}
                            </p>
                          </div>

                          <div className="p-2 rounded bg-emerald-50/70 border border-emerald-100 text-[11px] text-emerald-900">
                            <strong>Outcome:</strong> {sol.expectedOutcome}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* APPLIED METHODOLOGIES STRIP */}
                  <div className="py-2.5 px-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between flex-wrap gap-2 text-xs">
                    <span className="text-slate-600 font-semibold flex items-center gap-1.5">
                      <Workflow size={14} className="text-blue-600" />
                      <span>Applied Operational Disciplines:</span>
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {(ind.keyMethodologies || []).map((m, mIdx) => (
                        <span key={mIdx} className="method-pill text-[11px] py-0.5 px-2 bg-white">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CARD FOOTER CTAS */}
                  <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500">
                        Blueprint: <span className="font-semibold text-slate-800">{ind.slug}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      <Link
                        href={`/industries/${ind.slug}`}
                        className="button button-ghost button-sm"
                      >
                        <span>Explore Full 7-Section Blueprint</span>
                        <ArrowUpRight size={13} />
                      </Link>
                      <Link
                        href={`/book-ai-diagnostic?industry=${encodeURIComponent(ind.name)}#diagnostic-form-section`}
                        className="button button-primary button-sm"
                      >
                        <span>Schedule {ind.name} Diagnostic</span>
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="section cta-section">
          <div className="cta-container">
            <div className="cta-badge">
              <Sparkles size={14} />
              <span>CUSTOM ENTERPRISE ROADMAP</span>
            </div>
            <h2>Execute Your High-Stakes AI Transformation with Absolute Rigor</h2>
            <p>
              Our principal systems architects and methodology black belts deliver concrete production architectures, air-gapped deployments, and provable economic value.
            </p>
            <div className="cta-actions">
              <Link href="/book-ai-diagnostic#diagnostic-form-section" className="button button-primary">
                <span>Book an AI Diagnostic</span>
                <ArrowUpRight size={16} />
              </Link>
              <Link href="/methodology-engine" className="button button-ghost">
                <span>Explore Methodology Engine</span>
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

'use client'

import React from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  UserCheck,
  CheckCircle2,
  Workflow,
  Sparkles,
  Layers,
  ChevronRight,
  Boxes,
  Activity,
  AlertCircle,
  FileCheck2,
  TrendingUp,
  Building2,
  Zap
} from 'lucide-react'
import {
  CrossIndustryPractice,
  CrossPracticeArea,
  IndustryVertical,
  SubVertical,
  IndustryPracticeArea
} from '@/lib/comprehensive-practice-areas'

export interface ComprehensiveDetailViewProps {
  data:
    | { type: 'cross'; practice: CrossIndustryPractice; area: CrossPracticeArea }
    | { type: 'industry'; industry: IndustryVertical; subVertical: SubVertical; area: IndustryPracticeArea }
}

export function ComprehensiveDetailView({ data }: ComprehensiveDetailViewProps) {
  const isCross = data.type === 'cross'
  const area = data.area

  const parentTitle = isCross ? data.practice.title : data.industry.title
  const subTitle = isCross ? `Horizontal Practice ${data.practice.code}` : data.subVertical.title
  const categoryBadge = isCross ? 'Division 2 · Cross-Industry Practice' : 'Division 3 · Industry Vertical Practice'

  const siblingAreas = isCross ? data.practice.practiceAreas : data.subVertical.practiceAreas
  const stakeholder = isCross ? data.area.buyer : data.area.targetStakeholder

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${area.code} ${area.title}`,
    description: area.overview || `${area.title} practice area in ${parentTitle}.`,
    provider: {
      '@type': 'Organization',
      name: 'TRUSTGRID.AI',
      url: 'https://trustgrid.ai'
    },
    serviceType: categoryBadge,
    areaServed: 'Global'
  }

  return (
    <article className="practice-detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. BREADCRUMBS & HERO SECTION */}
      <section className="pa-detail-hero">
        <div className="container">
          <nav className="pa-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={13} className="text-slate-600" />
            <Link href="/practice-areas" className="hover:text-white transition-colors">
              Practice Areas
            </Link>
            <ChevronRight size={13} className="text-slate-600" />
            <Link href="/practice-areas#comprehensive-explorer" className="hover:text-white transition-colors">
              {parentTitle}
            </Link>
            <ChevronRight size={13} className="text-slate-600" />
            <span className="text-blue-400 font-medium truncate">{area.title}</span>
          </nav>

          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`pa-category-pill ${isCross ? 'pa-pill-cross' : 'pa-pill-tech'}`}>
                {categoryBadge}
              </span>
              <span className="text-xs font-mono font-bold text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
                Code {area.code}
              </span>
              {!isCross && (
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                  Tier {data.industry.tier}
                </span>
              )}
              {isCross && data.practice.originator && (
                <span className="text-xs font-semibold text-amber-300 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/40">
                  Regulatory Originator
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              {area.title}
            </h1>

            <p className="text-lg text-slate-300 max-w-3xl mt-4 leading-relaxed font-light">
              {area.overview || `${area.title} deploys battle-tested AI acceleration assets, deterministic assurance stacks, and production engineering directly into ${subTitle}.`}
            </p>

            {/* Quick Hero Spec Badges */}
            <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <Clock size={13} className="text-blue-400" />
                <span className="text-slate-400">Time to Value:</span>
                <strong className="text-white font-mono">{area.timeToValue}</strong>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <UserCheck size={13} className="text-cyan-400" />
                <span className="text-slate-400">Target Stakeholder:</span>
                <strong className="text-white">{stakeholder}</strong>
              </div>
              {!isCross && (
                <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                  <Activity size={13} className="text-emerald-400" />
                  <span className="text-slate-400">Pool Size:</span>
                  <strong className="text-white font-mono">{data.industry.poolSize}</strong>
                </div>
              )}
              {isCross && (
                <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                  <ShieldCheck size={13} className="text-indigo-400" />
                  <span className="text-slate-400">Budget:</span>
                  <strong className="text-white">{data.practice.budget}</strong>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="#consultation-booking" className="button button-primary">
                <span>Discuss with an Architect</span>
                <ArrowRight size={15} />
              </Link>
              <Link href="/book-ai-diagnostic#diagnostic-form-section" className="button button-outline">
                <span>Schedule Architectural Diagnostic</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN 8-POINT ARCHITECTURE CONTENT */}
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Body Column (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* 1. PRACTICE OVERVIEW */}
            <section id="overview" className="pa-content-section">
              <h2 className="pa-section-heading">
                <span className="pa-heading-bar" />
                1. Practice Overview &amp; Problem Framing
              </h2>
              <div className="mt-4 p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                <p className="text-slate-200 text-sm leading-relaxed">
                  {area.overview || `Targeted enterprise automation addressing operational bottlenecks in ${subTitle}. Engineered for direct integration into production environments with deterministic controls.`}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400">
                  <span>Parent Industry / Function: <strong className="text-white">{parentTitle}</strong></span>
                  <span>Sub-Domain: <strong className="text-cyan-400">{subTitle}</strong></span>
                </div>
              </div>
            </section>

            {/* 2. SOLUTION ACCELERATION & CAPABILITY */}
            <section id="solution-acceleration" className="pa-content-section">
              <h2 className="pa-section-heading">
                <span className="pa-heading-bar" />
                2. Solution Acceleration &amp; Engineering Capability
              </h2>
              <p className="text-slate-400 text-xs mt-2">
                Reusable AI engineering assets, connectors, and model libraries deployed by Forward Deployed Engineers (FDEs) — and the permanent capability the client retains post-engagement.
              </p>

              <div className="mt-4 p-6 rounded-xl bg-slate-900/90 border border-cyan-500/25 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-start gap-3">
                  <Boxes size={22} className="text-cyan-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-base font-bold text-white mb-2">
                      Core Acceleration Stack
                    </h3>
                    <p className="text-slate-200 text-sm leading-relaxed">
                      {area.solutionAcceleration}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800">
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block mb-1">
                      What We Accelerate
                    </span>
                    <p className="text-xs text-slate-300 m-0">
                      Pre-built connectors, reference pipelines, and evaluation harnesses to deploy without building from scratch.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-1">
                      What Client Retains
                    </span>
                    <p className="text-xs text-slate-300 m-0">
                      100% intellectual property, operational runbooks, calibrated weights, and autonomous team execution capability.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. KPIS BANKED */}
            <section id="kpis-banked" className="pa-content-section">
              <h2 className="pa-section-heading">
                <span className="pa-heading-bar" />
                3. Measurable KPIs Banked
              </h2>
              <p className="text-slate-400 text-xs mt-2">
                Performance indicators measured, validated, and signed off against a verified financial baseline.
              </p>

              <div className="mt-4 p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                <div className="flex items-start gap-3">
                  <TrendingUp size={22} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                      Contractual Baseline Targets
                    </span>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {area.kpisBanked}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      Every benefit entry is verified by financial controllers. If a practice area cannot name two quantifiable metrics against a baseline, it is not ready for production release.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. TIME TO VALUE */}
            <section id="time-to-value" className="pa-content-section">
              <h2 className="pa-section-heading">
                <span className="pa-heading-bar" />
                4. Time to Value &amp; Delivery Horizon
              </h2>
              <div className="mt-4 p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Clock size={28} className="text-blue-400 shrink-0" />
                  <div>
                    <span className="text-2xl font-bold font-mono text-white">
                      {area.timeToValue}
                    </span>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      Kickoff to first Finance-signed benefit entry at reference-client pace
                    </span>
                  </div>
                </div>
                <div className="text-xs text-slate-400 bg-slate-950 px-3 py-2 rounded border border-slate-800">
                  Assumes week 1 data access &amp; named client owner
                </div>
              </div>
            </section>

            {/* 5. VALUE ASSURANCE */}
            <section id="value-assurance" className="pa-content-section">
              <h2 className="pa-section-heading">
                <span className="pa-heading-bar" />
                5. Value Assurance &amp; Regulatory Stack
              </h2>
              <p className="text-slate-400 text-xs mt-2">
                Standards, regulatory requirements, controls, governance, and audit evidence making the solution mathematically defensible.
              </p>

              <div className="mt-4 p-5 rounded-xl bg-indigo-950/20 border border-indigo-500/30">
                <div className="flex items-start gap-3">
                  <ShieldCheck size={22} className="text-indigo-400 shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold block">
                      Compliance &amp; Governance Regimes
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {area.valueAssurance}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed pt-2">
                      All models and automation pipelines adhere to strict audit-trail integrity, deterministic validation, and applicable sector legislation (e.g. EU AI Act, ISO, NIST, GxP, SEC, FINRA).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. RELATED / ATTACHED PRACTICES */}
            <section id="related-practices" className="pa-content-section">
              <h2 className="pa-section-heading">
                <span className="pa-heading-bar" />
                6. Related Practices &amp; Attachment Architecture
              </h2>
              <p className="text-slate-400 text-xs mt-2">
                {isCross
                  ? 'Vertical industries into which this horizontal practice frequently attaches.'
                  : 'Horizontal cross-industry capabilities that accelerate and govern this vertical practice.'}
              </p>

              <div className="mt-4 p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex flex-wrap gap-2">
                  {isCross ? (
                    <div className="space-y-3 w-full">
                      <span className="text-xs text-slate-400 block font-mono">
                        Attach Profile: <strong className="text-white">{data.practice.attachVerticals.join(', ')}</strong>
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {data.area.relatedIndustries.map((rel: string, idx: number) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-blue-950/40 text-blue-300 border border-blue-800/40"
                          >
                            <Building2 size={11} className="text-blue-400" />
                            <span>{rel}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    data.area.relatedCrossPractices.map((tag: string, idx: number) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-blue-950/40 text-blue-300 border border-blue-800/40"
                      >
                        <Zap size={11} className="text-blue-400" />
                        <span>{tag}</span>
                      </span>
                    ))
                  )}
                </div>
              </div>
            </section>

            {/* 7. TARGET STAKEHOLDERS */}
            <section id="target-stakeholders" className="pa-content-section">
              <h2 className="pa-section-heading">
                <span className="pa-heading-bar" />
                7. Target Stakeholders &amp; Commercial Ownership
              </h2>
              <div className="mt-4 p-5 rounded-xl bg-slate-900/60 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">
                    Primary Executive Buyer
                  </span>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <UserCheck size={16} className="text-cyan-400" />
                    <span>{stakeholder}</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">
                    Budget / P&amp;L Alignment
                  </span>
                  <div className="text-sm font-semibold text-slate-200">
                    {isCross ? data.practice.budget : data.industry.bankedAgainst}
                  </div>
                </div>
              </div>
            </section>

            {/* 8. CALL TO ACTION & CONSULTATION */}
            <section id="consultation-booking" className="pa-content-section">
              <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-cyan-950/40 border border-blue-500/30 text-center">
                <span className="badge badge-accent mb-3">Architect Advisory</span>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Discuss {area.title} with a TRUSTGRID.AI Architect
                </h3>
                <p className="text-slate-300 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
                  Evaluate your technical topology, establish baseline unit economics, and scope a production Forward Deployment sprint for this practice area.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/book-ai-diagnostic#diagnostic-form-section"
                    className="button button-primary"
                  >
                    <span>Schedule Architecture Diagnostic</span>
                    <ArrowUpRight size={15} />
                  </Link>
                  <Link
                    href="/practice-areas#comprehensive-explorer"
                    className="button button-outline"
                  >
                    <ArrowLeft size={15} />
                    <span>Explore All Practice Areas</span>
                  </Link>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky Sidebar Column (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Quick Spec Card */}
            <div className="pa-sidebar-box">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-4 text-cyan-400">
                Practice Area Specification
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Code:</span>
                  <span className="font-mono font-bold text-white">{area.code}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Category:</span>
                  <span className="text-slate-200">{isCross ? 'Cross-Industry' : 'Industry Vertical'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Time to Value:</span>
                  <span className="font-mono text-emerald-400 font-semibold">{area.timeToValue}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Buyer:</span>
                  <span className="text-slate-200 truncate max-w-[180px]">{stakeholder}</span>
                </div>
                {!isCross && (
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Sector Pool:</span>
                    <span className="font-mono text-white">{data.industry.poolSize}</span>
                  </div>
                )}
              </div>

              <div className="mt-5 space-y-2">
                <Link
                  href="/book-ai-diagnostic#diagnostic-form-section"
                  className="button button-primary w-full text-center justify-center text-xs"
                >
                  <span>Book Architecture Diagnostic</span>
                </Link>
                <Link
                  href="/contact"
                  className="button button-outline w-full text-center justify-center text-xs"
                >
                  <span>Request Custom Proposal (SOW)</span>
                </Link>
              </div>
            </div>

            {/* Sibling Practice Areas in same Sub-Vertical or Horizontal Practice */}
            <div className="pa-sidebar-box">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-3">
                {isCross ? `Other Areas in ${data.practice.code}` : `Related in ${data.subVertical.code}`}
              </span>
              <div className="space-y-2">
                {siblingAreas.map((sib) => {
                  const isCurrent = sib.slug === area.slug
                  return (
                    <Link
                      key={sib.code}
                      href={`/practice-areas/${sib.slug}`}
                      className={`flex items-center justify-between text-xs py-2 px-2.5 rounded-lg border transition-all ${
                        isCurrent
                          ? 'bg-blue-600/20 border-blue-500/50 text-white font-semibold'
                          : 'border-slate-800/80 text-slate-300 hover:border-slate-700 hover:text-white bg-slate-950/40'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <span className="font-mono text-cyan-400 text-[10px] mr-1.5">
                          {sib.code}
                        </span>
                        <span>{sib.title}</span>
                      </div>
                      <ChevronRight size={13} className="text-slate-500 shrink-0" />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Navigation back to Directory */}
            <div className="pa-sidebar-box text-center">
              <Link
                href="/practice-areas#comprehensive-explorer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ArrowLeft size={13} />
                <span>Return to Practice Directory</span>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}

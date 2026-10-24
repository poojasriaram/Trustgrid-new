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
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

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
  const categoryBadge = isCross ? 'Cross-Industry Practice' : 'Industry Vertical Practice'

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
    <div className="page-shell min-h-screen flex flex-col justify-between bg-[#f8fafc] text-slate-900">
      <SiteHeader />

      <main className="flex-1 relative pt-20">
        <article className="practice-detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. BREADCRUMBS & HERO SECTION */}
      <section className="pa-detail-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="pa-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <Link href="/practice-areas" className="hover:text-blue-600 transition-colors">
              Practice Areas
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <Link href="/practice-areas#comprehensive-explorer" className="hover:text-blue-600 transition-colors">
              {parentTitle}
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-blue-600 font-semibold truncate">{area.title}</span>
          </nav>

          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`pa-category-pill ${isCross ? 'pa-pill-cross' : 'pa-pill-tech'}`}>
                {categoryBadge}
              </span>
              <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                Code {area.code}
              </span>
              {!isCross && (
                <span className="text-xs font-mono text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                  Tier {data.industry.tier}
                </span>
              )}
              {isCross && data.practice.originator && (
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Regulatory Originator
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {area.title}
            </h1>

            <p className="text-lg text-slate-600 max-w-3xl mt-4 leading-relaxed font-normal">
              {area.overview || `${area.title} deploys battle-tested AI acceleration assets, deterministic assurance stacks, and production engineering directly into ${subTitle}.`}
            </p>

            {/* Quick Hero Spec Badges */}
            <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-1.5 text-xs text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                <Clock size={13} className="text-blue-600" />
                <span className="text-slate-500">Time to Value:</span>
                <strong className="text-slate-900 font-mono">{area.timeToValue}</strong>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                <UserCheck size={13} className="text-cyan-600" />
                <span className="text-slate-500">Target Stakeholder:</span>
                <strong className="text-slate-900">{stakeholder}</strong>
              </div>
              {!isCross && (
                <div className="flex items-center gap-1.5 text-xs text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                  <Activity size={13} className="text-emerald-600" />
                  <span className="text-slate-500">Pool Size:</span>
                  <strong className="text-slate-900 font-mono">{data.industry.poolSize}</strong>
                </div>
              )}
              {isCross && (
                <div className="flex items-center gap-1.5 text-xs text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                  <ShieldCheck size={13} className="text-indigo-600" />
                  <span className="text-slate-500">Budget:</span>
                  <strong className="text-slate-900">{data.practice.budget}</strong>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start w-full">
          {/* Main Body Column (8 cols) */}
          <div className="lg:col-span-8 space-y-12 w-full">
            {/* 1. PRACTICE OVERVIEW */}
            <section id="overview" className="pa-content-section">
              <h2 className="pa-section-heading">
                <span className="pa-heading-bar" />
                1. Practice Overview &amp; Problem Framing
              </h2>
              <div className="mt-4 p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <p className="text-slate-700 text-sm leading-relaxed">
                  {area.overview || `Targeted enterprise automation addressing operational bottlenecks in ${subTitle}. Engineered for direct integration into production environments with deterministic controls.`}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500">
                  <span>Parent Industry / Function: <strong className="text-slate-900">{parentTitle}</strong></span>
                  <span>Sub-Domain: <strong className="text-blue-600">{subTitle}</strong></span>
                </div>
              </div>
            </section>

            {/* 2. SOLUTION ACCELERATION & CAPABILITY */}
            <section id="solution-acceleration" className="pa-content-section">
              <h2 className="pa-section-heading">
                <span className="pa-heading-bar" />
                2. Solution Acceleration &amp; Engineering Capability
              </h2>
              <p className="text-slate-600 text-xs mt-2">
                Reusable AI engineering assets, connectors, and model libraries deployed by Forward Deployed Engineers (FDEs) — and the permanent capability the client retains post-engagement.
              </p>

              <div className="mt-4 p-6 rounded-xl bg-white border border-blue-200 shadow-xs relative overflow-hidden">
                <div className="flex items-start gap-3">
                  <Boxes size={22} className="text-blue-600 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      Core Acceleration Stack
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {area.solutionAcceleration}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                  <div className="p-3.5 rounded-lg bg-blue-50/60 border border-blue-100">
                    <span className="text-[10px] font-mono uppercase text-blue-700 font-bold block mb-1">
                      What We Accelerate
                    </span>
                    <p className="text-xs text-slate-600 m-0">
                      Pre-built connectors, reference pipelines, and evaluation harnesses to deploy without building from scratch.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
                    <span className="text-[10px] font-mono uppercase text-emerald-700 font-bold block mb-1">
                      What Client Retains
                    </span>
                    <p className="text-xs text-slate-600 m-0">
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
              <p className="text-slate-600 text-xs mt-2">
                Performance indicators measured, validated, and signed off against a verified financial baseline.
              </p>

              <div className="mt-4 p-5 rounded-xl bg-emerald-50/60 border border-emerald-200 shadow-xs">
                <div className="flex items-start gap-3">
                  <TrendingUp size={22} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold block mb-1">
                      Contractual Baseline Targets
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      {area.kpisBanked}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
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
              <div className="mt-4 p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Clock size={28} className="text-blue-600 shrink-0" />
                  <div>
                    <span className="text-2xl font-bold font-mono text-slate-900">
                      {area.timeToValue}
                    </span>
                    <span className="text-xs text-slate-500 block mt-0.5">
                      Kickoff to first Finance-signed benefit entry at reference-client pace
                    </span>
                  </div>
                </div>
                <div className="text-xs text-slate-600 bg-slate-50 px-3 py-2 rounded border border-slate-200">
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
              <p className="text-slate-600 text-xs mt-2">
                Standards, regulatory requirements, controls, governance, and audit evidence making the solution mathematically defensible.
              </p>

              <div className="mt-4 p-5 rounded-xl bg-indigo-50/60 border border-indigo-200 shadow-xs">
                <div className="flex items-start gap-3">
                  <ShieldCheck size={22} className="text-indigo-600 shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-700 font-bold block">
                      Compliance &amp; Governance Regimes
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {area.valueAssurance}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed pt-2">
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
              <p className="text-slate-600 text-xs mt-2">
                {isCross
                  ? 'Vertical industries into which this horizontal practice frequently attaches.'
                  : 'Horizontal cross-industry capabilities that accelerate and govern this vertical practice.'}
              </p>

              <div className="mt-4 p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="flex flex-wrap gap-2">
                  {isCross ? (
                    <div className="space-y-3 w-full">
                      <span className="text-xs text-slate-600 block font-mono">
                        Attach Profile: <strong className="text-slate-900">{data.practice.attachVerticals.join(', ')}</strong>
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {data.area.relatedIndustries.map((rel: string, idx: number) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200"
                          >
                            <Building2 size={11} className="text-blue-600" />
                            <span>{rel}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    data.area.relatedCrossPractices.map((tag: string, idx: number) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200"
                      >
                        <Zap size={11} className="text-blue-600" />
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
              <div className="mt-4 p-5 rounded-xl bg-white border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block mb-1">
                    Primary Executive Buyer
                  </span>
                  <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <UserCheck size={16} className="text-blue-600" />
                    <span>{stakeholder}</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block mb-1">
                    Budget / P&amp;L Alignment
                  </span>
                  <div className="text-sm font-semibold text-slate-700">
                    {isCross ? data.practice.budget : data.industry.bankedAgainst}
                  </div>
                </div>
              </div>
            </section>

            {/* 8. CALL TO ACTION & CONSULTATION */}
            <section id="consultation-booking" className="pa-content-section">
              <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-50 via-white to-indigo-50 border border-blue-200 text-center shadow-xs">
                <span className="badge badge-accent mb-3">Architect Advisory</span>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                  Discuss {area.title} with a TRUSTGRID.AI Architect
                </h3>
                <p className="text-slate-600 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
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
          <aside className="lg:col-span-4 space-y-6 pa-sidebar-sticky">
            {/* 1. On-Page Table of Contents */}
            <div className="pa-sidebar-box pa-toc-box">
              <div className="pa-toc-header">
                <span className="pa-toc-title">Practice Navigator</span>
                <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-bold">
                  8 Points
                </span>
              </div>
              <nav className="pa-toc-nav" aria-label="Section Navigation">
                <a href="#overview" className="pa-toc-link">
                  <span className="pa-toc-num">01</span>
                  <span>Overview &amp; Problem</span>
                </a>
                <a href="#solution-acceleration" className="pa-toc-link">
                  <span className="pa-toc-num">02</span>
                  <span>Solution Acceleration</span>
                </a>
                <a href="#kpis-banked" className="pa-toc-link">
                  <span className="pa-toc-num">03</span>
                  <span>KPIs Banked</span>
                </a>
                <a href="#time-to-value" className="pa-toc-link">
                  <span className="pa-toc-num">04</span>
                  <span>Time to Value</span>
                </a>
                <a href="#value-assurance" className="pa-toc-link">
                  <span className="pa-toc-num">05</span>
                  <span>Value Assurance</span>
                </a>
                <a href="#target-stakeholders" className="pa-toc-link">
                  <span className="pa-toc-num">06</span>
                  <span>Target Stakeholders</span>
                </a>
                <a href="#consultation-booking" className="pa-toc-link">
                  <span className="pa-toc-num">07</span>
                  <span>Architect Consultation</span>
                </a>
              </nav>
            </div>

            {/* 2. Direct Practice Lead Architect Advisory Box */}
            <div className="pa-sidebar-box pa-lead-box">
              <div className="pa-live-pulse">
                <span className="pa-pulse-dot" />
                <span>Live Architect Advisory</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Consult {area.code} Architect
              </h3>
              <p className="text-slate-600 text-xs mb-4 leading-relaxed">
                Review your architecture constraints, evaluate delivery velocity, and scope a production Forward Deployment sprint.
              </p>
              <div className="space-y-2.5">
                <Link
                  href={`/talk-to-ai-architect?topic=${encodeURIComponent(area.title)}#session-booking-section`}
                  className="button button-primary w-full text-center justify-center text-xs font-semibold py-2.5 shadow-sm"
                >
                  <Sparkles size={14} />
                  <span>Book 45-Min Technical Session</span>
                </Link>
                <Link
                  href="/book-ai-diagnostic#diagnostic-form-section"
                  className="button button-outline w-full text-center justify-center text-xs font-semibold py-2"
                >
                  <span>Schedule Architectural Diagnostic</span>
                </Link>
              </div>
              <div className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Direct Inquiries:</span>
                <a href="mailto:connect@trustgrid.ai" className="font-semibold text-blue-600 hover:underline">
                  connect@trustgrid.ai
                </a>
              </div>
            </div>

            {/* 3. Quick Spec Card */}
            <div className="pa-sidebar-box">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono mb-4 text-blue-600">
                Practice Area Specification
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Code:</span>
                  <span className="font-mono font-bold text-slate-900">{area.code}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Category:</span>
                  <span className="text-slate-700">{isCross ? 'Cross-Industry' : 'Industry Vertical'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Time to Value:</span>
                  <span className="font-mono text-emerald-600 font-semibold">{area.timeToValue}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Buyer:</span>
                  <span className="text-slate-700 truncate max-w-[180px]">{stakeholder}</span>
                </div>
                {!isCross && (
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Sector Pool:</span>
                    <span className="font-mono text-slate-900">{data.industry.poolSize}</span>
                  </div>
                )}
              </div>
            </div>

            {/* 4. Sibling Practice Areas */}
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
                          ? 'bg-blue-50 border-blue-300 text-blue-700 font-semibold'
                          : 'border-slate-200 text-slate-700 hover:border-blue-200 hover:text-blue-600 bg-white'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <span className="font-mono text-blue-600 text-[10px] mr-1.5">
                          {sib.code}
                        </span>
                        <span>{sib.title}</span>
                      </div>
                      <ChevronRight size={13} className="text-slate-400 shrink-0" />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* 5. Navigation back to Directory */}
            <div className="pa-sidebar-box text-center">
              <Link
                href="/practice-areas#comprehensive-explorer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 transition-colors font-semibold"
              >
                <ArrowLeft size={13} />
                <span>Return to Practice Directory</span>
              </Link>
            </div>
          </aside>
        </div>
      </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Cpu,
  Zap,
  TrendingUp,
  ShieldCheck,
  Lock,
  Network,
  Bot,
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
  Users,
  ChevronRight,
  ArrowLeft,
  Calendar,
  FileCheck,
  Target,
  BarChart3,
  SlidersHorizontal,
  Compass,
  Briefcase
} from 'lucide-react'
import { IndustryDetail } from '@/lib/industries-data'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Cpu,
  Zap,
  TrendingUp,
  ShieldCheck,
  Lock,
  Network,
  Bot,
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
  Users,
  Calendar,
  FileCheck,
  Target,
  BarChart3,
  SlidersHorizontal,
  Compass,
  Briefcase
}

function resolveIcon(name: string) {
  return iconMap[name] || Sparkles
}

interface IndustryVerticalLayoutProps {
  industry: IndustryDetail
  prevIndustry?: IndustryDetail
  nextIndustry?: IndustryDetail
  isEmbedded?: boolean
}

export function IndustryVerticalLayout({
  industry,
  prevIndustry,
  nextIndustry,
  isEmbedded = false
}: IndustryVerticalLayoutProps) {
  const [activeCapabilityTab, setActiveCapabilityTab] = useState(0)

  return (
    <div className="industry-vertical-container" id={industry.slug}>
      {/* =========================================================================
          SECTION 1 — INDUSTRY HERO
          ========================================================================= */}
      <section className="industry-hero-section relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-16 md:py-20 px-4 md:px-8 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(29,92,255,0.22),rgba(255,255,255,0))] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-5">
            <Sparkles size={13} className="text-blue-400" />
            <span>{industry.badge}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">{industry.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            {industry.name}{' '}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
              AI Architecture & Operational Blueprints
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {industry.heroSubtitle || industry.summary}
          </p>

          <div className="mt-4 text-xs sm:text-sm font-mono text-slate-400 max-w-2xl mx-auto flex items-center justify-center gap-2 flex-wrap">
            <span className="text-blue-400 font-semibold">Strategic Thesis:</span>
            <span>{industry.tagline}</span>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <Link
              href={`/book-ai-diagnostic?industry=${encodeURIComponent(industry.name)}#diagnostic-form-section`}
              className="button button-primary button-md"
            >
              <span>Book an AI Diagnostic</span>
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href={`/talk-to-ai-architect?topic=${encodeURIComponent(industry.name)}#session-booking-section`}
              className="button button-ghost button-md text-white border-slate-700 hover:border-slate-500 hover:bg-slate-800/60"
            >
              <span>Talk to an AI Architect</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — STAT CARDS (4 Balanced Cards Desktop Grid)
          ========================================================================= */}
      <section className="section bg-slate-50/70 border-b border-slate-200 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="section-badge text-blue-600 bg-blue-50 border-blue-200 font-semibold uppercase text-xs tracking-wider px-3 py-1 rounded-full border">
              VERIFIED INDUSTRY PERFORMANCE METRICS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Quantified Operational & Balance-Sheet Impact
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Verified performance indicators derived from production AI engineering deployments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {industry.statCards.map((stat, sIdx) => {
              const IconComponent = resolveIcon(stat.iconName)
              return (
                <div
                  key={sIdx}
                  className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between relative overflow-hidden group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <IconComponent size={20} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                      Metric 0{sIdx + 1}
                    </span>
                  </div>

                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight group-hover:text-blue-600 transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-sm font-bold text-slate-800 mt-1.5 leading-snug">
                      {stat.label}
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100 leading-relaxed">
                    {stat.context}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — IDEAL CUSTOMER PROFILE (ICP)
          ========================================================================= */}
      <section className="section py-12 md:py-16 bg-white border-b border-slate-200" id="icp-profile">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="section-badge text-blue-600 bg-blue-50 border-blue-200 font-semibold uppercase text-xs tracking-wider px-3 py-1 rounded-full border">
              TARGET ENTERPRISE FIT
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Ideal Customer Profile for {industry.name}
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Designed for high-scale organizations facing mission-critical regulatory, technical, and economic thresholds.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CARD 1: TARGET ORGANIZATIONS & SCALE */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Building2 size={17} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Target Organizations & Scale</h3>
                    <span className="text-[11px] text-slate-500 font-mono">Enterprise Profile</span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <span className="text-xs font-semibold text-slate-700 block uppercase tracking-wider">
                    Target Enterprise Types:
                  </span>
                  <ul className="space-y-2">
                    {industry.icp.targetOrgs.map((org, oIdx) => (
                      <li key={oIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 size={14} className="text-blue-600 shrink-0 mt-0.5" />
                        <span>{org}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <span className="text-[11px] font-mono text-slate-500 block uppercase mb-1">
                  Operational Complexity:
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {industry.icp.scaleComplexity}
                </p>
              </div>
            </div>

            {/* CARD 2: DECISION MAKERS & BUYING TRIGGERS */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <Users size={17} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Decision Makers & Buying Triggers</h3>
                    <span className="text-[11px] text-slate-500 font-mono">Executive Stakeholders</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <span className="text-xs font-semibold text-slate-700 block uppercase tracking-wider">
                    Key Executive Stakeholders:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {industry.icp.decisionMakers.map((dm, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-800 shadow-2xs"
                      >
                        {dm}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <span className="text-[11px] font-mono text-slate-500 block uppercase mb-1.5">
                  Primary Buying Triggers:
                </span>
                <ul className="space-y-1.5">
                  {industry.icp.buyingTriggers.map((trig, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-1.5 text-xs text-slate-700 leading-relaxed">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{trig}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CARD 3: TECHNICAL CONDITIONS & ARCHITECTURAL FIT */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Workflow size={17} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Technical Maturity & Prerequisites</h3>
                    <span className="text-[11px] text-slate-500 font-mono">Architecture Readiness</span>
                  </div>
                </div>

                <div className="space-y-2.5 mb-4">
                  <span className="text-xs font-semibold text-slate-700 block uppercase tracking-wider">
                    Optimal Fit Conditions:
                  </span>
                  <ul className="space-y-2">
                    {industry.icp.technicalConditions.map((cond, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                        <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{cond}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <Link
                  href={`/book-ai-diagnostic?industry=${encodeURIComponent(industry.name)}#diagnostic-form-section`}
                  className="w-full button button-primary button-sm justify-center"
                >
                  <span>Evaluate {industry.name} Readiness</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 — PROBLEMS & CHALLENGES (4 Evenly Sized Cards in Grid)
          ========================================================================= */}
      <section className="section py-12 md:py-16 bg-slate-50/60 border-b border-slate-200" id="challenges">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="section-badge text-amber-700 bg-amber-50 border-amber-200 font-semibold uppercase text-xs tracking-wider px-3 py-1 rounded-full border">
              SECTOR-SPECIFIC FAILURE MODES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Critical Challenges in {industry.name}
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Why generic cloud copilots and conventional approaches stall when confronted with high-stakes constraints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {industry.detailedChallenges.map((challenge, cIdx) => (
              <div
                key={cIdx}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <span className="w-6 h-6 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center font-mono font-bold text-xs">
                      0{cIdx + 1}
                    </span>
                    <span className="text-[10px] font-mono text-amber-600 uppercase tracking-wider font-semibold">
                      Constraint
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug mb-2">
                    {challenge.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {challenge.issue}
                  </p>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-slate-100">
                  <div className="p-2.5 rounded-lg bg-red-50/70 border border-red-100">
                    <span className="text-[10px] font-bold text-red-800 uppercase block mb-0.5">
                      Business Impact:
                    </span>
                    <p className="text-[11px] text-red-900 leading-relaxed">
                      {challenge.businessImpact}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-700 uppercase block mb-0.5">
                      Why Existing Approaches Fail:
                    </span>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {challenge.limitationOfCurrent}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 — TRUSTGRID.AI ENGINEERED SOLUTIONS (4 Mapped Solutions Grid)
          ========================================================================= */}
      <section className="section py-12 md:py-16 bg-white border-b border-slate-200" id="engineered-solutions">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="section-badge text-blue-600 bg-blue-50 border-blue-200 font-semibold uppercase text-xs tracking-wider px-3 py-1 rounded-full border">
              SYSTEMS-LEVEL ENGINEERING
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Engineered Solutions for {industry.name}
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every critical sector challenge mapped directly to our turnkey hardware, agent, and security capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {industry.engineeredSolutions.map((sol, sIdx) => (
              <div
                key={sIdx}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center font-bold font-mono text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      0{sIdx + 1}
                    </div>
                    <span className="text-[10px] font-mono text-blue-600 uppercase font-semibold">
                      TrustGrid Solution
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors">
                    {sol.capabilityName}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {sol.engineered}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100/80">
                    <span className="text-[10px] font-mono font-bold text-blue-800 uppercase block mb-1">
                      Architecture & Stack:
                    </span>
                    <p className="text-[11px] text-blue-950 font-medium leading-relaxed">
                      {sol.architecture}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
                    <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase block mb-1">
                      Expected Outcome:
                    </span>
                    <p className="text-[11px] text-emerald-950 font-semibold leading-relaxed">
                      {sol.expectedOutcome}
                    </p>
                  </div>

                  <Link
                    href={sol.ctaHref}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center justify-between pt-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>{sol.ctaText}</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 — CAPABILITIES & IMPLEMENTATION (6 Enterprise Domains)
          ========================================================================= */}
      <section className="section py-12 md:py-16 bg-slate-50/70 border-b border-slate-200" id="capabilities">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="section-badge text-blue-600 bg-blue-50 border-blue-200 font-semibold uppercase text-xs tracking-wider px-3 py-1 rounded-full border">
              FULL-STACK CAPABILITY MATRIX
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Capabilities Applied Across 6 Enterprise Domains
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Organized into logical enterprise engineering disciplines deployed in {industry.name}.
            </p>
          </div>

          {/* DOMAIN TABS */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
            {industry.capabilityGroups.map((group, gIdx) => {
              const IconComp = resolveIcon(group.iconName)
              const isActive = gIdx === activeCapabilityTab
              return (
                <button
                  key={gIdx}
                  onClick={() => setActiveCapabilityTab(gIdx)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                  }`}
                >
                  <IconComp size={15} />
                  <span>{group.category}</span>
                </button>
              )
            })}
          </div>

          {/* ACTIVE DOMAIN DISPLAY */}
          {industry.capabilityGroups[activeCapabilityTab] && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
                      Domain 0{activeCapabilityTab + 1}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500 font-medium">Production Architecture</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {industry.capabilityGroups[activeCapabilityTab].category}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {industry.capabilityGroups[activeCapabilityTab].summary}
                  </p>
                </div>

                <Link
                  href="/book-ai-diagnostic#diagnostic-form-section"
                  className="button button-ghost button-sm whitespace-nowrap self-start md:self-auto"
                >
                  <span>Request Domain Audit</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {industry.capabilityGroups[activeCapabilityTab].items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  >
                    <h4 className="text-base font-bold text-slate-900 mb-1.5">{item.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{item.description}</p>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                        Core Architecture Features:
                      </span>
                      <ul className="space-y-1">
                        {item.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 — OUTCOMES AND ENGAGEMENT (Verified KPIs, 3 Phases, Case Study)
          ========================================================================= */}
      <section className="section py-12 md:py-16 bg-white border-b border-slate-200" id="outcomes">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="section-badge text-emerald-700 bg-emerald-50 border-emerald-200 font-semibold uppercase text-xs tracking-wider px-3 py-1 rounded-full border">
              PROVABLE RETURN ON INVESTMENT
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Verified Outcomes & Implementation Roadmap
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Structured paths from architectural assessment to compounding operational returns.
            </p>
          </div>

          {/* 4 QUANTIFIED KPI IMPACT BLOCKS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {industry.outcomesEngagement.verifiedOutcomes.map((out, oIdx) => (
              <div
                key={oIdx}
                className="p-5 rounded-xl border border-slate-200 bg-slate-900 text-white flex flex-col justify-between"
              >
                <span className="text-[11px] font-mono text-blue-400 font-semibold uppercase">
                  {out.kpi}
                </span>
                <div className="text-3xl font-extrabold text-white font-mono my-2 tracking-tight">
                  {out.value}
                </div>
                <span className="text-[11px] text-slate-400 leading-snug">
                  {out.context}
                </span>
              </div>
            ))}
          </div>

          {/* 3-PHASE IMPLEMENTATION ROADMAP */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Standard 3-Stage Implementation Framework
                </h3>
                <p className="text-xs text-slate-500">
                  Phased deployment model ensuring zero operational disruption and rapid time-to-value.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
                100% Outcome-Accountable
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {industry.outcomesEngagement.implementationPhases.map((phase, pIdx) => (
                <div
                  key={pIdx}
                  className="p-6 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between shadow-xs hover:border-blue-300 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                      <span className="text-xs font-bold text-blue-600 font-mono">
                        Stage 0{pIdx + 1}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                        {phase.duration}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 mb-2">{phase.phase}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{phase.focus}</p>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                        Key Deliverables:
                      </span>
                      <ul className="space-y-1.5">
                        {phase.deliverables.map((del, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-1.5 text-xs text-slate-700">
                            <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TRACEABLE CASE STUDY STRIP */}
          {industry.outcomesEngagement.caseStudyRef && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 border border-blue-400/30 text-[10px] font-mono font-bold text-blue-300 uppercase">
                    Traceable Blueprint Case Study
                  </span>
                  <span className="text-xs font-bold text-emerald-400">
                    {industry.outcomesEngagement.caseStudyRef.impactMetric}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-1">
                  {industry.outcomesEngagement.caseStudyRef.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {industry.outcomesEngagement.caseStudyRef.summary}
                </p>
              </div>

              <Link
                href={industry.outcomesEngagement.caseStudyRef.href}
                className="button button-light button-sm whitespace-nowrap self-start md:self-auto"
              >
                <span>Read Full Case Study</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          NEXT / PREV NAVIGATION (When not embedded in directory)
          ========================================================================= */}
      {!isEmbedded && (prevIndustry || nextIndustry) && (
        <section className="section border-b border-slate-200 py-6 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevIndustry ? (
              <Link
                href={`/industries/${prevIndustry.slug}`}
                className="flex items-center gap-3 p-3 px-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-all text-left w-full sm:w-auto"
              >
                <ArrowLeft size={16} className="text-blue-600" />
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">
                    Previous Vertical
                  </span>
                  <span className="text-xs font-bold text-slate-900">{prevIndustry.name}</span>
                </div>
              </Link>
            ) : <div />}

            <Link href="/industries" className="button button-ghost button-sm">
              <span>View All 12 Industry Blueprints</span>
            </Link>

            {nextIndustry ? (
              <Link
                href={`/industries/${nextIndustry.slug}`}
                className="flex items-center gap-3 p-3 px-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-all text-right w-full sm:w-auto justify-end"
              >
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">
                    Next Vertical
                  </span>
                  <span className="text-xs font-bold text-slate-900">{nextIndustry.name}</span>
                </div>
                <ChevronRight size={16} className="text-blue-600" />
              </Link>
            ) : <div />}
          </div>
        </section>
      )}

      {/* =========================================================================
          FINAL ENGAGEMENT CALL TO ACTION BANNER
          ========================================================================= */}
      <section className="section cta-section" id="diagnostic-intake">
        <div className="cta-container">
          <div className="cta-badge">
            <Sparkles size={14} />
            <span>CUSTOM {industry.name.toUpperCase()} ROADMAP</span>
          </div>
          <h2>Ready to Architect Industrial-Grade AI in {industry.name}?</h2>
          <p>
            Engage directly with our principal systems engineers and domain practice leads. We audit your existing stack, eliminate compute waste, and engineer verifiable production AI.
          </p>
          <div className="cta-actions">
            <Link
              href={`/book-ai-diagnostic?industry=${encodeURIComponent(industry.name)}#diagnostic-form-section`}
              className="button button-primary"
            >
              <span>Book an AI Diagnostic</span>
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href={`/talk-to-ai-architect?topic=${encodeURIComponent(industry.name)}#session-booking-section`}
              className="button button-ghost"
            >
              <span>Talk to an AI Architect</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

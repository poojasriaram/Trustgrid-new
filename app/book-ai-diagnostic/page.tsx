'use client'

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowUpRight,
  Check,
  Building2,
  Calendar,
  Layers,
  Sparkles,
  ShieldCheck,
  Cpu,
  Bot,
  Lock,
  Network,
  TrendingUp,
  FileCheck
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { TrustGridForm } from '@/components/ui/trustgrid-form'
import { SessionBookingForm } from '@/components/ui/session-booking-form'
import { WhatsAppCTA } from '@/components/ui/whatsapp-cta'
import { DiagnosticJourneySlider } from '@/components/ui/diagnostic-journey-slider'

function DiagnosticContent() {
  const searchParams = useSearchParams()
  const isStrategySession = searchParams.get('type') === 'strategy-session'
  const initialSolution = searchParams.get('solution') || ''
  const initialIndustry = searchParams.get('industry') || ''

  return (
    <>
      {/* ABOVE-THE-FOLD DEDICATED DIAGNOSTIC & PROPOSAL INTAKE SECTION */}
      <section className="section dedicated-form-hero-section" id="diagnostic-form-section" style={{ paddingTop: '24px', paddingBottom: '40px' }}>
        <div className="diagnostic-grid-layout" style={{ alignItems: 'flex-start' }}>
          {/* LEFT: INTRO & VALUE PROPOSITIONS */}
          <div className="diagnostic-intro-col">
            <div className="diagnostic-badge-wrap">
              <span className="section-label" style={{ color: '#1d5cff', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={13} />
                <span>TRUSTGRID.AI &bull; {isStrategySession ? 'EXECUTIVE STRATEGY BRIEFING' : 'ENTERPRISE AI DIAGNOSTIC'}</span>
              </span>
              <h1 style={{ fontSize: 'clamp(28px, 3.8vw, 42px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.15, margin: '8px 0 14px' }}>
                {isStrategySession ? (
                  <>Schedule an Executive <span style={{ color: '#1d5cff' }}>AI Strategy Session.</span></>
                ) : (
                  <>Fastest Path from AI Ambition to <span style={{ color: '#1d5cff' }}>Operational Value.</span></>
                )}
              </h1>
              <p className="diagnostic-hero-lead" style={{ fontSize: '15px', color: '#475569', lineHeight: 1.55 }}>
                {isStrategySession
                  ? 'Engage directly with senior infrastructure and multi-agent architects. In 45 minutes, we examine your deployment bottlenecks, GPU cluster topology, and deliver an actionable execution path.'
                  : 'Start with a structured, executive-level technical diagnostic. We evaluate your compute economics, multi-agent readiness, governance posture, and quantum security to build a sequenced 90-day execution roadmap.'}
              </p>
            </div>

            <div className="diagnostic-value-points" style={{ marginTop: '20px' }}>
              <div className="value-point">
                <div className="value-point-icon">
                  <Cpu size={16} />
                </div>
                <div>
                  <strong>Deep Systems Engineering Audit</strong>
                  <p>Direct engagement with senior AI infrastructure and multi-agent architects.</p>
                </div>
              </div>
              <div className="value-point">
                <div className="value-point-icon">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <strong>Rigorous Financial &amp; Technical Profiling</strong>
                  <p>Quantifiable cost-per-token profiling, bottleneck diagnosis, and TCO modeling.</p>
                </div>
              </div>
              <div className="value-point">
                <div className="value-point-icon">
                  <FileCheck size={16} />
                </div>
                <div>
                  <strong>90-Day Execution Roadmap</strong>
                  <p>Prioritized milestones with clear ownership, risk boundaries, and ROI targets.</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', padding: '18px 20px', background: '#ffffff', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#1d5cff', letterSpacing: '0.05em' }}>
                DIRECT CALENDAR &amp; CHANNELS
              </span>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '6px 0 14px' }}>
                Need immediate calendar confirmation or technical scoping?
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link
                  href="/talk-to-ai-architect#session-booking-section"
                  className="button button-primary button-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textDecoration: 'none', padding: '10px 14px', background: '#1d5cff', color: '#ffffff', borderRadius: '8px', fontWeight: 600, fontSize: '13px' }}
                >
                  <Calendar size={15} />
                  <span>Book on Google Calendar</span>
                  <ArrowUpRight size={14} />
                </Link>
                <WhatsAppCTA inline label="Instant WhatsApp Consultation" />
              </div>
            </div>
          </div>

          {/* RIGHT: STANDARDIZED DIAGNOSTIC / STRATEGY SESSION FORM (IMMEDIATELY VISIBLE ABOVE THE FOLD) */}
          <div className="diagnostic-form-col">
            {isStrategySession ? (
              <SessionBookingForm
                initialArea={initialSolution}
                ctaSource="book_diagnostic_strategy_session"
              />
            ) : (
              <TrustGridForm
                variant="diagnostic"
                formId="form_ai_diagnostic"
                formName="AI Diagnostic Form"
                defaultSolution={initialSolution}
                defaultIndustry={initialIndustry}
                ctaSource="book_diagnostic_page"
              />
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: DIAGNOSTIC JOURNEY SLIDER & METHODOLOGY */}
      <section className="section" style={{ paddingTop: '40px', paddingBottom: '60px', borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}>
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">DIAGNOSTIC METHODOLOGY</span>
            <p className="section-label">4-Stage Systematic Evaluation Process</p>
          </div>
          <span className="section-index">ROADMAP</span>
        </div>

        <div style={{ marginTop: '20px' }}>
          <DiagnosticJourneySlider />
        </div>
      </section>
    </>
  )
}

export default function BookDiagnosticPage() {
  return (
    <main className="page-wrapper">
      <SiteHeader />
      <Suspense fallback={<div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>Loading diagnostic intake...</div>}>
        <DiagnosticContent />
      </Suspense>
      <SiteFooter />
    </main>
  )
}

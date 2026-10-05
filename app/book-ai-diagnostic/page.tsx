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
import { WhatsAppCTA } from '@/components/ui/whatsapp-cta'
import { DiagnosticJourneySlider } from '@/components/ui/diagnostic-journey-slider'
import { PageBannerHero } from '@/components/ui/page-banner-hero'

function DiagnosticContent() {
  const searchParams = useSearchParams()
  const isStrategySession = searchParams.get('type') === 'strategy-session'
  const initialSolution = searchParams.get('solution') || ''
  const initialIndustry = searchParams.get('industry') || ''

  return (
    <>
      {/* STANDARD PAGE BANNER HERO */}
      <PageBannerHero
        badge={isStrategySession ? "STRATEGY SESSION" : "EXECUTIVE DIAGNOSTIC"}
        badgeTag={isStrategySession ? "45-MIN EXECUTIVE SCOPING" : "SYSTEMS & TCO AUDIT"}
        title={isStrategySession ? "Book Your Executive AI Strategy Session with" : "Find the Fastest Path from AI Ambition to"}
        titleHighlight={isStrategySession ? "Principal Systems Architects" : "Operational Production Value"}
        description={isStrategySession
          ? "Schedule a dedicated 45-minute architectural & strategic briefing with TRUSTGRID.AI principal systems engineers. We evaluate your compute economics, multi-agent readiness, lossless networking, and quantum security to outline a tangible roadmap."
          : "Start with a structured, executive-level technical diagnostic. We evaluate your compute economics, multi-agent readiness, lossless networking, and quantum security to build a sequenced execution roadmap."}
        thesisHighlight="Principal Systems Engineering • Quantifiable TCO Modeling • 90-Day Production Roadmap"
        image="/images/offering-agentic.jpg"
        primaryCta={{
          label: isStrategySession ? "Book Strategy Session" : "Start Diagnostic Form",
          href: "#diagnostic-form-section"
        }}
        secondaryCta={{
          label: "Explore Methodology",
          href: "/methodology-engine"
        }}
        quickNavItems={[
          { label: isStrategySession ? "1. Strategy Session Form" : "1. Diagnostic Form", href: "#diagnostic-form-section" },
          { label: "2. Methodology", href: "/methodology-engine" },
          { label: "3. Enterprise Solutions", href: "/offerings" },
          { label: "4. Direct Contact", href: "/contact" }
        ]}
        metrics={{
          statValue: isStrategySession ? "45-Min" : "90-Day",
          statLabel: isStrategySession ? "Architect Briefing" : "Production Roadmap",
          icon: ShieldCheck,
          features: [
            "Deep Systems Engineering Audit",
            "TCO & Token Cost Economics",
            "Post-Quantum Security Baseline"
          ]
        }}
      />

      <div className="diagnostic-container" id="diagnostic-form-section" style={{ paddingTop: '40px' }}>
        {/* DIAGNOSTIC JOURNEY SLIDER */}
        <div style={{ marginBottom: '40px' }}>
          <DiagnosticJourneySlider />
        </div>

        {/* DIRECT GOOGLE CALENDAR BOOKING BANNER FOR STRATEGY SESSION */}
        {isStrategySession && (
          <div
            style={{
              marginBottom: '32px',
              padding: '24px 28px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
              color: '#ffffff',
              border: '1px solid rgba(59, 130, 246, 0.4)',
              boxShadow: '0 10px 25px rgba(29, 92, 255, 0.15)',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px'
            }}
          >
            <div style={{ maxWidth: '650px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(59, 130, 246, 0.2)', border: '1px solid rgba(59, 130, 246, 0.4)', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                <Calendar size={13} />
                <span>Live Google Calendar Scheduling</span>
              </div>
              <h3 style={{ margin: '0 0 6px', fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>
                Instant Executive Strategy Session Booking
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#cbd5e1', lineHeight: 1.5 }}>
                Reserve a confirmed 45-minute architectural slot directly on our live calendar with TRUSTGRID.AI principal systems engineers, or submit the form below to receive a custom briefing invitation.
              </p>
            </div>
            <a
              href="https://calendar.app.google/voXXRkbgVuuft3fz6"
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#1d5cff',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '14px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(29, 92, 255, 0.4)',
                whiteSpace: 'nowrap'
              }}
            >
              <Calendar size={18} />
              <span>Schedule on Google Calendar</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        )}

        <div className="diagnostic-grid-layout">
          {/* LEFT: INTRO & VALUE POINTS */}
          <div className="diagnostic-intro-col">
            <div className="diagnostic-badge-wrap">
              <span className="section-label" style={{ color: '#1d5cff' }}>
                TRUSTGRID.AI / {isStrategySession ? 'STRATEGY SESSION' : 'EXECUTIVE DIAGNOSTIC'}
              </span>
              <h2>
                {isStrategySession ? (
                  <>Schedule an Executive <span>AI Strategy Session.</span></>
                ) : (
                  <>Find the fastest path from AI ambition to <span>operational value.</span></>
                )}
              </h2>
              <p className="diagnostic-hero-lead">
                {isStrategySession
                  ? "Engage directly with senior infrastructure and multi-agent architects. In 45 minutes, we examine your deployment bottlenecks, GPU cluster topology, security boundaries, and deliver an actionable execution path."
                  : "Start with a structured, executive-level technical diagnostic. We evaluate your compute economics, multi-agent readiness, governance posture, and quantum security to build a sequenced execution roadmap."}
              </p>
            </div>

            <div className="diagnostic-value-points">
              <div className="value-point">
                <div className="value-point-icon">
                  <Check size={16} />
                </div>
                <div>
                  <strong>Deep Systems Engineering</strong>
                  <p>Direct engagement with senior AI infrastructure and multi-agent architects.</p>
                </div>
              </div>
              <div className="value-point">
                <div className="value-point-icon">
                  <Check size={16} />
                </div>
                <div>
                  <strong>Rigorous Financial & Technical Audit</strong>
                  <p>Quantifiable cost-per-token profiling, bottleneck diagnosis, and TCO modeling.</p>
                </div>
              </div>
              <div className="value-point">
                <div className="value-point-icon">
                  <Check size={16} />
                </div>
                <div>
                  <strong>90-Day Execution Roadmap</strong>
                  <p>Prioritized milestones with clear ownership, risk boundaries, and ROI targets.</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', padding: '18px 20px', background: '#ffffff', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#1d5cff', letterSpacing: '0.05em' }}>
                DIRECT CALENDAR &amp; CHANNELS
              </span>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '6px 0 14px' }}>
                Need immediate calendar confirmation or technical scoping?
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a
                  href="https://calendar.app.google/voXXRkbgVuuft3fz6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-primary button-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textDecoration: 'none', padding: '10px 14px', background: '#1d5cff', color: '#ffffff', borderRadius: '8px', fontWeight: 600, fontSize: '13px' }}
                >
                  <Calendar size={15} />
                  <span>Open Google Calendar Schedule</span>
                  <ArrowUpRight size={14} />
                </a>
                <WhatsAppCTA inline label="Instant WhatsApp Consultation" />
              </div>
            </div>
          </div>

          {/* RIGHT: STANDARDIZED DIAGNOSTIC / STRATEGY SESSION FORM */}
          <div className="diagnostic-form-col">
            <TrustGridForm
              variant={isStrategySession ? 'strategy_session' : 'diagnostic'}
              formId={isStrategySession ? 'form_strategy_session' : 'form_ai_diagnostic'}
              formName={isStrategySession ? 'Strategy Session Booking Form' : 'AI Diagnostic Form'}
              defaultSolution={initialSolution}
              defaultIndustry={initialIndustry}
              ctaSource={isStrategySession ? 'strategy_session_page' : 'book_diagnostic_page'}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default function BookDiagnosticPage() {
  return (
    <main className="page-wrapper">
      <SiteHeader />
      <Suspense
        fallback={
          <div className="loading-state" style={{ padding: '80px', textAlign: 'center' }}>
            <p>Loading AI Diagnostic Portal...</p>
          </div>
        }
      >
        <DiagnosticContent />
      </Suspense>
      <SiteFooter />
    </main>
  )
}


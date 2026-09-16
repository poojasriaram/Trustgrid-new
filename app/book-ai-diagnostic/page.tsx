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
  const initialSolution = searchParams.get('solution') || ''
  const initialIndustry = searchParams.get('industry') || ''

  return (
    <>
      {/* STANDARD PAGE BANNER HERO */}
      <PageBannerHero
        badge="EXECUTIVE DIAGNOSTIC"
        badgeTag="SYSTEMS & TCO AUDIT"
        title="Find the Fastest Path from AI Ambition to"
        titleHighlight="Operational Production Value"
        description="Start with a structured, executive-level technical diagnostic. We evaluate your compute economics, multi-agent readiness, lossless networking, and quantum security to build a sequenced execution roadmap."
        thesisHighlight="Principal Systems Engineering • Quantifiable TCO Modeling • 90-Day Production Roadmap"
        image="/images/offering-agentic.jpg"
        primaryCta={{
          label: "Start Diagnostic Form",
          href: "#diagnostic-form-section"
        }}
        secondaryCta={{
          label: "Explore Methodology",
          href: "/methodology-engine"
        }}
        quickNavItems={[
          { label: "1. Diagnostic Form", href: "#diagnostic-form-section" },
          { label: "2. Methodology", href: "/methodology-engine" },
          { label: "3. Enterprise Solutions", href: "/offerings" },
          { label: "4. Direct Contact", href: "/contact" }
        ]}
        metrics={{
          statValue: "90-Day",
          statLabel: "Production Roadmap",
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

        <div className="diagnostic-grid-layout">
          {/* LEFT: INTRO & VALUE POINTS */}
          <div className="diagnostic-intro-col">
            <div className="diagnostic-badge-wrap">
              <span className="section-label" style={{ color: '#1d5cff' }}>
                TRUSTGRID.AI / EXECUTIVE DIAGNOSTIC
              </span>
              <h2>
                Find the fastest path from AI ambition to <span>operational value.</span>
              </h2>
              <p className="diagnostic-hero-lead">
                Start with a structured, executive-level technical diagnostic. We evaluate your compute economics, multi-agent readiness, governance posture, and quantum security to build a sequenced execution roadmap.
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
                DIRECT CHANNELS
              </span>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '6px 0 14px' }}>
                Need immediate technical scoping? Connect directly via WhatsApp:
              </p>
              <WhatsAppCTA inline label="Instant WhatsApp Consultation" />
            </div>
          </div>

          {/* RIGHT: STANDARDIZED DIAGNOSTIC FORM */}
          <div className="diagnostic-form-col">
            <TrustGridForm
              variant="diagnostic"
              formId="form_ai_diagnostic"
              formName="AI Diagnostic Form"
              defaultSolution={initialSolution}
              defaultIndustry={initialIndustry}
              ctaSource="book_diagnostic_page"
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


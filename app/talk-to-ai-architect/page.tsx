'use client'

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Bot,
  Network,
  Lock,
  ArrowUpRight,
  Sparkles,
  Users,
  Building2,
  Globe2
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SessionBookingForm, AREAS_OF_INTEREST } from '@/components/ui/session-booking-form'
import { PageBannerHero } from '@/components/ui/page-banner-hero'
import { WhatsAppCTA } from '@/components/ui/whatsapp-cta'

function TalkToArchitectContent() {
  const searchParams = useSearchParams()
  const topicParam = searchParams.get('topic') || searchParams.get('solution') || searchParams.get('area') || ''

  return (
    <>
      {/* STANDARD PAGE BANNER HERO */}
      <PageBannerHero
        badge="EXECUTIVE AI STRATEGY"
        badgeTag="45-MIN ARCHITECT SESSION"
        title="Book a Strategy Session with an"
        titleHighlight="AI Systems Architect"
        description="Schedule a dedicated 45-minute architectural & strategic briefing with TRUSTGRID.AI principal systems engineers. We evaluate your compute economics, multi-agent readiness, lossless networking, and quantum security to outline a tangible roadmap."
        thesisHighlight="Principal Systems Engineering • Quantifiable TCO Modeling • Real-Time Google Calendar Scheduling"
        image="/images/hero-ai-infra.jpg"
        primaryCta={{
          label: "Schedule on Live Calendar",
          href: "#session-booking-section"
        }}
        secondaryCta={{
          label: "General Enquiries",
          href: "/contact"
        }}
        quickNavItems={[
          { label: "1. Booking Form", href: "#session-booking-section" },
          { label: "2. Consultation Scope", href: "#consultation-scope" },
          { label: "3. Enterprise Solutions", href: "/#offerings" },
          { label: "4. Global Offices", href: "/about#presence" }
        ]}
        metrics={{
          statValue: "45-Min",
          statLabel: "Dedicated Briefing",
          icon: ShieldCheck,
          features: [
            "Hardware & GPU Topology Review",
            "Multi-Agent Workflow Scoping",
            "Direct Architect Consultation"
          ]
        }}
      />

      {/* MAIN BOOKING CONTENT */}
      <div className="diagnostic-container" id="session-booking-section" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
        <div className="diagnostic-grid-layout">
          {/* LEFT: VALUE POINTS & WHAT TO EXPECT */}
          <div className="diagnostic-intro-col">
            <div className="diagnostic-badge-wrap">
              <span className="section-label" style={{ color: '#1d5cff' }}>
                TRUSTGRID.AI / SESSION BOOKING
              </span>
              <h2>
                Direct access to <span>Principal AI Architects.</span>
              </h2>
              <p className="diagnostic-hero-lead">
                No sales fluff or high-level slide decks. You will meet directly with senior infrastructure and AI systems engineers who build and run high-density production clusters.
              </p>
            </div>

            {/* WHAT VISITOR CAN EXPECT */}
            <div className="diagnostic-value-points" id="consultation-scope">
              <div className="value-point">
                <div className="value-point-icon">
                  <Cpu size={16} />
                </div>
                <div>
                  <strong>Hardware &amp; Accelerator Topology Review</strong>
                  <p>In-depth audit of GPU cluster utilization, liquid cooling design, KV-cache serving, and token cost economics.</p>
                </div>
              </div>

              <div className="value-point">
                <div className="value-point-icon">
                  <Bot size={16} />
                </div>
                <div>
                  <strong>Agentic Architecture &amp; Multi-Agent DAGs</strong>
                  <p>Evaluation of agent fleet reliability, persistent memory fabrics, and Model Context Protocol (MCP) integrations.</p>
                </div>
              </div>

              <div className="value-point">
                <div className="value-point-icon">
                  <Network size={16} />
                </div>
                <div>
                  <strong>Lossless Networking &amp; Fabric Topology</strong>
                  <p>Tailored analysis of 400G/800G RoCEv2, InfiniBand topologies, Dragonfly+ rail optimization, and low-latency switching.</p>
                </div>
              </div>

              <div className="value-point">
                <div className="value-point-icon">
                  <Lock size={16} />
                </div>
                <div>
                  <strong>Security, Sovereign Governance &amp; PQC</strong>
                  <p>Post-quantum cryptographic baselines, air-gapped compliance, and deterministic guardrail architectures.</p>
                </div>
              </div>
            </div>

            {/* DIRECT CHANNELS CARD */}
            <div style={{ marginTop: '24px', padding: '20px', background: '#ffffff', borderRadius: '14px', border: '1px solid var(--border)', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#1d5cff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                DIRECT ADVISORY CHANNELS
              </span>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '6px 0 14px', lineHeight: 1.4 }}>
                Need urgent technical scoping or have questions before booking? Reach our team directly.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <WhatsAppCTA inline label="Instant WhatsApp Consultation" />
                <Link
                  href="/contact"
                  className="button button-ghost button-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textDecoration: 'none', padding: '9px 14px', fontSize: '13px' }}
                >
                  <span>General Contact Form</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT: SINGLE-COLUMN SESSION BOOKING FORM */}
          <div className="diagnostic-form-col">
            <SessionBookingForm
              initialArea={topicParam}
              ctaSource="talk_to_architect_page"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default function TalkToAiArchitectPage() {
  return (
    <main className="page-wrapper">
      <SiteHeader />
      <Suspense
        fallback={
          <div className="loading-state" style={{ padding: '80px', textAlign: 'center' }}>
            <p>Loading AI Architect Consultation Portal...</p>
          </div>
        }
      >
        <TalkToArchitectContent />
      </Suspense>
      <SiteFooter />
    </main>
  )
}

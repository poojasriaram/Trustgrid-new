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
  Globe2,
  Check
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SessionBookingForm, AREAS_OF_INTEREST, GOOGLE_CALENDAR_SCHEDULING_URL } from '@/components/ui/session-booking-form'
import { WhatsAppCTA } from '@/components/ui/whatsapp-cta'

function TalkToArchitectContent() {
  const searchParams = useSearchParams()
  const topicParam = searchParams.get('topic') || searchParams.get('solution') || searchParams.get('area') || ''

  return (
    <>
      {/* ABOVE-THE-FOLD DEDICATED CONSULTATION & STRATEGY SESSION SECTION */}
      <section className="section dedicated-form-hero-section" id="session-booking-section" style={{ paddingTop: '24px', paddingBottom: '50px' }}>
        <div className="diagnostic-grid-layout" style={{ alignItems: 'flex-start' }}>
          {/* LEFT COLUMN: ARCHITECT ENGAGEMENT OVERVIEW & SCOPE */}
          <div className="diagnostic-intro-col">
            <div className="diagnostic-badge-wrap">
              <span className="section-label" style={{ color: '#1d5cff', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={13} />
                <span>EXECUTIVE AI STRATEGY &bull; 45-MIN BRIEFING</span>
              </span>
              <h1 style={{ fontSize: 'clamp(28px, 3.8vw, 42px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.15, margin: '8px 0 14px' }}>
                Direct Consultation with <span style={{ color: '#1d5cff' }}>Principal AI Architects.</span>
              </h1>
              <p className="diagnostic-hero-lead" style={{ fontSize: '15px', color: '#475569', lineHeight: 1.55 }}>
                No sales fluff or high-level slide decks. Meet directly with senior infrastructure and AI systems engineers who build and run high-density production clusters and multi-agent fleets.
              </p>
            </div>

            {/* WHAT TO EXPECT VALUE POINTS */}
            <div className="diagnostic-value-points" id="consultation-scope" style={{ marginTop: '20px' }}>
              <div className="value-point">
                <div className="value-point-icon">
                  <Cpu size={16} />
                </div>
                <div>
                  <strong>Hardware &amp; Accelerator Topology Review</strong>
                  <p>Audit GPU cluster utilization, liquid cooling design, KV-cache serving, and token cost economics.</p>
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
                  <p>Analysis of 400G/800G RoCEv2, InfiniBand topologies, Dragonfly+ rail optimization, and low-latency switching.</p>
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

            {/* DIRECT CALENDAR & ADVISORY CHANNELS */}
            <div style={{ marginTop: '24px', padding: '18px 20px', background: '#ffffff', borderRadius: '14px', border: '1px solid var(--border)', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#1d5cff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  DIRECT GOOGLE CALENDAR OPTION
                </span>
                <span style={{ fontSize: '11px', background: '#eff6ff', color: '#1d5cff', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                  45-Min Duration
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 12px', lineHeight: 1.4 }}>
                Prefer to lock your calendar slot immediately on Google Calendar?
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a
                  href={GOOGLE_CALENDAR_SCHEDULING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-primary button-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textDecoration: 'none', padding: '10px 14px', background: '#1d5cff', color: '#ffffff', borderRadius: '8px', fontWeight: 600, fontSize: '13px' }}
                >
                  <Calendar size={15} />
                  <span>Lock 45-Min Slot on Google Calendar</span>
                  <ArrowUpRight size={14} />
                </a>
                <WhatsAppCTA inline label="Instant WhatsApp Scoping" />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: VERTICAL SESSION BOOKING FORM (IMMEDIATELY VISIBLE ABOVE THE FOLD) */}
          <div className="diagnostic-form-col">
            <SessionBookingForm
              initialArea={topicParam}
              ctaSource="talk_to_architect_page_primary"
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default function TalkToAiArchitectPage() {
  return (
    <main className="page-wrapper">
      <SiteHeader />
      <Suspense fallback={<div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>Loading consultation briefing...</div>}>
        <TalkToArchitectContent />
      </Suspense>
      <SiteFooter />
    </main>
  )
}

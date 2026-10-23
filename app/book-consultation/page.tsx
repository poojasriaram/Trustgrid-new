'use client'

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  Calendar as CalendarIcon,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  Sparkles,
  Building2,
  Globe2,
  Check,
  Phone,
  Mail,
  Zap,
  Cpu
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SessionBookingForm, GOOGLE_CALENDAR_SCHEDULING_URL } from '@/components/ui/session-booking-form'
import { WhatsAppCTA } from '@/components/ui/whatsapp-cta'

function BookConsultationContent() {
  const searchParams = useSearchParams()
  const topicParam = searchParams.get('topic') || searchParams.get('interest') || searchParams.get('solution') || searchParams.get('area') || ''

  return (
    <section className="section dedicated-form-hero-section" id="booking-consultation-section" style={{ paddingTop: '24px', paddingBottom: '50px' }}>
      <div className="diagnostic-grid-layout" style={{ alignItems: 'flex-start' }}>
        {/* LEFT COLUMN: CONSULTATION & BOOKING BRIEFING */}
        <div className="diagnostic-intro-col">
          <div className="diagnostic-badge-wrap">
            <span className="section-label" style={{ color: '#1d5cff', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={13} />
              <span>DIRECT EXECUTIVE CONSULTATION &amp; BOOKINGS</span>
            </span>
            <h1 style={{ fontSize: 'clamp(28px, 3.8vw, 42px)', fontWeight: 800, color: '#09142e', lineHeight: 1.15, margin: '8px 0 14px' }}>
              Schedule an Enterprise <span style={{ color: '#1d5cff' }}>AI Consultation.</span>
            </h1>
            <p className="diagnostic-hero-lead" style={{ fontSize: '15px', color: '#334155', lineHeight: 1.55 }}>
              Connect directly with TRUSTGRID.AI principal systems engineers and infrastructure architects. In a focused 45-minute technical briefing, we evaluate your compute topology, token scaling economics, multi-agent frameworks, and sovereign compliance roadmap.
            </p>
          </div>

          <div className="diagnostic-value-points" style={{ marginTop: '20px' }}>
            <div className="value-point">
              <div className="value-point-icon">
                <Cpu size={16} />
              </div>
              <div>
                <strong style={{ color: '#09142e' }}>Deterministic Architecture Review</strong>
                <p style={{ color: '#475569' }}>GPU topologies, cluster tuning, liquid cooling &amp; 800G RoCEv2 fabric design.</p>
              </div>
            </div>

            <div className="value-point">
              <div className="value-point-icon">
                <Zap size={16} />
              </div>
              <div>
                <strong style={{ color: '#09142e' }}>Agentic DAG &amp; Memory Evaluation</strong>
                <p style={{ color: '#475569' }}>Multi-agent swarm orchestration, deterministic reasoning, and persistent memory.</p>
              </div>
            </div>

            <div className="value-point">
              <div className="value-point-icon">
                <ShieldCheck size={16} />
              </div>
              <div>
                <strong style={{ color: '#09142e' }}>Enterprise Confidentiality</strong>
                <p style={{ color: '#475569' }}>All architectural discussions and technical scopes are strictly protected under mutual NDA.</p>
              </div>
            </div>
          </div>

          {/* CALENDAR & WHATSAPP CHANNELS */}
          <div style={{ marginTop: '24px', padding: '18px 20px', background: '#ffffff', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#1d5cff', letterSpacing: '0.05em' }}>
                DIRECT CALENDAR &amp; ADVISORY ACCESS
              </span>
              <span style={{ fontSize: '11px', background: '#eff6ff', color: '#1d5cff', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                45-Min Duration
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#334155', margin: '0 0 12px', lineHeight: 1.45 }}>
              Prefer to lock your calendar slot immediately on Google Calendar or connect via WhatsApp?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href={GOOGLE_CALENDAR_SCHEDULING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-primary button-sm"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textDecoration: 'none', padding: '10px 14px', background: '#1d5cff', color: '#ffffff', borderRadius: '8px', fontWeight: 600, fontSize: '13px' }}
              >
                <CalendarIcon size={15} />
                <span>Lock 45-Min Slot on Google Calendar</span>
                <ArrowUpRight size={14} />
              </a>
              <WhatsAppCTA inline label="Instant WhatsApp Consultation" />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SINGLE UNIFIED CONSULTATION & BOOKING FORM */}
        <div className="diagnostic-form-col">
          <SessionBookingForm
            title="Book an Enterprise AI Consultation"
            subtitle="Schedule a dedicated 45-minute technical & strategic session with principal AI architects. Select your target focus areas and lock your Google Calendar slot."
            badge="CENTRALIZED BOOKING SYSTEM"
            initialArea={topicParam}
            ctaSource="book_consultation_page"
          />
        </div>
      </div>
    </section>
  )
}

export default function BookConsultationPage() {
  return (
    <main className="page-wrapper">
      <SiteHeader />
      <Suspense fallback={<div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>Loading consultation scheduler...</div>}>
        <BookConsultationContent />
      </Suspense>
      <SiteFooter />
    </main>
  )
}

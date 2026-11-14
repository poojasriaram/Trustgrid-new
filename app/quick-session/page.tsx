import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { QuickSessionRequestForm } from '@/components/ui/quick-session-request-form'
import { Zap, Clock, ShieldCheck, Cpu, ArrowUpRight, CheckCircle2, MessageSquare } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Quick Session Request | 30-Second Fast Track | TRUSTGRID.AI',
  description:
    'Request a high-velocity 45-minute technical briefing with TRUSTGRID.AI principal AI architects. Fast-track callback within 2 hours for GPU optimization, agentic workflows, and network fabrics.',
  openGraph: {
    title: 'Quick Session Request | TRUSTGRID.AI',
    description:
      'Fast-track your enterprise AI engineering consultation in 30 seconds.',
    url: 'https://trustgrid.ai/quick-session'
  }
}

function QuickSessionPageContent() {
  return (
    <section className="section dedicated-form-hero-section" style={{ paddingTop: '28px', paddingBottom: '60px' }}>
      <div className="diagnostic-grid-layout" style={{ alignItems: 'flex-start' }}>
        {/* LEFT COLUMN: FAST-TRACK OVERVIEW & VALUE */}
        <div className="diagnostic-intro-col">
          <div className="diagnostic-badge-wrap">
            <span className="section-label" style={{ color: '#1d5cff', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={13} />
              <span>30-SECOND FAST-TRACK &bull; PRIORITY CALLBACK</span>
            </span>
            <h1 style={{ fontSize: 'clamp(28px, 3.8vw, 42px)', fontWeight: 800, color: '#09142e', lineHeight: 1.15, margin: '8px 0 14px' }}>
              Fast-Track Your <span style={{ color: '#1d5cff' }}>AI Systems Session.</span>
            </h1>
            <p className="diagnostic-hero-lead" style={{ fontSize: '15px', color: '#334155', lineHeight: 1.55 }}>
              Skip complex discovery cycles. Request an immediate technical consultation with our systems leads. Whether you need 20% GPU optimization, multi-agent fleet deployment, or 800G fabric architecture, we connect with you within 2 hours.
            </p>
          </div>

          <div className="diagnostic-value-points" style={{ marginTop: '24px' }}>
            <div className="value-point">
              <div className="value-point-icon">
                <Clock size={16} />
              </div>
              <div>
                <strong style={{ color: '#09142e' }}>&lt; 2-Hour Response SLA</strong>
                <p style={{ color: '#475569' }}>Requests are routed directly to on-call principal architects, not sales intermediaries.</p>
              </div>
            </div>

            <div className="value-point">
              <div className="value-point-icon">
                <Cpu size={16} />
              </div>
              <div>
                <strong style={{ color: '#09142e' }}>Actionable Technical Briefing</strong>
                <p style={{ color: '#475569' }}>Specific topology calculations, token economics models, and workload sizing.</p>
              </div>
            </div>

            <div className="value-point">
              <div className="value-point-icon">
                <ShieldCheck size={16} />
              </div>
              <div>
                <strong style={{ color: '#09142e' }}>Zero Sales Fluff &bull; Full Mutual NDA</strong>
                <p style={{ color: '#475569' }}>Enterprise-grade confidentiality guarantee for all architecture scopes.</p>
              </div>
            </div>
          </div>

          {/* ALTERNATIVE CHANNELS */}
          <div style={{ marginTop: '24px', padding: '18px 20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>
              ALTERNATE ACCESS CHANNELS
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link
                href="/chat"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  color: '#09142e',
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                <span>🤖 Chat with AI Architect Desk</span>
                <ArrowUpRight size={14} color="#1d5cff" />
              </Link>
              <Link
                href="/whatsapp"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  color: '#16a34a',
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                <span>💬 WhatsApp Desk (+91 95130 88612)</span>
                <MessageSquare size={14} color="#16a34a" />
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: QUICK SESSION REQUEST FORM */}
        <div className="diagnostic-form-col">
          <QuickSessionRequestForm sourceChannel="quick_session_dedicated_page" />
        </div>
      </div>
    </section>
  )
}

export default function QuickSessionPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="main-content">
        <Suspense fallback={<div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>Loading Quick Session portal...</div>}>
          <QuickSessionPageContent />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}


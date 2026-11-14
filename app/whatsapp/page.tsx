'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MessageSquare, Phone, ArrowUpRight, CheckCircle2, ShieldCheck, Clock, ExternalLink, QrCode } from 'lucide-react'
import { trackWhatsAppClick } from '@/lib/analytics'

const WHATSAPP_PHONE = '919513088612'

function WhatsAppRedirectContent() {
  const searchParams = useSearchParams()
  const source = searchParams.get('source') || searchParams.get('utm_source') || 'dedicated_whatsapp_url'
  const campaign = searchParams.get('campaign') || searchParams.get('utm_campaign') || 'direct'
  const topic = searchParams.get('topic') || ''
  const customText = searchParams.get('text') || searchParams.get('message') || ''

  const defaultMessage = topic
    ? `Hi TRUSTGRID.AI team, I would like to consult with an AI architect regarding ${topic}. (Ref: ${source})`
    : `Hi TRUSTGRID.AI team, I would like to schedule an enterprise AI engineering consultation. (Ref: ${source})`

  const finalMessage = customText || defaultMessage
  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(finalMessage)}`

  const [redirected, setRedirected] = useState(false)
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    // 1. Track WhatsApp interaction event
    trackWhatsAppClick(source, 'dedicated_whatsapp_page', topic || campaign || 'direct')

    // 2. Automatically prompt redirect after 1.5 seconds if user desires
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [source, campaign, topic, finalMessage])

  const handleManualOpen = () => {
    setRedirected(true)
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div style={{ maxWidth: '680px', margin: '40px auto 60px', padding: '0 20px' }}>
      <div
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          padding: '40px 32px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.06)',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: '#25D366',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)'
          }}
        >
          <MessageSquare size={34} />
        </div>

        <span
          style={{
            display: 'inline-block',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#16a34a',
            background: '#f0fdf4',
            padding: '4px 10px',
            borderRadius: '12px',
            marginBottom: '10px'
          }}
        >
          DIRECT WHATSAPP DESK &bull; +91 95130 88612
        </span>

        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#09142e', margin: '0 0 10px' }}>
          Connect with TRUSTGRID.AI on WhatsApp
        </h1>

        <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, margin: '0 0 24px' }}>
          Direct channel to our principal systems engineers, GPU cluster architects, and enterprise advisory leads.
        </p>

        {/* PRE-FILLED MESSAGE BOX */}
        <div
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
            textAlign: 'left'
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
            Pre-configured message:
          </span>
          <p style={{ fontSize: '13px', color: '#0f172a', margin: 0, fontStyle: 'italic', lineHeight: 1.5 }}>
            &ldquo;{finalMessage}&rdquo;
          </p>
        </div>

        {/* LAUNCH BUTTON */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleManualOpen}
            className="button button-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '14px 24px',
              borderRadius: '12px',
              background: '#25D366',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)'
            }}
          >
            <MessageSquare size={20} />
            <span>Open WhatsApp Chat Now</span>
            <ExternalLink size={16} />
          </a>

          {countdown > 0 && !redirected && (
            <span style={{ fontSize: '12px', color: '#64748b' }}>
              Auto-ready in {countdown}s &bull; Click above to launch immediately
            </span>
          )}
        </div>

        {/* CHANNEL DETAILS & ALTERNATIVE ACCESS */}
        <div
          style={{
            paddingTop: '20px',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', fontSize: '12px', color: '#64748b' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={13} color="#16a34a" /> Instant Reply
            </span>
            <span>&bull;</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={13} color="#1d5cff" /> NDA Guaranteed
            </span>
            <span>&bull;</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Phone size={13} /> +91 95130 88612
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '6px' }}>
            <Link
              href="/booking"
              style={{ fontSize: '12px', color: '#1d5cff', textDecoration: 'none', fontWeight: 600 }}
            >
              📅 Schedule 45-Min Video Session
            </Link>
            <span style={{ color: '#cbd5e1' }}>|</span>
            <Link
              href="/chat"
              style={{ fontSize: '12px', color: '#1d5cff', textDecoration: 'none', fontWeight: 600 }}
            >
              🤖 Open AI Architect Desk
            </Link>
            <span style={{ color: '#cbd5e1' }}>|</span>
            <Link
              href="/quick-session"
              style={{ fontSize: '12px', color: '#1d5cff', textDecoration: 'none', fontWeight: 600 }}
            >
              ⚡ 30-Sec Quick Request
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WhatsAppPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="main-content" style={{ minHeight: '80vh', background: 'linear-gradient(180deg, #f8fafc 0%, #edf2f7 100%)' }}>
        <Suspense fallback={<div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>Connecting to WhatsApp Gateway...</div>}>
          <WhatsAppRedirectContent />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}


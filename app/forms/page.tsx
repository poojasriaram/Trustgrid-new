'use client'

import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import {
  FileText,
  Calendar,
  MessageSquare,
  Zap,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Check,
  Copy,
  ExternalLink,
  Share2,
  Cpu,
  Layers,
  Link2,
  Mail
} from 'lucide-react'

const FORMS_DIRECTORY = [
  {
    id: 'quick-session',
    title: '30-Second Quick Session Request Form',
    url: '/quick-session',
    badge: 'HIGH CONVERSION &bull; 30 SECONDS',
    description: 'Minimalist fast-track form for C-suite and engineers. Requires only Name, Work Email, Phone/WhatsApp, Company, and Focus Topic. Triggers prioritized architect response within 2 hours.',
    bestFor: 'LinkedIn Post CTAs, YouTube Video Descriptions, Short Form Content',
    icon: Zap,
    color: '#1d5cff'
  },
  {
    id: 'booking',
    title: 'Executive AI Consultation & Session Booking',
    url: '/booking',
    badge: '45-MIN TECHNICAL BRIEFING',
    description: 'Comprehensive appointment scheduler with direct Google Calendar lock, time slot picker, timezone selection, and deep technical scope intake.',
    bestFor: 'Direct InMail Outreach, High-Intent Website Visitors, Newsletter Top Links',
    icon: Calendar,
    color: '#0d47e5'
  },
  {
    id: 'chat',
    title: 'AI Architect Chatbot Desk',
    url: '/chat',
    badge: 'AUTONOMOUS ADVISORY &bull; 24/7 ACCESS',
    description: 'Full-page dedicated AI systems engineering assistant capable of evaluating GPU cluster economics, agentic swarms, RoCEv2 fabrics, and quantum-safe defense.',
    bestFor: 'Interactive Demos, Technical Product Posts, YouTube Pinned Comments',
    icon: MessageSquare,
    color: '#6366f1'
  },
  {
    id: 'ai-diagnostic',
    title: 'Executive AI Diagnostic & Architecture Scorecard',
    url: '/ai-diagnostic',
    badge: 'SELF-SERVICE BENCHMARK',
    description: 'Multi-step diagnostic evaluation providing an instant maturity rating and architecture gap analysis across compute, model serving, networking, and governance.',
    bestFor: 'Educational Content, Thought Leadership Articles, Whitepapers',
    icon: Layers,
    color: '#0284c7'
  },
  {
    id: 'request-proposal',
    title: 'Turnkey DBOT AI Factory RFP & Proposal Request',
    url: '/request-proposal',
    badge: 'ENTERPRISE RFP &bull; FORMAL SCOPING',
    description: 'Formal proposal intake for enterprise Design-Build-Operate-Transfer (DBOT) AI factories, GPU cluster buildouts, and multi-agent infrastructure.',
    bestFor: 'Procurement Teams, Enterprise RFP Submissions, Corporate Partners',
    icon: FileText,
    color: '#0f766e'
  },
  {
    id: 'whatsapp',
    title: 'Direct WhatsApp Engineering Advisory Desk',
    url: '/whatsapp',
    badge: 'INSTANT MESSAGING &bull; SLA &lt; 15 MIN',
    description: 'Direct WhatsApp gateway connecting executives and engineers to our on-call systems leads with customized pre-filled technical messages.',
    bestFor: 'Mobile Social Traffic, Email Signatures, Urgent Engineering Advisory',
    icon: MessageSquare,
    color: '#16a34a'
  },
  {
    id: 'contact',
    title: 'General Enterprise Contact & Global Offices',
    url: '/contact',
    badge: 'GLOBAL HEADQUARTERS &amp; DIRECT DIALS',
    description: 'Direct contact coordinates for Silicon Valley (California), New York, Toronto, Sydney, Tokyo, Singapore, and India offices.',
    bestFor: 'Press, General Inquiries, Vendor Relations, Executive Dial-ins',
    icon: Sparkles,
    color: '#475569'
  }
]

const CAMPAIGN_PRESETS = [
  { label: 'LinkedIn Post', source: 'linkedin', medium: 'post' },
  { label: 'LinkedIn Bio / Featured', source: 'linkedin', medium: 'profile_link' },
  { label: 'YouTube Video Description', source: 'youtube', medium: 'description' },
  { label: 'YouTube Pinned Comment', source: 'youtube', medium: 'pinned_comment' },
  { label: 'Email Signature', source: 'email', medium: 'signature' },
  { label: 'Email Newsletter', source: 'newsletter', medium: 'email' },
  { label: 'WhatsApp Broadcast', source: 'whatsapp', medium: 'broadcast' }
]

function FormsDirectoryContent() {
  const [selectedDest, setSelectedDest] = useState('/quick-session')
  const [selectedChannel, setSelectedChannel] = useState(CAMPAIGN_PRESETS[0])
  const [campaignName, setCampaignName] = useState('gpu_optimization_20pct')
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://trustgrid.ai'
  const generatedUrl = `${baseUrl}${selectedDest}?utm_source=${selectedChannel.source}&utm_medium=${selectedChannel.medium}&utm_campaign=${encodeURIComponent(campaignName || 'campaign')}`

  const copyToClipboard = (url: string, id: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedUrl(id)
        setTimeout(() => setCopiedUrl(null), 2500)
      })
    }
  }

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 20px 70px' }}>
      {/* PAGE HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#1d5cff',
            background: '#eff6ff',
            padding: '4px 12px',
            borderRadius: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Sparkles size={12} />
          CENTRAL FORMS &bull; BOOKINGS &bull; CHATBOT DIRECTORY
        </span>
        <h1
          style={{
            fontSize: 'clamp(28px, 3.8vw, 44px)',
            fontWeight: 800,
            color: '#09142e',
            margin: '10px 0 8px',
            lineHeight: 1.15
          }}
        >
          Public Access Portals &amp; <span style={{ color: '#1d5cff' }}>Dedicated Entry Points</span>
        </h1>
        <p style={{ fontSize: '15.5px', color: '#475569', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
          Direct, tracked URLs for our AI Architect Chatbot, Booking Calendars, Quick Session Requests, and Enterprise Diagnostics — optimized for LinkedIn, YouTube, email campaigns, and marketing distribution.
        </p>
      </div>

      {/* CAMPAIGN TRACKING & URL BUILDER UTILITY */}
      <div
        style={{
          background: 'linear-gradient(135deg, #09142e 0%, #0f2452 100%)',
          borderRadius: '16px',
          padding: '28px 30px',
          color: '#ffffff',
          marginBottom: '40px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 15px 35px rgba(9, 20, 46, 0.25)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <Link2 size={18} color="#60a5fa" />
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
            Marketing Campaign Link Builder &amp; UTM Tracker
          </h2>
        </div>
        <p style={{ fontSize: '13px', color: '#cbd5e1', margin: '0 0 20px', lineHeight: 1.5 }}>
          Generate UTM-tagged URLs for your LinkedIn posts, YouTube video descriptions, newsletters, and email signatures. Every click and submission will be tracked directly in the TRUSTGRID 95-column telemetry engine.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '18px' }}>
          {/* DESTINATION */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#93c5fd', marginBottom: '6px' }}>
              Target Destination URL
            </label>
            <select
              value={selectedDest}
              onChange={(e) => setSelectedDest(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                fontSize: '13px',
                outline: 'none'
              }}
            >
              <option value="/quick-session" style={{ color: '#000' }}>⚡ Quick Session Request (/quick-session)</option>
              <option value="/booking" style={{ color: '#000' }}>📅 Booking Sessions (/booking)</option>
              <option value="/chat" style={{ color: '#000' }}>🤖 AI Architect Chatbot (/chat)</option>
              <option value="/whatsapp" style={{ color: '#000' }}>💬 WhatsApp Direct (/whatsapp)</option>
              <option value="/forms" style={{ color: '#000' }}>📁 Central Forms Directory (/forms)</option>
              <option value="/ai-diagnostic" style={{ color: '#000' }}>📊 AI Readiness Diagnostic (/ai-diagnostic)</option>
              <option value="/request-proposal" style={{ color: '#000' }}>📄 Turnkey Proposal (/request-proposal)</option>
            </select>
          </div>

          {/* CHANNEL PRESET */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#93c5fd', marginBottom: '6px' }}>
              Marketing Channel Preset
            </label>
            <select
              value={selectedChannel.label}
              onChange={(e) => {
                const found = CAMPAIGN_PRESETS.find(p => p.label === e.target.value)
                if (found) setSelectedChannel(found)
              }}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                fontSize: '13px',
                outline: 'none'
              }}
            >
              {CAMPAIGN_PRESETS.map((p) => (
                <option key={p.label} value={p.label} style={{ color: '#000' }}>
                  {p.label} ({p.source} / {p.medium})
                </option>
              ))}
            </select>
          </div>

          {/* CAMPAIGN NAME */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#93c5fd', marginBottom: '6px' }}>
              Campaign Identifier (slug)
            </label>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '_'))}
              placeholder="e.g. gpu_optimization_20pct"
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* OUTPUT LINK */}
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap'
          }}
        >
          <code style={{ fontSize: '13px', color: '#67e8f9', wordBreak: 'break-all', fontFamily: 'monospace' }}>
            {generatedUrl}
          </code>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => copyToClipboard(generatedUrl, 'generator')}
              style={{
                background: copiedUrl === 'generator' ? '#22c55e' : '#1d5cff',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {copiedUrl === 'generator' ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedUrl === 'generator' ? 'Copied Tracked Link!' : 'Copy Tracked URL'}</span>
            </button>

            <a
              href={generatedUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                borderRadius: '6px',
                padding: '8px 12px',
                fontSize: '12px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>Test</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* DIRECTORY CARDS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {FORMS_DIRECTORY.map((item) => {
          const IconComponent = item.icon
          const fullUrl = `${baseUrl}${item.url}`

          return (
            <div
              key={item.id}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '24px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: `${item.color}15`,
                      color: item.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <IconComponent size={22} />
                  </div>

                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      color: item.color,
                      background: `${item.color}12`,
                      padding: '3px 8px',
                      borderRadius: '6px'
                    }}
                    dangerouslySetInnerHTML={{ __html: item.badge }}
                  />
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#09142e', margin: '0 0 8px' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.55, margin: '0 0 14px' }}>
                  {item.description}
                </p>

                <div
                  style={{
                    background: '#f8fafc',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    marginBottom: '16px',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                    Recommended Marketing Channels:
                  </span>
                  <span style={{ fontSize: '12px', color: '#0f172a', fontWeight: 500 }}>
                    {item.bestFor}
                  </span>
                </div>
              </div>

              {/* CARD ACTIONS */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                <Link
                  href={item.url}
                  className="button button-primary"
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '9px 14px',
                    borderRadius: '8px',
                    background: item.color,
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Open URL</span>
                  <ArrowRight size={14} />
                </Link>

                <button
                  type="button"
                  onClick={() => copyToClipboard(fullUrl, item.id)}
                  title="Copy Direct URL"
                  style={{
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: copiedUrl === item.id ? '#f0fdf4' : '#ffffff',
                    color: copiedUrl === item.id ? '#16a34a' : '#475569',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    fontWeight: 600
                  }}
                >
                  {copiedUrl === item.id ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedUrl === item.id ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function FormsPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="main-content" style={{ minHeight: '85vh', background: 'linear-gradient(180deg, #f8fafc 0%, #edf2f7 100%)' }}>
        <Suspense fallback={<div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>Loading Central Forms Directory...</div>}>
          <FormsDirectoryContent />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}


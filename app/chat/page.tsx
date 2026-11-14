import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { DedicatedChatInterface } from '@/components/ui/dedicated-chat-interface'
import { Sparkles, Shield, Cpu, MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Architect Chatbot Desk | Dedicated Enterprise Engineering Assistant | TRUSTGRID.AI',
  description:
    'Directly engage with TRUSTGRID.AI Principal AI Architect. Explore GPU cluster optimization, multi-agent swarms, 800G lossless network fabrics, and quantum-safe cybersecurity architectures.',
  openGraph: {
    title: 'AI Architect Chatbot Desk | TRUSTGRID.AI',
    description:
      'Directly consult with the TRUSTGRID.AI autonomous systems architect for enterprise AI infrastructure and agentic deployments.',
    url: 'https://trustgrid.ai/chat'
  }
}

function ChatContent() {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 20px 40px' }}>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#1d5cff',
            background: '#eff6ff',
            padding: '4px 10px',
            borderRadius: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Sparkles size={12} />
          PUBLIC ACCESS &bull; PRINCIPAL ARCHITECT DESK
        </span>
        <h1
          style={{
            fontSize: 'clamp(24px, 3.2vw, 36px)',
            fontWeight: 800,
            color: '#09142e',
            margin: '8px 0 4px',
            lineHeight: 1.2
          }}
        >
          Enterprise AI Systems <span style={{ color: '#1d5cff' }}>Architecture Chat</span>
        </h1>
        <p style={{ fontSize: '14px', color: '#64748b', maxWidth: '640px', margin: '0 auto' }}>
          Real-time interactive advisory on GPU compute topologies, agentic DAGs, lossless networking fabrics, and quantum-safe defense.
        </p>
      </div>

      <DedicatedChatInterface sourceChannel="dedicated_chat_page" />
    </div>
  )
}

export default function ChatPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="main-content" style={{ minHeight: '85vh', background: 'linear-gradient(180deg, #f8fafc 0%, #edf2f7 100%)' }}>
        <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading AI Architect Desk...</div>}>
          <ChatContent />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}


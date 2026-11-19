import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { DedicatedChatInterface } from '@/components/ui/dedicated-chat-interface'
import { Sparkles, Bot, Calendar, MessageSquare } from 'lucide-react'

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

function StandaloneChatHeader() {
  return (
    <header className="h-16 border-b border-slate-200 bg-white/95 backdrop-blur px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-500/20">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-slate-900 text-sm md:text-base">
              TRUSTGRID.AI • Principal AI Architect Desk
            </h1>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
          </div>
          <p className="text-xs text-slate-500 hidden sm:block">
            Standalone Enterprise AI Systems Advisory • GPU Factories • Agentic Swarms • 800G Fabrics
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <Link
          href="/whatsapp"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition shadow-sm no-underline"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">WhatsApp Escalation</span>
        </Link>
        <Link
          href="/booking"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition shadow-sm no-underline"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Book Session</span>
        </Link>
      </div>
    </header>
  )
}

function ChatContent() {
  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '16px 20px 32px' }}>
      <div style={{ textAlign: 'center', marginBottom: '14px' }}>
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
          STANDALONE PORTAL &bull; PRINCIPAL ARCHITECT DESK
        </span>
      </div>

      <DedicatedChatInterface sourceChannel="dedicated_chat_page" />
    </div>
  )
}

export default function ChatPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #edf2f7 100%)' }}>
      <StandaloneChatHeader />
      <main className="flex-1">
        <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading AI Architect Desk...</div>}>
          <ChatContent />
        </Suspense>
      </main>
    </div>
  )
}

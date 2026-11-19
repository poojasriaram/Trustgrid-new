import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import { EnterpriseChatApp } from '@/src/components/chat/EnterpriseChatApp'

export const metadata: Metadata = {
  title: 'Aegis • AI Systems & Infrastructure Architect Desk | TRUSTGRID.AI',
  description:
    'Consult live with Aegis, TRUSTGRID.AI Principal AI Systems Architect. Multi-modal support for architecture screenshots (Ctrl+V WebP compression), technical RFP documents, WhatsApp-style voice notes, and persistent consultation history.',
  openGraph: {
    title: 'Aegis • AI Architect Chat Desk | TRUSTGRID.AI',
    description:
      'Enterprise AI consultation desk for 50–500MW GPU factories, PUE 1.15 liquid cooling, 800G RoCEv2 fabrics, and autonomous multi-agent swarms.',
    url: 'https://trustgrid.ai/chat'
  }
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full bg-slate-950 text-slate-400 flex items-center justify-center text-sm font-mono">
          Initializing Aegis • TRUSTGRID.AI Principal Systems Architect Desk...
        </div>
      }
    >
      <EnterpriseChatApp />
    </Suspense>
  )
}

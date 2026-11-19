'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { MessageSquare, ArrowRight, ShieldCheck, QrCode, ExternalLink } from 'lucide-react'
import { trackWhatsAppClick } from '@/lib/analytics'

const WHATSAPP_PHONE = '919513088612'

const PREFILLED_MESSAGES = [
  {
    id: 'general',
    label: 'General Enterprise AI Inquiry',
    text: 'Hi TRUSTGRID.AI, I would like to consult with a Principal AI Architect regarding our enterprise AI roadmap.'
  },
  {
    id: 'gpu-opt',
    label: '20% Assured GPU Cluster Optimization',
    text: 'Hi TRUSTGRID.AI, we want to evaluate 20% assured GPU cluster performance & compute utilization optimization.'
  },
  {
    id: 'agentic-swarms',
    label: 'Autonomous Multi-Agent Swarms & Factories',
    text: 'Hi TRUSTGRID.AI, I would like to discuss deploying autonomous multi-agent swarms and enterprise AgentOps.'
  },
  {
    id: 'networking-fabric',
    label: '400G / 800G Lossless AI Networking & RoCEv2',
    text: 'Hi TRUSTGRID.AI, we need architectural advisory on 400G/800G lossless RoCEv2 / InfiniBand AI data center fabrics.'
  },
  {
    id: 'quantum-security',
    label: 'Quantum-Safe Cybersecurity & AI Audit',
    text: 'Hi TRUSTGRID.AI, I want to book an enterprise AI infrastructure & quantum-safe cybersecurity readiness audit.'
  }
]

function WhatsAppStandaloneContent() {
  const searchParams = useSearchParams()
  const source = searchParams.get('source') || searchParams.get('utm_source') || 'direct'
  const campaign = searchParams.get('campaign') || searchParams.get('utm_campaign') || ''
  const customQueryText = searchParams.get('text') || searchParams.get('message') || ''

  const [selectedPreset, setSelectedPreset] = useState(PREFILLED_MESSAGES[0].text)
  const [customNote, setCustomNote] = useState(customQueryText)

  useEffect(() => {
    trackWhatsAppClick(source, 'dedicated_whatsapp_page', campaign || 'direct')
  }, [source, campaign])

  const baseMessage = customNote.trim() || selectedPreset
  const suffix = campaign ? ` [Campaign: ${campaign} | Source: ${source}]` : ''
  const finalMessage = `${baseMessage}${suffix}`
  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(finalMessage)}`
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(waUrl)}&color=0D5C91&bgcolor=FFFFFF`

  const handleLaunchWhatsApp = () => {
    trackWhatsAppClick(source, 'whatsapp_escalation_launch', campaign || 'direct')
    try {
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'WhatsApp Inquirer',
          email: 'whatsapp@visitor.trustgrid.ai',
          phone: '+91-WHATSAPP',
          company: 'WhatsApp Escalation Desk',
          service: 'WhatsApp Escalation',
          source: 'WhatsApp',
          message: finalMessage
        })
      }).catch(() => {})
    } catch {}
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center font-black text-white text-base">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="font-bold text-slate-100 text-sm tracking-wide">
            TRUSTGRID.AI • WhatsApp Engineering Hotline
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-400 hidden sm:inline">Direct Desk:</span>
          <a href="tel:+919513088612" className="text-emerald-400 font-semibold hover:underline no-underline">
            +91 95130 88612
          </a>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8 flex items-center justify-center">
        <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-5">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/80">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Principal Systems Desk Active
                </span>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  Connect Directly on WhatsApp
                </h1>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                  Chat with our principal AI infrastructure architects in real time. No forms, no wait time — immediate response from our global systems engineering desk.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300 block">
                  Select Pre-filled Message / Inquiry Type:
                </label>
                <div className="space-y-1.5">
                  {PREFILLED_MESSAGES.map((item) => {
                    const isSelected = selectedPreset === item.text && !customNote
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSelectedPreset(item.text)
                          setCustomNote('')
                        }}
                        className={`w-full text-left p-2.5 rounded-xl text-xs transition border cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="font-medium text-slate-200">{item.label}</div>
                        <div className="text-[11px] text-slate-400 truncate mt-0.5">
                          &ldquo;{item.text}&rdquo;
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300 block">
                  Or Customize Your Note:
                </label>
                <input
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Type custom note to send..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <button
                onClick={handleLaunchWhatsApp}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/25 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Open WhatsApp &amp; Start Chatting</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Enterprise Desk • +91 95130 88612 • Confidential B2B Session</span>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-3">
              <div className="p-3 bg-white rounded-2xl shadow-inner">
                <img
                  src={qrUrl}
                  alt="Scan WhatsApp QR Code"
                  width={180}
                  height={180}
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-200">
                  <QrCode className="w-4 h-4 text-emerald-400" />
                  <span>Scan with Your Phone Camera</span>
                </div>
                <p className="text-[11px] text-slate-400 max-w-[200px]">
                  Instantly opens WhatsApp on your mobile device with your pre-selected inquiry.
                </p>
              </div>
              <div className="pt-2 w-full border-t border-slate-800/80">
                <Link
                  href="/booking"
                  className="text-xs text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-medium no-underline"
                >
                  <span>Prefer a scheduled video meeting?</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function WhatsAppPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center text-sm">Connecting to WhatsApp Gateway...</div>}>
      <WhatsAppStandaloneContent />
    </Suspense>
  )
}

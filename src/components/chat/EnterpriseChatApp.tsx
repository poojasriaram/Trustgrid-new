'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  Cpu,
  Network,
  Bot,
  Zap,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  X,
  Loader2,
  Send
} from 'lucide-react'
import { AuthProvider, useAuth } from '@/src/contexts/AuthContext'
import { useChatHistory } from '@/src/hooks/useChatHistory'
import type { ChatActionPill } from '@/src/types/chat'
import { ChatSidebar } from './ChatSidebar'
import { ChatHeader } from './ChatHeader'
import { ChatMessageItem } from './ChatMessageItem'
import { ChatInputBar } from './ChatInputBar'
import { LightboxModal } from './LightboxModal'
import { AuthModal } from './AuthModal'
import { insertLeadToSupabase } from '@/lib/services/supabase-leads'
import { dispatchDirectToGoogleSheets } from '@/lib/form-submission'

const WELCOME_SUGGESTION_CARDS = [
  {
    title: '50–500MW Hyperscale Campus & PUE 1.15',
    badge: 'DATA CENTER',
    icon: Cpu,
    prompt:
      'Explain your 50 MW live / 500 MW masterplanned AI data center architecture, 120 kW rack density, and PUE 1.15 liquid cooling design.'
  },
  {
    title: '800G Ready AI Networking Fabric',
    badge: 'FABRIC',
    icon: Network,
    prompt:
      'How do you architect 400G/800G lossless RoCEv2 and InfiniBand fabrics with <2µs leaf-spine latency for multi-node GPU training?'
  },
  {
    title: 'Autonomous Multi-Agent Swarms',
    badge: 'AGENTIC AI',
    icon: Bot,
    prompt:
      'What is your architecture for deploying deterministic multi-agent swarms with MCP connectors, runtime guardrails, and AgentOps?'
  },
  {
    title: '100% Liquid-Ready Halls & Immersion',
    badge: 'THERMAL',
    icon: Zap,
    prompt:
      'Detail your 70% direct-to-chip cold-plate and immersion cooling design with 30°C supply water and N+1 CDUs.'
  },
  {
    title: '15-Sec AI-DCIM & 99.999% Availability',
    badge: 'RESILIENCE',
    icon: ShieldCheck,
    prompt:
      'How does your 15-second AI-DCIM telemetry predict failures <72h ahead and achieve 99.999% Tier III+ concurrently maintainable availability?'
  },
  {
    title: '20%+ Assured GPU Yield & FinOps',
    badge: 'VALUE ENG',
    icon: TrendingUp,
    prompt:
      'How do you deliver 20%+ assured GPU performance optimization and CFO-grade cost-per-token unit economics?'
  }
]

function ChatWorkspaceInner() {
  const { user, accessToken, openAuthModal, signOut } = useAuth()
  const {
    groupedConversations,
    activeConversationId,
    setActiveConversationId,
    messages,
    searchQuery,
    setSearchQuery,
    isGenerating,
    handleNewConsultation,
    handleRenameConversation,
    handleTogglePinConversation,
    handleDeleteConversation,
    sendMultiModalMessage
  } = useChatHistory(user.id, user.isGuest, accessToken)

  const [isSidebarOpenDesktop, setIsSidebarOpenDesktop] = useState(true)
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<{ url: string; name?: string | null } | null>(
    null
  )

  // Request Architecture Quote Modal state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '20% Assured GPU Cluster & Hyperscale Data Center',
    notes: ''
  })
  const [isSubmittingLead, setIsSubmittingLead] = useState(false)
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isGenerating])

  const handleActionPillClick = (pill: ChatActionPill) => {
    if (pill.action === 'BOOKING_PORTAL') {
      window.location.href = pill.href || '/booking'
    } else if (pill.action === 'WHATSAPP_ESCALATION') {
      window.location.href = pill.href || '/whatsapp'
    } else if (pill.action === 'REQUEST_QUOTE') {
      setSubmittedLeadId(null)
      setIsQuoteModalOpen(true)
    } else if (pill.promptText) {
      sendMultiModalMessage({
        text: pill.promptText,
        pendingImages: [],
        pendingFiles: []
      })
    }
  }

  const handleSubmitQuoteRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadForm.name.trim() || !leadForm.email.trim() || !leadForm.phone.trim()) return

    setIsSubmittingLead(true)
    try {
      const leadId = `TG-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(
        1000 + Math.random() * 9000
      )}`
      const payload = {
        submissionId: leadId,
        leadId,
        name: leadForm.name.trim(),
        email: leadForm.email.trim(),
        phone: leadForm.phone.trim(),
        company: leadForm.company.trim() || 'Enterprise Prospect',
        role: leadForm.service,
        message: leadForm.notes.trim() || `Requested architecture quote from Aegis AI Chat Desk (${leadForm.service})`,
        source: 'AI Architect Chat Desk (/chat)',
        formName: 'AI Architect Chat Lead',
        leadType: 'CHATBOT_LEAD',
        service: leadForm.service,
        website: 'TRUSTGRID.AI',
        directDispatched: true
      }

      await Promise.all([
        insertLeadToSupabase(payload).catch(() => ({ success: false })),
        dispatchDirectToGoogleSheets(payload),
        fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => null)
      ])

      setSubmittedLeadId(leadId)
    } finally {
      setIsSubmittingLead(false)
    }
  }

  return (
    <div className="h-screen w-full bg-slate-950 text-slate-100 flex overflow-hidden font-sans">
      {/* Left Sidebar (ChatGPT & Claude Style) */}
      <ChatSidebar
        isOpenDesktop={isSidebarOpenDesktop}
        isOpenMobile={isSidebarOpenMobile}
        onCloseMobile={() => setIsSidebarOpenMobile(false)}
        onToggleDesktop={() => setIsSidebarOpenDesktop((prev) => !prev)}
        groupedConversations={groupedConversations}
        activeConversationId={activeConversationId}
        onSelectConversation={(id) => setActiveConversationId(id)}
        onNewConsultation={handleNewConsultation}
        onRenameConversation={handleRenameConversation}
        onTogglePinConversation={handleTogglePinConversation}
        onDeleteConversation={handleDeleteConversation}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        user={user}
        onOpenAuthModal={openAuthModal}
        onSignOut={signOut}
      />

      {/* Main Chat Column */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <ChatHeader
          isSidebarOpenDesktop={isSidebarOpenDesktop}
          onToggleDesktopSidebar={() => setIsSidebarOpenDesktop((prev) => !prev)}
          onOpenMobileSidebar={() => setIsSidebarOpenMobile(true)}
          onOpenRequestQuoteModal={() => {
            setSubmittedLeadId(null)
            setIsQuoteModalOpen(true)
          }}
          onOpenAuthModal={openAuthModal}
          user={user}
        />

        {/* Scrollable Chat Viewport */}
        <main className="flex-1 overflow-y-auto px-3 sm:px-6 py-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.length === 0 ? (
              /* Welcome Screen with Quick-Prompt Suggestion Cards */
              <div className="py-6 sm:py-10 space-y-8">
                <div className="text-center space-y-3 max-w-2xl mx-auto">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-cyan-300 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>STANDALONE ENTERPRISE AI ARCHITECT DESK</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Consult with <span className="text-cyan-400">Aegis</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Principal AI Systems &amp; Infrastructure Architect at TRUSTGRID.AI. Paste architecture screenshots (<code className="text-cyan-300">Ctrl+V</code>), upload RFP documents (<code className="text-cyan-300">PDF, DOCX, CSV, XLSX</code>), or record a WhatsApp-style voice briefing.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {WELCOME_SUGGESTION_CARDS.map((card, idx) => {
                    const CardIcon = card.icon
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() =>
                          sendMultiModalMessage({
                            text: card.prompt,
                            pendingImages: [],
                            pendingFiles: []
                          })
                        }
                        className="text-left p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all group flex flex-col justify-between gap-3 shadow-md cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-9 h-9 rounded-xl bg-blue-600/15 border border-blue-500/30 text-cyan-400 flex items-center justify-center">
                            <CardIcon className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 group-hover:text-cyan-300">
                            {card.badge}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                            {card.title}
                          </h3>
                          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                            {card.prompt}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              /* Message History List */
              <div className="space-y-6">
                <div className="text-center">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 bg-slate-900/70 px-3 py-1 rounded-full border border-slate-800">
                    End-to-End Encrypted B2B Enterprise Architecture Session
                  </span>
                </div>

                {messages.map((msg) => (
                  <ChatMessageItem
                    key={msg.id}
                    message={msg}
                    onOpenImageLightbox={(url, name) => setLightboxImage({ url, name })}
                    onActionPillClick={handleActionPillClick}
                  />
                ))}

                {/* Live Typing Indicator */}
                {isGenerating && (
                  <div className="flex items-center gap-3 text-slate-400 text-xs pl-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-950/90 border border-blue-500/40 flex items-center justify-center text-cyan-400">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl rounded-tl-none">
                      <span className="flex gap-1">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
                          style={{ animationDelay: '0ms' }}
                        />
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
                          style={{ animationDelay: '150ms' }}
                        />
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
                          style={{ animationDelay: '300ms' }}
                        />
                      </span>
                      <span>Aegis is analyzing parameters...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </main>

        {/* Bottom Multi-Modal Input Bar */}
        <ChatInputBar
          isGenerating={isGenerating}
          onSendMessage={sendMultiModalMessage}
          onOpenRequestQuoteModal={() => {
            setSubmittedLeadId(null)
            setIsQuoteModalOpen(true)
          }}
        />
      </div>

      {/* Full-Screen Image Lightbox Modal */}
      <LightboxModal
        imageUrl={lightboxImage?.url || null}
        imageName={lightboxImage?.name}
        onClose={() => setLightboxImage(null)}
      />

      {/* Supabase Auth & Guest Modal */}
      <AuthModal />

      {/* Request Official Architecture Proposal / Quote Modal */}
      {isQuoteModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsQuoteModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsQuoteModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {submittedLeadId ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Architecture Dossier Logged</h3>
                <p className="text-xs text-slate-400">
                  Reference ID:{' '}
                  <strong className="text-cyan-400 font-mono">{submittedLeadId}</strong>
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our principal AI systems architect has received your requirements and will contact you within 2 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitQuoteRequest} className="space-y-3 text-xs">
                <div className="mb-3">
                  <h3 className="text-base font-bold text-white">
                    Request Official Architecture Proposal
                  </h3>
                  <p className="text-xs text-slate-400">
                    Direct dispatch to TRUSTGRID.AI Principal Systems Engineering Group
                  </p>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-slate-300 block mb-1">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      placeholder="+91 95130 88612"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={leadForm.company}
                    onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                    placeholder="Organization name"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Primary Architecture Pillar</label>
                  <select
                    value={leadForm.service}
                    onChange={(e) => setLeadForm({ ...leadForm, service: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="20% Assured GPU Cluster & Hyperscale Data Center">
                      20% Assured GPU Cluster &amp; Hyperscale Data Center
                    </option>
                    <option value="400G / 800G Lossless AI Networking Fabric">
                      400G / 800G Lossless AI Networking Fabric
                    </option>
                    <option value="Autonomous Multi-Agent Swarms & AgentOps">
                      Autonomous Multi-Agent Swarms &amp; AgentOps
                    </option>
                    <option value="Liquid Cooling (PUE 1.15) & 120kW Rack Retrofit">
                      Liquid Cooling (PUE 1.15) &amp; 120kW Rack Retrofit
                    </option>
                    <option value="Quantum-Safe Cybersecurity & Sovereign AI">
                      Quantum-Safe Cybersecurity &amp; Sovereign AI
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Technical Scope / Notes</label>
                  <textarea
                    rows={2}
                    value={leadForm.notes}
                    onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                    placeholder="MW target, GPU count, fabric latency, or timeline..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingLead}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  {isSubmittingLead ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm &amp; Request Architecture Proposal</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export function EnterpriseChatApp() {
  return (
    <AuthProvider>
      <ChatWorkspaceInner />
    </AuthProvider>
  )
}

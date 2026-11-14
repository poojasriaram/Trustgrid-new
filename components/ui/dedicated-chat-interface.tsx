'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Network,
  Lock,
  Calendar,
  RotateCcw,
  Copy,
  Check,
  Loader2,
  Phone,
  Zap,
  ArrowRight,
  Share2,
  ExternalLink,
  ChevronRight
} from 'lucide-react'
import { submitTrustGridForm } from '@/lib/form-submission'
import { trackChatbotEvent } from '@/lib/analytics'
import { GOOGLE_CALENDAR_SCHEDULING_URL } from '@/components/ui/session-booking-form'

export interface ChatMessage {
  id: string
  sender: 'bot' | 'user'
  text: string
  timestamp: string
  offeringTag?: string
  pageLink?: { label: string; href: string }
  suggestedFollowUps?: string[]
  isLeadPrompt?: boolean
  cta?: { label: string; href: string }
}

const DEDICATED_STARTING_PROMPTS = [
  {
    category: 'GPU & Infrastructure',
    icon: Cpu,
    prompt: 'How can TRUSTGRID.AI optimize our GPU cluster for 20% assured performance gains and lower inference latency?'
  },
  {
    category: 'Agentic Systems',
    icon: Zap,
    prompt: 'What architectural patterns do you recommend for multi-agent swarm orchestration and persistent memory?'
  },
  {
    category: 'Lossless Fabric',
    icon: Network,
    prompt: 'Evaluate 800G RoCEv2 vs. InfiniBand fabric topologies for high-density training and inference.'
  },
  {
    category: 'Cybersecurity & PQC',
    icon: Lock,
    prompt: 'What is the implementation roadmap for Post-Quantum Cryptography (PQC) and sovereign AI governance?'
  },
  {
    category: 'AI FinOps & Economics',
    icon: Sparkles,
    prompt: 'How do we calculate unit economics per token and eliminate KV-cache compute waste across our workloads?'
  },
  {
    category: 'Executive Strategy',
    icon: ShieldCheck,
    prompt: 'I want to schedule a 45-minute technical briefing with a TRUSTGRID.AI Principal Systems Architect.'
  }
]

const INITIAL_GREETING: ChatMessage = {
  id: 'msg_welcome',
  sender: 'bot',
  text: "Welcome to the TRUSTGRID.AI Principal AI Architecture Desk. I am your autonomous systems architect, equipped to assist with high-density GPU infrastructure topologies, multi-agent swarm orchestration, lossless 800G RoCEv2 fabric design, quantum-safe cybersecurity, and measurable AI FinOps economics.\n\nSelect a challenge below or describe your production AI roadmap to begin.",
  timestamp: 'Just now',
  suggestedFollowUps: [
    'Audit GPU cluster utilization & waste',
    'Architect enterprise multi-agent fleet',
    'Evaluate RoCEv2 vs InfiniBand network fabric',
    'Book 45-min consultation with Principal Architect'
  ]
}

interface DedicatedChatInterfaceProps {
  initialPrompt?: string
  sourceChannel?: string
}

export function DedicatedChatInterface({
  initialPrompt = '',
  sourceChannel = 'dedicated_chat_page'
}: DedicatedChatInterfaceProps) {
  const [conversationId, setConversationId] = useState<string>('')
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING])
  const [inputVal, setInputVal] = useState(initialPrompt)
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [showShareToast, setShowShareToast] = useState(false)

  // Lead Drawer / Quick Booking Modal
  const [leadMode, setLeadMode] = useState(false)
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    requirement: ''
  })
  const [leadSubmitting, setLeadSubmitting] = useState(false)
  const [leadSuccess, setLeadSuccess] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Initialize or restore conversation ID
  useEffect(() => {
    let storedId = ''
    try {
      storedId = sessionStorage.getItem('tg_dedicated_conv_id') || ''
    } catch {}

    if (!storedId) {
      storedId = `tg_chat_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`
      try {
        sessionStorage.setItem('tg_dedicated_conv_id', storedId)
      } catch {}
    }

    setConversationId(storedId)
    trackChatbotEvent('open', {
      chatSessionId: storedId,
      source: sourceChannel,
      interface: 'dedicated_full_page'
    })
  }, [sourceChannel])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isGenerating])

  const handleCopy = (id: string, text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
      })
    }
  }

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      const url = window.location.href
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url)
        setShowShareToast(true)
        setTimeout(() => setShowShareToast(false), 2500)
      }
    }
  }

  const handleResetChat = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }

    const newId = `tg_chat_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`
    setConversationId(newId)
    try {
      sessionStorage.setItem('tg_dedicated_conv_id', newId)
    } catch {}

    setMessages([INITIAL_GREETING])
    setInputVal('')
    setIsGenerating(false)
    setLeadMode(false)
    setLeadSuccess(false)

    trackChatbotEvent('reset', { chatSessionId: newId })
  }

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim()
    if (!text || isGenerating) return

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages((prev) => [...prev, userMsg])
    setInputVal('')
    setIsGenerating(true)

    trackChatbotEvent('message_sent', {
      chatSessionId: conversationId,
      userQuery: text.substring(0, 120),
      source: sourceChannel
    })

    const placeholderBotMsg: ChatMessage = {
      id: `bot_${Date.now()}`,
      sender: 'bot',
      text: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages((prev) => [...prev, placeholderBotMsg])

    try {
      const controller = new AbortController()
      abortControllerRef.current = controller

      const historyForApi = messages
        .filter((m) => m.id !== 'msg_welcome')
        .map((m) => ({
          role: m.sender === 'bot' ? 'assistant' : 'user',
          content: m.text
        }))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationId,
          messages: historyForApi
        }),
        signal: controller.signal
      })

      if (!response.ok) {
        throw new Error(`Chat API responded with status: ${response.status}`)
      }

      const data = await response.json()
      const botResponse = data.botResponse || {}

      setMessages((prev) =>
        prev.map((m) =>
          m.id === placeholderBotMsg.id
            ? {
                ...m,
                text: botResponse.text || "Thank you. I have analyzed your query against TRUSTGRID.AI's verified systems engineering models.",
                offeringTag: botResponse.offeringTag,
                pageLink: botResponse.pageLink,
                suggestedFollowUps: botResponse.suggestedFollowUps || [
                  'Book 45-Min Executive Consultation',
                  'Request Architecture Diagnostic'
                ],
                isLeadPrompt: botResponse.isLeadPrompt,
                cta: botResponse.cta
              }
            : m
        )
      )

      trackChatbotEvent('response_received', {
        chatSessionId: conversationId,
        offeringTag: botResponse.offeringTag
      })
    } catch (err: any) {
      if (err.name === 'AbortError') return
      console.error('[DedicatedChat Error]', err)

      setMessages((prev) =>
        prev.map((m) =>
          m.id === placeholderBotMsg.id
            ? {
                ...m,
                text: "I am temporarily calibrating with the principal architecture nodes. You can immediately connect directly with our engineering team via WhatsApp or schedule an executive consultation.",
                cta: { label: 'Book 45-Min Session', href: '/booking' },
                suggestedFollowUps: ['Connect via WhatsApp', 'Book Executive Consultation']
              }
            : m
        )
      )
    } finally {
      setIsGenerating(false)
      abortControllerRef.current = null
    }
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadData.name || !leadData.email) return

    setLeadSubmitting(true)
    try {
      const result = await submitTrustGridForm({
        formName: 'Dedicated Chatbot Lead Capture',
        form_type: 'CHATBOT_DEDICATED',
        name: leadData.name,
        email: leadData.email,
        company: leadData.company || 'Enterprise Client',
        phone: leadData.phone || '',
        mobile: leadData.phone || '',
        requirement: leadData.requirement || 'Requested consultation via Dedicated AI Architect Chatbot Desk',
        page_source: '/chat',
        ctaSource: sourceChannel,
        additionalRequirements: `Conversation ID: ${conversationId}`
      })

      if (result.success) {
        setLeadSuccess(true)
        trackChatbotEvent('lead_captured', {
          chatSessionId: conversationId,
          email: leadData.email
        })
      }
    } catch (err) {
      console.error('[Chat Lead Error]', err)
    } finally {
      setLeadSubmitting(false)
    }
  }

  return (
    <div
      className="dedicated-chat-wrapper"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 70px)',
        minHeight: '620px',
        maxHeight: '940px',
        background: '#09142e',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* HEADER BAR */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          background: 'rgba(9, 20, 46, 0.95)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          zIndex: 10
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #1d5cff 0%, #0d47e5 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(29, 92, 255, 0.4)'
            }}
          >
            <Bot size={20} color="#ffffff" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>
                Principal AI Architect Desk
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#4ade80',
                  background: 'rgba(34, 197, 94, 0.15)',
                  padding: '2px 7px',
                  borderRadius: '10px'
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#22c55e',
                    display: 'inline-block'
                  }}
                />
                Active Node
              </span>
            </div>
            <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>
              Full-Stack GPU Infrastructure &bull; Agentic Fleets &bull; 800G Fabrics &bull; Quantum-Safe
            </p>
          </div>
        </div>

        {/* HEADER ACTIONS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={handleShare}
            title="Share or Copy Desk URL"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '7px 10px',
              color: '#cbd5e1',
              fontSize: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <Share2 size={13} />
            <span className="hidden sm:inline">Share URL</span>
          </button>

          <button
            type="button"
            onClick={handleResetChat}
            title="Clear & Reset Conversation"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '7px 10px',
              color: '#cbd5e1',
              fontSize: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={13} />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <Link
            href="/booking"
            className="button button-primary button-sm"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '8px',
              background: '#1d5cff',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            <Calendar size={13} />
            <span>Book 45-Min Session</span>
          </Link>
        </div>
      </div>

      {showShareToast && (
        <div
          style={{
            position: 'absolute',
            top: '65px',
            right: '20px',
            background: '#22c55e',
            color: '#ffffff',
            padding: '6px 14px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 600,
            zIndex: 30,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}
        >
          Dedicated Chatbot URL copied to clipboard!
        </div>
      )}

      {/* MAIN BODY: SPLIT VIEW ON DESKTOP */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* DESKTOP SIDEBAR: CAPABILITIES & STARTER PROMPTS */}
        <div
          className="hidden md:flex"
          style={{
            width: '280px',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(9, 20, 46, 0.5)',
            flexDirection: 'column',
            padding: '16px',
            overflowY: 'auto'
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#60a5fa',
              marginBottom: '12px',
              display: 'block'
            }}
          >
            ENGINEERING CAPABILITIES
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {DEDICATED_STARTING_PROMPTS.map((item, idx) => {
              const IconComp = item.icon
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(item.prompt)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '10px',
                    padding: '10px 12px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: '#e2e8f0',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(29, 92, 255, 0.15)'
                    e.currentTarget.style.borderColor = 'rgba(29, 92, 255, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <IconComp size={13} color="#60a5fa" />
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#93c5fd' }}>
                      {item.category}
                    </span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.prompt}
                  </p>
                </button>
              )
            })}
          </div>

          {/* QUICK CHANNELS PANEL */}
          <div
            style={{
              marginTop: 'auto',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>
              DIRECT ESCALATION
            </span>
            <Link
              href="/quick-session"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 10px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                fontSize: '12px',
                textDecoration: 'none',
                marginBottom: '6px'
              }}
            >
              <span>30-Sec Quick Request</span>
              <ArrowRight size={13} color="#60a5fa" />
            </Link>
            <Link
              href="/whatsapp"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 10px',
                borderRadius: '8px',
                background: 'rgba(34, 197, 94, 0.1)',
                color: '#4ade80',
                fontSize: '12px',
                textDecoration: 'none'
              }}
            >
              <span>Direct WhatsApp Desk</span>
              <MessageSquare size={13} color="#4ade80" />
            </Link>
          </div>
        </div>

        {/* CHAT FEED COLUMN */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
          {/* MESSAGES SCROLLER */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: msg.sender === 'user' ? '82%' : '88%'
                }}
              >
                {msg.sender === 'bot' && (
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #1d5cff 0%, #0d47e5 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  >
                    <Bot size={17} color="#ffffff" />
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                  <div
                    style={{
                      background: msg.sender === 'user' ? '#1d5cff' : 'rgba(255, 255, 255, 0.05)',
                      border: msg.sender === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                      padding: '14px 18px',
                      color: '#ffffff',
                      fontSize: '14px',
                      lineHeight: 1.6,
                      wordBreak: 'break-word',
                      boxShadow: msg.sender === 'user' ? '0 4px 12px rgba(29, 92, 255, 0.25)' : 'none'
                    }}
                  >
                    {msg.sender === 'bot' && !msg.text && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8' }}>
                        <Loader2 size={16} className="animate-spin" />
                        <span style={{ fontSize: '13px' }}>Synthesizing architecture intelligence...</span>
                      </div>
                    )}

                    <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>

                    {msg.offeringTag && (
                      <div style={{ marginTop: '10px' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            background: 'rgba(29, 92, 255, 0.2)',
                            color: '#93c5fd',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            display: 'inline-block'
                          }}
                        >
                          {msg.offeringTag}
                        </span>
                      </div>
                    )}

                    {/* CONTEXTUAL CTA */}
                    {msg.cta && (
                      <div style={{ marginTop: '12px' }}>
                        <Link
                          href={msg.cta.href}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 14px',
                            borderRadius: '6px',
                            background: '#1d5cff',
                            color: '#ffffff',
                            fontSize: '12px',
                            fontWeight: 600,
                            textDecoration: 'none'
                          }}
                        >
                          <span>{msg.cta.label}</span>
                          <ArrowRight size={13} />
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* MESSAGE FOOTER / ACTIONS */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      paddingLeft: '4px',
                      fontSize: '11px',
                      color: '#64748b'
                    }}
                  >
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'bot' && msg.text && (
                      <button
                        type="button"
                        onClick={() => handleCopy(msg.id, msg.text)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: copiedId === msg.id ? '#4ade80' : '#64748b',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                          padding: 0,
                          fontSize: '11px'
                        }}
                      >
                        {copiedId === msg.id ? <Check size={12} /> : <Copy size={12} />}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    )}
                  </div>

                  {/* SUGGESTED FOLLOW-UP CHIPS */}
                  {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                      {msg.suggestedFollowUps.map((chip, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            if (chip.toLowerCase().includes('book') || chip.toLowerCase().includes('consultation')) {
                              setLeadMode(true)
                            } else {
                              handleSendMessage(chip)
                            }
                          }}
                          style={{
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            padding: '5px 11px',
                            color: '#cbd5e1',
                            fontSize: '11px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#1d5cff'
                            e.currentTarget.style.color = '#ffffff'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                            e.currentTarget.style.color = '#cbd5e1'
                          }}
                        >
                          <ChevronRight size={11} color="#60a5fa" />
                          <span>{chip}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  >
                    <User size={16} color="#ffffff" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* INLINE LEAD DRAWER (WHEN REQUESTED) */}
          {leadMode && (
            <div
              style={{
                background: 'rgba(15, 36, 82, 0.95)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '16px 20px',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} color="#60a5fa" />
                  Connect with Principal AI Architect
                </span>
                <button
                  type="button"
                  onClick={() => setLeadMode(false)}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '12px', cursor: 'pointer' }}
                >
                  Dismiss
                </button>
              </div>

              {leadSuccess ? (
                <div style={{ color: '#4ade80', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} />
                  <span>Request routed. An architect will reach out shortly. You can also select a slot on Google Calendar.</span>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={leadData.name}
                    onChange={(e) => setLeadData((p) => ({ ...p, name: e.target.value }))}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      fontSize: '12px',
                      outline: 'none'
                    }}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Work Email *"
                    value={leadData.email}
                    onChange={(e) => setLeadData((p) => ({ ...p, email: e.target.value }))}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      fontSize: '12px',
                      outline: 'none'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={leadData.company}
                    onChange={(e) => setLeadData((p) => ({ ...p, company: e.target.value }))}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      fontSize: '12px',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={leadSubmitting}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '6px',
                      background: '#1d5cff',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {leadSubmitting ? 'Routing...' : 'Confirm Request'}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* INPUT BAR */}
          <div
            style={{
              padding: '16px 20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(9, 20, 46, 0.95)',
              position: 'relative'
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                padding: '6px 12px'
              }}
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={inputVal}
                placeholder="Ask about GPU cluster optimization, agentic swarm architecture, 800G fabric, or FinOps..."
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#ffffff',
                  fontSize: '14px',
                  resize: 'none',
                  maxHeight: '120px',
                  padding: '6px 0'
                }}
              />

              <button
                type="submit"
                disabled={!inputVal.trim() || isGenerating}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: inputVal.trim() && !isGenerating ? '#1d5cff' : 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  border: 'none',
                  cursor: inputVal.trim() && !isGenerating ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background 0.15s ease'
                }}
              >
                {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px', color: '#64748b' }}>
              <span>Protected under mutual NDA &bull; Zero prompt caching</span>
              <span className="hidden sm:inline">Press Enter to send &bull; Shift + Enter for new line</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


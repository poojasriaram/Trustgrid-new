'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  MessageSquare,
  X,
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
  TrendingUp,
  Workflow,
  ChevronRight,
  Minimize2,
  Maximize2,
  RefreshCw,
  Loader2,
  Copy,
  Check,
  Square,
  RotateCcw
} from 'lucide-react'
import { submitTrustGridForm } from '@/lib/form-submission'
import { trackChatbotEvent } from '@/lib/analytics'

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

const STARTING_PROMPTS = [
  'Design an enterprise AI infrastructure architecture.',
  'How can I improve GPU utilization and reduce inference costs?',
  'Explore AI agents for enterprise operations.',
  'Evaluate AI networking bottlenecks.',
  'Build an AI security and governance strategy.',
  'Identify AI opportunities for my industry.'
]

const WELCOME_MESSAGE =
  'Welcome to TRUSTGRID.AI. I can help you explore enterprise AI infrastructure, agentic systems, AI networking, cybersecurity, trusted AI, and measurable AI business value. Tell me what you are trying to achieve, and we can work through it together.'

export function AIArchitectChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [conversationId, setConversationId] = useState<string>('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputVal, setInputVal] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [hasUnread, setHasUnread] = useState(false)

  // Conversational Lead Drawer
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
  const abortControllerRef = useRef<AbortController | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Restore or initialize session from sessionStorage
  useEffect(() => {
    let storedId = ''
    try {
      storedId = sessionStorage.getItem('tg_conversation_id') || ''
    } catch {
      // Ignore storage access restrictions
    }

    if (!storedId) {
      storedId = `tg_conv_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`
      try {
        sessionStorage.setItem('tg_conversation_id', storedId)
      } catch {}
    }

    setConversationId(storedId)

    // Initial Welcome Message
    setMessages([
      {
        id: 'msg_welcome',
        sender: 'bot',
        text: WELCOME_MESSAGE,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: [
          'What is AI infrastructure?',
          'What are the main GPU challenges?',
          'How can TRUSTGRID.AI solve them?'
        ]
      }
    ])
  }, [])

  // Auto-scroll on new messages
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen, isMinimized, isGenerating])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 150)
      setHasUnread(false)
    }
  }, [isOpen, isMinimized])

  const toggleChat = () => {
    const nextState = !isOpen
    setIsOpen(nextState)
    if (nextState) {
      trackChatbotEvent('open', { chatSessionId: conversationId })
      setHasUnread(false)
    } else {
      trackChatbotEvent('close', { chatSessionId: conversationId })
    }
  }

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
    setIsGenerating(false)
  }

  const handleClearContext = async () => {
    handleStopGeneration()
    const nextId = `tg_conv_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`
    setConversationId(nextId)
    try {
      sessionStorage.setItem('tg_conversation_id', nextId)
      await fetch(`/api/chat?conversationId=${conversationId}`, { method: 'DELETE' })
    } catch {}

    setMessages([
      {
        id: `msg_welcome_${Date.now()}`,
        sender: 'bot',
        text: WELCOME_MESSAGE,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: [
          'What is AI infrastructure?',
          'How does TRUSTGRID.AI optimize GPU clusters?',
          'What are agentic digital workers?'
        ]
      }
    ])
    setLeadMode(false)
    setLeadSuccess(false)
  }

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputVal).trim()
    if (!textToSend || isGenerating) return

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMsg])
    setInputVal('')
    setIsGenerating(true)

    trackChatbotEvent('message_sent', {
      chatSessionId: conversationId,
      elementText: textToSend
    })

    const botMsgId = `bot_${Date.now()}`
    const placeholderBotMsg: ChatMessage = {
      id: botMsgId,
      sender: 'bot',
      text: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, placeholderBotMsg])

    const abortController = new AbortController()
    abortControllerRef.current = abortController

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          conversationId,
          stream: true
        }),
        signal: abortController.signal
      })

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`)
      }

      // Check for streaming response
      const contentType = response.headers.get('content-type') || ''
      if (contentType.includes('text/event-stream') && response.body) {
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let accumulatedText = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6))
                if (data.type === 'delta') {
                  accumulatedText += data.content
                  setMessages(prev =>
                    prev.map(m =>
                      m.id === botMsgId ? { ...m, text: accumulatedText } : m
                    )
                  )
                } else if (data.type === 'done') {
                  setMessages(prev =>
                    prev.map(m =>
                      m.id === botMsgId
                        ? {
                            ...m,
                            text: accumulatedText || m.text,
                            offeringTag: data.offeringTag,
                            pageLink: data.pageLink,
                            suggestedFollowUps: data.suggestedFollowUps,
                            isLeadPrompt: data.isLeadPrompt,
                            cta: data.cta
                          }
                        : m
                    )
                  )
                  if (data.isLeadPrompt) {
                    setLeadData(prev => ({
                      ...prev,
                      requirement: `Conversation Topic: ${data.offeringTag || 'General Enterprise Consultation'}`
                    }))
                  }
                }
              } catch {}
            }
          }
        }
      } else {
        // Fallback JSON handling
        const data = await response.json()
        setMessages(prev =>
          prev.map(m =>
            m.id === botMsgId
              ? {
                  ...m,
                  text: data.message.text,
                  offeringTag: data.offeringTag,
                  pageLink: data.pageLink,
                  suggestedFollowUps: data.suggestedFollowUps,
                  isLeadPrompt: data.isLeadPrompt,
                  cta: data.cta
                }
              : m
          )
        )
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // Stopped by user
      } else {
        console.error('[Chatbot Error]', err)
        setMessages(prev =>
          prev.map(m =>
            m.id === botMsgId
              ? {
                  ...m,
                  text: 'I encountered a brief connection issue. You can retry your question or speak directly with an AI Architect.'
                }
              : m
          )
        )
      }
    } finally {
      setIsGenerating(false)
      abortControllerRef.current = null
    }
  }

  const handleRetry = () => {
    const lastUserMsg = [...messages].reverse().find(m => m.sender === 'user')
    if (lastUserMsg) {
      handleSendMessage(lastUserMsg.text)
    }
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLeadSubmitting(true)
    try {
      const res = await submitTrustGridForm({
        name: leadData.name,
        email: leadData.email,
        company: leadData.company,
        phone: leadData.phone,
        form_type: 'CHATBOT',
        formName: 'Conversational Assistant Lead Capture',
        requirement: leadData.requirement || 'Requested consultation via AI Architect Chatbot',
        page_source: typeof window !== 'undefined' ? window.location.pathname : '/chatbot'
      })

      if (res.success) {
        setLeadSuccess(true)
        setTimeout(() => {
          setLeadMode(false)
          setLeadSuccess(false)
        }, 3500)
      }
    } catch (err) {
      console.error('[Lead Submit Error]', err)
    } finally {
      setLeadSubmitting(false)
    }
  }

  // Format inline text with markdown style bold & code
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n')
    return lines.map((line, lIdx) => {
      if (line.startsWith('### ')) {
        return (
          <h5 key={lIdx} style={{ fontWeight: 700, fontSize: '11.5px', color: '#1d5cff', margin: '8px 0 3px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {line.slice(4)}
          </h5>
        )
      }
      if (line.startsWith('## ')) {
        return (
          <h4 key={lIdx} style={{ fontWeight: 700, fontSize: '13px', color: '#09142e', margin: '10px 0 4px' }}>
            {line.slice(3)}
          </h4>
        )
      }
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const item = line.trim().slice(2)
        return (
          <div key={lIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', margin: '3px 0', fontSize: '12.5px', lineHeight: 1.45 }}>
            <span style={{ color: '#1d5cff', marginTop: '3px' }}>•</span>
            <div>{formatInline(item)}</div>
          </div>
        )
      }
      if (/^\d+\.\s/.test(line.trim())) {
        const match = line.trim().match(/^(\d+\.)\s(.*)/)
        return (
          <div key={lIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', margin: '4px 0', fontSize: '12.5px', lineHeight: 1.45 }}>
            <span style={{ fontWeight: 700, color: '#1d5cff' }}>{match ? match[1] : '1.'}</span>
            <div>{formatInline(match ? match[2] : line)}</div>
          </div>
        )
      }
      if (!line.trim()) {
        return <div key={lIdx} style={{ height: '6px' }} />
      }
      return (
        <div key={lIdx} style={{ margin: '3px 0', fontSize: '12.5px', lineHeight: 1.45 }}>
          {formatInline(line)}
        </div>
      )
    })
  }

  const formatInline = (str: string) => {
    const parts = str.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} style={{ fontWeight: 700, color: '#09142e' }}>
            {part.slice(2, -2)}
          </strong>
        )
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} style={{ padding: '1px 5px', background: '#f1f5f9', borderRadius: '4px', fontSize: '11px', color: '#1d5cff', fontFamily: 'monospace' }}>
            {part.slice(1, -1)}
          </code>
        )
      }
      return part
    })
  }

  return (
    <>
      {/* FLOATING TRIGGER LAUNCHER */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="ai-architect-chatbot-launcher"
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          aria-label="Open TRUSTGRID.AI Architect Assistant"
        >
          <div className="ai-architect-chatbot-avatar">
            <Bot size={18} className="text-white" />
          </div>
          <div className="ai-architect-chatbot-text-col">
            <span className="ai-architect-chatbot-title">
              TRUSTGRID.AI
            </span>
            <span className="ai-architect-chatbot-subtitle">
              Enterprise Architect
            </span>
          </div>
          <Sparkles size={14} className="text-blue-400 animate-pulse ml-1" />
        </button>
      )}

      {/* CHAT WINDOW CONTAINER */}
      {isOpen && (
        <div
          className={`ai-architect-chatbot-window ${isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="TRUSTGRID.AI Architect Assistant"
        >
          {/* HEADER */}
          <div
            style={{
              padding: '14px 18px',
              background: 'linear-gradient(135deg, #09142e 0%, #0d214d 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              flexShrink: 0
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: '#1d5cff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h3 style={{ fontSize: '13.5px', fontWeight: 700, margin: 0, color: '#ffffff' }}>
                    TRUSTGRID.AI Assistant
                  </h3>
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#10b981',
                      display: 'inline-block'
                    }}
                  />
                </div>
                <p style={{ fontSize: '10.5px', color: '#93c5fd', margin: 0 }}>
                  Context-Aware Enterprise Systems Architect
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {/* Reset Context */}
              <button
                onClick={handleClearContext}
                title="Start New Conversation (Reset Context)"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  padding: '4px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <RotateCcw size={14} />
              </button>

              {/* Minimize */}
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand' : 'Minimize'}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  padding: '4px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Minimize2 size={14} />
              </button>

              {/* Maximize */}
              {!isMinimized && (
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  title={isMaximized ? 'Restore Size' : 'Maximize'}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    padding: '4px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Maximize2 size={14} />
                </button>
              )}

              {/* Close */}
              <button
                onClick={toggleChat}
                title="Close"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  padding: '4px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* MESSAGES SCROLL AREA */}
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '16px',
                  background: '#f8fafc',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}
              >
                {messages.map((msg, index) => (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                      width: '100%'
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '90%',
                        padding: '12px 16px',
                        borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                        background: msg.sender === 'user' ? '#1d5cff' : '#ffffff',
                        color: msg.sender === 'user' ? '#ffffff' : '#09142e',
                        border: msg.sender === 'user' ? 'none' : '1px solid #e2e8f0',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                        position: 'relative'
                      }}
                    >
                      {/* Offering Category Tag */}
                      {msg.offeringTag && (
                        <div
                          style={{
                            fontSize: '9.5px',
                            fontWeight: 700,
                            color: msg.sender === 'user' ? '#e0e7ff' : '#1d5cff',
                            marginBottom: '6px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em'
                          }}
                        >
                          {msg.offeringTag}
                        </div>
                      )}

                      {/* Content */}
                      <div>
                        {msg.sender === 'user' ? (
                          <div style={{ fontSize: '13px', lineHeight: 1.45 }}>{msg.text}</div>
                        ) : (
                          renderFormattedText(msg.text)
                        )}
                      </div>

                      {/* Clickable Reference Link */}
                      {msg.pageLink && (
                        <div style={{ marginTop: '10px' }}>
                          <Link
                            href={msg.pageLink.href}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '5px 10px',
                              background: '#eff6ff',
                              color: '#1d5cff',
                              border: '1px solid #bfdbfe',
                              borderRadius: '6px',
                              fontSize: '11px',
                              fontWeight: 600,
                              textDecoration: 'none',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <span>{msg.pageLink.label}</span>
                            <ArrowUpRight size={12} />
                          </Link>
                        </div>
                      )}

                      {/* Contextual CTA Button */}
                      {msg.cta && (
                        <div style={{ marginTop: '10px' }}>
                          <Link
                            href={msg.cta.href}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '7px 12px',
                              background: '#1d5cff',
                              color: '#ffffff',
                              borderRadius: '6px',
                              fontSize: '11.5px',
                              fontWeight: 600,
                              textDecoration: 'none'
                            }}
                          >
                            <span>{msg.cta.label}</span>
                            <ArrowUpRight size={13} />
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Metadata & Message Actions Bar */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginTop: '4px',
                        padding: '0 4px',
                        fontSize: '10px',
                        color: '#94a3b8'
                      }}
                    >
                      <span>{msg.timestamp}</span>
                      {msg.sender === 'bot' && msg.text && (
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          title="Copy response"
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#94a3b8',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '2px',
                            padding: '2px 4px'
                          }}
                        >
                          {copiedId === msg.id ? <Check size={11} className="text-green-600" /> : <Copy size={11} />}
                          <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                        </button>
                      )}
                    </div>

                    {/* Suggested Follow-Ups (only under the last assistant message) */}
                    {index === messages.length - 1 && msg.suggestedFollowUps && !isGenerating && (
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '6px',
                          marginTop: '8px',
                          maxWidth: '95%'
                        }}
                      >
                        {msg.suggestedFollowUps.map((prompt, pIdx) => (
                          <button
                            key={pIdx}
                            onClick={() => handleSendMessage(prompt)}
                            style={{
                              padding: '5px 10px',
                              background: '#ffffff',
                              border: '1px solid #cbd5e1',
                              borderRadius: '999px',
                              fontSize: '11px',
                              fontWeight: 500,
                              color: '#1e293b',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              textAlign: 'left',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = '#1d5cff'
                              e.currentTarget.style.color = '#1d5cff'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = '#cbd5e1'
                              e.currentTarget.style.color = '#1e293b'
                            }}
                          >
                            <span>{prompt}</span>
                            <ChevronRight size={11} className="text-slate-600" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Starting Prompt Pills (Only displayed at initial state) */}
                {messages.length === 1 && !isGenerating && (
                  <div style={{ marginTop: '4px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#334155', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Suggested Starting Inquiries:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {STARTING_PROMPTS.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(prompt)}
                          style={{
                            padding: '8px 12px',
                            background: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: 500,
                            color: '#334155',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            textAlign: 'left',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#1d5cff'
                            e.currentTarget.style.background = '#f0f7ff'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#e2e8f0'
                            e.currentTarget.style.background = '#ffffff'
                          }}
                        >
                          <span>{prompt}</span>
                          <ChevronRight size={13} className="text-slate-600" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Generating indicator */}
                {isGenerating && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      background: '#ffffff',
                      borderRadius: '8px',
                      width: 'fit-content',
                      border: '1px solid #e2e8f0'
                    }}
                  >
                    <Loader2 size={13} className="animate-spin text-blue-600" />
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      Synthesizing architectural reasoning...
                    </span>
                    <button
                      onClick={handleStopGeneration}
                      style={{
                        marginLeft: '8px',
                        background: '#f1f5f9',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '2px 6px',
                        fontSize: '11px',
                        color: '#64748b',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                    >
                      <Square size={9} />
                      <span>Stop</span>
                    </button>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* CONTEXTUAL CONSULTATION LEAD DRAWER */}
              {leadMode && (
                <div style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#1d5cff', letterSpacing: '0.06em' }}>
                      DISCUSS WITH A PRINCIPAL AI ARCHITECT
                    </span>
                    <button
                      onClick={() => setLeadMode(false)}
                      style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '11px' }}
                    >
                      Dismiss
                    </button>
                  </div>

                  {leadSuccess ? (
                    <div style={{ padding: '12px', background: '#ecfdf5', borderRadius: '8px', color: '#065f46', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={16} className="text-emerald-600" />
                      <span>Your briefing request has been received. An AI Architect will reach out within 24 hours.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={leadData.name}
                          onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                          required
                          style={{ padding: '8px 10px', fontSize: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                        />
                        <input
                          type="email"
                          placeholder="Corporate Email"
                          value={leadData.email}
                          onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                          required
                          style={{ padding: '8px 10px', fontSize: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <input
                          type="text"
                          placeholder="Company Name"
                          value={leadData.company}
                          onChange={(e) => setLeadData({ ...leadData, company: e.target.value })}
                          required
                          style={{ padding: '8px 10px', fontSize: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number (Optional)"
                          value={leadData.phone}
                          onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                          style={{ padding: '8px 10px', fontSize: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={leadSubmitting}
                        style={{
                          padding: '8px',
                          background: '#1d5cff',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        {leadSubmitting ? (
                          <>
                            <Loader2 size={13} className="animate-spin" />
                            <span>Scheduling Briefing...</span>
                          </>
                        ) : (
                          <>
                            <span>Request Architecture Strategy Briefing</span>
                            <Send size={13} />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* INPUT BAR */}
              <div className="ai-architect-chatbot-input-bar">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask a technical or architectural question..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  disabled={isGenerating}
                  className="ai-architect-chatbot-input"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputVal.trim() || isGenerating}
                  className="ai-architect-chatbot-send-btn"
                  aria-label="Send Message"
                >
                  <Send size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

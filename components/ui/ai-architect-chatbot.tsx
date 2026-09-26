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
  Phone,
  ChevronRight,
  Minimize2,
  Maximize2,
  RefreshCw,
  Loader2
} from 'lucide-react'
import { solutions } from '@/lib/solutions'
import { submitTrustGridForm, validateEmail } from '@/lib/form-submission'
import { trackChatbotEvent, trackCTA } from '@/lib/analytics'

interface ChatMessage {
  id: string
  sender: 'bot' | 'user'
  text: string
  timestamp: string
  quickActions?: { label: string; action: string }[]
  offeringTag?: string
  pageLink?: { label: string; href: string }
  followUpQuestion?: string
  isLeadPrompt?: boolean
}

const trustgridKnowledge = [
  {
    keywords: ['strategy session', 'strategy', 'executive briefing', 'architect session', 'consultation', 'talk to architect', 'speak with architect', 'meeting', 'book session'],
    offering: 'Executive Strategy Session',
    response: 'An Executive Strategy Session is a focused 45-minute architectural & strategic briefing with TRUSTGRID.AI principal systems engineers. We evaluate your compute economics, multi-agent readiness, lossless networking, and quantum security to outline a tangible roadmap.',
    followUpQuestion: 'Would you like to schedule a dedicated 45-minute Strategy Session with our principal engineering team?',
    pageLink: { label: 'Book Executive Strategy Session (45-Min)', href: '/book-ai-diagnostic?type=strategy-session' }
  },
  {
    keywords: ['infra', 'infrastructure', 'gpu', 'data center', 'datacenter', 'liquid cooling', 'blackwell', 'h100', 'h200', 'cluster', 'pue', 'compute', 'utilization', 'substation', 'subsea'],
    offering: 'AI Infrastructure & AI Data Center Engineering',
    response: 'TRUSTGRID.AI engineers high-density AI Factories (30–100kW/rack) with direct-to-chip liquid cooling, kernel-level accelerator tuning, and low-latency inference serving. We eliminate the 30–50% compute waste common in GPU clusters and slash inference TCO by 30–60%.',
    followUpQuestion: 'What cluster scale or rack density (kW/rack) are you planning or currently operating?',
    pageLink: { label: 'Explore AI Infrastructure Architecture', href: '/solutions/ai-infra-engineering' }
  },
  {
    keywords: ['agent', 'agentic', 'multi-agent', 'langgraph', 'crewai', 'autogen', 'mcp', 'autonomous', 'digital worker', 'workflow', 'swarm', 'agentops'],
    offering: 'Agentic Enterprise',
    response: 'TRUSTGRID.AI architects production multi-agent systems with deterministic reasoning DAGs, persistent memory fabrics (episodic/semantic), tool sandboxing via Model Context Protocol (MCP), and enterprise AgentOps telemetry with >95% SLA-enforced task accuracy.',
    followUpQuestion: 'Are you deploying autonomous agent swarms in internal operations or customer-facing workflows?',
    pageLink: { label: 'Explore Agentic Enterprise Solutions', href: '/solutions/ai-agentic-factory' }
  },
  {
    keywords: ['network', 'networking', 'infiniband', 'roce', 'rocev2', 'bandwidth', 'latency', 'dragonfly', 'packet drop', 'nccl', 'rccl', 'noc', 'spine-leaf'],
    offering: 'AI-Native Networking',
    response: 'TRUSTGRID.AI designs ultra-low latency, non-blocking InfiniBand and RoCEv2 network fabrics engineered for zero packet loss, rail-optimized node alignment, NCCL/RCCL collective tuning, and autonomous AI NOC telemetry.',
    followUpQuestion: 'Are you currently encountering packet drops or tail latency spikes in your GPU distributed training fabric?',
    pageLink: { label: 'Explore AI-Native Networking', href: '/solutions/ai-networking' }
  },
  {
    keywords: ['security', 'cybersecurity', 'quantum', 'pqc', 'cbom', 'guardrail', 'prompt injection', 'jailbreak', 'soc', 'zero-trust', 'ml-kem', 'ml-dsa'],
    offering: 'AI Cybersecurity & Quantum-Safe Networking',
    response: 'TRUSTGRID.AI provides comprehensive security protecting autonomous agents with zero-trust permissions and real-time prompt firewalls, while migrating enterprise infrastructure to NIST Post-Quantum Cryptography standards (ML-KEM/ML-DSA) with automated Cryptographic Bill of Materials (CBOM).',
    followUpQuestion: 'Has your security team established a Cryptographic Bill of Materials (CBOM) for post-quantum readiness?',
    pageLink: { label: 'Explore AI Cybersecurity Solutions', href: '/solutions/ai-cybersecurity' }
  },
  {
    keywords: ['trust', 'trusted', 'explainability', 'shap', 'lime', 'eu ai act', 'nist', 'governance', 'compliance', 'audit', 'iso 42001', 'black box', 'hallucination'],
    offering: 'Trusted AI Engineering',
    response: 'TRUSTGRID.AI turns non-deterministic AI into mathematically explainable, auditable enterprise systems using SHAP/LIME explainability, continuous Statistical Process Control (SPC), and immutable cryptographic audit logging compliant with the EU AI Act and NIST AI RMF.',
    followUpQuestion: 'Which regulatory framework is your primary compliance target (e.g., EU AI Act, NIST AI RMF, ISO 42001)?',
    pageLink: { label: 'Explore Trusted AI Framework', href: '/solutions/trusted-ai' }
  },
  {
    keywords: ['value', 'roi', 'finops', 'cost', 'economics', 'token', 'p&l', 'business case', 'lean', 'toc', 'theory of constraints', 'dmaic'],
    offering: 'AI Value Engineering & Acceleration',
    response: 'TRUSTGRID.AI combines industrial operational excellence (Lean Thinking, Theory of Constraints, DMAIC) with granular AI FinOps unit economics to prioritize high-yield initiatives and deliver 3–10x verified ROI in 90-day sprints.',
    followUpQuestion: 'Are you looking to optimize token inference costs, reduce GPU idle time, or establish unit economics?',
    pageLink: { label: 'Explore AI Value Engineering', href: '/solutions/ai-value-engineering' }
  },
  {
    keywords: ['diagnostic', 'assessment', 'audit', 'evaluate', 'benchmark', 'readiness'],
    offering: 'Executive AI Diagnostic',
    response: 'The TRUSTGRID.AI Executive Diagnostic is a structured 2–4 week technical and financial evaluation conducted by senior AI architects. We evaluate compute economics, multi-agent readiness, lossless networking, and quantum security to build a sequenced 90-day production roadmap.',
    followUpQuestion: 'Would you like to start the Executive Diagnostic scoping form for your organization?',
    pageLink: { label: 'Start Executive Diagnostic Form', href: '/book-ai-diagnostic' }
  },
  {
    keywords: ['contact', 'email', 'phone', 'whatsapp', 'reach out', 'call', 'office', 'headquarters', 'inquiry', 'message'],
    offering: 'Direct Contact & Advisory',
    response: 'You can connect directly with TRUSTGRID.AI through our official Contact page, book an Executive Strategy Session, or chat immediately with our advisory team on WhatsApp.',
    followUpQuestion: 'Would you prefer a direct callback from an architect or a WhatsApp conversation?',
    pageLink: { label: 'Go to Contact Page', href: '/contact' }
  },
  {
    keywords: ['methodology', 'oee', 'tpm', 'smed', 'fmea', 'spc', 'kaizen', 'six sigma', 'hoshin kanri', 'poka-yoke'],
    offering: 'Methodology Engine',
    response: 'TRUSTGRID.AI’s AI-Driven Methodology Engine applies proven industrial engineering frameworks (Lean, TOC, DMAIC, OEE, TPM, SMED, FMEA, SPC, Hoshin Kanri, Poka-Yoke) to optimize GPU compute throughput, prevent agent mistakes, and guarantee predictable P&L returns.',
    followUpQuestion: 'Which operational methodology are you looking to adapt for your AI workflows?',
    pageLink: { label: 'Explore Methodology Engine', href: '/methodology-engine' }
  },
  {
    keywords: ['industry', 'industries', 'banking', 'healthcare', 'defense', 'manufacturing', 'aerospace', 'energy', 'telecom'],
    offering: 'Regulated Industries',
    response: 'TRUSTGRID.AI delivers specialized pre-calibrated architectures across 20+ regulated global verticals including Banking & Sovereign Finance, Healthcare & Clinical AI, Aerospace & Defense, Industrial Manufacturing, Telecommunications, and Energy.',
    followUpQuestion: 'Which industry vertical is your organization operating in?',
    pageLink: { label: 'View Industry Architectures', href: '/industries' }
  },
  {
    keywords: ['pricing', 'cost', 'quote', 'proposal', 'hire', 'engagement', 'consult'],
    offering: 'Engagement & Advisory',
    response: 'TRUSTGRID.AI engagements range from Fixed-Scope AI Diagnostics (2–4 weeks) and 90-Day Rapid Value Sprints (12 weeks) to Turnkey Design & Build (16–32 weeks) and Enterprise Operating Partnerships. Would you like to connect with a principal architect to discuss your scope?',
    followUpQuestion: 'Would you like to schedule an Executive Strategy Session or submit an initial project scope?',
    pageLink: { label: 'Book Strategy Session', href: '/book-ai-diagnostic?type=strategy-session' }
  }
]

export function AIArchitectChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'bot',
      text: 'Hello, I am the TRUSTGRID.AI Architect Assistant. How can I assist you with evaluating, architecting, or scaling your enterprise AI infrastructure, autonomous agent fleets, or quantum-safe networks?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickActions: [
        { label: 'Book Strategy Session', action: 'book_strategy' },
        { label: 'Explore Solutions', action: 'solutions' },
        { label: 'AI Infrastructure', action: 'infra' },
        { label: 'Agentic Enterprise', action: 'agentic' },
        { label: 'AI Cybersecurity', action: 'cybersecurity' },
        { label: 'Contact Us', action: 'contact' }
      ]
    }
  ])
  const [inputVal, setInputVal] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // Conversational Lead Capture State
  const [leadMode, setLeadMode] = useState(false)
  const [leadStep, setLeadStep] = useState<'name' | 'email' | 'company' | 'phone' | 'done'>('name')
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    requirement: '',
    offering: ''
  })
  const [leadSubmitting, setLeadSubmitting] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatSessionIdRef = useRef<string>('')

  useEffect(() => {
    chatSessionIdRef.current = `CHAT-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`
  }, [])

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      setHasUnread(false)
    }
  }, [messages, isOpen])

  const toggleChat = () => {
    const nextState = !isOpen
    setIsOpen(nextState)
    if (nextState) {
      trackChatbotEvent('open', { chatSessionId: chatSessionIdRef.current })
      setHasUnread(false)
    } else {
      trackChatbotEvent('close', { chatSessionId: chatSessionIdRef.current })
    }
  }

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim()
    if (!text) return

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages((prev) => [...prev, userMsg])
    setInputVal('')
    setIsTyping(true)

    trackChatbotEvent('message_sent', {
      chatSessionId: chatSessionIdRef.current,
      elementText: text
    })

    // Process Bot Response after realistic architect thinking delay
    setTimeout(() => {
      processBotResponse(text)
      setIsTyping(false)
    }, 550)
  }

  const processBotResponse = (userInput: string) => {
    const lower = userInput.toLowerCase()

    // 1. High Intent Detection Check
    const highIntentKeywords = ['pricing', 'cost', 'quote', 'hire', 'talk to architect', 'contact', 'book', 'strategy', 'diagnostic', 'assessment', 'demo', 'proposal', 'implement', 'schedule']
    const isHighIntent = highIntentKeywords.some((k) => lower.includes(k))

    if (isHighIntent) {
      trackChatbotEvent('intent_detected', {
        chatSessionId: chatSessionIdRef.current,
        chatIntent: 'HIGH_INTENT_LEAD_QUALIFICATION',
        elementText: userInput
      })
    }

    // 2. Search TrustGrid Knowledge Base
    let bestMatch = trustgridKnowledge.find((item) =>
      item.keywords.some((k) => lower.includes(k))
    )

    let responseText = ''
    let offeringTag = bestMatch?.offering
    let pageLink = bestMatch?.pageLink
    let followUpQuestion = bestMatch?.followUpQuestion

    if (bestMatch) {
      responseText = bestMatch.response
    } else {
      responseText =
        'TRUSTGRID.AI is a specialized full-stack AI engineering operating company. We architect high-density GPU infrastructure, autonomous multi-agent fleets, lossless AI networking, quantum-safe cybersecurity, trusted explainability, and AI value engineering.'
      followUpQuestion = 'Which layer of your AI stack is your current priority: compute infrastructure, multi-agent workflows, networking, or security?'
      pageLink = { label: 'Explore All Enterprise Offerings', href: '/offerings' }
    }

    // 3. Propose Lead Connection for High-Intent or Offering Questions
    if (isHighIntent || bestMatch) {
      setLeadData((prev) => ({
        ...prev,
        requirement: userInput,
        offering: offeringTag || prev.offering || 'Enterprise AI Engineering'
      }))
    }

    const botMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      offeringTag,
      pageLink,
      followUpQuestion,
      quickActions: [
        { label: 'Book Strategy Session', action: 'book_strategy' },
        { label: 'Talk to an Architect', action: 'connect_architect' },
        { label: 'Book AI Diagnostic', action: 'diagnostic' },
        { label: 'Contact Us', action: 'contact' }
      ]
    }

    setMessages((prev) => [...prev, botMsg])
  }

  const handleQuickAction = (action: string) => {
    if (action === 'book_strategy') {
      window.location.href = '/book-ai-diagnostic?type=strategy-session'
    } else if (action === 'contact') {
      window.location.href = '/contact'
    } else if (action === 'diagnostic') {
      handleSendMessage('I would like to book an executive AI Diagnostic assessment.')
      startLeadFlow('AI Diagnostic')
    } else if (action === 'connect_architect') {
      handleSendMessage('I would like to speak directly with a TRUSTGRID.AI Systems Architect.')
      startLeadFlow('Architect Consultation')
    } else if (action === 'solutions') {
      handleSendMessage('Tell me about the 6 TRUSTGRID.AI solution groups.')
    } else if (action === 'infra') {
      handleSendMessage('Tell me about AI Infrastructure and GPU data center engineering.')
    } else if (action === 'agentic') {
      handleSendMessage('Tell me about Agentic Enterprise and multi-agent systems.')
    } else if (action === 'cybersecurity') {
      handleSendMessage('Tell me about AI Cybersecurity and Post-Quantum Cryptography.')
    }
  }

  const startLeadFlow = (intent: string) => {
    setLeadMode(true)
    setLeadStep('name')
    trackChatbotEvent('lead_flow_started', {
      chatSessionId: chatSessionIdRef.current,
      chatIntent: intent
    })
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!leadData.name || !leadData.name.trim()) {
      alert('Please enter your full name.')
      return
    }

    if (!leadData.email || !validateEmail(leadData.email)) {
      alert('Please enter a valid work email address.')
      return
    }

    if (!leadData.phone || !leadData.phone.trim()) {
      alert('Please provide your phone number for callback.')
      return
    }

    setLeadSubmitting(true)

    const res = await submitTrustGridForm({
      formId: 'form_chat_lead',
      formName: 'Chatbot Lead Capture',
      form_type: 'CHATBOT',
      name: leadData.name.trim() || 'Chatbot Visitor',
      email: leadData.email.trim(),
      company: leadData.company.trim() || 'Enterprise Organization',
      phone: leadData.phone.trim(),
      message: `Chatbot Inquiry: ${leadData.requirement || 'Requested consultation via AI Architect Chatbot'}`,
      selectedSolutions: [leadData.offering || 'Enterprise AI Architecture'],
      chatIntent: 'AI Architect Chatbot Lead',
      ctaSource: 'chatbot_modal'
    })

    setLeadSubmitting(false)

    if (res.success) {
      setLeadStep('done')
      const confirmationMsg: ChatMessage = {
        id: `bot-lead-conf-${Date.now()}`,
        sender: 'bot',
        text: `Thank you, ${leadData.name || 'there'}. Your consultation request has been registered (Ref: ${res.submissionId}). A senior TRUSTGRID.AI architect will review your specifications for ${leadData.company || 'your organization'} and reach out shortly.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages((prev) => [...prev, confirmationMsg])
      trackChatbotEvent('lead_flow_submitted', {
        chatSessionId: chatSessionIdRef.current,
        elementId: res.submissionId
      })
    }
  }

  return (
    <>
      {/* FLOATING LAUNCHER BUTTON */}
      <div className="chatbot-launcher-container" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
        {!isOpen && (
          <button
            onClick={toggleChat}
            className="chatbot-launcher-btn"
            aria-label="Talk to an AI Architect"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 20px',
              background: 'linear-gradient(135deg, #07143d 0%, #1d5cff 100%)',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '999px',
              boxShadow: '0 8px 30px rgba(7, 20, 61, 0.35)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '13.5px',
              transition: 'all 0.25s ease'
            }}
          >
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={19} />
              <span
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#22c55e',
                  borderRadius: '50%',
                  boxShadow: '0 0 8px #22c55e'
                }}
              />
            </div>
            <span>Talk to an AI Architect</span>
          </button>
        )}
      </div>

      {/* CHATBOT DRAWER / MODAL */}
      {isOpen && (
        <div
          className={`chatbot-modal ${isMinimized ? 'minimized' : ''}`}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: isMinimized ? '320px' : 'clamp(320px, 92vw, 420px)',
            height: isMinimized ? '56px' : 'clamp(480px, 80vh, 620px)',
            background: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 20px 50px rgba(7, 20, 61, 0.35)',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 99999,
            transition: 'height 0.25s ease, width 0.25s ease'
          }}
        >
          {/* HEADER */}
          <div
            style={{
              padding: '14px 18px',
              background: 'linear-gradient(135deg, #050d24 0%, #0d1e52 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(29, 92, 255, 0.3)',
                  border: '1px solid rgba(29, 92, 255, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#60a5fa'
                }}
              >
                <Bot size={18} />
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>TrustGrid AI Architect</span>
                  <span style={{ fontSize: '9px', background: '#1d5cff', padding: '1px 6px', borderRadius: '4px' }}>LIVE</span>
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                  Enterprise Engineering Assistant
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
                aria-label="Minimize"
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button
                onClick={toggleChat}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* MESSAGES CONTAINER */}
              <div
                style={{
                  flex: 1,
                  padding: '16px',
                  overflowY: 'auto',
                  background: '#f8fafc',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '100%'
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '88%',
                        padding: '12px 15px',
                        borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                        background: msg.sender === 'user' ? '#1d5cff' : '#ffffff',
                        color: msg.sender === 'user' ? '#ffffff' : '#09142e',
                        border: msg.sender === 'user' ? 'none' : '1px solid #e2e8f0',
                        fontSize: '13px',
                        lineHeight: 1.5,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                      }}
                    >
                      {msg.offeringTag && (
                        <div style={{ fontSize: '10px', fontWeight: 700, color: '#1d5cff', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {msg.offeringTag}
                        </div>
                      )}
                      <div>{msg.text}</div>

                      {msg.followUpQuestion && (
                        <div style={{
                          marginTop: '8px',
                          paddingTop: '8px',
                          borderTop: '1px dashed #cbd5e1',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: msg.sender === 'user' ? '#e0e7ff' : '#1d5cff'
                        }}>
                          💡 {msg.followUpQuestion}
                        </div>
                      )}

                      {msg.pageLink && (
                        <div style={{ marginTop: '10px' }}>
                          <Link
                            href={msg.pageLink.href}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              padding: '5px 10px',
                              background: msg.sender === 'user' ? 'rgba(255,255,255,0.2)' : '#eff6ff',
                              color: msg.sender === 'user' ? '#ffffff' : '#1d5cff',
                              border: msg.sender === 'user' ? '1px solid rgba(255,255,255,0.3)' : '1px solid #bfdbfe',
                              borderRadius: '6px',
                              fontSize: '11.5px',
                              fontWeight: 600,
                              textDecoration: 'none'
                            }}
                          >
                            <span>{msg.pageLink.label}</span>
                            <ArrowUpRight size={13} />
                          </Link>
                        </div>
                      )}
                    </div>

                    <span style={{ fontSize: '10px', color: '#94a3b8', marginTop: '3px', padding: '0 4px' }}>
                      {msg.timestamp}
                    </span>

                    {/* QUICK ACTION BUTTONS */}
                    {msg.quickActions && msg.sender === 'bot' && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                        {msg.quickActions.map((qa, i) => (
                          <button
                            key={i}
                            onClick={() => handleQuickAction(qa.action)}
                            style={{
                              padding: '5px 10px',
                              background: '#ffffff',
                              border: '1px solid #cbd5e1',
                              borderRadius: '999px',
                              fontSize: '11px',
                              fontWeight: 600,
                              color: '#1e293b',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <span>{qa.label}</span>
                            <ChevronRight size={11} className="opacity-50" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 14px', background: '#ffffff', borderRadius: '12px', width: 'fit-content', border: '1px solid #e2e8f0' }}>
                    <Loader2 size={13} className="animate-spin text-blue-600" />
                    <span style={{ fontSize: '12px', color: '#64748b' }}>AI Architect analyzing...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* CONVERSATIONAL LEAD CAPTURE INLINE MODAL */}
              {leadMode && leadStep !== 'done' && (
                <div style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#1d5cff', letterSpacing: '0.06em' }}>
                      CONNECT WITH A SENIOR ARCHITECT
                    </span>
                    <button
                      onClick={() => setLeadMode(false)}
                      style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '11px' }}
                    >
                      Dismiss
                    </button>
                  </div>

                  <form onSubmit={handleLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="Your Name *"
                        value={leadData.name}
                        onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                        required
                        style={{ padding: '8px 10px', fontSize: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                      />
                      <input
                        type="email"
                        placeholder="Work Email *"
                        value={leadData.email}
                        onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                        required
                        style={{ padding: '8px 10px', fontSize: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <input
                        type="tel"
                        placeholder="Phone / WhatsApp *"
                        value={leadData.phone}
                        onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                        required
                        style={{ padding: '8px 10px', fontSize: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                      />
                      <input
                        type="text"
                        placeholder="Company (Optional)"
                        value={leadData.company}
                        onChange={(e) => setLeadData({ ...leadData, company: e.target.value })}
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
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Request Architect Consultation</span>
                          <Send size={12} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* INPUT BAR */}
              <div
                style={{
                  padding: '10px 14px',
                  background: '#ffffff',
                  borderTop: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <input
                  type="text"
                  placeholder="Ask about AI infra, agents, network, or book diagnostic..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: '9px 12px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputVal.trim() || isTyping}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: inputVal.trim() ? '#1d5cff' : '#e2e8f0',
                    color: '#ffffff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: inputVal.trim() ? 'pointer' : 'default',
                    transition: 'background 0.2s ease'
                  }}
                  aria-label="Send"
                >
                  <Send size={15} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

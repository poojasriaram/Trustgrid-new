'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Phone, MessageCircle, X, ArrowUpRight, Sparkles } from 'lucide-react'
import { trackWhatsAppClick } from '@/lib/analytics'

interface WhatsAppCTAProps {
  customMessage?: string
  customNumber?: string
  position?: 'bottom-left' | 'bottom-right'
  inline?: boolean
  label?: string
}

// Configurable approved TrustGrid WhatsApp contact point
const DEFAULT_WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+15550192834'

function getContextualMessage(pathname: string): string {
  if (pathname.includes('/solutions/ai-infra-engineering')) {
    return 'Hi TrustGrid team, I would like to discuss high-density GPU infrastructure, liquid cooling, and data center engineering.'
  }
  if (pathname.includes('/solutions/ai-agentic-factory')) {
    return 'Hi TrustGrid team, I would like to discuss autonomous multi-agent systems and production AgentOps.'
  }
  if (pathname.includes('/solutions/ai-networking')) {
    return 'Hi TrustGrid team, I would like to evaluate low-latency InfiniBand and RoCEv2 AI network fabrics.'
  }
  if (pathname.includes('/solutions/ai-cybersecurity')) {
    return 'Hi TrustGrid team, I would like to assess our AI security posture and Post-Quantum Cryptography transition.'
  }
  if (pathname.includes('/solutions/trusted-ai')) {
    return 'Hi TrustGrid team, I would like to discuss explainability, EU AI Act compliance, and trusted AI governance.'
  }
  if (pathname.includes('/solutions/ai-value-engineering')) {
    return 'Hi TrustGrid team, I would like to discuss AI FinOps unit economics and value acceleration.'
  }
  if (pathname.includes('/book-ai-diagnostic') || pathname.includes('/ai-diagnostic')) {
    return 'Hi TrustGrid team, I would like to schedule an Executive AI Diagnostic session.'
  }
  if (pathname.includes('/industries')) {
    return 'Hi TrustGrid team, I would like to discuss specialized enterprise AI architectures for our industry vertical.'
  }
  return 'Hi TrustGrid team, I would like to discuss an enterprise AI engineering requirement.'
}

export function WhatsAppCTA({
  customMessage,
  customNumber,
  position = 'bottom-left',
  inline = false,
  label = 'Chat with TRUSTGRID.AI'
}: WhatsAppCTAProps) {
  const pathname = usePathname()
  const [showTooltip, setShowTooltip] = useState(false)

  const phoneNumber = (customNumber || DEFAULT_WHATSAPP_NUMBER).replace(/[^0-9]/g, '')
  const rawMessage = customMessage || getContextualMessage(pathname || '/')
  const encodedMessage = encodeURIComponent(rawMessage)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  const handleClick = (source: string) => {
    trackWhatsAppClick(source, position, rawMessage)
  }

  if (inline) {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleClick('inline_cta')}
        className="whatsapp-inline-btn"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 18px',
          background: '#25D366',
          color: '#ffffff',
          borderRadius: '8px',
          fontWeight: 600,
          fontSize: '13px',
          textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)',
          transition: 'all 0.2s ease'
        }}
      >
        <MessageCircle size={17} />
        <span>{label}</span>
        <ArrowUpRight size={14} />
      </a>
    )
  }

  return (
    <div
      className="whatsapp-floating-container"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: position === 'bottom-left' ? '24px' : 'auto',
        right: position === 'bottom-right' ? '24px' : 'auto',
        zIndex: 9990
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* TOOLTIP ON HOVER */}
      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            bottom: '56px',
            left: '0',
            width: '260px',
            background: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            border: '1px solid #e2e8f0',
            padding: '12px 14px',
            fontSize: '12px',
            color: '#1e293b',
            lineHeight: 1.4,
            animation: 'fadeIn 0.2s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#15803d', marginBottom: '4px' }}>
            <MessageCircle size={14} />
            <span>Direct WhatsApp Advisory</span>
          </div>
          <p style={{ margin: 0, color: '#64748b' }}>
            Connect instantly with our executive AI advisory team for rapid technical consultation.
          </p>
        </div>
      )}

      {/* FLOATING ACTION BUTTON */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleClick('floating_widget')}
        aria-label="Chat with TRUSTGRID.AI on WhatsApp"
        className="tg-btn-shine tg-card-interactive"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 16px',
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          color: '#ffffff',
          borderRadius: '999px',
          boxShadow: '0 6px 20px rgba(37, 211, 102, 0.35)',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '12.5px',
          border: '1px solid rgba(255,255,255,0.35)',
        }}
      >
        <span style={{ position: 'relative', display: 'flex', height: '8px', width: '8px' }}>
          <span style={{ position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '999px', background: '#ffffff', opacity: 0.75, animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
          <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '999px', height: '8px', width: '8px', background: '#ffffff' }} />
        </span>
        <MessageCircle size={17} />
        <span>{label}</span>
      </a>
    </div>
  )
}

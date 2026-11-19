'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const AIArchitectChatbot = dynamic(
  () => import('@/components/ui/ai-architect-chatbot').then((mod) => mod.AIArchitectChatbot),
  { ssr: false }
)
const FloatingLeadForm = dynamic(
  () => import('@/components/ui/floating-lead-form').then((mod) => mod.FloatingLeadForm),
  { ssr: false }
)
const WhatsAppCTA = dynamic(
  () => import('@/components/ui/whatsapp-cta').then((mod) => mod.WhatsAppCTA),
  { ssr: false }
)
const PrivacyConsentBanner = dynamic(
  () => import('@/components/ui/privacy-consent-banner').then((mod) => mod.PrivacyConsentBanner),
  { ssr: false }
)

const STANDALONE_PORTAL_PREFIXES = [
  '/chat',
  '/chatbot',
  '/booking',
  '/book-session',
  '/session-request',
  '/quick-session',
  '/request-session',
  '/forms',
  '/whatsapp',
  '/linkedin',
  '/linkedin-inbound',
  '/admin'
]

export function ClientOverlays() {
  const pathname = usePathname() || ''
  const [mounted, setMounted] = useState(false)

  const isStandalonePortal = STANDALONE_PORTAL_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted || isStandalonePortal) return null

  return (
    <>
      <FloatingLeadForm />
      <WhatsAppCTA />
      <AIArchitectChatbot />
      <PrivacyConsentBanner />
    </>
  )
}

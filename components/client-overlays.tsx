'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

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

export function ClientOverlays() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Delay mounting non-critical interactive overlays until after first meaningful paint
    const timer = setTimeout(() => {
      setMounted(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null

  return (
    <>
      <FloatingLeadForm />
      <WhatsAppCTA />
      <AIArchitectChatbot />
      <PrivacyConsentBanner />
    </>
  )
}

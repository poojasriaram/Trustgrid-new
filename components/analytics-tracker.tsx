'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  trackPageView,
  trackCTA,
  trackOutboundClick,
  initScrollTracking,
  getOrCreateSessionId
} from '@/lib/analytics'

function AnalyticsInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track Page Views on navigation change
  useEffect(() => {
    getOrCreateSessionId()
    trackPageView(pathname, document.title)
  }, [pathname, searchParams])

  // Track Scroll Depth milestones
  useEffect(() => {
    const cleanupScroll = initScrollTracking()
    return () => cleanupScroll()
  }, [pathname])

  // Global Delegated Click Listener for CTAs, Navigation, and Outbound links
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement)?.closest('a, button') as HTMLElement | null
      if (!target) return

      const text = (target.textContent || '').trim()
      const href = (target as HTMLAnchorElement).href || target.getAttribute('href') || ''
      const isButton = target.tagName === 'BUTTON'

      // 1. Outbound / Protocol Links
      if (href && (href.startsWith('http') && !href.includes(window.location.hostname))) {
        trackOutboundClick(href, text)
      } else if (href && (href.startsWith('mailto:') || href.startsWith('tel:'))) {
        trackOutboundClick(href, text)
      }

      // 2. Important CTA Tracking
      const ctaKeywords = [
        'diagnostic', 'book', 'explore', 'contact', 'proposal',
        'architect', 'whitepaper', 'get started', 'apply', 'subscribe', 'launch'
      ]

      const textLower = text.toLowerCase()
      const isCTA = isButton || target.classList.contains('button') || target.classList.contains('nav-cta') || ctaKeywords.some(k => textLower.includes(k))

      if (isCTA && text) {
        trackCTA(text, href, pathname)
      }
    }

    document.addEventListener('click', handleGlobalClick, { capture: true })
    return () => document.removeEventListener('click', handleGlobalClick, { capture: true })
  }, [pathname])

  return null
}

export function AnalyticsTracker() {
  return (
    <Suspense fallback={null}>
      <AnalyticsInner />
    </Suspense>
  )
}

'use client'

import { useEffect, Suspense, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  trackPageView,
  trackClickEvent,
  trackCTA,
  trackOutboundClick,
  trackVisibilityState,
  trackCopyEvent,
  trackPasteEvent,
  initScrollTracking,
  getOrCreateSessionId,
  getOrCreateUserId
} from '@/lib/analytics'

function AnalyticsInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastTrackedUrlRef = useRef<string>('')
  const lastActivityTimeRef = useRef<number>(Date.now())

  // Check and enforce 30-minute session inactivity timeout
  const checkSessionTimeout = () => {
    if (typeof window === 'undefined') return
    const now = Date.now()
    const lastActive = parseInt(sessionStorage.getItem('tg_last_active_time') || '0', 10)
    if (lastActive && now - lastActive > 30 * 60 * 1000) {
      // 30 min timeout exceeded: start new session
      sessionStorage.removeItem('tg_session_id')
      sessionStorage.removeItem('tg_session_start')
    }
    sessionStorage.setItem('tg_last_active_time', String(now))
    lastActivityTimeRef.current = now
  }

  // Track Page Views on navigation change with deduplication
  useEffect(() => {
    checkSessionTimeout()
    getOrCreateUserId()
    getOrCreateSessionId()

    const currentUrl = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`
    if (lastTrackedUrlRef.current !== currentUrl) {
      lastTrackedUrlRef.current = currentUrl
      trackPageView(pathname, typeof document !== 'undefined' ? document.title : '')
    }
  }, [pathname, searchParams])

  // Track Exit Page and Session End on window unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        const sid = sessionStorage.getItem('tg_session_id')
        const uid = localStorage.getItem('tg_user_id')
        if (sid && uid && navigator.sendBeacon) {
          const payload = JSON.stringify({
            event_name: 'session_end',
            session_id: sid,
            user_id: uid,
            page_path: pathname,
            page_title: document.title,
            dwell_time_sec: Math.round((Date.now() - lastActivityTimeRef.current) / 1000)
          })
          const blob = new Blob([payload], { type: 'application/json' })
          navigator.sendBeacon('/api/analytics/events', blob)
        }
      } catch (e) {}
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [pathname])

  // Track Scroll Depth milestones
  useEffect(() => {
    const cleanupScroll = initScrollTracking()
    return () => cleanupScroll()
  }, [pathname])

  // Track Visibility Changes (Tab Active / Hidden)
  useEffect(() => {
    const handleVisibilityChange = () => {
      const state = document.hidden ? 'hidden' : 'visible'
      trackVisibilityState(state)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // Track Copy & Paste Events
  useEffect(() => {
    const handleCopy = () => {
      const selection = window.getSelection()?.toString() || ''
      if (selection.trim()) {
        trackCopyEvent(selection.trim())
      }
    }

    const handlePaste = () => {
      trackPasteEvent()
    }

    document.addEventListener('copy', handleCopy)
    document.addEventListener('paste', handlePaste)
    return () => {
      document.removeEventListener('copy', handleCopy)
      document.removeEventListener('paste', handlePaste)
    }
  }, [])

  // Global Delegated Click Listener with Rage Click & Coordinate Tracking
  useEffect(() => {
    const clickHistory: Array<{ x: number; y: number; time: number }> = []

    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target) return

      const clickX = event.clientX
      const clickY = event.clientY
      const now = Date.now()

      // 1. Rage Click Detection: >= 3 clicks within 500ms within a 35px radius
      clickHistory.push({ x: clickX, y: clickY, time: now })
      while (clickHistory.length > 0 && now - clickHistory[0].time > 600) {
        clickHistory.shift()
      }

      let isRageClick = false
      if (clickHistory.length >= 3) {
        const first = clickHistory[0]
        const distance = Math.hypot(clickX - first.x, clickY - first.y)
        if (distance < 40) {
          isRageClick = true
          clickHistory.length = 0 // Reset after rage click detected
        }
      }

      // Track granular click with coordinates
      trackClickEvent(target, clickX, clickY, isRageClick)

      // 2. Interactive Element Specifics (Links, Buttons, CTAs)
      const interactiveEl = target.closest('a, button') as HTMLElement | null
      if (interactiveEl) {
        const text = (interactiveEl.textContent || '').trim()
        const href = (interactiveEl as HTMLAnchorElement).href || interactiveEl.getAttribute('href') || ''
        const isButton = interactiveEl.tagName === 'BUTTON'

        // Outbound links
        if (href && href.startsWith('http') && !href.includes(window.location.hostname)) {
          trackOutboundClick(href, text)
        } else if (href && (href.startsWith('mailto:') || href.startsWith('tel:'))) {
          trackOutboundClick(href, text)
        }

        // CTAs
        const ctaKeywords = [
          'diagnostic', 'book', 'explore', 'contact', 'proposal',
          'architect', 'whitepaper', 'get started', 'apply', 'subscribe', 'launch',
          'demo', 'schedule', 'audit'
        ]
        const textLower = text.toLowerCase()
        const isCTA = isButton || interactiveEl.classList.contains('button') || interactiveEl.classList.contains('nav-cta') || ctaKeywords.some(k => textLower.includes(k))

        if (isCTA && text) {
          trackCTA(text, href, pathname)
        }
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

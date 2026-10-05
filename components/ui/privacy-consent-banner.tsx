'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShieldCheck, Lock, Check, X, SlidersHorizontal } from 'lucide-react'
import { getOrCreateUserId } from '@/lib/analytics'

export function PrivacyConsentBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true)
  const [marketingEnabled, setMarketingEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Honor Global Privacy Control or DNT automatically
    const nav = navigator as any
    const gpc = nav.globalPrivacyControl === true
    const dnt = nav.doNotTrack === '1'

    const storedConsent = localStorage.getItem('trustgrid_cookie_consent')
    if (!storedConsent) {
      if (gpc || dnt) {
        localStorage.setItem('trustgrid_cookie_consent', 'denied')
        syncConsentToServer('denied', false, false)
      } else {
        // Show banner after short delay for smooth page entrance
        const timer = setTimeout(() => setIsVisible(true), 1200)
        return () => clearTimeout(timer)
      }
    }
  }, [])

  const syncConsentToServer = async (
    status: 'granted' | 'denied' | 'customized',
    analytics: boolean,
    marketing: boolean
  ) => {
    try {
      const uid = getOrCreateUserId()
      await fetch('/api/analytics/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: uid,
          consentStatus: status,
          analyticsAllowed: analytics,
          marketingAllowed: marketing
        })
      })
    } catch (e) {}
  }

  const handleAcceptAll = () => {
    localStorage.setItem('trustgrid_cookie_consent', 'granted')
    syncConsentToServer('granted', true, true)
    setIsVisible(false)
  }

  const handleRejectNonEssential = () => {
    localStorage.setItem('trustgrid_cookie_consent', 'denied')
    syncConsentToServer('denied', false, false)
    setIsVisible(false)
  }

  const handleSaveCustom = () => {
    const status = analyticsEnabled ? 'granted' : 'denied'
    localStorage.setItem('trustgrid_cookie_consent', status)
    syncConsentToServer('customized', analyticsEnabled, marketingEnabled)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <aside
      role="region"
      aria-label="Privacy and Cookie Consent"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-lg z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="rounded-2xl border border-cyan-500/20 bg-slate-950/95 p-5 shadow-2xl backdrop-blur-xl text-slate-200 text-xs">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="space-y-1.5 flex-1">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              Privacy & Intelligence Forensics
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                SOC2 / GDPR
              </span>
            </h2>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              TRUSTGRID.AI records privacy-preserving session telemetry and network intelligence to optimize enterprise latency, prevent infrastructure abuse, and evaluate commercial intent. We never sell personal data or track exact physical coordinates. Read our{' '}
              <Link href="/privacy-policy" className="text-cyan-400 hover:text-cyan-300 underline font-medium">
                Privacy Notice
              </Link>.
            </p>

            {showPreferences && (
              <div className="mt-3 space-y-2 border-t border-slate-800 pt-3">
                <div className="flex items-center justify-between py-1">
                  <div>
                    <span className="font-semibold text-slate-200">Strictly Necessary</span>
                    <p className="text-[10px] text-slate-500">Security tokens, rate limiting & infrastructure safety</p>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-900/50">
                    Always Active
                  </span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <div>
                    <span className="font-semibold text-slate-200">Performance & Analytics</span>
                    <p className="text-[10px] text-slate-500">Session flow, dwell time & approximate regional traffic</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                    className={`h-5 w-9 rounded-full transition-colors relative flex items-center p-0.5 ${
                      analyticsEnabled ? 'bg-cyan-500 justify-end' : 'bg-slate-800 justify-start'
                    }`}
                  >
                    <div className="h-4 w-4 rounded-full bg-white shadow-sm" />
                  </button>
                </div>

                <div className="flex items-center justify-between py-1">
                  <div>
                    <span className="font-semibold text-slate-200">Campaign Attribution</span>
                    <p className="text-[10px] text-slate-500">UTM tracking & B2B lead attribution</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMarketingEnabled(!marketingEnabled)}
                    className={`h-5 w-9 rounded-full transition-colors relative flex items-center p-0.5 ${
                      marketingEnabled ? 'bg-cyan-500 justify-end' : 'bg-slate-800 justify-start'
                    }`}
                  >
                    <div className="h-4 w-4 rounded-full bg-white shadow-sm" />
                  </button>
                </div>
              </div>
            )}

            <div className="pt-3 flex flex-wrap items-center gap-2">
              {!showPreferences ? (
                <>
                  <button
                    onClick={handleAcceptAll}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-colors text-xs flex items-center gap-1 shadow-md shadow-cyan-900/30"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Accept All
                  </button>
                  <button
                    onClick={handleRejectNonEssential}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors text-xs"
                  >
                    Reject Non-Essential
                  </button>
                  <button
                    onClick={() => setShowPreferences(true)}
                    className="px-2.5 py-1.5 rounded-lg hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 transition-colors text-xs flex items-center gap-1 ml-auto"
                  >
                    <SlidersHorizontal className="h-3 w-3" />
                    Customize
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSaveCustom}
                    className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-colors text-xs flex items-center gap-1"
                  >
                    Save Preferences
                  </button>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors text-xs ml-auto"
                  >
                    Back
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

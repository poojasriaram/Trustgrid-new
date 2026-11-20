'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, MessageCircle, X } from 'lucide-react'
import { ConversionCTA } from '@/components/ui/conversion-cta'
import { trackWhatsAppClick } from '@/lib/analytics'

export function MobileStickyCTA() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  // Pages where sticky CTA should NOT appear (forms already full screen)
  const isExcludedPage =
    pathname.startsWith('/book-ai-diagnostic') ||
    pathname.startsWith('/contact') ||
    pathname.startsWith('/talk-to-ai-architect') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/analytics')

  useEffect(() => {
    if (isExcludedPage || dismissed) {
      setVisible(false)
      return
    }

    const handleScroll = () => {
      // Appear after 350px scroll, hide near bottom/footer
      const scrollY = window.scrollY || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight

      const nearBottom = scrollY + winHeight > docHeight - 350
      if (scrollY > 350 && !nearBottom) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isExcludedPage, dismissed])

  if (isExcludedPage || dismissed || !visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-2.5 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] md:hidden flex items-center justify-between gap-2 animate-in slide-in-from-bottom duration-200"
      aria-label="Mobile Quick Conversion Bar"
    >
      <div className="flex-1 flex items-center gap-2">
        <ConversionCTA
          ctaName="Book a Consultation"
          href="/book-ai-diagnostic#diagnostic-form-section"
          variant="primary"
          size="sm"
          ctaPosition="Middle"
          ctaType="Primary"
          className="flex-1 justify-center text-xs py-2 h-10 font-bold"
        />

        <a
          href="https://wa.me/919513088612?text=Hi%20TrustGrid%20team%2C%20I%20would%20like%20to%20discuss%20an%20enterprise%20AI%20requirement."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-3 h-10 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shrink-0"
          onClick={() => {
            if (typeof window !== 'undefined') {
              trackWhatsAppClick('mobile_sticky_cta', 'sticky_bar', 'Mobile Sticky WhatsApp')
            }
          }}
          aria-label="Contact on WhatsApp"
        >
          <MessageCircle size={15} />
          <span>WhatsApp</span>
        </a>
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 shrink-0"
        aria-label="Close sticky conversion bar"
      >
        <X size={15} />
      </button>
    </div>
  )
}

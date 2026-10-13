'use client'

import Link from 'next/link'
import { ArrowUpRight, Sparkles, MessageSquare, ArrowRight } from 'lucide-react'

interface BlogCtaProps {
  badge?: string
  title: string
  description: string
  buttonText?: string
  buttonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
}

export function BlogCta({
  badge = 'ENTERPRISE AI ARCHITECTURE CONSULTATION',
  title,
  description,
  buttonText = 'Book AI Diagnostic Session',
  buttonHref = '/book-ai-diagnostic#diagnostic-form-section',
  secondaryButtonText = 'Talk to Senior Architect',
  secondaryButtonHref = '/talk-to-ai-architect'
}: BlogCtaProps) {
  return (
    <section className="tg-blog-cta-wrapper" aria-label="Architecture Consultation CTA">
      <div className="tg-blog-cta-card">
        <div className="tg-cta-glow-effect" />
        
        <div className="tg-blog-cta-content">
          <div className="tg-cta-badge-row">
            <span className="tg-cta-badge">
              <Sparkles size={13} className="text-blue-400" />
              <span>{badge}</span>
            </span>
            <span className="tg-cta-sla-chip">
              Verified Turnkey SLA • Non-Disclosure Guaranteed
            </span>
          </div>

          <h3 className="tg-cta-title">{title}</h3>
          
          <p className="tg-cta-desc">{description}</p>

          <div className="tg-cta-buttons-row">
            <Link
              href={buttonHref}
              className="button button-primary tg-cta-btn-main"
            >
              <span>{buttonText}</span>
              <ArrowUpRight size={16} />
            </Link>

            {secondaryButtonText && (
              <Link
                href={secondaryButtonHref}
                className="button button-ghost tg-cta-btn-ghost"
              >
                <MessageSquare size={15} />
                <span>{secondaryButtonText}</span>
              </Link>
            )}

            <Link
              href="/contact"
              className="tg-cta-tertiary-link"
            >
              <span>Direct Enterprise Inquiries</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

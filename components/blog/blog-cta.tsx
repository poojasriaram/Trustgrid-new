'use client'

import Link from 'next/link'
import { Sparkles, MessageSquare } from 'lucide-react'
import { ConversionCTA } from '@/components/ui/conversion-cta'

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
  buttonText = 'Discuss This AI Architecture',
  buttonHref = '/book',
  secondaryButtonText = 'Explore Related Solutions',
  secondaryButtonHref = '/solutions'
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
            <ConversionCTA
              ctaName={buttonText}
              href={buttonHref}
              variant="primary"
              ctaPosition="Middle"
              ctaType="Primary"
              className="tg-cta-btn-main"
            />

            {secondaryButtonText && (
              <ConversionCTA
                ctaName={secondaryButtonText}
                href={secondaryButtonHref}
                variant="ghost"
                ctaPosition="Middle"
                ctaType="Secondary"
                className="tg-cta-btn-ghost"
              />
            )}

            <ConversionCTA
              ctaName="Talk to Our Engineering Team"
              href="/talk-to-ai-architect"
              variant="text"
              ctaPosition="Middle"
              ctaType="Tertiary"
              className="tg-cta-tertiary-link"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

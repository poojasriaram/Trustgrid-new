import React from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  LucideIcon
} from 'lucide-react'
import { HeroCanvas } from '@/components/ui/hero-canvas'

export interface PageBannerHeroProps {
  badge: string
  badgeTag?: string
  title: string
  titleHighlight?: string
  description: string
  thesisHighlight?: string
  image: string
  primaryCta?: {
    label?: string
    text?: string
    href: string
  }
  secondaryCta?: {
    label?: string
    text?: string
    href: string
    isExternal?: boolean
  }
  tertiaryCta?: {
    label?: string
    text?: string
    href: string
  }
  quickNavItems?: Array<{
    label: string
    href: string
  }>
  metrics?: {
    statValue: string
    statLabel: string
    icon?: LucideIcon | React.ComponentType<{ size?: number; className?: string }>
    features?: string[]
  }
}

export function PageBannerHero({
  badge,
  badgeTag,
  title,
  titleHighlight,
  description,
  thesisHighlight,
  image,
  primaryCta = { text: 'Book AI Diagnostic', href: '/book-ai-diagnostic' },
  secondaryCta,
  tertiaryCta = { text: 'Talk to an Architect', href: '/contact' },
  quickNavItems,
  metrics
}: PageBannerHeroProps) {
  const StatIcon = metrics?.icon || Sparkles
  const primaryText = primaryCta?.label || primaryCta?.text || 'Book AI Diagnostic'
  const secondaryText = secondaryCta?.label || secondaryCta?.text || 'Explore Offerings'
  const tertiaryText = tertiaryCta?.label || tertiaryCta?.text || 'Talk to an Architect'


  return (
    <section className="hero hero-slider-section page-banner-standard-hero" id="top">
      {/* Background Banner Image Backdrop */}
      <div className="hero-banner-image-backdrop">
        <img
          src={image}
          alt={title}
          className="hero-banner-img"
        />
        <div className="hero-banner-overlay" />
      </div>

      <HeroCanvas />
      <div className="hero-grid-bg" />
      <div className="hero-glow-sphere" />

      {/* Main Dual-Column Content Layout */}
      <div className="hero-main-layout">
        {/* Left Column: Typography & CTAs */}
        <div className="hero-content">
          <div className="hero-badge-row">
            <span className="hero-badge">
              <span className="hero-pulse-dot" />
              {badge}
            </span>
            {badgeTag && <span className="hero-badge-tag">{badgeTag}</span>}
          </div>

          <h1 className="hero-title">
            {title} {titleHighlight && <em>{titleHighlight}</em>}
          </h1>

          <p className="hero-copy">
            {description}
          </p>

          {thesisHighlight && (
            <div className="hero-thesis-pill">
              <div className="thesis-icon-box">
                <Sparkles size={16} />
              </div>
              <span>
                <strong>{thesisHighlight.includes(':') ? thesisHighlight.split(':')[0] + ': ' : 'Core Focus: '}</strong>
                {thesisHighlight.includes(':') ? thesisHighlight.substring(thesisHighlight.indexOf(':') + 1).trim() : thesisHighlight}
              </span>
            </div>
          )}

          <div className="hero-actions">
            {primaryCta && (
              <Link className="button button-primary hero-btn-main" href={primaryCta.href}>
                <span>{primaryText}</span>
                <ArrowUpRight size={17} />
              </Link>
            )}
            {secondaryCta && (
              secondaryCta.isExternal ? (
                <a
                  className="button button-ghost"
                  href={secondaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{secondaryText}</span>
                  <ArrowUpRight size={17} />
                </a>
              ) : (
                <Link className="button button-ghost" href={secondaryCta.href}>
                  <span>{secondaryText}</span>
                  <ArrowRight size={17} />
                </Link>
              )
            )}
            {tertiaryCta && (
              <Link className="text-link" href={tertiaryCta.href}>
                <span>{tertiaryText}</span>
                <ArrowRight size={15} />
              </Link>
            )}
          </div>

          {/* Optional Quick Navigation Pills */}
          {quickNavItems && quickNavItems.length > 0 && (
            <div className="page-banner-quick-nav">
              {quickNavItems.map((item, idx) => (
                <Link key={idx} href={item.href} className="quick-nav-pill">
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: High-Impact Showcase Frame */}
        {metrics && (
          <div className="hero-aside-banner-card" aria-label="Page Domain Showcase">
            <div className="banner-card-frame">
              {/* Featured Visual */}
              <div className="banner-card-image-wrap">
                <img
                  src={image}
                  alt={title}
                  className="banner-card-img"
                />
                <div className="banner-card-glow-overlay" />
                <div className="banner-card-scanline" />
              </div>

              {/* Top Live Domain Status Chip */}
              <div className="banner-card-top-chip">
                <div className="banner-chip-pulse">
                  <span className="live-pulse" />
                  <span>VERIFIED ARCHITECTURE</span>
                </div>
                {badgeTag && <span className="banner-chip-domain">{badgeTag}</span>}
              </div>

              {/* Key Features Overlaid */}
              {metrics.features && metrics.features.length > 0 && (
                <div className="banner-card-capabilities-stack">
                  {metrics.features.map((feat, i) => (
                    <div key={i} className="banner-capability-pill">
                      <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Bottom Metric Footer */}
              <div className="banner-card-footer">
                <div className="banner-footer-stat-group">
                  <div className="banner-footer-stat-value">
                    <StatIcon size={20} className="banner-stat-icon" />
                    <span>{metrics.statValue}</span>
                  </div>
                  <span className="banner-footer-stat-label">{metrics.statLabel}</span>
                </div>

                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className="banner-footer-action-btn"
                    aria-label={`Initiate ${title}`}
                  >
                    <span>Initiate</span>
                    <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </div>

            <div className="banner-card-sub-telemetry">
              <span className="sub-telemetry-item">VERIFIABLE</span>
              <span className="sub-telemetry-dot">•</span>
              <span className="sub-telemetry-item">AUTONOMOUS</span>
              <span className="sub-telemetry-dot">•</span>
              <span className="sub-telemetry-item">PRODUCTION-GRADE</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

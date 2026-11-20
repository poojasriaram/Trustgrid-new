'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight, LucideIcon } from 'lucide-react'
import { trackCTA, trackCTAView } from '@/lib/analytics'
import { getExperimentVariant } from '@/lib/ab-testing'

export interface ConversionCTAProps {
  ctaName: string
  href: string
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'light' | 'text'
  size?: 'sm' | 'md' | 'lg' | 'full'
  ctaType?: 'Primary' | 'Secondary' | 'Tertiary'
  ctaPosition?: 'Header' | 'Hero' | 'Middle' | 'Footer' | 'Section' | 'Card' | 'MobileDrawer'
  experimentId?: string
  icon?: LucideIcon
  hideIcon?: boolean
  supportingText?: string
  className?: string
  style?: React.CSSProperties
  target?: string
  rel?: string
  onClick?: () => void
  children?: React.ReactNode
}

export function ConversionCTA({
  ctaName,
  href,
  variant = 'primary',
  size = 'md',
  ctaType = 'Primary',
  ctaPosition = 'Section',
  experimentId,
  icon: CustomIcon,
  hideIcon = false,
  supportingText,
  className = '',
  style,
  target,
  rel,
  onClick,
  children
}: ConversionCTAProps) {
  const [activeText, setActiveText] = useState(ctaName)
  const [activeHref, setActiveHref] = useState(href)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  // A/B Experiment Assignment
  useEffect(() => {
    if (experimentId) {
      const expVariant = getExperimentVariant(experimentId)
      if (expVariant) {
        if (expVariant.ctaText) setActiveText(expVariant.ctaText)
        if (expVariant.href) setActiveHref(expVariant.href)
      }
    }
  }, [experimentId])

  // Impression (cta_view) Intersection Observer
  useEffect(() => {
    const el = ctaRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackCTAView(activeText, ctaPosition, ctaType)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [activeText, ctaPosition, ctaType])

  const handleClick = () => {
    trackCTA(activeText, activeHref, ctaPosition, undefined, ctaType, ctaPosition)
    if (onClick) onClick()
  }

  // Determine button class mapping
  let variantClass = 'button button-primary'
  if (variant === 'secondary') variantClass = 'button button-secondary'
  else if (variant === 'ghost') variantClass = 'button button-ghost'
  else if (variant === 'light') variantClass = 'button button-light'
  else if (variant === 'text') variantClass = 'text-link'
  else if (variant === 'tertiary') variantClass = 'button button-ghost'

  let sizeClass = ''
  if (size === 'sm') sizeClass = 'button-sm'
  else if (size === 'lg') sizeClass = 'button-lg'
  else if (size === 'full') sizeClass = 'button-full'

  const DefaultIcon = variant === 'primary' || activeHref.startsWith('http') || activeHref.includes('#')
    ? ArrowUpRight
    : ArrowRight
  const IconComponent = CustomIcon || DefaultIcon

  return (
    <div className={`inline-flex flex-col ${size === 'full' ? 'w-full' : ''}`}>
      <Link
        ref={ctaRef}
        href={activeHref}
        className={`${variantClass} ${sizeClass} ${className}`.trim()}
        style={style}
        target={target}
        rel={rel}
        onClick={handleClick}
        aria-label={activeText}
      >
        <span>{children || activeText}</span>
        {!hideIcon && <IconComponent size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} className="shrink-0" />}
      </Link>
      {supportingText && (
        <span className="text-[11.5px] text-slate-500 mt-1.5 font-normal tracking-normal text-left">
          {supportingText}
        </span>
      )}
    </div>
  )
}

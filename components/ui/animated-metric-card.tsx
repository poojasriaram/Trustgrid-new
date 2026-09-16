'use client'

import React, { useState, useEffect, useRef } from 'react'

interface AnimatedMetricCardProps {
  val: string
  label: string
  desc: string
  prefix?: string
  suffix?: string
}

export function AnimatedMetricCard({ val, label, desc, prefix = '', suffix = '' }: AnimatedMetricCardProps) {
  const [inView, setInView] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`hero-footer-item metric-counter-card animated-card ${inView ? 'metric-revealed' : ''}`}
    >
      <span className="card-corner-tl" />
      <span className="card-corner-br" />
      <div className="metric-val-wrap">
        <span className="footer-stat metric-number">
          {prefix}{val}{suffix}
        </span>
      </div>
      <span className="footer-label metric-label">{label}</span>
      <span className="metric-desc-text">{desc}</span>
    </div>
  )
}

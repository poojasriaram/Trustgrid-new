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
  const [displayVal, setDisplayVal] = useState<string>(val)
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

  // 21st.dev Smooth Eased Count-Up Effect
  useEffect(() => {
    if (!inView) return

    // Extract first continuous numeric match
    const match = val.match(/(\d+)/)
    if (!match) {
      setDisplayVal(val)
      return
    }

    const targetNum = parseInt(match[1], 10)
    if (isNaN(targetNum)) return

    const duration = 1200 // 1.2s smooth count
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentVal = Math.round(targetNum * easeOut)

      setDisplayVal(val.replace(match[1], currentVal.toString()))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayVal(val)
      }
    }

    requestAnimationFrame(animate)
  }, [inView, val])

  return (
    <div
      ref={cardRef}
      className={`hero-footer-item metric-counter-card tg-card-interactive tg-glow-subtle animated-card ${
        inView ? 'metric-revealed' : ''
      }`}
      style={{
        boxSizing: 'border-box',
        height: '100%',
      }}
    >
      <span className="card-corner-tl" />
      <span className="card-corner-br" />
      <div className="metric-val-wrap">
        <span className="footer-stat metric-number">
          {prefix}{displayVal}{suffix}
        </span>
      </div>
      <span className="footer-label metric-label">{label}</span>
      <span className="metric-desc-text">{desc}</span>
    </div>
  )
}

'use client'

import React from 'react'
import { LucideIcon, TrendingUp, CheckCircle2, ShieldCheck, Cpu, Zap, ArrowUpRight } from 'lucide-react'

export interface KPIMetric {
  value: string
  label: string
  context: string
  benchmark?: string
  icon?: LucideIcon
  badge?: string
}

interface KPIMetricCardProps {
  metric: KPIMetric
  className?: string
}

export function KPIMetricCard({ metric, className = '' }: KPIMetricCardProps) {
  const Icon = metric.icon || TrendingUp

  return (
    <div className={`metric-kpi-card animated-card reveal-up ${className}`} style={{
      background: '#ffffff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: '20px 22px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: 'var(--shadow-sm)',
      position: 'relative',
      transition: 'all 0.25s ease'
    }}>
      <span className="card-corner-tl" />
      <span className="card-corner-br" />

      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            background: 'rgba(29, 92, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--blue)'
          }}>
            <Icon size={17} />
          </div>

          {metric.badge && (
            <span style={{
              fontSize: '10.5px',
              fontWeight: 700,
              padding: '2px 8px',
              background: '#eff6ff',
              color: '#1d5cff',
              borderRadius: '999px',
              letterSpacing: '0.04em'
            }}>
              {metric.badge}
            </span>
          )}
        </div>

        <div style={{
          fontSize: 'clamp(26px, 3vw, 32px)',
          fontWeight: 800,
          color: 'var(--foreground)',
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          marginBottom: '4px'
        }}>
          {metric.value}
        </div>

        <div style={{
          fontSize: '13.5px',
          fontWeight: 700,
          color: '#1e293b',
          marginBottom: '8px'
        }}>
          {metric.label}
        </div>

        <p style={{
          fontSize: '12px',
          color: 'var(--ink-soft)',
          lineHeight: 1.45,
          margin: 0
        }}>
          {metric.context}
        </p>
      </div>

      {metric.benchmark && (
        <div style={{
          marginTop: '14px',
          paddingTop: '10px',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11px',
          color: '#64748b'
        }}>
          <CheckCircle2 size={12} className="text-blue-500 shrink-0" />
          <span>{metric.benchmark}</span>
        </div>
      )}
    </div>
  )
}

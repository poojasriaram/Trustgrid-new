'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  Check,
  Cpu,
  Bot,
  ShieldCheck,
  Lock,
  Network,
  Workflow,
  TrendingUp,
  LucideIcon
} from 'lucide-react'

export interface StackLayerItem {
  number: string
  title: string
  description: string
  slug: string
  icon?: LucideIcon
  image: string
  capabilities: string[]
  impactMetric: string
}

interface InteractiveOperatingStackProps {
  layers: StackLayerItem[]
}

const defaultIcons: Record<string, LucideIcon> = {
  '01': Cpu,
  '02': Bot,
  '03': ShieldCheck,
  '04': Lock,
  '05': Network,
  '06': Workflow,
  '07': TrendingUp
}

export function InteractiveOperatingStack({ layers }: InteractiveOperatingStackProps) {
  const [selectedLayer, setSelectedLayer] = useState<number>(0)
  const [isPaused, setIsPaused] = useState(false)

  const total = layers.length

  const nextLayer = useCallback(() => {
    setSelectedLayer((prev) => (prev + 1) % total)
  }, [total])

  // Autoplay cycle
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      nextLayer()
    }, 6000)
    return () => clearInterval(timer)
  }, [isPaused, nextLayer])

  const active = layers[selectedLayer] || layers[0]
  const ActiveIcon = active.icon || defaultIcons[active.number] || Cpu

  return (
    <div
      className="interactive-stack-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 2-Column Split Architecture */}
      <div className="stack-split-grid">
        {/* Left Column: Stack Layers Flow */}
        <div className="stack-layers-column" role="tablist" aria-label="Enterprise AI Architecture Layers">
          {layers.map((layer, idx) => {
            const isSelected = selectedLayer === idx
            const Icon = layer.icon || defaultIcons[layer.number || ''] || Cpu

            return (
              <div
                key={layer.title}
                className={`stack-flow-card animated-card ${isSelected ? 'layer-selected' : ''}`}
                onClick={() => setSelectedLayer(idx)}
                onMouseEnter={() => setSelectedLayer(idx)}
                role="tab"
                aria-selected={isSelected}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedLayer(idx)
                  }
                }}
              >
                <span className="card-corner-tl" />
                <span className="card-corner-br" />

                <div className="stack-card-inner">
                  <div className="stack-layer-badge">
                    <Icon size={16} className={isSelected ? 'text-blue-500' : 'text-slate-400'} />
                  </div>

                  <div className="stack-layer-info">
                    <div className="layer-header-row">
                      <div className="layer-title-icon">
                        <h4 className="layer-title">{layer.title}</h4>
                      </div>
                    </div>
                    <p className="layer-summary">{layer.description}</p>
                  </div>

                  <div className="stack-layer-status">
                    <span className={`status-indicator ${isSelected ? 'active' : ''}`} />
                  </div>
                </div>

                {/* Animated Connection Arrow between layers */}
                {idx < layers.length - 1 && (
                  <div className="stack-layer-connector">
                    <div className={`connector-beam ${isSelected ? 'beam-active' : ''}`} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Right Column: Active Layer Live Inspection Panel */}
        <div className="stack-inspection-column">
          <div className="layer-inspector-card animated-card">
            <span className="card-corner-tl" />
            <span className="card-corner-br" />

            {/* Inspector Visual Header */}
            <div className="inspector-media-box">
              <img
                src={active.image}
                alt={active.title}
                className="inspector-image"
              />
              <div className="inspector-gradient" />
              
              <div className="inspector-floating-chip">
                <ActiveIcon size={16} className="text-cyan-400" />
                <span>ARCHITECTURAL DOMAIN</span>
              </div>

              <div className="inspector-metric-pill">
                <strong>Target Impact:</strong> {active.impactMetric}
              </div>
            </div>

            {/* Inspector Content */}
            <div className="inspector-content-box">
              <div className="inspector-meta-row">
                <span className="inspector-number">ACTIVE ARCHITECTURE</span>
                <span className="inspector-telemetry-tag">TELEMETRY SYNCHRONIZED</span>
              </div>

              <h3 className="inspector-heading">{active.title}</h3>
              <p className="inspector-description">{active.description}</p>

              <div className="inspector-capabilities">
                <span className="capabilities-label">Architectural Capabilities & Standards:</span>
                <ul className="capabilities-list">
                  {active.capabilities.map((cap, cIdx) => (
                    <li key={cIdx}>
                      <Check size={14} className="text-blue-500 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="inspector-actions">
                <Link
                  href={`/solutions/${active.slug}`}
                  className="button button-primary button-sm"
                >
                  <span>Explore Layer Architecture</span>
                  <ArrowUpRight size={16} />
                </Link>
                <Link
                  href={`/book-ai-diagnostic?solution=${active.slug}`}
                  className="button button-ghost button-sm"
                >
                  <span>Audit This Layer</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * TRUSTGRID.AI — Controlled CTA Experimentation & A/B Testing Engine
 * Deterministic visitor assignment with persistent session/cookie storage,
 * variant impression tracking, and qualified conversion attribution.
 */

export interface ExperimentVariant {
  id: string
  label: string
  ctaText: string
  supportingText?: string
  href?: string
}

export interface ExperimentConfig {
  experimentId: string
  name: string
  description: string
  startDate: string
  endDate?: string
  status: 'active' | 'paused' | 'concluded'
  variants: Record<string, ExperimentVariant>
}

export const ACTIVE_EXPERIMENTS: Record<string, ExperimentConfig> = {
  'exp_hero_primary_cta': {
    experimentId: 'exp_hero_primary_cta',
    name: 'Homepage Hero Primary CTA Copy',
    description: 'Testing "Book a Free AI Consultation" vs "Talk to an AI Architect"',
    startDate: '2026-11-20',
    status: 'active',
    variants: {
      'control': {
        id: 'control',
        label: 'Control: Consultation',
        ctaText: 'Book a Free AI Consultation',
        href: '/book-ai-diagnostic#diagnostic-form-section'
      },
      'architect': {
        id: 'architect',
        label: 'Variant B: Architect',
        ctaText: 'Talk to an AI Architect',
        href: '/talk-to-ai-architect'
      }
    }
  },
  'exp_infra_service_cta': {
    experimentId: 'exp_infra_service_cta',
    name: 'AI Infrastructure Service Action',
    description: 'Testing "Assess Your AI Infrastructure" vs "Request an AI Infrastructure Assessment"',
    startDate: '2026-11-20',
    status: 'active',
    variants: {
      'control': {
        id: 'control',
        label: 'Control: Direct Action',
        ctaText: 'Assess Your AI Infrastructure',
        href: '/book-ai-diagnostic?solution=ai-infra-engineering#diagnostic-form-section'
      },
      'formal': {
        id: 'formal',
        label: 'Variant B: Formal Assessment',
        ctaText: 'Request an AI Infrastructure Assessment',
        href: '/book-ai-diagnostic?solution=ai-infra-engineering#diagnostic-form-section'
      }
    }
  }
}

/**
 * Deterministically get or assign variant for a given experiment
 */
export function getExperimentVariant(experimentId: string): ExperimentVariant {
  const experiment = ACTIVE_EXPERIMENTS[experimentId]
  if (!experiment || experiment.status !== 'active') {
    return experiment?.variants?.control || {
      id: 'control',
      label: 'Default',
      ctaText: 'Book a Free AI Consultation',
      href: '/book-ai-diagnostic#diagnostic-form-section'
    }
  }

  if (typeof window === 'undefined') {
    return experiment.variants.control
  }

  const storageKey = `tg_exp_${experimentId}`
  try {
    const cached = localStorage.getItem(storageKey)
    if (cached && experiment.variants[cached]) {
      return experiment.variants[cached]
    }

    // Deterministic hash based on sessionId or random 50/50 split
    const sessionId = sessionStorage.getItem('tg_session_id') || String(Date.now())
    let hash = 0
    for (let i = 0; i < sessionId.length; i++) {
      hash = (hash << 5) - hash + sessionId.charCodeAt(i)
      hash |= 0
    }
    const variantKeys = Object.keys(experiment.variants)
    const selectedKey = variantKeys[Math.abs(hash) % variantKeys.length]
    localStorage.setItem(storageKey, selectedKey)

    return experiment.variants[selectedKey]
  } catch {
    return experiment.variants.control
  }
}

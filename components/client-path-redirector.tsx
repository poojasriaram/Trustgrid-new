'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const CLIENT_ROUTE_MAP: Record<string, string> = {
  // Practice Areas
  'enterprise-ai-governance-grc': '/practice-areas/ai-governance-risk-compliance',
  'compute-data-center': '/practice-areas/ai-infrastructure-high-density-compute',
  'lossless-datacenter-fabric': '/practice-areas/ai-native-networking-systems-integration',
  'distributed-agent-swarms': '/practice-areas/agentic-ai-multi-agent-orchestration',
  'air-gapped-edge-ai': '/practice-areas/ai-cybersecurity-quantum-safe-defense',
  'agentic-threat-detection': '/practice-areas/security-engineering-governance',
  'legal-contracts-regulatory-compliance': '/practice-areas/regulatory-change-monitoring',
  'customer-operations-service-excellence': '/practice-areas/workforce-co-pilots',
  'supply-chain-logistics-intelligence': '/practice-areas/supplier-risk-resilience-intelligence',
  'finance-accounting-treasury-automation': '/practice-areas/spend-telemetry-chargeback',
  'enterprise-knowledge-semantic-fabric': '/practice-areas/enterprise-llm-rag-context-engineering',
  
  // Industries
  'banking-financial-services-bfsi': '/industries/banking-financial-services',
  'public-sector-defense-civic': '/industries/government-public-sector',
  'healthcare-life-sciences': '/industries/healthcare-life-sciences',
  'life-sciences-pharma': '/industries/healthcare-life-sciences',
  'energy-utilities-smart-infrastructure': '/industries/energy-utilities',
  'manufacturing-industrial': '/industries/manufacturing-discrete',
  'retail-ecommerce-consumer-goods': '/industries/retail-consumer-goods',
  'telecommunications-media': '/industries/telecommunications',

  // Solutions
  'ai-networking': '/solutions/ai-networking-cybersecurity',
  'ai-cybersecurity-quantum-safe': '/solutions/ai-networking-cybersecurity',
  'ai-infra': '/solutions/ai-infra-engineering',
  'ai-agents': '/solutions/ai-agentic-factory',
  'agentic': '/solutions/ai-agentic-factory',
}

export function ClientPathRedirector() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const path = window.location.pathname.replace(/\/$/, '')

    // Check practice areas
    if (path.startsWith('/practice-areas/')) {
      const slug = path.replace('/practice-areas/', '')
      if (CLIENT_ROUTE_MAP[slug]) {
        router.replace(CLIENT_ROUTE_MAP[slug])
      }
    } else if (path.startsWith('/solutions/')) {
      const slug = path.replace('/solutions/', '')
      if (CLIENT_ROUTE_MAP[slug]) {
        router.replace(CLIENT_ROUTE_MAP[slug])
      }
    } else if (path.startsWith('/industries/')) {
      const slug = path.replace('/industries/', '')
      if (CLIENT_ROUTE_MAP[slug]) {
        router.replace(CLIENT_ROUTE_MAP[slug])
      }
    }
  }, [router])

  return null
}

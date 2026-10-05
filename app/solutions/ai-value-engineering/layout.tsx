import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'AI Value Engineering | TRUSTGRID.AI',
  description: 'TrustGrid AI Value Engineering industrializes proven Lean, Six Sigma, Theory of Constraints and Value Engineering methodologies with AI agent fleets to create, certify, defend and compound enterprise value.',
  openGraph: {
    title: 'AI Value Engineering | TRUSTGRID.AI',
    description: 'Proven Methodologies. Industrialized by AI. Value That Compounds. A disciplined enterprise value-creation system executing operational excellence through AI agent fleets.',
    url: 'https://trustgrid.ai/solutions/ai-value-engineering',
    siteName: 'TRUSTGRID.AI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Value Engineering | TRUSTGRID.AI',
    description: 'Proven Methodologies. Industrialized by AI. Value That Compounds.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

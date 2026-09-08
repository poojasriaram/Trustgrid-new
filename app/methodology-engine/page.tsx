import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MethodologyEngineSpecialSection } from '@/components/methodology-engine-special-section'

export const metadata: Metadata = {
  title: 'AI-Driven Methodology Engine: From Diagnostics to Compounding Value | TrustGrid.ai',
  description: "TrustGrid's Proprietary Approach to Implementing, Automating, and Sustaining Operational Excellence Through Agentic AI. 6 Stages, 12 Industries, and Continuous Compounding Value.",
}

export default function MethodologyEnginePage() {
  return (
    <main className="page-wrapper">
      <SiteHeader />
      <section className="section methodology-engine-page-section">
        <MethodologyEngineSpecialSection />
      </section>
      <SiteFooter />
    </main>
  )
}

import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MethodologyEngineSpecialSection } from '@/components/methodology-engine-special-section'
import { MethodologyJourneySlider } from '@/components/ui/methodology-journey-slider'

export const metadata: Metadata = {
  title: 'AI-Driven Methodology Engine: From Diagnostics to Compounding Value | TrustGrid.ai',
  description: "TrustGrid's Proprietary Approach to Implementing, Automating, and Sustaining Operational Excellence Through Agentic AI. Multi-Stage Compounding Value.",
}

export default function MethodologyEnginePage() {
  return (
    <main className="page-wrapper">
      <SiteHeader />
      <section className="section" style={{ paddingTop: '100px', paddingBottom: '20px' }}>
        <MethodologyJourneySlider />
      </section>
      <section className="section methodology-engine-page-section" style={{ paddingTop: '0px' }}>
        <MethodologyEngineSpecialSection />
      </section>
      <SiteFooter />
    </main>
  )
}


import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MethodologyEngineSpecialSection } from '@/components/methodology-engine-special-section'
import { MethodologyJourneySlider } from '@/components/ui/methodology-journey-slider'
import { PageBannerHero } from '@/components/ui/page-banner-hero'
import { Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI-Driven Methodology Engine: From Diagnostics to Compounding Value | TrustGrid.ai',
  description: "TrustGrid's Proprietary Approach to Implementing, Automating, and Sustaining Operational Excellence Through Agentic AI. Multi-Stage Compounding Value.",
}

export default function MethodologyEnginePage() {
  return (
    <main className="page-wrapper">
      <SiteHeader />

      {/* STANDARD PAGE BANNER HERO */}
      <PageBannerHero
        badge="METHODOLOGY ENGINE"
        badgeTag="DIAGNOSTIC TO VALUE"
        title="Multi-Stage AI Execution Engine: From Diagnostic to"
        titleHighlight="Compounding Enterprise Value"
        description="TrustGrid's proprietary methodology to systematically assess, architect, deploy, automate, and govern frontier AI systems with mathematical precision and deterministic ROI."
        thesisHighlight="Deterministic Stage Gates • Lossless RoCEv2 Delivery • Continuous FinOps Optimization"
        image="/images/methodology-engine.jpg"
        primaryCta={{
          label: "Book AI Diagnostic",
          href: "/book-ai-diagnostic"
        }}
        secondaryCta={{
          label: "Explore Offerings",
          href: "/offerings"
        }}
        quickNavItems={[
          { label: "1. Diagnostic", href: "#diagnostic" },
          { label: "2. Architecture", href: "#architecture" },
          { label: "3. Deployment", href: "#deployment" },
          { label: "4. Governance", href: "#governance" },
          { label: "5. Compounding", href: "#compounding" }
        ]}
        metrics={{
          statValue: "5-Stage",
          statLabel: "Compounding Engine",
          icon: Zap,
          features: [
            "Mathematical Stage Gates",
            "Lossless RoCEv2 Delivery",
            "Real-Time Telemetry & FinOps"
          ]
        }}
      />

      <section className="section" style={{ paddingTop: '40px', paddingBottom: '20px' }}>
        <MethodologyJourneySlider />
      </section>
      <section className="section methodology-engine-page-section" style={{ paddingTop: '0px' }}>
        <MethodologyEngineSpecialSection />
      </section>
      <SiteFooter />
    </main>
  )
}



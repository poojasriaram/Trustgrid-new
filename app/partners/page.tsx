'use client'

import React from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  Building2,
  Handshake,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldCheck
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { TrustGridForm } from '@/components/ui/trustgrid-form'
import { PageBannerHero } from '@/components/ui/page-banner-hero'

export default function PartnersPage() {
  return (
    <div className="page-shell">
      <SiteHeader />

      <main className="main-content">
        {/* STANDARD PAGE BANNER HERO */}
        <PageBannerHero
          badge="ECOSYSTEM ALLIANCES"
          badgeTag="STRATEGIC PARTNERSHIPS"
          title="Accelerating the Frontier AI Economy with"
          titleHighlight="Strategic Enterprise Partners"
          description="Join our global network of GPU compute providers, systems integrators, academic research labs, and enterprise technology innovators."
          thesisHighlight="Hyperscaler Alliances • Silicon & Hardware Partners • Global Systems Integrators"
          image="/images/offering-security.jpg"
          primaryCta={{
            label: "Join Partner Ecosystem",
            href: "#partner-form-section"
          }}
          secondaryCta={{
            label: "Explore Offerings",
            href: "/offerings"
          }}
          quickNavItems={[
            { label: "1. Partner Application", href: "#partner-form-section" },
            { label: "2. Strategic Alliances", href: "/about#footprint" },
            { label: "3. Open Initiatives", href: "/about#open-innovation" },
            { label: "4. Contact Team", href: "/contact" }
          ]}
          metrics={{
            statValue: "Ecosystem",
            statLabel: "Strategic Alliances",
            icon: Handshake,
            features: [
              "OEM & Silicon Integrations",
              "Hyperscale Cloud Alliances",
              "Academic AI Research Labs"
            ]
          }}
        />

        {/* CONTENT & FORM */}
        <section className="section" id="partner-form-section" style={{ paddingTop: '30px', paddingBottom: '60px' }}>
          <div className="diagnostic-grid-layout">
            <div className="diagnostic-intro-col">
              <div className="diagnostic-badge-wrap">
                <span className="section-label" style={{ color: '#1d5cff' }}>
                  ECOSYSTEM PROGRAM
                </span>
                <h2>Co-Engineering the Frontier AI Economy</h2>
                <p className="diagnostic-hero-lead">
                  We collaborate with hardware designers, hyperscalers, multi-agent frameworks, and enterprise consultants to deploy trusted AI operating systems.
                </p>
              </div>

              <div className="diagnostic-value-points">
                <div className="value-point">
                  <div className="value-point-icon">
                    <Cpu size={16} />
                  </div>
                  <div>
                    <strong>Compute & Hardware Alliances</strong>
                    <p>Benchmarking, token cost optimization, and bare-metal cluster engineering.</p>
                  </div>
                </div>

                <div className="value-point">
                  <div className="value-point-icon">
                    <Layers size={16} />
                  </div>
                  <div>
                    <strong>Systems Integration</strong>
                    <p>Co-delivery of high-risk enterprise AI platforms and compliance audits.</p>
                  </div>
                </div>

                <div className="value-point">
                  <div className="value-point-icon">
                    <Handshake size={16} />
                  </div>
                  <div>
                    <strong>Research & Innovation Labs</strong>
                    <p>Joint hackathons, post-quantum cryptographic safety, and grant fellowships.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="diagnostic-form-col">
              <TrustGridForm
                variant="partner"
                formId="form_partner_inquiry"
                formName="Partner Application Form"
                ctaSource="partners_page"
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

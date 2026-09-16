'use client'

import React from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  Building2,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  MessageCircle,
  Clock,
  ShieldCheck,
  Globe2
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { TrustGridForm } from '@/components/ui/trustgrid-form'
import { WhatsAppCTA } from '@/components/ui/whatsapp-cta'
import { PageBannerHero } from '@/components/ui/page-banner-hero'

export default function ContactPage() {
  return (
    <div className="page-shell">
      <SiteHeader />

      <main className="main-content">
        {/* STANDARD PAGE BANNER HERO */}
        <PageBannerHero
          badge="GLOBAL ENGAGEMENT"
          badgeTag="DIRECT ARCHITECT ACCESS"
          title="Connect with TrustGrid.AI Global Systems &"
          titleHighlight="Architecture Engineering Leads"
          description="Reach out to our principal architecture leads, GPU compute engineers, and strategic enterprise advisors across the United States, Singapore, and India R&D labs."
          thesisHighlight="US, Singapore & India R&D Centers • 24-Hour Turnaround • Direct Architect Scoping"
          image="/images/hero-ai-infra.jpg"
          primaryCta={{
            label: "Send Engineering Message",
            href: "#contact-form-section"
          }}
          secondaryCta={{
            label: "Book AI Diagnostic",
            href: "/book-ai-diagnostic"
          }}
          quickNavItems={[
            { label: "1. Message Form", href: "#contact-form-section" },
            { label: "2. Global Labs", href: "/about#locations" },
            { label: "3. Executive Diagnostic", href: "/book-ai-diagnostic" },
            { label: "4. Solutions Portfolio", href: "/offerings" }
          ]}
          metrics={{
            statValue: "Global",
            statLabel: "R&D Presence",
            icon: Globe2,
            features: [
              "Silicon Valley (USA)",
              "Singapore Hub",
              "Chennai R&D (India)"
            ]
          }}
        />

        {/* CONTENT & FORM GRID */}
        <section className="section" id="contact-form-section" style={{ paddingTop: '30px', paddingBottom: '60px' }}>
          <div className="diagnostic-grid-layout">
            {/* LEFT: CONTACT DETAILS & CHANNELS */}
            <div className="diagnostic-intro-col">
              <div className="diagnostic-badge-wrap">
                <span className="section-label" style={{ color: '#1d5cff' }}>
                  DIRECT CHANNELS
                </span>
                <h2>Executive Advisory & Engineering Support</h2>
                <p className="diagnostic-hero-lead">
                  We collaborate with Fortune 500 enterprises, government bodies, defense contractors, and frontier startups to deliver dependable AI infrastructure.
                </p>
              </div>

              <div className="diagnostic-value-points">
                <div className="value-point">
                  <div className="value-point-icon">
                    <Mail size={16} />
                  </div>
                  <div>
                    <strong>Direct Email</strong>
                    <p><a href="mailto:poojasri.trustgrid@gmail.com" style={{ color: '#1d5cff', textDecoration: 'none' }}>poojasri.trustgrid@gmail.com</a></p>
                  </div>
                </div>

                <div className="value-point">
                  <div className="value-point-icon">
                    <Building2 size={16} />
                  </div>
                  <div>
                    <strong>Executive HQ & Labs</strong>
                    <p>US Systems Architecture • Singapore APAC Office • India R&D Labs</p>
                  </div>
                </div>

                <div className="value-point">
                  <div className="value-point-icon">
                    <MessageCircle size={16} />
                  </div>
                  <div>
                    <strong>Instant WhatsApp Line</strong>
                    <p>Connect with our senior architects for rapid technical consultation.</p>
                    <div style={{ marginTop: '8px' }}>
                      <WhatsAppCTA inline label="Chat on WhatsApp" />
                    </div>
                  </div>
                </div>

                <div className="value-point">
                  <div className="value-point-icon">
                    <Clock size={16} />
                  </div>
                  <div>
                    <strong>SLA Commitment</strong>
                    <p>Direct response from a senior technical architect within 24 business hours.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: STANDARDIZED CONTACT FORM */}
            <div className="diagnostic-form-col">
              <TrustGridForm
                variant="contact"
                formId="form_contact"
                formName="Contact Form"
                ctaSource="contact_page"
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

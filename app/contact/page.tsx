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
import { officeLocations } from '@/lib/about-data'

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
            { label: "2. Global Offices", href: "#global-offices" },
            { label: "3. Executive Diagnostic", href: "/book-ai-diagnostic" },
            { label: "4. Solutions Portfolio", href: "/offerings" }
          ]}
          metrics={{
            statValue: "5 Global",
            statLabel: "Offices & R&D Labs",
            icon: Globe2,
            features: [
              "Tampa, Florida (USA HQ)",
              "Singapore (APAC Hub)",
              "Bengaluru & Mumbai (India R&D)"
            ]
          }}
        />

        {/* CONTENT & FORM GRID */}
        <section className="section" id="contact-form-section" style={{ paddingTop: '30px', paddingBottom: '40px' }}>
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
                    <strong>Global Direct Email</strong>
                    <p style={{ margin: '4px 0 2px' }}>
                      <a href="mailto:connect@trustgrid.ai" style={{ color: '#1d5cff', textDecoration: 'none', fontWeight: 600 }}>
                        connect@trustgrid.ai
                      </a>
                    </p>
                    <p style={{ fontSize: '12px', color: '#64748b' }}>
                      India Operations: <a href="mailto:cs@trustgrid.in" style={{ color: '#1d5cff', textDecoration: 'none' }}>cs@trustgrid.in</a>
                    </p>
                  </div>
                </div>

                <div className="value-point">
                  <div className="value-point-icon">
                    <Building2 size={16} />
                  </div>
                  <div>
                    <strong>Executive HQ & Labs</strong>
                    <p>US Americas HQ (Tampa) • Singapore APAC Hub • Bengaluru & Mumbai R&D</p>
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
                    <p>Direct response from a senior technical architect within 24–48 business hours.</p>
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

        {/* GLOBAL OFFICES & PHYSICAL ADDRESSES DIRECTORY */}
        <section className="section presence-section" id="global-offices" style={{ paddingTop: '20px', paddingBottom: '60px' }}>
          <div className="section-intro">
            <div className="intro-left">
              <span className="section-badge">GLOBAL DIRECTORY</span>
              <p className="section-label">Worldwide Offices, Systems Labs & Mailing Addresses</p>
            </div>
            <span className="section-index">ADDRESSES</span>
          </div>

          <div className="presence-header">
            <h2>Our Global Operations & R&D Presence</h2>
            <p>Direct contact details, physical office addresses, and telephone lines across the US, Singapore, and India.</p>
          </div>

          <div className="offices-grid">
            {officeLocations.map((office, idx) => (
              <div key={idx} className="office-card animated-card reveal-up">
                <div className="office-tag">{office.tag}</div>
                <h3>{office.city}</h3>
                <p className="office-region">{office.region}</p>
                <div className="office-address">
                  <MapPin size={15} />
                  <span>{office.address}</span>
                </div>
                <div className="office-contacts">
                  {office.phone && (
                    <div className="contact-row">
                      <Phone size={14} />
                      <a href={`tel:${office.phone.replace(/\s+/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {office.phone}
                      </a>
                    </div>
                  )}
                  <div className="contact-row">
                    <Mail size={14} />
                    <a href={`mailto:${office.email}`} style={{ color: '#60a5fa', textDecoration: 'none' }}>
                      {office.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}


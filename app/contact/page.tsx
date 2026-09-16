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
  ShieldCheck
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { TrustGridForm } from '@/components/ui/trustgrid-form'
import { WhatsAppCTA } from '@/components/ui/whatsapp-cta'

export default function ContactPage() {
  return (
    <div className="page-shell">
      <SiteHeader />

      <main className="main-content">
        {/* HERO */}
        <section className="about-hero-section">
          <div className="about-hero-bg" />
          <div className="about-hero-content">
            <div className="about-hero-badge">
              <span className="dot" />
              <span>GLOBAL ENTERPRISE ENGAGEMENT</span>
            </div>
            <h1 className="about-hero-title">
              Connect with TrustGrid.AI Engineering
            </h1>
            <p className="about-hero-subtitle">
              Reach out to our global architecture leads, systems engineers, and strategic advisors across the United States, Singapore, and India R&D labs.
            </p>
          </div>
        </section>

        {/* CONTENT & FORM GRID */}
        <section className="section" style={{ paddingTop: '20px', paddingBottom: '60px' }}>
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

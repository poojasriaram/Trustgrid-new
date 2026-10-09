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
  Calendar,
  Globe2
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { QuickContactForm } from '@/components/ui/quick-contact-form'
import { WhatsAppCTA } from '@/components/ui/whatsapp-cta'
import { officeLocations } from '@/lib/about-data'

export default function ContactPage() {
  return (
    <div className="page-shell">
      <SiteHeader />

      <main className="main-content">
        {/* ABOVE-THE-FOLD DEDICATED CONTACT & SALES ENQUIRY SECTION */}
        <section className="section dedicated-form-hero-section" id="contact-form-section" style={{ paddingTop: '24px', paddingBottom: '50px' }}>
          <div className="diagnostic-grid-layout" style={{ alignItems: 'flex-start' }}>
            {/* LEFT COLUMN: DIRECT CHANNELS & EXECUTIVE CONTACT */}
            <div className="diagnostic-intro-col">
              <div className="diagnostic-badge-wrap">
                <span className="section-label" style={{ color: '#1d5cff', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Globe2 size={13} />
                  <span>DIRECT ENGAGEMENT &amp; ARCHITECT ACCESS</span>
                </span>
                <h1 style={{ fontSize: 'clamp(28px, 3.8vw, 42px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.15, margin: '8px 0 14px' }}>
                  Connect with TRUSTGRID.AI <span style={{ color: '#1d5cff' }}>Engineering &amp; Systems Leads.</span>
                </h1>
                <p className="diagnostic-hero-lead" style={{ fontSize: '15px', color: '#475569', lineHeight: 1.55 }}>
                  Reach out to our principal architecture leads, GPU compute engineers, and strategic enterprise advisors across our US, Singapore, and India R&amp;D laboratories.
                </p>
              </div>

              {/* DIRECT VALUE POINTS & CHANNELS */}
              <div className="diagnostic-value-points" style={{ marginTop: '20px' }}>
                <div className="value-point">
                  <div className="value-point-icon">
                    <Mail size={16} />
                  </div>
                  <div>
                    <strong>Global Direct Email</strong>
                    <p style={{ margin: '3px 0 2px' }}>
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
                    <strong>Executive HQ &amp; R&amp;D Labs</strong>
                    <p>Tampa, Florida (USA Americas HQ) • Singapore (APAC Hub) • Bengaluru &amp; Mumbai (India R&amp;D Labs)</p>
                  </div>
                </div>

                <div className="value-point">
                  <div className="value-point-icon">
                    <MessageCircle size={16} />
                  </div>
                  <div>
                    <strong>Direct WhatsApp Advisory Line</strong>
                    <p>Connect with senior architects for rapid technical and infrastructure consultation.</p>
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
                    <p>Direct technical response from a senior systems architect within 24–48 business hours.</p>
                  </div>
                </div>
              </div>

              {/* STRATEGY SESSION CALENDAR CALLOUT */}
              <div style={{ marginTop: '24px', padding: '18px 20px', background: '#ffffff', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#1d5cff', letterSpacing: '0.05em' }}>
                  CONSULTATION &amp; STRATEGY SESSION
                </span>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '6px 0 14px' }}>
                  Looking for a live 45-minute architectural &amp; compute briefing?
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Link
                    href="/talk-to-ai-architect#session-booking-section"
                    className="button button-primary button-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textDecoration: 'none', padding: '10px 14px', background: '#1d5cff', color: '#ffffff', borderRadius: '8px', fontWeight: 600, fontSize: '13px' }}
                  >
                    <Calendar size={15} />
                    <span>Book AI Architect Session</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: VERTICAL QUICK CONTACT / SALES ENQUIRY FORM (IMMEDIATELY VISIBLE ABOVE THE FOLD) */}
            <div className="diagnostic-form-col">
              <QuickContactForm ctaSource="contact_page_above_fold" />
            </div>
          </div>
        </section>

        {/* SECTION 2: GLOBAL OFFICES & PHYSICAL ADDRESSES DIRECTORY */}
        <section className="section presence-section" id="global-offices" style={{ paddingTop: '40px', paddingBottom: '60px', borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <div className="section-intro">
            <div className="intro-left">
              <span className="section-badge">GLOBAL DIRECTORY</span>
              <p className="section-label">Worldwide Offices, Systems Labs &amp; Mailing Addresses</p>
            </div>
            <span className="section-index">ADDRESSES</span>
          </div>

          <div className="presence-header">
            <h2>Our Global Operations &amp; R&amp;D Presence</h2>
            <p>Direct contact details, physical office addresses, and telephone lines across the US, Singapore, and India.</p>
          </div>

          <div className="offices-grid">
            {officeLocations.map((office, idx) => (
              <div key={idx} className="office-card animated-card">
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
                    <a href={`mailto:${office.email}`} style={{ color: '#1d5cff', textDecoration: 'none' }}>
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

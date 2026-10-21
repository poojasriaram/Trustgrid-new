import React from 'react'
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  Globe2,
  User
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
          <div className="contact-grid-layout" style={{ alignItems: 'flex-start' }}>
            {/* LEFT COLUMN: DIRECT CHANNELS & EXECUTIVE CONTACT */}
            <div className="diagnostic-intro-col" style={{ position: 'relative', top: 0 }}>
              <div className="diagnostic-badge-wrap">
                <span className="section-label" style={{ color: '#1d5cff', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Globe2 size={13} />
                  <span>DIRECT ENGAGEMENT &amp; ARCHITECT ACCESS</span>
                </span>
                <h1 style={{ fontSize: 'clamp(28px, 3.8vw, 42px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.15, margin: '8px 0 14px' }}>
                  Connect with TRUSTGRID.AI <span style={{ color: '#1d5cff' }}>Engineering &amp; Systems Leads.</span>
                </h1>
                <p className="diagnostic-hero-lead" style={{ fontSize: '15px', color: '#475569', lineHeight: 1.55 }}>
                  Reach out to our principal architecture leads, GPU compute engineers, and strategic enterprise advisors across our US, Canada, Australia, Japan, Singapore, and India offices.
                </p>
              </div>

              {/* DIRECT VALUE POINTS & CHANNELS */}
              <div className="diagnostic-value-points" style={{ marginTop: '20px' }}>
                <div className="value-point">
                  <div className="value-point-icon">
                    <Mail size={16} />
                  </div>
                  <div>
                    <strong>Direct Enterprise Channels</strong>
                    <p style={{ margin: '3px 0 2px' }}>
                      California (Silicon Valley): <a href="mailto:lavanya@trustgrid.ai" style={{ color: '#1d5cff', textDecoration: 'none', fontWeight: 600 }}>
                        lavanya@trustgrid.ai
                      </a> • <a href="https://wa.me/16507724145?text=Hi%20TrustGrid%20California%20team" target="_blank" rel="noopener noreferrer" style={{ color: '#10b981', fontWeight: 600, textDecoration: 'none' }}>+1 650 772 4145 (WhatsApp)</a>
                    </p>
                    <p style={{ margin: '3px 0 2px' }}>
                      US Executive (Americas / NY): <a href="mailto:Murali@trustgrid.ai" style={{ color: '#1d5cff', textDecoration: 'none', fontWeight: 600 }}>
                        Murali@trustgrid.ai
                      </a>
                    </p>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0' }}>
                      Japan: <a href="mailto:Hemalata@trustgrid.ai" style={{ color: '#1d5cff', textDecoration: 'none' }}>Hemalata@trustgrid.ai</a> • India: <a href="mailto:cs@trustgrid.in" style={{ color: '#1d5cff', textDecoration: 'none' }}>cs@trustgrid.in</a>
                    </p>
                  </div>
                </div>

                <div className="value-point">
                  <div className="value-point-icon">
                    <Building2 size={16} />
                  </div>
                  <div>
                    <strong>Global Hubs &amp; Systems Labs</strong>
                    <p>San Mateo / Mountain View &amp; New York • Tampa (USA) • Toronto (Canada) • Melbourne (Australia) • Osaka (Japan) • Singapore • Bengaluru &amp; Mumbai (India)</p>
                  </div>
                </div>

                <div className="value-point">
                  <div className="value-point-icon">
                    <MessageCircle size={16} />
                  </div>
                  <div>
                    <strong>Direct WhatsApp Advisory Lines</strong>
                    <p>Connect with senior architects for rapid technical and infrastructure consultation (All lines are WhatsApp-enabled).</p>
                    <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      <a
                        href="https://wa.me/16507724145?text=Hi%20TrustGrid%20USA%20team"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button-sm"
                        style={{ background: '#10b981', color: '#ffffff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}
                      >
                        <MessageCircle size={14} />
                        <span>US WhatsApp: +1 650 772 4145</span>
                      </a>
                      <WhatsAppCTA inline label="Global WhatsApp" />
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
            </div>

            {/* RIGHT COLUMN: VERTICAL QUICK CONTACT / SALES ENQUIRY FORM (IMMEDIATELY VISIBLE ABOVE THE FOLD) */}
            <div className="contact-form-col">
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
            <p>Direct contact details, physical office addresses, and dedicated WhatsApp communication channels across our international hubs.</p>
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
                  {office.contactPerson && (
                    <div className="contact-row">
                      <User size={14} />
                      <span style={{ fontWeight: 600, color: '#0f172a' }}>Contact: {office.contactPerson}</span>
                    </div>
                  )}
                  {office.phone && (
                    <div className="contact-row">
                      <Phone size={14} />
                      {office.whatsappUrl ? (
                        <a
                          href={office.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#059669', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          <span>{office.phone}</span>
                          <span style={{ fontSize: '10px', background: '#dcfce7', color: '#15803d', padding: '1px 5px', borderRadius: '4px' }}>WhatsApp</span>
                        </a>
                      ) : (
                        <a href={`tel:${office.phone.replace(/\s+/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {office.phone}
                        </a>
                      )}
                    </div>
                  )}
                  {office.note && (
                    <div className="contact-row" style={{ fontSize: '11px', color: '#64748b', fontStyle: 'italic' }}>
                      <span>{office.note}</span>
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

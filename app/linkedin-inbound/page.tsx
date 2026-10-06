'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Bot,
  ShieldCheck,
  Building2,
  Sparkles,
  Send,
  Loader2
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default function LinkedInInboundPage() {
  const [hasLoggedVisit, setHasLoggedVisit] = useState(false)
  const [visitorId, setVisitorId] = useState<string>('')

  // Form State
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Automatically capture the inbound LinkedIn visitor on page load
  useEffect(() => {
    if (typeof window !== 'undefined' && !hasLoggedVisit) {
      setHasLoggedVisit(true)
      const referrer = document.referrer || 'https://www.linkedin.com/company/trustgridai/'

      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'LinkedIn Visitor',
          email: 'inbound.linkedin@trustgrid.ai',
          company: 'LinkedIn Inbound Prospect',
          message: `Arrived directly from LinkedIn: ${referrer}`,
          source: 'LinkedIn',
          service: 'LinkedIn Inbound Company Page Referral',
          website: 'TRUSTGRID.AI'
        })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.leadId) setVisitorId(data.leadId)
        })
        .catch(() => {})
    }
  }, [hasLoggedVisit])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!name.trim()) {
      setErrorMsg('Please enter your full name')
      return
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid work email')
      return
    }
    if (!company.trim()) {
      setErrorMsg('Please enter your company name')
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          message: message.trim() || 'Direct inquiry from LinkedIn company page landing page.',
          source: 'LinkedIn',
          service: 'LinkedIn Company Page Lead',
          website: 'TRUSTGRID.AI'
        })
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setIsSuccess(true)
      } else {
        setErrorMsg(data.message || 'Unable to submit your request.')
      }
    } catch (err) {
      setErrorMsg('Unable to submit your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      {/* HERO SECTION */}
      <section className="section" style={{ paddingTop: '140px', paddingBottom: '70px', background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* BADGE */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '100px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', fontSize: '13px', fontWeight: 600, marginBottom: '24px' }}>
            <Sparkles size={14} />
            <span>Welcome from LinkedIn • Official Inbound Portal</span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 4.8vw, 68px)', fontWeight: 700, color: '#07143d', lineHeight: 1.08, letterSpacing: '-0.04em', margin: '0 0 20px 0' }}>
            Enterprise AI Engineered for the <span style={{ color: '#0052cc' }}>AGI Era.</span>
          </h1>

          <p style={{ fontSize: '19px', lineHeight: 1.6, color: '#475467', maxWidth: '780px', margin: '0 0 36px 0' }}>
            Thank you for connecting with <strong>TRUSTGRID.AI</strong> on LinkedIn. We engineer production GPU data factories, autonomous agent fleets, and resilient value economics for global enterprises.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '48px' }}>
            <Link href="/book-ai-diagnostic#diagnostic-form-section" className="button button-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', backgroundColor: '#07143d', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
              <span>Book an AI Diagnostic</span>
              <ArrowUpRight size={17} />
            </Link>
            <Link href="/solutions/ai-infra-engineering" className="button button-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 24px', border: '1px solid #d0d5dd', color: '#07143d', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
              <span>Explore AI Stack</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE CARD */}
      <section className="section" style={{ paddingTop: '0px', paddingBottom: '90px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '40px', boxShadow: '0 10px 30px -5px rgba(0,0,0,0.06)' }}>
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#07143d', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
              Connect with Senior AI Architects
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b', margin: 0 }}>
              Direct inquiry channel for LinkedIn network members, partners, and enterprise executives.
            </p>
          </div>

          {isSuccess ? (
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '28px', textAlign: 'center' }}>
              <CheckCircle2 size={36} className="text-emerald-600 mx-auto mb-3" />
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#166534', margin: '0 0 8px 0' }}>
                Inquiry Received Successfully
              </h3>
              <p style={{ fontSize: '14px', color: '#15803d', margin: 0 }}>
                Our solutions engineering team will reach out to you within 24 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {errorMsg && (
                <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#fef2f2', color: '#b91c1c', fontSize: '14px', marginBottom: '18px' }}>
                  {errorMsg}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="priya@enterprise.com"
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Company / Organization *
                </label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Global Tech Solutions"
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Requirement / Message
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your infrastructure or AI roadmap..."
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 26px', backgroundColor: '#0052cc', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14.5px', fontWeight: 600, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <Send size={15} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

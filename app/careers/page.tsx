'use client'

import React from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  Building2,
  Award,
  CheckCircle2,
  Cpu,
  Bot,
  ShieldCheck,
  Briefcase
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { TrustGridForm } from '@/components/ui/trustgrid-form'

export default function CareersPage() {
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
              <span>CAREERS & RESEARCH FELLOWSHIPS</span>
            </div>
            <h1 className="about-hero-title">
              Build the Enterprise AI Operating System
            </h1>
            <p className="about-hero-subtitle">
              Join elite systems engineers, distributed compute researchers, and multi-agent architects solving the hardest challenges in the AGI economy.
            </p>
          </div>
        </section>

        {/* CONTENT & FORM */}
        <section className="section" style={{ paddingTop: '20px', paddingBottom: '60px' }}>
          <div className="diagnostic-grid-layout">
            <div className="diagnostic-intro-col">
              <div className="diagnostic-badge-wrap">
                <span className="section-label" style={{ color: '#1d5cff' }}>
                  ENGINEERING CULTURE
                </span>
                <h2>Zero Compromise on Architectural Rigor</h2>
                <p className="diagnostic-hero-lead">
                  We are looking for builders who thrive at the intersection of bare-metal GPU clusters, deterministic agent swarms, and mathematical governance.
                </p>
              </div>

              <div className="diagnostic-value-points">
                <div className="value-point">
                  <div className="value-point-icon">
                    <Cpu size={16} />
                  </div>
                  <div>
                    <strong>Cutting-Edge Hardware & Clusters</strong>
                    <p>Direct access to H100/B200 clusters and distributed inference testbeds.</p>
                  </div>
                </div>

                <div className="value-point">
                  <div className="value-point-icon">
                    <Award size={16} />
                  </div>
                  <div>
                    <strong>Hackathons & Open Innovation</strong>
                    <p>Regular hackathon series with real enterprise grants and production launches.</p>
                  </div>
                </div>

                <div className="value-point">
                  <div className="value-point-icon">
                    <Briefcase size={16} />
                  </div>
                  <div>
                    <strong>Global High-Impact Teams</strong>
                    <p>Offices in the United States, Singapore, and India R&D laboratories.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="diagnostic-form-col">
              <TrustGridForm
                variant="career"
                formId="form_career_application"
                formName="Career Application Form"
                ctaSource="careers_page"
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

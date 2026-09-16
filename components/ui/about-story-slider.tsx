'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Building2,
  Sparkles,
  ShieldCheck,
  Cpu,
  Bot,
  Users,
  Award,
  Globe2,
  CheckCircle2,
  Layers,
  TrendingUp
} from 'lucide-react'

export interface AboutStoryChapter {
  id: string
  tabLabel: string
  badge: string
  title: string
  headline: string
  narrative: string
  pillars: {
    title: string
    description: string
  }[]
  strategicOutcome: string
  icon: React.ElementType
}

export const defaultAboutChapters: AboutStoryChapter[] = [
  {
    id: 'origin-mission',
    tabLabel: 'Our Mission & Vision',
    badge: 'PURPOSE-DRIVEN ENGINEERING',
    title: 'From Infrastructure to Compounding Intelligence',
    headline: 'Engineering the full-stack foundation for the sovereign global AI economy.',
    narrative: 'TrustGrid was founded to resolve the profound architectural friction between exploratory AI experimentation and industrial enterprise execution. While traditional consultancies sell strategy decks and point vendors hawk isolated chatbots, TrustGrid delivers full-stack systems engineering — from 30–100kW direct-to-chip liquid cooling to multi-agent cognitive swarms and post-quantum cryptographic defenses.',
    pillars: [
      {
        title: 'Full-Stack Systems Rigor',
        description: 'We treat AI as a continuous physical and digital factory — integrating facility power, silicon kernels, lossless networking, and agent runtimes.'
      },
      {
        title: 'Deterministic Enterprise SLA',
        description: 'Eliminating black-box uncertainty through mathematical explainability (SHAP/LIME) and formal verification.'
      },
      {
        title: 'Sovereign IP Ownership',
        description: 'We build capabilities inside your environment, transferring complete operational independence to your internal engineering workforce.'
      }
    ],
    strategicOutcome: 'Empowering global enterprises to operate mission-critical AI with predictable unit economics, zero data leakage, and compounding competitive advantage.',
    icon: Building2
  },
  {
    id: 'philosophy',
    tabLabel: 'Engineering Philosophy',
    badge: 'OPERATIONAL EXCELLENCE',
    headline: 'Applying time-tested industrial disciplines to modern non-deterministic compute.',
    narrative: 'We combine cutting-edge artificial intelligence with proven industrial engineering methodologies: Lean Thinking, Theory of Constraints (TOC), Six Sigma (DMAIC), and Statistical Process Control (SPC). By treating GPU clusters as manufacturing throughput lines, we eliminate compute bottlenecks, maximize accelerator yield, and bridge silicon metrics directly to CFO balance sheets.',
    pillars: [
      {
        title: 'Theory of Constraints (TOC)',
        description: 'Systematic elimination of thermal, KV-cache, and network jitter constraints that stall distributed GPU clusters.'
      },
      {
        title: 'Poka-Yoke Interface Design',
        description: 'Mistake-proofing autonomous agent tool calling and prompt execution through deterministic guardrail firewalls.'
      },
      {
        title: 'Throughput Accounting & FinOps',
        description: 'Granular cost-per-task attribution ensuring every compute dollar generates verifiable top-line enterprise value.'
      }
    ],
    strategicOutcome: 'Predictable, compounding operational yield where every unit of compute expenditure is accountable to CFO balance sheets.',
    icon: Cpu
  },
  {
    id: 'trust-security',
    tabLabel: 'Trust & Quantum Defense',
    badge: 'CRYPTOGRAPHIC AGILITY',
    headline: 'Trust is the non-negotiable precondition for autonomous enterprise intelligence.',
    narrative: 'As AI systems take autonomous actions with consequential financial and operational impact, organizations must guarantee continuous compliance, data air-gapping, and quantum-safe cryptographic foundations. TrustGrid is pioneering the transition to NIST Post-Quantum Cryptography while providing zero-trust identity frameworks for digital worker fleets.',
    pillars: [
      {
        title: 'L1–L7 Post-Quantum Cryptography',
        description: 'Comprehensive migration to NIST standards (FIPS 203/204/205) protecting against Harvest Now Decrypt Later quantum threats.'
      },
      {
        title: 'Continuous Cryptographic CBOM',
        description: 'Automated Cryptographic Bill of Materials providing real-time visibility across all encryption keys, certificates, and algorithms.'
      },
      {
        title: 'Immutable Audit Replay',
        description: 'Cryptographically sealed decision logging for EU AI Act, NIST AI RMF, and ISO 42001 regulatory compliance.'
      }
    ],
    strategicOutcome: 'Complete regulatory audit survival and immutable security resilience across all physical, network, and agent layers.',
    icon: ShieldCheck
  },
  {
    id: 'co-engineering',
    tabLabel: 'The Co-Engineering Model',
    badge: 'TALENT & CAPABILITY TRANSFER',
    headline: 'Building capability alongside your teams — never creating permanent agency dependence.',
    narrative: 'We reject the traditional billable-hour consultancy model. TrustGrid deploys senior principal fellows and systems engineers directly into collaborative co-development pods. We build production systems alongside your engineers, transfer deep architecture IP, and establish internal Enterprise AI Factory hubs that your team operates independently.',
    pillars: [
      {
        title: 'Embedded Principal Fellows',
        description: 'Direct pairing with senior silicon, networking, and agentic architects who have built frontier production systems.'
      },
      {
        title: 'Internal AI Factory Enablement',
        description: 'Establishing standard operating procedures, evaluation harnesses, and CI/CD pipelines for autonomous operations.'
      },
      {
        title: 'Complete Source & Architecture Handoff',
        description: 'Zero proprietary lock-in; all models, DAGs, runbooks, and configurations are owned 100% by the client.'
      }
    ],
    strategicOutcome: 'A self-sustaining, high-velocity internal engineering organization capable of continuous AI innovation.',
    icon: Users
  },
  {
    id: 'presence-innovation',
    tabLabel: 'Global Presence & Innovation',
    badge: 'GLOBAL FOOTPRINT',
    headline: 'R&D labs and executive centers spanning the US, Singapore, and India.',
    narrative: 'Headquartered with executive offices in key global enterprise hubs and advanced R&D labs in India, TrustGrid actively contributes to open-source agent frameworks, post-quantum research, and high-density thermal modeling. We foster open innovation hackathons and academic fellowships to continuously push frontier enterprise AI capabilities.',
    pillars: [
      {
        title: 'Global Delivery Enclaves',
        description: 'Executive strategy offices in US & Singapore paired with deep-tech R&D facilities and 24/7 managed NOC/SOC centers.'
      },
      {
        title: 'Open Innovation & Hackathons',
        description: 'Sponsoring frontier computer vision, crowd safety, and autonomous agent challenges with global developer communities.'
      },
      {
        title: 'Silicon & Platform Alliances',
        description: 'Close technical collaboration with leading hardware, cloud, networking, and post-quantum technology ecosystems.'
      }
    ],
    strategicOutcome: 'Worldwide access to elite engineering talent and cutting-edge frontier AI technologies with 24/7 operational continuity.',
    icon: Globe2
  }
]

export function AboutStorySlider({ chapters = defaultAboutChapters }: { chapters?: AboutStoryChapter[] }) {
  const [activeIdx, setActiveIdx] = useState(0)

  const current = chapters[activeIdx]

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % chapters.length)
  }

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + chapters.length) % chapters.length)
  }

  return (
    <div className="about-story-slider-wrapper animated-card">
      <span className="card-corner-tl" />
      <span className="card-corner-br" />

      {/* Chapter Tabs Header */}
      <div className="about-story-tabs" role="tablist" aria-label="TrustGrid Story & Philosophy">
        {chapters.map((ch, idx) => {
          const Icon = ch.icon || Building2
          const isActive = idx === activeIdx
          return (
            <button
              key={ch.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`about-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveIdx(idx)}
            >
              <Icon size={14} />
              <span>{ch.tabLabel}</span>
            </button>
          )
        })}
      </div>

      {/* Main Slide Card Body */}
      <div className="about-slide-content">
        <div className="about-slide-grid">
          {/* Left Column: Narrative & Headline */}
          <div className="about-left-col">
            <div className="about-meta-tag-row">
              <span className="about-badge-tag">{current.badge}</span>
              <span className="about-chapter-name">{current.tabLabel}</span>
            </div>

            <h3 className="about-slide-title">{current.title}</h3>
            <p className="about-headline-lead">{current.headline}</p>

            <div className="about-narrative-box">
              <p>{current.narrative}</p>
            </div>

            <div className="about-strategic-banner">
              <div className="banner-flag">
                <Sparkles size={15} className="text-blue-500" />
                <span>Strategic Enterprise Value</span>
              </div>
              <p>{current.strategicOutcome}</p>
            </div>
          </div>

          {/* Right Column: Key Pillars */}
          <div className="about-right-col">
            <span className="pillars-section-title">
              <Layers size={14} className="text-blue-500" />
              Foundational Architectural Pillars
            </span>

            <div className="about-pillars-stack">
              {current.pillars.map((pil, i) => (
                <div key={i} className="about-pillar-card animated-card">
                  <div className="pillar-header">
                    <CheckCircle2 size={15} className="text-blue-500 shrink-0" />
                    <strong>{pil.title}</strong>
                  </div>
                  <p>{pil.description}</p>
                </div>
              ))}
            </div>

            {/* Actions & Navigation */}
            <div className="about-actions-footer">
              <Link href="/book-ai-diagnostic" className="button button-primary button-sm">
                <span>Book an AI Diagnostic</span>
                <ArrowUpRight size={15} />
              </Link>
              <Link href="/leadership" className="button button-ghost button-sm">
                <span>Leadership & Architects</span>
              </Link>

              <div className="about-nav-arrows ml-auto">
                <button
                  type="button"
                  className="slider-arrow-btn"
                  onClick={handlePrev}
                  aria-label="Previous story chapter"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  className="slider-arrow-btn"
                  onClick={handleNext}
                  aria-label="Next story chapter"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

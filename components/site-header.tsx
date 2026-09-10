'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Building2,
  Users,
  Award,
  MapPin,
  FileText,
  Cpu,
  Layers,
  ShieldCheck,
  Network,
  TrendingUp,
  BrainCircuit,
  Bot,
  Compass,
  BookOpen,
  Activity,
  CheckCircle2,
  Trophy,
  Lock,
  Workflow,
  BarChart3,
  Lightbulb,
  FileSpreadsheet,
  FolderOpen,
  Globe2,
  Phone
} from 'lucide-react'
import { logoUrl, solutions } from '@/lib/solutions'
import { industriesData } from '@/lib/industries-data'

const methodologyCategories = [
  {
    title: 'AI Engineering',
    icon: Cpu,
    desc: 'Eliminate compute waste, maximize GPU utilization, and engineer factory throughput.',
    items: [
      'Lean Thinking',
      'TOC',
      'DMAIC',
      'OEE',
      'TPM',
      'SMED',
      'Value Stream Mapping'
    ]
  },
  {
    title: 'Agentic AI',
    icon: Bot,
    desc: 'Orchestrate multi-agent DAGs, mistake-proof tool calls, and monitor agent fleet SLA.',
    items: [
      'AgentOps',
      'Agile/Scrum',
      'DevOps/CI/CD',
      'FMEA',
      'Poka-Yoke',
      'Jidoka',
      'OKR'
    ]
  },
  {
    title: 'Trusted AI',
    icon: ShieldCheck,
    desc: 'Deterministic guardrails, mathematical explainability, and regulatory governance.',
    items: [
      'Responsible AI',
      'Explainability',
      'FMEA',
      'SPC',
      'Governance',
      'Continuous Assurance'
    ]
  },
  {
    title: 'AI Value Engineering',
    icon: TrendingUp,
    desc: 'Bridge technical compute metrics directly to CFO-approved P&L earnings.',
    items: [
      'Hoshin Kanri',
      'Balanced Scorecard',
      'OKR',
      'Throughput Accounting',
      'Value Engineering',
      'Portfolio Optimization'
    ]
  }
]

const aboutMenuItems = [
  {
    label: 'About TrustGrid.AI',
    href: '/about',
    icon: Building2,
    desc: 'Our mission, vision, and full-spectrum engineering verticals'
  },
  {
    label: 'Leadership & Teams',
    href: '/about#teams',
    icon: Users,
    desc: 'World-class AI architects, systems leads, and advisory board'
  },
  {
    label: 'Careers & Hackathons',
    href: '/about#careers-hackathons',
    icon: Award,
    desc: 'Frontier AI hackathons, research fellowships, and open roles'
  },
  {
    label: 'Global Presence',
    href: '/about#presence',
    icon: MapPin,
    desc: 'Executive offices in US, Singapore, and India R&D labs'
  },
  {
    label: 'Case Studies',
    href: '/about#case-studies',
    icon: FileText,
    desc: 'Production outcomes across defense, banking, and enterprise AI'
  },
  {
    label: 'Methodology Engine',
    href: '/methodology-engine',
    icon: Sparkles,
    desc: 'Proprietary AI-driven methodology implementation framework'
  }
]

const insightsMenuItems = [
  {
    label: 'AI Insights',
    href: '/insights',
    icon: BookOpen,
    desc: 'Core perspectives on frontier AI architectures, systems, and enterprise deployment.'
  },
  {
    label: 'Case Studies',
    href: '/about#case-studies',
    icon: FileText,
    desc: 'Production outcomes in defense, tier-1 banking, healthcare, and industrial manufacturing.'
  },
  {
    label: 'Whitepapers',
    href: '/insights',
    icon: FileSpreadsheet,
    desc: 'Inference economics, token cost reduction blueprints, and hardware benchmarks.'
  },
  {
    label: 'Research',
    href: '/insights',
    icon: Compass,
    desc: 'Post-quantum cryptographic transitions (PQC / CBOM) and agent safety research.'
  },
  {
    label: 'Blog',
    href: '/insights',
    icon: Lightbulb,
    desc: 'Engineering dispatches, architectural reviews, and operational methodologies.'
  },
  {
    label: 'Resources & Frameworks',
    href: '/insights',
    icon: FolderOpen,
    desc: 'Frameworks, maturity assessment models, and technical reference guides.'
  },
  {
    label: 'Site Map v14.0',
    href: '/sitemap',
    icon: Layers,
    desc: 'Complete 5-level expert content model spanning 6 Groups and 18 Engineering Areas.'
  },
  {
    label: 'Crowd Safety Predictor',
    href: 'https://crowd-safety-predictor.vercel.app/',
    icon: Trophy,
    isExternal: true,
    desc: 'Live open innovation hackathon project: multi-camera computer vision & telemetry.'
  }
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const closeAll = () => {
    setActiveMenu(null)
    setOpen(false)
  }

  const toggleMenu = (menuName: string) => {
    setActiveMenu(activeMenu === menuName ? null : menuName)
  }

  const toggleMobileSection = (sec: string) => {
    setMobileSection(mobileSection === sec ? null : sec)
  }

  return (
    <header
      ref={headerRef}
      className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}
    >
      <Link className="brand" href="/" aria-label="TrustGrid.ai home" onClick={closeAll}>
        <img src={logoUrl} alt="TrustGrid.ai" />
      </Link>

      <nav className={`nav ${open ? 'nav-open' : ''}`} aria-label="Primary navigation">
        {/* 1. HOME */}
        <Link href="/" className="nav-link" onClick={closeAll}>
          Home
        </Link>

        {/* 2. SOLUTIONS MEGA MENU */}
        <div className="nav-dropdown-wrapper">
          <button
            className={`nav-menu-trigger ${activeMenu === 'solutions' ? 'active' : ''}`}
            onClick={() => toggleMenu('solutions')}
            aria-expanded={activeMenu === 'solutions'}
          >
            <span>Solutions</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'solutions' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'solutions' && (
            <div className="mega-menu solutions-mega-menu" onMouseLeave={() => setActiveMenu(null)}>
              <div className="mega-menu-header">
                <div>
                  <span className="mega-menu-badge">THE ENTERPRISE AI OPERATING STACK</span>
                  <p>6 Vertically Integrated Engineering Domains for the Enterprise AI Operating Stack</p>
                </div>
                <Link href="/solutions/ai-infra-engineering" className="mega-header-link" onClick={closeAll}>
                  <span>Explore Full Architecture</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>

              <div className="mega-menu-grid solutions-grid-6">
                {solutions.map((sol) => {
                  return (
                    <div
                      key={sol.slug}
                      className="mega-solution-card"
                    >
                      <div className="mega-sol-main">
                        <Link
                          href={`/solutions/${sol.slug}`}
                          className="mega-sol-title-link"
                          onClick={closeAll}
                        >
                          <div className="mega-item-top">
                            <span className="mega-item-num">{sol.number}</span>
                            <span className="mega-item-label">{sol.shortTitle}</span>
                            <ArrowUpRight size={13} className="mega-sol-arrow" />
                          </div>
                          <p className="mega-item-desc">{sol.heroStatement.slice(0, 95)}...</p>
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mega-menu-footer">
                <Link href="/book-ai-diagnostic" className="mega-footer-link" onClick={closeAll}>
                  <Sparkles size={14} />
                  <span>Not sure which solution fits your workload? <strong>Book an AI Diagnostic Assessment</strong></span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 3. INDUSTRIES MEGA MENU */}
        <div className="nav-dropdown-wrapper">
          <button
            className={`nav-menu-trigger ${activeMenu === 'industries' ? 'active' : ''}`}
            onClick={() => toggleMenu('industries')}
            aria-expanded={activeMenu === 'industries'}
          >
            <span>Industries</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'industries' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'industries' && (
            <div className="mega-menu industries-mega-menu" onMouseLeave={() => setActiveMenu(null)}>
              <div className="mega-menu-header">
                <div>
                  <span className="mega-menu-badge">12 REGULATED & MISSION-CRITICAL SECTORS</span>
                  <p>Tailored AI Factories, Guardrails, and Methodologies by Vertical</p>
                </div>
                <Link href="/industries" className="mega-header-link" onClick={closeAll}>
                  <span>View All 12 Industries Directory</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>

              <div className="mega-menu-grid industries-grid-12">
                {industriesData.map((ind) => (
                  <Link
                    key={ind.id}
                    href={`/industries#${ind.slug}`}
                    className="mega-industry-item"
                    onClick={closeAll}
                  >
                    <div className="ind-item-badge">{ind.badge}</div>
                    <span className="ind-item-title">{ind.name}</span>
                    <p className="ind-item-sub">{ind.tagline.slice(0, 68)}...</p>
                  </Link>
                ))}
              </div>

              <div className="mega-menu-footer">
                <Link href="/industries" className="mega-footer-link" onClick={closeAll}>
                  <Layers size={14} />
                  <span>Explore deep technical architectures for your specific industry sector</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 4. AI METHODOLOGY MEGA MENU */}
        <div className="nav-dropdown-wrapper">
          <button
            className={`nav-menu-trigger ${activeMenu === 'methodology' ? 'active' : ''}`}
            onClick={() => toggleMenu('methodology')}
            aria-expanded={activeMenu === 'methodology'}
          >
            <span>AI Methodology</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'methodology' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'methodology' && (
            <div className="mega-menu methodology-mega-menu" onMouseLeave={() => setActiveMenu(null)}>
              <div className="mega-menu-header">
                <div>
                  <span className="mega-menu-badge">PROPRIETARY METHODOLOGY ENGINES</span>
                  <p>Industrial Engineering & Operational Excellence Rigor Across 4 Core Domains</p>
                </div>
                <Link href="/methodology-engine" className="mega-header-link" onClick={closeAll}>
                  <span>Explore Methodology Engine Section</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>

              <div className="mega-menu-grid methodology-grid-4">
                {methodologyCategories.map((cat, idx) => {
                  const Icon = cat.icon
                  return (
                    <div key={idx} className="methodology-nav-card">
                      <div className="method-card-header">
                        <div className="method-icon-box">
                          <Icon size={16} />
                        </div>
                        <h4>{cat.title}</h4>
                      </div>
                      <p className="method-card-desc">{cat.desc}</p>
                      <ul className="method-items-list">
                        {cat.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <span className="method-item-bullet" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>

              <div className="mega-menu-footer">
                <Link href="/methodology-engine" className="mega-footer-link" onClick={closeAll}>
                  <Sparkles size={14} />
                  <span>Learn how persistent AI agent fleets automate 80+ industrial engineering methodologies</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 5. ABOUT US DROPDOWN / MEGA MENU */}
        <div className="nav-dropdown-wrapper">
          <button
            className={`nav-menu-trigger ${activeMenu === 'about' ? 'active' : ''}`}
            onClick={() => toggleMenu('about')}
            aria-expanded={activeMenu === 'about'}
          >
            <span>About Us</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'about' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'about' && (
            <div className="mega-menu about-mega-menu" onMouseLeave={() => setActiveMenu(null)}>
              <div className="mega-menu-header">
                <div>
                  <span className="mega-menu-badge">COMPANY & TALENT</span>
                  <p>Full-Spectrum AI Engineering Company for the Global AI Economy</p>
                </div>
                <Link href="/about" className="mega-header-link" onClick={closeAll}>
                  <span>Explore Full Profile</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>

              <div className="mega-menu-grid about-menu-grid">
                {aboutMenuItems.map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      className="about-item-card"
                      onClick={closeAll}
                    >
                      <div className="about-item-icon">
                        <Icon size={16} />
                      </div>
                      <div className="about-item-text">
                        <div className="about-item-heading">
                          <span>{item.label}</span>
                          <ArrowUpRight size={12} className="ml-auto opacity-40 hover-show" />
                        </div>
                        <p>{item.desc}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>

              <div className="mega-menu-footer">
                <Link href="/about" className="mega-footer-link" onClick={closeAll}>
                  <Building2 size={14} />
                  <span>Explore mission, vision, executive leadership, global offices, and research labs</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 6. INSIGHTS DROPDOWN / MEGA MENU */}
        <div className="nav-dropdown-wrapper">
          <button
            className={`nav-menu-trigger ${activeMenu === 'insights' ? 'active' : ''}`}
            onClick={() => toggleMenu('insights')}
            aria-expanded={activeMenu === 'insights'}
          >
            <span>Insights</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'insights' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'insights' && (
            <div className="mega-menu insights-dropdown-menu" onMouseLeave={() => setActiveMenu(null)}>
              <div className="mega-menu-header">
                <div>
                  <span className="mega-menu-badge">PUBLICATIONS, BENCHMARKS & RESEARCH</span>
                  <p>AI Insights, Case Studies, Whitepapers, Research & Engineering Resources</p>
                </div>
                <Link href="/insights" className="mega-header-link" onClick={closeAll}>
                  <span>View All Insights</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>

              <div className="mega-menu-grid insights-menu-grid">
                {insightsMenuItems.map((item, idx) => {
                  const Icon = item.icon
                  return item.isExternal ? (
                    <a
                      key={idx}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="insights-item-card"
                      onClick={closeAll}
                    >
                      <div className="insights-item-icon">
                        <Icon size={16} />
                      </div>
                      <div className="insights-item-text">
                        <div className="insights-item-heading">
                          <span>{item.label}</span>
                          <ArrowUpRight size={12} className="ml-auto opacity-70" />
                        </div>
                        <p>{item.desc}</p>
                      </div>
                    </a>
                  ) : (
                    <Link
                      key={idx}
                      href={item.href}
                      className="insights-item-card"
                      onClick={closeAll}
                    >
                      <div className="insights-item-icon">
                        <Icon size={16} />
                      </div>
                      <div className="insights-item-text">
                        <div className="insights-item-heading">
                          <span>{item.label}</span>
                          <ArrowUpRight size={12} className="ml-auto opacity-40 hover-show" />
                        </div>
                        <p>{item.desc}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>

              <div className="mega-menu-footer">
                <Link href="/insights" className="mega-footer-link" onClick={closeAll}>
                  <BookOpen size={14} />
                  <span>Access complete research library and token optimization frameworks</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 7. PRIMARY CTA: BOOK YOUR AI DIAGNOSTIC */}
        <Link
          href="/book-ai-diagnostic"
          className="nav-cta"
          onClick={closeAll}
        >
          <span>Book Your AI Diagnostic</span>
          <ArrowUpRight size={15} />
        </Link>
      </nav>

      {/* MOBILE HAMBURGER BUTTON */}
      <button
        className="menu-button"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-content">
            <Link href="/" className="mobile-nav-link" onClick={closeAll}>
              Home
            </Link>

            {/* Mobile Solutions Section (always expanded) */}
            <div className="mobile-accordion">
              <span className="mobile-accordion-btn mobile-accordion-label">
                <span>Solutions</span>
              </span>
              <div className="mobile-accordion-body">
                {solutions.map((s) => {
                  return (
                      <div key={s.slug} className="mobile-sol-item">
                        <div className="mobile-sol-header-row">
                          <Link
                            href={`/solutions/${s.slug}`}
                            className="mobile-sublink flex-1"
                            onClick={closeAll}
                          >
                            <span className="mob-num">{s.number}</span>
                            <span>{s.shortTitle}</span>
                          </Link>
                        </div>
                      </div>
                    )
                })}
              </div>
            </div>

            {/* Mobile Industries Accordion */}
            <div className="mobile-accordion">
              <button
                className="mobile-accordion-btn"
                onClick={() => toggleMobileSection('industries')}
              >
                <span>Industries</span>
                <ChevronDown size={16} className={`chevron-icon ${mobileSection === 'industries' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'industries' && (
                <div className="mobile-accordion-body">
                  <Link href="/industries" className="mobile-sublink font-semibold" onClick={closeAll}>
                    <span>View All 12 Industries Directory →</span>
                  </Link>
                  {industriesData.map((ind) => (
                    <Link
                      key={ind.id}
                      href={`/industries#${ind.slug}`}
                      className="mobile-sublink"
                      onClick={closeAll}
                    >
                      <span>{ind.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Methodology Accordion */}
            <div className="mobile-accordion">
              <button
                className="mobile-accordion-btn"
                onClick={() => toggleMobileSection('methodology')}
              >
                <span>AI Methodology</span>
                <ChevronDown size={16} className={`chevron-icon ${mobileSection === 'methodology' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'methodology' && (
                <div className="mobile-accordion-body">
                  <Link href="/methodology-engine" className="mobile-sublink font-semibold" onClick={closeAll}>
                    <span>Complete Methodology Engine →</span>
                  </Link>
                  {methodologyCategories.map((cat, i) => (
                    <div key={i} className="mobile-method-block">
                      <strong>{cat.title}</strong>
                      <p>{cat.items.join(', ')}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile About Us Accordion */}
            <div className="mobile-accordion">
              <button
                className="mobile-accordion-btn"
                onClick={() => toggleMobileSection('about')}
              >
                <span>About Us</span>
                <ChevronDown size={16} className={`chevron-icon ${mobileSection === 'about' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'about' && (
                <div className="mobile-accordion-body">
                  <Link href="/about" className="mobile-sublink font-semibold" onClick={closeAll}>
                    <span>About TrustGrid.AI Overview →</span>
                  </Link>
                  {aboutMenuItems.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      className="mobile-sublink"
                      onClick={closeAll}
                    >
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Insights Accordion */}
            <div className="mobile-accordion">
              <button
                className="mobile-accordion-btn"
                onClick={() => toggleMobileSection('insights')}
              >
                <span>Insights</span>
                <ChevronDown size={16} className={`chevron-icon ${mobileSection === 'insights' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'insights' && (
                <div className="mobile-accordion-body">
                  {insightsMenuItems.map((item, i) =>
                    item.isExternal ? (
                      <a
                        key={i}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mobile-sublink font-semibold text-blue-600"
                        onClick={closeAll}
                      >
                        <span>{item.label} (Live App) ↗</span>
                      </a>
                    ) : (
                      <Link
                        key={i}
                        href={item.href}
                        className="mobile-sublink"
                        onClick={closeAll}
                      >
                        <span>{item.label}</span>
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>

            <div className="mobile-cta-wrapper">
              <Link
                href="/book-ai-diagnostic"
                className="button button-primary button-full"
                onClick={closeAll}
              >
                <span>Book Your AI Diagnostic</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}



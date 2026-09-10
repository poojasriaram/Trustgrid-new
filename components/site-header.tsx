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

const commonFoundationMenuItems = [
  {
    label: 'Industries',
    href: '/industries',
    icon: Building2,
    desc: '20+ specialized enterprise verticals from banking to aerospace & defense'
  },
  {
    label: 'Methodology Engine',
    href: '/methodology-engine',
    icon: Sparkles,
    desc: 'Lean, TOC, DMAIC, OEE, TPM and operational AI engineering models'
  },
  {
    label: 'Engagement Models',
    href: '/request-proposal',
    icon: Workflow,
    desc: 'Diagnostic, sprint, co-engineering, and turnkey delivery frameworks'
  },
  {
    label: 'Key Metrics',
    href: '/sitemap',
    icon: BarChart3,
    desc: 'Measurable enterprise impact, GPU yield, latency & P&L outcomes'
  },
  {
    label: 'Technology Ecosystem',
    href: '/partners',
    icon: Network,
    desc: 'Hardware accelerators, silicon platforms, orchestration & PQC stacks'
  },
  {
    label: 'Book Your AI Diagnostic',
    href: '/book-ai-diagnostic',
    icon: ArrowUpRight,
    desc: 'Executive technical & financial evaluation of enterprise AI readiness'
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

const solutionGroups = [
  {
    num: '01',
    groupTag: 'GROUP 1',
    name: 'GROUP 1 — AGENTIC ENTERPRISE',
    title: 'AGENTIC ENTERPRISE',
    slug: 'ai-agentic-factory',
    sitemapAnchor: 'group-1',
    desc: 'Autonomous Agent Design, Multi-Agent Orchestration, Vertical Agent Fleets & Governed AgentOps',
    icon: Bot,
  },
  {
    num: '02',
    groupTag: 'GROUP 2',
    name: 'GROUP 2 — AI INFRASTRUCTURE & AI DATA CENTER ENGINEERING',
    title: 'AI INFRASTRUCTURE & AI DATA CENTER ENGINEERING',
    slug: 'ai-infra-engineering',
    sitemapAnchor: 'group-2',
    desc: 'Strategic Site Due Diligence, High-Density Facilities (30–100kW), GPU Acceleration & Cluster Fabric',
    icon: Cpu,
  },
  {
    num: '03',
    groupTag: 'GROUP 3',
    name: 'GROUP 3 — AI NETWORKING',
    title: 'AI NETWORKING',
    slug: 'ai-networking',
    sitemapAnchor: 'group-3',
    desc: 'Enterprise & DC Fabrics, Non-Terrestrial Networks (NTN / Satellite / FSO) & Autonomous AI NOC',
    icon: Network,
  },
  {
    num: '04',
    groupTag: 'GROUP 4',
    name: 'GROUP 4 — AI CYBERSECURITY & QUANTUM-SAFE NETWORKING',
    title: 'AI CYBERSECURITY & QUANTUM-SAFE NETWORKING',
    slug: 'ai-cybersecurity-quantum-safe',
    sitemapAnchor: 'group-4',
    desc: 'L1–L7 Post-Quantum Cryptography (PQC / CBOM), Agent Guardrails, Zero-Trust & Managed AI SOC',
    icon: Lock,
  },
  {
    num: '05',
    groupTag: 'GROUP 5',
    name: 'GROUP 5 — TRUSTED AI ENGINEERING',
    title: 'TRUSTED AI ENGINEERING',
    slug: 'trusted-ai-transformation',
    sitemapAnchor: 'group-5',
    desc: 'Mathematical Explainability (SHAP/LIME), Formal Robustness, Responsible AI & Continuous SPC',
    icon: ShieldCheck,
  },
  {
    num: '06',
    groupTag: 'GROUP 6',
    name: 'GROUP 6 — AI VALUE ENGINEERING & ACCELERATION',
    title: 'AI VALUE ENGINEERING & ACCELERATION',
    slug: 'ai-value-engineering',
    sitemapAnchor: 'group-6',
    desc: 'Value Discovery, FinOps Unit Economics, Acceleration Sprints & Enterprise Operating System',
    icon: TrendingUp,
  },
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

        {/* 2. AGENTIC ENTERPRISE */}
        <Link href="/solutions/ai-agentic-factory" className="nav-link" onClick={closeAll}>
          Agentic Enterprise
        </Link>

        {/* 3. AI INFRA & DATA CENTER */}
        <Link href="/solutions/ai-infra-engineering" className="nav-link" onClick={closeAll}>
          AI Infra & Data Center
        </Link>

        {/* 4. AI NETWORKING */}
        <Link href="/solutions/ai-networking" className="nav-link" onClick={closeAll}>
          AI Networking
        </Link>

        {/* 5. AI CYBERSECURITY */}
        <Link href="/solutions/ai-cybersecurity-quantum-safe" className="nav-link" onClick={closeAll}>
          AI Cybersecurity
        </Link>

        {/* 6. AI VALUE ENGINEERING */}
        <Link href="/solutions/ai-value-engineering" className="nav-link" onClick={closeAll}>
          AI Value Engineering
        </Link>

        {/* 7. COMMON FOUNDATION */}
        <div className="nav-dropdown-wrapper">
          <button
            className={`nav-menu-trigger ${activeMenu === 'foundation' ? 'active' : ''}`}
            onClick={() => toggleMenu('foundation')}
            aria-expanded={activeMenu === 'foundation'}
          >
            <span>Common Foundation</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'foundation' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'foundation' && (
            <div className="mega-menu common-foundation-mega-menu" onMouseLeave={() => setActiveMenu(null)}>
              <div className="mega-menu-header">
                <div>
                  <span className="mega-menu-badge">STRATEGIC ENABLERS</span>
                  <p>Enterprise Frameworks, Industry Blueprints & Engagement Models</p>
                </div>
                <Link href="/sitemap" className="mega-header-link" onClick={closeAll}>
                  <span>Full Taxonomy</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>

              <div className="mega-menu-grid about-menu-grid">
                {commonFoundationMenuItems.map((item, idx) => {
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
                <Link href="/book-ai-diagnostic" className="mega-footer-link" onClick={closeAll}>
                  <Sparkles size={14} />
                  <span>Schedule your executive technical & economic AI diagnostic</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 8. ABOUT US */}
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

            <Link href="/solutions/ai-agentic-factory" className="mobile-nav-link" onClick={closeAll}>
              Agentic Enterprise
            </Link>

            <Link href="/solutions/ai-infra-engineering" className="mobile-nav-link" onClick={closeAll}>
              AI Infra & Data Center
            </Link>

            <Link href="/solutions/ai-networking" className="mobile-nav-link" onClick={closeAll}>
              AI Networking
            </Link>

            <Link href="/solutions/ai-cybersecurity-quantum-safe" className="mobile-nav-link" onClick={closeAll}>
              AI Cybersecurity
            </Link>

            <Link href="/solutions/ai-value-engineering" className="mobile-nav-link" onClick={closeAll}>
              AI Value Engineering
            </Link>

            {/* Mobile Common Foundation Accordion */}
            <div className="mobile-accordion">
              <button
                className="mobile-accordion-btn"
                onClick={() => toggleMobileSection('foundation')}
              >
                <span>Common Foundation</span>
                <ChevronDown size={16} className={`chevron-icon ${mobileSection === 'foundation' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'foundation' && (
                <div className="mobile-accordion-body">
                  {commonFoundationMenuItems.map((item, i) => (
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
          </div>
        </div>
      )}
    </header>
  )
}



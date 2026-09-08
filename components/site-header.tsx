'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ChevronDown, Menu, X, Sparkles, Building2, Users, Award, MapPin, Globe2, FileText, Phone } from 'lucide-react'
import { logoUrl, solutions } from '@/lib/solutions'

const aboutMenuItems = [
  { label: 'About TrustGrid.AI', href: '/about', icon: Building2, desc: 'Our mission, vision, and full-spectrum engineering verticals' },
  { label: 'Leadership & Teams', href: '/about#teams', icon: Users, desc: 'World-class AI architects, systems leads, and advisory board' },
  { label: 'Careers & Hackathons', href: '/about#careers-hackathons', icon: Award, desc: 'Frontier AI hackathons, research fellowships, and open roles' },
  { label: 'Global Presence', href: '/about#presence', icon: MapPin, desc: 'Executive offices in US, Singapore, and India R&D labs' },
  { label: 'Case Studies', href: '/about#case-studies', icon: FileText, desc: 'Production outcomes across defense, banking, and enterprise AI' },
  { label: 'Methodology Engine', href: '/methodology-engine', icon: Sparkles, desc: 'Proprietary AI-driven methodology implementation framework' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}>
      <Link className="brand" href="/" aria-label="TrustGrid.ai home">
        <img src={logoUrl} alt="TrustGrid.ai" />
      </Link>

      <nav className={`nav ${open ? 'nav-open' : ''}`} aria-label="Primary navigation">
        {/* SOLUTIONS DROPDOWN */}
        <div className="nav-solutions">
          <button
            className={`nav-menu-trigger ${solutionsOpen ? 'active' : ''}`}
            onClick={() => {
              setSolutionsOpen(!solutionsOpen)
              setAboutOpen(false)
            }}
            aria-expanded={solutionsOpen}
          >
            <span>Solutions</span>
            <ChevronDown size={14} className={`chevron-icon ${solutionsOpen ? 'rotate-180' : ''}`} />
          </button>
          {solutionsOpen && (
            <div className="mega-menu" onMouseLeave={() => setSolutionsOpen(false)}>
              <div className="mega-menu-header">
                <span className="mega-menu-badge">THE ENTERPRISE AI OPERATING STACK</span>
                <p>6 vertically integrated engineering domains for the AGI era</p>
              </div>
              <div className="mega-menu-grid">
                {solutions.map((solution) => (
                  <Link
                    key={solution.slug}
                    href={`/solutions/${solution.slug}`}
                    className="mega-menu-item"
                    onClick={() => {
                      setOpen(false)
                      setSolutionsOpen(false)
                    }}
                  >
                    <div className="mega-item-top">
                      <span className="mega-item-num">{solution.number}</span>
                      <span className="mega-item-label">{solution.shortTitle}</span>
                    </div>
                    <p className="mega-item-desc">{solution.heroStatement.slice(0, 95)}...</p>
                  </Link>
                ))}
              </div>
              <div className="mega-menu-footer">
                <Link
                  href="/book-ai-diagnostic"
                  className="mega-footer-link"
                  onClick={() => {
                    setOpen(false)
                    setSolutionsOpen(false)
                  }}
                >
                  <Sparkles size={14} />
                  <span>Not sure where to start? <strong>Book an AI Diagnostic Assessment</strong></span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ABOUT US DROPDOWN */}
        <div className="nav-solutions">
          <button
            className={`nav-menu-trigger ${aboutOpen ? 'active' : ''}`}
            onClick={() => {
              setAboutOpen(!aboutOpen)
              setSolutionsOpen(false)
            }}
            aria-expanded={aboutOpen}
          >
            <span>About Us</span>
            <ChevronDown size={14} className={`chevron-icon ${aboutOpen ? 'rotate-180' : ''}`} />
          </button>
          {aboutOpen && (
            <div className="mega-menu about-mega-menu" onMouseLeave={() => setAboutOpen(false)}>
              <div className="mega-menu-header">
                <span className="mega-menu-badge">COMPANY & TALENT</span>
                <p>Full-Spectrum AI Engineering Company for the Global AI Economy</p>
              </div>
              <div className="mega-menu-grid about-menu-grid">
                {aboutMenuItems.map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      className="mega-menu-item"
                      onClick={() => {
                        setOpen(false)
                        setAboutOpen(false)
                      }}
                    >
                      <div className="mega-item-top">
                        <Icon size={16} className="text-blue-600" />
                        <span className="mega-item-label">{item.label}</span>
                      </div>
                      <p className="mega-item-desc">{item.desc}</p>
                    </Link>
                  )
                })}
              </div>
              <div className="mega-menu-footer">
                <Link
                  href="/about"
                  className="mega-footer-link"
                  onClick={() => {
                    setOpen(false)
                    setAboutOpen(false)
                  }}
                >
                  <Building2 size={14} />
                  <span>Explore Full Company Profile & Architecture</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>

        <Link href="/#why" onClick={() => setOpen(false)}>The 5 Gaps</Link>
        <Link href="/#stack" onClick={() => setOpen(false)}>Architecture Stack</Link>
        <Link href="/#methodology" onClick={() => setOpen(false)}>Methodology Engine</Link>
        <Link href="/#differentiation" onClick={() => setOpen(false)}>Why TrustGrid</Link>

        <Link
          href="/book-ai-diagnostic"
          className="nav-cta"
          onClick={() => setOpen(false)}
        >
          <span>Book AI Diagnostic</span>
          <ArrowUpRight size={15} />
        </Link>
      </nav>

      <button
        className="menu-button"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Bot,
  ShieldCheck,
  Zap,
  Globe2,
  Users,
  Target,
  Award,
  Building2,
  Mail,
  Phone,
  Compass,
  FileText,
  Workflow,
  TrendingUp,
  MapPin,
  ExternalLink,
  Code2,
  GraduationCap
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import {
  aboutHero,
  missionVision,
  whatWeDoVerticals,
  metricsFootprint,
  societalValueAddition,
  culturePrinciples,
  teamMembers,
  openInnovationInitiatives,
  caseStudiesList,
  officeLocations,
  aboutNavMenu
} from '@/lib/about-data'

export const metadata: Metadata = {
  title: 'About Us | TrustGrid.AI — Full-Spectrum AI Engineering',
  description: "TrustGrid.AI designs, builds, optimizes, and secures enterprise AI infrastructure, GPU clusters, Agentic AI systems, and autonomous business operations.",
}

export default function AboutPage() {
  return (
    <main className="page-wrapper">
      <SiteHeader />

      {/* ABOUT HERO */}
      <section className="about-hero-section">
        <div className="about-hero-badge-row">
          <span className="section-badge">ABOUT TRUSTGRID.AI</span>
          <span className="hero-badge-tag">{aboutHero.eyebrow}</span>
        </div>

        <h1 className="about-hero-title">
          Engineering the resilient, hyper-optimized backbone of the <em>AI economy.</em>
        </h1>

        <p className="about-hero-desc">{aboutHero.description}</p>

        <div className="about-quick-nav">
          {aboutNavMenu.map((item, idx) => (
            <Link key={idx} href={item.href} className="quick-nav-pill">
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="section mission-vision-section" id="mission-vision">
        <div className="mission-vision-grid">
          {/* Mission Card */}
          <div className="mv-card mission-card">
            <div className="mv-badge">
              <Compass size={16} />
              <span>CORE PURPOSE</span>
            </div>
            <h2>{missionVision.mission.title}</h2>
            <p className="mv-statement">{missionVision.mission.statement}</p>
            <div className="mv-divider" />
            <p className="mv-detail">{missionVision.mission.description}</p>
          </div>

          {/* Vision Card */}
          <div className="mv-card vision-card">
            <div className="mv-badge">
              <Target size={16} />
              <span>NORTH STAR</span>
            </div>
            <h2>{missionVision.vision.title}</h2>
            <p className="mv-statement">{missionVision.vision.statement}</p>
            <div className="mv-divider" />
            <p className="mv-detail">{missionVision.vision.description}</p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO / FIVE INTERCONNECTED VERTICALS */}
      <section className="section what-we-do-section" id="specialization">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">DEEP-TECH SPECIALIZATION</span>
            <p className="section-label">What We Do</p>
          </div>
          <span className="section-index">01</span>
        </div>

        <div className="what-we-do-header">
          <h2>
            We do not build AI models; <span>we build the engines that make AI work at scale.</span>
          </h2>
          <p>
            TrustGrid.AI specializes in deep-tech professional services across five interconnected architectural verticals.
          </p>
        </div>

        <div className="verticals-grid">
          {whatWeDoVerticals.map((v) => (
            <div key={v.number} className="vertical-card">
              <span className="vertical-num">{v.number}</span>
              <h3>{v.title}</h3>
              <p>{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* METRICS FOOTPRINT */}
      <section className="section metrics-footprint-section" id="metrics">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">GLOBAL IMPACT</span>
            <p className="section-label">Our Metrics Footprint</p>
          </div>
          <span className="section-index">02</span>
        </div>

        <div className="metrics-banner">
          <h3>Operating at Frontier Scale</h3>
          <p>Designed and engineered to sustainably impact global AI infrastructure.</p>
        </div>

        <div className="metrics-cards-grid">
          {metricsFootprint.map((m, idx) => (
            <div key={idx} className="metric-stat-card">
              <div className="stat-val">{m.value}</div>
              <div className="stat-lbl">{m.label}</div>
              {m.sub && <div className="stat-sub">{m.sub}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* SOCIETAL VALUE ADDITION */}
      <section className="section societal-value-section" id="value-addition">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">PURPOSE-DRIVEN</span>
            <p className="section-label">Accelerating AI for Society</p>
          </div>
          <span className="section-index">03</span>
        </div>

        <div className="societal-intro-banner">
          <h2>The TrustGrid.AI Value Addition</h2>
          <p>
            The bottleneck to humanity's next great leap forward is physical, not algorithmic. TrustGrid.AI serves as the critical catalyst between theoretical breakthroughs and real-world societal impact.
          </p>
        </div>

        <div className="societal-grid">
          {societalValueAddition.map((item, idx) => (
            <div key={idx} className="societal-card">
              <span className="societal-cat">{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OUR CULTURE: RADICAL ENGINEERING PRECISION */}
      <section className="section culture-section" id="culture">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">CORE DNA</span>
            <p className="section-label">Our Culture</p>
          </div>
          <span className="section-index">04</span>
        </div>

        <div className="culture-header">
          <h2>Radical Engineering Precision</h2>
          <p>
            We are a collective of systems architects, hardware hackers, and AI strategists who thrive in the technical trenches of the world's most complex infrastructure.
          </p>
        </div>

        <div className="culture-grid">
          {culturePrinciples.map((principle, idx) => (
            <div key={idx} className="culture-card">
              <div className="culture-num">0{idx + 1}</div>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LEADERSHIP & TEAMS */}
      <section className="section team-section" id="teams">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">WORLD-CLASS TALENT</span>
            <p className="section-label">Leadership & Teams</p>
          </div>
          <span className="section-index">05</span>
        </div>

        <div className="team-header">
          <h2>The Architects & Engineers Behind TrustGrid</h2>
          <p>
            A powerhouse of AI systems architects, blockchain leads, and industry advisors building the future of autonomous enterprise operations.
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="member-card">
              <div className="member-avatar-placeholder">
                <Users size={24} />
              </div>
              <div className="member-info">
                <h4>{member.name}</h4>
                <p className="member-role">{member.role}</p>
                {member.badge && <span className="member-badge">{member.badge}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CAREERS, HACKATHONS & OPEN INNOVATION */}
      <section className="section innovation-section" id="careers-hackathons">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">COMMUNITY & TALENT</span>
            <p className="section-label">Careers, Hackathons & Open Innovation</p>
          </div>
          <span className="section-index">06</span>
        </div>

        <div className="innovation-header">
          <h2>Empowering Frontier Engineering Talent</h2>
          <p>
            We empower top-tier engineering talent and student researchers to solve real-world industrial challenges through hackathons, open research labs, and high-impact careers.
          </p>
        </div>

        <div className="innovation-cards-grid">
          {openInnovationInitiatives.map((init, idx) => (
            <div key={idx} className="innovation-card">
              <div className="init-top">
                <span className="init-badge">{init.badge}</span>
              </div>
              <h3>{init.title}</h3>
              <p className="init-desc">{init.description}</p>

              <div className="init-highlights">
                <strong>Key Highlights:</strong>
                <ul>
                  {init.highlights.map((h, hIdx) => (
                    <li key={hIdx}>
                      <CheckCircle2 size={14} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {init.isExternal ? (
                <a
                  href={init.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-primary button-sm"
                  style={{ textDecoration: 'none' }}
                >
                  <span>{init.linkText}</span>
                  <ArrowUpRight size={14} />
                </a>
              ) : (
                <Link href={init.url || "/book-ai-diagnostic"} className="button button-ghost button-sm">
                  <span>{init.linkText}</span>
                  <ArrowUpRight size={14} />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="section case-studies-section" id="case-studies">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">PROVEN OUTCOMES</span>
            <p className="section-label">Enterprise Case Studies</p>
          </div>
          <span className="section-index">07</span>
        </div>

        <div className="case-studies-header">
          <h2>Production AI, Measured in Outcomes</h2>
          <p>A selection of recent enterprise engagements. Client identities protected under mutual NDA.</p>
        </div>

        <div className="case-studies-grid">
          {caseStudiesList.map((cs, idx) => (
            <div key={idx} className="case-study-card">
              <div className="cs-top">
                <span className="cs-industry">{cs.industry}</span>
                <h4>{cs.client}</h4>
              </div>

              <div className="cs-block">
                <strong>Situation & Challenge:</strong>
                <p>{cs.situation}</p>
              </div>

              <div className="cs-block">
                <strong>Engineering Intervention:</strong>
                <ul>
                  {cs.interventionItems.map((item, iIdx) => (
                    <li key={iIdx}>
                      <span className="font-semibold text-blue-400">{item.label}:</span> {item.detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="cs-outcome-box">
                <strong>Outcome:</strong>
                <p>{cs.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GLOBAL PRESENCE & OFFICES */}
      <section className="section presence-section" id="presence">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">WORLDWIDE FOOTPRINT</span>
            <p className="section-label">Global Operations & Offices</p>
          </div>
          <span className="section-index">08</span>
        </div>

        <div className="presence-header">
          <h2>Operating in Key Global Tech Hubs</h2>
          <p>Our engineering clusters and executive offices operate in key international hubs to serve global enterprises.</p>
        </div>

        <div className="offices-grid">
          {officeLocations.map((office, idx) => (
            <div key={idx} className="office-card">
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
                    <span>{office.phone}</span>
                  </div>
                )}
                <div className="contact-row">
                  <Mail size={14} />
                  <span>{office.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section cta-section" id="contact">
        <div className="cta-panel">
          <div className="cta-content">
            <span className="section-label" style={{ color: '#91b3ff' }}>SCHEDULE AN ENTERPRISE CONSULTATION</span>
            <h2>Speak with a TrustGrid.AI Principal Engineer</h2>
            <p className="cta-lead">
              Engagements are led by principal engineers with experience deploying production AI at Fortune 500 scale. Most engagements begin with a tailored 48-hour capability assessment.
            </p>
          </div>
          <div className="cta-actions">
            <Link className="button button-light" href="/book-ai-diagnostic">
              Book Your AI Diagnostic <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

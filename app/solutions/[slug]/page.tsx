import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowUpRight,
  ChevronRight,
  Check,
  Cpu,
  Bot,
  ShieldCheck,
  Lock,
  Network,
  TrendingUp,
  Layers,
  Sparkles,
  Briefcase,
  Wrench,
  Gauge,
  Calendar,
  Building2,
  Workflow,
  Target,
  BarChart3,
} from 'lucide-react'
import { getSolution, solutions, allIndustries, Solution, logoUrl } from '@/lib/solutions'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

const solutionIcons = {
  'ai-infra-engineering': Cpu,
  'ai-agentic-factory': Bot,
  'trusted-ai-transformation': ShieldCheck,
  'ai-cybersecurity-quantum-safe': Lock,
  'ai-networking': Network,
  'ai-value-engineering': TrendingUp,
}

// Decorative upward-trending analytic sparklines cycled across the engagement model cards
const sparkPatterns = [
  '0,26 15,20 30,22 45,14 60,16 75,8 90,10 105,4 120,6',
  '0,24 15,26 30,18 45,20 60,12 75,14 90,6 105,8 120,2',
  '0,28 15,22 30,24 45,16 60,18 75,10 90,12 105,5 120,3',
  '0,20 15,24 30,16 45,18 60,10 75,12 90,5 105,7 120,2',
  '0,26 15,18 30,20 45,12 60,14 75,6 90,8 105,3 120,5',
  '0,22 15,16 30,18 45,10 60,12 75,4 90,6 105,2 120,4',
]

export function generateStaticParams() {
  const params: { slug: string }[] = []
  solutions.forEach((sol) => {
    params.push({ slug: sol.slug })
    if (sol.aliases) {
      sol.aliases.forEach((alias) => params.push({ slug: alias }))
    }
  })
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const solution = getSolution(slug)
  if (!solution) return {}

  return {
    title: `${solution.label} | TrustGrid.ai`,
    description: solution.heroStatement,
    alternates: { canonical: `/solutions/${solution.slug}` },
    openGraph: {
      title: `${solution.label} | TrustGrid.ai`,
      description: solution.heroStatement,
    },
  }
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const solution = getSolution(slug)
  if (!solution) notFound()

  // Find index in main list and get next solution for continuous journey
  const currentIndex = solutions.findIndex((s) => s.slug === solution.slug)
  const nextSolution = solutions[(currentIndex + 1) % solutions.length]
  const relatedSolutions = solutions.filter((s) => s.slug !== solution.slug).slice(0, 3)
  const SolutionIcon = solutionIcons[solution.slug as keyof typeof solutionIcons] || Cpu

  return (
    <main className="page-wrapper">
      <SiteHeader />

      {/* HERO */}
      <section className="solution-hero">
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="solution-badge-row">
            <span className="solution-badge-num">{solution.number}</span>
            <span className="solution-badge-label">{solution.label}</span>
          </div>

          <h1 className="solution-hero-title">{solution.shortTitle}</h1>

          <p className="solution-hero-copy">{solution.heroStatement}</p>

          <div className="solution-hero-actions">
            <Link
              className="button button-primary"
              href={`/book-ai-diagnostic?solution=${solution.slug}`}
            >
              Book {solution.shortTitle} Diagnostic <ArrowUpRight size={17} />
            </Link>
            <a className="button button-ghost" href="#offerings">
              Explore Offerings <ChevronRight size={16} />
            </a>
            <a className="text-link" href="#methodology">
              Methodology Engine <span>→</span>
            </a>
          </div>
        </div>

        <div className="hero-footer">
          <span>{solution.label}</span>
          <span>THE ENTERPRISE AI OPERATING COMPANY</span>
        </div>
      </section>

      {/* SECTION 1: MARKET CONTEXT & OVERVIEW */}
      <section className="section solution-context-section" id="overview">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">01 / MARKET CONTEXT & PROBLEM</span>
            <p className="section-label">The Operational Imperative</p>
          </div>
          <span className="section-index">01</span>
        </div>

        <div className="context-two-col">
          <div className="context-left">
            <h2 className="context-heading">
              The hard truths enterprises face in <span>{solution.shortTitle}.</span>
            </h2>
            <div className="market-context-box">
              <h4>Market Context</h4>
              <p>{solution.marketContext}</p>
            </div>
          </div>

          <div className="context-right">
            <div className="problem-statement-box">
              <h4>The Architectural Problem</h4>
              <p>{solution.problemStatement}</p>
            </div>

            <div className="overview-box">
              <h4>TrustGrid Overview</h4>
              <p>{solution.overview}</p>
            </div>

            <Link
              className="inline-diagnostic-link"
              href={`/book-ai-diagnostic?solution=${solution.slug}`}
            >
              <span>Assess your organization's posture in this domain</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: CORE OFFERINGS */}
      <section className="section solution-offerings-section" id="offerings">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">02 / CORE OFFERINGS</span>
            <p className="section-label">Engineering Capabilities & Services</p>
          </div>
          <span className="section-index">02</span>
        </div>

        <div className="offerings-header">
          <h2>
            Production-grade capabilities, <span>engineered for compounding return.</span>
          </h2>
          <p>
            We do not hand you a strategy deck and walk away. We design, build, deploy, govern, and continuously optimize these capabilities in production.
          </p>
        </div>

        <div className="offerings-grid-detailed">
          {solution.offerings.map((offering, idx) => (
            <div key={offering.title} className="offering-card-detailed animated-card reveal-up">
              <div className="offering-card-top">
                <span className="offering-num">0{idx + 1}</span>
                <h3 className="offering-title">{offering.title}</h3>
              </div>
              <p className="offering-desc">{offering.description}</p>
              {offering.subItems && offering.subItems.length > 0 && (
                <div className="offering-subitems">
                  <span className="subitems-title">Key Engineering Deliverables:</span>
                  <ul>
                    {offering.subItems.map((sub) => (
                      <li key={sub}>
                        <Check size={14} className="text-blue-500 shrink-0 mt-1" />
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: USE CASES */}
      <section className="section solution-usecases-section" id="use-cases">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">03 / PRODUCTION USE CASES</span>
            <p className="section-label">Where the Engineering Becomes Real</p>
          </div>
          <span className="section-index">03</span>
        </div>

        <div className="usecases-header">
          <h2>
            Proven enterprise applications in <span>mission-critical environments.</span>
          </h2>
          <p>
            From private sovereign clusters to multi-agent financial operations and quantum-safe communications.
          </p>
        </div>

        <div className="usecases-grid">
          {solution.useCases.map((useCase, idx) => (
            <article key={useCase.title} className="usecase-card animated-card reveal-up">
              <div className="usecase-card-header">
                <span className="usecase-badge">USE CASE 0{idx + 1}</span>
                <h4>{useCase.title}</h4>
              </div>
              <p>{useCase.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 4: 12 INDUSTRIES APPLICATION */}
      <section className="section solution-industries-section" id="industries">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">04 / 12 INDUSTRIES</span>
            <p className="section-label">Tailored for Consequential Sectors</p>
          </div>
          <span className="section-index">04</span>
        </div>

        <div className="industries-header">
          <h2>
            Engineered for the unique constraints of <span>12 global industries.</span>
          </h2>
          <p>
            Every sector has distinct regulatory, latency, security, and economics requirements. TrustGrid builds to your specific industry environment.
          </p>
        </div>

        <div className="industries-grid">
          {allIndustries.map((ind) => (
            <div key={ind} className="industry-pill-card animated-card reveal-up">
              <Building2 size={18} className="text-blue-500 shrink-0" />
              <span>{ind}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: AI METHODOLOGY ENGINE */}
      <section className="section solution-methodology-section" id="methodology">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">05 / METHODOLOGY ENGINE</span>
            <p className="section-label">{solution.methodologyDomain || 'AI Methodology Engine'}</p>
          </div>
          <span className="section-index">05</span>
        </div>

        <div className="methodology-domain-header">
          <h2>
            Operational excellence applied to <span>{solution.shortTitle}.</span>
          </h2>
          <p>
            How industrial engineering methodologies (Lean, Theory of Constraints, Six Sigma, FMEA, Kaizen, SPC) drive deterministic outcomes.
          </p>
        </div>

        <div className="methodology-table-wrapper">
          <table className="methodology-table">
            <thead>
              <tr>
                <th style={{ width: '28%' }}>Methodology</th>
                <th style={{ width: '72%' }}>Domain Focus & AI Application</th>
              </tr>
            </thead>
            <tbody>
              {solution.methodologies.map((item) => (
                <tr key={item.method}>
                  <td className="method-name">
                    <strong>{item.method}</strong>
                  </td>
                  <td className="method-focus">
                    <span className="focus-arrow">→</span>
                    <span>{item.focus}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sub-methodology if exists (e.g. Enterprise Transformation domain in solution 3) */}
        {solution.subMethodologies && solution.subMethodologies.length > 0 && (
          <div className="sub-methodology-wrapper">
            <div className="sub-methodology-header">
              <h3>{solution.subMethodologyDomain || 'Enterprise Transformation Domain'}</h3>
              <p>Strategic alignment, organizational change, and performance management frameworks.</p>
            </div>
            <table className="methodology-table">
              <thead>
                <tr>
                  <th style={{ width: '28%' }}>Transformation Framework</th>
                  <th style={{ width: '72%' }}>Domain Focus & AI Application</th>
                </tr>
              </thead>
              <tbody>
                {solution.subMethodologies.map((item) => (
                  <tr key={item.method}>
                    <td className="method-name">
                      <strong>{item.method}</strong>
                    </td>
                    <td className="method-focus">
                      <span className="focus-arrow">→</span>
                      <span>{item.focus}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* SECTION 6: DEEP CAPABILITIES */}
      <section className="section solution-capabilities-section" id="capabilities">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">06 / DEEP CAPABILITIES</span>
            <p className="section-label">Engineering Specifications & Architecture</p>
          </div>
          <span className="section-index">06</span>
        </div>

        <div className="capabilities-header">
          <h2>
            Full-stack technical depth from <span>silicon to strategy.</span>
          </h2>
          <p>
            Explore the advanced tools, runtimes, protocols, and architectural specifications we engineer.
          </p>
        </div>

        <div className="capabilities-grid">
          {solution.capabilities.map((group) => (
            <div key={group.category} className="capability-group-card animated-card reveal-up">
              <h4 className="capability-cat-title">{group.category}</h4>
              <ul className="capability-items-list">
                {group.items.map((item) => (
                  <li key={item}>
                    <Check size={14} className="text-blue-500 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: KEY METRICS & BUSINESS IMPACT */}
      <section className="section solution-metrics-section" id="metrics">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">07 / KEY METRICS</span>
            <p className="section-label">Measurable Business Impact</p>
          </div>
          <span className="section-index">07</span>
        </div>

        <div className="metrics-header">
          <h2>
            Quantifiable outcomes, <span>tracked and verified.</span>
          </h2>
          <p>
            Typical performance improvements and efficiency gains achieved across enterprise production deployments.
          </p>
        </div>

        <div className="metrics-table-wrapper">
          <table className="metrics-table">
            <thead>
              <tr>
                <th style={{ width: '60%' }}>Key Performance Metric</th>
                <th style={{ width: '40%' }}>Typical Observed Range</th>
              </tr>
            </thead>
            <tbody>
              {solution.metrics.map((row) => (
                <tr key={row.metric}>
                  <td className="metric-name">{row.metric}</td>
                  <td className="metric-range">
                    <span className="metric-pill">{row.range}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 8: ENGAGEMENT MODELS */}
      <section className="section solution-engagement-section" id="engagement">
        <div className="section-intro">
          <div className="intro-left">
            <span className="section-badge">08 / ENGAGEMENT MODELS</span>
            <p className="section-label">Structured Paths from Diagnostic to Operations</p>
          </div>
          <span className="section-index">08</span>
        </div>

        <div className="engagement-header">
          <h2>
            How we partner with <span>your enterprise.</span>
          </h2>
          <p>
            From targeted 2–3 week audits to full 90-day sprints and ongoing managed operations.
          </p>
        </div>

        <div className="engagement-models-grid">
          {solution.engagementModels.map((model, idx) => (
            <div key={model.title} className="engagement-model-card animated-card reveal-up">
              <div className={`engagement-visual theme-${(idx % 6) + 1}`}>
                <div className="engagement-visual-row">
                  <span className="engagement-visual-logo-badge">
                    <img src={logoUrl} alt="TrustGrid.ai" />
                  </span>
                  <span className="engagement-visual-chip" aria-hidden="true" />
                </div>
                <div className="engagement-visual-mask" aria-hidden="true">
                  <span>•••• ••••</span>
                  <span>{model.number}</span>
                </div>
                <svg className="engagement-visual-spark" viewBox="0 0 120 34" preserveAspectRatio="none" aria-hidden="true">
                  <polyline
                    points={sparkPatterns[idx % sparkPatterns.length]}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="engagement-visual-label">TRUSTGRID.AI · {model.duration}</span>
              </div>

              <div className="engagement-body">
                <div className="engagement-top">
                  <span className="engagement-num">{model.number}</span>
                  <span className="engagement-duration">
                    <Calendar size={13} />
                    {model.duration}
                  </span>
                </div>
                <h3 className="engagement-title">{model.title}</h3>
                <p className="engagement-desc">{model.description}</p>
                <Link
                  href={`/book-ai-diagnostic?solution=${solution.slug}&model=${encodeURIComponent(model.title)}`}
                  className="engagement-cta-link"
                >
                  <span>Select this model</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEXT SOLUTION & CROSS-SOLUTION NAVIGATION */}
      <section className="section next-solution-section">
        <div className="next-solution-card animated-card">
          <div className="next-solution-info">
            <span className="section-label" style={{ color: '#91b3ff' }}>NEXT IN THE OPERATING STACK</span>
            <h2>{nextSolution.label}</h2>
            <p>{nextSolution.heroStatement}</p>
          </div>
          <Link href={`/solutions/${nextSolution.slug}`} className="button button-light">
            <span>Explore {nextSolution.shortTitle}</span>
            <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="related-solutions-block">
          <span className="section-label">ALL 6 SOLUTION PRACTICES</span>
          <div className="related-solutions-grid">
            {solutions.map((item) => (
              <Link
                key={item.slug}
                href={`/solutions/${item.slug}`}
                className={`related-sol-item ${item.slug === solution.slug ? 'current' : ''}`}
              >
                <span className="rel-sol-num">{item.number}</span>
                <strong>{item.shortTitle}</strong>
                <ArrowUpRight size={15} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL SOLUTION CTA */}
      <section className="section solution-cta-final">
        <div className="solution-cta-panel">
          <div className="cta-left">
            <span className="section-label" style={{ color: '#91b3ff' }}>START WITH THE SIGNAL</span>
            <h2>
              Ready to engineer <span>{solution.shortTitle}?</span>
            </h2>
            <p>
              Begin with a structured AI Diagnostic Assessment. Our senior architects will evaluate your current architecture, identify bottlenecks, and deliver an actionable execution roadmap.
            </p>
          </div>
          <div className="cta-right">
            <Link
              className="button button-light"
              href={`/book-ai-diagnostic?solution=${solution.slug}`}
            >
              Book {solution.shortTitle} Diagnostic <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <SiteFooter />
    </main>
  )
}

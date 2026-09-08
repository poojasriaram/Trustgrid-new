import Link from 'next/link'
import { solutions, logoUrl } from '@/lib/solutions'
import { industriesData } from '@/lib/industries-data'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand-col">
          <Link href="/" className="footer-brand-link" aria-label="TrustGrid.ai home">
            <img src={logoUrl} alt="TrustGrid.ai" />
          </Link>
          <p>
            The Enterprise AI Operating Company for the AGI Era. Engineering the complete vertical stack from silicon to strategy.
          </p>
          <div style={{ marginTop: '16px' }}>
            <Link href="/book-ai-diagnostic" className="button button-primary button-sm">
              <span>Book Your AI Diagnostic</span>
            </Link>
          </div>
        </div>

        {/* 1. SOLUTIONS */}
        <div className="footer-links-col">
          <h4>Solutions</h4>
          <ul>
            {solutions.map((sol) => (
              <li key={sol.slug}>
                <Link href={`/solutions/${sol.slug}`}>{sol.shortTitle}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. INDUSTRIES */}
        <div className="footer-links-col">
          <h4>Industries</h4>
          <ul>
            {industriesData.slice(0, 6).map((ind) => (
              <li key={ind.id}>
                <Link href={`/industries#${ind.slug}`}>{ind.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/industries" style={{ color: '#60a5fa', fontWeight: 600 }}>
                View All 12 Industries →
              </Link>
            </li>
          </ul>
        </div>

        {/* 3. METHODOLOGY & INSIGHTS */}
        <div className="footer-links-col">
          <h4>Methodology & Insights</h4>
          <ul>
            <li><Link href="/methodology-engine">AI Methodology Engine</Link></li>
            <li><Link href="/insights">AI Insights & Papers</Link></li>
            <li><Link href="/about#case-studies">Enterprise Case Studies</Link></li>
            <li>
              <a
                href="https://crowd-safety-predictor.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#38bdf8', fontWeight: 600 }}
              >
                Crowd Safety Predictor ↗
              </a>
            </li>
            <li><Link href="/#why">The 5 Enterprise Gaps</Link></li>
            <li><Link href="/#stack">The Operating Stack</Link></li>
          </ul>
        </div>

        {/* 4. COMPANY & TALENT */}
        <div className="footer-links-col">
          <h4>Company</h4>
          <ul>
            <li><Link href="/about">About TrustGrid.AI</Link></li>
            <li><Link href="/about#teams">Leadership & Teams</Link></li>
            <li><Link href="/about#careers-hackathons">Careers & Fellowships</Link></li>
            <li><Link href="/about#presence">Global Offices & Labs</Link></li>
            <li><Link href="/about#value-addition">Societal Value Addition</Link></li>
            <li><Link href="/book-ai-diagnostic">AI Diagnostic Assessment</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 TrustGrid.ai. All rights reserved.</p>
        <div className="footer-bottom-links">
          <Link href="/">Home</Link>
          <Link href="/solutions/ai-infra-engineering">Solutions</Link>
          <Link href="/industries">Industries</Link>
          <Link href="/methodology-engine">AI Methodology</Link>
          <Link href="/about">About Us</Link>
          <Link href="/insights">Insights</Link>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}

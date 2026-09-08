import Link from 'next/link'
import { solutions, logoUrl } from '@/lib/solutions'

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
        </div>

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

        <div className="footer-links-col">
          <h4>Company</h4>
          <ul>
            <li><Link href="/about">About TrustGrid.AI</Link></li>
            <li><Link href="/about#teams">Leadership & Teams</Link></li>
            <li><Link href="/about#careers-hackathons">Careers & Hackathons</Link></li>
            <li><Link href="/about#presence">Global Presence</Link></li>
            <li><Link href="/about#case-studies">Case Studies</Link></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>Architecture</h4>
          <ul>
            <li><Link href="/#why">The 5 Gaps</Link></li>
            <li><Link href="/#stack">Operating Stack</Link></li>
            <li><Link href="/methodology-engine">Methodology Engine</Link></li>
            <li><Link href="/#differentiation">Why TrustGrid</Link></li>
            <li><Link href="/#principles">Operating Principles</Link></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>Diagnostic</h4>
          <ul>
            <li><Link href="/book-ai-diagnostic">Book AI Diagnostic</Link></li>
            <li><a href="mailto:connect@trustgrid.ai">Contact Engineering</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 TrustGrid.ai. All rights reserved.</p>
        <div className="footer-bottom-links">
          <Link href="/about">About Us</Link>
          <Link href="/methodology-engine">Methodology Engine</Link>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}

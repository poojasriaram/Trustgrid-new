'use client'

import { BookOpen, ExternalLink } from 'lucide-react'

interface FurtherReadingItem {
  title: string
  source: string
  url: string
  description: string
}

interface BlogFurtherReadingProps {
  items: FurtherReadingItem[]
}

export function BlogFurtherReading({ items }: BlogFurtherReadingProps) {
  if (!items || items.length === 0) return null

  return (
    <section className="tg-references-section" aria-label="Further Reading and References" id="further-reading">
      <div className="tg-references-header">
        <div className="tg-references-badge">
          <BookOpen size={15} className="text-blue-600" />
          <span>VERIFIED SOURCES & RESEARCH</span>
        </div>
        <h3 className="tg-references-title">Further Reading & Technical References</h3>
        <p className="tg-references-desc">
          Foundational RFC specifications, peer-reviewed networking research, and vendor architectural documentation cited in this engineering analysis.
        </p>
      </div>

      <div className="tg-references-grid">
        {items.map((item, idx) => {
          const isExternal = item.url.startsWith('http')
          return (
            <div key={idx} className="tg-reference-card">
              <div className="tg-reference-card-top">
                <span className="tg-reference-source">{item.source}</span>
                <a
                  href={item.url}
                  target={isExternal ? '_blank' : '_self'}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="tg-reference-link-icon"
                  aria-label={`Open reference: ${item.title}`}
                >
                  <ExternalLink size={14} />
                </a>
              </div>

              <h4 className="tg-reference-heading">
                <a
                  href={item.url}
                  target={isExternal ? '_blank' : '_self'}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="hover:text-blue-600 transition-colors"
                >
                  {item.title}
                </a>
              </h4>

              <p className="tg-reference-desc">{item.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

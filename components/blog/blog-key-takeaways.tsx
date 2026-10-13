'use client'

import { CheckCircle2, Lightbulb } from 'lucide-react'

interface KeyTakeawayItem {
  title: string
  description: string
}

interface BlogKeyTakeawaysProps {
  takeaways: KeyTakeawayItem[]
}

export function BlogKeyTakeaways({ takeaways }: BlogKeyTakeawaysProps) {
  if (!takeaways || takeaways.length === 0) return null

  return (
    <section className="tg-takeaways-card" aria-label="Key Takeaways" id="key-takeaways">
      <div className="tg-takeaways-header">
        <div className="tg-takeaways-icon-badge">
          <Lightbulb size={18} className="text-amber-500" />
        </div>
        <div>
          <span className="tg-takeaways-tag">EXECUTIVE SUMMARY</span>
          <h3 className="tg-takeaways-title">Key Engineering Takeaways</h3>
        </div>
      </div>

      <div className="tg-takeaways-grid">
        {takeaways.map((item, idx) => (
          <div key={idx} className="tg-takeaway-item">
            <div className="tg-takeaway-icon">
              <CheckCircle2 size={16} className="text-blue-600" />
            </div>
            <div className="tg-takeaway-content">
              <h4 className="tg-takeaway-heading">{item.title}</h4>
              <p className="tg-takeaway-text">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

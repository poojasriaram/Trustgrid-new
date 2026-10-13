'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

interface FaqItem {
  question: string
  answer: string
}

interface BlogFaqProps {
  faq: FaqItem[]
}

export function BlogFaq({ faq }: BlogFaqProps) {
  const [openIndices, setOpenIndices] = useState<Record<number, boolean>>({
    0: true // Open first FAQ by default
  })

  if (!faq || faq.length === 0) return null

  const toggleIndex = (idx: number) => {
    setOpenIndices((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }))
  }

  return (
    <section className="tg-faq-section" aria-label="Frequently Asked Questions" id="frequently-asked-questions">
      <div className="tg-faq-header">
        <div className="tg-faq-badge">
          <HelpCircle size={15} className="text-blue-600" />
          <span>TECHNICAL CLARIFICATIONS</span>
        </div>
        <h3 className="tg-faq-title">Frequently Asked Questions</h3>
        <p className="tg-faq-desc">
          Common architectural questions regarding distributed AI fabrics, congestion mechanics, and cluster performance.
        </p>
      </div>

      <div className="tg-faq-list">
        {faq.map((item, idx) => {
          const isOpen = Boolean(openIndices[idx])
          return (
            <div key={idx} className={`tg-faq-card ${isOpen ? 'open' : ''}`}>
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                aria-expanded={isOpen}
                className="tg-faq-question-btn"
              >
                <span className="tg-faq-question-text">{item.question}</span>
                <ChevronDown
                  size={16}
                  className={`tg-faq-chevron ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isOpen && (
                <div className="tg-faq-answer-panel">
                  <p className="tg-faq-answer-text">{item.answer}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

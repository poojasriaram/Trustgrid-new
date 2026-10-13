'use client'

import { useState, useEffect } from 'react'
import { ListOrdered, ChevronRight } from 'lucide-react'

interface TocItem {
  id: string
  title: string
  level: number
}

interface BlogTocProps {
  items: TocItem[]
}

export function BlogToc({ items }: BlogTocProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (!items || items.length === 0) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140

      for (let i = items.length - 1; i >= 0; i--) {
        const element = document.getElementById(items[i].id)
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(items[i].id)
          return
        }
      }

      if (items.length > 0) {
        setActiveId(items[0].id)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [items])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      const headerOffset = 95
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setActiveId(id)
    }
  }

  if (!items || items.length === 0) return null

  return (
    <aside className="tg-toc-wrapper" aria-label="Table of Contents">
      <div className="tg-toc-card">
        <div className="tg-toc-header">
          <ListOrdered size={16} className="text-blue-600" />
          <h4 className="tg-toc-title">Table of Contents</h4>
        </div>

        <nav className="tg-toc-nav">
          <ul className="tg-toc-list">
            {items.map((item) => {
              const isActive = activeId === item.id
              const isSub = item.level === 3

              return (
                <li
                  key={item.id}
                  className={`tg-toc-item ${isSub ? 'tg-toc-sub' : ''}`}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className={`tg-toc-link ${isActive ? 'active' : ''}`}
                  >
                    <ChevronRight
                      size={12}
                      className={`tg-toc-bullet ${isActive ? 'active' : ''}`}
                    />
                    <span>{item.title}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

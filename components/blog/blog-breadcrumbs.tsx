'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BlogBreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function BlogBreadcrumbs({ items }: BlogBreadcrumbsProps) {
  return (
    <nav className="tg-breadcrumbs-nav" aria-label="Breadcrumb">
      <ol className="tg-breadcrumbs-list">
        <li className="tg-breadcrumbs-item">
          <Link href="/" className="tg-breadcrumb-link">
            <Home size={13} className="text-slate-400" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={index} className="tg-breadcrumbs-item">
              <ChevronRight size={13} className="tg-breadcrumb-sep" aria-hidden="true" />
              {isLast || !item.href ? (
                <span className="tg-breadcrumb-current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="tg-breadcrumb-link">
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

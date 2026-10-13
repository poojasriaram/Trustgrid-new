'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function BlogPagination({
  currentPage,
  totalPages,
  onPageChange
}: BlogPaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="tg-pagination-wrapper" aria-label="Blog pagination navigation">
      <ul className="tg-pagination-list">
        <li>
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="tg-pagination-btn tg-pagination-nav-btn"
            aria-label="Go to previous page"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>
        </li>

        {pages.map((page) => {
          const isActive = page === currentPage
          return (
            <li key={page}>
              <button
                type="button"
                onClick={() => onPageChange(page)}
                className={`tg-pagination-btn ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Page ${page}`}
              >
                {page}
              </button>
            </li>
          )
        })}

        <li>
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="tg-pagination-btn tg-pagination-nav-btn"
            aria-label="Go to next page"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </li>
      </ul>
    </nav>
  )
}

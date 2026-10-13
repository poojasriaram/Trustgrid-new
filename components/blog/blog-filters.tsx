'use client'

import { Search, X, Filter } from 'lucide-react'
import { BlogCategory } from '@/lib/blog-data'

interface BlogFiltersProps {
  categories: BlogCategory[]
  activeCategory: string
  onSelectCategory: (categorySlug: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onClearFilters: () => void
  totalCount: number
  filteredCount: number
}

export function BlogFilters({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onClearFilters,
  totalCount,
  filteredCount
}: BlogFiltersProps) {
  const isFiltered = activeCategory !== 'all' || searchQuery.trim().length > 0

  return (
    <div className="tg-blog-filters-section" id="blog-discovery">
      {/* Search Input Bar */}
      <div className="tg-blog-search-bar">
        <div className="tg-search-input-wrapper">
          <Search size={18} className="tg-search-icon" aria-hidden="true" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search articles by title, keywords, tags (e.g. RoCEv2, InfiniBand, AllReduce, MFU)..."
            className="tg-search-input"
            aria-label="Search blog articles"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="tg-search-clear-btn"
              aria-label="Clear search query"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="tg-category-pills-row" role="tablist" aria-label="Article categories">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectCategory(cat.slug)}
              className={`tg-category-pill-btn ${isActive ? 'active' : ''}`}
            >
              <span>{cat.name}</span>
              {cat.count !== undefined && (
                <span className={`tg-pill-count ${isActive ? 'active-count' : ''}`}>
                  {cat.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Filter Status Bar */}
      <div className="tg-filter-status-bar">
        <div className="tg-status-text">
          <span>
            Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> articles
          </span>
          {activeCategory !== 'all' && (
            <span className="tg-active-category-note">
              in <em>{categories.find((c) => c.slug === activeCategory)?.name || activeCategory}</em>
            </span>
          )}
          {searchQuery && (
            <span className="tg-active-search-note">
              matching &ldquo;{searchQuery}&rdquo;
            </span>
          )}
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={onClearFilters}
            className="tg-clear-filters-btn"
          >
            <X size={14} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  )
}

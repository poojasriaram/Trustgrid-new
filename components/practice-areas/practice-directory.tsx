'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, ArrowRight, CheckCircle2, Filter, Layers, Cpu, Workflow } from 'lucide-react'
import { PracticeArea } from '@/lib/practice-areas-data'

interface PracticeAreasDirectoryProps {
  practices: PracticeArea[]
}

export function PracticeAreasDirectory({ practices }: PracticeAreasDirectoryProps) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<'all' | 'functional' | 'technology' | 'cross-cutting'>('all')

  const filteredPractices = useMemo(() => {
    return practices.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory
      const q = query.toLowerCase().trim()
      if (!q) return matchesCategory

      const matchesSearch =
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.overview.toLowerCase().includes(q) ||
        p.capabilities.some((c) => c.toLowerCase().includes(q)) ||
        p.technologiesAndStandards.some((t) => t.toLowerCase().includes(q)) ||
        p.targetIndustries.some((ind) => ind.name.toLowerCase().includes(q))

      return matchesCategory && matchesSearch
    })
  }, [practices, query, activeCategory])

  return (
    <div className="pa-directory-component">
      {/* Search & Filter Bar */}
      <div className="pa-directory-controls">
        <div className="pa-search-input-wrapper">
          <Search size={16} className="pa-search-icon" />
          <input
            type="text"
            className="pa-search-input"
            placeholder="Search practices, capabilities, or technologies (e.g. RoCEv2, RAG, Slurm, FinOps)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search practice areas"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="pa-search-clear"
              aria-label="Clear search query"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="pa-category-pills" role="tablist" aria-label="Practice Categories">
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'all'}
            className={`pa-filter-pill ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            <span>All Practices ({practices.length})</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'functional'}
            className={`pa-filter-pill ${activeCategory === 'functional' ? 'active' : ''}`}
            onClick={() => setActiveCategory('functional')}
          >
            <Layers size={13} />
            <span>Functional (5)</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'technology'}
            className={`pa-filter-pill ${activeCategory === 'technology' ? 'active' : ''}`}
            onClick={() => setActiveCategory('technology')}
          >
            <Cpu size={13} />
            <span>Technology (7)</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'cross-cutting'}
            className={`pa-filter-pill ${activeCategory === 'cross-cutting' ? 'active' : ''}`}
            onClick={() => setActiveCategory('cross-cutting')}
          >
            <Workflow size={13} />
            <span>Cross-Cutting (7)</span>
          </button>
        </div>
      </div>

      {/* Results Count & Active Status */}
      <div className="pa-results-meta">
        <span className="text-xs text-slate-300">
          Showing <strong className="text-white">{filteredPractices.length}</strong> of{' '}
          {practices.length} practices
          {query && ` matching "${query}"`}
        </span>
      </div>

      {/* Practice Cards Grid */}
      {filteredPractices.length > 0 ? (
        <div className="pa-directory-grid">
          {filteredPractices.map((practice) => {
            const isTech = practice.category === 'technology'
            const isCross = practice.category === 'cross-cutting'
            return (
              <div key={practice.slug} className="pa-card group">
                <div className="pa-card-header">
                  <div className="pa-card-badge-row">
                    <span
                      className={`pa-category-pill ${
                        isTech ? 'pa-pill-tech' : isCross ? 'pa-pill-cross' : ''
                      }`}
                    >
                      {practice.categoryLabel}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-2 group-hover:text-blue-400 transition-colors">
                    <Link href={`/practice-areas/${practice.slug}`}>{practice.title}</Link>
                  </h3>
                  <p className="text-slate-300 text-xs mt-2 line-clamp-2 leading-relaxed">
                    {practice.tagline}
                  </p>
                </div>

                <div className="pa-card-body">
                  <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider block mb-2 font-semibold">
                    Core Technical Deliverables:
                  </span>
                  <ul className="space-y-1.5 mb-4">
                    {practice.deliverables.slice(0, 2).map((del, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                        <CheckCircle2 size={12} className="text-blue-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{del}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {practice.technologiesAndStandards.slice(0, 3).map((tech, i) => (
                      <span key={i} className="pa-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pa-card-footer">
                  <Link
                    href={`/practice-areas/${practice.slug}`}
                    className="pa-explore-link"
                    aria-label={`Explore ${practice.title}`}
                  >
                    <span>Explore Practice Blueprint</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="pa-empty-state">
          <p className="text-slate-300 text-base font-medium">
            No practices found matching your search.
          </p>
          <p className="text-slate-500 text-xs mt-1">
            Try adjusting your search terms or clearing your category filters.
          </p>
          <button
            onClick={() => {
              setQuery('')
              setActiveCategory('all')
            }}
            className="button button-outline button-sm mt-4"
          >
            <span>Reset Directory Filters</span>
          </button>
        </div>
      )}
    </div>
  )
}

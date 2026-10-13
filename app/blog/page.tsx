'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import {
  getAllBlogPosts,
  getFeaturedBlogPost,
  getBlogCategories,
  BlogPost
} from '@/lib/blog-data'
import { BlogCard } from '@/components/blog/blog-card'
import { BlogFeaturedHero } from '@/components/blog/blog-featured-hero'
import { BlogFilters } from '@/components/blog/blog-filters'
import { BlogPagination } from '@/components/blog/blog-pagination'
import { BlogBreadcrumbs } from '@/components/blog/blog-breadcrumbs'
import { BlogCta } from '@/components/blog/blog-cta'
import { Sparkles, Cpu, Network, Layers, RotateCcw } from 'lucide-react'
import './blog.css'

const ITEMS_PER_PAGE = 6

export default function BlogLandingPage() {
  const allPosts = useMemo(() => getAllBlogPosts(), [])
  const featuredPost = useMemo(() => getFeaturedBlogPost(), [])
  const rawCategories = useMemo(() => getBlogCategories(), [])

  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)

  // Dynamically calculate post counts per category
  const categories = useMemo(() => {
    return rawCategories.map((cat) => {
      if (cat.slug === 'all') {
        return { ...cat, count: allPosts.length }
      }
      const count = allPosts.filter((post) => post.categorySlug === cat.slug).length
      return { ...cat, count }
    })
  }, [rawCategories, allPosts])

  // Filter posts based on activeCategory and searchQuery
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      // Category match
      const matchesCategory =
        activeCategory === 'all' || post.categorySlug === activeCategory

      if (!matchesCategory) return false

      // Search match (title, excerpt, keywords, tags)
      if (!searchQuery.trim()) return true

      const query = searchQuery.toLowerCase().trim()
      const titleMatch = post.title.toLowerCase().includes(query)
      const excerptMatch = post.excerpt.toLowerCase().includes(query)
      const keywordMatch = post.keywords.some((kw) => kw.toLowerCase().includes(query))
      const tagMatch = post.tags.some((t) => t.toLowerCase().includes(query))

      return titleMatch || excerptMatch || keywordMatch || tagMatch
    })
  }, [allPosts, activeCategory, searchQuery])

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE)
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredPosts, currentPage])

  // Handlers
  const handleSelectCategory = (categorySlug: string) => {
    setActiveCategory(categorySlug)
    setCurrentPage(1) // Reset pagination
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1) // Reset pagination
  }

  const handleClearFilters = () => {
    setActiveCategory('all')
    setSearchQuery('')
    setCurrentPage(1)
  }

  return (
    <div className="tg-blog-shell">
      {/* 1. Existing Site Header */}
      <SiteHeader />

      <main className="main-content" id="main-content">
        {/* Breadcrumbs */}
        <div className="tg-blog-container">
          <BlogBreadcrumbs items={[{ label: 'Blog', href: '/blog' }]} />
        </div>

        {/* 2. Premium Editorial Hero */}
        <section className="tg-editorial-hero" aria-labelledby="editorial-hero-title">
          <div className="tg-blog-container">
            <div className="tg-editorial-hero-content">
              <span className="tg-editorial-badge">
                <Sparkles size={13} className="text-blue-400" />
                <span>ENGINEERING INSIGHTS &amp; SYSTEMS BENCHMARKS</span>
              </span>

              <h1 className="tg-editorial-title" id="editorial-hero-title">
                Engineering the Future of <span>AI-Native Enterprises</span>
              </h1>

              {/* 3. Short Introduction explaining TRUSTGRID.AI's engineering perspective */}
              <p className="tg-editorial-desc">
                Rigorous systems analysis, empirical hardware benchmarks, and architectural blueprints from the engineers building ultra-scale GPU fabrics, lossless RDMA networks, autonomous multi-agent clusters, and sovereign enterprise AI infrastructure.
              </p>

              <div className="tg-editorial-thesis-bar">
                <span className="tg-thesis-chip">
                  <Network size={14} className="text-blue-400" />
                  <span>Lossless RoCEv2 &amp; InfiniBand</span>
                </span>
                <span className="tg-thesis-chip">
                  <Cpu size={14} className="text-cyan-400" />
                  <span>GPU Cluster MFU Optimization</span>
                </span>
                <span className="tg-thesis-chip">
                  <Layers size={14} className="text-indigo-400" />
                  <span>Rail-Optimized Fabrics</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="tg-blog-container">
          {/* 4. Featured Article Hero Card */}
          {featuredPost && <BlogFeaturedHero post={featuredPost} />}

          {/* 5. Category Filters & 7. Search Bar */}
          <BlogFilters
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onClearFilters={handleClearFilters}
            totalCount={allPosts.length}
            filteredCount={filteredPosts.length}
          />

          {/* 6. Latest Insights Section with Responsive Article Cards */}
          <section className="tg-latest-insights-section" aria-label="Latest Engineering Insights">
            {paginatedPosts.length > 0 ? (
              <div className="tg-blog-grid">
                {paginatedPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              /* Accessible Empty State */
              <div className="tg-empty-state" role="status" aria-live="polite">
                <RotateCcw size={36} className="text-slate-400 mx-auto mb-3" />
                <h3 className="tg-empty-title">No Engineering Articles Found</h3>
                <p className="tg-empty-desc">
                  No articles matched your current search query or category filter. Try refining your keywords or clearing the filter.
                </p>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="button button-primary button-sm"
                >
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}

            {/* 8. Pagination */}
            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </section>

          {/* 9. Consultation CTA */}
          <BlogCta
            badge="ENTERPRISE INFRASTRUCTURE DIAGNOSTIC"
            title="Planning or Optimizing Your Distributed AI Architecture?"
            description="Connect directly with TRUSTGRID.AI principal network architects and systems engineers for an empirical assessment of your GPU fabric, RoCEv2/IB topologies, and cluster utilization."
            buttonText="Book Architecture Diagnostic"
            buttonHref="/book-ai-diagnostic#diagnostic-form-section"
            secondaryButtonText="Talk to an AI Architect"
            secondaryButtonHref="/talk-to-ai-architect"
          />
        </div>
      </main>

      {/* 10. Existing Site Footer */}
      <SiteFooter />
    </div>
  )
}

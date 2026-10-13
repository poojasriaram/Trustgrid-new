'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, Sparkles, User } from 'lucide-react'
import { BlogPost } from '@/lib/blog-data'

interface BlogFeaturedHeroProps {
  post: BlogPost
}

export function BlogFeaturedHero({ post }: BlogFeaturedHeroProps) {
  return (
    <section className="tg-featured-hero-wrapper" aria-label="Featured Engineering Insight">
      <div className="tg-featured-hero-inner">
        <div className="tg-featured-hero-badge-row">
          <span className="tg-featured-badge">
            <Sparkles size={13} className="text-blue-400" />
            <span>FEATURED ENGINEERING INSIGHT</span>
          </span>
          <span className="tg-featured-category-pill">
            {post.category}
          </span>
        </div>

        <div className="tg-featured-hero-grid">
          {/* Left / Top: Media Visual */}
          <Link
            href={`/blog/${post.slug}`}
            className="tg-featured-media-link group"
            aria-label={`Read featured article: ${post.title}`}
          >
            <div className="tg-featured-media-container">
              <Image
                src={post.featuredImage}
                alt={post.imageAlt || post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="tg-featured-img"
              />
              <div className="tg-featured-media-overlay" />
              <div className="tg-featured-media-tag">
                <span>{post.readTime}</span>
              </div>
            </div>
          </Link>

          {/* Right: Content details */}
          <div className="tg-featured-content-col">
            <div className="tg-featured-meta-row">
              <span className="tg-featured-meta-item">
                <Calendar size={13} className="text-blue-500" />
                <span>{post.publishedDate}</span>
              </span>
              <span className="tg-meta-dot">•</span>
              <span className="tg-featured-meta-item">
                <Clock size={13} className="text-blue-500" />
                <span>{post.readTime}</span>
              </span>
            </div>

            <h2 className="tg-featured-title">
              <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                {post.title}
              </Link>
            </h2>

            <p className="tg-featured-excerpt">
              {post.excerpt}
            </p>

            <div className="tg-featured-tags-row">
              {post.tags.slice(0, 4).map((tag, idx) => (
                <span key={idx} className="tg-tag-chip">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="tg-featured-action-row">
              <div className="tg-featured-author">
                <div className="tg-author-avatar-chip lg">
                  {post.author.name.charAt(0)}
                </div>
                <div className="tg-author-info">
                  <span className="tg-author-name">{post.author.name}</span>
                  <span className="tg-author-role">{post.author.role}</span>
                </div>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="button button-primary tg-featured-cta-btn"
              >
                <span>Read Article</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

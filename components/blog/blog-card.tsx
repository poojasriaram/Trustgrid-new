'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { BlogPost } from '@/lib/blog-data'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="tg-blog-card group">
      <Link
        href={`/blog/${post.slug}`}
        className="tg-blog-card-media"
        aria-label={`Read article: ${post.title}`}
      >
        <div className="tg-blog-card-image-wrap">
          <Image
            src={post.featuredImage}
            alt={post.imageAlt || post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="tg-blog-card-img"
            loading="lazy"
          />
          <div className="tg-blog-card-overlay" />
        </div>
        <span className="tg-blog-card-category-badge">
          {post.category}
        </span>
      </Link>

      <div className="tg-blog-card-body">
        <div className="tg-blog-card-meta">
          <span className="tg-meta-item">
            <Calendar size={13} className="text-blue-500" />
            <span>{post.publishedDate}</span>
          </span>
          <span className="tg-meta-dot">•</span>
          <span className="tg-meta-item">
            <Clock size={13} className="text-blue-500" />
            <span>{post.readTime}</span>
          </span>
        </div>

        <h3 className="tg-blog-card-title">
          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
            {post.title}
          </Link>
        </h3>

        <p className="tg-blog-card-excerpt">
          {post.excerpt}
        </p>

        <div className="tg-blog-card-footer">
          <div className="tg-blog-card-author">
            <div className="tg-author-avatar-chip">
              {post.author.name.charAt(0)}
            </div>
            <div className="tg-author-info">
              <span className="tg-author-name">{post.author.name}</span>
              <span className="tg-author-role">{post.author.role.split(',')[0]}</span>
            </div>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="tg-blog-card-cta"
            aria-label={`Read article: ${post.title}`}
          >
            <span>Read Article</span>
            <ArrowRight size={14} className="tg-cta-arrow" />
          </Link>
        </div>
      </div>
    </article>
  )
}

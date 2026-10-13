import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getRelatedPosts,
  getAdjacentPosts
} from '@/lib/blog-data'
import { ArticleContent } from '@/components/blog/content'
import { BlogBreadcrumbs } from '@/components/blog/blog-breadcrumbs'
import { BlogToc } from '@/components/blog/blog-toc'
import { BlogKeyTakeaways } from '@/components/blog/blog-key-takeaways'
import { BlogFaq } from '@/components/blog/blog-faq'
import { BlogFurtherReading } from '@/components/blog/blog-further-reading'
import { BlogCta } from '@/components/blog/blog-cta'
import { BlogCard } from '@/components/blog/blog-card'
import { Calendar, Clock, ChevronLeft, ChevronRight, User } from 'lucide-react'
import '../blog.css'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all published articles
export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Article Not Found | TRUSTGRID.AI Blog',
      description: 'The requested engineering insight could not be found.',
    }
  }

  const canonicalUrl = `https://trustgrid.ai/blog/${post.slug}`

  return {
    title: `${post.title} | TRUSTGRID.AI Blog`,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${post.title} | TRUSTGRID.AI Blog`,
      description: post.excerpt,
      url: canonicalUrl,
      siteName: 'TRUSTGRID.AI',
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.imageAlt || post.title,
        },
      ],
      type: 'article',
      publishedTime: post.publishedDate,
      modifiedTime: post.updatedDate,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
    keywords: post.keywords,
  }
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category, 3)
  const { prevPost, nextPost } = getAdjacentPosts(post.slug)

  // JSON-LD Structured Data (TechArticle + BreadcrumbList)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `https://trustgrid.ai/blog/${post.slug}#article`,
        headline: post.title,
        description: post.excerpt,
        image: `https://trustgrid.ai${post.featuredImage}`,
        datePublished: post.publishedDate,
        dateModified: post.updatedDate || post.publishedDate,
        author: {
          '@type': 'Person',
          name: post.author.name,
          ...(post.author.role ? { jobTitle: post.author.role } : {}),
        },
        publisher: {
          '@type': 'Organization',
          name: 'TRUSTGRID.AI',
          url: 'https://trustgrid.ai',
          logo: {
            '@type': 'ImageObject',
            url: 'https://trustgrid.ai/images/trustgrid-logo.png',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://trustgrid.ai/blog/${post.slug}`,
        },
        keywords: post.keywords.join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://trustgrid.ai',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: 'https://trustgrid.ai/blog',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: `https://trustgrid.ai/blog/${post.slug}`,
          },
        ],
      },
    ],
  }

  return (
    <div className="tg-blog-shell">
      {/* Schema.org JSON-LD Script */}
      <Script
        id={`article-jsonld-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Header */}
      <SiteHeader />

      <main className="main-content">
        <div className="tg-blog-container">
          {/* Breadcrumbs */}
          <BlogBreadcrumbs
            items={[
              { label: 'Blog', href: '/blog' },
              { label: post.category, href: `/blog#${post.categorySlug}` },
              { label: post.title },
            ]}
          />

          {/* Article Header */}
          <header className="tg-article-header">
            <span className="tg-article-category-badge">
              {post.category}
            </span>

            <h1 className="tg-article-h1">{post.title}</h1>

            <p className="tg-article-subtitle">{post.subtitle || post.excerpt}</p>

            {/* Author Attribution, Publication Dates, Read Time */}
            <div className="tg-article-meta-bar">
              <div className="tg-article-author-card">
                <div className="tg-author-avatar-chip lg">
                  {post.author.name.charAt(0)}
                </div>
                <div className="tg-author-info">
                  <span className="tg-author-name">{post.author.name}</span>
                  {post.author.role ? (
                    <span className="tg-author-role">{post.author.role}</span>
                  ) : null}
                </div>
              </div>

              <div className="tg-article-dates-col">
                <span className="tg-meta-item">
                  <Calendar size={13} className="text-blue-500" />
                  <span>Published: {post.publishedDate}</span>
                </span>
                <span className="tg-meta-dot">•</span>
                <span className="tg-meta-item">
                  <Clock size={13} className="text-blue-500" />
                  <span>{post.readTime}</span>
                </span>
              </div>
            </div>
          </header>

          {/* Featured Hero Media */}
          <div className="tg-article-hero-media">
            <div className="tg-article-hero-image-wrap">
              <Image
                src={post.featuredImage}
                alt={post.imageAlt || post.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="tg-blog-card-img"
              />
            </div>
            {post.imageCaption && (
              <p className="tg-article-caption">{post.imageCaption}</p>
            )}
          </div>

          {/* Main 2-Column Article Body with Sticky Table of Contents */}
          <div className="tg-article-layout-grid">
            {/* Center/Left: Article Body */}
            <article className="tg-article-main-body">
              {/* Semantic Content with Headings, Diagrams, Code, Tables */}
              <ArticleContent slug={post.slug} />

              {/* Key Takeaways Box */}
              <BlogKeyTakeaways takeaways={post.keyTakeaways} />

              {/* FAQ Section */}
              <BlogFaq faq={post.faq} />

              {/* Further Reading & References */}
              <BlogFurtherReading items={post.furtherReading} />

              {/* Previous / Next Article Navigation Links */}
              <nav className="tg-adjacent-nav-grid" aria-label="Previous and Next Articles">
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} className="tg-adjacent-card">
                    <span className="tg-adjacent-label">
                      <ChevronLeft size={13} />
                      <span>PREVIOUS ARTICLE</span>
                    </span>
                    <span className="tg-adjacent-title">{prevPost.title}</span>
                  </Link>
                ) : (
                  <div />
                )}

                {nextPost ? (
                  <Link href={`/blog/${nextPost.slug}`} className="tg-adjacent-card text-right">
                    <span className="tg-adjacent-label justify-end">
                      <span>NEXT ARTICLE</span>
                      <ChevronRight size={13} />
                    </span>
                    <span className="tg-adjacent-title">{nextPost.title}</span>
                  </Link>
                ) : (
                  <div />
                )}
              </nav>

              {/* Contextual Consultation CTA */}
              <BlogCta
                badge={post.consultationCta.badge}
                title={post.consultationCta.title}
                description={post.consultationCta.description}
                buttonText={post.consultationCta.buttonText}
                buttonHref={post.consultationCta.buttonHref}
                secondaryButtonText={post.consultationCta.secondaryButtonText}
                secondaryButtonHref={post.consultationCta.secondaryButtonHref}
              />
            </article>

            {/* Right: Sticky Table of Contents Sidebar */}
            <BlogToc items={post.tableOfContents} />
          </div>

          {/* Related Articles Section */}
          {relatedPosts.length > 0 && (
            <section className="tg-related-section" style={{ margin: '64px 0 32px' }}>
              <div style={{ marginBottom: '24px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#2563eb',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  CONTINUE READING
                </span>
                <h3
                  style={{
                    fontSize: '26px',
                    fontWeight: 800,
                    color: '#09142e',
                    margin: '4px 0 0',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Related Engineering Insights
                </h3>
              </div>

              <div className="tg-blog-grid">
                {relatedPosts.map((related) => (
                  <BlogCard key={related.id} post={related} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}

import { article01, BlogArticleData } from './blog-articles/article-01'
import { article02 } from './blog-articles/article-02'
import { article03 } from './blog-articles/article-03'
import { article04 } from './blog-articles/article-04'
import { article05 } from './blog-articles/article-05'

export type BlogPost = BlogArticleData

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string
  count: number
}

export const blogCategories: BlogCategory[] = [
  {
    id: 'all',
    name: 'All Insights',
    slug: 'all',
    description: 'Complete compendium of engineering insights across AI networking, infrastructure, distributed compute, and systems architecture.',
    count: 5
  },
  {
    id: 'ai-native-networking',
    name: 'AI-Native Networking',
    slug: 'ai-native-networking',
    description: 'Deep technical research on ultra-low latency fabrics, RoCEv2, InfiniBand, RDMA, collective communication, and lossless network engineering.',
    count: 4
  },
  {
    id: 'ai-infrastructure-data-centers',
    name: 'AI Infrastructure & Data Centers',
    slug: 'ai-infrastructure-data-centers',
    description: 'Hardware accelerators, high-density power and liquid cooling (30–100kW), optical topologies, and turnkey AI Factory engineering.',
    count: 1
  },
  {
    id: 'agentic-ai-enterprise-engineering',
    name: 'Agentic AI & Enterprise Engineering',
    slug: 'agentic-ai-enterprise-engineering',
    description: 'Autonomous multi-agent architectures, stateful workflow orchestration, deterministic reasoning, and enterprise digital labor systems.',
    count: 0
  },
  {
    id: 'ai-cybersecurity-governance',
    name: 'AI Cybersecurity & Governance',
    slug: 'ai-cybersecurity-governance',
    description: 'Zero-trust agent security, post-quantum cryptography (PQC / CBOM), model watermarking, and sovereign regulatory compliance.',
    count: 0
  },
  {
    id: 'ai-value-engineering',
    name: 'AI Value Engineering',
    slug: 'ai-value-engineering',
    description: 'Industrial engineering frameworks (Lean, TOC, DMAIC, OEE) and AI FinOps token governance applied to enterprise P&L returns.',
    count: 0
  },
  {
    id: 'industry-ai-applications',
    name: 'Industry AI Applications',
    slug: 'industry-ai-applications',
    description: 'Mission-critical production deployments across Banking, Healthcare, Defense, Energy, Discrete Manufacturing, and Telecommunications.',
    count: 0
  }
]

export const blogPosts: BlogPost[] = [
  article01,
  article02,
  article03,
  article04,
  article05
]

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts]
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getFeaturedBlogPost(): BlogPost {
  return blogPosts.find((post) => post.featured) || blogPosts[0]
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogPost[] {
  const currentPost = getBlogPostBySlug(currentSlug)
  
  // First priority: explicit relatedSlugs
  if (currentPost?.relatedSlugs && currentPost.relatedSlugs.length > 0) {
    const explicitRelated = currentPost.relatedSlugs
      .map((slug) => getBlogPostBySlug(slug))
      .filter((post): post is BlogPost => Boolean(post && post.slug !== currentSlug))
    
    if (explicitRelated.length >= limit) {
      return explicitRelated.slice(0, limit)
    }

    // Fill remaining with category or others
    const fallback = blogPosts
      .filter((p) => p.slug !== currentSlug && !explicitRelated.some((e) => e.slug === p.slug))
    return [...explicitRelated, ...fallback].slice(0, limit)
  }

  // Second priority: same category
  const sameCategory = blogPosts.filter(
    (post) => post.slug !== currentSlug && post.category === category
  )
  
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit)
  }

  // Fill with other articles
  const otherPosts = blogPosts.filter(
    (post) => post.slug !== currentSlug && post.category !== category
  )

  return [...sameCategory, ...otherPosts].slice(0, limit)
}

export function getAdjacentPosts(currentSlug: string): {
  prevPost: BlogPost | null
  nextPost: BlogPost | null
} {
  const currentIndex = blogPosts.findIndex((post) => post.slug === currentSlug)
  
  if (currentIndex === -1) {
    return { prevPost: null, nextPost: null }
  }

  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null

  return { prevPost, nextPost }
}

export function getBlogCategories(): BlogCategory[] {
  return blogCategories
}

'use client'

import React from 'react'
import { Article01Content } from './article-01-content'
import { Article02Content } from './article-02-content'
import { Article03Content } from './article-03-content'
import { Article04Content } from './article-04-content'
import { Article05Content } from './article-05-content'

interface ArticleContentProps {
  slug: string
}

export function ArticleContent({ slug }: ArticleContentProps) {
  switch (slug) {
    case 'ai-native-networking-distributed-ai':
      return <Article01Content />
    case 'rocev2-vs-infiniband-ai':
      return <Article02Content />
    case 'lossless-ai-network-design':
      return <Article03Content />
    case 'ai-network-performance-optimization':
      return <Article04Content />
    case 'enterprise-ai-network-readiness':
      return <Article05Content />
    default:
      return null
  }
}

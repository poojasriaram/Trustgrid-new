/**
 * ============================================================================
 * TRUSTGRID.AI — RETRIEVAL-AUGMENTED GENERATION (RAG) ENGINE
 * ============================================================================
 * Performs semantic matching and metadata filtering against the approved
 * TRUSTGRID.AI knowledge corpus to ground conversational responses.
 * ============================================================================
 */

import { KnowledgeChunk, trustgridKnowledgeCorpus } from './knowledge-base'
import { TopicDomain, ResolvedTurn } from './context-engine'

export interface ScoredChunk {
  chunk: KnowledgeChunk
  score: number
  matchedTerms: string[]
}

export interface RetrievalResult {
  primaryChunk: KnowledgeChunk
  secondaryChunks: KnowledgeChunk[]
  groundedFacts: string[]
  suggestedFollowUps: string[]
  primaryCta?: { label: string; href: string }
}

const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'can\'t', 'cannot',
  'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during', 'each',
  'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d',
  'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i',
  'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s',
  'me', 'more', 'most', 'mustn\'t', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or',
  'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll',
  'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs',
  'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve',
  'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll',
  'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s', 'where', 'where\'s', 'which', 'while',
  'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll',
  'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves'
])

/**
 * Tokenizes text into normalized unique keywords, omitting common stop words
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 2 && !STOP_WORDS.has(token))
}

/**
 * Maps TopicDomain to knowledge category
 */
function topicToCategory(topic: TopicDomain): string {
  switch (topic) {
    case 'ai_infrastructure':
      return 'infra'
    case 'agentic_enterprise':
      return 'agentic'
    case 'networking_cybersecurity':
      return 'networking'
    case 'trusted_ai':
      return 'trusted_ai'
    case 'ai_value_finops':
      return 'value_engineering'
    case 'industrial_methodology':
      return 'methodology'
    case 'executive_diagnostic':
      return 'diagnostic'
    case 'industry_verticals':
      return 'industries'
    default:
      return 'company'
  }
}

/**
 * Retrieves and ranks knowledge chunks for a resolved user turn
 */
export function retrieveKnowledge(
  turn: ResolvedTurn,
  topK: number = 3
): RetrievalResult {
  const queryTokens = tokenize(turn.expandedQuery)
  const targetCategory = topicToCategory(turn.activeTopic)

  const scored: ScoredChunk[] = trustgridKnowledgeCorpus.map(chunk => {
    let score = 0
    const matchedTerms: string[] = []

    // Category boost
    if (chunk.category === targetCategory) {
      score += 15
    }

    // Match topics (high weight)
    for (const topic of chunk.topics) {
      const topicTokens = tokenize(topic)
      for (const qt of queryTokens) {
        if (topicTokens.includes(qt) || topic.includes(qt)) {
          score += 10
          if (!matchedTerms.includes(qt)) matchedTerms.push(qt)
        }
      }
    }

    // Match title
    const titleTokens = tokenize(chunk.title)
    for (const qt of queryTokens) {
      if (titleTokens.includes(qt)) {
        score += 8
        if (!matchedTerms.includes(qt)) matchedTerms.push(qt)
      }
    }

    // Match content & key facts
    const contentTokens = tokenize(chunk.content)
    for (const qt of queryTokens) {
      if (contentTokens.includes(qt)) {
        score += 2
        if (!matchedTerms.includes(qt)) matchedTerms.push(qt)
      }
    }

    return { chunk, score, matchedTerms }
  })

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score)

  const primaryScored = scored[0] || {
    chunk: trustgridKnowledgeCorpus[0],
    score: 0,
    matchedTerms: []
  }

  const secondaryScored = scored.slice(1, topK).filter(s => s.score > 5)

  // Assemble grounded facts
  const groundedFacts = [
    ...primaryScored.chunk.keyFacts,
    ...secondaryScored.flatMap(s => s.chunk.keyFacts.slice(0, 1))
  ].slice(0, 5)

  // Follow-up suggestions
  const suggestedFollowUps = primaryScored.chunk.suggestedFollowUps.slice(0, 3)

  return {
    primaryChunk: primaryScored.chunk,
    secondaryChunks: secondaryScored.map(s => s.chunk),
    groundedFacts,
    suggestedFollowUps,
    primaryCta: primaryScored.chunk.primaryCta
  }
}

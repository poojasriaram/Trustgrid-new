/**
 * ============================================================================
 * TRUSTGRID.AI — PERSISTENT CONVERSATION MEMORY STORE (REDIS + IN-MEMORY FALLBACK)
 * ============================================================================
 * Features:
 * - Isolated conversation session state keyed by unique conversationId
 * - Dual storage: Redis Cloud with automatic in-memory fallback
 * - 24-Hour TTL retention policy for privacy & compliance
 * - Rolling conversation summaries for long threads
 * - Session restoration and explicit conversation reset
 * ============================================================================
 */

import { getRedisClient } from '@/lib/redis'
import { SessionContext, TopicDomain, TaskStage } from './context-engine'

export interface StoredChatMessage {
  id: string
  sender: 'user' | 'assistant'
  text: string
  timestamp: string
  topics?: string[]
  offeringTag?: string
  pageLink?: { label: string; href: string }
  suggestedFollowUps?: string[]
  isLeadPrompt?: boolean
}

// In-memory fallback stores for local development or transient network drops
const inMemorySessions = new Map<string, SessionContext>()
const inMemoryMessages = new Map<string, StoredChatMessage[]>()

const REDIS_SESSION_PREFIX = 'tg:chat:session:'
const REDIS_HISTORY_PREFIX = 'tg:chat:history:'
const SESSION_TTL_SECONDS = 86400 // 24 Hours

/**
 * Generates a collision-resistant unique conversation ID
 */
export function generateConversationId(): string {
  const ts = Date.now().toString(36)
  const rand = Math.random().toString(36).substring(2, 9)
  return `tg_conv_${ts}_${rand}`
}

/**
 * Retrieves an existing conversation session or initializes a fresh one
 */
export async function getOrCreateSession(conversationId?: string): Promise<SessionContext> {
  const id = conversationId?.trim() || generateConversationId()

  try {
    const redis = await getRedisClient()
    if (redis && redis.isOpen) {
      const data = await redis.get(`${REDIS_SESSION_PREFIX}${id}`)
      if (data) {
        return JSON.parse(data) as SessionContext
      }
    }
  } catch (err) {
    console.warn('[MemoryStore] Redis getSession fallback:', err)
  }

  // Check in-memory store
  if (inMemorySessions.has(id)) {
    return inMemorySessions.get(id)!
  }

  // Initialize new session
  const newSession: SessionContext = {
    conversationId: id,
    topicsDiscussed: [],
    statedChallenges: [],
    exploredSolutions: [],
    currentTaskStage: 'exploring',
    consultationIntentDetected: false,
    leadDetails: {},
    turnCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  await saveSession(newSession)
  return newSession
}

/**
 * Saves or updates a session in Redis and in-memory cache
 */
export async function saveSession(session: SessionContext): Promise<void> {
  session.updatedAt = new Date().toISOString()
  inMemorySessions.set(session.conversationId, session)

  try {
    const redis = await getRedisClient()
    if (redis && redis.isOpen) {
      await redis.set(
        `${REDIS_SESSION_PREFIX}${session.conversationId}`,
        JSON.stringify(session),
        { EX: SESSION_TTL_SECONDS }
      )
    }
  } catch (err) {
    console.warn('[MemoryStore] Redis saveSession warning:', err)
  }
}

/**
 * Appends a message to the conversation history
 */
export async function appendMessage(
  conversationId: string,
  message: StoredChatMessage
): Promise<void> {
  // Update in-memory
  const existing = inMemoryMessages.get(conversationId) || []
  existing.push(message)
  inMemoryMessages.set(conversationId, existing)

  try {
    const redis = await getRedisClient()
    if (redis && redis.isOpen) {
      const key = `${REDIS_HISTORY_PREFIX}${conversationId}`
      await redis.rPush(key, JSON.stringify(message))
      await redis.expire(key, SESSION_TTL_SECONDS)
    }
  } catch (err) {
    console.warn('[MemoryStore] Redis appendMessage warning:', err)
  }
}

/**
 * Retrieves the message history for a conversation
 */
export async function getConversationHistory(
  conversationId: string,
  limit: number = 20
): Promise<StoredChatMessage[]> {
  try {
    const redis = await getRedisClient()
    if (redis && redis.isOpen) {
      const key = `${REDIS_HISTORY_PREFIX}${conversationId}`
      const raw = await redis.lRange(key, -limit, -1)
      if (raw && raw.length > 0) {
        return raw.map(item => JSON.parse(item) as StoredChatMessage)
      }
    }
  } catch (err) {
    console.warn('[MemoryStore] Redis getHistory fallback:', err)
  }

  const mem = inMemoryMessages.get(conversationId) || []
  return mem.slice(-limit)
}

/**
 * Completely resets and clears a conversation context
 */
export async function clearConversation(conversationId: string): Promise<boolean> {
  inMemorySessions.delete(conversationId)
  inMemoryMessages.delete(conversationId)

  try {
    const redis = await getRedisClient()
    if (redis && redis.isOpen) {
      await redis.del(`${REDIS_SESSION_PREFIX}${conversationId}`)
      await redis.del(`${REDIS_HISTORY_PREFIX}${conversationId}`)
    }
    return true
  } catch (err) {
    console.warn('[MemoryStore] Redis clearConversation warning:', err)
    return true
  }
}

/**
 * Updates rolling summary when conversation exceeds 6 turns
 */
export function updateRollingSummary(session: SessionContext, history: StoredChatMessage[]): void {
  if (history.length < 4) return

  const recentUser = history.filter(h => h.sender === 'user').slice(-3).map(h => h.text).join('; ')
  const topics = session.topicsDiscussed.join(', ')
  session.rollingSummary = `User exploring ${topics}. Recent focus areas: ${recentUser}. Stage: ${session.currentTaskStage}.`
}

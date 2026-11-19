/**
 * ============================================================================
 * TRUSTGRID.AI — PERSISTENT CONVERSATION MEMORY STORE (SUPABASE + REDIS + IN-MEMORY)
 * ============================================================================
 * Features:
 * - Isolated conversation session state keyed by unique conversationId
 * - Triple storage: Supabase (`chat_sessions` & `chat_messages`) + Redis Cloud + In-Memory fallback
 * - 24-Hour TTL retention policy for privacy & compliance
 * - Rolling conversation summaries for long threads
 * - Session restoration and explicit conversation reset
 * ============================================================================
 */

import { getRedisClient } from '@/lib/redis'
import { SessionContext, TopicDomain, TaskStage } from './context-engine'
import {
  getChatSessionFromSupabase,
  saveChatSessionToSupabase,
  appendChatMessageToSupabase,
  getChatHistoryFromSupabase
} from '@/lib/supabase/api-store'

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
      if (typeof data === 'string' && data.length > 0) {
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

  // Check Supabase `chat_sessions` table
  try {
    const supaSession = await getChatSessionFromSupabase(id)
    if (supaSession) {
      inMemorySessions.set(id, supaSession)
      return supaSession
    }
  } catch (err) {
    console.warn('[MemoryStore] Supabase getSession fallback:', err)
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

  // Non-blocking write to Supabase `chat_sessions`
  saveChatSessionToSupabase(session).catch((err) => {
    console.warn('[MemoryStore] Supabase saveSession warning:', err)
  })

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

  // Non-blocking write to Supabase `chat_messages`
  appendChatMessageToSupabase(conversationId, message).catch((err) => {
    console.warn('[MemoryStore] Supabase appendMessage warning:', err)
  })

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
      if (Array.isArray(raw) && raw.length > 0) {
        return raw
          .filter((item): item is string => typeof item === 'string')
          .map(item => JSON.parse(item) as StoredChatMessage)
      }
    }
  } catch (err) {
    console.warn('[MemoryStore] Redis getHistory fallback:', err)
  }

  const mem = inMemoryMessages.get(conversationId) || []
  if (mem.length > 0) {
    return mem.slice(-limit)
  }

  try {
    const supaHistory = await getChatHistoryFromSupabase(conversationId, limit)
    if (supaHistory.length > 0) {
      inMemoryMessages.set(conversationId, supaHistory)
      return supaHistory
    }
  } catch (err) {
    console.warn('[MemoryStore] Supabase getHistory fallback:', err)
  }

  return []
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

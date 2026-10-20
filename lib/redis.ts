/**
 * ============================================================================
 * TRUSTGRID.AI — PRODUCTION SERVERLESS REDIS CONNECTION UTILITY
 * ============================================================================
 * Features:
 * - Compatible with Next.js 16 (Node.js runtime) and Vercel Serverless Functions.
 * - Reuses existing client across warm lambda invocations via globalThis cache.
 * - Auto-reconnects with exponential backoff on intermittent network drops.
 * - Safe fallback mode: Prevents API or site crashes when REDIS_URL is absent or unreachable.
 * - Zero client-side leakage: Strictly server-only.
 * ============================================================================
 */

import { createClient, RedisClientType } from 'redis'

// Global cache for connection reuse across serverless function invocations
declare global {
  // eslint-disable-next-line no-var
  var _redisClient: RedisClientType | undefined
  // eslint-disable-next-line no-var
  var _redisConnectingPromise: Promise<RedisClientType | null> | undefined
}

export interface RedisHealthStatus {
  status: 'connected' | 'disconnected' | 'fallback' | 'error'
  latencyMs?: number
  message?: string
  database?: string
  lastChecked: string
}

let lastHealthCheck: RedisHealthStatus = {
  status: 'disconnected',
  message: 'Redis not initialized',
  lastChecked: new Date().toISOString()
}

/**
 * Returns a connected Redis client instance or null if unavailable.
 */
export async function getRedisClient(): Promise<RedisClientType | null> {
  // Server-only guard
  if (typeof window !== 'undefined') {
    console.error('[Redis Security] Attempted to access Redis client from browser bundle. Blocked.')
    return null
  }

  const redisUrl = process.env.REDIS_URL?.trim()

  if (!redisUrl) {
    lastHealthCheck = {
      status: 'fallback',
      message: 'REDIS_URL environment variable is not configured. Running in safe in-memory fallback mode.',
      lastChecked: new Date().toISOString()
    }
    return null
  }

  // Reuse already connected client
  if (globalThis._redisClient && globalThis._redisClient.isOpen) {
    return globalThis._redisClient
  }

  // Prevent duplicate connection attempts under concurrent serverless requests
  if (globalThis._redisConnectingPromise) {
    return globalThis._redisConnectingPromise
  }

  globalThis._redisConnectingPromise = (async () => {
    try {
      const client: RedisClientType = createClient({
        url: redisUrl,
        socket: {
          connectTimeout: 5000,
          reconnectStrategy: (retries: number) => {
            if (retries > 5) {
              console.warn('[Redis] Max reconnection attempts reached. Throttling reconnects.')
              return new Error('Max retries reached')
            }
            return Math.min(retries * 200, 3000)
          }
        }
      })

      client.on('error', (err) => {
        // Log clean message without printing credentials
        console.error('[Redis Client Error]', err?.message || 'Connection error')
        lastHealthCheck = {
          status: 'error',
          message: err?.message ? `Connection error: ${err.message}` : 'Redis socket error',
          lastChecked: new Date().toISOString()
        }
      })

      client.on('connect', () => {
        // Connected
      })

      client.on('ready', () => {
        lastHealthCheck = {
          status: 'connected',
          message: 'Connected to Redis Cloud',
          lastChecked: new Date().toISOString()
        }
      })

      await client.connect()
      globalThis._redisClient = client
      return client
    } catch (err: any) {
      console.warn('[Redis Init Warning] Could not connect to Redis. Safe fallback enabled:', err?.message || err)
      lastHealthCheck = {
        status: 'error',
        message: err?.message ? `Failed to connect: ${err.message}` : 'Failed to establish connection',
        lastChecked: new Date().toISOString()
      }
      return null
    } finally {
      globalThis._redisConnectingPromise = undefined
    }
  })()

  return globalThis._redisConnectingPromise
}

/**
 * Pings Redis and measures round-trip latency.
 */
export async function checkRedisHealth(): Promise<RedisHealthStatus> {
  const start = Date.now()
  try {
    const client = await getRedisClient()
    if (!client || !client.isOpen) {
      return lastHealthCheck
    }

    const pong = await client.ping()
    const latencyMs = Date.now() - start

    if (pong === 'PONG') {
      lastHealthCheck = {
        status: 'connected',
        latencyMs,
        message: 'Healthy & Responsive',
        lastChecked: new Date().toISOString()
      }
    }
    return lastHealthCheck
  } catch (err: any) {
    return {
      status: 'error',
      latencyMs: Date.now() - start,
      message: err?.message || 'Ping failed',
      lastChecked: new Date().toISOString()
    }
  }
}

/**
 * Cleanly disconnects the Redis client (useful for CLI/testing scripts).
 */
export async function closeRedisConnection(): Promise<void> {
  if (globalThis._redisClient && globalThis._redisClient.isOpen) {
    try {
      await globalThis._redisClient.quit()
    } catch {
      await globalThis._redisClient.disconnect()
    }
    globalThis._redisClient = undefined
  }
}

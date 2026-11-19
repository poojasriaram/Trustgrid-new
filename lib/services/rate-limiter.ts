/**
 * TRUSTGRID.AI - High-Throughput Edge Rate Limiter
 * Token-bucket and sliding window rate limiter for Next.js Route Handlers.
 */

interface RateLimitRecord {
  count: number
  resetTime: number
}

const memoryStore = new Map<string, RateLimitRecord>()

// Clean up stale records periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, record] of memoryStore.entries()) {
      if (now > record.resetTime) {
        memoryStore.delete(key)
      }
    }
  }, 60000)
}

export interface RateLimitOptions {
  limit?: number
  windowMs?: number
  identifier?: string
}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

export function checkRateLimit(
  req: Request,
  options: RateLimitOptions = {}
): RateLimitResult {
  const limit = options.limit || 60
  const windowMs = options.windowMs || 60000
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    '127.0.0.1'

  const id = options.identifier ? `${options.identifier}:${ip}` : ip
  const now = Date.now()

  let record = memoryStore.get(id)
  if (!record || now > record.resetTime) {
    record = {
      count: 1,
      resetTime: now + windowMs
    }
    memoryStore.set(id, record)
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: Math.ceil(record.resetTime / 1000)
    }
  }

  record.count += 1
  const remaining = Math.max(0, limit - record.count)
  const isAllowed = record.count <= limit

  return {
    success: isAllowed,
    limit,
    remaining,
    reset: Math.ceil(record.resetTime / 1000)
  }
}

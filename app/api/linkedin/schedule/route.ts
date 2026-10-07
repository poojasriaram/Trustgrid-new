import { NextRequest, NextResponse } from 'next/server'
import {
  scheduleLinkedInPost,
  processDueScheduledPosts
} from '@/lib/services/linkedin'
import { getDueScheduledLinkedInPostsDb } from '@/lib/db/leads'

export const dynamic = 'force-dynamic'

/**
 * POST /api/linkedin/schedule
 * Schedules a post for automated publishing to TRUSTGRID.AI LinkedIn Page.
 * 
 * Payload:
 * {
 *   "text": "...",
 *   "scheduledAt": "2026-10-08T10:00:00Z"
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))

    // Check if triggering runner
    if (body.action === 'run') {
      const runResult = await processDueScheduledPosts()
      return NextResponse.json({
        success: true,
        ...runResult
      })
    }

    const { text, scheduledAt, visibility = 'PUBLIC' } = body

    if (!text || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json(
        { success: false, error: 'Post text is required.' },
        { status: 400 }
      )
    }

    if (!scheduledAt) {
      return NextResponse.json(
        { success: false, error: 'scheduledAt timestamp is required (ISO format).' },
        { status: 400 }
      )
    }

    const scheduledDate = new Date(scheduledAt)
    if (isNaN(scheduledDate.getTime())) {
      return NextResponse.json(
        { success: false, error: 'Invalid scheduledAt format. Provide a valid ISO timestamp.' },
        { status: 400 }
      )
    }

    const post = await scheduleLinkedInPost({
      text: text.trim(),
      scheduledAt: scheduledDate.toISOString(),
      visibility: visibility === 'CONNECTIONS' ? 'CONNECTIONS' : 'PUBLIC'
    })

    return NextResponse.json({
      success: true,
      postId: post.id,
      status: 'SCHEDULED',
      scheduledAt: post.scheduled_at,
      message: `Post scheduled successfully for ${new Date(post.scheduled_at!).toLocaleString()}.`
    })
  } catch (error: any) {
    console.error('[LinkedIn Schedule Endpoint Error]', error?.message || error)
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to schedule LinkedIn post.'
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/linkedin/schedule
 * Checks and triggers due scheduled posts, returning pending queue info.
 */
export async function GET() {
  try {
    const runResult = await processDueScheduledPosts()
    const pendingDue = getDueScheduledLinkedInPostsDb()

    return NextResponse.json({
      success: true,
      runnerResult: runResult,
      pendingCount: pendingDue.length,
      pending: pendingDue.map(p => ({
        id: p.id,
        preview: p.text.slice(0, 100),
        scheduledAt: p.scheduled_at
      }))
    })
  } catch (error: any) {
    console.error('[LinkedIn Schedule GET Error]', error?.message || error)
    return NextResponse.json(
      { success: false, error: 'Failed to process scheduled posts.' },
      { status: 500 }
    )
  }
}

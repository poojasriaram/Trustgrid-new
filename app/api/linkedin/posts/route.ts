import { NextRequest, NextResponse } from 'next/server'
import {
  getAllLinkedInPostsDb,
  getLinkedInPostByIdDb,
  deleteLinkedInPostDb,
  insertLinkedInPostDb,
  seedInitialLinkedInPostDb
} from '@/lib/db/leads'
import { getLinkedInConfig, processDueScheduledPosts } from '@/lib/services/linkedin'

export const dynamic = 'force-dynamic'

/**
 * GET /api/linkedin/posts
 * Returns history of all LinkedIn posts:
 * - Date / Created At
 * - Post preview / full text
 * - Status: DRAFT, SCHEDULED, PUBLISHED, FAILED
 * - LinkedIn Post ID
 * - Published At
 */
export async function GET(req: NextRequest) {
  try {
    // Process due scheduled posts passively
    try {
      await processDueScheduledPosts()
    } catch {}

    const config = getLinkedInConfig()
    try {
      seedInitialLinkedInPostDb(config.organizationId || 'TRUSTGRID_AI')
    } catch {}

    const searchParams = req.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '50', 10)
    const posts = getAllLinkedInPostsDb(limit)

    return NextResponse.json({
      success: true,
      count: posts.length,
      posts: posts.map(p => ({
        id: p.id,
        text: p.text,
        preview: p.text.length > 160 ? `${p.text.slice(0, 160)}...` : p.text,
        status: p.status, // DRAFT, SCHEDULED, PUBLISHED, FAILED
        organizationId: p.organization_id,
        linkedinPostId: p.linkedin_post_id,
        scheduledAt: p.scheduled_at,
        publishedAt: p.published_at,
        errorMessage: p.error_message,
        createdAt: p.created_at,
        updatedAt: p.updated_at
      }))
    })
  } catch (error: any) {
    console.error('[LinkedIn Posts GET Error]', error?.message || error)
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve post history.' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/linkedin/posts
 * Deletes a post from history by id query param
 */
export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Post ID is required.' },
        { status: 400 }
      )
    }

    const removed = deleteLinkedInPostDb(id)
    return NextResponse.json({
      success: removed,
      message: removed ? 'Post record deleted.' : 'Post not found.'
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete post.' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/linkedin/posts
 * Allows saving a new draft post
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { text, visibility = 'PUBLIC' } = body

    if (!text || !text.trim()) {
      return NextResponse.json(
        { success: false, error: 'Post text is required.' },
        { status: 400 }
      )
    }

    const config = getLinkedInConfig()
    const post = insertLinkedInPostDb({
      text: text.trim(),
      visibility,
      organization_id: config.organizationId || 'TRUSTGRID_AI',
      status: 'DRAFT'
    })

    return NextResponse.json({
      success: true,
      post,
      message: 'Draft post saved.'
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to save draft.' },
      { status: 500 }
    )
  }
}

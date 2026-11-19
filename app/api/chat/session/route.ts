import { NextRequest, NextResponse } from 'next/server'
import {
  getOrCreateSession,
  getConversationHistory,
  clearConversation
} from '@/lib/chat/memory-store'

export const dynamic = 'force-dynamic'

/**
 * GET /api/chat/session?conversationId=...
 * Retrieves or initializes a conversational session from Supabase (`chat_sessions` & `chat_messages`),
 * Redis Cloud, or in-memory store.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const conversationId = searchParams.get('conversationId') || undefined
    const session = await getOrCreateSession(conversationId)
    const history = await getConversationHistory(session.conversationId, 30)

    return NextResponse.json({
      success: true,
      conversationId: session.conversationId,
      session,
      history
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve chat session.',
        details: error?.message
      },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/chat/session?conversationId=...
 * Resets a conversational session across memory, Redis, and Supabase.
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const conversationId = searchParams.get('conversationId')
    if (!conversationId) {
      return NextResponse.json(
        { success: false, error: 'conversationId is required.' },
        { status: 400 }
      )
    }

    await clearConversation(conversationId)
    return NextResponse.json({
      success: true,
      message: 'Session cleared successfully.'
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to clear session.' },
      { status: 500 }
    )
  }
}


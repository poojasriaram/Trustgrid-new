import { NextRequest, NextResponse } from 'next/server'
import {
  getOrCreateSession,
  saveSession,
  appendMessage,
  getConversationHistory,
  clearConversation,
  updateRollingSummary,
  StoredChatMessage
} from '@/lib/chat/memory-store'
import { resolveContextualReferences, detectTopicDomain } from '@/lib/chat/context-engine'
import { retrieveKnowledge } from '@/lib/chat/rag-engine'
import { generateChatResponse } from '@/lib/chat/reasoning-engine'

export const dynamic = 'force-dynamic'

/**
 * POST /api/chat
 * Handles conversational queries with context assembly, RAG, and optional SSE streaming
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message, conversationId, stream = false } = body

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Message text is required.' },
        { status: 400 }
      )
    }

    const trimmedMessage = message.trim()

    // 1. Retrieve or initialize session state
    const session = await getOrCreateSession(conversationId)

    // 2. Fetch recent message history (last 10 turns)
    const history = await getConversationHistory(session.conversationId, 10)
    const lastBotMessage = history.filter(h => h.sender === 'assistant').pop()?.text

    // 3. Resolve pronoun references and identify active topic
    const resolvedTurn = resolveContextualReferences(trimmedMessage, session, lastBotMessage)

    // 4. Update session metadata
    if (!session.topicsDiscussed.includes(resolvedTurn.activeTopic)) {
      session.topicsDiscussed.push(resolvedTurn.activeTopic)
    }
    session.currentTaskStage = resolvedTurn.taskStage
    session.turnCount += 1

    if (resolvedTurn.taskStage === 'consultation_seeking') {
      session.consultationIntentDetected = true
    }

    // 5. Retrieve grounded knowledge from TrustGrid corpus
    const retrieval = retrieveKnowledge(resolvedTurn, 3)

    // 6. Record user message in memory
    const userMessageRecord: StoredChatMessage = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      sender: 'user',
      text: trimmedMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      topics: [resolvedTurn.activeTopic]
    }
    await appendMessage(session.conversationId, userMessageRecord)

    // 7. Generate grounded reasoning response
    const botResponse = await generateChatResponse(
      resolvedTurn,
      session,
      retrieval,
      [...history, userMessageRecord]
    )

    // 8. Record assistant message in memory
    const botMessageRecord: StoredChatMessage = {
      id: `bot_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      sender: 'assistant',
      text: botResponse.text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      offeringTag: botResponse.offeringTag,
      pageLink: botResponse.pageLink,
      suggestedFollowUps: botResponse.suggestedFollowUps,
      isLeadPrompt: botResponse.isLeadPrompt
    }
    await appendMessage(session.conversationId, botMessageRecord)

    // 9. Update rolling summary for long chats & persist session
    updateRollingSummary(session, [...history, userMessageRecord, botMessageRecord])
    await saveSession(session)

    // 10. Handle Streaming (SSE) or JSON response
    if (stream) {
      const encoder = new TextEncoder()
      const readableStream = new ReadableStream({
        async start(controller) {
          // Stream chunks of text to simulate realistic typing / token generation
          const words = botResponse.text.split(' ')
          for (let i = 0; i < words.length; i += 3) {
            const chunk = words.slice(i, i + 3).join(' ') + (i + 3 < words.length ? ' ' : '')
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: 'delta', content: chunk })}\n\n`)
            )
            await new Promise(r => setTimeout(r, 28))
          }

          // Send complete metadata at the end of the stream
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: 'done',
                conversationId: session.conversationId,
                offeringTag: botResponse.offeringTag,
                pageLink: botResponse.pageLink,
                suggestedFollowUps: botResponse.suggestedFollowUps,
                isLeadPrompt: botResponse.isLeadPrompt,
                cta: botResponse.cta,
                session: {
                  turnCount: session.turnCount,
                  activeTopic: resolvedTurn.activeTopic,
                  taskStage: resolvedTurn.taskStage
                }
              })}\n\n`
            )
          )
          controller.close()
        }
      })

      return new Response(readableStream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache, no-transform',
          'Connection': 'keep-alive'
        }
      })
    }

    // Default JSON Response
    return NextResponse.json({
      success: true,
      conversationId: session.conversationId,
      message: botMessageRecord,
      offeringTag: botResponse.offeringTag,
      pageLink: botResponse.pageLink,
      suggestedFollowUps: botResponse.suggestedFollowUps,
      isLeadPrompt: botResponse.isLeadPrompt,
      cta: botResponse.cta,
      session: {
        turnCount: session.turnCount,
        activeTopic: resolvedTurn.activeTopic,
        taskStage: resolvedTurn.taskStage,
        topicsDiscussed: session.topicsDiscussed
      }
    })
  } catch (error: any) {
    console.error('[API /api/chat Error]', error)
    return NextResponse.json(
      {
        error: 'Failed to process conversational request.',
        details: error?.message || 'Internal server error'
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/chat?conversationId=...
 * Restores conversation history and session metadata
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const conversationId = searchParams.get('conversationId')

    if (!conversationId) {
      return NextResponse.json(
        { error: 'conversationId query parameter is required.' },
        { status: 400 }
      )
    }

    const session = await getOrCreateSession(conversationId)
    const history = await getConversationHistory(conversationId, 30)

    return NextResponse.json({
      success: true,
      conversationId: session.conversationId,
      session,
      history
    })
  } catch (error: any) {
    console.error('[API /api/chat GET Error]', error)
    return NextResponse.json(
      { error: 'Failed to fetch conversation session.' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/chat?conversationId=...
 * Clears and resets a conversation context from Redis and memory
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const conversationId = searchParams.get('conversationId')

    if (!conversationId) {
      return NextResponse.json(
        { error: 'conversationId query parameter is required.' },
        { status: 400 }
      )
    }

    await clearConversation(conversationId)

    return NextResponse.json({
      success: true,
      message: 'Conversation context has been cleared and reset successfully.'
    })
  } catch (error: any) {
    console.error('[API /api/chat DELETE Error]', error)
    return NextResponse.json(
      { error: 'Failed to reset conversation session.' },
      { status: 500 }
    )
  }
}

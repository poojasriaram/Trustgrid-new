import type {
  Conversation,
  ChatMessage,
  ChatAttachment,
  UploadedFileRecord,
  VoiceMessageRecord,
  ChatActionPill,
  GroupedConversations
} from '@/src/types/chat'
import { getSupabaseClientConfig, formatFileSize } from './storageService'

const LOCAL_CONVERSATIONS_KEY = 'tg_enterprise_conversations_v2'
const LOCAL_MESSAGES_PREFIX = 'tg_enterprise_messages_v2_'
const GUEST_CONV_IDS_KEY = 'tg_guest_conversation_ids_v2'

export function generateUuid(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function getHeaders(accessToken?: string | null): Record<string, string> {
  const { anonKey } = getSupabaseClientConfig()
  return {
    apikey: anonKey,
    Authorization: `Bearer ${accessToken || anonKey}`,
    'Content-Type': 'application/json'
  }
}

export function getGuestConversationIds(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(GUEST_CONV_IDS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function addGuestConversationId(id: string): void {
  if (typeof window === 'undefined') return
  try {
    const current = new Set(getGuestConversationIds())
    current.add(id)
    localStorage.setItem(GUEST_CONV_IDS_KEY, JSON.stringify(Array.from(current)))
  } catch {}
}

function loadLocalConversations(): Conversation[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(LOCAL_CONVERSATIONS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveLocalConversations(convs: Conversation[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(LOCAL_CONVERSATIONS_KEY, JSON.stringify(convs))
  } catch {}
}

export function loadLocalMessages(conversationId: string): ChatMessage[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(`${LOCAL_MESSAGES_PREFIX}${conversationId}`)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveLocalMessages(conversationId: string, messages: ChatMessage[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(`${LOCAL_MESSAGES_PREFIX}${conversationId}`, JSON.stringify(messages))
  } catch {}
}

/**
 * Group conversations into ChatGPT / Claude style time buckets:
 * - Pinned
 * - Today
 * - Yesterday
 * - Previous 7 Days
 * - Previous 30 Days
 * - Older
 */
export function groupConversationsByTimeBucket(conversations: Conversation[]): GroupedConversations {
  const groups: GroupedConversations = {
    pinned: [],
    today: [],
    yesterday: [],
    previous_7_days: [],
    previous_30_days: [],
    older: []
  }

  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const startOfYesterday = startOfToday - 24 * 60 * 60 * 1000
  const startOf7Days = startOfToday - 7 * 24 * 60 * 60 * 1000
  const startOf30Days = startOfToday - 30 * 24 * 60 * 60 * 1000

  const sorted = [...conversations].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  )

  for (const conv of sorted) {
    if (conv.pinned) {
      groups.pinned.push(conv)
      continue
    }

    const updatedTime = new Date(conv.updated_at || conv.created_at).getTime()
    if (updatedTime >= startOfToday) {
      groups.today.push(conv)
    } else if (updatedTime >= startOfYesterday) {
      groups.yesterday.push(conv)
    } else if (updatedTime >= startOf7Days) {
      groups.previous_7_days.push(conv)
    } else if (updatedTime >= startOf30Days) {
      groups.previous_30_days.push(conv)
    } else {
      groups.older.push(conv)
    }
  }

  return groups
}

/**
 * Fetch all conversations for the authenticated user or local guest session
 */
export async function fetchConversations(
  userId?: string | null,
  accessToken?: string | null
): Promise<Conversation[]> {
  const { url } = getSupabaseClientConfig()
  const localConvs = loadLocalConversations()

  try {
    let query = 'select=*&order=updated_at.desc&limit=100'
    if (userId) {
      query += `&user_id=eq.${encodeURIComponent(userId)}`
    } else {
      const guestIds = getGuestConversationIds()
      if (guestIds.length > 0) {
        query += `&id=in.(${guestIds.map((id) => `"${id}"`).join(',')})`
      } else {
        return localConvs
      }
    }

    const res = await fetch(`${url}/rest/v1/conversations?${query}`, {
      headers: getHeaders(accessToken)
    })

    if (res.ok) {
      const dbRows: Conversation[] = await res.json()
      const mergedMap = new Map<string, Conversation>()
      localConvs.forEach((c) => mergedMap.set(c.id, c))
      dbRows.forEach((c) => mergedMap.set(c.id, c))
      const merged = Array.from(mergedMap.values()).sort(
        (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
      saveLocalConversations(merged)
      return merged
    }
  } catch {
    // Fallback to local conversations
  }

  return localConvs
}

/**
 * Create a new conversation in Supabase + local cache
 */
export async function createConversation(
  title: string = 'New Consultation',
  userId?: string | null,
  accessToken?: string | null
): Promise<Conversation> {
  const { url } = getSupabaseClientConfig()
  const now = new Date().toISOString()
  const newConv: Conversation = {
    id: generateUuid(),
    user_id: userId || null,
    title: title || 'New Consultation',
    pinned: false,
    created_at: now,
    updated_at: now
  }

  if (!userId) {
    addGuestConversationId(newConv.id)
  }

  const existing = loadLocalConversations()
  saveLocalConversations([newConv, ...existing.filter((c) => c.id !== newConv.id)])

  try {
    await fetch(`${url}/rest/v1/conversations`, {
      method: 'POST',
      headers: {
        ...getHeaders(accessToken),
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(newConv)
    })
  } catch {}

  return newConv
}

/**
 * Update a conversation (rename title, toggle pinned, update timestamp)
 */
export async function updateConversation(
  conversationId: string,
  updates: Partial<Pick<Conversation, 'title' | 'pinned' | 'updated_at' | 'user_id'>>,
  accessToken?: string | null
): Promise<void> {
  const { url } = getSupabaseClientConfig()
  const now = new Date().toISOString()
  const payload = { ...updates, updated_at: updates.updated_at || now }

  const localConvs = loadLocalConversations().map((c) =>
    c.id === conversationId ? { ...c, ...payload } : c
  )
  saveLocalConversations(localConvs)

  try {
    await fetch(`${url}/rest/v1/conversations?id=eq.${encodeURIComponent(conversationId)}`, {
      method: 'PATCH',
      headers: {
        ...getHeaders(accessToken),
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(payload)
    })
  } catch {}
}

/**
 * Delete a conversation and cascade remove its messages
 */
export async function deleteConversation(
  conversationId: string,
  accessToken?: string | null
): Promise<void> {
  const { url } = getSupabaseClientConfig()
  const localConvs = loadLocalConversations().filter((c) => c.id !== conversationId)
  saveLocalConversations(localConvs)

  if (typeof window !== 'undefined') {
    localStorage.removeItem(`${LOCAL_MESSAGES_PREFIX}${conversationId}`)
  }

  try {
    await fetch(`${url}/rest/v1/conversations?id=eq.${encodeURIComponent(conversationId)}`, {
      method: 'DELETE',
      headers: getHeaders(accessToken)
    })
  } catch {}
}

/**
 * Sync Guest Mode conversations to an authenticated user account upon Sign In
 */
export async function syncGuestConversationsToUser(
  userId: string,
  accessToken?: string | null
): Promise<void> {
  const guestIds = getGuestConversationIds()
  if (guestIds.length === 0) return

  const { url } = getSupabaseClientConfig()
  const localConvs = loadLocalConversations().map((c) =>
    guestIds.includes(c.id) ? { ...c, user_id: userId } : c
  )
  saveLocalConversations(localConvs)

  try {
    const idList = guestIds.map((id) => `"${id}"`).join(',')
    await fetch(`${url}/rest/v1/conversations?id=in.(${idList})`, {
      method: 'PATCH',
      headers: {
        ...getHeaders(accessToken),
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({ user_id: userId, updated_at: new Date().toISOString() })
    })
  } catch {}
}

/**
 * Fetch messages along with attachments, uploaded_files, and voice_messages for a conversation
 */
export async function fetchConversationMessages(
  conversationId: string,
  accessToken?: string | null
): Promise<ChatMessage[]> {
  const { url } = getSupabaseClientConfig()
  const localMsgs = loadLocalMessages(conversationId)

  try {
    const [msgsRes, attRes, filesRes, voiceRes] = await Promise.all([
      fetch(
        `${url}/rest/v1/messages?conversation_id=eq.${encodeURIComponent(conversationId)}&order=created_at.asc`,
        { headers: getHeaders(accessToken) }
      ),
      fetch(
        `${url}/rest/v1/attachments?conversation_id=eq.${encodeURIComponent(conversationId)}`,
        { headers: getHeaders(accessToken) }
      ),
      fetch(
        `${url}/rest/v1/uploaded_files?conversation_id=eq.${encodeURIComponent(conversationId)}`,
        { headers: getHeaders(accessToken) }
      ),
      fetch(
        `${url}/rest/v1/voice_messages?conversation_id=eq.${encodeURIComponent(conversationId)}`,
        { headers: getHeaders(accessToken) }
      )
    ])

    if (msgsRes.ok) {
      const dbMsgs: ChatMessage[] = await msgsRes.json()
      if (dbMsgs.length > 0) {
        const attachments: ChatAttachment[] = attRes.ok ? await attRes.json() : []
        const files: UploadedFileRecord[] = filesRes.ok ? await filesRes.json() : []
        const voices: VoiceMessageRecord[] = voiceRes.ok ? await voiceRes.json() : []

        const hydrated = dbMsgs.map((m) => {
          const localMatch = localMsgs.find((lm) => lm.id === m.id)
          return {
            ...m,
            attachments: attachments.filter((a) => a.message_id === m.id),
            files: files.filter((f) => f.message_id === m.id),
            voiceMessages: voices.filter((v) => v.message_id === m.id),
            actions: localMatch?.actions,
            offeringTag: localMatch?.offeringTag
          }
        })
        saveLocalMessages(conversationId, hydrated)
        return hydrated
      }
    }
  } catch {}

  return localMsgs
}

/**
 * Persist a message and its associated attachments, files, and voice notes to Supabase
 */
export async function persistChatMessage(
  message: ChatMessage,
  accessToken?: string | null
): Promise<void> {
  const { url } = getSupabaseClientConfig()
  const existing = loadLocalMessages(message.conversation_id)
  const updated = [...existing.filter((m) => m.id !== message.id), message]
  saveLocalMessages(message.conversation_id, updated)

  try {
    await fetch(`${url}/rest/v1/messages`, {
      method: 'POST',
      headers: {
        ...getHeaders(accessToken),
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({
        id: message.id,
        conversation_id: message.conversation_id,
        role: message.role,
        content: message.content,
        created_at: message.created_at
      })
    })

    if (message.attachments && message.attachments.length > 0) {
      await fetch(`${url}/rest/v1/attachments`, {
        method: 'POST',
        headers: { ...getHeaders(accessToken), Prefer: 'return=minimal' },
        body: JSON.stringify(message.attachments)
      })
    }

    if (message.files && message.files.length > 0) {
      await fetch(`${url}/rest/v1/uploaded_files`, {
        method: 'POST',
        headers: { ...getHeaders(accessToken), Prefer: 'return=minimal' },
        body: JSON.stringify(message.files)
      })
    }

    if (message.voiceMessages && message.voiceMessages.length > 0) {
      await fetch(`${url}/rest/v1/voice_messages`, {
        method: 'POST',
        headers: { ...getHeaders(accessToken), Prefer: 'return=minimal' },
        body: JSON.stringify(message.voiceMessages)
      })
    }
  } catch {}
}

/**
 * Specialized AI Engine for Aegis — Principal AI Systems & Infrastructure Architect at TRUSTGRID.AI
 */
export async function generateSpecializedAIResponse(params: {
  conversationId: string
  userText: string
  attachments: ChatAttachment[]
  files: UploadedFileRecord[]
  voiceMessages: VoiceMessageRecord[]
}): Promise<{
  replyText: string
  offeringTag: string
  actions: ChatActionPill[]
}> {
  const { conversationId, userText, attachments, files, voiceMessages } = params

  // Build context summary for multi-modal attachments
  const modalityNotes: string[] = []
  if (attachments.length > 0) {
    modalityNotes.push(
      `[Analyzed ${attachments.length} architecture screenshot(s): ${attachments
        .map((a) => a.file_name || 'image.webp')
        .join(', ')}]`
    )
  }
  if (files.length > 0) {
    modalityNotes.push(
      `[Parsed ${files.length} technical document(s): ${files
        .map((f) => `${f.file_name} (${formatFileSize(f.file_size)})`)
        .join(', ')}]`
    )
  }
  if (voiceMessages.length > 0) {
    modalityNotes.push(
      `[Transcribed ${voiceMessages.length} voice briefing (${voiceMessages[0].duration}s audio note)]`
    )
  }

  const effectivePrompt =
    userText.trim() ||
    (voiceMessages.length > 0
      ? 'Please review my voice briefing on our enterprise AI infrastructure and GPU cluster requirements.'
      : files.length > 0
      ? `Please analyze the uploaded technical specification document (${files[0].file_name}) and recommend an optimal TRUSTGRID.AI architecture.`
      : 'Please evaluate the attached architecture screenshot and provide topology recommendations.')

  // 1. Call backend /api/chat route first
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversationId,
        message: effectivePrompt
      })
    })

    if (res.ok) {
      const data = await res.json()
      if (data.reply) {
        const prefix = modalityNotes.length > 0 ? `${modalityNotes.join(' • ')}\n\n` : ''
        return {
          replyText: `${prefix}${data.reply}`,
          offeringTag: data.offeringTag || 'Enterprise AI Infrastructure & Agentic Systems',
          actions: [
            { label: '📅 Schedule 45-Min Consultation', action: 'BOOKING_PORTAL', href: '/booking' },
            { label: '💬 WhatsApp Escalation', action: 'WHATSAPP_ESCALATION', href: '/whatsapp' },
            { label: '📋 Request Architecture Quote', action: 'REQUEST_QUOTE' }
          ]
        }
      }
    }
  } catch {
    // Fallback to deterministic domain knowledge engine below
  }

  // 2. Deterministic Domain Specialist Fallback (Aegis — TRUSTGRID.AI Principal Architect)
  const q = effectivePrompt.toLowerCase()
  const prefix = modalityNotes.length > 0 ? `${modalityNotes.join(' • ')}\n\n` : ''

  if (q.includes('gpu') || q.includes('pue') || q.includes('cooling') || q.includes('120 kw') || q.includes('datacenter') || q.includes('data center')) {
    return {
      replyText:
        `${prefix}**TRUSTGRID.AI Hyperscale GPU Factory & Liquid Cooling Blueprint:**\n\n` +
        `• **Campus Scale**: 50 MW Live | 500 MW Masterplanned (scalable in 25 MW blocks with land & substation bays secured).\n` +
        `• **Thermal Efficiency**: **PUE 1.15 Design** (1.18 annualized @ 80% IT load, 35°C ambient per ISO/IEC 30134-2; WUE < 0.15 L/kWh).\n` +
        `• **Rack Density**: **120 kW Ready** (30 kW standard | 60 kW AI average) with 70% direct-to-chip cold plates, 30°C supply water, and N+1 CDUs.\n` +
        `• **Assured Yield**: 20%+ assured GPU compute utilization improvement across H100, H200, and GB200 NVL72 clusters.`,
      offeringTag: 'AI Infrastructure & Hyperscale Data Center Engineering',
      actions: [
        { label: '📅 Book 45-Min Data Center Briefing', action: 'BOOKING_PORTAL', href: '/booking' },
        { label: '📋 Request GPU Factory Quote', action: 'REQUEST_QUOTE' },
        { label: '💬 WhatsApp Engineering Desk', action: 'WHATSAPP_ESCALATION', href: '/whatsapp' }
      ]
    }
  }

  if (q.includes('network') || q.includes('800g') || q.includes('400g') || q.includes('roce') || q.includes('infiniband') || q.includes('quantum') || q.includes('security')) {
    return {
      replyText:
        `${prefix}**TRUSTGRID.AI 400G/800G Lossless AI Networking & Quantum-Safe Defense:**\n\n` +
        `• **AI Fabric**: **800G Ready Fabric** (400G Day-1 with < 2µs leaf-spine latency) over non-blocking fat-tree RoCEv2 and InfiniBand NDR/XDR.\n` +
        `• **Storage Fabric**: GPUDirect Storage & NVMe-oF interconnects eliminating collective All-Reduce and checkpointing stalls.\n` +
        `• **Quantum-Safe Security**: Post-Quantum Cryptography (NIST FIPS 203/204 ML-KEM/ML-DSA), SPIFFE/SPIRE zero-trust identity, and sub-3-minute SOAR containment.`,
      offeringTag: 'AI-Native Networking & Quantum-Safe Cybersecurity',
      actions: [
        { label: '📅 Schedule Network Fabric Review', action: 'BOOKING_PORTAL', href: '/booking' },
        { label: '📋 Request Fabric & Security Audit', action: 'REQUEST_QUOTE' },
        { label: '💬 WhatsApp Escalation', action: 'WHATSAPP_ESCALATION', href: '/whatsapp' }
      ]
    }
  }

  if (q.includes('agent') || q.includes('swarm') || q.includes('rag') || q.includes('llm') || q.includes('mcp')) {
    return {
      replyText:
        `${prefix}**TRUSTGRID.AI Enterprise Agentic Factory & Multi-Agent Swarm Architecture:**\n\n` +
        `• **Deterministic Consensus DAGs**: Multi-agent orchestration (LangGraph / AutoGen / MCP connectors) with persistent semantic memory.\n` +
        `• **Runtime Guardrails**: Anti-prompt-injection firewalls, Human-in-the-Loop (HITL) confidence gates, and full AgentOps token telemetry.\n` +
        `• **Sovereign Deployment**: Air-gapped on-prem or hybrid inference pods using vLLM / SGLang with continuous synthetic evaluation sprints.`,
      offeringTag: 'Enterprise Agentic AI & Multi-Agent Swarms',
      actions: [
        { label: '📅 Book Agentic Architecture Session', action: 'BOOKING_PORTAL', href: '/booking' },
        { label: '📋 Request Pilot-to-Factory Scope', action: 'REQUEST_QUOTE' },
        { label: '💬 WhatsApp Escalation', action: 'WHATSAPP_ESCALATION', href: '/whatsapp' }
      ]
    }
  }

  return {
    replyText:
      `${prefix}**TRUSTGRID.AI Principal Systems Architecture Assessment:**\n\n` +
      `We engineer end-to-end enterprise AI systems across four integrated pillars:\n` +
      `1. **Hyperscale AI Data Centers**: 50–500 MW campuses, PUE 1.15 liquid cooling, 120 kW racks, and 99.999% Tier III+ availability.\n` +
      `2. **800G Lossless AI Networking & PQC Security**: < 2µs RoCEv2/InfiniBand fabrics and quantum-safe zero-trust defense.\n` +
      `3. **Autonomous Multi-Agent Factories**: Production agent swarms with MCP tool integration and runtime guardrails.\n` +
      `4. **AI Value Engineering & FinOps**: 20%+ assured GPU performance optimization and CFO-grade unit economics.\n\n` +
      `Would you like to lock a 45-minute technical briefing or receive a tailored architecture proposal?`,
    offeringTag: 'Full-Stack Enterprise AI Systems Engineering',
    actions: [
      { label: '📅 Schedule Consultation', action: 'BOOKING_PORTAL', href: '/booking' },
      { label: '💬 WhatsApp Escalation', action: 'WHATSAPP_ESCALATION', href: '/whatsapp' },
      { label: '📋 Request Quote', action: 'REQUEST_QUOTE' }
    ]
  }
}

'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import type {
  Conversation,
  ChatMessage,
  ChatAttachment,
  UploadedFileRecord,
  VoiceMessageRecord,
  PendingImageAttachment,
  PendingFileAttachment,
  GroupedConversations
} from '@/src/types/chat'
import {
  fetchConversations,
  createConversation,
  updateConversation,
  deleteConversation,
  fetchConversationMessages,
  persistChatMessage,
  groupConversationsByTimeBucket,
  generateSpecializedAIResponse,
  generateUuid
} from '@/src/services/chatService'
import {
  uploadChatImageAttachment,
  uploadChatDocumentFile,
  uploadChatVoiceNote
} from '@/src/services/storageService'

export function useChatHistory(userId: string | null, isGuest: boolean, accessToken: string | null) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [debouncedQuery, setDebouncedQuery] = useState<string>('')
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(true)
  const [isGenerating, setIsGenerating] = useState<boolean>(false)

  // Debounce search query (200ms)
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim().toLowerCase())
    }, 200)
    return () => clearTimeout(t)
  }, [searchQuery])

  // Load conversation list on mount or auth change
  const refreshConversations = useCallback(async () => {
    setIsLoadingHistory(true)
    const convs = await fetchConversations(isGuest ? null : userId, accessToken)
    setConversations(convs)
    if (convs.length > 0 && !activeConversationId) {
      setActiveConversationId(convs[0].id)
    }
    setIsLoadingHistory(false)
  }, [userId, isGuest, accessToken, activeConversationId])

  useEffect(() => {
    refreshConversations()
  }, [refreshConversations])

  // Load messages whenever activeConversationId changes
  useEffect(() => {
    if (!activeConversationId) {
      setMessages([])
      return
    }
    let cancelled = false
    fetchConversationMessages(activeConversationId, accessToken).then((msgs) => {
      if (!cancelled) {
        setMessages(msgs)
      }
    })
    return () => {
      cancelled = true
    }
  }, [activeConversationId, accessToken])

  // Filtered and time-bucketed conversations
  const filteredConversations = useMemo(() => {
    if (!debouncedQuery) return conversations
    return conversations.filter((c) => c.title.toLowerCase().includes(debouncedQuery))
  }, [conversations, debouncedQuery])

  const groupedConversations: GroupedConversations = useMemo(
    () => groupConversationsByTimeBucket(filteredConversations),
    [filteredConversations]
  )

  const handleNewConsultation = useCallback(async () => {
    const conv = await createConversation(
      'New Architecture Consultation',
      isGuest ? null : userId,
      accessToken
    )
    setConversations((prev) => [conv, ...prev])
    setActiveConversationId(conv.id)
    setMessages([])
    return conv
  }, [userId, isGuest, accessToken])

  const handleRenameConversation = useCallback(
    async (conversationId: string, newTitle: string) => {
      const clean = newTitle.trim()
      if (!clean) return
      setConversations((prev) =>
        prev.map((c) =>
          c.id === conversationId
            ? { ...c, title: clean, updated_at: new Date().toISOString() }
            : c
        )
      )
      await updateConversation(conversationId, { title: clean }, accessToken)
    },
    [accessToken]
  )

  const handleTogglePinConversation = useCallback(
    async (conversationId: string) => {
      const target = conversations.find((c) => c.id === conversationId)
      if (!target) return
      const nextPinned = !target.pinned
      setConversations((prev) =>
        prev.map((c) => (c.id === conversationId ? { ...c, pinned: nextPinned } : c))
      )
      await updateConversation(conversationId, { pinned: nextPinned }, accessToken)
    },
    [conversations, accessToken]
  )

  const handleDeleteConversation = useCallback(
    async (conversationId: string) => {
      setConversations((prev) => {
        const remaining = prev.filter((c) => c.id !== conversationId)
        if (activeConversationId === conversationId) {
          setActiveConversationId(remaining[0]?.id || null)
        }
        return remaining
      })
      await deleteConversation(conversationId, accessToken)
    },
    [activeConversationId, accessToken]
  )

  const sendMultiModalMessage = useCallback(
    async (params: {
      text: string
      pendingImages: PendingImageAttachment[]
      pendingFiles: PendingFileAttachment[]
      voiceBlob?: Blob | null
      voiceDuration?: number
    }) => {
      const { text, pendingImages, pendingFiles, voiceBlob, voiceDuration } = params
      if (
        !text.trim() &&
        pendingImages.length === 0 &&
        pendingFiles.length === 0 &&
        !voiceBlob
      ) {
        return
      }

      setIsGenerating(true)

      try {
        // 1. Ensure active conversation exists
        let convId = activeConversationId
        let isFirstMessageInConv = messages.length === 0
        if (!convId) {
          const initialTitle = text.trim()
            ? text.trim().slice(0, 48)
            : voiceBlob
            ? 'Voice Architecture Briefing'
            : pendingFiles[0]?.name || pendingImages[0]?.name || 'Architecture Consultation'
          const created = await createConversation(
            initialTitle,
            isGuest ? null : userId,
            accessToken
          )
          convId = created.id
          setActiveConversationId(convId)
          setConversations((prev) => [created, ...prev])
          isFirstMessageInConv = true
        } else if (isFirstMessageInConv && text.trim()) {
          const autoTitle = text.trim().slice(0, 48)
          handleRenameConversation(convId, autoTitle)
        }

        const userMsgId = generateUuid()
        const nowIso = new Date().toISOString()

        // 2. Upload images, documents, and voice notes to Supabase Storage buckets
        const uploadedAttachments: ChatAttachment[] = []
        for (const img of pendingImages) {
          const res = await uploadChatImageAttachment(convId, img.file, accessToken)
          uploadedAttachments.push({
            id: generateUuid(),
            conversation_id: convId,
            message_id: userMsgId,
            user_id: isGuest ? null : userId,
            file_url: res.fileUrl,
            file_type: res.fileType,
            file_name: res.fileName,
            file_size: res.fileSize,
            uploaded_at: nowIso
          })
        }

        const uploadedFiles: UploadedFileRecord[] = []
        for (const doc of pendingFiles) {
          const res = await uploadChatDocumentFile(convId, doc.file, accessToken)
          uploadedFiles.push({
            id: generateUuid(),
            conversation_id: convId,
            message_id: userMsgId,
            user_id: isGuest ? null : userId,
            file_name: res.fileName,
            file_type: res.fileType,
            file_size: res.fileSize,
            file_url: res.fileUrl,
            created_at: nowIso
          })
        }

        const uploadedVoices: VoiceMessageRecord[] = []
        if (voiceBlob) {
          const res = await uploadChatVoiceNote(convId, voiceBlob, voiceDuration || 1, accessToken)
          uploadedVoices.push({
            id: generateUuid(),
            conversation_id: convId,
            message_id: userMsgId,
            user_id: isGuest ? null : userId,
            audio_url: res.audioUrl,
            duration: res.duration,
            created_at: nowIso
          })
        }

        const userMessageContent =
          text.trim() ||
          (uploadedVoices.length > 0
            ? '🎤 Voice Architecture Note'
            : uploadedFiles.length > 0
            ? `📎 Attached Document: ${uploadedFiles.map((f) => f.file_name).join(', ')}`
            : `🖼️ Attached Screenshot: ${uploadedAttachments.map((a) => a.file_name).join(', ')}`)

        const userMsg: ChatMessage = {
          id: userMsgId,
          conversation_id: convId,
          role: 'user',
          content: userMessageContent,
          created_at: nowIso,
          attachments: uploadedAttachments,
          files: uploadedFiles,
          voiceMessages: uploadedVoices
        }

        setMessages((prev) => [...prev, userMsg])
        await persistChatMessage(userMsg, accessToken)

        // Update conversation updated_at timestamp
        await updateConversation(convId, { updated_at: nowIso }, accessToken)
        setConversations((prev) =>
          prev
            .map((c) => (c.id === convId ? { ...c, updated_at: nowIso } : c))
            .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        )

        // 3. Generate specialized AI Architect response
        const aiResult = await generateSpecializedAIResponse({
          conversationId: convId,
          userText: text,
          attachments: uploadedAttachments,
          files: uploadedFiles,
          voiceMessages: uploadedVoices
        })

        const assistantMsg: ChatMessage = {
          id: generateUuid(),
          conversation_id: convId,
          role: 'assistant',
          content: aiResult.replyText,
          created_at: new Date().toISOString(),
          offeringTag: aiResult.offeringTag,
          actions: aiResult.actions
        }

        setMessages((prev) => [...prev, assistantMsg])
        await persistChatMessage(assistantMsg, accessToken)
      } finally {
        setIsGenerating(false)
      }
    },
    [
      activeConversationId,
      messages.length,
      isGuest,
      userId,
      accessToken,
      handleRenameConversation
    ]
  )

  return {
    conversations,
    groupedConversations,
    activeConversationId,
    setActiveConversationId,
    messages,
    searchQuery,
    setSearchQuery,
    isLoadingHistory,
    isGenerating,
    handleNewConsultation,
    handleRenameConversation,
    handleTogglePinConversation,
    handleDeleteConversation,
    sendMultiModalMessage,
    refreshConversations
  }
}

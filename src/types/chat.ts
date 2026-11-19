export type UserRole = 'user' | 'admin'

export interface ChatUser {
  id: string
  email: string
  fullName?: string
  avatarUrl?: string
  role: UserRole
  isGuest: boolean
}

export interface Conversation {
  id: string
  user_id: string | null
  title: string
  pinned: boolean
  created_at: string
  updated_at: string
}

export interface ChatAttachment {
  id: string
  conversation_id: string
  message_id: string
  user_id: string | null
  file_url: string
  file_type: string
  file_name: string | null
  file_size: number | null
  uploaded_at: string
}

export interface UploadedFileRecord {
  id: string
  conversation_id: string
  message_id: string
  user_id: string | null
  file_name: string
  file_type: string
  file_size: number
  file_url: string
  created_at: string
}

export interface VoiceMessageRecord {
  id: string
  conversation_id: string
  message_id: string
  user_id: string | null
  audio_url: string
  duration: number
  created_at: string
}

export interface ChatActionPill {
  label: string
  action: 'BOOKING_PORTAL' | 'WHATSAPP_ESCALATION' | 'REQUEST_QUOTE' | 'PROMPT'
  promptText?: string
  href?: string
}

export interface ChatMessage {
  id: string
  conversation_id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  created_at: string
  attachments?: ChatAttachment[]
  files?: UploadedFileRecord[]
  voiceMessages?: VoiceMessageRecord[]
  actions?: ChatActionPill[]
  offeringTag?: string
}

export interface PendingImageAttachment {
  id: string
  file: File
  previewUrl: string
  name: string
  size: number
  type: string
  width?: number
  height?: number
}

export interface PendingFileAttachment {
  id: string
  file: File
  name: string
  size: number
  type: string
}

export interface PendingVoiceNote {
  id: string
  blob: Blob
  previewUrl: string
  duration: number
  waveformPeaks: number[]
}

export type TimeBucketKey =
  | 'pinned'
  | 'today'
  | 'yesterday'
  | 'previous_7_days'
  | 'previous_30_days'
  | 'older'

export interface GroupedConversations {
  pinned: Conversation[]
  today: Conversation[]
  yesterday: Conversation[]
  previous_7_days: Conversation[]
  previous_30_days: Conversation[]
  older: Conversation[]
}

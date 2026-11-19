'use client'

import React, { useState } from 'react'
import { Bot, User, Copy, Check, ArrowRight, Sparkles } from 'lucide-react'
import type { ChatMessage, ChatActionPill } from '@/src/types/chat'
import { AudioMessagePlayer } from './AudioMessagePlayer'
import { FileAttachmentCard } from './FileAttachmentCard'

interface ChatMessageItemProps {
  message: ChatMessage
  onOpenImageLightbox: (imageUrl: string, imageName?: string | null) => void
  onActionPillClick: (pill: ChatActionPill) => void
}

export function ChatMessageItem({
  message,
  onOpenImageLightbox,
  onActionPillClick
}: ChatMessageItemProps) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === 'user'

  const handleCopyText = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(message.content).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      })
    }
  }

  const formattedTime = new Date(message.created_at).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} group`}>
      <div className={`flex items-start gap-3 max-w-[92%] md:max-w-[82%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-sm ${
            isUser
              ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white'
              : 'bg-blue-950/90 border border-blue-500/40 text-cyan-400'
          }`}
        >
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>

        {/* Message Bubble & Media Container */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-2 min-w-0`}>
          {/* Offering / Architecture Pillar Badge */}
          {!isUser && message.offeringTag && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
              {message.offeringTag}
            </span>
          )}

          {/* Image Attachments Grid */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {message.attachments.map((att) => (
                <button
                  key={att.id}
                  type="button"
                  onClick={() => onOpenImageLightbox(att.file_url, att.file_name)}
                  className="relative group/img overflow-hidden rounded-xl border border-slate-700 hover:border-cyan-400 transition shadow-md cursor-pointer"
                >
                  <img
                    src={att.file_url}
                    alt={att.file_name || 'Screenshot'}
                    className="max-h-48 max-w-[240px] object-cover group-hover/img:scale-105 transition-transform duration-200"
                  />
                  <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded bg-black/75 text-[10px] font-mono text-slate-200 opacity-0 group-hover/img:opacity-100 transition-opacity">
                    Click to Zoom
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Document File Attachments */}
          {message.files && message.files.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {message.files.map((file) => (
                <FileAttachmentCard key={file.id} file={file} isUserMessage={isUser} />
              ))}
            </div>
          )}

          {/* Voice Note Players */}
          {message.voiceMessages && message.voiceMessages.length > 0 && (
            <div className="flex flex-col gap-2">
              {message.voiceMessages.map((vm) => (
                <AudioMessagePlayer
                  key={vm.id}
                  audioUrl={vm.audio_url}
                  duration={Number(vm.duration)}
                  isUserMessage={isUser}
                />
              ))}
            </div>
          )}

          {/* Text Content Bubble */}
          {message.content && (
            <div
              className={`relative rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm whitespace-pre-wrap break-words ${
                isUser
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-slate-900/95 border border-slate-800 text-slate-100 rounded-tl-none'
              }`}
            >
              {message.content}
            </div>
          )}

          {/* Timestamp & Copy Button */}
          <div className="flex items-center gap-2 px-1 text-[10px] text-slate-500">
            <span>{formattedTime}</span>
            <button
              type="button"
              onClick={handleCopyText}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 transition cursor-pointer"
              title="Copy message text"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Action Pills Below AI Responses */}
          {!isUser && message.actions && message.actions.length > 0 && (
            <div className="pt-1 flex flex-wrap gap-2">
              {message.actions.map((pill, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onActionPillClick(pill)}
                  className="text-xs bg-slate-900 hover:bg-blue-950/90 hover:text-cyan-300 text-slate-200 border border-slate-800 hover:border-cyan-500/50 px-3 py-1.5 rounded-full transition flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                >
                  <span>{pill.label}</span>
                  <ArrowRight className="w-3 h-3 opacity-70" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

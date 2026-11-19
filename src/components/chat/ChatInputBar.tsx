'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  Send,
  Image as ImageIcon,
  Paperclip,
  Mic,
  X,
  FileText,
  FileSpreadsheet,
  UploadCloud,
  Sparkles
} from 'lucide-react'
import type { PendingImageAttachment, PendingFileAttachment } from '@/src/types/chat'
import {
  compressImageToWebP,
  formatFileSize,
  MAX_DOCUMENT_SIZE_BYTES,
  ALLOWED_DOCUMENT_EXTENSIONS
} from '@/src/services/storageService'
import { generateUuid } from '@/src/services/chatService'
import { useVoiceRecorder } from '@/src/hooks/useVoiceRecorder'
import { VoiceRecorder } from './VoiceRecorder'

interface ChatInputBarProps {
  isGenerating: boolean
  onSendMessage: (params: {
    text: string
    pendingImages: PendingImageAttachment[]
    pendingFiles: PendingFileAttachment[]
    voiceBlob?: Blob | null
    voiceDuration?: number
  }) => Promise<void>
  onOpenRequestQuoteModal: () => void
}

export function ChatInputBar({
  isGenerating,
  onSendMessage,
  onOpenRequestQuoteModal
}: ChatInputBarProps) {
  const [text, setText] = useState('')
  const [pendingImages, setPendingImages] = useState<PendingImageAttachment[]>([])
  const [pendingFiles, setPendingFiles] = useState<PendingFileAttachment[]>([])
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const [uploadWarning, setUploadWarning] = useState<string | null>(null)
  const [showVoiceMode, setShowVoiceMode] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const imageInputRef = useRef<HTMLInputElement | null>(null)
  const docInputRef = useRef<HTMLInputElement | null>(null)

  const voice = useVoiceRecorder()

  // Auto-resize multi-line textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(180, Math.max(42, el.scrollHeight))}px`
  }, [text])

  const processIncomingFiles = useCallback(async (fileList: FileList | File[]) => {
    setUploadWarning(null)
    const filesArray = Array.from(fileList)

    for (const file of filesArray) {
      if (file.type.startsWith('image/')) {
        try {
          const compressed = await compressImageToWebP(file)
          setPendingImages((prev) => [
            ...prev,
            {
              id: generateUuid(),
              file: compressed.file,
              previewUrl: compressed.dataUrl,
              name: compressed.file.name,
              size: compressed.file.size,
              type: compressed.file.type,
              width: compressed.width,
              height: compressed.height
            }
          ])
        } catch {
          setUploadWarning(`Could not compress image "${file.name}".`)
        }
      } else {
        if (file.size > MAX_DOCUMENT_SIZE_BYTES) {
          setUploadWarning(`"${file.name}" exceeds the 25 MB limit.`)
          continue
        }
        setPendingFiles((prev) => [
          ...prev,
          {
            id: generateUuid(),
            file,
            name: file.name,
            size: file.size,
            type: file.type || 'application/octet-stream'
          }
        ])
      }
    }
  }, [])

  // Global Ctrl+V / Cmd+V paste listener for screenshots anywhere on the page
  useEffect(() => {
    const handleGlobalPaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return

      const imageFiles: File[] = []
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile()
          if (file) imageFiles.push(file)
        }
      }

      if (imageFiles.length > 0) {
        e.preventDefault()
        processIncomingFiles(imageFiles)
      }
    }

    window.addEventListener('paste', handleGlobalPaste)
    return () => window.removeEventListener('paste', handleGlobalPaste)
  }, [processIncomingFiles])

  const handleRemoveImage = (id: string) => {
    setPendingImages((prev) => prev.filter((img) => img.id !== id))
  }

  const handleRemoveFile = (id: string) => {
    setPendingFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (isGenerating) return
    if (!text.trim() && pendingImages.length === 0 && pendingFiles.length === 0) return

    const currentText = text
    const currentImages = [...pendingImages]
    const currentFiles = [...pendingFiles]

    setText('')
    setPendingImages([])
    setPendingFiles([])

    await onSendMessage({
      text: currentText,
      pendingImages: currentImages,
      pendingFiles: currentFiles
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleStartVoiceMode = async () => {
    setShowVoiceMode(true)
    await voice.startRecording()
  }

  const handleCancelVoiceMode = () => {
    voice.cancelRecording()
    setShowVoiceMode(false)
  }

  const handleSendVoiceNote = async () => {
    if (!voice.audioBlob) return
    const blob = voice.audioBlob
    const dur = voice.durationSec || 1
    voice.resetRecording()
    setShowVoiceMode(false)

    await onSendMessage({
      text: text.trim(),
      pendingImages,
      pendingFiles,
      voiceBlob: blob,
      voiceDuration: dur
    })
    setText('')
    setPendingImages([])
    setPendingFiles([])
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        setIsDraggingOver(true)
      }}
      onDragLeave={() => setIsDraggingOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setIsDraggingOver(false)
        if (e.dataTransfer?.files?.length) {
          processIncomingFiles(e.dataTransfer.files)
        }
      }}
      className="relative border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-md px-3 sm:px-6 py-3"
    >
      {/* Drag-and-drop overlay */}
      {isDraggingOver && (
        <div className="absolute inset-2 z-30 rounded-2xl border-2 border-dashed border-cyan-400 bg-slate-900/95 flex flex-col items-center justify-center gap-2 text-cyan-300">
          <UploadCloud className="w-8 h-8 animate-bounce" />
          <span className="text-xs font-semibold">
            Drop screenshots (auto-WebP compressed) or technical documents (PDF, DOCX, CSV, XLSX, TXT)
          </span>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-2.5">
        {uploadWarning && (
          <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-500/40 text-xs text-amber-200">
            <span>{uploadWarning}</span>
            <button
              type="button"
              onClick={() => setUploadWarning(null)}
              className="text-amber-400 hover:text-white cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Multi-Image Thumbnail Bar & Pending Document Badges */}
        {(pendingImages.length > 0 || pendingFiles.length > 0) && (
          <div className="flex flex-wrap items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
            {pendingImages.map((img) => (
              <div
                key={img.id}
                className="relative group w-16 h-16 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shrink-0"
              >
                <img
                  src={img.previewUrl}
                  alt={img.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 inset-x-0 bg-black/75 text-[9px] font-mono text-center text-cyan-300 py-0.5">
                  WebP • {formatFileSize(img.size)}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(img.id)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/80 hover:bg-rose-600 text-white flex items-center justify-center transition cursor-pointer"
                  title="Remove image"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            {pendingFiles.map((doc) => {
              const ext = (doc.name.split('.').pop() || '').toLowerCase()
              const isSheet = ['csv', 'xlsx', 'xls'].includes(ext)
              const DocIcon = isSheet ? FileSpreadsheet : FileText
              return (
                <div
                  key={doc.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 max-w-[230px]"
                >
                  <DocIcon className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium truncate">{doc.name}</div>
                    <div className="text-[10px] font-mono text-slate-400">
                      {formatFileSize(doc.size)}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(doc.id)}
                    className="p-1 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition cursor-pointer"
                    title="Remove file"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )
            })}
          </div>
        )}

        {/* Voice Recorder Mode OR Multi-Modal Text Input Bar */}
        {showVoiceMode ? (
          <VoiceRecorder
            isRecording={voice.isRecording}
            durationSec={voice.durationSec}
            formattedDuration={voice.formattedDuration}
            waveformBars={voice.waveformBars}
            audioBlob={voice.audioBlob}
            audioPreviewUrl={voice.audioPreviewUrl}
            error={voice.error}
            onStopRecording={voice.stopRecording}
            onCancelRecording={handleCancelVoiceMode}
            onSendVoiceNote={handleSendVoiceNote}
            onRetryRecording={voice.startRecording}
          />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 bg-slate-900 border border-slate-800 focus-within:border-blue-500/70 rounded-2xl p-2 shadow-xl transition"
          >
            {/* Hidden File Inputs */}
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                if (e.target.files?.length) processIncomingFiles(e.target.files)
                e.target.value = ''
              }}
              className="hidden"
            />
            <input
              ref={docInputRef}
              type="file"
              accept={ALLOWED_DOCUMENT_EXTENSIONS.join(',')}
              multiple
              onChange={(e) => {
                if (e.target.files?.length) processIncomingFiles(e.target.files)
                e.target.value = ''
              }}
              className="hidden"
            />

            {/* Image Upload Button */}
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition shrink-0 cursor-pointer"
              title="Attach Screenshot / Image (or press Ctrl+V to paste)"
            >
              <ImageIcon className="w-4 h-4" />
            </button>

            {/* Document Upload Button */}
            <button
              type="button"
              onClick={() => docInputRef.current?.click()}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition shrink-0 cursor-pointer"
              title="Upload PDF, DOCX, CSV, XLSX, TXT (up to 25MB)"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            {/* Auto-Resizing Multi-Line Textarea */}
            <textarea
              ref={textareaRef}
              rows={1}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Aegis about 50–500MW GPU factories, PUE 1.15 liquid cooling, 800G RoCEv2, or paste a screenshot (Ctrl+V)..."
              className="flex-1 bg-transparent px-2 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none resize-none max-h-44 leading-relaxed"
            />

            {/* WhatsApp-Style Voice Recording Trigger */}
            <button
              type="button"
              onClick={handleStartVoiceMode}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 transition shrink-0 cursor-pointer"
              title="Record Voice Note"
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={
                isGenerating ||
                (!text.trim() && pendingImages.length === 0 && pendingFiles.length === 0)
              }
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 transition shrink-0 shadow-md shadow-blue-600/25 cursor-pointer"
            >
              <span className="hidden sm:inline">Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* Footer Helper Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 px-1">
          <span>
            Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[10px]">Ctrl+V</kbd> anywhere to paste screenshots • <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[10px]">Shift+Enter</kbd> for new line
          </span>
          <button
            type="button"
            onClick={onOpenRequestQuoteModal}
            className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            <span>Request Official Architecture Proposal</span>
          </button>
        </div>
      </div>
    </div>
  )
}

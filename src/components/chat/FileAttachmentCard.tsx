'use client'

import React from 'react'
import { FileText, FileSpreadsheet, File, Download } from 'lucide-react'
import type { UploadedFileRecord } from '@/src/types/chat'
import { formatFileSize } from '@/src/services/storageService'

interface FileAttachmentCardProps {
  file: UploadedFileRecord
  isUserMessage?: boolean
}

export function FileAttachmentCard({ file, isUserMessage = false }: FileAttachmentCardProps) {
  const ext = (file.file_name.split('.').pop() || '').toLowerCase()
  const isSpreadsheet = ['csv', 'xlsx', 'xls'].includes(ext)
  const isPdfOrDoc = ['pdf', 'docx', 'doc', 'txt', 'md'].includes(ext)

  const Icon = isSpreadsheet ? FileSpreadsheet : isPdfOrDoc ? FileText : File
  const badgeLabel = ext ? ext.toUpperCase() : 'FILE'

  return (
    <a
      href={file.file_url}
      download={file.file_name}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border transition max-w-xs no-underline ${
        isUserMessage
          ? 'bg-blue-700/60 border-blue-400/30 hover:bg-blue-700/80 text-white'
          : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-100'
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
            isUserMessage
              ? 'bg-white/15 text-white'
              : isSpreadsheet
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
          }`}
        >
          <Icon className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-semibold truncate">{file.file_name}</div>
          <div className="text-[10px] font-mono opacity-75 flex items-center gap-1.5 mt-0.5">
            <span className="px-1.5 py-0.2 rounded bg-black/20 font-bold">{badgeLabel}</span>
            <span>•</span>
            <span>{formatFileSize(file.file_size)}</span>
          </div>
        </div>
      </div>

      <div
        className={`p-1.5 rounded-lg shrink-0 transition ${
          isUserMessage
            ? 'bg-white/10 group-hover:bg-white/20 text-white'
            : 'bg-slate-800 group-hover:bg-slate-700 text-slate-300'
        }`}
        title="Download File"
      >
        <Download className="w-3.5 h-3.5" />
      </div>
    </a>
  )
}

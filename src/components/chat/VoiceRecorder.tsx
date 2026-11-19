'use client'

import React from 'react'
import { Trash2, Square, Send, Mic } from 'lucide-react'
import { AudioMessagePlayer } from './AudioMessagePlayer'

interface VoiceRecorderProps {
  isRecording: boolean
  durationSec: number
  formattedDuration: string
  waveformBars: number[]
  audioBlob: Blob | null
  audioPreviewUrl: string | null
  error: string | null
  onStopRecording: () => void
  onCancelRecording: () => void
  onSendVoiceNote: () => void
}

export function VoiceRecorder({
  isRecording,
  durationSec,
  formattedDuration,
  waveformBars,
  audioBlob,
  audioPreviewUrl,
  error,
  onStopRecording,
  onCancelRecording,
  onSendVoiceNote
}: VoiceRecorderProps) {
  if (error) {
    return (
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200">
        <span>{error}</span>
        <button
          type="button"
          onClick={onCancelRecording}
          className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-100 font-semibold cursor-pointer"
        >
          Dismiss
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-2xl bg-slate-900 border border-blue-500/40 shadow-lg">
      {/* Trash / Cancel Button */}
      <button
        type="button"
        onClick={onCancelRecording}
        className="p-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 transition shrink-0 cursor-pointer"
        title="Discard Voice Recording"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {isRecording ? (
        <>
          {/* Live Recording Indicator & Timer */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-mono font-bold text-rose-400 tabular-nums">
              {formattedDuration}
            </span>
          </div>

          {/* 32-Bar Real-Time Animated Frequency Waveform */}
          <div className="flex-1 flex items-center gap-[3px] h-8 px-2 overflow-hidden">
            {waveformBars.map((barHeight, i) => (
              <div
                key={i}
                style={{ height: `${Math.max(15, Math.round(barHeight * 0.3))}px` }}
                className="flex-1 rounded-full bg-gradient-to-t from-blue-500 to-cyan-400 transition-all duration-75"
              />
            ))}
          </div>

          {/* Stop Button (Preview) */}
          <button
            type="button"
            onClick={onStopRecording}
            className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-1.5 shrink-0 transition cursor-pointer"
            title="Stop & Preview Audio"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Stop &amp; Preview</span>
          </button>
        </>
      ) : audioPreviewUrl && audioBlob ? (
        <>
          <div className="flex-1 flex items-center justify-center overflow-x-auto">
            <AudioMessagePlayer audioUrl={audioPreviewUrl} duration={durationSec} />
          </div>

          {/* Send Voice Note Button */}
          <button
            type="button"
            onClick={onSendVoiceNote}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shrink-0 transition shadow-md shadow-blue-600/25 cursor-pointer"
          >
            <span>Send Voice</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </>
      ) : (
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Mic className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Initializing microphone...</span>
        </div>
      )}
    </div>
  )
}

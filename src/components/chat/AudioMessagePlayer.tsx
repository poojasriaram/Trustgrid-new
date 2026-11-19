'use client'

import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Play, Pause, Mic } from 'lucide-react'

interface AudioMessagePlayerProps {
  audioUrl: string
  duration: number
  isUserMessage?: boolean
}

function formatAudioSeconds(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

export function AudioMessagePlayer({
  audioUrl,
  duration,
  isUserMessage = false
}: AudioMessagePlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [totalDuration, setTotalDuration] = useState(duration || 1)
  const [playbackRate, setPlaybackRate] = useState<1 | 1.5 | 2>(1)

  // Deterministic 32-bar waveform shape from audioUrl string
  const waveformPeaks = useMemo(() => {
    const peaks: number[] = []
    let seed = 0
    for (let i = 0; i < audioUrl.length; i++) {
      seed = (seed * 31 + audioUrl.charCodeAt(i)) % 997
    }
    for (let i = 0; i < 32; i++) {
      const val = 22 + ((seed * (i + 7) * 37) % 78)
      peaks.push(val)
    }
    return peaks
  }, [audioUrl])

  useEffect(() => {
    const audio = new Audio(audioUrl)
    audioRef.current = audio

    const onLoadedMetadata = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setTotalDuration(audio.duration)
      }
    }
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }
    const onEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.pause()
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('ended', onEnded)
    }
  }, [audioUrl])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.playbackRate = playbackRate
      audio.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  const handleSeekBarClick = (barIndex: number) => {
    const audio = audioRef.current
    if (!audio) return
    const ratio = (barIndex + 0.5) / waveformPeaks.length
    const targetTime = ratio * (totalDuration || duration || 1)
    audio.currentTime = targetTime
    setCurrentTime(targetTime)
  }

  const cyclePlaybackRate = () => {
    const nextRate: 1 | 1.5 | 2 = playbackRate === 1 ? 1.5 : playbackRate === 1.5 ? 2 : 1
    setPlaybackRate(nextRate)
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate
    }
  }

  const progressRatio = Math.min(1, Math.max(0, currentTime / (totalDuration || duration || 1)))

  return (
    <div
      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl min-w-[240px] max-w-[330px] border ${
        isUserMessage
          ? 'bg-blue-700/70 border-blue-400/30 text-white'
          : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}
    >
      <button
        type="button"
        onClick={togglePlay}
        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition cursor-pointer ${
          isUserMessage
            ? 'bg-white text-blue-700 hover:bg-blue-50'
            : 'bg-blue-600 text-white hover:bg-blue-500'
        }`}
        aria-label={isPlaying ? 'Pause voice message' : 'Play voice message'}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
      </button>

      <div className="flex-1 min-w-0">
        {/* 32-Bar Seekable Scrubber Waveform */}
        <div className="flex items-center gap-[2px] h-7 cursor-pointer">
          {waveformPeaks.map((peak, idx) => {
            const barRatio = idx / waveformPeaks.length
            const isPlayed = barRatio <= progressRatio
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSeekBarClick(idx)}
                style={{ height: `${Math.max(18, Math.round(peak * 0.26))}px` }}
                className={`flex-1 rounded-full transition-colors cursor-pointer ${
                  isPlayed
                    ? isUserMessage
                      ? 'bg-white'
                      : 'bg-cyan-400'
                    : isUserMessage
                    ? 'bg-blue-300/40 hover:bg-blue-200/60'
                    : 'bg-slate-700 hover:bg-slate-600'
                }`}
                aria-label={`Seek to ${Math.round(barRatio * 100)}%`}
              />
            )
          })}
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono mt-1 opacity-85">
          <span>
            {formatAudioSeconds(currentTime)} / {formatAudioSeconds(totalDuration || duration)}
          </span>
          <span className="flex items-center gap-1">
            <Mic className="w-2.5 h-2.5" />
            Voice Note
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={cyclePlaybackRate}
        className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 cursor-pointer ${
          isUserMessage
            ? 'bg-blue-800/80 text-blue-100 hover:bg-blue-800'
            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
        }`}
        title="Playback Speed"
      >
        {playbackRate}x
      </button>
    </div>
  )
}

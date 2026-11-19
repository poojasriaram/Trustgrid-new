'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

export interface UseVoiceRecorderReturn {
  isRecording: boolean
  isPaused: boolean
  durationSec: number
  formattedDuration: string
  waveformBars: number[]
  audioBlob: Blob | null
  audioPreviewUrl: string | null
  error: string | null
  startRecording: () => Promise<void>
  stopRecording: () => void
  cancelRecording: () => void
  resetRecording: () => void
}

const NUM_BARS = 32

export function formatTimerSeconds(totalSec: number): string {
  const mins = Math.floor(totalSec / 60)
  const secs = Math.floor(totalSec % 60)
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export function useVoiceRecorder(): UseVoiceRecorderReturn {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [durationSec, setDurationSec] = useState(0)
  const [waveformBars, setWaveformBars] = useState<number[]>(() => Array(NUM_BARS).fill(12))
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animFrameRef = useRef<number | null>(null)
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const chunksRef = useRef<BlobPart[]>([])
  const isCancelledRef = useRef<boolean>(false)

  const cleanupAudioGraph = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current)
      animFrameRef.current = null
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
      timerIntervalRef.current = null
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop())
      mediaStreamRef.current = null
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {})
      audioContextRef.current = null
    }
    analyserRef.current = null
  }, [])

  useEffect(() => {
    return () => {
      cleanupAudioGraph()
    }
  }, [cleanupAudioGraph])

  const updateWaveformLoop = useCallback(() => {
    const analyser = analyserRef.current
    if (!analyser) return

    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    analyser.getByteFrequencyData(dataArray)

    const bars: number[] = []
    const step = Math.max(1, Math.floor(bufferLength / NUM_BARS))
    for (let i = 0; i < NUM_BARS; i++) {
      let sum = 0
      for (let j = 0; j < step; j++) {
        sum += dataArray[i * step + j] || 0
      }
      const avg = sum / step
      // Normalize between 10% and 100% height
      const normalized = Math.max(10, Math.min(100, Math.round((avg / 255) * 100)))
      bars.push(normalized)
    }

    setWaveformBars(bars)
    animFrameRef.current = requestAnimationFrame(updateWaveformLoop)
  }, [])

  const startRecording = useCallback(async () => {
    setError(null)
    isCancelledRef.current = false
    chunksRef.current = []
    setAudioBlob(null)
    if (audioPreviewUrl) {
      URL.revokeObjectURL(audioPreviewUrl)
      setAudioPreviewUrl(null)
    }

    try {
      if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
        throw new Error('Microphone recording is not supported in this browser.')
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaStreamRef.current = stream

      // Setup Web Audio API AnalyserNode for 32-bar real-time frequency waveform
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      const audioCtx: AudioContext = new AudioCtx()
      audioContextRef.current = audioCtx
      const source = audioCtx.createMediaStreamSource(stream)
      const analyser = audioCtx.createAnalyser()
      analyser.fftSize = 128
      analyser.smoothingTimeConstant = 0.75
      source.connect(analyser)
      analyserRef.current = analyser

      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/mp4')
        ? 'audio/mp4'
        : ''

      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream)
      mediaRecorderRef.current = recorder

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      recorder.onstop = () => {
        cleanupAudioGraph()
        if (isCancelledRef.current) {
          chunksRef.current = []
          setIsRecording(false)
          return
        }
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || 'audio/webm'
        })
        const url = URL.createObjectURL(blob)
        setAudioBlob(blob)
        setAudioPreviewUrl(url)
        setIsRecording(false)
      }

      recorder.start(150)
      setIsRecording(true)
      setIsPaused(false)
      setDurationSec(0)

      timerIntervalRef.current = setInterval(() => {
        setDurationSec((prev) => prev + 1)
      }, 1000)

      animFrameRef.current = requestAnimationFrame(updateWaveformLoop)
    } catch (err: any) {
      cleanupAudioGraph()
      setError(err?.message || 'Microphone access denied. Please enable microphone permissions.')
      setIsRecording(false)
    }
  }, [audioPreviewUrl, cleanupAudioGraph, updateWaveformLoop])

  const stopRecording = useCallback(() => {
    const rec = mediaRecorderRef.current
    if (rec && rec.state !== 'inactive') {
      rec.stop()
    } else {
      cleanupAudioGraph()
      setIsRecording(false)
    }
  }, [cleanupAudioGraph])

  const cancelRecording = useCallback(() => {
    isCancelledRef.current = true
    const rec = mediaRecorderRef.current
    if (rec && rec.state !== 'inactive') {
      rec.stop()
    }
    cleanupAudioGraph()
    setIsRecording(false)
    setDurationSec(0)
    setAudioBlob(null)
    if (audioPreviewUrl) {
      URL.revokeObjectURL(audioPreviewUrl)
      setAudioPreviewUrl(null)
    }
  }, [audioPreviewUrl, cleanupAudioGraph])

  const resetRecording = useCallback(() => {
    setAudioBlob(null)
    if (audioPreviewUrl) {
      URL.revokeObjectURL(audioPreviewUrl)
      setAudioPreviewUrl(null)
    }
    setDurationSec(0)
    setWaveformBars(Array(NUM_BARS).fill(12))
  }, [audioPreviewUrl])

  return {
    isRecording,
    isPaused,
    durationSec,
    formattedDuration: formatTimerSeconds(durationSec),
    waveformBars,
    audioBlob,
    audioPreviewUrl,
    error,
    startRecording,
    stopRecording,
    cancelRecording,
    resetRecording
  }
}

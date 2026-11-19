'use client'

import React, { useState, useEffect } from 'react'
import { X, Download, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'

interface LightboxModalProps {
  imageUrl: string | null
  imageName?: string | null
  onClose: () => void
}

export function LightboxModal({ imageUrl, imageName, onClose }: LightboxModalProps) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    setScale(1)
  }, [imageUrl])

  useEffect(() => {
    if (!imageUrl) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [imageUrl, onClose])

  if (!imageUrl) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4"
      onClick={onClose}
    >
      {/* Top Toolbar */}
      <div
        className="flex items-center justify-between max-w-6xl w-full mx-auto py-2 px-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-xs font-mono truncate max-w-xs">
          {imageName || 'Architecture_Screenshot.webp'}
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setScale((s) => Math.max(0.5, Number((s - 0.25).toFixed(2))))}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono w-12 text-center">{Math.round(scale * 100)}%</span>
          <button
            type="button"
            onClick={() => setScale((s) => Math.min(3, Number((s + 0.25).toFixed(2))))}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setScale(1)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            title="Reset Zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <a
            href={imageUrl}
            download={imageName || 'screenshot.webp'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition no-underline"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 transition cursor-pointer"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center Image Viewport */}
      <div
        className="flex-1 flex items-center justify-center overflow-auto my-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt={imageName || 'Preview'}
          style={{ transform: `scale(${scale})`, transition: 'transform 0.15s ease-out' }}
          className="max-h-[80vh] max-w-[90vw] object-contain rounded-xl shadow-2xl border border-slate-800"
        />
      </div>

      <div className="text-center text-[11px] font-mono text-slate-400">
        Click outside or press ESC to close
      </div>
    </div>
  )
}

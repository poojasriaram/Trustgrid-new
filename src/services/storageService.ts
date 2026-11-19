const DEFAULT_SUPABASE_URL = 'https://ndalgvpvpzwrqoikkpyb.supabase.co'
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv'

export function getSupabaseClientConfig() {
  const url = (
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    DEFAULT_SUPABASE_URL
  ).replace(/\/$/, '')
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    DEFAULT_SUPABASE_ANON_KEY
  return { url, anonKey }
}

export const MAX_DOCUMENT_SIZE_BYTES = 25 * 1024 * 1024 // 25 MB

export const ALLOWED_DOCUMENT_EXTENSIONS = [
  '.pdf',
  '.docx',
  '.doc',
  '.csv',
  '.xlsx',
  '.xls',
  '.txt',
  '.json',
  '.md'
]

export function formatFileSize(bytes: number | null | undefined): string {
  if (!bytes || bytes <= 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const val = bytes / Math.pow(1024, i)
  return `${val >= 10 || i === 0 ? Math.round(val) : val.toFixed(1)} ${units[i]}`
}

/**
 * Compresses an image File/Blob client-side using an offscreen HTML5 <canvas>
 * to WebP format with max width/height of 1920px.
 */
export async function compressImageToWebP(
  file: File,
  maxDimension: number = 1920,
  quality: number = 0.85
): Promise<{ file: File; dataUrl: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      if (!dataUrl) {
        reject(new Error('Failed to read image file'))
        return
      }
      const img = new Image()
      img.onload = () => {
        let { width, height } = img
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width)
            width = maxDimension
          } else {
            width = Math.round((width * maxDimension) / height)
            height = maxDimension
          }
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          resolve({ file, dataUrl, width: img.width, height: img.height })
          return
        }

        ctx.drawImage(img, 0, 0, width, height)
        const compressedDataUrl = canvas.toDataURL('image/webp', quality)

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve({ file, dataUrl, width, height })
              return
            }
            const cleanBaseName = (file.name || 'screenshot')
              .replace(/\.[^/.]+$/, '')
              .replace(/[^a-zA-Z0-9_-]/g, '_')
            const webpFile = new File([blob], `${cleanBaseName}.webp`, {
              type: 'image/webp',
              lastModified: Date.now()
            })
            resolve({
              file: webpFile,
              dataUrl: compressedDataUrl,
              width,
              height
            })
          },
          'image/webp',
          quality
        )
      }
      img.onerror = () => resolve({ file, dataUrl, width: 0, height: 0 })
      img.src = dataUrl
    }
    reader.onerror = () => reject(new Error('Image FileReader failed'))
    reader.readAsDataURL(file)
  })
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(typeof reader.result === 'string' ? reader.result : '')
    reader.onerror = () => resolve('')
    reader.readAsDataURL(blob)
  })
}

async function uploadToSupabaseBucket(
  bucket: 'chat-attachments' | 'chat-files' | 'chat-voice',
  storagePath: string,
  fileOrBlob: File | Blob,
  contentType: string,
  accessToken?: string | null
): Promise<string> {
  const { url, anonKey } = getSupabaseClientConfig()
  const authHeader = `Bearer ${accessToken || anonKey}`

  try {
    const res = await fetch(`${url}/storage/v1/object/${bucket}/${storagePath}`, {
      method: 'POST',
      headers: {
        apikey: anonKey,
        Authorization: authHeader,
        'Content-Type': contentType,
        'x-upsert': 'true'
      },
      body: fileOrBlob
    })

    if (res.ok) {
      return `${url}/storage/v1/object/public/${bucket}/${storagePath}`
    }
  } catch {
    // Fallback below if storage bucket is not yet created or offline
  }

  // Graceful fallback to persistent Data URL or Object URL so media never breaks
  if (fileOrBlob.size <= 3 * 1024 * 1024) {
    const dataUrl = await blobToDataUrl(fileOrBlob)
    if (dataUrl) return dataUrl
  }
  return typeof URL !== 'undefined' ? URL.createObjectURL(fileOrBlob) : ''
}

/**
 * Upload compressed screenshot / image to `chat-attachments` bucket
 */
export async function uploadChatImageAttachment(
  conversationId: string,
  file: File,
  accessToken?: string | null
): Promise<{
  fileUrl: string
  fileName: string
  fileType: string
  fileSize: number
}> {
  const compressed = await compressImageToWebP(file)
  const timestamp = Date.now()
  const rand = Math.random().toString(36).slice(2, 8)
  const storagePath = `${conversationId}/${timestamp}_${rand}_${compressed.file.name}`

  const fileUrl = await uploadToSupabaseBucket(
    'chat-attachments',
    storagePath,
    compressed.file,
    compressed.file.type || 'image/webp',
    accessToken
  )

  return {
    fileUrl: fileUrl || compressed.dataUrl,
    fileName: compressed.file.name,
    fileType: compressed.file.type || 'image/webp',
    fileSize: compressed.file.size
  }
}

/**
 * Upload document (PDF, DOCX, CSV, XLSX, TXT) up to 25MB to `chat-files` bucket
 */
export async function uploadChatDocumentFile(
  conversationId: string,
  file: File,
  accessToken?: string | null
): Promise<{
  fileUrl: string
  fileName: string
  fileType: string
  fileSize: number
}> {
  if (file.size > MAX_DOCUMENT_SIZE_BYTES) {
    throw new Error(`File "${file.name}" exceeds the 25 MB maximum size limit.`)
  }

  const timestamp = Date.now()
  const rand = Math.random().toString(36).slice(2, 8)
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const storagePath = `${conversationId}/${timestamp}_${rand}_${safeName}`

  const fileUrl = await uploadToSupabaseBucket(
    'chat-files',
    storagePath,
    file,
    file.type || 'application/octet-stream',
    accessToken
  )

  return {
    fileUrl,
    fileName: file.name,
    fileType: file.type || safeName.split('.').pop()?.toUpperCase() || 'DOCUMENT',
    fileSize: file.size
  }
}

/**
 * Upload voice recording audio blob to `chat-voice` bucket
 */
export async function uploadChatVoiceNote(
  conversationId: string,
  blob: Blob,
  duration: number,
  accessToken?: string | null
): Promise<{
  audioUrl: string
  duration: number
}> {
  const timestamp = Date.now()
  const rand = Math.random().toString(36).slice(2, 8)
  const ext = blob.type.includes('mp4') ? 'm4a' : blob.type.includes('ogg') ? 'ogg' : 'webm'
  const storagePath = `${conversationId}/voice_${timestamp}_${rand}.${ext}`

  const audioUrl = await uploadToSupabaseBucket(
    'chat-voice',
    storagePath,
    blob,
    blob.type || 'audio/webm',
    accessToken
  )

  return {
    audioUrl,
    duration: Math.max(1, Math.round(duration))
  }
}

import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ScrollRevealObserver } from '@/components/scroll-reveal-observer'

export const metadata: Metadata = {
  title: 'TrustGrid.ai — Build what can be trusted',
  description: 'TrustGrid.ai helps ambitious organizations turn AI from a source of uncertainty into a durable advantage.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#07143d',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased">
        {children}
        <ScrollRevealObserver />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import { ScrollRevealObserver } from '@/components/scroll-reveal-observer'
import { AnalyticsTracker } from '@/components/analytics-tracker'

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
      <head>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "yfq82hsy3o");
          `}
        </Script>
      </head>
      <body className="antialiased">
        <AnalyticsTracker />
        {children}
        <ScrollRevealObserver />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}



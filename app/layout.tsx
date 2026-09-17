import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import './sitemap-styles.css'
import { ScrollRevealObserver } from '@/components/scroll-reveal-observer'
import { AnalyticsTracker } from '@/components/analytics-tracker'
import { AIArchitectChatbot } from '@/components/ui/ai-architect-chatbot'

export const metadata: Metadata = {
  title: 'TRUSTGRID.AI — Enterprise AI Engineering Operating Company',
  description: 'TRUSTGRID.AI architects, deploys, optimizes, and secures full-stack enterprise AI infrastructure, GPU factories, autonomous agent fleets, and quantum-safe networks.',
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
            })(window, document, "clarity", "script", "yj0srnjmcb");
          `}
        </Script>
      </head>
      <body className="antialiased">
        <AnalyticsTracker />
        {children}
        <ScrollRevealObserver />
        <AIArchitectChatbot />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import './sitemap-styles.css'
import { ScrollRevealObserver } from '@/components/scroll-reveal-observer'
import { AnalyticsTracker } from '@/components/analytics-tracker'
import { AIArchitectChatbot } from '@/components/ui/ai-architect-chatbot'
import { FloatingLeadForm } from '@/components/ui/floating-lead-form'
import { WhatsAppCTA } from '@/components/ui/whatsapp-cta'

import { PrivacyConsentBanner } from '@/components/ui/privacy-consent-banner'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

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
    <html lang="en" className={`bg-background ${plusJakartaSans.variable} ${ibmPlexMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
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
      <body className={`antialiased ${plusJakartaSans.className}`}>
        <AnalyticsTracker />
        {children}
        <ScrollRevealObserver />
        <FloatingLeadForm />
        <WhatsAppCTA />
        <AIArchitectChatbot />
        <PrivacyConsentBanner />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

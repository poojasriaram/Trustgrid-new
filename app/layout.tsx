import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import './main.css'
import { ScrollRevealObserver } from '@/components/scroll-reveal-observer'
import { AnalyticsTracker } from '@/components/analytics-tracker'
import { ClientOverlays } from '@/components/client-overlays'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'TRUSTGRID.AI — Enterprise AI Engineering Operating Company',
    template: '%s | TRUSTGRID.AI',
  },
  description: 'TRUSTGRID.AI architects, deploys, optimizes, and secures full-stack enterprise AI infrastructure, GPU factories, autonomous agent fleets, and quantum-safe networks.',
  metadataBase: new URL('https://trustgrid.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TRUSTGRID.AI — Enterprise AI Engineering Operating Company',
    description: 'Engineering the resilient, hyper-optimized backbone of the global AI economy from silicon to autonomous agents.',
    url: 'https://trustgrid.ai',
    siteName: 'TRUSTGRID.AI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TRUSTGRID.AI — Enterprise AI Engineering Operating Company',
    description: 'Full-stack enterprise AI infrastructure, GPU factories, and autonomous agent fleets.',
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <Script id="microsoft-clarity" strategy="lazyOnload">
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
        <ClientOverlays />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}



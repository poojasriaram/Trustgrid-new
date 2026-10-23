import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import './main.css'
import './design-system.css'
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
        {/* Microsoft Clarity Tracking (Project ID: z2125pmmtz) */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "z2125pmmtz");
          `}
        </Script>
        {/* Google Consent Mode v2 & Google Analytics (GA4) with Environment Separation */}
        <Script id="google-consent-and-ga4-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Google Consent Mode v2 Default State
            gtag('consent', 'default', {
              'analytics_storage': 'granted',
              'ad_storage': 'granted',
              'ad_user_data': 'granted',
              'ad_personalization': 'granted',
              'functionality_storage': 'granted',
              'security_storage': 'granted',
              'wait_for_update': 500
            });

            var currentHost = typeof window !== 'undefined' ? window.location.hostname : '';
            var isProductionHost = currentHost === 'trustgrid.ai' || currentHost === 'www.trustgrid.ai' || currentHost === 'trustgrid.in' || currentHost === 'www.trustgrid.in';

            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-F0BHWRT22R'}', {
              page_path: typeof window !== 'undefined' ? window.location.pathname : '/',
              send_page_view: true,
              traffic_type: isProductionHost ? 'production' : 'staging',
              environment: isProductionHost ? 'production' : 'staging',
              debug_mode: !isProductionHost,
              linker: {
                domains: ['trustgrid.ai', 'trustgrid.in', 'www.trustgrid.ai', 'www.trustgrid.in']
              }
            });
          `}
        </Script>
        <Script
          id="google-analytics-tag"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-F0BHWRT22R'}`}
        />

        {/* Google Tag Manager (GTM) Container */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID || 'GTM-TGRD2026'}');
          `}
        </Script>

        {/* Organization Structured Data with Retained Contact Points */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'TRUSTGRID.AI',
              url: 'https://trustgrid.ai',
              logo: 'https://trustgrid.ai/logo.png',
              sameAs: ['https://www.linkedin.com/company/trustgridai/'],
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: '+1-650-772-4145',
                  contactType: 'customer service',
                  areaServed: ['US', 'Americas', 'Global'],
                  availableLanguage: ['English']
                },
                {
                  '@type': 'ContactPoint',
                  telephone: '+91-9513088612',
                  contactType: 'technical support',
                  areaServed: ['IN', 'APAC', 'Global'],
                  availableLanguage: ['English', 'Hindi']
                }
              ]
            })
          }}
        />
      </head>
      <body className={`antialiased ${plusJakartaSans.className}`}>
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID || 'GTM-TGRD2026'}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <AnalyticsTracker />
        {children}
        <ScrollRevealObserver />
        <ClientOverlays />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}



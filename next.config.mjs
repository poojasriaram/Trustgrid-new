/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@base-ui/react'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.clarity.ms https://*.clarity.ms https://va.vercel-scripts.com https://vitals.vercel-insights.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https: https://hebbkx1anhila5yf.public.blob.vercel-storage.com https://*.clarity.ms https://c.clarity.ms",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://*.clarity.ms https://c.clarity.ms https://va.vercel-scripts.com https://vitals.vercel-insights.com https://script.google.com https://script.googleusercontent.com https://ipapi.co",
              "frame-ancestors 'self'",
            ].join('; '),
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/offerings',
        destination: '/#offerings',
        permanent: true,
      },
      {
        source: '/solutions',
        destination: '/#offerings',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/terms-and-conditions',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/cookie-policy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/diagnostic',
        destination: '/book-ai-diagnostic',
        permanent: true,
      },
      {
        source: '/ai-readiness',
        destination: '/book-ai-diagnostic',
        permanent: true,
      },
      {
        source: '/assessment',
        destination: '/book-ai-diagnostic',
        permanent: true,
      },
      {
        source: '/solutions/ai-infra',
        destination: '/solutions/ai-infra-engineering',
        permanent: true,
      },
      {
        source: '/solutions/ai-agents',
        destination: '/solutions/ai-agentic-factory',
        permanent: true,
      },
      {
        source: '/solutions/agentic',
        destination: '/solutions/ai-agentic-factory',
        permanent: true,
      },
      {
        source: '/solutions/networking',
        destination: '/solutions/ai-networking',
        permanent: true,
      },
      {
        source: '/solutions/cybersecurity',
        destination: '/solutions/ai-cybersecurity-quantum-safe',
        permanent: true,
      },
      {
        source: '/solutions/value-engineering',
        destination: '/solutions/ai-value-engineering',
        permanent: true,
      },
      {
        source: '/solutions/trusted-ai',
        destination: '/solutions/trusted-ai-transformation',
        permanent: true,
      },
    ]
  },
}

export default nextConfig


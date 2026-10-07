import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/auth/',
          '/_next/',
        ],
      },
    ],
    sitemap: 'https://trustgrid.ai/sitemap.xml',
    host: 'https://trustgrid.ai',
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    'localhost:3000',
    '127.0.0.1:3000',
    'localhost',
    '127.0.0.1',
  ],
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async redirects() {
    return [
      {
        source: '/offerings',
        destination: '/#offerings',
        permanent: false,
      },
      {
        source: '/solutions',
        destination: '/#offerings',
        permanent: false,
      },
    ]
  },
}

export default nextConfig

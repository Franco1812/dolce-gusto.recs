/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.dolce-gusto.com.ar',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig

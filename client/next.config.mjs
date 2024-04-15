/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  distDir: 'build',
  swcMinify: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/birdnest/:path*',
        destination: 'http://assignments.reaktor.com/birdnest/:path*',
      },
    ]
  },
}

module.exports = nextConfig

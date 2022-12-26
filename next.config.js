/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // use rewrite for api calls to prevent CORS errors
  // https://nextjs.org/docs/api-reference/next.config.js/rewrites
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

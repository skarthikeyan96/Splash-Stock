/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.pexels.com', 'drtpnmlhaicavlzmjgcb.supabase.co'],
  },
}

module.exports = nextConfig

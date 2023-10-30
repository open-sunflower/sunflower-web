/** @type {import('next').NextConfig} */

export default {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.unsplash.com',
      },
    ],
  },
}

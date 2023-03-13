/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [ 
      {
        protocol: "https",
        hostname: "api.netlify.com",
      }
    ],
  },
}

module.exports = nextConfig

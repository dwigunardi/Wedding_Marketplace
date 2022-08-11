/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["https://project-wo.herokuapp.com/"],
  },
}

module.exports = nextConfig


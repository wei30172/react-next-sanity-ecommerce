/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
  },
  sassOptions: {
    additionalData: `@import "styles/_variables.scss";`,
 }
}

module.exports = nextConfig
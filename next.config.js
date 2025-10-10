/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push({
        'canvas': 'canvas',
      })
      
      // Ignore pdf-parse test files
      config.resolve.alias = {
        ...config.resolve.alias,
        './test/data/05-versions-space.pdf': false,
      }
    }
    return config
  },
}

module.exports = nextConfig

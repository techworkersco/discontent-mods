module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'dl.airtable.com' },
      { protocol: 'https', hostname: 'v5.airtableusercontent.com' },
    ],
  },
}

const stailwc = require("stailwc/install");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // swcMinify: true,
  experimental: {
    swcPlugins: [stailwc({ })],
  },
  compiler: {
    emotion: true,
  },
  images: {
    domains: ['dl.airtable.com'],
  },
}

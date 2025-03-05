/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
        pathname: '/coins/images/**',
      },
      {
        protocol: 'https',
        hostname: 'public.readdy.ai',
        pathname: '/ai/img_res/**',
      },
    ],
  },
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // punycode 경고 무시
    config.ignoreWarnings = [
      {
        module: /node_modules\/node-fetch\/lib\/index\.js/,
        message: /^The 'punycode' module is deprecated/,
      },
    ]

    // Handle Node.js specific modules in browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        'tedious/lib/connection': false,
        crypto: false,
        stream: false,
        path: false,
        util: false,
        child_process: false,
      }
    }

    return config
  },
}

module.exports = nextConfig

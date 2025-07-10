/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    localPatterns: [
      {
        pathname: '/**',
        search: '',
      },
    ],
  },
  webpack(config) {
    if (process.env.__NEXT_NEW_BUNDLER !== 'turbo') {
      config.module.rules.push({
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      });
    }
    return config;
  },
};

module.exports = nextConfig;

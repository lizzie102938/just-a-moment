/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    loader: 'default',
    formats: ['image/avif', 'image/webp'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;

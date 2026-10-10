/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // site 100% static: HTML gata făcut, bun pentru SEO
  trailingSlash: true,
  images: { unoptimized: true }, // imaginile se optimizează o dată, manual (WebP)
};

export default nextConfig;

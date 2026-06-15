/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // enables static export
  images: {
    unoptimized: true, // since GitHub Pages doesn’t support Next.js Image Optimization
  },
  basePath: '',
};

export default nextConfig;

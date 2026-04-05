
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/favicon.ico',
        destination: '/',
        permanent: false,
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      // Adding hostnames for NewsAPI sources
      {
        protocol: 'https',
        hostname: 'techcrunch.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'o.aolcdn.com', // Engadget images
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.arstechnica.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.wired.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img-cdn.theverge.net',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'duet-cdn.vox-cdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'platform.theverge.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;

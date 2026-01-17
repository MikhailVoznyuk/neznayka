/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
      },
    experimental: {
        serverActions: {
          bodySizeLimit: '100mb',
        },
      },
      env: {
        PUBLIC_URL: '/',
      }, 
    
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
          bodySizeLimit: '100mb',
        },
      },
      env: {
        PUBLIC_URL: '/',
      }
};

export default nextConfig;

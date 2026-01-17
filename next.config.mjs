/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
      },
    output: "export",
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

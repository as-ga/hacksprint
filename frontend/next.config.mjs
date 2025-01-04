/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_SERVER_URL: process.env.NEXT_SERVER_URL,
  },
};

export default nextConfig;
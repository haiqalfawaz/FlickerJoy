/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "photo-sharing-api-bootcamp.do.dibimbing.id",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

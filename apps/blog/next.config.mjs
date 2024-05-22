/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@dydfuf/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

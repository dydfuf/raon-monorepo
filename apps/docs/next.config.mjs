import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const config = {
  transpilePackages: ["@repo/ui"],
  images: {
    unoptimized: true,
  },
};

export default withContentlayer(config);

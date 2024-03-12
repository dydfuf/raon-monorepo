import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const config = {
  transpilePackages: ["@repo/ui"],
};

export default withContentlayer(config);

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import type { NextConfig } from "next";

//const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // images: {
  //   domains: isProd ? ["your-production-domain.com"] : ["localhost"],
  // },
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;

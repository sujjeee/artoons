import { fileURLToPath } from "node:url"
import createJiti from "jiti"
const jiti = createJiti(fileURLToPath(import.meta.url))

jiti("./src/env")

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    unoptimized: true,
    domains: ["storage.sujjeee.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/:path*`,
      },
    ];
  },
}

export default nextConfig

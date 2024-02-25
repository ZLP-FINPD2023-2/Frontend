import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants.js"

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: We are adding the node-loader here
    config.module.rules.push({
      test: /\.node$/,
      loader: "node-loader",
    })

    return config
  },
}

const nextConfigFunction = async (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = (await import("@ducanh2912/next-pwa")).default({
      dest: "public",
    })
    return withPWA(nextConfig)
  }
  return nextConfig
}

export default nextConfigFunction

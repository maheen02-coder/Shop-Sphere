/** @type {import('next').NextConfig} */
const apiProxyTarget = (
  process.env.API_PROXY_TARGET || "http://127.0.0.1:5000"
).replace(/\/$/, "");

const nextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost", "192.168.1.4"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Serve the API through the same origin so cookies and CORS never depend on
  // whichever port or host the frontend happens to run on.
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiProxyTarget}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const localApiTarget = "http://127.0.0.1:5000";

// Origin of the deployed Express API (no /api suffix), e.g.
// https://shopsphere-api.onrender.com. Evaluated at build time.
const apiProxyTarget = (process.env.API_PROXY_TARGET || "")
  .trim()
  .replace(/\/$/, "");

// Optional alternative: call the API directly from the browser.
const directApiUrl = (process.env.NEXT_PUBLIC_API_URL || "").trim();

const isVercelBuild = Boolean(process.env.VERCEL);

if (isVercelBuild && !apiProxyTarget && !directApiUrl) {
  throw new Error(
    "[ShopSphere] No production API URL is configured. Set API_PROXY_TARGET " +
      "(for example https://shopsphere-api.onrender.com) or NEXT_PUBLIC_API_URL " +
      "(for example https://shopsphere-api.onrender.com/api) in the Vercel " +
      "project environment variables, then redeploy."
  );
}

// Never proxy production traffic to localhost: on Vercel that resolves to a
// private hostname and every /api request fails with a 404 before it reaches
// the Express server.
const proxyTarget = apiProxyTarget || (isVercelBuild ? "" : localApiTarget);

const nextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: ["127.0.0.1", "localhost", "192.168.1.4"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), payment=()",
      },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
    ];

    if (process.env.NODE_ENV === "production") {
      securityHeaders.push({
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob: https:",
          "font-src 'self' data:",
          "connect-src 'self' https:",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'none'",
          "upgrade-insecure-requests",
        ].join("; "),
      });
    }

    return [
      {
        // Vercel serves .jfif as application/octet-stream, which its image
        // optimizer rejects. JFIF files are JPEG, so advertise them correctly.
        source: "/:path*.jfif",
        headers: [{ key: "Content-Type", value: "image/jpeg" }],
      },
      { source: "/:path*", headers: securityHeaders },
    ];
  },
  // Serve the API through the same origin so cookies and CORS never depend on
  // whichever port or host the frontend happens to run on.
  async rewrites() {
    if (!proxyTarget) return [];
    return [
      {
        source: "/api/:path*",
        destination: `${proxyTarget}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;

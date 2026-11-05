require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const { sanitizeInput } = require("./middleware/security");
const { apiLimiter } = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorHandler");

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Fail fast if critical environment variables are missing
const REQUIRED_ENV = ["MONGO_URI", "JWT_SECRET"];
const missingEnv = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
  console.error(
    `[ShopSphere API] Missing required environment variables: ${missingEnv.join(", ")}`
  );
  console.error("[ShopSphere API] Check your backend/.env file.");
  process.exit(1);
}

const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);

// Always allow the local dev frontend and the deployed frontend. Extra origins
// (preview deployments, custom domains) can be appended via CLIENT_URL.
const defaultClientOrigins = [
  "http://localhost:3000",
  "https://shop-sphere-nine-nu.vercel.app",
];

const configuredOrigins = [
  ...new Set(
    [
      ...defaultClientOrigins,
      ...(process.env.CLIENT_URL || "").split(","),
    ]
      .map((origin) => origin.trim())
      .filter(Boolean)
  ),
];

const isLocalOrigin = (origin) => {
  try {
    const { protocol, hostname } = new URL(origin);
    if (protocol !== "http:" && protocol !== "https:") return false;
    if (["localhost", "127.0.0.1", "::1"].includes(hostname)) return true;
    // Private LAN ranges so the site also works via the Next.js Network URL during development
    return /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(hostname);
  } catch {
    return false;
  }
};

const corsOrigin = (origin, callback) => {
  // No Origin header: curl, health checks and server-to-server requests
  if (!origin) return callback(null, true);
  if (configuredOrigins.includes(origin)) return callback(null, true);
  if (process.env.NODE_ENV !== "production" && isLocalOrigin(origin)) {
    return callback(null, true);
  }
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      `[CORS] Blocked origin '${origin}'. Add it to CLIENT_URL if this is expected.`
    );
  }
  return callback(null, false);
};

app.use(helmet());
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());
app.use(sanitizeInput);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ShopSphere API is running.",
    timestamp: new Date().toISOString(),
  });
});

// Apply rate limiter before all /api routes so it covers every endpoint
app.use("/api", apiLimiter);

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  const server = app.listen(PORT, () => {
    console.log(`[ShopSphere API] Listening on http://localhost:${PORT}`);
    console.log(`[ShopSphere API] Environment: ${process.env.NODE_ENV || "development"}`);
  });

  const shutdown = (signal) => {
    console.log(`\n[ShopSphere API] ${signal} received. Shutting down gracefully...`);
    server.close(async () => {
      try {
        await mongoose.connection.close();
      } finally {
        process.exit(0);
      }
    });
    // Do not hang forever if a connection refuses to close
    setTimeout(() => process.exit(1), 10000).unref();
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
};

startServer();

module.exports = app;

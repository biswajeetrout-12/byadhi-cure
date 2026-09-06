import "dotenv/config";
import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";
import { seedAdmin, seedSuperadmin } from "./seed/admin.seed.js";
import { seedProducts } from "./seed/product.seed.js";
import { seedCompany } from "./seed/company.seed.js";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import enquiryRoutes from "./routes/enquiry.routes.js";
import sitemapRoutes from "./routes/sitemap.routes.js";
import companyRoutes from "./routes/company.routes.js";

const app = express();
const PORT = parseInt(process.env.PORT || 5000, 10);

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000", "https://byadhicure.in", "https://www.byadhicure.in"],
  credentials: true,
}));
app.use(express.json());

// ─── Health check ────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, message: "Byadhi Cure Lab API is running 🚀" });
});

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/company", companyRoutes);
app.use(sitemapRoutes);

// ─── 404 handler ─────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ ok: false, message: "Route not found" });
});

// ─── Global error handler ────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ ok: false, message: "Internal server error" });
});

// ─── Unhandled Error Handlers ────────────────────────────────────────────────
process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  process.exit(1);
});

// ─── Start ───────────────────────────────────────────────────────────────────
async function start() {
  try {
    await connectDB();
    await seedAdmin();
    await seedSuperadmin();
    await seedProducts();
    await seedCompany();
    
    const tryListen = (retryCount = 0) => {
      const server = app.listen(PORT, "0.0.0.0", () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📋 API docs: http://localhost:${PORT}/api/health`);
      });

      server.on("error", (err) => {
        if (err.code === "EADDRINUSE" && retryCount < 3) {
          console.warn(`⚠️  Port ${PORT} still in use, retrying in 2 seconds...`);
          setTimeout(() => tryListen(retryCount + 1), 2000);
        } else {
          console.error("❌ Failed to start server:", err.message);
          process.exit(1);
        }
      });

      // Graceful shutdown
      process.on("SIGTERM", () => {
        console.log("⛔ SIGTERM signal received: closing HTTP server");
        server.close(() => {
          console.log("HTTP server closed");
          process.exit(0);
        });
      });

      process.on("SIGINT", () => {
        console.log("⛔ SIGINT signal received: closing HTTP server");
        server.close(() => {
          console.log("HTTP server closed");
          process.exit(0);
        });
      });
    };

    tryListen();
  } catch (error) {
    console.error("❌ Server startup error:", error);
    process.exit(1);
  }
}

start();

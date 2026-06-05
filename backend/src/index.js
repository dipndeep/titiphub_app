import express from "express"
import cors from "cors"
import dotenv from "dotenv"

// Load environment variables
dotenv.config()

// Import routes
import authRoutes from "./routes/auth.js"
import orderRoutes from "./routes/orders.js"
import tariffRoutes from "./routes/tariffs.js"
import statsRoutes from "./routes/stats.js"

const app = express()
const PORT = process.env.PORT || 5000

// ========== MIDDLEWARE ==========
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:4173"],
  credentials: true,
}))
app.use(express.json())

// ========== ROUTES ==========
app.use("/api/auth", authRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/tariffs", tariffRoutes)
app.use("/api/stats", statsRoutes)

// ========== HEALTH CHECK ==========
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "TitipHub API is running",
    timestamp: new Date().toISOString(),
  })
})

// ========== 404 HANDLER ==========
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` })
})

// ========== ERROR HANDLER ==========
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err)
  res.status(500).json({ error: "Internal server error" })
})

// ========== START SERVER ==========
app.listen(PORT, () => {
  console.log("")
  console.log("  ╔══════════════════════════════════════╗")
  console.log("  ║       🚀 TitipHub API Server         ║")
  console.log(`  ║       Running on port ${PORT}           ║`)
  console.log("  ║       http://localhost:" + PORT + "           ║")
  console.log("  ╚══════════════════════════════════════╝")
  console.log("")
  console.log("  Endpoints:")
  console.log("    POST   /api/auth/register")
  console.log("    POST   /api/auth/login")
  console.log("    GET    /api/auth/me")
  console.log("    GET    /api/orders")
  console.log("    POST   /api/orders")
  console.log("    PATCH  /api/orders/:id/process")
  console.log("    PATCH  /api/orders/:id/complete")
  console.log("    GET    /api/tariffs")
  console.log("    PUT    /api/tariffs")
  console.log("    GET    /api/stats")
  console.log("    GET    /api/stats/recent")
  console.log("    GET    /api/health")
  console.log("")
})

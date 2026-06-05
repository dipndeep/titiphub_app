import { Router } from "express"
import { db } from "../db/index.js"
import { tariffs } from "../db/schema.js"
import { eq } from "drizzle-orm"
import { authenticate, authorize } from "../middleware/auth.js"

const router = Router()

// All tariff routes require authentication
router.use(authenticate)

// ========== GET /api/tariffs ==========
// Any authenticated user can view tariffs
router.get("/", async (req, res) => {
  try {
    const result = await db.select().from(tariffs)

    // Convert to key-value format for frontend convenience
    const tariffMap = {}
    result.forEach((t) => {
      tariffMap[t.key] = t.pricePerKg
    })

    res.json({ tariffs: tariffMap, raw: result })
  } catch (err) {
    console.error("Get tariffs error:", err)
    res.status(500).json({ error: "Terjadi kesalahan server." })
  }
})

// ========== PUT /api/tariffs ==========
// Manager only: batch update tariffs
router.put("/", authorize("manager"), async (req, res) => {
  try {
    const { tariffs: newTariffs } = req.body

    if (!newTariffs || typeof newTariffs !== "object") {
      return res.status(400).json({ error: "Data tarif tidak valid." })
    }

    // Update each tariff sequentially
    for (const [key, pricePerKg] of Object.entries(newTariffs)) {
      const price = parseInt(pricePerKg)
      if (isNaN(price) || price < 0) continue

      await db.update(tariffs)
        .set({ pricePerKg: price })
        .where(eq(tariffs.key, key))
    }

    // Return updated tariffs
    const result = await db.select().from(tariffs)
    const tariffMap = {}
    result.forEach((t) => {
      tariffMap[t.key] = t.pricePerKg
    })

    res.json({
      message: "Tarif berhasil diperbarui!",
      tariffs: tariffMap,
    })
  } catch (err) {
    console.error("Update tariffs error:", err)
    res.status(500).json({ error: "Terjadi kesalahan server." })
  }
})

export default router

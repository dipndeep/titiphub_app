import { Router } from "express"
import { db } from "../db/index.js"
import { orders, users } from "../db/schema.js"
import { eq, desc, sql, count } from "drizzle-orm"
import { authenticate, authorize } from "../middleware/auth.js"

const router = Router()

// All stats routes require owner role
router.use(authenticate)
router.use(authorize("owner"))

// ========== GET /api/stats ==========
// Owner only: aggregated statistics
router.get("/", async (req, res) => {
  try {
    const allOrders = await db.select().from(orders)

    const totalOrders = allOrders.length
    const pendingOrders = allOrders.filter(o => o.status === "Pending").length
    const ongoingOrders = allOrders.filter(o => o.status === "On-going").length
    const completedOrders = allOrders.filter(o => o.status === "Completed").length

    // Total revenue (sum of ongkir from completed orders)
    const totalRevenue = allOrders
      .filter(o => o.status === "Completed" && o.ongkir)
      .reduce((sum, o) => sum + o.ongkir, 0)

    // Total customers
    const [totalCustomers] = await db
      .select({ count: count() })
      .from(users)
      .where(eq(users.role, "customer"))

    res.json({
      stats: {
        totalOrders,
        pendingOrders,
        ongoingOrders,
        completedOrders,
        totalRevenue,
        totalCustomers: totalCustomers?.count || 0,
      },
    })
  } catch (err) {
    console.error("Get stats error:", err)
    res.status(500).json({ error: "Terjadi kesalahan server." })
  }
})

// ========== GET /api/stats/recent ==========
// Owner only: 5 most recent orders with customer names
router.get("/recent", async (req, res) => {
  try {
    const result = await db
      .select({
        id: orders.id,
        customerName: users.name,
        itemName: orders.itemName,
        status: orders.status,
        resiTitiphub: orders.resiTitiphub,
        ongkir: orders.ongkir,
        createdAt: orders.createdAt,
      })
      .from(orders)
      .leftJoin(users, eq(orders.customerId, users.id))
      .orderBy(desc(orders.createdAt))
      .limit(5)

    res.json({ recentOrders: result })
  } catch (err) {
    console.error("Get recent orders error:", err)
    res.status(500).json({ error: "Terjadi kesalahan server." })
  }
})

export default router

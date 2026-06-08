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

    // Total weight (sum of beratKg of orders where beratKg is set)
    const ordersWithWeight = allOrders.filter(o => o.beratKg !== null && o.beratKg !== undefined)
    const totalWeight = ordersWithWeight.reduce((sum, o) => sum + o.beratKg, 0)

    // Average weight
    const averageWeight = ordersWithWeight.length > 0
      ? parseFloat((totalWeight / ordersWithWeight.length).toFixed(2))
      : 0

    // Average ongkir (from orders with ongkir)
    const ordersWithOngkir = allOrders.filter(o => o.ongkir !== null && o.ongkir !== undefined)
    const averageOngkir = ordersWithOngkir.length > 0
      ? Math.round(ordersWithOngkir.reduce((sum, o) => sum + o.ongkir, 0) / ordersWithOngkir.length)
      : 0

    // Shipping distribution (Udara vs Laut)
    const shippingTipeUdara = allOrders.filter(o => o.tipePengiriman === "udara").length
    const shippingTipeLaut = allOrders.filter(o => o.tipePengiriman === "laut").length

    // Speed distribution (Reguler vs Express)
    const speedReguler = allOrders.filter(o => o.kecepatan === "reguler").length
    const speedExpress = allOrders.filter(o => o.kecepatan === "express").length

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
        totalWeight,
        averageWeight,
        averageOngkir,
        distribution: {
          tipePengiriman: {
            udara: shippingTipeUdara,
            laut: shippingTipeLaut
          },
          kecepatan: {
            reguler: speedReguler,
            express: speedExpress
          }
        }
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

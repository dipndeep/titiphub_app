import { Router } from "express"
import { db } from "../db/index.js"
import { orders, users } from "../db/schema.js"
import { eq, desc } from "drizzle-orm"
import { authenticate, authorize } from "../middleware/auth.js"

const router = Router()

// All order routes require authentication
router.use(authenticate)

// ========== GET /api/orders ==========
// Customer: sees own orders only
// Manager: sees all orders
router.get("/", async (req, res) => {
  try {
    let result

    if (req.user.role === "customer") {
      result = await db
        .select({
          id: orders.id,
          customerId: orders.customerId,
          customerName: users.name,
          itemName: orders.itemName,
          resiAsal: orders.resiAsal,
          tipePengiriman: orders.tipePengiriman,
          kecepatan: orders.kecepatan,
          catatan: orders.catatan,
          status: orders.status,
          resiTitiphub: orders.resiTitiphub,
          beratKg: orders.beratKg,
          ongkir: orders.ongkir,
          createdAt: orders.createdAt,
        })
        .from(orders)
        .leftJoin(users, eq(orders.customerId, users.id))
        .where(eq(orders.customerId, req.user.id))
        .orderBy(desc(orders.createdAt))
    } else if (req.user.role === "manager") {
      result = await db
        .select({
          id: orders.id,
          customerId: orders.customerId,
          customerName: users.name,
          itemName: orders.itemName,
          resiAsal: orders.resiAsal,
          tipePengiriman: orders.tipePengiriman,
          kecepatan: orders.kecepatan,
          catatan: orders.catatan,
          status: orders.status,
          resiTitiphub: orders.resiTitiphub,
          beratKg: orders.beratKg,
          ongkir: orders.ongkir,
          createdAt: orders.createdAt,
        })
        .from(orders)
        .leftJoin(users, eq(orders.customerId, users.id))
        .orderBy(desc(orders.createdAt))
    } else {
      return res.status(403).json({ error: "Akses ditolak." })
    }

    res.json({ orders: result })
  } catch (err) {
    console.error("Get orders error:", err)
    res.status(500).json({ error: "Terjadi kesalahan server." })
  }
})

// ========== POST /api/orders ==========
// Customer only: create a new order
router.post("/", authorize("customer"), async (req, res) => {
  try {
    const { itemName, resiAsal, tipePengiriman, kecepatan, catatan } = req.body

    if (!itemName || !resiAsal || !tipePengiriman || !kecepatan) {
      return res.status(400).json({ error: "Nama barang, resi asal, tipe pengiriman, dan kecepatan wajib diisi." })
    }

    if (!["udara", "laut"].includes(tipePengiriman)) {
      return res.status(400).json({ error: "Tipe pengiriman harus 'udara' atau 'laut'." })
    }

    if (!["reguler", "express"].includes(kecepatan)) {
      return res.status(400).json({ error: "Kecepatan harus 'reguler' atau 'express'." })
    }

    const [newOrder] = await db.insert(orders).values({
      customerId: req.user.id,
      itemName,
      resiAsal,
      tipePengiriman,
      kecepatan,
      catatan: catatan || null,
      status: "Pending",
    }).returning()

    res.status(201).json({
      message: "Pesanan berhasil dibuat!",
      order: newOrder,
    })
  } catch (err) {
    console.error("Create order error:", err)
    res.status(500).json({ error: "Terjadi kesalahan server." })
  }
})

// ========== PATCH /api/orders/:id/process ==========
// Manager only: assign resi, weight, and set status to On-going
router.patch("/:id/process", authorize("manager"), async (req, res) => {
  try {
    const orderId = parseInt(req.params.id)
    const { resiTitiphub, beratKg, ongkir } = req.body

    if (!resiTitiphub || !beratKg || beratKg <= 0) {
      return res.status(400).json({ error: "Resi TitipHub dan berat paket (> 0 kg) wajib diisi." })
    }

    const [order] = await db.select().from(orders).where(eq(orders.id, orderId))
    if (!order) {
      return res.status(404).json({ error: "Pesanan tidak ditemukan." })
    }

    if (order.status !== "Pending") {
      return res.status(400).json({ error: "Hanya pesanan berstatus 'Pending' yang bisa diproses." })
    }

    const [updated] = await db.update(orders)
      .set({
        resiTitiphub,
        beratKg,
        ongkir: ongkir || 0,
        status: "On-going",
      })
      .where(eq(orders.id, orderId))
      .returning()

    res.json({
      message: "Pesanan berhasil diproses! Resi TitipHub telah diterbitkan.",
      order: updated,
    })
  } catch (err) {
    console.error("Process order error:", err)
    res.status(500).json({ error: "Terjadi kesalahan server." })
  }
})

// ========== PATCH /api/orders/:id/complete ==========
// Manager only: set status to Completed
router.patch("/:id/complete", authorize("manager"), async (req, res) => {
  try {
    const orderId = parseInt(req.params.id)

    const [order] = await db.select().from(orders).where(eq(orders.id, orderId))
    if (!order) {
      return res.status(404).json({ error: "Pesanan tidak ditemukan." })
    }

    if (order.status !== "On-going") {
      return res.status(400).json({ error: "Hanya pesanan berstatus 'On-going' yang bisa diselesaikan." })
    }

    const [updated] = await db.update(orders)
      .set({ status: "Completed" })
      .where(eq(orders.id, orderId))
      .returning()

    res.json({
      message: "Pesanan selesai! Barang siap diambil pelanggan.",
      order: updated,
    })
  } catch (err) {
    console.error("Complete order error:", err)
    res.status(500).json({ error: "Terjadi kesalahan server." })
  }
})

export default router

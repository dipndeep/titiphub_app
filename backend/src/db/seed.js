import { db, client } from "./index.js"
import { users, orders, tariffs } from "./schema.js"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"

async function seed() {
  console.log("🌱 Seeding database...")

  // Create tables if they don't exist (using raw SQL from schema)
  await client.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'customer',
      created_at TEXT DEFAULT (datetime('now'))
    );
  `)

  await client.execute(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER NOT NULL REFERENCES users(id),
      item_name TEXT NOT NULL,
      resi_asal TEXT NOT NULL,
      tipe_pengiriman TEXT NOT NULL,
      kecepatan TEXT NOT NULL,
      catatan TEXT,
      status TEXT NOT NULL DEFAULT 'Pending',
      resi_titiphub TEXT,
      berat_kg REAL,
      ongkir INTEGER,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `)

  await client.execute(`
    CREATE TABLE IF NOT EXISTS tariffs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT NOT NULL UNIQUE,
      price_per_kg INTEGER NOT NULL
    );
  `)

  // Check if already seeded
  const existingUsers = await db.select().from(users)
  if (existingUsers.length > 0) {
    console.log("⚠️  Database sudah memiliki data. Skip seeding.")
    const existingOrders = await db.select().from(orders)
    console.log(`   Users: ${existingUsers.length}, Orders: ${existingOrders.length}`)
    process.exit(0)
  }

  const hash = (pw) => bcrypt.hashSync(pw, 10)

  // ========== SEED USERS ==========
  console.log("👤 Creating dummy accounts...")

  const [owner] = await db.insert(users).values({
    name: "Pak Joko (Owner)",
    email: "owner@titiphub.com",
    phone: "081200000001",
    passwordHash: hash("owner123"),
    role: "owner",
  }).returning()

  const [manager] = await db.insert(users).values({
    name: "Andi (Admin 1)",
    email: "manager@titiphub.com",
    phone: "081200000002",
    passwordHash: hash("manager123"),
    role: "manager",
  }).returning()

  const [budi] = await db.insert(users).values({
    name: "Budi Santoso",
    email: "budi@email.com",
    phone: "081300000001",
    passwordHash: hash("customer123"),
    role: "customer",
  }).returning()

  const [siti] = await db.insert(users).values({
    name: "Siti Rahayu",
    email: "siti@email.com",
    phone: "081300000002",
    passwordHash: hash("customer123"),
    role: "customer",
  }).returning()

  const [agus] = await db.insert(users).values({
    name: "Agus Pratama",
    email: "agus@email.com",
    phone: "081300000003",
    passwordHash: hash("customer123"),
    role: "customer",
  }).returning()

  console.log("   ✅ Owner: owner@titiphub.com / owner123")
  console.log("   ✅ Manager: manager@titiphub.com / manager123")
  console.log("   ✅ Customer: budi@email.com / customer123")
  console.log("   ✅ Customer: siti@email.com / customer123")
  console.log("   ✅ Customer: agus@email.com / customer123")

  // ========== SEED TARIFFS ==========
  console.log("\n💰 Creating tariff entries...")

  await db.insert(tariffs).values([
    { key: "Udara-Reguler", pricePerKg: 85000 },
    { key: "Udara-Express", pricePerKg: 100000 },
    { key: "Laut-Reguler", pricePerKg: 80000 },
    { key: "Laut-Express", pricePerKg: 95000 },
  ])

  console.log("   ✅ Udara Reguler: Rp 85.000/kg")
  console.log("   ✅ Udara Express: Rp 100.000/kg")
  console.log("   ✅ Laut Reguler: Rp 80.000/kg")
  console.log("   ✅ Laut Express: Rp 95.000/kg")

  // ========== SEED ORDERS ==========
  console.log("\n📦 Creating sample orders...")

  await db.insert(orders).values([
    {
      customerId: budi.id,
      itemName: "Sepatu Nike Air Max",
      resiAsal: "JNE-123456789",
      tipePengiriman: "udara",
      kecepatan: "express",
      status: "On-going",
      resiTitiphub: "TH-2026-0001",
      beratKg: 1.2,
      ongkir: 120000,
    },
    {
      customerId: budi.id,
      itemName: "Kemeja Flanel Uniqlo",
      resiAsal: "JNE-556677889",
      tipePengiriman: "udara",
      kecepatan: "reguler",
      status: "Completed",
      resiTitiphub: "TH-2026-0004",
      beratKg: 0.8,
      ongkir: 68000,
    },
    {
      customerId: siti.id,
      itemName: "Kopi Kenangan 3 Pack",
      resiAsal: "SICEPAT-987654321",
      tipePengiriman: "laut",
      kecepatan: "reguler",
      status: "Completed",
      resiTitiphub: "TH-2026-0002",
      beratKg: 2.5,
      ongkir: 200000,
    },
    {
      customerId: agus.id,
      itemName: "Buku Tere Liye - Bumi",
      resiAsal: "JNT-112233445",
      tipePengiriman: "udara",
      kecepatan: "reguler",
      status: "Pending",
      resiTitiphub: null,
      beratKg: null,
      ongkir: null,
    },
  ])

  console.log("   ✅ Order 1 (Budi): Sepatu Nike - On-going")
  console.log("   ✅ Order 2 (Siti): Kopi Kenangan - Completed")
  console.log("   ✅ Order 3 (Agus): Buku Tere Liye - Pending")

  console.log("\n🎉 Seeding selesai! Database siap digunakan.")
  process.exit(0)
}

seed().catch((err) => {
  console.error("❌ Seeding gagal:", err)
  process.exit(1)
})

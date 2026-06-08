import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

// ========== USERS TABLE ==========
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  passwordHash: text("password_hash").notNull(),
  role: text("role", { enum: ["customer", "manager", "owner"] }).notNull().default("customer"),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
  passwordUpdatedAt: text("password_updated_at"),
  resetRequested: integer("reset_requested", { mode: "boolean" }).default(false),
})

// ========== ORDERS TABLE ==========
export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  customerId: integer("customer_id").notNull().references(() => users.id),
  itemName: text("item_name").notNull(),
  resiAsal: text("resi_asal").notNull(),
  tipePengiriman: text("tipe_pengiriman", { enum: ["udara", "laut"] }).notNull(),
  kecepatan: text("kecepatan", { enum: ["reguler", "express"] }).notNull(),
  catatan: text("catatan"),
  status: text("status", { enum: ["Pending", "On-going", "Completed"] }).notNull().default("Pending"),
  resiTitiphub: text("resi_titiphub"),
  beratKg: real("berat_kg"),
  ongkir: integer("ongkir"),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
})

// ========== TARIFFS TABLE ==========
export const tariffs = sqliteTable("tariffs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  key: text("key").notNull().unique(),
  pricePerKg: integer("price_per_kg").notNull(),
})

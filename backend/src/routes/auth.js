import { Router } from "express"
import bcrypt from "bcryptjs"
import { db } from "../db/index.js"
import { users } from "../db/schema.js"
import { eq } from "drizzle-orm"
import { authenticate, generateToken, authorize } from "../middleware/auth.js"

const router = Router()

// ========== POST /api/auth/register ==========
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Nama, email, dan password wajib diisi." })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password minimal 6 karakter." })
    }

    // Check if email already exists
    const [existing] = await db.select().from(users).where(eq(users.email, email))
    if (existing) {
      return res.status(409).json({ error: "Email sudah terdaftar. Silakan gunakan email lain." })
    }

    const passwordHash = bcrypt.hashSync(password, 10)

    const [newUser] = await db.insert(users).values({
      name,
      email,
      phone: phone || null,
      passwordHash,
      role: "customer", // Registration always creates customer
    }).returning()

    const token = generateToken(newUser)

    res.status(201).json({
      message: "Registrasi berhasil!",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      },
    })
  } catch (err) {
    console.error("Register error:", err)
    res.status(500).json({ error: "Terjadi kesalahan server." })
  }
})

// ========== POST /api/auth/login ==========
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email dan password wajib diisi." })
    }

    const [user] = await db.select().from(users).where(eq(users.email, email))
    if (!user) {
      return res.status(401).json({ error: "Email tidak ditemukan." })
    }

    const isValid = bcrypt.compareSync(password, user.passwordHash)
    if (!isValid) {
      return res.status(401).json({ error: "Password salah." })
    }

    const token = generateToken(user)

    res.json({
      message: "Login berhasil!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    })
  } catch (err) {
    console.error("Login error:", err)
    res.status(500).json({ error: "Terjadi kesalahan server." })
  }
})

// ========== GET /api/auth/me ==========
router.get("/me", authenticate, async (req, res) => {
  try {
    const [user] = await db.select().from(users).where(eq(users.id, req.user.id))
    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan." })
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    })
  } catch (err) {
    console.error("Me error:", err)
    res.status(500).json({ error: "Terjadi kesalahan server." })
  }
})
// ========== GET /api/auth/users ==========
// Manager and Owner only: list all registered users
router.get("/users", authenticate, authorize("manager", "owner"), async (req, res) => {
  try {
    const list = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        phone: users.phone,
        role: users.role,
        createdAt: users.createdAt,
      })
      .from(users)
    
    res.json({ users: list })
  } catch (err) {
    console.error("Get users error:", err)
    res.status(500).json({ error: "Terjadi kesalahan server." })
  }
})

export default router

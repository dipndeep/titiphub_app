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
        createdAt: user.createdAt,
        passwordUpdatedAt: user.passwordUpdatedAt,
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
        createdAt: user.createdAt,
        passwordUpdatedAt: user.passwordUpdatedAt,
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
        resetRequested: users.resetRequested,
      })
      .from(users)
    
    res.json({ users: list })
  } catch (err) {
    console.error("Get users error:", err)
    res.status(500).json({ error: "Terjadi kesalahan server." })
  }
})

// ========== POST /api/auth/change-password ==========
// Any authenticated user can change their own password
router.post("/change-password", authenticate, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Password saat ini dan password baru wajib diisi." })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: "Password baru minimal 6 karakter." })
    }

    // Get current user from db
    const [user] = await db.select().from(users).where(eq(users.id, req.user.id))
    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan." })
    }

    // Verify current password
    const isValid = bcrypt.compareSync(currentPassword, user.passwordHash)
    if (!isValid) {
      return res.status(400).json({ error: "Password saat ini salah." })
    }

    // Hash and save new password
    const passwordHash = bcrypt.hashSync(newPassword, 10)
    const passwordUpdatedAt = new Date().toISOString()
    await db.update(users)
      .set({ passwordHash, passwordUpdatedAt })
      .where(eq(users.id, user.id))

    res.json({ 
      message: "Password Anda berhasil diperbarui!",
      passwordUpdatedAt 
    })
  } catch (err) {
    console.error("Change password error:", err)
    res.status(500).json({ error: "Terjadi kesalahan server." })
  }
})

// ========== PATCH /api/auth/users/:id/reset-password ==========
// Manager and Owner only: reset password for a user
router.patch("/users/:id/reset-password", authenticate, authorize("manager", "owner"), async (req, res) => {
  try {
    const { id } = req.params
    const { newPassword } = req.body

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: "Password minimal 6 karakter." })
    }

    const userId = parseInt(id)
    if (isNaN(userId)) {
      return res.status(400).json({ error: "ID pengguna tidak valid." })
    }

    // Check if target user exists
    const [targetUser] = await db.select().from(users).where(eq(users.id, userId))
    if (!targetUser) {
      return res.status(404).json({ error: "Pengguna tidak ditemukan." })
    }

    // Security check: Manager cannot reset Owner's password
    if (req.user.role === "manager" && targetUser.role === "owner") {
      return res.status(403).json({ error: "Anda tidak memiliki wewenang untuk mereset password Owner." })
    }

    // Security check: cannot reset own password from this panel
    if (req.user.id === targetUser.id) {
      return res.status(400).json({ error: "Untuk mereset password Anda sendiri, silakan gunakan menu profil." })
    }

    const passwordHash = bcrypt.hashSync(newPassword, 10)
    await db.update(users)
      .set({ 
        passwordHash,
        resetRequested: false
      })
      .where(eq(users.id, userId))

    res.json({ message: `Password untuk ${targetUser.name} berhasil direset!` })
  } catch (err) {
    console.error("Reset password error:", err)
    res.status(500).json({ error: "Terjadi kesalahan server." })
  }
})

// ========== POST /api/auth/forgot-password ==========
// Public endpoint for requesting a password reset
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: "Email wajib diisi." })
    }

    // Find the user by email
    const [user] = await db.select().from(users).where(eq(users.email, email))
    if (!user) {
      return res.status(404).json({ error: "Email tidak terdaftar dalam sistem TitipHub." })
    }

    // Set resetRequested flag to true
    await db.update(users)
      .set({ resetRequested: true })
      .where(eq(users.id, user.id))

    res.json({ message: "Berhasil menginformasikan ke manager untuk mereset kata sandi." })
  } catch (err) {
    console.error("Forgot password error:", err)
    res.status(500).json({ error: "Terjadi kesalahan server." })
  }
})

export default router

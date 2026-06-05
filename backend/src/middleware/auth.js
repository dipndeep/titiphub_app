import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || "titiphub_fallback_secret"

/**
 * Middleware: Verify JWT token from Authorization header.
 * Attaches `req.user` = { id, email, role } on success.
 */
export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token tidak ditemukan. Silakan login terlebih dahulu." })
  }

  const token = authHeader.split(" ")[1]
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ error: "Token tidak valid atau sudah kadaluarsa." })
  }
}

/**
 * Middleware factory: Restrict access to specific roles.
 * Usage: authorize("manager", "owner")
 */
export function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Tidak terautentikasi." })
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Anda tidak memiliki akses ke resource ini." })
    }
    next()
  }
}

/**
 * Generate a JWT token for a user.
 */
export function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  )
}

import { drizzle } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"
import dotenv from "dotenv"
import * as schema from "./schema.js"

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rawDbPath = process.env.DB_PATH || "./data/titiphub.db"
const dbPath = path.resolve(__dirname, "../../", rawDbPath)

// Ensure directory exists
const dbDir = path.dirname(dbPath)
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

// Prefix with file: for local sqlite database
const client = createClient({ url: `file:${dbPath}` })

export const db = drizzle(client, { schema })
export { client }

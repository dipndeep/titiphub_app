import { client } from "./index.js"

async function runMigration() {
  console.log("Checking database columns...")
  try {
    const res = await client.execute("PRAGMA table_info(users)")
    const columns = res.rows.map(row => row.name)
    
    if (!columns.includes("password_updated_at")) {
      console.log("Adding password_updated_at column to users table...")
      await client.execute("ALTER TABLE users ADD COLUMN password_updated_at TEXT;")
      console.log("Column added successfully!")
    } else {
      console.log("password_updated_at column already exists.")
    }

    if (!columns.includes("reset_requested")) {
      console.log("Adding reset_requested column to users table...")
      await client.execute("ALTER TABLE users ADD COLUMN reset_requested INTEGER DEFAULT 0;")
      console.log("reset_requested column added successfully!")
    } else {
      console.log("reset_requested column already exists.")
    }
    process.exit(0)
  } catch (err) {
    console.error("Migration failed:", err)
    process.exit(1)
  }
}

runMigration()

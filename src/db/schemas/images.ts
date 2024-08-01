import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const images = sqliteTable("images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  url: text("url").notNull(),
  prompt: text("prompt").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
})
import { sql } from "drizzle-orm"
import { blob, sqliteTable, text, unique } from "drizzle-orm/sqlite-core"

export const images = sqliteTable(
  "images",
  {
    id: text("id").primaryKey(),
    prompt: text("prompt").notNull(),
    embedding: blob("embedding").notNull(),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (t) => ({
    embedding_index: unique().on(t.id),
  }),
)

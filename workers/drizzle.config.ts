import { config } from "dotenv"
import type { Config } from "drizzle-kit"

config({ path: ".dev.vars" })

export default {
  schema: "./src/db/schema.ts",
  driver: "turso",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  },
  out: "./drizzle",
} satisfies Config

import type { Config } from "drizzle-kit"
import { config } from "dotenv"

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

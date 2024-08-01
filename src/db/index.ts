import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"

const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
})

import * as schema from "./schemas"
import { env } from "@/env"

export const db = drizzle(client, { schema })

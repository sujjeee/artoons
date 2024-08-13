import { createClient } from "@libsql/client"
import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql"
import { Env } from "@types"
import * as schema from "@db/schema"

export function dbClient(env: Env): LibSQLDatabase<typeof schema> {
  const { DATABASE_AUTH_TOKEN, DATABASE_URL } = env

  if (!DATABASE_URL || !DATABASE_AUTH_TOKEN) {
    throw new Error("DataBase credentials not found")
  }

  const client = createClient({
    url: DATABASE_URL,
    authToken: DATABASE_AUTH_TOKEN,
  })

  return drizzle(client, { schema })
}

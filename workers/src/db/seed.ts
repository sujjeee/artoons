import { createClient } from "@libsql/client"
import { getEmbeddings } from "../lib/embedding"
import { images } from "./schema"
import { drizzle } from "drizzle-orm/libsql"
import * as schema from "@db/schema"
import { config } from "dotenv"
import fs from "fs"

config({ path: ".dev.vars" })

async function seedData() {
  const rawData = fs.readFileSync("data.json", "utf8")
  const fakeData = JSON.parse(rawData) as {
    id: string
    prompt: string
  }[]

  const client = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  })

  const db = drizzle(client, { schema })

  await Promise.all(
    fakeData.map(async (image) => {
      const embedding = await getEmbeddings({
        text: image.prompt,
      })
      const embeddingBuffer = Buffer.from(new Float32Array(embedding).buffer)
      await db.insert(images).values({
        id: image.id,
        prompt: image.prompt,
        embedding: embeddingBuffer,
      })
    }),
  )

  //   const embedding = await getEmbeddings("standing bear")
  //   const embeddingBuffer = Buffer.from(new Float32Array(embedding).buffer)

  //   const result = await db
  //     .select({
  //       prompt: images.prompt,
  //       similarity: sql`vector_distance_cos(${images.embedding}, ${embeddingBuffer})`,
  //     })
  //     .from(images)

  //   console.log({ result })

  console.log("DataBase seeded successfully!")
}

seedData().catch(console.error)

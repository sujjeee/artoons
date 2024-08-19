import fs from "fs"

import { createClient } from "@libsql/client"
import { config } from "dotenv"
import { drizzle } from "drizzle-orm/libsql"

import * as schema from "../db/schema"
import { getEmbeddings } from "../lib/embedding"
import { images } from "./schema"

config({ path: ".dev.vars" })

async function seedData() {
  // create a dummy data json or use fakerJS
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

  // [ ~ Testing vector search ~ ]
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

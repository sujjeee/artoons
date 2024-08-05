import { getEmbeddings } from "@/lib/embedding"
import { db } from "."
import { images } from "./schemas"
import { sql } from "drizzle-orm"

async function seedData() {
  const fakeData = [
    {
      id: "01iyv3ol7a",
      prompt: "Girl using a laptop",
    },
    {
      id: "5gbv0q40rs",
      prompt: "Cute bear standing",
    },
  ]

  await Promise.all(
    fakeData.map(async (image) => {
      const embedding = await getEmbeddings(image.prompt)
      const embeddingBuffer = Buffer.from(new Float32Array(embedding).buffer)
      await db.insert(images).values({
        id: image.id,
        prompt: image.prompt,
        embedding: embeddingBuffer,
      })
    }),
  )

  const embedding = await getEmbeddings("standing bear")
  const embeddingBuffer = Buffer.from(new Float32Array(embedding).buffer)

  const result = await db
    .select({
      prompt: images.prompt,
      similarity: sql`vector_distance_cos(${images.embedding}, ${embeddingBuffer})`,
    })
    .from(images)

  console.log({ result })

  console.log("DataBase seeded successfully!")
}

seedData().catch(console.error)

import { dbClient } from "@db"
import { images } from "@db/schema"
import { getEmbeddings } from "@lib/embedding"
import { Env } from "@types"
import { asc, desc, sql } from "drizzle-orm"
import { Hono } from "hono"
// import { cache } from "hono/cache"

const app = new Hono<{ Bindings: Env }>()

app.get("/", async (c) => {
  // queries
  const query = c.req.query("query")
  const cursor = c.req.query("cursor")

  // parse queries
  const pageAsNumber = Number(cursor)
  const fallbackPage =
    Number.isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber
  const limit = 10
  const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0

  // create database client
  const db = dbClient(c.env)

  // get embedding buffer, if query is provided
  let embeddingBuffer = undefined

  if (query) {
    const embedding = await getEmbeddings({
      env: c.env,
      text: query,
    })

    embeddingBuffer = Buffer.from(new Float32Array(embedding).buffer)
  }

  // get the data based on queries
  const { data, count } = await db.transaction(async (trx) => {
    const data = await trx
      .select({
        id: images.id,
        prompt: images.prompt,
        ...(embeddingBuffer && {
          similarity: sql<number>`vector_distance_cos(${images.embedding}, ${embeddingBuffer})`,
        }),
      })
      .from(images)
      .limit(limit)
      .offset(offset)
      .orderBy(
        embeddingBuffer
          ? asc(
              sql`vector_distance_cos(${images.embedding}, ${embeddingBuffer})`,
            )
          : desc(images.createdAt),
      )
      .where(
        embeddingBuffer
          ? sql`vector_distance_cos(${images.embedding}, ${embeddingBuffer})`
          : undefined,
      )

    const count = await trx
      .select({
        count: sql<number>`count(${images.id})`.mapWith(Number),
      })
      .from(images)
      .execute()
      .then((res) => res[0]?.count ?? 0)

    return {
      data,
      count,
    }
  })

  //return the data
  return c.json({
    data,
    count,
  })
})

app.get(
  "/random/:count",
  // cache({
  //   cacheName: "random-images-cache",
  //   cacheControl: "max-age=3600",
  // }),
  async (c) => {
    // params
    const count = c.req.param("count")

    // create database client
    const db = dbClient(c.env)

    const randomImages = await db.query.images.findMany({
      columns: {
        id: true,
      },
      limit: Number(count),
      orderBy: sql`RANDOM()`,
    })

    //return the data
    return c.json({
      data: randomImages,
    })
  },
)

export const image = app

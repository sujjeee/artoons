import { zValidator } from "@hono/zod-validator"
import { asc, desc, sql } from "drizzle-orm"
import { Hono } from "hono"
import { z } from "zod"

import { dbClient } from "../db"
import { images } from "../db/schema"
import { getEmbeddings } from "../lib/embedding"
import { type Env } from "../types"

const queryImagesSchema = z.object({
  query: z.string().optional(),
  cursor: z.string().optional(),
})

const app = new Hono<{ Bindings: Env }>()
  .get("/", zValidator("query", queryImagesSchema), async (c) => {
    const query = c.req.query("query")
    const cursor = c.req.query("cursor")

    const pageAsNumber = Number(cursor)
    const fallbackPage =
      Number.isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber
    const limit = 10
    const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0

    const db = dbClient(c.env)

    let embeddingBuffer = undefined

    if (query) {
      const embedding = await getEmbeddings({
        env: c.env,
        text: query,
      })

      embeddingBuffer = Buffer.from(new Float32Array(embedding).buffer)
    }

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

    return c.json({
      data,
      count,
    })
  })
  .get("/random/:count", async (c) => {
    const count = c.req.param("count")
    const db = dbClient(c.env)

    const randomImages = await db.query.images.findMany({
      columns: {
        id: true,
      },
      limit: Number(count),
      orderBy: sql`RANDOM()`,
    })

    return c.json({
      data: randomImages,
    })
  })

export { app as image }

"use server"

import { db } from "@/db"
import { images } from "@/db/schemas"
import { env } from "@/env"
import { getEmbeddings } from "@/lib/embedding"
import { vectorize } from "@/lib/vector"
import { desc, sql } from "drizzle-orm"
import { unstable_cache as cache } from "next/cache"

interface GetImagesProps {
  cursor: string
  query?: string
}

type Image = {
  id: string
  prompt: string
}

type VectorSearchResult = {
  id: string
  score: number
  metadata: Image
}

export async function getImages({ cursor, query }: GetImagesProps) {
  try {
    // parse search queries
    const pageAsNumber = Number(cursor)
    const fallbackPage =
      Number.isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber
    const limit = 10
    const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0

    // get the data based on queries
    const { data, count } = await db.transaction(async (trx) => {
      const data = await trx
        .select({
          id: images.id,
          prompt: images.prompt,
        })
        .from(images)
        .limit(limit)
        .offset(offset)
        .orderBy(desc(images.createdAt))
        .where(
          query
            ? sql`LOWER(${images.prompt}) LIKE LOWER(${`%${query}%`})`
            : undefined,
        )

      const count = await trx
        .select({
          count: sql<number>`count(${images.id})`.mapWith(Number),
        })
        .from(images)
        .where(
          query
            ? sql`LOWER(${images.prompt}) LIKE LOWER(${`%${query}%`})`
            : undefined,
        )
        .execute()
        .then((res) => res[0]?.count ?? 0)

      return {
        data,
        count,
      }
    })

    // If there is no query, return the data from the database directly
    if (!query) {
      const formattedImages = data.map((image) => ({
        url: `https://storage.sujjeee.com/images/${image.id}.jpeg`,
        prompt: image.prompt,
      }))

      const pageCount = Math.ceil(count / limit)

      return { data: formattedImages, pageCount }
    }

    // Vector query
    const vectorQuery = await getEmbeddings(query)
    const vectorSearchImages = (await vectorize.query({
      vector: vectorQuery,
      topK: 10,
      includeMetadata: true,
    })) as VectorSearchResult[]

    // Extract metadata from vector search results
    const vectorMetadata: Image[] = vectorSearchImages.map(
      (item) => item.metadata,
    )

    // Merge data from the database and vector search results
    const mergedData: Image[] = [...data, ...vectorMetadata]

    // Filter out duplicates based on id
    const uniqueData: Image[] = mergedData.reduce((acc, current) => {
      const x = acc.find((item) => item.id === current.id)
      if (!x) {
        return acc.concat([current])
      } else {
        return acc
      }
    }, [] as Image[])

    // Format the merged data
    const formattedImages = uniqueData.map((image) => ({
      url: `https://storage.sujjeee.com/images/${image.id}.jpeg`,
      prompt: image.prompt,
    }))

    const pageCount = Math.ceil(count / limit)

    return { data: formattedImages, pageCount }
  } catch (err) {
    return { data: [], pageCount: 0 }
  }
}

export type GetImageType = Awaited<ReturnType<typeof getImages>>["data"]

export async function getRandomImages() {
  try {
    return await cache(
      async () => {
        const randomImages = await db.query.images.findMany({
          columns: {
            id: true,
          },
          limit: 20,
        })

        if (!randomImages) return []

        // Format the merged data
        const formattedImages = randomImages.map(
          (image) => `${env.NEXT_PUBLIC_APP_URL}/api/download/${image.id}`,
        )

        return formattedImages
      },
      ["getRandomImages"],
      {
        tags: ["getRandomImages"],
        revalidate: 3600,
      },
    )()
  } catch (error) {
    return []
  }
}

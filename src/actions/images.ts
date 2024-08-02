"use server"

import { db } from "@/db"
import { images } from "@/db/schemas"
import { searchImagesSchema } from "@/lib/validations"
import { SearchParams } from "@/types"
import { desc, sql } from "drizzle-orm"

interface GetImagesProps {
  cursor: string
}

export async function getImages({ cursor }: GetImagesProps) {
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

    // Format the data
    const formattedImages = data.map((image) => ({
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

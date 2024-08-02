"use server"

import { db } from "@/db"

export default async function getImages() {
  try {
    const images = await db.query.images.findMany({
      columns: {
        id: true,
        prompt: true,
      },
      limit: 10,
    })

    const formattedImages = images.map((image) => ({
      url: `https://storage.sujjeee.com/images/${image.id}.jpeg`,
      prompt: image.prompt,
    }))

    return formattedImages
  } catch (error) {
    console.error(error)
    return []
  }
}

export type GetImageType = Awaited<ReturnType<typeof getImages>>

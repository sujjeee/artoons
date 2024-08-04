"use server"

import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

import { r2 } from "@/lib/r2"
import { vectorize } from "@/lib/vector"
import { generateUniqueId } from "@/lib/utils"
import { getEmbeddings } from "@/lib/embedding"
import { db } from "@/db"
import { images } from "@/db/schemas"

interface GetStorageUrlProps {
  filename: string
}

export async function getStorageUrl({ filename }: GetStorageUrlProps) {
  try {
    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: `images/${filename}`,
      }),
      { expiresIn: 60 },
    )

    return signedUrl
  } catch (error) {
    console.error(error)
  }
}

interface UploadToStorageProps {
  blob: Blob
  prompt: string
}

export async function uploadToStorage({ blob, prompt }: UploadToStorageProps) {
  try {
    // Check if the output is an image
    if (!blob.type.startsWith("image/")) throw new Error("Blob is not an image")

    // Check if the image size is less than 1 MB
    if (blob.size > 1 * 1024 * 1024) throw new Error("Image size exceeds 1 MB")

    const imageId = generateUniqueId()
    const url = await getStorageUrl({ filename: `${imageId}.jpeg` })

    if (url) {
      await fetch(url, {
        method: "PUT",
        body: blob,
      })

      await vectorize.upsert({
        id: imageId,
        vector: await getEmbeddings(prompt),
        metadata: {
          id: imageId,
          prompt: prompt,
        },
      })

      await db.insert(images).values({
        id: imageId,
        prompt: prompt,
      })
    }
  } catch (error) {
    console.error("Error uploading to storage:", error)
  }
}

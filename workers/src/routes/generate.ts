import { Env } from "../types"
import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { z } from "zod"
import { HfInference } from "@huggingface/inference"
import { generateUniqueId } from "../lib/utils"
import { createS3Client } from "../lib/r2"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { dbClient } from "../db"
import { images } from "../db/schema"
import { getEmbeddings } from "../lib/embedding"

const generateImageSchema = z.object({
  prompt: z
    .string()
    .max(120, { message: "Prompt must be less than 120 characters" }),
})

const app = new Hono<{ Bindings: Env }>().post(
  "/",
  zValidator("json", generateImageSchema, (result, c) => {
    if (!result.success) {
      return c.text("Invalid!", 400)
    }
  }),
  async (c) => {
    const body = c.req.valid("json")
    const prompt = body.prompt

    const model = new HfInference(c.env.HUGGINGFACE_KEY)

    const blobImage = (await model.request({
      model: "alvdansen/littletinies",
      inputs: body.prompt,
    })) as Blob

    const imageId = generateUniqueId()
    const r2 = createS3Client(c.env)

    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: c.env.R2_BUCKET_NAME,
        Key: `images/${imageId}.jpeg`,
      }),
      { expiresIn: 60 },
    )

    const uploadResponse = await fetch(signedUrl, {
      method: "PUT",
      body: blobImage,
      headers: {
        "Content-Type": blobImage.type,
      },
    })

    if (uploadResponse.ok) {
      const db = dbClient(c.env)

      const embedding = await getEmbeddings({
        env: c.env,
        text: prompt,
      })

      const embeddingBuffer = Buffer.from(new Float32Array(embedding).buffer)

      await db.insert(images).values({
        id: imageId,
        prompt: prompt,
        embedding: embeddingBuffer,
      })
    }

    const imageArrayBuffer = await blobImage.arrayBuffer()

    return c.body(imageArrayBuffer, 200, {
      "Content-Type": "image/jpeg",
      "Content-Disposition": `inline; filename="${prompt}.jpeg"`,
    })
  },
)

export { app as generate }

import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { zValidator } from "@hono/zod-validator"
import { HfInference } from "@huggingface/inference"
import { Hono } from "hono"
import { z } from "zod"

import { dbClient } from "../db"
import { images } from "../db/schema"
import { getEmbeddings } from "../lib/embedding"
import { createS3Client } from "../lib/r2"
import { generateUniqueId } from "../lib/utils"
import type { Env } from "../types"
import { rateLimitMiddleware } from "../middlewares"
import { isCleanText } from "../lib/nsfw"
import { HTTPException } from "hono/http-exception"

const generateImageSchema = z.object({
  prompt: z
    .string()
    .max(120, { message: "Prompt must be less than 120 characters" }),
})

const app = new Hono<{ Bindings: Env }>().post(
  "/",
  zValidator("json", generateImageSchema),
  rateLimitMiddleware({
    identifier: "GENERATE_RATE_LIMITER",
    duration: 3600,
    limit: 5,
  }),
  async (c) => {
    try {
      const body = c.req.valid("json")
      const prompt = body.prompt

      await isCleanText({
        text: prompt,
        env: c.env,
      })

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

      if (!uploadResponse.ok) {
        throw new HTTPException(500, {
          message:
            "Failed to upload image. Please try again or raise an issue on GitHub.",
        })
      }

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

      const imageArrayBuffer = await blobImage.arrayBuffer()

      return c.body(imageArrayBuffer, 200, {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `inline; filename="${prompt}.jpeg"`,
      })
    } catch (error) {
      console.error(error)

      if (error instanceof HTTPException) {
        throw new HTTPException(400, {
          message: error.message,
        })
      }

      throw new HTTPException(500, {
        message:
          "Unknown Generate Image error occurred. Please try again or raise an issue on GitHub.",
      })
    }
  },
)

export { app as generate }

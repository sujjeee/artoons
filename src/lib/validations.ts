import { z } from "zod"

export const searchImagesSchema = z.object({
  page: z.string().default("1"),
  query: z.string().optional(),
})

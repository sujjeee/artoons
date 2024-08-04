import { env } from "@/env"
import { S3Client } from "@aws-sdk/client-s3"

export const r2 = new S3Client({
  region: "ap-south-1",
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
})

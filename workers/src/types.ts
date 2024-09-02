export type Env = {
  DATABASE_URL: string
  DATABASE_AUTH_TOKEN: string

  HUGGINGFACE_KEY: string

  R2_ACCOUNT_ID: string
  R2_ACCESS_KEY_ID: string
  R2_SECRET_ACCESS_KEY: string
  R2_BUCKET_NAME: string

  NEXT_APP_URL: string
  GROQ_API_KEY: string

  ROOT_RATE_LIMITER: any
  IMAGES_RATE_LIMITER: any
  GENERATE_RATE_LIMITER: any
}

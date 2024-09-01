import { Context, Next } from "hono"
import { Env } from "./types"

export const rateLimitMiddleware = (rateLimiterKey: keyof Env) => {
  return async (c: Context<{ Bindings: Env }>, next: Next) => {
    const ipAddress = c.req.header("cf-connecting-ip") || "127.0.0.1"
    const rateLimiter = c.env[rateLimiterKey]
    const { success } = await rateLimiter.limit({ key: ipAddress })

    if (!success) {
      return c.text("Too many requests. Please try again later.", 429)
    }

    await next()
  }
}

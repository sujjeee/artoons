import { Context, Next } from "hono"
import { Env } from "./types"
import { HTTPException } from "hono/http-exception"

export const rateLimitMiddleware = (rateLimiterKey: keyof Env) => {
  return async (c: Context<{ Bindings: Env }>, next: Next) => {
    const ipAddress = c.req.header("cf-connecting-ip") || "127.0.0.1"
    const rateLimiter = c.env[rateLimiterKey]
    const { success } = await rateLimiter.limit({ key: ipAddress })

    if (!success) {
      throw new HTTPException(429, {
        message: "Too many requests. Please try again later.",
      })
    }

    await next()
  }
}

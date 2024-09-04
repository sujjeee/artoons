import type { Context, Next } from "hono"
import type { Env } from "./types"

interface RateLimitMiddlewareProps {
  limit: number
  duration: number
  identifier: string
}

export function rateLimitMiddleware({
  limit,
  duration,
  identifier,
}: RateLimitMiddlewareProps) {
  return async (c: Context<{ Bindings: Env }>, next: Next) => {
    const ip =
      c.req.header("x-vercel-forwarded-for") ||
      c.req.header("cf-connecting-ip") ||
      "unknown-ip"
    const key = `${identifier}_${ip}`
    const now = Date.now()

    let data = (await c.env.RATE_LIMITER.get(key, { type: "json" })) as {
      count: number
      lastRequestTime: number
    } | null

    if (!data || now - data.lastRequestTime > duration * 1000) {
      data = { count: 1, lastRequestTime: now }
    } else if (data.count >= limit) {
      return c.text("Too many requests. Please try again later.", 429)
    } else {
      data.count++
    }

    await c.env.RATE_LIMITER.put(key, JSON.stringify(data))
    await next()
  }
}

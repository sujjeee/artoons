import { Context, Next } from "hono"
import { Env } from "./types"

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
      c.req.header("CF-Connecting-IP") ||
      "unknown-ip"

    const key = `${identifier}_${ip}`

    const data = (await c.env.RATE_LIMITER.get(key, { type: "json" })) as {
      count: number
      lastRequestTime: number
    } | null

    const now = Date.now()

    if (data) {
      const { count, lastRequestTime } = data

      // Reset the counter if the duration has passed
      if (now - lastRequestTime > duration * 1000) {
        await c.env.RATE_LIMITER.put(
          key,
          JSON.stringify({ count: 1, lastRequestTime: now }),
        )
      } else if (count < limit) {
        // Increment the counter if within the rate limit
        await c.env.RATE_LIMITER.put(
          key,
          JSON.stringify({ count: count + 1, lastRequestTime }),
        )
      } else {
        // Rate limit exceeded
        return c.text("Too many requests. Please try again later.", 429)
      }
    } else {
      // Initialize counter for new IP
      await c.env.RATE_LIMITER.put(
        key,
        JSON.stringify({ count: 1, lastRequestTime: now }),
      )
    }

    await next()
  }
}

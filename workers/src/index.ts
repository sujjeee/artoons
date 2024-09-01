import { Hono } from "hono"

import { generate } from "./routes/generate"
import { image } from "./routes/images"
import { rateLimitMiddleware } from "./middlewares"

const app = new Hono()

app.get("/", rateLimitMiddleware("ROOT_RATE_LIMITER"), (c) => {
  return c.text("Welcome to artoons!")
})

const routes = app.route("/images", image).route("/generate", generate)

export type APIResponses = typeof routes
export default app

import { Hono } from "hono"

import { generate } from "./routes/generate"
import { image } from "./routes/images"

const app = new Hono()

app.get("/", (c) => {
  return c.text("Welcome to artoons!")
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/images", image).route("/generate", generate)

export type APIResponses = typeof routes
export default app

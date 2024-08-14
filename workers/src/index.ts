import { Hono } from "hono"
import { image } from "./routes/images"
import { generate } from "./routes/generate"

const app = new Hono()

app.get("/", (c) => {
  return c.text("Welcome to artoons!")
})

const routes = app.route("/images", image).route("/generate", generate)

export type APIResponses = typeof routes
export default app

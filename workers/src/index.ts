import { Hono } from "hono"
import { image } from "@routes/images"
import { generate } from "@routes/generate"

const app = new Hono()

const routes = app.route("/images", image).route("/generate", generate)

export default app
export type ApiTypes = typeof routes

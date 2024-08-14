import { Hono } from "hono"
import { image } from "./routes/images"
import { generate } from "./routes/generate"
import { cors } from "hono/cors"
import { Env } from "./types"
import { bearerAuth } from "hono/bearer-auth"

const app = new Hono<{ Bindings: Env }>()

// is this cors working?
app.use("*", async (c, next) => {
  const corsMiddlewareHandler = cors({
    origin: c.env.NEXT_APP_URL,
  })

  return corsMiddlewareHandler(c, next)
})

app.use(
  "*",
  bearerAuth({
    verifyToken: async (token, c) => {
      return token === c.env.BEARER_TOKEN
    },
  }),
)

app.get("/", (c) => {
  return c.text("Welcome to artoons!")
})

const routes = app.route("/images", image).route("/generate", generate)

export default app

export type ApiTypes = typeof routes

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { hc } from "hono/client"
import { APIResponses } from "@artoons/workers"
import { env } from "@/env"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function asleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getIdFromUrl(url: string): string | null {
  try {
    const parsedUrl = new URL(url)
    const pathSegments = parsedUrl.pathname.split("/")
    const filename = pathSegments.pop()

    if (filename) {
      const id = filename.split(".").slice(0, -1).join(".")
      return id
    }

    return null
  } catch (error) {
    console.error("Invalid URL:", error)
    return null
  }
}

export const api = hc<APIResponses>("/api/", {
  headers: {
    Authorization: `Bearer ${env.NEXT_PUBLIC_BEARER_TOKEN}`,
  },
})

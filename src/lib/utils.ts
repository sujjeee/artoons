import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { customAlphabet } from "nanoid"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function generateUniqueId() {
  const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10)
  return nanoid()
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

export function asleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

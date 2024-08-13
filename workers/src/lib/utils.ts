import { customAlphabet } from "nanoid"

export function generateUniqueId() {
  const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10)
  return nanoid()
}

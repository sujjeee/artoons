import Groq from "groq-sdk"
import { Env } from "../types"

import { HTTPException } from "hono/http-exception"

interface CheckTextProps {
  env?: Env
  text: string
}

export async function isCleanText({ env, text }: CheckTextProps) {
  const apiKey = env ? env.GROQ_API_KEY : process.env.GROQ_API_KEY
  const groq = new Groq({ apiKey })

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an AI system responsible for detecting inappropriate or unsafe-for-work (NSFW) language in text. When provided with a sentence or passage, your task is to analyze the text and determine if it contains any words or phrases that are considered offensive, vulgar, explicit, or otherwise inappropriate for a professional or public setting.\n\nIf the text contains any such words or phrases, return false.\nIf the text is free of inappropriate language, return true.\nYou must only return a boolean value: true or false. Ensure that your analysis is thorough and accurate, considering common variations and potential misspellings of inappropriate words.",
        },
        {
          role: "user",
          content: text,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
    })

    const response = chatCompletion.choices[0]?.message?.content || ""
    const parsedResponse = response.trim().toLowerCase()

    if (parsedResponse !== "true") {
      throw new HTTPException(400, {
        message:
          "Please use appropriate language. Avoid using offensive or inappropriate words.",
      })
    }
  } catch (error) {
    console.error(error)

    if (error instanceof HTTPException) {
      throw new HTTPException(500, {
        message: error.message,
      })
    }

    throw new HTTPException(500, {
      message:
        "Unknown NSFW error occurred. Please try again or raise an issue on GitHub.",
    })
  }
}

import { HfInference } from "@huggingface/inference"
import { Env } from "../types"
import { config } from "dotenv"

config({ path: ".dev.vars" })

interface GetEmbeddingsProps {
  env?: Env
  text: string
}

export async function getEmbeddings({
  env,
  text,
}: GetEmbeddingsProps): Promise<number[]> {
  const inference = new HfInference(
    env ? env.HUGGINGFACE_KEY : process.env.HUGGINGFACE_KEY,
  )

  try {
    const model = "thenlper/gte-small"

    const embeddings = (await inference.featureExtraction({
      model,
      inputs: text,
    })) as number[]

    return embeddings
  } catch (error) {
    console.error("Error:", error)
    return []
  }
}

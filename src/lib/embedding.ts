import { env } from "@/env"
import { HfInference } from "@huggingface/inference"
const model = "thenlper/gte-base"

const inference = new HfInference(env.HUGGINGFACE_KEY)

export async function getEmbeddings(text: string): Promise<number[]> {
  try {
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

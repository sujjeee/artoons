import { NextRequest, NextResponse } from "next/server"
import { HfInference } from "@huggingface/inference"
import { env } from "@/env"
import { uploadToStorage } from "@/actions/upload"
import { revalidatePath, revalidateTag } from "next/cache"

import { unstable_noStore as noStore } from "next/cache"

interface RequestBody {
  prompt: string
}

export async function POST(request: NextRequest) {
  noStore()
  try {
    const body: RequestBody = await request.json()

    if (!body || !body.prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const model = new HfInference(env.HUGGINGFACE_KEY)

    const output = (await model.request({
      model: "alvdansen/littletinies",
      inputs: body.prompt,
      parameters: {
        return_full_text: false,
      },
    })) as Blob

    void uploadToStorage({
      blob: output,
      prompt: body.prompt,
    })

    revalidatePath("/")
    revalidateTag("getRandomImages")

    return new NextResponse(output, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 500 })
  }
}

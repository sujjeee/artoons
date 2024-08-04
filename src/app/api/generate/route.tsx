import { NextRequest, NextResponse } from "next/server"
import { HfInference } from "@huggingface/inference"
import { env } from "@/env"
import path from "path"
import { generateUniqueId } from "@/lib/utils"
import { promises as fsPromises } from "fs"

interface RequestBody {
  prompt: string
}

export async function POST(request: NextRequest) {
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

    const imageId = generateUniqueId()
    const imagePath = path.join("images", `${imageId}.jpeg`)

    const arrayBuffer = await output.arrayBuffer()
    await fsPromises.writeFile(imagePath, Buffer.from(arrayBuffer))

    // Read the existing data.json file
    let data = []

    try {
      const dataFileContent = await fsPromises.readFile("data.json", "utf8")
      data = JSON.parse(dataFileContent)
    } catch (error) {
      throw error
    }

    // Append the new entry
    data.push({ id: imageId, prompt: body.prompt })

    // Write the updated data back to the data.json file
    await fsPromises.writeFile("data.json", JSON.stringify(data, null, 2))
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

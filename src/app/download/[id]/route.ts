import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const pathname = url.pathname
    const pathSegments = pathname.split("/")
    const id = pathSegments[2]

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    const response = await fetch(
      `https://storage.sujjeee.com/images/${id}.jpeg`,
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: response.status },
      )
    }

    const imageBuffer = await response.arrayBuffer()

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Disposition": 'attachment; filename="image.jpg"',
        "Content-Type": "image/jpeg",
      },
    })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

import { db } from "."
import { images } from "./schemas"

async function seedData() {
  const fakeData = [
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/aeroplane.jpeg",
      prompt: "Aeroplane in flight lorem ipsum dolor sit amet.",
    },
  ]

  await Promise.all(
    fakeData.map(async (image) => {
      await db.insert(images).values({
        prompt: image.prompt,
        url: image.image,
      })
    }),
  )

  console.log("Data seeded successfully")
}

seedData().catch(console.error)

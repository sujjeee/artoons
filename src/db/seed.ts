import { db } from "."
import { images } from "./schemas"

async function seedData() {
  const fakeData = [
    {
      id: "01iyv3ol7a",
      prompt: "Girl using a laptop",
    },
  ]

  await Promise.all(
    fakeData.map(async (image) => {
      await db.insert(images).values({
        id: image.id,
        prompt: image.prompt,
      })
    }),
  )

  console.log("DataBase seeded successfully!")
}

seedData().catch(console.error)

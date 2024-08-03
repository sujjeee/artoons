import { getEmbeddings } from "@/lib/embedding"
import { db } from "."
import { images } from "./schemas"
import { vectorize } from "@/lib/vector"

async function seedData() {
  const fakeData = [
    {
      id: "01iyv3ol7a",
      prompt: "Girl using a laptop",
    },
    {
      id: "5gbv0q40rs",
      prompt: "Cute bear standing",
    },
    {
      id: "h009oqmn2o",
      prompt: "Boy riding a bike",
    },
    {
      id: "30ux0w1ojc",
      prompt: "Blonde girl smiling",
    },
    {
      id: "76pr679mqn",
      prompt: "Boy playing basketball",
    },
  ]

  await Promise.all(
    fakeData.map(async (image) => {
      await db.insert(images).values({
        id: image.id,
        prompt: image.prompt,
      })

      await vectorize.upsert({
        id: image.id,
        vector: await getEmbeddings(image.prompt),
        metadata: {
          id: image.id,
          prompt: image.prompt,
        },
      })
    }),
  )

  console.log("DataBase seeded successfully!")
}

seedData().catch(console.error)

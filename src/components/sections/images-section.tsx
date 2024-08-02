import React from "react"
import { ImageCard } from "@/components/cards/image-card"
import { GetImageType } from "@/actions/images"

interface ImagesSectionProps {
  images: GetImageType
}

export function ImagesSection({ images }: ImagesSectionProps) {
  return (
    <section className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full">
      {images.map((data, idx) => (
        <ImageCard key={idx} imgUrl={data.url} prompt={data.prompt} />
      ))}
    </section>
  )
}

import React from "react"
import { ImageCard } from "@/components/cards/image-card"
import { GetImageType } from "@/actions/images"
import { Skeleton } from "../ui/skeleton"

interface ImagesSectionProps {
  images: GetImageType
  hasNextPage: boolean
}

export const ImagesSection = React.forwardRef<
  HTMLDivElement,
  ImagesSectionProps
>(({ images, hasNextPage }, ref) => {
  return (
    <section className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full">
      {images.map((data, idx) => (
        <ImageCard key={idx} imgUrl={data.url} prompt={data.prompt} />
      ))}
      {hasNextPage && (
        <>
          <div
            ref={ref}
            className="aspect-[0.9] rounded-xl animate-pulse bg-muted size-full"
          />
          {Array.from({ length: 9 }).map((_, idx) => (
            <Skeleton key={idx} className="aspect-[0.9] rounded-xl size-full" />
          ))}
        </>
      )}
    </section>
  )
})

ImagesSection.displayName = "ImagesSection"

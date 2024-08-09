import React from "react"
import { ImageCard } from "@/components/image-card"
import { Skeleton } from "@/components/ui/skeleton"

interface ImagesSectionProps {
  images: {
    url: string
    prompt: string
  }[]
  hasNextPage: boolean
}

export const ImagesShell = React.forwardRef<HTMLDivElement, ImagesSectionProps>(
  ({ images, hasNextPage }, ref) => {
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
              <Skeleton
                key={idx}
                className="aspect-[0.9] rounded-xl size-full"
              />
            ))}
          </>
        )}
      </section>
    )
  },
)

ImagesShell.displayName = "ImagesSection"

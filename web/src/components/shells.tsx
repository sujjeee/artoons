import React from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { ImageCard } from "@/components/image-card"

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
      <section className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {images.map((data, idx) => (
          <ImageCard key={idx} imgUrl={data.url} prompt={data.prompt} />
        ))}
        {hasNextPage && (
          <>
            <div
              ref={ref}
              className="bg-muted aspect-[0.9] size-full animate-pulse rounded-xl"
            />
            {Array.from({ length: 9 }).map((_, idx) => (
              <Skeleton
                key={idx}
                className="aspect-[0.9] size-full rounded-xl"
              />
            ))}
          </>
        )}
      </section>
    )
  },
)

ImagesShell.displayName = "ImagesSection"

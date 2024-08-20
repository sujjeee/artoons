"use client"

import React, { useState } from "react"

import { useInfiniteQuery } from "@tanstack/react-query"
import { useInView } from "react-intersection-observer"

import { api } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import { SearchInput } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Emoji } from "@/components/emojis"
import { ImagesShell } from "@/components/shells"

export default function HomePage() {
  const { ref, inView } = useInView()
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)
  const debouncedQuery = useDebounce(searchQuery, 300)

  const fetchImages = React.useCallback(
    async ({ pageParam }: { pageParam?: number }) => {
      const response = await api.images.$get({
        query: {
          query: debouncedQuery,
          cursor: String(pageParam),
        },
      })

      const result = await response.json()
      return result
    },
    [debouncedQuery],
  )

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["images", debouncedQuery],
    queryFn: fetchImages,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length
      return nextPage * 10 < lastPage.count ? nextPage + 1 : undefined
    },
  })

  React.useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  const images = React.useMemo(() => {
    return (
      data?.pages
        .flatMap((page) =>
          page.data.map((image) => ({
            url: `https://storage.sujjeee.com/images/${image.id}.jpeg`,
            prompt: image.prompt,
          })),
        )
        .flat() || []
    )
  }, [data])

  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center py-32">
      <div className="flex items-center justify-center pb-12">
        <div className="mr-2 text-lg font-semibold">Artoons</div>
        <Emoji />
      </div>
      <div className="sticky top-0 z-10 flex w-full items-center justify-center bg-background py-1.5">
        <div className="flex w-full max-w-xl items-center justify-center">
          <SearchInput
            placeholder="Search for anything"
            spellCheck={false}
            className="h-12 w-full rounded-full bg-gray-50 text-sm"
            value={searchQuery || ""}
            onChange={(e) => setSearchQuery(e.target.value || undefined)}
          />
        </div>
      </div>
      <div className="w-full pt-36">
        <ImagesShell images={images} ref={ref} hasNextPage={hasNextPage} />
        {isLoading && (
          <section className="grid w-full grid-cols-2 gap-2 pt-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, idx) => (
              <Skeleton
                key={idx}
                className="aspect-[0.9] size-full rounded-xl"
              />
            ))}
          </section>
        )}
      </div>
    </div>
  )
}

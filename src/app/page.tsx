"use client"

import React from "react"
import { Emoji } from "@/components/emojis"
import { SearchInput } from "@/components/ui/input"
import { useQueryState } from "nuqs"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useInView } from "react-intersection-observer"
import { useDebounce } from "@/hooks/use-debounce"
import { Skeleton } from "@/components/ui/skeleton"
import { ImagesShell } from "@/components/shells"
import { FetchImages } from "@/types"

export default function HomePage() {
  const { ref, inView } = useInView()

  const [searchQuery, setSearchQuery] = useQueryState("query", {
    defaultValue: "",
  })

  const debouncedQuery = useDebounce(searchQuery, 300)

  // TODO: improve this
  const fetchProjects = async ({ pageParam }: { pageParam?: number }) => {
    let url = "/api/images"

    if (pageParam) {
      url += `?cursor=${pageParam}`
    }

    if (debouncedQuery) {
      url += (pageParam ? "&" : "?") + `query=${debouncedQuery}`
    }

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const result = (await response.json()) as FetchImages
    console.log({ result })
    return result
  }

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["projects", debouncedQuery],
    queryFn: fetchProjects,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length
      return nextPage * 10 < lastPage.count ? nextPage + 1 : undefined
    },
  })

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  const images =
    data?.pages
      .flatMap((page) =>
        page.data.map((image) => ({
          url: `https://storage.sujjeee.com/images/${image.id}.jpeg`,
          prompt: image.prompt,
        })),
      )
      .flat() || []

  return (
    <div className="py-32 w-full mx-auto flex flex-col items-center justify-center">
      <div className="flex items-center justify-center pb-12">
        <div className="font-semibold text-lg mr-2">Artoons</div>
        <Emoji />
      </div>
      <div className="sticky top-0 z-10 py-1.5 w-full justify-center items-center bg-background flex ">
        <div className="flex justify-center items-center max-w-xl w-full ">
          <SearchInput
            placeholder="Search for anything"
            spellCheck={false}
            className="h-12 bg-gray-50 rounded-full text-sm w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value || null)}
          />
        </div>
      </div>
      <div className="pt-36 w-full">
        <ImagesShell images={images} ref={ref} hasNextPage={hasNextPage} />
        {isLoading && (
          <section className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full pt-2">
            {Array.from({ length: 10 }).map((_, idx) => (
              <Skeleton
                key={idx}
                className="aspect-[0.9] rounded-xl size-full"
              />
            ))}
          </section>
        )}
      </div>
    </div>
  )
}

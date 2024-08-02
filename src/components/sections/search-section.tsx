"use client"

import React from "react"
import { Emoji } from "@/components/emojis"
import { SearchInput } from "@/components/ui/search-input"
import { useQueryState } from "nuqs"
import { ImagesSection } from "@/components/sections/images-section"
import { getImages } from "@/actions/images"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useInView } from "react-intersection-observer"
import ImageSkeleton from "../image-skeleton"
import { asleep } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton"

export function SearchSections() {
  const { ref, inView } = useInView()

  const [searchQuery, setSearchQuery] = useQueryState("query", {
    defaultValue: "",
  })

  const fetchProjects = async ({ pageParam }: { pageParam: any }) => {
    // await asleep(2000)
    const data = await getImages({
      cursor: pageParam ?? 0,
    })

    return data
  }

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      return nextPage
    },
  })

  console.log("data", data, hasNextPage)
  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  const images = data?.pages.flatMap((page) => page.data) || []

  return (
    <div className="w-full mx-auto flex flex-col items-center justify-center">
      <div className="flex items-center justify-center pb-12">
        <div className="font-semibold text-lg mr-2">Artoons</div>
        <Emoji />
      </div>
      <div className="sticky top-0 z-10 py-1.5 w-full justify-center items-center bg-background flex ">
        <div className="flex justify-center items-center max-w-xl w-full ">
          <SearchInput
            placeholder="Search for anything"
            spellCheck={false}
            className="h-12 bg-gray-50   rounded-full text-sm w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value || null)}
          />
        </div>
      </div>
      <div className="pt-36">
        <ImagesSection images={images} />
      </div>
      <div ref={ref} />
      <section className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full pt-2">
        {Array.from({ length: 10 }).map((_, idx) => (
          <Skeleton key={idx} className="aspect-[0.8] rounded-xl" />
        ))}
      </section>
    </div>
  )
}

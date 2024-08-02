"use client"

import React from "react"
import { Emoji } from "@/components/emojis"
import { SearchInput } from "@/components/ui/search-input"
import { useQueryState } from "nuqs"
import { ImagesSection } from "@/components/sections/images-section"
import { GetImageType } from "@/actions/images"

interface SearchSectionsProps {
  images: GetImageType
}

export function SearchSections({ images }: SearchSectionsProps) {
  const [searchQuery, setSearchQuery] = useQueryState("query", {
    defaultValue: "",
  })

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
    </div>
  )
}

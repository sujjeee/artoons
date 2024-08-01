"use client"

import React from "react"
import { Emoji } from "@/components/emojis"
import { SearchInput } from "@/components/ui/search-input"
import { useQueryState } from "nuqs"

export function Search() {
  const [searchQuery, setSearchQuery] = useQueryState("query", {
    defaultValue: "",
  })

  return (
    <div className="max-w-xl w-full mx-auto flex flex-col space-y-12 items-center justify-center">
      <div className="flex items-center justify-center">
        <div className="font-semibold text-lg mr-2">Artoons</div>
        <Emoji />
      </div>
      <SearchInput
        placeholder="Search for anything"
        spellCheck={false}
        className="h-12 bg-gray-50  rounded-full text-sm w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value || null)}
      />
    </div>
  )
}

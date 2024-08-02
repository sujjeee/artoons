import getImages from "@/actions/images"
import { SearchSections } from "@/components/sections/search-section"
import React from "react"

export default async function Page() {
  const images = await getImages()

  return (
    <div className="py-36">
      <SearchSections images={images} />
    </div>
  )
}

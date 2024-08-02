import { getImages } from "@/actions/images"
import { SearchSections } from "@/components/sections/search-section"
import { SearchParams } from "@/types"

export interface HomePageProps {
  searchParams: SearchParams
}

export default async function HomePage({ searchParams }: HomePageProps) {
  return (
    <div className="py-36">
      <SearchSections />
    </div>
  )
}

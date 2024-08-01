import { Images } from "@/components/layouts/images"
import { Search } from "@/components/layouts/search"
import React from "react"

export default function Page() {
  return (
    <>
      <div className="py-36  hidden sm:flex">
        <Search />
      </div>
      <Images />
    </>
  )
}

import React from "react"
import Search from "@/components/search"

export default function HomePage() {
  return (
    <React.Suspense>
      <Search />
    </React.Suspense>
  )
}

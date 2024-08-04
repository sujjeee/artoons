import React from "react"
import { Generate } from "../generate"

export function HeaderSection() {
  return (
    <header className=" w-full flex items-center py-4">
      <div className="ml-auto">
        <Generate />
      </div>
    </header>
  )
}

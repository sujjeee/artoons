import React from "react"
import { Input } from "./ui/input"

export function Footer() {
  return (
    <div className="w-full sm:hidden flex">
      <div
        className="pointer-events-none fixed bottom-0 left-0 h-24 w-full bg-red-50"
        style={{
          background: "linear-gradient(to bottom,transparent, #fff 20%)",
          maskImage: "linear-gradient(to top, #fff 30%,transparent)",
          backdropFilter: "blur(1px)",
        }}
      />
      <div className="fixed bottom-0 py-6 px-4  w-full">
        <div className="w-full ">
          <Input
            placeholder="Search for image"
            spellCheck={false}
            className="h-12 w-full bg-muted rounded-full text-sm"
          />
        </div>
      </div>
    </div>
  )
}

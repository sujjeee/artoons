import HeroShell from "@/components/hero-shell"
import { ImagesShell } from "@/components/images-shell"
import React from "react"

export default function Page() {
  return (
    <>
      <div className="w-full pt-32  items-center justify-center flex">
        <HeroShell />
      </div>
      <div className="pt-32">
        <ImagesShell />
      </div>
    </>
  )
}

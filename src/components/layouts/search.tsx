"use client"

import { Emoji } from "@/components/emojis"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import React from "react"
import { Input } from "@/components/ui/input"

export function Search() {
  return (
    <div className="max-w-xl w-full mx-auto flex flex-col space-y-12 items-center justify-center">
      {/* <Button variant="outline" className="shadow-none pointer-events-none"> */}
      <div className="flex items-center justify-center">
        <div className="font-medium font-sans text-lg mr-2">TinyTots</div>
        <Emoji />
      </div>
      {/* </Button> */}
      <div className="relative flex items-center w-full">
        <Input
          placeholder="Search for image"
          spellCheck={false}
          className="h-12 bg-muted rounded-full text-sm "
        />
        <Button
          type="submit"
          size={"icon"}
          variant={"ghost"}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <ArrowRightIcon className="size-5 text-muted-foreground" />
        </Button>
      </div>
    </div>
  )
}

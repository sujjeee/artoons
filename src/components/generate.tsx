"use client"

import React from "react"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useQuery } from "@tanstack/react-query"
import { cn } from "@/lib/utils"
import { getRandomImages } from "@/actions/images"
import { GenerateInput } from "./ui/generate-input"

export function Generate() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const { data } = useQuery({
    queryKey: ["getRandomImages"],
    queryFn: async () => {
      const responseData = await getRandomImages()
      return responseData
    },
    enabled: isDialogOpen,
  })

  const images = data?.map((image) => image) || []

  React.useEffect(() => {
    const preloadImage = (url: any) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(url)
        img.onerror = (error) => {
          console.error("Image load error:", error)
          reject(error)
        }
        img.src = url
      })
    }

    const changeBackground = async () => {
      const nextIndex = (currentIndex + 1) % images.length
      try {
        await preloadImage(images[nextIndex])
        setCurrentIndex(nextIndex)
      } catch (error) {
        console.error("Failed to preload image:", error)
      }
    }

    if (images.length > 0) {
      const interval = setInterval(changeBackground, 3000)
      return () => clearInterval(interval)
    }
  }, [currentIndex, images])

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          Generate <Icons.sparkle className="ml-2 size-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-50 sm:rounded-2xl p-2 gap-2 w-full max-h-[530px] h-full">
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              style={{ backgroundImage: `url(${image})` }}
              className={cn(
                "absolute inset-0  rounded-xl object-cover object-top w-full -z-10 bg-cover bg-center transition-opacity duration-1000",
                {
                  "opacity-100": index === currentIndex,
                  "opacity-0": index !== currentIndex,
                },
              )}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          <div className="absolute p-2 bottom-0 w-full">
            <GenerateInput
              autoFocus
              placeholder="Type your prompt here."
              className="rounded-lg"
              isLoading={true}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

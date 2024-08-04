"use client"

import React from "react"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { cn } from "@/lib/utils"
import { getRandomImages } from "@/actions/images"
import { GenerateInput } from "@/components/ui/generate-input"
import confetti from "canvas-confetti"
import { ImageCard } from "./cards/image-card"
import { useRouter } from "next/navigation"
import { useRefetchStore } from "@/lib/store/use-refetch"

export function Generate() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [prompt, setPrompt] = React.useState("")
  const [imageSrc, setImageSrc] = React.useState<string | null>(null)
  const router = useRouter()

  const { data } = useQuery({
    queryKey: ["getRandomImages"],
    queryFn: async () => {
      const responseData = await getRandomImages()
      return responseData
    },
    enabled: isDialogOpen,
  })

  const images = React.useMemo(() => data?.map((image) => image) || [], [data])

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

  function showConfetti() {
    const end = Date.now() + 3 * 1000 // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"]

    const frame = () => {
      if (Date.now() > end) return

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      })

      requestAnimationFrame(frame)
    }

    frame()
  }

  async function handleGenerate(
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault()
    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const imageUrl = URL.createObjectURL(blob)

        setImageSrc(imageUrl)
        setIsGenerating(false)

        showConfetti()
      } else {
        const errorData = await response.json()
        console.error("Error:", errorData.error)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setIsGenerating(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleGenerate(e as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          Generate <Icons.sparkle className="ml-2 size-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn("bg-gray-50 sm:rounded-2xl p-0", {
          "p-2 gap-2 w-full max-h-[530px] h-full": !imageSrc,
        })}
      >
        {imageSrc ? (
          <div className=" relative size-full flex flex-col  gap-4 justify-center items-center">
            <ImageCard
              imgUrl={imageSrc}
              prompt={prompt}
              isShareable={true}
              truncate={false}
              blob={true}
            />

            <Button
              variant="secondary"
              onClick={() => setImageSrc(null)}
              className="absolute -bottom-14"
            >
              Generate New <Icons.sparkle className="ml-2 size-3.5" />
            </Button>
          </div>
        ) : (
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            {images.map((image, index) => (
              <div
                key={index}
                style={{
                  backgroundImage: `url(${imageSrc ? imageSrc : image})`,
                }}
                className={cn(
                  "absolute inset-0 object-cover object-top w-full -z-10 bg-cover bg-center",
                  {
                    "opacity-100": index === currentIndex,
                    "opacity-0": index !== currentIndex,
                    "transition-opacity duration-1000": imageSrc === null,
                  },
                )}
              />
            ))}
            <div
              className={cn("absolute inset-0  pointer-events-none", {
                "bg-gradient-to-t from-black/50 to-transparent":
                  !isGenerating && imageSrc === null,
                "bg-black/50": imageSrc === null && isGenerating,
              })}
            />
            {isGenerating && (
              <div className="absolute top-0 size-full backdrop-blur-sm">
                <div className="size-full flex justify-center items-center  flex-col gap-4">
                  <Icons.imageLoader className="size-8 text-white" />
                  <span className="max-w-[320px] text-center text-white ">
                    Please wait, your image is generating and it can take up to
                    15-20 seconds.
                  </span>
                </div>
              </div>
            )}
            {!isGenerating && imageSrc === null && (
              <div className="absolute p-2 bottom-0 w-full">
                <GenerateInput
                  autoFocus
                  placeholder="Type your prompt here"
                  className="rounded-lg"
                  isLoading={false}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

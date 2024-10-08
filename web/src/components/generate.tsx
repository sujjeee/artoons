"use client"

import React from "react"

import { useMutation, useQuery } from "@tanstack/react-query"
import confetti from "canvas-confetti"

import { api, cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { GenerateInput } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { ImageCard } from "@/components/image-card"
import { toast } from "sonner"

const fetchRandomImages = async () => {
  const response = await api.images.random.$get()

  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  return response.json()
}

const generateImage = async (prompt: string) => {
  const response = await api.generate.$post({
    json: { prompt },
  })

  // Check if the response is not OK
  if (!response.ok) {
    const errorMessage = await response.text()
    throw new Error(errorMessage)
  }

  const blob = await response.blob()
  const imageUrl = URL.createObjectURL(blob)
  return imageUrl
}

export function Generate() {
  const [prompt, setPrompt] = React.useState("")
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [isLoadingImages, setIsLoadingImages] = React.useState(true)
  const [showPlaceholder, setShowPlaceholder] = React.useState(true)
  const [imageSrc, setImageSrc] = React.useState<string | null>(null)

  const { data } = useQuery({
    queryKey: ["getRandomImages"],
    queryFn: fetchRandomImages,
    enabled: isDialogOpen,
  })

  const images = React.useMemo(
    () =>
      data?.data.map((image) => ({
        id: `https://storage.sujjeee.com/images/${image.id}.jpeg`,
      })) || [],
    [data],
  )

  React.useEffect(() => {
    const preloadImages = async () => {
      setIsLoadingImages(true)
      const preloadPromises = images.map((url) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = () => resolve(url)
          img.onerror = (error) => {
            console.error("Image load error:", error)
            reject(new Error(`Failed to load image: ${url.id}`))
          }
          img.src = url.id
        })
      })

      try {
        await Promise.all(preloadPromises)
        setIsLoadingImages(false)
        setTimeout(() => setShowPlaceholder(false), 500)
      } catch (error) {
        console.error("Failed to preload images:", error)
        setIsLoadingImages(false)
        setTimeout(() => setShowPlaceholder(false), 500)
      }
    }

    if (images.length > 0) {
      void preloadImages()
    }
  }, [images])

  React.useEffect(() => {
    const changeBackground = () => {
      if (images.length === 0) return
      const nextIndex = (currentIndex + 1) % images.length
      setCurrentIndex(nextIndex)
    }

    if (images.length > 0 && !isLoadingImages) {
      const interval = setInterval(changeBackground, 3000)
      return () => clearInterval(interval)
    }
  }, [currentIndex, images, isLoadingImages])

  function showConfetti() {
    const end = Date.now() + 3 * 1000 // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"]

    const frame = () => {
      if (Date.now() > end) return

      void confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      })
      void confetti({
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

  const mutation = useMutation({
    mutationFn: generateImage,
    onMutate: () => {
      setIsGenerating(true)
    },
    onSuccess: (imageUrl) => {
      setImageSrc(imageUrl)
      setIsGenerating(false)
      showConfetti()
    },
    onError: (error) => {
      toast.error(error.message)
      setIsGenerating(false)
    },
  })

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      mutation.mutate(prompt)
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
        className={cn("bg-gray-50 p-0 outline-none sm:rounded-2xl", {
          "h-full max-h-[530px] w-full gap-2 p-2": !imageSrc,
        })}
      >
        {imageSrc ? (
          <div className="relative flex size-full flex-col items-center justify-center gap-4">
            <ImageCard
              imgUrl={imageSrc}
              prompt={prompt}
              isShareable={true}
              truncate={false}
              blob={true}
            />

            <Button
              variant="secondary"
              onClick={() => {
                setPrompt("")
                setImageSrc(null)
              }}
              className="absolute -bottom-14"
            >
              Generate New <Icons.sparkle className="ml-2 size-3.5" />
            </Button>
          </div>
        ) : (
          <div className="relative size-full overflow-hidden rounded-xl outline-none">
            <div
              style={{
                backgroundImage: `url(${"https://storage.sujjeee.com/images/akifsby6od.jpeg"})`,
              }}
              className={cn(
                "absolute inset-0 -z-10 w-full bg-cover bg-center object-cover object-top transition-opacity duration-1000",
                showPlaceholder ? "opacity-100" : "opacity-0",
              )}
            />
            {images.map((image, index) => {
              return (
                <div
                  key={image.id}
                  style={{
                    backgroundImage: `url(${image.id})`,
                  }}
                  className={cn(
                    "absolute inset-0 -z-10 w-full bg-cover bg-center object-cover object-top transition-opacity duration-1000",
                    {
                      "opacity-100": !showPlaceholder && index === currentIndex,
                      "opacity-0": showPlaceholder || index !== currentIndex,
                    },
                  )}
                />
              )
            })}

            <div
              className={cn("pointer-events-none absolute inset-0", {
                "bg-gradient-to-t from-black/50 to-transparent":
                  !isGenerating && imageSrc === null,
                "bg-black/50": imageSrc === null && isGenerating,
              })}
            />
            {isGenerating && (
              <div className="absolute top-0 size-full backdrop-blur-sm">
                <div className="flex size-full flex-col items-center justify-center gap-4">
                  <Icons.imageLoader className="size-8 text-white" />
                  <span className="max-w-[320px] text-center text-white">
                    Please wait, your image is generating and it can take up to
                    15-20 seconds.
                  </span>
                </div>
              </div>
            )}
            {!isGenerating && imageSrc === null && (
              <div className="absolute bottom-0 w-full p-2">
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

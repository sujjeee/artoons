"use client"

import React from "react"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { useImageStore } from "@/lib/store/use-image"
import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

interface ImageCardProps {
  imgUrl: string | null
  prompt: string | null
  isShareable?: boolean
  truncate?: boolean
}

export function ImageCard({
  imgUrl,
  prompt,
  isShareable = false,
  truncate = true,
}: ImageCardProps) {
  const { setData } = useImageStore()
  const [hasCheckIcon, setHasCheckIcon] = React.useState(false)

  function onCopy() {
    navigator.clipboard.writeText(prompt ?? "")
    setHasCheckIcon(true)

    setTimeout(() => {
      setHasCheckIcon(false)
    }, 1000)
  }

  async function onDownload() {
    if (imgUrl) {
      try {
        const response = await fetch(imgUrl)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)

        const link = document.createElement("a")
        link.href = url
        link.download = prompt ?? "image.jpg" // You can set a default name if prompt is not available
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        window.URL.revokeObjectURL(url)
      } catch (error) {
        console.error("Error downloading image:", error)
      }
    }
  }

  async function onShare() {
    const response = await fetch(imgUrl!)
    const blob = await response.blob()

    const filesArray = [
      new File([blob], "meme.jpg", {
        type: "image/jpeg",
        lastModified: new Date().getTime(),
      }),
    ]

    const shareData = {
      files: filesArray,
    }

    navigator.share(shareData)
  }

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm ">
      <div className="flex w-full flex-col rounded-xl bg-gray-50 p-2 pb-2">
        {prompt && imgUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={prompt}
            src={imgUrl}
            className="rounded-xl object-cover object-top size-full cursor-pointer"
            onClick={() => {
              setData({
                imagePrompt: prompt,
                imageUrl: imgUrl,
              })
            }}
          />
        )}

        <div className="mt-2 rounded-xl p-1 ">
          <div className="flex w-full items-center justify-between">
            <div className="relative flex items-center justify-start gap-1 text-xs text-gray-400">
              Prompt
              <Button
                variant={"ghost"}
                size={"icon"}
                title="Copy to clipboard"
                className="size-5 p-0.5 "
                onClick={onCopy}
              >
                {hasCheckIcon ? (
                  <CheckIcon className="size-3.5 text-neutral-600" />
                ) : (
                  <Icons.copy className="size-3.5 text-gray-600" />
                )}
              </Button>
            </div>
            {isShareable && (
              <div className="items-center justify-center flex gap-1.5 text-gray-600">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  title="Download"
                  className="size-5 p-0.5 animate-jelly"
                  onClick={onDownload}
                >
                  <Icons.download className="size-3.5 text-muted-foreground" />
                </Button>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  title="Share"
                  className="size-5 p-0.5 animate-jelly"
                  onClick={onShare}
                >
                  <Icons.share className="size-3.5 text-muted-foreground" />
                </Button>
              </div>
            )}
          </div>
          <p className={cn("text-sm", { truncate: truncate })}>{prompt}</p>
        </div>
      </div>
    </div>
  )
}

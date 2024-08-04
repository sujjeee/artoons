"use client"

import React from "react"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { useImageStore } from "@/lib/store/use-image"
import { cn, getIdFromUrl } from "@/lib/utils"
import { CheckIcon } from "lucide-react"
import Image from "next/image"

interface ImageCardProps {
  imgUrl: string | null
  prompt: string | null
  isShareable?: boolean
  truncate?: boolean
  blob?: boolean
}

export function ImageCard({
  blob,
  imgUrl,
  prompt,
  isShareable = false,
  truncate = true,
}: ImageCardProps) {
  const { setData } = useImageStore()
  const [hasCheckIcon, setHasCheckIcon] = React.useState(false)
  const [isImageLoading, setIsImageLoading] = React.useState(true)

  function onCopy() {
    navigator.clipboard.writeText(prompt ?? "")
    setHasCheckIcon(true)

    setTimeout(() => {
      setHasCheckIcon(false)
    }, 1000)
  }

  let isSharing = false

  async function onShare() {
    if (isSharing) return

    if (!imgUrl) return alert("No image url found!")

    isSharing = true

    try {
      let blobData: Blob

      if (blob) {
        // Assuming imgUrl is a blob URL
        const response = await fetch(imgUrl)
        blobData = await response.blob()
      } else {
        const response = await fetch(`/api/download/${getIdFromUrl(imgUrl)}`)
        blobData = await response.blob()
      }

      const filesArray = [
        new File([blobData], "artoons.jpg", {
          type: "image/jpeg",
          lastModified: new Date().getTime(),
        }),
      ]

      const shareData = {
        files: filesArray,
      }

      await navigator.share(shareData)
    } catch (error) {
      console.error("Error sharing:", error)
      alert("Failed to share the image.")
    } finally {
      isSharing = false
    }
  }

  function onDownload() {
    if (!imgUrl) return alert("No image url found!")

    if (blob) {
      // Assuming imgUrl is a blob URL
      const link = document.createElement("a")
      link.href = imgUrl
      link.download = "artoons.jpg"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      window.location.href = `/api/download/${getIdFromUrl(imgUrl)}`
    }
  }

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm">
      <div className="flex w-full flex-col rounded-xl bg-gray-50 p-2 pb-2">
        {prompt && imgUrl && (
          <div
            className="aspect-[1] size-full cursor-pointer select-none"
            onClick={() => {
              setData({
                imagePrompt: prompt,
                imageUrl: imgUrl,
              })
            }}
          >
            <Image
              alt={prompt}
              src={imgUrl}
              loading="lazy"
              width={100}
              height={100}
              className={cn(
                "rounded-xl object-cover object-top size-full pointer-events-none",
                {
                  "blur-md": isImageLoading,
                },
              )}
              onLoad={() => setIsImageLoading(false)}
            />
          </div>
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
            {imgUrl && isShareable && (
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

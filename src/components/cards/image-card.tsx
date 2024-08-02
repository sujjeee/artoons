"use client"

import React from "react"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { useImageStore } from "@/lib/store/use-image"
import { cn, getIdFromUrl } from "@/lib/utils"
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

  async function onShare() {
    if (!imgUrl) return alert("No image url found!")

    const response = await fetch(`/download/${getIdFromUrl(imgUrl)}`)
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
            {imgUrl && isShareable && (
              <div className="items-center justify-center flex gap-1.5 text-gray-600">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  title="Download"
                  className="size-5 p-0.5 animate-jelly"
                >
                  <a href={`/download/${getIdFromUrl(imgUrl)}`}>
                    {" "}
                    <Icons.download className="size-3.5 text-muted-foreground" />
                  </a>
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

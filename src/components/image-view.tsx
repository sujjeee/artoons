import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useImageStore } from "@/lib/store/use-image"
import React from "react"
import { Icons } from "./icons"

export function ImageView() {
  const { data, setData } = useImageStore()
  const [isOpen, setIsOpen] = React.useState(
    !!data.imageUrl && !!data.imagePrompt,
  )

  React.useEffect(() => {
    setIsOpen(!!data.imageUrl && !!data.imagePrompt)
  }, [data.imageUrl, data.imagePrompt])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 sm:rounded-2xl">
        <div className="rounded-2xl overflow-hidden shadow-sm ">
          <div className="flex w-full flex-col rounded-xl bg-gray-50 p-2 pb-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={data.imagePrompt ?? ""}
              src={data.imageUrl ?? ""}
              className="rounded-xl object-cover object-top size-full"
              onClick={() => {
                setData({
                  imagePrompt: data.imagePrompt ?? "",
                  imageUrl: data.imageUrl ?? "",
                })
              }}
            />
            <div className="mt-2 rounded-xl p-1 ">
              <div className="relative flex items-center justify-start gap-1 text-xs text-gray-400">
                Prompt
                <button
                  type="button"
                  title="Copy to clipboard"
                  className="relative rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800/60 inline-flex cursor-pointer items-center text-sm focus:outline-none  mx-0.5   text-gray-600 "
                  // onClick={() => onCopy(data.imagePrompt)}
                >
                  <Icons.copy className="size-3.5 text-gray-600" />
                </button>
              </div>
              <p className="text-sm truncate">{data.imagePrompt}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

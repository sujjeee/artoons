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
            <div className="mt-2 rounded-xl p-1 pb-2 ">
              <div className="flex w-full items-center justify-between">
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
                <div className=" items-center justify-center flex text-gray-600">
                  <button
                    type="button"
                    title="Copy to clipboard"
                    className="relative rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800/60 inline-flex cursor-pointer items-center text-sm focus:outline-none  mx-0.5   text-gray-600 "
                    // onClick={() => onCopy(data.imagePrompt)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      className="size-3.5 text-gray-600"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-width="2.1"
                      >
                        <path d="M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2" />
                        <path d="m2 12.5l1.752-1.533a2.3 2.3 0 0 1 3.14.105l4.29 4.29a2 2 0 0 0 2.564.222l.299-.21a3 3 0 0 1 3.731.225L21 18.5" />
                        <path
                          stroke-linejoin="round"
                          d="M17 11V2m0 9l3-3m-3 3l-3-3"
                        />
                      </g>
                    </svg>
                  </button>
                  <button
                    type="button"
                    title="Copy to clipboard"
                    className="relative rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800/60 inline-flex cursor-pointer items-center text-sm focus:outline-none  mx-0.5   text-gray-600 "
                    // onClick={() => onCopy(data.imagePrompt)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      className="size-3.5"
                    >
                      <path
                        fill="currentColor"
                        d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81a3 3 0 0 0 3-3a3 3 0 0 0-3-3a3 3 0 0 0-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.15c-.05.21-.08.43-.08.66c0 1.61 1.31 2.91 2.92 2.91s2.92-1.3 2.92-2.91A2.92 2.92 0 0 0 18 16.08"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-sm truncate">{data.imagePrompt}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

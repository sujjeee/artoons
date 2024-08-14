import { useImageStore } from "@/lib/store/use-image"
import React from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ImageCard } from "@/components/image-card"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"

export function ImageView() {
  const { data, setData } = useImageStore()
  const [isOpen, setIsOpen] = React.useState(
    !!data.imageUrl && !!data.imagePrompt,
  )

  React.useEffect(() => {
    setIsOpen(!!data.imageUrl && !!data.imagePrompt)
  }, [data.imageUrl, data.imagePrompt])

  function handleOpenChange(open: boolean) {
    setIsOpen(open)
    if (!open) {
      setTimeout(() => {
        setData({
          imagePrompt: null,
          imageUrl: null,
        })
      }, 200)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTitle asChild>
        <VisuallyHidden.Root>Image Preview</VisuallyHidden.Root>
      </DialogTitle>
      <DialogContent className="bg-gray-50 p-0 sm:rounded-2xl outline-none">
        {" "}
        <ImageCard
          imgUrl={data.imageUrl}
          prompt={data.imagePrompt}
          isShareable={true}
          truncate={false}
        />
      </DialogContent>
    </Dialog>
  )
}
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "./icons"

export function Generate() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Generate <Icons.sparkle className="size-3.5 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <div>
          <img
            alt={
              "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/aeroplane.jpeg"
            }
            src={
              "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/aeroplane.jpeg"
            }
            className="rounded-lg object-cover object-top size-full"
          />
        </div>

        <DialogFooter>
          <Input placeholder="Type your prompt here." className="rounded-lg" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

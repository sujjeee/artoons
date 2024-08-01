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
        <div className="w-full">
          <div className="w-fit sm:hidden flex">
            <Button className="rounded-full size-10" size={"icon"}>
              <Icons.sparkle className="size-4" />
            </Button>
          </div>
          <Button className="hidden sm:flex rounded-full">
            Generate <Icons.sparkle className="size-3.5 ml-2" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] sm:rounded-2xl">
        {/* <div className="w-full gap-2 grid grid-cols-2 min-h-[450px] blur-xl">
          <img
            src={
              "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/aeroplane.jpeg"
            }
            className="rounded-lg object-cover object-top w-full"
          />
          <img
            src={
              "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/bear.jpeg"
            }
            className="rounded-lg object-cover object-top w-full"
          />
          <img
            src={
              "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/blonde-girl.jpeg"
            }
            className="rounded-lg object-cover object-top w-full"
          />
          <img
            src={
              "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-headphones.jpeg"
            }
            className="rounded-lg object-cover object-top w-full"
          />
        </div> */}
        <div className=" relative rounded-lg  overflow-hidden">
          <div className=" absolute  backdrop-blur-xl bg-white/30 size-full"></div>
          <img
            src={
              "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/aeroplane.jpeg"
            }
            className="rounded-lg object-cover object-top w-full -z-10"
          />
        </div>
        <DialogFooter>
          <Input placeholder="Type your prompt here." className="rounded-lg" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

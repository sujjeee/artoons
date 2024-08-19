import { CircleHelp } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function Info() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <CircleHelp className="text-muted-foreground size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>About artoons</DialogTitle>
        </DialogHeader>
        <div className="text-muted-foreground flex flex-col justify-center gap-4 text-sm">
          <span>
            Artoons is a free, open-source website designed to generate cute
            cartoon-style illustrations.
          </span>
          <span>
            Built on top of Hugging Face, it utilizes the{" "}
            <a
              href="https://huggingface.co/alvdansen/littletinies"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Little Tinies model{" "}
            </a>
            to create charming artwork effortlessly. Model by{" "}
            <a
              href="https://x.com/Araminta_k"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Araminta k
            </a>
            .
          </span>
          <span>
            Built by{" "}
            <a
              href="https://x.com/sujjeeee"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Sujjeee
            </a>
            . {""}
            Source code on{" "}
            <a
              href="https://github.com/sujjeee/artoons"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              GitHub
            </a>
            .
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}

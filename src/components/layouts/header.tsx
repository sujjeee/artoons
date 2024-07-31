import { Generate } from "../generate"
import { Icons } from "../icons"
import { Button } from "../ui/button"

export function Header() {
  return (
    <header className="flex items-center justify-between py-4 md:px-1">
      <div className="flex justify-center items-center gap-1">
        <Button variant="ghost" size="icon" className="rounded-xl">
          <Icons.github className="size-6" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-xl">
          <Icons.xcom className="size-5" />
        </Button>
        {/* <div className="font-medium font-sans text-lg">TinyTots</div> */}
      </div>
      <Generate />
    </header>
  )
}

import { Icons } from "../icons"
import { Button } from "../ui/button"

export function Header() {
  return (
    <header className="flex items-center justify-between py-4 px-2">
      <div className="flex justify-center items-center gap-1">
        <Button variant="ghost" size="icon" className="rounded-xl">
          <Icons.github className="size-6" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-xl">
          <Icons.xcom className="size-5" />
        </Button>
      </div>
      <Button className="rounded-xl">
        Generate <Icons.sparkle className="size-4 ml-2" />
      </Button>
    </header>
  )
}

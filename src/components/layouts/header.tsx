import { Emoji } from "../emojis"
import { Generate } from "../generate"
import { Icons } from "../icons"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

export function Header() {
  return (
    <header className="flex items-center justify-between py-2.5 md:px-1 sticky top-0 z-50 w-full bg-background">
      <div className="flex justify-between sm:justify-end items-center gap-3 w-full sm:items-end">
        <Input
          placeholder="Search for image"
          spellCheck={false}
          className="w-full bg-muted rounded-full text-sm sm:hidden flex"
        />
        <div>
          <Generate />
        </div>
      </div>
    </header>
  )
}

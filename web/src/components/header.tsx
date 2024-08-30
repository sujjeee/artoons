import { Generate } from "./generate"

export function Header() {
  return (
    <header className="flex w-full items-center py-4">
      <div className="ml-auto">
        <Generate />{" "}
      </div>
    </header>
  )
}

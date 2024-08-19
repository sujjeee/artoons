import * as React from "react"

import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <Search className="text-muted-foreground absolute left-4 top-2/4 size-4 translate-y-[-50%]" />
        <input
          type="search"
          className={cn(
            "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 pl-10 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)

const GenerateInput = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    isLoading: boolean
  }
>(({ className, isLoading, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <input
        className={cn(
          "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 pr-10 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
      {isLoading ? (
        <Icons.spinner className="text-muted-foreground absolute right-4 top-2/4 size-4 translate-y-[-50%]" />
      ) : (
        <Icons.sparkle className="text-muted-foreground absolute right-4 top-2/4 size-3 translate-y-[-50%]" />
      )}
    </div>
  )
})

Input.displayName = "Input"
SearchInput.displayName = "SearchInput"
GenerateInput.displayName = "GenerateInput"

export { Input, SearchInput, GenerateInput }

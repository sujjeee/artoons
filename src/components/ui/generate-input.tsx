import * as React from "react"

import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import { Icons } from "../icons"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading: boolean
}

const GenerateInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, isLoading, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        {isLoading ? (
          <Icons.spinner className="absolute right-4 top-2/4 size-4 translate-y-[-50%] text-muted-foreground" />
        ) : (
          <Icons.sparkle className="absolute right-4 top-2/4 size-3 translate-y-[-50%] text-muted-foreground" />
        )}
      </div>
    )
  },
)

GenerateInput.displayName = "GenerateInput"

export { GenerateInput }

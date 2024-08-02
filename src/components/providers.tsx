"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"
import { ImageDialog } from "./cards/image-dialog"
import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export default function QueryProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <main className="container max-w-screen-xl">
        {children}
        <ImageDialog />
      </main>
    </QueryProvider>
  )
}

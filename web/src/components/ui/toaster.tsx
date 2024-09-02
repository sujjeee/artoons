"use client"

import { Toaster as RadToaster } from "sonner"

import { useWindow } from "@/hooks/use-window"

export function Toaster() {
  const { isMobile } = useWindow()
  return (
    <RadToaster
      expand={true}
      position={isMobile ? "top-center" : "bottom-right"}
      richColors
    />
  )
}

import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { Providers } from "@/components/providers"

import { Inter } from "next/font/google"
import { HeaderSection } from "@/components/sections/header-section"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <Providers>
          <HeaderSection />
          {children}
        </Providers>
      </body>
    </html>
  )
}

import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { Providers } from "@/components/providers"

import { Inter } from "next/font/google"
import { HeaderSection } from "@/components/sections/header-section"
import { Info } from "@/components/info"

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
        <div className="fixed bottom-1 right-2 sm:bottom-2 sm:right-4 z-50 ">
          <Info />
        </div>
      </body>
    </html>
  )
}

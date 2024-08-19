import "@/styles/globals.css"

import { Metadata } from "next"
import { Inter } from "next/font/google"

import { cn } from "@/lib/utils"
import { Header } from "@/components/header"
import { Info } from "@/components/info"
import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://artoons.vercel.app"),
  title: "Artoons",
  creator: "sujjeee",
  keywords: ["artoons", "sujjeeee"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <Providers>
          <Header />
          {children}
        </Providers>
        <div className="fixed bottom-1 right-2 z-50 sm:bottom-2 sm:right-4">
          <Info />
        </div>
      </body>
    </html>
  )
}

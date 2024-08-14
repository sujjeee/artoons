import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { Providers } from "@/components/providers"
import { Inter } from "next/font/google"
import { Info } from "@/components/info"
import { Header } from "@/components/header"
import { Metadata } from "next"

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
        <div className="fixed bottom-1 right-2 sm:bottom-2 sm:right-4 z-50 ">
          <Info />
        </div>
      </body>
    </html>
  )
}
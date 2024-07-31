import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { Providers } from "@/components/providers"
import { Header } from "@/components/layouts/header"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background ", inter.className)}>
        <Providers>
          <div className="container max-w-screen-xl">
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}

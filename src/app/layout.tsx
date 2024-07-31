import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { Providers } from "@/components/providers"
import { Header } from "@/components/layouts/header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
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

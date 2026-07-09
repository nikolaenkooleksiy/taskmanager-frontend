import { Geist_Mono, Space_Grotesk } from "next/font/google"

import "./globals.css"
import { cn } from "@/src/shared/lib"
import { Metadata } from "next"
import { Header } from "@/src/widgets/header"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "Task Manager",
    template: "%s | Task Manager",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        spaceGrotesk.variable
      )}
    >
      <body>
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  )
}

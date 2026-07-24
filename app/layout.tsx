import { Geist_Mono, Inter } from "next/font/google"

import { cn } from "@/src/shared/lib"
import { Metadata } from "next"
import { Toaster } from "sonner"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
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

export default async function RootLayout({
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
        inter.variable
      )}
    >
      <body>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}

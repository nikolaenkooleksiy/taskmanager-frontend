import { Geist_Mono, Space_Grotesk } from "next/font/google"

import { AuthButton } from "@/src/core/auth"
import { getUserProfile } from "@/src/entity/user"
import { cn } from "@/src/shared/lib"
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuSkeleton,
  SidebarProvider,
} from "@/src/shared/ui"
import { Metadata } from "next"
import { Suspense } from "react"
import { Toaster } from "sonner"
import "./globals.css"
import { UserNav } from "./UserNav"

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user, isAuth } = await getUserProfile()

  console.log(user)

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
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader className="border-b">
              <Suspense fallback={<SidebarMenuSkeleton />}></Suspense>
            </SidebarHeader>

            <SidebarFooter className="mt-auto border-t">
              {isAuth ? <UserNav user={user} /> : <AuthButton />}
            </SidebarFooter>
          </Sidebar>
        </SidebarProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}

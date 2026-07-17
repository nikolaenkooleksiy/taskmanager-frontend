"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  TooltipProvider,
} from "@/src/shared/ui"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

const NAVIGATION_ITEMS = [
  {
    name: "Dashboard",
    path: (teamId: string) => `/team/${teamId}`,
    icon: "lucide:layout-dashboard",
  },
  {
    name: "Settings",
    path: (teamId: string) => `/team/${teamId}/settings`,
    icon: "lucide:settings",
  },
] as const

export function TeamSidebarNavigation() {
  const { teamId } = useParams()
  const pathname = usePathname()

  if (!teamId) return null

  return (
    <TooltipProvider>
      <SidebarGroup>
        <SidebarGroupLabel className="flex items-center justify-between group-data-[collapsible=icon]:hidden">
          Navigation
        </SidebarGroupLabel>

        <SidebarMenu>
          {NAVIGATION_ITEMS.map((item) => {
            const href = item.path(teamId as string)

            const isActive = pathname === href || pathname.startsWith(href)

            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.name}
                  isActive={isActive}
                >
                  <Link href={href} className="flex items-center gap-2">
                    <Icon icon={item.icon} className="h-4 w-4 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroup>
    </TooltipProvider>
  )
}

import { Project } from "@/src/entity/projects"
import { SidebarMenuButton, SidebarMenuItem } from "@/src/shared/ui"
import { Icon } from "@iconify/react"
import Link from "next/link"

interface ProjectNavigationItemProps {
  item: Project
  teamId: string
  dropdownSlot: React.ReactNode
}

export const ProjetcNavigationItem = ({
  item,
  teamId,
  dropdownSlot,
}: ProjectNavigationItemProps) => {
  return (
    <SidebarMenuItem key={item.name}>
      <SidebarMenuButton asChild tooltip={item.name}>
        <Link
          href={`/team/${teamId}/project/${item.id}`}
          className="flex items-center gap-2"
        >
          <Icon icon={item.icon} className="h-4 w-4 shrink-0" />

          <span>{item.name}</span>
        </Link>
      </SidebarMenuButton>
      {dropdownSlot}
    </SidebarMenuItem>
  )
}

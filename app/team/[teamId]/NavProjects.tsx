"use client"

import { Project } from "@/src/entity/projects"
import { CreateProjectEntry } from "@/src/features/create-project"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useSidebar,
} from "@/src/shared/ui"
import { Icon } from "@iconify/react"
import { Folder, Forward, MoreHorizontal, Trash2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface NavProjectsProps {
  projects: Project[]
}

export function NavProjects({ projects }: NavProjectsProps) {
  const { isMobile } = useSidebar()
  const { teamId } = useParams()

  return (
    <TooltipProvider>
      <SidebarGroup>
        <SidebarGroupLabel className="flex items-center justify-between group-data-[collapsible=icon]:hidden">
          Projects
          <Tooltip>
            <TooltipTrigger asChild>
              <CreateProjectEntry />
            </TooltipTrigger>
            <TooltipContent>Create a new project</TooltipContent>
          </Tooltip>
        </SidebarGroupLabel>

        <SidebarMenu>
          {projects.map((item) => (
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

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction
                    showOnHover
                    className="group-data-[collapsible=icon]:hidden"
                  >
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem asChild>
                    <Link href={`/team/${teamId}/project/${item.id}`}>
                      <Folder className="text-muted-foreground" />
                      <span>View Project</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Forward className="text-muted-foreground" />
                    <span>Share Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Trash2 className="text-muted-foreground" />
                    <span>Delete Project</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))}

          <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
            <SidebarMenuButton className="text-sidebar-foreground/70">
              <MoreHorizontal className="text-sidebar-foreground/70" />
              <span>More</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </TooltipProvider>
  )
}

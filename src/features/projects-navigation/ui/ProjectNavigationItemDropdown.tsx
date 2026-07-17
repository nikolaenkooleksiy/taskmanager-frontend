import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenuAction,
} from "@/src/shared/ui"
import { Folder, Forward, MoreHorizontal, Trash2 } from "lucide-react"
import Link from "next/link"

interface ProjectNavigationItemDropdownProps {
  projectId: string
  teamId: string
  isMobile: boolean
}

export const ProjectNavigationItemDropdown = ({
  projectId,
  teamId,
  isMobile,
}: ProjectNavigationItemDropdownProps) => {
  return (
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
          <Link href={`/team/${teamId}/project/${projectId}`}>
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
  )
}

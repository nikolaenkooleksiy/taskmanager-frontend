import {
  SidebarGroupLabel,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/shared/ui"
import { PropsWithChildren } from "react"

export const ProjectsNavigationLabel = ({ children }: PropsWithChildren) => {
  return (
    <SidebarGroupLabel className="flex items-center justify-between group-data-[collapsible=icon]:hidden">
      Projects
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>Create a new project</TooltipContent>
      </Tooltip>
    </SidebarGroupLabel>
  )
}

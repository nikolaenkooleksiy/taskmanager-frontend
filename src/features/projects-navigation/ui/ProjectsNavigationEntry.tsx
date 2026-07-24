"use client"

import { Project } from "@/src/entity/projects"
import { ActionResult } from "@/src/shared/types"
import { SidebarGroup, SidebarMenu, TooltipProvider } from "@/src/shared/ui"
import { useProjectNavigation } from "../model/hooks/useProjectNavigation"
import { ProjetcNavigationItem } from "./ProjectNavigationItem"
import { ProjectNavigationItemDropdown } from "./ProjectNavigationItemDropdown"
import { ProjectsNavigationLabel } from "./ProjectsNavigationLabel"

interface ProjectNavigationEntryProps {
  projectsPromise: Promise<ActionResult<Project[]>>
  createProjectSlot: React.ReactNode
}

export const ProjectNavigationEntry = ({
  projectsPromise,
  createProjectSlot,
}: ProjectNavigationEntryProps) => {
  const { projects, isMobile, teamId } = useProjectNavigation(projectsPromise)

  return (
    <TooltipProvider>
      <SidebarGroup>
        <ProjectsNavigationLabel>{createProjectSlot}</ProjectsNavigationLabel>

        <SidebarMenu>
          {projects.map((item) => (
            <ProjetcNavigationItem
              key={item.id}
              item={item}
              teamId={teamId}
              dropdownSlot={
                <ProjectNavigationItemDropdown
                  projectId={item.id}
                  teamId={teamId}
                  isMobile={isMobile}
                />
              }
            />
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </TooltipProvider>
  )
}

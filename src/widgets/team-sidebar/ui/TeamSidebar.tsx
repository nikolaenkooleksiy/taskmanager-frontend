import { getUserTeams } from "@/src/entity/team"
import { CreateTeamEntry } from "@/src/features/create-team"
import { TeamSwitcherEntry } from "@/src/features/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/src/shared/ui"

import { getProjects } from "@/src/entity/projects"
import { getUserProfile } from "@/src/entity/user"
import { CreateProjectEntry } from "@/src/features/create-project"
import { ProjectNavigationEntry } from "@/src/features/projects-navigation"
import { UserMenuEntry } from "@/src/features/user-menu"
import { TeamSidebarNavigation } from "./TeamSidebarNavigation"

export const TeamSidebar = async ({
  params,
}: {
  params: Promise<{ teamId: string }>
}) => {
  const { teamId } = await params

  const teams = getUserTeams()
  const user = getUserProfile()
  const projects = getProjects(teamId)

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <TeamSwitcherEntry
          teamsPromise={teams}
          createTeamSlot={<CreateTeamEntry />}
        />
      </SidebarHeader>

      <SidebarContent>
        <TeamSidebarNavigation />
        <ProjectNavigationEntry
          projectsPromise={projects}
          createProjectSlot={<CreateProjectEntry />}
        />
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <UserMenuEntry userPromise={user} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

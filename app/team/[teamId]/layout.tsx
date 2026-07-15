import { AuthButton } from "@/src/core/auth"
import { getProjects } from "@/src/entity/projects"
import { getUserTeams } from "@/src/entity/team"
import { getUserProfile } from "@/src/entity/user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "@/src/shared/ui"
import { NavProjects } from "./NavProjects"
import { TeamSwitcher } from "./TeamPicker"
import { UserNav } from "./UserNav"

export default async function TeamLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ teamId: string }>
}>) {
  const { teamId } = await params

  const { user, isAuth } = await getUserProfile()

  const teams = await getUserTeams()
  const projects = await getProjects(teamId)

  return (
    <>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="border-b">
            <TeamSwitcher teams={teams} />
          </SidebarHeader>

          <SidebarContent>
            <NavProjects projects={projects} />
          </SidebarContent>

          <SidebarFooter className="mt-auto border-t">
            {isAuth ? <UserNav user={user} /> : <AuthButton />}
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </>
  )
}

import { AuthButton } from "@/src/core/auth"
import { getProjects } from "@/src/entity/projects"
import { getUserTeams } from "@/src/entity/team"
import { getUserProfile } from "@/src/entity/user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
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
        <Sidebar collapsible="icon">
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

        <SidebarInset className="">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b! transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex h-16 shrink-0 items-center gap-2 px-4">
              <SidebarTrigger className="" />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}

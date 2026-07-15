import { AuthButton } from "@/src/core/auth"
import { getUserTeams } from "@/src/entity/team"
import { getUserProfile } from "@/src/entity/user"
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "@/src/shared/ui"
import { TeamSwitcher } from "./TeamPicker"
import { UserNav } from "./UserNav"

export default async function TeamLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user, isAuth } = await getUserProfile()

  const teams = await getUserTeams()

  return (
    <>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="border-b">
            <TeamSwitcher teams={teams} />
          </SidebarHeader>

          <SidebarFooter className="mt-auto border-t">
            {isAuth ? <UserNav user={user} /> : <AuthButton />}
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </>
  )
}

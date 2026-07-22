import { getUserProfile } from "@/src/entity/user"
import { UserMenuEntry } from "@/src/features/user-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from "@/src/shared/ui"
import { ProjectSidebarNavigation } from "./ProjectSidebarNavigation"

export const ProjectSidebar = () => {
  const user = getUserProfile()

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <ProjectSidebarNavigation />
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

import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/src/shared/ui"
import { PropsWithChildren } from "react"

interface ProjectLayoutProps {
  params: Promise<{ teamId: string; projectId: string }>
}

export default async function ProjectLayout({
  params,
  children,
}: PropsWithChildren<ProjectLayoutProps>) {
  return (
    <SidebarProvider>
      <Sidebar></Sidebar>

      <SidebarInset>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b! transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex h-16 shrink-0 items-center gap-2 px-4">
              <SidebarTrigger className="" />
            </div>
          </header>
          <div className="flex flex-1 flex-col p-4">{children}</div>
        </SidebarInset>
      </SidebarInset>
    </SidebarProvider>
  )
}

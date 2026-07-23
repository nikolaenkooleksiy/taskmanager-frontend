import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/src/shared/ui"
import { ProjectSidebar } from "@/src/widgets/project-sidebar"
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
      <ProjectSidebar />

      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b! transition-[width,height] ease-linear">
          <div className="flex shrink-0 items-center gap-2 px-4">
            <SidebarTrigger />
          </div>
        </header>
        <div className="flex flex-1 flex-col p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

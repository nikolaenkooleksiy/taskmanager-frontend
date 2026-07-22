import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/src/shared/ui"
import { TeamSidebar } from "@/src/widgets/team-sidebar"

export default async function TeamLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ teamId: string }>
}>) {
  return (
    <>
      <SidebarProvider>
        <TeamSidebar params={params} />

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b! transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex h-16 shrink-0 items-center gap-2 px-4">
              <SidebarTrigger className="" />
            </div>
          </header>
          <div className="flex flex-1 flex-col p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}

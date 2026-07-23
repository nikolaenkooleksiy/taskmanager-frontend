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
          <header className="flex h-12 shrink-0 items-center gap-2 border-b! transition-[width,height] ease-linear">
            <div className="flex shrink-0 items-center gap-2 px-4">
              <SidebarTrigger />
            </div>
          </header>
          <div className="flex flex-1 flex-col p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}

import { DropdownMenuTrigger, SidebarMenuButton } from "@/src/shared/ui"
import { ChevronsUpDown } from "lucide-react"

interface TeamSwitcherTriggerProps {
  activeTeam: { name: string }
  isOpen: boolean
}

export const TeamSwitcherTrigger = ({
  activeTeam,
  isOpen,
}: TeamSwitcherTriggerProps) => {
  return (
    <DropdownMenuTrigger asChild>
      <SidebarMenuButton
        size="lg"
        className="transition-all duration-200 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
          <span className="font-semibold">
            {activeTeam?.name
              ? activeTeam.name.slice(0, 2).toUpperCase()
              : "ST"}
          </span>
        </div>

        {isOpen && (
          <div className="flex flex-1 animate-in items-center justify-between gap-2 text-left duration-200 fade-in-50">
            <div className="grid flex-1 text-sm leading-tight">
              <span className="truncate font-semibold text-foreground">
                {activeTeam?.name || "Select Team"}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                Active Workspace
              </span>
            </div>
            <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
          </div>
        )}
      </SidebarMenuButton>
    </DropdownMenuTrigger>
  )
}

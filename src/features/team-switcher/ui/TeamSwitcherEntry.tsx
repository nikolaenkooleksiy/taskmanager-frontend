"use client"

import { Team } from "@/src/entity/team"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  SidebarMenu,
  SidebarMenuItem,
} from "@/src/shared/ui"
import { useTeamSwitcher } from "../model/hooks/useTeamSwitcher"
import { CreateTeamTrigger } from "./CreateTeamTrigger"
import { TeamDropdownItem } from "./TeamDropdowmItem"
import { TeamSwitcherTrigger } from "./TeamSwitcherTrigger"

interface TeamSwitcherEntryProps {
  teamsPromise: Promise<Team[]>
  createTeamSlot: React.ReactNode
}

export const TeamSwitcherEntry = ({
  teamsPromise,
  createTeamSlot,
}: TeamSwitcherEntryProps) => {
  const { activeTeam, handleTeamSelect, isMobile, open, teams } =
    useTeamSwitcher(teamsPromise)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <TeamSwitcherTrigger activeTeam={activeTeam} isOpen={open} />

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>

            {teams.map((team) => (
              <TeamDropdownItem
                key={team.id}
                team={team}
                handleTeamSelect={handleTeamSelect}
              />
            ))}

            <DropdownMenuSeparator />

            <CreateTeamTrigger>{createTeamSlot}</CreateTeamTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

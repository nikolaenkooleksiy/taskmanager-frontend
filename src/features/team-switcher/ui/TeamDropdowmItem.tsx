import { DropdownMenuItem } from "@/src/shared/ui"

interface TeamDropdownItemProps {
  team: { id: string; name: string }
  handleTeamSelect: (teamId: string) => void
}

export const TeamDropdownItem = ({
  team,
  handleTeamSelect,
}: TeamDropdownItemProps) => {
  return (
    <DropdownMenuItem key={team.id} onSelect={() => handleTeamSelect(team.id)}>
      <div className="text-left text-sm font-medium">{team.name}</div>
    </DropdownMenuItem>
  )
}

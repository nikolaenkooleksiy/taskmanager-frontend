import { saveLatestTeamAction, Team } from "@/src/entity/team"
import { useSidebar } from "@/src/shared/ui"
import { useParams, useRouter } from "next/navigation"
import { use } from "react"

export const useTeamSwitcher = (teamsPromise: Promise<Team[]>) => {
  const teams = use(teamsPromise)

  const sidebar = useSidebar()
  const params = useParams()
  const router = useRouter()

  const currentTeamId = params.teamId
  const activeTeam = teams.find((team) => team.id === currentTeamId) || teams[0]

  const handleTeamSelect = (teamId: string) => {
    saveLatestTeamAction(teamId)
    router.push(`/team/${teamId}`)
  }

  return {
    teams,
    activeTeam,
    handleTeamSelect,
    ...sidebar,
  }
}

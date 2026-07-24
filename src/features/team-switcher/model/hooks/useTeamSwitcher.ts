import { saveLatestTeamAction, Team } from "@/src/entity/team"
import { ActionResult } from "@/src/shared/types"
import { useSidebar } from "@/src/shared/ui"
import { useParams, useRouter } from "next/navigation"
import { use } from "react"

export const useTeamSwitcher = (
  teamsPromise: Promise<ActionResult<Team[]>>
) => {
  const result = use(teamsPromise)
  const teams = result.success ? (result.data ?? []) : []

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

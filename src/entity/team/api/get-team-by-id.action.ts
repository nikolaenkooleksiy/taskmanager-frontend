"use server"

import { api } from "@/src/shared/api"
import { API_TAGS } from "@/src/shared/configs/api-cache-tags/api-tags.config"
import { API_URL } from "@/src/shared/constants"
import { ActionResult } from "@/src/shared/types"
import { Team } from "../model/schemas/team.schema"

export async function getTeamById(teamId: string): Promise<ActionResult<Team>> {
  return api.get<Team>(`${API_URL}/team/${teamId}`, {
    next: { tags: [API_TAGS.GET_TEAM_BY_ID] },
  })
}

"use server"

import { api } from "@/src/shared/api"
import { API_URL } from "@/src/shared/constants"
import { API_TAGS } from "@/src/shared/configs/api-cache-tags/api-tags.config"
import { ActionResult } from "@/src/shared/types"
import { Team } from "../model/schemas/team.schema"

export async function getUserTeams(): Promise<ActionResult<Team[]>> {
  return api.get<Team[]>(`${API_URL}/team`, {
    next: { tags: [API_TAGS.GET_USER_TEAMS] },
  })
}

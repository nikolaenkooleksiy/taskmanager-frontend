"use server"

import { api } from "@/src/shared/api"
import { API_TAGS } from "@/src/shared/configs/api-cache-tags/api-tags.config"
import { API_URL } from "@/src/shared/constants"
import { ActionResult } from "@/src/shared/types"
import { updateTag } from "next/cache"
import { CreateTeamInput } from "../model/schemas/create-team.schema"
import { Team } from "../model/schemas/team.schema"

export async function createTeamAction(
  data: CreateTeamInput
): Promise<ActionResult<Team>> {
  const result = await api.post<Team>(`${API_URL}/team`, data, {
    cache: "no-store",
  })

  if (result.success) {
    updateTag(API_TAGS.GET_USER_TEAMS)
  }

  return result
}

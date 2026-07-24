"use server"

import { api } from "@/src/shared/api"
import { API_URL } from "@/src/shared/constants"
import { API_TAGS } from "@/src/shared/configs/api-cache-tags/api-tags.config"
import { ActionResult } from "@/src/shared/types"
import { revalidateTag } from "next/cache"
import { Team } from "../model/schemas/team.schema"

export async function deleteTeamAction(
  teamId: string
): Promise<ActionResult<Team>> {
  const result = await api.delete<Team>(`${API_URL}/team/${teamId}`, {
    cache: "no-store",
  })

  if (result.success) {
    revalidateTag(API_TAGS.GET_USER_TEAMS, { expire: 0 })
  }

  return result
}

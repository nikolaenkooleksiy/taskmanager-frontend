"use server"

import { api } from "@/src/shared/api"
import { API_TAGS } from "@/src/shared/configs/api-cache-tags/api-tags.config"
import { API_URL } from "@/src/shared/constants"
import { ActionResult } from "@/src/shared/types"
import { Project } from "../model/schemas/project.schema"

export async function getProjectById(
  projectId: string
): Promise<ActionResult<Project>> {
  return api.get<Project>(`${API_URL}/project/${projectId}/info`, {
    next: { tags: [API_TAGS.GET_PROJECT_BY_ID] },
  })
}

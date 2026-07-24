"use server"

import { api } from "@/src/shared/api"
import { API_URL } from "@/src/shared/constants"
import { API_TAGS } from "@/src/shared/configs/api-cache-tags/api-tags.config"
import { ActionResult } from "@/src/shared/types"
import { Project } from "../model/schemas/project.schema"

export async function getProjects(
  teamId: string
): Promise<ActionResult<Project[]>> {
  return api.get<Project[]>(`${API_URL}/project/${teamId}`, {
    cache: "no-store",
    next: { tags: [API_TAGS.GET_PROJECTS] },
  })
}

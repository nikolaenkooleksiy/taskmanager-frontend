"use server"

import { api } from "@/src/shared/api"
import { API_URL } from "@/src/shared/constants"
import { API_TAGS } from "@/src/shared/configs/api-cache-tags/api-tags.config"
import { ActionResult } from "@/src/shared/types"
import { revalidateTag } from "next/cache"
import { CreateProjectInput } from "../model/schemas/create-project.schema"
import { Project } from "../model/schemas/project.schema"

export async function createProjectAction(
  teamId: string,
  data: CreateProjectInput
): Promise<ActionResult<Project>> {
  const result = await api.post<Project>(
    `${API_URL}/project`,
    { teamId, ...data },
    {
      cache: "no-store",
    }
  )

  if (result.success) {
    revalidateTag(API_TAGS.GET_PROJECTS, { expire: 0 })
  }

  return result
}

"use server"

import { api } from "@/src/shared/api"
import { API_URL } from "@/src/shared/constants"
import { API_TAGS } from "@/src/shared/configs/api-cache-tags/api-tags.config"
import { ActionResult } from "@/src/shared/types"
import { revalidateTag } from "next/cache"
import { CreateTodoInput } from "../model/schemas/create-todo.schema"
import { Todo } from "../model/schemas/todo.schema"

export async function createTodoAction(
  projectId: string,
  data: CreateTodoInput
): Promise<ActionResult<Todo>> {
  const result = await api.post<Todo>(
    `${API_URL}/todo`,
    { ...data, projectId },
    {
      cache: "no-store",
    }
  )

  if (result.success) {
    revalidateTag(API_TAGS.GET_TODOS, { expire: 0 })
  }

  return result
}

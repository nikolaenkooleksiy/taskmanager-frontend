"use server"

import { api } from "@/src/shared/api"
import { API_TAGS } from "@/src/shared/configs/api-cache-tags/api-tags.config"
import { API_URL } from "@/src/shared/constants"
import { ActionResult } from "@/src/shared/types"
import { Todo } from "../model/schemas/todo.schema"

export async function getUserTodos(): Promise<ActionResult<Todo[]>> {
  return api.get<Todo[]>(`${API_URL}/todo`, {
    next: { tags: [API_TAGS.GET_TODOS] },
  })
}

"use server"

import { API_URL } from "@/src/shared/constants"
import { cookies } from "next/headers"
import { Todo } from "../model/schemas/todo.schema"

export async function getUserTodos() {
  const accessToken = (await cookies()).get("accessToken")?.value

  const res = await fetch(`${API_URL}/todo`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
  })

  if (!res.ok) {
    return []
  }

  const todos = (await res.json()) as unknown as Todo[]

  return todos
}

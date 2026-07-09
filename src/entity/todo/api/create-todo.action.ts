"use server"

import { API_URL } from "@/src/shared/constants"
import { cookies } from "next/headers"
import { CreateTodoInput } from "../model/schemas/create-todo.schema"
import { revalidatePath } from "next/cache"
import { ActionResult } from "@/src/shared/types"
import { Todo } from "../model/schemas/todo.schema"

export async function createTodoAction(
  data: CreateTodoInput
): Promise<ActionResult<Todo>> {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value

    const res = await fetch(`${API_URL}/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    })

    const responseData = await res.json()

    if (!res.ok) {
      return {
        success: false,
        error: responseData?.message ?? `HTTP ${res.status}`,
      }
    }

    revalidatePath("/")

    return {
      success: true,
      data: responseData,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

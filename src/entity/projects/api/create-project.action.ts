"use server"

import { API_URL } from "@/src/shared/constants"
import { ActionResult } from "@/src/shared/types"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { CreateProjectInput } from "../model/schemas/create-project.schema"
import { Project } from "../model/schemas/project.schema"

export async function createProjectAction(
  teamId: string,
  data: CreateProjectInput
): Promise<ActionResult<Project>> {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value

    const res = await fetch(`${API_URL}/project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ teamId, ...data }),
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

"use server"

import { API_URL } from "@/src/shared/constants"
import { ActionResult } from "@/src/shared/types"
import { updateTag } from "next/cache"
import { cookies } from "next/headers"
import { CreateTeamInput } from "../model/schemas/create-team.schema"
import { Team } from "../model/schemas/team.schema"

export async function createTeamAction(
  data: CreateTeamInput
): Promise<ActionResult<Team>> {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value

    const res = await fetch(`${API_URL}/team`, {
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

    updateTag("user-teams")

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

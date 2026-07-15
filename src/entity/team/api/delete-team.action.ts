"use server"

import { API_URL } from "@/src/shared/constants"
import { ActionResult } from "@/src/shared/types"
import { cookies } from "next/headers"
import { Team } from "../model/schemas/team.schema"

export async function deleteTeamAction(
  teamId: string
): Promise<ActionResult<Team>> {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value

    const res = await fetch(`${API_URL}/team/${teamId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    })

    const responseData = await res.json()

    if (!res.ok) {
      return {
        success: false,
        error: responseData?.message ?? `HTTP ${res.status}`,
      }
    }

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

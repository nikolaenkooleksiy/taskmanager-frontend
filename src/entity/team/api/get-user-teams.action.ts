"use server"

import { API_URL } from "@/src/shared/constants"
import { cookies } from "next/headers"
import { Team } from "../model/schemas/team.schema"

export async function getUserTeams() {
  const accessToken = (await cookies()).get("accessToken")?.value

  const res = await fetch(`${API_URL}/team`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
  })

  if (!res.ok) {
    return []
  }

  const todos = (await res.json()) as unknown as Team[]

  return todos
}

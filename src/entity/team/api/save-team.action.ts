"use server"

import { cookies } from "next/headers"

export async function saveLatestTeamAction(teamId: string) {
  const cookieStore = await cookies()
  cookieStore.set("latestSelectedTeamId", teamId, { path: "/" })
}

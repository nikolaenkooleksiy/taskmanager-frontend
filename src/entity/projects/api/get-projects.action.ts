"use server"

import { API_URL } from "@/src/shared/constants"
import { cookies } from "next/headers"
import { Project } from "../model/schemas/project.schema"

export async function getProjects() {
  const accessToken = (await cookies()).get("accessToken")?.value

  const res = await fetch(`${API_URL}/project`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
  })

  if (!res.ok) {
    return []
  }

  const todos = (await res.json()) as unknown as Project[]

  return todos
}

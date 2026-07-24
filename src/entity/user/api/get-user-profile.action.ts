"use server"

import { api } from "@/src/shared/api"
import { API_URL } from "@/src/shared/constants"
import { ActionResult } from "@/src/shared/types"
import { User } from "../model/schemas/user.schema"

export async function getUserProfile(): Promise<ActionResult<User>> {
  return api.get<User>(`${API_URL}/user/me`, {
    cache: "no-store",
  })
}

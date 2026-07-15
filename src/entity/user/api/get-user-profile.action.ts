"use server"

import { API_URL } from "@/src/shared/constants"
import { cookies } from "next/headers"
import { User } from "../model/schemas/user.schema"

export async function getUserProfile() {
  const accessToken = (await cookies()).get("accessToken")?.value

  const res = await fetch(`${API_URL}/user/me`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
  })

  if (!res.ok) {
    return { user: null, isAuth: false }
  }

  const user = (await res.json()) as unknown as User

  return { user, isAuth: !!user }
}

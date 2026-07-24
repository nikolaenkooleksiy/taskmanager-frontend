"use server"

import { api } from "@/src/shared/api"
import { API_URL } from "@/src/shared/constants"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function signOutAction() {
  const cookieStore = await cookies()

  await api.post(`${API_URL}/auth/logout`)

  cookieStore.delete("accessToken")
  cookieStore.delete("refreshToken")
  cookieStore.delete("user")

  redirect("/")
}

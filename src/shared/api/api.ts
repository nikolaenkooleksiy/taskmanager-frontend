import { cookies } from "next/headers"
import { ActionResult } from "@/src/shared/types"

export class Api {
  private static instance: Api

  private constructor() {}

  public static getInstance(): Api {
    if (!Api.instance) {
      Api.instance = new Api()
    }
    return Api.instance
  }

  async get<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<ActionResult<T>> {
    return this.requestJson<T>(url, { ...options, method: "GET" })
  }

  async post<T, B = unknown>(
    url: string,
    body?: B,
    options: RequestInit = {}
  ): Promise<ActionResult<T>> {
    return this.requestJson<T>(url, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  async patch<T, B = unknown>(
    url: string,
    body?: B,
    options: RequestInit = {}
  ): Promise<ActionResult<T>> {
    return this.requestJson<T>(url, {
      ...options,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  async put<T, B = unknown>(
    url: string,
    body?: B,
    options: RequestInit = {}
  ): Promise<ActionResult<T>> {
    return this.requestJson<T>(url, {
      ...options,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  async delete<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<ActionResult<T>> {
    return this.requestJson<T>(url, { ...options, method: "DELETE" })
  }

  private async requestJson<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<ActionResult<T>> {
    try {
      const res = await this.request(url, options)
      const data = await res.json()

      if (!res.ok) {
        return {
          success: false,
          error: data?.message ?? `HTTP ${res.status}`,
        }
      }

      return { success: true, data }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  private async request(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const cookieStore = await cookies()

    let accessToken = cookieStore.get("accessToken")?.value
    const refreshToken = cookieStore.get("refreshToken")?.value

    if (!refreshToken && !accessToken) {
      console.error("[Api] No tokens found in cookies")
      throw new Error("Unauthorized: No tokens available")
    }

    if (!accessToken && refreshToken) {
      console.log("[Api] accessToken missing, attempting immediate refresh...")
      accessToken = (await this.handleRefresh(refreshToken)) || undefined

      if (!accessToken) {
        throw new Error("Unauthorized: Refresh failed")
      }
    }

    const headers = new Headers(options.headers)

    const cookieParts: string[] = []
    if (accessToken) cookieParts.push(`accessToken=${accessToken}`)
    if (refreshToken) cookieParts.push(`refreshToken=${refreshToken}`)

    for (const c of cookieStore.getAll()) {
      if (c.name !== "accessToken" && c.name !== "refreshToken") {
        cookieParts.push(`${c.name}=${c.value}`)
      }
    }

    if (cookieParts.length > 0) {
      headers.set("Cookie", cookieParts.join("; "))
    }

    let response = await fetch(url, { ...options, headers })

    if (response.status === 401 && refreshToken) {
      console.log("[Api] Got 401 from server, refreshing token...")
      const newAccessToken = await this.handleRefresh(refreshToken)

      if (newAccessToken) {
        const retryCookieParts: string[] = []
        retryCookieParts.push(`accessToken=${newAccessToken}`)
        retryCookieParts.push(`refreshToken=${refreshToken}`)

        const freshCookieStore = await cookies()
        for (const c of freshCookieStore.getAll()) {
          if (c.name !== "accessToken" && c.name !== "refreshToken") {
            retryCookieParts.push(`${c.name}=${c.value}`)
          }
        }

        headers.set("Cookie", retryCookieParts.join("; "))
        response = await fetch(url, { ...options, headers })
      }
    }

    return response
  }

  private async handleRefresh(refreshToken: string): Promise<string | null> {
    try {
      const refreshUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`

      const res = await fetch(refreshUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `refreshToken=${refreshToken}`,
        },
        cache: "no-store",
      })

      if (!res.ok) {
        return null
      }

      const rawCookies = res.headers.getSetCookie()
      if (!rawCookies || rawCookies.length === 0) {
        return null
      }

      let extractedAccessToken: string | null = null

      try {
        const cookieStore = await cookies()

        for (const cookieStr of rawCookies) {
          const [nameValue] = cookieStr.split(";")
          const [name, ...rest] = nameValue.split("=")
          const value = rest.join("=")

          const trimmedName = name?.trim()
          const trimmedValue = value?.trim()

          if (trimmedName && trimmedValue) {
            cookieStore.set(trimmedName, trimmedValue, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              path: "/",
              sameSite: "lax",
            })

            if (trimmedName === "accessToken") {
              extractedAccessToken = trimmedValue
            }
          }
        }
      } catch {
        for (const cookieStr of rawCookies) {
          const [nameValue] = cookieStr.split(";")
          const [name, ...rest] = nameValue.split("=")
          if (name?.trim() === "accessToken") {
            extractedAccessToken = rest.join("=").trim()
          }
        }
      }

      return extractedAccessToken
    } catch {
      return null
    }
  }
}

export const api = Api.getInstance()

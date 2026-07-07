import { NextResponse, type NextRequest } from "next/server"

const PUBLIC_ROUTES = ["/", "/auth/login", "/auth/register"]

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const accessToken = request.cookies.get("accessToken")?.value
  const refreshToken = request.cookies.get("refreshToken")?.value

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  if (!isPublicRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  const response = NextResponse.next()

  if (!accessToken && refreshToken) {
    const refreshResult = await handleRefresh(refreshToken, response)

    if (!refreshResult.success) {
      if (refreshResult.status === 401 || refreshResult.status === 403) {
        response.cookies.delete("accessToken")
        response.cookies.delete("refreshToken")

        if (!isPublicRoute) {
          return NextResponse.redirect(new URL("/auth/login", request.url))
        }
      }
    }
  }

  return response
}

async function handleRefresh(
  refreshToken: string,
  response: NextResponse
): Promise<{ success: boolean; status?: number }> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    })

    if (!res.ok) {
      return { success: false, status: res.status }
    }

    const rawCookies = res.headers.getSetCookie()
    if (rawCookies && rawCookies.length > 0) {
      rawCookies.forEach((cookieString) => {
        response.headers.append("Set-Cookie", cookieString)
      })
    }

    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export const config = {
  matcher: "/((?!api|trpc|_next/static|_next/image|_vercel|.*\\..*).*)",
}

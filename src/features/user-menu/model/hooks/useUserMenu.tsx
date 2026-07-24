import { User } from "@/src/entity/user"
import { ActionResult } from "@/src/shared/types"
import { useIsMobile } from "@/src/shared/hooks"
import { use } from "react"

export const useUserMenu = (userPromise: Promise<ActionResult<User>>) => {
  const isMobile = useIsMobile()

  const result = use(userPromise)
  const user = result.success ? (result.data ?? null) : null
  const isAuth = result.success

  return {
    isMobile,
    userData: { user, isAuth },
  }
}

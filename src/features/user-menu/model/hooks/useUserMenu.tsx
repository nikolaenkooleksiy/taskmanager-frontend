import { User } from "@/src/entity/user"
import { useIsMobile } from "@/src/shared/hooks"
import { use } from "react"

export const useUserMenu = (
  userPromise: Promise<{ user: User | null; isAuth: boolean }>
) => {
  const isMobile = useIsMobile()

  const userData = use(userPromise)

  return {
    isMobile,
    userData,
  }
}

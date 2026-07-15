import { API_URL } from "../../constants"

export const PAGES_CONFIG = {
  HOME: "/",

  AUTH: {
    GITHUB_OAUTH: `${API_URL}/auth/github`,
  },
  PROFILE: {
    HOME: "/profile",
    SETTINGS: "/profile/settings",
    SECURITY: "/profile/security",
  },
}

import { API_URL } from "../../constants"

export const PAGES_CONFIG = {
  HOME: "/",

  AUTH: {
    GITHUB_OAUTH: `${API_URL}/auth/github`,
    GOOGLE_OAUTH: `${API_URL}/auth/google`,
    PASSKEY: `/auth/passkey`,
    CREDENTIALS: `/auth`,
  },
  PROFILE: {
    HOME: "/profile",
    SETTINGS: "/profile/settings",
    SECURITY: "/profile/security",
  },
}

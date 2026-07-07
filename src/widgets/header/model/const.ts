import { User, Settings } from "lucide-react"
import { PAGES_CONFIG } from "@/src/shared/configs/pages"

export const DRAWER_ACCOUNT_LINKS = [
  {
    key: "Profile",
    href: PAGES_CONFIG.PROFILE.HOME,
    icon: User,
  },
  {
    key: "Settings",
    href: PAGES_CONFIG.PROFILE.SETTINGS,
    icon: Settings,
  },
]

export const DROPDOWN_ITEMS = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/profile/settings", icon: Settings },
]

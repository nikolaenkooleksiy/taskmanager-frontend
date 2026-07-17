import { BadgeCheck, Bell, CreditCard } from "lucide-react"

export const MENU_ITEMS = [
  {
    label: "Account",
    icon: BadgeCheck,
  },
  {
    label: "Billing",
    icon: CreditCard,
  },
  {
    label: "Notifications",
    icon: Bell,
  },
] as const

import { DropdownMenuItem } from "@/src/shared/ui"
import { LucideIcon } from "lucide-react"

interface MenuItem {
  label: string
  icon: LucideIcon
}

export const UserMenuItem = ({ item }: { item: MenuItem }) => {
  const Icon = item.icon
  return (
    <DropdownMenuItem>
      <Icon className="size-4 shrink-0" />
      {item.label}
    </DropdownMenuItem>
  )
}

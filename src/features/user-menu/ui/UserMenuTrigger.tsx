import { User, UserInfo } from "@/src/entity/user"
import { DropdownMenuTrigger, SidebarMenuButton } from "@/src/shared/ui"
import { ChevronsUpDown } from "lucide-react"

interface UserMenuTriggerProps {
  user: User | null
}

export const UserMenuTrigger = ({ user }: UserMenuTriggerProps) => {
  return (
    <DropdownMenuTrigger asChild>
      <SidebarMenuButton
        size="lg"
        className="flex items-center justify-between px-0 py-2 focus-within:ring-0! hover:bg-transparent!"
      >
        <UserInfo user={user} />
        <ChevronsUpDown className="size-4 shrink-0" />
      </SidebarMenuButton>
    </DropdownMenuTrigger>
  )
}

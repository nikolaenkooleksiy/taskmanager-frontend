import { SignOutButton } from "@/src/core/auth"
import { DropdownMenuItem } from "@/src/shared/ui"

export const UserMenuSignOutButton = () => {
  return (
    <DropdownMenuItem className="w-full" variant="destructive" asChild>
      <SignOutButton />
    </DropdownMenuItem>
  )
}

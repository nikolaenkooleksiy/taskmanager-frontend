"use client"

import { UserInfo } from "@/src/entity/user"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Show,
} from "@/src/shared/ui"
import { MENU_ITEMS } from "../model/const/menu-items.const"
import { useUserMenu } from "../model/hooks/useUserMenu"
import { UserMenuItem } from "./UseMenuItem"
import { UserMenuSignOutButton } from "./UserMenuSignOutButton"
import { UserMenuTrigger } from "./UserMenuTrigger"

import { ActionResult } from "@/src/shared/types"
import { User } from "@/src/entity/user"

interface UserMenuProps {
  userPromise: Promise<ActionResult<User>>
}

export const UserMenuEntry = ({ userPromise }: UserMenuProps) => {
  const { userData, isMobile } = useUserMenu(userPromise)
  const { user, isAuth } = userData

  return (
    <DropdownMenu>
      <Show when={isAuth}>
        <UserMenuTrigger user={user} />
      </Show>

      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side={isMobile ? "bottom" : "right"}
        align="end"
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <UserInfo user={user} />
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {MENU_ITEMS.map((item) => (
            <UserMenuItem key={item.label} item={item} />
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <UserMenuSignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

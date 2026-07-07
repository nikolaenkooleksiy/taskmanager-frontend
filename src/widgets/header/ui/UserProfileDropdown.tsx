"use client"

import { User, UserAvatar } from "@/src/entity/user"
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/src/shared/ui"
import { DROPDOWN_ITEMS } from "../model/const"
import Link from "next/link"
import { SignOutButton } from "@/src/core/auth"

interface UserProfileDropdownProps {
  user: User | null
}

export const UserProfileDropdown = ({ user }: UserProfileDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserAvatar
          avatarUrl={user && user.avatarUrl}
          fallback={user?.username?.slice(0, 2) || "??"}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-50">
        <DropdownMenuLabel className="text-base">
          {user?.username || "Unknown User"}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {DROPDOWN_ITEMS.map((item) => {
          const Icon = item.icon

          return (
            <DropdownMenuItem asChild key={item.label}>
              <Link className="flex items-center" href={item.href}>
                <Icon className="size-4" />
                {item.label}
              </Link>
            </DropdownMenuItem>
          )
        })}

        <DropdownMenuSeparator />

        <DropdownMenuItem className="w-full" variant="destructive" asChild>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

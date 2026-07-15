"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/src/shared/ui"
import { ComponentProps } from "react"
import { User } from "../model/schemas/user.schema"

interface UserAvatarProps extends ComponentProps<typeof Avatar> {
  user: User | null
}

export const UserInfo = ({ user, ...props }: UserAvatarProps) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="rounded-md! after:rounded-md!">
        <AvatarImage className="rounded-md!" src={user?.avatarUrl ?? ""} />
        <AvatarFallback className="rounded-md!">
          {user?.username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user?.username}</span>
        <span className="truncate text-xs">{user?.email}</span>
      </div>
    </div>
  )
}

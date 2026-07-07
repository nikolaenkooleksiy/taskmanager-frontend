"use client"

import { Avatar, AvatarFallback, AvatarImage, Skeleton } from "@/src/shared/ui"
import { ComponentProps, useState } from "react"

interface UserAvatarProps extends ComponentProps<typeof Avatar> {
  avatarUrl: string | null
  fallback: string
}

export const UserAvatar = ({
  avatarUrl,
  fallback,
  ...props
}: UserAvatarProps) => {
  const hasAvatar = avatarUrl && avatarUrl !== "null"

  const [status, setStatus] = useState<"idle" | "loading" | "loaded" | "error">(
    hasAvatar ? "loading" : "error"
  )

  return (
    <Avatar className="hidden cursor-pointer sm:block" {...props}>
      {status === "loading" && (
        <Skeleton className="absolute inset-0 rounded-full" />
      )}
      {hasAvatar && (
        <AvatarImage src={avatarUrl} onLoadingStatusChange={setStatus} />
      )}
      {status === "error" && <AvatarFallback>{fallback}</AvatarFallback>}
    </Avatar>
  )
}

export const UserAvatarSkeleton = () => (
  <Skeleton className="size-8 rounded-full" />
)

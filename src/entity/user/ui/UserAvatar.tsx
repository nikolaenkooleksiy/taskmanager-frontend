"use client"

import { Avatar, AvatarFallback, AvatarImage, Skeleton } from "@/src/shared/ui"
import { useState } from "react"

interface UserAvatarProps {
  avatarUrl: string | null
  fallback: string
}

export const UserAvatar = ({ avatarUrl, fallback }: UserAvatarProps) => {
  const hasAvatar = avatarUrl && avatarUrl !== "null"

  const [status, setStatus] = useState<"idle" | "loading" | "loaded" | "error">(
    hasAvatar ? "loading" : "error"
  )

  return (
    <Avatar className="hidden sm:block">
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

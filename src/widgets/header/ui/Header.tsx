import Link from "next/link"
import { ListTodo } from "lucide-react"
import { ProjectSelector } from "./ProjectSelector"
import { MobileMenu } from "./MobileMenu"
import { AuthButton } from "@/src/core/auth"
import {
  getUserProfile,
  UserAvatar,
  UserAvatarSkeleton,
} from "@/src/entity/user"
import { Suspense } from "react"

export const Header = async () => {
  const { user, isAuth } = await getUserProfile()

  return (
    <header className="mb-5 p-2 sm:p-4">
      <nav className="container mx-auto flex items-center justify-between rounded-xl border border-border bg-background px-4 py-2.5 shadow-sm">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <ListTodo className="size-5 text-primary" />
          <span className="text-base font-semibold tracking-tight">
            Task Manager
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <ProjectSelector className="hidden sm:flex" />

          {!isAuth ? (
            <AuthButton className="hidden sm:inline-flex" />
          ) : (
            <Suspense fallback={<UserAvatarSkeleton />}>
              <UserAvatar
                avatarUrl={user && user.avatarUrl}
                fallback={user?.username?.slice(0, 2) || "??"}
              />
            </Suspense>
          )}

          <MobileMenu isAuth={isAuth} />
        </div>
      </nav>
    </header>
  )
}

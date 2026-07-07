import Link from "next/link"
import { ListTodo } from "lucide-react"
import { ProjectSelector } from "./ProjectSelector"
import { MobileMenu } from "./MobileMenu"
import { AuthButton } from "@/src/core/auth"
import { getUserProfile, UserAvatarSkeleton } from "@/src/entity/user"
import {} from "@/src/shared/ui"
import { UserProfileDropdown } from "./UserProfileDropdown"
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
              <UserProfileDropdown user={user} />
            </Suspense>
          )}

          <MobileMenu isAuth={isAuth} />
        </div>
      </nav>
    </header>
  )
}

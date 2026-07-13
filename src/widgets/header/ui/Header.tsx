import { AuthButton } from "@/src/core/auth"
import { getProjects } from "@/src/entity/projects"
import { getUserProfile, UserAvatarSkeleton } from "@/src/entity/user"
import { Show } from "@/src/shared/ui"
import { ListTodo } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import { MobileMenu } from "./MobileMenu"
import { ProjectSelector } from "./ProjectSelector"
import { UserProfileDropdown } from "./UserProfileDropdown"

export const Header = async () => {
  const { user, isAuth } = await getUserProfile()

  const projects = isAuth ? await getProjects() : []

  return (
    <header className="mb-5 p-2">
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
          <Show when={isAuth}>
            <div className="hidden sm:inline-flex">
              <ProjectSelector projects={projects} />
            </div>
          </Show>

          {!isAuth ? (
            <AuthButton className="hidden sm:inline-flex" />
          ) : (
            <Suspense fallback={<UserAvatarSkeleton />}>
              <UserProfileDropdown user={user} />
            </Suspense>
          )}

          <MobileMenu isAuth={isAuth} projects={projects} />
        </div>
      </nav>
    </header>
  )
}

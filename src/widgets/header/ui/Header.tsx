import Link from "next/link"

import { ListTodo } from "lucide-react"
import { Avatar } from "@/src/shared/ui"
import { ProjectSelector } from "./ProjectSelector"
import { MobileMenu } from "./MobileMenu"

export const Header = () => {
  return (
    <header className="mb-5 px-2 py-2">
      <nav className="container mx-auto flex items-center justify-between rounded-md border px-1 py-3">
        <Link href="/" className="flex items-center gap-1">
          <ListTodo />
          <span className="text-lg font-semibold">Task Manager</span>
        </Link>

        <div className="flex items-center gap-4">
          <ProjectSelector className="hidden sm:flex" />
          <Avatar></Avatar>
          <MobileMenu />
        </div>
      </nav>
    </header>
  )
}

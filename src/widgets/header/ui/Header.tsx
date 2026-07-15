import { ListTodo } from "lucide-react"
import Link from "next/link"

export const Header = async () => {
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
      </nav>
    </header>
  )
}

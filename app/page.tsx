import { getUserProfile } from "@/src/entity/user"
import { Show } from "@/src/shared/ui"
import {
  ArrowRight,
  CheckCircle2,
  GitBranch,
  KanbanSquare,
  Layers,
  Shield,
  Sparkles,
  Users,
  Zap,
} from "lucide-react"
import { cookies } from "next/headers"
import Link from "next/link"

export default async function HomePage() {
  const cookieStore = await cookies()

  const teamId = cookieStore.get("latestSelectedTeamId")?.value

  const { isAuth } = await getUserProfile()

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#FAF9F6] font-sans text-slate-900 selection:bg-primary/10">
      {/* Легкий фоновый градиент (Светлая тема) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] left-[-20%] h-[80%] w-[80%] rounded-full bg-gradient-to-tr from-blue-100/40 to-emerald-100/30 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] h-[60%] w-[60%] rounded-full bg-gradient-to-br from-violet-100/30 to-orange-100/20 blur-[100px]" />
      </div>

      {/* Навигация */}
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-[#FAF9F6]/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
              <KanbanSquare className="size-5 text-indigo-600" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-950">
              Tasker
            </span>
          </div>

          <nav className="flex items-center gap-4">
            <Link
              href={`/team/${teamId}`}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-medium text-white shadow-md transition-all hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98]"
            >
              Go to App
            </Link>

            <Show when={isAuth}>
              <Link
                href="/login"
                className="inline-flex h-10 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-medium text-white shadow-md transition-all hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98]"
              >
                Sign In
              </Link>
            </Show>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero-секция */}
        <section className="container mx-auto flex flex-col items-center justify-center px-4 pt-20 pb-16 text-center md:px-6 md:pt-32 md:pb-24">
          {/* Маленький бейдж */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/50 px-3.5 py-1.5 text-xs font-semibold text-indigo-700">
            <Sparkles className="size-3.5" />
            Active Development v1.0
          </div>

          <h1 className="mt-8 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl">
            Manage your projects <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              without the chaos.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-[640px] text-base leading-relaxed text-slate-600 md:text-lg">
            A fast, beautiful, and minimalistic task manager built for
            high-performance teams. Organize work, track progress, and
            collaborate in real-time.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-indigo-600 px-7 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02] hover:bg-indigo-700 active:scale-[0.98]"
            >
              Get Started for Free
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </section>

        {/* Секция "Интерфейса" (Заглушка скриншота) */}
        <section className="container mx-auto px-4 pb-24 md:px-6">
          <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-100">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex gap-1.5">
                <span className="size-3 rounded-full bg-red-400" />
                <span className="size-3 rounded-full bg-yellow-400" />
                <span className="size-3 rounded-full bg-green-400" />
              </div>
              <div className="h-5 w-40 rounded bg-slate-100" />
              <div className="size-4" />
            </div>

            <div className="grid min-h-[240px] grid-cols-1 gap-4 md:grid-cols-3">
              {/* Колонка 1 */}
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-4">
                <div className="mb-4 h-4 w-20 rounded bg-slate-200/70" />
                <div className="space-y-3">
                  <div className="h-14 rounded-lg border border-slate-100 bg-white p-3 shadow-sm" />
                  <div className="h-14 rounded-lg border border-slate-100 bg-white p-3 shadow-sm" />
                </div>
              </div>
              {/* Колонка 2 */}
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-4">
                <div className="mb-4 h-4 w-24 rounded bg-slate-200/70" />
                <div className="space-y-3">
                  <div className="h-14 rounded-lg border border-slate-100 bg-white p-3 shadow-sm" />
                </div>
              </div>
              {/* Колонка 3 */}
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-4">
                <div className="mb-4 h-4 w-16 rounded bg-slate-200/70" />
                <div className="flex h-14 items-center justify-center rounded-lg border border-dashed border-slate-300 text-xs text-slate-400">
                  + Add task
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Сетка фичей */}
        <section className="border-t border-slate-200/80 bg-white/60 py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-[500px] text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-950">
                Everything you need
              </h2>
              <p className="mt-3 text-slate-600">
                Simple tools, powerful outcomes. Designed to keep you focused on
                building.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Фича 1 */}
              <div className="group relative flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex size-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Zap className="size-5" />
                </div>
                <h3 className="mt-2 font-bold text-slate-950">
                  Real-time Sync
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Your team is always in sync. Updates are pushed instantly to
                  all active clients.
                </p>
              </div>

              {/* Фича 2 */}
              <div className="group relative flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex size-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <Users className="size-5" />
                </div>
                <h3 className="mt-2 font-bold text-slate-950">
                  Multi-team Workspaces
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Switch seamlessly between different organizations and personal
                  projects.
                </p>
              </div>

              {/* Фича 3 */}
              <div className="group relative flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex size-11 items-center justify-center rounded-xl bg-pink-50 text-pink-600">
                  <Shield className="size-5" />
                </div>
                <h3 className="mt-2 font-bold text-slate-950">
                  Role-based Access
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Fine-grained permissions for members, guests, and enterprise
                  admins.
                </p>
              </div>

              {/* Фича 4 */}
              <div className="group relative flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="size-5" />
                </div>
                <h3 className="mt-2 font-bold text-slate-950">
                  Interactive Tasks
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Add subtasks, descriptions, attachments and custom tags in a
                  single click.
                </p>
              </div>

              {/* Фича 5 */}
              <div className="group relative flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <GitBranch className="size-5" />
                </div>
                <h3 className="mt-2 font-bold text-slate-950">
                  Git Integrations
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Link your commits, pull requests and issues directly to your
                  tasks.
                </p>
              </div>

              {/* Фича 6 */}
              <div className="group relative flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex size-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Layers className="size-5" />
                </div>
                <h3 className="mt-2 font-bold text-slate-950">
                  Epic & Sprints
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Group tasks into bigger goals and track your team progress
                  over time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Футер */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:h-20 md:flex-row md:px-6 md:py-0">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Tasker Inc. All rights reserved.
          </p>
          <div className="flex gap-5 text-sm text-slate-500">
            <Link
              href="/terms"
              className="transition-colors hover:text-slate-900"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="transition-colors hover:text-slate-900"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

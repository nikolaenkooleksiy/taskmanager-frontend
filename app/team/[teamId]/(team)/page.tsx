import { Icon } from "@iconify/react"
import { Clock } from "lucide-react"

import { Project } from "@/src/entity/projects"
import { API_URL } from "@/src/shared/constants"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/ui"
import { ProjectStatsEntry } from "@/src/widgets/team-projects-stats"
import { cookies } from "next/headers"

// --- TYPES ---
interface ProjectStats extends Project {
  tasksDone: number
  tasksTotal: number
}

type ActivityType =
  "task_completed" | "task_created" | "project_created" | "member_joined"

interface ActivityItem {
  id: string
  type: ActivityType
  user: { name: string }
  target: { name: string; projectName?: string }
  createdAt: string
}

type Priority = "low" | "medium" | "high"

interface UpcomingTask {
  id: string
  title: string
  projectName: string
  dueDate: string
  priority: Priority
  isOverdue?: boolean
}

interface TeamMember {
  id: string
  name: string
  role: string
  isOnline: boolean
  lastSeen?: string
}

// --- MOCKS ---
const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: "act-1",
    type: "task_completed",
    user: { name: "Alexey" },
    target: { name: "Fix JWT refresh token flow", projectName: "Auth Service" },
    createdAt: "10 mins ago",
  },
  {
    id: "act-2",
    type: "project_created",
    user: { name: "Anna" },
    target: { name: "Mobile App Redesign" },
    createdAt: "2 hours ago",
  },
  {
    id: "act-3",
    type: "task_created",
    user: { name: "Devon" },
    target: {
      name: "Setup Prisma migrations",
      projectName: "Interview Trainer",
    },
    createdAt: "5 hours ago",
  },
]

const MOCK_UPCOMING_TASKS: UpcomingTask[] = [
  {
    id: "task-101",
    title: "Prepare API documentation",
    projectName: "Interview Trainer",
    dueDate: "Today, 18:00",
    priority: "high",
    isOverdue: false,
  },
  {
    id: "task-102",
    title: "Setup E2E tests for auth module",
    projectName: "Auth Service",
    dueDate: "Tomorrow, 12:00",
    priority: "medium",
    isOverdue: false,
  },
  {
    id: "task-103",
    title: "Fix EGL display bug in Linux build",
    projectName: "Desktop Client",
    dueDate: "Yesterday",
    priority: "high",
    isOverdue: true,
  },
]

const MOCK_MEMBERS: TeamMember[] = [
  {
    id: "mem-1",
    name: "Alexey",
    role: "Fullstack Dev",
    isOnline: true,
  },
  {
    id: "mem-2",
    name: "Anna",
    role: "Product Designer",
    isOnline: true,
  },
  {
    id: "mem-3",
    name: "Devon",
    role: "Backend Lead",
    isOnline: false,
    lastSeen: "20 mins ago",
  },
  {
    id: "mem-4",
    name: "Elena",
    role: "QA Engineer",
    isOnline: false,
    lastSeen: "2 hours ago",
  },
]

const activityIcons: Record<ActivityType, { icon: string; color: string }> = {
  task_completed: { icon: "lucide:check-circle-2", color: "text-emerald-500" },
  task_created: { icon: "lucide:plus-circle", color: "text-blue-500" },
  project_created: { icon: "lucide:folder-plus", color: "text-purple-500" },
  member_joined: { icon: "lucide:user-plus", color: "text-amber-500" },
}

const priorityColors: Record<Priority, string> = {
  low: "bg-slate-500/10 text-slate-500",
  medium: "bg-amber-500/10 text-amber-500",
  high: "bg-destructive/10 text-destructive",
}

async function getProjectsStats(teamId: string): Promise<ProjectStats[]> {
  const cookiesStore = await cookies()

  const res = await fetch(`${API_URL}/project/${teamId}/stats`, {
    cache: "no-store",
    headers: {
      Cookie: `accessToken=${cookiesStore.get("accessToken")?.value}`,
      "Content-Type": "application/json",
    },
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch project stats")
  }

  return data
}

// --- PAGE ---
export default async function TeamDashboardPage({
  params,
}: {
  params: Promise<{ teamId: string }>
}) {
  const { teamId } = await params

  const projects = await getProjectsStats(teamId)

  const stats = {
    projects: projects.length,
    todos: projects.reduce((acc, project) => acc + project.tasksTotal, 0),
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold">Dashboard</h1>
      </div>

      {/* Адаптивный Grid: 1 колонка на мобилках, 2 колонки на планшетах/ноутбуках, 12 колонок на 2xl */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 2xl:grid-cols-12">
        {/* Левая колонка (Основной контент): 1 колонка на мобилках/планшетах, 9 колонок на 2xl */}
        <div className="flex flex-col gap-6 lg:col-span-1 2xl:col-span-9">
          {/* 1. Recent Activity */}
          <Card>
            <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle className="text-base font-medium">
                Recent Activity
              </CardTitle>

              {/* UI Поиска и Фильтров */}
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-auto">
                  <Icon
                    icon="lucide:search"
                    className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="text"
                    placeholder="Search activity..."
                    className="h-8 w-full rounded-md border border-input bg-background pr-3 pl-8 text-xs ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none sm:w-44"
                  />
                </div>

                {/* Скроллируемые фильтры для маленьких экранов */}
                <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-lg border bg-muted/40 p-1">
                  <button
                    type="button"
                    className="shrink-0 rounded-md bg-background px-2.5 py-1 text-xs font-medium text-foreground shadow-sm transition-all"
                  >
                    All
                  </button>
                  <button
                    type="button"
                    className="shrink-0 rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground transition-all hover:text-foreground"
                  >
                    Tasks
                  </button>
                  <button
                    type="button"
                    className="shrink-0 rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground transition-all hover:text-foreground"
                  >
                    Projects
                  </button>
                  <button
                    type="button"
                    className="shrink-0 rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground transition-all hover:text-foreground"
                  >
                    Members
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {MOCK_ACTIVITIES.map((item) => {
                  const config = activityIcons[item.type]
                  return (
                    <div
                      key={item.id}
                      className="flex flex-col justify-between gap-1 text-sm sm:flex-row sm:items-start"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">
                          <Icon
                            icon={config.icon}
                            className={`size-4 ${config.color}`}
                          />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-foreground">
                            <span className="font-medium">
                              {item.user.name}
                            </span>{" "}
                            {item.type === "task_completed" &&
                              "completed task "}
                            {item.type === "task_created" && "created task "}
                            {item.type === "project_created" &&
                              "created project "}
                            {item.type === "member_joined" && "joined "}
                            <span className="font-medium">
                              {item.target.name}
                            </span>
                          </p>
                          {item.target.projectName && (
                            <span className="text-xs text-muted-foreground">
                              in {item.target.projectName}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="shrink-0 text-xs text-muted-foreground sm:self-auto">
                        {item.createdAt}
                      </span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* 2. Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-medium">
                <Clock className="size-4 text-muted-foreground" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {MOCK_UPCOMING_TASKS.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between gap-2 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex flex-col gap-1 overflow-hidden pr-2">
                      <span className="truncate text-sm font-medium">
                        {task.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {task.projectName}
                      </span>
                    </div>

                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] font-medium capitalize ${
                          priorityColors[task.priority]
                        }`}
                      >
                        {task.priority}
                      </span>
                      <span
                        className={`text-xs ${
                          task.isOverdue
                            ? "font-medium text-destructive"
                            : "text-muted-foreground"
                        }`}
                      >
                        {task.dueDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Правый сайдбар: 1 колонка на мобилках/планшетах, 3 колонки на 2xl */}
        <div className="flex flex-col gap-6 lg:col-span-1 2xl:col-span-3">
          <ProjectStatsEntry stats={stats} />

          {/* Team Members Widget */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-base font-medium">
                Team Members
              </CardTitle>
              <span className="text-xs text-muted-foreground">
                {MOCK_MEMBERS.filter((m) => m.isOnline).length} online
              </span>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {MOCK_MEMBERS.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Аватар с индикатором статуса */}
                      <div className="relative shrink-0">
                        <div className="flex size-7 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground uppercase">
                          {member.name[0]}
                        </div>
                        <span
                          className={`absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-background ${
                            member.isOnline ? "bg-emerald-500" : "bg-slate-400"
                          }`}
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs leading-none font-medium">
                          {member.name}
                        </span>
                        <span className="mt-0.5 text-[10px] text-muted-foreground">
                          {member.role}
                        </span>
                      </div>
                    </div>

                    {/* Статус / Время последней активности */}
                    <span className="text-xs text-muted-foreground">
                      {member.isOnline ? (
                        <span className="text-[10px] font-medium text-emerald-500">
                          Online
                        </span>
                      ) : (
                        <span className="text-[10px]">{member.lastSeen}</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

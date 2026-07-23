import { Project } from "@/src/entity/projects"
import { ProjectRecentActivity } from "@/src/widgets/project-recent-activity"

// --- TYPES ---
interface ProjectStats extends Project {
  tasksDone: number
  tasksTotal: number
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

const priorityColors: Record<Priority, string> = {
  low: "bg-slate-500/10 text-slate-500",
  medium: "bg-amber-500/10 text-amber-500",
  high: "bg-destructive/10 text-destructive",
}

// async function getProjectsStats(teamId: string): Promise<ProjectStats[]> {
//   const cookiesStore = await cookies()

//   const res = await fetch(`${API_URL}/project/${teamId}/stats`, {
//     cache: "no-store",
//     headers: {
//       Cookie: cookiesStore.toString(),
//       "Content-Type": "application/json",
//     },
//   })

//   if (!res.ok) {
//     // Безопасно парсим ошибку, если это JSON, иначе фоллбэк на статус
//     const errorData = await res.json().catch(() => null)
//     console.error(
//       errorData?.message || `Failed to fetch stats: ${res.statusText}`
//     )
//   }

//   return res.json()
// }
export default async function TeamDashboardPage({
  params,
}: {
  params: Promise<{ teamId: string }>
}) {
  const { teamId } = await params

  // const projects = await getProjectsStats(teamId)

  // const stats = {
  //   projects: projects.length,
  //   todos: projects.reduce((acc, project) => acc + project.tasksTotal, 0),
  // }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 2xl:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-1 2xl:col-span-9">
          <ProjectRecentActivity />

          {/* <Card>
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
          </Card> */}
        </div>

        <div className="flex flex-col gap-6 lg:col-span-1 2xl:col-span-3">
          {/* <ProjectStatsEntry stats={stats} /> */}
          {/* 
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
                      {/* Аватар с индикатором статуса 
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
          </Card> */}
        </div>
      </div>
    </section>
  )
}

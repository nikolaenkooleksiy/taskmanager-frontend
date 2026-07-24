import { getProjectById } from "@/src/entity/projects"
import { CreateTodoDialogEntry } from "@/src/features/create-todo/ui/CreateTodoDialogEntry"
import { TodoViewSwitcherEntry } from "@/src/features/todo-view-switcher"
import { TodoList } from "@/src/widgets/todo-list"
import { Metadata } from "next"

interface ProjectPageProps {
  params: Promise<{ teamId: string; projectId: string }>
}

export async function generateMetadata(
  params: ProjectPageProps
): Promise<Metadata> {
  const { projectId } = await params.params

  const { data } = await getProjectById(projectId)

  return {
    title: data?.name || "Project Page",
    description:
      data?.description || "Manage your project's tasks and activities.",
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <TodoViewSwitcherEntry />

        <CreateTodoDialogEntry />
      </div>

      <TodoList />
    </div>
  )
}

import { CreateTodoDialog } from "@/src/features/create-todo/ui/CreateTodoDialog"
import { TodoViewSwitcherEntry } from "@/src/features/todo-view-switcher"
import { TodoList } from "@/src/widgets/todo-list"

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ teamId: string; projectId: string }>
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <TodoViewSwitcherEntry />

        <CreateTodoDialog />
      </div>

      <TodoList />
    </div>
  )
}

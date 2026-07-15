import { CreateTodoDialogLazy } from "@/src/features/create-todo"
import { TodoList } from "@/src/widgets/todo-list"

export default function Page() {
  return (
    <section className="container mx-auto min-h-svh px-2">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <CreateTodoDialogLazy />
      </div>

      <TodoList />
    </section>
  )
}

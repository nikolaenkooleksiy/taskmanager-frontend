import { getUserTodos } from "@/src/entity/todo"
import { cn } from "@/src/shared/lib"
import { Inbox } from "lucide-react"
import { TodoListItem } from "./TodoListItem"

export const TodoList = async () => {
  const result = await getUserTodos()
  const todos = result.success ? (result.data ?? []) : []

  if (!todos.length) {
    return (
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-2 text-muted-foreground">
        <Inbox size={52} />
        <p>Ще немає задач</p>
      </div>
    )
  }

  return (
    <ul
      className={cn(
        "mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
        todos.length < 8 && "justify-normal"
      )}
    >
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}

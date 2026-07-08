import { Todo } from "@/src/entity/todo"
import { cn } from "@/src/shared/lib"
import { Inbox } from "lucide-react"
import { TodoListItem } from "./TodoListItem"

const TODOS: Todo[] = [
  {
    id: "1",
    title: "Design homepage",
    description: "Create wireframes and mockups",
    status: "PENDING",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Setup CI/CD",
    description: "GitHub Actions pipeline",
    status: "PENDING",
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Write tests",
    description:
      "Unit tests for API endpoints. Unit tests for API endpoints. Unit tests for API endpoints.Unit tests for API endpoints.",
    status: "PENDING",
    createdAt: new Date(),
  },
  {
    id: "4",
    title: "Update docs",
    description: "README improvements",
    status: "PENDING",
    createdAt: new Date(),
  },
  {
    id: "5",
    title: "Fix auth bug",
    description: "Token refresh issue",
    status: "PENDING",
    createdAt: new Date(),
  },
]

export const TodoList = async () => {
  if (!TODOS.length) {
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
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
        TODOS.length < 8 && "justify-normal"
      )}
    >
      {TODOS.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}

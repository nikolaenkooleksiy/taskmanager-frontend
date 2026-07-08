import { TodoList } from "@/src/widgets/todo-list"

export default function Page() {
  return (
    <section className="container mx-auto min-h-svh px-2">
      <h1 className="mb-2 text-2xl font-bold">Tasks</h1>

      <TodoList />
    </section>
  )
}

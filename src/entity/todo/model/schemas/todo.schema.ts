import { z as zod } from "zod/v4"

export const todoStatusSchema = zod.enum([
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED",
])

export const todoSchema = zod.object({
  id: zod.uuid(),
  title: zod.string().min(1, "Title is required"),
  description: zod.string().nullable(),
  status: todoStatusSchema,
  createdAt: zod.date(),
})

export type Todo = zod.infer<typeof todoSchema>
export type TodoStatus = zod.infer<typeof todoStatusSchema>

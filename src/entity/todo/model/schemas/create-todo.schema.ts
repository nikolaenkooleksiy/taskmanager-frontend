import { z as zod } from "zod/v4"

export const createTodoSchema = zod.object({
  title: zod.string().min(3, "Title must contain at least 3 characters"),
  description: zod.string().nullable(),
})

export type CreateTodoInput = zod.infer<typeof createTodoSchema>

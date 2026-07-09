import { z } from "zod"

export const createTodoSchema = z.object({
  title: z.string().min(3, "Title must contain at least 3 characters"),
  description: z.string().optional(),
})

export type CreateTodoInput = z.infer<typeof createTodoSchema>

import { z } from "zod"
import { createTodoSchema } from "./create-todo.schema"

export const updateTodoSchema = z.object({
  title: createTodoSchema.shape.title.optional(),
  description: z.string().nullable(),
})
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>

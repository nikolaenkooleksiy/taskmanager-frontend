import { z as zod } from "zod/v4"
import { projectSchema } from "./project.schema"

export const createProjectSchema = projectSchema.pick({
  icon: true,
  name: true,
  description: true,
})

export type CreateProjectInput = zod.infer<typeof createProjectSchema>

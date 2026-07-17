import { z as zod } from "zod/v4"

export const projectSchema = zod.object({
  id: zod.uuid(),
  name: zod.string().min(3).max(100),
  description: zod.string().max(500).nullable(),
  icon: zod.url(),
  createdAt: zod.date(),
})

export type Project = zod.infer<typeof projectSchema>

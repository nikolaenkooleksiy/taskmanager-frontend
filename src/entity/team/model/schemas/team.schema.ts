import { z as zod } from "zod/v4"

export const teamSchema = zod.object({
  id: zod.uuid(),
  name: zod.string().min(1).max(100),
})

export type Team = zod.infer<typeof teamSchema>

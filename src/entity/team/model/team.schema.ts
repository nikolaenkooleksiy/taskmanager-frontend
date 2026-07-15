import { z as zod } from "zod/v4"

const teamTypeEnum = zod.enum(["Startup", "Enterprise"])

export const teamSchema = zod.object({
  id: zod.uuid(),
  name: zod.string().min(1).max(100),
  type: teamTypeEnum,
})

export type Team = zod.infer<typeof teamSchema>
export type TeamType = zod.infer<typeof teamTypeEnum>

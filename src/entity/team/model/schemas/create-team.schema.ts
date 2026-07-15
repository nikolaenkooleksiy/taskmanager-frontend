import { z as zod } from "zod/v4"
import { teamSchema } from "./team.schema"

export const createTeamSchema = teamSchema.pick({ name: true, type: true })

export type CreateTeamInput = zod.infer<typeof createTeamSchema>

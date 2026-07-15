import { z } from "zod"

export const userRole = z.enum(["User", "Admin"])

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  avatarUrl: z.string().nullable(),
  email: z.string().email(),
  role: userRole,
  createdAt: z.coerce.date(),
})

export type UserRole = z.infer<typeof userRole>
export type User = z.infer<typeof userSchema>

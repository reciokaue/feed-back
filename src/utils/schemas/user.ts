import { z } from 'zod'

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  accessLevel: z.number().int().default(0).optional(),
})

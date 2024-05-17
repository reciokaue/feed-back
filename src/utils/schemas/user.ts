import { z } from 'zod'

export const userSchema = z.object({
  id: z.coerce.number().int().positive(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  accessLevel: z.number().int().default(0).optional(),
})

import { z } from 'zod'

/// //////////////////////////////////////
// USER SCHEMA
/// //////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  profileImage: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

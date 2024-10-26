import { z } from 'zod';

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.number().int(),
  createdAt: z.coerce.date(),
  formId: z.number().int(),
})

export type Session = z.infer<typeof SessionSchema>
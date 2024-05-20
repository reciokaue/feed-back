import { z } from 'zod'
import { responseSchema } from './response'

export const sessionSchema = z.object({
  id: z.coerce.number().positive().int().optional(),
  createdAt: z.date(),
  responses: z.array(responseSchema),
  formId: z.coerce.number().positive().int().optional(),
})

import { z } from 'zod'

export const responseSchema = z.object({
  id: z.coerce.number().positive().int().optional(),
  value: z.coerce.number().positive().int().optional(),
  questionId: z.string().uuid(),
  sessionId: z.coerce.number().positive().int().optional(),
})

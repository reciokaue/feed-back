import { z } from 'zod'

export const questionTypeSchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  name: z.string().optional(),
  label: z.string().optional(),
  icon: z.string().optional(),
})

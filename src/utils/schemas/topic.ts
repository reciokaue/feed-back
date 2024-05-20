import { z } from 'zod'

export const topicSchema = z.object({
  id: z.number(),
  name: z.string(),
})

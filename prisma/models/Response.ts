import { z } from 'zod';

/////////////////////////////////////////
// RESPONSE SCHEMA
/////////////////////////////////////////

export const ResponseSchema = z.object({
  id: z.number().int(),
  value: z.string(),
  sessionId: z.number().int(),
  optionId: z.number().int(),
  questionId: z.number().int(),
})

export type Response = z.infer<typeof ResponseSchema>
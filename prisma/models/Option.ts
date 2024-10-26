import { z } from 'zod';

/////////////////////////////////////////
// OPTION SCHEMA
/////////////////////////////////////////

export const OptionSchema = z.object({
  id: z.number().int(),
  text: z.string(),
  index: z.number().int(),
  questionId: z.number().int(),
})

export type Option = z.infer<typeof OptionSchema>

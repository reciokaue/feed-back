import { z } from 'zod';

/////////////////////////////////////////
// QUESTION TYPE SCHEMA
/////////////////////////////////////////

export const QuestionTypeSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  label: z.string(),
  icon: z.string(),
})

export type QuestionType = z.infer<typeof QuestionTypeSchema>


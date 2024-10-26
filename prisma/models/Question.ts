import { z } from 'zod';

/////////////////////////////////////////
// QUESTION SCHEMA
/////////////////////////////////////////

export const QuestionSchema = z.object({
  id: z.number().int(),
  text: z.string(),
  index: z.number().int(),
  required: z.boolean(),
  typeId: z.number().int().nullable(),
  formId: z.number().int(),
})

export type Question = z.infer<typeof QuestionSchema>


export const questionSelect = {
  id: true,
  text: true,
  index: true,
  questionType: true,
  required: true,
  formId: true,
  options: {
    select: {
      id: true,
      index: true,
      text: true,
    },
  },
}
export const questionCompareSelect = {
  id: true,
  text: true,
  index: true,
  typeId: true,
  required: true,
  formId: true,
  options: {
    select: {
      id: true,
      index: true,
      text: true,
    },
  },
}

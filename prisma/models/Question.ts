import { z } from 'zod';
import { QuestionTypeSchema } from './QuestionType';
import { OptionSchema } from './Option';

/////////////////////////////////////////
// QUESTION SCHEMA
/////////////////////////////////////////

export const QuestionSchema = z.object({
  id: z.number().int(),
  text: z.string(),
  index: z.number().int(),
  required: z.boolean().default(false),
  formId: z.number().int(),

  questionType: QuestionTypeSchema.optional(),
  typeId: z.number().optional(),
  options: z.array(OptionSchema.partial()).optional()
})

export type Question = z.infer<typeof QuestionSchema>

export const questionSchemaCreate = QuestionSchema.transform(
  ({ questionType, options, ...rest }) => ({
    ...rest,
    typeId: questionType?.id,
    options: {
      create: options?.map((option) => option),
    },
  }),
)

export const questionSchemaUpdate = QuestionSchema.transform(
  ({ questionType, ...rest }) => ({
    id: rest.id,
    text: rest.text,
    index: rest.index,
    typeId: questionType?.id,
    required: rest.required,
    formId: rest.formId,
    options: rest.options,
  }),
)

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
export const questionResponsesSelect = {
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
  _count: {
    select: {
      responses: true
    }
  },
  responses: {
    select: {
      id: true,
      value: true,
    }
  }
}

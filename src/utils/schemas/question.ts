import { z } from 'zod'
import { optionSchema, optionSchemaUpdate } from './option'
import { questionTypeSchema } from './questionType'

export const questionSchema = z.object({
  id: z.coerce.number().int().optional(),
  text: z.string(),
  index: z.number().optional().default(0),
  formId: z.coerce.number().positive().int().optional(),
  questionType: questionTypeSchema.optional(),
  options: z.array(optionSchema).optional(),
  required: z.boolean().optional().default(true),
})
export const questionSchemaCreate = questionSchema.transform(
  ({ questionType, options, ...rest }) => ({
    ...rest,
    typeId: questionType?.id,
    options: {
      create: options?.map((option) => option),
    },
  }),
)

export const questionSchemaUpdate = questionSchema.transform(
  ({ questionType, ...rest }) => ({
    ...rest,
    typeId: questionType?.id,
  }),
)

export type questionSchemaType = z.input<typeof questionSchema>

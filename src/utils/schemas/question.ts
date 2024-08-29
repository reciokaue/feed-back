import { z } from 'zod'
import { optionSchema, optionSchemaUpdate } from './option'
import { questionTypeSchema } from './questionType'

export const questionSchema = z.object({
  id: z.coerce.number().positive().int().optional(),
  text: z.string(),
  index: z.number().optional().default(0),
  formId: z.coerce.number().positive().int().optional(),
  questionType: questionTypeSchema.optional(),
  options: z.array(optionSchema).optional(),
  required: z.boolean().optional().default(true),
})
export const questionSchemaCreate = questionSchema
  .extend({
    options: z
      .array(optionSchema.omit({ id: true, questionId: true }))
      .transform((options) => ({ create: options }))
      .optional(),
  })
  .transform(({ questionType, ...rest }) => ({
    ...rest,
    typeId: questionType?.id,
  }))

export const questionSchemaUpdate = questionSchema
  .extend({
    id: z.coerce.number().positive().int().optional(),
    deletedOptionsIds: z.array(z.number()).optional(),
    options: z
      .array(optionSchemaUpdate)
      .transform((options) => ({
        create: options
          .filter((option) => option.data.new)
          .map((option) => ({
            text: option.data.text,
            index: option.data.index,
          })),
        update: options.filter((option) => !option.data.new),
      }))
      .optional(),
  })

  .transform(({ deletedOptionsIds, options, questionType, ...rest }) => ({
    ...rest,
    typeId: questionType?.id,
    options: {
      ...options,
      delete: deletedOptionsIds?.map((deletedOptionId) => ({
        id: deletedOptionId,
      })),
    },
  }))

export type questionSchemaType = z.input<typeof questionSchema>

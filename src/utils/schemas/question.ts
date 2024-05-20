import { z } from 'zod'
import { optionSchema, optionSchemaUpdate } from './option'

export const questionSchema = z.object({
  id: z.coerce.number().positive().int().optional(),
  text: z.string(),
  options: z.array(optionSchema).optional(),
  index: z.number().optional().default(0),
  typeId: z.number(),
})

export const questionSchemaCreate = questionSchema.extend({
  options: z
    .array(optionSchema)
    .transform((options) => ({ create: options }))
    .optional(),
})

export const questionSchemaUpdate = questionSchema
  .extend({
    id: z.coerce.number().positive().int().optional(),
    typeId: z.coerce.number().positive().int().optional(),
    formId: z.coerce.number().positive().int().optional(),
    options: z
      .array(optionSchemaUpdate)
      .transform((options) => ({ updateMany: options }))
      .optional(),
  })
  .transform((question) => ({
    where: { id: question.id },
    data: question,
  }))

export type questionSchemaType = z.input<typeof questionSchema>

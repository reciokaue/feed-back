import { z } from 'zod'

export const optionSchema = z.object({
  id: z.coerce.number().positive().int().optional(),
  text: z.string(),
  index: z.number().optional().default(0),
  questionId: z.coerce.number().positive().int().optional(),
})

export const optionSchemaUpdate = optionSchema.transform((option) => ({
  where: { id: option.id },
  data: option,
}))

export type optionSchemaType = z.input<typeof optionSchema>

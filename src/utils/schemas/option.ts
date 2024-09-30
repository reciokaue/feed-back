import { boolean, z } from 'zod'

export const optionSchema = z.object({
  id: z.coerce.number().int().optional(),
  index: z.number().optional().default(0),
  text: z.string(),
  questionId: z.coerce.number().positive().int().optional(),
  new: boolean().optional(),
})

export const optionSchemaUpdate = optionSchema.transform((option) => ({
  where: { id: option.id },
  data: option,
}))

export type optionSchemaType = z.input<typeof optionSchema>

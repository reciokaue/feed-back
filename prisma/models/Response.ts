import { z } from 'zod'

/// //////////////////////////////////////
// RESPONSE SCHEMA
/// //////////////////////////////////////

export const ResponseSchema = z.object({
  id: z.number().int().optional(),
  value: z.number().optional(),
  text: z.string().optional(),
  sessionId: z.number().int().nullable().optional(),
  optionId: z.number().int().nullable().optional(),
  questionId: z.number().int().optional(),
})
export type Response = z.infer<typeof ResponseSchema>

export const MultipleResponsesSchema = z.array(ResponseSchema.extend({
  text: z.coerce.string().optional(),
  value: z.coerce.number().optional(),
}))
export type MultipleResponses = z.infer<typeof MultipleResponsesSchema>


import { z } from 'zod'

/// //////////////////////////////////////
// RESPONSE SCHEMA
/// //////////////////////////////////////

export const ResponseSchema = z.object({
  id: z.number().int().optional(),
  value: z.string(),
  sessionId: z.number().int().nullable().optional(),
  optionId: z.number().int().nullable().optional(),
  questionId: z.number().int(),
})
export type Response = z.infer<typeof ResponseSchema>

export const MultipleResponsesSchema = z.array(ResponseSchema.extend({
  value: z.coerce.string()
}))
export type MultipleResponses = z.infer<typeof MultipleResponsesSchema>


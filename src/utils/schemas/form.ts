/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod'

export const ResponseSchema = z.object({
  id: z.coerce.number().positive().int().optional(),
  value: z.coerce.number().positive().int().optional(),
  questionId: z.string().uuid(),
  sessionId: z.coerce.number().positive().int().optional(),
})

export const OptionSchema = z.object({
  id: z.coerce.number().positive().int().optional(),
  text: z.string(),
  index: z.number().optional().default(0),
  questionId: z.coerce.number().positive().int().optional(),
})

export const QuestionSchema = z.object({
  id: z.coerce.number().positive().int().optional(),
  text: z.string(),
  type: z.string(),
  options: z.array(OptionSchema).optional(),
  index: z.number().optional().default(0),
})

export const FormSchema = z.object({
  id: z.coerce.number().positive().int().optional(),
  name: z.string(),
  about: z.string().nullable().optional(),
  active: z.boolean().nullable().optional().default(false),
  isPublic: z.boolean().optional().default(false),
  createdAt: z.string().nullable().optional(),
  userId: z.coerce.number().positive().int().optional(),
  topics: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      }),
    )
    .optional(),
  logoUrl: z.string().nullable().optional(),
  questions: z.array(QuestionSchema).optional(),
})

export const SessionSchema = z.object({
  id: z.coerce.number().positive().int().optional(),
  createdAt: z.date(),
  responses: z.array(ResponseSchema),
  formId: z.coerce.number().positive().int().optional(),
})

export const questionFormPrisma = QuestionSchema.extend({
  typeId: z.coerce.number().positive().int().optional(),
  formId: z.coerce.number().positive().int().optional(),
  options: z
    .array(OptionSchema)
    .optional()
    .transform((options) => ({
      updateMany: options?.map((op) => ({
        where: { id: op.id },
        data: op,
      })),
    })),
})

export const FormSchemaForPrisma = FormSchema.extend({
  topics: z.array(z.number()).optional(),
  questions: z
    .array(questionFormPrisma)
    .transform((questions) => ({ create: questions }))
    .optional(),
})

export const questionsSchemaForPrisma = z
  .array(questionFormPrisma)
  .optional()
  .transform((questions) => ({
    create: questions ? questions.map(({ id, formId, ...rest }) => rest) : [],
  }))

export type QuestionSchema = z.input<typeof QuestionSchema>
export type FormSchema = z.input<typeof FormSchema>
export type OptionSchema = z.input<typeof OptionSchema>

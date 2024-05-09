/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod'

export const ResponseSchema = z.object({
  id: z.string().uuid().optional(),
  value: z.string().optional(),
  questionId: z.string().uuid(),
  sessionId: z.string().uuid().optional(),
  optionId: z.string().uuid(),
})

export const OptionSchema = z.object({
  id: z.string().optional(),
  text: z.string(),
  value: z.number(),
  emoji: z.string().optional().nullable(),
})

export const QuestionSchema = z.object({
  id: z.string().optional(),
  text: z.string(),
  isPublic: z.boolean().optional(),
  type: z.string(),
  topics: z.array(z.string()).optional(),
  options: z.array(OptionSchema).optional(),
})

export const FormSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  about: z.string().nullable().optional(),
  active: z.boolean().nullable().optional().default(false),
  isPublic: z.boolean().optional().default(false),
  createdAt: z.string().nullable().optional(),
  endedAt: z.string().nullable().optional(),
  userId: z.string().nullable().optional(),
  topics: z.array(z.string()).optional(),
  logoUrl: z.string().nullable().optional(),
  questions: z.array(QuestionSchema).optional(),
})

export const SessionSchema = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.date(),
  responses: z.array(ResponseSchema),
  formId: z.string().uuid().optional(),
})

export const questionFormPrisma = QuestionSchema.extend({
  formId: z.string().uuid().optional(),
  topics: z
    .array(z.string())
    .optional()
    .transform((topics) => ({
      connect: topics?.map((topic) => ({ name: topic.toLowerCase() })),
    })),
  options: z
    .array(OptionSchema)
    .optional()
    .transform((options) => ({
      create: options?.map(({ id, ...rest }) => rest),
    })),
})

export const FormSchemaForPrisma = FormSchema.extend({
  topics: z.array(z.string()).transform((topics) => ({
    connect: topics?.map((topic) => ({ name: topic.toLowerCase() })),
  })),
  questions: z
    .array(questionFormPrisma)
    .optional()
    .transform((questions) => ({ create: questions })),
})

export const questionsSchemaForPrisma = z
  .array(questionFormPrisma)
  .optional()
  .transform((questions) => ({
    create: questions ? questions.map(({ id, ...rest }) => rest) : [],
  }))

export type QuestionSchema = z.input<typeof QuestionSchema>
export type FormSchema = z.input<typeof FormSchema>
export type OptionSchema = z.input<typeof OptionSchema>

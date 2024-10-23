import { z } from 'zod'
import { topicSchema } from './topic'
import {
  questionSchema,
  questionSchemaCreate,
  questionSchemaUpdate,
} from './question'

export const formSchema = z.object({
  id: z.coerce.number().positive().int().optional(),
  name: z.string(),
  about: z.string().nullable().optional(),
  active: z.boolean().nullable().optional().default(false),
  isPublic: z.boolean().optional().default(false),
  createdAt: z.string().nullable().optional(),
  userId: z.coerce.number().positive().int().optional(),
  topics: z.array(topicSchema).optional(),
  logoUrl: z.string().nullable().optional(),
  questions: z.array(questionSchema).optional(),
})

export const formSchemaCreate = formSchema.extend({
  topics: z.array(z.number()).optional(),
  questions: z
    .array(questionSchemaCreate)
    .transform((questions) => ({ create: questions }))
    .optional(),
})

export const formSchemaUpdate = formSchema.extend({
  // topics: z.array(z.number()).optional(),
  // questions: z
  //   .array(questionSchemaUpdate)
  //   .transform((questions) => ({ updateMany: questions }))
  //   .optional(),
})

export type formSchemaType = z.input<typeof formSchema>

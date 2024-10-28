import { z } from 'zod'

import { CategorySchema } from './Category'
import { QuestionSchema, questionSelect } from './Question'

/// //////////////////////////////////////
// FORM SCHEMA
/// //////////////////////////////////////

export const FormSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string().nullable(),
  active: z.boolean(),
  logoUrl: z.string().nullable(),
  isPublic: z.boolean().nullable().default(true),
  createdAt: z.coerce.date().nullable(),
  userId: z.number().int().nullable(),
  category: CategorySchema.optional(),
  categoryId: z.number().optional(),
  questions: z.array(QuestionSchema.partial()).optional(),
  _count: z
    .object({
      questions: z.number(),
      sessions: z.number(),
    })
    .optional(),
})

export type Form = z.infer<typeof FormSchema>

export const formSelect = {
  id: true,
  name: true,
  description: true,
  active: true,
  logoUrl: true,
  isPublic: true,
  createdAt: true,
  category: {
    select: {
      id: true,
      label: true,
      icon: true,
    },
  },
  _count: {
    select: {
      questions: true,
      sessions: true,
    },
  },
}
export const formDetailSelect = {
  id: true,
  userId: true,
  name: true,
  description: true,
  active: true,
  logoUrl: true,
  isPublic: true,
  createdAt: true,
  category: {
    select: {
      id: true,
      label: true,
      icon: true,
    },
  },
  questions: {
    select: questionSelect,
    orderBy: {
      index: 'asc' as const,
    },
  },
  _count: {
    select: {
      questions: true,
      sessions: true,
    },
  },
}

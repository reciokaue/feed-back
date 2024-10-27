import { z } from 'zod';
import { questionCompareSelect, QuestionSchema, questionSchemaCreate, questionSelect } from './Question';
import { CategorySchema } from './Category';

/////////////////////////////////////////
// FORM SCHEMA
/////////////////////////////////////////

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
  questions: z.array(QuestionSchema).optional(),
})

export type Form = z.infer<typeof FormSchema>

export const formSchemaCreate = FormSchema.transform( ({category}) => ({
  categoryId: category.id,
  questions: z
    .array(questionSchemaCreate)
    .transform((questions) => ({ create: questions }))
    .optional(),
}))

export const formSelect =  {
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
      label: true
    }
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
  _count: {
    select: {
      questions: true,
      sessions: true,
    },
  },
  questions: {
    select: questionSelect,
    orderBy: {
      index: 'asc' as const,
    },
  },
  category: {
    select: {
      id: true,
      label: true
    }
  },
}

export const formCompareSelect = {
  id: true,
  userId: true,
  questions: {
    select: questionCompareSelect,
    orderBy: {
      index: 'asc' as const,
    },
  },
}
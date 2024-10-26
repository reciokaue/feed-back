import { z } from 'zod';
import { questionCompareSelect, questionSelect } from './Question';

/////////////////////////////////////////
// FORM SCHEMA
/////////////////////////////////////////

export const FormSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string().nullable(),
  active: z.boolean(),
  logoUrl: z.string().nullable(),
  isPublic: z.boolean(),
  createdAt: z.coerce.date(),
  userId: z.number().int(),
  categoryId: z.number().int().nullable(),
})

export type Form = z.infer<typeof FormSchema>

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
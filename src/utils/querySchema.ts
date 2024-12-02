import { z } from 'zod'

export const querySchema = z.object({
  page: z.string().transform((val) => +val).default('0'),
  pageSize: z.string().transform((val) => +val).default('6'),
  isPublic: z.string().transform((val) => val.toLowerCase() === 'true').default('false'),
  query: z.string().default(''),
  categoryId: z.coerce.number().optional(),
  categoryName: z.string().optional(),
  parentId: z.coerce.number().optional(),
  formId: z.coerce.number().optional(),
  questionId: z.coerce.number().optional(),
  sessionId: z.coerce.number().optional(),
  responseId: z.coerce.number().optional(),
  id: z.coerce.number().optional(),
  toFormId: z.coerce.number().int().positive().optional(),
  templateId: z.coerce.number().int().positive().optional(),
  datasense: z.coerce.boolean().optional().default(false),
  userId: z.coerce.number().int().positive().optional(),
  count: z.coerce.number().int().positive().optional(),
})
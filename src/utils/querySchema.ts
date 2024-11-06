import { z } from 'zod'

export const querySchema = z.object({
  page: z.string().transform((val) => +val).default('0'),
  pageSize: z.string().transform((val) => +val).default('6'),
  isPublic: z.string().transform((val) => val.toLowerCase() === 'true').default('false'),
  query: z.string().default(''),
  categoryId: z.coerce.number().optional(),
  categoryName: z.string().optional(),
  parentId: z.coerce.number().optional()
})
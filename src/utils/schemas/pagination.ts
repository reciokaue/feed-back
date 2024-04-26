import { z } from 'zod'

export const paginationSchema = z.object({
  page: z
    .string()
    .transform((val) => +val)
    .default('0'),
  pageSize: z
    .string()
    .transform((val) => +val)
    .default('6'),
  isDefault: z
    .string()
    .transform((val) => val.toLowerCase() === 'true')
    .default('false'),
  query: z.string().default(''),
})

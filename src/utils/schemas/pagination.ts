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
  isPublic: z
    .string()
    .transform((val) => val.toLowerCase() === 'true')
    .default('false'),
  query: z.string().default(''),
  topics: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(',').map(Number) : [])), // Transforma a string de tópicos em um array de números
})

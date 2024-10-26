import { z } from 'zod';

/////////////////////////////////////////
// CATEGORY SCHEMA
/////////////////////////////////////////

export const CategorySchema = z.object({
  id: z.number().int(),
  label: z.string(),
  parentId: z.number().int().nullable(),
})

export type Category = z.infer<typeof CategorySchema>
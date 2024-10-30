/* eslint-disable no-use-before-define */
import { z } from 'zod'

/// //////////////////////////////////////
// ORIGINAL CATEGORY SCHEMA
/// //////////////////////////////////////

const baseCategorySchema = z.object({
  id: z.number().int(),
  label: z.string(),
  icon: z.string(),
  parentId: z.number().int().nullable().optional(),
})

export type Category = z.infer<typeof baseCategorySchema> & {
  subcategories?: Category[]
  parent?: Category
}

export const CategorySchema: z.ZodType<Category> = baseCategorySchema.extend({
  subcategories: z.lazy(() => CategorySchema.array()).optional(),
  parent: z.lazy(() => baseCategorySchema),
})

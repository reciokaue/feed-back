import { z } from 'zod'

/// //////////////////////////////////////
// ORIGINAL CATEGORY SCHEMA
/// //////////////////////////////////////

const baseCategorySchema = z.object({
  id: z.number().int().optional(),
  label: z.string(),
  icon: z.string(),
  parentId: z.number().int().nullable().optional(),
})

export type Category = z.infer<typeof baseCategorySchema> & {
  subcategories?: Category[]
}

export const CategorySchema: z.ZodType<Category> = baseCategorySchema.extend({
  subcategories: z.lazy(() => CategorySchema.array()).optional(),
})

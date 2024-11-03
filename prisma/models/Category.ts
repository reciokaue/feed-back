/* eslint-disable no-use-before-define */
import { z } from 'zod'

/// //////////////////////////////////////
// ORIGINAL CATEGORY SCHEMA
/// //////////////////////////////////////

const baseCategorySchema = z.object({
  id: z.number().int().optional(),
  label: z.string(),
  name: z.string(),
  icon: z.string(),
  parentId: z.number().int().nullable().optional(),
})

export type Category = z.infer<typeof baseCategorySchema> & {
  subcategories?: Category[]
  parent?: Category | null
}

export const CategorySchema: z.ZodType<Category> = baseCategorySchema.extend({
  subcategories: z.lazy(() => CategorySchema.array()).optional(),
  parent: z
    .lazy(() => baseCategorySchema)
    .optional()
    .nullable(),
})

export const CategorySelect = {
  id: true,
  label: true,
  name: true,
  icon: true,
  subcategories: {
    select: {
      id: true,
      label: true,
      icon: true,
      name: true
    }
  }
}
import { z } from 'zod'
import { formatNumberWithDecimal } from 'lib/util'

export const currency = z
  .string()
  .refine((num) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(num))), 'Price must have exactly 2 decimal places')

export const ProductSchema = z.object({
  name          : z.string().min(3, 'Name must be at least 3 characters').max(50),
  slug          : z.string().min(5, 'Slug must be at least 5 characters').max(50),
  category      : z.string().min(3, 'Category must be at least 5 characters').max(50),
  brand         : z.string().min(3, 'Brand must be at least 5 characters').max(50),
  description   : z.string().min(3, 'Slug must be at least 5 characters').max(350),
  model         : z.string().min(3, 'Model must be at least 5 characters').max(350),
  specifications: z.array(z.string()),
  stock         : z.coerce.number(),
  images        : z.array(z.string()).min(1, 'Product must be at least 1 image'),
  isFeatured    : z.boolean(),
  banner        : z.string().nullable(),
  price         : currency
})

export const UpdateProductSchema = ProductSchema.extend({
  id: z.string().min(1, 'Id is required')
})
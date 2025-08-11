import { z } from 'zod'
import { GLOBAL } from 'hgss'
import { formatNumberWithDecimal, transl } from 'lib/util'

const { PRICE_MIN } = GLOBAL.PRICES

export const currency = z
  .string()
  .refine((num) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(num))), transl('validation.price_format'))

export const ProductSchema = z.object({
  name          : z.string().min(3, transl('validation.min_default', { field: 'Name', value: 3 })).max(50, transl('validation.max_default', { field: 'Name', value: 50 })),
  slug          : z.string().min(5, transl('validation.min_default', { field: 'Slug', value: 5 })).max(50, transl('validation.max_default', { field: 'Slug', value: 50 })).transform((val) => val.toLowerCase().replace(/\s+/g, '-')),
  category      : z.string().min(3, transl('validation.min_default', { field: 'Category', value: 3 })).max(50, transl('validation.max_default', { field: 'Category', value: 50 })),
  brand         : z.string().min(3, transl('validation.min_default', { field: 'Brand', value: 3 })).max(50, transl('validation.max_default', { field: 'Brand', value: 50 })),
  description   : z.string().min(3, transl('validation.min_default', { field: 'Description', value: 3 })).max(350,  transl('validation.max_default', { field: 'Description', value: 350 })),
  model         : z.string().nullable(),
  specifications: z.array(z.string()),
  stock         : z.coerce.number(),
  images        : z.array(z.string()).min(1, transl('validation.min_image_default', { module: 'Product', value: 1 })),
  isFeatured    : z.boolean(),
  banner        : z.string().nullable(),
  price         : currency.refine((num) => Number(num) > Number(PRICE_MIN), transl('error.price_min', { amount: PRICE_MIN })),
  __submitted   : z.boolean().default(false)
})

export const UpdateProductSchema = ProductSchema.extend({
  id: z.string().min(1, transl('validation.required_default', { field: 'Id' }))
})
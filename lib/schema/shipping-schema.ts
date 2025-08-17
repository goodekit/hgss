import { z } from 'zod'
import { transl } from 'lib/util'

export const ShippingAddressSchema = z.object({
  fullName: z
    .string()
    .min(3, transl('validation.min_default', { field: 'fullName', value: 3 }))
    .max(50, transl('validation.max_default', { field: 'fullName', value: 50 })),
  address      : z.string().optional(),
  streetAddress: z.string().min(1, transl('validation.required_default', { field: 'Address' })),
  city         : z.string().min(1, transl('validation.required_default', { field: 'City' })),
  postalCode   : z.string().min(1, transl('validation.required_default', { field: 'postalCode' })),
  country      : z.string().min(1, transl('validation.required_default', { field: 'Country' })),
  latitude     : z.string().optional(),
  longitude    : z.string().optional()
})

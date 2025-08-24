import { z } from 'zod'
import { transl } from 'lib/util'

export const ShippingAddressSchema = z.object({
  fullName: z
    .string()
    .min(3, transl('validation.min_default', { field: 'fullName', value: 3 }))
    .max(50, transl('validation.max_default', { field: 'fullName', value: 50 }))
    .optional(),
  address         : z.string().optional(),
  formattedAddress: z.string().min(5, transl(`validation.min_default`, { field: 'Formatted Address', value: 5 })),
  streetAddress   : z.string().optional(),
  city            : z.string().optional(),
  postalCode      : z.string().optional(),
  country         : z.string().min(1, transl('validation.required_default', { field: 'Country' })),
  latitude        : z.string().optional(),
  longitude       : z.string().optional()
})

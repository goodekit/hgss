import { transl } from 'lib/util'
import { z } from 'zod'
import { ShippingAddressSchema } from './shipping-schema'


export const UpdateUserSchema = z.object({
  name   : z.string().min(3, transl(`validation.min_default`, { field: 'Name', value: 3 })),
  email  : z.string().email(transl(`validation.required_default`, { field: 'Email' })),
  address: ShippingAddressSchema.optional()
  // address: z.union([ShippingAddressSchema.optional(), z.string()]).optional(),
})

export const UpdateUserAccountSchema = UpdateUserSchema.extend({
  id       : z.string().min(1, transl(`validation.required_default`, { field: 'Id' })),
  role     : z.string().min(1, transl(`validation.required_default`, { field: 'Role' })),
  avatar   : z.string().nullable(),
  updatedAt: z.date().nullable()
})

export const ForgotPasswordSchema = z.object({
  email: z.string().email(transl(`validation.required_default`, { field: 'Email' }))
})

export const UpdateUserPasswordSchema = z
  .object({
    oldPassword    : z.string().optional(),
    password       : z.string().min(6, transl('validation.min_default',  { field: 'Password', value: 6 })).optional(),
    confirmPassword: z.string().optional()
  })
  .refine(
    (data) => {
      if (data.password || data.confirmPassword || data.oldPassword) {
        return data.password === data.confirmPassword
      }
      return true
    },
    { message: transl('validation.password.not_match'), path: ['confirmPassword'] }
  )

export const ResetPasswordSchema = z
  .object({
    token          : z.string().min(1, transl('validation.required_default', { field: 'Token' })),
    email          : z.string().email(transl('validation.invalid_email_format')),
    password       : z.string().min(6, transl('validation.min_default', { field: 'Password', value: 6 })),
    confirmPassword: z.string().min(6, transl('validation.min_default', { field: 'Password', value: 6 }))
  })
  .refine((data) => data.password === data.confirmPassword, { message: transl('validation.password.not_match'), path: ['confirmPassword'] })
import { z } from 'zod'

export const UpdateUserSchema = z.object({
  name : z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().min(3, 'Email must be at least 3 characters')
})

export const UpdateUserAccountSchema = UpdateUserSchema.extend({
  id       : z.string().min(1, 'User id must be at least 1 character'),
  role     : z.string().min(1, 'Role is required'),
  avatar   : z.string().nullable(),
  updatedAt: z.date().nullable()
})

export const ForgotPasswordSchema = z.object({
  email: z.string().email().min(5, 'Email must be at least 5 characters')
})

export const ResetPasswordSchema = z
  .object({
    token          : z.string().min(1, 'Token is required'),
    email          : z.string().email().min(5, 'Email must be at least 5 characters'),
    password       : z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters')
  })
  .refine((data) => data.password === data.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] })
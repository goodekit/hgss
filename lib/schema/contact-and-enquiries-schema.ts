import { z } from 'zod'

export const ContactAndEnquiriesSchema = z.object({
  name   : z.string().min(3, 'Name must be at least 3 characters').max(255),
  email  : z.string().email().min(5, 'Email must be at least 5 characters'),
  message: z.string().max(500, 'Message cannot exceed 500 characters')
})
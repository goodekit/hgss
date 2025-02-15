import { z } from 'zod'

export const ContactMessageSchema = z.object({
  name          : z.string().min(3, 'Name must be at least 3 characters').max(255),
  email         : z.string().min(3, 'Email must be at least 3 characters'),
  message       : z.string().min(3, 'Slug must be at least 5 characters').max(255)
})
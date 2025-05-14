import { z } from 'zod'

export const GalleryItemSchema = z.object({
  title      : z.string(),
  description: z.string().min(1, 'Slug is required'),
  image      : z.string().min(1, 'Image is required'),
})

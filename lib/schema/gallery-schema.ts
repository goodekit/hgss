import { z } from 'zod'

export const GalleryItemSchema = z.object({
  title      : z.string().min(3, 'Title is required'),
  description: z.string(),
  image      : z.string().min(1, 'Image is required'),
  galleryId  : z.string()
})

export const GallerySchema = z.object({
  title       : z.string().min(3, 'Title is required'),
  description : z.string(),
  cover       : z.string(),
  galleryItems: z.array(GalleryItemSchema).min(1, 'At least one gallery item is required')
})

export const UpdateGalleryItemSchema = GalleryItemSchema.extend({
  id: z.string().optional()
})

export const UpdateGallerySchema = GallerySchema.extend({
  id          : z.string().optional(),
  galleryItems: z.array(UpdateGalleryItemSchema)
})

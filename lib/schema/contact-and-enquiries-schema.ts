import { GLOBAL } from 'hgss'
import { z } from 'zod'
import { Attachment } from 'resend'
import { transl } from 'lib/util'

export const AttachmentSchema = z.object({
  path       : z.string().regex(new RegExp(`\\.(${GLOBAL.AWS.IMAGE_TYPES_ALLOWED.join('|')})$`, 'i'), transl('error.images_allowed')),
  filename   : z.string().optional(),
  contentType: z.string().optional(),
  content    : z.union([z.string(), z.instanceof(Buffer)]).optional()
}) satisfies z.ZodType<Attachment>

export const ContactAndEnquiriesSchema = z.object({
  name       : z.string().min(3, 'Name must be at least 3 characters').max(255),
  email      : z.string().email().min(5, 'Email must be at least 5 characters'),
  message    : z.string().min(5, transl('validation.min_default', { field: 'Message', value: 5 })).max(500, 'Message cannot exceed 500 characters'),
  attachments: z.array(z.string().url()).max(GLOBAL.LIMIT.MAX_IMAGE_ATTACHMENT_ENQUIRY, `Max ${GLOBAL.LIMIT.MAX_IMAGE_ATTACHMENT_ENQUIRY} images allowed`).optional()
})
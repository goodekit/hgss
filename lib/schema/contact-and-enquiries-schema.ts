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
  name       : z.string().min(3, transl('validation.min_default', { field: 'Name', value: 3 })).max(255, transl('validation.max_default', { field: 'Name', value: 255 })),
  email      : z.string().email(transl('validation.required_default', { field: 'Email' })),
  message    : z.string().min(5, transl('validation.min_default', { field: 'Message', value: 5 })).max(1000, transl('validation.max_default', { field: 'Message', value: 1000 })),
  attachments: z.array(z.string().url()).max(GLOBAL.LIMIT.MAX_IMAGE_ATTACHMENT_ENQUIRY, `Max ${GLOBAL.LIMIT.MAX_IMAGE_ATTACHMENT_ENQUIRY} images allowed`).optional(),
  __submitted: z.boolean().default(false),
})
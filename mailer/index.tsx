import { Attachment, Resend } from 'resend'
import { GLOBAL } from 'hgss'
import axios from 'axios'
import { transl } from 'lib/util'
import ContactAndEnquiryEmail from './contact-and-enquiry'
import PurchaseReceiptEmail from './purchase-receipt'
import ResetPasswordEmail from './send-password-reset'

const resend = new Resend(GLOBAL.RESEND.RESEND_API_KEY as string)

async function _prepAttachments(urls: string[]): Promise<Attachment[]> {
  const results: Attachment[] = []
  for (const _url of urls) {
    const res      = await axios.get<ArrayBuffer>(_url, { responseType: 'arraybuffer' })
    const buffer   = Buffer.from(res.data)
    const filename = _url.split('/').pop() || 'attachment'
    results.push({ filename, content: buffer.toString('base64')})
  }
  return results
}

export const sendPurchaseReceipt = async ({ order }: { order: Order }) => {
   try {
      await resend.emails.send({
       from   : `${GLOBAL.APP_NAME} <${GLOBAL.RESEND.SENDER_EMAIL}>`,
       to     : order.user.email,
       subject: `Order Confirmation ${order.id}`,
       react  : <PurchaseReceiptEmail order={order} />
     })
   } catch (error) {
     console.error(transl('error.send_email'), error)
   }
}

export const sendResetPasswordLink = async ({ resetLink, userEmail }: { resetLink: string, userEmail: string }) => {
  const year = new Date().getFullYear()
   try {
      await resend.emails.send({
        from   : `${GLOBAL.APP_NAME} <${GLOBAL.RESEND.SENDER_EMAIL}>`,
        to     : userEmail,
        subject: transl('smtp.reset_password.subject'),
        react  : <ResetPasswordEmail year={year} resetLink={resetLink} siteName={GLOBAL.APP_NAME} />
      })
   } catch (error) {
     console.error(transl('error.send_email'), error)
   }
}

export const sendContactAndEnquiry = async ({ userEmail, name, message, attachments }: { userEmail: string, name: string, message: string, attachments: string[] | undefined }) => {
  const year              = new Date().getFullYear()
  const resendAttachments = attachments?.length ? await _prepAttachments(attachments as string[]) : undefined
  const currentDate       = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
  try {
      const email = await resend.emails.send({
        from       : `${GLOBAL.APP_NAME} <${GLOBAL.RESEND.CONTACT_AND_ENQUIRY_SENDER_EMAIL}>`,
        to         : `Ask <${GLOBAL.RESEND.CONTACT_AND_ENQUIRY_RECEIVER_EMAIL}>`,
        replyTo    : userEmail,
        subject    : transl('smtp.contact_and_enquiry.subject', { name }),
        react      : <ContactAndEnquiryEmail appName={GLOBAL.APP_NAME} name={name} message={message} currentDate={currentDate} year={year} siteName={GLOBAL.APP_NAME} />,
        attachments: resendAttachments
      })
      return email
  } catch (error) {
    console.error(transl('error.send_email'), error)
    throw new Error(`Failed to send contact and enquiry: ${error}`)
  }
}
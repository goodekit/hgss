import { GLOBAL } from 'hgss'
import { NextResponse } from 'next/server'
import { auth } from 'auth'
import { prisma } from 'db'
import { ContactAndEnquiriesSchema } from "lib/schema"
import { SystemLogger } from 'lib/app-logger'
import { CODE, transl } from 'lib'
import { sendContactAndEnquiry } from 'mailer'

export async function POST(req: Request) {
    const TAG                           = 'contact/POST'
    const body: CreateContactAndEnquiry = await req.json()
    const session                       = await auth()
    const userId                        = session?.user?.id

    if (!userId) {
        return NextResponse.json({ error: 'Unauthenticated' }, { status: CODE.UNAUTHORIZED })
    }

    const result = ContactAndEnquiriesSchema.safeParse(body)

    if (!result.success) {
        return NextResponse.json({ error: 'Invalid input' }, { status: CODE.BAD_REQUEST })
    }

    const { name, email, message, attachments } = result.data

    const userEnquiries = await prisma.user.findUnique({ where: { id: userId }, select: { ContactAndEnquiry: true } })
    const earliest      = await prisma.contactAndEnquiry.findFirst({ orderBy: { createdAt: 'asc' }})
    if (userEnquiries && (userEnquiries?.ContactAndEnquiry?.length >= GLOBAL.LIMIT.MAX_ALLOWED_ENQUIRY)) {
        let timeLeft
            if (earliest?.createdAt) {
            const now         = new Date()
            const createdAt   = new Date(earliest?.createdAt)
            const remainingMs = GLOBAL.LIMIT.WAIT_TIME_ENQUIRY - (now.getTime() - createdAt.getTime())
            if (remainingMs <= 0) {
                const hrsLeft  = Math.floor(remainingMs / (1000 * 60 * 60))
                const minLeft  = Math.floor((remainingMs / (1000 * 60)) % 60)
                      timeLeft = `${hrsLeft}h ${minLeft}m left`
                throw new Error(transl('error.enquiries_max_limit', { time: timeLeft }))
            }
        }
    }

    if (attachments?.length) {
        for (const url of attachments) {
            const allowedImageExtensions = GLOBAL.AWS.IMAGE_TYPES_ALLOWED.join('|')
            const imageRegex             = new RegExp(`\\.(${allowedImageExtensions})$`, 'i')
            if (!imageRegex.test(url)) {
              return NextResponse.json({ error: transl('error.images_allowed') })
            }
        }
    }

    // TODO: rhf dropzone should not upload the photo until form is submitted

    await prisma.contactAndEnquiry.create({ data: { name, email, message, userId, attachments }})
    const newContactAndEnquiry = await sendContactAndEnquiry({ userEmail: email, name, message, attachments })

    if (newContactAndEnquiry && 'error' in newContactAndEnquiry && newContactAndEnquiry.error) {
      return NextResponse.json({ error: `Failed to send email [${TAG}]: ${newContactAndEnquiry.error.message}`})
    }

    return NextResponse.json(SystemLogger.response(transl('success.contact_and_enquiry_sent'), CODE.CREATED, 'contact/POST'))
}
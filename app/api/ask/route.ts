import { GLOBAL } from 'hgss'
import { NextResponse } from 'next/server'
import redis from 'lib/redis'
import { auth } from 'auth'
import { prisma } from 'db'
import { ContactAndEnquiriesSchema } from "lib/schema"
import { SystemLogger } from 'lib/app-logger'
import { sendContactAndEnquiry } from 'mailer'
import { CODE, transl } from 'lib'
import { CACHE_KEY } from 'config/cache.config'

export async function POST(req: Request) {
    const TAG                           = 'contact/POST'
    const body: CreateContactAndEnquiry = await req.json()
    const session                       = await auth()
    const userId                        = session?.user?.id

    const result = ContactAndEnquiriesSchema.safeParse(body)

    if (!result.success) {
        return NextResponse.json({ error: transl('error.invalid_input') }, { status: CODE.BAD_REQUEST })
    }

    const { name, email, message, attachments } = result.data

    if (userId) {
        const oneMonthAgo = new Date()
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

        const earliest             = await prisma.contactAndEnquiry.findFirst({ where: { email, createdAt: { gte: oneMonthAgo } }, orderBy: { createdAt: 'asc' } })
        const enquiriesInThisMonth = await prisma.contactAndEnquiry.count({ where: { email, createdAt: { gte: oneMonthAgo }} })

        if (enquiriesInThisMonth >= GLOBAL.LIMIT.MAX_ALLOWED_ENQUIRY) {
                if (earliest?.createdAt) {
                const now         = new Date()
                const remainingMs = GLOBAL.LIMIT.WAIT_TIME_ENQUIRY - (now.getTime() - earliest.createdAt.getTime())
                if (remainingMs > 0) {
                    const minLeft  = Math.floor((remainingMs / (1000 * 60)) % 60)
                    const daysLeft = Math.floor(Math.floor(remainingMs / (1000 * 60 * 60)) / 24)
                    const hrsLeft  = Math.ceil(remainingMs / (1000 * 60 * 60) / 24 - daysLeft)
                    const timeLeft = `${daysLeft}d ${hrsLeft}h ${minLeft}m left`
                    return NextResponse.json({ error: transl('error.enquiries_max_limit', { time: timeLeft }) }, { status: CODE.TOO_MANY_REQUESTS })
                }
            }
        }
    } else {
        const ip    = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
        const key   = CACHE_KEY.enquiriesLimit(ip)
        const count = await redis.incr(key)
        if (count === 1) {
            await redis.expire(key, 3600)
        }

        if (count > GLOBAL.LIMIT.MAX_ALLOWED_ENQUIRY) {
            return NextResponse.json({ error: transl('error.enquiries_max_limit') }, { status: CODE.TOO_MANY_REQUESTS })
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

    await prisma.contactAndEnquiry.create({ data: { name, email, message, userId: userId && userId, attachments }})
    const newContactAndEnquiry = await sendContactAndEnquiry({ userEmail: email, name, message, attachments })

    if (newContactAndEnquiry && 'error' in newContactAndEnquiry && newContactAndEnquiry.error) {
      return NextResponse.json({ error: `Failed to send email [${TAG}]: ${newContactAndEnquiry.error.message}`})
    }

    return NextResponse.json(SystemLogger.response(transl('success.contact_and_enquiry_sent'), CODE.CREATED, 'contact/POST'))
}
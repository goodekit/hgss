import { FC } from 'react'
import { GLOBAL } from 'hgss'
import { PATH_DIR, ASSET_DIR } from 'hgss-dir'
import { notFound, redirect } from 'next/navigation'
import Stripe from 'stripe'
import Image from 'next/image'
import { getOrderById } from 'lib/action'
import { LinkBtn } from 'component/shared'
import { transl } from 'lib'

const stripe = new Stripe(GLOBAL.STRIPE.STRIPE_SECRET_KEY)

interface SuccessPageProps {
    params      : Promise<{ id: string }>
    searchParams: Promise<{ payment_intent: string }>
}

const SuccessPage: FC<SuccessPageProps> = async ({ params, searchParams }) => {
    const { id }                              = await params
    const { payment_intent: paymentIntentId } = await searchParams

    const order = await getOrderById(id)
    if (!order) notFound()

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.metadata.orderId == null || paymentIntent.metadata.orderId !== order.id.toString()) {
        return notFound()
    }

    const isSuccess = paymentIntent.status === 'succeeded'
    if (!isSuccess) {
        return redirect(PATH_DIR.ORDER_VIEW(id))
    }

    return (
        <div className={"flex flex-col items-center justify-center min-h-screen"}>
            <Image src={ASSET_DIR.LOGO} width={80} height={80} alt="logo" priority />
            <div className={"p-6 w-1/2 space-y-4 text-center"}>
                <h1 className={"h1-bold"}>{transl('message.thanks_for_purchase.title')}</h1>
                <div>{transl('message.thanks_for_purchase.description')}</div>
                <LinkBtn variant={'secondary'} href={PATH_DIR.ORDER_VIEW(id)}>{transl('view_order.label')}</LinkBtn>
            </div>
        </div>
    )
}

export default SuccessPage
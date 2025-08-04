import { FC } from 'react'
import { Metadata } from 'next'
import { en } from 'public/locale'
import { GLOBAL } from 'hgss'
import { notFound } from 'next/navigation'
import { auth } from 'auth'
import Stripe from 'stripe'
import { STRIPE } from 'lib/schema'
import { getOrderById } from 'lib/action'
import { KEY } from 'lib'
import OrderViewTable from './order-view-table'

export const metadata: Metadata = { title: en.order_overview.label }

interface OrderViewPageProps {
  params: Promise<{ id: string }>
}

const OrderViewPage: FC<OrderViewPageProps> = async ({ params }) => {
  const { id } = await params
  const order = await getOrderById(id)
  if (!order) notFound()

  const session       = await auth()
  const isAdmin       = session?.user?.role === KEY.ADMIN
  let   client_secret = null

  if (order.paymentMethod === STRIPE && !order.isPaid) {
    const stripe = new Stripe(GLOBAL.STRIPE.STRIPE_SECRET_KEY as string)
    const customer = await stripe.customers.create({ email: order.user.email, metadata: { orderId: order.id } })
    try {
       const paymentIntent = await stripe.paymentIntents.create({
         amount                   : Math.round(Number(order.totalPrice) * 100),
         currency                 : GLOBAL.PRICES.CURRENCY,
         receipt_email            : order.user.email,
         customer                 : customer.id,
         metadata                 : { orderId: order.id },
         automatic_payment_methods: { enabled: true }
       })
       client_secret = paymentIntent.client_secret
    } catch (error) {
      console.error('Error creating PaymentIntent: ', error)
    }
  }

  return (
    <div>
      <OrderViewTable isAdmin={isAdmin} order={order} paypalClientId={GLOBAL.PAYPAL.PAYPAL_CLIENT_ID} stripeClientSecret={client_secret}  />
    </div>
  )
}

export default OrderViewPage

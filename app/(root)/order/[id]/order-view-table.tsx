'use client'

import { FC, Fragment } from 'react'
import { en } from 'public/locale'
import { GLOBAL } from 'hgss'
import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { createPayPalOrder, approvePayPalOrder } from 'lib/action'
import { PAYPAL, STRIPE } from 'lib/schema'
import { useToast } from 'hook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { faPaypal, faStripe } from '@fortawesome/free-brands-svg-icons'
import { Badge, Separator } from 'component/ui'
import { PriceSummaryCard } from 'component/shared/card'
import { BackBtn, MarkDeliveredBtn, TapeBtn, } from 'component/shared/btn'
import { parseAddress, toCents } from 'lib/util'
import OrderViewCard from './order-view-card'
import StripePayment from './stripe-payment'

interface OrderViewTableProps {
  order              : Omit<Order, 'paymentResult'>
  paypalClientId     : string
  isAdmin            : boolean
  stripeClientSecret : string | null
}
const OrderViewTable: FC<OrderViewTableProps> = ({ order, isAdmin,  paypalClientId, stripeClientSecret }) => {
  const { orderitems, shippingAddress, paymentMethod, isDelivered, deliveredAt,  isPaid, paidAt } = order
  const { toast } = useToast()

  const PrintPendingState = () => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer()
    let status
    if (isPending) {
      status = <TapeBtn disabled={isPending} label={en.loading.processing} />
    } else if (isRejected) {
      status = <TapeBtn disabled label={en.error.paypal_default} />
    }
    return status
  }

  const isPayPal         = paymentMethod === PAYPAL
  const isStripe         = paymentMethod === STRIPE

  const handleCreatePayPalOrder = async () => {
    const response = await createPayPalOrder(order.id)
    if (!response.success) {
      toast({ variant: 'destructive',  description: response.message })
    }
    return response.data as string
  }

  const handleApprovePayPalOrder = async (data: { orderID: string }) => {
    const response = await approvePayPalOrder(order.id, data)
    toast({ variant: response.success ? 'default' : 'destructive', description: response.message })
  }

  return (
    <Fragment>
        {/* title and order id */}
     <BackBtn />
      <div className="flex flex-row items-center justify-start gap-4">
          <h1 className={'py-4 h3-bold'}>{en.order.label}</h1>
          <span>
            <Badge variant={'secondary'} className={'special-elite'}>{order.id}</Badge>
          </span>
      </div>
      {/* cards  */}
      <div className="grid md:grid-cols-3 md:gap-5 grid-cols-1 sm:gap-0 special-elite">
        <div className="col-span-2 space-y-4 overflow-x-auto">
          {/* payment method card */}
          <OrderViewCard
            title={en.payment_method.label}
            subtitle={paymentMethod}
            badgeCondition={isPaid}
            badgeLabel={en.paid_at.label}
            dateAt={paidAt!}
            notBadgeLabel={en.not_paid.label}
            icon={<FontAwesomeIcon icon={isPayPal ? faPaypal : isStripe ? faStripe : faMoneyBill } className={isPayPal ? 'text-blue-700' : isStripe ? 'text-blue-700' : 'text-green-900'}  />}
          />

          {/* payment method card */}
          <OrderViewCard
            title={en.shipping_address.label}
            subtitle={shippingAddress.fullName}
            subtitle2={parseAddress(shippingAddress)}
            badgeCondition={isDelivered}
            badgeLabel={en.delivered_at.label}
            dateAt={deliveredAt!}
            notBadgeLabel={en.not_delivered.label}
          />

          {/* order items card */}
          <OrderViewCard title={en.order_items.label} orderItems={orderitems} showTable />
        </div>
        {/* prices summary */}
        <div className="mt-4">
          <PriceSummaryCard prices={order} >
          {!isPaid && (
            <Fragment>
             <Separator/>
              <div className={'text-lg font-bold flex items-center'}>{en.checkout.label}</div>
            </Fragment>
            )}
            {!isPaid && isPayPal && (
              <div>
                <PayPalScriptProvider options={{ clientId: paypalClientId, currency: GLOBAL.PRICES.CURRENCY }}>
                  <PrintPendingState/>
                  <PayPalButtons createOrder={handleCreatePayPalOrder} onApprove={handleApprovePayPalOrder}  style={{ layout: "vertical", color: "blue", shape: "sharp", tagline: false }} />
                </PayPalScriptProvider>
              </div>
            )}
            {isStripe && !isPaid && stripeClientSecret && <StripePayment priceInCents={toCents(order.totalPrice)} orderId={order.id} clientSecret={stripeClientSecret} />}
            {isAdmin && isPaid  && !isDelivered && <MarkDeliveredBtn orderId={order.id} />}
          </PriceSummaryCard>
        </div>
      </div>
    </Fragment>
  )
}

export default OrderViewTable

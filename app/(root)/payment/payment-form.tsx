'use client'

import { FC, Fragment, useTransition, useState } from 'react'
import { en } from 'public/locale'
import { GLOBAL } from 'hgss'
import { PATH_DIR } from 'hgss-dir'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useToast } from 'hook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaypal, faStripeS } from '@fortawesome/free-brands-svg-icons'
import { PAYMENT_METHODS, PaymentMethodSchema, PAYPAL, STRIPE } from 'lib/schema'
import { updateUserPaymentMethod } from 'lib/action'
import { Form } from 'component/ui'
import { TapeBtn } from 'component/shared/btn'
import { EllipsisLoader } from 'component/shared/loader'

interface PaymentMethodFormProps {
  paymentMethod: string | null
}

const PaymentForm: FC<PaymentMethodFormProps> = ({ paymentMethod }) => {
  const [loadingMethod, setLoadingMethod] = useState<string | null>(null)
  const [isPending, startTransition]      = useTransition()
  const router                            = useRouter()
  const { toast }                         = useToast()
  const form                              = useForm<z.infer<typeof PaymentMethodSchema>>({
    resolver     : zodResolver(PaymentMethodSchema),
    defaultValues: { type: paymentMethod || GLOBAL.PAYMENT_METHOD_DEFAULT }
  })

  const { handleSubmit } = form


  const handleButtonClick = (method: string) => {
    setLoadingMethod(method)
    form.setValue('type', method)
  }

  const onSubmit = async (data: z.infer<typeof PaymentMethodSchema>) => {
    startTransition(async () => {
      const response = await updateUserPaymentMethod(data)
      if (!response.success) {
        toast({ variant: "destructive", description: response.message })
        return
      }
      router.push(PATH_DIR.CHECKOUT)
    })
  }

  const renderPaymentMethodIcon = (method: string) => {
    switch (method) {
      case PAYPAL:
        return <FontAwesomeIcon icon={faPaypal} className={'text-blue-600 w-5'} />
      case STRIPE:
        return <FontAwesomeIcon icon={faStripeS} className={'text-purple-700 w-5'} />
    }
  }

  return (
    <Fragment>
      <div className="max-w-md mx-auto space-y-4 items-center">
        <h1 className="h2-bold my-2">{en.payment_method.label}</h1>
        <p className="text-sm text-muted-foreground">{en.payment_method.description}</p>
        <Form {...form}>
          <form method={'post'} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {PAYMENT_METHODS.map((_method, index) => (
              <TapeBtn key={index} label={loadingMethod === _method && isPending ? <EllipsisLoader />  : <Fragment>{_method} {renderPaymentMethodIcon(_method)}</Fragment>} type={'submit'}className={`btn btn-primary w-full`}  onClick={() => handleButtonClick(_method)}  />
            ))}
          </form>
        </Form>
      </div>
    </Fragment>
  )
}

export default PaymentForm

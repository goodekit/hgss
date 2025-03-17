'use client'

import { FormEvent, Fragment } from 'react'
import { en } from 'public/locale'
import { useRouter } from 'next/navigation'
import { useFormStatus } from 'react-dom'
import { createOrder } from 'lib/action'
import { TapeBtn } from 'component/shared/btn'
import { EllipsisLoader } from 'component/shared/loader'

const CheckoutForm = () => {
  const router = useRouter()
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const { redirectTo } = await createOrder()

    if (redirectTo) router.push(redirectTo)
  }
  const CheckoutButton = () => {
    const { pending } = useFormStatus()
    return (
      <TapeBtn
        label={
          <Fragment>
            {pending ? <div className={'flex justify-center'}><i>{en.place_order.pending}</i><span><EllipsisLoader /></span></div> : en.place_order.label}
          </Fragment>
        }
        disabled={pending}
        className={'w-full texture-3-bg'}
        textSize={'text-lg'}
      />
    )
  }
  return (
    <form onSubmit={handleSubmit} className={'w-full'}>
      <CheckoutButton />
    </form>
  )
}

export default CheckoutForm

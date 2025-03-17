import { FC, FormEvent, useState } from 'react'
import { en } from 'public/locale'
import { GLOBAL } from 'hgss'
import { PATH_DIR } from 'hgss-dir'
import { useTheme } from 'next-themes'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { TapeBtn } from 'component/shared/btn'
import { formatCurrency, themeToggle } from 'lib/util'

interface StripePaymentProps {
  priceInCents: number
  orderId     : string
  clientSecret: string
}

const StripePayment: FC<StripePaymentProps> = ({ priceInCents, orderId, clientSecret }) => {
  const stripePromise          = loadStripe(GLOBAL.STRIPE.STRIPE_PUBLISHABLE_KEY)
  const { theme, systemTheme } = useTheme()
  const THEME                  = themeToggle(theme, systemTheme)

  const StripeForm = () => {
    const [loading, setLoading]           = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [email, setEmail]               = useState('')
    const stripe                          = useStripe()
    const elements                        = useElements()

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        if (stripe == null || elements == null || email == null) return
        setLoading(true)
        stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: PATH_DIR.STRIPE_CALLBACK(orderId),
            }
        }).then(({ error }) => {
            if (error?.type === 'card_error' || error?.type === 'validation_error') {
                setErrorMessage(error?.message ?? en.error.unknown_error)
            } else {
                setErrorMessage(en.error.unknown_error)
            }
        }).finally(() => setLoading(false))
    }

    return (
      <form className={'space-y-4'} onSubmit={handleSubmit}>
        {errorMessage && <div className={'text-destructive'}>{errorMessage}</div>}
        <PaymentElement />
        <div>
            <LinkAuthenticationElement onChange={(e) => setEmail(e.value.email)}/>
        </div>
        <TapeBtn textSize={'text-lg'} className={'texture-3-bg'}  disabled={stripe === null || elements === null || loading} label={loading ? en.loading.processing : `${en.purchase.label} ${formatCurrency(priceInCents / 100)}`}/>
      </form>
    )
  }

  return (
    <Elements options={{ clientSecret, appearance: { theme: THEME } }} stripe={stripePromise}>
      <StripeForm />
    </Elements>
  )
}

export default StripePayment

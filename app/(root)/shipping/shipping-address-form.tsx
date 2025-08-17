/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { FC, Fragment, useEffect, useState, useTransition } from 'react'
import { PATH_DIR } from 'hgss-dir'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useToast } from 'hook'
import { updateUserAddress } from 'lib/action'
import { ShippingAddressSchema, shippingAddressDefaultValue } from 'lib/schema'
import { Form } from 'component/ui/form'
import { Button } from 'component/ui'
import { RHFFormField, RHFGoogleAddressAutocomplete, RHFFormCountrySelect } from 'component/shared/rhf'
import { TapeBtn } from 'component/shared/btn'
import { EllipsisLoader } from 'component/shared/loader'
import { transl } from 'lib'

interface ShippingAddressFormProps { address: ShippingAddress, userName?: string }

const ShippingAddressForm: FC<ShippingAddressFormProps> = ({ address, userName }) => {
  const [isPending, startTransition]          = useTransition()
  const [isEdit, setIsEditMode]               = useState(() => !address)
  const [isAddressActive, setIsAddressActive] = useState(false)
  const form                                  = useForm<z.infer<typeof ShippingAddressSchema>>({
    resolver     : zodResolver(ShippingAddressSchema),
    defaultValues: address || shippingAddressDefaultValue
  })

  const router                                           = useRouter()
  const { toast }                                        = useToast()
  const { control, handleSubmit, formState: { errors } } = form
  const selectedCountry                                  = form.watch('country')

  useEffect(() => {
    if (Object.keys(errors).length > 0 && !address) {
      setIsEditMode(true)
    }
  },[errors, address])


  const handleEditToggle = () => {
    setIsEditMode(!isEdit)
  }

  const handleOnBlur = () => {
    const value = form.getValues('address')
    if (value && value.length > 0) {
      setIsAddressActive(true)
    } else {
      setIsAddressActive(false)
    }
  }

  const handleContinue = () => {
    router.push(PATH_DIR.PAYMENT)
  }

  const handleUpdateAddress: SubmitHandler<ShippingAddress> = async (data) => {
    startTransition(async () => {
      const response = await updateUserAddress(data)
      if (!response.success) {
        toast({ variant: 'destructive', description: response.message })
        return
      }
      form.reset(response.data as ShippingAddress)
      setIsEditMode(false)
    })
  }

  const onSubmit: SubmitHandler<ShippingAddress> = async (data) => {
    startTransition(async () => {
      const response = await updateUserAddress(data)
      if (!response.success) {
        toast({ variant: 'destructive', description: response.message })
        return
      }
      router.push(PATH_DIR.PAYMENT)
    })
  }

  return (
    <Fragment>
      <div className={'max-w-md mx-auto special-elite space-y-5'}>
        <h1 className={'h2-bold mt-4'}>{transl('shipping_address.label')}</h1>
        <div className={'flex justify-between items-center'}>
          <p className={'text-sm text-muted-foreground'}>{isEdit ? transl('shipping_address.description') : transl('form.ship_to.label')}</p>

        </div>
        <Form {...form}>
          <form method={'post'} onSubmit={handleSubmit(isEdit ? onSubmit : handleContinue)} className={'space-y-5'}>
            {isEdit && (
              <Fragment>
                <RHFFormField control={control} name={'fullName'} formKey={'full_name'} />
                <RHFFormCountrySelect control={control} name={'country'} formKey={'country'} />
                <RHFGoogleAddressAutocomplete control={control} name={'address'} label={'Search your address'} country={selectedCountry} fullName={userName} onBlur={handleOnBlur} onChange={() => setIsAddressActive(true)} />
              </Fragment>
            )}
            {(isEdit && isAddressActive) && <Button type={'button'} variant={'ghost'} onClick={handleSubmit(handleUpdateAddress)} className={'rounded-lg transition ease-in-out'}>{'Save this address'}</Button>}
            {!isEdit &&(
              <Fragment>
                <RHFFormField control={control} name={'address'} formKey={'address'} type={'textarea'} className={'h-auto md:h-50'} disabled />
                <Button type={'button'} variant={'ghost'} onClick={handleEditToggle} className={'rounded-lg transition ease-in-out'}>{'Use a different address'}</Button>
              </Fragment>)}

            <TapeBtn label={isPending ? <EllipsisLoader /> : isEdit ? transl('save_and_continue.label') : transl('continue.label')} className={'w-full texture-4-bg'} />
          </form>
        </Form>
      </div>
    </Fragment>
  )
}

export default ShippingAddressForm

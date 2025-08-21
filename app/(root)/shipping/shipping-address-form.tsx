/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { FC, Fragment, useEffect, useState, useTransition } from 'react'
import { PATH_DIR } from 'hgss-dir'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler, useWatch } from 'react-hook-form'
import { useToast } from 'hook'
import { updateUserAddress } from 'lib/action'
import { ShippingAddressSchema, shippingAddressDefaultValue } from 'lib/schema'
import { Form } from 'component/ui/form'
import { Button, Textarea } from 'component/ui'
import { RHFFormField, RHFGoogleAddressAutocomplete, RHFFormCountrySelect } from 'component/shared/rhf'
import { TapeBtn } from 'component/shared/btn'
import { EllipsisLoader } from 'component/shared/loader'
import { transl } from 'lib'

interface ShippingAddressFormProps { address?: unknown, userName?: string }

const ShippingAddressForm: FC<ShippingAddressFormProps> = ({ address, userName }) => {
  const searchParams                          = useSearchParams()
  const forceEdit                             = searchParams.get('edit') === 'true'
  const [isPending, startTransition]          = useTransition()
  const [isEditMode, setIsEditMode]           = useState(() => forceEdit || !address)
  const [isAddressActive, setIsAddressActive] = useState(false)
  const form                                  = useForm<ShippingAddress>({
    resolver     : zodResolver(ShippingAddressSchema),
    defaultValues: address || shippingAddressDefaultValue
  })

  const router       = useRouter()
  const { toast }    = useToast()


   const [fullName, formattedAddress, selectedCountry] = useWatch({
    control: form.control,
    name   : ['fullName', 'formattedAddress', 'country']
  })

  const { control, handleSubmit, formState: { errors } } = form

  useEffect(() => {
    if (Object.keys(errors).length > 0 && !address) {
      setIsEditMode(true)
    }
  },[errors, address])

  useEffect(() => {
    if (address) {
      form.reset(address as ShippingAddress, { keepDefaultValues: false })
    }
  }, [address, form])

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode)
  }

  const handleOnBlur = () => {
    const value = form.getValues('formattedAddress')
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
      form.reset(response.data as ShippingAddress, { keepDefaultValues: false })
      const isValid = await form.trigger()
      if (isValid) {
        setIsEditMode(false)
      } else {
        toast({ variant: 'destructive', description: transl(`error.clear_form_errors`) })
      }
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
          <p className={'text-sm text-muted-foreground'}>{isEditMode ? transl('shipping_address.description') : transl('form.ship_to.label')}</p>
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit(isEditMode ? onSubmit : handleContinue)} className={'space-y-5'}>
            {isEditMode && (
              <Fragment>
                <RHFFormField control={control} name={'fullName'} formKey={'full_name'} />
                <RHFFormCountrySelect control={control} name={'country'} formKey={'country'} />
                <RHFGoogleAddressAutocomplete control={control} name={'formattedAddress'} label={transl(`form.address.label`)} country={selectedCountry} fullName={userName} onBlur={handleOnBlur} onChange={() => setIsAddressActive(true)} form={form} />
              </Fragment>
            )}
            {(isEditMode && isAddressActive) && <Button type={'button'} variant={'ghost'} onClick={handleSubmit(handleUpdateAddress)} className={'rounded-lg transition ease-in-out'}>{transl(`save_this_address.label`)}</Button>}
            {!isEditMode &&(
              <Fragment>
                <Textarea key={`${fullName || ''}|${formattedAddress || ''}|${selectedCountry || ''}`} defaultValue={[fullName, formattedAddress, selectedCountry].filter(Boolean).join(', ')} className={'h-auto md:h-50 border-none shadow-none'} readOnly disabled />
                <Button type={'button'} variant={'ghost'} onClick={handleEditToggle} className={'rounded-lg transition ease-in-out'}>{transl('use_different_address.label')}</Button>
              </Fragment>
            )}

            <TapeBtn label={isPending ? <EllipsisLoader /> : isEditMode ? transl('save_and_continue.label') : transl('continue.label')} className={'w-full texture-4-bg'} />
          </form>
        </Form>
      </div>
    </Fragment>
  )
}

export default ShippingAddressForm

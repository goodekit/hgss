'use client'

import { Fragment, useState, useTransition, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler, useWatch } from 'react-hook-form'
import { User as UserPrisma } from '@prisma/client'
import { useToast } from 'hook'
import { updateUserAccount } from 'lib/action'
import { UpdateUserSchema, userAccountUpdateDefaultValue } from 'lib/schema'
import { Button, Textarea } from 'component/ui'
import { Form } from 'component/ui/form'
import { RHFFormField, RHFGoogleAddressAutocomplete, RHFFormCountrySelect } from 'component/shared/rhf'
import { EllipsisLoader } from 'component/shared/loader'
import { TapeBtn } from 'component/shared/btn'
import { transl } from 'lib/util'

enum FORM_KEY {
  name    = 'name',
  email   = 'email',
  address = 'address'
}

const AccountForm = ({ user }: { user: UserPrisma }) => {
  const [isPending, startTransition] = useTransition()
  const [isEditMode, setIsEditMode]  = useState(() => !user?.address)
  const { data: session, update }    = useSession()
  const form                         = useForm<UpdateUser>({
    resolver     : zodResolver(UpdateUserSchema),
    defaultValues: userAccountUpdateDefaultValue(user) as never
  })

  const { toast }   = useToast()
  const { control } = form

  const [formattedAddress, selectedCountry] = useWatch({ control, name: ['address.formattedAddress', 'address.country'] })

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode)
  }

  const handleCancel = () => {
    form.reset()
    setIsEditMode(false)
  }

  useEffect(() => {
    if (user) {
      form.reset(user as User, { keepDefaultValues: false })
    }
  }, [user, form])

  const onSubmit: SubmitHandler<UpdateUser> = async (data) => {
    startTransition(async () => {
      const response = await updateUserAccount({ ...data, address: { ...data.address, formattedAddress: formattedAddress ?? data.address?.formattedAddress, country: selectedCountry ?? data.address?.country }})
      if (!response.success) {
        toast({ variant: 'destructive', description: response.message })
        return
      }
      const newSession = { ...session, user: { ...session?.user, name: data.name } }
      await update(newSession)

      const isValid = await form.trigger()
      form.reset(response.data ?? user, { keepDefaultValues: false })
      if (isValid) {
        setIsEditMode(false)
        toast({ description: transl('update_account.toast') })
      } else {
        toast({ variant: 'destructive', description: transl(`error.clear_form_errors`) })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={"space-y-5"}>
          <RHFFormField control={control} name={FORM_KEY.email} type={'input'} formKey={FORM_KEY.email} disabled />
          <RHFFormField control={control} name={FORM_KEY.name} type={'input'} formKey={FORM_KEY.name} />
          <Textarea key={`${formattedAddress || ''}|${selectedCountry || ''}`} defaultValue={[formattedAddress, selectedCountry].filter(Boolean).join(', ')} className={'h-auto md:h-50 border-none shadow-none'} readOnly disabled />
            {isEditMode && (
              <Fragment>
                <RHFFormCountrySelect control={control} name={`address.country`} formKey={'country'} />
                <RHFGoogleAddressAutocomplete control={control} name={`address.formattedAddress`} label={transl('form.address.label')} country={selectedCountry} form={form} />
                <Button type={'button'} variant={'ghost'} onClick={handleCancel} className={'rounded-sm transition ease-in-out px-0 place-content-start w-[100px]'}>{transl('cancel.label')}</Button>
              </Fragment>
            )}
            {!isEditMode && <Button type={'button'} variant={'ghost'} onClick={handleEditToggle} className={'hover:bg-transparent rounded-lg transition ease-in-out px-0 place-content-start w-[100px]'}>{transl('update_your_address.label')}</Button>}
            <div className={'relative'}>
              <TapeBtn type={'submit'} label={isPending ? <EllipsisLoader/> : transl('update_account.label')} className={'w-full texture-bg'} />
            </div>
        </div>
      </form>
    </Form>
  )
}

export default AccountForm

'use client'

import { Fragment, useState, useTransition } from 'react'
import { useSession } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { User as UserPrisma } from '@prisma/client'
import { useToast } from 'hook'
import { updateUserAccount } from 'lib/action'
import { UpdateUserSchema, userAccountUpdateDefaultValue } from 'lib/schema'
import { Button } from 'component/ui'
import { RHFFormField, RHFGoogleAddressAutocomplete } from 'component/shared/rhf'
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

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode)
  }

  const onSubmit: SubmitHandler<UpdateUser> = async (data) => {
    startTransition(async (): Promise<void> => {
      const response = await updateUserAccount(data)
      if (!response.success) {
        toast({ variant: 'destructive', description: response.message })
        return
      }
      const newSession = { ...session, user: { ...session?.user, name: data.name } }
      await update(newSession)
      toast({ description: transl('update_account.toast') })
      setIsEditMode(false)
    })
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={"space-y-5"}>
          <RHFFormField control={control} name={FORM_KEY.email} type={'input'} formKey={FORM_KEY.email} disabled />
          <RHFFormField control={control} name={FORM_KEY.name} type={'input'} formKey={FORM_KEY.name} />
          <RHFFormField control={control} name={'formattedAddress'} formKey={'address'} type={'textarea'} className={'h-auto md:h-30'} disabled />
            {isEditMode && (
              <Fragment>
                <RHFGoogleAddressAutocomplete control={control} name={FORM_KEY.address} label={transl('form.address.label')} country={'AU'} form={form} />
                <Button type={'button'} variant={'ghost'} onClick={handleEditToggle} className={'rounded-sm transition ease-in-out px-0 place-content-start w-[100px]'}>{transl('cancel.label')}</Button>
              </Fragment>
            )}
            {!isEditMode && <Button type={'button'} variant={'ghost'} onClick={handleEditToggle} className={'hover:bg-transparent rounded-lg transition ease-in-out px-0 place-content-start w-[100px]'}>{transl('update_your_address.label')}</Button>}
            <div className={'relative'}>
              <TapeBtn isPending={form.formState.isSubmitting} label={isPending ? <EllipsisLoader/> : transl('update_account.label')} className={'w-full texture-bg'} />
            </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default AccountForm

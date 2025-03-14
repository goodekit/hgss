'use client'

import { en } from 'public/locale'
import { useSession } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useToast } from 'hook'
import { updateUserAccount } from 'lib/action'
import { UpdateUserSchema } from 'lib/schema'
import { Form, Badge } from 'component/ui'
import { RHFFormField } from 'component/shared/rhf'
import { TapeBtn } from 'component/shared/btn'
import { formatDateTime } from 'lib/util'

enum FORM_KEY {
    name  = 'name',
    email = 'email'
}

const AccountForm = ({ user }: { user: { updatedAt: Date }  }) => {
  const { data: session, update } = useSession()
  const form                      = useForm<UpdateUser>({
    resolver     : zodResolver(UpdateUserSchema),
    defaultValues: { name: session?.user?.name ?? '', email: session?.user?.email ?? '' }
  })

  const { toast } = useToast()
  const { control } = form
  const onSubmit = async (values: UpdateUser) => {
    const response = await updateUserAccount(values)
    if (!response.success) {
        return toast({ variant: 'destructive', description: response.message })
    }
    const newSession = {...session, user: { ...session?.user, name: values.name }}
    await update(newSession)
    toast({ description: en.update_account.toast })

  }

  return (
    <Form {...form}>
      <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
                <RHFFormField control={control} name={FORM_KEY.email} type={'input'} formKey={FORM_KEY.email} disabled />
                <RHFFormField control={control} name={FORM_KEY.name} type={'input'} formKey={FORM_KEY.name} />
              <div className={'relative'}>
                <TapeBtn isPending={form.formState.isSubmitting} label={en.update_account.label} className={'w-full'} />
              <div className="flex justify-end align-center items-center gap-2 mt-5">
                <p className={'text-muted-foreground'}>{en.last_updated_at.label}</p><span><Badge variant={'outline'} className={'w-auto'}>{formatDateTime(user?.updatedAt).dateTime}</Badge></span>
              </div>
              </div>
          </div>
      </form>
    </Form>
  )
}

export default AccountForm

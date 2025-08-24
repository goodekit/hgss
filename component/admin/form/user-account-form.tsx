'use client'

import { GLOBAL } from 'hgss'
import { User as UserPrisma } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useToast } from 'hook'
import { Check } from 'lucide-react'
import { updateUserAccount } from 'lib/action'
import { userAccountUpdateDefaultValue, UpdateUserSchema } from 'lib/schema'
import { Form, Badge } from 'component/ui'
import { RHFFormField, RHFFormSelect } from 'component/shared/rhf'
import { TapeBtn } from 'component/shared/btn'
import { delay, formatDateTime, transl } from 'lib/util'

enum FORM_KEY {
    name  = 'name',
    email = 'email',
    role  = 'role'
}

interface UpdateAccountFormProps {
    user: UserPrisma
}

const UserAccountForm = ({ user }: UpdateAccountFormProps) => {
  const { toast } = useToast()
  const form      = useForm<UpdateUser>({
    resolver     : zodResolver(UpdateUserSchema),
    defaultValues: userAccountUpdateDefaultValue(user) as never
  })
  const { control, handleSubmit, formState } = form

  const onSubmit: SubmitHandler<UpdateUser> = async (data) => {
      await delay(500)
    try {
      const response = await updateUserAccount({ ...data })
      if (!response.success) {
        toast({ variant: 'destructive', description: response.message })
      }
      toast({ description: response.message})
    } catch (error) {
      toast({ variant: 'destructive', description: (error as AppError).message })
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
                  <RHFFormField control={control} name={FORM_KEY.email} type={'input'} formKey={FORM_KEY.email} disabled />
                  <RHFFormField control={control} name={FORM_KEY.name} type={'input'} formKey={FORM_KEY.name} />
                  <RHFFormSelect control={control} name={FORM_KEY.role} formKey={FORM_KEY.role} options={GLOBAL.USER_ROLES} defaultOption={user.role} disabled={formState.isSubmitting} />
                <div className={'relative'}>
                  <TapeBtn isPending={formState.isSubmitting} label={transl('update_account.label')} className={'w-full'} icon={<Check size={15}/>} />
                <div className="flex justify-end align-center items-center gap-2 mt-5">
                  <p className={'text-muted-foreground'}>{transl('last_updated_at.label')}</p><span><Badge variant={'secondary'} className={'w-auto'}>{user?.updatedAt && formatDateTime(user?.updatedAt).dateTime}</Badge></span>
                </div>
                </div>
            </div>
        </form>
      </Form>
    </div>
  )
}

export default UserAccountForm

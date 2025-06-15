"use client"

import { useEffect, useTransition } from 'react'
import { PATH_DIR } from 'hgss-dir'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordWithToken } from 'lib/action'
import { ResetPasswordSchema } from 'lib/schema'
import { useToast } from 'hook'
import { Input } from 'component/ui/input'
import { Label } from 'component/ui/label'
import { TapeBtn } from 'component/shared/btn'
import { EllipsisLoader } from 'component/shared/loader'
import { KEY } from 'lib/constant'
import { delay, transl } from 'lib/util'
import { RHFPasswordField } from 'component/shared/rhf'

const ResetPasswordForm = ({ token, verifiedUserEmail }: { token: string, verifiedUserEmail: string }) => {
  const [isPending, startTransition]    = useTransition()
  const router                          = useRouter()
  const { toast }                       = useToast()
  const form                            = useForm<ResetPassword>({
    resolver     : zodResolver(ResetPasswordSchema),
    defaultValues: { token, password: '', confirmPassword: '' }
  })

  const { handleSubmit, register } = form

  useEffect(() => {
    async function validateTokenAndPrefillEmail() {
      if (!token) return
        form.setValue('email', verifiedUserEmail)
    }
    validateTokenAndPrefillEmail()
  }, [token])

  const ResetPasswordButton = () => {
    return (
      <div className={"mb-5"}>
        <TapeBtn className={'texture-bg text-lg md:text-sm'} disabled={isPending} label={isPending ? <EllipsisLoader /> : transl('change_password.label')} />
      </div>
    )
  }

  const onSubmit = async (data: { token: string, password: string, confirmPassword: string }) => {
    startTransition(async () => {
      const response = await resetPasswordWithToken(data)
      if (!response.success) {
        toast({ variant: 'destructive', description: response.message })
        return
      }
      await delay(500)
      toast({ description: response.message })
      router.push(PATH_DIR.SIGN_IN)
    })
  }

  return (
    <form method={'POST'} onSubmit={handleSubmit(onSubmit)}>
      <div className={'space-y-6'}>
        <div>
          <Label htmlFor={KEY.EMAIL}>{transl('form.email.label')}</Label>
          <Input type={KEY.EMAIL} autoComplete={KEY.EMAIL} {...register('email')} required disabled />
        </div>
        <RHFPasswordField label={transl('form.password.label')} register={register} name={'password'} />
        <RHFPasswordField label={transl('form.confirm_password.label')} register={register} name={'confirmPassword'} />
        <div>
          <ResetPasswordButton />
        </div>
        <Input type="hidden" {...register('token')} required />
      </div>
    </form>
  )
}

export default ResetPasswordForm

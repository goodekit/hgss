"use client"

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { sendPasswordResetEmail } from 'lib/action'
import { ForgotPasswordSchema } from 'lib/schema'
import { useToast } from 'hook'
import { CircleCheckBigIcon } from 'lucide-react'
import { Input } from 'component/ui/input'
import { Label } from 'component/ui/label'
import { TapeBtn } from 'component/shared/btn'
import { EllipsisLoader } from 'component/shared/loader'
import { KEY } from 'lib/constant'
import { transl } from 'lib/util'

const ForgotPasswordForm = () => {
  const [isSent, setIsSent]          = useState(false)
  const [isPending, startTransition] = useTransition()
  const { toast }                    = useToast()
  const form                         = useForm<ForgotPassword>({
    resolver     : zodResolver(ForgotPasswordSchema),
    defaultValues: { email: '' }
  })

  const { handleSubmit, register } = form

  const ResetPasswordButton = () => {
    return (
      <div className={"mb-5"}>
        <TapeBtn className={'texture-5-bg'} textSize={'text-md md:text-lg'} disabled={isPending || isSent} label={isPending ? <EllipsisLoader /> : transl('reset_password.button')} />
      </div>
    )
  }

  const onSubmit = async (data: ForgotPassword) => {
    startTransition(async () => {
      const response = await sendPasswordResetEmail(data)
      if (!response.success) {
        toast({ variant: 'destructive', description: response.message })
        return
      }
      toast({ description: response.message })
      setIsSent(true)
    })
  }

  return (
    <form method={'POST'} onSubmit={handleSubmit(onSubmit)}>
      <div className={'space-y-6'}>
        {isSent ? (
          <div className={'flex items-center justify-center'}>
            <CircleCheckBigIcon />
          </div>
        ) : (
          <div>
            <Label htmlFor={KEY.EMAIL}>{transl('form.email.label')}</Label>
            <Input id={KEY.EMAIL} type={KEY.EMAIL} autoComplete={KEY.EMAIL} defaultValue={''} {...register('email')} required />
          </div>
        )}
        <div>
          {isSent ? (
            <div className={'mb-5 flex items-center justify-center'}>
              <p className={'text-md md:text-xl text-punk dark:text-tape'}>{transl('message.password_reset_sent.description')}</p>
            </div>
          ) : (
            <ResetPasswordButton />
          )}
        </div>
      </div>
    </form>
  )
}

export default ForgotPasswordForm

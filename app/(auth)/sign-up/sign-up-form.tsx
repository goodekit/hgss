'use client'

import { SubmitHandler, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PATH_DIR } from 'hgss-dir'
import { useSearchParams, useRouter } from 'next/navigation'
import { useToast } from 'hook'
import { signUpDefaultValue, SignUpSchema } from 'lib/schema'
import { signUpUser } from 'lib/action/user.action'
import { RHFFormField, RHFPasswordField } from 'component/shared/rhf'
import { TapeBtn } from 'component/shared/btn'
import { EllipsisLoader } from 'component/shared/loader'
import { delay, transl } from 'lib/util'
import { KEY } from 'lib/constant'
import { AppAuthRedir } from 'component/shared/app'

const SignUpForm = () => {
  const { toast }    = useToast()
  const router       = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl  = searchParams.get(KEY.CALLBACK_URL) || PATH_DIR.ROOT
  const form         = useForm<SignUp>({
    resolver     : zodResolver(SignUpSchema),
    defaultValues: signUpDefaultValue
  })

  const { handleSubmit, register, formState: { errors, isSubmitting }, control } = form

  const SignUpButton = () => {
    return (
      <div className="mb-5">
        <TapeBtn className={'texture-2-bg'} disabled={isSubmitting} label={isSubmitting ? <EllipsisLoader /> : transl('sign_up.label')} />
      </div>
    )
  }

  const onSubmit: SubmitHandler<SignUp> = async (data) => {
    try {
        const response = await signUpUser(data)
        await delay(500)
        toast({ description: response.message })
        router.push(PATH_DIR.ROOT)
    } catch (error) {
       toast({ variant : 'destructive', description: (error as AppError).message })
    }
  }
  return (
    <FormProvider {...form}>
      <form method={'POST'} onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name={KEY.CALLBACK_URL} value={callbackUrl} />
        <div className={"space-y-6"}>
            <RHFFormField control={control} name={'name'} formKey={'name'} withWrapper />
            <RHFFormField control={control} name={'email'} formKey={'email'} withWrapper />
            <RHFPasswordField label={transl('form.password.label')} register={register} name={'password'} formKey={'password'} error={errors.password?.message as string} />
            <RHFPasswordField label={transl('form.password.label')} register={register} name={'confirmPassword'} formKey={'confirm_password'} error={errors.confirmPassword?.message as string} />
            <SignUpButton />
            <AppAuthRedir type={'sign-up'} />
        </div>
      </form>
    </FormProvider>
  )
}

export default SignUpForm

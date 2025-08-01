"use client"

import { useState } from 'react'
import { SubmitHandler, FormProvider, useForm } from 'react-hook-form'
import { useSearchParams, useRouter } from 'next/navigation'
import { PATH_DIR } from 'hgss-dir'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from 'hook'
import { signInBasic } from 'lib/action'
import { signInDefaultValue, SignInSchema } from 'lib/schema'
import { AppAuthRedir } from 'component/shared/app'
import { TapeBtn } from 'component/shared/btn'
import { EllipsisLoader } from 'component/shared/loader'
import { RHFFormField, RHFPasswordField } from 'component/shared/rhf'
import { GoogleSignInBtn } from 'component/shared/google'
import { KEY } from 'lib/constant'
import { transl } from 'lib/util'

const SignInForm = () => {
  const [isOAuth, setIsOAuth]                   = useState(false)
  const [isOAuthIsLoading, setIsOAuthIsLoading] = useState(false)
  const { toast }                               = useToast()
  const router                                  = useRouter()
  const searchParams                            = useSearchParams()
  const callbackUrl                             = searchParams.get(KEY.CALLBACK_URL) || PATH_DIR.ROOT
  const form                                    = useForm<SignIn>({
      resolver     : zodResolver(SignInSchema),
      defaultValues: signInDefaultValue
    })

  const { handleSubmit, register, formState: { isSubmitting }, control } = form

  const SignInButton = () => {
    return (
      <div className={"mb-5"}>
        <TapeBtn className={'texture-bg'} disabled={isSubmitting} label={isSubmitting ? <EllipsisLoader /> : transl('sign_in.label')} />
      </div>
    )
  }

  const onSubmit: SubmitHandler<SignIn> = async (data) => {
    try {
        const response = await signInBasic(data)
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
            <RHFFormField control={control} name={'email'} formKey={'email'} disabled={isOAuth} withWrapper />
            <RHFPasswordField control={control} register={register} name={'password'} formKey={'password'} disabled={isOAuth} />
          <div>
            <SignInButton />
            {/* disable for now: HGSS-Issue8 */}
            <div className={'my-4 flex justify-center'}>
            <h4>{transl('or.label')}</h4>
          </div>
          <GoogleSignInBtn userName={''} loading={isOAuthIsLoading} disabled={isOAuthIsLoading} onClick={() => {setIsOAuth(true); setIsOAuthIsLoading(true)}}/>
          </div>
          {/* disable for now: HGSS-Issue8 */}
          <AppAuthRedir type={'sign-in'} />
        </div>
      </form>
    </FormProvider>
  )
}

export default SignInForm

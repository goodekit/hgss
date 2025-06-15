"use client"

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { en } from 'public/locale'
import { PATH_DIR } from 'hgss-dir'
import { useSearchParams } from 'next/navigation'
import { signInBasic } from 'lib/action'
import { signInDefaultValue } from 'lib/schema'
import { Input } from 'component/ui/input'
import { Label } from 'component/ui/label'
// import { AppAuthRedir } from 'component/shared/app'
import { TapeBtn } from 'component/shared/btn'
import { EllipsisLoader } from 'component/shared/loader'
import { FormPasswordField } from 'component/shared/form'
// import { GoogleSignInBtn } from 'component/shared/google'
import { KEY, RESPONSE } from 'lib/constant'
import { transl } from 'lib/util'

const SignInForm = () => {
  const [data, action] = useActionState(signInBasic, RESPONSE.DEFAULT)
  const searchParams   = useSearchParams()
  const callbackUrl    = searchParams.get(KEY.CALLBACK_URL) || PATH_DIR.ROOT

  const SignInButton = () => {
    const { pending } = useFormStatus()
    return (
      <div className="mb-5">
        <TapeBtn className={'texture-bg'} disabled={pending} label={pending ? <EllipsisLoader /> : en.sign_in.label} />
      </div>
    )
  }

  const renderDataMessage = data && !data.success && <div className="text-center text-destructive">{data.message}</div>
  return (
    <form action={action}>
      <input type="hidden" name={KEY.CALLBACK_URL} value={callbackUrl} />
      {renderDataMessage}
      <div className="space-y-6">
        <div>
          <Label htmlFor="email">{en.form.email.label}</Label>
          <Input id={KEY.EMAIL} name={KEY.EMAIL} type={KEY.EMAIL} autoComplete={KEY.EMAIL} defaultValue={signInDefaultValue.email} required />
        </div>
        <FormPasswordField label={transl('form.confirm_password.label')} name={'password'} />
        <div>
          <SignInButton />
          {/* disable for now: HGSS-Issue8 */}
          {/* <div className={'my-4 flex justify-center'}>
            <h4>{en.or.label}</h4>
          </div>
          <GoogleSignInBtn /> */}
        </div>
        {/* disable for now: HGSS-Issue8 */}
        {/* <AppAuthRedir type={'sign-in'} /> */}
      </div>
    </form>
  )
}

export default SignInForm

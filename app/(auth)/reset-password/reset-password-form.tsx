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
import { TapeBtn } from 'component/shared/btn'
import { EllipsisLoader } from 'component/shared/loader'
import { KEY, RESPONSE } from 'lib/constant'
import { transl } from 'lib'

const ResetPasswordForm = () => {
  const [data, action]                  = useActionState(signInBasic, RESPONSE.DEFAULT)
  const searchParams                    = useSearchParams()
  const callbackUrl                     = searchParams.get(KEY.CALLBACK_URL) || PATH_DIR.ROOT

  const ResetPasswordButton = () => {
    const { pending } = useFormStatus()
    return (
      <div className="mb-5">
        <TapeBtn className={'texture-bg'} disabled={pending} label={pending ? <EllipsisLoader /> : transl('submit.label')} />
      </div>
    )
  }

  /**
   * verify the email if it is registered, then
   * if it is
   *  This should send an smtp
   * if it is not
   *  dont send anything
   *
   * after sending update the page that it has send a password link in the email provided
   *
   * link should redirect to change password page.
   * minimum 8 password, not so strict
   *
   */

  const renderDataMessage = data && !data.success && <div className="text-center text-destructive">{data.message}</div>
  return (
    <form action={action}>
      <input type="hidden" name={KEY.CALLBACK_URL} value={callbackUrl} />
      {renderDataMessage}
      <div className={'space-y-6'}>
        <div>
          <Label htmlFor="email">{en.form.email.label}</Label>
          <Input id={KEY.EMAIL} name={KEY.EMAIL} type={KEY.EMAIL} autoComplete={KEY.EMAIL} defaultValue={signInDefaultValue.email} required />
        </div>
        <div>
          <ResetPasswordButton />
        </div>
      </div>
    </form>
  )
}

export default ResetPasswordForm

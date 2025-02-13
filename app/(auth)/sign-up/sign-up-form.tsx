'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { en } from 'public/locale'
import { PATH_DIR } from 'hgss-dir'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { signUpDefaultValue } from 'lib/schema'
import { signUpUser } from 'lib/action/user.action'
import { Input } from 'component/ui/input'
import { Label } from 'component/ui/label'
import { TapeBtn } from 'component/shared/btn'
import { EllipsisLoader } from 'component/shared/loader'
import { KEY, RESPONSE } from 'lib/constant'

const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, RESPONSE.DEFAULT)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get(KEY.CALLBACK_URL) || PATH_DIR.ROOT

  const SignUpButton = () => {
    const { pending } = useFormStatus()
    return (
      <div className="mb-5">
        <TapeBtn disabled={pending} label={pending ? <EllipsisLoader /> : en.sign_up.label} />
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
          <Label htmlFor={KEY.NAME}>{en.form.name.label}</Label>
          <Input
            id={KEY.NAME}
            name={KEY.NAME}
            type={KEY.TEXT}
            autoComplete={KEY.NAME}
            defaultValue={signUpDefaultValue.name}
            className="rounded-sm"
            required
          />
        </div>
        <div>
          <Label htmlFor="email">{en.form.email.label}</Label>
          <Input
            id={KEY.EMAIL}
            name={KEY.EMAIL}
            type={KEY.EMAIL}
            autoComplete={KEY.EMAIL}
            defaultValue={signUpDefaultValue.email}
            className="rounded-sm"
            required
          />
        </div>
        <div>
          <Label htmlFor="password">{en.form.password.label}</Label>
          <Input
            id={KEY.PASSWORD}
            name={KEY.PASSWORD}
            type={KEY.PASSWORD}
            autoComplete={KEY.PASSWORD}
            defaultValue={signUpDefaultValue.password}
            className="rounded-sm"
            required
          />
        </div>
        <div>
          <Label htmlFor={KEY.CONFIRM_PASSWORD}>{en.form.confirm_password.label}</Label>
          <Input
            id={KEY.CONFIRM_PASSWORD}
            name={KEY.CONFIRM_PASSWORD}
            type={KEY.PASSWORD}
            autoComplete={KEY.PASSWORD}
            defaultValue={signUpDefaultValue.confirmPassword}
            className="rounded-sm"
            required
          />
        </div>
        <div className="">
          <SignUpButton />
        </div>
        <div className="text-sm text-center">
          {en.already_have_account.label}
          <Link href={PATH_DIR.SIGN_IN} target={"_self"} className={"link font-bold text-punk"}>
          &nbsp;{en.sign_in.label}
          </Link>
        </div>
      </div>
    </form>
  )
}

export default SignUpForm

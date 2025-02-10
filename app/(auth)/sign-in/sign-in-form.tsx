"use client"

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { en } from 'public/locale'
import { PATH_DIR } from 'hgss-dir'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { signInBasic } from 'lib/action'
import { signInDefaultValue } from 'lib/schema'
import { Input } from 'component/ui/input'
import { Label } from 'component/ui/label'
import { TapeBtn } from 'component/shared/btn'
import { EllipsisLoader } from 'component/shared/loader'
import { KEY, RESPONSE } from 'lib/constant'

const SignInForm = () => {
  const [data, action] = useActionState(signInBasic, RESPONSE.DEFAULT)
  const searchParams   = useSearchParams()
  const callbackUrl    = searchParams.get(KEY.CALLBACK_URL) || PATH_DIR.ROOT

  const SignInButton = () => {
    const { pending } = useFormStatus()
    return (
      <div className="mb-5">
        <TapeBtn disabled={pending} label={pending ? <EllipsisLoader /> : en.sign_in.label} />
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
          <Label htmlFor="email">{'Email'}</Label>
          <Input
            id={KEY.EMAIL}
            name={KEY.EMAIL}
            type={KEY.EMAIL}
            autoComplete={KEY.EMAIL}
            defaultValue={signInDefaultValue.email}
            className="rounded-sm"
            required
          />
        </div>
        <div>
          <Label htmlFor="password">{'Password'}</Label>
          <Input
            id={KEY.PASSWORD}
            name={KEY.PASSWORD}
            type={KEY.PASSWORD}
            autoComplete={KEY.PASSWORD}
            defaultValue={signInDefaultValue.password}
            className="rounded-sm"
            required
          />
        </div>
        <div className="">
          <SignInButton />
        </div>
        <div className="text-sm text-center">
          {en.dont_have_account.label}
          <Link href={PATH_DIR.SIGN_UP} target="_self" className={"link font-bold text-punk"}>
           &nbsp;{en.sign_up.label}
          </Link>
        </div>
      </div>
    </form>
  )
}

export default SignInForm

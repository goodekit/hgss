'use client'

import { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { en } from 'public/locale'
import { PATH_DIR } from 'hgss-dir'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { signUpDefaultValue } from 'lib/schema'
import { signUpUser } from 'lib/action/user.action'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Input } from 'component/ui/input'
import { Label } from 'component/ui/label'
import { TapeBtn } from 'component/shared/btn'
import { EllipsisLoader } from 'component/shared/loader'
import { KEY, RESPONSE } from 'lib/constant'

const FORM_KEY = {
  name           : 'name',
  email          : 'email',
  password       : 'password',
  confirmPassword: 'confirmPassword'
}

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [data, action] = useActionState(signUpUser, RESPONSE.DEFAULT)
  const searchParams   = useSearchParams()
  const callbackUrl    = searchParams.get(KEY.CALLBACK_URL) || PATH_DIR.ROOT

  // TODO: enhance password conditions

  const togglePassword        = () => setShowPassword(!showPassword)
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)

  const SignUpButton = () => {
    const { pending } = useFormStatus()
    return (
      <div className="mb-5">
        <TapeBtn className={'texture-2-bg'} disabled={pending} label={pending ? <EllipsisLoader /> : en.sign_up.label} />
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
            name={FORM_KEY.name}
            type={KEY.TEXT}
            autoComplete={KEY.NAME}
            defaultValue={signUpDefaultValue.name}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">{en.form.email.label}</Label>
          <Input
            id={KEY.EMAIL}
            name={FORM_KEY.email}
            type={KEY.EMAIL}
            autoComplete={KEY.EMAIL}
            defaultValue={signUpDefaultValue.email}
            required
          />
        </div>
        <div>
          <Label htmlFor={KEY.PASSWORD}>{en.form.password.label}</Label>
          <div className={'relative'}>
            <Input
              id={KEY.PASSWORD}
              name={FORM_KEY.password}
              type={KEY.PASSWORD}
              autoComplete={KEY.PASSWORD}
              defaultValue={signUpDefaultValue.password}
              required
            />
            <button type={'button'} onClick={togglePassword} className={'absolute inset-y-0 right-3 flex items-center text-muted-foreground'}>
              {showConfirmPassword ? <EyeIcon size={15} /> : <EyeOffIcon size={15} />}
            </button>
          </div>
        </div>
        <div>
          <Label htmlFor={KEY.CONFIRM_PASSWORD}>{en.form.confirm_password.label}</Label>
          <div className={'relative'}>
            <Input
              id={KEY.CONFIRM_PASSWORD}
              name={FORM_KEY.confirmPassword}
              type={KEY.PASSWORD}
              autoComplete={KEY.PASSWORD}
              defaultValue={signUpDefaultValue.confirmPassword}
              required
            />
            <button type={'button'} onClick={toggleConfirmPassword} className={'absolute inset-y-0 right-3 items-center flex text-muted-foreground'} >
              {showConfirmPassword ? <EyeIcon size={15} /> : <EyeOffIcon size={15} />}
            </button>
          </div>
        </div>
        <div>
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

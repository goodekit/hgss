"use client"

import { signIn } from 'next-auth/react'
import { en } from 'public/locale'
import { useFormStatus } from 'react-dom'
import { TapeBtn } from 'component/shared/btn'
import { EllipsisLoader } from 'component/shared/loader'

export const GoogleSignInBtn = () => {
    const { pending } = useFormStatus()

  return (
    <div className={'my-5'}>
      <TapeBtn
        className={'texture-bg'}
        disabled={pending}
        label={pending ? <EllipsisLoader /> : en.sign_in.google}
        onClick={() => signIn('google', { callbackUrl: '/' })}
      />
    </div>
  )
}